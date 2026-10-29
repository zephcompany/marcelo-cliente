(function () {
  const DS = window.MS7DesignSystem_5d5172;
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 14px',
              borderRadius: 12,
              background:
                dif === 0 ? 'color-mix(in oklab, var(--ms7-green) 12%, transparent)' : 'color-mix(in oklab, var(--ms7-error) 12%, transparent)',
            }}
          >
            <DS.Icon name={dif === 0 ? 'circle-check' : 'triangle-alert'} size={18} color={dif === 0 ? 'var(--ms7-green)' : 'var(--ms7-error)'} />
            <b style={{ fontSize: 14 }}>
              {dif === 0 ? 'Bate certinho com o painel' : (dif < 0 ? 'Faltam ' : 'Sobram ') + brl(Math.abs(dif)) + ' na conta'}
            </b>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
            Ao confirmar, esses saques saem de "A conferir" e o contador deste grupo volta a zero.
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
    const card = { background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' };
    const kpi = function (l, v, cor) {
      return (
        <div style={Object.assign({}, card, { padding: '14px 18px', flex: '1 1 180px', minWidth: 0 })}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{l}</div>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 6, fontVariantNumeric: 'tabular-nums', color: cor || 'var(--text-primary)' }}>
            {v}
          </div>
        </div>
      );
    };
    const H = C.hist || [];
    const difTot = H.reduce(function (a, h) {
      return a + (h.real - h.esperado);
    }, 0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
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
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {kpi('Total a conferir', brl(tot))}
              {kpi('Saques', pend.length)}
              {kpi('Grupos com valor', lista.length)}
            </div>
            {lista.length ? (
              lista.map(function (grp) {
                const on = aberto === grp.g.id;
                const porOp = {};
                grp.itens.forEach(function (x) {
                  const o = (porOp[x.op] = porOp[x.op] || { n: 0, v: 0 });
                  o.n++;
                  o.v += x.valor;
                });
                return (
                  <div key={grp.g.id} style={Object.assign({}, card, { overflow: 'hidden' })}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'var(--surface-muted, var(--ms7-gray-100))',
                        }}
                      >
                        <DS.Icon name="landmark" size={18} />
                      </span>
                      <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                        <div style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.02em' }}>{gLabel(grp.g)}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginTop: 2 }}>
                          {Object.keys(porOp)
                            .map(function (o) {
                              return o + ' · ' + porOp[o].n + (porOp[o].n === 1 ? ' saque' : ' saques') + ' · ' + brl(porOp[o].v);
                            })
                            .join('   |   ')}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '.05em',
                            textTransform: 'uppercase',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          Tem que ter na conta
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{brl(grp.total)}</div>
                      </div>
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
                    {on ? (
                      <div style={{ borderTop: '1px solid var(--border-subtle)', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr
                              style={{
                                color: 'var(--text-secondary)',
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: '.05em',
                                textTransform: 'uppercase',
                              }}
                            >
                              {['Operador', 'Plataforma', 'Conta', 'Chave', 'Saque'].map(function (t, i) {
                                return (
                                  <th key={t} style={{ textAlign: i === 4 ? 'right' : 'left', padding: '8px 18px' }}>
                                    {t}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {grp.itens.map(function (x) {
                              return (
                                <tr key={x.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                                  <td style={{ padding: '9px 18px', fontWeight: 700 }}>{x.op}</td>
                                  <td style={{ padding: '9px 18px' }}>{x.plat}</td>
                                  <td style={{ padding: '9px 18px' }}>{x.ct.usuario || '—'}</td>
                                  <td style={{ padding: '9px 18px', fontFamily: 'ui-monospace, monospace' }}>
                                    {x.k.tipo ? PIXV.format(x.k.tipo, x.k.valor) : x.k.valor}
                                  </td>
                                  <td style={{ padding: '9px 18px', textAlign: 'right', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                                    {brl(x.valor)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <div
                style={Object.assign({}, card, {
                  padding: '48px 20px',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontSize: 14,
                  fontWeight: 600,
                })}
              >
                Nada para conferir. Quando o operador coloca uma chave e marca a conta como Sacado, o valor aparece aqui no grupo da chave.
              </div>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {kpi('Conferências', H.length)}
              {kpi(
                'Total conferido',
                brl(
                  H.reduce(function (a, h) {
                    return a + h.real;
                  }, 0),
                ),
              )}
              {kpi(
                'Diferença acumulada',
                (difTot > 0 ? '+' : '') + brl(difTot),
                difTot < 0 ? 'var(--ms7-error)' : difTot > 0 ? 'var(--ms7-orange)' : undefined,
              )}
            </div>
            <div style={Object.assign({}, card, { overflowX: 'auto' })}>
              {H.length ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ color: 'var(--text-secondary)', fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase' }}>
                      {['Data', 'Grupo', 'Operadores', 'Saques', 'Esperado', 'Caiu', 'Diferença', ''].map(function (t, i) {
                        return (
                          <th key={i} style={{ textAlign: i >= 3 && i <= 6 ? 'right' : 'left', padding: '10px 16px' }}>
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
                        <tr key={h.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '10px 16px', whiteSpace: 'nowrap' }}>
                            {new Date(h.em).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td style={{ padding: '10px 16px', fontWeight: 700, textTransform: 'uppercase' }}>{h.label}</td>
                          <td style={{ padding: '10px 16px' }}>{(h.ops || []).join(', ')}</td>
                          <td style={{ padding: '10px 16px', textAlign: 'right' }}>{h.n}</td>
                          <td style={{ padding: '10px 16px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{brl(h.esperado)}</td>
                          <td style={{ padding: '10px 16px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{brl(h.real)}</td>
                          <td
                            style={{
                              padding: '10px 16px',
                              textAlign: 'right',
                              fontWeight: 800,
                              fontVariantNumeric: 'tabular-nums',
                              color: d < 0 ? 'var(--ms7-error)' : d > 0 ? 'var(--ms7-orange)' : 'var(--ms7-green)',
                            }}
                          >
                            {d === 0 ? 'OK' : (d > 0 ? '+' : '') + brl(d)}
                          </td>
                          <td style={{ padding: '6px 12px', width: 44 }}>
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
              ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600 }}>
                  Nenhuma conferência ainda.
                </div>
              )}
            </div>
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
