(function () {
  const DS = window.MS7DesignSystem_5d5172;
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { id: 'visao', label: 'Visão geral' },
              { id: 'gestao', label: 'Gestão de alunos' },
            ]}
            style={{ width: 360 }}
          />
          <Button iconLeft="user-plus" onClick={openNew}>
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
              <Card title="Top 10 alunos por resultado">
                <BarChart
                  height={240}
                  data={rank.slice(0, 10).map(function (r) {
                    return { label: String(r.nome || '').split(' ')[0], values: [Math.round(r.resultado / 100) / 10] };
                  })}
                  series={[{ name: 'Resultado (mil R$)', color: 'var(--chart-1)' }]}
                />
              </Card>
              <Card title="Ranking resumido">
                <RankList rows={rank} valueKey="resultado" />
              </Card>
            </Grid>
          </React.Fragment>
        ) : (
          <Card>
            <DataTable
              rows={rows}
              columns={[
                {
                  key: 'nome',
                  label: 'Nome',
                  render: function (r) {
                    return (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar name={r.nome} size={32} />
                        <b>{r.nome}</b>
                      </div>
                    );
                  },
                },
                { key: 'email', label: 'Email' },
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
                { key: 'contas', label: 'Contas', align: 'center' },
                { key: 'criado', label: 'Criado em' },
                {
                  key: 'a',
                  label: '',
                  align: 'right',
                  render: function (r) {
                    return (
                      <div style={{ display: 'inline-flex', gap: 2 }}>
                        <IconButton
                          icon="pencil"
                          size={30}
                          iconSize={16}
                          onClick={function () {
                            setForm({ nome: r.nome, email: r.email });
                            setEdit(r.id);
                          }}
                        />
                        <IconButton
                          icon="trash-2"
                          size={30}
                          iconSize={16}
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
                variant="secondary"
                onClick={function () {
                  setEdit(null);
                }}
              >
                Cancelar
              </Button>
              <Button variant="brand" onClick={save}>
                Salvar
              </Button>
            </React.Fragment>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input
              label="Nome"
              required
              value={form.nome}
              onChange={function (e) {
                setForm(Object.assign({}, form, { nome: e.target.value }));
              }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Input
                label="Email (login)"
                value={form.email}
                onChange={function (e) {
                  setForm(Object.assign({}, form, { email: e.target.value }));
                }}
              />
              <Input label="Senha" required type="password" />
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
    return (
      <React.Fragment>
        <Card title="Comprar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {!prod ? (
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Carregando produtos…</div>
            ) : prod.length ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
                {prod.map(function (p) {
                  const n = q[p.id] || 0;
                  return (
                    <div
                      key={p.id}
                      style={{
                        border: n ? '2px solid var(--ms7-green)' : '1px solid var(--border-subtle)',
                        borderRadius: 14,
                        padding: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      <b style={{ fontSize: 16 }}>{p.nome}</b>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{p.desc}</span>
                      <span style={{ fontSize: 22, fontWeight: 800 }}>{MS7.brl(p.preco)}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
                        <DS.IconButton
                          icon="minus"
                          variant="outline"
                          size={34}
                          iconSize={16}
                          label="Menos"
                          disabled={!n}
                          onClick={function () {
                            step(p.id, -1);
                          }}
                        />
                        <b style={{ minWidth: 28, textAlign: 'center', fontSize: 16 }}>{n}</b>
                        <DS.IconButton
                          icon="plus"
                          variant="outline"
                          size={34}
                          iconSize={16}
                          label="Mais"
                          onClick={function () {
                            step(p.id, 1);
                          }}
                        />
                        {n ? <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700 }}>{MS7.brl(p.preco * n)}</span> : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Nenhum produto à venda agora.</div>
            )}
            <div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: 16,
              }}
            >
              <div style={{ flex: '1 1 200px', maxWidth: 260 }}>
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
                {C.desconto ? (
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {'Subtotal ' + MS7.brl(C.total) + ' · desconto −' + MS7.brl(C.desconto)}
                  </span>
                ) : null}
                <b style={{ fontSize: 24 }}>{MS7.brl(C.valor)}</b>
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
          <Card title="Meus pedidos">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {peds.map(function (p) {
                return (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 0',
                      borderTop: '1px solid var(--border-subtle)',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                      <b style={{ fontSize: 14 }}>
                        {(p.itens || [])
                          .map(function (x) {
                            return x.qtd + 'x ' + x.nome;
                          })
                          .join(', ')}
                      </b>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {new Date(p.criado).toLocaleString('pt-BR') + (p.cupom ? ' · cupom ' + p.cupom : '')}
                      </div>
                    </div>
                    <Badge size="sm" variant="soft" tone={p.status === 'approved' ? (p.entregue ? 'green' : 'blue') : 'yellow'}>
                      {p.status === 'approved' ? (p.entregue ? 'Entregue' : 'Pago · em entrega') : 'Aguardando pagamento'}
                    </Badge>
                    <b>{MS7.brl(p.valor)}</b>
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
        <Card title="Minhas proxies">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {list.map(function (p) {
              const conn = p.host + ':' + p.port + ':' + p.login;
              return (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: 14,
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: 'var(--ms7-gray-100)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <DS.Icon name="globe" size={20} />
                  </span>
                  <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <b style={{ fontSize: 15 }}>{p.label}</b>
                      <Badge size="sm" tone={p.status === 'Ativa' ? 'green' : MS7.statusTone[p.status]}>
                        {p.status}
                      </Badge>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{'Expira em ' + p.expira}</div>
                  </div>
                  <div
                    style={{
                      flex: '1 1 260px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'var(--ms7-gray-50)',
                      borderRadius: 8,
                      padding: '6px 6px 6px 12px',
                      fontFamily: 'ui-monospace,monospace',
                      fontSize: 12,
                    }}
                  >
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conn}</span>
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
                  <div style={{ width: 130 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700 }}>
                      <span>Tráfego</span>
                      <span>{p.uso + '%'}</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: 'var(--ms7-gray-100)', marginTop: 4 }}>
                      <div
                        style={{
                          width: p.uso + '%',
                          height: '100%',
                          borderRadius: 3,
                          background: p.uso > 85 ? 'var(--ms7-orange)' : 'var(--ms7-green)',
                        }}
                      ></div>
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
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    flexWrap: 'wrap',
                    padding: '16px 18px',
                    borderRadius: 16,
                    background: urg ? 'var(--soft-warn-bg, #FFF1E6)' : 'var(--ms7-lime-100, #E9F7D9)',
                    color: urg ? 'var(--soft-warn-fg, #8A3B00)' : 'var(--ms7-green-ink, #0C3B26)',
                  }}
                >
                  <span
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: urg ? '#FF7F08' : '#005D3B',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <DS.Icon name="calendar-clock" size={20} />
                  </span>
                  <div style={{ flex: '1 1 220px' }}>
                    <b style={{ fontSize: 18 }}>
                      {dias === 0 ? 'Sua assinatura vence hoje' : 'Faltam ' + dias + (dias === 1 ? ' dia' : ' dias') + ' para renovar'}
                    </b>
                    <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.85 }}>
                      {'Plano ' + P.nome + ' · renova em ' + ren.toLocaleDateString('pt-BR') + ' · ' + MS7.brl(P.preco)}
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
              dark
              title="Plano atual"
              action={
                <Button
                  variant="lime"
                  size="sm"
                  iconLeft="arrow-up-down"
                  onClick={function () {
                    setChg(true);
                  }}
                >
                  Mudar de plano
                </Button>
              }
            >
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--ms7-lime-500)', lineHeight: 1 }}>{P.nome}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 6 }}>{P.seats + ' seats de operador · renovação mensal'}</div>
                </div>
                <div style={{ flex: '1 1 260px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                    <span>{'Uso de seats — ' + P.nome}</span>
                    <span>{used + '/' + P.seats}</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,.15)' }}>
                    <div
                      style={{
                        width: Math.min(100, (used / P.seats) * 100) + '%',
                        height: '100%',
                        borderRadius: 5,
                        background: 'var(--ms7-lime-500)',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
            <Card title="Pague seu plano via PIX">
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                <span
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: 'var(--ms7-green-900, #005D3B)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <DS.Icon name="qr-code" size={28} />
                </span>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 220 }}>
                  <b style={{ fontSize: 16 }}>{'Plano ' + P.nome + ' · ' + MS7.brl(P.preco) + ' por 30 dias'}</b>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Gere o PIX, pague com o copia e cola ou o QR Code. A confirmação é automática e os 30 dias somam no vencimento.
                  </span>
                </div>
                <Button
                  variant="brand"
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
              title="Assinaturas"
              action={
                <div style={{ display: 'flex', gap: 10 }}>
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
              <DataTable
                rows={tenants}
                columns={[
                  {
                    key: 'tenant',
                    label: 'Tenant',
                    render: function (r) {
                      return (
                        <div>
                          <b>{r.tenant}</b>
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{r.owner}</div>
                        </div>
                      );
                    },
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    render: function (r) {
                      return (
                        <Badge size="sm" tone={MS7.statusTone[r.status]}>
                          {r.status}
                        </Badge>
                      );
                    },
                  },
                  { key: 'plano', label: 'Plano' },
                  { key: 'uso', label: 'Uso', align: 'right' },
                  { key: 'cobranca', label: 'Cobrança', align: 'right' },
                  { key: 'proximo', label: 'Próx. cobrança', align: 'right' },
                  {
                    key: 'a',
                    label: '',
                    align: 'right',
                    render: function (r) {
                      return <DS.IconButton icon="ellipsis" size={30} iconSize={16} />;
                    },
                  },
                ]}
              />
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MS7.planos.map(function (p) {
              const on = p.id === plan;
              return (
                <div
                  key={p.id}
                  onClick={function () {
                    setPlan(p.id);
                    setChg(false);
                    toast('Plano alterado para ' + p.nome);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 14,
                    borderRadius: 12,
                    cursor: 'pointer',
                    border: on ? '2px solid var(--ms7-green-900)' : '1px solid var(--border-default)',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <b style={{ fontSize: 16 }}>{p.nome}</b>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{p.seats + ' seats'}</div>
                  </div>
                  <b>{MS7.brl(p.preco) + '/mês'}</b>
                  {on ? (
                    <Badge size="sm" tone="green">
                      Atual
                    </Badge>
                  ) : null}
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
    function step(n, title, body, right) {
      return (
        <div
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'flex-start',
            padding: '14px 0',
            borderTop: n > 1 ? '1px solid var(--border-subtle)' : 'none',
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'var(--ms7-lime-500)',
              color: 'var(--ms7-green-ink, #005D3B)',
              fontWeight: 800,
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {n}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <b style={{ fontSize: 15 }}>{title}</b>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 3, lineHeight: 1.45 }}>{body}</div>
          </div>
          {right}
        </div>
      );
    }
    return (
      <Card title="Instalar como app e receber notificações">
        <Hint>
          Instale o painel no celular ou no computador. Ele abre como um app e mostra as notificações do sistema: início de meta, conta bloqueada e
          ciclo fechado com lucro ou prejuízo.
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
            <Badge tone="green" size="sm">
              Instalado
            </Badge>
          ) : (
            <Button
              size="sm"
              variant="brand"
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
        )}
        {step(
          2,
          'Permitir notificações',
          perm === 'denied'
            ? 'As notificações foram bloqueadas. Libere nas configurações do site (ícone de cadeado na barra de endereço).'
            : 'O celular vai pedir permissão. Toque em "Permitir".',
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Badge tone={permBadge[0]} size="sm">
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
          </div>,
        )}
        {step(
          3,
          'Conectar ao servidor',
          'Endereço onde o novo dashboard está publicado (https). Todos os celulares conectados recebem o que os operadores fazem, mesmo com o app fechado.',
          <Badge tone={remote ? 'green' : 'gray'} size="sm">
            {remote ? 'Conectado' : 'Desconectado'}
          </Badge>,
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 12, alignItems: 'end', padding: '0 0 14px 42px' }}>
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
          remote
            ? 'Envia uma notificação de ciclo fechado para todos os celulares conectados.'
            : 'Envia uma notificação de ciclo fechado para este aparelho.',
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
        <div style={{ marginTop: 6, paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
          <Switch
            checked={dev}
            onChange={function (v) {
              setDev(v);
              setPref('__device', v);
            }}
            label="Mostrar notificações neste aparelho"
          />
        </div>
        <p style={{ margin: '14px 0 0', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Sem servidor conectado, só este aparelho mostra as notificações. O servidor fica em ui_kits/operacoes/server (veja o README).
        </p>
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
    return (
      <Card
        title="Banco de dados central"
        action={
          <Badge tone={B[0]} size="sm">
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
                (session.role === 'operador'
                  ? 'Você vê e edita só as suas cooperações.'
                  : 'Tudo o que os operadores preenchem aparece aqui na hora.')}
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
                variant="secondary"
                iconLeft="log-out"
                onClick={function () {
                  S.logout();
                }}
              >
                Sair
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <Hint>Você está no modo demonstração. Para usar o banco central, saia e entre com email e senha na tela de login.</Hint>
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
        <Card title="Acessos">
          <Hint>Entre com email e senha num servidor para criar logins dos operadores. No modo demonstração os acessos não são reais.</Hint>
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
    return (
      <Card
        title="Acessos"
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
          Cada pessoa entra com o próprio email e senha. Operadores agora são criados só em Gestão → Operadores (nome, email e senha num lugar só);
          aqui você vê e bloqueia os acessos.
        </Hint>
        {isCliS && window.VagasCard ? (
          <div style={{ marginBottom: 16 }}>
            <VagasCard />
          </div>
        ) : null}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 12, marginBottom: 18 }}>
          {[
            [
              'shield-check',
              'Admin / Super Admin',
              'Vê e altera tudo: todas as cooperações, operadores, custos, pagamentos, configurações e acessos.',
            ],
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
                      'store',
                      'Cliente',
                      'Comprou o painel. Tem um painel próprio com dados separados dos seus: dashboard, cooperações, análises, financeiro, listas, avisos e o cadastro de operadores, plataformas e chaves PIX. Não vê ponto, alunos, assinatura nem proxies.',
                    ],
                  ],
            )
            .filter(function (r) {
              return !isCliS || r[1] === 'Operador';
            })
            .map(function (r) {
              return (
                <div key={r[1]} style={{ display: 'flex', gap: 10, padding: 14, borderRadius: 12, background: 'var(--ms7-gray-50)' }}>
                  <DS.Icon name={r[0]} size={18} />
                  <div>
                    <b style={{ fontSize: 14 }}>{r[1]}</b>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.45, marginTop: 2 }}>{r[2]}</div>
                  </div>
                </div>
              );
            })}
        </div>
        {err ? (
          <Hint>{err}</Hint>
        ) : !list ? (
          <Hint>Carregando…</Hint>
        ) : (
          <DataTable
            rows={list}
            columns={[
              {
                key: 'name',
                label: 'Nome',
                render: function (r) {
                  return (
                    <div>
                      <b>{r.name}</b>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{r.email}</div>
                      {!isCliS && r.tenant && r.tenant !== 'main' && r.role !== 'cliente' ? (
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ms7-purple)' }}>
                          {'Painel de ' +
                            ((
                              list.find(function (x) {
                                return x.id === r.tenant;
                              }) || {}
                            ).name || 'cliente')}
                        </div>
                      ) : null}
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
                      <b style={{ color: o ? 'inherit' : 'var(--ms7-error)' }}>{o ? o.nome : 'Operador não encontrado'}</b>
                      <div style={{ fontSize: 12, fontWeight: 600, color: o && n ? 'var(--text-secondary)' : 'var(--ms7-error)' }}>
                        {!o
                          ? 'Clique no lápis e escolha o operador de novo'
                          : n +
                            (n === 1 ? ' cooperação ligada' : ' cooperações ligadas') +
                            (homon > 1 ? ' · há ' + homon + ' operadores com esse nome' : '')}
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
                    <div style={{ display: 'inline-flex', gap: 2 }}>
                      <IconButton
                        icon="pencil"
                        size={30}
                        iconSize={16}
                        onClick={function () {
                          setEdit(Object.assign({}, r, { password: '' }));
                        }}
                      />
                      {r.email !== (S.user() || {}).email ? (
                        <IconButton
                          icon="trash-2"
                          size={30}
                          iconSize={16}
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
                variant="secondary"
                onClick={function () {
                  setEdit(null);
                }}
              >
                Cancelar
              </Button>
              <Button variant="brand" disabled={busy} onClick={save}>
                Salvar
              </Button>
            </React.Fragment>
          }
        >
          {edit ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Input
                  label="Nome"
                  value={edit.name}
                  onChange={function (e) {
                    setEdit(Object.assign({}, edit, { name: e.target.value }));
                  }}
                />
                <Input
                  label="Email (login)"
                  required
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
                ['Cliente (comprou o painel)', te.cliente],
                ['Operador desse cliente', te.operador],
              ].map(function (x) {
                return (
                  <div
                    key={x[0]}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      border: '1px solid var(--border-default)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    <b style={{ fontSize: 14 }}>{x[0]}</b>
                    {[
                      ['Email', x[1].email],
                      ['Senha', x[1].password],
                    ].map(function (f) {
                      return (
                        <div key={f[0]} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                          <span style={{ width: 48, fontWeight: 600, color: 'var(--text-secondary)' }}>{f[0]}</span>
                          <span style={{ flex: 1, fontFamily: 'ui-monospace,monospace', fontWeight: 600 }}>{f[1]}</span>
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
                      );
                    })}
                  </div>
                );
              })}
              <p style={{ margin: 0, fontSize: 13, fontWeight: 500, lineHeight: 1.5 }}>
                O painel do cliente já vem com 1 operador, 3 plataformas (A e B no "Grupo Teste", C sem grupo), 1 rede e 6 chaves PIX. Os dados dele
                ficam separados dos seus.
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
      <Card title="Alterar senha">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, alignItems: 'end' }}>
          <Input
            label="Senha atual"
            type="password"
            value={c}
            onChange={function (e) {
              setC(e.target.value);
            }}
          />
          <Input
            label="Nova senha"
            type="password"
            value={n}
            onChange={function (e) {
              setN(e.target.value);
            }}
            hint="Mínimo de 8 caracteres"
          />
          <Button
            variant="brand"
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
          <p style={{ margin: 0, flex: '1 1 280px', fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
            {'O painel ainda tem os dados de exemplo que vêm com o sistema (' +
              c.coops +
              ' cooperações e ' +
              c.ops +
              ' operadores de exemplo). Apague para ficar só com os seus. O que você criou não é apagado.'}
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
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1000 }}>
        <Tabs value={tabV} onChange={setTab} items={TABV} style={{ maxWidth: isOp ? 340 : 680 }} />
        {tabV === 'acessos' ? <AcessosCard session={session} /> : null}
        {tabV === 'marca' ? (
          <Card title="Identidade do painel">
            <Hint>Cores, nome e logo usados em todas as áreas do sistema.</Hint>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
              <Input label="Nome do painel" defaultValue="MS7 Dashboards" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Cor principal</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  {cores.map(function (c) {
                    return (
                      <span
                        key={c}
                        onClick={function () {
                          setCor(c);
                        }}
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          background: c,
                          cursor: 'pointer',
                          outline: cor === c ? '2px solid var(--ms7-black)' : 'none',
                          outlineOffset: 2,
                        }}
                      ></span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 18 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 14,
                  background: cor,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 22,
                }}
              >
                MS7
              </div>
              <Button size="sm" variant="secondary" iconLeft="upload">
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
          <Card title="Telegram">
            <Hint>Receba no Telegram as contas importadas e os demais avisos do painel.</Hint>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label="Token do bot" type="password" defaultValue="7382910:AAH-exemplo" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '14px 32px' }}>
                {Object.keys(NTYPES).map(function (t) {
                  return (
                    <Switch
                      key={t}
                      defaultChecked={getPrefs()[t]}
                      onChange={function (v) {
                        setPref(t, v);
                      }}
                      label={NTYPES[t].label}
                    />
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
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
          <Card title="Minha conta">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
              <Input label="Nome" defaultValue="Marcelo" />
              <Input label="E-mail" defaultValue="marcelo@ms7.com" />
              <Input label="Senha atual" type="password" />
              <Input label="Nova senha" type="password" hint="Mínimo de 8 caracteres" />
            </div>
            <div style={{ marginTop: 18 }}>
              <Switch
                checked={window.ms7Theme === 'dark'}
                onChange={function (v) {
                  window.ms7SetTheme(v ? 'dark' : 'light');
                }}
                label="Modo escuro"
              />
            </div>
          </Card>
        ) : null}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <Button variant="secondary">Cancelar</Button>
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
