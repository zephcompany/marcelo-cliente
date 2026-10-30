(function () {
  const DS = window.MS7DesignSystem_5d5172;
  /* CSS próprio das telas de conta (só tokens) */
  (function () {
    if (document.getElementById('ms7-conta-css')) return;
    const s = document.createElement('style');
    s.id = 'ms7-conta-css';
    s.textContent = [
      '.ms7c-list{display:flex;flex-direction:column}',
      '.ms7c-row{display:flex;align-items:center;gap:14px;padding:14px 12px;margin:0 -12px;border-bottom:1px solid var(--border-subtle);border-radius:10px;transition:background var(--dur-fast)}',
      '.ms7c-row:last-child{border-bottom:0}.ms7c-row:hover{background:var(--surface-muted)}',
      '.ms7c-tile{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
      '.ms7c-tile.is-lg{width:44px;height:44px;border-radius:12px}',
      '.ms7c-t{font-size:14px;font-weight:600;letter-spacing:-.005em;line-height:1.3}',
      '.ms7c-s{font-size:13px;font-weight:500;color:var(--text-secondary);line-height:1.5}',
      '.ms7c-c{font-size:12.5px;font-weight:500;color:var(--text-secondary)}',
      '.ms7c-mono{display:flex;align-items:center;gap:6px;min-width:0;background:var(--surface-muted);border-radius:10px;padding:4px 4px 4px 12px;font-family:var(--font-mono);font-size:12.5px;font-weight:500;color:var(--text-primary)}',
      '.ms7c-mono>span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.ms7c-act{opacity:.45;transition:opacity var(--dur-fast)}.ms7c-row:hover .ms7c-act,tr:hover .ms7c-act{opacity:1}@media (hover:none){.ms7c-act{opacity:1}}',
      '.ms7c-prod{display:flex;flex-direction:column;gap:6px;padding:18px;transition:box-shadow var(--dur-base),transform var(--dur-base) var(--ease-standard)}',
      '.ms7c-prod.is-on{box-shadow:var(--shadow-card),0 0 0 1.5px var(--ms7-green-900)}',
      '.ms7c-price{font-size:22px;font-weight:600;letter-spacing:-.03em;line-height:1.1;color:var(--text-brand);margin-top:4px}',
      '.ms7c-stepn{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;border:1.5px solid var(--line-strong);color:var(--text-secondary);background:var(--surface-card);flex-shrink:0;transition:all var(--dur-base) var(--ease-standard)}',
      '.ms7c-stepn.is-done{background:var(--ms7-green-900);border-color:var(--ms7-green-900);color:var(--text-inverse)}',
      '.ms7c-swatch{width:32px;height:32px;border-radius:50%;cursor:pointer;border:0;padding:0;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 1px color-mix(in oklab,var(--text-primary) 18%,transparent);transition:transform var(--dur-base) var(--ease-spring),box-shadow var(--dur-fast)}.ms7c-swatch:hover{transform:scale(1.08)}',
      '.ms7c-swatch[aria-pressed="true"]{box-shadow:0 0 0 2px var(--surface-page),0 0 0 4px var(--text-brand)}',
      '.ms7c-plan{display:flex;align-items:center;gap:14px;padding:16px 18px;cursor:pointer}.ms7c-plan.is-on{box-shadow:var(--shadow-card),0 0 0 1.5px var(--ms7-green-900)}',
      '.ms7-card.ms7c-plancard{box-shadow:var(--shadow-card),0 0 0 1.5px color-mix(in oklab,var(--ms7-green-900) 55%,transparent)}',
      '.ms7c-plancard .ms7-bar{height:8px;border-radius:8px}.ms7c-plancard .ms7-bar>i{background:var(--ms7-green-900);border-radius:8px}',
      '.ms7c-sw{display:flex;align-items:center;padding:10px 12px;border:1px solid var(--border-subtle);border-radius:10px;transition:border-color var(--dur-fast)}.ms7c-sw:hover{border-color:var(--line-strong)}.ms7c-sw .ms7-switch{width:100%}',
      '.ms7c-tabs{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}',
      '.ms7c-tabwrap{max-width:100%;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}.ms7c-tabwrap::-webkit-scrollbar{display:none}.ms7c-tabwrap>.ms7-tabs{min-width:max-content}',
      '.ms7c-step{display:flex;gap:14px;align-items:flex-start;padding:16px 0}.ms7c-step-r{display:flex;align-items:center;gap:8px;flex-shrink:0;min-height:28px}',
      '@media (max-width:760px){.ms7c-row{flex-wrap:wrap;gap:12px}.ms7c-row>.ms7c-grow{flex:1 1 100%}.ms7c-tabs>*{flex:1 1 100%}.ms7c-tabs .ms7-btn{width:100%}.ms7c-srv{grid-template-columns:1fr!important;padding-left:0!important}.ms7c-srv .ms7-btn{width:100%}.ms7c-step{flex-wrap:wrap}.ms7c-step-r{flex:1 1 100%;padding-left:42px;flex-wrap:wrap}}',
    ].join('');
    document.head.appendChild(s);
  })();
  /* sem viúva: cola as três últimas palavras de uma frase fixa (espaço → nbsp) */
  const NBSP = String.fromCharCode(160);
  function nb(s) {
    return String(s).replace(/ (\S+) (\S+)$/, NBSP + '$1' + NBSP + '$2');
  }
  function Sub(p) {
    return (
      <span className="ms7-balance" style={{ display: 'block' }}>
        {nb(p.children)}
      </span>
    );
  }
  /* título de card com emoji (1 por card, sempre antes do texto) */
  function Tt(emo, text) {
    return (
      <React.Fragment>
        <span className="ms7-emo" aria-hidden="true" style={{ marginRight: 8 }}>
          {emo}
        </span>
        {text}
      </React.Fragment>
    );
  }
  function AlunosScreen() {
    const { Card, Tabs, BarChart, DataTable, Switch, IconButton, Button, Modal, Input, Avatar } = DS;
    const [tab, setTab] = React.useState('visao');
    const [rows, setRows] = usePersist('alunos', DB.get()._demo ? MS7.alunos : []);
    const [edit, setEdit] = React.useState(null);
    const [form, setForm] = React.useState({ nome: '', email: '' });
    const rank = rows.slice().sort(function (a, b) {
      return b.resultado - a.resultado;
    });
    function openNew() {
      setForm({ nome: '', email: '' });
      setEdit('new');
    }
    function save() {
      if (edit === 'new')
        setRows(
          rows.concat([
            { id: 'a' + Date.now(), nome: form.nome || 'Novo aluno', email: form.email, ativo: true, criado: '22/09/2026', resultado: 0, contas: 0 },
          ]),
        );
      else
        setRows(
          rows.map(function (r) {
            return r.id === edit ? Object.assign({}, r, form) : r;
          }),
        );
      setEdit(null);
      toast('Aluno salvo');
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="ms7c-tabs">
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { id: 'visao', label: 'Visão geral', icon: 'layout-dashboard' },
              { id: 'gestao', label: 'Gestão de alunos', icon: 'users' },
            ]}
            style={{ width: 380, maxWidth: '100%' }}
          />
          <Button variant="brand" iconLeft="user-plus" onClick={openNew}>
            Novo aluno
          </Button>
        </div>
        {tab === 'visao' ? (
          <React.Fragment>
            <KpiRow
              items={[
                {
                  icon: 'users',
                  label: 'Total depositantes',
                  value: MS7.num(
                    rows.reduce(function (a, r) {
                      return a + r.contas * 9;
                    }, 0),
                  ),
                  tone: 'blue',
                },
                {
                  icon: 'trending-up',
                  label: 'Resultado acumulado',
                  value: MS7.brlK(
                    rows.reduce(function (a, r) {
                      return a + r.resultado;
                    }, 0),
                  ),
                  tone: 'green',
                },
                {
                  icon: 'trophy',
                  label: 'Top do ranking',
                  value: rank[0] ? rank[0].nome.split(' ')[0] : '—',
                  tone: 'orange',
                  trend: rank[0] ? MS7.brl(rank[0].resultado) : null,
                },
              ]}
            />
            <Grid min={320}>
              <Card title={Tt('🎓', 'Top 10 alunos por resultado')} subtitle={nb('Resultado acumulado, em mil reais')} reveal>
                {rank.length ? (
                  <BarChart
                    height={240}
                    data={rank.slice(0, 10).map(function (r) {
                      return { label: String(r.nome || '').split(' ')[0], values: [Math.round(r.resultado / 100) / 10] };
                    })}
                    series={[{ name: 'Resultado (mil R$)', color: 'var(--chart-1)' }]}
                  />
                ) : (
                  <Empty art="Chart" emoji={false} title="Sem resultados ainda" sub={<Sub>Quando os alunos fecharem ciclos, o top 10 aparece aqui.</Sub>} />
                )}
              </Card>
              <Card title="Ranking resumido" subtitle={nb('Do maior para o menor resultado')} reveal>
                {rank.length ? (
                  <RankList rows={rank} valueKey="resultado" />
                ) : (
                  <Empty
                    art="People"
                    compact
                    title="Nenhum aluno no ranking"
                    sub={<Sub>Cadastre o primeiro aluno para começar a acompanhar os resultados.</Sub>}
                  />
                )}
              </Card>
            </Grid>
          </React.Fragment>
        ) : (
          <Card title={Tt('🎓', 'Gestão de alunos')} subtitle={rows.length + (rows.length === 1 ? ' aluno cadastrado' : ' alunos cadastrados')} reveal>
            {rows.length ? (
              <DataTable
                style={{ margin: '0 -14px -10px' }}
                rows={rows}
                columns={[
                  {
                    key: 'nome',
                    label: 'Nome',
                    render: function (r) {
                      return (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar name={r.nome} size={32} />
                          <span className="ms7c-t">{r.nome}</span>
                        </div>
                      );
                    },
                  },
                  {
                    key: 'email',
                    label: 'Email',
                    render: function (r) {
                      return <span style={{ color: 'var(--text-secondary)' }}>{r.email}</span>;
                    },
                  },
                  {
                    key: 'ativo',
                    label: 'Ativo',
                    align: 'center',
                    render: function (r) {
                      return (
                        <Switch
                          checked={r.ativo}
                          onChange={function (v) {
                            setRows(
                              rows.map(function (x) {
                                return x.id === r.id ? Object.assign({}, x, { ativo: v }) : x;
                              }),
                            );
                          }}
                        />
                      );
                    },
                  },
                  {
                    key: 'contas',
                    label: 'Contas',
                    align: 'center',
                    render: function (r) {
                      return <span className="ms7-num">{r.contas}</span>;
                    },
                  },
                  {
                    key: 'criado',
                    label: 'Criado em',
                    render: function (r) {
                      return (
                        <span className="ms7-num" style={{ color: 'var(--text-secondary)' }}>
                          {r.criado}
                        </span>
                      );
                    },
                  },
                  {
                    key: 'a',
                    label: '',
                    align: 'right',
                    render: function (r) {
                      return (
                        <div className="ms7c-act" style={{ display: 'inline-flex', gap: 2 }}>
                          <IconButton
                            icon="pencil"
                            size={32}
                            iconSize={16}
                            label="Editar"
                            onClick={function () {
                              setForm({ nome: r.nome, email: r.email });
                              setEdit(r.id);
                            }}
                          />
                          <IconButton
                            icon="trash-2"
                            size={32}
                            iconSize={16}
                            label="Excluir"
                            onClick={function () {
                              setRows(
                                rows.filter(function (x) {
                                  return x.id !== r.id;
                                }),
                              );
                            }}
                          />
                        </div>
                      );
                    },
                  },
                ]}
              />
            ) : (
              <Empty
                art="People"
                emoji={false}
                title="Nenhum aluno cadastrado"
                sub={<Sub>Cadastre seus alunos para acompanhar contas, resultado e ranking num lugar só.</Sub>}
                action={
                  <Button variant="brand" size="sm" iconLeft="user-plus" onClick={openNew}>
                    Novo aluno
                  </Button>
                }
              />
            )}
          </Card>
        )}
        <Modal
          open={!!edit}
          onClose={function () {
            setEdit(null);
          }}
          title={edit === 'new' ? 'Novo aluno' : 'Editar aluno'}
          footer={
            <React.Fragment>
              <Button
                variant="outline"
                onClick={function () {
                  setEdit(null);
                }}
              >
                Cancelar
              </Button>
              <Button variant="brand" iconLeft="check" onClick={save}>
                Salvar
              </Button>
            </React.Fragment>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input
              label="Nome"
              required
              icon="user"
              value={form.nome}
              onChange={function (e) {
                setForm(Object.assign({}, form, { nome: e.target.value }));
              }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
              <Input
                label="Email (login)"
                icon="mail"
                value={form.email}
                onChange={function (e) {
                  setForm(Object.assign({}, form, { email: e.target.value }));
                }}
              />
              <Input label="Senha" required type="password" icon="lock" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  function LojaCompra() {
    const { Card, Button, Input, Badge } = DS;
    const on = DB.Sync.on();
    const [prod, setProd] = React.useState(
      on
        ? null
        : MS7.proxyProdutos.map(function (p) {
            return Object.assign({ ativo: true }, p);
          }),
    );
    const [q, setQ] = React.useState({});
    const [cup, setCup] = React.useState('');
    const [calc, setCalc] = React.useState(null);
    const [pay, setPay] = React.useState(false);
    const [peds, setPeds] = React.useState([]);
    function loadP() {
      if (!on) return;
      DB.Sync.api('/api/pix?tipo=loja')
        .then(setPeds)
        .catch(function () {});
    }
    React.useEffect(function () {
      if (on) {
        DB.Sync.api('/api/loja')
          .then(function (r) {
            setProd(r.produtos || []);
          })
          .catch(function () {
            setProd([]);
          });
        loadP();
      }
    }, []);
    const itens = Object.keys(q)
      .filter(function (k) {
        return q[k] > 0;
      })
      .map(function (k) {
        return { id: k, qtd: q[k] };
      });
    const local = (function () {
      if (!prod) return null;
      let t = 0;
      itens.forEach(function (it) {
        const p = prod.find(function (x) {
          return x.id === it.id;
        });
        if (p) t += p.preco * it.qtd;
      });
      return { total: t, desconto: 0, valor: t, cupom: null };
    })();
    React.useEffect(
      function () {
        if (!on || !itens.length) {
          setCalc(null);
          return;
        }
        const h = setTimeout(function () {
          DB.Sync.api('/api/loja/preco', { method: 'POST', body: JSON.stringify({ itens: itens, cupom: cup }) })
            .then(setCalc)
            .catch(function () {});
        }, 300);
        return function () {
          clearTimeout(h);
        };
      },
      [JSON.stringify(q), cup],
    );
    const C = calc || local || { total: 0, desconto: 0, valor: 0 };
    const step = function (id, d) {
      setQ(function (o) {
        const n = Object.assign({}, o);
        n[id] = Math.max(0, Math.min(999, (n[id] || 0) + d));
        return n;
      });
    };
    const totalQtd = itens.reduce(function (a, it) {
      return a + it.qtd;
    }, 0);
    return (
      <React.Fragment>
        <Card title={Tt('🛒', 'Comprar')} subtitle={nb('Escolha a quantidade de cada produto e pague por PIX')} reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {!prod ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
                {[0, 1, 2].map(function (i) {
                  return <div key={i} className="ms7-skeleton" style={{ height: 150, borderRadius: 'var(--radius-lg)' }} />;
                })}
              </div>
            ) : prod.length ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
                {prod.map(function (p) {
                  const n = q[p.id] || 0;
                  return (
                    <div key={p.id} className={'ms7-card ms7-hover-card ms7c-prod' + (n ? ' is-on' : '')}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{p.nome}</span>
                        {n ? (
                          <Badge size="sm" tone="green" variant="soft">
                            {n + (n === 1 ? ' item' : ' itens')}
                          </Badge>
                        ) : null}
                      </div>
                      <span className="ms7c-c" style={{ lineHeight: 1.45 }}>
                        {p.desc}
                      </span>
                      <span className="ms7-num ms7c-price">{MS7.brl(p.preco)}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto', paddingTop: 8 }}>
                        <DS.IconButton
                          icon="minus"
                          variant="outline"
                          size={28}
                          iconSize={14}
                          label="Menos"
                          disabled={!n}
                          style={{ opacity: n ? 1 : 0.45 }}
                          onClick={function () {
                            step(p.id, -1);
                          }}
                        />
                        <span className="ms7-num" style={{ minWidth: 28, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>
                          {n}
                        </span>
                        <DS.IconButton
                          icon="plus"
                          variant="outline"
                          size={28}
                          iconSize={14}
                          label="Mais"
                          onClick={function () {
                            step(p.id, 1);
                          }}
                        />
                        {n ? (
                          <span className="ms7-num" style={{ marginLeft: 'auto', fontSize: 13.5, fontWeight: 600, color: 'var(--ms7-green)' }}>
                            {MS7.brl(p.preco * n)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Empty
                art="Globe"
                emoji={false}
                compact
                title="Nenhum produto à venda agora"
                sub={<Sub>Quando houver proxies disponíveis para compra, elas aparecem aqui.</Sub>}
              />
            )}
            <div
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: 18,
              }}
            >
              <div style={{ flex: '1 1 200px', maxWidth: 280 }}>
                <Input
                  label="Cupom"
                  icon="ticket"
                  placeholder="Digite o cupom"
                  value={cup}
                  onChange={function (e) {
                    setCup(e.target.value.toUpperCase());
                  }}
                  hint={cup && calc ? (calc.cupom ? 'Cupom ' + calc.cupom + ' aplicado' : 'Cupom inválido ou vencido') : null}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, minWidth: 160 }}>
                <span className="ms7-eyebrow">{totalQtd ? 'Total · ' + totalQtd + (totalQtd === 1 ? ' item' : ' itens') : 'Total'}</span>
                {C.desconto ? <span className="ms7c-c ms7-num">{'Subtotal ' + MS7.brl(C.total) + ' · desconto −' + MS7.brl(C.desconto)}</span> : null}
                <span className="ms7-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  {MS7.brl(C.valor)}
                </span>
              </div>
              <Button
                variant="brand"
                iconLeft="qr-code"
                disabled={!itens.length || !(C.valor > 0)}
                onClick={function () {
                  setPay(true);
                }}
              >
                Pagar com PIX
              </Button>
            </div>
          </div>
        </Card>
        {on && peds.length ? (
          <Card title={Tt('🧾', 'Meus pedidos')} subtitle={nb('Compras feitas por PIX e o status da entrega')} reveal>
            <div className="ms7c-list">
              {peds.map(function (p) {
                const ok = p.status === 'approved';
                const tone = ok ? (p.entregue ? 'green' : 'blue') : 'yellow';
                const col = ok ? (p.entregue ? 'var(--ms7-green)' : 'var(--ms7-blue)') : 'var(--ms7-yellow)';
                return (
                  <div key={p.id} className="ms7c-row">
                    <span className="ms7c-tile" style={{ background: 'color-mix(in oklab, ' + col + ' 12%, var(--surface-card))', color: col }}>
                      <DS.Icon name={ok ? (p.entregue ? 'package-check' : 'truck') : 'clock'} size={17} strokeWidth={2} />
                    </span>
                    <div className="ms7c-grow" style={{ flex: '1 1 220px', minWidth: 0 }}>
                      <div className="ms7c-t">
                        {(p.itens || [])
                          .map(function (x) {
                            return x.qtd + 'x ' + x.nome;
                          })
                          .join(', ')}
                      </div>
                      <div className="ms7c-c" style={{ marginTop: 2 }}>
                        {new Date(p.criado).toLocaleString('pt-BR') + (p.cupom ? ' · cupom ' + p.cupom : '')}
                      </div>
                    </div>
                    <Badge size="sm" variant="soft" tone={tone}>
                      {ok ? (p.entregue ? 'Entregue' : 'Pago · em entrega') : 'Aguardando pagamento'}
                    </Badge>
                    <span className="ms7-num" style={{ fontSize: 14, fontWeight: 600 }}>
                      {MS7.brl(p.valor)}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : null}
        {pay ? (
          <window.PixCheckout
            open={true}
            onClose={function () {
              setPay(false);
              loadP();
            }}
            titulo="Pagamento via PIX"
            subtitulo={itens
              .map(function (it) {
                const p = (prod || []).find(function (x) {
                  return x.id === it.id;
                });
                return it.qtd + 'x ' + (p ? p.nome : it.id);
              })
              .join(', ')}
            valor={C.valor}
            body={{ tipo: 'loja', itens: itens, cupom: cup }}
            onOk={function () {
              toast('Pagamento confirmado. Seu pedido foi registrado.');
              setQ({});
              setCup('');
              loadP();
            }}
          />
        ) : null}
      </React.Fragment>
    );
  }
  function ProxiesScreen() {
    const { Card, Badge, Button, IconButton } = DS;
    const [list, setList] = usePersist('proxies', DB.get()._demo ? MS7.proxies : []);
    function renew(id) {
      setList(
        list.map(function (p) {
          return p.id === id ? Object.assign({}, p, { status: 'Ativa', expira: '22/10/2026', uso: 0 }) : p;
        }),
      );
      toast('Proxy renovada por 30 dias');
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <KpiRow
          items={[
            {
              icon: 'globe',
              label: 'Proxies ativas',
              value: list.filter(function (p) {
                return p.status === 'Ativa';
              }).length,
              tone: 'green',
            },
            {
              icon: 'clock',
              label: 'Expirando em 7 dias',
              value: list.filter(function (p) {
                return p.status === 'Expirando';
              }).length,
              tone: 'yellow',
            },
            {
              icon: 'circle-alert',
              label: 'Expiradas',
              value: list.filter(function (p) {
                return p.status === 'Expirada';
              }).length,
              tone: 'orange',
            },
          ]}
        />
        <Card title={Tt('🌐', 'Minhas proxies')} subtitle={nb('Endereço de conexão, tráfego usado e vencimento')} reveal>
          {list.length ? (
            <div className="ms7c-list">
              {list.map(function (p) {
                const conn = p.host + ':' + p.port + ':' + p.login;
                const tone = p.status === 'Ativa' ? 'green' : MS7.statusTone[p.status];
                const col = p.status === 'Ativa' ? 'var(--ms7-green)' : p.status === 'Expirando' ? 'var(--ms7-yellow)' : 'var(--ms7-error)';
                return (
                  <div key={p.id} className="ms7c-row" style={{ gap: 16 }}>
                    <span className="ms7c-tile" style={{ background: 'color-mix(in oklab, ' + col + ' 12%, var(--surface-card))', color: col }}>
                      <DS.Icon name="globe" size={17} strokeWidth={2} />
                    </span>
                    <div style={{ flex: '1 1 180px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span className="ms7c-t">{p.label}</span>
                        <Badge size="sm" variant="soft" tone={tone}>
                          {p.status}
                        </Badge>
                      </div>
                      <div className="ms7c-c" style={{ marginTop: 2 }}>
                        {'Expira em ' + p.expira}
                      </div>
                    </div>
                    <div className="ms7c-mono ms7c-grow" style={{ flex: '1 1 260px' }}>
                      <span>{conn}</span>
                      <IconButton
                        icon="copy"
                        size={28}
                        iconSize={14}
                        label="Copiar conexão"
                        onClick={function () {
                          toast('Conexão copiada');
                        }}
                      />
                    </div>
                    <div style={{ width: 140, flexShrink: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                        <span className="ms7-eyebrow">Tráfego</span>
                        <span className="ms7-num" style={{ fontSize: 12.5, fontWeight: 600, color: p.uso > 85 ? 'var(--ms7-orange)' : 'var(--text-primary)' }}>
                          {p.uso + '%'}
                        </span>
                      </div>
                      <div className="ms7-bar">
                        <i style={{ width: p.uso + '%', background: p.uso > 85 ? 'var(--ms7-orange)' : 'var(--ms7-green)' }} />
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={p.status === 'Ativa' ? 'outline' : 'brand'}
                      iconLeft="refresh-cw"
                      onClick={function () {
                        renew(p.id);
                      }}
                    >
                      Renovar
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <Empty
              art="Globe"
              emoji={false}
              title="Nenhuma proxy ainda"
              sub={<Sub>Compre uma proxy abaixo e ela aparece aqui com o endereço de conexão pronto para copiar.</Sub>}
            />
          )}
        </Card>
        <LojaCompra />
      </div>
    );
  }
  function AssinaturaScreen({ role }) {
    const { Card, Tabs, Button, Badge, DataTable, Modal } = DS;
    const [tab, setTab] = React.useState('minha');
    const [plan, setPlan] = React.useState('pro');
    const [chg, setChg] = React.useState(false);
    const [q, setQ] = React.useState('Todos');
    const [asg, setAsg] = React.useState(null);
    const [pg, setPg] = React.useState(false);
    function loadA() {
      if (DB.Sync.on())
        DB.Sync.api('/api/assinatura')
          .then(function (r) {
            setAsg(r);
            if (r && r.assinatura && r.assinatura.plano) setPlan(r.assinatura.plano);
          })
          .catch(function () {});
    }
    React.useEffect(loadA, []);
    const P =
      MS7.planos.find(function (p) {
        return p.id === plan;
      }) || MS7.planos[0];
    const used = (DB.get().operadores || []).filter(function (o) {
      return o.ativo !== false;
    }).length;
    const T = MS7.tenants;
    const venc = asg && asg.assinatura && asg.assinatura.venc ? new Date(asg.assinatura.venc) : null;
    const tenants = T.filter(function (t) {
      return q === 'Todos' || t.status === q;
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {role === 'super' ? (
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { id: 'minha', label: 'Minha assinatura' },
              { id: 'todas', label: 'Todas as assinaturas' },
            ]}
            style={{ maxWidth: 440 }}
          />
        ) : null}
        {tab === 'minha' || role !== 'super' ? (
          <React.Fragment>
            {(function () {
              const ren = venc ? new Date(venc) : new Date();
              ren.setHours(0, 0, 0, 0);
              if (!venc) ren.setDate(ren.getDate() + 18);
              const dias = Math.max(0, Math.round((ren - new Date().setHours(0, 0, 0, 0)) / 864e5));
              const urg = dias <= 5;
              const col = urg ? 'var(--ms7-orange)' : 'var(--ms7-green-900)';
              return (
                <Card padding="16px 20px" style={urg ? { boxShadow: '0 0 0 1px color-mix(in oklab, var(--ms7-orange) 45%, var(--line))' } : null}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <span className="ms7c-tile is-lg" style={{ background: 'color-mix(in oklab, ' + col + ' 12%, var(--surface-card))', color: col }}>
                      <DS.Icon name="calendar-clock" size={20} strokeWidth={2} />
                    </span>
                    <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                        {dias === 0 ? 'Sua assinatura vence hoje' : 'Faltam ' + dias + (dias === 1 ? ' dia' : ' dias') + ' para renovar'}
                      </div>
                      <div className="ms7c-c" style={{ marginTop: 2 }}>
                        {nb('Plano ' + P.nome + ' · renova em ' + ren.toLocaleDateString('pt-BR') + ' · ' + MS7.brl(P.preco))}
                      </div>
                    </div>
                    <Button
                      variant="brand"
                      iconLeft="qr-code"
                      onClick={function () {
                        setPg(true);
                      }}
                    >
                      {'Renovar · ' + MS7.brl(P.preco)}
                    </Button>
                  </div>
                </Card>
              );
            })()}
            <KpiRow
              items={[
                { icon: 'users', label: 'Operadores ativos', value: used + ' / ' + P.seats, tone: 'blue' },
                {
                  icon: 'calendar-days',
                  label: 'Próxima renovação',
                  value: (function () {
                    const d = venc ? new Date(venc) : new Date();
                    if (!venc) d.setDate(d.getDate() + 18);
                    return d.toLocaleDateString('pt-BR');
                  })(),
                  tone: 'yellow',
                },
                { icon: 'credit-card', label: 'Valor mensal', value: MS7.brl(P.preco), tone: 'green' },
                { icon: 'receipt-text', label: 'Cobrança projetada', value: MS7.brl(P.preco), tone: 'orange' },
              ]}
            />
            <Card
              reveal
              padding={28}
              className="ms7c-plancard"
              title={Tt('💳', 'Plano atual')}
              action={
                <Button
                  variant="outline"
                  iconLeft="arrow-up-down"
                  onClick={function () {
                    setChg(true);
                  }}
                >
                  Mudar de plano
                </Button>
              }
            >
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px 32px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                  <div className="ms7-num" style={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-brand)' }}>
                    {P.nome}
                  </div>
                  <div className="ms7c-s" style={{ marginTop: 6 }}>
                    {nb(P.seats + ' seats de operador · renovação mensal')}
                  </div>
                </div>
                <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <span className="ms7c-c" style={{ fontWeight: 600 }}>{'Uso de seats — ' + P.nome}</span>
                    <span className="ms7-num" style={{ fontSize: 14, fontWeight: 600 }}>
                      {used + '/' + P.seats}
                    </span>
                  </div>
                  <div className="ms7-bar">
                    <i style={{ width: Math.min(100, (used / P.seats) * 100) + '%' }} />
                  </div>
                </div>
              </div>
            </Card>
            <Card title="Pague seu plano via PIX" subtitle={nb('Copia e cola ou QR Code, com confirmação automática')} reveal>
              <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
                <span
                  className="ms7c-tile is-lg"
                  style={{ background: 'color-mix(in oklab, var(--ms7-green-900) 12%, var(--surface-card))', color: 'var(--ms7-green-900)' }}
                >
                  <DS.Icon name="qr-code" size={22} strokeWidth={2} />
                </span>
                <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                  <span className="ms7c-t" style={{ fontSize: 15 }}>
                    {'Plano ' + P.nome + ' · ' + MS7.brl(P.preco) + ' por 30 dias'}
                  </span>
                  <span className="ms7c-s ms7-balance" style={{ display: 'block', maxWidth: 560 }}>
                    {nb('Gere o PIX, pague com o copia e cola ou o QR Code. A' + NBSP + 'confirmação é automática e os 30 dias somam no vencimento.')}
                  </span>
                </div>
                <Button
                  variant="outline"
                  iconLeft="qr-code"
                  onClick={function () {
                    setPg(true);
                  }}
                >
                  Gerar PIX
                </Button>
              </div>
            </Card>
            {pg ? (
              <window.PixCheckout
                open={true}
                onClose={function () {
                  setPg(false);
                  loadA();
                }}
                titulo={'Plano ' + P.nome}
                subtitulo={'30 dias · ' + MS7.brl(P.preco)}
                valor={P.preco}
                body={{ tipo: 'assinatura', plano: P.id }}
                onOk={function () {
                  toast('Assinatura renovada por 30 dias');
                  loadA();
                }}
              />
            ) : null}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <KpiRow
              items={[
                { icon: 'layers', label: 'Total', value: T.length, tone: 'blue' },
                {
                  icon: 'circle-check',
                  label: 'Ativas',
                  value: T.filter(function (t) {
                    return t.status === 'Ativa';
                  }).length,
                  tone: 'green',
                },
                {
                  icon: 'clock',
                  label: 'Em atraso',
                  value: T.filter(function (t) {
                    return t.status === 'Em atraso';
                  }).length,
                  tone: 'yellow',
                },
                {
                  icon: 'circle-x',
                  label: 'Canceladas',
                  value: T.filter(function (t) {
                    return t.status === 'Cancelada';
                  }).length,
                  tone: 'orange',
                },
              ]}
            />
            <Card
              title={Tt('💳', 'Assinaturas')}
              subtitle={tenants.length + (tenants.length === 1 ? ' tenant' : ' tenants')}
              reveal
              action={
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <DS.Select
                    variant="pill"
                    value={q}
                    onChange={function (e) {
                      setQ(e.target.value);
                    }}
                    options={['Todos', 'Ativa', 'Em atraso', 'Cancelada', 'Suspensa', 'Cortesia']}
                  />
                  <Button
                    size="sm"
                    variant="brand"
                    iconLeft="plus"
                    onClick={function () {
                      toast('Tenant criado');
                    }}
                  >
                    Novo tenant
                  </Button>
                </div>
              }
            >
              {tenants.length ? (
                <DataTable
                  style={{ margin: '0 -14px -10px' }}
                  rows={tenants}
                  columns={[
                    {
                      key: 'tenant',
                      label: 'Tenant',
                      render: function (r) {
                        return (
                          <div>
                            <div className="ms7c-t">{r.tenant}</div>
                            <div className="ms7c-c">{r.owner}</div>
                          </div>
                        );
                      },
                    },
                    {
                      key: 'status',
                      label: 'Status',
                      render: function (r) {
                        return (
                          <Badge size="sm" variant="soft" tone={MS7.statusTone[r.status]}>
                            {r.status}
                          </Badge>
                        );
                      },
                    },
                    { key: 'plano', label: 'Plano' },
                    {
                      key: 'uso',
                      label: 'Uso',
                      align: 'right',
                      render: function (r) {
                        return <span className="ms7-num">{r.uso}</span>;
                      },
                    },
                    {
                      key: 'cobranca',
                      label: 'Cobrança',
                      align: 'right',
                      render: function (r) {
                        return <span className="ms7-num">{r.cobranca}</span>;
                      },
                    },
                    {
                      key: 'proximo',
                      label: 'Próx. cobrança',
                      align: 'right',
                      render: function (r) {
                        return <span className="ms7-num">{r.proximo}</span>;
                      },
                    },
                    {
                      key: 'a',
                      label: '',
                      align: 'right',
                      render: function (r) {
                        return <DS.IconButton className="ms7c-act" icon="ellipsis" size={32} iconSize={16} label="Mais ações" />;
                      },
                    },
                  ]}
                />
              ) : (
                <Empty art="Search" emoji={false} compact title="Nenhuma assinatura com esse status" sub={<Sub>Troque o filtro para ver as outras assinaturas.</Sub>} />
              )}
            </Card>
          </React.Fragment>
        )}
        <Modal
          open={chg}
          onClose={function () {
            setChg(false);
          }}
          title="Mudar de plano"
        >
          <div className="ms7-stagger" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MS7.planos.map(function (p) {
              const on = p.id === plan;
              return (
                <div
                  key={p.id}
                  className={'ms7-card ms7-hover-card ms7c-plan' + (on ? ' is-on' : '')}
                  onClick={function () {
                    setPlan(p.id);
                    setChg(false);
                    toast('Plano alterado para ' + p.nome);
                  }}
                >
                  <span
                    className="ms7c-tile"
                    style={{
                      background: on ? 'var(--ms7-lime-500)' : 'var(--surface-muted)',
                      color: on ? 'var(--text-on-lime)' : 'var(--text-secondary)',
                    }}
                  >
                    <DS.Icon name={on ? 'check' : 'layers'} size={16} strokeWidth={2.2} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{p.nome}</span>
                      {on ? (
                        <Badge size="sm" variant="soft" tone="green">
                          Atual
                        </Badge>
                      ) : null}
                    </div>
                    <div className="ms7c-c" style={{ marginTop: 2 }}>
                      {p.seats + ' seats'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="ms7-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>
                      {MS7.brl(p.preco)}
                    </span>
                    <div className="ms7c-c">por mês</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      </div>
    );
  }
  function AppNotifCard() {
    const { Card, Button, Badge, Switch } = DS;
    const P = window.ms7Push || {};
    const [perm, setPerm] = React.useState(P.permission ? P.permission() : 'unsupported');
    const [inst, setInst] = React.useState(!!P.installEvt);
    const [dev, setDev] = React.useState(getPrefs().__device !== false);
    const [srv, setSrv] = React.useState(P.server ? P.server() : '');
    const [key, setKey] = React.useState(P.apiKey ? P.apiKey() : '');
    const [remote, setRemote] = React.useState(P.isRemote ? P.isRemote() : false);
    const [busy, setBusy] = React.useState(false);
    function ativar() {
      localStorage.setItem('ms7-push-server', srv.replace(/\/$/, ''));
      localStorage.setItem('ms7-push-key', key);
      setBusy(true);
      (perm === 'granted' ? Promise.resolve('granted') : P.ask())
        .then(function (p) {
          setPerm(p);
          if (p !== 'granted') throw new Error('Permissão negada');
          return P.subscribe(localStorage.getItem('ms7op-role') || 'admin');
        })
        .then(function () {
          setRemote(true);
          toast('Celular conectado ao servidor');
        })
        .catch(function (e) {
          toast('Não foi possível ativar: ' + e.message);
        })
        .then(function () {
          setBusy(false);
        });
    }
    React.useEffect(function () {
      function f() {
        setInst(true);
      }
      window.addEventListener('ms7-installable', f);
      return function () {
        window.removeEventListener('ms7-installable', f);
      };
    }, []);
    const standalone = P.standalone && P.standalone();
    const ios = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const permBadge = {
      granted: ['green', 'Ativadas'],
      denied: ['error', 'Bloqueadas'],
      default: ['yellow', 'Não ativadas'],
      unsupported: ['gray', 'Não suportado'],
    }[perm];
    function step(n, title, body, right, done) {
      return (
        <div className="ms7c-step" style={{ borderTop: n > 1 ? '1px solid var(--border-subtle)' : 'none' }}>
          <span className={'ms7c-stepn' + (done ? ' is-done' : '')}>{done ? <DS.Icon name="check" size={13} strokeWidth={3} /> : n}</span>
          <div style={{ flex: '1 1 200px', minWidth: 0 }}>
            <div className="ms7c-t">{title}</div>
            <div className="ms7c-s" style={{ marginTop: 3 }}>
              {typeof body === 'string' ? nb(body) : body}
            </div>
          </div>
          <div className="ms7c-step-r">{right}</div>
        </div>
      );
    }
    return (
      <Card title={Tt('🔔', 'Instalar como app e receber notificações')} subtitle={nb('Quatro passos, uma vez só por aparelho')} reveal>
        <Hint>
          {nb(
            'Instale o painel no celular ou no computador. Ele abre como um app e mostra as notificações do sistema: início de meta, conta bloqueada e ciclo fechado com lucro ou prejuízo.',
          )}
        </Hint>
        {step(
          1,
          'Instalar o app',
          standalone
            ? 'O painel já está aberto como app.'
            : ios
              ? 'No iPhone: abra no Safari, toque em Compartilhar e depois em "Adicionar à Tela de Início". Depois abra pelo ícone MS7.'
              : 'No Chrome/Edge: clique no botão ao lado ou no ícone de instalar na barra de endereço. No Android: menu ⋮ → "Instalar app".',
          standalone ? (
            <Badge tone="green" variant="soft" size="sm">
              Instalado
            </Badge>
          ) : (
            <Button
              size="sm"
              variant="outline"
              iconLeft="download"
              disabled={!inst}
              onClick={function () {
                P.install().then(function (ok) {
                  if (ok) toast('App instalado');
                });
              }}
            >
              Instalar
            </Button>
          ),
          !!standalone,
        )}
        {step(
          2,
          'Permitir notificações',
          perm === 'denied'
            ? 'As notificações foram bloqueadas. Libere nas configurações do site (ícone de cadeado na barra de endereço).'
            : 'O celular vai pedir permissão. Toque em "Permitir".',
          <React.Fragment>
            <Badge tone={permBadge[0]} variant="soft" size="sm">
              {permBadge[1]}
            </Badge>
            {perm === 'default' ? (
              <Button
                size="sm"
                iconLeft="bell"
                onClick={function () {
                  P.ask().then(function (p) {
                    setPerm(p);
                    if (p === 'granted') toast('Notificações ativadas');
                  });
                }}
              >
                Ativar
              </Button>
            ) : null}
          </React.Fragment>,
          perm === 'granted',
        )}
        {step(
          3,
          'Conectar ao servidor',
          'Endereço onde o novo dashboard está publicado (https). Todos os celulares conectados recebem o que os operadores fazem, mesmo com o app fechado.',
          <Badge tone={remote ? 'green' : 'gray'} variant="soft" size="sm">
            {remote ? 'Conectado' : 'Desconectado'}
          </Badge>,
          !!remote,
        )}
        <div className="ms7c-srv" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 12, alignItems: 'end', padding: '0 0 16px 42px' }}>
          <DS.Input
            label="Servidor"
            icon="server"
            placeholder="https://painel.seudominio.com"
            value={srv}
            onChange={function (e) {
              setSrv(e.target.value);
            }}
          />
          <Button variant="brand" iconLeft="smartphone" disabled={busy || !srv} onClick={ativar}>
            {busy ? 'Conectando…' : remote ? 'Reconectar' : 'Ativar no celular'}
          </Button>
        </div>
        {step(
          4,
          'Testar',
          remote ? 'Envia uma notificação de ciclo fechado para todos os celulares conectados.' : 'Envia uma notificação de ciclo fechado para este aparelho.',
          <Button
            size="sm"
            variant="outline"
            iconLeft="send"
            disabled={perm !== 'granted'}
            onClick={function () {
              const t = 'Ciclo fechado · Vértice',
                b = 'Depósito R$ 12.400 · Saque R$ 15.980 · LUCRO de R$ 3.580';
              if (!P.remote(t, b, 'teste')) P.show(t, b, 'teste');
              toast('Notificação de teste enviada');
            }}
          >
            Enviar teste
          </Button>,
        )}
        <div
          style={{
            marginTop: 4,
            padding: '16px 0 0',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <span
            className="ms7c-tile"
            style={{ background: 'color-mix(in oklab, var(--ms7-green-900) 12%, var(--surface-card))', color: 'var(--ms7-green-900)' }}
          >
            <DS.Icon name="monitor-smartphone" size={17} strokeWidth={2} />
          </span>
          <div style={{ flex: '1 1 220px', minWidth: 0 }}>
            <div className="ms7c-t">Mostrar notificações neste aparelho</div>
            <div className="ms7c-c" style={{ marginTop: 2 }}>
              {nb('Sem servidor conectado, só este aparelho mostra as notificações. O servidor fica em ui_kits/operacoes/server (veja o README).')}
            </div>
          </div>
          <Switch
            checked={dev}
            onChange={function (v) {
              setDev(v);
              setPref('__device', v);
            }}
          />
        </div>
      </Card>
    );
  }
  function SyncCard({ session }) {
    const { Card, Button, Badge } = DS;
    DB.useDB();
    const S = DB.Sync;
    const [busy, setBusy] = React.useState(false);
    const B = {
      online: ['green', 'Conectado · tempo real'],
      syncing: ['blue', 'Sincronizando…'],
      offline: ['yellow', 'Sem conexão · salvando no aparelho'],
      local: ['gray', 'Só neste aparelho'],
    }[S.status] || ['gray', '—'];
    const u = S.user();
    const real = session && session.real;
    function go(mode) {
      setBusy(true);
      S.connect(mode)
        .then(function () {
          toast(mode === 'upload' ? 'Dados deste aparelho enviados ao servidor' : 'Sincronizado');
        })
        .catch(function (e) {
          toast('Não foi possível sincronizar: ' + e.message);
        })
        .then(function () {
          setBusy(false);
        });
    }
    const dbIcon = (
      <span className="ms7c-tile" style={{ background: 'color-mix(in oklab, var(--ms7-green-900) 12%, var(--surface-card))', color: 'var(--ms7-green-900)' }}>
        <DS.Icon name="database" size={17} strokeWidth={2} />
      </span>
    );
    return (
      <Card
        title="Banco de dados central"
        icon={dbIcon}
        action={
          <Badge tone={B[0]} variant="soft" size="sm">
            {B[1]}
          </Badge>
        }
      >
        {real ? (
          <React.Fragment>
            <Hint>
              {'Conectado como ' +
                (u ? u.email : '') +
                ' em ' +
                S.base() +
                '. ' +
                (session.role === 'operador' ? 'Você vê e edita só as suas cooperações.' : 'Tudo o que os operadores preenchem aparece aqui na hora.')}
            </Hint>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button
                variant="outline"
                iconLeft="refresh-cw"
                disabled={busy}
                onClick={function () {
                  go();
                }}
              >
                Sincronizar agora
              </Button>
              {session.role !== 'operador' ? (
                <Button
                  variant="outline"
                  iconLeft="upload"
                  disabled={busy}
                  onClick={function () {
                    if (confirm('Enviar os dados deste aparelho para o servidor? Os dados se juntam aos que já estão lá.')) go('upload');
                  }}
                >
                  Enviar dados deste aparelho
                </Button>
              ) : null}
              <Button
                variant="ghost"
                iconLeft="log-out"
                style={{ marginLeft: 'auto' }}
                onClick={function () {
                  S.logout();
                }}
              >
                Sair
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <p className="ms7-balance" style={{ margin: 0, fontSize: 13.5, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: 760 }}>
            {nb('Você está no modo demonstração. Para usar o banco central, saia e entre com email e senha na tela de login.')}
          </p>
        )}
      </Card>
    );
  }
  const ROLE_LABEL = { cliente: 'Cliente', super: 'Super Admin', admin: 'Admin', operador: 'Operador' };
  function AcessosCard({ session }) {
    const { Card, Button, Badge, Input, Select, DataTable, Modal, Switch, IconButton } = DS;
    const db = DB.useDB();
    const S = DB.Sync;
    const [list, setList] = React.useState(null);
    const [te, setTe] = React.useState(null);
    const [err, setErr] = React.useState('');
    const [edit, setEdit] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    function load() {
      S.api('/api/users')
        .then(setList)
        .catch(function (e) {
          setErr(e.message);
        });
    }
    React.useEffect(function () {
      if (session.real) load();
    }, []);
    if (!session.real)
      return (
        <Card title={Tt('🔐', 'Acessos')}>
          <Empty
            art="Keys"
            emoji={false}
            title="Modo demonstração"
            sub={<Sub>Entre com email e senha num servidor para criar logins dos operadores. No modo demonstração os acessos não são reais.</Sub>}
          />
        </Card>
      );
    const ops = db.operadores;
    function save() {
      if (
        edit.role === 'operador' &&
        !ops.some(function (o) {
          return o.id === edit.opId;
        })
      ) {
        toast('Escolha o operador vinculado');
        return;
      }
      setBusy(true);
      S.api('/api/users', { method: 'POST', body: JSON.stringify(edit) })
        .then(function () {
          setEdit(null);
          load();
          toast('Acesso salvo');
        })
        .catch(function (e) {
          toast(e.message);
        })
        .then(function () {
          setBusy(false);
        });
    }
    function del(u) {
      if (!confirm('Remover o acesso de ' + u.email + '?')) return;
      S.api('/api/users/' + u.id, { method: 'DELETE' })
        .then(function () {
          load();
          toast('Acesso removido');
        })
        .catch(function (e) {
          toast(e.message);
        });
    }
    const isCliS = session.role === 'cliente';
    const roleOpts = isCliS
      ? [{ value: 'operador', label: 'Operador — acesso limitado' }]
      : (edit && edit.id && edit.role === 'operador' ? [{ value: 'operador', label: 'Operador — acesso limitado' }] : [])
          .concat([
            { value: 'cliente', label: 'Cliente — comprou o painel, dados separados' },
            { value: 'admin', label: 'Admin — acesso total' },
          ])
          .concat(session.role === 'super' ? [{ value: 'super', label: 'Super Admin' }] : []);
    function testEnv() {
      if (
        !confirm(
          'Criar os acessos de teste? Gera um login de Cliente (com painel próprio) e um de Operador desse cliente. Se já existirem, as senhas são trocadas.',
        )
      )
        return;
      setBusy(true);
      S.api('/api/test-env', { method: 'POST', body: '{}' })
        .then(function (j) {
          setTe(j);
          load();
        })
        .catch(function (e) {
          toast(e.message);
        })
        .then(function () {
          setBusy(false);
        });
    }
    const ROLE_COLOR = { 'shield-check': 'var(--ms7-green-900)', user: 'var(--ms7-blue)', briefcase: 'var(--ms7-purple)' };
    return (
      <Card
        title={Tt('🔐', 'Acessos')}
        subtitle={list ? list.length + (list.length === 1 ? ' acesso' : ' acessos') : undefined}
        action={
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {!isCliS ? (
              <Button size="sm" variant="outline" iconLeft="flask-conical" disabled={busy} onClick={testEnv}>
                Criar acessos de teste
              </Button>
            ) : null}
            {isCliS ? null : (
              <Button
                size="sm"
                variant="brand"
                iconLeft="user-plus"
                onClick={function () {
                  setEdit({ email: '', name: '', role: 'cliente', opId: '', password: '', ativo: true });
                }}
              >
                Novo acesso (cliente ou admin)
              </Button>
            )}
          </div>
        }
      >
        <Hint>
          {nb(
            'Cada pessoa entra com o próprio email e senha. Operadores agora são criados só em Gestão → Operadores (nome, email e senha num lugar só); aqui você vê e bloqueia os acessos.',
          )}
        </Hint>
        {isCliS && window.VagasCard ? (
          <div style={{ marginBottom: 16 }}>
            <VagasCard />
          </div>
        ) : null}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12, marginBottom: 22 }}>
          {[
            ['shield-check', 'Admin / Super Admin', 'Vê e altera tudo: todas as cooperações, operadores, custos, pagamentos, configurações e acessos.'],
            [
              'user',
              'Operador',
              'Vê só as próprias cooperações e comissões. Pode preencher contas, iniciar e fechar ciclos. Não vê outros operadores, custos, lucro da operação nem configurações, e não muda a própria comissão.',
            ],
          ]
            .concat(
              isCliS
                ? []
                : [
                    [
                      'briefcase',
                      'Cliente',
                      'Comprou o painel. Tem um painel próprio com dados separados dos seus: dashboard, cooperações, análises, financeiro, listas, avisos e o cadastro de operadores, plataformas e chaves PIX. Não vê ponto, alunos, assinatura nem proxies.',
                    ],
                  ],
            )
            .filter(function (r) {
              return !isCliS || r[1] === 'Operador';
            })
            .map(function (r) {
              const col = ROLE_COLOR[r[0]] || 'var(--ms7-green-900)';
              return (
                <div
                  key={r[1]}
                  style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16, borderRadius: 12, background: 'var(--surface-muted)' }}
                >
                  <span className="ms7c-tile" style={{ background: 'color-mix(in oklab, ' + col + ' 12%, var(--surface-card))', color: col }}>
                    <DS.Icon name={r[0]} size={17} strokeWidth={2} />
                  </span>
                  <div>
                    <div className="ms7c-t">{r[1]}</div>
                    <div className="ms7c-s" style={{ marginTop: 3 }}>
                      {nb(r[2])}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {err ? (
          <Empty art="Keys" emoji={false} compact title="Não deu para carregar os acessos" sub={err} />
        ) : !list ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[0, 1, 2].map(function (i) {
              return <div key={i} className="ms7-skeleton" style={{ height: 48 }} />;
            })}
          </div>
        ) : !list.length ? (
          <Empty
            art="Keys"
            emoji={false}
            compact
            title="Nenhum acesso criado"
            sub={<Sub>Crie o primeiro acesso para que cada pessoa entre com o próprio email e senha.</Sub>}
          />
        ) : (
          <DataTable
            style={{ margin: '0 -14px -10px' }}
            rows={list}
            columns={[
              {
                key: 'name',
                label: 'Nome',
                render: function (r) {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <DS.Avatar name={r.name} size={32} />
                      <div style={{ minWidth: 0 }}>
                        <div className="ms7c-t">{r.name}</div>
                        <div className="ms7c-c">{r.email}</div>
                        {!isCliS && r.tenant && r.tenant !== 'main' && r.role !== 'cliente' ? (
                          <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ms7-purple)', marginTop: 2 }}>
                            {'Painel de ' +
                              ((
                                list.find(function (x) {
                                  return x.id === r.tenant;
                                }) || {}
                              ).name || 'cliente')}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                },
              },
              {
                key: 'role',
                label: 'Papel',
                render: function (r) {
                  return (
                    <Badge size="sm" tone={r.role === 'operador' ? 'blue' : r.role === 'cliente' ? 'purple' : 'green'}>
                      {ROLE_LABEL[r.role]}
                    </Badge>
                  );
                },
              },
              {
                key: 'opId',
                label: 'Operador vinculado',
                render: function (r) {
                  if (r.role !== 'operador') return '—';
                  const d = DB.get();
                  const o = (d.operadores || []).find(function (x) {
                    return x.id === r.opId;
                  });
                  const n = (d.coops || []).filter(function (c) {
                    return c.opId === r.opId && c.status !== 'Lixeira';
                  }).length;
                  const homon = o
                    ? (d.operadores || []).filter(function (x) {
                        return x.nome === o.nome;
                      }).length
                    : 0;
                  return (
                    <div>
                      <div className="ms7c-t" style={{ color: o ? 'inherit' : 'var(--ms7-error)' }}>
                        {o ? o.nome : 'Operador não encontrado'}
                      </div>
                      <div style={{ fontSize: 12.5, fontWeight: 500, color: o && n ? 'var(--text-secondary)' : 'var(--ms7-error)' }}>
                        {!o
                          ? 'Clique no lápis e escolha o operador de novo'
                          : n + (n === 1 ? ' cooperação ligada' : ' cooperações ligadas') + (homon > 1 ? ' · há ' + homon + ' operadores com esse nome' : '')}
                      </div>
                    </div>
                  );
                },
              },
              {
                key: 'ativo',
                label: 'Status',
                align: 'center',
                render: function (r) {
                  return (
                    <Badge size="sm" variant="soft" tone={r.ativo ? 'green' : 'gray'}>
                      {r.ativo ? 'Ativo' : 'Bloqueado'}
                    </Badge>
                  );
                },
              },
              {
                key: 'a',
                label: '',
                align: 'right',
                render: function (r) {
                  return (
                    <div className="ms7c-act" style={{ display: 'inline-flex', gap: 2 }}>
                      <IconButton
                        icon="pencil"
                        size={32}
                        iconSize={16}
                        label="Editar"
                        onClick={function () {
                          setEdit(Object.assign({}, r, { password: '' }));
                        }}
                      />
                      {r.email !== (S.user() || {}).email ? (
                        <IconButton
                          icon="trash-2"
                          size={32}
                          iconSize={16}
                          label="Remover"
                          onClick={function () {
                            del(r);
                          }}
                        />
                      ) : null}
                    </div>
                  );
                },
              },
            ]}
          />
        )}
        <Modal
          open={!!edit}
          onClose={function () {
            setEdit(null);
          }}
          title={edit && edit.id ? 'Editar acesso' : 'Novo acesso'}
          footer={
            <React.Fragment>
              <Button
                variant="outline"
                onClick={function () {
                  setEdit(null);
                }}
              >
                Cancelar
              </Button>
              <Button variant="brand" iconLeft="check" disabled={busy} onClick={save}>
                Salvar
              </Button>
            </React.Fragment>
          }
        >
          {edit ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
                <Input
                  label="Nome"
                  icon="user"
                  value={edit.name}
                  onChange={function (e) {
                    setEdit(Object.assign({}, edit, { name: e.target.value }));
                  }}
                />
                <Input
                  label="Email (login)"
                  required
                  icon="mail"
                  value={edit.email}
                  onChange={function (e) {
                    setEdit(Object.assign({}, edit, { email: e.target.value }));
                  }}
                />
              </div>
              <Select
                label="Papel"
                value={edit.role}
                onChange={function (e) {
                  setEdit(Object.assign({}, edit, { role: e.target.value }));
                }}
                options={roleOpts}
              />
              {edit.role === 'operador' ? (
                <Select
                  label="Operador vinculado"
                  required
                  value={
                    ops.some(function (o) {
                      return o.id === edit.opId;
                    })
                      ? edit.opId
                      : ''
                  }
                  onChange={function (e) {
                    setEdit(Object.assign({}, edit, { opId: e.target.value }));
                  }}
                  options={[{ value: '', label: 'Escolha o operador' }].concat(
                    ops.map(function (o) {
                      return { value: o.id, label: o.nome };
                    }),
                  )}
                  hint="O acesso só enxerga as cooperações deste operador."
                />
              ) : null}
              <Input
                label={edit.id ? 'Nova senha (deixe em branco para manter)' : 'Senha'}
                type="password"
                value={edit.password}
                onChange={function (e) {
                  setEdit(Object.assign({}, edit, { password: e.target.value }));
                }}
                hint="Mínimo de 8 caracteres"
              />
              <Switch
                checked={edit.ativo}
                onChange={function (v) {
                  setEdit(Object.assign({}, edit, { ativo: v }));
                }}
                label="Acesso ativo"
              />
            </div>
          ) : null}
        </Modal>
        <Modal
          open={!!te}
          onClose={function () {
            setTe(null);
          }}
          title="Acessos de teste criados"
          footer={
            <Button
              variant="brand"
              iconLeft="check"
              onClick={function () {
                setTe(null);
              }}
            >
              Entendi
            </Button>
          }
        >
          {te ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Hint>Anote as senhas: elas só aparecem agora. Criar de novo gera senhas novas.</Hint>
              {[
                ['Cliente (comprou o painel)', te.cliente, 'briefcase', 'var(--ms7-purple)'],
                ['Operador desse cliente', te.operador, 'user', 'var(--ms7-blue)'],
              ].map(function (x) {
                return (
                  <div
                    key={x[0]}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      background: 'var(--surface-muted)',
                      boxShadow: '0 0 0 1px var(--line)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                      <span
                        className="ms7c-tile"
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 9,
                          background: 'color-mix(in oklab, ' + x[3] + ' 12%, var(--surface-card))',
                          color: x[3],
                        }}
                      >
                        <DS.Icon name={x[2]} size={15} strokeWidth={2} />
                      </span>
                      <span className="ms7c-t">{x[0]}</span>
                    </div>
                    {[
                      ['Email', x[1].email],
                      ['Senha', x[1].password],
                    ].map(function (f) {
                      return (
                        <div key={f[0]} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span className="ms7-eyebrow" style={{ width: 48 }}>
                            {f[0]}
                          </span>
                          <div className="ms7c-mono" style={{ flex: 1 }}>
                            <span>{f[1]}</span>
                            <IconButton
                              icon="copy"
                              size={28}
                              iconSize={14}
                              label={'Copiar ' + f[0].toLowerCase()}
                              onClick={function () {
                                try {
                                  navigator.clipboard.writeText(f[1]);
                                } catch (e) {}
                                toast(f[0] + ' copiado');
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <p style={{ margin: 0, fontSize: 13, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                {nb(
                  'O painel do cliente já vem com 1 operador, 3 plataformas (A e B no "Grupo Teste", C sem grupo), 1 rede e 6 chaves PIX. Os dados dele ficam separados dos seus.',
                )}
              </p>
            </div>
          ) : null}
        </Modal>
      </Card>
    );
  }
  function SenhaCard({ session }) {
    const { Card, Input, Button } = DS;
    const [c, setC] = React.useState('');
    const [n, setN] = React.useState('');
    if (!session || !session.real) return null;
    return (
      <Card title="Alterar senha" subtitle={nb('Use pelo menos 8 caracteres')}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, alignItems: 'start' }}>
          <Input
            label="Senha atual"
            type="password"
            icon="lock"
            value={c}
            onChange={function (e) {
              setC(e.target.value);
            }}
          />
          <Input
            label="Nova senha"
            type="password"
            icon="lock-keyhole"
            value={n}
            onChange={function (e) {
              setN(e.target.value);
            }}
            hint="Mínimo de 8 caracteres"
          />
          <Button
            variant="outline"
            iconLeft="key-round"
            style={{ marginTop: 25 }}
            disabled={!c || n.length < 8}
            onClick={function () {
              DB.Sync.api('/api/auth/password', { method: 'POST', body: JSON.stringify({ current: c, next: n }) })
                .then(function () {
                  setC('');
                  setN('');
                  toast('Senha alterada');
                })
                .catch(function (e) {
                  toast(e.message);
                });
            }}
          >
            Alterar senha
          </Button>
        </div>
      </Card>
    );
  }
  function ExemploCard({ role }) {
    const { Card, Button } = DS;
    DB.useDB();
    if (role === 'operador') return null;
    const c = DB.A.contarExemplo();
    if (!c.total) return null;
    return (
      <Card title="Dados de exemplo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span
            className="ms7c-tile is-lg"
            style={{ background: 'color-mix(in oklab, var(--ms7-orange) 12%, var(--surface-card))', color: 'var(--ms7-orange)' }}
          >
            <DS.Icon name="flask-conical" size={20} strokeWidth={2} />
          </span>
          <p className="ms7c-s" style={{ margin: 0, flex: '1 1 280px', maxWidth: 640 }}>
            {nb(
              'O painel ainda tem os dados de exemplo que vêm com o sistema (' +
                c.coops +
                ' cooperações e ' +
                c.ops +
                ' operadores de exemplo). Apague para ficar só com os seus. O que você criou não é apagado.',
            )}
          </p>
          <Button
            variant="danger"
            iconLeft="trash-2"
            onClick={function () {
              if (confirm('Apagar os dados de exemplo? As cooperações, operadores e acessos que você criou continuam.')) DB.A.limparExemplo();
            }}
          >
            Apagar dados de exemplo
          </Button>
        </div>
      </Card>
    );
  }
  function ConfigScreen({ session, role }) {
    const { Card, Tabs, Input, Button, Switch, Checkbox } = DS;
    const [, rt] = React.useState(0);
    const isOp = role === 'operador';
    const TABS = isOp
      ? [
          { id: 'app', label: 'Notificações' },
          { id: 'conta', label: 'Minha conta' },
        ]
      : [
          { id: 'marca', label: 'Marca' },
          { id: 'acessos', label: 'Acessos' },
          { id: 'app', label: 'Notificações' },
          { id: 'telegram', label: 'Telegram' },
          { id: 'conta', label: 'Minha conta' },
        ];
    const [tab0, setTab] = React.useState(isOp ? 'app' : 'marca');
    const tab = TABS.some(function (t) {
      return t.id === tab0;
    })
      ? tab0
      : TABS[0].id;
    const [cor, setCor] = React.useState('#005D3B');
    const TABV =
      role === 'cliente'
        ? TABS.filter(function (t) {
            return ['acessos', 'app', 'conta'].indexOf(t.id) >= 0;
          })
        : TABS;
    const tabV = TABV.some(function (t) {
      return t.id === tab;
    })
      ? tab
      : TABV[0].id;
    const cores = ['#005D3B', '#242424', '#2D77C1', '#9B31C8', '#FF7F08'];
    const TAB_ICON = { marca: 'palette', acessos: 'key-round', app: 'bell', telegram: 'send', conta: 'user' };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1000 }}>
        <div className="ms7c-tabwrap">
          <Tabs
            value={tabV}
            onChange={setTab}
            items={TABV.map(function (t) {
              return { id: t.id, label: t.label, icon: TAB_ICON[t.id] };
            })}
            style={{ maxWidth: isOp ? 380 : 760 }}
          />
        </div>
        {tabV === 'acessos' ? <AcessosCard session={session} /> : null}
        {tabV === 'marca' ? (
          <Card title={Tt('🎨', 'Identidade do painel')} subtitle={nb('Cores, nome e logo usados em todas as áreas do sistema')}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '18px 24px', alignItems: 'start' }}>
              <Input label="Nome do painel" icon="type" defaultValue="MS7 Dashboards" />
              <div className="ms7-field">
                <span className="ms7-label">Cor principal</span>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', minHeight: 42 }}>
                  {cores.map(function (c) {
                    const on = cor === c;
                    return (
                      <button
                        type="button"
                        key={c}
                        className="ms7c-swatch"
                        aria-label={'Cor ' + c}
                        aria-pressed={on}
                        onClick={function () {
                          setCor(c);
                        }}
                        style={{ background: c, color: '#fff' /* sobre a cor escolhida pelo usuário */ }}
                      >
                        {on ? <DS.Icon name="check" size={15} strokeWidth={2.5} /> : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginTop: 22,
                paddingTop: 20,
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 14,
                  background: cor,
                  color: '#fff' /* sobre a cor escolhida pelo usuário */,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: 20,
                  letterSpacing: '-0.02em',
                  flexShrink: 0,
                  transition: 'background var(--dur-base)',
                }}
              >
                MS7
              </div>
              <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                <div className="ms7c-t">Logo</div>
                <div className="ms7c-c" style={{ marginTop: 2 }}>
                  {nb('Prévia com a cor principal escolhida')}
                </div>
              </div>
              <Button variant="outline" iconLeft="upload">
                Enviar logo
              </Button>
            </div>
          </Card>
        ) : null}
        {tabV === 'app' ? (
          <React.Fragment>
            <SyncCard session={session} />
            <AppNotifCard />
          </React.Fragment>
        ) : null}
        {tabV === 'telegram' ? (
          <Card title={Tt('✈️', 'Telegram')} subtitle={nb('Receba no Telegram as contas importadas e os demais avisos do painel')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Input label="Token do bot" type="password" icon="bot" defaultValue="7382910:AAH-exemplo" />
              <div className="ms7-field">
                <span className="ms7-label">O que enviar</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 10 }}>
                  {Object.keys(NTYPES).map(function (t) {
                    return (
                      <div key={t} className="ms7c-sw">
                        <Switch
                          defaultChecked={getPrefs()[t]}
                          onChange={function (v) {
                            setPref(t, v);
                          }}
                          label={NTYPES[t].label}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Button
                  variant="brand"
                  iconLeft="link"
                  onClick={function () {
                    toast('Bot vinculado');
                  }}
                >
                  Vincular bot
                </Button>
                <Button
                  variant="outline"
                  iconLeft="send"
                  onClick={function () {
                    notify({ type: 'ciclo', title: 'Teste — MS7 Bot', body: 'Se você recebeu esta mensagem, o Telegram está conectado.' });
                  }}
                >
                  Enviar teste
                </Button>
              </div>
            </div>
          </Card>
        ) : null}
        {tabV === 'conta' ? <ExemploCard role={role} /> : null}
        {tabV === 'conta' ? <SenhaCard session={session} /> : null}
        {tabV === 'conta' ? (
          <Card title={Tt('👤', 'Minha conta')} subtitle={nb('Nome, email e aparência do painel')}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: '16px 20px', alignItems: 'start' }}>
              <Input label="Nome" icon="user" defaultValue="Marcelo" />
              <Input label="E-mail" icon="mail" defaultValue="marcelo@ms7.com" />
              <Input label="Senha atual" type="password" icon="lock" />
              <Input label="Nova senha" type="password" icon="lock-keyhole" hint="Mínimo de 8 caracteres" />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginTop: 22,
                paddingTop: 20,
                borderTop: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
              }}
            >
              <span className="ms7c-tile" style={{ background: 'color-mix(in oklab, var(--ms7-purple) 12%, var(--surface-card))', color: 'var(--ms7-purple)' }}>
                <DS.Icon name="moon" size={17} strokeWidth={2} />
              </span>
              <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                <div className="ms7c-t">Modo escuro</div>
                <div className="ms7c-c" style={{ marginTop: 2 }}>
                  Vale para este aparelho
                </div>
              </div>
              <Switch
                checked={window.ms7Theme === 'dark'}
                onChange={function (v) {
                  window.ms7SetTheme(v ? 'dark' : 'light');
                }}
              />
            </div>
          </Card>
        ) : null}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
          <Button variant="outline">Cancelar</Button>
          <Button
            variant="brand"
            iconLeft="check"
            onClick={function () {
              toast('Configurações salvas');
            }}
          >
            Salvar alterações
          </Button>
        </div>
      </div>
    );
  }
  Object.assign(window, { AlunosScreen: AlunosScreen, ProxiesScreen: ProxiesScreen, AssinaturaScreen: AssinaturaScreen, ConfigScreen: ConfigScreen });
})();
