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

  /* Ícones do MS Control: Solar "Bold Duotone" (CC BY 4.0, 480 Design) — cheios, em dois tons */
  const MS_ICONS = {"layout-dashboard":"<g fill=\"currentColor\" opacity=\".5\"><path d=\"M7.625 15C8.67337 15 9.19784 15.0001 9.61133 15.1777C10.1625 15.4146 10.6008 15.8688 10.8291 16.4404C11.0003 16.8692 11 17.4129 11 18.5C11 19.5871 11.0003 20.1308 10.8291 20.5596C10.6008 21.1312 10.1625 21.5854 9.61133 21.8223C9.19784 21.9999 8.67337 22 7.625 22H5.375C4.32663 22 3.80216 21.9999 3.38867 21.8223C2.83749 21.5854 2.39922 21.1312 2.1709 20.5596C1.99969 20.1308 2 19.5871 2 18.5C2 17.4129 1.99969 16.8692 2.1709 16.4404C2.39922 15.8688 2.83749 15.4146 3.38867 15.1777C3.80216 15.0001 4.32663 15 5.375 15H7.625Z\"/><path d=\"M17.5 11C19.6213 11 20.6818 11.0002 21.3408 11.6445C21.9998 12.2889 22 13.3262 22 15.4004V17.5996C22 19.6738 21.9998 20.7111 21.3408 21.3555C20.6818 21.9998 19.6213 22 17.5 22C15.3787 22 14.3182 21.9998 13.6592 21.3555C13.0002 20.7111 13 19.6738 13 17.5996V15.4004C13 13.3262 13.0002 12.2889 13.6592 11.6445C14.3182 11.0002 15.3787 11 17.5 11Z\"/></g><path fill=\"currentColor\" d=\"M6.5 2C8.62132 2 9.68181 2.00017 10.3408 2.64453C10.9998 3.2889 11 4.32621 11 6.40039V8.59961C11 10.6738 10.9998 11.7111 10.3408 12.3555C9.68181 12.9998 8.62132 13 6.5 13C4.37868 13 3.31819 12.9998 2.65918 12.3555C2.00017 11.7111 2 10.6738 2 8.59961V6.40039C2 4.32621 2.00017 3.2889 2.65918 2.64453C3.31819 2.00017 4.37868 2 6.5 2Z\"/><path fill=\"currentColor\" d=\"M18.625 2C19.6734 2 20.1978 2.00012 20.6113 2.17773C21.1625 2.41459 21.6008 2.8688 21.8291 3.44043C22.0003 3.86921 22 4.41293 22 5.5C22 6.58707 22.0003 7.13079 21.8291 7.55957C21.6008 8.1312 21.1625 8.58541 20.6113 8.82227C20.1978 8.99988 19.6734 9 18.625 9H16.375C15.3266 9 14.8022 8.99988 14.3887 8.82227C13.8375 8.58541 13.3992 8.1312 13.1709 7.55957C12.9997 7.13079 13 6.58707 13 5.5C13 4.41293 12.9997 3.86921 13.1709 3.44043C13.3992 2.8688 13.8375 2.41459 14.3887 2.17773C14.8022 2.00012 15.3266 2 16.375 2H18.625Z\"/>","square-check":"<path fill=\"currentColor\" d=\"M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M10.5431 7.51724C10.8288 7.2173 10.8172 6.74256 10.5172 6.4569C10.2173 6.17123 9.74256 6.18281 9.4569 6.48276L7.14286 8.9125L6.5431 8.28276C6.25744 7.98281 5.78271 7.97123 5.48276 8.2569C5.18281 8.54256 5.17123 9.01729 5.4569 9.31724L6.59976 10.5172C6.74131 10.6659 6.9376 10.75 7.14286 10.75C7.34812 10.75 7.5444 10.6659 7.68596 10.5172L10.5431 7.51724Z\"/><path fill=\"currentColor\" d=\"M13 8.25C12.5858 8.25 12.25 8.58579 12.25 9C12.25 9.41422 12.5858 9.75 13 9.75H18C18.4142 9.75 18.75 9.41422 18.75 9C18.75 8.58579 18.4142 8.25 18 8.25H13Z\"/><path fill=\"currentColor\" d=\"M10.5431 14.5172C10.8288 14.2173 10.8172 13.7426 10.5172 13.4569C10.2173 13.1712 9.74256 13.1828 9.4569 13.4828L7.14286 15.9125L6.5431 15.2828C6.25744 14.9828 5.78271 14.9712 5.48276 15.2569C5.18281 15.5426 5.17123 16.0173 5.4569 16.3172L6.59976 17.5172C6.74131 17.6659 6.9376 17.75 7.14286 17.75C7.34812 17.75 7.5444 17.6659 7.68596 17.5172L10.5431 14.5172Z\"/><path fill=\"currentColor\" d=\"M13 15.25C12.5858 15.25 12.25 15.5858 12.25 16C12.25 16.4142 12.5858 16.75 13 16.75H18C18.4142 16.75 18.75 16.4142 18.75 16C18.75 15.5858 18.4142 15.25 18 15.25H13Z\"/>","briefcase":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M17.1923 6H6.80765C5.12027 6 4.27658 6 3.63268 6.32971C3.07242 6.61659 2.61659 7.07242 2.32971 7.63268C2 8.27658 2 9.12027 2 10.8077C2 11.2366 2 11.4511 2.07336 11.6319C2.13743 11.7898 2.24079 11.9288 2.37363 12.0355C2.52574 12.1577 2.73118 12.2194 3.14206 12.3426L8.5 13.95V15.1627C8.5 15.9283 8.95939 16.6341 9.68682 16.9296L10.2469 17.1572C11.3719 17.6143 12.6281 17.6143 13.7531 17.1572L14.3132 16.9296C15.0406 16.6341 15.5 15.9283 15.5 15.1627V13.95L20.8579 12.3426C21.2688 12.2194 21.4743 12.1577 21.6264 12.0355C21.7592 11.9288 21.8626 11.7898 21.9266 11.6319C22 11.4511 22 11.2366 22 10.8077C22 9.12027 22 8.27658 21.6703 7.63268C21.3834 7.07242 20.9276 6.61659 20.3673 6.32971C19.7234 6 18.8797 6 17.1923 6ZM13.6 13H10.4C10.1791 13 10 13.1819 10 13.4063V15.1627C10 15.3288 10.0996 15.4782 10.2514 15.54L10.8116 15.7675C11.5745 16.0775 12.4255 16.0775 13.1885 15.7675L13.7486 15.54C13.9004 15.4782 14 15.3288 14 15.1627V13.4063C14 13.1819 13.8209 13 13.6 13Z\" clip-rule=\"evenodd\"/><g fill=\"currentColor\" opacity=\".5\"><path d=\"M20.9579 12.3126C20.9469 12.3159 20.9356 12.3193 20.9242 12.3227L15.5 13.9501V15.1627C15.5 15.9283 15.0406 16.6341 14.3132 16.9296L13.7531 17.1572C12.6281 17.6143 11.3719 17.6143 10.2469 17.1572L9.68682 16.9296C8.95939 16.6341 8.5 15.9283 8.5 15.1627V13.9501L3 12.2999C3.0009 15.9752 3.03489 19.6879 4.318 20.8285C5.63601 22.0001 7.75733 22.0001 12 22.0001C16.2426 22.0001 18.3639 22.0001 19.682 20.8285C20.9651 19.6879 20.9991 15.9752 21 12.2999L20.9579 12.3126Z\"/><path d=\"M12 1.25C13.6339 1.25 15.0216 2.29463 15.5361 3.75C15.6742 4.14054 15.4696 4.569 15.0791 4.70703C14.6886 4.84489 14.2601 4.64045 14.1221 4.25C13.8128 3.37511 12.9785 2.75 12 2.75C11.0216 2.75008 10.1871 3.37515 9.87793 4.25C9.73986 4.64048 9.31141 4.84506 8.9209 4.70703C8.53042 4.56896 8.32584 4.14051 8.46387 3.75C8.97831 2.29462 10.3662 1.25008 12 1.25Z\"/></g>","package":"<path fill=\"currentColor\" d=\"M12 2C12.9441 2.0001 13.8219 2.46071 15.5771 3.38184L17.5771 4.43164C19.6806 5.53549 20.7561 6.0997 21.3613 7.07227C21.3751 7.09433 21.3891 7.11715 21.4023 7.13965C21.9997 8.15413 22 9.41671 22 11.9414V12.0586C22 14.5834 21.9997 15.8458 21.4023 16.8604C20.805 17.8747 19.7294 18.4394 17.5781 19.5684L15.5781 20.6182C13.8225 21.5395 12.9443 22 12 22V12L2.6377 7.07227C3.24293 6.09963 4.31839 5.5355 6.42188 4.43164L8.42188 3.38184C10.1775 2.46053 11.0557 2 12 2Z\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M17.5774 4.43152L15.5774 3.38197C13.8218 2.46066 12.944 2 11.9997 2C11.0554 2 10.1776 2.46066 8.42197 3.38197L6.42197 4.43152C4.31821 5.53552 3.24291 6.09982 2.6377 7.07264L11.9997 12L21.3617 7.07264C20.7564 6.09982 19.6811 5.53552 17.5774 4.43152Z\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M17.0166 8.65332L21.041 6.6416C21.1786 6.79744 21.2985 6.96157 21.4033 7.13965C21.5529 7.39367 21.665 7.66382 21.749 7.96484L17.75 9.96387V13C17.75 13.4142 17.4142 13.75 17 13.75C16.5859 13.7498 16.25 13.4141 16.25 13V10.7139L12.75 12.4639V21.9043C12.4932 21.9682 12.2488 22 12 22C11.8814 22 11.7639 21.9921 11.6455 21.9775C11.5936 21.9712 11.5416 21.9633 11.4893 21.9541C11.4815 21.9527 11.4736 21.9516 11.4658 21.9502C11.4324 21.9441 11.399 21.9369 11.3652 21.9297C11.3272 21.9215 11.2886 21.9139 11.25 21.9043C10.5321 21.7255 9.71471 21.2966 8.42188 20.6182L6.42188 19.5684C4.27056 18.4394 3.19502 17.8747 2.59766 16.8604C2.00026 15.8458 2 14.5834 2 12.0586V11.9414C2 9.41671 2.00028 8.15413 2.59766 7.13965C2.70253 6.96159 2.82237 6.79743 2.95996 6.6416L12 11.1621L15.3867 9.46875L6.32324 4.4834C6.35604 4.46618 6.38954 4.44912 6.42285 4.43164L7.91602 3.64746L17.0166 8.65332Z\"/>","layout-grid":"<path fill=\"currentColor\" d=\"M17.5 13C19.6213 13 20.6818 13.0002 21.3408 13.6592C21.9998 14.3182 22 15.3787 22 17.5C22 19.6213 21.9998 20.6818 21.3408 21.3408C20.6818 21.9998 19.6213 22 17.5 22C15.3787 22 14.3182 21.9998 13.6592 21.3408C13.0002 20.6818 13 19.6213 13 17.5C13 15.3787 13.0002 14.3182 13.6592 13.6592C14.3182 13.0002 15.3787 13 17.5 13Z\"/><path fill=\"currentColor\" d=\"M6.5 2C8.62132 2 9.68181 2.00017 10.3408 2.65918C10.9998 3.31819 11 4.37868 11 6.5C11 8.62132 10.9998 9.68181 10.3408 10.3408C9.68181 10.9998 8.62132 11 6.5 11C4.37868 11 3.31819 10.9998 2.65918 10.3408C2.00017 9.68181 2 8.62132 2 6.5C2 4.37868 2.00017 3.31819 2.65918 2.65918C3.31819 2.00017 4.37868 2 6.5 2Z\"/><path fill=\"currentColor\" d=\"M17.5 2.75C17.9142 2.75 18.25 3.08579 18.25 3.5V5.75H20.5C20.9142 5.75 21.25 6.08579 21.25 6.5C21.25 6.91421 20.9142 7.25 20.5 7.25H18.25V9.5C18.25 9.91421 17.9142 10.25 17.5 10.25C17.0858 10.25 16.75 9.91421 16.75 9.5V7.25H14.5C14.0858 7.25 13.75 6.91421 13.75 6.5C13.75 6.08579 14.0858 5.75 14.5 5.75H16.75V3.5C16.75 3.08579 17.0858 2.75 17.5 2.75Z\"/><path fill=\"currentColor\" d=\"M2 17.5C2 15.3787 2 14.318 2.65901 13.659C3.31802 13 4.37868 13 6.5 13C8.62132 13 9.68198 13 10.341 13.659C11 14.318 11 15.3787 11 17.5C11 19.6213 11 20.682 10.341 21.341C9.68198 22 8.62132 22 6.5 22C4.37868 22 3.31802 22 2.65901 21.341C2 20.682 2 19.6213 2 17.5Z\" opacity=\".5\"/>","target":"<path fill=\"currentColor\" d=\"M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M12 18.25C12.4142 18.25 12.75 18.5858 12.75 19V21.9727C12.5024 21.991 12.2523 22 12 22C11.7477 22 11.4976 21.991 11.25 21.9727V19C11.25 18.5858 11.5858 18.25 12 18.25Z\"/><path fill=\"currentColor\" d=\"M12 9.25C12.4142 9.25 12.75 9.58579 12.75 10V11.25H14C14.4142 11.25 14.75 11.5858 14.75 12C14.75 12.4142 14.4142 12.75 14 12.75H12.75V14C12.75 14.4142 12.4142 14.75 12 14.75C11.5858 14.75 11.25 14.4142 11.25 14V12.75H10C9.58579 12.75 9.25 12.4142 9.25 12C9.25 11.5858 9.58579 11.25 10 11.25H11.25V10C11.25 9.58579 11.5858 9.25 12 9.25Z\"/><path fill=\"currentColor\" d=\"M5 11.25C5.41421 11.25 5.75 11.5858 5.75 12C5.75 12.4142 5.41421 12.75 5 12.75H2.02734C2.00899 12.5024 2 12.2523 2 12C2 11.7477 2.00899 11.4976 2.02734 11.25H5Z\"/><path fill=\"currentColor\" d=\"M21.9727 11.25C21.991 11.4976 22 11.7477 22 12C22 12.2523 21.991 12.5024 21.9727 12.75H19C18.5858 12.75 18.25 12.4142 18.25 12C18.25 11.5858 18.5858 11.25 19 11.25H21.9727Z\"/><path fill=\"currentColor\" d=\"M12 2C12.2523 2 12.5024 2.00899 12.75 2.02734V5C12.75 5.41421 12.4142 5.75 12 5.75C11.5858 5.75 11.25 5.41421 11.25 5V2.02734C11.4976 2.00899 11.7477 2 12 2Z\"/>","clock":"<path fill=\"currentColor\" d=\"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z\" opacity=\".5\"/><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z\" clip-rule=\"evenodd\"/>","graduation-cap":"<path fill=\"currentColor\" d=\"M14.2172 3.49965C12.7962 2.83345 11.2037 2.83345 9.78272 3.49965L3.0916 6.63659C2.0156 7.14105 1.73507 8.56352 2.25 9.54666L2.25 14.5C2.25 14.9142 2.58579 15.25 3 15.25C3.41421 15.25 3.75 14.9142 3.75 14.5V10.672L9.78281 13.5003C11.2038 14.1665 12.7963 14.1665 14.2173 13.5003L20.9084 10.3634C22.3639 9.68105 22.3639 7.31899 20.9084 6.63664L14.2172 3.49965Z\"/><path fill=\"currentColor\" d=\"M5 11.2581L9.78281 13.5003C11.2038 14.1665 12.7963 14.1665 14.2173 13.5003L19 11.2581V16.6252C19 17.6333 18.4965 18.577 17.6147 19.0654C16.1463 19.8786 13.796 20.9998 12 20.9998C10.204 20.9998 7.8537 19.8786 6.38533 19.0654C5.5035 18.577 5 17.6333 5 16.6252V11.2581Z\" opacity=\".5\"/>","chart-column":"<path fill=\"currentColor\" d=\"M21 21.25C21.4142 21.25 21.75 21.5858 21.75 22C21.75 22.4142 21.4142 22.75 21 22.75H3C2.58579 22.75 2.25 22.4142 2.25 22C2.25 21.5858 2.58579 21.25 3 21.25H21Z\"/><path fill=\"currentColor\" d=\"M5 9C5.94281 9 6.41414 9.00008 6.70703 9.29297C6.99992 9.58586 7 10.0572 7 11V17C7 17.9428 6.99992 18.4141 6.70703 18.707C6.41414 18.9999 5.94281 19 5 19C4.05719 19 3.58586 18.9999 3.29297 18.707C3.00008 18.4141 3 17.9428 3 17V11C3 10.0572 3.00008 9.58586 3.29297 9.29297C3.58586 9.00008 4.05719 9 5 9Z\"/><g fill=\"currentColor\" opacity=\".5\"><path d=\"M12 5C12.9428 5 13.4141 5.00008 13.707 5.29297C13.9999 5.58586 14 6.05719 14 7V17C14 17.9428 13.9999 18.4141 13.707 18.707C13.4141 18.9999 12.9428 19 12 19C11.0572 19 10.5859 18.9999 10.293 18.707C10.0001 18.4141 10 17.9428 10 17V7C10 6.05719 10.0001 5.58586 10.293 5.29297C10.5859 5.00008 11.0572 5 12 5Z\"/><path d=\"M19 2C19.9428 2 20.4141 2.00008 20.707 2.29297C20.9999 2.58586 21 3.05719 21 4V17C21 17.9428 20.9999 18.4141 20.707 18.707C20.4141 18.9999 19.9428 19 19 19C18.0572 19 17.5859 18.9999 17.293 18.707C17.0001 18.4141 17 17.9428 17 17V4C17 3.05719 17.0001 2.58586 17.293 2.29297C17.5859 2.00008 18.0572 2 19 2Z\"/></g>","wallet":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M21.1885 10.0037C22.1109 10.0603 22.9263 10.7611 22.9951 11.7401C22.9996 11.8043 23 11.8741 23 11.9383V16.0613C23 16.1255 22.9996 16.1954 22.9951 16.2596C22.9263 17.2386 22.1109 17.9393 21.1885 17.9959C21.1263 17.9997 21.0585 17.9998 20.9883 17.9998H18.2148C15.9435 17.9998 14 16.2637 14 13.9998C14 11.7359 15.9435 9.99986 18.2148 9.99982H20.9883C21.0585 9.99979 21.1263 9.99991 21.1885 10.0037ZM17.9707 12.9334C17.3859 12.9334 16.9121 13.4107 16.9121 13.9998C16.9121 14.5889 17.3859 15.0662 17.9707 15.0662C18.5554 15.0662 19.0293 14.5889 19.0293 13.9998C19.0293 13.4108 18.5554 12.9335 17.9707 12.9334Z\" clip-rule=\"evenodd\"/><path fill=\"currentColor\" d=\"M9.46973 8.88556C9.86895 8.88556 10.1924 9.21172 10.1924 9.61408C10.1924 10.0165 9.86897 10.3426 9.46973 10.3426H5.61426C5.21512 10.3425 4.8916 10.0164 4.8916 9.61408C4.89163 9.2118 5.21514 8.88569 5.61426 8.88556H9.46973Z\"/><path fill=\"currentColor\" d=\"M10.1016 2.57208C11.2301 1.80932 12.7592 1.80929 13.8877 2.57208L16 3.99982L17.9014 5.2674C17.6892 5.22148 17.4683 5.18394 17.2393 5.15314C16.1001 4.99999 14.6442 4.9998 12.8066 4.99982H10.6934C8.85875 4.9998 7.40494 4.99977 6.2666 5.15216L8 3.99201L10.1016 2.57208Z\"/><path fill=\"currentColor\" d=\"M21.1394 10.0015C21.1394 8.82091 21.0965 7.55447 20.3418 6.64658C20.2689 6.55894 20.1914 6.47384 20.1088 6.39124C19.3604 5.64288 18.4114 5.31076 17.239 5.15314C16.0998 4.99997 14.6442 4.99999 12.8064 5H10.6936C8.85583 4.99999 7.40019 4.99997 6.26098 5.15314C5.08856 5.31076 4.13961 5.64288 3.39124 6.39124C2.64288 7.13961 2.31076 8.08856 2.15314 9.26098C1.99997 10.4002 1.99999 11.8558 2 13.6936V13.8064C1.99999 15.6442 1.99997 17.0998 2.15314 18.239C2.31076 19.4114 2.64288 20.3604 3.39124 21.1088C4.13961 21.8571 5.08856 22.1892 6.26098 22.3469C7.40018 22.5 8.8558 22.5 10.6935 22.5H12.8064C14.6442 22.5 16.0998 22.5 17.239 22.3469C18.4114 22.1892 19.3604 21.8571 20.1088 21.1088C20.3133 20.9042 20.487 20.6844 20.6346 20.4486C21.0851 19.7291 21.1394 18.8473 21.1394 17.9985C21.0912 18 21.0404 18 20.9882 18L18.2149 18C15.9435 18 14 16.2639 14 14C14 11.7361 15.9435 10 18.2149 10L20.9881 10C21.0403 9.99999 21.0912 9.99997 21.1394 10.0015Z\" opacity=\".5\"/>","megaphone":"<path fill=\"currentColor\" d=\"M2.00299 11.7155C2.04033 9.87326 2.059 8.95215 2.67093 8.16363C2.78262 8.0197 2.9465 7.8487 3.08385 7.73274C3.83639 7.09741 4.82995 7.09741 6.81706 7.09741C7.527 7.09741 7.88197 7.09741 8.22035 7.00452C8.29067 6.98522 8.36024 6.96296 8.4289 6.93781C8.75936 6.81674 9.05574 6.60837 9.64851 6.19161C11.9872 4.54738 13.1565 3.72527 14.138 4.08241C14.3261 4.15088 14.5083 4.24972 14.671 4.37162C15.5194 5.00744 15.5839 6.48675 15.7128 9.44537C15.7606 10.5409 15.7931 11.4785 15.7931 12C15.7931 12.5215 15.7606 13.4591 15.7128 14.5546C15.5839 17.5132 15.5194 18.9926 14.671 19.6284C14.5083 19.7503 14.3261 19.8491 14.138 19.9176C13.1565 20.2747 11.9872 19.4526 9.64851 17.8084C9.05574 17.3916 8.75936 17.1833 8.4289 17.0622C8.36024 17.037 8.29067 17.0148 8.22035 16.9955C7.88197 16.9026 7.52701 16.9026 6.81706 16.9026C4.82995 16.9026 3.83639 16.9026 3.08385 16.2673C2.9465 16.1513 2.78262 15.9803 2.67093 15.8364C2.059 15.0478 2.04033 14.1267 2.00299 12.2845C2.00103 12.1878 2 12.0928 2 12C2 11.9072 2.00103 11.8122 2.00299 11.7155Z\"/><g fill=\"currentColor\" opacity=\".5\"><path d=\"M19.2746 5.42387C19.5927 5.15879 20.0661 5.20161 20.3313 5.51957L19.8371 5.93168C20.3266 5.52381 20.3322 5.52058 20.3322 5.52055L20.3371 5.52641C20.3392 5.52898 20.3412 5.53274 20.344 5.53618C20.3496 5.54323 20.3572 5.55188 20.3654 5.56254C20.3821 5.58407 20.4039 5.61303 20.4299 5.64946C20.4821 5.72258 20.5521 5.82617 20.633 5.96098C20.7949 6.23078 21.0016 6.62665 21.2053 7.15629C21.6134 8.21765 22.0051 9.80885 22.0051 12C22.0051 14.1912 21.6134 15.7824 21.2053 16.8438C21.0016 17.3735 20.7949 17.7693 20.633 18.0391C20.5521 18.1739 20.4821 18.2775 20.4299 18.3506C20.4039 18.3871 20.3821 18.416 20.3654 18.4375C20.3572 18.4482 20.3496 18.4569 20.344 18.4639C20.3412 18.4673 20.3392 18.4711 20.3371 18.4737L20.3322 18.4786C20.331 18.4777 20.3049 18.4582 19.7551 18L20.3313 18.4805C20.0661 18.7985 19.5928 18.8413 19.2746 18.5762C18.9764 18.3275 18.9203 17.8962 19.133 17.5811L19.175 17.5254L19.176 17.5235L19.1779 17.5215L19.1789 17.5196C19.1843 17.5126 19.1946 17.4989 19.2092 17.4786C19.2389 17.4369 19.2863 17.3669 19.3459 17.2676C19.4653 17.0687 19.6337 16.7509 19.8049 16.3057C20.1467 15.4171 20.5051 14.0084 20.5051 12C20.5051 9.99167 20.1467 8.583 19.8049 7.69438C19.6337 7.2492 19.4653 6.93139 19.3459 6.73247C19.2863 6.63321 19.2389 6.56316 19.2092 6.52153L19.1789 6.48051L19.133 6.41899C18.9203 6.10392 18.9764 5.67254 19.2746 5.42387Z\"/><path d=\"M17.757 8.41606C18.0899 8.21886 18.5105 8.34635 18.6955 8.70122V8.70317L18.6965 8.70415L18.6984 8.70708L18.7014 8.71391L18.7102 8.73247C18.7168 8.74618 18.7252 8.7633 18.7346 8.78422C18.7534 8.82641 18.7778 8.88399 18.8049 8.9561C18.859 9.10037 18.9256 9.30565 18.9904 9.57524C19.1203 10.1154 19.2414 10.912 19.2414 12C19.2414 13.0884 19.1203 13.8856 18.9904 14.4258C18.9256 14.6956 18.859 14.9007 18.8049 15.045C18.7779 15.117 18.7534 15.1737 18.7346 15.2159C18.7252 15.237 18.7168 15.2548 18.7102 15.2686L18.7014 15.2862L18.6984 15.293L18.6965 15.2959L18.6955 15.2979C18.6927 15.2964 18.6524 15.2734 18.092 14.9415L18.6955 15.2979C18.5105 15.6529 18.09 15.7822 17.757 15.585C17.4271 15.3894 17.3064 14.9473 17.4846 14.5938L17.4895 14.584C17.4957 14.57 17.5077 14.5417 17.5236 14.4991C17.5557 14.4136 17.6045 14.2687 17.6545 14.0606C17.7545 13.6448 17.8625 12.9705 17.8625 12C17.8625 11.03 17.7544 10.3563 17.6545 9.94047C17.6045 9.73233 17.5557 9.58751 17.5236 9.502C17.5076 9.45935 17.4958 9.43118 17.4895 9.41704L17.4846 9.40727C17.3064 9.05383 17.4271 8.61172 17.757 8.41606Z\"/></g>","sliders-horizontal":"<path fill=\"currentColor\" d=\"M9.25 14C10.9069 14 12.25 15.3431 12.25 17C12.25 18.6569 10.9069 20 9.25 20C7.59315 20 6.25 18.6569 6.25 17C6.25 15.3431 7.59315 14 9.25 14Z\"/><path fill=\"currentColor\" d=\"M14.25 4C12.5931 4 11.25 5.34315 11.25 7C11.25 8.65685 12.5931 10 14.25 10C15.9069 10 17.25 8.65685 17.25 7C17.25 5.34315 15.9069 4 14.25 4Z\"/><g fill=\"currentColor\" opacity=\".5\"><path d=\"M17.1658 7.7085C17.2208 7.48132 17.25 7.24405 17.25 6.99997C17.25 6.72602 17.2133 6.46064 17.1445 6.2085H21.75C22.1642 6.2085 22.5 6.54428 22.5 6.9585C22.5 7.37271 22.1642 7.7085 21.75 7.7085L17.1658 7.7085Z\"/><path d=\"M11.3555 6.2085C11.2867 6.46064 11.25 6.72602 11.25 6.99997C11.25 7.24405 11.2791 7.48132 11.3342 7.7085L1.75 7.7085C1.33579 7.7085 1 7.37271 1 6.9585C1 6.54428 1.33579 6.2085 1.75 6.2085H11.3555Z\"/><path d=\"M6.35551 16.2085H1.75C1.33579 16.2085 1 16.5443 1 16.9585C1 17.3727 1.33579 17.7085 1.75 17.7085H6.33416C6.27915 17.4813 6.25 17.2441 6.25 17C6.25 16.726 6.28672 16.4606 6.35551 16.2085Z\"/><path d=\"M12.1658 17.7085H21.75C22.1642 17.7085 22.5 17.3727 22.5 16.9585C22.5 16.5443 22.1642 16.2085 21.75 16.2085H12.1445C12.2133 16.4606 12.25 16.726 12.25 17C12.25 17.2441 12.2209 17.4813 12.1658 17.7085Z\"/></g>","globe":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M2.02734 11.25C2.41087 6.07745 6.72909 2 11.9996 2C11.1688 2 10.429 2.36421 9.82044 2.92113C9.21492 3.47525 8.70322 4.24878 8.28934 5.16315C7.87303 6.08292 7.54964 7.15868 7.33077 8.32611C7.15531 9.26194 7.04854 10.2485 7.01295 11.25H2.02734ZM2.02734 12.75H7.01295C7.04854 13.7515 7.15531 14.7381 7.33077 15.6739C7.54964 16.8413 7.87303 17.9171 8.28934 18.8368C8.70322 19.7512 9.21492 20.5247 9.82044 21.0789C10.429 21.6358 11.1688 22 11.9996 22C6.72909 22 2.41087 17.9226 2.02734 12.75Z\" clip-rule=\"evenodd\"/><path fill=\"currentColor\" d=\"M11.9996 2C12.8305 2 13.5703 2.36421 14.1788 2.92113C14.7844 3.47525 15.2961 4.24878 15.7099 5.16315C16.1263 6.08292 16.4496 7.15868 16.6685 8.32612C16.844 9.26194 16.9507 10.2485 16.9863 11.25H21.9719C21.5884 6.07745 17.2702 2 11.9996 2Z\"/><path fill=\"currentColor\" d=\"M16.6685 15.6739C16.4496 16.8413 16.1263 17.9171 15.7099 18.8368C15.2961 19.7512 14.7844 20.5247 14.1788 21.0789C13.5703 21.6358 12.8305 22 11.9996 22C17.2702 22 21.5884 17.9226 21.9719 12.75H16.9863C16.9507 13.7515 16.844 14.7381 16.6685 15.6739Z\"/><g fill=\"currentColor\" opacity=\".5\"><path d=\"M12.0007 3.39551C11.7257 3.39551 11.3704 3.51252 10.9573 3.89058C10.5411 4.27142 10.1245 4.86831 9.75639 5.68153C9.39074 6.48936 9.09383 7.46456 8.88951 8.55435C8.7286 9.41258 8.62878 10.3223 8.59375 11.2502H15.4076C15.3726 10.3223 15.2727 9.41258 15.1118 8.55435C14.9075 7.46457 14.6106 6.48937 14.245 5.68153C13.8769 4.86831 13.4602 4.27142 13.0441 3.89058C12.631 3.51252 12.2757 3.39551 12.0007 3.39551Z\"/><path d=\"M8.88951 15.446C9.09383 16.5358 9.39074 17.511 9.75639 18.3188C10.1245 19.132 10.5411 19.7289 10.9573 20.1097C11.3704 20.4878 11.7257 20.6048 12.0007 20.6048C12.2757 20.6048 12.631 20.4878 13.0441 20.1097C13.4602 19.7289 13.8769 19.132 14.245 18.3188C14.6106 17.511 14.9075 16.5358 15.1118 15.446C15.2727 14.5877 15.3726 13.678 15.4076 12.7502H8.59375C8.62878 13.678 8.7286 14.5877 8.88951 15.446Z\"/></g>","credit-card":"<path fill=\"currentColor\" d=\"M9.99976 20H13.9998C17.771 20 19.6566 20 20.8282 18.8284C21.9998 17.6569 21.9998 15.7712 21.9998 12C21.9998 11.5581 21.9981 10.392 21.9962 10H2C1.99811 10.392 1.99976 11.5581 1.99976 12C1.99976 15.7712 1.99976 17.6569 3.17133 18.8284C4.34291 20 6.22852 20 9.99976 20Z\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M10 15.25C10.4142 15.25 10.75 15.5858 10.75 16C10.75 16.4142 10.4142 16.75 10 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H10Z\"/><path fill=\"currentColor\" d=\"M14 15.25C14.4142 15.25 14.75 15.5858 14.75 16C14.75 16.4142 14.4142 16.75 14 16.75H12.5C12.0858 16.75 11.75 16.4142 11.75 16C11.75 15.5858 12.0858 15.25 12.5 15.25H14Z\"/><path fill=\"currentColor\" d=\"M14.0049 4C17.7858 4 19.677 4.00043 20.8516 5.11621C21.6969 5.91957 21.9337 7.07538 22 9V10H2V9C2.06629 7.07538 2.30305 5.91957 3.14844 5.11621C4.32303 4.00043 6.21416 4 9.99512 4H14.0049Z\"/>","settings":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608C20.4261 13.0639 20.1197 12.558 20.1197 11.9999C20.1197 11.4418 20.4261 10.9361 20.9022 10.6392C21.2263 10.4371 21.435 10.2757 21.5836 10.0835C21.9089 9.66273 22.0525 9.13087 21.9828 8.60497C21.9304 8.21055 21.6957 7.80703 21.2262 7C20.7567 6.19297 20.522 5.78945 20.2039 5.54727C19.7799 5.22436 19.244 5.08185 18.7141 5.15109C18.4722 5.18269 18.2269 5.28136 17.8887 5.4588C17.3915 5.71959 16.7969 5.73002 16.3099 5.45096C15.8229 5.17191 15.5347 4.65566 15.5136 4.09794C15.4993 3.71848 15.4628 3.45833 15.3694 3.23463C15.1649 2.74458 14.7726 2.35523 14.2788 2.15224Z\" clip-rule=\"evenodd\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M15.5222 12C15.5222 13.6569 14.1689 15 12.4994 15C10.8299 15 9.47656 13.6569 9.47656 12C9.47656 10.3431 10.8299 9 12.4994 9C14.1689 9 15.5222 10.3431 15.5222 12Z\"/>","log-out":"<path fill=\"currentColor\" d=\"M15.9998 2L14.9998 2C12.1714 2 10.7576 2.00023 9.87891 2.87891C9.00023 3.75759 9.00023 5.1718 9.00023 8.00023L9.00023 16.0002C9.00023 18.8287 9.00023 20.2429 9.87891 21.1215C10.7574 22 12.1706 22 14.9976 22L14.9998 22L15.9998 22C18.8282 22 20.2424 22 21.1211 21.1213C21.9998 20.2426 21.9998 18.8284 21.9998 16L21.9998 8L21.9998 7.99998C21.9998 5.17157 21.9998 3.75736 21.1211 2.87868C20.2424 2 18.8282 2 15.9998 2Z\" opacity=\".5\"/><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M15.75 12C15.75 11.5858 15.4142 11.25 15 11.25L4.02744 11.25L5.98809 9.56943C6.30259 9.29986 6.33901 8.82639 6.06944 8.51189C5.79988 8.1974 5.3264 8.16098 5.01191 8.43054L1.51191 11.4305C1.34567 11.573 1.25 11.781 1.25 12C1.25 12.2189 1.34567 12.4269 1.51191 12.5694L5.01191 15.5694C5.3264 15.839 5.79988 15.8026 6.06944 15.4881C6.33901 15.1736 6.30259 14.7001 5.98809 14.4305L4.02744 12.75L15 12.75C15.4142 12.75 15.75 12.4142 15.75 12Z\" clip-rule=\"evenodd\"/>","search":"<path fill=\"currentColor\" d=\"M20.313 11.157a9.157 9.157 0 1 1-18.313 0a9.157 9.157 0 0 1 18.313 0\" opacity=\".5\"/><path fill=\"currentColor\" d=\"m17.1 18.122l3.666 3.666a.723.723 0 0 0 1.023-1.022L18.122 17.1a9 9 0 0 1-1.022 1.022\"/>","plus":"<path fill=\"currentColor\" d=\"M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z\"/>","bell":"<path fill=\"currentColor\" d=\"M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.8 25.8 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M12.75 6a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0\"/>","sun":"<path fill=\"currentColor\" d=\"M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z\"/><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12ZM12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z\" clip-rule=\"evenodd\"/><g fill=\"currentColor\" opacity=\".5\"><path d=\"M4.39936 4.39838C4.69225 4.10549 5.16712 4.10549 5.46002 4.39838L5.85285 4.79122C6.14575 5.08411 6.14575 5.55898 5.85285 5.85188C5.55996 6.14477 5.08509 6.14477 4.79219 5.85188L4.39936 5.45904C4.10646 5.16615 4.10646 4.69127 4.39936 4.39838Z\"/><path d=\"M19.6019 4.39864C19.8948 4.69153 19.8948 5.16641 19.6019 5.4593L19.209 5.85214C18.9161 6.14503 18.4413 6.14503 18.1484 5.85214C17.8555 5.55924 17.8555 5.08437 18.1484 4.79148L18.5412 4.39864C18.8341 4.10575 19.309 4.10575 19.6019 4.39864Z\"/><path d=\"M18.1484 18.1474C18.4413 17.8545 18.9161 17.8545 19.209 18.1474L19.6019 18.5402C19.8948 18.8331 19.8948 19.308 19.6019 19.6009C19.309 19.8938 18.8341 19.8938 18.5412 19.6009L18.1484 19.2081C17.8555 18.9152 17.8555 18.4403 18.1484 18.1474Z\"/><path d=\"M5.85285 18.1477C6.14575 18.4406 6.14575 18.9154 5.85286 19.2083L5.46002 19.6012C5.16712 19.8941 4.69225 19.8941 4.39936 19.6012C4.10646 19.3083 4.10646 18.8334 4.39936 18.5405L4.79219 18.1477C5.08509 17.8548 5.55996 17.8548 5.85285 18.1477Z\"/></g>","moon":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M22 12C22 17.5228 17.5228 22 12 22C10.8358 22 9.71801 21.801 8.67887 21.4353C8.24138 20.3767 8 19.2165 8 18C8 15.7787 8.80467 13.7455 10.1384 12.1757C11.31 13.8814 13.2744 15 15.5 15C17.8615 15 19.9289 13.7406 21.0672 11.8568C21.3065 11.4608 22 11.5373 22 12Z\" clip-rule=\"evenodd\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M2 12C2 16.3586 4.78852 20.0659 8.67887 21.4353C8.24138 20.3768 8 19.2166 8 18C8 15.7788 8.80467 13.7455 10.1384 12.1758C9.42027 11.1303 9 9.86422 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12Z\"/>","user":"<circle cx=\"12\" cy=\"6\" r=\"4\" fill=\"currentColor\"/><ellipse cx=\"12\" cy=\"17\" fill=\"currentColor\" opacity=\".5\" rx=\"7\" ry=\"4\"/>","users":"<g fill=\"currentColor\" opacity=\".5\"><path d=\"M16 14C18.7614 14 21 15.3431 21 17C21 18.6569 18.7614 20 16 20C13.2386 20 11 18.6569 11 17C11 15.3431 13.2386 14 16 14Z\"/><path d=\"M15 3C16.6569 3 18 4.34315 18 6C18 7.65685 16.6569 9 15 9C13.3431 9 12 7.65685 12 6C12 4.34315 13.3431 3 15 3Z\"/></g><path fill=\"currentColor\" d=\"M9 13.001C12.866 13.001 16 14.7918 16 17.001C16 19.2101 12.866 21.001 9 21.001C5.13401 21.001 2 19.2101 2 17.001C2 14.7918 5.13401 13.001 9 13.001Z\"/><path fill=\"currentColor\" d=\"M9 2C11.2091 2 13 3.79086 13 6C13 8.20914 11.2091 10 9 10C6.79086 10 5 8.20914 5 6C5 3.79086 6.79086 2 9 2Z\"/>","clipboard":"<path fill=\"currentColor\" d=\"M21 15.9983V9.99826C21 7.16983 21 5.75562 20.1213 4.87694C19.3529 4.10856 18.175 4.01211 16 4H8C5.82497 4.01211 4.64706 4.10856 3.87868 4.87694C3 5.75562 3 7.16983 3 9.99826V15.9983C3 18.8267 3 20.2409 3.87868 21.1196C4.75736 21.9983 6.17157 21.9983 9 21.9983H15C17.8284 21.9983 19.2426 21.9983 20.1213 21.1196C21 20.2409 21 18.8267 21 15.9983Z\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M14.4883 10.4521C14.791 10.1696 15.2652 10.1857 15.5479 10.4883C15.8304 10.791 15.8143 11.2652 15.5117 11.5479L11.2256 15.5479C10.9374 15.8168 10.4903 15.8168 10.2021 15.5479L8.48828 13.9482C8.18548 13.6656 8.16953 13.1915 8.45215 12.8887C8.73475 12.5859 9.2089 12.569 9.51172 12.8516L10.7139 13.9736L14.4883 10.4521Z\"/><path fill=\"currentColor\" d=\"M14.5 2C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5C8 2.67157 8.67157 2 9.5 2H14.5Z\"/>","trophy":"<g fill=\"currentColor\" opacity=\".5\"><path d=\"M14.1803 18.6963C14.6569 18.6963 15.0672 19.0327 15.1608 19.5L15.4577 21.25H8.54262L8.8395 19.5C8.93305 19.0327 9.34337 18.6963 9.81997 18.6963H14.1803Z\"/><path d=\"M12.0006 2C13.784 2.00002 15.2536 2.15704 16.3776 2.34668C17.5161 2.53877 18.0855 2.63489 18.5612 3.2207C19.0368 3.80653 19.0118 4.43984 18.9616 5.70605C18.7808 10.259 17.7603 15.9998 12.0006 16C6.24069 16 5.22046 10.2591 5.03969 5.70605C4.98943 4.43991 4.96354 3.80651 5.43911 3.2207C5.91482 2.63481 6.48495 2.53881 7.62368 2.34668C8.74769 2.15705 10.2173 2 12.0006 2Z\"/></g><path fill=\"currentColor\" d=\"M18 21.25C18.4142 21.25 18.75 21.5858 18.75 22C18.75 22.4142 18.4142 22.75 18 22.75H6C5.58579 22.75 5.25 22.4142 5.25 22C5.25 21.5858 5.58579 21.25 6 21.25H18Z\"/><path fill=\"currentColor\" d=\"M12.75 18.6963H11.25V15.9658C11.4906 15.9885 11.7405 16 12 16C12.2594 16 12.5094 15.9885 12.75 15.9658V18.6963Z\"/><path fill=\"currentColor\" d=\"M5.01758 5.08691C5.02225 5.27545 5.03012 5.48073 5.03906 5.70605C5.12737 7.93046 5.41648 10.4385 6.36035 12.4219L3.54297 10.8574C2.79055 10.4394 2.41422 10.23 2.20703 9.87793C2 9.52592 2.00002 9.0956 2 8.23535V8.16211C1.99997 7.11866 2.00009 6.59692 2.2832 6.2041C2.56635 5.81128 3.06173 5.64641 4.05176 5.31641L5 5L5.01758 5.08691Z\"/><path fill=\"currentColor\" d=\"M19.9482 5.31641C20.9383 5.64642 21.4337 5.81126 21.7168 6.2041C21.9999 6.59692 22 7.11865 22 8.16211V8.23535C22 9.09558 22 9.52593 21.793 9.87793C21.5858 10.23 21.2094 10.4394 20.457 10.8574L17.6406 12.4219C18.5844 10.4385 18.8726 7.93036 18.9609 5.70605C18.9699 5.47994 18.9787 5.27404 18.9834 5.08496L19 5L19.9482 5.31641Z\"/><path fill=\"currentColor\" d=\"M12 5C12.2841 5 12.4745 5.34079 12.8545 6.02246L12.9521 6.19922C13.0601 6.39281 13.1141 6.48982 13.1982 6.55371C13.2824 6.61762 13.388 6.64103 13.5977 6.68848L13.7881 6.73145C14.526 6.8984 14.8946 6.98237 14.9824 7.26465C15.07 7.5468 14.8191 7.84084 14.3164 8.42871L14.1855 8.58105C14.0426 8.74817 13.9716 8.83216 13.9395 8.93555C13.9074 9.03887 13.9179 9.15027 13.9395 9.37305L13.959 9.57617C14.035 10.3606 14.0732 10.7531 13.8438 10.9277C13.6139 11.1022 13.268 10.9431 12.5771 10.625L12.3984 10.543C12.2022 10.4526 12.104 10.4072 12 10.4072C11.896 10.4072 11.7978 10.4526 11.6016 10.543L11.4229 10.625C10.732 10.9431 10.3861 11.1022 10.1563 10.9277C9.92683 10.7531 9.965 10.3606 10.041 9.57617L10.0605 9.37305C10.0821 9.15027 10.0926 9.03887 10.0605 8.93555C10.0284 8.83216 9.95736 8.74817 9.81445 8.58105L9.68359 8.42871C9.18087 7.84084 8.93 7.5468 9.01758 7.26465C9.10536 6.98237 9.47401 6.8984 10.2119 6.73145L10.4023 6.68848C10.612 6.64103 10.7176 6.61762 10.8018 6.55371C10.8859 6.48982 10.9399 6.39281 11.0479 6.19922L11.1455 6.02246C11.5255 5.34079 11.7159 5 12 5Z\"/>","shield-alert":"<path fill=\"currentColor\" d=\"M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167V11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914V10.4167Z\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z\"/><path fill=\"currentColor\" d=\"M12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16Z\"/>","trending-up":"<path fill=\"currentColor\" d=\"M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M14.5 10.75C14.0858 10.75 13.75 10.4142 13.75 10C13.75 9.58579 14.0858 9.25 14.5 9.25H17C17.4142 9.25 17.75 9.58579 17.75 10V12.5C17.75 12.9142 17.4142 13.25 17 13.25C16.5858 13.25 16.25 12.9142 16.25 12.5V11.8107L14.2374 13.8232C13.554 14.5066 12.446 14.5066 11.7626 13.8232L10.1768 12.2374C10.0791 12.1398 9.92085 12.1398 9.82322 12.2374L7.53033 14.5303C7.23744 14.8232 6.76256 14.8232 6.46967 14.5303C6.17678 14.2374 6.17678 13.7626 6.46967 13.4697L8.76256 11.1768C9.44598 10.4934 10.554 10.4934 11.2374 11.1768L12.8232 12.7626C12.9209 12.8602 13.0791 12.8602 13.1768 12.7626L15.1893 10.75H14.5Z\"/>","percent":"<path fill=\"currentColor\" d=\"M9.59236 3.20031C9.34886 3.40782 9.2271 3.51158 9.09706 3.59874C8.79896 3.79854 8.46417 3.93721 8.1121 4.00672C7.95851 4.03705 7.79903 4.04977 7.48008 4.07522L7.48007 4.07523C6.67869 4.13918 6.278 4.17115 5.94371 4.28923C5.17051 4.56233 4.56233 5.17051 4.28923 5.94371C4.17115 6.278 4.13918 6.67869 4.07523 7.48007L4.07522 7.48008C4.04977 7.79903 4.03705 7.95851 4.00672 8.1121C3.93721 8.46417 3.79854 8.79896 3.59874 9.09706C3.51158 9.2271 3.40781 9.34887 3.20028 9.59239L3.20027 9.5924C2.67883 10.2043 2.4181 10.5102 2.26522 10.8301C1.91159 11.57 1.91159 12.43 2.26522 13.1699C2.41811 13.4898 2.67883 13.7957 3.20027 14.4076L3.20031 14.4076C3.4078 14.6511 3.51159 14.7729 3.59874 14.9029C3.79854 15.201 3.93721 15.5358 4.00672 15.8879C4.03705 16.0415 4.04977 16.201 4.07522 16.5199L4.07523 16.5199C4.13918 17.3213 4.17115 17.722 4.28923 18.0563C4.56233 18.8295 5.17051 19.4377 5.94371 19.7108C6.27799 19.8288 6.67867 19.8608 7.48 19.9248L7.48008 19.9248C7.79903 19.9502 7.95851 19.963 8.1121 19.9933C8.46417 20.0628 8.79896 20.2015 9.09706 20.4013C9.22711 20.4884 9.34887 20.5922 9.5924 20.7997C10.2043 21.3212 10.5102 21.5819 10.8301 21.7348C11.57 22.0884 12.43 22.0884 13.1699 21.7348C13.4898 21.5819 13.7957 21.3212 14.4076 20.7997C14.6511 20.5922 14.7729 20.4884 14.9029 20.4013C15.201 20.2015 15.5358 20.0628 15.8879 19.9933C16.0415 19.963 16.201 19.9502 16.5199 19.9248L16.52 19.9248C17.3213 19.8608 17.722 19.8288 18.0563 19.7108C18.8295 19.4377 19.4377 18.8295 19.7108 18.0563C19.8288 17.722 19.8608 17.3213 19.9248 16.52L19.9248 16.5199C19.9502 16.201 19.963 16.0415 19.9933 15.8879C20.0628 15.5358 20.2015 15.201 20.4013 14.9029C20.4884 14.7729 20.5922 14.6511 20.7997 14.4076C21.3212 13.7957 21.5819 13.4898 21.7348 13.1699C22.0884 12.43 22.0884 11.57 21.7348 10.8301C21.5819 10.5102 21.3212 10.2043 20.7997 9.5924C20.5922 9.34887 20.4884 9.22711 20.4013 9.09706C20.2015 8.79896 20.0628 8.46417 19.9933 8.1121C19.963 7.95851 19.9502 7.79903 19.9248 7.48008L19.9248 7.48C19.8608 6.67867 19.8288 6.27799 19.7108 5.94371C19.4377 5.17051 18.8295 4.56233 18.0563 4.28923C17.722 4.17115 17.3213 4.13918 16.5199 4.07523L16.5199 4.07522C16.201 4.04977 16.0415 4.03705 15.8879 4.00672C15.5358 3.93721 15.201 3.79854 14.9029 3.59874C14.7729 3.51158 14.6511 3.40781 14.4076 3.20027C13.7957 2.67883 13.4898 2.41811 13.1699 2.26522C12.43 1.91159 11.57 1.91159 10.8301 2.26522C10.5102 2.4181 10.2043 2.67883 9.5924 3.20027L9.59236 3.20031Z\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M15.8309 8.17001C16.1487 8.48785 16.1487 9.00315 15.8309 9.32099L9.32001 15.8319C9.00218 16.1497 8.48687 16.1497 8.16904 15.8319C7.85121 15.514 7.85121 14.9987 8.16904 14.6809L14.6799 8.17001C14.9978 7.85218 15.5131 7.85218 15.8309 8.17001Z\"/><path fill=\"currentColor\" d=\"M15.798 14.7138C15.798 15.3131 15.3121 15.799 14.7128 15.799C14.1135 15.799 13.6277 15.3131 13.6277 14.7138C13.6277 14.1145 14.1135 13.6287 14.7128 13.6287C15.3121 13.6287 15.798 14.1145 15.798 14.7138Z\"/><path fill=\"currentColor\" d=\"M9.2871 10.3732C9.88641 10.3732 10.3722 9.88738 10.3722 9.28807C10.3722 8.68876 9.88641 8.20293 9.2871 8.20293C8.68779 8.20293 8.20195 8.68876 8.20195 9.28807C8.20195 9.88738 8.68779 10.3732 9.2871 10.3732Z\"/>","user-check":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M16.5 15C18.1499 15 18.9747 15.0001 19.4873 15.5127C19.9999 16.0253 20 16.8501 20 18.5C20 20.1499 19.9999 20.9747 19.4873 21.4873C18.9747 21.9999 18.1499 22 16.5 22C14.8501 22 14.0253 21.9999 13.5127 21.4873C13.0001 20.9747 13 20.1499 13 18.5C13 16.8501 13.0001 16.0253 13.5127 15.5127C14.0253 15.0001 14.8501 15 16.5 15ZM18.4678 16.9209C18.24 16.6933 17.8713 16.6933 17.6436 16.9209L15.7227 18.8418L15.3564 18.4766C15.1286 18.2489 14.76 18.2489 14.5322 18.4766C14.3044 18.7044 14.3044 19.074 14.5322 19.3018L15.3096 20.0791C15.5374 20.3069 15.907 20.3069 16.1348 20.0791L18.4678 17.7461C18.6956 17.5183 18.6956 17.1487 18.4678 16.9209Z\" clip-rule=\"evenodd\"/><path fill=\"currentColor\" d=\"M12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2Z\"/><path fill=\"currentColor\" d=\"M18.0947 15.0312C17.6699 15 17.1487 15 16.5 15C14.8501 15 14.0251 15 13.5126 15.5126C13 16.0251 13 16.8501 13 18.5C13 19.6663 13 20.4204 13.1811 20.9433C12.7971 20.9806 12.4025 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C14.6134 13 16.8924 13.8184 18.0947 15.0312Z\" opacity=\".5\"/>","shield":"<path fill=\"currentColor\" d=\"M3.37752 5.08241C3 5.62028 3 7.21907 3 10.4167V11.9914C3 17.6294 7.23896 20.3655 9.89856 21.5273C10.62 21.8424 10.9807 22 12 22C13.0193 22 13.38 21.8424 14.1014 21.5273C16.761 20.3655 21 17.6294 21 11.9914V10.4167C21 7.21907 21 5.62028 20.6225 5.08241C20.245 4.54454 18.7417 4.02996 15.7351 3.00079L15.1623 2.80472C13.595 2.26824 12.8114 2 12 2C11.1886 2 10.405 2.26824 8.83772 2.80472L8.26491 3.00079C5.25832 4.02996 3.75503 4.54454 3.37752 5.08241Z\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M15.0595 10.4995C15.3353 10.1905 15.3085 9.71643 14.9995 9.44055C14.6905 9.16468 14.2164 9.19152 13.9406 9.5005L10.9286 12.8739L10.0595 11.9005C9.78359 11.5915 9.30947 11.5647 9.0005 11.8406C8.69152 12.1164 8.66468 12.5905 8.94055 12.8995L10.3691 14.4995C10.5114 14.6589 10.7149 14.75 10.9286 14.75C11.1422 14.75 11.3457 14.6589 11.488 14.4995L15.0595 10.4995Z\"/>"};
  function MSIcon(props) {
    const ic = MS_ICONS[props.name];
    const size = props.size || 20;
    if (!ic) return <DS.Icon name={props.name} size={size} strokeWidth={2} />;
    return (
      <svg className="ms7-ico2" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ic }} />
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
