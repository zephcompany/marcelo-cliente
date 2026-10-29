(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const TZ = 'America/Sao_Paulo';
  (function () {
    const CSS = [
      '@keyframes ms7tIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
      '@keyframes ms7tPop{0%{transform:scale(.7)}55%{transform:scale(1.12)}100%{transform:scale(1)}}',
      '.ms7t-wrap{display:flex;flex-direction:column;gap:24px;width:100%;max-width:980px;margin:0 auto}',
      '.ms7t-hero{display:flex;align-items:center;gap:24px;flex-wrap:wrap}',
      '.ms7t-hero-main{flex:1 1 260px;min-width:0;display:flex;align-items:center;gap:16px}',
      '.ms7t-ring{flex-shrink:0;display:block}',
      '.ms7t-ring .track{stroke:var(--line)}',
      '.ms7t-ring .fill{stroke:var(--ms7-green-900);transition:stroke-dashoffset 600ms var(--ease-out)}',
      '.ms7t-date{font-size:13px;font-weight:500;color:var(--text-secondary)}',
      '.ms7t-h{font-size:24px;font-weight:600;letter-spacing:-.03em;line-height:1.1;margin-top:3px}',
      '.ms7t-facts{display:flex;gap:28px;flex-wrap:wrap}',
      '.ms7t-fact-v{font-size:20px;font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-top:4px}',
      '.ms7t-new{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;align-items:center}',
      '.ms7t-new .ms7-field{flex:1 1 260px;min-width:0}',
      '.ms7t-opts{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;align-items:center}',
      '.ms7t-opts .ms7-field{flex:0 1 auto}',
      '.ms7t-tip{font-size:12.5px;font-weight:500;color:var(--text-secondary);flex-basis:100%;margin-top:4px}',
      '.ms7t-sec{display:flex;flex-direction:column;gap:10px}',
      '.ms7t-sec-head{display:flex;align-items:center;gap:10px;padding:0 4px}',
      '.ms7t-sec-head .dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}',
      '.ms7t-sec-head .n{font-size:11px;font-weight:600;color:var(--text-secondary);font-variant-numeric:tabular-nums}',
      '.ms7t-sec-head .ln{flex:1;height:1px;background:var(--line)}',
      '.ms7t-list{padding:6px}',
      '.ms7t-row{display:flex;align-items:center;gap:14px;padding:11px 12px;border-radius:10px;animation:ms7tIn .24s var(--ease-out) both;transition:background var(--dur-fast)}',
      '.ms7t-row+.ms7t-row{border-top:1px solid var(--border-subtle)}',
      '.ms7t-row:hover{background:var(--surface-muted);border-top-color:transparent}',
      '.ms7t-row:hover+.ms7t-row{border-top-color:transparent}',
      '.ms7t-row:hover .ms7t-act,.ms7t-row:focus-within .ms7t-act{opacity:1}',
      '.ms7t-act{display:flex;gap:2px;flex-shrink:0;opacity:0;transition:opacity var(--dur-fast)}',
      '@media (hover:none){.ms7t-act{opacity:1}}',
      '.ms7t-chk{width:22px;height:22px;flex-shrink:0;border-radius:50%;border:1.5px solid var(--line-strong);background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;color:var(--text-inverse);transition:background var(--dur-fast),border-color var(--dur-fast),transform var(--dur-fast)}',
      '.ms7t-chk:hover{border-color:var(--ms7-green)}',
      '.ms7t-chk.is-urg{border-color:var(--ms7-error)}',
      '.ms7t-chk.is-on{background:var(--ms7-green);border-color:var(--ms7-green);animation:ms7tPop .32s var(--ease-spring) both}',
      '.ms7t-chk.is-on svg path{stroke-dasharray:22;stroke-dashoffset:22;animation:ms7-check 280ms var(--ease-out) 60ms forwards}',
      '.ms7t-chk:active{transform:scale(.9)}',
      '.ms7t-txt{flex:1;min-width:0;border:0;background:transparent;padding:0;text-align:left;cursor:pointer;color:var(--text-primary);font-family:inherit}',
      '.ms7t-t{font-size:14px;font-weight:500;line-height:1.4;word-break:break-word;text-wrap:balance;transition:color var(--dur-fast)}',
      '.ms7t-t.is-done{text-decoration:line-through;text-decoration-color:var(--line-strong);color:var(--text-secondary)}',
      '.ms7t-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:5px;align-items:center}',
      '.ms7t-obs{font-size:12.5px;font-weight:500;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}',
      '.ms7t-grp{display:flex;align-items:center;gap:8px;padding:12px 0 6px}',
      '.ms7t-fix{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--border-subtle)}',
      '.ms7t-fix .nm{flex:1;min-width:0;font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:flex;align-items:center;gap:8px}',
      '.ms7t-fix .when{font-size:12.5px;font-weight:500;color:var(--text-secondary);white-space:nowrap}',
      '.ms7t-day{height:30px;min-width:40px;padding:0 10px;border-radius:999px;border:1px solid var(--line);background:var(--surface-card);color:var(--text-primary);font-family:inherit;font-size:12.5px;font-weight:600;cursor:pointer;transition:background var(--dur-fast),border-color var(--dur-fast),color var(--dur-fast)}',
      '.ms7t-day:hover{border-color:var(--line-strong)}',
      '.ms7t-day.is-on{background:var(--ms7-green-900);border-color:var(--ms7-green-900);color:var(--text-inverse)}',
      '@media (max-width:640px){.ms7t-h{font-size:21px}.ms7t-facts{gap:18px}.ms7t-fix{flex-wrap:wrap}.ms7t-fix .nm{flex:1 1 calc(100% - 100px);white-space:normal}.ms7t-fix .when{flex-basis:100%;order:9;padding-left:17px;margin-top:-4px}}',
    ].join('');
    let s = document.getElementById('ms7-tarefas-css');
    if (!s) {
      s = document.createElement('style');
      s.id = 'ms7-tarefas-css';
      document.head.appendChild(s);
    }
    s.textContent = CSS;
  })();
  const hojeISO = function () {
    return new Date().toLocaleDateString('sv-SE', { timeZone: TZ });
  };
  const addD = function (s, n) {
    const d = new Date(s + 'T12:00:00');
    d.setDate(d.getDate() + n);
    return d.toLocaleDateString('sv-SE');
  };
  const SEM = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const SEM_L = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const dm = function (s) {
    return s ? s.slice(8) + '/' + s.slice(5, 7) : '';
  };
  const diaL = function (s) {
    const h = hojeISO();
    if (s === h) return 'Hoje';
    if (s === addD(h, 1)) return 'Amanhã';
    if (s === addD(h, -1)) return 'Ontem';
    return SEM_L[new Date(s + 'T12:00:00').getDay()] + ' ' + dm(s);
  };
  function vale(t, dia) {
    if (t.rep === 'diaria') {
      if (t.data && dia < t.data) return false;
      const dw = new Date(dia + 'T12:00:00').getDay();
      return !t.dias || !t.dias.length || t.dias.indexOf(dw) >= 0;
    }
    return t.data === dia;
  }
  function feita(t, dia) {
    return t.rep === 'diaria' ? !!(t.feitos && t.feitos[dia]) : !!t.feitoEm;
  }
  const respDe = function (t) {
    return t.resp || 'admin';
  };
  function respNome(id) {
    if (id === 'admin') return 'Gestão';
    return DB.opName(id) || 'Operador';
  }
  const ordem = function (dia) {
    return function (a, b) {
      const fa = feita(a, dia),
        fb = feita(b, dia);
      if (fa !== fb) return fa ? 1 : -1;
      const ua = a.prio === 'urgente',
        ub = b.prio === 'urgente';
      if (ua !== ub) return ua ? -1 : 1;
      const ha = a.hora || '99',
        hb = b.hora || '99';
      if (ha !== hb) return ha < hb ? -1 : 1;
      return (a.criada || 0) - (b.criada || 0);
    };
  };

  function Check({ on, onClick, urg }) {
    return (
      <button
        type="button"
        className={'ms7t-chk' + (on ? ' is-on' : '') + (urg ? ' is-urg' : '')}
        onClick={onClick}
        aria-label={on ? 'Desmarcar' : 'Marcar como feita'}
      >
        {on ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        ) : null}
      </button>
    );
  }
  function DiasPick({ value, onChange }) {
    const v = value || [];
    return (
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {SEM.map(function (n, i) {
          const on = !v.length || v.indexOf(i) >= 0;
          return (
            <button
              key={i}
              type="button"
              className={'ms7t-day' + (on ? ' is-on' : '')}
              onClick={function () {
                let nv = v.length ? v.slice() : [0, 1, 2, 3, 4, 5, 6];
                nv =
                  nv.indexOf(i) >= 0
                    ? nv.filter(function (x) {
                        return x !== i;
                      })
                    : nv.concat([i]).sort();
                onChange(nv.length === 7 ? [] : nv);
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
    );
  }
  function Seg({ value, onChange, items }) {
    return (
      <DS.Tabs
        variant="chips"
        value={value}
        onChange={onChange}
        items={items.map(function (o) {
          return { id: o[0], label: o[1] };
        })}
      />
    );
  }

  function Editor({ t, isOp, ops, onSave, onClose }) {
    const [f, setF] = React.useState(
      Object.assign({ txt: '', rep: 'uma', data: hojeISO(), dias: [], obs: '', hora: '', prio: 'normal', resp: 'admin' }, t, {
        resp: respDe(t),
        prio: t.prio || 'normal',
      }),
    );
    const set = function (k, v) {
      setF(function (o) {
        const n = Object.assign({}, o);
        n[k] = v;
        return n;
      });
    };
    return (
      <DS.Modal
        open={true}
        onClose={onClose}
        title={t.id ? 'Editar tarefa' : 'Nova tarefa'}
        footer={
          <React.Fragment>
            <DS.Button variant="secondary" onClick={onClose}>
              Cancelar
            </DS.Button>
            <DS.Button
              variant="brand"
              iconLeft="check"
              onClick={function () {
                if (!String(f.txt).trim()) {
                  toast('Escreva a tarefa');
                  return;
                }
                onSave(Object.assign({}, f, { txt: f.txt.trim() }));
              }}
            >
              Salvar
            </DS.Button>
          </React.Fragment>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <DS.Input
            label="Tarefa"
            value={f.txt}
            onChange={function (e) {
              set('txt', e.target.value);
            }}
            placeholder="O que precisa ser feito"
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
            {!isOp ? (
              <DS.Select
                label="Para quem"
                value={f.resp}
                onChange={function (e) {
                  set('resp', e.target.value);
                }}
                options={[{ value: 'admin', label: 'Gestão (admins)' }]
                  .concat(t.id ? [] : [{ value: '__todos', label: 'Todos os operadores (' + ops.length + ')' }])
                  .concat(
                    ops.map(function (o) {
                      return { value: o.id, label: o.nome };
                    }),
                  )}
              />
            ) : null}
            <div className="ms7-field">
              <span className="ms7-label">Prioridade</span>
              <Seg
                value={f.prio}
                onChange={function (v) {
                  set('prio', v);
                }}
                items={[
                  ['normal', 'Normal'],
                  ['urgente', 'Urgente', 'var(--ms7-error)'],
                ]}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, alignItems: 'end' }}>
            <div className="ms7-field">
              <span className="ms7-label">Repetir</span>
              <Seg
                value={f.rep}
                onChange={function (v) {
                  set('rep', v);
                }}
                items={[
                  ['uma', 'Não repete'],
                  ['diaria', 'Repetir'],
                ]}
              />
            </div>
            <DS.Input
              label={f.rep === 'diaria' ? 'Começa em' : 'Dia'}
              type="date"
              value={f.data || ''}
              onChange={function (e) {
                set('data', e.target.value);
              }}
            />
          </div>
          {f.rep === 'diaria' ? (
            <div className="ms7-field">
              <span className="ms7-label">Dias da semana</span>
              <DiasPick
                value={f.dias}
                onChange={function (v) {
                  set('dias', v);
                }}
              />
            </div>
          ) : null}
          <DS.Input
            label="Observação"
            multiline
            rows={3}
            value={f.obs || ''}
            onChange={function (e) {
              set('obs', e.target.value);
            }}
            placeholder="Opcional"
          />
        </div>
      </DS.Modal>
    );
  }

  function Linha({ t, dia, showDia, isOp, onToggle, onEdit, onDel }) {
    const ok = feita(t, dia);
    const urg = t.prio === 'urgente';
    const r = respDe(t);
    const tag = function (icon, txt, tone) {
      return (
        <DS.Badge size="sm" variant="soft" tone={tone || 'gray'}>
          {txt}
        </DS.Badge>
      );
    };
    const temTags = (urg && !ok) || !isOp || showDia || t.hora || t.rep === 'diaria' || t.obs;
    return (
      <div className="ms7t-row">
        <Check on={ok} urg={urg && !ok} onClick={onToggle} />
        <button type="button" onClick={onEdit} className="ms7t-txt">
          <div className={'ms7t-t' + (ok ? ' is-done' : '')}>{t.txt}</div>
          {temTags ? (
            <div className="ms7t-tags" style={{ opacity: ok ? 0.55 : 1 }}>
              {urg && !ok ? tag('flame', 'Urgente', 'error') : null}
              {!isOp ? tag(r === 'admin' ? 'shield' : 'user', respNome(r), r === 'admin' ? 'gray' : 'blue') : null}
              {showDia ? tag('calendar', diaL(showDia), showDia < hojeISO() && !ok ? 'error' : 'gray') : null}
              {t.hora ? tag('clock', t.hora) : null}
              {t.rep === 'diaria'
                ? tag(
                    'repeat',
                    t.dias && t.dias.length
                      ? t.dias
                          .map(function (i) {
                            return SEM[i];
                          })
                          .join(' ')
                      : 'Todo dia',
                    'green',
                  )
                : null}
              {t.obs ? <span className="ms7t-obs">{t.obs}</span> : null}
            </div>
          ) : null}
        </button>
        <div className="ms7t-act">
          <DS.IconButton icon="pencil" size={30} iconSize={14} label="Editar" onClick={onEdit} />
          <DS.IconButton icon="trash-2" size={30} iconSize={14} label="Apagar" onClick={onDel} />
        </div>
      </div>
    );
  }

  function Secao({ titulo, cor, itens, vazio, vazioSub, children }) {
    return (
      <section className="ms7t-sec">
        <div className="ms7t-sec-head">
          <span className="dot" style={{ background: cor }}></span>
          <span className="ms7-eyebrow" style={{ color: 'var(--text-primary)' }}>
            {titulo}
          </span>
          <span className="n">{itens}</span>
          <span className="ln"></span>
        </div>
        <div className="ms7-card ms7t-list">
          {children}
          {vazio ? <Empty art="Tasks" title={vazio} sub={vazioSub} compact /> : null}
        </div>
      </section>
    );
  }

  function TarefasScreen(props) {
    const session =
      (props && props.session) ||
      (function () {
        try {
          return JSON.parse(localStorage.getItem('ms7op-session') || '{}');
        } catch (e) {
          return {};
        }
      })();
    const isOp = session.role === 'operador';
    const db = DB.useDB();
    const ops = (db.operadores || []).filter(function (o) {
      return o.ativo !== false;
    });
    const [lista, setLista] = usePersist('tarefas', []);
    const L0 = Array.isArray(lista) ? lista : [];
    const [quem, setQuem] = React.useState('todos');
    const [so, setSo] = React.useState('todas');
    const [txt, setTxt] = React.useState('');
    const [qResp, setQResp] = React.useState(isOp ? session.opId : 'admin');
    const [qDia, setQDia] = React.useState(hojeISO());
    const [qUrg, setQUrg] = React.useState(false);
    const [qRep, setQRep] = React.useState(false);
    const [edit, setEdit] = React.useState(null);
    const hoje = hojeISO(),
      amanha = addD(hoje, 1);
    const salvar = function (fn) {
      setLista(function (cur) {
        return fn(
          (Array.isArray(cur) ? cur : []).map(function (x) {
            return Object.assign({}, x, { feitos: Object.assign({}, x.feitos || {}) });
          }),
        );
      });
    };
    function add(e) {
      if (e) e.preventDefault();
      const t = txt.trim();
      if (!t) {
        toast('Escreva a tarefa');
        return;
      }
      const r = isOp ? session.opId : qResp;
      const alvo =
        r === '__todos'
          ? ops.map(function (o) {
              return o.id;
            })
          : [r];
      if (!alvo.length) {
        toast('Nenhum operador ativo');
        return;
      }
      const base = Date.now();
      salvar(function (l) {
        return l.concat(
          alvo.map(function (rr, ix) {
            return {
              id: 't' + (base + ix),
              txt: t,
              rep: qRep ? 'diaria' : 'uma',
              data: qRep ? hoje : qDia || hoje,
              dias: [],
              hora: '',
              obs: '',
              feitos: {},
              criada: Date.now(),
              resp: rr,
              prio: qUrg ? 'urgente' : 'normal',
              criadoPor: isOp ? session.opId : 'admin',
            };
          }),
        );
      });
      setTxt('');
      setQUrg(false);
      toast(
        (qRep ? 'Tarefa diária criada' : 'Tarefa criada') +
          (r === '__todos' ? ' para ' + alvo.length + ' operadores' : r !== 'admin' && !isOp ? ' para ' + respNome(r) : ''),
      );
    }
    function toggle(t, d) {
      salvar(function (l) {
        return l.map(function (x) {
          if (x.id !== t.id) return x;
          if (x.rep === 'diaria') {
            if (x.feitos[d]) delete x.feitos[d];
            else x.feitos[d] = Date.now();
          } else x.feitoEm = x.feitoEm ? null : Date.now();
          return x;
        });
      });
    }
    function del(t) {
      if (!confirm('Apagar a tarefa "' + t.txt + '"?')) return;
      salvar(function (l) {
        return l.filter(function (x) {
          return x.id !== t.id;
        });
      });
      toast('Tarefa apagada');
    }
    function saveEdit(f) {
      if (f.resp === '__todos' && !f.id) {
        const base = Date.now();
        const lst = ops.map(function (o, ix) {
          return Object.assign({}, f, { id: 't' + (base + ix), feitos: {}, criada: base, criadoPor: 'admin', resp: o.id });
        });
        if (!lst.length) {
          toast('Nenhum operador ativo');
          return;
        }
        salvar(function (l) {
          return l.concat(lst);
        });
        setEdit(null);
        toast('Tarefa criada para ' + lst.length + ' operadores');
        return;
      }
      salvar(function (l) {
        const ex = l.some(function (x) {
          return x.id === f.id;
        });
        return ex
          ? l.map(function (x) {
              return x.id === f.id ? Object.assign({}, x, f) : x;
            })
          : l.concat([Object.assign({ id: 't' + Date.now(), feitos: {}, criada: Date.now(), criadoPor: isOp ? session.opId : 'admin' }, f)]);
      });
      setEdit(null);
      toast('Tarefa salva');
    }

    const L = L0.filter(function (t) {
      const r = respDe(t);
      if (isOp) return r === session.opId;
      if (quem !== 'todos' && r !== quem) return false;
      if (so === 'urgentes' && t.prio !== 'urgente') return false;
      return true;
    });
    const atras = L.filter(function (t) {
      return t.rep !== 'diaria' && !t.feitoEm && t.data && t.data < hoje;
    }).sort(function (a, b) {
      return a.data < b.data ? -1 : 1;
    });
    const deHoje = L.filter(function (t) {
      return vale(t, hoje);
    }).sort(ordem(hoje));
    const deAmanha = L.filter(function (t) {
      return vale(t, amanha);
    }).sort(ordem(amanha));
    const prox = L.filter(function (t) {
      return t.rep !== 'diaria' && t.data && t.data > amanha;
    }).sort(function (a, b) {
      return a.data !== b.data ? (a.data < b.data ? -1 : 1) : ordem(a.data)(a, b);
    });
    const fixas = L.filter(function (t) {
      return t.rep === 'diaria';
    });
    const okH = deHoje.filter(function (t) {
      return feita(t, hoje);
    }).length;
    const pct = deHoje.length ? Math.round((okH / deHoje.length) * 100) : 0;
    const row = function (t, dia, showDia) {
      return (
        <Linha
          key={t.id + dia}
          t={t}
          dia={dia}
          showDia={showDia}
          isOp={isOp}
          onToggle={function () {
            toggle(t, dia);
          }}
          onEdit={function () {
            setEdit(t);
          }}
          onDel={function () {
            del(t);
          }}
        />
      );
    };
    const urgH = deHoje.filter(function (t) {
      return t.prio === 'urgente' && !feita(t, hoje);
    }).length;

    const R = 24,
      C = 2 * Math.PI * R;
    return (
      <div className="ms7t-wrap">
        <DS.Card padding={24}>
          <div className="ms7t-hero">
            <div className="ms7t-hero-main">
              <svg className="ms7t-ring" width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
                <circle className="track" cx="28" cy="28" r={R} fill="none" strokeWidth="5"></circle>
                <circle
                  className="fill"
                  cx="28"
                  cy="28"
                  r={R}
                  fill="none"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={C.toFixed(2)}
                  strokeDashoffset={((1 - pct / 100) * C).toFixed(2)}
                  transform="rotate(-90 28 28)"
                ></circle>
                <text x="28" y="32" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)" fontFamily="var(--font-sans)" className="ms7-num">
                  {pct + '%'}
                </text>
              </svg>
              <div style={{ minWidth: 0 }}>
                <div className="ms7t-date">{SEM_L[new Date(hoje + 'T12:00:00').getDay()] + ', ' + dm(hoje)}</div>
                <div className="ms7t-h ms7-balance">{deHoje.length ? okH + ' de ' + deHoje.length + ' feitas hoje' : 'Nada para hoje'}</div>
              </div>
            </div>
            <div className="ms7t-facts">
              {[
                ['Atrasadas', atras.length, 'var(--ms7-error)'],
                ['Urgentes hoje', urgH, 'var(--ms7-orange)'],
                ['Amanhã', deAmanha.length, 'var(--text-primary)'],
              ].map(function (x) {
                return (
                  <div key={x[0]}>
                    <div className="ms7-eyebrow">{x[0]}</div>
                    <div className="ms7t-fact-v ms7-num" style={{ color: x[1] ? x[2] : 'var(--text-secondary)' }}>
                      {x[1]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <form onSubmit={add} className="ms7t-new">
            <DS.Input
              icon="plus"
              value={txt}
              onChange={function (e) {
                setTxt(e.target.value);
              }}
              placeholder="Nova tarefa e aperte Enter"
              style={{ minHeight: 44 }}
            />
            <DS.Button variant="brand" iconLeft="plus" onClick={add} style={{ height: 44 }}>
              Adicionar
            </DS.Button>
          </form>
          <div className="ms7t-opts">
            {!isOp ? (
              <DS.Select
                variant="pill"
                aria-label="Para quem"
                value={qResp}
                onChange={function (e) {
                  setQResp(e.target.value);
                }}
                options={[
                  { value: 'admin', label: 'Gestão' },
                  { value: '__todos', label: 'Todos os operadores (' + ops.length + ')' },
                ].concat(
                  ops.map(function (o) {
                    return { value: o.id, label: o.nome };
                  }),
                )}
              />
            ) : null}
            {qRep ? null : (
              <input
                type="date"
                className="ms7-native"
                aria-label="Dia"
                value={qDia}
                onChange={function (e) {
                  setQDia(e.target.value);
                }}
                style={{ height: 34, borderRadius: 999, fontSize: 12.5, fontWeight: 600 }}
              />
            )}
            <DS.Button
              size="sm"
              variant={qRep ? 'primary' : 'outline'}
              iconLeft="repeat"
              aria-pressed={qRep}
              onClick={function () {
                setQRep(!qRep);
              }}
              style={{ borderRadius: 999 }}
            >
              Todo dia
            </DS.Button>
            <DS.Button
              size="sm"
              variant={qUrg ? 'primary' : 'outline'}
              iconLeft="flame"
              aria-pressed={qUrg}
              onClick={function () {
                setQUrg(!qUrg);
              }}
              style={{ borderRadius: 999 }}
            >
              Urgente
            </DS.Button>
            <span className="ms7t-tip">Clique numa tarefa para repetir, mudar o dia ou escrever uma&nbsp;observação.</span>
          </div>
        </DS.Card>

        {!isOp ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Seg
              value={so}
              onChange={setSo}
              items={[
                ['todas', 'Todas'],
                ['urgentes', 'Só urgentes', 'var(--ms7-error)'],
              ]}
            />
            <DS.Select
              variant="pill"
              aria-label="Responsável"
              value={quem}
              onChange={function (e) {
                setQuem(e.target.value);
              }}
              options={[
                { value: 'todos', label: 'Todos os responsáveis' },
                { value: 'admin', label: 'Gestão' },
              ].concat(
                ops.map(function (o) {
                  return { value: o.id, label: o.nome };
                }),
              )}
            />
          </div>
        ) : null}

        {atras.length ? (
          <Secao titulo="Atrasadas" cor="var(--ms7-error)" itens={atras.length}>
            {atras.map(function (t) {
              return row(t, t.data, t.data);
            })}
          </Secao>
        ) : null}
        <Secao titulo="Hoje" cor="var(--ms7-green)" itens={deHoje.length} vazio={deHoje.length ? null : 'Nenhuma tarefa para hoje'} vazioSub={'Escreva uma tarefa acima e aperte Enter: ela entra aqui na hora.'}>
          {deHoje.map(function (t) {
            return row(t, hoje, null);
          })}
        </Secao>
        <Secao titulo="Amanhã" cor="var(--ms7-lime-500)" itens={deAmanha.length} vazio={deAmanha.length ? null : 'Nada marcado para amanhã'} vazioSub={'Mude a data ao criar a tarefa para deixá-la pronta para amanhã.'}>
          {deAmanha.map(function (t) {
            return row(t, amanha, null);
          })}
        </Secao>
        {prox.length ? (
          <Secao titulo="Próximos dias" cor="var(--ms7-gray-400)" itens={prox.length}>
            {prox.map(function (t) {
              return row(t, t.data, t.data);
            })}
          </Secao>
        ) : null}
        {(function () {
          const grp = {};
          fixas.forEach(function (x) {
            const r = respDe(x);
            (grp[r] = grp[r] || []).push(x);
          });
          const ks = Object.keys(grp).sort(function (x, y) {
            return x === 'admin' ? -1 : y === 'admin' ? 1 : respNome(x).localeCompare(respNome(y), 'pt-BR');
          });
          const novaDiaria = (
            <DS.Button
              size="sm"
              variant="outline"
              iconLeft="plus"
              onClick={function () {
                setEdit({ rep: 'diaria', data: hoje, dias: [], resp: isOp ? session.opId : quem !== 'todos' ? quem : 'admin' });
              }}
            >
              Nova tarefa diária
            </DS.Button>
          );
          return (
            <DS.Card
              title={'Tarefas diárias' + (fixas.length ? ' · ' + fixas.length : '')}
              subtitle="Repetem todo dia, ou só nos dias escolhidos, e entram na lista de Hoje."
              icon={
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'color-mix(in oklab, var(--ms7-green-900) 12%, var(--surface-card))',
                    color: 'var(--ms7-green-900)',
                  }}
                >
                  <DS.Icon name="repeat" size={15} strokeWidth={2} />
                </span>
              }
              action={fixas.length ? novaDiaria : null}
            >
              {fixas.length ? (
                ks.map(function (k) {
                  return (
                    <div key={k}>
                      {!isOp ? (
                        <div className="ms7t-grp">
                          <DS.Avatar name={respNome(k)} size={24} />
                          <span style={{ fontSize: 13.5, fontWeight: 600 }}>{respNome(k)}</span>
                          <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)' }}>
                            {grp[k].length + (grp[k].length === 1 ? ' tarefa' : ' tarefas')}
                          </span>
                        </div>
                      ) : null}
                      {grp[k].map(function (x) {
                        const ok = feita(x, hoje);
                        const hojeVale = vale(x, hoje);
                        return (
                          <div key={x.id} className="ms7t-fix">
                            <span
                              style={{
                                width: 7,
                                height: 7,
                                borderRadius: '50%',
                                flexShrink: 0,
                                background: !hojeVale ? 'var(--line-strong)' : ok ? 'var(--ms7-green)' : 'var(--ms7-orange)',
                              }}
                              title={!hojeVale ? 'Não vale hoje' : ok ? 'Feita hoje' : 'Pendente hoje'}
                            ></span>
                            <span className="nm">
                              <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{x.txt}</span>
                              {x.prio === 'urgente' ? (
                                <DS.Badge size="sm" variant="soft" tone="error">
                                  Urgente
                                </DS.Badge>
                              ) : null}
                            </span>
                            <span className="when">
                              {(x.dias && x.dias.length && x.dias.length < 7
                                ? x.dias
                                    .slice()
                                    .sort()
                                    .map(function (i) {
                                      return SEM[i];
                                    })
                                    .join(' ')
                                : 'Todo dia') + (x.hora ? ' · ' + x.hora : '')}
                            </span>
                            <DS.IconButton
                              icon="pencil"
                              size={28}
                              iconSize={13}
                              label="Editar"
                              onClick={function () {
                                setEdit(x);
                              }}
                            />
                            {!isOp || x.criadoPor === session.opId ? (
                              <DS.IconButton
                                icon="trash-2"
                                size={28}
                                iconSize={13}
                                label="Apagar"
                                onClick={function () {
                                  del(x);
                                }}
                              />
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                <Empty
                  art="Tasks"
                  compact
                  title={isOp ? 'Nenhuma tarefa diária para você' : 'Nenhuma tarefa diária'}
                  sub={isOp ? null : 'Crie uma para a Gestão ou para um operador: ela aparece todo dia (ou nos dias escolhidos) na lista de Hoje.'}
                  action={novaDiaria}
                />
              )}
            </DS.Card>
          );
        })()}
        {edit ? (
          <Editor
            t={edit}
            isOp={isOp}
            ops={ops}
            onSave={saveEdit}
            onClose={function () {
              setEdit(null);
            }}
          />
        ) : null}
      </div>
    );
  }
  window.TarefasScreen = TarefasScreen;
})();
