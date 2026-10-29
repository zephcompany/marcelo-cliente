(function () {
  const DS = window.MS7DesignSystem_5d5172;
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
      toast('Código PIX copiado');
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
          <div style={{ padding: '32px 0', textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)' }}>Gerando o PIX…</div>
        ) : null}
        {st.fase === 'erro' ? (
          <div style={{ padding: '16px', borderRadius: 12, background: 'var(--ms7-gray-50)', fontWeight: 600 }}>{st.msg}</div>
        ) : null}
        {st.fase === 'pix' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            {st.qr ? (
              <img
                src={'data:image/png;base64,' + st.qr}
                alt="QR Code PIX"
                width={200}
                height={200}
                style={{ borderRadius: 12, border: '1px solid var(--border-default)' }}
              />
            ) : (
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 12,
                  border: '1px dashed var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  padding: 16,
                }}
              >
                QR Code do PIX aparece aqui
              </div>
            )}
            <b style={{ fontSize: 24 }}>{MS7.brl(preco)}</b>
            <div style={{ width: '100%', display: 'flex', gap: 8 }}>
              <input
                readOnly
                value={st.copia || ''}
                style={{
                  flex: 1,
                  minWidth: 0,
                  font: '500 12px var(--font-mono, monospace)',
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--border-default)',
                  background: 'var(--surface-muted, #F5F6F5)',
                  color: 'var(--text-primary)',
                }}
              />
              <Button variant="outline" iconLeft="copy" onClick={copiar}>
                Copiar
              </Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
              <DS.Icon name="loader" size={14} />
              Aguardando pagamento. A vaga é liberada sozinha assim que o PIX cair.
            </div>
            {st.demo ? (
              <Button variant="lime" size="sm" iconLeft="zap" onClick={simular}>
                Simular pagamento (só na prévia)
              </Button>
            ) : null}
          </div>
        ) : null}
        {st.fase === 'ok' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '16px 0', textAlign: 'center' }}>
            <span
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#005D3B',
                color: '#C9F76A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DS.Icon name="check" size={28} />
            </span>
            <b style={{ fontSize: 18 }}>Pagamento confirmado</b>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>
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
        style={{
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-lg, 16px)',
          boxShadow: 'var(--shadow-card)',
          padding: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'var(--ms7-lime-100, #E9F7D9)',
            color: 'var(--ms7-green-ink, #005D3B)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <DS.Icon name="user-plus" size={22} />
        </span>
        <div style={{ flex: '1 1 240px', minWidth: 0 }}>
          <b style={{ fontSize: 16 }}>{v.vagas ? 'Vagas de operador: ' + v.usadas + ' de ' + v.vagas + ' em uso' : 'Seu painel é só seu'}</b>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 2 }}>
            {v.vagas
              ? livres
                ? livres + (livres === 1 ? ' vaga livre para cadastrar.' : ' vagas livres para cadastrar.')
                : 'Todas as vagas em uso. Compre outra para adicionar mais um operador.'
              : 'Quer uma equipe? Adicione operadores e acompanhe as operações e o lucro de cada um. Pagamento único de ' +
                MS7.brl(v.preco) +
                ' por operador.'}
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
    toast('Compre uma vaga de operador para adicionar mais um');
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
        toast('Código PIX copiado. Cole no app do seu banco.');
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
          <div style={{ padding: '36px 0', textAlign: 'center', fontWeight: 700, color: 'var(--text-secondary)' }}>Gerando o PIX…</div>
        ) : null}
        {st.fase === 'erro' ? (
          <div style={{ padding: '20px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <DS.Icon name="circle-alert" size={28} color="var(--ms7-error)" />
            <b style={{ fontSize: 15 }}>{st.msg}</b>
          </div>
        ) : null}
        {st.fase === 'pix' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
            {st.qr ? (
              <img src={st.qr} alt="QR Code PIX" style={{ width: 200, height: 200, borderRadius: 12, background: '#fff', padding: 8 }} />
            ) : (
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 12,
                  background: 'var(--ms7-gray-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                }}
              >
                <DS.Icon name="qr-code" size={64} strokeWidth={1.2} />
              </div>
            )}
            <div style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{MS7.brl(v || 0)}</div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>PIX copia e cola</div>
              <textarea
                readOnly
                value={st.copia || ''}
                onFocus={function (e) {
                  e.target.select();
                }}
                rows={3}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 12px',
                  border: '1px solid var(--border-default)',
                  borderRadius: 12,
                  background: 'var(--surface-muted, var(--surface-card))',
                  color: 'var(--text-primary)',
                  font: '500 12px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace',
                  resize: 'none',
                  wordBreak: 'break-all',
                }}
              ></textarea>
              <Button variant="brand" fullWidth iconLeft="copy" onClick={copiar}>
                Copiar código PIX
              </Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
              <span
                style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--ms7-orange)', animation: 'ms7spin 1.2s linear infinite' }}
              ></span>
              {st.demo ? 'Prévia: aqui não cobra de verdade.' : 'Aguardando o pagamento. A confirmação aparece sozinha.'}
            </div>
          </div>
        ) : null}
        {st.fase === 'ok' ? (
          <div style={{ padding: '24px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <span
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                background: 'var(--ms7-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DS.Icon name="check" size={28} color="#fff" strokeWidth={3} />
            </span>
            <b style={{ fontSize: 18 }}>Pagamento confirmado</b>
          </div>
        ) : null}
      </Modal>
    );
  }
  window.PixCheckout = PixCheckout;
})();
