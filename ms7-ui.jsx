/* ============================================================
   MS Control · componentes novos (Zeph) — ms7-ui.jsx
   Substitui os componentes do design system (mesmas props)
   e adiciona o sistema de movimento e os assets animados.
   Carregado antes de Shared.jsx. Não mexe em dados nem na API.
   ============================================================ */
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  if (!DS) return;
  const h = React.createElement;
  const Icon0 = DS.Icon;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Icon: traço 1.75 por padrão ---------- */
  function Icon(p) {
    p = p || {};
    return h(Icon0, Object.assign({ strokeWidth: 1.75 }, p));
  }

  /* ---------- movimento ---------- */
  let io = null;
  function getIO() {
    if (io || !('IntersectionObserver' in window)) return io;
    io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    return io;
  }
  function watch(root) {
    const o = getIO();
    const list = root.querySelectorAll ? root.querySelectorAll('[data-reveal]:not(.is-in),.ms7-stagger:not(.is-in)') : [];
    const all = [];
    if (root.matches && (root.matches('[data-reveal]') || root.matches('.ms7-stagger')) && !root.classList.contains('is-in')) all.push(root);
    for (let i = 0; i < list.length; i++) all.push(list[i]);
    all.forEach(function (el) {
      if (!o || reduce) el.classList.add('is-in');
      else o.observe(el);
    });
  }
  function startMotion() {
    const root = document.getElementById('root') || document.body;
    watch(root);
    if (!('MutationObserver' in window)) return;
    const mo = new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        for (let i = 0; i < m.addedNodes.length; i++) {
          const n = m.addedNodes[i];
          if (n.nodeType === 1) watch(n);
        }
      });
    });
    mo.observe(root, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startMotion);
  else startMotion();

  function Reveal(p) {
    const { as, delay, children, style, className, variant } = p || {};
    const rest = {};
    Object.keys(p || {}).forEach(function (k) {
      if (['as', 'delay', 'children', 'style', 'className', 'variant'].indexOf(k) < 0) rest[k] = p[k];
    });
    return h(
      as || 'div',
      Object.assign(
        {
          'data-reveal': variant || 'up',
          className: className,
          style: Object.assign({}, delay ? { transitionDelay: delay + 'ms' } : {}, style),
        },
        rest,
      ),
      children,
    );
  }
  function Stagger(p) {
    const { as, children, style, className } = p || {};
    return h(as || 'div', { className: 'ms7-stagger' + (className ? ' ' + className : ''), style: style }, children);
  }

  /* número que conta */
  const NUM_RE = /^(.*?)(-?)(\d{1,3}(?:\.\d{3})+|\d+)(,\d+)?(\s*(?:%|mil|mi|x)?)\s*$/;
  function parseVal(v) {
    if (typeof v === 'number') return { pre: '', neg: v < 0, n: Math.abs(v), dec: 0, suf: '' };
    if (typeof v !== 'string') return null;
    const m = v.match(NUM_RE);
    if (!m) return null;
    const pre = m[1];
    if (/\d/.test(pre)) return null;
    const n = parseInt(m[3].replace(/\./g, ''), 10);
    const dec = m[4] ? m[4].length - 1 : 0;
    const full = n + (m[4] ? parseInt(m[4].slice(1), 10) / Math.pow(10, dec) : 0);
    return { pre: pre.replace(/-\s*$/, ''), neg: m[2] === '-' || /-\s*$/.test(pre), n: full, dec: dec, suf: m[5] || '' };
  }
  function fmtVal(p, n) {
    const s = n.toLocaleString('pt-BR', { minimumFractionDigits: p.dec, maximumFractionDigits: p.dec });
    return p.pre + (p.neg ? '-' : '') + s + p.suf;
  }
  function CountUp({ value, duration, style, className }) {
    const parsed = React.useMemo(
      function () {
        return parseVal(value);
      },
      [value],
    );
    const [txt, setTxt] = React.useState(function () {
      return parsed && !reduce ? fmtVal(parsed, 0) : value;
    });
    const prev = React.useRef(0);
    React.useEffect(
      function () {
        if (!parsed || reduce) {
          setTxt(value);
          return;
        }
        const from = prev.current,
          to = parsed.n,
          d = duration || 900,
          t0 = performance.now();
        let raf = 0;
        const tick = function (t) {
          const k = Math.min(1, (t - t0) / d);
          const e = 1 - Math.pow(1 - k, 3);
          setTxt(fmtVal(parsed, from + (to - from) * e));
          if (k < 1) raf = requestAnimationFrame(tick);
          else prev.current = to;
        };
        raf = requestAnimationFrame(tick);
        return function () {
          cancelAnimationFrame(raf);
          prev.current = to;
        };
      },
      [value],
    );
    return h('span', { className: 'ms7-num' + (className ? ' ' + className : ''), style: style }, txt);
  }

  /* ---------- Button ---------- */
  function Button(p) {
    p = p || {};
    const { variant, size, iconLeft, iconRight, disabled, fullWidth, underline, type, onClick, children, style, className } = p;
    const rest = {};
    Object.keys(p).forEach(function (k) {
      if (['variant', 'size', 'iconLeft', 'iconRight', 'disabled', 'fullWidth', 'underline', 'type', 'onClick', 'children', 'style', 'className'].indexOf(k) < 0) rest[k] = p[k];
    });
    const s = size || 'md';
    const ic = { sm: 15, md: 17, lg: 19 }[s] || 17;
    return h(
      'button',
      Object.assign(
        {
          type: type || 'button',
          disabled: !!disabled,
          onClick: onClick,
          className: ['ms7-btn', 'ms7-btn-' + (variant || 'primary'), 'ms7-btn-' + s, fullWidth ? 'ms7-btn-full' : '', underline ? 'ms7-btn-underline' : '', className || ''].join(' ').trim(),
          style: style,
        },
        rest,
      ),
      iconLeft ? h('span', { className: 'ms7-btn-ico' }, h(Icon, { name: iconLeft, size: ic, strokeWidth: 2 })) : null,
      children,
      iconRight ? h('span', { className: 'ms7-btn-ico ms7-btn-ico-r' }, h(Icon, { name: iconRight, size: ic, strokeWidth: 2 })) : null,
    );
  }

  /* ---------- IconButton ---------- */
  function IconButton(p) {
    p = p || {};
    const { icon, variant, size, iconSize, badge, label, onClick, style, className } = p;
    const rest = {};
    Object.keys(p).forEach(function (k) {
      if (['icon', 'variant', 'size', 'iconSize', 'badge', 'label', 'onClick', 'style', 'className'].indexOf(k) < 0) rest[k] = p[k];
    });
    const sz = size || 36;
    return h(
      'button',
      Object.assign(
        {
          type: 'button',
          'aria-label': label || icon,
          title: label,
          onClick: onClick,
          className: ['ms7-ibtn', variant && variant !== 'ghost' ? 'ms7-ibtn-' + variant : '', className || ''].join(' ').trim(),
          style: Object.assign({ width: sz, height: sz }, style),
        },
        rest,
      ),
      h(Icon, { name: icon, size: iconSize || Math.round(sz * 0.52), strokeWidth: 1.9 }),
      badge ? h('span', { className: 'ms7-ibtn-badge' }, badge) : null,
    );
  }

  /* ---------- Card ---------- */
  function Card(p) {
    p = p || {};
    const { title, icon, action, padding, dark, children, style, className, hover, subtitle, reveal } = p;
    const rest = {};
    Object.keys(p).forEach(function (k) {
      if (['title', 'icon', 'action', 'padding', 'dark', 'children', 'style', 'className', 'hover', 'subtitle', 'reveal'].indexOf(k) < 0) rest[k] = p[k];
    });
    return h(
      'section',
      Object.assign(
        {
          className: ['ms7-card', dark ? 'is-dark' : '', hover ? 'is-hover' : '', className || ''].join(' ').trim(),
          'data-reveal': reveal ? 'up' : undefined,
          style: Object.assign({ padding: padding == null ? 24 : padding }, style),
        },
        rest,
      ),
      title || action
        ? h(
            'header',
            { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 } },
            h(
              'div',
              { style: { display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 } },
              icon,
              h(
                'div',
                { style: { minWidth: 0 } },
                h('h3', { style: { margin: 0, fontSize: 16, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.015em' } }, title),
                subtitle ? h('p', { style: { margin: '3px 0 0', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' } }, subtitle) : null,
              ),
            ),
            action,
          )
        : null,
      children,
    );
  }

  /* ---------- Badge / CountDot ---------- */
  const TONES = {
    pink: 'var(--ms7-punch-pink)',
    gray: 'var(--ms7-gray-500)',
    yellow: 'var(--ms7-yellow)',
    blue: 'var(--ms7-blue)',
    turquoise: 'var(--ms7-turquoise)',
    green: 'var(--ms7-green)',
    orange: 'var(--ms7-orange)',
    electric: 'var(--ms7-success)',
    error: 'var(--ms7-error)',
    purple: 'var(--ms7-purple)',
    magenta: 'var(--ms7-magenta)',
    black: 'var(--text-primary)',
    lime: 'var(--ms7-lime-500)',
  };
  function Badge(p) {
    p = p || {};
    const { tone, variant, size, children, style, className, dot } = p;
    const c = TONES[tone || 'green'] || TONES.green;
    const soft = variant === 'soft';
    const lime = tone === 'lime';
    const bg = lime ? 'var(--ms7-lime-500)' : 'color-mix(in oklab, ' + c + ' ' + (soft ? 10 : 14) + '%, var(--surface-card))';
    const fg = lime ? '#0C3B26' : tone === 'black' ? 'var(--text-primary)' : 'color-mix(in oklab, ' + c + ' 88%, var(--text-primary))';
    return h(
      'span',
      {
        className: ['ms7-badge', 'ms7-badge-' + (size === 'sm' ? 'sm' : 'md'), className || ''].join(' ').trim(),
        style: Object.assign({ background: bg, color: fg, boxShadow: soft ? 'none' : 'inset 0 0 0 1px color-mix(in oklab, ' + c + ' 22%, transparent)' }, style),
      },
      soft || dot ? h('span', { className: 'ms7-badge-dot', style: { background: c } }) : null,
      children,
    );
  }
  function CountDot(p) {
    p = p || {};
    const tone = p.tone || 'green';
    const bg = tone === 'lime' ? 'var(--ms7-lime-500)' : tone === 'black' ? 'var(--text-primary)' : tone === 'muted' ? 'var(--surface-muted)' : 'var(--ms7-green-900)';
    const fg = tone === 'lime' ? '#0C3B26' : tone === 'black' ? 'var(--surface-card)' : tone === 'muted' ? 'var(--text-primary)' : 'var(--text-inverse)';
    return h('span', { className: 'ms7-countdot', style: Object.assign({ background: bg, color: fg }, p.style) }, p.children);
  }

  /* ---------- Avatar ---------- */
  function Avatar(p) {
    p = p || {};
    const size = p.size || 40,
      name = p.name || '';
    const ini = name
      ? name
          .split(' ')
          .filter(Boolean)
          .map(function (x) {
            return x.charAt(0);
          })
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : '';
    return h(
      'span',
      { className: 'ms7-avatar', style: Object.assign({ width: size, height: size }, p.style) },
      h(
        'span',
        { className: 'ms7-avatar-inner', style: { width: size, height: size, borderRadius: p.shape === 'square' ? 'var(--radius-sm)' : '50%', fontSize: Math.round(size * 0.36) } },
        p.src ? h('img', { src: p.src, alt: name }) : ini || h(Icon, { name: 'user', size: Math.round(size * 0.55) }),
      ),
      p.online ? h('span', { className: 'ms7-avatar-online', style: { width: Math.max(8, size * 0.24), height: Math.max(8, size * 0.24) } }) : null,
    );
  }

  /* ---------- Modal ---------- */
  function Modal(p) {
    p = p || {};
    const { open, onClose, title, subtitle, size, footer, children, width } = p;
    React.useEffect(
      function () {
        if (!open) return;
        function k(e) {
          if (e.key === 'Escape' && onClose) onClose();
        }
        window.addEventListener('keydown', k);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return function () {
          window.removeEventListener('keydown', k);
          document.body.style.overflow = prev;
        };
      },
      [open, onClose],
    );
    if (!open) return null;
    const w = width || { sm: 440, md: 580, lg: 800, xl: 1040 }[size] || 580;
    return h(
      'div',
      { className: 'ms7-modal-bg', onClick: onClose },
      h(
        'div',
        {
          role: 'dialog',
          'aria-modal': 'true',
          className: 'ms7-modal ms7-glow ms7-glow-soft',
          style: { maxWidth: w },
          onClick: function (e) {
            e.stopPropagation();
          },
        },
        h(
          'header',
          { className: 'ms7-modal-head' },
          h('div', { style: { flex: 1, minWidth: 0 } }, h('h3', { className: 'ms7-modal-title' }, title), subtitle ? h('p', { className: 'ms7-modal-sub' }, subtitle) : null),
          h('button', { type: 'button', onClick: onClose, 'aria-label': 'Fechar', className: 'ms7-modal-x' }, h(Icon, { name: 'x', size: 16, strokeWidth: 2 })),
        ),
        h('div', { className: 'ms7-modal-body' }, children),
        footer ? h('footer', { className: 'ms7-modal-foot' }, footer) : null,
      ),
    );
  }

  /* ---------- StatCard ---------- */
  const STAT = { blue: 'var(--stat-blue)', yellow: 'var(--stat-yellow)', green: 'var(--stat-green)', orange: 'var(--stat-orange)', brand: 'var(--text-brand)', black: 'var(--text-primary)', purple: 'var(--ms7-purple)', error: 'var(--ms7-error)', gray: 'var(--text-secondary)' };
  function trendColor(t, tone) {
    if (tone === 'neutral') return 'var(--text-secondary)';
    const neg = String(t).trim().charAt(0) === '-';
    if (tone === 'up-bad') return neg ? 'var(--ms7-green)' : 'var(--ms7-error)';
    return neg ? 'var(--ms7-error)' : 'var(--ms7-green)';
  }
  function StatCard(p) {
    p = p || {};
    const { value, label, tone, size, variant, icon, trend, trendTone, valueColor, style, className, hint, animate } = p;
    const col = STAT[tone || 'blue'] || STAT.blue;
    const compact = variant === 'compact';
    const val = animate === false ? h('span', { className: 'ms7-num' }, value) : h(CountUp, { value: value });
    return h(
      'div',
      { className: ['ms7-card', 'ms7-stat', size === 'lg' ? 'is-lg' : '', compact ? '' : 'is-classic', className || ''].join(' ').trim(), style: style },
      h(
        'div',
        { className: 'ms7-stat-head' },
        icon
          ? h('span', { className: 'ms7-stat-ico', style: { background: 'color-mix(in oklab, ' + col + ' 12%, var(--surface-card))', color: col } }, h(Icon, { name: icon, size: 15, strokeWidth: 2 }))
          : h('span', { style: { width: 7, height: 7, borderRadius: '50%', background: col, flexShrink: 0 } }),
        h('span', { className: 'ms7-stat-label' }, label),
      ),
      h(
        'div',
        { style: { display: 'flex', alignItems: 'baseline', gap: '2px 8px', flexWrap: 'wrap' } },
        h('span', { className: 'ms7-stat-value', style: { color: valueColor || (compact ? 'var(--text-primary)' : col) } }, val),
        trend ? h('span', { className: 'ms7-stat-trend', style: { color: trendColor(trend, trendTone || 'up-good') } }, trend) : null,
      ),
      hint ? h('span', { style: { fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' } }, hint) : null,
    );
  }

  /* ---------- Tabs (indicador deslizante) ---------- */
  function Tabs(p) {
    p = p || {};
    const { items, value, onChange, variant, style, className, full } = p;
    const list = (items || []).map(function (t) {
      return typeof t === 'string' ? { id: t, label: t } : t;
    });
    const wrap = React.useRef(null);
    const [ind, setInd] = React.useState({ left: 0, width: 0, ready: false });
    const measure = React.useCallback(
      function () {
        const w = wrap.current;
        if (!w) return;
        const a = w.querySelector('[aria-selected="true"]');
        if (!a) {
          setInd({ left: 0, width: 0, top: 0, height: 0, ready: false });
          return;
        }
        setInd({ left: a.offsetLeft, width: a.offsetWidth, top: a.offsetTop, height: a.offsetHeight, ready: true });
      },
      [],
    );
    React.useLayoutEffect(measure, [value, list.length, measure]);
    React.useEffect(
      function () {
        const w = wrap.current;
        if (!w || !('ResizeObserver' in window)) return;
        const ro = new ResizeObserver(measure);
        ro.observe(w);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
        return function () {
          ro.disconnect();
        };
      },
      [measure],
    );
    const v = variant || 'dark';
    const chips = v === 'chips',
      line = v === 'line';
    return h(
      'div',
      {
        role: 'tablist',
        ref: wrap,
        className: ['ms7-tabs', chips ? 'ms7-tabs-chips' : line ? 'ms7-tabs-line' : 'ms7-tabs-seg', full || (!chips && !line) ? 'ms7-tabs-full' : '', className || ''].join(' ').trim(),
        style: style,
      },
      h('span', {
        className: 'ms7-tabs-ind',
        'aria-hidden': 'true',
        style: Object.assign({ left: ind.left, width: ind.width, opacity: ind.ready ? 1 : 0 }, line || !ind.ready ? {} : { top: ind.top, height: ind.height }),
      }),
      list.map(function (t) {
        const on = t.id === value;
        return h(
          'button',
          {
            key: t.id,
            type: 'button',
            role: 'tab',
            'aria-selected': on,
            className: 'ms7-tab',
            onClick: function () {
              if (onChange) onChange(t.id);
            },
          },
          t.icon ? h(Icon, { name: t.icon, size: 15, strokeWidth: 2 }) : null,
          t.label,
          t.count != null ? h(CountDot, { tone: on ? 'green' : 'muted' }, t.count) : null,
        );
      }),
    );
  }

  /* ---------- Campos ---------- */
  function FieldShell(p) {
    p = p || {};
    const { label, required, hint, error, children, style, className } = p;
    return h(
      'label',
      { className: 'ms7-field' + (className ? ' ' + className : ''), style: style },
      label ? h('span', { className: 'ms7-label' }, required ? h('span', { className: 'req' }, '*') : null, label) : null,
      children,
      error || hint ? h('span', { className: 'ms7-hint' + (error ? ' is-error' : '') }, error ? h(Icon, { name: 'circle-alert', size: 12, strokeWidth: 2 }) : null, error || hint) : null,
    );
  }
  function Input(p) {
    p = p || {};
    const { label, required, hint, error, placeholder, value, defaultValue, onChange, type, prefix, icon, multiline, rows, disabled, style, className, right } = p;
    const rest = {};
    Object.keys(p).forEach(function (k) {
      if (['label', 'required', 'hint', 'error', 'placeholder', 'value', 'defaultValue', 'onChange', 'type', 'prefix', 'icon', 'multiline', 'rows', 'disabled', 'style', 'className', 'right'].indexOf(k) < 0) rest[k] = p[k];
    });
    const [foc, setFoc] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const isPw = type === 'password';
    const common = Object.assign({}, rest, {
      placeholder: placeholder,
      value: value,
      defaultValue: defaultValue,
      disabled: disabled,
      onChange: onChange,
      className: 'ms7-input',
      onFocus: function (e) {
        setFoc(true);
        if (rest.onFocus) rest.onFocus(e);
      },
      onBlur: function (e) {
        setFoc(false);
        if (rest.onBlur) rest.onBlur(e);
      },
    });
    return h(
      FieldShell,
      { label: label, required: required, hint: hint, error: error, className: className },
      h(
        'div',
        { className: ['ms7-box', foc ? 'is-focus' : '', error ? 'is-error' : '', disabled ? 'is-disabled' : '', multiline ? 'is-multi' : ''].join(' ').trim(), style: style },
        icon ? h(Icon, { name: icon, size: 16, color: 'var(--text-secondary)', style: multiline ? { marginTop: 12 } : null }) : null,
        prefix ? h('span', { className: 'ms7-prefix' }, prefix) : null,
        multiline ? h('textarea', Object.assign({ rows: rows || 3 }, common, { style: { resize: 'vertical', lineHeight: 1.5 } })) : h('input', Object.assign({ type: isPw && show ? 'text' : type || 'text' }, common)),
        right,
        isPw
          ? h(
              'span',
              {
                onClick: function (e) {
                  e.preventDefault();
                  setShow(!show);
                },
                style: { cursor: 'pointer', display: 'flex', color: 'var(--text-secondary)' },
              },
              h(Icon, { name: show ? 'eye' : 'eye-off', size: 16 }),
            )
          : null,
      ),
    );
  }
  function Select(p) {
    p = p || {};
    const { label, required, hint, error, options, value, defaultValue, onChange, placeholder, variant, disabled, style, className } = p;
    const rest = {};
    Object.keys(p).forEach(function (k) {
      if (['label', 'required', 'hint', 'error', 'options', 'value', 'defaultValue', 'onChange', 'placeholder', 'variant', 'disabled', 'style', 'className'].indexOf(k) < 0) rest[k] = p[k];
    });
    const [foc, setFoc] = React.useState(false);
    const opts = (options || []).map(function (o) {
      return typeof o === 'string' ? { value: o, label: o } : o;
    });
    const pill = variant === 'pill';
    const sel = h(
      'select',
      Object.assign(
        {
          value: value,
          defaultValue: defaultValue,
          onChange: onChange,
          disabled: disabled,
          className: 'ms7-input ms7-select',
          onFocus: function () {
            setFoc(true);
          },
          onBlur: function () {
            setFoc(false);
          },
        },
        rest,
      ),
      placeholder ? h('option', { value: '' }, placeholder) : null,
      opts.map(function (o) {
        return h('option', { key: o.value, value: o.value, disabled: o.disabled }, o.label);
      }),
    );
    const chev = h('span', { className: 'ms7-select-chev' }, h(Icon, { name: 'chevron-down', size: pill ? 14 : 16, strokeWidth: 2 }));
    if (pill) return h('div', { className: 'ms7-pill-select' + (className ? ' ' + className : ''), style: style }, sel, chev);
    return h(
      FieldShell,
      { label: label, required: required, hint: hint, error: error, className: className },
      h('div', { className: ['ms7-box ms7-select-wrap', foc ? 'is-focus' : '', error ? 'is-error' : '', disabled ? 'is-disabled' : ''].join(' ').trim(), style: style }, sel, chev),
    );
  }
  function Checkbox(p) {
    p = p || {};
    const { checked, defaultChecked, onChange, label, icon, disabled, layout, style } = p;
    const [inner, setInner] = React.useState(!!defaultChecked);
    const on = checked === undefined ? inner : checked;
    function toggle() {
      if (disabled) return;
      if (checked === undefined) setInner(!on);
      if (onChange) onChange(!on);
    }
    const box = h(
      'span',
      { role: 'checkbox', 'aria-checked': on, className: 'ms7-checkbox' + (on ? ' is-on' : '') },
      on
        ? h(
            'svg',
            { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--text-inverse)', strokeWidth: 3.2, strokeLinecap: 'round', strokeLinejoin: 'round' },
            h('path', { d: 'M4 12.5l5 5L20 6.5' }),
          )
        : null,
    );
    const row = layout === 'row';
    const lab = label ? h('span', { style: { display: 'flex', alignItems: 'center', gap: 8 } }, icon ? h(Icon, { name: icon, size: 18 }) : null, label) : null;
    return h('div', { onClick: toggle, className: ['ms7-check', row ? 'is-row' : '', disabled ? 'is-disabled' : ''].join(' ').trim(), style: style }, row ? lab : null, box, !row ? lab : null);
  }
  function Switch(p) {
    p = p || {};
    const { checked, defaultChecked, onChange, label, disabled, style } = p;
    const [inner, setInner] = React.useState(!!defaultChecked);
    const on = checked === undefined ? inner : checked;
    function t() {
      if (disabled) return;
      if (checked === undefined) setInner(!on);
      if (onChange) onChange(!on);
    }
    return h(
      'span',
      { onClick: t, role: 'switch', 'aria-checked': on, className: 'ms7-switch' + (disabled ? ' is-disabled' : ''), style: style },
      h('span', { className: 'ms7-switch-track' + (on ? ' is-on' : '') }, h('span', { className: 'ms7-switch-thumb' })),
      label,
    );
  }

  /* ---------- DataTable ---------- */
  function DataTable(p) {
    p = p || {};
    const { columns, rows, rowKey, onRowClick, style, className } = p;
    const cols = columns || [];
    return h(
      'div',
      { className: 'ms7-table-wrap' + (className ? ' ' + className : ''), style: style },
      h(
        'table',
        { className: 'ms7-table' },
        h(
          'thead',
          null,
          h(
            'tr',
            null,
            cols.map(function (c) {
              return h('th', { key: c.key, style: { textAlign: c.align || 'left', width: c.width } }, c.label);
            }),
          ),
        ),
        h(
          'tbody',
          null,
          (rows || []).map(function (r, ri) {
            const k = r[rowKey || 'id'] != null ? r[rowKey || 'id'] : ri;
            return h(
              'tr',
              {
                key: k,
                className: onRowClick ? 'is-click' : '',
                onClick: function () {
                  if (onRowClick) onRowClick(r);
                },
              },
              cols.map(function (c) {
                return h('td', { key: c.key, style: { textAlign: c.align || 'left' } }, c.render ? c.render(r) : r[c.key]);
              }),
            );
          }),
        ),
      ),
    );
  }

  /* ---------- Stepper ---------- */
  function Stepper(p) {
    p = p || {};
    const steps = p.steps || 4,
      current = p.current || 1;
    const pct = Math.round(((current - 1) / Math.max(1, steps - 1)) * 100);
    const nodes = [];
    for (let i = 1; i <= steps; i++) {
      const done = i < current,
        act = i === current;
      nodes.push(
        h('span', { key: i, className: 'ms7-step' + (done ? ' is-done' : act ? ' is-act' : '') }, done ? h(Icon, { name: 'check', size: 13, strokeWidth: 3 }) : i),
      );
    }
    return h(
      'div',
      { style: p.style },
      p.showMeta !== false
        ? h(
            'div',
            { style: { display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 } },
            h('span', null, 'Etapa ' + current + ' de ' + steps),
            h('span', { className: 'ms7-num' }, pct + '%'),
          )
        : null,
      h(
        'div',
        { style: { position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        h('div', { className: 'ms7-stepper-bar', style: { position: 'absolute', left: 14, right: 14, top: '50%', transform: 'translateY(-50%)' } }, h('span', { className: 'ms7-stepper-fill', style: { width: pct + '%' } })),
        nodes,
      ),
    );
  }

  /* ---------- gráficos: só embrulho com classe para CSS ---------- */
  function wrapChart(C, cls) {
    if (!C) return C;
    return function (p) {
      return h('div', { className: 'ms7-chart ' + cls }, h(C, p));
    };
  }

  /* ---------- Assets visuais animados (MS7Art) ---------- */
  const ART_CSS = [
    '.ms7-art{display:block;overflow:visible}',
    '.ms7-art .bar{transform-box:fill-box;transform-origin:bottom;animation:ms7-art-bar 2.6s var(--ease-out) infinite}',
    '.ms7-art .bar:nth-child(2){animation-delay:.12s}.ms7-art .bar:nth-child(3){animation-delay:.24s}.ms7-art .bar:nth-child(4){animation-delay:.36s}.ms7-art .bar:nth-child(5){animation-delay:.48s}.ms7-art .bar:nth-child(6){animation-delay:.6s}',
    '@keyframes ms7-art-bar{0%{transform:scaleY(.1)}25%,80%{transform:scaleY(1)}100%{transform:scaleY(.1)}}',
    '.ms7-art .line{stroke-dasharray:400;stroke-dashoffset:400;animation:ms7-art-draw 3s var(--ease-out) infinite}',
    '@keyframes ms7-art-draw{0%{stroke-dashoffset:400;opacity:0}10%{opacity:1}45%,85%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}',
    '.ms7-art .dot{animation:ms7-art-dot 3s var(--ease-out) infinite;transform-box:fill-box;transform-origin:center}',
    '@keyframes ms7-art-dot{0%,40%{opacity:0;transform:scale(0)}50%,85%{opacity:1;transform:scale(1)}100%{opacity:0}}',
    '.ms7-art .tick{stroke-dasharray:30;stroke-dashoffset:30;animation:ms7-art-tick 3.6s var(--ease-out) infinite}',
    '.ms7-art .tick.t2{animation-delay:.5s}.ms7-art .tick.t3{animation-delay:1s}',
    '.ms7-art .row{animation:ms7-art-row 3.6s var(--ease-out) infinite}.ms7-art .row.t2{animation-delay:.5s}.ms7-art .row.t3{animation-delay:1s}',
    '@keyframes ms7-art-tick{0%,20%{stroke-dashoffset:30}35%,80%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}',
    '@keyframes ms7-art-row{0%,20%{opacity:1}35%,80%{opacity:.45}100%{opacity:.45}}',
    '.ms7-art .ring{stroke-dasharray:226;stroke-dashoffset:226;animation:ms7-art-ring 3.2s var(--ease-out) infinite;transform:rotate(-90deg);transform-origin:center;transform-box:fill-box}',
    '@keyframes ms7-art-ring{0%{stroke-dashoffset:226}55%,85%{stroke-dashoffset:40}100%{stroke-dashoffset:40;opacity:0}}',
    '.ms7-art .hand{transform-origin:center;transform-box:fill-box;animation:ms7-art-hand 6s linear infinite}.ms7-art .hand.h{animation-duration:72s}',
    '@keyframes ms7-art-hand{to{transform:rotate(360deg)}}',
    '.ms7-art .pulse{transform-origin:center;transform-box:fill-box;animation:ms7-pulse 2.2s var(--ease-out) infinite}',
    '.ms7-art .float{animation:ms7-float 4s var(--ease-in-out) infinite}.ms7-art .float.f2{animation-delay:.6s}.ms7-art .float.f3{animation-delay:1.2s}',
    '.ms7-art .slide{animation:ms7-art-slide 3.4s var(--ease-out) infinite}.ms7-art .slide.s2{animation-delay:.3s}.ms7-art .slide.s3{animation-delay:.6s}',
    '@keyframes ms7-art-slide{0%{opacity:0;transform:translateX(-14px)}18%,80%{opacity:1;transform:none}100%{opacity:0;transform:translateX(10px)}}',
    '.ms7-art .key{animation:ms7-art-key 3.6s var(--ease-out) infinite;transform-box:fill-box;transform-origin:center}.ms7-art .key.k2{animation-delay:.4s}.ms7-art .key.k3{animation-delay:.8s}',
    '@keyframes ms7-art-key{0%{opacity:0;transform:translateY(10px)}20%,75%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-6px)}}',
    '.ms7-art .toast{animation:ms7-art-toast 4s var(--ease-spring) infinite;transform-box:fill-box;transform-origin:center}',
    '@keyframes ms7-art-toast{0%,15%{opacity:0;transform:translateY(-10px) scale(.96)}28%,80%{opacity:1;transform:none}92%,100%{opacity:0;transform:translateY(4px)}}',
    '.ms7-art .count{animation:ms7-blink 2.4s ease-in-out infinite}',
    '.ms7-art .wave{animation:ms7-art-wave 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes ms7-art-wave{0%,100%{transform:scaleY(.6)}50%{transform:scaleY(1.15)}}',
    '.ms7-art .orbit{animation:ms7-art-hand 14s linear infinite;transform-origin:center;transform-box:fill-box}',
  ].join('');
  if (!document.getElementById('ms7-art-css')) {
    const st = document.createElement('style');
    st.id = 'ms7-art-css';
    st.textContent = ART_CSS;
    document.head.appendChild(st);
  }
  const G = 'var(--ms7-green-900)',
    L = 'var(--ms7-lime-500)',
    M = 'var(--text-secondary)',
    LN = 'var(--line-strong)',
    SF = 'var(--surface-card)',
    MU = 'var(--surface-muted)';
  function svg(w, hh, kids, p) {
    return h('svg', Object.assign({ className: 'ms7-art', width: w, height: hh, viewBox: '0 0 ' + w + ' ' + hh, fill: 'none', 'aria-hidden': 'true' }, p || {}), kids);
  }
  const Art = {
    /* barras + linha: dashboard / análises */
    Chart: function (p) {
      const s = (p && p.size) || 120;
      return svg(
        120,
        90,
        [
          h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU }),
          h('g', { key: 'bars' }, [26, 40, 32, 56, 48, 66].map(function (v, i) {
            return h('rect', { key: i, className: 'bar', x: 16 + i * 15, y: 72 - v, width: 9, height: v, rx: 3, fill: i === 5 ? G : L });
          })),
          h('path', { key: 'l', className: 'line', d: 'M14 58 C 30 50, 44 60, 56 44 S 84 30, 106 20', stroke: G, strokeWidth: 2.2, strokeLinecap: 'round' }),
          h('circle', { key: 'd', className: 'dot', cx: 106, cy: 20, r: 4, fill: G, stroke: SF, strokeWidth: 2 }),
        ],
        { style: { width: s, height: s * 0.75 } },
      );
    },
    /* lista de tarefas sendo marcada */
    Tasks: function (p) {
      const s = (p && p.size) || 120;
      const rows = [0, 1, 2].map(function (i) {
        const y = 16 + i * 22;
        return h('g', { key: i, className: 'row ' + (i === 1 ? 't2' : i === 2 ? 't3' : '') }, [
          h('rect', { key: 'c', x: 14, y: y, width: 16, height: 16, rx: 5, fill: SF, stroke: LN, strokeWidth: 1.5 }),
          h('path', { key: 'k', className: 'tick ' + (i === 1 ? 't2' : i === 2 ? 't3' : ''), d: 'M18 ' + (y + 8.5) + ' l3.5 3.5 l6.5 -7', stroke: G, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' }),
          h('rect', { key: 't', x: 38, y: y + 4, width: 48 + i * 10, height: 8, rx: 4, fill: LN }),
        ]);
      });
      return svg(120, 90, [h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU })].concat(rows), { style: { width: s, height: s * 0.75 } });
    },
    /* cooperações: cards fluindo + resultado */
    Coop: function (p) {
      const s = (p && p.size) || 120;
      return svg(
        120,
        90,
        [
          h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU }),
          [0, 1, 2].map(function (i) {
            return h('g', { key: i, className: 'slide ' + (i === 1 ? 's2' : i === 2 ? 's3' : '') }, [
              h('rect', { key: 'c', x: 14, y: 12 + i * 24, width: 92, height: 18, rx: 6, fill: SF, stroke: LN, strokeWidth: 1.2 }),
              h('rect', { key: 'a', x: 20, y: 17 + i * 24, width: 8, height: 8, rx: 4, fill: i === 2 ? G : L }),
              h('rect', { key: 't', x: 33, y: 18 + i * 24, width: 30, height: 6, rx: 3, fill: LN }),
              h('rect', { key: 'v', x: 80, y: 18 + i * 24, width: 20, height: 6, rx: 3, fill: i === 2 ? G : 'var(--ms7-green)' }),
            ]);
          }),
        ],
        { style: { width: s, height: s * 0.75 } },
      );
    },
    /* metas: anel de progresso */
    Target: function (p) {
      const s = (p && p.size) || 120;
      return svg(
        120,
        90,
        [
          h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU }),
          h('circle', { key: 'r0', cx: 60, cy: 45, r: 36, stroke: LN, strokeWidth: 7 }),
          h('circle', { key: 'r1', className: 'ring', cx: 60, cy: 45, r: 36, stroke: G, strokeWidth: 7, strokeLinecap: 'round' }),
          h('circle', { key: 'd', cx: 60, cy: 45, r: 5, fill: L }),
        ],
        { style: { width: s, height: s * 0.75 } },
      );
    },
    /* ponto: relógio */
    Clock: function (p) {
      const s = (p && p.size) || 120;
      return svg(
        120,
        90,
        [
          h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU }),
          h('circle', { key: 'c', cx: 60, cy: 45, r: 30, fill: SF, stroke: LN, strokeWidth: 1.5 }),
          h('circle', { key: 'p', className: 'pulse', cx: 60, cy: 45, r: 30, stroke: G, strokeWidth: 1.2, opacity: 0.5 }),
          h('line', { key: 'h', className: 'hand h', x1: 60, y1: 45, x2: 60, y2: 28, stroke: G, strokeWidth: 3, strokeLinecap: 'round' }),
          h('line', { key: 'm', className: 'hand', x1: 60, y1: 45, x2: 60, y2: 22, stroke: 'var(--text-primary)', strokeWidth: 2, strokeLinecap: 'round' }),
          h('circle', { key: 'k', cx: 60, cy: 45, r: 3, fill: L, stroke: G, strokeWidth: 1.5 }),
        ],
        { style: { width: s, height: s * 0.75 } },
      );
    },
    /* chaves PIX entrando nos slots */
    Keys: function (p) {
      const s = (p && p.size) || 120;
      return svg(
        120,
        90,
        [
          h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU }),
          [0, 1, 2].map(function (i) {
            return h('g', { key: i, className: 'key ' + (i === 1 ? 'k2' : i === 2 ? 'k3' : '') }, [
              h('rect', { key: 'b', x: 16 + i * 31, y: 24, width: 26, height: 42, rx: 8, fill: SF, stroke: LN, strokeWidth: 1.2 }),
              h('circle', { key: 'c', cx: 29 + i * 31, cy: 38, r: 6, stroke: G, strokeWidth: 2.2 }),
              h('path', { key: 'k', d: 'M' + (29 + i * 31) + ' 44 v10 h4', stroke: G, strokeWidth: 2.2, strokeLinecap: 'round' }),
              h('rect', { key: 't', x: 22 + i * 31, y: 58, width: 14, height: 3, rx: 1.5, fill: i === 1 ? L : LN }),
            ]);
          }),
        ],
        { style: { width: s, height: s * 0.75 } },
      );
    },
    /* avisos / notificações: sino + toast */
    Bell: function (p) {
      const s = (p && p.size) || 120;
      return svg(
        120,
        90,
        [
          h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU }),
          h('path', { key: 'b', d: 'M60 22 a14 14 0 0 1 14 14 v10 l5 7 H41 l5 -7 v-10 a14 14 0 0 1 14 -14z', fill: SF, stroke: 'var(--text-primary)', strokeWidth: 1.8, strokeLinejoin: 'round' }),
          h('path', { key: 'k', d: 'M54 59 a6 6 0 0 0 12 0', stroke: 'var(--text-primary)', strokeWidth: 1.8, strokeLinecap: 'round' }),
          h('circle', { key: 'd', cx: 72, cy: 26, r: 5, fill: 'var(--ms7-error)', stroke: SF, strokeWidth: 2 }),
          h('circle', { key: 'p', className: 'pulse', cx: 72, cy: 26, r: 5, stroke: 'var(--ms7-error)', strokeWidth: 1.2 }),
          h('g', { key: 't', className: 'toast' }, [h('rect', { key: 'r', x: 14, y: 68, width: 92, height: 14, rx: 5, fill: 'var(--text-primary)' }), h('rect', { key: 'l', x: 20, y: 73, width: 40, height: 4, rx: 2, fill: L })]),
        ],
        { style: { width: s, height: s * 0.75 } },
      );
    },
    /* financeiro: carteira + check */
    Wallet: function (p) {
      const s = (p && p.size) || 120;
      return svg(
        120,
        90,
        [
          h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU }),
          h('rect', { key: 'w', x: 24, y: 24, width: 72, height: 44, rx: 9, fill: SF, stroke: LN, strokeWidth: 1.4 }),
          h('rect', { key: 'c', x: 24, y: 34, width: 72, height: 8, fill: 'var(--text-primary)', opacity: 0.85 }),
          h('rect', { key: 'p', x: 72, y: 48, width: 16, height: 10, rx: 3, fill: L }),
          h('g', { key: 'k', className: 'toast' }, [h('circle', { key: 'c', cx: 94, cy: 26, r: 11, fill: G }), h('path', { key: 'v', d: 'M88.5 26 l3.5 3.5 l7 -7', stroke: '#fff', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' })]),
        ],
        { style: { width: s, height: s * 0.75 } },
      );
    },
    /* proxies / rede */
    Globe: function (p) {
      const s = (p && p.size) || 120;
      return svg(
        120,
        90,
        [
          h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU }),
          h('circle', { key: 'g', cx: 60, cy: 45, r: 26, fill: SF, stroke: LN, strokeWidth: 1.4 }),
          h('ellipse', { key: 'e', cx: 60, cy: 45, rx: 11, ry: 26, stroke: LN, strokeWidth: 1.2 }),
          h('line', { key: 'l', x1: 34, y1: 45, x2: 86, y2: 45, stroke: LN, strokeWidth: 1.2 }),
          h('g', { key: 'o', className: 'orbit' }, [h('circle', { key: 'c', cx: 60, cy: 45, r: 33, stroke: G, strokeWidth: 1, strokeDasharray: '3 5' }), h('circle', { key: 'd', cx: 93, cy: 45, r: 4, fill: L, stroke: G, strokeWidth: 1.5 })]),
        ],
        { style: { width: s, height: s * 0.75 } },
      );
    },
    /* alunos / pessoas */
    People: function (p) {
      const s = (p && p.size) || 120;
      return svg(
        120,
        90,
        [
          h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU }),
          [0, 1, 2].map(function (i) {
            return h('g', { key: i, className: 'float ' + (i === 1 ? 'f2' : i === 2 ? 'f3' : '') }, [
              h('circle', { key: 'h', cx: 36 + i * 24, cy: 36, r: 9, fill: i === 1 ? G : SF, stroke: i === 1 ? G : LN, strokeWidth: 1.4 }),
              h('path', { key: 'b', d: 'M' + (22 + i * 24) + ' 66 a14 14 0 0 1 28 0z', fill: i === 1 ? L : SF, stroke: i === 1 ? G : LN, strokeWidth: 1.4 }),
            ]);
          }),
        ],
        { style: { width: s, height: s * 0.75 } },
      );
    },
    /* caixa vazia genérica */
    Inbox: function (p) {
      const s = (p && p.size) || 120;
      return svg(
        120,
        90,
        [
          h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU }),
          h('path', { key: 'b', d: 'M28 48 h18 l5 8 h18 l5 -8 h18 v18 a6 6 0 0 1 -6 6 h-52 a6 6 0 0 1 -6 -6z', fill: SF, stroke: LN, strokeWidth: 1.4, strokeLinejoin: 'round' }),
          h('path', { key: 'l', d: 'M34 48 l6 -22 h40 l6 22', stroke: LN, strokeWidth: 1.4, strokeLinejoin: 'round' }),
          h('g', { key: 'f', className: 'float' }, [h('rect', { key: 'r', x: 48, y: 30, width: 24, height: 6, rx: 3, fill: L })]),
        ],
        { style: { width: s, height: s * 0.75 } },
      );
    },
    Search: function (p) {
      const s = (p && p.size) || 120;
      return svg(
        120,
        90,
        [
          h('rect', { key: 'bg', x: 0, y: 0, width: 120, height: 90, rx: 14, fill: MU }),
          h('circle', { key: 'c', cx: 56, cy: 42, r: 18, fill: SF, stroke: 'var(--text-primary)', strokeWidth: 2 }),
          h('line', { key: 'l', x1: 69, y1: 55, x2: 82, y2: 68, stroke: 'var(--text-primary)', strokeWidth: 3, strokeLinecap: 'round' }),
          h('circle', { key: 'p', className: 'pulse', cx: 56, cy: 42, r: 18, stroke: G, strokeWidth: 1.2 }),
        ],
        { style: { width: s, height: s * 0.75 } },
      );
    },
  };
  Art.Dashboard = Art.Chart;
  Art.Box = Art.Inbox;
  /* mapa ícone → arte, para o Empty antigo continuar funcionando */
  const ART_BY_ICON = {
    'square-check': 'Tasks', 'check-square': 'Tasks', 'list-checks': 'Tasks', briefcase: 'Coop', package: 'Coop', target: 'Target', clock: 'Clock', 'key-round': 'Keys', key: 'Keys', bell: 'Bell', megaphone: 'Bell', wallet: 'Wallet', 'credit-card': 'Wallet', coins: 'Wallet', globe: 'Globe', users: 'People', 'graduation-cap': 'People', user: 'People', 'chart-column': 'Chart', 'bar-chart-3': 'Chart', 'chart-line': 'Chart', 'trending-up': 'Chart', search: 'Search', inbox: 'Inbox',
  };
  function artFor(icon) {
    const n = ART_BY_ICON[icon || ''] || 'Inbox';
    return Art[n] || Art.Inbox;
  }

  /* ---------- aplica ---------- */
  Object.assign(DS, {
    Icon: Icon,
    Button: Button,
    IconButton: IconButton,
    Card: Card,
    Badge: Badge,
    CountDot: CountDot,
    Avatar: Avatar,
    Modal: Modal,
    StatCard: StatCard,
    Tabs: Tabs,
    FieldShell: FieldShell,
    Input: Input,
    Select: Select,
    Checkbox: Checkbox,
    Switch: Switch,
    DataTable: DataTable,
    Stepper: Stepper,
    AreaChart: wrapChart(DS.AreaChart, 'ms7-chart-area'),
    BarChart: wrapChart(DS.BarChart, 'ms7-chart-bar'),
    LineChart: wrapChart(DS.LineChart, 'ms7-chart-line'),
    Heatmap: wrapChart(DS.Heatmap, 'ms7-chart-heat'),
    Reveal: Reveal,
    Stagger: Stagger,
    CountUp: CountUp,
  });
  Button._ms7 = IconButton._ms7 = Badge._ms7 = Avatar._ms7 = 1;
  window.MS7Motion = { watch: watch, Reveal: Reveal, Stagger: Stagger, CountUp: CountUp };
  /* luz que segue o cursor nos cards (.ms7-card): grava --mx/--my no card sob o ponteiro */
  (function () {
    if (window.__ms7Spot || !window.matchMedia || !window.matchMedia('(hover: hover)').matches) return;
    window.__ms7Spot = true;
    let raf = 0, ev = null, last = null;
    document.addEventListener('pointermove', function (e) { ev = e; if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
    function tick() {
      raf = 0; if (!ev) return;
      const card = ev.target && ev.target.closest ? ev.target.closest('.ms7-hover-card') : null;
      if (card !== last && last) { last.style.removeProperty('--spot'); }
      last = card; if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (ev.clientX - r.left) + 'px'); card.style.setProperty('--my', (ev.clientY - r.top) + 'px');
    }
    document.addEventListener('pointerleave', function () { if (last) { last.style.removeProperty('--spot'); last = null; } });
  })();
  /* cursor personalizado (ponto + anel), só em dispositivos com mouse */
  (function () {
    if (window.__ms7Cur || !window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    window.__ms7Cur = true;
    const root = document.documentElement; root.classList.add('ms7-cursor');
    const dot = document.createElement('div'); dot.className = 'ms7-cur ms7-cur-dot'; dot.setAttribute('aria-hidden', 'true');
    const ring = document.createElement('div'); ring.className = 'ms7-cur ms7-cur-ring'; ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring); document.body.appendChild(dot);
    let x = -100, y = -100, rx = -100, ry = -100, on = false, raf = 0;
    const SEL = 'a,button,[role="button"],.ms7-hover-card,.ms7-tab,.ms7-rail-item,.ms7-mnav-tab,label,select,summary,.ms7-cmdk-it,.ms7-np-it,.ms7-table tbody tr.is-click,[onclick],.ms7-check,.ms7-switch,.ms7-user-pic';
    const TXT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="date"]):not([type="time"]),textarea,[contenteditable="true"]';
    function loop() { rx += (x - rx) * 0.22; ry += (y - ry) * 0.22; ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)'; raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(loop) : 0; }
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY; dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      if (!on) { on = true; rx = x; ry = y; root.classList.add('is-cur-on'); }
      if (!raf) raf = requestAnimationFrame(loop);
      const t = e.target;
      root.classList.toggle('is-cur-text', !!(t && t.closest && t.closest(TXT)));
      root.classList.toggle('is-cur-hover', !!(t && t.closest && !t.closest(TXT) && t.closest(SEL)));
    }, { passive: true });
    document.addEventListener('pointerdown', function () { root.classList.add('is-cur-down'); }, { passive: true });
    document.addEventListener('pointerup', function () { root.classList.remove('is-cur-down'); }, { passive: true });
    document.addEventListener('mouseleave', function () { on = false; root.classList.remove('is-cur-on'); });
    document.addEventListener('mouseenter', function () { on = true; root.classList.add('is-cur-on'); });
    window.addEventListener('blur', function () { root.classList.remove('is-cur-on', 'is-cur-down'); on = false; });
  })();
  /* ruído do fundo (tema escuro) */
  (function () { if (document.querySelector('.ms7-noise')) return; const n = document.createElement('div'); n.className = 'ms7-noise'; n.setAttribute('aria-hidden', 'true'); document.body.appendChild(n); })();
  window.MS7Art = Art;
  window.MS7ArtFor = artFor;
})();
