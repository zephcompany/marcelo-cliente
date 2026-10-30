(function () {
  const DS = window.MS7DesignSystem_5d5172;
  /* ---------- CSS só desta tela (tokens) ---------- */
  const CSS = [
    /* moldura do QR: branco puro de propósito (zona de silêncio do QR Code, precisa ser branca para a leitura) */
    '.ms7v-qr{width:216px;height:216px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px var(--line);padding:8px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;overflow:hidden}',
    '.ms7v-qr.is-ph{background:var(--surface-card)}',
    '.ms7v-qr img{width:100%;height:100%;border-radius:6px;display:block}',
    '.ms7v-qr-ph{width:100%;height:100%;border-radius:8px;background:var(--surface-muted);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--text-secondary);font-size:12.5px;font-weight:500;text-align:center;padding:12px;box-sizing:border-box}',
    'html[data-theme="dark"] .ms7v-qr{box-shadow:0 0 0 1px var(--line-strong)}',
    '.ms7v-code{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--surface-muted);color:var(--text-primary);font:500 12.5px/1.5 var(--font-mono);resize:none;word-break:break-all;outline:0;transition:border-color var(--dur-fast),box-shadow var(--dur-base)}',
    '.ms7v-code:focus{border-color:var(--ms7-green-900);box-shadow:0 0 0 3px color-mix(in oklab,var(--ms7-green-900) 16%,transparent)}',
    '.ms7v-status{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;font-size:12.5px;font-weight:600;line-height:1.35;text-align:center;animation:ms7-blink 1.9s ease-in-out infinite}',
    '.ms7v-status>i{width:7px;height:7px;border-radius:50%;flex-shrink:0;background:currentColor}',
    '.ms7v-ok{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:color-mix(in oklab,var(--ms7-green) 14%,var(--surface-card));color:var(--ms7-green);animation:ms7-pop 420ms var(--ease-spring) both}',
    '.ms7v-amount{font-size:24px;font-weight:600;letter-spacing:-.03em;line-height:1.1}',
  ].join('');
  if (!document.getElementById('ms7-vagas-css')) {
    const st = document.createElement('style');
    st.id = 'ms7-vagas-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }
  const DEMO_K = 'ms7op-vagas-demo';
  function demoGet() {
    try {
      return JSON.parse(localStorage.getItem(DEMO_K)) || { vagas: 0 };
    } catch (e) {
      return { vagas: 0 };
    }
  }
  const listeners = [];
  let cache = null;
  function emit(v) {
    cache = v;
    window.ms7Vagas = v;
    listeners.slice().forEach(function (f) {
      f(v);
    });
  }
  function online() {
    return DB.Sync.on();
  }
  function load() {
    const n = (DB.get().operadores || []).length;
    if (!online()) {
      const d = demoGet();
      emit({ vagas: d.vagas, usadas: n, preco: 14.99, pix: true, demo: true });
      return;
    }
    DB.Sync.api('/api/vagas')
      .then(function (v) {
        emit(Object.assign({ usadas: n }, v));
      })
      .catch(function () {
        emit({ vagas: 0, usadas: n, preco: 14.99, pix: false, erro: true });
      });
  }
  function useVagas() {
    const [v, setV] = React.useState(cache);
    React.useEffect(function () {
      listeners.push(setV);
      if (!cache) load();
      return function () {
        const i = listeners.indexOf(setV);
        if (i >= 0) listeners.splice(i, 1);
      };
    }, []);
    return v;
  }
  /* QR em moldura branca (ou skeleton enquanto gera) */
  function QrFrame({ src, placeholder, loading }) {
    return (
      <div className={'ms7v-qr' + (src ? '' : ' is-ph')}>
        {src ? (
          <img src={src} alt="QR Code PIX" />
        ) : loading ? (
          <div className="ms7-skeleton" style={{ width: '100%', height: '100%', borderRadius: 8 }}></div>
        ) : (
          <div className="ms7v-qr-ph">
            <DS.Icon name="qr-code" size={40} strokeWidth={1.2} />
            {placeholder ? <span>{placeholder}</span> : null}
          </div>
        )}
      </div>
    );
  }
  function Comprar({ open, onClose, preco }) {
    const { Modal, Button } = DS;
    const [st, setSt] = React.useState({ fase: 'gerando' });
    const timer = React.useRef(null);
    React.useEffect(
      function () {
        if (!open) return;
        setSt({ fase: 'gerando' });
        if (!online()) {
          setTimeout(function () {
            setSt({
              fase: 'pix',
              demo: true,
              copia: '00020126580014BR.GOV.BCB.PIX0136exemplo-da-previa5204000053039865405' + String(preco.toFixed(2)) + '5802BR',
            });
          }, 500);
          return;
        }
        DB.Sync.api('/api/vagas/pix', { method: 'POST', body: '{}' })
          .then(function (p) {
            setSt({ fase: 'pix', id: p.id, qr: p.qr, copia: p.copia });
            timer.current = setInterval(function () {
              DB.Sync.api('/api/vagas/pix/' + p.id)
                .then(function (r) {
                  if (r.status === 'approved') {
                    clearInterval(timer.current);
                    emit(Object.assign({ usadas: (DB.get().operadores || []).length }, r));
                    setSt({ fase: 'ok' });
                  }
                })
                .catch(function () {});
            }, 4000);
          })
          .catch(function (e) {
            setSt({ fase: 'erro', msg: e.message || 'Não foi possível gerar o PIX agora.' });
          });
        return function () {
          clearInterval(timer.current);
        };
      },
      [open],
    );
    function simular() {
      const d = demoGet();
      d.vagas = (d.vagas || 0) + 1;
      localStorage.setItem(DEMO_K, JSON.stringify(d));
      load();
      setSt({ fase: 'ok' });
    }
    function copiar() {
      navigator.clipboard && navigator.clipboard.writeText(st.copia || '');
      toast('📋 Código PIX copiado');
    }
    return (
      <Modal
        open={open}
        onClose={onClose}
        title="Adicionar operador"
        subtitle={'Pagamento único de ' + MS7.brl(preco) + ' por operador'}
        size="sm"
        footer={
          st.fase === 'ok' ? (
            <Button variant="brand" iconLeft="check" onClick={onClose}>
              Pronto
            </Button>
          ) : (
            <Button variant="secondary" onClick={onClose}>
              Fechar
            </Button>
          )
        }
      >
        {st.fase === 'gerando' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '8px 0' }}>
            <QrFrame loading />
            <span className="ms7v-status" style={{ background: 'var(--surface-muted)', color: 'var(--text-secondary)' }}>
              <i></i>Gerando o PIX…
            </span>
          </div>
        ) : null}
        {st.fase === 'erro' ? (
          <div
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              padding: '14px 16px',
              borderRadius: 12,
              background: 'color-mix(in oklab, var(--ms7-error) 8%, var(--surface-card))',
              color: 'var(--ms7-error)',
              fontSize: 14,
              fontWeight: 600,
              lineHeight: 1.45,
            }}
          >
            <DS.Icon name="circle-alert" size={18} strokeWidth={2} style={{ marginTop: 1 }} />
            <span>{st.msg}</span>
          </div>
        ) : null}
        {st.fase === 'pix' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <QrFrame src={st.qr ? 'data:image/png;base64,' + st.qr : ''} placeholder="QR Code do PIX aparece aqui" />
            <span className="ms7-num ms7v-amount">{MS7.brl(preco)}</span>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="ms7-eyebrow">PIX copia e cola</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
                <input readOnly value={st.copia || ''} className="ms7v-code" style={{ flex: 1, minWidth: 0, height: 40, padding: '0 12px' }} />
                <Button variant="outline" iconLeft="copy" onClick={copiar}>
                  Copiar
                </Button>
              </div>
            </div>
            <span
              className="ms7v-status"
              style={{ background: 'color-mix(in oklab, var(--ms7-orange) 12%, var(--surface-card))', color: 'color-mix(in oklab, var(--ms7-orange) 88%, var(--text-primary))' }}
            >
              <i></i>
              <span>Aguardando pagamento. A vaga é liberada sozinha assim que o PIX&nbsp;cair.</span>
            </span>
            {st.demo ? (
              <Button variant="outline" size="sm" iconLeft="zap" onClick={simular}>
                Simular pagamento (só na prévia)
              </Button>
            ) : null}
          </div>
        ) : null}
        {st.fase === 'ok' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '16px 0', textAlign: 'center' }}>
            <span className="ms7v-ok">
              <DS.Icon name="check" size={32} strokeWidth={2.5} />
            </span>
            <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 4 }}>Pagamento confirmado</span>
            <div className="ms7-balance" style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 360 }}>
              Vaga liberada. Agora cadastre o operador em Gestão → Operadores e crie o login dele em Configurações → Acessos.
            </div>
          </div>
        ) : null}
      </Modal>
    );
  }
  function VagasCard() {
    const v = useVagas();
    const [buy, setBuy] = React.useState(false);
    if (!v) return null;
    const livres = Math.max(0, v.vagas - v.usadas);
    return (
      <div
        className="ms7-card"
        style={{
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 240px', minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.25 }}>
            <span className="ms7-emo" aria-hidden="true" style={{ marginRight: 8 }}>
              🎟️
            </span>
            {v.vagas ? 'Vagas de operador: ' + v.usadas + ' de ' + v.vagas + ' em uso' : 'Seu painel é só seu'}
          </div>
          <div style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-secondary)', marginTop: 3, textWrap: 'pretty' }}>
            {v.vagas
              ? livres
                ? livres + (livres === 1 ? ' vaga livre para cadastrar.' : ' vagas livres para cadastrar.')
                : 'Todas as vagas em uso. Compre outra para adicionar mais um operador.'
              : 'Quer uma equipe? Adicione operadores e acompanhe as operações e o lucro de cada um. Pagamento único de ' +
                MS7.brl(v.preco) +
                ' por operador.'}
          </div>
        </div>
        <DS.Button
          variant="brand"
          iconLeft="plus"
          onClick={function () {
            setBuy(true);
          }}
        >
          {'Adicionar operador · ' + MS7.brl(v.preco)}
        </DS.Button>
        <Comprar
          open={buy}
          preco={v.preco}
          onClose={function () {
            setBuy(false);
            load();
          }}
        />
      </div>
    );
  }
  function podeNovoOperador() {
    const s = JSON.parse(localStorage.getItem('ms7op-session') || '{}');
    if (s.role !== 'cliente') return true;
    const v = cache;
    const n = (DB.get().operadores || []).length;
    if (v && v.vagas > n) return true;
    toast('🎟️ Compre uma vaga de operador para adicionar mais um');
    return false;
  }
  Object.assign(window, { VagasCard: VagasCard, useVagas: useVagas, podeNovoOperador: podeNovoOperador });

  function PixCheckout({ open, onClose, titulo, subtitulo, body, valor, onOk }) {
    const { Modal, Button } = DS;
    const [st, setSt] = React.useState({ fase: 'gerando' });
    const timer = React.useRef(null);
    React.useEffect(
      function () {
        if (!open) return;
        setSt({ fase: 'gerando' });
        if (!DB.Sync.on()) {
          setTimeout(function () {
            setSt({
              fase: 'pix',
              demo: true,
              copia:
                '00020126580014BR.GOV.BCB.PIX0136exemplo-da-previa-ms7520400005303986540' +
                String((+valor || 0).toFixed(2)).length +
                String((+valor || 0).toFixed(2)) +
                '5802BR5909MS7 PREVIA6009SAO PAULO6304ABCD',
            });
          }, 500);
          return;
        }
        DB.Sync.api('/api/pix', { method: 'POST', body: JSON.stringify(body || {}) })
          .then(function (p) {
            setSt({ fase: 'pix', id: p.id, qr: p.qr, copia: p.copia, valor: p.valor });
            if (p.status === 'approved') {
              setSt({ fase: 'ok' });
              onOk && onOk(p);
              return;
            }
            timer.current = setInterval(function () {
              DB.Sync.api('/api/pix/' + p.id)
                .then(function (r) {
                  if (r.status === 'approved') {
                    clearInterval(timer.current);
                    setSt({ fase: 'ok' });
                    onOk && onOk(r);
                  } else if (r.status === 'rejected' || r.status === 'cancelled') {
                    clearInterval(timer.current);
                    setSt({ fase: 'erro', msg: 'O pagamento foi cancelado. Gere um novo PIX.' });
                  }
                })
                .catch(function () {});
            }, 4000);
          })
          .catch(function (e) {
            setSt({ fase: 'erro', msg: e.message || 'Não foi possível gerar o PIX agora.' });
          });
        return function () {
          clearInterval(timer.current);
        };
      },
      [open],
    );
    function copiar() {
      const t = st.copia || '';
      const ok = function () {
        toast('📋 Código PIX copiado. Cole no app do seu banco.');
      };
      if (navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(t).then(ok, function () {
          window.prompt('Copie o código PIX:', t);
        });
      else window.prompt('Copie o código PIX:', t);
    }
    const v = st.valor != null ? st.valor : valor;
    return (
      <Modal
        open={open}
        onClose={onClose}
        title={titulo || 'Pagamento via PIX'}
        subtitle={subtitulo || (v ? 'Total ' + MS7.brl(v) : '')}
        size="sm"
        footer={
          st.fase === 'ok' ? (
            <Button variant="brand" iconLeft="check" onClick={onClose}>
              Pronto
            </Button>
          ) : (
            <React.Fragment>
              {st.demo ? (
                <Button
                  variant="outline"
                  iconLeft="zap"
                  onClick={function () {
                    setSt({ fase: 'ok' });
                    onOk && onOk({ demo: true });
                  }}
                >
                  Simular pagamento
                </Button>
              ) : null}
              <Button variant="secondary" onClick={onClose}>
                Fechar
              </Button>
            </React.Fragment>
          )
        }
      >
        {st.fase === 'gerando' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '8px 0' }}>
            <QrFrame loading />
            <span className="ms7v-status" style={{ background: 'var(--surface-muted)', color: 'var(--text-secondary)' }}>
              <i></i>Gerando o PIX…
            </span>
          </div>
        ) : null}
        {st.fase === 'erro' ? (
          <div style={{ padding: '20px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <span className="ms7v-ok" style={{ background: 'color-mix(in oklab, var(--ms7-error) 12%, var(--surface-card))', color: 'var(--ms7-error)' }}>
              <DS.Icon name="circle-alert" size={30} strokeWidth={2} />
            </span>
            <span className="ms7-balance" style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4, maxWidth: 320 }}>
              {st.msg}
            </span>
          </div>
        ) : null}
        {st.fase === 'pix' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
            <QrFrame src={st.qr || ''} />
            <span className="ms7-num ms7v-amount">{MS7.brl(v || 0)}</span>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span className="ms7-eyebrow">PIX copia e cola</span>
              <textarea
                readOnly
                value={st.copia || ''}
                onFocus={function (e) {
                  e.target.select();
                }}
                rows={3}
                className="ms7v-code"
              ></textarea>
              <Button variant="brand" fullWidth iconLeft="copy" onClick={copiar}>
                Copiar código PIX
              </Button>
            </div>
            <span
              className="ms7v-status"
              style={
                st.demo
                  ? { background: 'var(--surface-muted)', color: 'var(--text-secondary)', animation: 'none' }
                  : { background: 'color-mix(in oklab, var(--ms7-orange) 12%, var(--surface-card))', color: 'color-mix(in oklab, var(--ms7-orange) 88%, var(--text-primary))' }
              }
            >
              <i></i>
              <span>{st.demo ? 'Prévia: aqui não cobra de verdade.' : 'Aguardando o pagamento. A confirmação aparece sozinha.'}</span>
            </span>
          </div>
        ) : null}
        {st.fase === 'ok' ? (
          <div style={{ padding: '24px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <span className="ms7v-ok">
              <DS.Icon name="check" size={32} strokeWidth={2.5} />
            </span>
            <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 4 }}>Pagamento confirmado</span>
          </div>
        ) : null}
      </Modal>
    );
  }
  window.PixCheckout = PixCheckout;
})();
