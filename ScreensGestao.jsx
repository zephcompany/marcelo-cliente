(function () {
  const DS = window.MS7DesignSystem_5d5172;
  /* ---------- CSS só desta tela (tokens) ---------- */
  const CSS = [
    '.ms7g-acts{display:inline-flex;gap:2px;opacity:0;transition:opacity var(--dur-fast)}',
    '.ms7-table tr:hover .ms7g-acts,.ms7g-acts:focus-within{opacity:1}',
    '@media (hover:none){.ms7g-acts{opacity:1}}',
    '.ms7g-tile{width:30px;height:30px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;background:color-mix(in oklab,var(--ms7-green-900) 16%,transparent);color:var(--ms7-green-900)}',
    '.ms7g-name{font-size:14px;font-weight:600;letter-spacing:-.005em;line-height:1.25}',
    '.ms7g-sub{font-size:12.5px;font-weight:500;color:var(--text-secondary);line-height:1.35}',
    '.ms7g-chip{display:inline-flex;align-items:center;gap:8px;height:34px;padding:0 6px 0 12px;border-radius:999px;border:1px solid var(--line);background:var(--surface-card);color:var(--text-primary);font-family:inherit;font-size:13px;font-weight:600;letter-spacing:-.005em;transition:border-color var(--dur-fast),background var(--dur-fast),color var(--dur-fast)}',
    '.ms7g-chip:hover{border-color:var(--line-strong);background:var(--surface-muted)}',
    '.ms7g-chip.is-sel{cursor:pointer;padding-right:12px}',
    '.ms7g-chip.is-on{border-color:var(--ms7-green-900);background:color-mix(in oklab,var(--ms7-green-900) 12%,transparent);color:var(--ms7-green-900)}',
    '.ms7g-chip-ico{color:var(--text-secondary);display:inline-flex}.ms7g-chip.is-on .ms7g-chip-ico{color:inherit}',
    '.ms7g-chip-x{width:20px;height:20px;border-radius:50%;border:0;padding:0;background:transparent;color:var(--text-secondary);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity var(--dur-fast),background var(--dur-fast),color var(--dur-fast)}',
    '.ms7g-chip:hover .ms7g-chip-x,.ms7g-chip-x:focus-visible{opacity:1}',
    '.ms7g-chip-x:hover{background:var(--line);color:var(--text-primary)}',
    '@media (hover:none){.ms7g-chip-x{opacity:1}}',
    '.ms7g-cell{height:36px;padding:0 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface-card);color:var(--text-primary);font:500 13px var(--font-sans);width:100%;min-width:0;box-sizing:border-box;transition:border-color var(--dur-fast),box-shadow var(--dur-base) var(--ease-standard)}',
    'input.ms7g-cell[type="date"]{height:36px;padding:0 10px;border-radius:8px;border:1px solid var(--line);font:500 13px var(--font-sans)}',
    '.ms7g-cell:hover{border-color:var(--line-strong)}',
    '.ms7g-cell:focus{outline:0;border-color:var(--ms7-green-900);box-shadow:0 0 0 3px color-mix(in oklab,var(--ms7-green-900) 16%,transparent)}',
    '.ms7g-cell::placeholder{color:var(--ms7-gray-400)}',
    '.ms7g-money{position:relative;min-width:0}.ms7g-money>span{position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:12px;font-weight:600;color:var(--text-secondary);pointer-events:none}.ms7g-money>.ms7g-cell{padding-left:34px}',
    '.ms7g-prod{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,2.2fr) 128px 48px 32px;gap:8px;align-items:center}',
    '.ms7g-prod.is-head{padding-bottom:2px}',
    '@media (max-width:760px){.ms7g-prod{grid-template-columns:minmax(0,1fr) 48px 32px;row-gap:6px;padding:10px 0;border-bottom:1px solid var(--border-subtle)}.ms7g-prod>:nth-child(1),.ms7g-prod>:nth-child(2){grid-column:1/-1}.ms7g-prod.is-head{display:none}}',
    '.ms7g-cup{display:grid;grid-template-columns:minmax(160px,1.4fr) 84px 150px 96px 56px 48px 32px;gap:8px;align-items:center;min-width:700px}',
    '.ms7g-scroll{overflow-x:auto;display:flex;flex-direction:column;gap:8px;padding-bottom:2px}',
    '.ms7g-line{display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid var(--border-subtle);flex-wrap:wrap}',
    '.ms7g-line:first-child{border-top:0;padding-top:0}',
    '.ms7g-pos{width:28px;height:28px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;background:var(--surface-muted);color:var(--text-primary);font-variant-numeric:tabular-nums}',
    '.ms7g-pos.is-1{background:var(--ms7-lime-500);color:var(--text-on-lime)}.ms7g-pos.is-rest{background:transparent;color:var(--text-secondary)}',
    '.ms7g-tpl{position:relative;display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:background var(--dur-fast)}',
    '.ms7g-tpl:hover,.ms7g-tpl.is-on{background:var(--surface-muted)}',
    '.ms7g-tpl.is-on::before{content:"";position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:3px;background:var(--ms7-green-900)}',
    '.ms7g-tpl .ms7g-tile{background:var(--surface-card);color:var(--text-secondary);box-shadow:0 0 0 1px var(--line)}',
    '.ms7g-tpl.is-on .ms7g-tile{background:color-mix(in oklab,var(--ms7-green-900) 16%,transparent);color:var(--ms7-green-900);box-shadow:none}',
    /* pódio do ranking: três tiles de vidro, posição em pílula (sem numeral gigante) */
    '.ms7g-podio{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:18px}',
    '.ms7g-podio-it{display:flex;flex-direction:column;gap:12px;padding:16px;border-radius:12px;background:var(--surface-muted);box-shadow:0 0 0 1px var(--line);min-width:0}',
    '.ms7g-podio-it.is-1{box-shadow:0 0 0 1px color-mix(in oklab,var(--ms7-lime-500) 55%,var(--line))}',
    '.ms7g-podio-top{display:flex;align-items:center;gap:10px;min-width:0}',
    '.ms7g-podio-val{font-size:20px;font-weight:600;letter-spacing:-.03em;line-height:1.1;color:var(--ms7-green)}',
    '.ms7g-podio-val.is-neg{color:var(--ms7-error)}',
    '@media (max-width:760px){.ms7g-podio{grid-template-columns:minmax(0,1fr)}}',
    /* vidro no preto */
    'html[data-theme="dark"] .ms7g-chip{background:var(--glass);box-shadow:var(--glass-edge)}',
    'html[data-theme="dark"] .ms7g-chip:hover{background:var(--glass-2)}',
    'html[data-theme="dark"] .ms7g-chip.is-on{background:color-mix(in oklab,var(--ms7-lime-500) 14%,transparent);box-shadow:none}',
    'html[data-theme="dark"] .ms7g-cell,html[data-theme="dark"] input.ms7g-cell[type="date"]{background:var(--glass);box-shadow:var(--glass-edge)}',
    'html[data-theme="dark"] .ms7g-cell:focus{border-color:var(--ms7-lime-500);box-shadow:var(--glass-edge),0 0 0 3px rgba(201,247,117,.18)}',
    'html[data-theme="dark"] .ms7g-tpl:hover,html[data-theme="dark"] .ms7g-tpl.is-on{background:var(--glass-2)}',
    'html[data-theme="dark"] .ms7g-tpl .ms7g-tile{background:var(--glass)}',
    'html[data-theme="dark"] .ms7g-podio-it{background:var(--glass);box-shadow:var(--glass-edge),0 0 0 1px var(--line)}',
    'html[data-theme="dark"] .ms7g-podio-it.is-1{box-shadow:var(--glass-edge),0 0 0 1px color-mix(in oklab,var(--ms7-lime-500) 45%,var(--line))}',
  ].join('');
  if (!document.getElementById('ms7-gestao-css')) {
    const st = document.createElement('style');
    st.id = 'ms7-gestao-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }
  /* emoji de título de card (1 por card, sempre antes do texto) */
  function Emo({ e }) {
    return (
      <span className="ms7-emo" aria-hidden="true" style={{ marginRight: 8 }}>
        {e}
      </span>
    );
  }
  function OperadoresTab() {
    const { Card, DataTable, Switch, IconButton, Button, Modal, Input, Avatar, Badge } = DS;
    const db = DB.useDB();
    const rows = db.operadores;
    const [edit, setEdit] = React.useState(null);
    const [f, setF] = React.useState({});
    const [inv, setInv] = React.useState(false);
    const real = !!(DB.Sync.token && DB.Sync.token());
    const [users, setUsers] = React.useState([]);
    const [busy, setBusy] = React.useState(false);
    function loadU() {
      if (real)
        DB.Sync.api('/api/users')
          .then(function (l) {
            setUsers(l || []);
          })
          .catch(function () {});
    }
    React.useEffect(loadU, []);
    const accOf = function (id) {
      return users.find(function (x) {
        return x.role === 'operador' && x.opId === id;
      });
    };
    const isCliG = JSON.parse(localStorage.getItem('ms7op-session') || '{}').role === 'cliente';
    const used = rows.filter(function (r) {
      return r.ativo;
    }).length;
    const coops = function (id) {
      return db.coops.filter(function (c) {
        return c.opId === id && c.status !== 'Lixeira';
      }).length;
    };
    function open(r) {
      loadU();
      const ac = r && accOf(r.id);
      setF(
        r
          ? {
              id: r.id,
              nome: r.nome,
              email: (ac && ac.email) || r.email || '',
              senha: '',
              accId: ac ? ac.id : '',
              ciclo: r.ciclo,
              comTipo: r.comTipo || 'pct',
              comValor: String(r.comValor != null ? r.comValor : r.pct),
              comConta: r.comConta != null ? String(r.comConta) : '',
            }
          : { nome: '', email: '', senha: '', accId: '', ciclo: 7, comTipo: 'pct', comValor: '15' },
      );
      setEdit(r ? r.id : 'new');
    }
    function save() {
      const nome = String(f.nome || '').trim(),
        em = String(f.email || '')
          .trim()
          .toLowerCase(),
        pw = String(f.senha || '');
      if (!nome) {
        toast('Informe o nome do operador');
        return;
      }
      if (real && em) {
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) {
          toast('Email inválido');
          return;
        }
        if (!f.accId && pw.length < 8) {
          toast('Crie uma senha com no mínimo 8 caracteres');
          return;
        }
        if (pw && pw.length < 8) {
          toast('Senha com no mínimo 8 caracteres');
          return;
        }
      }
      const cv =
        parseFloat(
          String(f.comValor || '')
            .replace(/\./g, '')
            .replace(',', '.'),
        ) || 0;
      const id = f.id || 'op' + Date.now();
      const o = Object.assign(
        {},
        f,
        {
          id: id,
          nome: nome,
          email: em,
          comTipo: f.comTipo || 'pct',
          comValor: cv,
          comConta: parseFloat(String(f.comConta || '').replace(',', '.')) || 0,
        },
        f.comTipo === 'pct' || !f.comTipo ? { pct: cv } : {},
      );
      delete o.senha;
      delete o.accId;
      const fim = function () {
        DB.A.saveOperador(o);
        setEdit(null);
        loadU();
      };
      if (!real || !em) {
        fim();
        return;
      }
      setBusy(true);
      DB.Sync.api('/api/users', {
        method: 'POST',
        body: JSON.stringify({ id: f.accId || undefined, email: em, name: nome, role: 'operador', opId: id, password: pw || undefined, ativo: true }),
      })
        .then(function () {
          fim();
          toast(f.accId ? 'Operador e acesso salvos' : 'Operador criado: ele já entra com ' + em);
        })
        .catch(function (e) {
          toast(e.message || 'Não foi possível criar o acesso');
        })
        .then(function () {
          setBusy(false);
        });
    }
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
    const vagasTop = isCliG && window.VagasCard ? <VagasCard /> : null;
    const novo = function () {
      if (window.podeNovoOperador && !window.podeNovoOperador()) return;
      open(null);
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {vagasTop}
        <Card
          title={
            <React.Fragment>
              <Emo e="👥" />
              Operadores
            </React.Fragment>
          }
          action={
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              {isCliG ? null : (
                <Badge variant="soft" tone={used >= 10 ? 'error' : 'green'}>
                  {'Seats ' + used + '/10'}
                </Badge>
              )}
              <Button variant="brand" iconLeft="user-plus" onClick={novo}>
                Novo operador
              </Button>
            </div>
          }
        >
          <Hint>
            Cadastre o operador aqui com email e senha: ele já entra no painel com esse acesso. Depois envie o endereço do painel, o email e a senha
            para&nbsp;ele.
          </Hint>
          {rows.length ? (
            <DataTable
              rows={rows}
              columns={[
                {
                  key: 'nome',
                  label: 'Nome',
                  render: function (r) {
                    return (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Avatar name={r.nome} size={34} />
                        <div style={{ minWidth: 0, whiteSpace: 'nowrap' }}>
                          <div className="ms7g-name">{r.nome}</div>
                          <div className="ms7g-sub" style={{ marginTop: 2 }}>
                            {(accOf(r.id) || {}).email || r.email || '—'}
                          </div>
                        </div>
                      </div>
                    );
                  },
                },
                {
                  key: 'acesso',
                  label: 'Acesso',
                  align: 'center',
                  render: function (r) {
                    if (!real) return <span style={{ color: 'var(--text-secondary)' }}>—</span>;
                    const ac = accOf(r.id);
                    return (
                      <Badge size="sm" variant="soft" tone={ac ? (ac.ativo ? 'green' : 'gray') : 'yellow'}>
                        {ac ? (ac.ativo ? 'Pode entrar' : 'Bloqueado') : 'Sem acesso'}
                      </Badge>
                    );
                  },
                },
                {
                  key: 'coops',
                  label: 'Coops',
                  align: 'center',
                  render: function (r) {
                    return (
                      <span className="ms7-num" style={{ fontWeight: 600 }}>
                        {coops(r.id)}
                      </span>
                    );
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
                          DB.A.saveOperador({ id: r.id, ativo: v });
                        }}
                      />
                    );
                  },
                },
                {
                  key: 'a',
                  label: '',
                  align: 'right',
                  width: 80,
                  render: function (r) {
                    return (
                      <div className="ms7g-acts">
                        <IconButton
                          icon="pencil"
                          size={30}
                          iconSize={15}
                          label="Editar"
                          onClick={function () {
                            open(r);
                          }}
                        />
                        <IconButton
                          icon="trash-2"
                          size={30}
                          iconSize={15}
                          label="Remover"
                          onClick={function () {
                            if (coops(r.id)) {
                              toast('Esse operador tem cooperações. Desative em vez de remover.');
                              return;
                            }
                            if (confirm('Remover ' + r.nome + '?')) DB.A.removeOperador(r.id);
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
              title="Nenhum operador ainda"
              sub="Cadastre o primeiro operador com email e senha: ele já entra no painel com esse acesso."
              action={
                <Button variant="brand" iconLeft="user-plus" onClick={novo}>
                  Novo operador
                </Button>
              }
            />
          )}
          <Modal
            open={!!edit}
            onClose={function () {
              setEdit(null);
            }}
            title={edit === 'new' ? 'Novo operador' : 'Editar operador'}
            subtitle={edit === 'new' ? 'Nome, email e senha num lugar só' : undefined}
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
                <Button variant="brand" iconLeft="check" disabled={busy} onClick={save}>
                  Salvar
                </Button>
              </React.Fragment>
            }
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <Input label="Nome" required icon="user" value={f.nome || ''} onChange={u('nome')} />
              </div>
              <Input label="Email (login)" icon="mail" value={f.email || ''} onChange={u('email')} />
              <Input
                label={f.accId ? 'Nova senha' : 'Senha'}
                type="password"
                icon="lock"
                value={f.senha || ''}
                onChange={u('senha')}
                placeholder={f.accId ? 'Deixe em branco para manter' : 'Mínimo 8 caracteres'}
              />
              {!real ? (
                <div
                  style={{
                    gridColumn: '1 / -1',
                    display: 'flex',
                    gap: 8,
                    alignItems: 'flex-start',
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: 'var(--surface-muted)',
                    fontSize: 12.5,
                    fontWeight: 500,
                    lineHeight: 1.45,
                    color: 'var(--text-secondary)',
                  }}
                >
                  <DS.Icon name="info" size={14} style={{ marginTop: 2 }} />
                  <span>No modo demonstração o acesso não é criado. No servidor, email e senha viram o login do&nbsp;operador.</span>
                </div>
              ) : null}
            </div>
          </Modal>
          <Modal
            open={inv}
            onClose={function () {
              setInv(false);
            }}
            size="sm"
            title="Convidar operador"
            footer={
              <Button
                onClick={function () {
                  setInv(false);
                }}
              >
                Entendi
              </Button>
            }
          >
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>
              Para dar acesso a um operador, vá em <b style={{ fontWeight: 600 }}>Configurações → Acessos</b>, crie o login (email e senha) e vincule
              ao operador. Depois envie o endereço do painel e os dados de acesso para&nbsp;ele.
            </p>
          </Modal>
        </Card>
      </div>
    );
  }
  function GruposTab() {
    const { Card, DataTable, Button, Badge, IconButton, Select } = DS;
    const names = MS7.grupos;
    const [sel, setSel] = React.useState(names[0]);
    const members = MS7.operadores.slice(0, 4).map(function (o, i) {
      return {
        id: o.id,
        nome: o.nome,
        email: o.nome.toLowerCase().split(' ')[0] + '@ms7.com',
        perfil: i === 0 ? 'Admin' : 'Operador',
        ativo: o.ativo,
      };
    });
    return (
      <Grid min={300}>
        <Card
          title="Grupos"
          action={
            <IconButton
              icon="plus"
              variant="dark"
              size={30}
              iconSize={16}
              onClick={function () {
                toast('Grupo criado');
              }}
            />
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {names.map(function (n, i) {
              const on = n === sel;
              return (
                <button
                  key={n}
                  onClick={function () {
                    setSel(n);
                  }}
                  className={'ms7g-tpl' + (on ? ' is-on' : '')}
                  style={{ border: 'none', textAlign: 'left', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', width: '100%' }}
                >
                  <span className="ms7g-tile">
                    <DS.Icon name="users" size={15} />
                  </span>
                  <span className="ms7g-name" style={{ flex: 1 }}>
                    {n}
                  </span>
                  <DS.CountDot tone="muted">{4 - (i % 2)}</DS.CountDot>
                </button>
              );
            })}
          </div>
        </Card>
        <Card
          title={sel}
          action={
            <div style={{ display: 'flex', gap: 8 }}>
              <Select
                variant="pill"
                placeholder="Adicionar usuário"
                options={MS7.operadores.slice(4).map(function (o) {
                  return o.nome;
                })}
              />
            </div>
          }
        >
          <Hint>Grupos direcionam avisos e&nbsp;notificações.</Hint>
          <DataTable
            rows={members}
            columns={[
              {
                key: 'nome',
                label: 'Nome',
                render: function (r) {
                  return <span className="ms7g-name">{r.nome}</span>;
                },
              },
              { key: 'email', label: 'Email' },
              {
                key: 'perfil',
                label: 'Perfil',
                render: function (r) {
                  return (
                    <Badge size="sm" variant="soft" tone={r.perfil === 'Admin' ? 'purple' : 'blue'}>
                      {r.perfil}
                    </Badge>
                  );
                },
              },
              {
                key: 'ativo',
                label: 'Ativo',
                align: 'center',
                render: function (r) {
                  return r.ativo ? <DS.Icon name="check" size={16} color="var(--ms7-green)" /> : '—';
                },
              },
              {
                key: 'x',
                label: '',
                align: 'right',
                render: function () {
                  return <IconButton icon="user-minus" size={30} iconSize={16} />;
                },
              },
            ]}
          />
        </Card>
      </Grid>
    );
  }
  function PlataformasTab() {
    const { Card, Button, Input, Modal } = DS;
    const db = DB.useDB();
    const [v, setV] = React.useState({ plataformas: '', redes: '', grupo: '' });
    const [imp, setImp] = React.useState(null);
    const [txt, setTxt] = React.useState('');
    const [ed, setEd] = React.useState(null);
    const [gv, setGv] = React.useState('');
    const [nm, setNm] = React.useState('');
    const [sel, setSel] = React.useState(null);
    const tog = function (id) {
      setSel(function (s) {
        const ids = Object.assign({}, s.ids);
        if (ids[id]) delete ids[id];
        else ids[id] = 1;
        return { col: s.col, ids: ids };
      });
    };
    function Tools(col) {
      const on = sel && sel.col === col;
      const cnt = on ? Object.keys(sel.ids).length : 0;
      const all = db[col];
      if (!on)
        return (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Button
              size="sm"
              variant="outline"
              iconLeft="list-checks"
              disabled={!all.length}
              onClick={function () {
                setSel({ col: col, ids: {} });
              }}
            >
              Selecionar
            </Button>
            <Button
              size="sm"
              variant="outline"
              iconLeft="upload"
              onClick={function () {
                setTxt('');
                setImp(col);
              }}
            >
              Importar
            </Button>
          </div>
        );
      return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <Button
            size="sm"
            variant="ghost"
            iconLeft={cnt < all.length ? 'check-check' : 'x'}
            onClick={function () {
              const ids = {};
              if (cnt < all.length)
                all.forEach(function (x) {
                  ids[x.id] = 1;
                });
              setSel({ col: col, ids: ids });
            }}
          >
            {cnt < all.length ? 'Selecionar todas' : 'Limpar seleção'}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={function () {
              setSel(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            variant="danger"
            iconLeft="trash-2"
            disabled={!cnt}
            onClick={function () {
              const xs = all.filter(function (x) {
                return sel.ids[x.id];
              });
              const at = xs.reduce(function (a, x) {
                return a + uso(col, x.nome);
              }, 0);
              if (
                !confirm(
                  'Excluir ' +
                    cnt +
                    (col === 'redes' ? ' rede(s)' : ' plataforma(s)') +
                    '?\n\n' +
                    xs
                      .map(function (x) {
                        return x.nome;
                      })
                      .join(', ') +
                    (at ? '\n\nAtenção: ' + at + ' cooperação(ões) em andamento usam esses nomes.' : ''),
                )
              )
                return;
              xs.forEach(function (x) {
                DB.A.removeLista(col, x.id);
              });
              setSel(null);
              toast(cnt + ' excluída(s)');
            }}
          >
            {'Excluir' + (cnt ? ' (' + cnt + ')' : '')}
          </Button>
        </div>
      );
    }
    const set = function (k, x) {
      setV(function (o) {
        const n = Object.assign({}, o);
        n[k] = x;
        return n;
      });
    };
    const f = function (col) {
      return col === 'plataformas' ? 'plataforma' : 'rede';
    };
    const uso = function (col, n) {
      return db.coops.filter(function (c) {
        return c[f(col)] === n && (c.status === 'Em andamento' || c.status === 'Ativa');
      }).length;
    };
    const hist = function (col, n) {
      return db.coops.filter(function (c) {
        return c[f(col)] === n && !(c.status === 'Em andamento' || c.status === 'Ativa');
      }).length;
    };
    function remover(col, x) {
      const n = uso(col, x.nome),
        h = hist(col, x.nome);
      if (
        !confirm(
          'Remover ' +
            x.nome +
            '?' +
            (n ? '\n\nAtenção: ' + n + ' cooperação(ões) em andamento usam esse nome. Elas continuam existindo, só com esse nome antigo.' : '') +
            (h && !n ? '\n\nAs cooperações antigas continuam no histórico.' : ''),
        )
      )
        return;
      DB.A.removeLista(col, x.id);
    }
    function removerGrupo(n, ps) {
      if (
        !confirm(
          'Remover o grupo ' +
            n +
            ' e as plataformas ' +
            ps
              .map(function (p) {
                return p.nome;
              })
              .join(', ') +
            '? Cooperações finalizadas continuam no histórico.',
        )
      )
        return;
      ps.forEach(function (p) {
        DB.A.removeLista('plataformas', p.id);
      });
      toast('Grupo ' + n + ' removido');
    }
    function desagrupar(n, ps) {
      if (!confirm('Desfazer o grupo ' + n + '? As plataformas continuam, cada uma com chaves independentes.')) return;
      ps.forEach(function (p) {
        DB.A.setPlataformaGrupo(p.id, '');
      });
    }
    function Chip(p) {
      const x = p.x,
        col = p.col;
      const n = uso(col, x.nome);
      if (sel && sel.col === col) {
        const ck = !!sel.ids[x.id];
        return (
          <button
            type="button"
            onClick={function () {
              tog(x.id);
            }}
            className={'ms7g-chip is-sel' + (ck ? ' is-on' : '')}
            aria-pressed={ck}
          >
            <DS.Icon name={ck ? 'square-check' : 'square'} size={15} strokeWidth={2} />
            {x.nome}
          </button>
        );
      }
      return (
        <span className="ms7g-chip">
          <span className="ms7g-chip-ico">
            <DS.Icon name={p.icon} size={14} />
          </span>
          {x.nome}
          {n ? (
            <DS.CountDot tone="muted" style={{ height: 20, borderRadius: 10, padding: '0 7px', fontSize: 10.5 }}>
              <span title="Cooperações em andamento">{n + ' ativa' + (n > 1 ? 's' : '')}</span>
            </DS.CountDot>
          ) : null}
          {col === 'plataformas' ? (
            <button
              type="button"
              onClick={function () {
                setGv(x.grupo || '');
                setNm(x.nome);
                setEd(x);
              }}
              aria-label="Editar"
              title="Renomear ou mudar grupo"
              className="ms7g-chip-x"
            >
              <DS.Icon name="layers" size={12} strokeWidth={2} />
            </button>
          ) : null}
          <button
            type="button"
            onClick={function () {
              remover(col, x);
            }}
            aria-label="Remover"
            title={n ? n + ' em andamento' : 'Remover'}
            className="ms7g-chip-x"
          >
            <DS.Icon name="x" size={12} strokeWidth={2} />
          </button>
        </span>
      );
    }
    const gps = PIXV.grupos(db);
    return (
      <React.Fragment>
        <Grid min={300}>
          <Card
            title={
              <React.Fragment>
                <Emo e="🌐" />
                Redes
              </React.Fragment>
            }
            action={Tools('redes')}
          >
            <Hint>Redes que aparecem na Nova cooperação. A plataforma não fica salva: você digita o nome dela em cada&nbsp;cooperação.</Hint>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                <Input
                  placeholder="Nova rede"
                  icon="network"
                  value={v.redes}
                  onChange={function (e) {
                    set('redes', e.target.value);
                  }}
                />
              </div>
              <Button
                variant="brand"
                iconLeft="plus"
                onClick={function () {
                  DB.A.addLista('redes', v.redes);
                  set('redes', '');
                }}
              >
                Adicionar
              </Button>
            </div>
            {db.redes.length ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {db.redes.map(function (x) {
                  return <Chip key={x.id} x={x} col="redes" icon="network" />;
                })}
              </div>
            ) : (
              <Empty
                art="Globe"
                compact
                title="Nenhuma rede cadastrada"
                sub="Digite o nome acima e clique em Adicionar, ou importe uma lista inteira de uma&nbsp;vez."
                action={
                  <Button
                    variant="outline"
                    iconLeft="upload"
                    onClick={function () {
                      setTxt('');
                      setImp('redes');
                    }}
                  >
                    Importar lista
                  </Button>
                }
              />
            )}
          </Card>
        </Grid>
        <Modal
          open={!!ed}
          onClose={function () {
            setEd(null);
          }}
          size="sm"
          title={ed ? 'Editar ' + ed.nome : ''}
          footer={
            <React.Fragment>
              <Button
                variant="secondary"
                onClick={function () {
                  setEd(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="brand"
                iconLeft="check"
                onClick={function () {
                  if (String(nm).trim() && nm.trim() !== ed.nome) DB.A.renamePlataforma(ed.id, nm);
                  DB.A.setPlataformaGrupo(ed.id, gv);
                  setEd(null);
                }}
              >
                Salvar
              </Button>
            </React.Fragment>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input
              label="Nome da plataforma"
              value={nm}
              onChange={function (e) {
                setNm(e.target.value);
              }}
              hint="Renomear atualiza as cooperações e os lotes de chaves que usam esse nome"
            />
            <Input
              label="Grupo de plataformas"
              placeholder="ex: Equipe 771"
              value={gv}
              onChange={function (e) {
                setGv(e.target.value);
              }}
              hint="Em branco = chaves independentes só para esta plataforma"
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {gps
                .filter(function (n) {
                  return db.plataformas.some(function (p) {
                    return p.grupo === n;
                  });
                })
                .map(function (n) {
                  return (
                    <Button
                      key={n}
                      size="sm"
                      variant={gv === n ? 'primary' : 'secondary'}
                      onClick={function () {
                        setGv(n);
                      }}
                    >
                      {n}
                    </Button>
                  );
                })}
            </div>
          </div>
        </Modal>
        <Modal
          open={!!imp}
          onClose={function () {
            setImp(null);
          }}
          title={'Importar ' + (imp === 'redes' ? 'redes' : 'plataformas')}
          subtitle="Cole a lista e cada linha vira um item"
          footer={
            <React.Fragment>
              <Button
                variant="secondary"
                onClick={function () {
                  setImp(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="brand"
                iconLeft="upload"
                onClick={function () {
                  txt.split(/\n|;/).forEach(function (l) {
                    const p = l.split('|');
                    if (p[0].trim()) DB.A.addLista(imp, p[0], imp === 'plataformas' ? { grupo: (p[1] || '').trim() } : null);
                  });
                  setImp(null);
                }}
              >
                Importar
              </Button>
            </React.Fragment>
          }
        >
          <Input
            label={imp === 'plataformas' ? 'Uma por linha — opcional: Plataforma | Grupo' : 'Um nome por linha'}
            multiline
            rows={8}
            placeholder={imp === 'plataformas' ? 'Vértice | Grupo KF\nArena7 | Equipe 771' : ''}
            value={txt}
            onChange={function (e) {
              setTxt(e.target.value);
            }}
          />
        </Modal>
      </React.Fragment>
    );
  }
  const CONF_PIX_ATIVA = true; // Conferência de saques desligada por enquanto: troque para true para voltar
  function PixTab() {
    if (!CONF_PIX_ATIVA) return <PixManager />;
    const [t, setT] = React.useState(function () {
      return localStorage.getItem('ms7op-pix-aba') || 'chaves';
    });
    const ch = function (v) {
      setT(v);
      localStorage.setItem('ms7op-pix-aba', v);
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <DS.Tabs
          variant="dark"
          value={t}
          onChange={ch}
          items={[
            { id: 'chaves', label: 'Chaves', icon: 'key-round' },
            { id: 'conf', label: 'Conferência de saques', icon: 'badge-check' },
          ]}
          style={{ maxWidth: 440 }}
        />
        {t === 'conf' ? <ConferenciaPix /> : <PixManager />}
      </div>
    );
  }
  function MetasTab() {
    const { Card, Button, Modal, Input, Select, IconButton, Badge } = DS;
    const [open, setOpen] = React.useState(false);
    const metas = [
      { nome: 'Meta coletiva de setembro', alvo: 250000, atual: 197060, tipo: 'Resultado', rec: 'Bônus de 2% na comissão' },
      { nome: '100 cooperações no mês', alvo: 100, atual: 74, tipo: 'Cooperações', rec: 'Jantar da equipe' },
      { nome: 'Depositantes novos', alvo: 2000, atual: 1746, tipo: 'Depositantes', rec: 'R$ 500 para o top 3' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="brand"
            iconLeft="plus"
            onClick={function () {
              setOpen(true);
            }}
          >
            Nova meta
          </Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
          {metas.map(function (m) {
            const p = Math.min(100, Math.round((m.atual / m.alvo) * 100));
            const money = m.tipo === 'Resultado';
            return (
              <Card key={m.nome}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span className="ms7g-tile" style={{ width: 36, height: 36, borderRadius: 10 }}>
                    <DS.Icon name="target" size={18} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.015em' }}>{m.nome}</div>
                    <div className="ms7g-sub">{m.tipo}</div>
                  </div>
                  <IconButton icon="pencil" size={28} iconSize={14} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '16px 0 6px' }}>
                  <span className="ms7-num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em' }}>
                    {money ? MS7.brlK(m.atual) : MS7.num(m.atual)}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
                    {'de ' + (money ? MS7.brlK(m.alvo) : MS7.num(m.alvo))}
                  </span>
                </div>
                <div className="ms7-bar">
                  <i style={{ width: p + '%' }}></i>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, gap: 8 }}>
                  <Badge size="sm" variant="soft" tone="purple">
                    {m.rec}
                  </Badge>
                  <span className="ms7-num" style={{ fontSize: 13, fontWeight: 600 }}>
                    {p + '%'}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
        <Modal
          open={open}
          onClose={function () {
            setOpen(false);
          }}
          title="Nova meta"
          footer={
            <React.Fragment>
              <Button
                variant="secondary"
                onClick={function () {
                  setOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="brand"
                onClick={function () {
                  setOpen(false);
                  toast('Meta criada');
                }}
              >
                Salvar
              </Button>
            </React.Fragment>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <Input label="Nome da meta" required />
            </div>
            <Input label="Valor alvo" required prefix="R$" />
            <Select label="Tipo de métrica" options={['Resultado', 'Cooperações', 'Depositantes', 'Comissão']} />
            <div style={{ gridColumn: '1 / -1' }}>
              <Input label="Descrição da recompensa" multiline rows={2} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  function CuponsTab() {
    const { Card, Button, Input, Badge, IconButton, Switch } = DS;
    const on = DB.Sync.on();
    const [L, setL] = React.useState(
      on
        ? null
        : {
            produtos: MS7.proxyProdutos.map(function (p) {
              return Object.assign({ ativo: true }, p);
            }),
            cupons: [],
          },
    );
    const [peds, setPeds] = React.useState([]);
    const [sujo, setSujo] = React.useState(false);
    function load() {
      if (!on) return;
      DB.Sync.api('/api/loja')
        .then(function (r) {
          setL({ produtos: r.produtos || [], cupons: r.cupons || [] });
          setSujo(false);
        })
        .catch(function (e) {
          toast(e.message || 'Erro ao carregar a loja');
        });
      DB.Sync.api('/api/pix?tipo=loja&todos=1')
        .then(setPeds)
        .catch(function () {});
    }
    React.useEffect(load, []);
    if (!L)
      return (
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="ms7-skeleton" style={{ height: 36, width: '60%' }}></div>
            <div className="ms7-skeleton" style={{ height: 36 }}></div>
            <div className="ms7-skeleton" style={{ height: 36 }}></div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Carregando…</div>
          </div>
        </Card>
      );
    const upd = function (k, idx, campo, v) {
      setL(function (o) {
        const n = { produtos: o.produtos.slice(), cupons: o.cupons.slice() };
        n[k][idx] = Object.assign({}, n[k][idx]);
        n[k][idx][campo] = v;
        return n;
      });
      setSujo(true);
    };
    const add = function (k, x) {
      setL(function (o) {
        const n = { produtos: o.produtos.slice(), cupons: o.cupons.slice() };
        n[k].push(x);
        return n;
      });
      setSujo(true);
    };
    const del = function (k, idx) {
      setL(function (o) {
        const n = { produtos: o.produtos.slice(), cupons: o.cupons.slice() };
        n[k].splice(idx, 1);
        return n;
      });
      setSujo(true);
    };
    function salvar() {
      const body = {
        produtos: L.produtos.map(function (p) {
          return Object.assign({}, p, { preco: parseFloat(String(p.preco).replace(',', '.')) || 0 });
        }),
        cupons: L.cupons.map(function (c) {
          return Object.assign({}, c, { pct: parseFloat(String(c.pct).replace(',', '.')) || 0 });
        }),
      };
      if (!on) {
        setSujo(false);
        toast('Salvo (prévia)');
        return;
      }
      DB.Sync.api('/api/loja', { method: 'PUT', body: JSON.stringify(body) })
        .then(function (r) {
          setL({ produtos: r.produtos, cupons: r.cupons });
          setSujo(false);
          toast('Loja salva');
        })
        .catch(function (e) {
          toast(e.message || 'Erro ao salvar');
        });
    }
    const pagos = peds.filter(function (p) {
      return p.status === 'approved';
    });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span className="ms7g-tile" style={{ width: 38, height: 38, borderRadius: 11 }}>
            <DS.Icon name="store" size={18} />
          </span>
          <div style={{ flex: '1 1 260px', minWidth: 0, fontSize: 13.5, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
            Produtos e cupons que aparecem em Proxies → Comprar. O pagamento é PIX do Mercado Pago (copia e cola). A entrega automática no site
            Marcelo Proxies será ligada&nbsp;depois.
          </div>
          <Button variant="brand" iconLeft="check" disabled={!sujo} onClick={salvar}>
            Salvar loja
          </Button>
        </div>
        <Card
          title={
            <React.Fragment>
              <Emo e="🛒" />
              Produtos
            </React.Fragment>
          }
          subtitle={L.produtos.length + (L.produtos.length === 1 ? ' produto' : ' produtos')}
          action={
            <Button
              size="sm"
              variant="outline"
              iconLeft="plus"
              onClick={function () {
                add('produtos', { id: 'pr' + Date.now(), nome: '', desc: '', preco: '', ativo: true });
              }}
            >
              Produto
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {L.produtos.length ? (
              <div className="ms7g-prod is-head">
                <span className="ms7-eyebrow">Nome</span>
                <span className="ms7-eyebrow">Descrição</span>
                <span className="ms7-eyebrow">Preço</span>
                <span className="ms7-eyebrow">Ativo</span>
                <span></span>
              </div>
            ) : null}
            {L.produtos.map(function (p, ix) {
              return (
                <div key={p.id} className="ms7g-prod">
                  <input
                    aria-label="Nome"
                    placeholder="Nome"
                    value={p.nome}
                    onChange={function (e) {
                      upd('produtos', ix, 'nome', e.target.value);
                    }}
                    className="ms7g-cell"
                  />
                  <input
                    aria-label="Descrição"
                    placeholder="Descrição"
                    value={p.desc || ''}
                    onChange={function (e) {
                      upd('produtos', ix, 'desc', e.target.value);
                    }}
                    className="ms7g-cell"
                  />
                  <div className="ms7g-money">
                    <span>R$</span>
                    <input
                      aria-label="Preço"
                      placeholder="Preço"
                      inputMode="decimal"
                      value={p.preco}
                      onChange={function (e) {
                        upd('produtos', ix, 'preco', e.target.value);
                      }}
                      className="ms7g-cell ms7-num"
                    />
                  </div>
                  <Switch
                    checked={p.ativo !== false}
                    onChange={function (v) {
                      upd('produtos', ix, 'ativo', v);
                    }}
                  />
                  <IconButton
                    icon="trash-2"
                    size={32}
                    iconSize={15}
                    label="Apagar"
                    onClick={function () {
                      del('produtos', ix);
                    }}
                  />
                </div>
              );
            })}
            {!L.produtos.length ? (
              <Empty
                art="Wallet"
                emoji="🛒"
                compact
                title="Nenhum produto"
                sub="Coloque o primeiro item na loja: nome, descrição e&nbsp;preço."
                action={
                  <Button
                    variant="outline"
                    iconLeft="plus"
                    onClick={function () {
                      add('produtos', { id: 'pr' + Date.now(), nome: '', desc: '', preco: '', ativo: true });
                    }}
                  >
                    Produto
                  </Button>
                }
              />
            ) : null}
          </div>
        </Card>
        <Card
          title={
            <React.Fragment>
              <Emo e="🎟️" />
              Cupons
            </React.Fragment>
          }
          subtitle={L.cupons.length ? L.cupons.length + (L.cupons.length === 1 ? ' cupom' : ' cupons') : 'Descontos em % para a loja'}
          action={
            <Button
              size="sm"
              variant="outline"
              iconLeft="plus"
              onClick={function () {
                add('cupons', { codigo: '', pct: '10', validade: '', limite: 0, usos: 0, ativo: true });
              }}
            >
              Cupom
            </Button>
          }
        >
          <div className="ms7g-scroll">
            {L.cupons.length ? (
              <div className="ms7g-cup">
                <span className="ms7-eyebrow">Código</span>
                <span className="ms7-eyebrow">% desc.</span>
                <span className="ms7-eyebrow">Validade</span>
                <span className="ms7-eyebrow">Limite</span>
                <span className="ms7-eyebrow" style={{ textAlign: 'center' }}>
                  Usos
                </span>
                <span className="ms7-eyebrow">Ativo</span>
                <span></span>
              </div>
            ) : null}
            {L.cupons.map(function (c, ix) {
              return (
                <div key={ix} className="ms7g-cup">
                  <input
                    aria-label="Código"
                    placeholder="EX: MS7VIP"
                    value={c.codigo}
                    onChange={function (e) {
                      upd('cupons', ix, 'codigo', e.target.value.toUpperCase());
                    }}
                    className="ms7g-cell"
                    style={{ fontFamily: 'var(--font-mono)', letterSpacing: '.04em' }}
                  />
                  <input
                    aria-label="% de desconto"
                    inputMode="decimal"
                    value={c.pct}
                    onChange={function (e) {
                      upd('cupons', ix, 'pct', e.target.value);
                    }}
                    className="ms7g-cell ms7-num"
                  />
                  <input
                    aria-label="Validade"
                    type="date"
                    value={c.validade || ''}
                    onChange={function (e) {
                      upd('cupons', ix, 'validade', e.target.value);
                    }}
                    className="ms7g-cell"
                  />
                  <input
                    aria-label="Limite de usos"
                    inputMode="numeric"
                    placeholder="0 = sem"
                    value={c.limite || ''}
                    onChange={function (e) {
                      upd('cupons', ix, 'limite', e.target.value.replace(/\D/g, ''));
                    }}
                    className="ms7g-cell ms7-num"
                  />
                  <span className="ms7-num" style={{ fontSize: 13, fontWeight: 600, textAlign: 'center' }}>
                    {c.usos || 0}
                  </span>
                  <Switch
                    checked={c.ativo !== false}
                    onChange={function (v) {
                      upd('cupons', ix, 'ativo', v);
                    }}
                  />
                  <IconButton
                    icon="trash-2"
                    size={32}
                    iconSize={15}
                    label="Apagar"
                    onClick={function () {
                      del('cupons', ix);
                    }}
                  />
                </div>
              );
            })}
            {!L.cupons.length ? (
              <Empty
                art="Wallet"
                emoji="🎟️"
                compact
                title="Nenhum cupom"
                sub="Crie um código de desconto em % para usar na&nbsp;loja."
                action={
                  <Button
                    variant="outline"
                    iconLeft="plus"
                    onClick={function () {
                      add('cupons', { codigo: '', pct: '10', validade: '', limite: 0, usos: 0, ativo: true });
                    }}
                  >
                    Cupom
                  </Button>
                }
              />
            ) : null}
          </div>
        </Card>
        {on ? (
          <Card
            title={
              <React.Fragment>
                <Emo e="🧾" />
                Pedidos pagos
              </React.Fragment>
            }
            subtitle={pagos.length + (pagos.length === 1 ? ' pedido pago' : ' pedidos pagos')}
            reveal
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {pagos.length ? (
                pagos.map(function (p) {
                  return (
                    <div key={p.id} className="ms7g-line">
                      <span className="ms7g-tile">
                        <DS.Icon name="shopping-bag" size={15} />
                      </span>
                      <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                        <div className="ms7g-name">
                          {(p.itens || [])
                            .map(function (x) {
                              return x.qtd + 'x ' + x.nome;
                            })
                            .join(', ')}
                        </div>
                        <div className="ms7g-sub" style={{ marginTop: 2 }}>
                          {p.email + ' · ' + new Date(p.criado).toLocaleString('pt-BR') + (p.cupom ? ' · cupom ' + p.cupom : '')}
                        </div>
                      </div>
                      <Money v={p.valor} />
                      {p.entregue ? (
                        <Badge size="sm" variant="soft" tone="green">
                          Entregue
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          iconLeft="check"
                          onClick={function () {
                            DB.Sync.api('/api/pix/' + p.id + '/entregue', { method: 'POST', body: '{}' }).then(function () {
                              toast('Marcado como entregue');
                              load();
                            });
                          }}
                        >
                          Marcar entregue
                        </Button>
                      )}
                    </div>
                  );
                })
              ) : (
                <Empty art="Wallet" emoji="🧾" compact title="Nenhum pedido pago ainda" sub="Os pedidos pagos via PIX na loja aparecem aqui para você marcar a&nbsp;entrega." />
              )}
            </div>
          </Card>
        ) : null}
      </div>
    );
  }
  function RankingTab() {
    const { Card, Tabs, DataTable, Badge } = DS;
    const [t, setT] = React.useState('op');
    const rows = (
      t === 'op'
        ? MS7.operadores.map(function (o) {
            return { nome: o.nome, v: o.resultado, x: o.coops + ' coops' };
          })
        : MS7.alunos.map(function (a) {
            return { nome: a.nome, v: a.resultado, x: a.contas + ' contas' };
          })
    )
      .sort(function (a, b) {
        return b.v - a.v;
      })
      .map(function (r, i) {
        return Object.assign({ pos: i + 1 }, r);
      });
    const top = rows.slice(0, 3);
    return (
      <Card
        title={
          <React.Fragment>
            <Emo e="🏆" />
            Ranking
          </React.Fragment>
        }
        subtitle={'Por resultado · ' + (t === 'op' ? 'operadores' : 'alunos')}
        action={
          <Tabs
            variant="chips"
            value={t}
            onChange={setT}
            items={[
              { id: 'op', label: 'Operadores' },
              { id: 'al', label: 'Alunos' },
            ]}
          />
        }
      >
        {top.length ? (
          <div className="ms7g-podio ms7-stagger" key={t}>
            {top.map(function (r) {
              return (
                <div key={r.nome} className={'ms7g-podio-it' + (r.pos === 1 ? ' is-1' : '')}>
                  <div className="ms7g-podio-top">
                    <span className={'ms7g-pos' + (r.pos === 1 ? ' is-1' : '')}>{String(r.pos).padStart(2, '0')}</span>
                    <DS.Avatar name={r.nome} size={32} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div className="ms7g-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {r.nome}
                      </div>
                      <div className="ms7g-sub">{r.x}</div>
                    </div>
                    {r.pos === 1 ? (
                      <Badge size="sm" tone="lime">
                        Líder
                      </Badge>
                    ) : null}
                  </div>
                  <span className={'ms7g-podio-val ms7-num' + (r.v < 0 ? ' is-neg' : '')}>{MS7.brl(r.v)}</span>
                </div>
              );
            })}
          </div>
        ) : null}
        <DataTable
          rows={rows}
          rowKey="nome"
          columns={[
            {
              key: 'pos',
              label: '#',
              width: 60,
              render: function (r) {
                return <span className={'ms7g-pos' + (r.pos === 1 ? ' is-1' : r.pos <= 3 ? '' : ' is-rest')}>{String(r.pos).padStart(2, '0')}</span>;
              },
            },
            {
              key: 'nome',
              label: 'Nome',
              render: function (r) {
                return (
                  <span className="ms7g-name" style={{ whiteSpace: 'nowrap' }}>
                    {r.nome}
                  </span>
                );
              },
            },
            {
              key: 'x',
              label: 'Volume',
              render: function (r) {
                return <span style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{r.x}</span>;
              },
            },
            {
              key: 'v',
              label: 'Resultado',
              align: 'right',
              render: function (r) {
                return (
                  <span style={{ whiteSpace: 'nowrap' }}>
                    <Money v={r.v} signed />
                  </span>
                );
              },
            },
            {
              key: 'b',
              label: '',
              align: 'right',
              width: 90,
              render: function (r) {
                return r.pos === 1 ? (
                  <Badge size="sm" tone="lime">
                    Líder
                  </Badge>
                ) : null;
              },
            },
          ]}
        />
      </Card>
    );
  }
  function NotificacoesTab() {
    const { Card, Switch, Input, Select, Button } = DS;
    const [tpl, setTpl] = React.useState([
      { id: 1, nome: 'Conta importada', on: true, para: 'Operador responsável', txt: 'Nova conta {usuario} importada na cooperação {cooperacao}.' },
      { id: 2, nome: 'Cooperação concluída', on: true, para: 'Admins', txt: 'A cooperação {cooperacao} foi concluída com resultado {resultado}.' },
      { id: 3, nome: 'Chave PIX esgotando', on: false, para: 'Admins', txt: 'O grupo {grupo} tem apenas {disponiveis} chaves disponíveis.' },
      { id: 4, nome: 'Pagamento de assinatura', on: true, para: 'Dono da conta', txt: 'Sua assinatura vence em {dias} dias. Valor: {valor}.' },
    ]);
    const [sel, setSel] = React.useState(1);
    const cur = tpl.find(function (t) {
      return t.id === sel;
    });
    const ICONS = { 1: 'user-plus', 2: 'flag', 3: 'key-round', 4: 'credit-card' };
    return (
      <Grid min={300}>
        <Card
          title={
            <React.Fragment>
              <Emo e="🔔" />
              Modelos
            </React.Fragment>
          }
          subtitle="Ligue, desligue e escolha qual editar"
          padding={16}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tpl.map(function (t) {
              const on = t.id === sel;
              return (
                <div
                  key={t.id}
                  onClick={function () {
                    setSel(t.id);
                  }}
                  className={'ms7g-tpl' + (on ? ' is-on' : '')}
                >
                  <span className="ms7g-tile">
                    <DS.Icon name={ICONS[t.id] || 'bell'} size={15} />
                  </span>
                  <span className="ms7g-name" style={{ flex: 1, minWidth: 0 }}>
                    {t.nome}
                  </span>
                  <span
                    onClick={function (e) {
                      e.stopPropagation();
                    }}
                    style={{ display: 'inline-flex' }}
                  >
                    <Switch
                      checked={t.on}
                      onChange={function (v) {
                        setTpl(
                          tpl.map(function (x) {
                            return x.id === t.id ? Object.assign({}, x, { on: v }) : x;
                          }),
                        );
                      }}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
        <Card
          title={cur.nome}
          icon={
            <span className="ms7g-tile">
              <DS.Icon name={ICONS[cur.id] || 'bell'} size={15} />
            </span>
          }
          action={
            <DS.Badge size="sm" variant="soft" tone={cur.on ? 'green' : 'gray'}>
              {cur.on ? 'Ativa' : 'Desativada'}
            </DS.Badge>
          }
        >
          <Hint>Personalize o texto de cada notificação, ative ou desative e defina quem recebe cada&nbsp;alerta.</Hint>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Select
              label="Quem recebe"
              value={cur.para}
              onChange={function (e) {
                setTpl(
                  tpl.map(function (x) {
                    return x.id === cur.id ? Object.assign({}, x, { para: e.target.value }) : x;
                  }),
                );
              }}
              options={['Operador responsável', 'Admins', 'Dono da conta', 'Todos os usuários']}
            />
            <Input
              key={cur.id}
              label="Mensagem"
              multiline
              rows={4}
              defaultValue={cur.txt}
              hint="Use {variavel} para inserir dados automaticamente."
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
              <Button
                variant="outline"
                iconLeft="send"
                onClick={function () {
                  toast('Teste enviado');
                }}
              >
                Enviar teste
              </Button>
              <Button
                variant="brand"
                iconLeft="check"
                onClick={function () {
                  toast('Modelo salvo');
                }}
              >
                Salvar
              </Button>
            </div>
          </div>
        </Card>
      </Grid>
    );
  }
  window.getPixGrupos = function () {
    try {
      return (DB.get().pix || []).filter(function (g) {
        return g.ativo !== false;
      });
    } catch (e) {
      return [];
    }
  };
  Object.assign(window, {
    OperadoresTab: OperadoresTab,
    GruposTab: GruposTab,
    PlataformasTab: PlataformasTab,
    PixTab: PixTab,
    MetasTab: MetasTab,
    CuponsTab: CuponsTab,
    RankingTab: RankingTab,
    NotificacoesTab: NotificacoesTab,
  });
})();
