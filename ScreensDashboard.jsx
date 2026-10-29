(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const pct = function (v) {
    return (isFinite(v) ? v : 0).toLocaleString('pt-BR', { maximumFractionDigits: 0 }) + '%';
  };
  function comPer(opId, per) {
    return DB.get().coops.filter(function (c) {
      return c.status === 'Concluída' && (!opId || c.opId === opId) && DB.inPeriod(DB.comData(c), per);
    });
  }
  function opRows(per) {
    const db = DB.get();
    return db.operadores.map(function (o) {
      const g = DB.agg(DB.coopsFor({ opId: o.id, per: per }));
      const cc = comPer(o.id, per);
      const gc = DB.agg(cc);
      return Object.assign({ id: o.id, nome: o.nome, ativo: o.ativo }, g, { comC: gc.com, lucroC: gc.lucro, roiC: gc.roi, concl: cc.length });
    });
  }
  function buildAlerts(session) {
    const db = DB.get();
    const out = [];
    const mine = function (c) {
      return session.role !== 'operador' || c.opId === session.opId;
    };
    db.coops
      .filter(function (c) {
        return mine(c) && (c.status === 'Em andamento' || c.status === 'Ativa');
      })
      .forEach(function (c) {
        c.contas
          .filter(function (k) {
            return k.status === 'Bloqueado';
          })
          .forEach(function (k) {
            out.push({
              icon: 'shield-alert',
              tone: 'error',
              title: 'Conta bloqueada: ' + k.usuario,
              sub: DB.coopNome(c) + ' · ' + DB.opName(c.opId),
              coop: c.id,
            });
          });
      });
    if (session.role !== 'operador' && window.getPixGrupos)
      getPixGrupos().forEach(function (g) {
        const d = g.chaves.filter(function (k) {
          return PIXV.st(k, '').status === 'disponivel';
        }).length;
        if (d <= 1)
          out.push({
            icon: 'key-round',
            tone: 'yellow',
            title: 'Chaves PIX acabando: ' + g.nome,
            sub: d + ' disponível(is) de ' + g.chaves.length,
            page: 'gestao',
          });
      });
    db.coops
      .filter(function (c) {
        return mine(c) && c.status === 'Em andamento' && !c.ciclos && (DB.today - new Date(c.inicio + 'T12:00:00')) / 864e5 >= 3;
      })
      .forEach(function (c) {
        out.push({
          icon: 'clock',
          tone: 'blue',
          title: 'Ciclo sem fechamento: ' + DB.coopNome(c),
          sub: 'Em andamento desde ' + DB.fmtDate(c.inicio),
          coop: c.id,
        });
      });
    return out;
  }
  function AlertNotifier({ session }) {
    DB.useDB();
    const db = DB.get();
    const al = buildAlerts(session).filter(function (a) {
      return a.icon !== 'shield-alert';
    });
    const sig = al
      .map(function (a) {
        return a.title;
      })
      .join('|');
    React.useEffect(
      function () {
        const K = 'ms7op-alertas-vistos';
        const hoje = DB.iso(DB.today);
        let v = {};
        try {
          v = JSON.parse(localStorage.getItem(K) || '{}');
        } catch (e) {}
        if (v._d !== hoje) v = { _d: hoje };
        let ch = false;
        al.forEach(function (a) {
          if (v[a.title]) return;
          v[a.title] = 1;
          ch = true;
          if (window.notifyLocal) notifyLocal({ type: 'alerta', title: a.title, body: a.sub });
        });
        if (ch) localStorage.setItem(K, JSON.stringify(v));
      },
      [sig],
    );
    return null;
  }
  function openCoop(id) {
    localStorage.setItem('ms7op-open-coop', id);
    window.ms7Go('cooperacoes');
  }
  function AlertsCard({ session }) {
    const { Card, Badge } = DS;
    const al = buildAlerts(session);
    return (
      <Card
        title="Alertas"
        action={
          al.length ? (
            <Badge size="sm" tone="error">
              {al.length}
            </Badge>
          ) : null
        }
      >
        {al.length ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {al.slice(0, 6).map(function (a, i) {
              return (
                <div
                  key={i}
                  onClick={function () {
                    a.coop ? openCoop(a.coop) : window.ms7Go(a.page);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 0',
                    borderBottom: i < Math.min(al.length, 6) - 1 ? '1px solid var(--border-subtle)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background:
                        'color-mix(in srgb, var(--ms7-' +
                        (a.tone === 'error' ? 'error' : a.tone === 'yellow' ? 'yellow' : 'blue') +
                        ') 16%, var(--surface-card))',
                      color: 'var(--ms7-' + (a.tone === 'error' ? 'error' : a.tone === 'yellow' ? 'orange' : 'blue') + ')',
                    }}
                  >
                    <DS.Icon name={a.icon} size={16} strokeWidth={2} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{a.title}</div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>{a.sub}</div>
                  </div>
                  <DS.Icon name="chevron-right" size={16} color="var(--text-secondary)" />
                </div>
              );
            })}
          </div>
        ) : (
          <Empty icon="circle-check" title="Tudo certo" sub="Nenhum alerta no momento." />
        )}
      </Card>
    );
  }
  function FinHero({ per, op, gC }) {
    const db = DB.get();
    const mc = 'natural';
    const setMc = function () {};
    const TEMAS = {
      natural: {
        n: 'Natural',
        bg: 'var(--surface-card)',
        fg: 'var(--text-primary)',
        ac: 'var(--text-primary)',
        sw: '#E9ECEA',
        bd: '1px solid var(--border-default)',
      },
      preto: { n: 'Preto', bg: 'linear-gradient(150deg,#0E1110 0%,#232826 100%)', fg: '#fff', ac: '#C9F76A', sw: '#151917' },
      amarelo: { n: 'Amarelo', bg: 'linear-gradient(150deg,#2E2404 0%,#6B4F00 100%)', fg: '#fff', ac: '#FFD54A', sw: '#B8860B' },
      azul: { n: 'Azul', bg: 'linear-gradient(150deg,#0A1E3D 0%,#1D4E89 100%)', fg: '#fff', ac: '#9CCBFF', sw: '#1D4E89' },
      petroleo: {
        n: 'Azul-petróleo (azul + verde MS7)',
        bg: 'linear-gradient(150deg,#06232B 0%,#0B4A55 55%,#0E6B63 120%)',
        fg: '#fff',
        ac: '#C9F76A',
        sw: '#0B4A55',
      },
      marinho: { n: 'Azul-marinho com verde', bg: 'linear-gradient(150deg,#0A1730 0%,#12305A 100%)', fg: '#fff', ac: '#C9F76A', sw: '#12305A' },
      vermelho: { n: 'Vermelho', bg: 'linear-gradient(150deg,#360B0B 0%,#8A1C1C 100%)', fg: '#fff', ac: '#FFB4A8', sw: '#B22222' },
      verde: { n: 'Verde', bg: 'linear-gradient(150deg, #0C3B26 0%, #005D3B 60%, #1B9461 140%)', fg: '#fff', ac: '#C9F76A', sw: '#1B9461' },
    };
    const TM = TEMAS[mc] || TEMAS.natural;
    const notifs = window.useNotifs ? useNotifs() : [];
    const [hv, setHv] = React.useState(null);
    const L = comPer(op || null, per);
    const by = {};
    L.forEach(function (c) {
      const k = DB.comData(c) || '';
      if (!k) return;
      by[k] = (by[k] || 0) + DB.calc(c).lucro;
    });
    const ks = Object.keys(by).sort();
    const vals = ks.map(function (k) {
      return by[k];
    });
    const best = vals.length ? Math.max.apply(null, vals) : 0;
    const media = vals.length
      ? vals.reduce(function (a, b) {
          return a + b;
        }, 0) / vals.length
      : 0;
    const ds = L.reduce(function (a, c) {
        return a + DB.calc(c).ds;
      }, 0),
      sal = L.reduce(function (a, c) {
        return a + (DB.calc(c).sal || 0);
      }, 0);
    const brlS = function (v) {
      return (v > 0 ? '+' : v < 0 ? '-' : '') + MS7.brl(Math.abs(v));
    };
    const col = function (v) {
      return v > 0 ? 'var(--ms7-green)' : v < 0 ? 'var(--ms7-error)' : 'var(--text-primary)';
    };
    const W = 600,
      H = 170,
      P = 8;
    const mx = Math.max(1, Math.max.apply(null, vals.map(Math.abs).concat([1])));
    const y0 = H / 2;
    const pts = vals.map(function (v, i) {
      return [vals.length > 1 ? P + (i * (W - 2 * P)) / (vals.length - 1) : W / 2, y0 - (v / mx) * (H / 2 - P)];
    });
    const line = pts
      .map(function (p, i) {
        return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1);
      })
      .join(' ');
    const area = pts.length ? line + ' L' + pts[pts.length - 1][0].toFixed(1) + ' ' + y0 + ' L' + pts[0][0].toFixed(1) + ' ' + y0 + ' Z' : '';
    const Lall = db.coops.filter(function (c) {
      return c.status !== 'Lixeira' && (!op || c.opId === op);
    });
    const at = Lall.filter(function (c) {
        return c.status === 'Ativa' || c.status === 'Em andamento';
      }),
      fi = Lall.filter(function (c) {
        return c.status === 'Finalizada';
      });
    const sm = function (l) {
      return l.reduce(function (a, c) {
        return a + DB.calc(c).lucro;
      }, 0);
    };
    const comp = [
      ['Depósitos e saques', ds],
      ['Salário', sal],
      ['Comissão dos operadores', -gC.com],
    ];
    const cmx = Math.max(
      1,
      Math.max.apply(
        null,
        comp.map(function (x) {
          return Math.abs(x[1]);
        }),
      ),
    );
    const nTar = window.tarefasPend ? tarefasPend(db, 'admin') : 0;
    const bloq = at.reduce(function (a, c) {
      return (
        a +
        c.contas.filter(function (k) {
          return k.status === 'Bloqueado';
        }).length
      );
    }, 0);
    const acoes = [
      fi.length ? ['flag', 'Cooperações finalizadas aguardando análise', fi.length, 'Revisar', 'cooperacoes'] : null,
      nTar ? ['square-check', 'Tarefas da Gestão para hoje', nTar, 'Abrir', 'tarefas'] : null,
      bloq ? ['shield-alert', 'Contas bloqueadas em cooperações ativas', bloq, 'Ver', 'cooperacoes'] : null,
    ].filter(Boolean);
    const rem = notifs
      .filter(function (n) {
        return n.type === 'ciclo';
      })
      .slice(0, 5);
    const box = { background: 'var(--surface-card)', borderRadius: 20, boxShadow: 'var(--shadow-card)', padding: '20px 22px', minWidth: 0 };
    const lab = { fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'stretch' }}>
          <div
            style={Object.assign({}, box, {
              flex: '2 1 520px',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              background: 'linear-gradient(135deg, color-mix(in oklab, var(--ms7-lime-500) 10%, var(--surface-card)) 0%, var(--surface-card) 55%)',
            })}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <b style={{ fontSize: 15 }}>Lucro líquido</b>
              <span style={{ flex: 1 }}></span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 12,
                  background: 'var(--surface-muted, var(--ms7-gray-100))',
                }}
              >
                {per}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: 'clamp(34px,5vw,52px)',
                  fontWeight: 800,
                  letterSpacing: '-.02em',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                  color: col(gC.lucro),
                }}
              >
                {brlS(gC.lucro)}
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)' }}>
                {gC.coops + (gC.coops === 1 ? ' cooperação concluída' : ' cooperações concluídas') + ' · ROI ' + pct(gC.roi)}
              </span>
            </div>
            <div style={lab}>Resultado por dia</div>
            <div style={{ position: 'relative' }}>
              {vals.length ? (
                <svg
                  viewBox={'0 0 ' + W + ' ' + H}
                  preserveAspectRatio="none"
                  style={{ width: '100%', height: 170, display: 'block' }}
                  onMouseLeave={function () {
                    setHv(null);
                  }}
                >
                  <defs>
                    <linearGradient id="ms7fh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--ms7-green)" stopOpacity=".28"></stop>
                      <stop offset="1" stopColor="var(--ms7-green)" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <line x1="0" x2={W} y1={y0} y2={y0} stroke="var(--border-default)" strokeDasharray="4 4"></line>
                  <path d={area} fill="url(#ms7fh)"></path>
                  <path d={line} fill="none" stroke="var(--ms7-green)" strokeWidth="2.5" vectorEffect="non-scaling-stroke"></path>
                  {pts.map(function (p, i) {
                    return (
                      <rect
                        key={i}
                        x={p[0] - W / Math.max(2, pts.length) / 2}
                        y="0"
                        width={W / Math.max(2, pts.length)}
                        height={H}
                        fill="transparent"
                        onMouseEnter={function () {
                          setHv(i);
                        }}
                      ></rect>
                    );
                  })}
                  {hv != null ? (
                    <line
                      x1={pts[hv][0]}
                      x2={pts[hv][0]}
                      y1="0"
                      y2={H}
                      stroke="var(--text-secondary)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    ></line>
                  ) : null}
                </svg>
              ) : (
                <div
                  style={{
                    height: 120,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    borderRadius: 14,
                    background: 'var(--surface-muted, var(--ms7-gray-100))',
                  }}
                >
                  Nenhuma cooperação concluída neste período.
                </div>
              )}
              {hv != null ? (
                <div
                  style={{
                    position: 'absolute',
                    top: 6,
                    left: Math.min(70, Math.max(0, (pts[hv][0] / W) * 100)) + '%',
                    padding: '8px 12px',
                    borderRadius: 12,
                    background: 'var(--surface-card)',
                    boxShadow: 'var(--shadow-pop)',
                    fontSize: 13,
                    fontWeight: 600,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <b>{ks[hv].split('-').reverse().slice(0, 2).join('/')}</b>
                  <div style={{ color: col(vals[hv]), fontWeight: 800 }}>{brlS(vals[hv])}</div>
                </div>
              ) : null}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
                borderRadius: 14,
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
              }}
            >
              {[
                ['Dias com resultado', String(vals.length), null],
                ['Média por dia', brlS(media), media],
                ['Melhor dia', brlS(best), best],
              ].map(function (x, i) {
                return (
                  <div key={x[0]} style={{ padding: '12px 16px', borderLeft: i ? '1px solid var(--border-subtle)' : 'none', minWidth: 0 }}>
                    <div style={lab}>{x[0]}</div>
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 18,
                        fontWeight: 800,
                        fontVariantNumeric: 'tabular-nums',
                        color: x[2] == null ? 'var(--text-primary)' : col(x[2]),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {x[1]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <div style={Object.assign({}, box, { background: TM.bg, color: TM.fg, border: TM.bd || 'none' })}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b style={{ flex: 1, fontSize: 15 }}>Metas</b>
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: 800,
                  fontVariantNumeric: 'tabular-nums',
                  color: mc === 'natural' ? col(sm(at) + sm(fi)) : TM.ac,
                }}
              >
                {brlS(sm(at) + sm(fi))}
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600 }}>
                {[
                  ['Ativas (parcial)', at.length, sm(at)],
                  ['Finalizadas', fi.length, sm(fi)],
                ].map(function (x) {
                  return (
                    <div key={x[0]} style={{ display: 'flex', gap: 8 }}>
                      <span style={{ flex: 1, opacity: 0.85 }}>{x[0] + ' · ' + x[1]}</span>
                      <b style={{ fontVariantNumeric: 'tabular-nums' }}>{brlS(x[2])}</b>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={function () {
                  window.ms7Go('cooperacoes');
                }}
                style={{
                  marginTop: 14,
                  border: 0,
                  background: 'transparent',
                  color: mc === 'natural' ? 'var(--ms7-green)' : TM.ac,
                  font: '700 13px var(--font-sans)',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                Ver cooperações
                <DS.Icon name="arrow-right" size={14} />
              </button>
            </div>
            <div style={box}>
              <b style={{ fontSize: 15 }}>Resultados</b>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {comp.map(function (x) {
                  return (
                    <div key={x[0]}>
                      <div style={{ display: 'flex', gap: 8, fontSize: 13, fontWeight: 600 }}>
                        <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{x[0]}</span>
                        <b style={{ fontVariantNumeric: 'tabular-nums', color: col(x[1]) }}>{brlS(x[1])}</b>
                      </div>
                      <div style={{ marginTop: 6, height: 4, borderRadius: 2, background: 'var(--surface-muted, var(--ms7-gray-100))' }}>
                        <div
                          style={{
                            width: Math.round((Math.abs(x[1]) / cmx) * 100) + '%',
                            height: '100%',
                            borderRadius: 2,
                            background: x[1] >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)',
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
                <div style={{ display: 'flex', gap: 8, paddingTop: 10, borderTop: '1px solid var(--border-subtle)', fontSize: 14, fontWeight: 800 }}>
                  <span style={{ flex: 1 }}>Lucro líquido</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums', color: col(gC.lucro) }}>{brlS(gC.lucro)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 16 }}>
          <div style={box}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <b style={{ flex: 1, fontSize: 15 }}>Sua próxima ação</b>
              <span style={lab}>{acoes.length ? acoes.length + (acoes.length === 1 ? ' pendência' : ' pendências') : ''}</span>
            </div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {acoes.length ? (
                acoes.map(function (a) {
                  return (
                    <div
                      key={a[1]}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 12px',
                        borderRadius: 14,
                        background: 'var(--surface-muted, var(--ms7-gray-100))',
                      }}
                    >
                      <span
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'var(--surface-card)',
                          flexShrink: 0,
                        }}
                      >
                        <DS.Icon name={a[0]} size={16} color="var(--ms7-green)" />
                      </span>
                      <div style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: 700 }}>
                        {a[1]}
                        <span style={{ marginLeft: 6, color: 'var(--text-secondary)' }}>{'· ' + a[2]}</span>
                      </div>
                      <DS.Button
                        size="sm"
                        variant="brand"
                        iconRight="arrow-right"
                        onClick={function () {
                          window.ms7Go(a[4]);
                        }}
                      >
                        {a[3]}
                      </DS.Button>
                    </div>
                  );
                })
              ) : (
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', padding: '8px 0' }}>Nada pendente agora.</div>
              )}
            </div>
          </div>
          <div style={box}>
            <b style={{ fontSize: 15 }}>Últimas remessas</b>
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
              {rem.length ? (
                rem.map(function (n, i) {
                  const b = String(n.body || '').split('\n');
                  const r =
                    b.find(function (x) {
                      return /^Resultado/.test(x);
                    }) || '';
                  return (
                    <div
                      key={n.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 0',
                        borderTop: i ? '1px solid var(--border-subtle)' : 'none',
                      }}
                    >
                      <DS.Avatar name={(b[0] || '').replace(/^Operador:\s*/, '') || '?'} size={32} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {n.title}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: 'var(--text-secondary)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {[(b[0] || '').replace(/^Operador:\s*/, ''), b[1], n.at].filter(Boolean).join(' · ')}
                        </div>
                      </div>
                      {r ? (
                        <b
                          style={{
                            fontSize: 13,
                            fontVariantNumeric: 'tabular-nums',
                            color: /-R\$/.test(r) ? 'var(--ms7-error)' : 'var(--ms7-green)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {r.replace(/^Resultado:\s*/, '')}
                        </b>
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', padding: '8px 0' }}>
                  Os ciclos enviados pelos operadores aparecem aqui.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  function GeralScreen({ session }) {
    const { Card, DataTable, BarChart, Badge, Avatar, Select } = DS;
    DB.useDB();
    const isOp = session.role === 'operador';
    const [per, setPer] = usePersist('geral-per', '30 dias');
    const [op, setOp] = usePersist('geral-op', '');
    const g = DB.agg(DB.coopsFor({ opId: isOp ? session.opId : op || null, per: per }));
    const gC = DB.agg(comPer(isOp ? session.opId : op || null, per));
    const nAt = DB.coopsFor({ opId: isOp ? session.opId : op || null, per: per }).filter(function (c) {
      return c.status === 'Ativa' || c.status === 'Em andamento' || c.status === 'Finalizada';
    }).length;
    const [det, setDet] = React.useState(null);
    const rows = isOp
      ? []
      : opRows(per)
          .filter(function (r) {
            return !op || r.id === op;
          })
          .sort(function (a, b) {
            return b.lucroC - a.lucroC;
          });
    const kpis = isOp
      ? [
          { icon: 'percent', label: 'Minha comissão', value: MS7.brlK(g.com), tone: 'green' },
          { icon: 'trending-up', label: 'Resultado das contas', value: MS7.brlK(g.res), tone: 'blue', signed: g.res },
          { icon: 'users', label: 'Contas no período', value: g.n, tone: 'yellow' },
          {
            icon: 'shield-alert',
            label: 'Contas bloqueadas',
            value: g.bloq,
            tone: 'orange',
            trend: g.n ? ((g.bloq / g.n) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%' : null,
            trendTone: 'up-bad',
          },
        ]
      : [
          {
            icon: 'circle-dollar-sign',
            label: gC.lucro >= 0 ? 'Lucro (concluídas)' : 'Prejuízo (concluídas)',
            value: MS7.brlK(gC.lucro),
            tone: 'green',
            signed: gC.lucro,
          },
          { icon: 'trending-up', label: 'ROI (concluídas)', value: pct(gC.roi), tone: 'blue', signed: gC.roi },
          {
            icon: 'shield-alert',
            label: 'Contas bloqueadas',
            value: g.bloq + ' de ' + g.n,
            tone: 'orange',
            trend: g.n ? ((g.bloq / g.n) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%' : null,
            trendTone: 'up-bad',
          },
          { icon: 'percent', label: 'Comissão (concluídas)', value: MS7.brl(gC.com), tone: 'yellow' },
        ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <PeriodBar value={per} onChange={setPer}>
          {!isOp ? (
            <Select
              variant="pill"
              value={op}
              onChange={function (e) {
                setOp(e.target.value);
              }}
              options={[{ value: '', label: 'Todos os operadores' }].concat(
                DB.get().operadores.map(function (o) {
                  return { value: o.id, label: o.nome };
                }),
              )}
            />
          ) : null}
        </PeriodBar>
        {isOp ? <KpiRow items={kpis} /> : <FinHero per={per} op={op} gC={gC} />}
        {isOp ? (
          <Grid min={340}>
            <Card title="Minhas cooperações no período">
              <RankList
                rows={DB.coopsFor({ opId: session.opId, per: per }).map(function (c) {
                  return { nome: DB.coopNome(c), v: DB.calc(c).com };
                })}
                valueKey="v"
              />
            </Card>
            <AlertsCard session={session} />
          </Grid>
        ) : window.ms7SemOp ? (
          (function () {
            const cu = (DB.get().custos || [])
              .filter(function (x) {
                return DB.inPeriod(x.data, per);
              })
              .reduce(function (s, x) {
                return s + (+x.valor || 0);
              }, 0);
            const it = [
              ['Contas feitas', String(g.n), null],
              [
                'Contas bloqueadas',
                g.bloq + (g.n ? ' · ' + ((g.bloq / g.n) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%' : ''),
                g.bloq ? 'var(--ms7-error)' : null,
              ],
              ['Custos', MS7.brl(cu), null],
              ['Lucro total', MS7.brl(gC.lucro - cu), gC.lucro - cu >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)'],
            ];
            return (
              <Card title="Resumo do período">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
                  {it.map(function (x) {
                    return (
                      <div key={x[0]} style={{ padding: '14px 16px', borderRadius: 14, background: 'var(--surface-muted, var(--ms7-gray-100))' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>{x[0]}</div>
                        <div
                          style={{
                            marginTop: 6,
                            fontSize: 22,
                            fontWeight: 800,
                            fontVariantNumeric: 'tabular-nums',
                            color: x[2] || 'var(--text-primary)',
                          }}
                        >
                          {x[1]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })()
        ) : (
          <Card
            title="Operadores"
            action={
              <DS.Button
                size="sm"
                variant="outline"
                iconLeft="download"
                onClick={function () {
                  exportCSV(
                    'operadores-' + per.replace(' ', ''),
                    [
                      {
                        label: 'Operador',
                        get: function (r) {
                          return r.nome;
                        },
                      },
                      {
                        label: 'Cooperações',
                        get: function (r) {
                          return r.coops;
                        },
                      },
                      {
                        label: 'Contas',
                        get: function (r) {
                          return r.n;
                        },
                      },
                      {
                        label: 'Bloqueadas',
                        get: function (r) {
                          return r.bloq;
                        },
                      },
                      {
                        label: 'Resultado',
                        get: function (r) {
                          return r.res;
                        },
                      },
                      {
                        label: 'Comissão',
                        get: function (r) {
                          return r.com;
                        },
                      },
                      {
                        label: 'Lucro (concluídas)',
                        get: function (r) {
                          return r.lucroC;
                        },
                      },
                      {
                        label: 'ROI % (concluídas)',
                        get: function (r) {
                          return r.roiC;
                        },
                      },
                    ],
                    rows,
                  );
                }}
              >
                Exportar
              </DS.Button>
            }
          >
            {rows.length ? (
              <div style={{ overflowX: 'auto' }}>
                <div style={{ minWidth: 720, display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(180px,1.4fr) 80px 120px 130px 140px minmax(120px,1fr)',
                      gap: 12,
                      padding: '0 6px 10px',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '.05em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      borderBottom: '1px solid var(--border-default)',
                    }}
                  >
                    <span>Operador</span>
                    <span style={{ textAlign: 'center' }}>Contas</span>
                    <span style={{ textAlign: 'center' }}>Bloqueadas</span>
                    <span style={{ textAlign: 'right' }}>Comissão</span>
                    <span style={{ textAlign: 'right' }}>Lucro</span>
                    <span></span>
                  </div>
                  {(function () {
                    const mx = Math.max(
                      1,
                      Math.max.apply(
                        null,
                        rows.map(function (o) {
                          return Math.abs(o.lucroC);
                        }),
                      ),
                    );
                    return rows.map(function (o) {
                      return (
                        <div
                          key={o.id}
                          onClick={function () {
                            setDet(o.id);
                          }}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(180px,1.4fr) 80px 120px 130px 140px minmax(120px,1fr)',
                            gap: 12,
                            alignItems: 'center',
                            padding: '12px 6px',
                            borderBottom: '1px solid var(--border-subtle)',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                            <Avatar name={o.nome} size={34} />
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: 15, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {o.nome}
                              </div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                                {o.concl + (o.concl === 1 ? ' concluída' : ' concluídas')}
                              </div>
                            </div>
                          </div>
                          <b style={{ textAlign: 'center', fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>{o.n}</b>
                          <div style={{ textAlign: 'center' }}>
                            {o.bloq ? (
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '3px 9px',
                                  borderRadius: 8,
                                  fontSize: 12,
                                  fontWeight: 800,
                                  background: 'color-mix(in oklab, var(--ms7-error) 14%, transparent)',
                                  color: 'var(--ms7-error)',
                                }}
                              >
                                {o.bloq + ' · ' + ((o.bloq / Math.max(1, o.n)) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%'}
                              </span>
                            ) : (
                              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>0</span>
                            )}
                          </div>
                          <b style={{ textAlign: 'right', fontSize: 15, fontVariantNumeric: 'tabular-nums' }}>{MS7.brl(o.comC)}</b>
                          <b
                            style={{
                              textAlign: 'right',
                              fontSize: 15,
                              fontVariantNumeric: 'tabular-nums',
                              color: o.lucroC >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)',
                            }}
                          >
                            {MS7.brl(o.lucroC)}
                          </b>
                          <div style={{ height: 10, borderRadius: 5, background: 'var(--surface-muted, var(--ms7-gray-100))' }}>
                            <div
                              style={{
                                width: Math.max(2, Math.round((Math.abs(o.lucroC) / mx) * 100)) + '%',
                                height: '100%',
                                borderRadius: 5,
                                background: o.lucroC >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)',
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            ) : (
              <Empty icon="users" title="Nenhum operador" sub="Cadastre operadores em Gestão → Operadores." />
            )}
          </Card>
        )}

        {det
          ? (function () {
              const l = comPer(det, per);
              const tot = l.reduce(function (a, c) {
                return a + DB.calc(c).com;
              }, 0);
              return (
                <DS.Modal
                  open={true}
                  onClose={function () {
                    setDet(null);
                  }}
                  title={'Comissão de ' + DB.opName(det)}
                  subtitle={
                    per + ' · ' + l.length + (l.length === 1 ? ' cooperação concluída' : ' cooperações concluídas') + ' · total ' + MS7.brl(tot)
                  }
                  footer={
                    <React.Fragment>
                      <DS.Button
                        variant="secondary"
                        onClick={function () {
                          setDet(null);
                        }}
                      >
                        Fechar
                      </DS.Button>
                      <DS.Button
                        variant="brand"
                        iconLeft="banknote"
                        onClick={function () {
                          setDet(null);
                          window.ms7Go('financeiro');
                        }}
                      >
                        Ver pagamentos
                      </DS.Button>
                    </React.Fragment>
                  }
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {l.map(function (c) {
                      const k = DB.calc(c);
                      return (
                        <div
                          key={c.id}
                          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: '1px solid var(--border-subtle)' }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 700 }}>{DB.coopNome(c)}</div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                              {'Finalizada em ' + DB.fmtDate(DB.comData(c)) + ' · ' + DB.comText(c)}
                            </div>
                          </div>
                          <b style={{ fontSize: 14 }}>{MS7.brl(k.com)}</b>
                        </div>
                      );
                    })}
                    {!l.length ? <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Nenhuma cooperação neste período.</div> : null}
                  </div>
                </DS.Modal>
              );
            })()
          : null}
      </div>
    );
  }
  function ComparacaoScreen() {
    const { Card, Checkbox, BarChart, DataTable, Badge } = DS;
    DB.useDB();
    const O = DB.get().operadores;
    const [per, setPer] = usePersist('comp-per', '30 dias');
    const [sel, setSel] = usePersist(
      'comp-sel',
      O.slice(0, 4).map(function (o) {
        return o.id;
      }),
    );
    const rows = opRows(per)
      .filter(function (o) {
        return sel.indexOf(o.id) >= 0;
      })
      .sort(function (a, b) {
        return b.lucro - a.lucro;
      });
    const s = function (k) {
      return rows.reduce(function (a, o) {
        return a + o[k];
      }, 0);
    };
    function tog(id) {
      setSel(
        sel.indexOf(id) >= 0
          ? sel.filter(function (x) {
              return x !== id;
            })
          : sel.concat([id]),
      );
    }
    const d = function (k, div) {
      return rows.map(function (o) {
        return { label: o.nome.split(' ')[0], values: [Math.max(0, div ? Math.round((o[k] / div) * 10) / 10 : o[k])] };
      });
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <PeriodBar value={per} onChange={setPer} />
        <KpiRow
          items={[
            { icon: 'circle-dollar-sign', label: 'Lucro líquido', value: MS7.brlK(s('lucro')), tone: 'green', signed: s('lucro') },
            { icon: 'percent', label: 'Comissão total', value: MS7.brlK(s('com')), tone: 'yellow' },
            { icon: 'users', label: 'Operadores', value: rows.length, tone: 'blue' },
            { icon: 'circle-check', label: 'Coops concluídas', value: s('concluidas'), tone: 'orange' },
          ]}
        />
        <Card title="Operadores">
          <Hint>Marque os operadores que deseja comparar.</Hint>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px 24px' }}>
            {O.map(function (o) {
              return (
                <Checkbox
                  key={o.id}
                  label={o.nome}
                  checked={sel.indexOf(o.id) >= 0}
                  onChange={function () {
                    tog(o.id);
                  }}
                />
              );
            })}
          </div>
        </Card>
        {rows.length === 0 ? (
          <Card>
            <Empty icon="users" title="Nenhum operador selecionado" />
          </Card>
        ) : (
          <React.Fragment>
            <Grid min={300}>
              <Card title="Lucro líquido (mil R$)">
                <BarChart height={200} data={d('lucro', 1000)} series={[{ name: 'Lucro', color: 'var(--chart-1)' }]} />
              </Card>
              <Card title="Comissão (mil R$)">
                <BarChart height={200} data={d('com', 1000)} series={[{ name: 'Comissão', color: 'var(--chart-2)' }]} />
              </Card>
            </Grid>
            <Card title="Comparação ranqueada">
              <DataTable
                rows={rows.map(function (o, i) {
                  return Object.assign({ pos: i + 1 }, o);
                })}
                columns={[
                  {
                    key: 'pos',
                    label: '#',
                    render: function (r) {
                      return <b>{String(r.pos).padStart(2, '0')}</b>;
                    },
                  },
                  { key: 'nome', label: 'Operador' },
                  { key: 'coops', label: 'Coops', align: 'center' },
                  { key: 'n', label: 'Contas', align: 'center' },
                  {
                    key: 'lucro',
                    label: 'Lucro líquido',
                    align: 'right',
                    render: function (r) {
                      return <Money v={r.lucro} signed />;
                    },
                  },
                  {
                    key: 'com',
                    label: 'Comissão',
                    align: 'right',
                    render: function (r) {
                      return MS7.brl(r.com);
                    },
                  },
                  {
                    key: 'roi',
                    label: 'ROI',
                    align: 'right',
                    render: function (r) {
                      return <b>{pct(r.roi)}</b>;
                    },
                  },
                  {
                    key: 'b',
                    label: '',
                    align: 'center',
                    render: function (r) {
                      return r.pos === 1 && r.coops ? (
                        <Badge tone="green" size="sm">
                          Líder
                        </Badge>
                      ) : null;
                    },
                  },
                ]}
              />
            </Card>
          </React.Fragment>
        )}
      </div>
    );
  }
  function RedesScreen() {
    const { Card, BarChart } = DS;
    DB.useDB();
    const [per, setPer] = usePersist('redes-per', '30 dias');
    const R = DB.get()
      .redes.map(function (r) {
        const g = DB.agg(
          DB.coopsFor({ per: per }).filter(function (c) {
            return c.rede === r.nome;
          }),
        );
        return Object.assign({ nome: r.nome }, g);
      })
      .filter(function (r) {
        return r.coops;
      })
      .sort(function (a, b) {
        return b.lucro - a.lucro;
      });
    const s = function (k) {
      return R.reduce(function (a, o) {
        return a + o[k];
      }, 0);
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <PeriodBar value={per} onChange={setPer} />
        <KpiRow
          items={[
            { icon: 'network', label: 'Redes com operação', value: R.length, tone: 'blue' },
            { icon: 'circle-dollar-sign', label: 'Lucro líquido', value: MS7.brlK(s('lucro')), tone: 'green', signed: s('lucro') },
            { icon: 'users', label: 'Contas', value: s('n'), tone: 'yellow' },
            { icon: 'shield-alert', label: 'Contas bloqueadas', value: s('bloq'), tone: 'orange' },
          ]}
        />
        {R.length ? (
          <React.Fragment>
            <Card title="Lucro líquido por rede (mil R$)">
              <BarChart
                height={240}
                data={R.map(function (r) {
                  return { label: r.nome.replace('Rede ', ''), values: [Math.max(0, Math.round(r.lucro / 100) / 10)] };
                })}
                series={[{ name: 'Lucro (mil R$)', color: 'var(--chart-1)' }]}
              />
            </Card>
            <Card title="Redes">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
                {R.map(function (r) {
                  return (
                    <div
                      key={r.nome}
                      style={{
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 14,
                        padding: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <DS.Icon name="network" size={18} />
                        <b style={{ fontSize: 15 }}>{r.nome}</b>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '.06em',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          Lucro líquido
                        </div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: r.lucro >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)' }}>
                          {MS7.brl(r.lucro)}
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, fontSize: 12 }}>
                        <div>
                          <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Coops</div>
                          <b>{r.coops}</b>
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Contas</div>
                          <b>{r.n}</b>
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>ROI</div>
                          <b>{pct(r.roi)}</b>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </React.Fragment>
        ) : (
          <Card>
            <Empty icon="network" title="Sem operações neste período" />
          </Card>
        )}
      </div>
    );
  }
  Object.assign(window, {
    AlertNotifier: AlertNotifier,
    GeralScreen: GeralScreen,
    ComparacaoScreen: ComparacaoScreen,
    RedesScreen: RedesScreen,
    buildAlerts: buildAlerts,
  });
})();
