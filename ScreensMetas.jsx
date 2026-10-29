(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const FIM = ['Finalizada', 'Concluída'];
  function feitaConta(k) {
    return !!(String(k.usuario || '').trim() && (+k.deposito || 0) + (+k.redeposito || 0) > 0);
  }
  function prog(m, db) {
    const c = m.coopId
      ? (db.coops || []).find(function (x) {
          return x.id === m.coopId;
        })
      : null;
    const alvo = Math.max(1, +m.qtd || 0);
    const atual = c ? c.contas.filter(feitaConta).length : +m.manual || 0;
    const auto = !!(c && FIM.indexOf(c.status) >= 0);
    const done = !!m.feitaEm || auto || atual >= alvo;
    return {
      c: c,
      alvo: alvo,
      atual: atual,
      pct: Math.min(100, Math.round((atual / alvo) * 100)),
      done: done,
      auto: auto,
      ini: !done && (!!m.iniciadaEm || atual > 0),
    };
  }
  function link(u) {
    u = String(u || '').trim();
    if (!u) return '';
    return /^https?:\/\//i.test(u) ? u : 'https://' + u;
  }
  function parseLista(t) {
    const out = [];
    String(t || '')
      .split(/\r?\n/)
      .forEach(function (l) {
        const x = l
          .trim()
          .replace(/\*/g, '')
          .match(/^(\d{1,4})\s*(?:[–—\-.:)|]\s*|\s+)(?:R\$\s*)?([\d.,]+)\s*(?:[–—\-|]?\s*\(?(R)\)?)?\s*$/i);
        if (!x) return;
        let v = x[2];
        if (v.indexOf(',') >= 0) v = v.replace(/\./g, '').replace(',', '.');
        v = parseFloat(v);
        if (!isNaN(v)) out.push({ n: +x[1], valor: v, rolo: !!x[3] });
      });
    return out;
  }
  function gruposLivres(f, opId, metas, selfId) {
    const db = DB.get();
    const P = DB.platNorm(f.plataforma);
    const me = opId === '__eu' ? '' : opId || '';
    const outro = function (a) {
      a = a === '__eu' ? '' : a || '';
      return a !== me || (!a && !me);
    };
    return (f.pixGrupos || []).filter(function (gid) {
      const x = (db.coops || []).some(function (o) {
        return (
          (o.status === 'Ativa' || o.status === 'Em andamento' || o.status === 'Finalizada') &&
          DB.platNorm(o.plataforma) === P &&
          outro(o.opId) &&
          (o.pixGrupos || []).indexOf(gid) >= 0
        );
      });
      const y = (metas || []).some(function (o) {
        return (
          o &&
          o.id !== selfId &&
          !o.coopId &&
          !o.concluida &&
          DB.platNorm(o.plataforma) === P &&
          outro(o.opId) &&
          (o.pixGrupos || []).indexOf(gid) >= 0
        );
      });
      return !x && !y;
    });
  }
  function rowsDe(x) {
    const r = parseLista(x.lista);
    if (r.length) return r;
    const c = x.coopId ? DB.coop(x.coopId) : null;
    if (!c) return [];
    return (c.contas || [])
      .map(function (k, i) {
        return { n: i + 1, valor: (+k.deposito || 0) + (+k.redeposito || 0), rolo: !!k.rolo };
      })
      .filter(function (r) {
        return r.valor > 0;
      });
  }
  function envioDe(x) {
    let rows = rowsDe(x);
    const c0 = x.coopId ? DB.coop(x.coopId) : null;
    if (c0 && !parseLista(x.lista).length) {
      x = Object.assign({}, x, { comTipo: c0.comTipo, comValor: c0.comValor, comR: c0.comR, comS: c0.comS, opId: x.opId || c0.opId });
    }
    const num = function (v) {
      return (
        parseFloat(
          String(v || '0')
            .replace(/\./g, '')
            .replace(',', '.'),
        ) || 0
      );
    };
    const r2 = function (v) {
      return Math.round(v * 100) / 100;
    };
    const comOf = function (rs, qtd) {
      const nR = rs.filter(function (r) {
          return r.rolo;
        }).length,
        nS = rs.length - nR;
      const t = x.comTipo || 'pct';
      if (!x.opId || x.opId === '__eu') return [0, 'Sem comissão'];
      if (t === 'rolo') {
        const vr = num(x.comR || '2'),
          vs = num(x.comS || '1,5');
        return [nR * vr + nS * vs, nR + ' R × ' + MS7.brl(vr) + ' + ' + nS + ' sem R × ' + MS7.brl(vs)];
      }
      if (t === 'conta') return [qtd * num(x.comValor), qtd + ' contas × ' + MS7.brl(num(x.comValor))];
      if (t === 'fixo') return [num(x.comValor), 'Valor fixo'];
      return [null, '% do lucro: só no fim'];
    };
    const maxN = rows.reduce(function (a, r) {
      return Math.max(a, r.n);
    }, 0);
    let red = null;
    if (c0) {
      const N = +c0.depositantes || 0;
      const full = rows;
      const V = DB.contasValidas(c0);
      const rowsC = V.map(function (k, i) {
        return { n: i + 1, valor: (+k.deposito || 0) + (+k.redeposito || 0), rolo: !!k.rolo };
      }).filter(function (r) {
        return r.valor > 0;
      });
      if (rowsC.length || N) {
        const depF = full.reduce(function (a, r) {
          return a + r.valor;
        }, 0);
        const cF = comOf(full, Math.max(+x.qtd || 0, full.length))[0];
        const reduz = N && N < maxN;
        rows = rowsC;
        const dep1 = rows.reduce(function (a, r) {
          return a + r.valor;
        }, 0);
        const c1 = comOf(rows, reduz ? rows.length : Math.max(+x.qtd || 0, rows.length))[0];
        const dD = r2(depF - dep1),
          dC = r2((cF || 0) - (c1 || 0));
        if (reduz || Math.abs(dD) >= 0.01 || Math.abs(dC) >= 0.01) {
          red = {
            de: Math.max(+x.qtd || 0, maxN),
            para: reduz ? N : full.length,
            n: Math.max(0, full.length - rows.length),
            dep: dD,
            com: dC,
            reduz: reduz,
          };
          red.total = r2(dD + dC);
        }
      }
    }
    const dep = rows.reduce(function (a, r) {
      return a + r.valor;
    }, 0);
    const nR = rows.filter(function (r) {
        return r.rolo;
      }).length,
      nS = rows.length - nR;
    const cc = comOf(rows, red && red.reduz ? rows.length : Math.max(+x.qtd || 0, rows.length));
    const com = cc[0],
      txt = cc[1];
    const total = r2(dep + (com || 0));
    const env = r2(
      (x.envios || []).reduce(function (a, p) {
        return a + (+p.v || 0);
      }, 0),
    );
    return { rows: rows, dep: dep, nR: nR, nS: nS, com: com, comTxt: txt, total: total, env: env, falta: Math.max(0, r2(total - env)), red: red };
  }
  function EnvioModal({ titulo, falta, onClose, onOk, dev }) {
    const [v, setV] = React.useState(String(falta.toFixed(2)).replace('.', ','));
    const n = parseFloat(String(v).replace(/\./g, '').replace(',', '.')) || 0;
    return (
      <DS.Modal
        open
        onClose={soXm(onClose)}
        title={dev ? 'Registrar devolução' : 'Registrar envio'}
        subtitle={titulo + (dev ? ' · a devolver ' : ' · falta ') + MS7.brl(falta)}
        size="sm"
        footer={
          <React.Fragment>
            <DS.Button variant="secondary" onClick={onClose}>
              Cancelar
            </DS.Button>
            <DS.Button
              variant="brand"
              iconLeft="check"
              disabled={!(n > 0)}
              onClick={function () {
                onOk(n);
              }}
            >
              {'Registrar ' + MS7.brl(n)}
            </DS.Button>
          </React.Fragment>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <DS.Input
            label={dev ? 'Quanto o operador devolveu' : 'Quanto você enviou agora'}
            prefix="R$"
            value={v}
            onChange={function (e) {
              setV(e.target.value);
            }}
            autoFocus
          />
          <span style={{ fontSize: 13, fontWeight: 600, color: n > falta + 0.009 ? 'var(--ms7-orange)' : 'var(--text-secondary)' }}>
            {n >= falta - 0.009
              ? n > falta + 0.009
                ? 'Passa ' + MS7.brl(n - falta) + ' do que falta'
                : 'Quita tudo'
              : 'Depois disso ainda falta ' + MS7.brl(falta - n)}
          </span>
        </div>
      </DS.Modal>
    );
  }
  function EnviosTab({ L, db, salvar }) {
    const [st, setSt] = React.useState('pend');
    const [op, setOp] = React.useState('');
    const [reg, setReg] = React.useState(null);
    const [hist, setHist] = React.useState('');
    const [sub, setSub] = React.useState('env');
    const [led0, setLed] = usePersist('envios', []);
    const led = Array.isArray(led0) ? led0 : [];
    React.useEffect(
      function () {
        const have = {};
        led.forEach(function (e) {
          if (e.src) have[e.src] = 1;
        });
        const add = [];
        L.forEach(function (x) {
          ((x && x.envios) || []).forEach(function (p, k) {
            const src = x.id + ':' + (p.em || k);
            if (!have[src] && (+p.v || 0))
              add.push({
                id: 'ev' + (p.em || Date.now()) + '-' + k + '-' + String(x.id).slice(-4),
                src: src,
                opId: x.opId || '',
                v: +p.v,
                em: p.em || Date.now(),
                ref: [x.id],
                refNome: [x.plataforma || x.nome, x.linkN].filter(Boolean).join(' · '),
              });
          });
        });
        if (add.length)
          setLed(function (cur) {
            return (Array.isArray(cur) ? cur : []).concat(add);
          });
      },
      [L.length],
    );
    const ops = db.operadores || [];
    const r2 = function (v) {
      return Math.round(v * 100) / 100;
    };
    const linha = function (x) {
      return [x.m.plataforma || x.m.nome, x.m.coopId ? (DB.coop(x.m.coopId) || {}).linkN : x.m.linkN].filter(Boolean).join(' · ');
    };
    const all = L.filter(function (x) {
      return x && rowsDe(x).length;
    })
      .sort(function (a, b) {
        return (a.criada || 0) - (b.criada || 0);
      })
      .map(function (x) {
        return { m: x, e: envioDe(x) };
      });
    const porOp = {};
    all.forEach(function (x) {
      const k = x.m.opId || '';
      (porOp[k] = porOp[k] || { l: [], led: [] }).l.push(x);
    });
    led.forEach(function (e) {
      const k = e.opId || '';
      (porOp[k] = porOp[k] || { l: [], led: [] }).led.push(e);
    });
    Object.keys(porOp).forEach(function (k) {
      const g = porOp[k];
      let resto = r2(
        g.led.reduce(function (a, e) {
          return a + (+e.v || 0);
        }, 0),
      );
      g.enviado = resto;
      g.devido = r2(
        g.l.reduce(function (a, x) {
          return a + x.e.total;
        }, 0),
      );
      g.l.forEach(function (x) {
        const v = Math.min(resto, x.e.total);
        x.e.env = r2(Math.max(0, v));
        x.e.falta = r2(Math.max(0, x.e.total - x.e.env));
        resto = r2(resto - x.e.env);
      });
      g.credito = r2(Math.max(0, resto));
      g.falta = r2(Math.max(0, g.devido - g.enviado));
      g.led.sort(function (a, b) {
        return (b.em || 0) - (a.em || 0);
      });
    });
    const keys = Object.keys(porOp)
      .filter(function (k) {
        if (op && k !== op) return false;
        const g = porOp[k];
        if (st === 'pend') return g.falta > 0 || g.credito > 0;
        if (st === 'ok')
          return (
            g.l.some(function (x) {
              return x.e.falta <= 0;
            }) || g.led.length
          );
        return true;
      })
      .sort(function (a, b) {
        return (a ? DB.opName(a) : 'zz').localeCompare(b ? DB.opName(b) : 'zz', 'pt-BR');
      });
    const visL = function (g) {
      return g.l.filter(function (x) {
        return st === 'todos' || (st === 'pend' ? x.e.falta > 0 : x.e.falta <= 0);
      });
    };
    const sm = function (l, k) {
      return r2(
        l.reduce(function (a, x) {
          return a + (x.e[k] || 0);
        }, 0),
      );
    };
    const cp = function (t, msg) {
      (navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(t) : Promise.reject()).then(
        function () {
          toast(msg);
        },
        function () {
          window.prompt('Copie:', t);
        },
      );
    };
    const texto = function (l, g) {
      return (
        l
          .map(function (x) {
            return (
              linha(x) +
              '\nDepósito: ' +
              MS7.brl(x.e.dep) +
              '\nComissão: ' +
              MS7.brl(x.e.com || 0) +
              '\nTotal p/ envio: ' +
              MS7.brl(x.e.total) +
              (x.e.env ? '\nJá enviado: ' + MS7.brl(x.e.env) + '\nFalta: ' + MS7.brl(x.e.falta) : '')
            );
          })
          .join('\n\n') +
        (g && l.length > 1
          ? '\n\nTOTAL: ' + MS7.brl(sm(l, 'total')) + ' · já enviado ' + MS7.brl(sm(l, 'env')) + ' · falta ' + MS7.brl(sm(l, 'falta'))
          : '')
      );
    };
    function registrar(k, valor, ref) {
      const g = porOp[k] || { l: [] };
      const alvo = ref
        ? g.l.filter(function (x) {
            return x.m.id === ref;
          })
        : g.l.filter(function (x) {
            return x.e.falta > 0;
          });
      const e = {
        id: 'ev' + Date.now(),
        opId: k,
        v: r2(valor),
        em: Date.now(),
        ref: alvo.map(function (x) {
          return x.m.id;
        }),
        refNome: alvo.map(linha).join(', '),
      };
      setLed(function (cur) {
        return (Array.isArray(cur) ? cur : []).concat([e]);
      });
      setReg(null);
      toast('Envio de ' + MS7.brl(valor) + ' anotado');
    }
    function devolver(k, valor) {
      const e = { id: 'ev' + Date.now(), opId: k, v: -r2(valor), em: Date.now(), tipo: 'dev', ref: [], refNome: 'Devolução do operador' };
      setLed(function (cur) {
        return (Array.isArray(cur) ? cur : []).concat([e]);
      });
      setReg(null);
      toast('Devolução de ' + MS7.brl(valor) + ' anotada');
    }
    function apagar(e) {
      if (!confirm('Apagar o envio de ' + MS7.brl(e.v) + ' de ' + new Date(e.em).toLocaleDateString('pt-BR') + '?')) return;
      setLed(function (cur) {
        return (Array.isArray(cur) ? cur : []).filter(function (y) {
          return y.id !== e.id;
        });
      });
      toast('Envio apagado');
    }
    const tot = { devido: 0, enviado: 0, falta: 0, n: 0 };
    Object.keys(porOp).forEach(function (k) {
      const g = porOp[k];
      tot.devido += g.devido;
      tot.enviado += g.enviado;
      tot.falta += g.falta;
      tot.n += g.l.filter(function (x) {
        return x.e.falta > 0;
      }).length;
    });
    const num = { fontVariantNumeric: 'tabular-nums', textAlign: 'right', whiteSpace: 'nowrap' };
    const td = function (x) {
      return Object.assign({ padding: '10px 8px' }, num, x || {});
    };
    const DV = Object.keys(porOp)
      .map(function (k) {
        const g = porOp[k];
        const reds = g.l.filter(function (x) {
          return x.e.red;
        });
        const recebido = r2(
          -g.led
            .filter(function (e) {
              return e.tipo === 'dev';
            })
            .reduce(function (a, e) {
              return a + (+e.v || 0);
            }, 0),
        );
        return {
          k: k,
          g: g,
          reds: reds,
          recebido: recebido,
          falta: g.credito,
          hist: g.led.filter(function (e) {
            return e.tipo === 'dev';
          }),
        };
      })
      .filter(function (d) {
        return (!op || d.k === op) && (d.reds.length || d.recebido > 0 || (d.falta > 0 && d.reds.length));
      });
    const dvTot = {
      falta: r2(
        DV.reduce(function (a, d) {
          return a + (d.reds.length ? d.falta : 0);
        }, 0),
      ),
      rec: r2(
        DV.reduce(function (a, d) {
          return a + d.recebido;
        }, 0),
      ),
      n: DV.reduce(function (a, d) {
        return a + d.reds.length;
      }, 0),
    };
    const SUBT = (
      <DS.Tabs
        variant="chips"
        value={sub}
        onChange={setSub}
        items={[
          { id: 'env', label: 'Envios' },
          { id: 'dev', label: 'Devoluções' + (dvTot.falta > 0 ? ' · ' + MS7.brl(dvTot.falta) : '') },
        ]}
      />
    );
    if (sub === 'dev')
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {SUBT}
          <KpiRow
            items={[
              { icon: 'undo-2', label: 'A devolver', value: MS7.brl(dvTot.falta), tone: 'orange' },
              { icon: 'circle-check', label: 'Já devolvido', value: MS7.brl(dvTot.rec), tone: 'green' },
              { icon: 'list', label: 'Metas com ajuste', value: dvTot.n, tone: 'blue' },
            ]}
          />
          <div style={{ width: 200 }}>
            <DS.Select
              variant="pill"
              value={op}
              onChange={function (e) {
                setOp(e.target.value);
              }}
              options={[{ value: '', label: 'Todos os operadores' }].concat(
                ops.map(function (o) {
                  return { value: o.id, label: o.nome };
                }),
              )}
            />
          </div>
          {DV.length ? (
            DV.map(function (d) {
              const nome = d.k ? DB.opName(d.k) : 'Sem operador';
              return (
                <div
                  key={d.k || 'x'}
                  style={{
                    background: 'var(--surface-card)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-card)',
                    padding: '16px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <DS.Avatar name={nome} size={34} />
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <b style={{ fontSize: 17 }}>{nome}</b>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {'Enviado ' +
                          MS7.brl(d.g.enviado + d.recebido) +
                          ' · devido depois da redução ' +
                          MS7.brl(d.g.devido) +
                          (d.recebido ? ' · já devolveu ' + MS7.brl(d.recebido) : '')}
                      </div>
                    </div>
                    {d.falta > 0 ? (
                      <b style={{ fontSize: 16, color: 'var(--ms7-orange)' }}>{'Devolver ' + MS7.brl(d.falta)}</b>
                    ) : (
                      <b style={{ fontSize: 14, color: 'var(--ms7-green)' }}>Nada a devolver</b>
                    )}
                    {d.falta > 0 ? (
                      <DS.Button
                        size="sm"
                        variant="brand"
                        iconLeft="undo-2"
                        onClick={function () {
                          setReg({ k: d.k, dev: true, titulo: 'Devolução · ' + nome, falta: d.falta });
                        }}
                      >
                        Registrar devolução
                      </DS.Button>
                    ) : null}
                  </div>
                  {d.reds.length ? (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
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
                            <th style={{ textAlign: 'left', padding: '6px 8px' }}>Meta</th>
                            <th style={td({ padding: '6px 8px' })}>Contas</th>
                            <th style={td({ padding: '6px 8px' })}>Contas a menos</th>
                            <th style={td({ padding: '6px 8px' })}>Depósito</th>
                            <th style={td({ padding: '6px 8px' })}>Comissão</th>
                            <th style={td({ padding: '6px 8px' })}>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.reds.map(function (x) {
                            return (
                              <tr key={x.m.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                                <td style={{ padding: '10px 8px', fontWeight: 700 }}>{linha(x)}</td>
                                <td style={td()}>{x.e.red.reduz ? x.e.red.de + ' → ' + x.e.red.para : 'Ajuste'}</td>
                                <td style={td()}>{x.e.red.n || '—'}</td>
                                <td style={td()}>{MS7.brl(x.e.red.dep)}</td>
                                <td style={td()}>{MS7.brl(x.e.red.com)}</td>
                                <td style={td({ fontWeight: 800 })}>{MS7.brl(x.e.red.total)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                  {d.hist.length ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid var(--border-subtle)', paddingTop: 8 }}>
                      {d.hist.map(function (e) {
                        return (
                          <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600 }}>
                            <span style={{ color: 'var(--text-secondary)', width: 90 }}>{new Date(e.em).toLocaleDateString('pt-BR')}</span>
                            <span style={{ flex: 1 }}>Devolução recebida</span>
                            <b style={{ color: 'var(--ms7-green)' }}>{MS7.brl(-e.v)}</b>
                            <DS.IconButton
                              icon="trash-2"
                              size={26}
                              iconSize={13}
                              label="Apagar"
                              onClick={function () {
                                apagar(e);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })
          ) : (
            <div
              style={{
                padding: '48px 20px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: 14,
                fontWeight: 600,
                background: 'var(--surface-card)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              Nenhuma devolução. Quando uma meta é reduzida (ex.: 50 → 35 contas) e você já mandou mais do que o novo total, a devolução aparece aqui
              sozinha.
            </div>
          )}
          {reg ? (
            <EnvioModal
              titulo={reg.titulo}
              falta={reg.falta}
              onClose={function () {
                setReg(null);
              }}
              onOk={function (v) {
                devolver(reg.k, v);
              }}
              dev
            />
          ) : null}
        </div>
      );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {SUBT}
        <KpiRow
          items={[
            { icon: 'send', label: 'Total p/ envio', value: MS7.brl(r2(tot.devido)), tone: 'blue' },
            { icon: 'circle-check', label: 'Já enviado', value: MS7.brl(r2(tot.enviado)), tone: 'green' },
            { icon: 'clock', label: 'Falta enviar', value: MS7.brl(r2(tot.falta)), tone: 'orange' },
            { icon: 'list', label: 'Listas pendentes', value: tot.n, tone: 'yellow' },
          ]}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
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
          <div style={{ width: 200 }}>
            <DS.Select
              variant="pill"
              value={op}
              onChange={function (e) {
                setOp(e.target.value);
              }}
              options={[{ value: '', label: 'Todos os operadores' }].concat(
                ops.map(function (o) {
                  return { value: o.id, label: o.nome };
                }),
              )}
            />
          </div>
        </div>
        {keys.length ? (
          keys.map(function (k) {
            const g = porOp[k];
            const l = visL(g);
            const nome = k ? DB.opName(k) : 'Sem operador ainda';
            const aberto = hist === k;
            return (
              <div
                key={k || 'x'}
                style={{
                  background: 'var(--surface-card)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-card)',
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <DS.Avatar name={nome} size={34} />
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <b style={{ fontSize: 17 }}>{nome}</b>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {'Total ' + MS7.brl(g.devido) + ' · enviado ' + MS7.brl(g.enviado)}
                    </div>
                  </div>
                  {g.falta > 0 ? (
                    <b style={{ fontSize: 16, color: 'var(--ms7-orange)' }}>{'Falta ' + MS7.brl(g.falta)}</b>
                  ) : (
                    <b style={{ fontSize: 14, color: 'var(--ms7-green)' }}>Tudo enviado</b>
                  )}
                  {g.credito > 0 ? (
                    g.l.some(function (x) {
                      return x.e.red;
                    }) ? (
                      <React.Fragment>
                        <span
                          title="A meta foi reduzida (contas não feitas). O operador tem que devolver o depósito e a comissão dessas contas."
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: 8,
                            background: 'color-mix(in oklab, var(--ms7-orange) 16%, transparent)',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {'Devolver ' + MS7.brl(g.credito)}
                        </span>
                        <DS.Button
                          size="sm"
                          variant="outline"
                          iconLeft="undo-2"
                          onClick={function () {
                            setSub('dev');
                          }}
                        >
                          Ver devolução
                        </DS.Button>
                      </React.Fragment>
                    ) : (
                      <span
                        title="Enviado a mais ou de listas que foram apagadas. Abate na próxima lista."
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: 8,
                          background: 'color-mix(in oklab, var(--ms7-green) 14%, transparent)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {'Crédito ' + MS7.brl(g.credito)}
                      </span>
                    )
                  ) : null}
                  <DS.IconButton
                    icon="copy"
                    size={34}
                    iconSize={16}
                    label="Copiar resumo"
                    onClick={function () {
                      cp(
                        texto(
                          g.l.filter(function (x) {
                            return x.e.falta > 0;
                          }).length
                            ? g.l.filter(function (x) {
                                return x.e.falta > 0;
                              })
                            : g.l,
                          true,
                        ),
                        'Resumo copiado',
                      );
                    }}
                  />
                  <DS.Button
                    size="sm"
                    variant="secondary"
                    iconLeft="history"
                    onClick={function () {
                      setHist(aberto ? '' : k);
                    }}
                  >
                    {'Envios (' + g.led.length + ')'}
                  </DS.Button>
                  <DS.Button
                    size="sm"
                    variant="brand"
                    iconLeft="banknote"
                    onClick={function () {
                      setReg({ k: k, titulo: nome, falta: g.falta });
                    }}
                  >
                    Registrar envio
                  </DS.Button>
                </div>
                {aberto ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      padding: '10px 12px',
                      borderRadius: 12,
                      background: 'var(--surface-muted, var(--ms7-gray-100))',
                    }}
                  >
                    {g.led.length ? (
                      g.led.map(function (e) {
                        return (
                          <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, minHeight: 32 }}>
                            <span style={{ width: 120, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                              {new Date(e.em).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <b style={{ width: 110, fontVariantNumeric: 'tabular-nums' }}>{MS7.brl(e.v)}</b>
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
                              {e.refNome || '—'}
                            </span>
                            <DS.IconButton
                              icon="trash-2"
                              size={28}
                              iconSize={14}
                              label="Apagar envio"
                              onClick={function () {
                                apagar(e);
                              }}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Nenhum envio anotado.</span>
                    )}
                  </div>
                ) : null}
                {l.length ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
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
                          <th style={{ textAlign: 'left', padding: '6px 8px' }}>Lista</th>
                          <th style={td({ padding: '6px 8px' })}>Contas</th>
                          <th style={td({ padding: '6px 8px' })}>Depósito</th>
                          <th style={td({ padding: '6px 8px' })}>Comissão</th>
                          <th style={td({ padding: '6px 8px' })}>Total</th>
                          <th style={td({ padding: '6px 8px' })}>Enviado</th>
                          <th style={td({ padding: '6px 8px' })}>Falta</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {l.map(function (x) {
                          return (
                            <tr key={x.m.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                              <td style={{ padding: '10px 8px', fontWeight: 700 }}>
                                {linha(x)}
                                {x.e.red ? (
                                  <div style={{ marginTop: 3, fontSize: 12, fontWeight: 600, color: 'var(--ms7-orange)', whiteSpace: 'normal' }}>
                                    {(x.e.red.reduz
                                      ? 'Reduzida ' + x.e.red.de + ' → ' + x.e.red.para + ' contas · '
                                      : 'Depósitos mudaram na cooperação · ') +
                                      (x.e.red.total >= 0 ? 'abate ' : 'soma ') +
                                      MS7.brl(Math.abs(x.e.red.total)) +
                                      ' (depósito ' +
                                      (x.e.red.dep >= 0 ? '-' : '+') +
                                      MS7.brl(Math.abs(x.e.red.dep)) +
                                      (x.e.red.com ? ', comissão ' + (x.e.red.com >= 0 ? '-' : '+') + MS7.brl(Math.abs(x.e.red.com)) : '') +
                                      ')'}
                                  </div>
                                ) : null}
                              </td>
                              <td style={td()}>{x.e.rows.length + (x.e.nR ? ' (' + x.e.nR + ' R)' : '')}</td>
                              <td style={td()}>{MS7.brl(x.e.dep)}</td>
                              <td style={td()} title={x.e.comTxt}>
                                {x.e.com == null ? '—' : MS7.brl(x.e.com)}
                              </td>
                              <td style={td({ fontWeight: 800 })}>{MS7.brl(x.e.total)}</td>
                              <td style={td({ color: x.e.env ? 'var(--ms7-green)' : 'var(--text-secondary)' })}>
                                {x.e.env ? MS7.brl(x.e.env) : '—'}
                              </td>
                              <td style={td({ fontWeight: 800, color: x.e.falta > 0 ? 'var(--ms7-orange)' : 'var(--ms7-green)' })}>
                                {x.e.falta > 0 ? MS7.brl(x.e.falta) : 'OK'}
                              </td>
                              <td style={{ padding: '6px 0 6px 8px', width: 72, whiteSpace: 'nowrap' }}>
                                <DS.IconButton
                                  icon="copy"
                                  size={30}
                                  iconSize={14}
                                  label="Copiar"
                                  onClick={function () {
                                    cp(texto([x]), 'Copiado');
                                  }}
                                />
                                {x.e.falta > 0 ? (
                                  <DS.IconButton
                                    icon="banknote"
                                    size={30}
                                    iconSize={14}
                                    label="Registrar envio"
                                    onClick={function () {
                                      setReg({ k: k, ref: x.m.id, titulo: linha(x), falta: x.e.falta });
                                    }}
                                  />
                                ) : null}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      {l.length > 1 ? (
                        <tfoot>
                          <tr style={{ borderTop: '2px solid var(--border-default)' }}>
                            <td style={{ padding: '10px 8px', fontWeight: 800 }}>Total</td>
                            <td style={td({ fontWeight: 700 })}>
                              {l.reduce(function (a, x) {
                                return a + x.e.rows.length;
                              }, 0)}
                            </td>
                            <td style={td({ fontWeight: 800 })}>{MS7.brl(sm(l, 'dep'))}</td>
                            <td style={td({ fontWeight: 800 })}>{MS7.brl(sm(l, 'com'))}</td>
                            <td style={td({ fontWeight: 800 })}>{MS7.brl(sm(l, 'total'))}</td>
                            <td style={td({ fontWeight: 800 })}>{MS7.brl(sm(l, 'env'))}</td>
                            <td style={td({ fontWeight: 800, fontSize: 16, color: sm(l, 'falta') > 0 ? 'var(--ms7-orange)' : 'var(--ms7-green)' })}>
                              {sm(l, 'falta') > 0 ? MS7.brl(sm(l, 'falta')) : 'OK'}
                            </td>
                            <td></td>
                          </tr>
                        </tfoot>
                      ) : null}
                    </table>
                  </div>
                ) : (
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {g.l.length ? 'Nenhuma lista neste filtro.' : 'Sem lista no momento. Os envios continuam anotados.'}
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <div
            style={{
              padding: '48px 20px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              fontSize: 14,
              fontWeight: 600,
              background: 'var(--surface-card)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            {st === 'pend' ? 'Nada falta enviar.' : 'Nenhum envio aqui.'}
          </div>
        )}
        {reg ? (
          <EnvioModal
            titulo={reg.titulo}
            falta={reg.falta}
            onClose={function () {
              setReg(null);
            }}
            onOk={function (v) {
              if (reg.dev) devolver(reg.k, v);
              else registrar(reg.k, v, reg.ref);
            }}
          />
        ) : null}
      </div>
    );
  }
  function enviarMeta(f) {
    const db = DB.get();
    const rows = parseLista(f.lista);
    const maxN = rows.reduce(function (a, r) {
      return Math.max(a, r.n);
    }, 0);
    const qtd = Math.max(+f.qtd || 0, maxN);
    const eu = f.opId === '__eu';
    DB.A.createCoop({
      tipo: f.tipo === 'bau' ? 'bau' : 'coop',
      plataforma: f.plataforma,
      rede: f.rede,
      linkN: f.linkN || '',
      qtd: qtd,
      link: f.link,
      mid: f.idMeta,
      muser: f.muser,
      msenha: f.msenha,
      salario: f.salario,
      mediaDep:
        f.mediaDep ||
        (rows.length
          ? String(
              (
                rows.reduce(function (a, r) {
                  return a + r.valor;
                }, 0) / rows.length
              ).toFixed(2),
            ).replace('.', ',')
          : ''),
      rollover: f.rollover || '',
      descricao: f.obs || '',
      cliente: String(f.nomeCoop || '').trim() || String(f.plataforma || '').trim(),
      opId: eu ? '' : f.opId,
      proprio: eu,
      comTipo: eu ? 'fixo' : f.comTipo || 'pct',
      comValor: eu ? '0' : f.comValor || '0',
      comConta: '',
    });
    const c = DB.get().coops[0];
    if (!c) return '';
    const id = c.id;
    if ((f.pixGrupos || []).length) DB.A.setPixGrupos(id, f.pixGrupos);
    if (rows.length) {
      if (!eu && f.comTipo === 'rolo')
        DB.A.importarTelegram(
          id,
          rows,
          parseFloat(String(f.comR || '2').replace(',', '.')) || 2,
          parseFloat(String(f.comS || '1,5').replace(',', '.')) || 1.5,
        );
      else {
        const cc = DB.get().coops.find(function (x) {
          return x.id === id;
        });
        rows.forEach(function (r) {
          const k = cc && cc.contas[r.n - 1];
          if (k) DB.A.saveConta(id, Object.assign({}, k, { deposito: r.valor, rolo: r.rolo }), true);
        });
      }
    }
    return id;
  }
  function syncCoop(x, prev) {
    const c = DB.coop(x.coopId);
    if (!c) return false;
    const eu = x.opId === '__eu' || c.proprio;
    const rows = parseLista(x.lista);
    const maxN = rows.reduce(function (a, r) {
      return Math.max(a, r.n);
    }, 0);
    const qtd = Math.max(+x.qtd || 0, maxN);
    const cm = c.contaMae || {};
    DB.A.editCoop(c.id, {
      cliente: String(x.nomeCoop || '').trim() || String(x.plataforma || '').trim() || c.cliente,
      opId: eu ? '' : x.opId || c.opId,
      plataforma: x.plataforma,
      linkN: x.linkN || c.linkN || '',
      rede: x.rede || c.rede || '',
      comTipo: eu ? 'fixo' : x.comTipo || c.comTipo || 'pct',
      comValor: eu ? '0' : x.comValor != null && x.comValor !== '' ? x.comValor : String(c.comValor || 0),
      comConta: c.comConta || '',
      comR: x.comR != null ? x.comR : c.comR,
      comS: x.comS != null ? x.comS : c.comS,
      link: x.link,
      mid: x.idMeta,
      muser: x.muser,
      mtipo: cm.tipo || 'Senha',
      msenha: x.msenha,
      salario: x.salario,
      depositantes: c.transferidas && c.transferidas.length ? c.depositantes : qtd > (+c.depositantes || 0) ? qtd : qtd || c.depositantes,
      mediaDep: x.mediaDep || '',
      rollover: x.rollover || '',
      descricao: x.obs != null ? x.obs : c.descricao || '',
    });
    if (!(c.transferidas && c.transferidas.length) && String(x.lista || '') !== String((prev && prev.lista) || '') && rows.length) {
      const ns = {};
      rows.forEach(function (r) {
        ns[r.n] = 1;
      });
      if (!eu && x.comTipo === 'rolo')
        DB.A.importarTelegram(
          c.id,
          rows,
          parseFloat(String(x.comR || '2').replace(',', '.')) || 2,
          parseFloat(String(x.comS || '1,5').replace(',', '.')) || 1.5,
        );
      else {
        const cc = DB.coop(c.id);
        rows.forEach(function (r) {
          const k = cc && cc.contas[r.n - 1];
          if (k) DB.A.saveConta(c.id, Object.assign({}, k, { deposito: r.valor, rolo: r.rolo }), true);
        });
      }
      const cc2 = DB.coop(c.id);
      (cc2 ? cc2.contas : []).forEach(function (k, i) {
        if (!ns[i + 1] && (+k.deposito || 0) && !String(k.usuario || '').trim() && !(+k.saque || 0))
          DB.A.saveConta(c.id, Object.assign({}, k, { deposito: 0, rolo: false }), true);
      });
    }
    if (JSON.stringify(x.pixGrupos || []) !== JSON.stringify(c.pixGrupos || [])) DB.A.setPixGrupos(c.id, x.pixGrupos || []);
    return true;
  }
  function soXm(fn) {
    return function (e) {
      if (e && e.currentTarget && e.currentTarget.tagName === 'BUTTON') fn();
    };
  }
  function Editor({ m, db, onSave, onCancel, metasAll }) {
    const [f, setF] = React.useState(
      Object.assign(
        {
          mediaDep: '',
          rollover: '',
          nomeCoop: '',
          idMeta: '',
          plataforma: '',
          rede: '',
          linkN: '',
          link: '',
          muser: '',
          msenha: '',
          qtd: '',
          lista: '',
          pixGrupos: [],
          comTipo: 'pct',
          comValor: '',
          comR: '2',
          comS: '1,5',
          salario: '',
          obs: '',
          opId: '',
        },
        m || {},
        { pixGrupos: (m && m.pixGrupos) || [] },
      ),
    );
    const enviada = !!(m && m.coopId);
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
    const set = function (k) {
      return function (e) {
        const v = e && e.target ? e.target.value : e;
        setF(function (o) {
          const n = Object.assign({}, o);
          n[k] = v;
          if (k === 'plataforma' && !o.redeManual) {
            const p = (db.coops || []).find(function (c) {
              return c.rede && DB.platNorm(c.plataforma) === DB.platNorm(v);
            });
            if (p) n.rede = p.rede;
          }
          if (k === 'rede') n.redeManual = true;
          if (k === 'link' && (!o.idMeta || o.idMeta === DB.linkId(o.link))) n.idMeta = DB.linkId(v);
          if (k === 'lista') {
            const r = parseLista(v);
            const mx = r.reduce(function (a, x) {
              return Math.max(a, x.n);
            }, 0);
            const prevMx = parseLista(o.lista).reduce(function (a, x) {
              return Math.max(a, x.n);
            }, 0);
            if (mx && (!o.qtd || +o.qtd === prevMx || +o.qtd < mx)) n.qtd = String(mx);
            if (r.length && !o.comManual) {
              n.comTipo = 'rolo';
              if (!o.comR) n.comR = '2';
              if (!o.comS) n.comS = '1,5';
            }
          }
          if (k === 'comTipo' || k === 'comValor' || k === 'comR' || k === 'comS') n.comManual = true;
          if (k === 'qtd') n.qtdManual = true;
          return n;
        });
      };
    };
    const ops = (db.operadores || []).filter(function (o) {
      return o.ativo !== false;
    });
    const rows = parseLista(f.lista);
    const temR = rows.some(function (r) {
      return r.rolo;
    });
    const totDep = rows.reduce(function (a, r) {
      return a + r.valor;
    }, 0);
    const grupos = (db.pix || [])
      .filter(function (g) {
        return g.ativo !== false;
      })
      .slice()
      .sort(function (x, y) {
        return (
          String(x.nome || '').localeCompare(String(y.nome || ''), 'pt-BR', { numeric: true }) ||
          String(x.pagamento || '').localeCompare(String(y.pagamento || ''), 'pt-BR')
        );
      });
    const gpN = f.plataforma && window.PIXV ? window.PIXV.gp(db, f.plataforma) || f.plataforma : '';
    const disp = function (g) {
      return (g.chaves || []).filter(function (k) {
        const s = gpN ? window.PIXV.st(k, gpN) : { status: 'disponivel' };
        return !s || s.status === 'disponivel';
      }).length;
    };
    const meuOp = f.opId === '__eu' ? '' : f.opId;
    const todas = metasAll || [];
    const outroOp = function (a) {
      a = a === '__eu' ? '' : a || '';
      const b = meuOp || '';
      return a !== b || (!a && !b);
    };
    const emUso = function (gid) {
      if (!f.plataforma) return '';
      const P = DB.platNorm(f.plataforma);
      const x = (db.coops || []).find(function (o) {
        return (
          o.id !== (m && m.coopId) &&
          outroOp(o.opId) &&
          (o.status === 'Ativa' || o.status === 'Em andamento' || o.status === 'Finalizada') &&
          DB.platNorm(o.plataforma) === P &&
          (o.pixGrupos || []).indexOf(gid) >= 0
        );
      });
      if (x) return [DB.opName(x.opId), x.plataforma, x.linkN].filter(Boolean).join(' · ');
      const y = (todas || []).find(function (o) {
        return (
          o &&
          o.id !== (m && m.id) &&
          !o.coopId &&
          !o.concluida &&
          outroOp(o.opId) &&
          DB.platNorm(o.plataforma) === P &&
          (o.pixGrupos || []).indexOf(gid) >= 0
        );
      });
      return y ? [y.opId && y.opId !== '__eu' ? DB.opName(y.opId) : '', y.plataforma, 'meta não enviada'].filter(Boolean).join(' · ') : '';
    };
    const usoDe = emUso;
    const togG = function (id) {
      setF(function (o) {
        const l = (o.pixGrupos || []).slice();
        const i = l.indexOf(id);
        if (i >= 0) l.splice(i, 1);
        else l.push(id);
        return Object.assign({}, o, { pixGrupos: l });
      });
    };
    const presos = f.pixGrupos.filter(function (id) {
      return usoDe(id);
    });
    const totCh = grupos
      .filter(function (g) {
        return f.pixGrupos.indexOf(g.id) >= 0 && !usoDe(g.id);
      })
      .reduce(function (a, g) {
        return a + disp(g);
      }, 0);
    const ok = String(f.plataforma).trim() && (+f.qtd > 0 || rows.length);
    const destino = f.opId === '__eu' ? 'Eu (admin)' : f.opId ? DB.opName(f.opId) : '';
    const H = function (n, t, sub) {
      return (
        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 10, marginTop: n > 1 ? 6 : 0 }}>
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              background: 'var(--ms7-green-900, #005D3B)',
              color: '#fff',
              fontSize: 12,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {n}
          </span>
          <b style={{ fontSize: 15 }}>{t}</b>
          {sub ? <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{sub}</span> : null}
          <span style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }}></span>
        </div>
      );
    };
    const G = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 };
    return (
      <DS.Modal
        open
        onClose={soXm(onCancel)}
        title={enviada ? 'Editar meta' : m && m.id ? 'Editar meta' : 'Nova meta'}
        subtitle={
          enviada
            ? 'Já enviada: a cooperação ' + m.coopId + ' foi criada. Mudanças aqui ficam só na meta.'
            : 'Monte tudo e, no fim, escolha para quem enviar.'
        }
        size="lg"
        footer={
          <React.Fragment>
            <DS.Button variant="secondary" onClick={onCancel}>
              Cancelar
            </DS.Button>
            {enviada ? (
              <DS.Button
                variant="brand"
                iconLeft="check"
                onClick={function () {
                  guardaPlat(f.plataforma);
                  onSave(f, false);
                }}
              >
                Salvar
              </DS.Button>
            ) : (
              <React.Fragment>
                <DS.Button
                  variant="outline"
                  iconLeft="save"
                  disabled={!ok}
                  onClick={function () {
                    guardaPlat(f.plataforma);
                    onSave(Object.assign({}, f, { opId: f.opId === '__eu' ? '__eu' : f.opId }), false);
                  }}
                >
                  Salvar sem enviar
                </DS.Button>
                <DS.Button
                  variant="brand"
                  iconLeft="send"
                  disabled={!ok || !f.opId}
                  onClick={function () {
                    guardaPlat(f.plataforma);
                    onSave(
                      Object.assign({}, f, {
                        pixGrupos: f.pixGrupos.filter(function (id) {
                          return !usoDe(id);
                        }),
                      }),
                      true,
                    );
                  }}
                >
                  {f.opId ? 'Enviar para ' + destino : 'Escolha para quem enviar'}
                </DS.Button>
              </React.Fragment>
            )}
          </React.Fragment>
        }
      >
        <div style={G}>
          {H(1, 'Plataforma')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <DS.Input label="Plataforma" required placeholder="Ex.: Azul 777" value={f.plataforma} onChange={set('plataforma')} />
            {platRec.length ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {platRec.map(function (p) {
                  const on = DB.platNorm(p) === DB.platNorm(f.plataforma);
                  return (
                    <span
                      key={p}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        height: 30,
                        borderRadius: 15,
                        border: '1px solid ' + (on ? 'var(--ms7-green)' : 'var(--border-default)'),
                        background: on ? 'color-mix(in oklab, var(--ms7-lime-500) 22%, transparent)' : 'var(--surface-card)',
                        overflow: 'hidden',
                      }}
                    >
                      <button
                        type="button"
                        onClick={function () {
                          set('plataforma')(p);
                        }}
                        style={{
                          height: '100%',
                          padding: '0 4px 0 12px',
                          border: 0,
                          background: 'transparent',
                          color: 'var(--text-primary)',
                          fontFamily: 'inherit',
                          fontSize: 13,
                          fontWeight: 700,
                          lineHeight: 1,
                          cursor: 'pointer',
                        }}
                      >
                        {p}
                      </button>
                      <button
                        type="button"
                        aria-label={'Tirar ' + p}
                        title="Tirar da lista"
                        onClick={function () {
                          gravaPlat(
                            platRec.filter(function (x) {
                              return x !== p;
                            }),
                          );
                        }}
                        style={{
                          width: 28,
                          height: '100%',
                          border: 0,
                          background: 'transparent',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
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
          <DS.Input
            label="Nome da cooperação"
            placeholder={f.plataforma || 'Igual à plataforma'}
            value={f.nomeCoop}
            onChange={set('nomeCoop')}
            hint={String(f.nomeCoop || '').trim() ? null : 'Em branco: usa o nome da plataforma'}
          />
          <DS.Select
            label="Rede"
            value={f.rede}
            onChange={set('rede')}
            options={[{ value: '', label: 'Sem rede' }].concat(
              (db.redes || []).map(function (r) {
                return { value: r.nome, label: r.nome };
              }),
            )}
          />
          <DS.Input
            label="ID da meta"
            placeholder="Sai sozinho do link da conta mãe"
            value={f.idMeta}
            onChange={set('idMeta')}
            hint={f.idMeta && f.idMeta === DB.linkId(f.link) ? 'Tirado do link' : null}
          />
          <DS.Input
            label="Link"
            placeholder={f.opId && f.opId !== '__eu' ? 'Automático: ' + DB.proxLink(f.opId) : 'Automático (Link 1, 2, 3…)'}
            value={f.linkN}
            onChange={set('linkN')}
            hint="Em branco: numera sozinho por operador ao enviar"
          />
          {H(2, 'Conta mãe')}
          <div style={{ gridColumn: '1 / -1' }}>
            <DS.Input label="Link da conta mãe" icon="link" placeholder="https://" value={f.link} onChange={set('link')} />
          </div>
          <DS.Input label="Usuário" icon="user" value={f.muser} onChange={set('muser')} />
          <DS.Input label="Senha" icon="lock" value={f.msenha} onChange={set('msenha')} />
          {H(3, 'Contas e depósitos')}

          <div style={{ gridColumn: '1 / -1' }}>
            <DS.Input
              label="Lista de depósitos (opcional)"
              multiline
              rows={5}
              placeholder={'1 – 90 – R\n2 – 12\n3 – 65 – R'}
              value={f.lista}
              onChange={set('lista')}
              hint={
                rows.length
                  ? rows.length +
                    ' depósitos · total ' +
                    MS7.brl(totDep) +
                    (temR
                      ? ' · ' +
                        rows.filter(function (r) {
                          return r.rolo;
                        }).length +
                        ' com R'
                      : '')
                  : 'Mesmo formato da lista do Telegram'
              }
            />
          </div>
          <DS.Input
            label="Quantidade de contas"
            type="number"
            required
            value={f.qtd}
            onChange={set('qtd')}
            placeholder="Sai sozinho da lista"
            hint={
              rows.length
                ? +f.qtd ===
                  rows.reduce(function (a, r) {
                    return Math.max(a, r.n);
                  }, 0)
                  ? 'Contado da lista: ' + f.qtd + ' contas'
                  : 'A lista tem ' +
                    rows.reduce(function (a, r) {
                      return Math.max(a, r.n);
                    }, 0) +
                    ' linhas'
                : 'Cole a lista abaixo e a quantidade aparece sozinha'
            }
          />
          <DS.Input
            label="Média de depósito"
            prefix="R$"
            placeholder={rows.length ? String((totDep / rows.length).toFixed(2)).replace('.', ',') : '0,00'}
            value={f.mediaDep}
            onChange={set('mediaDep')}
            hint={!f.mediaDep && rows.length ? 'Média da lista: ' + MS7.brl(totDep / rows.length) : null}
          />
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Apostas válidas (multiplicador)</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['N/A', '2x', '2.5x', '3x', '3.5x', '4x', '5x'].map(function (x) {
                const on = (f.rollover || 'N/A') === x;
                return (
                  <button
                    key={x}
                    type="button"
                    onClick={function () {
                      setF(function (p) {
                        return Object.assign({}, p, { rollover: x === 'N/A' ? '' : x });
                      });
                    }}
                    style={{
                      height: 40,
                      minWidth: 60,
                      padding: '0 14px',
                      borderRadius: 10,
                      border: '2px solid ' + (on ? 'var(--ms7-green-900, #005D3B)' : 'var(--border-default)'),
                      background: on ? 'var(--ms7-lime-100)' : 'transparent',
                      color: on ? 'var(--ms7-green-ink, #005D3B)' : 'var(--text-primary)',
                      fontFamily: 'inherit',
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {x}
                  </button>
                );
              })}
            </div>
            {f.rollover
              ? (function () {
                  const mult = parseFloat(String(f.rollover).replace(',', '.')) || 0;
                  const base = rows.length
                    ? totDep
                    : (parseFloat(
                        String(f.mediaDep || '0')
                          .replace(/\./g, '')
                          .replace(',', '.'),
                      ) || 0) * (+f.qtd || 0);
                  return base ? (
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>
                      {'Apostas válidas alvo: ' + MS7.brl(base) + ' × ' + f.rollover + ' = '}
                      <b style={{ color: 'var(--text-primary)' }}>{MS7.brl(base * mult)}</b>
                    </span>
                  ) : null;
                })()
              : null}
          </div>
          {H(
            4,
            'Chaves PIX',
            f.pixGrupos.length - presos.length
              ? f.pixGrupos.length -
                  presos.length +
                  (f.pixGrupos.length - presos.length === 1 ? ' grupo · ' : ' grupos · ') +
                  totCh +
                  ' chaves disponíveis'
              : f.plataforma
                ? 'nenhum grupo'
                : 'digite a plataforma primeiro',
          )}
          {f.plataforma ? (
            <div style={{ gridColumn: '1 / -1', marginTop: -6, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
              {'Grupos que já estão com outro operador na ' +
                f.plataforma +
                ' aparecem apagados e não podem ser escolhidos. O mesmo operador pode usar os mesmos grupos em Link 1, Link 2…'}
            </div>
          ) : null}
          <div
            style={{
              gridColumn: '1 / -1',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
              gap: 8,
              maxHeight: 240,
              overflowY: 'auto',
            }}
          >
            {grupos.length ? (
              grupos
                .slice()
                .sort(function (x, y) {
                  return (usoDe(x.id) ? 1 : 0) - (usoDe(y.id) ? 1 : 0);
                })
                .map(function (g) {
                  const uso = usoDe(g.id);
                  const on = f.pixGrupos.indexOf(g.id) >= 0 && !uso;
                  const d = disp(g);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      disabled={!!uso}
                      title={uso ? 'Já usado nesta plataforma: ' + uso : ''}
                      onClick={function () {
                        if (!uso) togG(g.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 12px',
                        borderRadius: 12,
                        border: '2px solid ' + (on ? 'var(--ms7-green)' : 'var(--border-default)'),
                        background: on ? 'color-mix(in oklab, var(--ms7-green) 10%, var(--surface-card))' : 'var(--surface-card)',
                        color: 'var(--text-primary)',
                        fontFamily: 'inherit',
                        textAlign: 'left',
                        cursor: uso ? 'not-allowed' : 'pointer',
                        opacity: uso ? 0.5 : 1,
                      }}
                    >
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 6,
                          flexShrink: 0,
                          border: '2px solid ' + (on ? 'var(--ms7-green)' : 'var(--border-default)'),
                          background: on ? 'var(--ms7-green)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {on ? <DS.Icon name="check" size={13} color="#fff" strokeWidth={3} /> : null}
                      </span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <b
                          style={{
                            display: 'block',
                            fontSize: 13,
                            textTransform: 'uppercase',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {g.nome || 'Sem nome'}
                        </b>
                        <span style={{ fontSize: 12, fontWeight: 600, color: uso ? 'var(--ms7-error)' : 'var(--text-secondary)' }}>
                          {uso ? 'Usado: ' + uso : (g.pagamento ? g.pagamento + ' · ' : '') + d + ' disponíveis'}
                        </span>
                      </span>
                    </button>
                  );
                })
            ) : (
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                Nenhum grupo de chaves. Cadastre em Gestão → Chaves PIX.
              </span>
            )}
          </div>
          {H(5, 'Para quem enviar')}
          <div style={{ gridColumn: '1 / -1' }}>
            <DS.Select
              label="Operador"
              value={f.opId}
              onChange={set('opId')}
              disabled={enviada}
              options={[
                { value: '', label: 'Ainda não sei (salvar sem enviar)' },
                { value: '__eu', label: 'Eu (admin) · sem operador' },
              ].concat(
                ops.map(function (o) {
                  return { value: o.id, label: o.nome };
                }),
              )}
            />
          </div>
          {f.opId && f.opId !== '__eu' ? (
            <React.Fragment>
              <DS.Select
                label="Comissão"
                value={f.comTipo}
                onChange={set('comTipo')}
                options={[
                  { value: 'pct', label: '% do lucro' },
                  { value: 'conta', label: 'Valor por conta' },
                  { value: 'fixo', label: 'Valor fixo' },
                ].concat(rows.length ? [{ value: 'rolo', label: 'Por conta da lista: com R / sem R' }] : [])}
              />
              {f.comTipo === 'rolo' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <DS.Input label="Com R" prefix="R$" value={f.comR} onChange={set('comR')} />
                    <DS.Input label="Sem R" prefix="R$" value={f.comS} onChange={set('comS')} />
                  </div>
                </div>
              ) : (
                <DS.Input
                  label={f.comTipo === 'pct' ? 'Percentual' : f.comTipo === 'conta' ? 'Valor por conta' : 'Valor fixo'}
                  prefix={f.comTipo === 'pct' ? '%' : 'R$'}
                  value={f.comValor}
                  onChange={set('comValor')}
                />
              )}
            </React.Fragment>
          ) : null}
          {f.opId ? <DS.Input label="Salário (opcional)" prefix="R$" placeholder="0,00" value={f.salario} onChange={set('salario')} /> : null}
          <div style={{ gridColumn: '1 / -1' }}>
            <DS.Input label="Observação" multiline rows={2} value={f.obs} onChange={set('obs')} />
          </div>
          {f.opId && !enviada ? (
            <div
              style={{
                gridColumn: '1 / -1',
                padding: '12px 14px',
                borderRadius: 12,
                background: 'var(--surface-muted, var(--ms7-gray-100))',
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              {'Ao enviar, cria a cooperação de ' +
                destino +
                ' com ' +
                Math.max(
                  +f.qtd || 0,
                  rows.reduce(function (a, r) {
                    return Math.max(a, r.n);
                  }, 0),
                ) +
                ' contas' +
                (rows.length ? ', ' + rows.length + ' depósitos (' + MS7.brl(totDep) + ')' : '') +
                (f.comTipo === 'rolo' && rows.length
                  ? ', comissão ' +
                    MS7.brl(
                      rows.filter(function (r) {
                        return r.rolo;
                      }).length *
                        (parseFloat(String(f.comR || '0').replace(',', '.')) || 0) +
                        rows.filter(function (r) {
                          return !r.rolo;
                        }).length *
                          (parseFloat(String(f.comS || '0').replace(',', '.')) || 0),
                    )
                  : '') +
                (f.pixGrupos.length ? ', ' + f.pixGrupos.length + ' grupo(s) de chaves' : '') +
                ' e a conta mãe. Aparece na hora para ele em Cooperações e em Metas.'}
            </div>
          ) : null}
        </div>
      </DS.Modal>
    );
  }
  function Importar({ db, onClose, onAdd }) {
    const [t, setT] = React.useState('');
    const ops = db.operadores || [];
    function go() {
      const rows = t
        .split(/\n/)
        .map(function (l) {
          return l.trim();
        })
        .filter(Boolean)
        .map(function (l) {
          const p = l.split(/\s*[|;\t]\s*/);
          const url =
            p.find(function (x) {
              return /^(https?:\/\/|www\.)|\.[a-z]{2,}(\/|$)/i.test(x);
            }) || '';
          const n =
            p.find(function (x) {
              return /^\d+$/.test(x);
            }) || '';
          const opn =
            p.find(function (x) {
              return x && x !== url && x !== n;
            }) || '';
          const op = ops.find(function (o) {
            return opn && o.nome.toLowerCase().indexOf(opn.toLowerCase()) === 0;
          });
          return { nome: op ? '' : opn, link: url, qtd: n, opId: op ? op.id : '' };
        })
        .filter(function (r) {
          return r.link || r.nome;
        });
      if (!rows.length) {
        toast('Nenhuma linha válida');
        return;
      }
      onAdd(rows);
    }
    return (
      <DS.Modal
        open
        onClose={soXm(onClose)}
        title="Importar do bloco de notas"
        subtitle="Uma meta por linha: link | quantidade | operador"
        footer={
          <React.Fragment>
            <DS.Button variant="secondary" onClick={onClose}>
              Cancelar
            </DS.Button>
            <DS.Button variant="brand" iconLeft="check" onClick={go}>
              Importar
            </DS.Button>
          </React.Fragment>
        }
      >
        <DS.Input
          multiline
          rows={9}
          value={t}
          onChange={function (e) {
            setT(e.target.value);
          }}
          placeholder={'https://plataforma1.com | 100 | Gabriel\nhttps://plataforma2.com | 50 | Henrique'}
        />
      </DS.Modal>
    );
  }
  function MetaCard({ m, p, onEdit, onToggle, onIniciar, onDel, onOpen, ro, sel, onSel }) {
    const u = link(m.link);
    const [ver, setVer] = React.useState(false);
    return (
      <div
        style={{
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          padding: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          opacity: p.done ? 0.85 : 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          {onSel ? (
            <button
              type="button"
              aria-label={sel ? 'Desmarcar' : 'Selecionar para enviar'}
              onClick={onSel}
              style={{
                width: 24,
                height: 24,
                marginTop: 6,
                flexShrink: 0,
                borderRadius: 7,
                border: '2px solid ' + (sel ? 'var(--ms7-green)' : 'var(--border-default)'),
                background: sel ? 'var(--ms7-green)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {sel ? <DS.Icon name="check" size={14} color="#fff" strokeWidth={3} /> : null}
            </button>
          ) : null}
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: p.done ? 'var(--ms7-green)' : 'var(--ms7-lime-100)',
              color: p.done ? '#fff' : 'var(--ms7-green-ink, #005D3B)',
            }}
          >
            <DS.Icon name={p.done ? 'check' : 'target'} size={18} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <b style={{ fontSize: 15, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {m.plataforma || m.nome || String(m.link || '').replace(/^https?:\/\//, '') || 'Meta'}
            </b>
            {m.plataforma ? (
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>
                {p.c && p.c.linkN ? p.c.linkN : m.linkN || 'Link a definir'}
              </span>
            ) : null}
          </div>
          {ro ? null : <DS.IconButton icon="pencil" size={30} iconSize={14} label="Editar" onClick={onEdit} />}
          {ro ? null : <DS.IconButton icon="trash-2" size={30} iconSize={14} label="Apagar" onClick={onDel} />}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {window.ms7SemOp ? null : (
            <DS.Badge size="sm" variant="soft" tone={m.opId ? 'blue' : 'green'}>
              {m.opId ? DB.opName(m.opId) : 'Admin'}
            </DS.Badge>
          )}
          {p.c ? (
            p.c.rede ? (
              <DS.Badge size="sm" variant="soft" tone="purple">
                {p.c.rede}
              </DS.Badge>
            ) : null
          ) : m.plataforma ? (
            <DS.Badge size="sm" variant="soft" tone="yellow">
              Não enviada
            </DS.Badge>
          ) : (
            <DS.Badge size="sm" variant="soft" tone="gray">
              Manual
            </DS.Badge>
          )}
          {p.done ? (
            <DS.Badge size="sm" variant="soft" tone="green">
              {p.auto ? 'Finalizada na cooperação' : 'Concluída'}
            </DS.Badge>
          ) : p.ini ? (
            <DS.Badge size="sm" variant="soft" tone="orange">
              Em andamento
            </DS.Badge>
          ) : (
            <DS.Badge size="sm" variant="soft" tone="gray">
              Não iniciada
            </DS.Badge>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 22, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{p.atual + ' de ' + p.alvo}</span>
          <b style={{ fontSize: 15, color: p.done ? 'var(--ms7-green)' : 'var(--text-primary)' }}>{p.pct + '%'}</b>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: 'var(--ms7-gray-100)' }}>
          <div
            style={{
              width: p.pct + '%',
              height: '100%',
              borderRadius: 4,
              background: p.done ? 'var(--ms7-green)' : 'var(--ms7-lime-600)',
              transition: 'width .4s',
            }}
          ></div>
        </div>
        {u ? (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <DS.Button
              size="sm"
              variant="outline"
              iconLeft="copy"
              onClick={function () {
                (navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(u) : Promise.reject()).then(
                  function () {
                    toast('Link copiado');
                  },
                  function () {
                    window.prompt('Copie o link:', u);
                  },
                );
              }}
            >
              Copiar link
            </DS.Button>
            <DS.Button
              size="sm"
              variant="secondary"
              iconLeft="external-link"
              onClick={function () {
                window.open(u, '_blank', 'noopener');
              }}
            >
              Abrir
            </DS.Button>
          </div>
        ) : null}
        {m.idMeta || DB.linkId(m.link) || m.muser || m.msenha || m.rollover || (m.pixGrupos || []).length ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              padding: '10px 12px',
              borderRadius: 12,
              background: 'var(--surface-muted, var(--ms7-gray-100))',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {[
              ['ID', m.idMeta || DB.linkId(m.link)],
              ['Usuário', m.muser],
              ['Senha', m.msenha],
            ]
              .filter(function (r) {
                return r[1];
              })
              .map(function (r) {
                const sen = r[0] === 'Senha';
                return (
                  <div key={r[0]} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 58, color: 'var(--text-secondary)' }}>{r[0]}</span>
                    <b
                      style={{
                        flex: 1,
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontVariantNumeric: 'tabular-nums',
                        fontFamily: r[0] === 'ID' ? 'ui-monospace, monospace' : 'inherit',
                      }}
                    >
                      {sen && !ver ? '••••••••' : r[1]}
                    </b>
                    {sen ? (
                      <DS.IconButton
                        icon={ver ? 'eye-off' : 'eye'}
                        size={26}
                        iconSize={13}
                        label={ver ? 'Esconder senha' : 'Ver senha'}
                        onClick={function () {
                          setVer(!ver);
                        }}
                      />
                    ) : null}
                    <DS.IconButton
                      icon="copy"
                      size={26}
                      iconSize={13}
                      label={'Copiar ' + r[0]}
                      onClick={function () {
                        const t = String(r[1]);
                        (navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(t) : Promise.reject()).then(
                          function () {
                            toast(r[0] + ' copiado');
                          },
                          function () {
                            window.prompt('Copie:', t);
                          },
                        );
                      }}
                    />
                  </div>
                );
              })}
            {m.rollover ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 58, color: 'var(--text-secondary)' }}>Apostas</span>
                <b>{m.rollover}</b>
              </div>
            ) : null}
            {(m.pixGrupos || []).length ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 58, color: 'var(--text-secondary)' }}>Chaves</span>
                <b>{m.pixGrupos.length + (m.pixGrupos.length === 1 ? ' grupo' : ' grupos')}</b>
              </div>
            ) : null}
          </div>
        ) : null}
        {m.obs ? (
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'flex-start',
              padding: '8px 12px',
              borderRadius: 10,
              background: 'var(--ms7-lime-100)',
              color: 'var(--ms7-green-ink, #005D3B)',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <DS.Icon name="megaphone" size={14} style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ whiteSpace: 'pre-line', minWidth: 0 }}>{m.obs}</span>
          </div>
        ) : null}
        <div style={{ display: 'flex', gap: 6, borderTop: '1px solid var(--border-subtle)', paddingTop: 10, flexWrap: 'wrap' }}>
          {p.c ? (
            <DS.Button size="sm" variant="secondary" iconLeft="briefcase" onClick={onOpen}>
              Abrir cooperação
            </DS.Button>
          ) : null}
          {!p.c && m.plataforma && !ro ? (
            <DS.Button size="sm" variant="brand" iconLeft="send" onClick={onEdit}>
              Enviar para…
            </DS.Button>
          ) : null}
          {!p.done && !p.ini && (p.c || !m.plataforma) ? (
            <DS.Button size="sm" variant="outline" iconLeft="play" onClick={onIniciar}>
              Iniciar
            </DS.Button>
          ) : null}
          {p.auto ? null : p.done ? (
            m.feitaEm ? (
              <DS.Button size="sm" variant="secondary" iconLeft="rotate-ccw" onClick={onToggle}>
                Reabrir
              </DS.Button>
            ) : null
          ) : (
            <DS.Button size="sm" variant="brand" iconLeft="check" onClick={onToggle}>
              Finalizar
            </DS.Button>
          )}
        </div>
      </div>
    );
  }
  function MetasScreen({ go, role, bau, onAbrir }) {
    const ro = role === 'operador';
    DB.useDB();
    const db = DB.get();
    const [lista, setLista] = usePersist('metas', []);
    const LA = Array.isArray(lista) ? lista : [];
    const L = LA.filter(function (x) {
      return x && (bau ? x.tipo === 'bau' : x.tipo !== 'bau');
    });
    const oQue = bau ? 'baú' : 'cooperação';
    const [f, setF] = React.useState('pend');
    const [op, setOp] = React.useState('');
    const [sel, setSel] = React.useState({});
    const [opL, setOpL] = React.useState('');
    const [ed, setEd] = React.useState(null);
    const [imp, setImp] = React.useState(false);
    const salvar = function (fn) {
      setLista(function (cur) {
        return fn(Array.isArray(cur) ? cur.slice() : []);
      });
    };
    function save(x, enviar) {
      const n = {
        tipo: x.tipo === 'bau' ? 'bau' : 'coop',
        mediaDep: x.mediaDep || '',
        rollover: x.rollover || '',
        nomeCoop: String(x.nomeCoop || '').trim(),
        nome: String(x.nomeCoop || x.nome || '').trim() || [x.plataforma, x.linkN].filter(Boolean).join(' · '),
        idMeta: String(x.idMeta || '').trim(),
        plataforma: String(x.plataforma || '').trim(),
        rede: x.rede || '',
        linkN: x.linkN || '',
        link: String(x.link || '').trim(),
        muser: x.muser || '',
        msenha: x.msenha || '',
        lista: x.lista || '',
        pixGrupos: x.pixGrupos || [],
        comTipo: x.comTipo,
        comValor: x.comValor,
        comR: x.comR,
        comS: x.comS,
        salario: x.salario || '',
        qtd: Math.max(
          +x.qtd || 0,
          parseLista(x.lista).reduce(function (a, r) {
            return Math.max(a, r.n);
          }, 0),
        ),
        opId: x.opId === '__eu' ? '' : x.opId || '',
        coopId: x.coopId || '',
        manual: +x.manual || 0,
        obs: x.obs || '',
      };
      if (enviar && !x.coopId) {
        const cid = enviarMeta(Object.assign({}, x, { pixGrupos: gruposLivres(x, x.opId === '__eu' ? '' : x.opId, LA, x.id) }));
        if (!cid) {
          toast('Não foi possível criar o ' + oQue);
          return;
        }
        n.coopId = cid;
        n.enviadaEm = Date.now();
        if (DB.get().coops[0] && DB.get().coops[0].linkN) n.linkN = DB.get().coops[0].linkN;
        n.nome = String(x.nome || '').trim() || [n.plataforma, n.linkN].filter(Boolean).join(' · ');
      }
      let sinc = false;
      if (x.coopId && !(enviar && !x.coopId)) {
        const prev = L.find(function (y) {
          return y && y.id === x.id;
        });
        sinc = syncCoop(Object.assign({}, x, n, { opId: x.opId }), prev);
      }
      if (x.id)
        salvar(function (l) {
          return l.map(function (m) {
            return m.id === x.id ? Object.assign({}, m, n) : m;
          });
        });
      else
        salvar(function (l) {
          return [Object.assign({ id: 'mt' + Date.now(), criada: Date.now() }, n)].concat(l);
        });
      setEd(null);
      toast(
        enviar
          ? 'Meta enviada para ' + (x.opId === '__eu' ? 'você' : DB.opName(x.opId)) + ' · ' + oQue + ' ' + n.coopId + ' criado'
          : x.id
            ? sinc
              ? 'Meta e ' + oQue + ' atualizados'
              : 'Meta atualizada'
            : 'Meta salva (ainda não enviada)',
      );
    }
    const all = L.map(function (m) {
      return { m: m, p: prog(m, db) };
    });
    const naoEnv = all.filter(function (x) {
      return !x.m.coopId && x.m.plataforma;
    }).length;
    const vis = all
      .filter(function (x) {
        return (
          (!op || (op === '__nao' ? !x.m.coopId && !!x.m.plataforma : x.m.opId === op)) && (f === 'todas' || (f === 'pend' ? !x.p.done : x.p.done))
        );
      })
      .sort(function (a, b) {
        return a.p.done !== b.p.done ? (a.p.done ? 1 : -1) : b.p.pct - a.p.pct;
      });
    const pend = all.filter(function (x) {
      return !x.p.done;
    });
    const andam = pend.filter(function (x) {
      return x.p.ini;
    }).length;
    const tot = pend.reduce(function (a, x) {
        return a + x.p.alvo;
      }, 0),
      fe = pend.reduce(function (a, x) {
        return a + Math.min(x.p.atual, x.p.alvo);
      }, 0);
    const ops = db.operadores || [];
    const selIds = Object.keys(sel).filter(function (id) {
      return (
        sel[id] &&
        L.some(function (x) {
          return x.id === id && !x.coopId && x.plataforma;
        })
      );
    });
    function enviarLote() {
      if (!opL || !selIds.length) return;
      const metas = L.filter(function (x) {
        return selIds.indexOf(x.id) >= 0;
      }).sort(function (a, b) {
        return (a.criada || 0) - (b.criada || 0);
      });
      const dest = opL === '__eu' ? '' : opL;
      const feitos = {};
      let tirou = 0;
      metas.forEach(function (x) {
        const g = gruposLivres(x, dest, LA, x.id);
        tirou += (x.pixGrupos || []).length - g.length;
        const cid = enviarMeta(Object.assign({}, x, { opId: opL, pixGrupos: g }));
        if (cid) {
          const c = DB.get().coops[0];
          feitos[x.id] = { coopId: cid, enviadaEm: Date.now(), opId: dest, linkN: (c && c.linkN) || x.linkN || '', pixGrupos: g };
        }
      });
      salvar(function (l) {
        return l.map(function (x) {
          return feitos[x.id]
            ? Object.assign({}, x, feitos[x.id], { nome: x.nomeCoop || [x.plataforma, feitos[x.id].linkN].filter(Boolean).join(' · ') })
            : x;
        });
      });
      const n = Object.keys(feitos).length;
      setSel({});
      setOpL('');
      toast(
        n +
          (n === 1 ? ' meta enviada' : ' metas enviadas') +
          ' para ' +
          (opL === '__eu' ? 'você' : DB.opName(opL)) +
          (tirou ? ' · ' + tirou + ' grupo(s) de chaves em uso tirados' : ''),
      );
    }
    const [aba, setAba] = usePersist('metas-aba', 'metas');
    const ABAS = [
      { id: 'metas', label: 'Metas' },
      { id: 'envios', label: 'Envios (pagamentos)' },
    ];
    if (!ro && !bau && aba === 'envios')
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <DS.Tabs variant="dark" value={aba} onChange={setAba} items={ABAS} style={{ maxWidth: 420 }} />
          <EnviosTab L={L} db={db} salvar={salvar} />
        </div>
      );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {ro || bau ? null : <DS.Tabs variant="dark" value={aba} onChange={setAba} items={ABAS} style={{ maxWidth: 420 }} />}
        <KpiRow
          items={[
            { icon: 'target', label: 'Metas pendentes', value: pend.length, tone: 'yellow' },
            { icon: 'loader', label: 'Em andamento', value: andam, tone: 'blue' },
            { icon: 'circle-check', label: 'Concluídas', value: all.length - pend.length, tone: 'green' },
            { icon: 'users', label: 'Contas feitas (pendentes)', value: fe + ' / ' + tot, tone: 'orange' },
          ]}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <DS.Tabs
            variant="chips"
            value={f}
            onChange={setF}
            items={[
              { id: 'pend', label: 'Pendentes' },
              { id: 'feitas', label: 'Concluídas' },
              { id: 'todas', label: 'Todas' },
            ]}
          />
          {ro || window.ms7SemOp ? null : (
            <div style={{ width: 190 }}>
              <DS.Select
                variant="pill"
                value={op}
                onChange={function (e) {
                  setOp(e.target.value);
                }}
                options={[
                  { value: '', label: 'Todos os operadores' },
                  { value: '__nao', label: 'Não enviadas (' + naoEnv + ')' },
                ].concat(
                  ops.map(function (o) {
                    return { value: o.id, label: o.nome };
                  }),
                )}
              />
            </div>
          )}
          <span style={{ flex: 1 }}></span>
          {ro ? null : (
            <DS.Button
              variant="outline"
              iconLeft="clipboard-paste"
              onClick={function () {
                setImp(true);
              }}
            >
              Importar
            </DS.Button>
          )}
          {ro ? null : (
            <DS.Button
              variant="brand"
              iconLeft="plus"
              onClick={function () {
                setEd({ tipo: bau ? 'bau' : 'coop' });
              }}
            >
              {bau ? 'Nova meta de baú' : 'Nova meta'}
            </DS.Button>
          )}
        </div>
        {!ro && selIds.length ? (
          <div
            style={{
              position: 'sticky',
              top: 8,
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
              padding: '12px 16px',
              borderRadius: 14,
              background: 'var(--surface-card)',
              boxShadow: 'var(--shadow-raised)',
              border: '2px solid var(--ms7-green)',
            }}
          >
            <b style={{ fontSize: 15 }}>{selIds.length + (selIds.length === 1 ? ' meta selecionada' : ' metas selecionadas')}</b>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
              {'Viram Link ' +
                (opL && opL !== '__eu'
                  ? (function () {
                      const n0 = +String(DB.proxLink(opL)).replace(/\D/g, '') || 1;
                      return selIds
                        .map(function (_, i) {
                          return n0 + i;
                        })
                        .join(', ');
                    })()
                  : '1, 2, 3…')}
            </span>
            <span style={{ flex: 1 }}></span>
            <div style={{ width: 220 }}>
              <DS.Select
                variant="pill"
                value={opL}
                onChange={function (e) {
                  setOpL(e.target.value);
                }}
                options={[
                  { value: '', label: 'Enviar para…' },
                  { value: '__eu', label: 'Eu (admin)' },
                ].concat(
                  ops
                    .filter(function (o) {
                      return o.ativo !== false;
                    })
                    .map(function (o) {
                      return { value: o.id, label: o.nome };
                    }),
                )}
              />
            </div>
            <DS.Button
              variant="brand"
              iconLeft="send"
              disabled={!opL}
              onClick={function () {
                if (
                  confirm(
                    'Enviar ' +
                      selIds.length +
                      (selIds.length === 1 ? ' meta' : ' metas') +
                      ' para ' +
                      (opL === '__eu' ? 'você' : DB.opName(opL)) +
                      '? Cada uma vira ' +
                      (bau ? 'um baú' : 'uma cooperação') +
                      ' (Link 1, 2, 3…).',
                  )
                )
                  enviarLote();
              }}
            >
              Enviar
            </DS.Button>
            <DS.Button
              variant="secondary"
              onClick={function () {
                setSel({});
              }}
            >
              Limpar
            </DS.Button>
          </div>
        ) : null}
        {vis.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap: 20 }}>
            {vis.map(function (x) {
              const m = x.m;
              return (
                <MetaCard
                  key={m.id}
                  m={m}
                  p={x.p}
                  ro={ro}
                  sel={!!sel[m.id]}
                  onSel={
                    !ro && !m.coopId && m.plataforma
                      ? function () {
                          setSel(function (s0) {
                            const n = Object.assign({}, s0);
                            if (n[m.id]) delete n[m.id];
                            else n[m.id] = 1;
                            return n;
                          });
                        }
                      : null
                  }
                  onEdit={function () {
                    setEd(m);
                  }}
                  onDel={function () {
                    const cc = m.coopId ? DB.coop(m.coopId) : null;
                    const vai = cc && cc.status !== 'Lixeira';
                    if (
                      confirm(
                        vai
                          ? 'Apagar esta meta?\n\n' +
                              (bau ? 'O baú' : 'A cooperação') +
                              ' ligado a ela (' +
                              DB.coopNome(cc) +
                              ') também vai para a Lixeira.'
                          : 'Apagar esta meta?',
                      )
                    ) {
                      if (vai) DB.A.setStatus(cc.id, 'Lixeira');
                      salvar(function (l) {
                        return l.filter(function (y) {
                          return y.id !== m.id;
                        });
                      });
                      toast(vai ? 'Meta apagada e ' + oQue + ' movido para a Lixeira' : 'Meta apagada');
                    }
                  }}
                  onToggle={function () {
                    const fim = !(x.p.done && m.feitaEm);
                    salvar(function (l) {
                      return l.map(function (y) {
                        return y.id === m.id
                          ? Object.assign({}, y, { feitaEm: fim ? Date.now() : null, iniciadaEm: y.iniciadaEm || (fim ? Date.now() : null) })
                          : y;
                      });
                    });
                    toast(fim ? 'Meta finalizada' : 'Meta reaberta');
                  }}
                  onIniciar={function () {
                    salvar(function (l) {
                      return l.map(function (y) {
                        return y.id === m.id ? Object.assign({}, y, { iniciadaEm: Date.now() }) : y;
                      });
                    });
                    toast('Meta iniciada');
                  }}
                  onOpen={function () {
                    localStorage.setItem('ms7op-open-coop', m.coopId);
                    if (bau && onAbrir) onAbrir();
                    else go(bau ? 'bau' : 'cooperacoes');
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div
            style={{
              padding: '48px 20px',
              textAlign: 'center',
              color: 'var(--text-secondary)',
              fontSize: 14,
              fontWeight: 600,
              background: 'var(--surface-card)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            {L.length
              ? 'Nenhuma meta neste filtro.'
              : ro
                ? 'Nenhuma meta para você ainda.'
                : bau
                  ? 'Nenhuma meta de baú ainda. Clique em Nova meta de baú ou importe do bloco de notas.'
                  : 'Nenhuma meta ainda. Clique em Nova meta ou importe do bloco de notas.'}
          </div>
        )}
        {ed ? (
          <Editor
            m={ed}
            db={db}
            metasAll={LA}
            onSave={function (v, env) {
              save(Object.assign({}, ed, v), env);
            }}
            onCancel={function () {
              setEd(null);
            }}
          />
        ) : null}
        {imp ? (
          <Importar
            db={db}
            onClose={function () {
              setImp(false);
            }}
            onAdd={function (rows) {
              const now = Date.now();
              salvar(function (l) {
                return rows
                  .map(function (r, i) {
                    return Object.assign({ id: 'mt' + now + '-' + i, criada: now, coopId: '', manual: 0, obs: '' }, r, {
                      qtd: +r.qtd || 0,
                      tipo: bau ? 'bau' : 'coop',
                    });
                  })
                  .concat(l);
              });
              setImp(false);
              toast(rows.length + ' meta(s) importada(s)');
            }}
          />
        ) : null}
      </div>
    );
  }
  window.MetasScreen = MetasScreen;
})();
