(function () {
  const DS = window.MS7DesignSystem_5d5172;
  /* CSS próprio da tela (só tokens) */
  (function () {
    if (document.getElementById('ms7-coop-css')) return;
    const s = document.createElement('style');
    s.id = 'ms7-coop-css';
    s.textContent = [
      '.ms7c-kpis{display:grid;grid-template-columns:repeat(auto-fill,minmax(max(180px,calc((100% - 42px) / 4)),1fr));gap:14px}',
      '.ms7c-kpis-d{gap:12px}.ms7c-kpis-d .ms7-stat-value{white-space:nowrap}',
      /* modais (position:fixed) dentro de cards/filhos da página: nada de transform/filter residual no ancestral, senão o modal fica preso */
      '.ms7-hover-card:has(.ms7-modal-bg),.ms7-card:has(.ms7-modal-bg){transform:none!important;transition:none!important;will-change:auto!important}',
      '.ms7-page > *,.ms7-page > *:only-child > *{animation-fill-mode:backwards!important}',
      '[data-reveal].is-in:has(.ms7-modal-bg){filter:none!important;will-change:auto!important;transform:none!important}',
      '.ms7c-kpi{display:flex;flex-direction:column;gap:12px;padding:16px 18px;min-width:0}',
      '.ms7c-kpi-head{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0}',
      '.ms7c-kpi-head .ms7-eyebrow{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}',
      '.ms7c-tile{width:30px;height:30px;border-radius:9px;flex-shrink:0;display:inline-flex;align-items:center;justify-content:center}',
      '.ms7c-kpi-val{font-size:24px;font-weight:600;letter-spacing:-.03em;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.ms7c-bar{display:flex;align-items:center;gap:10px 12px;flex-wrap:wrap}',
      '.ms7c-bar-dates{display:flex;align-items:center;gap:8px;flex-wrap:wrap}',
      '.ms7c-bar-sep{font-size:13px;font-weight:500;color:var(--text-secondary)}',
      '.ms7c-bar-note{font-size:12.5px;font-weight:500;color:var(--text-secondary)}',
      '.ms7c-rule{display:flex;align-items:flex-start;gap:7px;margin:-10px 0 0;font-size:12.5px;font-weight:500;line-height:1.5;color:var(--text-secondary)}',
      '.ms7c-rule svg{flex-shrink:0;margin-top:2px}',
      '.ms7c-facts{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:8px}',
      '.ms7c-fact{display:flex;align-items:center;gap:4px;min-height:54px;padding:8px 6px 8px 12px;border-radius:10px;background:var(--surface-muted);min-width:0}',
      '.ms7c-fact-v{font-size:14px;font-weight:600;letter-spacing:-.005em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px}',
      '.ms7c-fact-v.is-mono{font-family:var(--font-mono);font-size:13px}',
      '.ms7c-fact-v.is-soft{font-weight:500;color:var(--text-secondary)}',
      '.ms7c-note{display:flex;gap:10px;align-items:flex-start;padding:10px 14px;border-radius:10px;background:var(--ms7-lime-100);color:var(--ms7-green-ink);font-size:13px;font-weight:500;line-height:1.5}',
      '.ms7c-note svg{flex-shrink:0;margin-top:2px}',
      '.ms7c-nums{display:flex;gap:6px 22px;flex-wrap:wrap;justify-content:flex-end}',
      '.ms7c-stat{text-align:right;min-width:0}',
      '.ms7c-stat-l{font-size:11.5px;font-weight:600;color:var(--text-secondary);margin-bottom:2px;white-space:nowrap}',
      '.ms7c-stat-v{font-size:15px;font-weight:600;letter-spacing:-.01em;white-space:nowrap}',
      '.ms7c-title{font-size:21px;font-weight:600;letter-spacing:-.02em;line-height:1.15;border:0;background:transparent;padding:0;cursor:pointer;color:var(--text-primary);font-family:inherit;text-align:left}',
      '.ms7c-title:hover{color:var(--text-brand)}',
      '.ms7c-foot{display:flex;gap:10px 8px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--border-subtle);padding-top:12px}',
      '.ms7c-acts{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-left:auto}',
      '.ms7c-fin{color:var(--ms7-green-ink)!important;border-color:color-mix(in oklab,var(--ms7-green) 30%,transparent)!important;background:color-mix(in oklab,var(--ms7-green) 8%,var(--surface-card))!important}',
      '.ms7c-head{display:flex;align-items:flex-start;gap:12px 14px;flex-wrap:wrap}',
      '.ms7c-head-acts{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-left:auto}',
      '.ms7c-cycle{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:999px;border:1px solid var(--line);background:var(--surface-card);font-size:12.5px;font-weight:500;color:var(--text-secondary);white-space:nowrap;max-width:100%}',
      '.ms7c-cycle span{overflow:hidden;text-overflow:ellipsis}',
      '.ms7c-sec-title{display:flex;align-items:center;gap:10px;font-size:16px;font-weight:600;letter-spacing:-.015em}',
      '.ms7c-grp{display:flex;flex-direction:column;gap:8px;padding:12px 14px;border-radius:12px;background:var(--surface-muted);min-width:0}',
      '.ms7c-grp-bank{font-size:12.5px;font-weight:500;color:var(--text-secondary)}',
      '.ms7c-box{display:flex;align-items:center;gap:8px;height:36px;padding:0 10px;border-radius:10px;border:1px solid var(--line);background:var(--surface-card);transition:border-color var(--dur-fast),box-shadow var(--dur-base)}',
      '.ms7c-box:hover{border-color:var(--line-strong)}',
      '.ms7c-box:focus-within{border-color:var(--ms7-green-900);box-shadow:0 0 0 3px color-mix(in oklab,var(--ms7-green-900) 16%,transparent)}',
      '.ms7c-box input{flex:1;min-width:0;height:30px;border:0;background:transparent;font-family:inherit;font-size:13px;font-weight:500;color:var(--text-primary);outline:none}',
      '.ms7c-box input::placeholder{color:var(--ms7-gray-400)}',
      '.ms7c-qd{width:46px;height:26px;border:0;border-radius:7px;background:var(--surface-muted);text-align:center;font-family:inherit;font-size:13px;font-weight:600;color:var(--text-primary);outline:none}',
      '.ms7c-link{display:inline-flex;align-items:center;gap:4px;height:28px;padding:0 10px;border-radius:8px;border:1px solid var(--line);background:var(--surface-card);color:var(--text-primary);font:600 12px var(--font-sans);cursor:pointer;white-space:nowrap;transition:border-color var(--dur-fast),background var(--dur-fast)}',
      '.ms7c-link:hover{border-color:var(--line-strong);background:var(--surface-muted)}',
      '.ms7c-wrap{overflow:auto;max-height:calc(100vh - 220px)}',
      '.ms7c-table{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed;font-family:var(--font-sans)}',
      '.ms7c-table th{height:38px;padding:0 8px;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--text-secondary);text-align:left;border-bottom:1px solid var(--line);white-space:nowrap;background:var(--surface-card);position:sticky;top:0;z-index:1}',
      '.ms7c-table td{padding:5px 5px;border-bottom:1px solid var(--border-subtle);white-space:nowrap;vertical-align:middle;transition:background var(--dur-fast)}',
      '.ms7c-table tbody tr:not(.is-on):not(.is-ck):hover td{background:var(--surface-muted)}',
      '.ms7c-table tbody tr.is-on td{background:var(--ms7-lime-100)}',
      '.ms7c-table tbody tr.is-on td:first-child{box-shadow:inset 3px 0 0 var(--ms7-green-900)}',
      '.ms7c-table tbody tr.is-ck td{background:color-mix(in oklab,var(--ms7-lime-500) 12%,var(--surface-card))}',
      '.ms7c-table tbody tr.is-bloq:not(.is-on) td{background:color-mix(in oklab,var(--ms7-error) 6%,var(--surface-card))}',
      '.ms7c-table tfoot td{height:44px;padding:0 10px;font-size:13px;font-weight:600;background:var(--surface-muted);position:sticky;bottom:0;border-top:1px solid var(--line);border-bottom:0;font-variant-numeric:tabular-nums}',
      '.ms7c-n{font-size:12px;font-weight:600;color:var(--text-secondary);font-variant-numeric:tabular-nums}',
      '.ms7c-r{display:inline-flex;width:18px;height:18px;border-radius:5px;align-items:center;justify-content:center;background:var(--ms7-lime-500);color:var(--text-on-lime);font-size:10px;font-weight:700}',
      '.ms7c-cell{width:100%;box-sizing:border-box;height:34px;padding:0 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface-card);font-family:var(--font-sans);font-size:13px;font-weight:500;color:var(--text-primary);text-align:left;outline:none;font-variant-numeric:tabular-nums;transition:border-color var(--dur-fast),box-shadow var(--dur-base)}',
      '.ms7c-cell:hover{border-color:var(--line-strong)}',
      '.ms7c-cell:focus{border-color:var(--ms7-green-900);box-shadow:0 0 0 3px color-mix(in oklab,var(--ms7-green-900) 16%,transparent)}',
      '.ms7c-cell::placeholder{color:var(--ms7-gray-400)}',
      '.ms7c-cell.is-b{font-weight:600}.ms7c-cell.is-r{text-align:right}.ms7c-cell.is-muted{color:var(--text-secondary)}',
      '.ms7c-cell.is-ro,.ms7c-cell.is-ro:hover,.ms7c-cell.is-ro:focus{border-color:transparent!important;box-shadow:none!important;background:transparent;cursor:default}',
      '.ms7c-selw{position:relative;display:flex;align-items:center;min-width:0}',
      '.ms7c-sel{width:100%;box-sizing:border-box;height:34px;padding:0 26px 0 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface-card);font-family:var(--font-sans);font-size:12.5px;font-weight:600;color:var(--text-primary);cursor:pointer;outline:none;text-overflow:ellipsis;appearance:none;-webkit-appearance:none;transition:border-color var(--dur-fast),box-shadow var(--dur-base)}',
      '.ms7c-sel:hover{border-color:var(--line-strong)}',
      '.ms7c-sel:focus{border-color:var(--ms7-green-900);box-shadow:0 0 0 3px color-mix(in oklab,var(--ms7-green-900) 16%,transparent)}',
      '.ms7c-selw .ms7c-chev{position:absolute;right:8px;pointer-events:none;display:flex;color:var(--text-secondary)}',
      '.ms7c-res{text-align:right;padding:0 6px;font-size:13.5px;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}',
      '.ms7c-eye{position:absolute;right:4px;border:0;background:transparent;cursor:pointer;display:flex;padding:4px;color:var(--text-secondary);border-radius:6px}',
      '.ms7c-eye:hover{background:var(--surface-muted)}',
      '.ms7c-add{width:100%;box-sizing:border-box;height:40px;padding:0 10px;border:0;background:transparent;font-family:var(--font-sans);font-size:13px;font-weight:500;color:var(--text-primary);outline:none}',
      '.ms7c-add::placeholder{color:var(--ms7-gray-400)}',
      '.ms7c-blk{padding:8px 10px 10px;border-bottom:1px solid var(--border-subtle)}',
      '.ms7c-blk.is-on{background:var(--ms7-lime-100);box-shadow:inset 3px 0 0 var(--ms7-green-900)}',
      '.ms7c-blk.is-bloq:not(.is-on){background:color-mix(in oklab,var(--ms7-error) 6%,var(--surface-card))}',
      '.ms7c-blk-k{font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--text-secondary);padding:4px 10px 0}',
      '.ms7c-chip{display:inline-flex;align-items:center;height:32px;border-radius:999px;border:1px solid var(--line);background:var(--surface-card);overflow:hidden;transition:border-color var(--dur-fast),background var(--dur-fast)}',
      '.ms7c-chip.is-on{border-color:var(--ms7-green-900);background:var(--ms7-lime-100)}',
      '.ms7c-chip>button{height:100%;border:0;background:transparent;font-family:inherit;cursor:pointer;color:var(--text-primary)}',
      '.ms7c-chip>button:first-child{padding:0 4px 0 12px;font-size:13px;font-weight:600;line-height:1}',
      '.ms7c-chip>button:last-child{width:28px;display:flex;align-items:center;justify-content:center;color:var(--text-secondary)}',
      '.ms7c-chip.is-on>button:first-child{color:var(--ms7-green-ink)}',
      '.ms7c-opt{height:38px;min-width:60px;padding:0 14px;border-radius:10px;border:1px solid var(--line);background:var(--surface-card);color:var(--text-primary);font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:border-color var(--dur-fast),background var(--dur-fast)}',
      '.ms7c-opt:hover{border-color:var(--line-strong)}',
      '.ms7c-opt.is-on{border-color:var(--ms7-green-900);background:var(--ms7-lime-100);color:var(--ms7-green-ink)}',
      '.ms7c-grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}',
      '.ms7c-hint{font-size:12.5px;font-weight:500;line-height:1.5;color:var(--text-secondary)}',
      '.ms7c-step{margin:18px 0 14px;font-size:17px;font-weight:600;letter-spacing:-.02em}',
      '.ms7c-mini{padding:10px 12px;border-radius:10px;background:var(--surface-muted);min-width:0}',
      '.ms7c-mini-v{font-size:16px;font-weight:600;letter-spacing:-.02em;font-variant-numeric:tabular-nums;margin-top:2px}',
      '.ms7c-ta{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--surface-muted);color:var(--text-primary);font:500 13.5px/1.7 var(--font-mono);resize:vertical;outline:none}',
      '.ms7c-ta:focus{border-color:var(--ms7-green-900);box-shadow:0 0 0 3px color-mix(in oklab,var(--ms7-green-900) 16%,transparent)}',
      '.ms7c-gname{font-size:13px;font-weight:600;letter-spacing:-.005em;color:var(--ms7-green-ink)}',
      '.ms7c-sum{position:sticky;top:0;z-index:2;margin-bottom:12px;padding:14px 16px;border-radius:12px;background:var(--ms7-lime-100);color:var(--ms7-green-ink);display:flex;flex-direction:column;gap:8px}',
      '.ms7c-lote{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--line);border-radius:12px;transition:border-color var(--dur-fast),background var(--dur-fast)}',
      '.ms7c-lote.is-on{border-color:var(--ms7-green-900);background:var(--ms7-lime-100)}',
      '.ms7c-av{display:flex;gap:12px;align-items:flex-start;margin:0 -12px;padding:12px;border-radius:10px;border-bottom:1px solid var(--border-subtle);transition:background var(--dur-fast)}',
      '.ms7c-av:last-child{border-bottom:0}.ms7c-av:hover{background:var(--surface-muted)}',
      '.ms7c-av .ms7c-av-del{opacity:0;color:var(--text-secondary);transition:opacity var(--dur-fast),background var(--dur-fast)}',
      '.ms7c-av:hover .ms7c-av-del,.ms7c-av .ms7c-av-del:focus-visible{opacity:1}',
      '@media (hover:none){.ms7c-av .ms7c-av-del{opacity:1}}',
      '.ms7c-lista{display:flex;flex-direction:column;gap:10px;padding:14px 16px;border-radius:12px;background:var(--surface-muted);min-width:0}',
      '.ms7c-lista-t{font-size:14px;font-weight:600;letter-spacing:-.005em;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '@media (max-width:760px){.ms7c-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.ms7c-kpi{padding:14px 16px}.ms7c-kpi-val{font-size:20px}.ms7c-nums{justify-content:flex-start}.ms7c-stat{text-align:left}.ms7c-acts{margin-left:0;width:100%}.ms7c-head-acts{margin-left:0;width:100%}.ms7c-title{font-size:19px}}',
    ].join('');
    document.head.appendChild(s);
  })();
  const ST_TONE = { Ativa: 'blue', 'Em andamento': 'turquoise', Finalizada: 'purple', 'Concluída': 'green', Lixeira: 'gray' };
  const ST_ICON = { 'Em andamento': 'play', 'Concluída': 'circle-check', Finalizada: 'flag', Ativa: 'circle-dot', Lixeira: 'trash-2' };
  function soX(fn) {
    return function (e) {
      if (e && e.currentTarget && e.currentTarget.tagName === 'BUTTON') fn();
    };
  }
  const CONTA_ST = ['Aguardando', 'À sacar', 'Sacado', 'Não sacado', 'Bloqueado'];
  function gSel(dbx, c) {
    if (c.pixGrupos && c.pixGrupos.length) return c.pixGrupos;
    const s = [];
    (dbx.coops || []).forEach(function (o) {
      if (
        o.id !== c.id &&
        o.opId === c.opId &&
        ['Ativa', 'Em andamento'].indexOf(o.status) >= 0 &&
        DB.platNorm(o.plataforma) === DB.platNorm(c.plataforma)
      )
        (o.pixGrupos || []).forEach(function (id) {
          if (s.indexOf(id) < 0) s.push(id);
        });
    });
    return s;
  }
  function limpaCh(k) {
    const v = String(k.valor || '').trim();
    if (/@/.test(v)) return v;
    if (/^(cpf|cnpj|tel|telefone|celular|phone)$/i.test(String(k.tipo || '')) || /^[\d\s().+\-\/]+$/.test(v)) return v.replace(/\D/g, '');
    return v;
  }
  function chNorm(v) {
    v = String(v || '').trim();
    if (/@/.test(v)) return v.toLowerCase();
    const d = v.replace(/\D/g, '');
    if (d.length >= 10 && /^[\d\s().+\-\/]+$/.test(v)) return d.length >= 12 && d.indexOf('55') === 0 ? d.slice(2) : d;
    return v.toLowerCase();
  }
  function chavesUsadas(dbx, c, exceptId) {
    const P = DB.platNorm(c.plataforma);
    const s = {};
    (dbx.coops || []).forEach(function (o) {
      if (o.status === 'Lixeira') return;
      if (o.id !== c.id && DB.platNorm(o.plataforma) !== P) return;
      (o.contas || []).forEach(function (k) {
        if (k.pix && !(o.id === c.id && k.id === exceptId)) s[chNorm(k.pix)] = 1;
      });
    });
    return s;
  }
  function gruposDaCoop(c) {
    const dbx = DB.get();
    const gpc = PIXV.gp(dbx, c.plataforma) || 'Geral';
    const grupos = DB.pixOrd(
      gSel(dbx, c).length
        ? (dbx.pix || []).filter(function (g) {
            return g.ativo !== false && gSel(dbx, c).indexOf(g.id) >= 0;
          })
        : (dbx.pix || []).filter(function (g) {
            return (
              g.ativo !== false &&
              !(dbx.coops || []).some(function (o) {
                return (
                  o.id !== c.id &&
                  o.opId !== c.opId &&
                  ['Ativa', 'Em andamento'].indexOf(o.status) >= 0 &&
                  DB.platNorm(o.plataforma) === DB.platNorm(c.plataforma) &&
                  (o.pixGrupos || []).indexOf(g.id) >= 0
                );
              }) &&
              (!g.opId || g.opId === c.opId) &&
              (!g.plataforma || g.plataforma === c.plataforma || g.plataforma === gpc)
            );
          }),
    );
    const usd = chavesUsadas(dbx, c, null);
    return {
      gpc: gpc,
      lista: grupos
        .map(function (g) {
          return {
            g: g,
            ks: g.chaves
              .filter(function (k) {
                return PIXV.st(k, gpc).status === 'disponivel' && !usd[chNorm(k.valor)];
              })
              .map(limpaCh),
          };
        })
        .filter(function (x) {
          return x.ks.length;
        }),
    };
  }
  function copiaTexto(txt, n) {
    const ok = function () {
      toast(n + (n === 1 ? ' chave copiada' : ' chaves copiadas'));
    };
    function fb() {
      const t = document.createElement('textarea');
      t.value = txt;
      document.body.appendChild(t);
      t.select();
      try {
        document.execCommand('copy');
        ok();
      } catch (e) {
        toast('Selecione e copie manualmente');
      }
      document.body.removeChild(t);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, fb);
    else fb();
  }
  function ChavesModal({ c, onClose }) {
    const { Modal, Button } = DS;
    const r = gruposDaCoop(c);
    const tot = r.lista.reduce(function (a, x) {
      return a + x.ks.length;
    }, 0);
    const all = r.lista
      .map(function (x) {
        return x.ks.join('\n');
      })
      .join('\n');
    return (
      <Modal
        open={true}
        onClose={onClose}
        title={tot + (tot === 1 ? ' chave PIX disponível' : ' chaves PIX disponíveis')}
        subtitle={DB.coopNome(c) + ' · separadas por grupo, uma por linha'}
        footer={
          <React.Fragment>
            <Button variant="secondary" onClick={onClose}>
              Fechar
            </Button>
            <Button
              variant="brand"
              iconLeft="copy"
              disabled={!tot}
              onClick={function () {
                copiaTexto(all, tot);
              }}
            >
              {'Copiar todas (' + tot + ')'}
            </Button>
          </React.Fragment>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {r.lista.map(function (x) {
            const t = x.ks.join('\n');
            return (
              <div key={x.g.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="ms7c-gname">{x.g.pagamento || x.g.nome}</div>
                    <div className="ms7c-hint">
                      {(x.g.pagamento ? x.g.nome + ' · ' : '') + x.ks.length + (x.ks.length === 1 ? ' chave' : ' chaves')}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    iconLeft="copy"
                    onClick={function () {
                      copiaTexto(t, x.ks.length);
                    }}
                  >
                    {'Copiar ' + x.ks.length}
                  </Button>
                </div>
                <textarea
                  className="ms7c-ta"
                  readOnly
                  value={t}
                  onFocus={function (e) {
                    e.target.select();
                  }}
                  rows={Math.min(14, Math.max(3, x.ks.length))}
                ></textarea>
              </div>
            );
          })}
          {!tot ? (
            <Empty art="Keys" compact title="Nenhuma chave disponível para esta cooperação" sub={'Escolha os grupos de chaves PIX dentro da cooperação.'} />
          ) : null}
        </div>
      </Modal>
    );
  }
  function cpTxt(t, msg) {
    const ok = function () {
      toast(msg || 'Copiado');
    };
    function fb() {
      const x = document.createElement('textarea');
      x.value = t;
      document.body.appendChild(x);
      x.select();
      try {
        document.execCommand('copy');
        ok();
      } catch (e) {}
      document.body.removeChild(x);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, fb);
    else fb();
  }
  function CopyBtn({ t, msg }) {
    return t ? (
      <button
        type="button"
        title="Copiar"
        onClick={function (e) {
          e.stopPropagation();
          cpTxt(t, msg);
        }}
        style={{ display: 'inline-flex', padding: 3, border: 0, background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}
      >
        <DS.Icon name="copy" size={14} />
      </button>
    ) : null;
  }
  function CoopCard({ c, onOpen, canAdmin }) {
    const { IconButton } = DS;
    const k = DB.calc(c);
    const [ed, setEd] = React.useState(false);
    const [tr, setTr] = React.useState(false);
    const [chv, setChv] = React.useState(false);
    const [ver, setVer] = React.useState(false);
    const acts =
      c.status === 'Concluída'
        ? canAdmin
          ? [['rotate-ccw', 'Reabrir', 'Em andamento']]
          : []
        : c.status === 'Lixeira'
          ? [['undo-2', 'Restaurar', 'Ativa']]
          : c.status === 'Ativa'
            ? [
                ['play', 'Iniciar', 'Em andamento'],
                ['flag', 'Finalizar', 'Finalizada'],
              ]
            : c.status === 'Finalizada'
              ? canAdmin
                ? [
                    ['undo-2', 'Devolver', 'Em andamento'],
                    ['circle-check', 'Concluir', 'Concluída'],
                  ]
                : []
              : [['flag', 'Finalizar', 'Finalizada']];
    const cm = c.contaMae || {};
    const lk = cm.link ? (/^https?:/i.test(cm.link) ? cm.link : 'https://' + cm.link) : '';
    const stTone = ST_TONE[c.status] || 'gray';
    const pill = function (txt, tone, icon) {
      return (
        <DS.Badge tone={tone}>
          {icon ? <DS.Icon name={icon} size={12} strokeWidth={2.2} /> : null}
          {txt}
        </DS.Badge>
      );
    };
    const V = DB.contasValidas(c);
    const grp = function (st) {
      const l = V.filter(function (x) {
        return x.status === st;
      });
      return [
        l.length,
        l.reduce(function (a, x) {
          return a + (+x.saque || 0);
        }, 0),
      ];
    };
    const gA = grp('À sacar'),
      gS = grp('Sacado'),
      gB = grp('Bloqueado');
    const hora = c.criadaEm ? new Date(c.criadaEm).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';
    const fin = acts.find(function (x) {
      return x[2] === 'Finalizada' || x[2] === 'Concluída';
    });
    const outros = acts.filter(function (x) {
      return x !== fin;
    });
    return (
      <div
        className="ms7-card ms7-hover-card"
        style={{
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          opacity: c.status === 'Lixeira' ? 0.6 : 1,
        }}
      >
        <div style={{ display: 'flex', gap: '12px 24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 320px', minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <button type="button" className="ms7c-title" onClick={onOpen}>
              {DB.coopNome(c)}
            </button>
            {c.linkN ? pill(c.linkN, 'blue', 'link') : null}
            {pill(c.status, stTone, ST_ICON[c.status] || null)}
            {pill((c.depositantes || c.contas.length) + ' depositantes', 'gray', 'users')}
            {c.rollover ? pill(c.rollover, 'yellow', 'target') : null}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)' }}>
              <DS.Icon name="calendar" size={13} />
              {DB.fmtDate(c.inicio) + (hora ? ' ' + hora : '')}
            </span>
          </div>
          <div className="ms7c-nums">
            {[
              ['Depósito', k.dep, null],
              ['Re-depósito', k.red, null],
              ['Saque', k.saq, null],
              [k.lucro >= 0 ? 'Resultado' : 'Resultado', k.lucro, k.lucro >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)'],
            ].map(function (x) {
              return (
                <div key={x[0]} className="ms7c-stat">
                  <div className="ms7c-stat-l">{x[0]}</div>
                  <div className="ms7c-stat-v ms7-num" style={{ color: x[2] || 'var(--text-primary)' }}>
                    {MS7.brl(x[1])}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {(function () {
          const cid = cm.id || DB.linkId(cm.link);
          const icb = function (icon, label, fn) {
            return <DS.IconButton key={label} icon={icon} label={label} size={28} iconSize={14} onClick={fn} style={{ color: 'var(--text-secondary)' }} />;
          };
          const F = [['Operador', DB.opName(c.opId), null, []]];
          if (!c.proprio) F.push(['Comissão', MS7.brl(k.com), null, []]);
          if (cm.usuario)
            F.push([
              'Conta mãe',
              cm.usuario,
              null,
              [
                icb('copy', 'Copiar usuário', function () {
                  cpTxt(cm.usuario, 'Usuário copiado');
                }),
              ],
            ]);
          if (cm.senha)
            F.push([
              'Senha',
              ver ? cm.senha : '••••••••',
              null,
              [
                icb(ver ? 'eye-off' : 'eye', ver ? 'Esconder senha' : 'Ver senha', function () {
                  setVer(!ver);
                }),
                icb('copy', 'Copiar senha', function () {
                  cpTxt(cm.senha, 'Senha copiada');
                }),
              ],
            ]);
          if (cid)
            F.push([
              'ID',
              cid,
              null,
              [
                icb('copy', 'Copiar ID', function () {
                  cpTxt(cid, 'ID copiado');
                }),
              ],
              1,
            ]);
          if (lk)
            F.push([
              'Link da conta mãe',
              '',
              null,
              [
                icb('external-link', 'Abrir link', function () {
                  window.open(lk, '_blank', 'noopener');
                }),
                icb('copy', 'Copiar link', function () {
                  cpTxt(lk, 'Link copiado');
                }),
              ],
            ]);
          if (c.linkDiv)
            F.push([
              'Divulgação',
              '',
              null,
              [
                icb('copy', 'Copiar link de divulgação', function () {
                  cpTxt(c.linkDiv, 'Link de divulgação copiado');
                }),
              ],
            ]);
          return (
            <div className="ms7c-facts">
              {F.map(function (x) {
                return (
                  <div key={x[0]} className="ms7c-fact">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="ms7-eyebrow">{x[0]}</div>
                      {x[1] ? (
                        <div className={'ms7c-fact-v ms7-num' + (x[4] ? ' is-mono' : '')} title={x[0] === 'Senha' ? '' : x[1]}>
                          {x[1]}
                          {x[2] ? <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>{' · ' + x[2]}</span> : null}
                        </div>
                      ) : (
                        <div className="ms7c-fact-v is-soft">Abrir ou copiar</div>
                      )}
                    </div>
                    {x[3]}
                  </div>
                );
              })}
            </div>
          );
        })()}
        {c.descricao ? (
          <div className="ms7c-note">
            <DS.Icon name="megaphone" size={15} />
            <span style={{ whiteSpace: 'pre-line', minWidth: 0 }}>{c.descricao}</span>
          </div>
        ) : null}
        <div className="ms7c-foot">
          <span className="ms7-eyebrow">Contas</span>
          {[
            ['À sacar', gA, 'orange'],
            ['Sacado', gS, 'green'],
            ['Bloqueado', gB, 'error'],
          ].map(function (x) {
            return (
              <DS.Badge key={x[0]} tone={x[2]} variant="soft">
                {x[0] + ' ' + x[1][0]}
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{'· ' + MS7.brl(x[1][1])}</span>
              </DS.Badge>
            );
          })}
          {c.status === 'Finalizada' && !canAdmin ? (
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ms7-orange)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <DS.Icon name="hourglass" size={14} />
              Aguardando análise do admin
            </span>
          ) : null}
          <div className="ms7c-acts">
          {c.status !== 'Lixeira' ? (
            <IconButton
              icon="key-round"
              label="Copiar chaves PIX por grupo"
              size={34}
              iconSize={16}
              onClick={function () {
                setChv(true);
              }}
            />
          ) : null}
          {canAdmin && c.status !== 'Lixeira' ? (
            <IconButton
              icon="pencil"
              label="Editar (plataforma, operador, salário…)"
              size={34}
              iconSize={16}
              onClick={function () {
                setEd(true);
              }}
            />
          ) : null}
          {canAdmin && c.status !== 'Lixeira' && DB.A.pendentesDe(c.id).length ? (
            <IconButton
              icon="arrow-right-left"
              label="Passar as contas que faltam para outro operador"
              size={34}
              iconSize={16}
              onClick={function () {
                setTr(true);
              }}
            />
          ) : null}
          {tr ? (
            <TransferirModal
              c={c}
              onClose={function () {
                setTr(false);
              }}
            />
          ) : null}
          {canAdmin && c.status !== 'Lixeira' ? (
            <IconButton
              icon="trash-2"
              label="Mover para lixeira"
              size={34}
              iconSize={16}
              onClick={function () {
                DB.A.setStatus(c.id, 'Lixeira');
              }}
            />
          ) : null}
          {outros.map(function (x) {
            return (
              <DS.Button
                key={x[1]}
                size="sm"
                variant="secondary"
                iconLeft={x[0]}
                onClick={function () {
                  DB.A.setStatus(c.id, x[2]);
                }}
              >
                {x[1]}
              </DS.Button>
            );
          })}
          {fin ? (
            <DS.Button
              size="sm"
              variant="outline"
              className="ms7c-fin"
              iconLeft={fin[0]}
              onClick={function () {
                DB.A.setStatus(c.id, fin[2]);
              }}
            >
              {fin[1]}
            </DS.Button>
          ) : null}
          <DS.Button size="sm" variant="outline" iconRight="arrow-right" onClick={onOpen}>
            Abrir
          </DS.Button>
          </div>
          {chv ? (
            <ChavesModal
              c={c}
              onClose={function () {
                setChv(false);
              }}
            />
          ) : null}
          {canAdmin ? (
            <EditCoop
              c={c}
              open={ed}
              onClose={function () {
                setEd(false);
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
  function CoopWizard({ open, onClose, session, bau, meu }) {
    const PR_KEY = 'ms7op-plat-recentes';
    const [platRec, setPlatRec] = React.useState(function () {
      try {
        const v = JSON.parse(localStorage.getItem(PR_KEY) || '[]');
        return Array.isArray(v) ? v : [];
      } catch (e) {
        return [];
      }
    });
    const gravaPlat = function (l) {
      setPlatRec(l);
      try {
        localStorage.setItem(PR_KEY, JSON.stringify(l));
      } catch (e) {}
    };
    const redeDe = function (p) {
      const n = DB.platNorm(String(p || '').replace(/\s*[-·|]?\s*link\s*\d+\s*$/i, ''));
      if (!n) return '';
      const l = (DB.get().coops || []).filter(function (x) {
        return x.rede && DB.platNorm(x.plataforma) === n;
      });
      if (!l.length) return '';
      const num = function (x) {
        return +String(x.id || '').replace(/\D/g, '') || 0;
      };
      l.sort(function (a, b) {
        const da = String(a.inicio || ''),
          db2 = String(b.inicio || '');
        if (da !== db2) return db2 < da ? -1 : 1;
        return num(b) - num(a);
      });
      return l[0].rede;
    };
    const setPlat = function (p) {
      const r = redeDe(p);
      setF(function (x) {
        const n = Object.assign({}, x, { plataforma: p });
        if (r) n.rede = r;
        return n;
      });
    };
    const tiraPlat = function (p) {
      gravaPlat(
        platRec.filter(function (x) {
          return x !== p;
        }),
      );
    };
    const guardaPlat = function (p) {
      p = String(p || '')
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\s*[-·|]?\s*link\s*\d+\s*$/i, '')
        .trim();
      if (!p) return;
      gravaPlat(
        [p]
          .concat(
            platRec.filter(function (x) {
              return DB.platNorm(x) !== DB.platNorm(p);
            }),
          )
          .slice(0, 12),
      );
    };
    const { Modal, Stepper, Select, Input, Button, Tabs } = DS;
    const db = DB.get();
    const semOp = !!window.ms7SemOp || !!meu;
    const st0 = semOp ? 2 : 1;
    const [step, setStep] = React.useState(st0);
    const init = function () {
      const oid = session.role === 'operador' ? session.opId : ((db.operadores || [])[0] || {}).id || '';
      const o0 =
        (db.operadores || []).find(function (x) {
          return x.id === oid;
        }) || {};
      return semOp
        ? { opId: '', comTipo: 'fixo', comValor: '0', plataforma: '', rede: '', qtd: '20', cliente: '' }
        : {
            opId: oid,
            comTipo: o0.comTipo || 'pct',
            comValor: String(o0.comValor != null ? o0.comValor : o0.pct != null ? o0.pct : 15),
            plataforma: '',
            rede: '',
            qtd: '20',
            cliente: '',
          };
    };
    const [f, setF] = React.useState(init);
    const [novo, setNovo] = React.useState({ col: null, v: '' });
    React.useEffect(
      function () {
        if (open) {
          setF(init());
          setStep(st0);
          setNovo({ col: null, v: '' });
        }
      },
      [open],
    );
    React.useEffect(
      function () {
        setF(function (p) {
          const n = Object.assign({}, p);
          if (
            n.rede &&
            !db.redes.some(function (x) {
              return x.nome === n.rede;
            })
          )
            n.rede = (db.redes[0] || {}).nome || '';
          return n;
        });
      },
      [db.plataformas.length, db.redes.length],
    );
    function pick(k, col) {
      return function (e) {
        const v = e.target.value;
        if (v === '__new') {
          setNovo({ col: col, v: '' });
          return;
        }
        u(k)(e);
      };
    }
    function criar() {
      const nome = String(novo.v || '').trim();
      if (!nome) return;
      DB.A.addLista(novo.col, nome);
      const k = novo.col === 'plataformas' ? 'plataforma' : 'rede';
      setF(function (p) {
        const n = Object.assign({}, p);
        n[k] = nome;
        return n;
      });
      setNovo({ col: null, v: '' });
    }
    function NovoBox(col) {
      if (novo.col !== col) return null;
      return (
        <div
          style={{
            gridColumn: '1 / -1',
            display: 'flex',
            gap: 8,
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            padding: 12,
            borderRadius: 12,
            background: 'var(--surface-muted)',
          }}
        >
          <div
            style={{ flex: 1 }}
            onKeyDown={function (e) {
              if (e.key === 'Enter') criar();
            }}
          >
            <Input
              label={col === 'plataformas' ? 'Nova plataforma' : 'Nova rede'}
              value={novo.v}
              onChange={function (e) {
                setNovo({ col: col, v: e.target.value });
              }}
              placeholder={col === 'plataformas' ? 'Nome da plataforma' : 'Nome da rede'}
            />
          </div>
          <Button variant="brand" iconLeft="plus" onClick={criar}>
            Adicionar
          </Button>
          <Button
            variant="secondary"
            onClick={function () {
              setNovo({ col: null, v: '' });
            }}
          >
            Cancelar
          </Button>
        </div>
      );
    }
    function next() {
      if (step === 2 && !f.plataforma) {
        toast('Digite o nome da plataforma');
        return;
      }
      setStep(step + 1);
    }
    const u = function (k) {
      return function (e) {
        const v = e && e.target ? e.target.value : e;
        setF(function (p) {
          const n = Object.assign({}, p);
          n[k] = v;
          if (k === 'comTipo') {
            n.comValor = { pct: '15', conta: '25', fixo: '900', misto: '50' }[v];
            n.comConta = v === 'misto' ? '2' : '';
          }
          if (k === 'opId') {
            const o = (db.operadores || []).find(function (x) {
              return x.id === v;
            });
            if (o) {
              n.comTipo = ['pct', 'conta', 'fixo'].indexOf(o.comTipo) >= 0 ? o.comTipo : 'pct';
              n.comValor = String(o.comValor != null ? o.comValor : o.pct != null ? o.pct : 15);
              n.comConta = o.comConta != null ? String(o.comConta) : '';
            }
          }
          return n;
        });
      };
    };
    function close() {
      setStep(st0);
      setF(init());
      onClose();
    }
    const est = (+f.qtd || 0) * (parseFloat(String(f.mediaDep || '').replace(',', '.')) || 0);
    const falta = [!String(f.plataforma || '').trim() ? 'plataforma' : null, !f.rede ? 'rede' : null].filter(Boolean);
    const prev =
      f.comTipo === 'misto'
        ? 'Ex.: 45 contas → ' +
          MS7.brl(parseFloat(String(f.comValor).replace(',', '.')) || 0) +
          ' + 45 × ' +
          MS7.brl(parseFloat(String(f.comConta || '').replace(',', '.')) || 0) +
          ' = ' +
          MS7.brl((parseFloat(String(f.comValor).replace(',', '.')) || 0) + 45 * (parseFloat(String(f.comConta || '').replace(',', '.')) || 0))
        : f.comTipo === 'pct'
          ? 'Ex.: resultado de R$ 4.000 → comissão de ' + MS7.brl((4000 * (parseFloat(f.comValor) || 0)) / 100)
          : f.comTipo === 'conta'
            ? 'Ex.: 10 contas → comissão de ' + MS7.brl(10 * (parseFloat(f.comValor) || 0))
            : 'Valor total que o operador recebe por esta cooperação (todas as contas): ' +
              MS7.brl(parseFloat(String(f.comValor).replace(',', '.')) || 0);
    return (
      <Modal
        open={open}
        onClose={soX(close)}
        title={bau ? 'Novo baú' : 'Nova cooperação'}
        size="md"
        footer={
          <React.Fragment>
            <Button
              variant={step === st0 ? 'ghost' : 'outline'}
              iconLeft={step === st0 ? undefined : 'arrow-left'}
              onClick={function () {
                step === st0 ? close() : setStep(step - 1);
              }}
            >
              {step === st0 ? 'Cancelar' : 'Voltar'}
            </Button>
            {step < 3 ? (
              <Button variant="primary" iconRight="arrow-right" onClick={next}>
                Próxima etapa
              </Button>
            ) : (
              <Button
                variant="brand"
                iconLeft="check"
                onClick={function () {
                  if (!f.opId && !semOp) {
                    toast('Cadastre um operador em Gestão → Operadores antes de criar a cooperação');
                    return;
                  }
                  guardaPlat(f.plataforma);
                  DB.A.createCoop(
                    Object.assign(
                      {},
                      f,
                      { tipo: bau ? 'bau' : 'coop' },
                      meu || f.opId === '__eu' ? { proprio: true, opId: '', comTipo: 'fixo', comValor: '0', comConta: '' } : {},
                    ),
                  );
                  close();
                }}
              >
                {meu ? 'Criar minha cooperação' : bau ? 'Criar baú' : 'Criar cooperação'}
              </Button>
            )}
          </React.Fragment>
        }
      >
        {semOp ? null : <Stepper steps={3} current={step} />}
        <h4 className="ms7c-step">{['Comissão', 'Informações', 'Valores'][step - 1]}</h4>
        {step === 1 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {session.role !== 'operador' ? (
              <Select
                label="Operador"
                required
                value={f.opId}
                onChange={u('opId')}
                options={[{ value: '__eu', label: 'Eu (admin) · sem operador' }].concat(
                  db.operadores
                    .filter(function (o) {
                      return o.ativo;
                    })
                    .map(function (o) {
                      return { value: o.id, label: o.nome };
                    }),
                )}
              />
            ) : null}
            {f.opId === '__eu' ? (
              <div className="ms7c-note">
                <DS.Icon name="info" size={15} />
                <span>Cooperação sua: sem operador e sem comissão. Fica junto das outras em Cooperações e entra no lucro total.</span>
              </div>
            ) : null}
            {f.opId === '__eu' ? null : <div className="ms7-label">Tipo de comissão</div>}
            {f.opId === '__eu' ? null : (
              <Tabs
                value={f.comTipo}
                onChange={u('comTipo')}
                items={[
                  { id: 'pct', label: '% do lucro' },
                  { id: 'conta', label: 'Valor por conta' },
                  { id: 'fixo', label: 'Valor fixo' },
                ]}
              />
            )}
            {f.opId === '__eu' ? null : f.comTipo === 'misto' ? (
              <div className="ms7c-grid2" style={{ gap: 12 }}>
                <Input label="Valor fixo" prefix="R$" value={f.comValor} onChange={u('comValor')} />
                <Input label="Mais por conta" prefix="R$" value={f.comConta || ''} onChange={u('comConta')} />
                <div className="ms7c-hint" style={{ gridColumn: '1 / -1' }}>
                  {prev}
                </div>
              </div>
            ) : (
              <Input
                label={f.comTipo === 'pct' ? 'Percentual do lucro' : f.comTipo === 'conta' ? 'Valor por conta' : 'Valor fixo da cooperação'}
                prefix={f.comTipo === 'pct' ? '%' : 'R$'}
                value={f.comValor}
                onChange={u('comValor')}
                hint={prev}
              />
            )}
          </div>
        ) : null}
        {step === 2 ? (
          <div className="ms7c-grid2">
            <Select
              label="Rede"
              value={f.rede}
              onChange={pick('rede', 'redes')}
              options={[{ value: '', label: db.redes.length ? 'Sem rede' : 'Nenhuma rede cadastrada' }]
                .concat(
                  db.redes.map(function (r) {
                    return { value: r.nome, label: r.nome };
                  }),
                )
                .concat([{ value: '__new', label: '+ Cadastrar nova rede' }])}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Input
                label="Plataforma"
                required
                placeholder="Ex.: Azul 777"
                value={f.plataforma}
                onChange={function (e) {
                  setPlat(e.target.value);
                }}
                hint={
                  redeDe(f.plataforma)
                    ? 'Rede escolhida sozinha: ' + redeDe(f.plataforma) + ' (usada antes nesta plataforma)'
                    : 'Primeira vez: escolha a rede. Nas próximas ela\u00a0vem\u00a0sozinha.'
                }
              />
              {platRec.length ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {platRec.map(function (p) {
                    const on = DB.platNorm(p) === DB.platNorm(f.plataforma);
                    return (
                      <span key={p} className={'ms7c-chip' + (on ? ' is-on' : '')}>
                        <button
                          type="button"
                          onClick={function () {
                            setPlat(p);
                          }}
                        >
                          {p}
                        </button>
                        <button
                          type="button"
                          aria-label={'Tirar ' + p}
                          title="Tirar da lista"
                          onClick={function () {
                            tiraPlat(p);
                          }}
                        >
                          <DS.Icon name="x" size={14} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <Input
              label="Link"
              placeholder={f.opId && f.opId !== '__eu' ? 'Automático: ' + DB.proxLink(f.opId) : 'Automático (Link 1, 2, 3…)'}
              value={f.linkN || ''}
              onChange={u('linkN')}
              hint="Em branco: numera sozinho por operador"
            />
            {NovoBox('redes')}
            <Input label="Qtd. depositantes" type="number" value={f.qtd} onChange={u('qtd')} />
            <Input label="Link da conta mãe" icon="link" placeholder="https://" value={f.link || ''} onChange={u('link')} />
            <Input label="Usuário da conta mãe" icon="user" placeholder="usuário" value={f.muser || ''} onChange={u('muser')} />
            <Input label="Senha da conta mãe" icon="lock" placeholder="senha" value={f.msenha || ''} onChange={u('msenha')} />
            <div style={{ gridColumn: '1 / -1' }}>
              <Input label="Nome do cliente" placeholder="Ex.: nome do blogueiro" value={f.cliente} onChange={u('cliente')} />
            </div>
          </div>
        ) : null}
        {step === 3 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input
              label="Salário"
              prefix="R$"
              placeholder="0,00"
              value={f.salario || ''}
              onChange={u('salario')}
              hint="Opcional (R$ 0,00 para comissão pura)"
            />
            <div style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Input label="Média de depósito" prefix="R$" placeholder="0,00" value={f.mediaDep || ''} onChange={u('mediaDep')} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span className="ms7-label">Apostas válidas (multiplicador)</span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['N/A', '2x', '2.5x', '3x', '3.5x', '4x'].map(function (x) {
                    const on = (f.rollover || 'N/A') === x;
                    return (
                      <button
                        key={x}
                        type="button"
                        className={'ms7c-opt' + (on ? ' is-on' : '')}
                        onClick={function () {
                          setF(function (p) {
                            return Object.assign({}, p, { rollover: x === 'N/A' ? '' : x });
                          });
                        }}
                      >
                        {x}
                      </button>
                    );
                  })}
                </div>
                {f.rollover && f.mediaDep ? (
                  <span className="ms7c-hint">
                    {'Cada conta precisa apostar ' +
                      MS7.brl((parseFloat(String(f.mediaDep).replace(',', '.')) || 0) * (parseFloat(f.rollover) || 0)) +
                      ' em apostas válidas'}
                  </span>
                ) : null}
              </div>
            </div>
            <Input
              label="Descrição das apostas (opcional)"
              placeholder="Ex: Apostas válidas entre 2x e 10x"
              value={f.descricao || ''}
              onChange={u('descricao')}
            />
          </div>
        ) : null}
      </Modal>
    );
  }
  function ContaForm({ conta, onClose, onSave }) {
    const { Modal, Input, Select, Button } = DS;
    const [f, setF] = React.useState(conta);
    const u = function (k) {
      return function (e) {
        const v = e.target.value;
        setF(function (p) {
          const n = Object.assign({}, p);
          n[k] = v;
          return n;
        });
      };
    };
    const res = (+f.saque || 0) - (+f.deposito || 0) - (+f.redeposito || 0);
    return (
      <Modal
        open={true}
        onClose={onClose}
        title={conta.id ? 'Editar conta' : 'Adicionar conta'}
        footer={
          <React.Fragment>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="brand"
              iconLeft="check"
              onClick={function () {
                if (!f.usuario) {
                  toast('Informe o usuário');
                  return;
                }
                onSave(f);
              }}
            >
              Salvar
            </Button>
          </React.Fragment>
        }
      >
        <div className="ms7c-grid2">
          <Input label="Usuário" required value={f.usuario} onChange={u('usuario')} />
          <Input label="Senha" type="password" value={f.senha} onChange={u('senha')} />
          <Input label="Depósito" prefix="R$" type="number" value={f.deposito} onChange={u('deposito')} />
          <Input label="Re-depósito" prefix="R$" type="number" value={f.redeposito} onChange={u('redeposito')} />
          <Input label="Saque" prefix="R$" type="number" value={f.saque} onChange={u('saque')} />
          <Select label="Status" value={f.status} onChange={u('status')} options={CONTA_ST} />
          <div style={{ gridColumn: '1 / -1' }}>
            <Input label="Observação" value={f.obs} onChange={u('obs')} />
          </div>
        </div>
        <div className="ms7c-mini" style={{ marginTop: 14, fontSize: 13.5, fontWeight: 500 }}>
          {'Resultado da conta: '}
          <span className="ms7-num" style={{ fontWeight: 600, color: res >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)' }}>{MS7.brl(res)}</span>
          {f.status === 'Bloqueado' ? <span style={{ color: 'var(--ms7-error)' }}> · vai gerar alerta de conta bloqueada</span> : null}
        </div>
      </Modal>
    );
  }
  const ST_COL = {
    Aguardando: 'var(--text-secondary)',
    'À sacar': 'var(--ms7-orange)',
    Sacado: 'var(--ms7-green)',
    'Não sacado': 'var(--ms7-error)',
    Bloqueado: 'var(--ms7-error)',
  };
  function Cell({ value, onCommit, placeholder, align, bold, money, secret, ro }) {
    const [v, setV] = React.useState(value == null ? '' : String(value));
    const [show, setShow] = React.useState(false);
    const [f, setF] = React.useState(false);
    React.useEffect(
      function () {
        setV(value == null ? '' : String(value));
      },
      [value],
    );
    function commit() {
      setF(false);
      if (ro) return;
      if (String(value == null ? '' : value) !== v) onCommit(v);
    }
    const shown = money && !f ? (+String(v).replace(',', '.') ? MS7.brl(+String(v).replace(',', '.')) : '') : v;
    return (
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          value={shown}
          readOnly={!!ro}
          title={ro ? 'Só o super admin altera' : undefined}
          type={secret && !show ? 'password' : 'text'}
          placeholder={placeholder}
          inputMode={money ? 'decimal' : undefined}
          onChange={function (e) {
            setV(e.target.value);
          }}
          onFocus={function (e) {
            setF(true);
            e.target.style.borderColor = 'var(--border-focus, var(--ms7-green))';
            e.target.style.boxShadow = '0 0 0 3px color-mix(in oklab, var(--border-focus, var(--ms7-green)) 22%, transparent)';
          }}
          onBlur={function (e) {
            e.target.style.borderColor = 'var(--border-default)';
            e.target.style.boxShadow = 'none';
            commit();
          }}
          onKeyDown={function (e) {
            if (e.key !== 'Enter' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
            const td = e.target.closest('td'),
              tr = td && td.parentElement;
            const up = e.key === 'ArrowUp' || (e.key === 'Enter' && e.shiftKey);
            let nx = tr && (up ? tr.previousElementSibling : tr.nextElementSibling);
            let inp = null;
            while (nx && !inp) {
              const c = nx.children[td.cellIndex];
              inp = c && nx.children.length === tr.children.length ? c.querySelector('input') : null;
              if (!inp) nx = up ? nx.previousElementSibling : nx.nextElementSibling;
            }
            if (e.key !== 'Enter' && !inp) return;
            e.preventDefault();
            e.target.blur();
            if (inp)
              setTimeout(function () {
                inp.focus();
                inp.select && inp.select();
              }, 0);
          }}
          className={
            'ms7c-cell' +
            (ro ? ' is-ro' : '') +
            (bold ? ' is-b' : '') +
            ((align || 'left') === 'right' ? ' is-r' : '') +
            (money && !+String(v).replace(',', '.') ? ' is-muted' : '')
          }
          style={secret ? { paddingRight: 30 } : undefined}
        />
        {secret && v ? (
          <button
            type="button"
            className="ms7c-eye"
            onClick={function () {
              setShow(!show);
            }}
            aria-label={show ? 'Ocultar' : 'Mostrar'}
          >
            <DS.Icon name={show ? 'eye-off' : 'eye'} size={14} />
          </button>
        ) : null}
      </div>
    );
  }
  function TransferirModal({ c, onClose }) {
    const pend = DB.A.pendentesDe(c.id);
    const ops = (DB.get().operadores || [])
      .filter(function (o) {
        return o.id !== c.opId && o.ativo !== false;
      })
      .sort(function (a, b) {
        return a.nome.localeCompare(b.nome, 'pt-BR');
      });
    const [op, setOp] = React.useState('');
    const [fin, setFin] = React.useState(true);
    const dep = pend.reduce(function (a, k) {
      return a + (+k.deposito || 0);
    }, 0);
    const nR = pend.filter(function (k) {
      return k.rolo;
    }).length;
    const feitas =
      DB.contasValidas(c).length -
      pend.filter(function (k) {
        return !k.virt;
      }).length;
    return (
      <DS.Modal
        open
        onClose={onClose}
        title="Passar contas para outro operador"
        subtitle={DB.coopNome(c) + ' · ' + DB.opName(c.opId)}
        size="sm"
        footer={
          <React.Fragment>
            <DS.Button variant="secondary" onClick={onClose}>
              Cancelar
            </DS.Button>
            <DS.Button
              variant="brand"
              iconLeft="arrow-right-left"
              disabled={!op}
              onClick={function () {
                DB.A.transferirContas(c.id, op === '__eu' ? '' : op, fin);
                onClose();
              }}
            >
              {'Passar ' + pend.length + ' contas'}
            </DS.Button>
          </React.Fragment>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              ['Feitas', feitas],
              ['Faltam', pend.length + (nR ? ' (' + nR + ' R)' : '')],
              ['Depósito', MS7.brl(dep)],
            ].map(function (x) {
              return (
                <div key={x[0]} className="ms7c-mini">
                  <div className="ms7-eyebrow">{x[0]}</div>
                  <div className="ms7c-mini-v">{x[1]}</div>
                </div>
              );
            })}
          </div>
          <DS.Select
            label="Novo operador"
            value={op}
            onChange={function (e) {
              setOp(e.target.value);
            }}
            options={[
              { value: '', label: 'Escolha o operador' },
              { value: '__eu', label: 'Eu (admin) · sem operador' },
            ].concat(
              ops.map(function (o) {
                return { value: o.id, label: o.nome };
              }),
            )}
          />
          {c.status === 'Ativa' || c.status === 'Em andamento' ? (
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={fin}
                onChange={function (e) {
                  setFin(e.target.checked);
                }}
                style={{ width: 18, height: 18, margin: 0, accentColor: 'var(--ms7-green-900)' }}
              />
              {'Finalizar a cooperação de ' + DB.opName(c.opId) + ' com ' + feitas + ' contas'}
            </label>
          ) : null}
          <div className="ms7c-hint" style={{ fontSize: 13 }}>
            {'Cria uma cooperação nova com a mesma plataforma, conta mãe, link, comissão e os depósitos das contas que faltam. A cooperação atual fica com as contas feitas, e a devolução recalcula sozinha. Escolha os grupos de chaves PIX na\u00a0cooperação\u00a0nova.'}
          </div>
        </div>
      </DS.Modal>
    );
  }
  function CellSelect({ value, options, onChange, color, pill }) {
    const col = color || 'var(--text-secondary)';
    return (
      <div className="ms7c-selw">
      <select
        value={value || ''}
        onChange={function (e) {
          onChange(e.target.value);
        }}
        className="ms7c-sel"
        style={
          pill
            ? {
                borderColor: 'color-mix(in oklab, ' + col + ' 28%, var(--line))',
                background: 'color-mix(in oklab, ' + col + ' 10%, var(--surface-card))',
                color: 'color-mix(in oklab, ' + col + ' 88%, var(--text-primary))',
              }
            : color
              ? { color: color }
              : undefined
        }
      >
        {options.map(function (o) {
          if (o && o.group)
            return (
              <optgroup
                key={'g' + o.group}
                label={'■ ' + String(o.group).toUpperCase()}
                style={{ color: 'var(--ms7-green-ink)', fontWeight: 600, background: 'var(--ms7-lime-100)' }}
              >
                {o.items.map(function (it) {
                  return (
                    <option key={it.value} value={it.value}>
                      {it.label}
                    </option>
                  );
                })}
              </optgroup>
            );
          const ov = typeof o === 'string' ? o : o.value;
          const ol = typeof o === 'string' ? o : o.label;
          return (
            <option key={ov} value={ov}>
              {ol}
            </option>
          );
        })}
      </select>
      <span className="ms7c-chev">
        <DS.Icon name="chevron-down" size={14} strokeWidth={2} />
      </span>
      </div>
    );
  }
  function cpPix(r, keyInfo) {
    const k = keyInfo && keyInfo[r.pix] && keyInfo[r.pix].k;
    const t = k ? (typeof limpaChave === 'function' ? limpaChave(k) : k.valor) : String(r.pix || '');
    (navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(t) : Promise.reject()).then(
      function () {
        toast('Chave copiada');
      },
      function () {
        window.prompt('Copie a chave:', t);
      },
    );
  }
  function PixCopyBtn({ r, keyInfo }) {
    if (!r.pix) return null;
    return (
      <DS.IconButton
        icon="copy"
        label="Copiar chave"
        size={26}
        iconSize={13}
        style={{ flexShrink: 0, color: 'var(--text-secondary)', borderRadius: 7 }}
        onClick={function (e) {
          e.stopPropagation();
          cpPix(r, keyInfo);
        }}
      />
    );
  }
  const COLS_DEF = [
    { id: 'usuario', l: 'Usuário', w: 122 },
    { id: 'senha', l: 'Senha', w: 86 },
    { id: 'senhaSaque', l: 'Senha saque', w: 106 },
    { id: 'deposito', l: 'Depósito', w: 108, r: 1 },
    { id: 'redeposito', l: 'Re-dep.', w: 100, r: 1 },
    { id: 'saque', l: 'Saque', w: 108, r: 1 },
    { id: 'aposta', l: 'Aposta válida', w: 118, r: 1 },
    { id: 'bau', l: 'Baú', w: 90, r: 1 },
    { id: 'pix', l: 'Chave PIX', w: 156 },
    { id: 'res', l: 'Resultado', w: 108, r: 1 },
    { id: 'status', l: 'Status', w: 118 },
    { id: 'obs', l: 'Observação', w: 124 },
  ];
  function alvoAposta(c, lst) {
    const t = String(c.rollover || '').trim();
    if (!t) return 0;
    const m = t.match(/^(\d+(?:[.,]\d+)?)\s*x$/i);
    const dep = lst.reduce(function (a, r) {
      return a + (+r.deposito || 0) + (+r.redeposito || 0);
    }, 0);
    if (m) return dep * (parseFloat(m[1].replace(',', '.')) || 0);
    return (
      parseFloat(
        t
          .replace(/[^\d,.]/g, '')
          .replace(/\./g, '')
          .replace(',', '.'),
      ) || 0
    );
  }
  function num(v) {
    return parseFloat(String(v).replace(/\./g, '').replace(',', '.')) || 0;
  }
  function Planilha({ c, canAdmin, superAdm }) {
    React.useEffect(
      function () {
        const cc = DB.coop(c.id);
        if (cc && cc.depositantes && cc.contas.length === 0 && cc.status !== 'Concluída' && cc.status !== 'Lixeira')
          DB.A.gerarLinhas(cc.id, cc.depositantes);
      },
      [c.id],
    );
    const { Button, IconButton, Checkbox, Modal, Input, Select } = DS;
    const [nu, setNu] = React.useState('');
    const [sel, setSel] = React.useState({});
    const [colsOpen, setColsOpen] = React.useState(false);
    const [hide, setHide] = usePersist('ui-cols-hide', {});
    React.useEffect(function () {
      if (localStorage.getItem('ms7op-cols-v2')) return;
      localStorage.setItem('ms7op-cols-v2', '1');
      if (hide.res || hide.status || hide.obs) {
        const n = Object.assign({}, hide);
        delete n.res;
        delete n.status;
        delete n.obs;
        setHide(n);
      }
    }, []);
    const [qd, setQd] = React.useState(String(c.depositantes || c.contas.length));
    React.useEffect(
      function () {
        setQd(String(c.depositantes || c.contas.length));
      },
      [c.depositantes],
    );
    const [imp, setImp] = React.useState(false);
    const [txt, setTxt] = React.useState('');
    const [impT, setImpT] = React.useState(superAdm ? 'tg' : 'contas');
    const [impC, setImpC] = React.useState('deposito');
    const [colar, setColar] = React.useState(false);
    const [ctxt, setCtxt] = React.useState('');
    const dbx = DB.get();
    const gpc = PIXV.gp(dbx, c.plataforma) || 'Geral';
    const grupos = DB.pixOrd(
      gSel(dbx, c).length
        ? (dbx.pix || []).filter(function (g) {
            return g.ativo !== false && gSel(dbx, c).indexOf(g.id) >= 0;
          })
        : (dbx.pix || []).filter(function (g) {
            return (
              g.ativo !== false &&
              !(dbx.coops || []).some(function (o) {
                return (
                  o.id !== c.id &&
                  o.opId !== c.opId &&
                  ['Ativa', 'Em andamento'].indexOf(o.status) >= 0 &&
                  DB.platNorm(o.plataforma) === DB.platNorm(c.plataforma) &&
                  (o.pixGrupos || []).indexOf(g.id) >= 0
                );
              }) &&
              (!g.opId || g.opId === c.opId) &&
              (!g.plataforma || g.plataforma === c.plataforma || g.plataforma === gpc)
            );
          }),
    );
    const keyInfo = {};
    (dbx.pix || []).forEach(function (g) {
      g.chaves.forEach(function (k) {
        keyInfo[k.valor] = { k: k, g: g };
      });
    });
    function pixOptsFor(r) {
      const o = [{ value: '', label: r.pix ? '— Liberar chave —' : 'Selecionar chave' }];
      if (r.pix) {
        const ki = keyInfo[r.pix];
        o.push({
          value: r.pix,
          label: (ki ? PIXV.LABEL[ki.k.tipo] + ' · ' : '') + r.pix + (ki && PIXV.st(ki.k, gpc).status === 'bloqueada' ? ' (BLOQUEADA)' : ''),
        });
      }
      const usd = chavesUsadas(dbx, c, r.id);
      grupos.forEach(function (g) {
        const ks = g.chaves.filter(function (k) {
          return PIXV.st(k, gpc).status === 'disponivel' && k.valor !== r.pix && !usd[chNorm(k.valor)];
        });
        if (ks.length)
          o.push({
            group: g.nome + (g.pagamento ? ' · ' + g.pagamento : '') + ' · ' + ks.length + (ks.length === 1 ? ' disponível' : ' disponíveis'),
            items: ks.map(function (k) {
              return { value: k.valor, label: PIXV.LABEL[k.tipo] + ' · ' + k.valor };
            }),
          });
      });
      return o;
    }
    const usd0 = chavesUsadas(dbx, c, null);
    const dispCount = grupos.reduce(function (a, g) {
      return (
        a +
        g.chaves.filter(function (k) {
          return PIXV.st(k, gpc).status === 'disponivel' && !usd0[chNorm(k.valor)];
        }).length
      );
    }, 0);
    const [busca, setBusca] = React.useState('');
    const bq = busca.trim().toLowerCase();
    const bn = bq
      .replace(/[^\d,.]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');
    function bateBusca(r) {
      if (!bq) return true;
      if (/^r?\$?\s*[\d.,]+$/.test(bq)) {
        const n = parseFloat(bn);
        if (String(r.usuario || '').toLowerCase() === bq) return true;
        return (
          !isNaN(n) &&
          ['deposito', 'redeposito', 'saque'].some(function (k) {
            const v = +r[k] || 0;
            return v && Math.abs(v - n) < 0.005;
          })
        );
      }
      if (
        String(r.usuario || '')
          .toLowerCase()
          .indexOf(bq) >= 0
      )
        return true;
      if (
        String(r.pix || '')
          .toLowerCase()
          .indexOf(bq) >= 0
      )
        return true;
      return false;
    }
    const achados = bq ? c.contas.filter(bateBusca).length : c.contas.length;
    function limpaChave(k) {
      const v = String(k.valor || '').trim();
      if (/@/.test(v)) return v;
      if (/^(cpf|cnpj|tel|telefone|celular|phone)$/i.test(String(k.tipo || '')) || /^[\d\s().+\-\/]+$/.test(v)) return v.replace(/\D/g, '');
      return v;
    }
    const [blocoCh, setBlocoCh] = React.useState(false);
    const [ativa, setAtiva] = React.useState(null);
    const wrapRef = React.useRef(null);
    const [ww, setWw] = React.useState(1200);
    const [modoP, setModoP] = usePersist('ui-planilha-modo', 'auto');
    React.useEffect(function () {
      const el = wrapRef.current;
      if (!el || !window.ResizeObserver) return;
      const ro = new ResizeObserver(function (e) {
        setWw(e[0].contentRect.width);
      });
      ro.observe(el);
      return function () {
        ro.disconnect();
      };
    }, []);
    const compacto = modoP === 'bloco' || (modoP !== 'tabela' && ww < (canAdmin ? 720 : 600));
    function gruposDisp() {
      return grupos
        .map(function (g) {
          return {
            g: g,
            ks: g.chaves
              .filter(function (k) {
                return PIXV.st(k, gpc).status === 'disponivel' && !usd0[chNorm(k.valor)];
              })
              .map(limpaChave),
          };
        })
        .filter(function (x) {
          return x.ks.length;
        });
    }
    function copiarTxt(txt, n) {
      const ok = function () {
        toast(n + (n === 1 ? ' chave copiada' : ' chaves copiadas'));
      };
      if (navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(txt).then(ok, function () {
          fb();
        });
      else fb();
      function fb() {
        const t = document.createElement('textarea');
        t.value = txt;
        document.body.appendChild(t);
        t.select();
        try {
          document.execCommand('copy');
          ok();
        } catch (e) {
          toast('Selecione e copie manualmente');
        }
        document.body.removeChild(t);
      }
    }
    function listaChaves() {
      const L = [];
      grupos.forEach(function (g) {
        g.chaves.forEach(function (k) {
          if (PIXV.st(k, gpc).status === 'disponivel' && !usd0[chNorm(k.valor)]) L.push(limpaChave(k));
        });
      });
      return L;
    }
    function copiarChaves() {
      const L = listaChaves();
      if (!L.length) {
        toast('Nenhuma chave disponível para copiar');
        return;
      }
      const txt = L.join('\n');
      const ok = function () {
        toast(L.length + (L.length === 1 ? ' chave copiada' : ' chaves copiadas'));
      };
      if (navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(txt).then(ok, function () {
          window.prompt('Copie as chaves:', txt);
        });
      else window.prompt('Copie as chaves:', txt);
    }
    const used = {};
    c.contas.forEach(function (r) {
      if (r.pix) used[r.pix] = (used[r.pix] || 0) + 1;
    });
    function set(r, k, v) {
      const n = Object.assign({}, r);
      n[k] = k === 'deposito' || k === 'redeposito' || k === 'saque' || k === 'bau' || k === 'aposta' ? num(v) : v;
      DB.A.saveConta(c.id, n, k !== 'status');
    }
    function add() {
      if (!nu.trim()) return;
      DB.A.saveConta(
        c.id,
        { usuario: nu.trim(), senha: '', senhaSaque: '', deposito: 0, redeposito: 0, saque: 0, bau: 0, status: 'Aguardando', pix: '', obs: '' },
        true,
      );
      setNu('');
    }
    const OP_COLS = ['usuario', 'deposito', 'saque', 'aposta', 'pix', 'status'];
    const hideOp =
      c.colsHide ||
      COLS_DEF.reduce(function (a, x) {
        if (OP_COLS.indexOf(x.id) < 0) a[x.id] = 1;
        return a;
      }, {});
    const hideAt = c.colsHide || hide;
    const cols = COLS_DEF.filter(function (x) {
      return canAdmin ? !hideAt[x.id] : !hideOp[x.id];
    });
    const ids = Object.keys(sel).filter(function (k) {
      return sel[k];
    });
    const allOn = c.contas.length && ids.length === c.contas.length;
    const tot = DB.contasValidas(c).reduce(
      function (a, r) {
        a.deposito += +r.deposito || 0;
        a.redeposito += +r.redeposito || 0;
        a.saque += DB.saqEf(r);
        a.bau += +r.bau || 0;
        a.aposta += +r.aposta || 0;
        a.res += DB.contaRes(r);
        return a;
      },
      { deposito: 0, redeposito: 0, saque: 0, bau: 0, aposta: 0, res: 0 },
    );
    const apAlvo = alvoAposta(c, DB.contasValidas(c));
    const apFalta = Math.max(0, apAlvo - tot.aposta);
    const apPct = apAlvo ? Math.min(100, Math.round((tot.aposta / apAlvo) * 100)) : 0;
    const th = {
      height: 38,
      padding: '0 10px',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      textAlign: 'left',
      borderBottom: '1px solid var(--line)',
      whiteSpace: 'nowrap',
      background: 'var(--surface-card)',
      position: 'sticky',
      top: 0,
      zIndex: 1,
    };
    const td = {};
    const [tgR, setTgR] = React.useState(String(c.comR != null ? c.comR : 2).replace('.', ','));
    const [tgS, setTgS] = React.useState(String(c.comS != null ? c.comS : 1.5).replace('.', ','));
    function parseTg(t) {
      const out = [];
      String(t || '')
        .split(/\r?\n/)
        .forEach(function (l) {
          const m = l.trim().match(/^(\d{1,4})\s*[–—\-]\s*(?:R\$\s*)?([\d.,]+)\s*(?:[–—\-]?\s*(R))?\s*$/i);
          if (m) {
            const v = parseValor(m[2]);
            if (!isNaN(v)) out.push({ n: +m[1], valor: v, rolo: !!m[3] });
          }
        });
      return out;
    }
    function parseValor(v) {
      v = String(v || '').replace(/[R$\s]/g, '');
      if (!v) return NaN;
      if (v.indexOf(',') >= 0) v = v.replace(/\./g, '').replace(',', '.');
      return parseFloat(v);
    }
    function importarDep() {
      const rows = [];
      txt.split(/\n/).forEach(function (l) {
        l = l.trim();
        if (!l) return;
        const p = l.split(/\s*[|;\t]\s*|\s+-\s+|\s+/).filter(Boolean);
        const vi = p.map(parseValor);
        let k = -1;
        for (let i = p.length - 1; i >= 0; i--) {
          if (!isNaN(vi[i]) && /\d/.test(p[i])) {
            k = i;
            break;
          }
        }
        if (k < 0) return;
        const u = p
          .filter(function (x, i) {
            return i !== k && !/^r\$$/i.test(x);
          })
          .join(' ')
          .trim();
        rows.push({ usuario: u, valor: vi[k] });
      });
      if (!rows.length) {
        toast('Nenhum valor reconhecido');
        return;
      }
      DB.A.importarDepositos(c.id, rows, impC);
      setImp(false);
      setTxt('');
    }
    function importar() {
      if (impT === 'tg') {
        const rows = parseTg(txt);
        if (!rows.length) {
          toast('Nenhuma linha reconhecida. Formato: 1 – 90 – R');
          return;
        }
        DB.A.importarTelegram(c.id, rows, num(tgR), num(tgS));
        setImp(false);
        setTxt('');
        return;
      }
      if (impT === 'dep') return importarDep();
      const rows = txt
        .split(/\r?\n/)
        .map(function (l) {
          return l.replace(/(usu[aá]rio|login|user|senha( de)? saque|senha|pass(word)?)\s*[:=]\s*/gi, ' ').trim();
        })
        .filter(Boolean)
        .map(function (l) {
          const p = l.split(/\s*[|;\t,:\/]\s*|\s+-\s+|\s+/).filter(Boolean);
          return { usuario: p[0] || '', senha: p[1] || '', senhaSaque: p[2] || '' };
        })
        .filter(function (r) {
          return r.usuario;
        });
      if (!rows.length) {
        toast('Nenhuma conta reconhecida');
        return;
      }
      DB.A.importarContas(c.id, rows);
      setImp(false);
      setTxt('');
    }
    function cellFor(r, col) {
      const res = DB.contaRes(r);
      if (col.id === 'usuario')
        return (
          <Cell
            value={r.usuario}
            bold
            placeholder="usuário"
            onCommit={function (v) {
              set(r, 'usuario', v);
            }}
          />
        );
      if (col.id === 'senha' || col.id === 'senhaSaque')
        return (
          <Cell
            value={r[col.id] || ''}
            secret
            placeholder="—"
            onCommit={function (v) {
              set(r, col.id, v);
            }}
          />
        );
      if (col.r && col.id !== 'res')
        return (
          <Cell
            value={r[col.id] || ''}
            ro={col.id === 'deposito' && !superAdm}
            money
            align="right"
            placeholder="R$ 0,00"
            onCommit={function (v) {
              set(r, col.id, v);
            }}
          />
        );
      if (col.id === 'res')
        return (
          <div className="ms7c-res" style={{ color: res > 0 ? 'var(--ms7-green)' : res < 0 ? 'var(--ms7-error)' : 'var(--text-secondary)' }}>
            {MS7.brl(res)}
          </div>
        );
      if (col.id === 'obs')
        return (
          <Cell
            value={r.obs || ''}
            placeholder="Observação"
            onCommit={function (v) {
              set(r, 'obs', v);
            }}
          />
        );
      if (col.id === 'status')
        return (
          <div>
            <CellSelect
              pill
              value={r.status}
              options={CONTA_ST}
              color={ST_COL[r.status]}
              onChange={function (v) {
                set(r, 'status', v);
              }}
            />
          </div>
        );
      if (col.id === 'pix')
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <CellSelect
                value={r.pix || ''}
                options={pixOptsFor(r)}
                color={
                  !r.pix
                    ? 'var(--text-secondary)'
                    : keyInfo[r.pix] && PIXV.st(keyInfo[r.pix].k, gpc).status === 'bloqueada'
                      ? 'var(--ms7-error)'
                      : undefined
                }
                onChange={function (v) {
                  DB.A.pixAtribuir(c.id, r.id, v);
                }}
              />
            </div>
            <PixCopyBtn r={r} keyInfo={keyInfo} />
            {r.pix && used[r.pix] > 1 ? (
              <span title="Chave usada em mais de uma conta" style={{ display: 'flex', color: 'var(--ms7-orange)' }}>
                <DS.Icon name="triangle-alert" size={14} />
              </span>
            ) : null}
          </div>
        );
    }
    return (
      <div ref={wrapRef} className="ms7-card" style={{ overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: compacto ? 6 : 10,
            padding: compacto ? '10px 12px' : '16px 20px',
            flexWrap: 'wrap',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ flex: '1 1 220px', minWidth: 0 }}>
            <div className="ms7c-sec-title" style={{ gap: 8 }}>
              Tabela de contas
              <DS.CountDot tone="muted">{c.contas.length}</DS.CountDot>
            </div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 500,
                marginTop: 4,
                color: dispCount ? 'var(--text-secondary)' : 'var(--ms7-error)',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 5,
              }}
            >
              <DS.Icon name="key-round" size={12} />
              {dispCount ? dispCount + ' chaves PIX disponíveis no ' + gpc : 'Sem chaves PIX disponíveis no ' + gpc}
              {dispCount ? (
                <button
                  type="button"
                  className="ms7c-link"
                  style={{ marginLeft: 4 }}
                  onClick={function () {
                    setBlocoCh(true);
                  }}
                >
                  <DS.Icon name="list" size={12} />
                  {'Ver e copiar ' + dispCount + (dispCount === 1 ? ' chave' : ' chaves')}
                </button>
              ) : null}
            </div>
          </div>
          <div className="ms7c-box" style={{ flex: '0 1 260px', minWidth: 180 }}>
            <DS.Icon name="search" size={15} color="var(--text-secondary)" />
            <input
              value={busca}
              onChange={function (e) {
                setBusca(e.target.value);
              }}
              placeholder="Buscar usuário ou valor"
            />
            {bq ? <span className="ms7c-n" style={{ whiteSpace: 'nowrap' }}>{achados}</span> : null}
            {bq ? (
              <IconButton
                icon="x"
                size={24}
                iconSize={12}
                label="Limpar busca"
                onClick={function () {
                  setBusca('');
                }}
              />
            ) : null}
          </div>
          <div className="ms7c-box" style={{ padding: '0 4px 0 12px', gap: 6 }}>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Depositantes</span>
            <input
              className="ms7c-qd"
              value={qd}
              onChange={function (e) {
                setQd(e.target.value.replace(/\D/g, ''));
              }}
              onKeyDown={function (e) {
                if (e.key === 'Enter') DB.A.setDepositantes(c.id, qd);
              }}
            />
            <IconButton
              icon="check"
              size={28}
              iconSize={14}
              label="Aplicar"
              disabled={String(c.depositantes) === qd}
              onClick={function () {
                DB.A.setDepositantes(c.id, qd);
              }}
            />
          </div>
          <IconButton
            icon={compacto ? 'table-2' : 'notebook-pen'}
            variant="outline"
            size={36}
            iconSize={16}
            label={compacto ? 'Ver como tabela' : 'Ver como bloco de notas (pequeno)'}
            style={{ borderRadius: 10 }}
            onClick={function () {
              setModoP(compacto ? 'tabela' : 'bloco');
            }}
          />
          {compacto || !canAdmin ? null : (
            <div style={{ position: 'relative' }}>
              <Button
                size="sm"
                variant="outline"
                iconLeft="columns-3"
                onClick={function () {
                  setColsOpen(!colsOpen);
                }}
              >
                Colunas
              </Button>
              {colsOpen ? (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 40,
                    zIndex: 20,
                    width: 210,
                    padding: 12,
                    borderRadius: 14,
                    background: 'var(--surface-card)',
                    boxShadow: 'var(--shadow-pop)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <div className="ms7-eyebrow" style={{ marginBottom: 2 }}>
                    Vale para você e o operador
                  </div>
                  {COLS_DEF.map(function (x) {
                    return (
                      <Checkbox
                        key={x.id}
                        label={x.l}
                        checked={!hideAt[x.id]}
                        disabled={x.id === 'usuario'}
                        onChange={function (v) {
                          const n = Object.assign({}, hideAt);
                          if (v) delete n[x.id];
                          else n[x.id] = 1;
                          setHide(n);
                          DB.A.setColsHide(c.id, n);
                        }}
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          )}
          <Button
            size="sm"
            variant="outline"
            iconLeft="upload"
            onClick={function () {
              setImp(true);
            }}
          >
            Importar
          </Button>
          <Button
            size="sm"
            variant="outline"
            iconLeft="key-round"
            onClick={function () {
              setCtxt('');
              setColar(true);
            }}
          >
            Colar chaves PIX
          </Button>
          <Button
            size="sm"
            variant="brand"
            iconLeft="plus"
            onClick={function () {
              DB.A.setDepositantes(c.id, c.contas.length + 1);
            }}
          >
            Adicionar conta
          </Button>
        </div>
        {apAlvo || tot.aposta ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '10px 20px',
              borderBottom: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
              <DS.Icon name="target" size={15} color="var(--ms7-green)" />
              Aposta válida
            </span>
            <span className="ms7-num" style={{ fontSize: 14, fontWeight: 600 }}>
              {MS7.brl(tot.aposta) + (apAlvo ? ' de ' + MS7.brl(apAlvo) : '')}
            </span>
            {apAlvo ? (
              <div className="ms7-bar" style={{ flex: '1 1 160px', minWidth: 120 }}>
                <i style={{ width: apPct + '%', background: apFalta ? 'var(--ms7-green)' : 'var(--ms7-lime-500)', transition: 'width .4s' }} />
              </div>
            ) : (
              <span style={{ flex: 1 }}></span>
            )}
            {apAlvo ? (
              <b className="ms7-num" style={{ fontSize: 14, fontWeight: 600, color: apFalta ? 'var(--ms7-orange)' : 'var(--ms7-green)' }}>
                {apFalta ? 'Falta ' + MS7.brl(apFalta) : 'Meta batida'}
              </b>
            ) : (
              <span className="ms7c-hint">Coloque o rollover (ex.: 10000 ou 3x) no lápis da cooperação para ver quanto falta</span>
            )}
          </div>
        ) : null}
        {ids.length ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              background: 'var(--ms7-lime-100)',
              color: 'var(--ms7-green-ink)',
              flexWrap: 'wrap',
            }}
          >
            <b style={{ fontSize: 13, fontWeight: 600 }}>{ids.length + ' selecionada(s)'}</b>
            <span style={{ flex: 1 }}></span>
            <div style={{ width: 170 }}>
              <Select
                variant="pill"
                value=""
                onChange={function (e) {
                  if (e.target.value) {
                    DB.A.statusContas(c.id, ids, e.target.value);
                    setSel({});
                  }
                }}
                options={[{ value: '', label: 'Mudar status…' }].concat(
                  CONTA_ST.map(function (s) {
                    return { value: s, label: s };
                  }),
                )}
              />
            </div>
            <Button
              size="sm"
              variant="secondary"
              iconLeft="trash-2"
              onClick={function () {
                if (confirm('Remover ' + ids.length + ' conta(s)?')) {
                  DB.A.removeContas(c.id, ids);
                  setSel({});
                }
              }}
            >
              Remover
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={function () {
                setSel({});
              }}
            >
              Limpar
            </Button>
          </div>
        ) : null}
        {compacto ? (
          <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
            {c.contas.map(function (r, i) {
              if (!bateBusca(r)) return null;
              const on = ativa === r.id,
                res = DB.contaRes(r),
                fora = !!+c.depositantes && i >= +c.depositantes && !String(r.usuario || '').trim();
              return (
                <div
                  key={r.id}
                  className={'ms7c-blk' + (on ? ' is-on' : '') + (r.status === 'Bloqueado' ? ' is-bloq' : '')}
                  onFocusCapture={function () {
                    setAtiva(r.id);
                  }}
                  onMouseDown={function () {
                    setAtiva(r.id);
                  }}
                  style={{ opacity: fora && !on ? 0.45 : 1 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="ms7c-n" style={{ width: 34, flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 3, paddingLeft: 2 }}>
                      {i + 1}
                      {r.rolo ? (
                        <span className="ms7c-r" style={{ width: 15, height: 15, fontSize: 9 }}>
                          R
                        </span>
                      ) : null}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Cell
                        value={r.usuario}
                        bold
                        placeholder="usuário"
                        onCommit={function (v) {
                          set(r, 'usuario', v);
                        }}
                      />
                    </div>
                    <div style={{ width: 112, flexShrink: 0 }}>
                      <CellSelect
                        pill
                        value={r.status}
                        options={CONTA_ST}
                        color={ST_COL[r.status]}
                        onChange={function (v) {
                          set(r, 'status', v);
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 2, marginLeft: 34 }}>
                    {[
                      ['deposito', 'Depósito'],
                      ['saque', 'Saque'],
                      ['aposta', 'Aposta'],
                    ].map(function (x) {
                      return (
                        <div key={x[0]} style={{ minWidth: 0, borderRadius: 8, background: 'var(--surface-muted)' }}>
                          <div className="ms7c-blk-k">{x[1]}</div>
                          <Cell
                            value={r[x[0]] || ''}
                            ro={x[0] === 'deposito' && !superAdm}
                            money
                            placeholder="0,00"
                            onCommit={function (v) {
                              set(r, x[0], v);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 34, marginTop: 2 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <CellSelect
                        value={r.pix || ''}
                        options={pixOptsFor(r)}
                        color={!r.pix ? 'var(--text-secondary)' : undefined}
                        onChange={function (v) {
                          DB.A.pixAtribuir(c.id, r.id, v);
                        }}
                      />
                    </div>
                    <PixCopyBtn r={r} keyInfo={keyInfo} />
                    <span
                      className="ms7-num"
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        color: res > 0 ? 'var(--ms7-green)' : res < 0 ? 'var(--ms7-error)' : 'var(--text-secondary)',
                      }}
                    >
                      {MS7.brl(res)}
                    </span>
                  </div>
                  {(canAdmin ? !hideAt.obs : !hideOp.obs) ? (
                    <div style={{ marginLeft: 34, marginTop: 4 }}>
                      <Cell
                        value={r.obs || ''}
                        placeholder="Observação"
                        onCommit={function (v) {
                          set(r, 'obs', v);
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px' }}>
              <DS.Icon name="plus" size={14} color="var(--text-secondary)" />
              <input
                className="ms7c-add"
                value={nu}
                onChange={function (e) {
                  setNu(e.target.value);
                }}
                onKeyDown={function (e) {
                  if (e.key === 'Enter') add();
                }}
                onBlur={add}
                placeholder="Novo usuário + Enter"
                style={{ flex: 1, minWidth: 0, width: 'auto', height: 34, padding: 0 }}
              />
            </div>
            <div
              style={{
                position: 'sticky',
                bottom: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
                gap: 4,
                padding: '8px 10px',
                background: 'var(--surface-muted)',
                borderTop: '1px solid var(--line)',
              }}
            >
              {[
                ['Depósito', tot.deposito],
                ['Saque', tot.saque],
                ['Aposta', tot.aposta],
                ['Resultado', tot.res],
              ].map(function (x) {
                return (
                  <div key={x[0]} style={{ minWidth: 0 }}>
                    <div className="ms7c-blk-k" style={{ padding: 0 }}>{x[0]}</div>
                    <b
                      className="ms7-num"
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: x[0] === 'Resultado' ? (x[1] >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)') : 'var(--text-primary)',
                      }}
                    >
                      {MS7.brl(x[1])}
                    </b>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="ms7c-wrap">
            <table
              className="ms7c-table"
              style={{
                minWidth:
                  cols.reduce(function (a, x) {
                    return a + x.w;
                  }, 0) + 112,
              }}
            >
              <colgroup>
                <col style={{ width: 36 }} />
                <col style={{ width: 42 }} />
                {(function () {
                  const sw =
                    cols.reduce(function (a, x) {
                      return a + x.w;
                    }, 0) || 1;
                  return cols.map(function (x) {
                    return <col key={x.id} style={{ width: ((x.w / sw) * 100).toFixed(2) + '%' }} />;
                  });
                })()}
                <col style={{ width: 34 }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={{ padding: '0 0 0 14px' }}>
                    <Checkbox
                      checked={!!allOn}
                      onChange={function (v) {
                        const n = {};
                        if (v)
                          c.contas.forEach(function (r) {
                            n[r.id] = 1;
                          });
                        setSel(n);
                      }}
                    />
                  </th>
                  <th>#</th>
                  {cols.map(function (x) {
                    return (
                      <th key={x.id} style={{ textAlign: x.r ? 'right' : 'left' }}>
                        {x.l}
                      </th>
                    );
                  })}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!c.contas.length ? (
                  <tr>
                    <td colSpan={cols.length + 3} style={{ whiteSpace: 'normal' }}>
                      <Empty art="Coop" compact title="Nenhuma conta ainda" sub={'Adicione uma conta, importe uma lista ou cole as chaves PIX.'} />
                    </td>
                  </tr>
                ) : bq && !achados ? (
                  <tr>
                    <td colSpan={cols.length + 3} style={{ whiteSpace: 'normal' }}>
                      <Empty art="Search" compact title="Nenhuma conta encontrada" sub={'Nenhum usuário, chave ou valor bate com a busca.'} />
                    </td>
                  </tr>
                ) : null}
                {c.contas.map(function (r, i) {
                  if (!bateBusca(r)) return null;
                  const ck = !!sel[r.id],
                    on = ativa === r.id,
                    fora = !!+c.depositantes && i >= +c.depositantes && !String(r.usuario || '').trim();
                  return (
                    <tr
                      key={r.id}
                      className={(on ? 'is-on ' : '') + (ck ? 'is-ck ' : '') + (r.status === 'Bloqueado' ? 'is-bloq' : '')}
                      onFocusCapture={function () {
                        setAtiva(r.id);
                      }}
                      onMouseDown={function () {
                        setAtiva(r.id);
                      }}
                      style={{ opacity: fora && !on ? 0.4 : 1 }}
                      title={fora ? 'Fora da conta: acima do número de depositantes' : undefined}
                    >
                      <td style={Object.assign({}, td, { padding: '0 0 0 14px' })}>
                        <Checkbox
                          checked={ck}
                          onChange={function (v) {
                            setSel(function (s) {
                              const n = Object.assign({}, s);
                              if (v) n[r.id] = 1;
                              else delete n[r.id];
                              return n;
                            });
                          }}
                        />
                      </td>
                      <td className="ms7c-n" style={Object.assign({}, td, { padding: '0 10px' })}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          {i + 1}
                          {r.rolo ? (
                            <span className="ms7c-r" title="Conta de rolo">
                              R
                            </span>
                          ) : null}
                        </span>
                      </td>
                      {cols.map(function (x) {
                        return (
                          <td key={x.id} style={td}>
                            {cellFor(r, x)}
                          </td>
                        );
                      })}
                      <td style={Object.assign({}, td, { textAlign: 'center' })}>
                        <IconButton
                          icon="trash-2"
                          size={26}
                          iconSize={13}
                          label="Remover"
                          style={{ color: 'var(--text-secondary)' }}
                          onClick={function () {
                            DB.A.removeConta(c.id, r.id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td style={td}></td>
                  <td style={Object.assign({}, td, { padding: '0 10px', color: 'var(--text-secondary)' })}>
                    <DS.Icon name="plus" size={14} />
                  </td>
                  <td style={td} colSpan={cols.length + 1}>
                    <input
                      className="ms7c-add"
                      value={nu}
                      onChange={function (e) {
                        setNu(e.target.value);
                      }}
                      onKeyDown={function (e) {
                        if (e.key === 'Enter') add();
                      }}
                      onBlur={add}
                      placeholder="Digite um usuário e aperte Enter para adicionar mais uma linha"
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  {[0, 1].map(function (i) {
                    return <td key={i}></td>;
                  })}
                  {cols.map(function (x, i) {
                    const v = tot[x.id];
                    return (
                      <td
                        key={x.id}
                        style={{
                          textAlign: x.r ? 'right' : 'left',
                          color: x.id === 'res' ? (v >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)') : 'var(--text-primary)',
                        }}
                      >
                        {i === 0 ? 'Total' : v != null ? MS7.brl(v) : ''}
                      </td>
                    );
                  })}
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {(function () {
          const limpaL = function (l) {
            l = String(l || '')
              .trim()
              .replace(/^\s*\d{1,3}\s*[-.)–—:]\s+/, '')
              .replace(/^(telefone|celular|tel|cpf|cnpj|e-?mail|email|aleat[oó]ria|chave|pix)\s*[·:\-–—]?\s*/i, '')
              .replace(/^[·:\-–—\s]+/, '')
              .trim();
            return l;
          };
          const canon = {};
          (dbx.pix || []).forEach(function (g) {
            (g.chaves || []).forEach(function (k) {
              const n = chNorm(k.valor);
              if (n && !canon[n]) canon[n] = { v: k.valor, g: g };
            });
          });
          const acha = function (l) {
            const x = limpaL(l);
            if (!x) return null;
            let hit = canon[chNorm(x)];
            if (!hit) {
              const d = x.replace(/\D/g, '');
              if (d.length >= 10) hit = canon[d] || canon[d.length >= 12 && d.indexOf('55') === 0 ? d.slice(2) : '55' + d];
            }
            return hit ? { v: hit.v, g: hit.g, ok: true } : { v: x, ok: false };
          };
          const keys = ctxt
            .split(/\n/)
            .map(function (l) {
              return l.trim();
            })
            .filter(Boolean)
            .map(acha)
            .filter(Boolean);
          const alvo = c.contas.filter(function (r) {
            return (+r.saque || 0) > 0 && !r.pix;
          });
          const n = Math.min(keys.length, alvo.length);
          function aplicar() {
            if (!n) return;
            for (let i = 0; i < n; i++) DB.A.pixAtribuir(c.id, alvo[i].id, keys[i].v);
            setColar(false);
            setCtxt('');
            setTimeout(function () {
              toast(n + (n === 1 ? ' chave vinculada' : ' chaves vinculadas') + ' às contas com saque');
            }, 50);
          }
          return (
            <Modal
              open={colar}
              onClose={function () {
                setColar(false);
              }}
              title="Colar chaves PIX"
              subtitle="Uma chave por linha, na ordem das contas com saque"
              footer={
                <React.Fragment>
                  <Button
                    variant="secondary"
                    onClick={function () {
                      setColar(false);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button variant="brand" iconLeft="check" disabled={!n} onClick={aplicar}>
                    {n ? 'Vincular ' + n + (n === 1 ? ' chave' : ' chaves') : 'Vincular'}
                  </Button>
                </React.Fragment>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Input
                  multiline
                  rows={7}
                  value={ctxt}
                  onChange={function (e) {
                    setCtxt(e.target.value);
                  }}
                  placeholder={'529.982.247-25\n(11) 98888-1020\npix@email.com'}
                />
                <div className="ms7c-hint" style={{ fontSize: 13 }}>
                  {alvo.length
                    ? alvo.length +
                      (alvo.length === 1 ? ' conta com saque e sem chave: ' : ' contas com saque e sem chave: ') +
                      alvo
                        .map(function (r, i) {
                          return (
                            i +
                            1 +
                            '. ' +
                            (r.usuario || 'sem usuário') +
                            (keys[i] ? ' → ' + keys[i].v + (keys[i].ok ? ' ✓' : ' (não está nos grupos)') : '')
                          );
                        })
                        .join(' · ')
                    : 'Nenhuma conta com saque está sem chave. Preencha o saque primeiro.'}
                </div>
                {keys.some(function (k) {
                  return !k.ok;
                }) ? (
                  <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.5, color: 'var(--soft-warn-fg)', display: 'flex', gap: 8 }}>
                    <DS.Icon name="triangle-alert" size={14} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>
                      {keys.filter(function (k) {
                        return !k.ok;
                      }).length + ' chave(s) não foram achadas nos grupos de chaves PIX. Elas entram na conta, mas não ficam marcadas como usadas.'}
                    </span>
                  </div>
                ) : null}
                {keys.length > alvo.length && alvo.length ? (
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--soft-warn-fg)', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <DS.Icon name="triangle-alert" size={14} style={{ flexShrink: 0 }} />
                    {keys.length - alvo.length + ' chave(s) a mais serão ignoradas.'}
                  </div>
                ) : null}
              </div>
            </Modal>
          );
        })()}
        {blocoCh
          ? (function () {
              const L = listaChaves();
              const txt = L.join('\n');
              return (
                <Modal
                  open={true}
                  onClose={function () {
                    setBlocoCh(false);
                  }}
                  title={L.length + (L.length === 1 ? ' chave PIX disponível' : ' chaves PIX disponíveis')}
                  subtitle={
                    'Plataforma ' + gpc + ' · separadas por grupo, uma por linha. Chave usada nesta plataforma some daqui para todos os operadores.'
                  }
                  footer={
                    <React.Fragment>
                      <DS.Button
                        variant="secondary"
                        onClick={function () {
                          setBlocoCh(false);
                        }}
                      >
                        Fechar
                      </DS.Button>
                      <DS.Button variant="brand" iconLeft="copy" disabled={!L.length} onClick={copiarChaves}>
                        {'Copiar todas (' + L.length + ')'}
                      </DS.Button>
                    </React.Fragment>
                  }
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {gruposDisp().map(function (x) {
                      const t = x.ks.join('\n');
                      return (
                        <div key={x.g.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div className="ms7c-gname">{x.g.pagamento || x.g.nome}</div>
                              <div className="ms7c-hint">
                                {(x.g.pagamento ? x.g.nome + ' · ' : '') + x.ks.length + (x.ks.length === 1 ? ' chave' : ' chaves')}
                              </div>
                            </div>
                            <DS.Button
                              size="sm"
                              variant="outline"
                              iconLeft="copy"
                              onClick={function () {
                                copiarTxt(t, x.ks.length);
                              }}
                            >
                              {'Copiar ' + x.ks.length}
                            </DS.Button>
                          </div>
                          <textarea
                            className="ms7c-ta"
                            readOnly
                            value={t}
                            onFocus={function (e) {
                              e.target.select();
                            }}
                            rows={Math.min(14, Math.max(3, x.ks.length))}
                          ></textarea>
                        </div>
                      );
                    })}
                    {!L.length ? (
                      <Empty art="Keys" compact title="Sem chaves livres" sub={'Nenhuma chave disponível nos grupos desta cooperação.'} />
                    ) : null}
                  </div>
                </Modal>
              );
            })()
          : null}
        <Modal
          open={imp}
          onClose={function () {
            setImp(false);
          }}
          title="Importar"
          subtitle={
            impT === 'tg'
              ? 'Cole a lista numerada: 1 – 90 – R (R = conta de rolo)'
              : impT === 'dep'
                ? 'Cole a lista de depósitos: usuário e valor, ou só os valores'
                : 'Cole a lista do Telegram ou de uma lista global'
          }
          footer={
            <React.Fragment>
              <Button
                variant="secondary"
                onClick={function () {
                  setImp(false);
                }}
              >
                Cancelar
              </Button>
              <Button variant="brand" iconLeft="upload" onClick={importar}>
                {impT === 'tg' ? 'Importar ' + parseTg(txt).length + ' contas' : 'Importar'}
              </Button>
            </React.Fragment>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
            <DS.Tabs
              variant="chips"
              value={impT}
              onChange={function (v) {
                setImpT(v);
                setTxt('');
              }}
              items={
                superAdm
                  ? [
                      { id: 'tg', label: 'Lista do Telegram' },
                      { id: 'contas', label: 'Contas (usuário e senha)' },
                      { id: 'dep', label: 'Depósitos' },
                    ]
                  : [{ id: 'contas', label: 'Contas (usuário e senha)' }]
              }
            />
            {impT === 'dep' ? (
              <DS.Tabs
                variant="chips"
                value={impC}
                onChange={setImpC}
                items={[
                  { id: 'deposito', label: 'Depósito' },
                  { id: 'redeposito', label: 'Re-depósito' },
                  { id: 'saque', label: 'Saque' },
                ]}
              />
            ) : null}
          </div>
          {impT === 'tg' ? (
            (function () {
              const rows = parseTg(txt);
              const nr = rows.filter(function (r) {
                  return r.rolo;
                }).length,
                ns = rows.length - nr,
                vr = num(tgR),
                vs = num(tgS);
              const dep = rows.reduce(function (a, r) {
                  return a + r.valor;
                }, 0),
                com = nr * vr + ns * vs;
              const kp = function (l, v, hl) {
                return (
                  <div
                    className="ms7c-mini"
                    style={{
                      flex: '1 1 130px',
                      padding: '12px 14px',
                      background: hl ? 'var(--ms7-lime-100)' : 'var(--surface-muted)',
                      color: hl ? 'var(--ms7-green-ink)' : 'var(--text-primary)',
                    }}
                  >
                    <div className="ms7-eyebrow" style={hl ? { color: 'inherit', opacity: 0.8 } : undefined}>
                      {l}
                    </div>
                    <div className="ms7c-mini-v" style={{ fontSize: 18 }}>
                      {v}
                    </div>
                  </div>
                );
              };
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Input
                    label="Lista numerada (número – valor – R)"
                    multiline
                    rows={8}
                    placeholder={'1 – 90 – R\n2 – 12\n3 – 65 – R\n4 – 14'}
                    value={txt}
                    onChange={function (e) {
                      setTxt(e.target.value);
                    }}
                    hint="O número diz a linha da tabela. As linhas de total do Telegram são ignoradas. O operador preenche depois só usuário, saque e chave PIX."
                  />
                  <div className="ms7c-grid2" style={{ gap: 12 }}>
                    <Input
                      label="Comissão por conta com R"
                      prefix="R$"
                      value={tgR}
                      onChange={function (e) {
                        setTgR(e.target.value);
                      }}
                    />
                    <Input
                      label="Comissão por conta sem R"
                      prefix="R$"
                      value={tgS}
                      onChange={function (e) {
                        setTgS(e.target.value);
                      }}
                    />
                  </div>
                  {rows.length ? (
                    <React.Fragment>
                      <div className="ms7c-hint ms7-num" style={{ fontSize: 13 }}>
                        {rows.length +
                          ' contas · ' +
                          nr +
                          ' com R × ' +
                          MS7.brl(vr) +
                          ' = ' +
                          MS7.brl(nr * vr) +
                          ' · ' +
                          ns +
                          ' sem R × ' +
                          MS7.brl(vs) +
                          ' = ' +
                          MS7.brl(ns * vs)}
                      </div>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {kp('Total depósito', MS7.brl(dep))}
                        {kp('Comissão', MS7.brl(com))}
                        {kp('Total p/ envio', MS7.brl(dep + com), true)}
                      </div>
                      <div style={{ maxHeight: 240, overflow: 'auto', border: '1px solid var(--line)', borderRadius: 12 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr>
                              <th style={Object.assign({}, th, { width: 60 })}>#</th>
                              <th style={Object.assign({}, th, { textAlign: 'right' })}>Valor</th>
                              <th style={Object.assign({}, th, { width: 70, textAlign: 'center' })}>R</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map(function (r, i) {
                              return (
                                <tr key={i}>
                                  <td
                                    className="ms7c-n"
                                    style={{
                                      padding: '7px 10px',
                                      borderBottom: '1px solid var(--border-subtle)',
                                    }}
                                  >
                                    {r.n}
                                  </td>
                                  <td
                                    className="ms7-num"
                                    style={{
                                      padding: '7px 10px',
                                      borderBottom: '1px solid var(--border-subtle)',
                                      textAlign: 'right',
                                      fontWeight: 600,
                                    }}
                                  >
                                    {MS7.brl(r.valor)}
                                  </td>
                                  <td style={{ padding: '7px 10px', borderBottom: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                                    {r.rolo ? (
                                      <span className="ms7c-r" style={{ width: 22, height: 22, fontSize: 12 }}>
                                        R
                                      </span>
                                    ) : null}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </React.Fragment>
                  ) : null}
                </div>
              );
            })()
          ) : impT === 'dep' ? (
            <Input
              label="Uma linha por conta: usuário | valor (ou só o valor, na ordem)"
              multiline
              rows={9}
              placeholder={'julioferreira | 50\nmicheleromao | 30,00\n\nou só os valores:\n50\n30\n20'}
              value={txt}
              onChange={function (e) {
                setTxt(e.target.value);
              }}
              hint="Com usuário: preenche a conta desse usuário (ou a próxima linha vazia, se ele ainda não existir). Só valor: preenche na ordem as contas que ainda não têm esse valor."
            />
          ) : (
            <Input
              label="Uma conta por linha: usuário | senha | senha saque"
              multiline
              rows={9}
              placeholder={'julioferreira | senha123 | 4321\nmicheleromao | abc456'}
              value={txt}
              onChange={function (e) {
                setTxt(e.target.value);
              }}
              hint="As contas preenchem primeiro as linhas vazias; se faltar linha, novas são criadas."
            />
          )}
        </Modal>
      </div>
    );
  }
  function LotesPix({ c, canAdmin }) {
    const { Button, Modal, Checkbox, Badge, IconButton } = DS;
    const db = DB.get();
    const gp = PIXV.gp(db, c.plataforma) || 'Geral';
    const [ed, setEd] = React.useState(false);
    const [tr, setTr] = React.useState(false);
    const [sel, setSel] = React.useState([]);
    const ativos = ['Ativa', 'Em andamento'];
    const sel0 = c.pixGrupos || [];
    const lotes = DB.pixOrd(
      (db.pix || []).filter(function (g) {
        return g.ativo !== false;
      }),
    );
    const outro = function (gid) {
      const x = (db.coops || []).find(function (o) {
        return (
          o.id !== c.id &&
          (o.opId || '') !== (c.opId || '') &&
          (ativos.indexOf(o.status) >= 0 || o.status === 'Finalizada') &&
          DB.platNorm(o.plataforma) === DB.platNorm(c.plataforma) &&
          (o.pixGrupos || []).indexOf(gid) >= 0
        );
      });
      return x ? [DB.coopNome(x), DB.opName(x.opId)].filter(Boolean).join(' · ') : '';
    };
    const st = function (g) {
      let disp = 0,
        aqui = 0,
        bloq = 0,
        outra = 0;
      g.chaves.forEach(function (k) {
        const s = PIXV.st(k, gp);
        if (s.status === 'disponivel') disp++;
        else if (s.status === 'bloqueada') bloq++;
        else if (s.conta && s.conta.coopId === c.id) aqui++;
        else outra++;
      });
      return { disp: disp, aqui: aqui, bloq: bloq, outra: outra, total: g.chaves.length };
    };
    const meus = lotes.filter(function (g) {
      return sel0.indexOf(g.id) >= 0;
    });
    if (!canAdmin && !meus.length) return null;
    const fim = ativos.indexOf(c.status) < 0;
    const selG = lotes.filter(function (g) {
      return sel.indexOf(g.id) >= 0;
    });
    const porTit = {};
    let totDisp = 0,
      totAll = 0;
    selG.forEach(function (g) {
      const s = st(g);
      const k = String(g.nome || 'Sem nome').trim();
      const t = porTit[k] || (porTit[k] = { nome: k, grupos: 0, disp: 0, total: 0, cada: [] });
      t.grupos++;
      t.disp += s.disp;
      t.total += s.total;
      t.cada.push(s.disp);
      totDisp += s.disp;
      totAll += s.total;
    });
    const titList = Object.keys(porTit)
      .sort(function (a, b) {
        return a.localeCompare(b, 'pt-BR', { numeric: true, sensitivity: 'base' });
      })
      .map(function (k) {
        const t = porTit[k];
        const igual = t.cada.every(function (x) {
          return x === t.cada[0];
        });
        t.conta = t.grupos > 1 && igual ? t.grupos + ' × ' + t.cada[0] + ' = ' + t.disp : t.cada.join(' + ') + (t.grupos > 1 ? ' = ' + t.disp : '');
        return t;
      });
    const escolher = (
      <Button
        size="sm"
        variant={meus.length ? 'outline' : 'brand'}
        iconLeft={meus.length ? 'pencil' : 'key-round'}
        onClick={function () {
          setSel(sel0.slice());
          setEd(true);
        }}
      >
        {meus.length ? 'Trocar grupos' : 'Escolher grupos'}
      </Button>
    );
    return (
      <div className="ms7-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span className="ms7c-tile" style={{ background: 'color-mix(in oklab, var(--ms7-green-900) 12%, var(--surface-card))', color: 'var(--ms7-green-900)' }}>
            <DS.Icon name="key-round" size={15} strokeWidth={2} />
          </span>
          <span className="ms7c-sec-title" style={{ flex: 1 }}>
            Grupos de chaves PIX
            {meus.length ? <DS.CountDot tone="muted">{meus.length}</DS.CountDot> : null}
          </span>
          {canAdmin && !fim && meus.length ? escolher : null}
        </div>
        {!meus.length ? (
          <Empty
            art="Keys"
            compact
            title="Nenhum grupo escolhido"
            sub={'O operador vê os lotes do operador e da plataforma. Escolha os grupos para ele trabalhar só com eles.'}
            action={canAdmin && !fim ? escolher : null}
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,240px),1fr))', gap: 10 }}>
            {meus.map(function (g) {
              const s = st(g);
              return (
                <div key={g.id} className="ms7c-grp">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <DS.Badge tone="green">{g.nome}</DS.Badge>
                    <span style={{ flex: 1 }}></span>
                    {canAdmin && !fim ? (
                      <IconButton
                        icon="x"
                        size={28}
                        iconSize={14}
                        label={'Tirar ' + g.nome + (g.pagamento ? ' · ' + g.pagamento : '') + ' desta cooperação'}
                        onClick={function () {
                          const nome = g.nome + (g.pagamento ? ' · ' + g.pagamento : '');
                          if (
                            !confirm(
                              'Tirar o grupo ' +
                                nome +
                                ' desta cooperação? O operador deixa de ver essas chaves aqui. As chaves já usadas continuam usadas.',
                            )
                          )
                            return;
                          DB.A.setPixGrupos(
                            c.id,
                            (c.pixGrupos || []).filter(function (x) {
                              return x !== g.id;
                            }),
                          );
                        }}
                      />
                    ) : null}
                  </div>
                  {g.pagamento ? <span className="ms7c-grp-bank">{g.pagamento}</span> : null}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <Badge size="sm" variant="soft" tone="blue">
                      {s.aqui + ' usadas aqui'}
                    </Badge>
                    <Badge size="sm" variant="soft" tone="green">
                      {s.disp + (s.disp === 1 ? ' sobrando' : ' sobrando')}
                    </Badge>
                    {s.bloq ? (
                      <Badge size="sm" variant="soft" tone="error">
                        {s.bloq + ' bloqueadas'}
                      </Badge>
                    ) : null}
                    {s.outra ? (
                      <Badge size="sm" variant="soft" tone="gray">
                        {s.outra + ' em outra coop'}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {meus.length && fim ? (
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ms7-green)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <DS.Icon name="circle-check" size={14} />
            Cooperação encerrada: as chaves que sobraram estão livres para mandar para outro operador.
          </div>
        ) : null}
        <Modal
          open={ed}
          onClose={function () {
            setEd(false);
          }}
          title="Grupos de chaves PIX"
          subtitle={'Escolha os grupos que ' + DB.opName(c.opId) + ' vai usar nesta cooperação'}
          footer={
            <React.Fragment>
              <Button
                variant="secondary"
                onClick={function () {
                  setEd(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="brand"
                iconLeft="check"
                onClick={function () {
                  DB.A.setPixGrupos(c.id, sel);
                  setEd(false);
                }}
              >
                {selG.length ? 'Salvar · ' + totDisp + ' chaves' : 'Salvar'}
              </Button>
            </React.Fragment>
          }
        >
          <div className="ms7c-sum">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <b className="ms7-num" style={{ fontSize: 30, lineHeight: 1, fontWeight: 600, letterSpacing: '-0.03em' }}>{totDisp}</b>
              <b style={{ fontSize: 15, fontWeight: 600 }}>{totDisp === 1 ? 'chave disponível para enviar' : 'chaves disponíveis para enviar'}</b>
              <span style={{ flex: 1 }}></span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                {selG.length + (selG.length === 1 ? ' grupo selecionado' : ' grupos selecionados')}
              </span>
            </div>
            {titList.length ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  borderTop: '1px solid color-mix(in oklab, currentColor 20%, transparent)',
                  paddingTop: 8,
                }}
              >
                {titList.map(function (t) {
                  return (
                    <div key={t.nome} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 14, fontWeight: 600 }}>
                      <span>{t.nome}</span>
                      <span style={{ fontWeight: 500, opacity: 0.85 }}>{t.grupos + (t.grupos === 1 ? ' grupo' : ' grupos')}</span>
                      <span style={{ flex: 1 }}></span>
                      <span className="ms7-num">{t.conta + ' chaves'}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <span style={{ fontSize: 13, fontWeight: 500 }}>Marque os grupos abaixo para ver o total.</span>
            )}
            {totAll > totDisp ? (
              <span style={{ fontSize: 12.5, fontWeight: 500, opacity: 0.85 }}>
                {totAll - totDisp + ' chaves desses grupos já estão em uso ou bloqueadas e não entram na conta.'}
              </span>
            ) : null}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {lotes.length ? (
              lotes.map(function (g) {
                const s = st(g);
                const o = outro(g.id);
                const on = sel.indexOf(g.id) >= 0;
                const trav = !!o && !on;
                return (
                  <div key={g.id} className={'ms7c-lote' + (on ? ' is-on' : '')} style={{ opacity: trav ? 0.55 : 1 }}>
                    {trav ? (
                      <span
                        title="Reservado para outra cooperação"
                        style={{ width: 20, display: 'flex', justifyContent: 'center', color: 'var(--text-secondary)' }}
                      >
                        <DS.Icon name="lock" size={16} />
                      </span>
                    ) : (
                      <Checkbox
                        checked={on}
                        onChange={function (v) {
                          setSel(
                            v
                              ? sel.concat([g.id])
                              : sel.filter(function (x) {
                                  return x !== g.id;
                                }),
                          );
                        }}
                      />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <b style={{ fontSize: 14, fontWeight: 600 }}>{g.nome}</b>
                      {g.pagamento ? (
                        <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)' }}>{' · ' + g.pagamento}</span>
                      ) : null}
                      <div className="ms7-num" style={{ fontSize: 12.5, fontWeight: 500, color: s.disp ? 'var(--ms7-green)' : 'var(--text-secondary)' }}>
                        {s.disp + ' de ' + s.total + ' chaves livres para usar'}
                      </div>
                      {o ? (
                        <div
                          style={{
                            fontSize: 12.5,
                            fontWeight: 500,
                            color: 'var(--soft-warn-fg)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <DS.Icon name="lock" size={12} />
                          {'Reservado para ' + o + '. Volta a ficar livre quando a cooperação dele encerrar.'}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })
            ) : (
              <Empty art="Keys" compact title="Nenhum lote cadastrado" sub="Cadastre em Gestão → Chaves PIX." />
            )}
          </div>
        </Modal>
      </div>
    );
  }
  function EditCoop({ c, open, onClose }) {
    const { Modal, Button, Input, Select } = DS;
    const db = DB.get();
    const init = function () {
      const cm = c.contaMae || {};
      return {
        cliente: c.cliente || '',
        opId: c.opId || '',
        plataforma: c.plataforma || '',
        linkN: c.linkN || '',
        rede: c.rede || '',
        comTipo: c.comTipo || 'pct',
        comValor: String(c.comValor != null ? c.comValor : ''),
        comConta: c.comConta != null ? String(c.comConta) : '',
        comR: String(c.comR != null ? c.comR : 2).replace('.', ','),
        comS: String(c.comS != null ? c.comS : 1.5).replace('.', ','),
        link: cm.link || '',
        muser: cm.usuario || '',
        mtipo: cm.tipo || 'Senha',
        msenha: cm.senha || '',
        salario: c.salario ? String(c.salario).replace('.', ',') : '',
        depositantes: String(c.depositantes || c.contas.length || ''),
        mediaDep: c.mediaDep ? String(c.mediaDep).replace('.', ',') : '',
        rollover: c.rollover || '',
        descricao: c.descricao || '',
      };
    };
    const [f, setF] = React.useState(init);
    React.useEffect(
      function () {
        if (open) setF(init());
      },
      [open],
    );
    const u = function (k) {
      return function (e) {
        const v = e && e.target ? e.target.value : e;
        setF(function (p) {
          const n = Object.assign({}, p);
          n[k] = v;
          return n;
        });
      };
    };
    const ops = (db.operadores || []).map(function (o) {
      return { value: o.id, label: o.nome };
    });
    const pls = (db.plataformas || []).map(function (p) {
      return { value: p.nome, label: p.nome };
    });
    if (
      f.plataforma &&
      !pls.some(function (p) {
        return p.value === f.plataforma;
      })
    )
      pls.unshift({ value: f.plataforma, label: f.plataforma });
    const rds = [{ value: '', label: 'Sem rede' }].concat(
      (db.redes || []).map(function (r) {
        return { value: r.nome, label: r.nome };
      }),
    );
    const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 };
    const sec = { gridColumn: '1 / -1', marginTop: 8, paddingBottom: 6, borderBottom: '1px solid var(--line)' };
    return (
      <Modal
        open={open}
        onClose={soX(onClose)}
        title={'Editar · ' + DB.coopNome(c)}
        size="md"
        footer={
          <React.Fragment>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="brand"
              iconLeft="check"
              onClick={function () {
                DB.A.editCoop(c.id, f);
                onClose();
              }}
            >
              Salvar alterações
            </Button>
          </React.Fragment>
        }
      >
        <div style={grid}>
          <div className="ms7-eyebrow" style={sec}>Informações</div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Input label="Nome da cooperação" value={f.cliente} onChange={u('cliente')} />
          </div>
          <Select label="Operador" value={f.opId} onChange={u('opId')} options={ops} />
          <Select label="Rede" value={f.rede} onChange={u('rede')} options={rds} />
          <Input label="Plataforma" placeholder="Ex.: Azul 777" value={f.plataforma} onChange={u('plataforma')} />
          <Input label="Link" placeholder="Ex.: Link 1" value={f.linkN || ''} onChange={u('linkN')} />
          <div className="ms7-eyebrow" style={sec}>Comissão</div>
          <Select
            label="Tipo"
            value={f.comTipo}
            onChange={u('comTipo')}
            options={[
              { value: 'pct', label: '% do lucro' },
              { value: 'conta', label: 'Valor por conta' },
              { value: 'fixo', label: 'Valor fixo' },
            ].concat(f.comTipo === 'rolo' ? [{ value: 'rolo', label: 'Lista do Telegram: com R / sem R' }] : [])}
          />
          {f.comTipo === 'rolo' ? (
            <Input label="Por conta com R (R$)" value={f.comR} onChange={u('comR')} />
          ) : (
            <Input
              label={
                f.comTipo === 'pct' ? 'Porcentagem do lucro (%)' : f.comTipo === 'conta' ? 'Valor por conta (R$)' : 'Valor fixo da cooperação (R$)'
              }
              value={f.comValor}
              onChange={u('comValor')}
            />
          )}
          {f.comTipo === 'rolo' ? <Input label="Por conta sem R (R$)" value={f.comS} onChange={u('comS')} /> : null}
          {f.comTipo === 'misto' ? <Input label="Mais por conta (R$)" value={f.comConta} onChange={u('comConta')} /> : null}
          <div className="ms7-eyebrow" style={sec}>Conta mãe</div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Input label="Link" value={f.link} onChange={u('link')} />
          </div>
          <Input label="Usuário" value={f.muser} onChange={u('muser')} />
          <Input label="Senha" value={f.msenha} onChange={u('msenha')} />
          <div className="ms7-eyebrow" style={sec}>Metas</div>
          <Input label="Média de depósito (R$)" value={f.mediaDep} onChange={u('mediaDep')} />
          <Input label="Rollover" value={f.rollover} onChange={u('rollover')} placeholder="Ex.: 10x" />
          <Input label="Salário (R$)" value={f.salario} onChange={u('salario')} />
          <Input
            label="Depositantes (contas que contam)"
            type="number"
            value={f.depositantes}
            onChange={u('depositantes')}
            hint="Parou antes? Ex.: 50 → 20. Depósito e comissão contam só essas."
          />
          <div style={{ gridColumn: '1 / -1' }}>
            <Input label="Descrição" multiline rows={3} value={f.descricao} onChange={u('descricao')} />
          </div>
        </div>
      </Modal>
    );
  }
  function CoopDetail({ id, onClose, session }) {
    const { Button, Badge, IconButton } = DS;
    DB.useDB();
    const c = DB.coop(id);
    const [edOpen, setEdOpen] = React.useState(false);
    const [trOpen, setTrOpen] = React.useState(false);
    const [verSen, setVerSen] = React.useState(false);
    const canAdmin = !session || session.role !== 'operador';
    if (!c) return null;
    const k = DB.calc(c);
    const cm = c.contaMae || {};
    const sobr = Math.max(0, c.contas.length - (+c.depositantes || 0));
    const mult = parseFloat(String(c.rollover || '').replace(',', '.')) || 0;
    const alvo = mult ? (k.dep + k.red) * mult : 0;
    const restante = c.mediaDep ? Math.max(0, c.mediaDep * (+c.depositantes || 0) - (k.dep + k.red)) : null;
    function copy(label, v) {
      try {
        navigator.clipboard.writeText(v);
      } catch (e) {}
      toast(label + ' copiado');
    }
    const kpis = [
      ['Contas', c.contas.length, null],
      ['Fora da conta', sobr, sobr ? 'var(--ms7-orange)' : null],
      ['Depósito', MS7.brl(k.dep), null],
      ['Re-depósito', MS7.brl(k.red), null],
      ['Saque', MS7.brl(k.saq), null],
      ['Depósito × Saque', MS7.brl(k.ds), null],
    ]
      .concat(k.pend ? [['Saque não contado', MS7.brl(k.pend), 'var(--ms7-orange)']] : [])
      .concat(k.sal ? [['Salário', MS7.brl(k.sal), 'var(--ms7-green)']] : [])
      .concat([
        ['Comissão do operador', MS7.brl(-k.com), 'var(--ms7-purple)'],
        [k.lucro >= 0 ? 'Lucro final' : 'Prejuízo final', MS7.brl(k.lucro), k.lucro >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)'],
      ]);
    const info = [];
    const cmId = cm.id || DB.linkId(cm.link);
    if (cmId) info.push(['ID da conta mãe', cmId, 'hash']);
    if (cm.link) info.push(['Link da conta mãe', cm.link, 'link', 0, 1]);
    if (cm.usuario) info.push(['Usuário', cm.usuario, 'user']);
    if (cm.senha) info.push([cm.tipo && cm.tipo !== 'Senha' ? cm.tipo : 'Senha', cm.senha, 'lock', 1]);
    const meta = [];
    if (restante != null) meta.push(['Montante restante', MS7.brl(restante)]);
    if (alvo) meta.push(['Apostas válidas alvo (' + c.rollover + ')', MS7.brl(alvo), 1]);
    if (c.mediaDep) meta.push(['Média de depósito', MS7.brl(c.mediaDep)]);
    if (c.salario) meta.push(['Salário', MS7.brl(c.salario)]);
    const acts =
      c.status === 'Ativa'
        ? [
            ['play', 'Iniciar', 'Em andamento'],
            ['flag', 'Finalizar', 'Finalizada'],
          ]
        : c.status === 'Em andamento'
          ? [['flag', 'Finalizar', 'Finalizada']]
          : c.status === 'Finalizada' && canAdmin
            ? [
                ['undo-2', 'Devolver', 'Em andamento'],
                ['circle-check', 'Concluir', 'Concluída'],
              ]
            : c.status === 'Concluída' && canAdmin
              ? [['rotate-ccw', 'Reabrir', 'Em andamento']]
              : [];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
        <div className="ms7c-head">
          <IconButton icon="arrow-left" variant="outline" size={40} iconSize={18} label="Voltar" onClick={onClose} />
          <div style={{ flex: '1 1 260px', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h2 className="ms7-balance" style={{ margin: 0, fontSize: 26, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {DB.coopNome(c)}
              </h2>
              <Badge tone={ST_TONE[c.status] || 'gray'}>
                {ST_ICON[c.status] ? <DS.Icon name={ST_ICON[c.status]} size={12} strokeWidth={2.2} /> : null}
                {c.status}
              </Badge>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 4 }}>
              {[c.plataforma, c.linkN, c.rede, DB.opName(c.opId)].filter(Boolean).join(' · ')}
            </div>
            {c.linkDiv ? (
              <a
                href={/^https?:/i.test(c.linkDiv) ? c.linkDiv : 'https://' + c.linkDiv}
                target="_blank"
                rel="noopener"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 4,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: 'var(--text-brand)',
                  wordBreak: 'break-all',
                }}
              >
                <DS.Icon name="link" size={12} />
                {c.linkDiv}
              </a>
            ) : null}
          </div>
          <div className="ms7c-head-acts">
          {canAdmin && c.status !== 'Lixeira' ? (
            <Button
              size="sm"
              variant="outline"
              iconLeft="pencil"
              onClick={function () {
                setEdOpen(true);
              }}
            >
              Editar
            </Button>
          ) : null}
          {canAdmin ? (
            <EditCoop
              c={c}
              open={edOpen}
              onClose={function () {
                setEdOpen(false);
              }}
            />
          ) : null}
          {canAdmin && c.status !== 'Lixeira' && DB.A.pendentesDe(c.id).length ? (
            <Button
              size="sm"
              variant="outline"
              iconLeft="arrow-right-left"
              onClick={function () {
                setTrOpen(true);
              }}
            >
              {'Passar ' + DB.A.pendentesDe(c.id).length + ' contas'}
            </Button>
          ) : null}
          {trOpen ? (
            <TransferirModal
              c={c}
              onClose={function () {
                setTrOpen(false);
              }}
            />
          ) : null}
          <Button
            size="sm"
            variant="outline"
            iconLeft="download"
            onClick={function () {
              exportCSV(
                'contas-' + c.id,
                [
                  {
                    label: 'Usuário',
                    get: function (r) {
                      return r.usuario;
                    },
                  },
                  {
                    label: 'Depósito',
                    get: function (r) {
                      return r.deposito;
                    },
                  },
                  {
                    label: 'Re-depósito',
                    get: function (r) {
                      return r.redeposito;
                    },
                  },
                  {
                    label: 'Saque',
                    get: function (r) {
                      return r.saque;
                    },
                  },
                  {
                    label: 'Baú',
                    get: function (r) {
                      return r.bau || 0;
                    },
                  },
                  { label: 'Resultado', get: DB.contaRes },
                  {
                    label: 'Status',
                    get: function (r) {
                      return r.status;
                    },
                  },
                  {
                    label: 'Chave PIX',
                    get: function (r) {
                      return r.pix || '';
                    },
                  },
                ],
                c.contas,
              );
            }}
          >
            CSV
          </Button>
          <div
            className="ms7c-cycle"
            title="Toda conta nova com usuário entra no ciclo. Depois de 5 min sem mexer, o admin recebe: quantas contas, o depósito de todas e o saque das que tiveram."
          >
            <DS.Icon name="bell-ring" size={14} />
            <span>
              {(function () {
                const fe = function (k) {
                  return (
                    String(k.usuario || '').trim() &&
                    ((k.status === 'Sacado' && (+k.saque || 0) > 0) || k.status === 'Bloqueado' || k.status === 'Não sacado')
                  );
                };
                const pf = c.contas.filter(function (k) {
                  return !k.ciclo && fe(k);
                }).length;
                const p =
                  pf ||
                  c.contas.filter(function (k) {
                    return !k.ciclo && String(k.usuario || '').trim();
                  }).length;
                return !p
                  ? 'Envia ao admin 5 min depois que você parar de mexer'
                  : 'Ciclo ' +
                      ((c.ciclos || 0) + 1) +
                      ': ' +
                      p +
                      (p === 1 ? ' conta registrada' : ' contas registradas') +
                      ' · envia 5 min depois da última mudança';
              })()}
            </span>
          </div>
          {(function () {
            const fe = function (k) {
              return (
                String(k.usuario || '').trim() &&
                ((k.status === 'Sacado' && (+k.saque || 0) > 0) || k.status === 'Bloqueado' || k.status === 'Não sacado')
              );
            };
            const pf = c.contas.filter(function (k) {
              return !k.ciclo && fe(k);
            }).length;
            const p =
              pf ||
              c.contas.filter(function (k) {
                return !k.ciclo && String(k.usuario || '').trim();
              }).length;
            return (
              <Button
                size="sm"
                variant={canAdmin ? 'outline' : 'brand'}
                iconLeft="send"
                disabled={!p}
                onClick={function () {
                  if (confirm('Enviar ' + p + (p === 1 ? ' conta' : ' contas') + ' para o admin agora?')) DB.A.fecharCiclo(c.id);
                }}
              >
                {p ? 'Enviar ' + p + (p === 1 ? ' conta' : ' contas') + ' ao admin' : 'Nenhuma conta nova'}
              </Button>
            );
          })()}
          {acts.map(function (a) {
            return (
              <Button
                key={a[1]}
                size="sm"
                variant={a[2] === 'Concluída' || a[2] === 'Finalizada' ? 'brand' : 'secondary'}
                iconLeft={a[0]}
                onClick={function () {
                  DB.A.setStatus(c.id, a[2]);
                }}
              >
                {a[1]}
              </Button>
            );
          })}
          </div>
        </div>
        {c.descricao ? (
          <div className="ms7c-note">
            <DS.Icon name="megaphone" size={15} />
            <span style={{ whiteSpace: 'pre-line' }}>{c.descricao}</span>
          </div>
        ) : null}
        {info.length || meta.length ? (
          <div className="ms7-card" style={{ padding: 14 }} data-reveal="up">
            <div className="ms7c-facts" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))' }}>
              {info.map(function (x) {
                return (
                  <div key={x[0]} className="ms7c-fact">
                    <span className="ms7c-tile" style={{ background: 'var(--surface-card)', color: 'var(--text-secondary)', marginRight: 6 }}>
                      <DS.Icon name={x[2]} size={15} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="ms7-eyebrow">{x[0]}</div>
                      {x[4] ? (
                        <div className="ms7c-fact-v is-soft">Abrir ou copiar</div>
                      ) : (
                        <div className={'ms7c-fact-v' + (x[2] === 'hash' ? ' is-mono' : '')}>{x[3] && !verSen ? '••••••••' : x[1]}</div>
                      )}
                    </div>
                    {x[4] ? (
                      <IconButton
                        icon="external-link"
                        size={28}
                        iconSize={14}
                        label="Abrir link"
                        onClick={function () {
                          window.open(/^https?:/i.test(x[1]) ? x[1] : 'https://' + x[1], '_blank', 'noopener');
                        }}
                      />
                    ) : null}
                    {x[3] ? (
                      <IconButton
                        icon={verSen ? 'eye-off' : 'eye'}
                        size={28}
                        iconSize={14}
                        label={verSen ? 'Esconder senha' : 'Ver senha'}
                        onClick={function () {
                          setVerSen(!verSen);
                        }}
                      />
                    ) : null}
                    <IconButton
                      icon="copy"
                      size={28}
                      iconSize={14}
                      label="Copiar"
                      onClick={function () {
                        copy(x[0], x[1]);
                      }}
                    />
                  </div>
                );
              })}
              {meta.map(function (x) {
                return (
                  <div key={x[0]} className="ms7c-fact">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="ms7-eyebrow">{x[0]}</div>
                      <div className="ms7c-fact-v ms7-num" style={{ color: x[2] ? 'var(--ms7-green)' : 'var(--text-primary)' }}>
                        {x[1]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className="ms7-stagger ms7c-kpis ms7c-kpis-d">
          {kpis.map(function (x) {
            const KI = {
              Contas: ['users', 'black'],
              'Fora da conta': ['user-minus', 'orange'],
              'Depósito': ['arrow-down-to-line', 'blue'],
              'Re-depósito': ['circle-dollar-sign', 'blue'],
              Saque: ['arrow-up-from-line', 'blue'],
              'Depósito × Saque': ['arrow-left-right', 'black'],
              'Saque não contado': ['clock', 'orange'],
              'Salário': ['wallet', 'green'],
              'Comissão do operador': ['percent', 'purple'],
              'Lucro final': ['trending-up', 'green'],
              'Prejuízo final': ['trending-down', 'error'],
            }[x[0]] || ['circle', 'gray'];
            const signed = /final$/.test(x[0]) || x[0] === 'Fora da conta';
            return (
              <DS.StatCard
                key={x[0]}
                variant="compact"
                icon={KI[0]}
                tone={x[2] ? KI[1] : x[0] === 'Fora da conta' ? 'gray' : KI[1]}
                label={x[0]}
                value={x[1]}
                valueColor={signed && x[2] ? x[2] : undefined}
              />
            );
          })}
        </div>
        <p className="ms7c-rule" style={{ margin: '-8px 0 0' }}>
          <DS.Icon name="calculator" size={14} />
          <span>
          {'Conta do resultado: saque ' +
            MS7.brl(k.saq) +
            (k.bau ? ' + baú ' + MS7.brl(k.saq - k.saq + (k.ds - (k.saq - k.dep - k.red))) : '') +
            (k.sal ? ' + salário ' + MS7.brl(k.sal) : '') +
            ' − depósito ' +
            MS7.brl(k.dep + k.red) +
            ' − comissão ' +
            MS7.brl(k.com) +
            ' (' +
            DB.comText(c) +
            ') = ' +
            MS7.brl(k.lucro) +
            (k.pend ? ' · ' + MS7.brl(k.pend) + ' de saque fora da conta (contas que não estão como Sacado)' : '')}
          </span>
        </p>
        <LotesPix c={c} canAdmin={canAdmin} />
        <Planilha c={c} canAdmin={canAdmin} superAdm={!session || session.role === 'super' || session.role === 'cliente'} />
      </div>
    );
  }
  function CooperacoesScreen({ session, bau, meu }) {
    const pk = meu ? 'meu' : bau ? 'bau' : 'coop';
    const { Button, Input, Select, Tabs } = DS;
    const db = DB.useDB();
    const isOp = session.role === 'operador';
    const [st0, setSt] = usePersist(pk + '-st', 'ativas');
    const st = st0 === 'todas' || st0 === 'andamento' ? 'ativas' : st0;
    const [op, setOp] = usePersist(pk + '-op', '');
    const [q, setQ] = React.useState('');
    const [per, setPer] = usePersist(pk + '-per', 'Todos');
    const [wiz, setWiz] = React.useState(false);
    const [open, setOpen] = React.useState(function () {
      const x = localStorage.getItem('ms7op-open-coop');
      localStorage.removeItem('ms7op-open-coop');
      return x;
    });
    const [dt, setDt] = usePersist(pk + '-dt', 'Todos');
    const [de0, setDe0] = usePersist(pk + '-de', '');
    const [ate0, setAte0] = usePersist(pk + '-ate', '');
    const hoje = DB.iso(DB.today);
    const rng = de0 || ate0 ? [de0 || '0000-00-00', ate0 || '9999-12-31'] : null;
    const escolhe = function (v) {
      setDt(v);
      if (v === 'Diário') {
        setDe0(hoje);
        setAte0(hoje);
      } else if (v === 'Semanal') {
        setDe0(DB.semanaIni(hoje));
        setAte0(hoje);
      } else if (v === 'Mensal') {
        setDe0(hoje.slice(0, 8) + '01');
        setAte0(hoje);
      } else {
        setDe0('');
        setAte0('');
      }
    };
    const dataDe = function (c) {
      return c.status === 'Concluída'
        ? DB.comData(c)
        : c.status === 'Finalizada' || c.status === 'Lixeira'
          ? DB.dIso(c.finalizadaEm) || DB.dIso(c.fim) || DB.dIni(c)
          : DB.dIni(c);
    };
    const naData = function (c) {
      if (!rng) return true;
      const d = dataDe(c);
      return !!d && d >= rng[0] && d <= rng[1];
    };
    const base = DB.coopsFor({ opId: meu ? null : isOp ? session.opId : op || null, per: 'Todos', lixeira: true }).filter(function (c) {
      return (bau ? c.tipo === 'bau' : c.tipo !== 'bau') && naData(c);
    });
    const qn = function (v) {
      return String(v || '')
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/+$/, '')
        .trim();
    };
    const qq = qn(q);
    const metasL = (function () {
      const k = (db.kv || []).find(function (x) {
        return x.id === 'metas';
      });
      let v = k ? k.v : null;
      if (!v) {
        try {
          v = JSON.parse(localStorage.getItem('ms7op-p-metas') || 'null');
        } catch (e) {}
      }
      return Array.isArray(v) ? v : [];
    })();
    const txt = function (c) {
      const cm = c.contaMae || {};
      const mt = metasL
        .filter(function (m) {
          return m.coopId === c.id;
        })
        .map(function (m) {
          return m.link + ' ' + m.nome;
        })
        .join(' ');
      return [
        c.cliente,
        c.plataforma,
        c.linkN,
        c.rede,
        c.id,
        String(c.id).replace(/^C-/, ''),
        DB.opName(c.opId),
        DB.coopNome(c),
        cm.link,
        cm.usuario,
        mt,
      ]
        .map(qn)
        .join(' | ');
    };
    const naAba = function (c) {
      return st === 'ativas'
        ? c.status === 'Em andamento' || c.status === 'Ativa'
        : st === 'finalizadas'
          ? c.status === 'Finalizada'
          : st === 'concluidas'
            ? c.status === 'Concluída'
            : c.status === 'Lixeira';
    };
    const vis = base.filter(function (c) {
      if (!qq) return naAba(c);
      if (txt(c).indexOf(qq) < 0) return false;
      return st === 'lixeira' ? c.status === 'Lixeira' : c.status !== 'Lixeira';
    });
    const tk = vis.reduce(
      function (a, c) {
        const k = DB.calc(c);
        a.dep += k.dep + k.red;
        a.saq += k.saq;
        a.ds += k.ds;
        a.sal += k.sal || 0;
        a.com += k.com;
        a.lucro += k.lucro;
        a.pend += k.pend || 0;
        return a;
      },
      { dep: 0, saq: 0, ds: 0, sal: 0, com: 0, lucro: 0, pend: 0 },
    );
    const abaNome = qq
      ? 'Resultado da busca'
      : st === 'ativas'
        ? 'Ativas'
        : st === 'finalizadas'
          ? 'Finalizadas'
          : st === 'concluidas'
            ? 'Concluídas'
            : 'Lixeira';
    const final = !qq && st === 'concluidas';
    const fimV = final ? tk.lucro : tk.ds;
    const fimL = final
      ? fimV >= 0
        ? 'Lucro final'
        : 'Prejuízo final'
      : st === 'ativas' && !qq
        ? fimV >= 0
          ? 'Resultado parcial'
          : 'Prejuízo parcial'
        : 'Depósito × Saque';
    const count = function (fn) {
      return base.filter(fn).length;
    };
    if (open && DB.coop(open))
      return (
        <CoopDetail
          id={open}
          session={session}
          onClose={function () {
            setOpen(null);
          }}
        />
      );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="ms7c-bar">
          <div className="ms7c-bar-dates">
            <input
              type="date"
              className="ms7-native"
              aria-label="De"
              value={de0}
              max={ate0 || undefined}
              onChange={function (e) {
                setDe0(e.target.value);
                setDt('');
              }}
            />
            <span className="ms7c-bar-sep">até</span>
            <input
              type="date"
              className="ms7-native"
              aria-label="Até"
              value={ate0}
              min={de0 || undefined}
              onChange={function (e) {
                setAte0(e.target.value);
                setDt('');
              }}
            />
          </div>
          <Tabs variant="chips" value={rng ? dt : 'Todos'} onChange={escolhe} items={['Diário', 'Semanal', 'Mensal', 'Todos']} />
          {rng ? (
            <span className="ms7c-bar-note">
              {st === 'ativas' && !qq
                ? 'Ativas: pela data de início'
                : st === 'concluidas' && !qq
                  ? 'Pela data em que foi concluída'
                  : st === 'finalizadas' && !qq
                    ? 'Pela data em que foi finalizada'
                    : 'Fechadas pela data de fechamento; ativas pela de início'}
            </span>
          ) : null}
          <Button
            size="sm"
            variant="ghost"
            iconLeft="refresh-cw"
            style={{ marginLeft: 'auto' }}
            onClick={function () {
              toast('Dados atualizados');
            }}
          >
            Atualizar
          </Button>
        </div>
        {(function () {
          const tq = vis.reduce(
            function (a, c) {
              const k = DB.calc(c);
              a.dep += k.dep;
              a.red += k.red;
              a.bau += k.ds - (k.saq - k.dep - k.red);
              a.depos += +c.depositantes || c.contas.length;
              return a;
            },
            { dep: 0, red: 0, bau: 0, depos: 0 },
          );
          const resV = isOp ? tk.com : fimV;
          const Q = [
            [
              'Total ativas',
              count(function (c) {
                return c.status === 'Ativa' || c.status === 'Em andamento';
              }),
              'cooperações em andamento',
              'activity',
              'var(--ms7-green)',
            ],
            [
              'Concluídas',
              count(function (c) {
                return c.status === 'Concluída';
              }),
              'cooperações fechadas',
              'circle-check',
              'var(--ms7-blue)',
            ],
            ['Depositantes', tq.depos, abaNome.toLowerCase(), 'users', 'var(--ms7-purple)'],
            ['Depósito', MS7.brl(tq.dep), null, 'arrow-down-to-line', 'var(--ms7-blue)'],
            ['Re-depósito', MS7.brl(tq.red), null, 'circle-dollar-sign', 'var(--ms7-blue)'],
            ['Saque', MS7.brl(tk.saq), null, 'arrow-up-from-line', 'var(--ms7-blue)'],
            ['Baú', MS7.brl(tq.bau), null, 'package', 'var(--ms7-yellow)'],
            [isOp ? 'Minha comissão' : fimL, MS7.brl(resV), null, resV >= 0 ? 'trending-up' : 'trending-down', resV >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)', 1],
          ];
          return (
            <div className="ms7c-kpis ms7-stagger">
              {Q.map(function (x) {
                return (
                  <div key={x[0]} className="ms7-card ms7c-kpi">
                    <div className="ms7c-kpi-head">
                      <span className="ms7-eyebrow">{x[0]}</span>
                      <span className="ms7c-tile" style={{ background: 'color-mix(in oklab, ' + x[4] + ' 12%, var(--surface-card))', color: x[4] }}>
                        <DS.Icon name={x[3]} size={15} strokeWidth={2} />
                      </span>
                    </div>
                    <div className="ms7c-kpi-val ms7-num" style={{ color: x[5] ? x[4] : 'var(--text-primary)' }}>
                      <DS.CountUp value={x[1]} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
        {!isOp && final && vis.length ? (
          <p className="ms7c-rule">
            <DS.Icon name="info" size={14} />
            <span>
              {'Dep. × Saque ' +
                MS7.brl(tk.ds) +
                (tk.sal ? ' + salário ' + MS7.brl(tk.sal) : '') +
                ' − comissão ' +
                MS7.brl(tk.com) +
                ' = ' +
                MS7.brl(tk.lucro)}
            </span>
          </p>
        ) : null}
        {!isOp && !final && !qq && st !== 'lixeira' && vis.length ? (
          <p className="ms7c-rule">
            <DS.Icon name="info" size={14} />
            <span>
              {st === 'ativas'
                ? 'Só depósito e saque lançados até agora. Salário, baú e comissão entram quando a cooperação for concluída.'
                : 'Depósito × saque das finalizadas. Salário, baú e comissão entram quando você marcar como Concluída.'}
            </span>
          </p>
        ) : null}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Tabs
            variant="chips"
            value={st}
            onChange={setSt}
            items={[
              {
                id: 'ativas',
                label: 'Ativas',
                count: count(function (c) {
                  return c.status === 'Ativa' || c.status === 'Em andamento';
                }),
              },
              {
                id: 'finalizadas',
                label: 'Finalizadas',
                count: count(function (c) {
                  return c.status === 'Finalizada';
                }),
              },
              {
                id: 'concluidas',
                label: 'Concluídas',
                count: count(function (c) {
                  return c.status === 'Concluída';
                }),
              },
              {
                id: 'lixeira',
                label: 'Lixeira',
                count: count(function (c) {
                  return c.status === 'Lixeira';
                }),
              },
            ]}
          />
          {!isOp && !window.ms7SemOp && !meu ? (
            <Select
              variant="pill"
              value={op}
              onChange={function (e) {
                setOp(e.target.value);
              }}
              options={[{ value: '', label: 'Todos os operadores' }].concat(
                db.operadores.map(function (o) {
                  return { value: o.id, label: o.nome };
                }),
              )}
            />
          ) : null}
          <div style={{ flex: '1 1 200px', maxWidth: 300, marginLeft: 'auto' }}>
            <Input
              icon="search"
              placeholder="Buscar link, ID, plataforma ou operador"
              value={q}
              onChange={function (e) {
                setQ(e.target.value);
              }}
            />
          </div>
          <Button
            variant="outline"
            iconLeft="download"
            onClick={function () {
              exportCSV(
                'cooperacoes',
                [
                  {
                    label: 'ID',
                    get: function (c) {
                      return c.id;
                    },
                  },
                  {
                    label: 'Cliente',
                    get: function (c) {
                      return c.cliente;
                    },
                  },
                  {
                    label: 'Operador',
                    get: function (c) {
                      return DB.opName(c.opId);
                    },
                  },
                  {
                    label: 'Plataforma',
                    get: function (c) {
                      return c.plataforma;
                    },
                  },
                  {
                    label: 'Rede',
                    get: function (c) {
                      return c.rede;
                    },
                  },
                  {
                    label: 'Status',
                    get: function (c) {
                      return c.status;
                    },
                  },
                  {
                    label: 'Início',
                    get: function (c) {
                      return c.inicio;
                    },
                  },
                  {
                    label: 'Contas',
                    get: function (c) {
                      return DB.calc(c).n;
                    },
                  },
                  {
                    label: 'Depósito',
                    get: function (c) {
                      const k = DB.calc(c);
                      return k.dep + k.red;
                    },
                  },
                  {
                    label: 'Saque',
                    get: function (c) {
                      return DB.calc(c).saq;
                    },
                  },
                  {
                    label: 'Resultado',
                    get: function (c) {
                      return DB.calc(c).res;
                    },
                  },
                  {
                    label: 'Comissão',
                    get: function (c) {
                      return DB.calc(c).com;
                    },
                  },
                  {
                    label: 'Custo',
                    get: function (c) {
                      return DB.calc(c).custo;
                    },
                  },
                  {
                    label: 'Lucro líquido',
                    get: function (c) {
                      return DB.calc(c).lucro;
                    },
                  },
                ],
                vis,
              );
            }}
          >
            Exportar
          </Button>
          <Button
            variant="brand"
            iconLeft="plus"
            onClick={function () {
              setWiz(true);
            }}
          >
            {meu ? 'Nova cooperação minha' : bau ? 'Novo baú' : 'Nova cooperação'}
          </Button>
        </div>
        {vis.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {vis.map(function (c) {
              return (
                <CoopCard
                  key={c.id}
                  c={c}
                  canAdmin={!isOp}
                  onOpen={function () {
                    setOpen(c.id);
                  }}
                />
              );
            })}
          </div>
        ) : (
          <DS.Card padding={16}>
            <Empty
              art="Coop"
              icon={bau ? 'package' : 'briefcase'}
              title={bau ? 'Nenhum baú encontrado' : 'Nenhuma cooperação encontrada'}
              sub={bau ? 'Ajuste os filtros ou crie um novo baú.' : 'Ajuste os filtros ou crie uma nova cooperação.'}
              action={
                <Button
                  variant="brand"
                  iconLeft="plus"
                  onClick={function () {
                    setWiz(true);
                  }}
                >
                  {meu ? 'Nova cooperação minha' : bau ? 'Novo baú' : 'Nova cooperação'}
                </Button>
              }
            />
          </DS.Card>
        )}
        <CoopWizard
          open={wiz}
          session={session}
          bau={bau}
          meu={meu}
          onClose={function () {
            setWiz(false);
          }}
        />
      </div>
    );
  }
  function ListasScreen() {
    const { Card, DataTable, Badge, Button, IconButton, Tabs, Input, Modal, Select } = DS;
    const db = DB.useDB();
    const [tab, setTab] = usePersist('listas-tab', 'geral');
    const [q, setQ] = React.useState('');
    const [st, setSt] = React.useState('Todos');
    const [listas, setListas] = usePersist('listas', MS7.listas);
    const [nova, setNova] = React.useState(false);
    const [nome, setNome] = React.useState('');
    const [tg, setTg] = React.useState(false);
    const all = [];
    db.coops.forEach(function (c) {
      if (c.status === 'Lixeira') return;
      c.contas.forEach(function (k) {
        all.push(Object.assign({ coopId: c.id, operador: DB.opName(c.opId), plataforma: c.plataforma }, k));
      });
    });
    const rows = all.filter(function (r) {
      return (st === 'Todos' || r.status === st) && (r.usuario + r.operador + r.plataforma + r.coopId).toLowerCase().indexOf(q.toLowerCase()) >= 0;
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { id: 'geral', label: 'Lista geral de contas' },
            { id: 'globais', label: 'Listas globais' },
          ]}
          style={{ maxWidth: 460 }}
        />
        {tab === 'geral' ? (
          <Card
            title={
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Lista geral de contas
                <DS.CountDot tone="muted">{rows.length}</DS.CountDot>
              </span>
            }
            action={
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <Select
                  variant="pill"
                  value={st}
                  onChange={function (e) {
                    setSt(e.target.value);
                  }}
                  options={['Todos'].concat(CONTA_ST)}
                />
                <div style={{ width: 220 }}>
                  <Input
                    icon="search"
                    placeholder="Buscar conta"
                    value={q}
                    onChange={function (e) {
                      setQ(e.target.value);
                    }}
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  iconLeft="download"
                  onClick={function () {
                    exportCSV(
                      'contas',
                      [
                        {
                          label: 'Cooperação',
                          get: function (r) {
                            return r.coopId;
                          },
                        },
                        {
                          label: 'Operador',
                          get: function (r) {
                            return r.operador;
                          },
                        },
                        {
                          label: 'Plataforma',
                          get: function (r) {
                            return r.plataforma;
                          },
                        },
                        {
                          label: 'Usuário',
                          get: function (r) {
                            return r.usuario;
                          },
                        },
                        {
                          label: 'Depósito',
                          get: function (r) {
                            return r.deposito;
                          },
                        },
                        {
                          label: 'Re-depósito',
                          get: function (r) {
                            return r.redeposito;
                          },
                        },
                        {
                          label: 'Saque',
                          get: function (r) {
                            return r.saque;
                          },
                        },
                        { label: 'Resultado', get: DB.contaRes },
                        {
                          label: 'Status',
                          get: function (r) {
                            return r.status;
                          },
                        },
                        {
                          label: 'Criada',
                          get: function (r) {
                            return r.criada;
                          },
                        },
                      ],
                      rows,
                    );
                  }}
                >
                  Exportar
                </Button>
              </div>
            }
          >
            <DataTable
              rows={rows.slice(0, 60)}
              onRowClick={function (r) {
                localStorage.setItem('ms7op-open-coop', r.coopId);
                window.ms7Go('cooperacoes');
              }}
              columns={[
                { key: 'coopId', label: 'Coop.' },
                { key: 'operador', label: 'Operador' },
                { key: 'plataforma', label: 'Plataforma' },
                {
                  key: 'usuario',
                  label: 'Usuário',
                  render: function (r) {
                    return <span style={{ fontWeight: 600 }}>{r.usuario}</span>;
                  },
                },
                {
                  key: 'deposito',
                  label: 'Depósito',
                  align: 'right',
                  render: function (r) {
                    return MS7.brl(r.deposito + r.redeposito);
                  },
                },
                {
                  key: 'saque',
                  label: 'Saque',
                  align: 'right',
                  render: function (r) {
                    return MS7.brl(r.saque);
                  },
                },
                {
                  key: 'res',
                  label: 'Resultado',
                  align: 'right',
                  render: function (r) {
                    return <Money v={DB.contaRes(r)} signed />;
                  },
                },
                {
                  key: 'status',
                  label: 'Status',
                  align: 'center',
                  render: function (r) {
                    return (
                      <Badge size="sm" tone={MS7.statusTone[r.status]}>
                        {r.status}
                      </Badge>
                    );
                  },
                },
                {
                  key: 'criada',
                  label: 'Criada',
                  render: function (r) {
                    return DB.fmtDate(r.criada);
                  },
                },
              ]}
            />
            {rows.length === 0 ? (
              <Empty art="Coop" icon="list" title="Nenhum resultado." sub={'Nenhuma conta bate com o filtro ou a\u00a0busca.'} compact />
            ) : rows.length > 60 ? (
              <Hint>{'Mostrando 60 de ' + rows.length + '. Use a busca ou exporte para ver todas.'}</Hint>
            ) : null}
          </Card>
        ) : (
          <Card
            title="Listas globais"
            action={
              <div style={{ display: 'flex', gap: 10 }}>
                <Button
                  size="sm"
                  variant="outline"
                  iconLeft="send"
                  onClick={function () {
                    setTg(true);
                  }}
                >
                  Importar do Telegram
                </Button>
                <Button
                  size="sm"
                  variant="brand"
                  iconLeft="plus"
                  onClick={function () {
                    setNova(true);
                  }}
                >
                  Nova lista
                </Button>
              </div>
            }
          >
            <Hint>Catálogos reutilizáveis de contas.</Hint>
            {listas.length ? (
              <div className="ms7-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}>
                {listas.map(function (l) {
                  return (
                    <div key={l.id} className="ms7c-lista">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="ms7c-tile" style={{ background: 'var(--surface-card)', color: 'var(--ms7-green-900)' }}>
                          <DS.Icon name="list-checks" size={15} strokeWidth={2} />
                        </span>
                        <span className="ms7c-lista-t">{l.nome}</span>
                        <IconButton
                          icon="trash-2"
                          size={30}
                          iconSize={15}
                          label="Remover lista"
                          style={{ color: 'var(--text-secondary)' }}
                          onClick={function () {
                            setListas(
                              listas.filter(function (x) {
                                return x.id !== l.id;
                              }),
                            );
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-secondary)' }}>{l.descricao}</span>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <Badge size="sm" variant="soft" tone="green">
                          {l.contas + ' contas'}
                        </Badge>
                        <Badge size="sm" variant="soft" tone="gray">
                          {l.dono}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Empty art="Coop" title="Nenhuma lista global ainda" sub={'Crie uma lista ou importe uma do Telegram para reaproveitar\u00a0contas.'} compact />
            )}
          </Card>
        )}
        <Modal
          open={nova}
          onClose={function () {
            setNova(false);
          }}
          title="Nova lista global"
          footer={
            <React.Fragment>
              <Button
                variant="secondary"
                onClick={function () {
                  setNova(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="brand"
                onClick={function () {
                  setListas(listas.concat([{ id: Date.now(), nome: nome || 'Nova lista', descricao: 'Sem descrição.', contas: 0, dono: 'Admin' }]));
                  setNome('');
                  setNova(false);
                  toast('Lista criada');
                }}
              >
                Salvar
              </Button>
            </React.Fragment>
          }
        >
          <Input
            label="Nome"
            required
            value={nome}
            onChange={function (e) {
              setNome(e.target.value);
            }}
          />
        </Modal>
        <Modal
          open={tg}
          onClose={function () {
            setTg(false);
          }}
          title="Importar lista do Telegram"
          size="lg"
          footer={
            <React.Fragment>
              <Button
                variant="secondary"
                onClick={function () {
                  setTg(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="brand"
                iconLeft="upload"
                onClick={function () {
                  setTg(false);
                  toast('Lista importada');
                }}
              >
                Importar
              </Button>
            </React.Fragment>
          }
        >
          <Input label="Cole a lista do Telegram" multiline rows={8} placeholder={'usuario1 | senha | 300\nusuario2 | senha | 450'} />
        </Modal>
      </div>
    );
  }
  function AvisosScreen({ session }) {
    const { Card, Input, Checkbox, Button, IconButton, Badge } = DS;
    const isOp = session.role === 'operador';
    const [list, setList] = usePersist('avisos', MS7.avisos);
    const [t, setT] = React.useState('');
    const [c, setC] = React.useState('');
    const [all, setAll] = React.useState(true);
    const [gs, setGs] = React.useState([]);
    const ok = t && c && (all || gs.length);
    function pub() {
      setList(
        [
          {
            id: Date.now(),
            titulo: t,
            conteudo: c,
            data: DB.fmtDate(DB.iso(DB.today)) + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            publico: all ? 'Todos os usuários' : gs.join(', '),
          },
        ].concat(list),
      );
      setT('');
      setC('');
      setGs([]);
      setAll(true);
      toast('Aviso publicado');
    }
    const listCard = (
      <Card title="Avisos publicados" subtitle={list.length ? list.length + (list.length === 1 ? ' aviso' : ' avisos') : null}>
        {list.length ? (
          <div className="ms7-stagger" style={{ display: 'flex', flexDirection: 'column' }}>
            {list.map(function (a) {
              return (
                <div key={a.id} className="ms7c-av">
                  <span className="ms7c-tile" style={{ width: 34, height: 34, background: 'var(--ms7-lime-100)', color: 'var(--ms7-green-ink)' }}>
                    <DS.Icon name="megaphone" size={16} strokeWidth={2} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em', lineHeight: 1.3 }}>{a.titulo}</div>
                    <p style={{ margin: '3px 0 8px', fontSize: 13, fontWeight: 500, lineHeight: 1.5, whiteSpace: 'pre-line', color: 'var(--text-secondary)' }}>
                      {a.conteudo}
                    </p>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className="ms7-num" style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>
                        {a.data}
                      </span>
                      <Badge size="sm" variant="soft" tone="blue">
                        {a.publico}
                      </Badge>
                    </div>
                  </div>
                  {!isOp ? (
                    <IconButton
                      icon="trash-2"
                      className="ms7c-av-del"
                      size={30}
                      iconSize={15}
                      label="Remover aviso"
                      onClick={function () {
                        setList(
                          list.filter(function (x) {
                            return x.id !== a.id;
                          }),
                        );
                      }}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : (
          <Empty art="Bell" icon="megaphone" title="Nenhum aviso publicado ainda" sub={'Os avisos publicados ficam listados aqui.'} />
        )}
      </Card>
    );
    if (isOp) return listCard;
    return (
      <Grid min={340}>
        <Card title="Publicar aviso">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input
              label="Título do aviso"
              value={t}
              onChange={function (e) {
                setT(e.target.value);
              }}
            />
            <Input
              label="Conteúdo"
              multiline
              rows={5}
              placeholder="Escreva o aviso…"
              value={c}
              onChange={function (e) {
                setC(e.target.value);
              }}
            />
            <div style={{ background: 'var(--surface-muted)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="ms7-label" style={{ gap: 6 }}>
                <DS.Icon name="users" size={14} />
                Público-alvo
              </span>
              <Checkbox label="Notificar todos os usuários" checked={all} onChange={setAll} />
              {!all
                ? MS7.grupos.map(function (g) {
                    return (
                      <Checkbox
                        key={g}
                        label={g}
                        checked={gs.indexOf(g) >= 0}
                        onChange={function (v) {
                          setGs(
                            v
                              ? gs.concat([g])
                              : gs.filter(function (x) {
                                  return x !== g;
                                }),
                          );
                        }}
                        style={{ paddingLeft: 28 }}
                      />
                    );
                  })
                : null}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="brand" iconLeft="megaphone" disabled={!ok} onClick={pub}>
                Publicar aviso
              </Button>
            </div>
          </div>
        </Card>
        {listCard}
      </Grid>
    );
  }
  function EnviosBau() {
    DB.useDB();
    const db = DB.get();
    const [led0, setLed] = usePersist('envios-bau', []);
    const led = Array.isArray(led0) ? led0 : [];
    const [st, setSt] = React.useState('pend');
    const [reg, setReg] = React.useState(null);
    const [val, setVal] = React.useState('');
    const [hist, setHist] = React.useState('');
    const r2 = function (v) {
      return Math.round(v * 100) / 100;
    };
    const nm = function (c) {
      return [DB.coopNome(c), c.linkN].filter(Boolean).join(' · ');
    };
    const L = (db.coops || [])
      .filter(function (c) {
        return c.tipo === 'bau' && c.status !== 'Lixeira';
      })
      .sort(function (a, b) {
        return String(a.inicio || a.id).localeCompare(String(b.inicio || b.id));
      })
      .map(function (c) {
        const V = DB.contasValidas(c);
        const dep = r2(
          V.reduce(function (a, k) {
            return a + (+k.deposito || 0) + (+k.redeposito || 0);
          }, 0),
        );
        const com = r2(c.proprio ? 0 : DB.calc(c).com || 0);
        return { c: c, dep: dep, com: com, total: r2(dep + com) };
      })
      .filter(function (x) {
        return x.total > 0;
      });
    const G = {};
    L.forEach(function (x) {
      const k = x.c.opId || '';
      (G[k] = G[k] || { l: [], led: [] }).l.push(x);
    });
    led.forEach(function (e) {
      const k = e.opId || '';
      (G[k] = G[k] || { l: [], led: [] }).led.push(e);
    });
    Object.keys(G).forEach(function (k) {
      const g = G[k];
      let resto = r2(
        g.led.reduce(function (a, e) {
          return a + (+e.v || 0);
        }, 0),
      );
      g.env = resto;
      g.dev = r2(
        g.l.reduce(function (a, x) {
          return a + x.total;
        }, 0),
      );
      g.l.forEach(function (x) {
        x.env = r2(Math.min(resto, x.total));
        x.falta = r2(x.total - x.env);
        resto = r2(resto - x.env);
      });
      g.cred = r2(Math.max(0, resto));
      g.falta = r2(Math.max(0, g.dev - g.env));
      g.led.sort(function (a, b) {
        return b.em - a.em;
      });
    });
    const ks = Object.keys(G)
      .filter(function (k) {
        const g = G[k];
        return st === 'todos' || (st === 'pend' ? g.falta > 0 : g.falta <= 0);
      })
      .sort(function (a, b) {
        return DB.opName(a).localeCompare(DB.opName(b), 'pt-BR');
      });
    const T = Object.keys(G).reduce(
      function (a, k) {
        a.d += G[k].dev;
        a.e += G[k].env;
        a.f += G[k].falta;
        return a;
      },
      { d: 0, e: 0, f: 0 },
    );
    const n = parseFloat(String(val).replace(/\./g, '').replace(',', '.')) || 0;
    function salvarEnvio() {
      if (!(n > 0)) return;
      const g = G[reg.k] || { l: [] };
      setLed(function (cur) {
        return (Array.isArray(cur) ? cur : []).concat([
          {
            id: 'eb' + Date.now(),
            opId: reg.k,
            v: r2(n),
            em: Date.now(),
            refNome: g.l
              .filter(function (x) {
                return x.falta > 0;
              })
              .map(function (x) {
                return nm(x.c);
              })
              .join(', '),
          },
        ]);
      });
      setReg(null);
      toast('Envio de ' + MS7.brl(n) + ' anotado');
    }
    const td = { padding: '9px 8px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KpiRow
          items={[
            { icon: 'send', label: 'Total p/ envio', value: MS7.brl(r2(T.d)), tone: 'blue' },
            { icon: 'circle-check', label: 'Já enviado', value: MS7.brl(r2(T.e)), tone: 'green' },
            { icon: 'clock', label: 'Falta enviar', value: MS7.brl(r2(T.f)), tone: 'orange' },
          ]}
        />
        <DS.Tabs
          variant="chips"
          value={st}
          onChange={setSt}
          items={[
            { id: 'pend', label: 'Falta enviar' },
            { id: 'ok', label: 'Enviados' },
            { id: 'todos', label: 'Todos' },
          ]}
        />
        {ks.length ? (
          ks.map(function (k) {
            const g = G[k];
            const nome = k ? DB.opName(k) : 'Admin';
            return (
              <div
                key={k || 'x'}
                className="ms7-card"
                data-reveal="up"
                style={{
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <DS.Avatar name={nome} size={34} />
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <b style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.015em' }}>{nome}</b>
                    <div className="ms7-num" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
                      {'Total ' + MS7.brl(g.dev) + ' · enviado ' + MS7.brl(g.env)}
                    </div>
                  </div>
                  {g.falta > 0 ? (
                    <DS.Badge tone="orange">{'Falta ' + MS7.brl(g.falta)}</DS.Badge>
                  ) : (
                    <DS.Badge tone="green">Tudo enviado</DS.Badge>
                  )}
                  {g.cred > 0 ? <span className="ms7-num" style={{ fontSize: 13, fontWeight: 600 }}>{'Crédito ' + MS7.brl(g.cred)}</span> : null}
                  <DS.Button
                    size="sm"
                    variant="secondary"
                    iconLeft="history"
                    onClick={function () {
                      setHist(hist === k ? '' : k);
                    }}
                  >
                    {'Envios (' + g.led.length + ')'}
                  </DS.Button>
                  <DS.Button
                    size="sm"
                    variant="brand"
                    iconLeft="banknote"
                    onClick={function () {
                      setVal(String(g.falta.toFixed(2)).replace('.', ','));
                      setReg({ k: k, nome: nome, falta: g.falta });
                    }}
                  >
                    Registrar envio
                  </DS.Button>
                </div>
                {hist === k ? (
                  <div style={{ padding: '8px 12px', borderRadius: 10, background: 'var(--surface-muted)' }}>
                    {g.led.length ? (
                      g.led.map(function (e) {
                        return (
                          <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 500, minHeight: 30 }}>
                            <span style={{ width: 110, color: 'var(--text-secondary)' }}>
                              {new Date(e.em).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <b className="ms7-num" style={{ width: 100, fontWeight: 600 }}>{MS7.brl(e.v)}</b>
                            <span
                              style={{
                                flex: 1,
                                minWidth: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              {e.refNome || ''}
                            </span>
                            <DS.IconButton
                              icon="trash-2"
                              size={26}
                              iconSize={13}
                              label="Apagar envio"
                              onClick={function () {
                                if (confirm('Apagar este envio?'))
                                  setLed(function (cur) {
                                    return cur.filter(function (y) {
                                      return y.id !== e.id;
                                    });
                                  });
                              }}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Nenhum envio anotado.</span>
                    )}
                  </div>
                ) : null}
                {g.l.length ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                      <thead>
                        <tr style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                          <th style={{ textAlign: 'left', padding: '6px 8px' }}>Baú</th>
                          <th style={td}>Depósito</th>
                          <th style={td}>Comissão</th>
                          <th style={td}>Total</th>
                          <th style={td}>Enviado</th>
                          <th style={td}>Falta</th>
                        </tr>
                      </thead>
                      <tbody>
                        {g.l.map(function (x) {
                          return (
                            <tr key={x.c.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                              <td style={{ padding: '9px 8px', fontWeight: 600 }}>
                                {nm(x.c)}
                                <span style={{ marginLeft: 6, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{x.c.status}</span>
                              </td>
                              <td style={td}>{MS7.brl(x.dep)}</td>
                              <td style={td}>{MS7.brl(x.com)}</td>
                              <td style={Object.assign({}, td, { fontWeight: 600 })}>{MS7.brl(x.total)}</td>
                              <td style={td}>{x.env ? MS7.brl(x.env) : '—'}</td>
                              <td style={Object.assign({}, td, { fontWeight: 600, color: x.falta > 0 ? 'var(--ms7-orange)' : 'var(--ms7-green)' })}>
                                {x.falta > 0 ? MS7.brl(x.falta) : 'OK'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Sem baú no momento. Os envios continuam anotados.</span>
                )}
              </div>
            );
          })
        ) : (
          <DS.Card padding={16}>
            <Empty art="Wallet" title={st === 'pend' ? 'Nada falta enviar nos baús.' : 'Nada aqui.'} sub={st === 'pend' ? 'Quando um baú tiver depósito ou comissão a enviar, ele aparece aqui.' : 'Mude o filtro acima para ver outros envios.'} />
          </DS.Card>
        )}
        {reg ? (
          <DS.Modal
            open
            onClose={function (e) {
              if (e && e.currentTarget && e.currentTarget.tagName === 'BUTTON') setReg(null);
            }}
            title="Registrar envio"
            subtitle={reg.nome + ' · falta ' + MS7.brl(reg.falta)}
            size="sm"
            footer={
              <React.Fragment>
                <DS.Button
                  variant="secondary"
                  onClick={function () {
                    setReg(null);
                  }}
                >
                  Cancelar
                </DS.Button>
                <DS.Button variant="brand" iconLeft="check" disabled={!(n > 0)} onClick={salvarEnvio}>
                  {'Registrar ' + MS7.brl(n)}
                </DS.Button>
              </React.Fragment>
            }
          >
            <DS.Input
              label="Quanto você enviou agora"
              prefix="R$"
              value={val}
              onChange={function (e) {
                setVal(e.target.value);
              }}
              autoFocus
            />
          </DS.Modal>
        ) : null}
      </div>
    );
  }
  function BauScreen(p) {
    const adm = !p.session || p.session.role !== 'operador';
    const [aba, setAba] = usePersist('bau-aba', 'baus');
    if (!adm) return <CooperacoesScreen session={p.session} bau={true} />;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <DS.Tabs
          variant="dark"
          value={aba}
          onChange={setAba}
          items={[
            { id: 'baus', label: 'Baús' },
            { id: 'metas', label: 'Metas' },
            { id: 'envios', label: 'Envios e pagamentos' },
          ]}
          style={{ maxWidth: 560 }}
        />
        {aba === 'envios' ? (
          <EnviosBau />
        ) : aba === 'metas' ? (
          React.createElement(window.MetasScreen, {
            go: p.go,
            role: p.role || (p.session && p.session.role),
            bau: true,
            onAbrir: function () {
              setAba('baus');
            },
          })
        ) : (
          <CooperacoesScreen session={p.session} bau={true} />
        )}
      </div>
    );
  }
  function MinhasScreen(p) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
          Cooperações que você mesmo faz, sem operador e sem comissão. O resultado delas entra no lucro total do Dashboard e do Financeiro.
        </div>
        <CooperacoesScreen session={p.session} meu={true} />
      </div>
    );
  }
  Object.assign(window, {
    MinhasScreen: MinhasScreen,
    BauScreen: BauScreen,
    CooperacoesScreen: CooperacoesScreen,
    ListasScreen: ListasScreen,
    AvisosScreen: AvisosScreen,
  });
})();
