/* Menu lateral (desktop) + barra inferior (celular) — visual novo (Zeph).
   Mesmas props do original: items, footerItems, activeId, onNavigate, open, onToggle, brand, style. */
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const CSS = [
    '.ms7-rail{display:flex;flex-direction:column;flex-shrink:0;box-sizing:border-box;padding:14px 12px 12px;gap:4px;background:transparent;transition:width 320ms var(--ease-standard);z-index:30;position:relative}',
    '.ms7-rail.is-open{width:var(--rail-w-open)}.ms7-rail:not(.is-open){width:var(--rail-w)}',
    '.ms7-rail-logo{height:44px;display:flex;align-items:center;gap:11px;padding:0 4px;margin-bottom:14px;border:0;background:transparent;cursor:pointer;color:var(--text-primary);border-radius:12px;flex-shrink:0;text-align:left}',
    '.ms7-rail-mark{width:36px;height:36px;border-radius:11px;flex-shrink:0;background:var(--ms7-black);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;letter-spacing:-.02em;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),0 6px 14px -8px rgba(0,0,0,.6);transition:transform 320ms var(--ease-spring)}',
    'html[data-theme="dark"] .ms7-rail-mark{background:#F3F5F1;color:#0B0D0C}',
    '.ms7-rail-logo:hover .ms7-rail-mark{transform:scale(1.06) rotate(-3deg)}',
    '.ms7-rail-name{display:flex;flex-direction:column;line-height:1.05;min-width:0;opacity:0;transform:translateX(-6px);transition:opacity 220ms var(--ease-out),transform 260ms var(--ease-out)}',
    '.is-open .ms7-rail-name{opacity:1;transform:none;transition-delay:80ms}',
    '.ms7-rail-name b{font-size:15px;font-weight:600;letter-spacing:-.02em;white-space:nowrap}.ms7-rail-name span{font-size:11px;font-weight:500;color:var(--text-secondary);white-space:nowrap;margin-top:3px}',
    '.ms7-rail-list{position:relative;display:flex;flex-direction:column;gap:2px;flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;margin:0 -4px;padding:0 4px;scrollbar-width:none}.ms7-rail-list::-webkit-scrollbar{display:none}',
    '.ms7-rail-ind{position:absolute;left:4px;right:4px;height:40px;border-radius:11px;background:var(--acc,#C9F775);transition:top 360ms var(--ease-standard),opacity 200ms;pointer-events:none;z-index:0}',
    'html[data-theme="dark"] .ms7-rail-ind{background:#C9F775}',
    '.ms7-rail-item{position:relative;z-index:1;width:100%;height:40px;display:flex;align-items:center;gap:12px;padding:0 14px;border:0;border-radius:11px;background:transparent;color:var(--text-secondary);cursor:pointer;font-size:14px;font-weight:500;letter-spacing:-.005em;white-space:nowrap;overflow:hidden;transition:color 200ms,background 200ms;flex-shrink:0}',
    '.ms7-rail:not(.is-open) .ms7-rail-item{padding:0;justify-content:center}',
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
    '.ms7-rail:not(.is-open) .ms7-rail-item.is-on .bdg{background:#0C3B26;color:#C9F775}',
    '.ms7-rail-sep{height:1px;background:var(--line);margin:8px 6px}',
    '.ms7-rail-foot{display:flex;flex-direction:column;gap:2px;position:relative}',
    '.ms7-rail-toggle{position:absolute;right:-13px;top:22px;width:26px;height:26px;border-radius:50%;border:1px solid var(--line);background:var(--surface-card);color:var(--text-secondary);display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity 200ms,transform 240ms var(--ease-spring),color 200ms;z-index:40;box-shadow:0 4px 12px -6px rgba(17,21,18,.3)}',
    '.ms7-rail:hover .ms7-rail-toggle{opacity:1}.ms7-rail-toggle:hover{transform:scale(1.1);color:var(--text-primary)}',
    '.ms7-mnav{position:fixed;left:0;right:0;bottom:0;z-index:95;display:flex;padding:6px 8px calc(6px + env(safe-area-inset-bottom));background:color-mix(in oklab,var(--surface-card) 86%,transparent);backdrop-filter:blur(18px) saturate(1.3);-webkit-backdrop-filter:blur(18px) saturate(1.3);border-top:1px solid var(--line)}',
    '.ms7-mnav-tab{position:relative;flex:1;min-width:0;height:54px;border:0;background:transparent;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;font-size:10.5px;font-weight:500;color:var(--text-secondary);transition:color 200ms}',
    '.ms7-mnav-tab.is-on{color:var(--text-primary);font-weight:600}',
    '.ms7-mnav-tab .pill{width:46px;height:28px;border-radius:14px;display:flex;align-items:center;justify-content:center;transition:background 240ms,transform 240ms var(--ease-spring)}',
    '.ms7-mnav-tab.is-on .pill{background:var(--acc,#C9F775);color:#0C3B26}',
    '.ms7-mnav-tab:active .pill{transform:scale(.92)}',
    '.ms7-mnav-tab .bdg{position:absolute;top:4px;left:calc(50% + 10px);min-width:16px;height:16px;padding:0 4px;border-radius:6px;background:var(--ms7-black);color:#fff;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1}',
    'html[data-theme="dark"] .ms7-mnav-tab .bdg{background:#F3F5F1;color:#0B0D0C}',
    '.ms7-mnav-sheet{position:fixed;inset:0;z-index:90;background:color-mix(in oklab,#0B0D0C 40%,transparent);backdrop-filter:blur(4px);animation:ms7-fade 220ms var(--ease-out) both}',
    '.ms7-mnav-grid{position:absolute;left:10px;right:10px;bottom:calc(76px + env(safe-area-inset-bottom));border-radius:20px;background:var(--surface-card);box-shadow:var(--shadow-pop);padding:10px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;animation:ms7-pop 320ms var(--ease-out) both}',
    '.ms7-mnav-grid button{height:74px;border:0;border-radius:14px;background:transparent;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;font-size:12px;font-weight:600;color:var(--text-primary);transition:background 200ms}',
    '.ms7-mnav-grid button.is-on{background:var(--acc,#C9F775);color:#0C3B26}.ms7-mnav-grid button:active{background:var(--surface-muted)}',
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
          <DS.Icon name={it.icon} size={19} strokeWidth={on ? 2.1 : 1.75} />
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
            <DS.Icon name={it.icon} size={19} strokeWidth={on ? 2.1 : 1.75} />
          </span>
          <span style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '0 2px' }}>{it.label}</span>
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
                    <DS.Icon name={it.icon} size={21} />
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
  window.RailNav = RailNav;
  window.MobileNav = MobileNav;
})();
