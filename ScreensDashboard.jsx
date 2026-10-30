(function () {
  const DS = window.MS7DesignSystem_5d5172;
  /* CSS da camada visual (só tokens) — dashboard, análises, conferência */
  (function () {
    if (document.getElementById('ms7-dash-css')) return;
    const s = document.createElement('style');
    s.id = 'ms7-dash-css';
    s.textContent = [
      '.ms7d-hero-num{display:block;font-size:clamp(34px,4.6vw,44px);font-weight:600;letter-spacing:-.04em;line-height:1;font-variant-numeric:tabular-nums}',
      '.ms7d-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:4px;padding-top:16px;border-top:1px solid var(--line)}',
      '.ms7d-fact{min-width:0;padding:0 18px}.ms7d-fact:first-child{padding-left:0}.ms7d-fact+.ms7d-fact{border-left:1px solid var(--line)}',
      '.ms7d-fact-v{margin-top:5px;font-size:18px;font-weight:600;letter-spacing:-.03em;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '@media (max-width:520px){.ms7d-facts{grid-template-columns:1fr}.ms7d-fact{padding:10px 0;border-left:0!important;border-top:1px solid var(--border-subtle)}.ms7d-fact:first-child{border-top:0;padding-top:0}}',
      /* flutuantes (tooltip do gráfico): vidro sólido — no claro cai no card */
      '.ms7d-tip{position:absolute;top:6px;padding:8px 12px;border-radius:10px;background:var(--glass-solid,var(--surface-card));backdrop-filter:blur(24px) saturate(1.4);-webkit-backdrop-filter:blur(24px) saturate(1.4);box-shadow:var(--shadow-pop);pointer-events:none;white-space:nowrap;animation:ms7-pop 200ms var(--ease-out) both}',
      '.ms7d-tip-d{display:block;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text-secondary)}',
      /* tooltips dos gráficos do DS (bar/line) — eram caixa preta com texto branco */
      '.ms7-chart-bar>div>div>div,.ms7-chart-line>div>div>div{background:var(--glass-solid,var(--surface-card))!important;color:var(--text-primary)!important;backdrop-filter:blur(24px) saturate(1.4);-webkit-backdrop-filter:blur(24px) saturate(1.4);box-shadow:var(--shadow-pop);border-radius:9px!important;padding:7px 10px!important;font-size:12px!important;font-variant-numeric:tabular-nums;z-index:2}',
      '.ms7-chart-line svg circle{stroke:var(--surface-page)!important}',
      '.ms7d-list{display:flex;flex-direction:column}',
      '.ms7d-row{display:flex;align-items:center;gap:12px;padding:12px 10px;margin:0 -10px;border-radius:10px;transition:background var(--dur-fast)}',
      '.ms7d-row:hover{background:var(--glass-2,var(--surface-muted))}.ms7d-row.is-click{cursor:pointer}',
      '.ms7d-list>.ms7d-row:not(:last-child){border-bottom:1px solid var(--border-subtle)}',
      '.ms7d-tile{width:34px;height:34px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center}',
      '.ms7d-t{font-size:14px;font-weight:600;letter-spacing:-.005em;line-height:1.3;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.ms7d-s{font-size:12.5px;font-weight:500;color:var(--text-secondary);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.ms7d-val{font-size:13.5px;font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums}',
      '@media (max-width:520px){.ms7d-t,.ms7d-s{white-space:normal}.ms7d-row.has-val{flex-wrap:wrap}.ms7d-row.has-val>.ms7d-val{flex:1 0 100%;padding-left:46px;margin-top:-2px}}',
      '.ms7d-chips{display:flex;flex-wrap:wrap;gap:8px}',
      '.ms7d-chip{display:inline-flex;align-items:center;height:36px;padding:0 14px 0 10px;border-radius:999px;border:1px solid var(--line);background:var(--glass,var(--surface-card));box-shadow:var(--glass-edge,none);transition:border-color var(--dur-fast),background var(--dur-fast),transform var(--dur-base) var(--ease-standard)}',
      '.ms7d-chip:hover{border-color:var(--line-strong);background:var(--glass-2,var(--surface-card));transform:translateY(-1px)}',
      '.ms7d-chip.is-on{border-color:color-mix(in oklab,var(--ms7-green-900) 45%,var(--line));background:color-mix(in oklab,var(--ms7-green-900) 10%,transparent)}',
      '.ms7d-chip .ms7-check{font-size:13.5px;font-weight:600;gap:8px}',
      '.ms7d-pos{width:26px;height:26px;border-radius:8px;background:var(--surface-muted);font-size:11px;font-weight:600;display:inline-flex;align-items:center;justify-content:center;font-variant-numeric:tabular-nums}',
      '.ms7d-pos.is-first{background:var(--ms7-lime-500);color:var(--text-on-lime)}',
      '.ms7d-rede{padding:18px 20px;display:flex;flex-direction:column;gap:12px}',
      '.ms7d-rede-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding-top:12px;border-top:1px solid var(--border-subtle)}',
      '.ms7d-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}',
      '.ms7d-tile-box{padding:14px 16px;border-radius:12px;background:var(--surface-muted)}',
      '.ms7d-form{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end}.ms7d-form>.ms7-field{flex:1 1 180px}',
      '.ms7d-toolbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 12px;margin-bottom:12px;border-radius:12px;background:var(--surface-muted)}',
      '.ms7d-legend{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text-secondary)}',
      '.ms7d-legend-bar{width:120px;height:8px;border-radius:4px;background:linear-gradient(90deg,color-mix(in oklab,var(--ms7-green) 10%,var(--surface-muted)),color-mix(in oklab,var(--ms7-green) 55%,var(--surface-card)),var(--ms7-green-900))}',
      '.ms7-chart-heat>div>div>span{font-weight:600!important}',
      '.ms7-chart-heat>div>div:last-child>span:first-child{font-weight:500!important;color:var(--text-secondary)}',
      '.ms7d-grp{display:flex;align-items:center;gap:14px;padding:16px 20px;flex-wrap:wrap}',
      '.ms7d-grp+.ms7d-grp,.ms7d-grp-det+.ms7d-grp{border-top:1px solid var(--border-subtle)}',
      '.ms7d-grp-det{border-top:1px solid var(--border-subtle);padding:2px 8px 6px}',
    ].join('');
    document.head.appendChild(s);
  })();
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
  /* tile de ícone tingido (detalhe de cor, nunca card inteiro) */
  const tint = function (c) {
    return 'color-mix(in oklab, ' + c + ' 12%, var(--surface-card))';
  };
  /* título de card com 1 emoji (regra do guia: só em título, antes do texto) */
  const ttl = function (emo, txt) {
    return (
      <React.Fragment>
        <span className="ms7-emo" aria-hidden="true" style={{ marginRight: 8 }}>
          {emo}
        </span>
        {txt}
      </React.Fragment>
    );
  };
  function AlertsCard({ session }) {
    const { Card, Badge } = DS;
    const al = buildAlerts(session);
    return (
      <Card
        title={ttl('🔔', 'Alertas')}
        action={
          al.length ? (
            <Badge size="sm" tone="error">
              {al.length}
            </Badge>
          ) : null
        }
      >
        {al.length ? (
          <div className="ms7d-list">
            {al.slice(0, 6).map(function (a, i) {
              const c = 'var(--ms7-' + (a.tone === 'error' ? 'error' : a.tone === 'yellow' ? 'orange' : 'blue') + ')';
              return (
                <div
                  key={i}
                  className="ms7d-row is-click"
                  onClick={function () {
                    a.coop ? openCoop(a.coop) : window.ms7Go(a.page);
                  }}
                >
                  <span className="ms7d-tile" style={{ background: tint(c), color: c }}>
                    <DS.Icon name={a.icon} size={16} strokeWidth={2} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="ms7d-t">{a.title}</div>
                    <div className="ms7d-s">{a.sub}</div>
                  </div>
                  <DS.Icon name="chevron-right" size={16} color="var(--text-secondary)" />
                </div>
              );
            })}
          </div>
        ) : (
          <Empty art="Bell" compact title="Tudo certo" sub="Nenhum alerta no momento." />
        )}
      </Card>
    );
  }
  function FinHero({ per, op, gC }) {
    const db = DB.get();
    /* cor da linha/área do gráfico: acento (lima no escuro, verde no claro) */
    const LINE = 'var(--ms7-green-900)';
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
    const sec = { fontSize: 13.5, fontWeight: 500, color: 'var(--text-secondary)' };
    const num = function (v, size) {
      return { fontSize: size || 14, fontWeight: 600, color: col(v), whiteSpace: 'nowrap' };
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'stretch' }}>
          <section className="ms7-card" style={{ flex: '2 1 520px', minWidth: 0, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.015em' }}>Lucro líquido</h3>
              <span style={{ flex: 1 }}></span>
              <DS.Badge tone="gray" variant="soft">
                {per}
              </DS.Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px 14px', flexWrap: 'wrap' }}>
              <DS.CountUp value={brlS(gC.lucro)} className="ms7d-hero-num" style={{ color: col(gC.lucro) }} />
              <span style={sec}>{gC.coops + (gC.coops === 1 ? ' cooperação concluída' : ' cooperações concluídas') + ' · ROI ' + pct(gC.roi)}</span>
            </div>
            <div className="ms7-eyebrow" style={{ marginTop: 6 }}>
              Resultado por dia
            </div>
            <div style={{ position: 'relative', flex: 1, minHeight: 170, display: 'flex', flexDirection: 'column' }}>
              {vals.length ? (
                <div className="ms7-chart ms7-chart-area" style={{ flex: 1, display: 'flex' }}>
                  <svg
                    viewBox={'0 0 ' + W + ' ' + H}
                    preserveAspectRatio="none"
                    style={{ width: '100%', height: '100%', minHeight: 170, display: 'block', flex: 1 }}
                    onMouseLeave={function () {
                      setHv(null);
                    }}
                  >
                    <defs>
                      <linearGradient id="ms7fh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor={LINE} stopOpacity=".28"></stop>
                        <stop offset="1" stopColor={LINE} stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <line x1="0" x2={W} y1={y0} y2={y0} stroke="var(--line-strong)" strokeDasharray="4 4"></line>
                    <path d={area} fill="url(#ms7fh)"></path>
                    <path d={line} fill="none" stroke={LINE} strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path>
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
                    {hv != null ? <rect x={pts[hv][0] - 0.5} y="0" width="1" height={H} fill="var(--text-secondary)" opacity=".55"></rect> : null}
                  </svg>
                </div>
              ) : (
                <Empty art="Chart" compact title="Nenhuma cooperação concluída neste período" sub="Quando uma cooperação é concluída, o lucro de cada dia aparece aqui." />
              )}
              {hv != null ? (
                <span
                  style={{
                    position: 'absolute',
                    left: (pts[hv][0] / W) * 100 + '%',
                    top: (pts[hv][1] / H) * 100 + '%',
                    width: 10,
                    height: 10,
                    marginLeft: -5,
                    marginTop: -5,
                    borderRadius: '50%',
                    background: 'var(--surface-page)',
                    border: '2px solid ' + LINE,
                    boxShadow: '0 0 0 1px var(--surface-page)',
                    pointerEvents: 'none',
                  }}
                ></span>
              ) : null}
              {hv != null ? (
                <div className="ms7d-tip" style={{ left: Math.min(70, Math.max(0, (pts[hv][0] / W) * 100)) + '%' }}>
                  <span className="ms7d-tip-d">{ks[hv].split('-').reverse().slice(0, 2).join('/')}</span>
                  <span className="ms7-num" style={num(vals[hv], 14)}>
                    {brlS(vals[hv])}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="ms7d-facts">
              {[
                ['Dias com resultado', String(vals.length), null],
                ['Média por dia', brlS(media), media],
                ['Melhor dia', brlS(best), best],
              ].map(function (x) {
                return (
                  <div key={x[0]} className="ms7d-fact">
                    <div className="ms7-eyebrow">{x[0]}</div>
                    <div className="ms7-num ms7d-fact-v" style={{ color: x[2] == null ? 'var(--text-primary)' : col(x[2]) }}>
                      {x[1]}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
            <DS.Card
              title={ttl('🎯', 'Metas')}
              padding={20}
              action={
                <DS.Button
                  size="sm"
                  variant="ghost"
                  iconRight="arrow-right"
                  onClick={function () {
                    window.ms7Go('cooperacoes');
                  }}
                >
                  Ver cooperações
                </DS.Button>
              }
            >
              <DS.CountUp
                value={brlS(sm(at) + sm(fi))}
                className="ms7-num"
                style={{ display: 'block', fontSize: 28, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: col(sm(at) + sm(fi)) }}
              />
              <div style={{ marginTop: 12 }}>
                {[
                  ['Ativas (parcial)', at.length, sm(at)],
                  ['Finalizadas', fi.length, sm(fi)],
                ].map(function (x, i) {
                  return (
                    <div key={x[0]} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
                      <span style={Object.assign({ flex: 1 }, sec)}>{x[0]}</span>
                      <DS.CountDot tone="muted">{x[1]}</DS.CountDot>
                      <span className="ms7-num" style={num(x[2])}>
                        {brlS(x[2])}
                      </span>
                    </div>
                  );
                })}
              </div>
            </DS.Card>
            <DS.Card title={ttl('📈', 'Resultados')} padding={20}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {comp.map(function (x) {
                  return (
                    <div key={x[0]}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                        <span style={Object.assign({ flex: 1 }, sec)}>{x[0]}</span>
                        <span className="ms7-num" style={num(x[1])}>
                          {brlS(x[1])}
                        </span>
                      </div>
                      <div className="ms7-bar" style={{ marginTop: 8 }}>
                        <i style={{ width: Math.round((Math.abs(x[1]) / cmx) * 100) + '%', background: x[1] >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)' }}></i>
                      </div>
                    </div>
                  );
                })}
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>Lucro líquido</span>
                  <span className="ms7-num" style={Object.assign(num(gC.lucro, 16), { letterSpacing: '-0.02em' })}>
                    {brlS(gC.lucro)}
                  </span>
                </div>
              </div>
            </DS.Card>
          </div>
        </div>
        <Grid min={340}>
          <DS.Card
            title={ttl('⚡', 'Sua próxima ação')}
            action={
              acoes.length ? (
                <DS.Badge tone="gray" variant="soft">
                  {acoes.length + (acoes.length === 1 ? ' pendência' : ' pendências')}
                </DS.Badge>
              ) : null
            }
          >
            {acoes.length ? (
              <div className="ms7d-list">
                {acoes.map(function (a) {
                  const c = a[0] === 'shield-alert' ? 'var(--ms7-error)' : 'var(--ms7-green-900)';
                  return (
                    <div key={a[1]} className="ms7d-row">
                      <span className="ms7d-tile" style={{ background: tint(c), color: c }}>
                        <DS.Icon name={a[0]} size={16} strokeWidth={2} />
                      </span>
                      <div className="ms7d-t" style={{ flex: 1, whiteSpace: 'normal' }}>
                        {a[1]}
                        <span className="ms7-num" style={{ marginLeft: 6, fontWeight: 500, color: 'var(--text-secondary)' }}>
                          {'· ' + a[2]}
                        </span>
                      </div>
                      <DS.Button
                        size="sm"
                        variant="primary"
                        iconRight="arrow-right"
                        onClick={function () {
                          window.ms7Go(a[4]);
                        }}
                      >
                        {a[3]}
                      </DS.Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Empty art="Tasks" compact title="Nada pendente agora" sub="Cooperações finalizadas, tarefas do dia e contas bloqueadas aparecem aqui." />
            )}
          </DS.Card>
          <DS.Card title={ttl('🧾', 'Últimas remessas')}>
            {rem.length ? (
              <div className="ms7d-list">
                {rem.map(function (n) {
                  const b = String(n.body || '').split('\n');
                  const r =
                    b.find(function (x) {
                      return /^Resultado/.test(x);
                    }) || '';
                  return (
                    <div key={n.id} className={'ms7d-row' + (r ? ' has-val' : '')}>
                      <DS.Avatar name={(b[0] || '').replace(/^Operador:\s*/, '') || '?'} size={34} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="ms7d-t">{n.title}</div>
                        <div className="ms7d-s">{[(b[0] || '').replace(/^Operador:\s*/, ''), b[1], n.at].filter(Boolean).join(' · ')}</div>
                      </div>
                      {r ? (
                        <span className="ms7-num ms7d-val" style={{ color: /-R\$/.test(r) ? 'var(--ms7-error)' : 'var(--ms7-green)' }}>
                          {r.replace(/^Resultado:\s*/, '')}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <Empty art="Inbox" compact title="Sem remessas ainda" sub="Os ciclos enviados pelos operadores aparecem aqui." />
            )}
          </DS.Card>
        </Grid>
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
            <Card title={ttl('🤝', 'Minhas cooperações no período')}>
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
              <Card title={ttl('📊', 'Resumo do período')}>
                <div className="ms7d-tiles ms7-stagger">
                  {it.map(function (x) {
                    return (
                      <div key={x[0]} className="ms7d-tile-box">
                        <div className="ms7-eyebrow">{x[0]}</div>
                        <div className="ms7-num" style={{ marginTop: 6, fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: x[2] || 'var(--text-primary)' }}>
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
            title={ttl('👥', 'Operadores')}
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
              <div className="ms7-table-wrap">
                <table className="ms7-table" style={{ minWidth: 720 }}>
                  <thead>
                    <tr>
                      <th>Operador</th>
                      <th style={{ textAlign: 'center' }}>Contas</th>
                      <th style={{ textAlign: 'center' }}>Bloqueadas</th>
                      <th style={{ textAlign: 'right' }}>Comissão</th>
                      <th style={{ textAlign: 'right' }}>Lucro</th>
                      <th style={{ width: '22%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
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
                          <tr
                            key={o.id}
                            className="is-click"
                            onClick={function () {
                              setDet(o.id);
                            }}
                          >
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                                <Avatar name={o.nome} size={30} />
                                <div style={{ minWidth: 0 }}>
                                  <div className="ms7d-t">{o.nome}</div>
                                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>{o.concl + (o.concl === 1 ? ' concluída' : ' concluídas')}</div>
                                </div>
                              </div>
                            </td>
                            <td className="ms7-num" style={{ textAlign: 'center', fontWeight: 600 }}>
                              {o.n}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              {o.bloq ? (
                                <Badge tone="error" size="sm">
                                  {o.bloq + ' · ' + ((o.bloq / Math.max(1, o.n)) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%'}
                                </Badge>
                              ) : (
                                <span style={{ color: 'var(--text-secondary)' }}>0</span>
                              )}
                            </td>
                            <td className="ms7-num" style={{ textAlign: 'right', fontWeight: 600 }}>
                              {MS7.brl(o.comC)}
                            </td>
                            <td className="ms7-num" style={{ textAlign: 'right', fontWeight: 600, color: o.lucroC >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)' }}>
                              {MS7.brl(o.lucroC)}
                            </td>
                            <td>
                              <div className="ms7-bar">
                                <i style={{ width: Math.max(2, Math.round((Math.abs(o.lucroC) / mx) * 100)) + '%', background: o.lucroC >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)' }}></i>
                              </div>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            ) : (
              <Empty
                art="People"
                title="Nenhum operador"
                sub="Cadastre operadores em Gestão → Operadores."
                action={
                  <DS.Button
                    variant="brand"
                    iconLeft="user-plus"
                    onClick={function () {
                      window.ms7Go('gestao');
                    }}
                  >
                    Cadastrar operador
                  </DS.Button>
                }
              />
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
                  <div className="ms7d-list">
                    {l.map(function (c) {
                      const k = DB.calc(c);
                      return (
                        <div key={c.id} className="ms7d-row">
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="ms7d-t">{DB.coopNome(c)}</div>
                            <div className="ms7d-s">{'Finalizada em ' + DB.fmtDate(DB.comData(c)) + ' · ' + DB.comText(c)}</div>
                          </div>
                          <span className="ms7-num" style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
                            {MS7.brl(k.com)}
                          </span>
                        </div>
                      );
                    })}
                    {!l.length ? <Empty art="Coop" compact title="Nenhuma cooperação neste período" sub="As cooperações concluídas do operador aparecem aqui com a comissão de cada uma." /> : null}
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
        <Card title={ttl('👥', 'Operadores')} subtitle="Marque os operadores que deseja comparar.">
          <div className="ms7d-chips">
            {O.map(function (o) {
              const on = sel.indexOf(o.id) >= 0;
              return (
                <div key={o.id} className={'ms7d-chip' + (on ? ' is-on' : '')}>
                  <Checkbox
                    label={o.nome}
                    checked={on}
                    onChange={function () {
                      tog(o.id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Card>
        {rows.length === 0 ? (
          <Card>
            <Empty art="People" title="Nenhum operador selecionado" sub="Marque ao menos um operador acima para ver a comparação." />
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
            <Card title={ttl('🏆', 'Comparação ranqueada')} reveal>
              <DataTable
                rows={rows.map(function (o, i) {
                  return Object.assign({ pos: i + 1 }, o);
                })}
                columns={[
                  {
                    key: 'pos',
                    label: '#',
                    width: 44,
                    render: function (r) {
                      return <span className={'ms7d-pos' + (r.pos === 1 ? ' is-first' : '')}>{String(r.pos).padStart(2, '0')}</span>;
                    },
                  },
                  {
                    key: 'nome',
                    label: 'Operador',
                    render: function (r) {
                      return (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                          <DS.Avatar name={r.nome} size={30} />
                          <span style={{ fontWeight: 600 }}>{r.nome}</span>
                        </span>
                      );
                    },
                  },
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
                      return <span className="ms7-num">{MS7.brl(r.com)}</span>;
                    },
                  },
                  {
                    key: 'roi',
                    label: 'ROI',
                    align: 'right',
                    render: function (r) {
                      return (
                        <span className="ms7-num" style={{ fontWeight: 600 }}>
                          {pct(r.roi)}
                        </span>
                      );
                    },
                  },
                  {
                    key: 'b',
                    label: '',
                    align: 'center',
                    render: function (r) {
                      return r.pos === 1 && r.coops ? (
                        <Badge tone="lime" size="sm">
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
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.25 }}>{ttl('🌐', 'Redes')}</h3>
                <DS.CountDot tone="muted">{R.length}</DS.CountDot>
              </div>
              <div className="ms7-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: 16 }}>
                {R.map(function (r) {
                  return (
                    <section key={r.nome} className="ms7-card ms7d-rede">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <span className="ms7d-tile" style={{ width: 30, height: 30, borderRadius: 9, background: tint('var(--ms7-green-900)'), color: 'var(--ms7-green-900)' }}>
                          <DS.Icon name="network" size={15} strokeWidth={2} />
                        </span>
                        <span className="ms7d-t" style={{ fontSize: 15 }}>
                          {r.nome}
                        </span>
                      </div>
                      <div>
                        <div className="ms7-eyebrow">Lucro líquido</div>
                        <div className="ms7-num" style={{ marginTop: 4, fontSize: 20, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: r.lucro >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)' }}>
                          {MS7.brl(r.lucro)}
                        </div>
                      </div>
                      <div className="ms7d-rede-facts">
                        {[
                          ['Coops', r.coops],
                          ['Contas', r.n],
                          ['ROI', pct(r.roi)],
                        ].map(function (x) {
                          return (
                            <div key={x[0]} style={{ minWidth: 0 }}>
                              <div className="ms7-eyebrow">{x[0]}</div>
                              <div className="ms7-num" style={{ marginTop: 3, fontSize: 14, fontWeight: 600 }}>
                                {x[1]}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Card>
            <Empty art="Globe" title="Sem operações neste período" sub="As redes aparecem aqui assim que tiverem cooperações no período escolhido." />
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
