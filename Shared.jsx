/* Peças compartilhadas (KPIs, período, vazio, toast, notificações) — visual novo (Zeph).
   Mesma API e mesma lógica de notificações do original. */
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const CSS = [
    '.ms7-np-bg{position:fixed;inset:0;z-index:1500;animation:ms7-fade 180ms var(--ease-out) both}',
    '.ms7-np{position:absolute;top:70px;right:var(--page-pad);width:420px;max-width:calc(100vw - 24px);max-height:min(76vh,720px);display:flex;flex-direction:column;background:var(--surface-card);color:var(--text-primary);border-radius:18px;box-shadow:var(--shadow-pop);overflow:hidden;animation:ms7-pop 320ms var(--ease-out) both;transform-origin:top right}',
    '.ms7-np-head{display:flex;align-items:center;gap:10px;padding:16px 18px 12px;border-bottom:1px solid var(--line)}',
    '.ms7-np-head b{flex:1;font-size:16px;font-weight:600;letter-spacing:-.015em}',
    '.ms7-np-list{overflow-y:auto;padding:6px}',
    '.ms7-np-it{display:flex;gap:12px;padding:12px;border-radius:12px;transition:background 160ms;position:relative}',
    '.ms7-np-it:hover{background:var(--surface-muted)}',
    '.ms7-np-it.is-new::before{content:"";position:absolute;left:4px;top:50%;width:4px;height:4px;border-radius:50%;background:var(--ms7-green);transform:translateY(-50%)}',
    '.ms7-np-ico{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
    '.ms7-np-t{font-size:13.5px;font-weight:600;letter-spacing:-.005em;line-height:1.3}.ms7-np-b{font-size:12.5px;font-weight:500;line-height:1.5;white-space:pre-line;color:var(--text-secondary);margin-top:3px}.ms7-np-at{font-size:11.5px;font-weight:500;color:var(--text-secondary);white-space:nowrap}',
    '.ms7-push{position:fixed;top:20px;right:20px;z-index:2100;width:368px;max-width:calc(100vw - 40px);background:color-mix(in oklab,#111512 94%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);color:#F3F5F1;border-radius:18px;padding:14px 16px;box-shadow:0 30px 70px -24px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.08);cursor:pointer;animation:ms7-push-in 520ms var(--ease-spring) both}',
    '@keyframes ms7-push-in{from{opacity:0;transform:translateY(-14px) scale(.96)}to{opacity:1;transform:none}}',
    '.ms7-push-top{display:flex;align-items:center;gap:8px;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#9AA39D;margin-bottom:10px}',
    '.ms7-rank{display:flex;flex-direction:column}.ms7-rank-row{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border-subtle)}.ms7-rank-row:last-child{border-bottom:0}',
    '.ms7-rank-n{width:26px;height:26px;border-radius:8px;background:var(--surface-muted);color:var(--text-primary);font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;font-variant-numeric:tabular-nums}.ms7-rank-row:first-child .ms7-rank-n{background:var(--ms7-lime-500);color:#0C3B26}',
    '.ms7-period{display:flex;align-items:center;gap:10px;flex-wrap:wrap}',
    '.ms7-kpis{display:grid;gap:14px}',
  ].join('');
  if (!document.getElementById('ms7-shared-css')) {
    const s = document.createElement('style');
    s.id = 'ms7-shared-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function KpiRow({ items, min }) {
    return (
      <div className="ms7-kpis ms7-stagger" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,' + (min || 164) + 'px),1fr))' }}>
        {items.map(function (k) {
          const lab = k.signed != null && k.signed < 0 && /Lucro/i.test(k.label) ? k.label.replace(/Lucro líquido|Lucro/i, 'Prejuízo') : k.label;
          return (
            <DS.StatCard
              key={k.label}
              variant="compact"
              icon={k.icon}
              value={k.value}
              label={lab}
              tone={k.tone}
              trend={k.trend}
              trendTone={k.trendTone}
              hint={k.hint}
              valueColor={k.signed == null ? undefined : k.signed >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)'}
            />
          );
        })}
      </div>
    );
  }
  function PeriodBar({ value, onChange, children }) {
    return (
      <div className="ms7-period">
        <DS.Tabs variant="chips" value={value} onChange={onChange} items={['Hoje', '7 dias', '30 dias', 'Todos']} />
        {children}
        <DS.Button
          size="sm"
          variant="ghost"
          iconLeft="refresh-cw"
          style={{ marginLeft: 'auto' }}
          onClick={function () {
            toast('Dados atualizados');
          }}
        >
          Atualizar
        </DS.Button>
      </div>
    );
  }
  function Grid({ cols, min, children, gap }) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: cols || 'repeat(auto-fit,minmax(' + (min || 320) + 'px,1fr))', gap: gap || 24, alignItems: 'start' }}>{children}</div>
    );
  }
  function Money({ v, signed }) {
    return (
      <span className="ms7-num" style={{ fontWeight: 600, color: signed ? (v >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)') : 'inherit' }}>
        {MS7.brl(v)}
      </span>
    );
  }
  function Empty({ icon, title, sub, action, art, compact }) {
    const Art = art ? window.MS7Art[art] || window.MS7Art.Inbox : window.MS7ArtFor ? window.MS7ArtFor(icon) : null;
    return (
      <div className="ms7-empty" style={compact ? { padding: '20px 12px' } : null} data-reveal="scale">
        {Art ? (
          <span className="ms7-empty-art">
            <Art size={compact ? 92 : 132} />
          </span>
        ) : (
          <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DS.Icon name={icon || 'inbox'} size={22} />
          </span>
        )}
        <b className="ms7-empty-title">{title}</b>
        {sub ? <span className="ms7-empty-sub">{sub}</span> : null}
        {action ? <div style={{ marginTop: 8 }}>{action}</div> : null}
      </div>
    );
  }
  function RankList({ rows, valueKey, fmt }) {
    return (
      <div className="ms7-rank ms7-stagger">
        {rows.map(function (r, i) {
          return (
            <div key={r.nome} className="ms7-rank-row">
              <span className="ms7-rank-n">{String(i + 1).padStart(2, '0')}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em' }}>{r.nome}</span>
              <span className="ms7-num" style={{ fontSize: 14, fontWeight: 600, color: 'var(--ms7-green)' }}>
                {(fmt || MS7.brl)(r[valueKey])}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  let setToastRef = null;
  function toast(msg) {
    if (setToastRef) setToastRef({ m: msg, k: Date.now() });
  }
  function Toaster() {
    const [m, setM] = React.useState(null);
    setToastRef = setM;
    React.useEffect(
      function () {
        if (!m) return;
        const t = setTimeout(function () {
          setM(null);
        }, 2600);
        return function () {
          clearTimeout(t);
        };
      },
      [m],
    );
    return m ? (
      <div className="ms7-toast" key={m.k} role="status">
        <span style={{ width: 22, height: 22, borderRadius: 7, background: 'var(--ms7-lime-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <DS.Icon name="check" size={13} color="#0C3B26" strokeWidth={3} />
        </span>
        {m.m}
      </div>
    ) : null;
  }
  function Hint({ children }) {
    return <p style={{ margin: '0 0 14px', fontSize: 13.5, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{children}</p>;
  }
  const NKEY = 'ms7op-notifs',
    PKEY = 'ms7op-notif-prefs';
  const NTYPES = {
    ponto: { label: 'Controle de ponto', icon: 'clock', tone: 'var(--ms7-orange)' },
    ciclo: { label: 'Ciclo de contas fechado', icon: 'repeat', tone: 'var(--ms7-blue)' },
    inicio: { label: 'Cooperação iniciada', icon: 'play', tone: 'var(--ms7-green)' },
    fim: { label: 'Cooperação finalizada', icon: 'flag', tone: 'var(--ms7-purple)' },
    bloqueio: { label: 'Conta bloqueada', icon: 'shield-alert', tone: 'var(--ms7-error)' },
    tarefa: { label: 'Nova tarefa', icon: 'square-check', tone: 'var(--ms7-green)' },
    alerta: { label: 'Alertas do painel', icon: 'triangle-alert', tone: 'var(--ms7-orange)' },
  };
  function readJ(k, d) {
    try {
      const v = JSON.parse(localStorage.getItem(k));
      return v == null ? d : v;
    } catch (e) {
      return d;
    }
  }
  function getPrefs() {
    return Object.assign({ ciclo: true, inicio: true, fim: true, bloqueio: true }, readJ(PKEY, {}));
  }
  function setPref(k, v) {
    const p = getPrefs();
    p[k] = v;
    localStorage.setItem(PKEY, JSON.stringify(p));
  }
  if (!localStorage.getItem(NKEY)) {
    localStorage.setItem(
      NKEY,
      JSON.stringify([
        { id: 1, type: 'bloqueio', title: 'Conta bloqueada — Vértice', body: 'Operador: Diego Ramos\nConta: caio512 (C-1046)\nDepósito retido: R$ 740,00', at: '18:42', read: false },
        { id: 2, type: 'ciclo', title: 'Ciclo fechado — Equipe Aurora (C-1047)', body: 'Operador: Bruna Costa\nDepósito: R$ 12.480,00 · Saque: R$ 15.920,00\nResultado: LUCRO de R$ 3.440,00', at: '17:05', read: false },
        { id: 3, type: 'inicio', title: 'Cooperação iniciada — Grupo Horizonte (C-1048)', body: 'Operador: Lucas Martins\nPlataforma: Vértice · 32 depositantes', at: '09:12', read: true },
      ]),
    );
  }
  const nsubs = [];
  let pushRef = null;
  function getNotifs() {
    return readJ(NKEY, []);
  }
  function notifyLocal(n) {
    const it = Object.assign({ id: Date.now() + Math.random(), at: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), read: false }, n);
    saveNotifs([it].concat(getNotifs()).slice(0, 60));
    if (pushRef) pushRef(it);
    try {
      if (document.hidden && window.Notification && Notification.permission === 'granted' && navigator.serviceWorker) {
        navigator.serviceWorker.getRegistration().then(function (r) {
          if (r) r.showNotification(it.title, { body: String(it.body || ''), tag: 'ms7-' + (n.type || 'x') + '-' + it.id, icon: 'icon-192.png' });
        });
      }
    } catch (e) {}
  }
  function TarefasWatcher({ opId }) {
    DB.useDB();
    const db = DB.get();
    const it = (db.kv || []).find(function (x) {
      return x && x.id === 'tarefas';
    });
    const L = it && Array.isArray(it.v) ? it.v : [];
    React.useEffect(
      function () {
        if (!opId) return;
        const K = 'ms7op-tarefas-vistas-' + opId;
        let vis = null;
        try {
          vis = JSON.parse(localStorage.getItem(K) || 'null');
        } catch (e) {}
        const meus = L.filter(function (t) {
          return t && (t.resp || 'admin') === opId;
        });
        const ids = meus.map(function (t) {
          return t.id;
        });
        if (vis === null) {
          localStorage.setItem(K, JSON.stringify(ids));
          return;
        }
        const novas = meus.filter(function (t) {
          return vis.indexOf(t.id) < 0 && t.criadoPor !== opId;
        });
        novas.forEach(function (t) {
          notifyLocal({
            type: 'tarefa',
            title: (t.prio === 'urgente' ? 'Tarefa URGENTE: ' : 'Nova tarefa: ') + t.txt,
            body: (t.data ? 'Para ' + t.data.split('-').reverse().slice(0, 2).join('/') : '') + (t.hora ? ' às ' + t.hora : ''),
          });
        });
        if (novas.length || ids.length !== vis.length) localStorage.setItem(K, JSON.stringify(ids));
      },
      [
        JSON.stringify(
          L.map(function (t) {
            return t && t.id;
          }),
        ),
        opId,
      ],
    );
    return null;
  }
  function tarefasPend(db, resp) {
    const it = (db.kv || []).find(function (x) {
      return x && x.id === 'tarefas';
    });
    const L = it && Array.isArray(it.v) ? it.v : [];
    const h = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
    const dw = new Date(h + 'T12:00:00').getDay();
    return L.filter(function (t) {
      if (!t || (t.resp || 'admin') !== resp) return false;
      if (t.rep === 'diaria') {
        if (t.data && h < t.data) return false;
        if (t.dias && t.dias.length && t.dias.indexOf(dw) < 0) return false;
        return !(t.feitos && t.feitos[h]);
      }
      return !t.feitoEm && t.data && t.data <= h;
    }).length;
  }
  function saveNotifs(l) {
    localStorage.setItem(NKEY, JSON.stringify(l));
    nsubs.forEach(function (f) {
      f(l);
    });
  }
  function notify(n) {
    if (getPrefs()[n.type] === false) {
      toast((NTYPES[n.type] || NTYPES.ciclo).label + ' (notificação desativada)');
      return;
    }
    const it = Object.assign({ id: Date.now() + Math.random(), at: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), read: false }, n);
    saveNotifs([it].concat(getNotifs()).slice(0, 60));
    if (pushRef) pushRef(it);
    if (window.ms7Push) {
      const b = String(it.body || '').replace(/\*/g, '');
      if (n.local) {
        if (!window.ms7Push.isRemote() && getPrefs().__device !== false) window.ms7Push.show(it.title, b, it.type);
      } else {
        const tg = it.type + '-' + Math.round(it.id);
        const sent = window.ms7Push.remote(it.title, b, tg);
        if (!sent && getPrefs().__device !== false) window.ms7Push.show(it.title, b, tg);
      }
    }
  }
  function useNotifs() {
    const [l, setL] = React.useState(getNotifs);
    React.useEffect(function () {
      nsubs.push(setL);
      return function () {
        nsubs.splice(nsubs.indexOf(setL), 1);
      };
    }, []);
    return l;
  }
  function resultLine(v) {
    return 'Resultado: ' + (v >= 0 ? 'LUCRO de ' : 'PREJUÍZO de ') + MS7.brl(Math.abs(v));
  }
  function PushPreview() {
    const [it, setIt] = React.useState(null);
    pushRef = setIt;
    React.useEffect(
      function () {
        if (!it) return;
        const t = setTimeout(function () {
          setIt(null);
        }, 7000);
        return function () {
          clearTimeout(t);
        };
      },
      [it],
    );
    if (!it) return null;
    const T = NTYPES[it.type] || NTYPES.ciclo;
    return (
      <div
        className="ms7-push"
        key={it.id}
        onClick={function () {
          setIt(null);
        }}
      >
        <div className="ms7-push-top">
          <span style={{ width: 20, height: 20, borderRadius: 6, background: '#2AABEE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DS.Icon name="send" size={11} color="#fff" strokeWidth={2.2} />
          </span>
          <span style={{ flex: 1 }}>Telegram · MS7 Bot</span>
          <span style={{ textTransform: 'none', letterSpacing: 0 }}>agora</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ width: 36, height: 36, borderRadius: 11, background: T.tone, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <DS.Icon name={T.icon} size={18} color="#fff" strokeWidth={2} />
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3, letterSpacing: '-0.005em' }}>{it.title}</div>
            <div style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.5, whiteSpace: 'pre-line', color: '#C9CFC9' }}>{it.body}</div>
          </div>
        </div>
      </div>
    );
  }
  function NotifPanel({ onClose }) {
    const l = useNotifs();
    const unread = l.filter(function (n) {
      return !n.read;
    }).length;
    return (
      <div className="ms7-np-bg" onClick={onClose}>
        <div
          className="ms7-np"
          onClick={function (e) {
            e.stopPropagation();
          }}
        >
          <div className="ms7-np-head">
            <b>Notificações</b>
            {unread ? <DS.CountDot tone="lime">{unread}</DS.CountDot> : null}
            <DS.Button
              size="sm"
              variant="ghost"
              iconLeft="check-check"
              onClick={function () {
                saveNotifs(
                  l.map(function (n) {
                    return Object.assign({}, n, { read: true });
                  }),
                );
              }}
            >
              Marcar como lidas
            </DS.Button>
          </div>
          <div className="ms7-np-list">
            {l.length ? (
              l.map(function (n) {
                const T = NTYPES[n.type] || NTYPES.ciclo;
                return (
                  <div key={n.id} className={'ms7-np-it' + (n.read ? '' : ' is-new')}>
                    <span className="ms7-np-ico" style={{ background: 'color-mix(in oklab, ' + T.tone + ' 14%, var(--surface-card))', color: T.tone }}>
                      <DS.Icon name={T.icon} size={16} strokeWidth={2} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                        <span className="ms7-np-t" style={{ flex: 1 }}>
                          {n.title}
                        </span>
                        <span className="ms7-np-at">{n.at}</span>
                      </div>
                      <div className="ms7-np-b">{n.body}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Empty icon="bell" title="Sem notificações" sub="Ciclos fechados, contas bloqueadas e avisos aparecem aqui." compact />
            )}
          </div>
        </div>
      </div>
    );
  }
  Object.assign(window, {
    notify: notify,
    useNotifs: useNotifs,
    NotifPanel: NotifPanel,
    TarefasWatcher: TarefasWatcher,
    tarefasPend: tarefasPend,
    notifyLocal: notifyLocal,
    PushPreview: PushPreview,
    NTYPES: NTYPES,
    getPrefs: getPrefs,
    setPref: setPref,
    resultLine: resultLine,
    KpiRow: KpiRow,
    PeriodBar: PeriodBar,
    Grid: Grid,
    Money: Money,
    Empty: Empty,
    RankList: RankList,
    toast: toast,
    Toaster: Toaster,
    Hint: Hint,
  });
})();
