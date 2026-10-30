(function () {
  const DS = window.MS7DesignSystem_5d5172;
  /* ---------- CSS só desta tela (tokens) ---------- */
  const CSS = [
    '.ms7cf-tile{width:40px;height:40px;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:color-mix(in oklab,var(--ms7-green-900) 16%,transparent);color:var(--ms7-green-900)}',
    '.ms7cf-grp{display:flex;align-items:center;gap:14px;padding:16px 20px;flex-wrap:wrap;transition:background var(--dur-fast)}',
    '.ms7cf-grp+.ms7cf-grp,.ms7cf-det+.ms7cf-grp{border-top:1px solid var(--border-subtle)}',
    '.ms7cf-grp:hover{background:var(--surface-muted)}',
    '.ms7cf-det{border-top:1px solid var(--border-subtle);padding:2px 8px 6px;background:var(--surface-muted)}',
    '.ms7cf-dif{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px}',
    '.ms7cf-dif .ico{width:30px;height:30px;border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center}',
    'html[data-theme="dark"] .ms7cf-grp:hover{background:var(--glass)}',
    'html[data-theme="dark"] .ms7cf-det{background:rgba(0,0,0,.22)}',
    '@media (max-width:640px){.ms7cf-grp{padding:14px 16px}}',
  ].join('');
  if (!document.getElementById('ms7-conferencia-css')) {
    const st = document.createElement('style');
    st.id = 'ms7-conferencia-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }
  const brl = function (v) {
    return MS7.brl(v || 0);
  };
  const num = function (v) {
    return (
      parseFloat(
        String(v == null ? '' : v)
          .replace(/[R$\s]/g, '')
          .replace(/\./g, '')
          .replace(',', '.'),
      ) || 0
    );
  };
  function itensDe(db) {
    const keyInfo = {};
    (db.pix || []).forEach(function (g) {
      (g.chaves || []).forEach(function (k) {
        keyInfo[k.valor] = { k: k, g: g };
      });
    });
    const out = [];
    (db.coops || []).forEach(function (c) {
      if (c.status === 'Lixeira') return;
      (c.contas || []).forEach(function (ct) {
        if (ct.status !== 'Sacado' || !ct.pix) return;
        const v = DB.saqEf(ct);
        if (!(v > 0)) return;
        const ki = keyInfo[ct.pix];
        if (!ki) return;
        out.push({
          id: c.id + ':' + ct.id,
          c: c,
          ct: ct,
          g: ki.g,
          k: ki.k,
          valor: v,
          op: c.proprio ? 'Admin' : DB.opName(c.opId),
          plat: [c.plataforma, c.linkN].filter(Boolean).join(' · '),
        });
      });
    });
    return out;
  }
  function gLabel(g) {
    return [g.nome, g.pagamento].filter(Boolean).join(' · ');
  }
  function ConfModal({ grp, onClose, onOk }) {
    const [v, setV] = React.useState(String(grp.total.toFixed(2)).replace('.', ','));
    const r = num(v);
    const dif = Math.round((r - grp.total) * 100) / 100;
    const okC = 'var(--ms7-green)',
      badC = 'var(--ms7-error)';
    return (
      <DS.Modal
        open
        onClose={onClose}
        title={'Conferir ' + gLabel(grp.g)}
        subtitle={grp.itens.length + (grp.itens.length === 1 ? ' saque' : ' saques') + ' · esperado ' + brl(grp.total)}
        size="sm"
        footer={
          <React.Fragment>
            <DS.Button variant="secondary" onClick={onClose}>
              Cancelar
            </DS.Button>
            <DS.Button
              variant="brand"
              iconLeft="check"
              onClick={function () {
                onOk(r);
              }}
            >
              {dif === 0 ? 'Confirmar: está certo' : 'Confirmar com diferença'}
            </DS.Button>
          </React.Fragment>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <DS.Input
            label="Quanto caiu de verdade na conta"
            prefix="R$"
            value={v}
            onChange={function (e) {
              setV(e.target.value);
            }}
            autoFocus
          />
          <div
            className="ms7cf-dif"
            style={{
              background: 'color-mix(in oklab, ' + (dif === 0 ? okC : badC) + ' 10%, transparent)',
              boxShadow: 'inset 0 0 0 1px color-mix(in oklab, ' + (dif === 0 ? okC : badC) + ' 22%, transparent)',
            }}
          >
            <span className="ico" style={{ background: 'color-mix(in oklab, ' + (dif === 0 ? okC : badC) + ' 16%, transparent)', color: dif === 0 ? okC : badC }}>
              <DS.Icon name={dif === 0 ? 'circle-check' : 'triangle-alert'} size={16} strokeWidth={2} />
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: dif === 0 ? okC : badC }}>
              {dif === 0 ? 'Bate certinho com o painel' : (dif < 0 ? 'Faltam ' : 'Sobram ') + brl(Math.abs(dif)) + ' na conta'}
            </span>
          </div>
          <span style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
            Ao confirmar, esses saques saem de "A conferir" e o contador deste grupo volta a&nbsp;zero.
          </span>
        </div>
      </DS.Modal>
    );
  }
  function ConferenciaPix() {
    const db = DB.useDB();
    const [conf, setConf] = usePersist('conferencias', { feitos: {}, hist: [] });
    const C = conf && conf.feitos ? conf : { feitos: {}, hist: [] };
    const [aba, setAba] = React.useState('pend');
    const [aberto, setAberto] = React.useState(null);
    const [modal, setModal] = React.useState(null);
    const [op, setOp] = React.useState('');
    const todos = itensDe(db);
    const pend = todos.filter(function (x) {
      return !C.feitos[x.id] && (!op || x.op === op);
    });
    const grupos = {};
    pend.forEach(function (x) {
      const k = x.g.id;
      (grupos[k] = grupos[k] || { g: x.g, itens: [], total: 0 }).itens.push(x);
      grupos[k].total += x.valor;
    });
    const lista = Object.keys(grupos)
      .map(function (k) {
        return grupos[k];
      })
      .sort(function (a, b) {
        return b.total - a.total;
      });
    const ops = Array.from(
      new Set(
        todos
          .filter(function (x) {
            return !C.feitos[x.id];
          })
          .map(function (x) {
            return x.op;
          }),
      ),
    ).sort();
    const tot = pend.reduce(function (a, x) {
      return a + x.valor;
    }, 0);
    function confirmar(grp, real) {
      const ids = grp.itens.map(function (x) {
        return x.id;
      });
      const em = Date.now();
      const f = Object.assign({}, C.feitos);
      ids.forEach(function (i) {
        f[i] = em;
      });
      const h = {
        id: 'cf' + em,
        gId: grp.g.id,
        label: gLabel(grp.g),
        esperado: Math.round(grp.total * 100) / 100,
        real: Math.round(real * 100) / 100,
        n: ids.length,
        ids: ids,
        em: em,
        ops: Array.from(
          new Set(
            grp.itens.map(function (x) {
              return x.op;
            }),
          ),
        ),
      };
      setConf({ feitos: f, hist: [h].concat(C.hist || []).slice(0, 300) });
      setModal(null);
      setAberto(null);
      toast(h.real === h.esperado ? 'Conferido: ' + h.label : 'Conferido com diferença de ' + brl(h.real - h.esperado));
    }
    function desfazer(h) {
      if (!confirm('Desfazer a conferência de ' + h.label + '? Os ' + h.n + ' saques voltam para "A conferir".')) return;
      const f = Object.assign({}, C.feitos);
      (h.ids || []).forEach(function (i) {
        delete f[i];
      });
      setConf({
        feitos: f,
        hist: (C.hist || []).filter(function (x) {
          return x.id !== h.id;
        }),
      });
    }
    /* KPI compacto do DS (mesmo visual do KpiRow), com cor opcional no valor */
    const kpi = function (l, v, cor, icon, tone) {
      return <DS.StatCard key={l} variant="compact" icon={icon} tone={tone} label={l} value={v} valueColor={cor} />;
    };
    const H = C.hist || [];
    const difTot = H.reduce(function (a, h) {
      return a + (h.real - h.esperado);
    }, 0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <DS.Tabs
            variant="chips"
            value={aba}
            onChange={setAba}
            items={[
              { id: 'pend', label: 'A conferir' + (lista.length ? ' (' + lista.length + ')' : '') },
              { id: 'hist', label: 'Histórico' },
            ]}
          />
          <span style={{ flex: 1 }}></span>
          {aba === 'pend' ? (
            <div style={{ width: 210 }}>
              <DS.Select
                variant="pill"
                value={op}
                onChange={function (e) {
                  setOp(e.target.value);
                }}
                options={[{ value: '', label: 'Todos os operadores' }].concat(
                  ops.map(function (o) {
                    return { value: o, label: o };
                  }),
                )}
              />
            </div>
          ) : null}
        </div>
        {aba === 'pend' ? (
          <React.Fragment>
            <div className="ms7-kpis ms7-stagger" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(224px,1fr))' }}>
              {kpi('Total a conferir', brl(tot), undefined, 'banknote', 'green')}
              {kpi('Saques', pend.length, undefined, 'arrow-down-to-line', 'blue')}
              {kpi('Grupos com valor', lista.length, undefined, 'landmark', 'yellow')}
            </div>
            {lista.length ? (
              <section className="ms7-card" style={{ overflow: 'hidden' }}>
                {lista.map(function (grp) {
                  const on = aberto === grp.g.id;
                  const porOp = {};
                  grp.itens.forEach(function (x) {
                    const o = (porOp[x.op] = porOp[x.op] || { n: 0, v: 0 });
                    o.n++;
                    o.v += x.valor;
                  });
                  return (
                    <React.Fragment key={grp.g.id}>
                      <div className="ms7cf-grp">
                        <span className="ms7cf-tile">
                          <DS.Icon name="landmark" size={18} strokeWidth={1.9} />
                        </span>
                        <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{gLabel(grp.g)}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                            {Object.keys(porOp).map(function (o) {
                              return (
                                <DS.Badge key={o} tone="gray" variant="soft" size="sm">
                                  {o + ' · ' + porOp[o].n + (porOp[o].n === 1 ? ' saque' : ' saques') + ' · ' + brl(porOp[o].v)}
                                </DS.Badge>
                              );
                            })}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', minWidth: 0 }}>
                          <div className="ms7-eyebrow">Tem que ter na conta</div>
                          <div className="ms7-num" style={{ marginTop: 3, fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                            {brl(grp.total)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <DS.Button
                            size="sm"
                            variant="outline"
                            iconRight={on ? 'chevron-up' : 'chevron-down'}
                            onClick={function () {
                              setAberto(on ? null : grp.g.id);
                            }}
                          >
                            {grp.itens.length + (grp.itens.length === 1 ? ' saque' : ' saques')}
                          </DS.Button>
                          <DS.Button
                            size="sm"
                            variant="brand"
                            iconLeft="check"
                            onClick={function () {
                              setModal(grp);
                            }}
                          >
                            Conferido
                          </DS.Button>
                        </div>
                      </div>
                      {on ? (
                        <div className="ms7cf-det">
                          <div className="ms7-table-wrap">
                            <table className="ms7-table">
                              <thead>
                                <tr>
                                  {['Operador', 'Plataforma', 'Conta', 'Chave', 'Saque'].map(function (t, i) {
                                    return (
                                      <th key={t} style={{ textAlign: i === 4 ? 'right' : 'left' }}>
                                        {t}
                                      </th>
                                    );
                                  })}
                                </tr>
                              </thead>
                              <tbody>
                                {grp.itens.map(function (x) {
                                  return (
                                    <tr key={x.id}>
                                      <td style={{ fontWeight: 600 }}>{x.op}</td>
                                      <td>{x.plat}</td>
                                      <td>{x.ct.usuario || '—'}</td>
                                      <td className="ms7-num" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
                                        {x.k.tipo ? PIXV.format(x.k.tipo, x.k.valor) : x.k.valor}
                                      </td>
                                      <td className="ms7-num" style={{ textAlign: 'right', fontWeight: 600 }}>
                                        {brl(x.valor)}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </section>
            ) : (
              <section className="ms7-card" style={{ padding: 12 }}>
                <Empty art="Wallet" emoji="🧾" title="Nada para conferir" sub="Quando o operador coloca uma chave e marca a conta como Sacado, o valor aparece aqui no grupo da&nbsp;chave." />
              </section>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="ms7-kpis ms7-stagger" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(224px,1fr))' }}>
              {kpi('Conferências', H.length, undefined, 'list-checks', 'blue')}
              {kpi(
                'Total conferido',
                brl(
                  H.reduce(function (a, h) {
                    return a + h.real;
                  }, 0),
                ),
                undefined,
                'banknote',
                'green',
              )}
              {kpi(
                'Diferença acumulada',
                (difTot > 0 ? '+' : '') + brl(difTot),
                difTot < 0 ? 'var(--ms7-error)' : difTot > 0 ? 'var(--ms7-orange)' : undefined,
                'scale',
                'orange',
              )}
            </div>
            <section className="ms7-card" style={{ padding: H.length ? '8px 8px 4px' : 12 }}>
              {H.length ? (
                <div className="ms7-table-wrap">
                  <table className="ms7-table">
                    <thead>
                      <tr>
                        {['Data', 'Grupo', 'Operadores', 'Saques', 'Esperado', 'Caiu', 'Diferença', ''].map(function (t, i) {
                          return (
                            <th key={i} style={{ textAlign: i >= 3 && i <= 6 ? 'right' : 'left' }}>
                              {t}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {H.map(function (h) {
                        const d = Math.round((h.real - h.esperado) * 100) / 100;
                        return (
                          <tr key={h.id}>
                            <td className="ms7-num" style={{ whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>
                              {new Date(h.em).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td style={{ fontWeight: 600 }}>{h.label}</td>
                            <td>{(h.ops || []).join(', ')}</td>
                            <td className="ms7-num" style={{ textAlign: 'right' }}>
                              {h.n}
                            </td>
                            <td className="ms7-num" style={{ textAlign: 'right' }}>
                              {brl(h.esperado)}
                            </td>
                            <td className="ms7-num" style={{ textAlign: 'right' }}>
                              {brl(h.real)}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              {d === 0 ? (
                                <DS.Badge tone="green" size="sm">
                                  OK
                                </DS.Badge>
                              ) : (
                                <DS.Badge tone={d < 0 ? 'error' : 'orange'} size="sm">
                                  {(d > 0 ? '+' : '') + brl(d)}
                                </DS.Badge>
                              )}
                            </td>
                            <td style={{ width: 44, padding: '6px 8px' }}>
                              <DS.IconButton
                                icon="rotate-ccw"
                                size={30}
                                iconSize={14}
                                label="Desfazer"
                                onClick={function () {
                                  desfazer(h);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Empty art="Tasks" title="Nenhuma conferência ainda" sub="Cada conferência confirmada fica registrada aqui, com o valor esperado e o que caiu na&nbsp;conta." />
              )}
            </section>
          </React.Fragment>
        )}
        {modal ? (
          <ConfModal
            grp={modal}
            onClose={function () {
              setModal(null);
            }}
            onOk={function (r) {
              confirmar(modal, r);
            }}
          />
        ) : null}
      </div>
    );
  }
  Object.assign(window, { ConferenciaPix: ConferenciaPix });
})();
