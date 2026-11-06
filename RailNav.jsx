/* Menu lateral (desktop) + barra inferior (celular) — visual novo (Zeph).
   Mesmas props do original: items, footerItems, activeId, onNavigate, open, onToggle, brand, style. */
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const CSS = [
    '.ms7-rail{display:flex;flex-direction:column;flex-shrink:0;box-sizing:border-box;padding:14px 12px 12px;gap:4px;background:transparent;transition:width 320ms var(--ease-standard);z-index:30;position:relative}',
    '.ms7-rail.is-open{width:var(--rail-w-open)}.ms7-rail:not(.is-open){width:var(--rail-w)}',
    '.ms7-rail-logo{height:44px;display:flex;align-items:center;gap:11px;padding:0 4px;margin-bottom:14px;border:0;background:transparent;cursor:pointer;color:var(--text-primary);border-radius:12px;flex-shrink:0;text-align:left}',
    '.ms7-rail-mark{width:36px;height:36px;border-radius:11px;flex-shrink:0;background:var(--ms7-black);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;letter-spacing:-.02em;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),0 6px 14px -8px rgba(0,0,0,.6);transition:transform 320ms var(--ease-spring)}',
    'html[data-theme="dark"] .ms7-rail-mark{background:var(--ms7-lime-500);color:var(--text-on-lime);box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 10px 24px -12px rgba(199,242,91,.6)}',
    'html[data-theme="dark"] .ms7-rail{background:rgba(255,255,255,.028);backdrop-filter:blur(22px) saturate(1.3);-webkit-backdrop-filter:blur(22px) saturate(1.3);box-shadow:inset -1px 0 0 rgba(255,255,255,.07)}',
    'html[data-theme="dark"] .ms7-rail-toggle{background:var(--glass-solid);color:var(--text-primary);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 0 0 1px var(--line-strong),0 8px 20px -10px rgba(0,0,0,.8)}',
    'html[data-theme="dark"] .ms7-rail-item:hover{background:rgba(255,255,255,.06)}',
    'html[data-theme="dark"] .ms7-rail-item .bdg{background:rgba(255,255,255,.1);color:var(--text-primary)}',
    'html[data-theme="dark"] .ms7-rail-ind{box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 10px 26px -12px rgba(199,242,91,.55)}',
    'html[data-theme="dark"] .ms7-mnav{background:rgba(10,12,11,.78);box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}',
    'html[data-theme="dark"] .ms7-mnav-grid{background:var(--glass-solid);backdrop-filter:blur(26px);-webkit-backdrop-filter:blur(26px);box-shadow:var(--shadow-pop)}',
    /* menu superior (teste): barra de vidro grudada no topo */
    '.ms7-top{position:sticky;top:0;z-index:45;height:62px;background:color-mix(in oklab,var(--surface-page) 78%,transparent);backdrop-filter:blur(22px) saturate(1.3);-webkit-backdrop-filter:blur(22px) saturate(1.3);border-bottom:1px solid var(--line)}',
    '.ms7-top-in{max-width:1560px;margin:0 auto;height:100%;display:flex;align-items:center;gap:10px;padding:0 var(--page-pad);box-sizing:border-box}',
    '.ms7-top-logo{display:flex;align-items:center;gap:10px;border:0;background:transparent;cursor:pointer;color:var(--text-primary);padding:0 6px 0 0;margin-right:10px;flex-shrink:0}',
    '.ms7-top-logo .ms7-rail-mark{width:34px;height:34px;border-radius:10px;font-size:12.5px}',
    '.ms7-top-logo b{font-size:15px;font-weight:600;letter-spacing:-.02em;white-space:nowrap}',
    '.ms7-top-list{position:relative;display:flex;align-items:center;gap:2px;flex:1;min-width:0;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;padding:2px}.ms7-top-list::-webkit-scrollbar{display:none}',
    '.ms7-top-ind{position:absolute;top:2px;height:38px;border-radius:11px;background:var(--acc,#C7F25B);transition:left 360ms var(--ease-standard),width 360ms var(--ease-standard),opacity 200ms;pointer-events:none;z-index:0}',
    'html[data-theme="dark"] .ms7-top-ind{background:linear-gradient(135deg,#DDF79A,#C7F25B 55%,#B5E04A);box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 10px 26px -12px rgba(199,242,91,.55)}',
    '.ms7-top-item{position:relative;z-index:1;height:38px;display:inline-flex;align-items:center;gap:7px;padding:0 11px;border:0;border-radius:11px;background:transparent;color:var(--text-secondary);cursor:pointer;font-size:13.5px;font-weight:500;letter-spacing:-.005em;white-space:nowrap;transition:color 200ms,background 200ms;flex-shrink:0}',
    '.ms7-top-item:hover{color:var(--text-primary);background:color-mix(in oklab,var(--text-primary) 6%,transparent)}',
    '.ms7-top-item.is-on{color:var(--acc-fg,#0C3B26);font-weight:600;background:transparent}.ms7-top-item.is-on:hover{background:transparent}',
    '.ms7-top-item .bdg{min-width:18px;height:18px;padding:0 5px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;line-height:1;background:color-mix(in oklab,var(--text-primary) 10%,transparent);color:var(--text-primary)}',
    '.ms7-top-item.is-on .bdg{background:rgba(12,59,38,.14);color:#0C3B26}',
    '.ms7-top-foot{display:flex;align-items:center;gap:2px;flex-shrink:0;margin-left:6px;padding-left:12px;border-left:1px solid var(--line)}',
    '.ms7-top-foot .ms7-top-item{padding:0 10px}.ms7-top-foot .ms7-top-item .lbl{display:none}',
    '@media(min-width:1700px){.ms7-top-foot .ms7-top-item .lbl{display:inline}}',
    '@media(max-width:1300px){.ms7-top-item .lbl{display:none}.ms7-top-logo b{display:none}}',
    '.ms7-rail-logo:hover .ms7-rail-mark{transform:scale(1.06) rotate(-3deg)}',
    '.ms7-rail-name{display:flex;flex-direction:column;line-height:1.05;min-width:0;opacity:0;transform:translateX(-6px);transition:opacity 220ms var(--ease-out),transform 260ms var(--ease-out)}',
    '.is-open .ms7-rail-name{opacity:1;transform:none;transition-delay:80ms}',
    '.ms7-rail-name b{font-size:15px;font-weight:600;letter-spacing:-.02em;white-space:nowrap}.ms7-rail-name span{font-size:11px;font-weight:500;color:var(--text-secondary);white-space:nowrap;margin-top:3px}',
    '.ms7-rail-list{position:relative;display:flex;flex-direction:column;gap:2px;flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;margin:0 -4px;padding:0 4px;scrollbar-width:none}.ms7-rail-list::-webkit-scrollbar{display:none}',
    '.ms7-rail-ind{position:absolute;left:4px;right:4px;height:40px;border-radius:11px;background:var(--acc,#C7F25B);transition:top 360ms var(--ease-standard),opacity 200ms;pointer-events:none;z-index:0}',
    'html[data-theme="dark"] .ms7-rail-ind{background:#C7F25B}',
    '.ms7-rail-item{position:relative;z-index:1;width:100%;height:40px;display:flex;align-items:center;gap:12px;padding:0 14px;border:0;border-radius:11px;background:transparent;color:var(--text-secondary);cursor:pointer;font-size:14px;font-weight:500;letter-spacing:-.005em;white-space:nowrap;overflow:hidden;transition:color 200ms,background 200ms;flex-shrink:0}',
    '.ms7-rail:not(.is-open) .ms7-rail-item{padding:0;justify-content:center;gap:0}',
    '.ms7-rail:not(.is-open) .ms7-rail-item .lbl{position:absolute;left:0;width:0;flex:0 0 0;overflow:hidden;pointer-events:none}',
    '.ms7-rail:not(.is-open) .ms7-rail-logo{justify-content:center;padding:0;gap:0}',
    '.ms7-rail:not(.is-open) .ms7-rail-name{position:absolute;width:0;overflow:hidden;pointer-events:none}',
    '.ms7-rail-item:hover{color:var(--text-primary);background:color-mix(in oklab,var(--text-primary) 5%,transparent)}',
    '.ms7-rail-item.is-on{color:var(--acc-fg,#0C3B26);font-weight:600;background:transparent}',
    '.ms7-rail-item.is-on:hover{background:transparent}',
    '.ms7-rail-item .ico{width:20px;display:flex;justify-content:center;flex-shrink:0;transition:transform 240ms var(--ease-spring)}',
    '.ms7-rail-item:hover:not(.is-on) .ico{transform:translateY(-1px) scale(1.06)}',
    '.ms7-rail-item .lbl{flex:1;min-width:0;text-align:left;overflow:hidden;text-overflow:ellipsis;opacity:0;transform:translateX(-6px);transition:opacity 200ms var(--ease-out),transform 240ms var(--ease-out)}',
    '.is-open .ms7-rail-item .lbl{opacity:1;transform:none;transition-delay:60ms}',
    '.ms7-rail-item .bdg{min-width:18px;height:18px;padding:0 5px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;font-variant-numeric:tabular-nums;line-height:1;background:color-mix(in oklab,var(--text-primary) 8%,transparent);color:var(--text-primary);flex-shrink:0}',
    '.ms7-rail-item.is-on .bdg{background:rgba(12,59,38,.14);color:#0C3B26}',
    '.ms7-rail:not(.is-open) .ms7-rail-item .bdg{position:absolute;top:4px;right:6px;min-width:16px;height:16px;font-size:9.5px;padding:0 4px;background:var(--ms7-black);color:#fff;box-shadow:0 0 0 2px var(--surface-page)}',
    'html[data-theme="dark"] .ms7-rail:not(.is-open) .ms7-rail-item .bdg{background:#F3F5F1;color:#0B0D0C}',
    '.ms7-rail:not(.is-open) .ms7-rail-item.is-on .bdg{background:#0C3B26;color:#C7F25B}',
    '.ms7-rail-sep{height:1px;background:var(--line);margin:8px 6px}',
    '.ms7-rail-foot{display:flex;flex-direction:column;gap:2px;position:relative}',
    '.ms7-rail-toggle{position:absolute;right:-13px;top:22px;width:26px;height:26px;border-radius:50%;border:1px solid var(--line);background:var(--surface-card);color:var(--text-secondary);display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity 200ms,transform 240ms var(--ease-spring),color 200ms;z-index:70;box-shadow:0 4px 12px -6px rgba(17,21,18,.3)}',
    '.ms7-rail:hover .ms7-rail-toggle{opacity:1}.ms7-rail-toggle:hover{transform:scale(1.1);color:var(--text-primary)}',
    '.ms7-mnav{position:fixed;left:0;right:0;bottom:0;z-index:95;display:flex;padding:6px 8px calc(6px + env(safe-area-inset-bottom));background:color-mix(in oklab,var(--surface-card) 86%,transparent);backdrop-filter:blur(18px) saturate(1.3);-webkit-backdrop-filter:blur(18px) saturate(1.3);border-top:1px solid var(--line)}',
    '.ms7-mnav-tab{position:relative;flex:1;min-width:0;height:54px;border:0;background:transparent;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;font-size:10.5px;font-weight:500;color:var(--text-secondary);transition:color 200ms}',
    '.ms7-mnav-tab.is-on{color:var(--text-primary);font-weight:600}',
    '.ms7-mnav-tab .pill{width:46px;height:28px;border-radius:14px;display:flex;align-items:center;justify-content:center;transition:background 240ms,transform 240ms var(--ease-spring)}',
    '.ms7-mnav-tab.is-on .pill{background:var(--acc,#C7F25B);color:#0C3B26}',
    '.ms7-mnav-tab:active .pill{transform:scale(.92)}',
    '.ms7-mnav-tab .bdg{position:absolute;top:4px;left:calc(50% + 10px);min-width:16px;height:16px;padding:0 4px;border-radius:6px;background:var(--ms7-black);color:#fff;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1}',
    'html[data-theme="dark"] .ms7-mnav-tab .bdg{background:#F3F5F1;color:#0B0D0C}',
    '.ms7-mnav-sheet{position:fixed;inset:0;z-index:90;background:color-mix(in oklab,#0B0D0C 40%,transparent);backdrop-filter:blur(4px);animation:ms7-fade 220ms var(--ease-out) both}',
    '.ms7-mnav-grid{position:absolute;left:10px;right:10px;bottom:calc(76px + env(safe-area-inset-bottom));border-radius:20px;background:var(--surface-card);box-shadow:var(--shadow-pop);padding:10px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;animation:ms7-pop 320ms var(--ease-out) both}',
    '.ms7-mnav-grid button{height:74px;border:0;border-radius:14px;background:transparent;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;font-size:12px;font-weight:600;color:var(--text-primary);transition:background 200ms}',
    '.ms7-mnav-grid button.is-on{background:var(--acc,#C7F25B);color:#0C3B26}.ms7-mnav-grid button:active{background:var(--surface-muted)}',
  ].join('');
  if (!document.getElementById('ms7-rail-css')) {
    const s = document.createElement('style');
    s.id = 'ms7-rail-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function Tip({ anchor, text }) {
    if (!anchor) return null;
    return ReactDOM.createPortal(
      <div style={{ position: 'fixed', left: anchor.x, top: anchor.y, transform: 'translateY(-50%)', zIndex: 2000, pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
        <span className="ms7-tip">{text}</span>
      </div>,
      document.body,
    );
  }

  function RailItem({ it, active, open, onClick, setTip }) {
    const on = active === it.id;
    const ref = React.useRef(null);
    return (
      <button
        ref={ref}
        type="button"
        data-nav={it.id}
        className={'ms7-rail-item' + (on ? ' is-on' : '')}
        aria-label={it.label}
        aria-current={on ? 'page' : undefined}
        onClick={function () {
          onClick(it.id);
        }}
        onMouseEnter={function () {
          if (open) return;
          const r = ref.current.getBoundingClientRect();
          setTip({ x: r.right + 12, y: r.top + r.height / 2, text: it.label + (it.badge ? ' · ' + it.badge : '') });
        }}
        onMouseLeave={function () {
          setTip(null);
        }}
      >
        <span className="ico">
          <MSIcon name={it.icon} size={22} />
        </span>
        <span className="lbl">{it.label}</span>
        {it.badge ? <span className="bdg">{it.badge}</span> : null}
      </button>
    );
  }

  function RailNav({ items, footerItems, activeId, onNavigate, open, onToggle, brand, style }) {
    const [tip, setTip] = React.useState(null);
    const listRef = React.useRef(null);
    const footRef = React.useRef(null);
    const [ind, setInd] = React.useState({ top: 0, on: false, foot: false });
    const measure = React.useCallback(
      function () {
        const l = listRef.current,
          f = footRef.current;
        let el = l && l.querySelector('.ms7-rail-item.is-on');
        let foot = false;
        if (!el && f) {
          el = f.querySelector('.ms7-rail-item.is-on');
          foot = true;
        }
        if (!el) {
          setInd({ top: 0, on: false, foot: false });
          return;
        }
        setInd({ top: el.offsetTop, on: true, foot: foot });
      },
      [],
    );
    React.useLayoutEffect(measure, [activeId, items, footerItems, open, measure]);
    React.useEffect(
      function () {
        window.addEventListener('resize', measure);
        return function () {
          window.removeEventListener('resize', measure);
        };
      },
      [measure],
    );
    return (
      <nav className={'ms7-rail' + (open ? ' is-open' : '')} style={style} aria-label="Menu principal">
        <button type="button" className="ms7-rail-logo" onClick={onToggle} aria-label={open ? 'Recolher menu' : 'Abrir menu'} title={open ? 'Recolher menu' : 'Abrir menu'}>
          <span className="ms7-rail-mark" aria-hidden="true">
            <span style={{ fontWeight: 400 }}>M</span>
            <span style={{ fontWeight: 700 }}>S</span>
          </span>
          <span className="ms7-rail-name">
            <b>{brand || 'MS Control'}</b>
            <span>Painel de operações</span>
          </span>
        </button>
        <button type="button" className="ms7-rail-toggle" onClick={onToggle} aria-label={open ? 'Recolher menu' : 'Abrir menu'}>
          <DS.Icon name={open ? 'chevron-left' : 'chevron-right'} size={14} strokeWidth={2.2} />
        </button>
        <div className="ms7-rail-list" ref={listRef}>
          <span className="ms7-rail-ind" style={{ top: ind.top, opacity: ind.on && !ind.foot ? 1 : 0 }} aria-hidden="true" />
          {items.map(function (it) {
            return <RailItem key={it.id} it={it} active={activeId} open={open} onClick={onNavigate} setTip={setTip} />;
          })}
        </div>
        <div className="ms7-rail-sep" />
        <div className="ms7-rail-foot" ref={footRef}>
          <span className="ms7-rail-ind" style={{ top: ind.top, opacity: ind.on && ind.foot ? 1 : 0 }} aria-hidden="true" />
          {(footerItems || []).map(function (it) {
            return <RailItem key={it.id} it={it} active={activeId} open={open} onClick={onNavigate} setTip={setTip} />;
          })}
        </div>
        <Tip anchor={tip} text={tip && tip.text} />
      </nav>
    );
  }

  function MobileNav({ items, footerItems, activeId, onNavigate }) {
    const [mais, setMais] = React.useState(false);
    const all = items.concat(footerItems || []);
    const main = items.slice(0, 4);
    const resto = all.filter(function (it) {
      return main.indexOf(it) < 0;
    });
    const maisOn = resto.some(function (it) {
      return it.id === activeId;
    });
    const Tab = function (it, on, onClick) {
      return (
        <button key={it.id} type="button" className={'ms7-mnav-tab' + (on ? ' is-on' : '')} onClick={onClick}>
          <span className="pill">
            <MSIcon name={it.icon} size={22} />
          </span>
          <span className="lb" style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.label}</span>
          {it.badge ? <span className="bdg">{it.badge}</span> : null}
        </button>
      );
    };
    return (
      <React.Fragment>
        {mais ? (
          <div
            className="ms7-mnav-sheet"
            onClick={function () {
              setMais(false);
            }}
          >
            <div
              className="ms7-mnav-grid"
              onClick={function (e) {
                e.stopPropagation();
              }}
            >
              {resto.map(function (it) {
                return (
                  <button
                    key={it.id}
                    type="button"
                    className={activeId === it.id ? 'is-on' : ''}
                    onClick={function () {
                      setMais(false);
                      onNavigate(it.id);
                    }}
                  >
                    <span className="tile">
                      <MSIcon name={it.icon} size={24} />
                    </span>
                    {it.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
        <nav className="ms7-mnav" aria-label="Menu">
          {main.map(function (it) {
            return Tab(it, activeId === it.id && !mais, function () {
              setMais(false);
              onNavigate(it.id);
            });
          })}
          {Tab({ id: '__mais', label: 'Mais', icon: 'layout-grid' }, mais || maisOn, function () {
            setMais(!mais);
          })}
        </nav>
      </React.Fragment>
    );
  }

  const CRM_CSS = [
    /* barra superior: logo + nav em pílula + ações */
    '.crm-top{position:sticky;top:0;z-index:50;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;height:84px;padding:0 28px 0 34px}',
    '.crm-top::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(30,31,32,.86),rgba(30,31,32,.55) 70%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);-webkit-mask-image:linear-gradient(#000 70%,transparent);mask-image:linear-gradient(#000 70%,transparent);opacity:0;transition:opacity 240ms}',
    '.crm-top.is-stuck::before{opacity:1}',
    '.crm-logo{display:flex;align-items:center;gap:11px;border:0;background:transparent;color:var(--text-primary);cursor:pointer;padding:0;justify-self:start}',
    '.crm-logo .mk{width:42px;height:42px;display:block;flex:none;filter:drop-shadow(0 8px 18px rgba(0,0,0,.35))}',
    '.crm-logo b{font-size:19px;font-weight:500;letter-spacing:-.02em}',
    '.crm-nav{position:relative;display:flex;align-items:center;gap:2px;padding:5px;border-radius:999px;background:rgba(20,20,20,.42);box-shadow:inset 0 0 0 1px rgba(255,255,255,.07);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);max-width:100%;overflow-x:auto;scrollbar-width:none}.crm-nav::-webkit-scrollbar{display:none}',
    '.crm-nav-ind{position:absolute;top:5px;height:calc(100% - 10px);border-radius:999px;background:rgba(255,255,255,.13);box-shadow:inset 0 1px 0 rgba(255,255,255,.08);transition:left 380ms var(--ease-standard),width 380ms var(--ease-standard),opacity 200ms;pointer-events:none}',
    '.crm-nav-it{position:relative;z-index:1;height:38px;display:inline-flex;align-items:center;gap:7px;padding:0 15px;border:0;border-radius:999px;background:transparent;color:rgba(243,242,240,.78);font:500 13.5px var(--font-sans);letter-spacing:-.005em;white-space:nowrap;cursor:pointer;transition:color 200ms;flex-shrink:0}',
    '.crm-nav-it:hover{color:#fff}.crm-nav-it.is-on{color:#fff}',
    '.crm-nav-it .bdg{min-width:18px;height:18px;padding:0 5px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:600;background:var(--ms7-lime-500,#C7F25B);color:#1A2208}',
    '.crm-nav-it .ico{display:none}',
    '@media(max-width:1340px){.crm-nav-it{padding:0 11px;font-size:13px}}',
    '@media(max-width:1180px){.crm-nav-it .lbl{display:none}.crm-nav-it .ico{display:inline-flex}}',
    '.crm-acts{display:flex;align-items:center;gap:10px;justify-self:end}',
    /* trilho de ícones flutuante (esquerda) */
    '.crm-rail{position:sticky;top:100px;align-self:flex-start;z-index:40;margin:16px 0 0 26px;width:52px;display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 0;border-radius:999px;background:rgba(20,20,20,.42);box-shadow:inset 0 0 0 1px rgba(255,255,255,.07);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}',
    '.crm-rail-b{position:relative;width:38px;height:38px;border-radius:50%;border:0;background:transparent;color:rgba(243,242,240,.72);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 180ms,color 180ms}',
    '.crm-rail-b:hover{background:rgba(255,255,255,.09);color:#fff}.crm-rail-b.is-on{background:rgba(255,255,255,.14);color:#fff}',
    '.crm-rail-sep{width:22px;height:1px;background:rgba(255,255,255,.1);margin:6px 0}',
    '.crm-rail-b .tip{position:absolute;left:calc(100% + 12px);top:50%;transform:translateY(-50%) translateX(-4px);padding:6px 11px;border-radius:999px;background:rgba(30,29,28,.95);color:#F3F2F0;font:500 12.5px var(--font-sans);white-space:nowrap;opacity:0;pointer-events:none;transition:opacity 160ms,transform 200ms;box-shadow:0 0 0 1px rgba(255,255,255,.1),0 12px 30px -12px rgba(0,0,0,.8)}',
    '.crm-rail-b:hover .tip{opacity:1;transform:translateY(-50%)}',
    /* tema claro: mesma estrutura em cinza claro */
    'html:not([data-theme="dark"]) .crm-nav,html:not([data-theme="dark"]) .crm-rail{background:rgba(255,255,255,.7);box-shadow:inset 0 0 0 1px var(--line)}',
    'html:not([data-theme="dark"]) .crm-nav-it{color:var(--text-secondary)}html:not([data-theme="dark"]) .crm-nav-it.is-on,html:not([data-theme="dark"]) .crm-nav-it:hover{color:var(--text-primary)}',
    'html:not([data-theme="dark"]) .crm-nav-ind{background:var(--surface-card);box-shadow:0 0 0 1px var(--line)}',
    'html:not([data-theme="dark"]) .crm-rail-b{color:var(--text-secondary)}html:not([data-theme="dark"]) .crm-rail-b:hover,html:not([data-theme="dark"]) .crm-rail-b.is-on{background:var(--surface-muted);color:var(--text-primary)}',
    'html:not([data-theme="dark"]) .crm-top::before{background:linear-gradient(180deg,rgba(245,246,243,.9),transparent)}',
  ].join('');
  if (!document.getElementById('crm-nav-css')) { const st = document.createElement('style'); st.id = 'crm-nav-css'; st.textContent = CRM_CSS; document.head.appendChild(st); }

  /* Ícones próprios do MS Control: dois tons (camada translúcida + forma cheia), mais encorpados que os de linha */
  const MS_ICONS = {"layout-dashboard":{"a":"<rect x=\"13\" y=\"3\" width=\"8\" height=\"7\" rx=\"2.6\"/><rect x=\"3\" y=\"14\" width=\"8\" height=\"7\" rx=\"2.6\"/>","b":"<rect x=\"3\" y=\"3\" width=\"8\" height=\"9\" rx=\"2.6\"/><rect x=\"13\" y=\"12\" width=\"8\" height=\"9\" rx=\"2.6\"/>"},"square-check":{"a":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5.5\"/>","b":"<path d=\"M8 12.3l2.9 2.9L16.4 9\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.7\"/>"},"briefcase":{"a":"<rect x=\"2.5\" y=\"7\" width=\"19\" height=\"13.5\" rx=\"4\"/>","b":"<path d=\"M8.5 7V5.6A2.6 2.6 0 0 1 11.1 3h1.8a2.6 2.6 0 0 1 2.6 2.6V7\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2.2\"/><rect x=\"2.5\" y=\"11\" width=\"19\" height=\"2.6\"/><rect x=\"9.6\" y=\"10\" width=\"4.8\" height=\"5\" rx=\"1.6\"/>"},"package":{"a":"<path d=\"M3.6 7.6 12 12v9.6l-7.4-4.1A2 2 0 0 1 3.6 15.8z\"/><path d=\"M20.4 7.6 12 12v9.6l7.4-4.1a2 2 0 0 0 1-1.7z\" opacity=\".55\"/>","b":"<path d=\"M11 2.6a2 2 0 0 1 2 0l7.4 4.1a1 1 0 0 1 0 1.8L12 13 3.6 8.5a1 1 0 0 1 0-1.8z\"/>"},"layout-grid":{"a":"<rect x=\"3\" y=\"3\" width=\"8\" height=\"8\" rx=\"2.6\"/><rect x=\"3\" y=\"13\" width=\"8\" height=\"8\" rx=\"2.6\"/><rect x=\"13\" y=\"13\" width=\"8\" height=\"8\" rx=\"2.6\"/>","b":"<path d=\"M17 2.6l1.1 2.3 2.3 1.1-2.3 1.1L17 9.4l-1.1-2.3L13.6 6l2.3-1.1z\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linejoin=\"round\"/>"},"target":{"a":"<circle cx=\"11\" cy=\"13\" r=\"9\"/>","b":"<circle cx=\"11\" cy=\"13\" r=\"5.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\"/><circle cx=\"11\" cy=\"13\" r=\"1.9\"/><path d=\"M11 13 19.5 4.5\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.2\"/><path d=\"M17.2 3.2 21 3l-.2 3.8-2.4.3z\"/>"},"clock":{"a":"<circle cx=\"12\" cy=\"12\" r=\"9.5\"/>","b":"<path d=\"M12 6.8V12l3.6 2.2\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.6\"/>"},"graduation-cap":{"a":"<path d=\"M5.5 11.4v4.2c0 1.6 2.9 3.4 6.5 3.4s6.5-1.8 6.5-3.4v-4.2L12 14.6z\"/>","b":"<path d=\"M11.1 3.6a2 2 0 0 1 1.8 0l8.6 4.3a.8.8 0 0 1 0 1.4l-8.6 4.3a2 2 0 0 1-1.8 0L2.5 9.3a.8.8 0 0 1 0-1.4z\"/><path d=\"M20.6 9v5.6\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/>"},"chart-column":{"a":"<rect x=\"3\" y=\"11\" width=\"5\" height=\"10\" rx=\"2\"/><rect x=\"9.5\" y=\"7\" width=\"5\" height=\"14\" rx=\"2\"/>","b":"<rect x=\"16\" y=\"3\" width=\"5\" height=\"18\" rx=\"2\"/>"},"wallet":{"a":"<path d=\"M5 3.5h10.5a2 2 0 0 1 2 2V7H5.5a1.5 1.5 0 0 1 0-3z\"/>","b":"<path d=\"M3 6.5A2.5 2.5 0 0 0 5.5 9H19a2 2 0 0 1 2 2v7.5a2.5 2.5 0 0 1-2.5 2.5h-13A3.5 3.5 0 0 1 2 17.5V6.5zm13.2 7.3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4z\" fill-rule=\"evenodd\"/>"},"megaphone":{"a":"<path d=\"M6.5 15.5h3.2l1.3 4.6a1.6 1.6 0 0 1-1.6 2H8.7a1.6 1.6 0 0 1-1.5-1.1z\"/><path d=\"M20 9.2a2.8 2.8 0 0 1 0 5.2z\"/>","b":"<path d=\"M18.4 3.4a1 1 0 0 1 1.6.8v15.4a1 1 0 0 1-1.6.8L13 16H6a4 4 0 0 1 0-8h7z\"/>"},"sliders-horizontal":{"a":"<rect x=\"2.5\" y=\"5.5\" width=\"19\" height=\"3.6\" rx=\"1.8\"/><rect x=\"2.5\" y=\"14.9\" width=\"19\" height=\"3.6\" rx=\"1.8\"/>","b":"<circle cx=\"15.5\" cy=\"7.3\" r=\"3.6\"/><circle cx=\"8.5\" cy=\"16.7\" r=\"3.6\"/>"},"globe":{"a":"<circle cx=\"12\" cy=\"12\" r=\"9.5\"/>","b":"<path d=\"M12 2.5c2.6 2.7 3.9 5.9 3.9 9.5s-1.3 6.8-3.9 9.5c-2.6-2.7-3.9-5.9-3.9-9.5S9.4 5.2 12 2.5zM2.8 9.6h18.4M2.8 14.4h18.4\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/>"},"credit-card":{"a":"<rect x=\"2\" y=\"4.5\" width=\"20\" height=\"15\" rx=\"4\"/>","b":"<rect x=\"2\" y=\"8\" width=\"20\" height=\"3.4\"/><rect x=\"5\" y=\"14.4\" width=\"6\" height=\"2.4\" rx=\"1.2\"/>"},"settings":{"a":"<circle cx=\"12\" cy=\"12\" r=\"3.4\"/>","b":"<path fill-rule=\"evenodd\" d=\"M10.3 2.4h3.4l.6 2.6c.7.3 1.3.6 1.9 1.1l2.5-.8 1.7 2.9-2 1.8a7 7 0 0 1 0 2.2l2 1.8-1.7 2.9-2.5-.8c-.6.5-1.2.8-1.9 1.1l-.6 2.6h-3.4l-.6-2.6c-.7-.3-1.3-.6-1.9-1.1l-2.5.8-1.7-2.9 2-1.8a7 7 0 0 1 0-2.2l-2-1.8 1.7-2.9 2.5.8c.6-.5 1.2-.8 1.9-1.1zM12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z\"/>"},"log-out":{"a":"<path d=\"M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5z\"/>","b":"<path d=\"M9.5 12h11M16.8 7.8 21 12l-4.2 4.2\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.6\"/>"},"search":{"a":"<circle cx=\"10.5\" cy=\"10.5\" r=\"7.5\"/>","b":"<circle cx=\"10.5\" cy=\"10.5\" r=\"7\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"/><path d=\"m16 16 4.8 4.8\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"3\"/>"},"plus":{"a":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5.5\"/>","b":"<path d=\"M12 7.5v9M7.5 12h9\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.7\"/>"},"bell":{"a":"<path d=\"M9.3 19.5h5.4a2.7 2.7 0 0 1-5.4 0z\"/>","b":"<path d=\"M12 2.5a6.5 6.5 0 0 1 6.5 6.5v3.8l1.6 2.7a1 1 0 0 1-.9 1.5H4.8a1 1 0 0 1-.9-1.5l1.6-2.7V9A6.5 6.5 0 0 1 12 2.5z\"/>"},"sun":{"a":"<path d=\"M12 1.8v2.6M12 19.6v2.6M4.8 4.8l1.8 1.8M17.4 17.4l1.8 1.8M1.8 12h2.6M19.6 12h2.6M4.8 19.2l1.8-1.8M17.4 6.6l1.8-1.8\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.4\" opacity=\"1\"/>","b":"<circle cx=\"12\" cy=\"12\" r=\"5\"/>"},"moon":{"a":"<circle cx=\"18\" cy=\"5\" r=\"1.4\"/><circle cx=\"20.5\" cy=\"10\" r=\".9\"/>","b":"<path d=\"M15.4 3.4A8.8 8.8 0 1 0 20.6 15 7 7 0 0 1 15.4 3.4z\"/>"},"user":{"a":"<path d=\"M3.5 20.5a8.5 6.5 0 0 1 17 0 1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z\"/>","b":"<circle cx=\"12\" cy=\"7.5\" r=\"4.6\"/>"},"users":{"a":"<circle cx=\"17.5\" cy=\"8\" r=\"3.3\"/><path d=\"M15 13.6c3.6-.6 7 1.4 7 5.4a.9.9 0 0 1-.9.9h-4.3\"/>","b":"<circle cx=\"9\" cy=\"7.6\" r=\"4.2\"/><path d=\"M1.5 19.8c0-3.9 3.4-6.3 7.5-6.3s7.5 2.4 7.5 6.3a.9.9 0 0 1-.9.9H2.4a.9.9 0 0 1-.9-.9z\"/>"},"clipboard":{"a":"<rect x=\"4\" y=\"4\" width=\"16\" height=\"18\" rx=\"4\"/>","b":"<rect x=\"8\" y=\"2\" width=\"8\" height=\"4.4\" rx=\"1.6\"/><path d=\"M8.2 12.5l2.6 2.6 5-5\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.5\"/>"},"trophy":{"a":"<path d=\"M6 5H3.5a1 1 0 0 0-1 1.1C2.9 9.4 4.6 11.4 7.5 12M18 5h2.5a1 1 0 0 1 1 1.1c-.4 3.3-2.1 5.3-5 5.9\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/><rect x=\"7.5\" y=\"19\" width=\"9\" height=\"2.6\" rx=\"1.3\"/>","b":"<path d=\"M6 3.5A1 1 0 0 1 7 2.5h10a1 1 0 0 1 1 1V8a6 6 0 0 1-4.6 5.8V17h1.6v2H9v-2h1.6v-3.2A6 6 0 0 1 6 8z\"/>"},"shield-alert":{"a":"<path d=\"M12 2.2 20 5.3v6.2c0 5-3.4 8.8-8 10.3-4.6-1.5-8-5.3-8-10.3V5.3z\"/>","b":"<path d=\"M12 7.5v5\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.6\"/><circle cx=\"12\" cy=\"16.3\" r=\"1.6\"/>"},"trending-up":{"a":"<path d=\"M3 20h18\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.4\"/><path d=\"M3 17 9 11l4 4 8-8v10H3z\" opacity=\".7\"/>","b":"<path d=\"M3 15.5 9 9.5l4 4 7.5-7.5\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.6\"/><path d=\"M15.5 4.8H21v5.5z\"/>"},"percent":{"a":"<rect x=\"2.5\" y=\"2.5\" width=\"19\" height=\"19\" rx=\"6\"/>","b":"<path d=\"M16.5 7.5l-9 9\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.6\"/><circle cx=\"8.3\" cy=\"8.3\" r=\"2.1\"/><circle cx=\"15.7\" cy=\"15.7\" r=\"2.1\"/>"}};
  function MSIcon(props) {
    const ic = MS_ICONS[props.name];
    const size = props.size || 20;
    if (!ic) return <DS.Icon name={props.name} size={size} strokeWidth={2} />;
    return (
      <svg className="ms7-ico2" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" dangerouslySetInnerHTML={{ __html: '<g opacity=".38">' + ic.a + '</g>' + ic.b }} />
    );
  }
  window.MSIcon = MSIcon;
  /* Logo MS (monograma no hexágono) — o mesmo da intro de carregamento */
  function MSLogo(props) {
    const id = React.useMemo(function () { return 'msr' + Math.random().toString(36).slice(2, 8); }, []);
    const ls = ['M54 117V72l18 25', 'M72 97l18-25v45', 'M135 79.5c-2.6-5-7.7-7.5-13.5-7.5-8 0-14 4.3-14 10.6 0 13.8 28 8.2 28 22.6 0 7-6.4 11.8-14.8 11.8-6.8 0-12-2.8-14.7-8.2'];
    return (
      <svg viewBox="0 0 188 188" width={(props && props.size) || '100%'} height={(props && props.size) || '100%'} role="img" aria-label="MS Control">
        <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5a5a58" /><stop offset=".45" stopColor="#1a1918" /><stop offset="1" stopColor="#3c3b39" /></linearGradient></defs>
        <path d="M94 12 165 53v82L94 176 23 135V53Z" fill="#141312" stroke={'url(#' + id + ')'} strokeWidth="9" strokeLinejoin="round" />
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="11">
          <g stroke="#6F8C1F" transform="translate(0,4)">{ls.map(function (d, i) { return <path key={i} d={d} />; })}</g>
          <g stroke="#C7F25B">{ls.map(function (d, i) { return <path key={i} d={d} />; })}</g>
        </g>
      </svg>
    );
  }
  window.MSLogo = MSLogo;
  function CrmTop({ items, activeId, onNavigate, brand, right }) {
    const ref = React.useRef(null);
    const [ind, setInd] = React.useState({ left: 0, width: 0, on: false });
    const [stuck, setStuck] = React.useState(false);
    const measure = React.useCallback(function () {
      const el = ref.current && ref.current.querySelector('.crm-nav-it.is-on');
      setInd(el ? { left: el.offsetLeft, width: el.offsetWidth, on: true } : { left: 0, width: 0, on: false });
    }, []);
    React.useLayoutEffect(measure, [activeId, items, measure]);
    React.useEffect(function () {
      const f = function () { setStuck(window.scrollY > 6); };
      f(); window.addEventListener('scroll', f, { passive: true }); window.addEventListener('resize', measure);
      return function () { window.removeEventListener('scroll', f); window.removeEventListener('resize', measure); };
    }, [measure]);
    return (
      <header className={'crm-top' + (stuck ? ' is-stuck' : '')}>
        <button type="button" className="crm-logo" onClick={function () { onNavigate(items[0] ? items[0].id : 'geral'); }} aria-label="Início">
          <span className="mk" aria-hidden="true"><MSLogo /></span>
          <b>{brand || 'ms control'}</b>
        </button>
        <nav className="crm-nav" ref={ref} aria-label="Menu principal">
          <span className="crm-nav-ind" style={{ left: ind.left, width: ind.width, opacity: ind.on ? 1 : 0 }} aria-hidden="true" />
          {items.map(function (it) {
            const on = it.id === activeId;
            return (
              <button key={it.id} type="button" data-nav={it.id} className={'crm-nav-it' + (on ? ' is-on' : '')} aria-current={on ? 'page' : undefined} title={it.label} onClick={function () { onNavigate(it.id); }}>
                <span className="ico"><MSIcon name={it.icon} size={19} /></span>
                <span className="lbl">{it.label}</span>
                {it.badge ? <span className="bdg">{it.badge}</span> : null}
              </button>
            );
          })}
        </nav>
        <div className="crm-acts">{right}</div>
      </header>
    );
  }

  function CrmRail({ tools, activeId }) {
    return (
      <aside className="crm-rail" aria-label="Atalhos">
        {tools.map(function (t, i) {
          if (t === '-') return <span key={'s' + i} className="crm-rail-sep" />;
          return (
            <button key={t.id || t.label} type="button" className={'crm-rail-b' + (t.id && t.id === activeId ? ' is-on' : '')} aria-label={t.label} onClick={t.onClick}>
              <MSIcon name={t.icon} size={20} />
              <span className="tip">{t.label}</span>
            </button>
          );
        })}
      </aside>
    );
  }

  function TopNav({ items, footerItems, activeId, onNavigate, brand }) {
    const listRef = React.useRef(null);
    const [ind, setInd] = React.useState({ left: 0, width: 0, on: false });
    const measure = React.useCallback(function () {
      const l = listRef.current;
      const el = l && l.querySelector('.ms7-top-item.is-on');
      if (!el) { setInd({ left: 0, width: 0, on: false }); return; }
      setInd({ left: el.offsetLeft, width: el.offsetWidth, on: true });
    }, []);
    React.useLayoutEffect(measure, [activeId, items, measure]);
    React.useEffect(function () { window.addEventListener('resize', measure); return function () { window.removeEventListener('resize', measure); }; }, [measure]);
    const Item = function (it) {
      const on = activeId === it.id;
      return (
        <button key={it.id} type="button" data-nav={it.id} className={'ms7-top-item' + (on ? ' is-on' : '')} aria-current={on ? 'page' : undefined} title={it.label} onClick={function () { onNavigate(it.id); }}>
          <MSIcon name={it.icon} size={20} />
          <span className="lbl">{it.label}</span>
          {it.badge ? <span className="bdg">{it.badge}</span> : null}
        </button>
      );
    };
    return (
      <nav className="ms7-top" aria-label="Menu principal">
        <div className="ms7-top-in">
        <button type="button" className="ms7-top-logo" onClick={function () { onNavigate(items[0] ? items[0].id : 'geral'); }} aria-label="Início">
          <span className="ms7-rail-mark" aria-hidden="true"><span style={{ fontWeight: 400 }}>M</span><span style={{ fontWeight: 700 }}>S</span></span>
          <b>{brand || 'MS Control'}</b>
        </button>
        <div className="ms7-top-list" ref={listRef}>
          <span className="ms7-top-ind" style={{ left: ind.left, width: ind.width, opacity: ind.on ? 1 : 0 }} aria-hidden="true" />
          {items.map(Item)}
        </div>
        {footerItems && footerItems.length ? <div className="ms7-top-foot">{footerItems.map(Item)}</div> : null}
        </div>
      </nav>
    );
  }

  window.RailNav = RailNav;
  window.TopNav = TopNav;
  window.CrmTop = CrmTop;
  window.CrmRail = CrmRail;
  window.MobileNav = MobileNav;
})();
