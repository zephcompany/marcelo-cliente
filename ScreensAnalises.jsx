(function () {
  const DS = window.MS7DesignSystem_5d5172;
  function HeatmapScreen() {
    const { Card, Tabs, Heatmap } = DS;
    const [metric, setMetric] = usePersist('heat-m', 'lucro');
    const [per, setPer] = usePersist('heat-per', 'Todos');
    const f = { Hoje: 0.12, '7 dias': 0.35, '30 dias': 1, Todos: 1.6 }[per] || 1;
    const m = MS7.heat.map(function (r) {
      return r.map(function (v) {
        return Math.round(metric === 'lucro' ? v * f : (v * f) / 180);
      });
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <PeriodBar value={per} onChange={setPer}>
          <Tabs
            value={metric}
            onChange={setMetric}
            items={[
              { id: 'lucro', label: 'Lucro' },
              { id: 'count', label: 'Quantidade' },
            ]}
            style={{ width: 240 }}
          />
        </PeriodBar>
        <Card
          title="Heatmap de operação"
          subtitle={'Melhores horários para operar — ' + (metric === 'lucro' ? 'lucro' : 'quantidade') + ' por dia da semana e hora (horário de Brasília)'}
          icon={
            <span className="ms7d-tile" style={{ width: 30, height: 30, borderRadius: 9, background: 'color-mix(in oklab, var(--ms7-green-900) 12%, var(--surface-card))', color: 'var(--ms7-green-900)' }}>
              <DS.Icon name="grid-3x3" size={15} strokeWidth={2} />
            </span>
          }
        >
          <Heatmap matrix={m} metricLabel={metric === 'lucro' ? 'Lucro' : 'Quantidade'} format={metric === 'lucro' ? MS7.brl : MS7.num} />
        </Card>
      </div>
    );
  }
  function ProjecaoScreen() {
    const { Card, LineChart } = DS;
    DB.useDB();
    const T = DB.today;
    const day = T.getDate();
    const total = new Date(T.getFullYear(), T.getMonth() + 1, 0).getDate();
    const daily = Array.from({ length: day }).map(function (_, i) {
      const ds = DB.iso(new Date(T.getFullYear(), T.getMonth(), i + 1, 12));
      return DB.get()
        .coops.filter(function (c) {
          return c.status !== 'Lixeira' && c.inicio === ds;
        })
        .reduce(function (a, c) {
          return a + DB.calc(c).lucro;
        }, 0);
    });
    let acc = 0;
    const real = daily.map(function (v) {
      acc += v;
      return acc;
    });
    const projected = day ? (acc / day) * total : 0;
    const labels = Array.from({ length: total }).map(function (_, i) {
      return String(i + 1).padStart(2, '0') + '/' + String(T.getMonth() + 1).padStart(2, '0');
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <KpiRow
          min={240}
          items={[
            { icon: 'circle-dollar-sign', label: 'Lucro realizado no mês', value: MS7.brlK(acc), tone: 'green', signed: acc },
            { icon: 'trending-up', label: 'Projeção do mês', value: MS7.brlK(projected), tone: 'blue', signed: projected },
            { icon: 'calendar-days', label: 'Progresso do mês', value: day + ' / ' + total + ' dias', tone: 'orange' },
          ]}
        />
        <Card title="Projeção de lucro líquido" subtitle="Realizado × projeção, dia a dia">
          <LineChart
            height={280}
            labels={labels}
            datasets={[
              { label: 'Realizado', values: real },
              {
                label: 'Projeção',
                values: labels.map(function (_, i) {
                  return Math.round((projected * (i + 1)) / total);
                }),
                dashed: true,
                color: 'var(--ms7-lime-600)',
              },
            ]}
            format={MS7.brl}
          />
          <p style={{ margin: '14px 0 0', fontSize: 12.5, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
            Soma do lucro líquido das cooperações abertas em cada dia. A projeção segue o ritmo atual do&nbsp;mês.
          </p>
        </Card>
      </div>
    );
  }
  function CustosScreen() {
    const { Card, Input, Select, Button, DataTable, Badge, IconButton } = DS;
    const db = DB.useDB();
    const C = MS7.custosCats;
    const [per, setPer] = usePersist('custos-per', '30 dias');
    const [f, setF] = React.useState({ cat: 'proxy', valor: '', desc: '' });
    const rows = db.custos.filter(function (r) {
      return DB.inPeriod(r.data, per);
    });
    const catOf = function (id) {
      return (
        C.find(function (c) {
          return c.id === id;
        }) || C[4]
      );
    };
    const total = rows.reduce(function (a, r) {
      return a + r.valor;
    }, 0);
    const contas = DB.agg(DB.coopsFor({ per: per })).n;
    const agg = C.map(function (c) {
      return {
        c: c,
        v: rows
          .filter(function (r) {
            return r.cat === c.id;
          })
          .reduce(function (a, r) {
            return a + r.valor;
          }, 0),
      };
    }).filter(function (a) {
      return a.v > 0;
    });
    function add() {
      const v = parseFloat(String(f.valor).replace(',', '.'));
      if (!v) {
        toast('Informe o valor');
        return;
      }
      DB.A.addCusto({ comp: '09/2026', cat: f.cat, desc: f.desc || catOf(f.cat).label, valor: v });
      setF(Object.assign({}, f, { valor: '', desc: '' }));
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <PeriodBar value={per} onChange={setPer} />
        <Card title="Registrar custo" subtitle="Proxies, servidores, softwares e bots entram no custo por conta.">
          <div className="ms7d-form">
            <Select
              label="Categoria"
              value={f.cat}
              onChange={function (e) {
                setF(Object.assign({}, f, { cat: e.target.value }));
              }}
              options={C.map(function (c) {
                return { value: c.id, label: c.label };
              })}
            />
            <Input
              label="Valor"
              prefix="R$"
              placeholder="0,00"
              value={f.valor}
              onChange={function (e) {
                setF(Object.assign({}, f, { valor: e.target.value }));
              }}
            />
            <Input
              label="Descrição"
              placeholder="Ex.: Pacote de proxies"
              value={f.desc}
              onChange={function (e) {
                setF(Object.assign({}, f, { desc: e.target.value }));
              }}
            />
            <Button variant="brand" iconLeft="plus" onClick={add} style={{ height: 42 }}>
              Registrar
            </Button>
          </div>
        </Card>
        <KpiRow
          min={230}
          items={[
            { icon: 'wallet', label: 'Custos de ferramentas', value: MS7.brlK(total), tone: 'black' },
            { icon: 'users', label: 'Contas no período', value: contas, tone: 'blue' },
            { icon: 'receipt', label: 'Ferramentas por conta', value: MS7.brl(contas ? total / contas : 0), tone: 'yellow' },
            { icon: 'tag', label: 'Custo fixo por conta', value: MS7.brl(db.config.custoConta), tone: 'orange' },
          ]}
        />
        <Grid min={340}>
          <Card title="Custos por categoria" subtitle={agg.length ? 'Total ' + MS7.brl(total) + ' no período' : null}>
            {agg.length ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', marginBottom: 6, background: 'var(--surface-muted)' }}>
                  {agg.map(function (a) {
                    return <span key={a.c.id} style={{ width: (a.v / total) * 100 + '%', background: a.c.color, boxShadow: '-2px 0 0 var(--surface-card)' }}></span>;
                  })}
                </div>
                <div className="ms7d-list">
                  {agg.map(function (a) {
                    return (
                      <div key={a.c.id} className="ms7d-row" style={{ padding: '11px 10px' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: a.c.color, flexShrink: 0 }}></span>
                        <span className="ms7d-t" style={{ flex: 1 }}>
                          {a.c.label}
                        </span>
                        <span className="ms7-num" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
                          {Math.round((a.v / total) * 100) + '%'}
                        </span>
                        <span className="ms7-num" style={{ width: 110, textAlign: 'right', fontSize: 14, fontWeight: 600 }}>
                          {MS7.brl(a.v)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <Empty art="Wallet" title="Nenhum custo no período" sub="Registre proxies, servidores e softwares acima para acompanhar o custo por conta." />
            )}
          </Card>
          <Card
            title="Registros"
            action={
              <Button
                size="sm"
                variant="outline"
                iconLeft="download"
                onClick={function () {
                  exportCSV(
                    'custos',
                    [
                      {
                        label: 'Data',
                        get: function (r) {
                          return r.data;
                        },
                      },
                      {
                        label: 'Categoria',
                        get: function (r) {
                          return catOf(r.cat).label;
                        },
                      },
                      {
                        label: 'Descrição',
                        get: function (r) {
                          return r.desc;
                        },
                      },
                      {
                        label: 'Valor',
                        get: function (r) {
                          return r.valor;
                        },
                      },
                    ],
                    rows,
                  );
                }}
              >
                Exportar
              </Button>
            }
          >
            {!rows.length ? (
              <Empty art="Inbox" compact title="Nenhum registro no período" sub="Os custos registrados aparecem aqui com data, categoria e valor." />
            ) : null}
            <DataTable
              style={rows.length ? null : { display: 'none' }}
              rows={rows}
              columns={[
                {
                  key: 'data',
                  label: 'Data',
                  render: function (r) {
                    return <span className="ms7-num">{DB.fmtDate(r.data)}</span>;
                  },
                },
                {
                  key: 'cat',
                  label: 'Categoria',
                  render: function (r) {
                    return (
                      <Badge
                        variant="soft"
                        size="sm"
                        tone={{ proxy: 'green', servidor: 'blue', software: 'purple', bots: 'orange', outros: 'gray' }[r.cat]}
                      >
                        {catOf(r.cat).label}
                      </Badge>
                    );
                  },
                },
                { key: 'desc', label: 'Descrição' },
                {
                  key: 'valor',
                  label: 'Valor',
                  align: 'right',
                  render: function (r) {
                    return (
                      <span className="ms7-num" style={{ fontWeight: 600 }}>
                        {MS7.brl(r.valor)}
                      </span>
                    );
                  },
                },
                {
                  key: 'x',
                  label: '',
                  align: 'right',
                  render: function (r) {
                    return (
                      <IconButton
                        icon="trash-2"
                        size={30}
                        iconSize={16}
                        onClick={function () {
                          DB.A.removeCusto(r.id);
                        }}
                      />
                    );
                  },
                },
              ]}
            />
          </Card>
        </Grid>
      </div>
    );
  }
  function FolhaScreen() {
    const { Card, DataTable, Badge, Button, IconButton, Tabs, Modal } = DS;
    const db = DB.useDB();
    const [modo, setModo] = React.useState('Semana');
    const [off, setOff] = React.useState(0);
    const [det, setDet] = React.useState(null);
    const [selP, setSelP] = React.useState({});
    React.useEffect(
      function () {
        setSelP({});
      },
      [modo, off],
    );
    const add = function (ds, n) {
      const d = new Date(ds + 'T12:00:00');
      d.setDate(d.getDate() + n);
      return DB.iso(d);
    };
    const hoje = DB.iso(DB.today);
    let de, ate, titulo;
    if (modo === 'Semana') {
      de = add(DB.semanaIni(hoje), off * 7);
      ate = add(de, 6);
      titulo = 'Semana de ' + DB.fmtDate(de) + ' a ' + DB.fmtDate(ate);
    } else if (modo === 'Mês') {
      const d = new Date(hoje + 'T12:00:00');
      d.setDate(1);
      d.setMonth(d.getMonth() + off);
      de = DB.iso(d);
      const e = new Date(d);
      e.setMonth(e.getMonth() + 1);
      e.setDate(0);
      ate = DB.iso(e);
      titulo = d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    } else {
      de = ate = add(hoje, off);
      titulo = new Date(de + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    }
    titulo = titulo.charAt(0).toUpperCase() + titulo.slice(1);
    const L = DB.comissoesDe(null, de, ate);
    const pagoDe = function (opId) {
      return db.pagamentos
        .filter(function (p) {
          const k = p.semana || p.data;
          return p.opId === opId && k >= de && k <= ate;
        })
        .reduce(function (x, p) {
          return x + p.valor;
        }, 0);
    };
    const ids = [];
    L.forEach(function (x) {
      if (ids.indexOf(x.c.opId) < 0) ids.push(x.c.opId);
    });
    db.pagamentos.forEach(function (p) {
      const k = p.semana || p.data;
      if (k >= de && k <= ate && ids.indexOf(p.opId) < 0) ids.push(p.opId);
    });
    const rows = ids
      .map(function (id) {
        const l = L.filter(function (x) {
          return x.c.opId === id;
        });
        const com =
          Math.round(
            l.reduce(function (s, x) {
              return s + x.com;
            }, 0) * 100,
          ) / 100;
        const pago = pagoDe(id);
        return {
          id: id,
          nome: DB.opName(id) || 'Sem operador',
          coops: l.length,
          com: com,
          pago: pago,
          saldo: Math.max(0, Math.round((com - pago) * 100) / 100),
        };
      })
      .sort(function (x, y) {
        return y.com - x.com;
      });
    const s = function (k) {
      return rows.reduce(function (x, r) {
        return x + r[k];
      }, 0);
    };
    const chart =
      modo === 'Semana'
        ? [0, 1, 2, 3, 4, 5, 6].map(function (n) {
            const d = add(de, n);
            return {
              label: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][n],
              values: [
                Math.round(
                  L.filter(function (x) {
                    return x.data === d;
                  }).reduce(function (t, x) {
                    return t + x.com;
                  }, 0),
                ),
              ],
            };
          })
        : modo === 'Mês'
          ? (function () {
              const out = [];
              let w = DB.semanaIni(de);
              while (w <= ate) {
                const w2 = add(w, 6);
                out.push({
                  label: DB.fmtDate(w < de ? de : w),
                  values: [
                    Math.round(
                      L.filter(function (x) {
                        return x.data >= w && x.data <= w2;
                      }).reduce(function (t, x) {
                        return t + x.com;
                      }, 0),
                    ),
                  ],
                });
                w = add(w, 7);
              }
              return out;
            })()
          : null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Tabs
            variant="chips"
            value={modo}
            onChange={function (v) {
              setModo(v);
              setOff(0);
            }}
            items={['Semana', 'Mês', 'Dia']}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <IconButton
              icon="chevron-left"
              variant="outline"
              size={34}
              iconSize={16}
              label="Anterior"
              onClick={function () {
                setOff(off - 1);
              }}
            />
            <span className="ms7-num" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em', minWidth: 200, textAlign: 'center' }}>
              {titulo}
            </span>
            <IconButton
              icon="chevron-right"
              variant="outline"
              size={34}
              iconSize={16}
              label="Próximo"
              disabled={off >= 0}
              onClick={function () {
                setOff(off + 1);
              }}
            />
          </div>
        </div>
        <KpiRow
          min={230}
          items={[
            { icon: 'banknote', label: 'Comissão a pagar', value: MS7.brl(s('com')), tone: 'blue' },
            { icon: 'circle-check', label: 'Já pago', value: MS7.brl(s('pago')), tone: 'green' },
            { icon: 'clock', label: 'Falta pagar', value: MS7.brl(s('saldo')), tone: 'yellow' },
            { icon: 'briefcase', label: 'Cooperações concluídas', value: L.length, tone: 'orange' },
          ]}
        />
        {chart ? (
          <Card title={modo === 'Semana' ? 'Comissão por dia' : 'Comissão por semana'}>
            <DS.BarChart height={200} data={chart} series={[{ name: 'Comissão', color: 'var(--chart-1)' }]} />
          </Card>
        ) : null}
        <Card
          title="Comissão por operador"
          action={
            <Button
              size="sm"
              variant="outline"
              iconLeft="download"
              onClick={function () {
                exportCSV(
                  'comissoes-' + de + '_' + ate,
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
                      label: 'Comissão',
                      get: function (r) {
                        return r.com;
                      },
                    },
                    {
                      label: 'Pago',
                      get: function (r) {
                        return r.pago;
                      },
                    },
                    {
                      label: 'Falta pagar',
                      get: function (r) {
                        return r.saldo;
                      },
                    },
                  ],
                  rows,
                );
              }}
            >
              Exportar
            </Button>
          }
        >
          <Hint>Conta só cooperações Concluídas, no dia em que foram finalizadas. Clique no operador para ver cada&nbsp;cooperação.</Hint>
          {modo === 'Semana' &&
          rows.some(function (r) {
            return r.saldo >= 0.01;
          })
            ? (function () {
                const pend = rows.filter(function (r) {
                  return r.saldo >= 0.01;
                });
                const sl = pend.filter(function (r) {
                  return selP[r.id];
                });
                const tot = sl.reduce(function (x, r) {
                  return x + r.saldo;
                }, 0);
                const all = sl.length === pend.length;
                return (
                  <div className="ms7d-toolbar">
                    <DS.Checkbox
                      label={all ? 'Desmarcar todos' : 'Selecionar todos pendentes (' + pend.length + ')'}
                      checked={all}
                      onChange={function (v) {
                        const n = {};
                        if (v)
                          pend.forEach(function (r) {
                            n[r.id] = 1;
                          });
                        setSelP(n);
                      }}
                    />
                    <span style={{ flex: 1 }}></span>
                    <span className="ms7-num" style={{ fontSize: 13.5, fontWeight: sl.length ? 600 : 500, color: sl.length ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {sl.length ? sl.length + (sl.length === 1 ? ' operador · ' : ' operadores · ') + MS7.brl(tot) : 'Marque quem vai receber'}
                    </span>
                    <Button
                      size="sm"
                      variant="brand"
                      iconLeft="check"
                      disabled={!sl.length}
                      onClick={function () {
                        if (
                          confirm(
                            'Registrar pagamento para ' +
                              sl.length +
                              (sl.length === 1 ? ' operador' : ' operadores') +
                              ' (' +
                              titulo +
                              '), total ' +
                              MS7.brl(tot) +
                              '?',
                          )
                        ) {
                          sl.forEach(function (r) {
                            DB.A.pagar(r.id, r.saldo, de);
                          });
                          setSelP({});
                          toast(sl.length + (sl.length === 1 ? ' pagamento registrado' : ' pagamentos registrados'));
                        }
                      }}
                    >
                      {sl.length ? 'Pagar ' + sl.length + ' · ' + MS7.brl(tot) : 'Pagar selecionados'}
                    </Button>
                  </div>
                );
              })()
            : null}
          {rows.length ? (
            <DataTable
              rows={rows}
              onRowClick={function (r) {
                setDet(r.id);
              }}
              columns={(modo === 'Semana'
                ? [
                    {
                      key: 'sel',
                      label: '',
                      render: function (r) {
                        return r.saldo >= 0.01 ? (
                          <span
                            onClick={function (e) {
                              e.stopPropagation();
                            }}
                          >
                            <DS.Checkbox
                              checked={!!selP[r.id]}
                              onChange={function (v) {
                                setSelP(function (s0) {
                                  const n = Object.assign({}, s0);
                                  if (v) n[r.id] = 1;
                                  else delete n[r.id];
                                  return n;
                                });
                              }}
                            />
                          </span>
                        ) : null;
                      },
                    },
                  ]
                : []
              ).concat([
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
                {
                  key: 'com',
                  label: 'Comissão',
                  align: 'right',
                  render: function (r) {
                    return (
                      <span className="ms7-num" style={{ fontWeight: 600 }}>
                        {MS7.brl(r.com)}
                      </span>
                    );
                  },
                },
                {
                  key: 'pago',
                  label: 'Pago',
                  align: 'right',
                  render: function (r) {
                    return (
                      <span className="ms7-num" style={{ color: r.pago ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {MS7.brl(r.pago)}
                      </span>
                    );
                  },
                },
                {
                  key: 'st',
                  label: 'Status',
                  align: 'center',
                  render: function (r) {
                    return (
                      <Badge size="sm" tone={r.saldo < 0.01 ? 'green' : 'yellow'}>
                        {r.saldo < 0.01 ? 'Pago' : 'Pendente'}
                      </Badge>
                    );
                  },
                },
                {
                  key: 'a',
                  label: '',
                  align: 'right',
                  render: function (r) {
                    return modo !== 'Semana' || r.saldo < 0.01 ? null : (
                      <Button
                        size="sm"
                        variant="brand"
                        iconLeft="check"
                        onClick={function (e) {
                          e.stopPropagation();
                          if (confirm('Registrar pagamento de ' + MS7.brl(r.saldo) + ' para ' + r.nome + ' (' + titulo + ')?'))
                            DB.A.pagar(r.id, r.saldo, de);
                        }}
                      >
                        {'Pagar ' + MS7.brl(r.saldo)}
                      </Button>
                    );
                  },
                },
              ])}
            />
          ) : (
            <Empty art="Wallet" title="Nenhuma cooperação concluída neste período" sub="Quando uma cooperação é concluída, a comissão do operador entra aqui para pagamento." />
          )}
          {modo !== 'Semana' && s('saldo') > 0.01 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 12 }}>
              <DS.Icon name="info" size={14} />
              Para pagar, abra a aba Semana.
            </div>
          ) : null}
        </Card>
        {det
          ? (function () {
              const l = L.filter(function (x) {
                return x.c.opId === det;
              }).sort(function (x, y) {
                return x.data < y.data ? -1 : 1;
              });
              const tot = l.reduce(function (t, x) {
                return t + x.com;
              }, 0);
              return (
                <Modal
                  open={true}
                  onClose={function () {
                    setDet(null);
                  }}
                  title={'Comissão de ' + (DB.opName(det) || 'Sem operador')}
                  subtitle={titulo + ' · ' + l.length + (l.length === 1 ? ' cooperação' : ' cooperações') + ' · ' + MS7.brl(tot)}
                  footer={
                    <Button
                      variant="secondary"
                      onClick={function () {
                        setDet(null);
                      }}
                    >
                      Fechar
                    </Button>
                  }
                >
                  <div className="ms7d-list">
                    {l.map(function (x) {
                      return (
                        <div key={x.c.id} className="ms7d-row">
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="ms7d-t">{DB.coopNome(x.c)}</div>
                            <div className="ms7d-s">{'Finalizada em ' + DB.fmtDate(x.data) + ' · ' + DB.comText(x.c)}</div>
                          </div>
                          <span className="ms7-num" style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
                            {MS7.brl(x.com)}
                          </span>
                        </div>
                      );
                    })}
                    {!l.length ? <Empty art="Coop" compact title="Nenhuma cooperação concluída neste período" sub="As cooperações concluídas do operador aparecem aqui com a comissão de cada uma." /> : null}
                  </div>
                </Modal>
              );
            })()
          : null}
      </div>
    );
  }
  Object.assign(window, { HeatmapScreen: HeatmapScreen, ProjecaoScreen: ProjecaoScreen, CustosScreen: CustosScreen, FolhaScreen: FolhaScreen });
})();
