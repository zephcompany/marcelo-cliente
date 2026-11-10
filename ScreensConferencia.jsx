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
      (c.contas || []).forEach(function (ct, ix) {
        if (ct.status !== 'Sacado' || !ct.pix) return;
        const v = DB.saqEf(ct);
        if (!(v > 0)) return;
        const ki = keyInfo[ct.pix];
        if (!ki) return;
        out.push({
          id: c.id + ':' + ct.id,
          n: (+c.contaInicio || 1) + ix,
          em: ct.sacadoEm || ct._u || c._u || 0,
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
    const [tit, setTit] = React.useState('');
    const [fora, setFora] = React.useState({});
    const isoD = function (d) {
      return d.toLocaleDateString('sv-SE');
    };
    const hj = isoD(new Date());
    const [per, setPer] = React.useState('hoje');
    const [pde, setPde] = React.useState(hj);
    const [pate, setPate] = React.useState(hj);
    const rng = (function () {
      const d = new Date();
      if (per === 'hoje') return [hj, hj];
      if (per === 'semana') {
        const x = new Date(d);
        x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
        return [isoD(x), hj];
      }
      if (per === 'passada') {
        const x = new Date(d);
        x.setDate(x.getDate() - ((x.getDay() + 6) % 7) - 7);
        const y = new Date(x);
        y.setDate(y.getDate() + 6);
        return [isoD(x), isoD(y)];
      }
      if (per === 'mes') return [hj.slice(0, 8) + '01', hj];
      if (per === 'data') return [pde, pate];
      return null;
    })();
    const inP = function (ts) {
      if (!rng) return true;
      if (!ts) return false;
      const s = isoD(new Date(ts));
      return s >= rng[0] && s <= rng[1];
    };
    const fdt = function (s) {
      return s.split('-').reverse().join('/');
    };
    const perTxt = !rng ? 'Todas as datas' : rng[0] === rng[1] ? fdt(rng[0]) : fdt(rng[0]) + ' até ' + fdt(rng[1]);
    const todos = itensDe(db);
    const pend0 = todos.filter(function (x) {
      return !C.feitos[x.id] && (!op || x.op === op);
    });
    const pend = pend0.filter(function (x) {
      return inP(x.em);
    });
    const outros = pend0.length - pend.length;
    const outrosV = pend0
      .filter(function (x) {
        return !inP(x.em);
      })
      .reduce(function (a, x) {
        return a + x.valor;
      }, 0);
    const titOf = function (g) {
      return String(g.nome || 'Sem nome')
        .trim()
        .toUpperCase()
        .replace(/\s+/g, ' ');
    };
    const titulares = (function () {
      const m = {};
      pend.forEach(function (x) {
        const t = titOf(x.g);
        m[t] = m[t] || { t: t, n: 0, v: 0 };
        m[t].n++;
        m[t].v += x.valor;
      });
      return Object.keys(m)
        .sort(function (a, b) {
          return a.localeCompare(b, 'pt-BR');
        })
        .map(function (k) {
          return m[k];
        });
    })();
    const pendT = tit
      ? pend.filter(function (x) {
          return titOf(x.g) === tit;
        })
      : pend;
    const grupos = {};
    pendT.forEach(function (x) {
      const k = x.g.id;
      (grupos[k] = grupos[k] || { g: x.g, itens: [], total: 0 }).itens.push(x);
      grupos[k].total += x.valor;
    });
    const lista = Object.keys(grupos)
      .map(function (k) {
        return grupos[k];
      })
      .sort(function (a, b) {
        const ta = titOf(a.g),
          tb = titOf(b.g);
        if (ta !== tb) return ta.localeCompare(tb, 'pt-BR');
        return String(a.g.pagamento || '').localeCompare(String(b.g.pagamento || ''), 'pt-BR');
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
    const tot = pendT.reduce(function (a, x) {
      return a + x.valor;
    }, 0);
    const [verBanco, setVerBanco] = usePersist('conf-ver-banco', true);
    const noP = todos.filter(function (x) {
      return inP(x.em) && (!op || x.op === op) && (!tit || titOf(x.g) === tit);
    });
    const porBanco = (function () {
      const m = {};
      noP.forEach(function (x) {
        const k = x.g.id;
        const r = (m[k] = m[k] || { g: x.g, v: 0, n: 0, ok: 0, okN: 0 });
        r.v += x.valor;
        r.n++;
        if (C.feitos[x.id]) {
          r.ok += x.valor;
          r.okN++;
        }
      });
      return Object.keys(m)
        .map(function (k) {
          return m[k];
        })
        .sort(function (a, b) {
          const ta = titOf(a.g),
            tb = titOf(b.g);
          if (ta !== tb) return ta.localeCompare(tb, 'pt-BR');
          return b.v - a.v;
        });
    })();
    const totP = porBanco.reduce(function (a, r) {
      return a + r.v;
    }, 0);
    const marcados = function (grp) {
      return grp.itens.filter(function (x) {
        return !fora[x.id];
      });
    };
    const togg = function (id) {
      const f = Object.assign({}, fora);
      if (f[id]) delete f[id];
      else f[id] = 1;
      setFora(f);
    };
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
      setFora({});
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
    const card = { background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' };
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
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', padding: '10px 12px', borderRadius: 12, background: 'var(--surface-card)', boxShadow: 'var(--shadow-card)' }}
            >
              <DS.Icon name="calendar" size={16} color="var(--text-secondary)" />
              {[
                ['hoje', 'Hoje'],
                ['semana', 'Esta semana'],
                ['passada', 'Semana passada'],
                ['mes', 'Este mês'],
                ['todos', 'Todos'],
                ['data', 'Escolher data'],
              ].map(function (p) {
                const on = per === p[0];
                return (
                  <button
                    key={p[0]}
                    type="button"
                    onClick={function () {
                      setPer(p[0]);
                    }}
                    style={{
                      height: 32,
                      padding: '0 12px',
                      borderRadius: 999,
                      border: '1px solid ' + (on ? 'var(--ms7-lime-500)' : 'var(--border-default)'),
                      background: on ? 'var(--ms7-lime-500)' : 'transparent',
                      color: on ? 'var(--text-on-lime)' : 'var(--text-primary)',
                      fontFamily: 'inherit',
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    {p[1]}
                  </button>
                );
              })}
              {per === 'data' ? (
                <React.Fragment>
                  <input
                    type="date"
                    className="ms7-native"
                    value={pde}
                    max={pate}
                    onChange={function (e) {
                      if (e.target.value) setPde(e.target.value);
                    }}
                    style={{
                      height: 32,
                      padding: '0 8px',
                      borderRadius: 999,
                      border: '1px solid var(--border-default)',
                      background: 'var(--surface-card)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit',
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>até</span>
                  <input
                    type="date"
                    className="ms7-native"
                    value={pate}
                    min={pde}
                    onChange={function (e) {
                      if (e.target.value) setPate(e.target.value);
                    }}
                    style={{
                      height: 32,
                      padding: '0 8px',
                      borderRadius: 999,
                      border: '1px solid var(--border-default)',
                      background: 'var(--surface-card)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit',
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  />
                </React.Fragment>
              ) : (
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginLeft: 4 }}>{perTxt}</span>
              )}
            </div>
            {rng && outros ? (
              <button
                type="button"
                onClick={function () {
                  setPer('todos');
                }}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: -8,
                  border: 0,
                  background: 'transparent',
                  padding: 0,
                  color: 'var(--ms7-orange)',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {'+ ' + outros + (outros === 1 ? ' saque' : ' saques') + ' de outros dias a conferir · ' + brl(outrosV) + ' · ver todos'}
              </button>
            ) : null}
            {titulares.length ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: '.06em', color: 'var(--text-secondary)' }}>TITULAR</span>
                {[
                  {
                    t: '',
                    n: pend.length,
                    v: pend.reduce(function (a, x) {
                      return a + x.valor;
                    }, 0),
                  },
                ]
                  .concat(titulares)
                  .map(function (x) {
                    const on = tit === x.t;
                    return (
                      <button
                        key={x.t || 'todos'}
                        type="button"
                        onClick={function () {
                          setTit(x.t);
                          setAberto(null);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          height: 34,
                          padding: '0 12px',
                          borderRadius: 999,
                          border: '1px solid ' + (on ? 'var(--ms7-lime-500)' : 'var(--border-default)'),
                          background: on ? 'var(--ms7-lime-500)' : 'var(--surface-muted)',
                          color: on ? 'var(--text-on-lime)' : 'var(--text-primary)',
                          fontFamily: 'inherit',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {x.t || 'Todos'}
                        <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.75 }}>{x.n + ' · ' + brl(x.v)}</span>
                      </button>
                    );
                  })}
              </div>
            ) : null}
            <div className="ms7-kpis ms7-stagger" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(224px,1fr))' }}>
              {kpi('Total a conferir', brl(tot), undefined, 'banknote', 'green')}
              {kpi('Saques', pendT.length, undefined, 'arrow-down-to-line', 'blue')}
              {kpi('Grupos com valor', lista.length, undefined, 'landmark', 'yellow')}
            </div>
            {porBanco.length ? (
              <div style={Object.assign({}, card, { padding: '14px 18px' })}>
                <button
                  type="button"
                  onClick={function () {
                    setVerBanco(!verBanco);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    border: 0,
                    background: 'transparent',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  <DS.Icon name="landmark" size={17} />
                  <b style={{ fontSize: 15, flex: 1 }}>{'Total sacado por banco · ' + perTxt}</b>
                  <b style={{ fontSize: 16, fontVariantNumeric: 'tabular-nums' }}>{brl(totP)}</b>
                  <DS.Icon name={verBanco ? 'chevron-up' : 'chevron-down'} size={16} color="var(--text-secondary)" />
                </button>
                {verBanco ? (
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column' }}>
                    {porBanco.map(function (r, i) {
                      const novo = i === 0 || titOf(porBanco[i - 1].g) !== titOf(r.g);
                      return (
                        <React.Fragment key={r.g.id}>
                          {novo ? (
                            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.08em', color: 'var(--text-secondary)', padding: (i ? '12px' : '4px') + ' 0 4px' }}>{titOf(r.g)}</div>
                          ) : null}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderTop: novo ? '0' : '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
                            <span style={{ flex: '1 1 180px', minWidth: 0, fontSize: 14, fontWeight: 700 }}>{r.g.pagamento || gLabel(r.g)}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                              {r.n + (r.n === 1 ? ' saque' : ' saques') + (r.okN ? ' · ' + brl(r.ok) + ' conferido' : '')}
                            </span>
                            <b style={{ minWidth: 110, textAlign: 'right', fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>{brl(r.v)}</b>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ) : null}
            {lista.length ? (
              lista.map(function (grp, gi) {
                const on = aberto === grp.g.id;
                const novoT = !tit && (gi === 0 || titOf(lista[gi - 1].g) !== titOf(grp.g));
                const porOp = {};
                grp.itens.forEach(function (x) {
                  const o = (porOp[x.op] = porOp[x.op] || { n: 0, v: 0 });
                  o.n++;
                  o.v += x.valor;
                });
                return (
                  <React.Fragment key={grp.g.id}>
                    {novoT ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: gi ? 10 : 0 }}>
                        <b style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{titOf(grp.g)}</b>
                        <span style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }}></span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>
                          {brl(
                            lista
                              .filter(function (y) {
                                return titOf(y.g) === titOf(grp.g);
                              })
                              .reduce(function (a, y) {
                                return a + y.total;
                              }, 0),
                          )}
                        </span>
                      </div>
                    ) : null}
                    <div className="ms7-card" style={{ overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', flexWrap: 'wrap' }}>
                        <span className="ms7cf-tile">
                          <DS.Icon name="landmark" size={18} strokeWidth={1.9} />
                        </span>
                        <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{gLabel(grp.g)}</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginTop: 2 }}>
                            {Object.keys(porOp)
                              .map(function (o) {
                                return o + ' · ' + porOp[o].n + (porOp[o].n === 1 ? ' saque' : ' saques') + ' · ' + brl(porOp[o].v);
                              })
                              .join('   |   ')}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div className="ms7-eyebrow">Tem que ter na conta</div>
                          <div className="ms7-num" style={{ marginTop: 3, fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{brl(grp.total)}</div>
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
                        {(function () {
                          const mk = marcados(grp);
                          const tudo = mk.length === grp.itens.length;
                          return (
                            <DS.Button
                              size="sm"
                              variant="brand"
                              iconLeft="check"
                              disabled={!mk.length}
                              onClick={function () {
                                setModal({
                                  g: grp.g,
                                  itens: mk,
                                  total: mk.reduce(function (a, x) {
                                    return a + x.valor;
                                  }, 0),
                                });
                              }}
                            >
                              {tudo ? 'Conferido' : 'Conferir ' + mk.length + (mk.length === 1 ? ' saque' : ' saques')}
                            </DS.Button>
                          );
                        })()}
                      </div>
                      {on ? (
                        <div className="ms7cf-det" style={{ overflowX: 'auto' }}>
                          <table className="ms7-table">
                            <thead>
                              <tr style={{ color: 'var(--text-secondary)', fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase' }}>
                                <th style={{ width: 44, padding: '8px 0 8px 18px' }}>
                                  <input
                                    type="checkbox"
                                    aria-label="Marcar todos"
                                    checked={grp.itens.every(function (x) {
                                      return !fora[x.id];
                                    })}
                                    onChange={function (e) {
                                      const f = Object.assign({}, fora);
                                      grp.itens.forEach(function (x) {
                                        if (e.target.checked) delete f[x.id];
                                        else f[x.id] = 1;
                                      });
                                      setFora(f);
                                    }}
                                    style={{ width: 17, height: 17, cursor: 'pointer', accentColor: 'var(--ms7-green)' }}
                                  />
                                </th>
                                {['Conta', 'Usuário', 'Operador', 'Plataforma', 'Chave', 'Data', 'Saque'].map(function (t, i) {
                                  return (
                                    <th key={t} style={{ textAlign: i === 6 ? 'right' : 'left', padding: '8px 14px' }}>
                                      {t}
                                    </th>
                                  );
                                })}
                              </tr>
                            </thead>
                            <tbody>
                              {grp.itens
                                .slice()
                                .sort(function (a, b) {
                                  return a.c.id === b.c.id ? a.n - b.n : a.plat < b.plat ? -1 : 1;
                                })
                                .map(function (x) {
                                  const off = !!fora[x.id];
                                  return (
                                    <tr
                                      key={x.id}
                                      onClick={function () {
                                        togg(x.id);
                                      }}
                                      style={{ borderTop: '1px solid var(--border-subtle)', cursor: 'pointer', opacity: off ? 0.45 : 1 }}
                                    >
                                      <td style={{ padding: '9px 0 9px 18px' }}>
                                        <input type="checkbox" checked={!off} onChange={function () {}} style={{ width: 17, height: 17, cursor: 'pointer', accentColor: 'var(--ms7-green)' }} />
                                      </td>
                                      <td style={{ padding: '9px 14px', fontWeight: 600, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{'Conta ' + x.n}</td>
                                      <td style={{ padding: '9px 14px', fontWeight: 600 }}>{x.ct.usuario || '—'}</td>
                                      <td style={{ padding: '9px 14px' }}>{x.op}</td>
                                      <td style={{ padding: '9px 14px' }}>{x.plat}</td>
                                      <td style={{ padding: '9px 14px', fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{x.k.tipo ? PIXV.format(x.k.tipo, x.k.valor) : x.k.valor}</td>
                                      <td style={{ padding: '9px 14px', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>
                                        {x.em ? new Date(x.em).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '—'}
                                      </td>
                                      <td
                                        style={{ padding: '9px 18px 9px 14px', textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums', textDecoration: off ? 'line-through' : 'none' }}
                                      >
                                        {brl(x.valor)}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                          <div style={{ padding: '10px 18px', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
                            Desmarque o saque que ainda não caiu. Só os marcados são conferidos; os desmarcados continuam em “A conferir”.
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </React.Fragment>
                );
              })
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
              {kpi('Diferença acumulada', (difTot > 0 ? '+' : '') + brl(difTot), difTot < 0 ? 'var(--ms7-error)' : difTot > 0 ? 'var(--ms7-orange)' : undefined, 'scale', 'orange')}
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
