/* @ds-bundle: {"format":4,"namespace":"MS7DesignSystem_5d5172","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"CountDot","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Modal","sourcePath":"components/core/Modal.jsx"},{"name":"StatCard","sourcePath":"components/core/StatCard.jsx"},{"name":"AreaChart","sourcePath":"components/data/AreaChart.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"Calendar","sourcePath":"components/data/Calendar.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"Heatmap","sourcePath":"components/data/Heatmap.jsx"},{"name":"LineChart","sourcePath":"components/data/LineChart.jsx"},{"name":"ListingCard","sourcePath":"components/data/ListingCard.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"FieldShell","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"Stepper","sourcePath":"components/navigation/Stepper.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"93a1599d1b6d","components/core/Badge.jsx":"5af704c315fa","components/core/Button.jsx":"29a648f52ad4","components/core/Card.jsx":"d01ab4d7a08e","components/core/Icon.jsx":"4e1e6bf3305c","components/core/IconButton.jsx":"e61d450d1b56","components/core/Modal.jsx":"abed4ce1c01c","components/core/StatCard.jsx":"96d0c0665989","components/data/AreaChart.jsx":"9278187a964c","components/data/BarChart.jsx":"eb6422ca3c5a","components/data/Calendar.jsx":"943abb385ea6","components/data/DataTable.jsx":"ae61ef97bbcc","components/data/Heatmap.jsx":"1f2f20f400a5","components/data/LineChart.jsx":"3a6dde026b4a","components/data/ListingCard.jsx":"a9b6f4a55a9b","components/forms/Checkbox.jsx":"a466bd3fc9e0","components/forms/Field.jsx":"6c9e063daef8","components/forms/Input.jsx":"5c05c170deba","components/forms/Select.jsx":"ca4a42bdd74c","components/forms/Switch.jsx":"e4ae7bba5c27","components/navigation/Header.jsx":"add17f655b87","components/navigation/Sidebar.jsx":"434fa1305525","components/navigation/Stepper.jsx":"f1a7b6e535dd","components/navigation/Tabs.jsx":"7a8309236981","ui_kits/dashboard/App.jsx":"859c3cfffc54","ui_kits/dashboard/CalendarScreen.jsx":"e8022a001bf5","ui_kits/dashboard/HomeScreen.jsx":"2db2c9d1b179","ui_kits/dashboard/MessagesScreen.jsx":"3dcc2bf5a15f","ui_kits/dashboard/OrdersScreen.jsx":"e253c3acb218","ui_kits/dashboard/SettingsScreen.jsx":"c0e0ae34556f","ui_kits/dashboard/UsersScreen.jsx":"65dcb4542881","ui_kits/dashboard/data.js":"2b388ebd9232","ui_kits/operacoes/OperacoesApp.jsx":"c41f4ba98c18","ui_kits/operacoes/ScreensAnalises.jsx":"9ad0abfb2ee8","ui_kits/operacoes/ScreensConta.jsx":"11a5e851db80","ui_kits/operacoes/ScreensCoop.jsx":"1f27d165a5ea","ui_kits/operacoes/ScreensDashboard.jsx":"500783acd5ed","ui_kits/operacoes/ScreensGestao.jsx":"5113e392cbf4","ui_kits/operacoes/Shared.jsx":"ec4f03b66041","ui_kits/operacoes/data.js":"68c6b051bbdf","ui_kits/operacoes/server/server.cjs":"f196ee912cfa","ui_kits/operacoes/store.js":"5149118408de","ui_kits/operacoes/sw.js":"a7fbc8bca561"},"inlinedExternals":[],"unexposedExports":[{"name":"boxStyle","sourcePath":"components/forms/Field.jsx"},{"name":"inputReset","sourcePath":"components/forms/Field.jsx"}]} */

(() => {

const __ds_ns = (window.MS7DesignSystem_5d5172 = window.MS7DesignSystem_5d5172 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const T = {
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
  black: 'var(--ms7-black)'
};
function Badge({
  tone = 'green',
  variant = 'solid',
  size = 'md',
  children,
  style
}) {
  const c = T[tone] || T.green;
  const soft = variant === 'soft';
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("span", {
    style: Object.assign({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: sm ? 20 : 26,
      padding: sm ? '0 8px' : '0 10px',
      borderRadius: 'var(--radius-xs)',
      background: soft ? 'color-mix(in srgb, ' + c + ' 18%, var(--surface-card))' : c,
      color: soft ? 'var(--text-primary)' : '#FFFFFF',
      fontFamily: 'var(--font-sans)',
      fontSize: sm ? 11 : 13,
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }, style)
  }, soft ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: c
    }
  }) : null, children);
}
function CountDot({
  children,
  tone = 'green'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      borderRadius: 9,
      background: tone === 'lime' ? 'var(--ms7-lime-500)' : tone === 'black' ? 'var(--ms7-black)' : 'var(--ms7-green)',
      color: tone === 'lime' ? 'var(--ms7-green-900)' : '#fff',
      fontSize: 10,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge, CountDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  title,
  icon,
  action,
  padding = 20,
  dark = false,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: Object.assign({
      background: dark ? 'var(--surface-inverse)' : 'var(--surface-card)',
      color: dark ? '#fff' : 'var(--text-primary)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      padding: padding,
      fontFamily: 'var(--font-sans)',
      minWidth: 0
    }, style)
  }, title || action ? /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, icon, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 700,
      lineHeight: 1.2
    }
  }, title)), action) : null, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
const LUCIDE_SRC = 'https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js';
let lucidePromise = null;
function loadLucide() {
  if (typeof window === 'undefined' || window.lucide) return Promise.resolve();
  if (!lucidePromise) {
    lucidePromise = new Promise(function (res) {
      const s = document.createElement('script');
      s.src = LUCIDE_SRC;
      s.onload = res;
      s.onerror = res;
      document.head.appendChild(s);
    });
  }
  return lucidePromise;
}
function pascal(n) {
  return n.split('-').map(function (p) {
    return p.charAt(0).toUpperCase() + p.slice(1);
  }).join('');
}
function camelAttrs(a) {
  const o = {};
  Object.keys(a).forEach(function (k) {
    o[k.replace(/-([a-z])/g, function (_, c) {
      return c.toUpperCase();
    })] = a[k];
  });
  return o;
}
function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  color = 'currentColor',
  style
}) {
  const [, tick] = React.useState(0);
  React.useEffect(function () {
    if (!window.lucide) {
      loadLucide().then(function () {
        tick(function (x) {
          return x + 1;
        });
      });
    }
  }, []);
  const lib = typeof window !== 'undefined' && window.lucide;
  const node = lib && lib.icons && lib.icons[pascal(name || 'circle')];
  let kids = [];
  if (node) {
    kids = node[0] === 'svg' ? node[2] || [] : node;
  }
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: Object.assign({
      flexShrink: 0,
      display: 'block'
    }, style)
  }, kids.map(function (k, i) {
    return React.createElement(k[0], Object.assign({
      key: i
    }, camelAttrs(k[1] || {})));
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function Avatar({
  src,
  name,
  size = 40,
  online = false,
  shape = 'circle',
  style
}) {
  const initials = name ? name.split(' ').map(function (p) {
    return p.charAt(0);
  }).slice(0, 2).join('').toUpperCase() : '';
  return /*#__PURE__*/React.createElement("span", {
    style: Object.assign({
      position: 'relative',
      display: 'inline-flex',
      width: size,
      height: size,
      flexShrink: 0
    }, style)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: shape === 'circle' ? '50%' : 'var(--radius-sm)',
      overflow: 'hidden',
      background: 'var(--ms7-gray-300)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: Math.round(size * 0.38)
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name || '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials ? initials : /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "user",
    size: Math.round(size * 0.6),
    color: "#fff",
    strokeWidth: 2
  })), online ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: Math.max(8, size * 0.24),
      height: Math.max(8, size * 0.24),
      borderRadius: '50%',
      background: 'var(--ms7-green)',
      border: '2px solid var(--surface-card)'
    }
  }) : null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const V = {
  primary: {
    bg: 'var(--btn-primary-bg, var(--ms7-black))',
    fg: 'var(--btn-primary-fg, #FEFFFF)',
    hover: 'var(--btn-primary-hover, #3A3A3A)',
    border: 'transparent'
  },
  brand: {
    bg: 'var(--ms7-green-900)',
    fg: 'var(--text-inverse)',
    hover: 'var(--ms7-green-800)',
    border: 'transparent'
  },
  lime: {
    bg: 'var(--ms7-lime-500)',
    fg: 'var(--ms7-green-900)',
    hover: 'var(--ms7-lime-600)',
    border: 'transparent'
  },
  secondary: {
    bg: 'var(--ms7-gray-100)',
    fg: 'var(--text-primary)',
    hover: 'var(--ms7-gray-300)',
    border: 'transparent'
  },
  outline: {
    bg: 'var(--surface-card)',
    fg: 'var(--text-primary)',
    hover: 'var(--ms7-gray-50)',
    border: 'var(--border-default)'
  },
  ghost: {
    bg: 'transparent',
    fg: 'var(--text-primary)',
    hover: 'var(--ms7-gray-100)',
    border: 'transparent'
  },
  danger: {
    bg: 'var(--ms7-error)',
    fg: '#FFFFFF',
    hover: '#D92E1D',
    border: 'transparent'
  }
};
const S = {
  sm: {
    h: 32,
    px: 12,
    fs: 13,
    ic: 16,
    gap: 6
  },
  md: {
    h: 40,
    px: 16,
    fs: 14,
    ic: 18,
    gap: 8
  },
  lg: {
    h: 48,
    px: 22,
    fs: 16,
    ic: 20,
    gap: 10
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  disabled = false,
  fullWidth = false,
  underline = false,
  type = 'button',
  onClick,
  children,
  style
}) {
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const v = V[variant] || V.primary;
  const s = S[size] || S.md;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: function () {
      setHov(true);
    },
    onMouseLeave: function () {
      setHov(false);
      setDown(false);
    },
    onMouseDown: function () {
      setDown(true);
    },
    onMouseUp: function () {
      setDown(false);
    },
    style: Object.assign({
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.h,
      padding: '0 ' + s.px + 'px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + v.border,
      background: disabled ? 'var(--ms7-gray-300)' : hov ? v.hover : v.bg,
      color: disabled ? 'var(--text-secondary)' : v.fg,
      fontFamily: 'var(--font-sans)',
      fontSize: s.fs,
      fontWeight: 600,
      textDecoration: underline ? 'underline' : 'none',
      textUnderlineOffset: 3,
      cursor: disabled ? 'not-allowed' : 'pointer',
      whiteSpace: 'nowrap',
      transform: down && !disabled ? 'scale(0.98)' : 'none',
      transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast)'
    }, style)
  }, iconLeft ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: s.ic
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.ic
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  variant = 'ghost',
  size = 36,
  iconSize,
  badge,
  label,
  onClick,
  style
}) {
  const [hov, setHov] = React.useState(false);
  const bg = {
    ghost: hov ? 'var(--ms7-gray-100)' : 'transparent',
    outline: hov ? 'var(--ms7-gray-50)' : 'var(--surface-card)',
    dark: hov ? '#3A3A3A' : 'var(--ms7-black)',
    lime: 'var(--ms7-lime-500)'
  }[variant];
  const fg = variant === 'dark' ? '#FFFFFF' : variant === 'lime' ? 'var(--ms7-green-900)' : 'var(--text-primary)';
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label || icon,
    onClick: onClick,
    onMouseEnter: function () {
      setHov(true);
    },
    onMouseLeave: function () {
      setHov(false);
    },
    style: Object.assign({
      position: 'relative',
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: variant === 'outline' ? '50%' : 'var(--radius-md)',
      border: variant === 'outline' ? '1px solid var(--border-default)' : 'none',
      background: bg,
      color: fg,
      cursor: 'pointer',
      padding: 0,
      transition: 'background var(--dur-fast)'
    }, style)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: iconSize || Math.round(size * 0.56)
  }), badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 4,
      right: 4,
      minWidth: 16,
      height: 16,
      padding: '0 4px',
      borderRadius: 8,
      background: 'var(--ms7-error)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)'
    }
  }, badge) : null);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Modal.jsx
try { (() => {
function Modal({
  open,
  onClose,
  title,
  subtitle,
  size = 'md',
  footer,
  children
}) {
  React.useEffect(function () {
    if (!open) return;
    function k(e) {
      if (e.key === 'Escape' && onClose) onClose();
    }
    window.addEventListener('keydown', k);
    return function () {
      window.removeEventListener('keydown', k);
    };
  }, [open, onClose]);
  if (!open) return null;
  const w = {
    sm: 420,
    md: 560,
    lg: 760
  }[size] || 560;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(36,36,36,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: function (e) {
      e.stopPropagation();
    },
    style: {
      width: '100%',
      maxWidth: w,
      maxHeight: 'calc(100vh - 48px)',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      color: 'var(--text-primary)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-pop)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '20px 24px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 700
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, subtitle) : null), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fechar",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 4,
      display: 'flex',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 24px 20px',
      overflowY: 'auto'
    }
  }, children), footer ? /*#__PURE__*/React.createElement("footer", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      padding: '14px 24px',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Modal.jsx", error: String((e && e.message) || e) }); }

// components/core/StatCard.jsx
try { (() => {
const C = {
  blue: 'var(--stat-blue)',
  yellow: 'var(--stat-yellow)',
  green: 'var(--stat-green)',
  orange: 'var(--stat-orange)',
  brand: 'var(--text-brand)',
  black: 'var(--text-primary)'
};
function trendColor(t, tone) {
  if (tone === 'neutral') return 'var(--text-secondary)';
  const neg = String(t).trim().charAt(0) === '-';
  if (tone === 'up-bad') return neg ? 'var(--ms7-green)' : 'var(--ms7-error)';
  return neg ? 'var(--ms7-error)' : 'var(--ms7-green)';
}
function StatCard({
  value,
  label,
  tone = 'blue',
  size = 'md',
  variant = 'classic',
  icon,
  trend,
  trendTone = 'up-good',
  valueColor,
  style
}) {
  const lg = size === 'lg';
  const col = C[tone] || C.blue;
  if (variant === 'compact') {
    return /*#__PURE__*/React.createElement("div", {
      style: Object.assign({
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        padding: '16px 18px',
        fontFamily: 'var(--font-sans)',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }, style)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minWidth: 0
      }
    }, icon ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 28,
        borderRadius: 8,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'color-mix(in srgb, ' + col + ' 16%, var(--surface-card))',
        color: col
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: icon,
      size: 16,
      strokeWidth: 2
    })) : /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: col,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, label)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '2px 8px',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: valueColor || 'var(--text-primary)',
        lineHeight: 1.15,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.01em'
      }
    }, value), trend ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: trendColor(trend, trendTone)
      }
    }, trend) : null));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: Object.assign({
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      padding: lg ? '24px 28px' : '16px 18px',
      fontFamily: 'var(--font-sans)',
      minWidth: 0
    }, style)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '2px 8px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: lg ? 32 : 22,
      fontWeight: 700,
      color: valueColor || col,
      lineHeight: 1.2,
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), trend ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: trendColor(trend, trendTone)
    }
  }, trend) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: lg ? 6 : 4,
      fontSize: lg ? 17 : 14,
      fontWeight: 500,
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/data/AreaChart.jsx
try { (() => {
function useWidth() {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(600);
  React.useEffect(function () {
    if (!ref.current) return;
    const ro = new ResizeObserver(function (e) {
      setW(Math.max(200, e[0].contentRect.width));
    });
    ro.observe(ref.current);
    return function () {
      ro.disconnect();
    };
  }, []);
  return [ref, w];
}
function smooth(pts) {
  let d = 'M' + pts[0][0] + ',' + pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i],
      p1 = pts[i],
      p2 = pts[i + 1],
      p3 = pts[i + 2] || p2;
    d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6) + ',' + (p1[1] + (p2[1] - p0[1]) / 6) + ' ' + (p2[0] - (p3[0] - p1[0]) / 6) + ',' + (p2[1] - (p3[1] - p1[1]) / 6) + ' ' + p2[0] + ',' + p2[1];
  }
  return d;
}
function AreaChart({
  data = [],
  max,
  ticks = 5,
  height = 240,
  unit = '',
  highlight,
  formatTip
}) {
  const [ref, w] = useWidth();
  const [hi, setHi] = React.useState(highlight != null ? highlight : null);
  const L = 52,
    B = 28,
    T = 12,
    R = 8;
  const raw = max || Math.max.apply(null, data.map(function (d) {
    return d.value;
  })) * 1.05 || 1;
  const mag = Math.pow(10, Math.floor(Math.log10(raw / ticks)));
  const st = [1, 2, 2.5, 5, 10].map(function (s) {
    return s * mag;
  }).find(function (s) {
    return s * ticks >= raw;
  }) || mag * 10;
  const top = st * ticks;
  const iw = w - L - R,
    ih = height - T - B;
  const x = function (i) {
    return L + (data.length < 2 ? 0 : i * iw / (data.length - 1));
  };
  const y = function (v) {
    return T + ih - v / top * ih;
  };
  const pts = data.map(function (d, i) {
    return [x(i), y(d.value)];
  });
  const line = pts.length ? smooth(pts) : '';
  const area = pts.length ? line + ' L' + x(data.length - 1) + ',' + (T + ih) + ' L' + L + ',' + (T + ih) + ' Z' : '';
  const gid = 'ms7area' + React.useId().replace(/:/g, '');
  const tk = [];
  for (let i = 0; i <= ticks; i++) tk.push(Math.round(top / ticks * i));
  const labelEvery = Math.ceil(data.length / 7);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      width: '100%',
      fontFamily: 'var(--font-sans)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: height,
    style: {
      display: 'block'
    },
    onMouseLeave: function () {
      setHi(highlight != null ? highlight : null);
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--ms7-lime-500)",
    stopOpacity: "0.9"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "var(--ms7-lime-500)",
    stopOpacity: "0.08"
  }))), tk.map(function (t) {
    return /*#__PURE__*/React.createElement("g", {
      key: t
    }, /*#__PURE__*/React.createElement("line", {
      x1: L,
      x2: w - R,
      y1: y(t),
      y2: y(t),
      stroke: "var(--border-default)",
      strokeDasharray: "3 4"
    }), /*#__PURE__*/React.createElement("text", {
      x: L - 8,
      y: y(t) + 4,
      textAnchor: "end",
      fontSize: "11",
      fontWeight: "600",
      fill: "var(--text-primary)"
    }, t + unit));
  }), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: 'url(#' + gid + ')'
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: "var(--ms7-lime-600)",
    strokeWidth: "2"
  }), data.map(function (d, i) {
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, i % labelEvery === 0 ? /*#__PURE__*/React.createElement("text", {
      x: x(i),
      y: height - 8,
      textAnchor: "middle",
      fontSize: "12",
      fontWeight: "600",
      fill: "var(--text-primary)"
    }, d.label) : null, /*#__PURE__*/React.createElement("rect", {
      x: x(i) - iw / data.length / 2,
      y: T,
      width: iw / data.length,
      height: ih,
      fill: "transparent",
      onMouseEnter: function () {
        setHi(i);
      }
    }));
  }), hi != null && data[hi] ? /*#__PURE__*/React.createElement("g", {
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: x(hi),
    x2: x(hi),
    y1: y(data[hi].value),
    y2: T + ih,
    stroke: "var(--chart-2)",
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: x(hi),
    cy: y(data[hi].value),
    r: "4",
    fill: "var(--chart-2)",
    stroke: "var(--surface-card)",
    strokeWidth: "2"
  })) : null), hi != null && data[hi] ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x(hi),
      top: y(data[hi].value) - 40,
      transform: 'translateX(-50%)',
      background: 'var(--ms7-black)',
      color: '#fff',
      fontSize: 12,
      fontWeight: 700,
      padding: '5px 9px',
      borderRadius: 6,
      pointerEvents: 'none',
      whiteSpace: 'nowrap'
    }
  }, formatTip ? formatTip(data[hi]) : data[hi].value + unit) : null);
}
Object.assign(__ds_scope, { AreaChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/AreaChart.jsx", error: String((e && e.message) || e) }); }

// components/data/BarChart.jsx
try { (() => {
function useWidth() {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(600);
  React.useEffect(function () {
    if (!ref.current) return;
    const ro = new ResizeObserver(function (e) {
      setW(Math.max(200, e[0].contentRect.width));
    });
    ro.observe(ref.current);
    return function () {
      ro.disconnect();
    };
  }, []);
  return [ref, w];
}
function BarChart({
  data = [],
  series = [{
    name: 'A',
    color: 'var(--chart-1)'
  }],
  max,
  ticks = 4,
  height = 220,
  showLegend = true
}) {
  const [ref, w] = useWidth();
  const [hi, setHi] = React.useState(null);
  const L = 44,
    B = 28,
    T = 10,
    R = 8;
  const all = [];
  data.forEach(function (d) {
    d.values.forEach(function (v) {
      all.push(v);
    });
  });
  const raw = max || Math.max.apply(null, all.concat([1])) * 1.05;
  const mag = Math.pow(10, Math.floor(Math.log10(raw / ticks)));
  const st = [1, 2, 2.5, 5, 10].map(function (s) {
    return s * mag;
  }).find(function (s) {
    return s * ticks >= raw;
  }) || mag * 10;
  const top = st * ticks;
  const iw = w - L - R,
    ih = height - T - B;
  const slot = iw / Math.max(1, data.length);
  const bw = Math.min(28, slot * 0.6 / series.length);
  const y = function (v) {
    return T + ih - v / top * ih;
  };
  const tk = [];
  for (let i = 0; i <= ticks; i++) tk.push(Math.round(top / ticks * i));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, showLegend && series.length > 1 ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginBottom: 12
    }
  }, series.map(function (s) {
    return /*#__PURE__*/React.createElement("span", {
      key: s.name,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: s.color
      }
    }), s.name);
  })) : null, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      width: '100%',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: height,
    style: {
      display: 'block'
    }
  }, tk.map(function (t, ti) {
    return /*#__PURE__*/React.createElement("g", {
      key: ti
    }, /*#__PURE__*/React.createElement("line", {
      x1: L,
      x2: w - R,
      y1: y(t),
      y2: y(t),
      stroke: "var(--border-default)",
      strokeDasharray: "3 4"
    }), /*#__PURE__*/React.createElement("text", {
      x: L - 8,
      y: y(t) + 4,
      textAnchor: "end",
      fontSize: "11",
      fontWeight: "600",
      fill: "var(--text-primary)"
    }, t));
  }), data.map(function (d, i) {
    const cx = L + slot * i + slot / 2;
    const gw = bw * series.length + 4 * (series.length - 1);
    return /*#__PURE__*/React.createElement("g", {
      key: i,
      onMouseEnter: function () {
        setHi(i);
      },
      onMouseLeave: function () {
        setHi(null);
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: L + slot * i,
      y: T,
      width: slot,
      height: ih,
      fill: hi === i ? 'var(--ms7-gray-50)' : 'transparent'
    }), d.values.map(function (v, j) {
      const h = v / top * ih;
      return /*#__PURE__*/React.createElement("rect", {
        key: j,
        x: cx - gw / 2 + j * (bw + 4),
        y: T + ih - h,
        width: bw,
        height: h,
        rx: "5",
        fill: series[j] ? series[j].color : 'var(--chart-1)'
      });
    }), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: height - 8,
      textAnchor: "middle",
      fontSize: "12",
      fontWeight: "600",
      fill: "var(--text-primary)"
    }, d.label));
  })), hi != null ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: Math.min(w - 120, L + slot * hi + slot / 2),
      transform: 'translateX(-50%)',
      background: 'var(--ms7-black)',
      color: '#fff',
      fontSize: 11,
      fontWeight: 600,
      padding: '6px 9px',
      borderRadius: 6,
      pointerEvents: 'none',
      whiteSpace: 'nowrap'
    }
  }, data[hi].values.map(function (v, j) {
    return (series[j] ? series[j].name : '') + ': ' + v;
  }).join(' · ')) : null));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/data/Calendar.jsx
try { (() => {
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DOW = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
function Calendar({
  year = 2026,
  month = 8,
  today,
  marked = [],
  alert = [],
  onSelect,
  onPrev,
  onNext,
  compact = false,
  style
}) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const sz = compact ? 28 : 36;
  return /*#__PURE__*/React.createElement("div", {
    style: Object.assign({
      fontFamily: 'var(--font-sans)'
    }, style)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: compact ? 14 : 20,
      fontWeight: 700
    }
  }, MONTHS[month] + ', ' + year), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "chevron-left",
    variant: "outline",
    size: compact ? 22 : 28,
    iconSize: 14,
    onClick: onPrev
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "chevron-right",
    variant: "outline",
    size: compact ? 22 : 28,
    iconSize: 14,
    onClick: onNext
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      rowGap: compact ? 4 : 8,
      justifyItems: 'center'
    }
  }, DOW.map(function (d, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: 'h' + i,
      style: {
        fontSize: compact ? 11 : 14,
        fontWeight: 600,
        height: sz,
        display: 'flex',
        alignItems: 'center'
      }
    }, d);
  }), cells.map(function (d, i) {
    if (d == null) return /*#__PURE__*/React.createElement("span", {
      key: i
    });
    const past = today != null && d < today;
    const mk = marked.indexOf(d) >= 0;
    const al = alert.indexOf(d) >= 0;
    const isToday = d === today;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: function () {
        if (onSelect) onSelect(d);
      },
      style: {
        width: sz,
        height: sz,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: compact ? 11 : 15,
        fontWeight: 600,
        background: al ? 'var(--ms7-error)' : mk ? 'var(--ms7-green)' : isToday ? 'var(--ms7-black)' : 'transparent',
        color: al || mk || isToday ? '#fff' : past ? 'var(--ms7-gray-500)' : 'var(--text-primary)',
        textDecoration: past && !mk ? 'line-through' : 'none'
      }
    }, d);
  })));
}
Object.assign(__ds_scope, { Calendar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Calendar.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function DataTable({
  columns = [],
  rows = [],
  rowKey = 'id',
  onRowClick,
  style
}) {
  const [hov, setHov] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: Object.assign({
      overflowX: 'auto',
      fontFamily: 'var(--font-sans)'
    }, style)
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(function (c, i) {
    return /*#__PURE__*/React.createElement("th", {
      key: c.key,
      style: {
        textAlign: c.align || 'left',
        padding: '14px 16px',
        background: 'var(--ms7-black)',
        color: '#fff',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        borderTopLeftRadius: i === 0 ? 'var(--radius-md)' : 0,
        borderBottomLeftRadius: i === 0 ? 'var(--radius-md)' : 0,
        borderTopRightRadius: i === columns.length - 1 ? 'var(--radius-md)' : 0,
        borderBottomRightRadius: i === columns.length - 1 ? 'var(--radius-md)' : 0,
        width: c.width
      }
    }, c.label);
  }))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (r, ri) {
    const k = r[rowKey] != null ? r[rowKey] : ri;
    return /*#__PURE__*/React.createElement("tr", {
      key: k,
      onClick: function () {
        if (onRowClick) onRowClick(r);
      },
      onMouseEnter: function () {
        setHov(k);
      },
      onMouseLeave: function () {
        setHov(null);
      },
      style: {
        cursor: onRowClick ? 'pointer' : 'default',
        background: hov === k ? 'var(--ms7-gray-50)' : 'transparent'
      }
    }, columns.map(function (c) {
      return /*#__PURE__*/React.createElement("td", {
        key: c.key,
        style: {
          padding: '14px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          textAlign: c.align || 'left',
          color: 'var(--text-primary)',
          fontWeight: 500,
          verticalAlign: 'middle'
        }
      }, c.render ? c.render(r) : r[c.key]);
    }));
  }))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/Heatmap.jsx
try { (() => {
const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
function mix(t) {
  if (t < 0.5) return 'color-mix(in srgb, var(--ms7-lime-500) ' + Math.round(t * 200) + '%, var(--ms7-gray-100))';
  return 'color-mix(in srgb, var(--chart-2) ' + Math.round((t - 0.5) * 200) + '%, var(--ms7-lime-500))';
}
function Heatmap({
  matrix = [],
  rowLabels = DAYS,
  metricLabel = 'Intensidade',
  format,
  style
}) {
  const [hi, setHi] = React.useState(null);
  let max = 0;
  matrix.forEach(function (r) {
    r.forEach(function (v) {
      if (v > max) max = v;
    });
  });
  const f = format || function (v) {
    return String(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: Object.assign({
      fontFamily: 'var(--font-sans)'
    }, style)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '40px repeat(24,minmax(0,1fr))',
      gap: 3,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", null), Array.from({
    length: 24
  }).map(function (_, h) {
    return /*#__PURE__*/React.createElement("span", {
      key: h,
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: 'var(--text-secondary)',
        textAlign: 'center'
      }
    }, h % 3 === 0 ? h + 'h' : '');
  }), matrix.map(function (row, d) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: d
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700
      }
    }, rowLabels[d]), row.map(function (v, h) {
      const on = hi && hi[0] === d && hi[1] === h;
      return /*#__PURE__*/React.createElement("span", {
        key: h,
        onMouseEnter: function () {
          setHi([d, h]);
        },
        onMouseLeave: function () {
          setHi(null);
        },
        style: {
          aspectRatio: '1',
          borderRadius: 4,
          background: mix(max ? v / max : 0),
          outline: on ? '2px solid var(--ms7-black)' : 'none',
          cursor: 'default'
        }
      });
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 14,
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      minHeight: 18
    }
  }, hi ? rowLabels[hi[0]] + ' · ' + hi[1] + 'h — ' + metricLabel + ': ' + f(matrix[hi[0]][hi[1]]) : 'Passe o mouse para ver os valores'), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, "Menor", /*#__PURE__*/React.createElement("span", {
    style: {
      width: 120,
      height: 10,
      borderRadius: 5,
      background: 'linear-gradient(90deg,' + mix(0) + ',' + mix(0.5) + ',' + mix(1) + ')'
    }
  }), "Maior")));
}
Object.assign(__ds_scope, { Heatmap });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Heatmap.jsx", error: String((e && e.message) || e) }); }

// components/data/LineChart.jsx
try { (() => {
function useWidth() {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(600);
  React.useEffect(function () {
    if (!ref.current) return;
    const ro = new ResizeObserver(function (e) {
      setW(Math.max(200, e[0].contentRect.width));
    });
    ro.observe(ref.current);
    return function () {
      ro.disconnect();
    };
  }, []);
  return [ref, w];
}
function nice(raw, ticks) {
  const mag = Math.pow(10, Math.floor(Math.log10(Math.max(raw, 1) / ticks)));
  const st = [1, 2, 2.5, 5, 10].map(function (s) {
    return s * mag;
  }).find(function (s) {
    return s * ticks >= raw;
  }) || mag * 10;
  return st * ticks;
}
function fmtK(v) {
  return Math.abs(v) >= 1000 ? Math.round(v / 100) / 10 + 'k' : String(Math.round(v));
}
function LineChart({
  labels = [],
  datasets = [],
  height = 260,
  ticks = 4,
  format
}) {
  const [ref, w] = useWidth();
  const [hi, setHi] = React.useState(null);
  const L = 52,
    B = 28,
    T = 12,
    R = 12;
  const all = [];
  datasets.forEach(function (d) {
    d.values.forEach(function (v) {
      all.push(v);
    });
  });
  const top = nice(Math.max.apply(null, all.concat([1])) * 1.05, ticks);
  const iw = w - L - R,
    ih = height - T - B;
  const n = labels.length;
  const x = function (i) {
    return L + (n < 2 ? 0 : i * iw / (n - 1));
  };
  const y = function (v) {
    return T + ih - v / top * ih;
  };
  const cols = ['var(--chart-2)', 'var(--ms7-lime-600)', 'var(--ms7-blue)', 'var(--ms7-orange)'];
  const tk = [];
  for (let i = 0; i <= ticks; i++) tk.push(top / ticks * i);
  const every = Math.ceil(n / 8);
  const f = format || fmtK;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginBottom: 10
    }
  }, datasets.map(function (d, j) {
    return /*#__PURE__*/React.createElement("span", {
      key: d.label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 0,
        borderTop: '2.5px ' + (d.dashed ? 'dashed' : 'solid') + ' ' + (d.color || cols[j])
      }
    }), d.label);
  })), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: height,
    style: {
      display: 'block'
    },
    onMouseLeave: function () {
      setHi(null);
    }
  }, tk.map(function (t) {
    return /*#__PURE__*/React.createElement("g", {
      key: t
    }, /*#__PURE__*/React.createElement("line", {
      x1: L,
      x2: w - R,
      y1: y(t),
      y2: y(t),
      stroke: "var(--border-default)",
      strokeDasharray: "3 4"
    }), /*#__PURE__*/React.createElement("text", {
      x: L - 8,
      y: y(t) + 4,
      textAnchor: "end",
      fontSize: "11",
      fontWeight: "600",
      fill: "var(--text-primary)"
    }, fmtK(t)));
  }), labels.map(function (l, i) {
    return i % every === 0 ? /*#__PURE__*/React.createElement("text", {
      key: i,
      x: x(i),
      y: height - 8,
      textAnchor: "middle",
      fontSize: "11",
      fontWeight: "600",
      fill: "var(--text-primary)"
    }, l) : null;
  }), datasets.map(function (d, j) {
    return /*#__PURE__*/React.createElement("polyline", {
      key: d.label,
      points: d.values.map(function (v, i) {
        return x(i) + ',' + y(v);
      }).join(' '),
      fill: "none",
      stroke: d.color || cols[j],
      strokeWidth: "2.5",
      strokeDasharray: d.dashed ? '6 5' : 'none',
      strokeLinejoin: "round",
      strokeLinecap: "round"
    });
  }), hi != null ? /*#__PURE__*/React.createElement("line", {
    x1: x(hi),
    x2: x(hi),
    y1: T,
    y2: T + ih,
    stroke: "var(--ms7-gray-300)"
  }) : null, hi != null ? datasets.map(function (d, j) {
    return d.values[hi] != null ? /*#__PURE__*/React.createElement("circle", {
      key: j,
      cx: x(hi),
      cy: y(d.values[hi]),
      r: "4",
      fill: d.color || cols[j],
      stroke: "#fff",
      strokeWidth: "2"
    }) : null;
  }) : null, labels.map(function (l, i) {
    return /*#__PURE__*/React.createElement("rect", {
      key: 'h' + i,
      x: x(i) - iw / Math.max(1, n - 1) / 2,
      y: T,
      width: iw / Math.max(1, n - 1),
      height: ih,
      fill: "transparent",
      onMouseEnter: function () {
        setHi(i);
      }
    });
  })), hi != null ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: Math.min(Math.max(x(hi), 80), w - 80),
      transform: 'translateX(-50%)',
      background: 'var(--ms7-black)',
      color: '#fff',
      fontSize: 11,
      fontWeight: 600,
      padding: '6px 9px',
      borderRadius: 6,
      pointerEvents: 'none',
      whiteSpace: 'nowrap'
    }
  }, labels[hi] + ' · ' + datasets.map(function (d) {
    return d.label + ': ' + f(d.values[hi]);
  }).join(' · ')) : null));
}
Object.assign(__ds_scope, { LineChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/data/ListingCard.jsx
try { (() => {
function ListingCard({
  title,
  status,
  image,
  thumbs = 2,
  meta = [],
  features = [],
  onMenu,
  style
}) {
  const ph = {
    background: 'var(--ms7-gray-100)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--ms7-gray-500)',
    overflow: 'hidden'
  };
  const thumbArr = [];
  for (let i = 0; i < thumbs; i++) thumbArr.push(i);
  return /*#__PURE__*/React.createElement("article", {
    style: Object.assign({
      display: 'flex',
      gap: 16,
      padding: 10,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      fontFamily: 'var(--font-sans)',
      minWidth: 0
    }, style)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: Object.assign({
      width: 220,
      height: 150
    }, ph)
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "image",
    size: 28
  })), thumbs ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, thumbArr.map(function (i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: Object.assign({
        width: 64,
        flex: 1
      }, ph)
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "image",
      size: 16
    }));
  })) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      padding: '6px 6px 6px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, status ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: status,
      flexShrink: 0
    }
  }) : null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      flex: 1,
      fontSize: 18,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onMenu,
    "aria-label": "Mais",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "ellipsis",
    size: 20
  }))), meta.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      flexWrap: 'wrap'
    }
  }, meta.map(function (m) {
    return /*#__PURE__*/React.createElement("div", {
      key: m.label
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-secondary)'
      }
    }, m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 600
      }
    }, m.value));
  })) : null, features.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px 20px',
      flexWrap: 'wrap'
    }
  }, features.map(function (f) {
    return /*#__PURE__*/React.createElement("span", {
      key: f.label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        fontWeight: 500
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: f.icon,
      size: 16
    }), f.label);
  })) : null));
}
Object.assign(__ds_scope, { ListingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ListingCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  icon,
  disabled = false,
  layout = 'inline',
  style
}) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked === undefined ? inner : checked;
  function toggle() {
    if (disabled) return;
    if (checked === undefined) setInner(!on);
    if (onChange) onChange(!on);
  }
  const box = /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": on,
    style: {
      width: 18,
      height: 18,
      borderRadius: 4,
      flexShrink: 0,
      border: on ? 'none' : '1.5px solid var(--ms7-gray-500)',
      background: on ? 'var(--ms7-green-900)' : 'var(--surface-card)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--dur-fast)'
    }
  }, on ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    color: "#fff",
    strokeWidth: 3
  }) : null);
  const row = layout === 'row';
  return /*#__PURE__*/React.createElement("div", {
    onClick: toggle,
    style: Object.assign({
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-primary)',
      justifyContent: row ? 'space-between' : 'flex-start',
      userSelect: 'none'
    }, style)
  }, row ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20
  }) : null, label) : null, box, !row && label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  }) : null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function FieldShell({
  label,
  required,
  hint,
  error,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      minWidth: 0
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ms7-error)'
    }
  }, "*") : null, label, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "info",
    size: 13,
    color: "var(--text-secondary)"
  })) : null, children, error || hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11,
      fontWeight: 500,
      color: error ? 'var(--ms7-error)' : 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "info",
    size: 11
  }), error || hint) : null);
}
function boxStyle(state) {
  const border = state.error ? 'var(--ms7-error)' : state.focus ? 'var(--border-focus)' : state.hover ? 'var(--ms7-gray-500)' : 'var(--border-default)';
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minHeight: 40,
    padding: '0 12px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid ' + border,
    background: state.disabled ? 'var(--ms7-gray-100)' : 'var(--surface-card)',
    boxShadow: state.focus ? '0 0 0 3px var(--ms7-green-100)' : 'none',
    transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
  };
}
const inputReset = {
  flex: 1,
  minWidth: 0,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontFamily: 'var(--font-sans)',
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--text-primary)',
  padding: '10px 0'
};
Object.assign(__ds_scope, { FieldShell, boxStyle, inputReset });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  required,
  hint,
  error,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = 'text',
  prefix,
  icon,
  multiline = false,
  rows = 3,
  disabled = false,
  style
}) {
  const [hov, setHov] = React.useState(false);
  const [foc, setFoc] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const isPw = type === 'password';
  const common = {
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: function () {
      setFoc(true);
    },
    onBlur: function () {
      setFoc(false);
    }
  };
  return /*#__PURE__*/React.createElement(__ds_scope.FieldShell, {
    label: label,
    required: required,
    hint: hint,
    error: error
  }, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: function () {
      setHov(true);
    },
    onMouseLeave: function () {
      setHov(false);
    },
    style: Object.assign(__ds_scope.boxStyle({
      hover: hov,
      focus: foc,
      error: !!error,
      disabled: disabled
    }), multiline ? {
      alignItems: 'flex-start'
    } : {}, style)
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    color: "var(--text-secondary)"
  }) : null, prefix ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-secondary)',
      paddingRight: 8,
      borderRight: '1px solid var(--border-default)'
    }
  }, prefix) : null, multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, common, {
    style: Object.assign({}, __ds_scope.inputReset, {
      resize: 'vertical'
    })
  })) : /*#__PURE__*/React.createElement("input", _extends({
    type: isPw && show ? 'text' : type
  }, common, {
    style: __ds_scope.inputReset
  })), isPw ? /*#__PURE__*/React.createElement("span", {
    onClick: function (e) {
      e.preventDefault();
      setShow(!show);
    },
    style: {
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: show ? 'eye' : 'eye-off',
    size: 16,
    color: "var(--text-secondary)"
  })) : null));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  required,
  hint,
  error,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder,
  variant = 'field',
  disabled = false,
  style
}) {
  const [hov, setHov] = React.useState(false);
  const opts = options.map(function (o) {
    return typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
  });
  const pill = variant === 'pill';
  const sel = /*#__PURE__*/React.createElement("div", {
    onMouseEnter: function () {
      setHov(true);
    },
    onMouseLeave: function () {
      setHov(false);
    },
    style: Object.assign(pill ? {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      height: 32,
      padding: '0 12px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid ' + (hov ? 'var(--ms7-gray-500)' : 'var(--border-default)'),
      background: 'var(--surface-card)'
    } : Object.assign({
      position: 'relative'
    }, __ds_scope.boxStyle({
      hover: hov,
      error: !!error,
      disabled: disabled
    })), style)
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    style: Object.assign({}, __ds_scope.inputReset, {
      appearance: 'none',
      WebkitAppearance: 'none',
      cursor: 'pointer',
      paddingRight: 22,
      fontSize: pill ? 12 : 14,
      color: pill ? 'var(--text-secondary)' : 'var(--text-primary)',
      padding: pill ? '0 22px 0 0' : '10px 22px 10px 0'
    })
  }, placeholder ? /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder) : null, opts.map(function (o) {
    return /*#__PURE__*/React.createElement("option", {
      key: o.value,
      value: o.value
    }, o.label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: pill ? 10 : 12,
      pointerEvents: 'none',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: pill ? 14 : 16,
    color: "var(--text-secondary)"
  })));
  return pill ? sel : /*#__PURE__*/React.createElement(__ds_scope.FieldShell, {
    label: label,
    required: required,
    hint: hint,
    error: error
  }, sel);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  style
}) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked === undefined ? inner : checked;
  function t() {
    if (disabled) return;
    if (checked === undefined) setInner(!on);
    if (onChange) onChange(!on);
  }
  return /*#__PURE__*/React.createElement("span", {
    onClick: t,
    role: "switch",
    "aria-checked": on,
    style: Object.assign({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 500,
      opacity: disabled ? 0.5 : 1,
      userSelect: 'none'
    }, style)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 22,
      borderRadius: 11,
      background: on ? 'var(--ms7-green-900)' : 'var(--ms7-gray-300)',
      position: 'relative',
      transition: 'background var(--dur-base)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: on ? 19 : 3,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: on ? 'var(--ms7-lime-500)' : 'var(--ms7-white)',
      transition: 'left var(--dur-base) var(--ease-standard)',
      boxShadow: '0 1px 2px rgba(0,0,0,.15)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Header.jsx
try { (() => {
function Header({
  title,
  search = 'icon',
  user,
  notifications = 0,
  messages = 0,
  showMessages = true,
  onNotificationsClick,
  onBack,
  actions,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: Object.assign({
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px 16px',
      minHeight: 72,
      paddingBottom: 16,
      borderBottom: '1px solid var(--border-default)',
      fontFamily: 'var(--font-sans)'
    }, style)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 220px',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, onBack ? /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-primary)',
      alignSelf: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-left",
    size: 14
  }), "Voltar") : null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 'var(--text-page-title)',
      fontWeight: 700,
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title)), search === 'field' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: 280,
      height: 40,
      padding: '0 14px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--ms7-gray-100)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 16,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Buscar",
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 14
    }
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexShrink: 0,
      marginLeft: 'auto'
    }
  }, actions, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, search === 'icon' ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "search",
    size: 38,
    iconSize: 20,
    label: "Buscar"
  }) : null, showMessages ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "message-circle",
    size: 38,
    iconSize: 20,
    badge: messages || null,
    label: "Mensagens"
  }) : null, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "bell",
    size: 38,
    iconSize: 20,
    badge: notifications || null,
    label: "Notifica\xE7\xF5es",
    onClick: onNotificationsClick
  })), user ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      paddingLeft: 16,
      borderLeft: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    src: user.avatar,
    name: user.name,
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }
  }, user.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, user.role))) : null));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Header.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
function NavItem({
  item,
  active,
  collapsed,
  onClick
}) {
  const [hov, setHov] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: collapsed ? item.label : undefined,
    onMouseEnter: function () {
      setHov(true);
    },
    onMouseLeave: function () {
      setHov(false);
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      height: 44,
      flexShrink: 0,
      padding: collapsed ? 0 : '0 14px',
      justifyContent: collapsed ? 'center' : 'flex-start',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      background: active ? 'var(--ms7-lime-500)' : hov ? 'rgba(255,255,255,0.06)' : 'transparent',
      color: active ? 'var(--ms7-green-900)' : '#FFFFFF',
      boxShadow: active ? 'var(--glow-lime)' : 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: active ? 600 : 500,
      textAlign: 'left',
      transition: 'background var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: item.icon,
    size: 20
  }), collapsed ? null : /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      whiteSpace: 'nowrap'
    }
  }, item.label), !collapsed && item.badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 20,
      height: 20,
      padding: '0 6px',
      borderRadius: 10,
      background: active ? 'var(--ms7-green-900)' : 'var(--ms7-lime-500)',
      color: active ? '#fff' : 'var(--ms7-green-900)',
      fontSize: 11,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, item.badge) : null);
}
function Sidebar({
  items = [],
  footerItems = [],
  activeId,
  onNavigate,
  collapsed = false,
  onToggle,
  brand = 'MS7',
  style
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: Object.assign({
      width: collapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
      flexShrink: 0,
      background: 'var(--surface-sidebar)',
      borderRadius: 'var(--radius-lg)',
      padding: collapsed ? '24px 16px' : '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      fontFamily: 'var(--font-sans)',
      transition: 'width var(--dur-base) var(--ease-standard)',
      boxSizing: 'border-box'
    }, style)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'space-between',
      flexDirection: collapsed ? 'column' : 'row',
      gap: 12,
      padding: collapsed ? 0 : '0 6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: '-0.02em',
      color: 'var(--ms7-lime-500)',
      lineHeight: 1
    }
  }, collapsed ? String(brand).slice(0, 1) : brand), /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-label": "Recolher menu",
    style: {
      background: 'none',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      padding: 4,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: collapsed ? 'arrow-right-to-line' : 'arrow-left-to-line',
    size: 18
  }))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      margin: '0 -4px',
      padding: '0 4px'
    }
  }, items.map(function (it, i) {
    if (it.section) {
      return collapsed ? /*#__PURE__*/React.createElement("div", {
        key: 's' + i,
        style: {
          height: 1,
          flexShrink: 0,
          background: 'rgba(255,255,255,0.1)',
          margin: '10px 8px'
        }
      }) : /*#__PURE__*/React.createElement("div", {
        key: 's' + i,
        style: {
          flexShrink: 0,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ms7-gray-500)',
          padding: i === 0 ? '0 14px 6px' : '16px 14px 6px'
        }
      }, it.section);
    }
    return /*#__PURE__*/React.createElement(NavItem, {
      key: it.id,
      item: it,
      collapsed: collapsed,
      active: it.id === activeId,
      onClick: function () {
        if (onNavigate) onNavigate(it.id);
      }
    });
  })), footerItems.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, footerItems.map(function (it) {
    return /*#__PURE__*/React.createElement(NavItem, {
      key: it.id,
      item: it,
      collapsed: collapsed,
      active: it.id === activeId,
      onClick: function () {
        if (onNavigate) onNavigate(it.id);
      }
    });
  })) : null);
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Stepper.jsx
try { (() => {
function Stepper({
  steps = 4,
  current = 1,
  showMeta = true,
  style
}) {
  const pct = Math.round((current - 1) / steps * 100);
  const nodes = [];
  for (let i = 1; i <= steps; i++) {
    const done = i < current,
      act = i === current;
    nodes.push(/*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 2,
        background: i <= current ? 'var(--text-primary)' : 'var(--ms7-gray-100)',
        borderRadius: 2
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 26,
        height: 26,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 700,
        background: done ? 'var(--text-primary)' : 'var(--surface-card)',
        color: done ? 'var(--surface-card)' : act ? 'var(--text-primary)' : 'var(--ms7-gray-500)',
        border: done ? 'none' : '1.5px solid ' + (act ? 'var(--text-primary)' : 'var(--ms7-gray-500)')
      }
    }, done ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 14,
      color: "var(--surface-card)",
      strokeWidth: 3
    }) : i)));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: Object.assign({
      fontFamily: 'var(--font-sans)'
    }, style)
  }, showMeta ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 12,
      fontWeight: 600,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, 'Etapa ' + current), /*#__PURE__*/React.createElement("span", null, pct + '% concluído')) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, nodes));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  onChange,
  variant = 'dark',
  style
}) {
  const list = items.map(function (t) {
    return typeof t === 'string' ? {
      id: t,
      label: t
    } : t;
  });
  const dark = variant === 'dark';
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: Object.assign({
      display: 'flex',
      gap: dark ? 4 : 6,
      padding: dark ? 6 : 0,
      borderRadius: dark ? 'var(--radius-md)' : 0,
      background: dark ? 'var(--ms7-black)' : 'transparent',
      fontFamily: 'var(--font-sans)'
    }, style)
  }, list.map(function (t) {
    const on = t.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      role: "tab",
      "aria-selected": on,
      onClick: function () {
        if (onChange) onChange(t.id);
      },
      style: {
        flex: dark ? 1 : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height: dark ? 36 : 30,
        padding: '0 14px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: dark ? 'var(--radius-sm)' : 'var(--radius-pill)',
        background: on ? dark ? 'var(--ms7-lime-500)' : 'var(--ms7-gray-100)' : 'transparent',
        color: on ? dark ? 'var(--ms7-green-900)' : 'var(--text-primary)' : dark ? '#FFFFFF' : 'var(--text-secondary)',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: 600,
        transition: 'background var(--dur-fast)'
      }
    }, t.label, t.count != null ? /*#__PURE__*/React.createElement(__ds_scope.CountDot, {
      tone: on ? 'green' : 'black'
    }, t.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/App.jsx
try { (() => {
function App() {
  const {
    Sidebar,
    Header
  } = window.MS7DesignSystem_5d5172;
  const [page, setPage] = React.useState(function () {
    return localStorage.getItem('ms7-page') || 'home';
  });
  const [collapsed, setCollapsed] = React.useState(false);
  function go(p) {
    if (p === 'logout') p = 'home';
    setPage(p);
    localStorage.setItem('ms7-page', p);
  }
  const titles = {
    home: 'Início',
    users: 'Usuários',
    newuser: 'Novo usuário',
    orders: 'Pedidos',
    calendar: 'Calendário',
    messages: 'Mensagens',
    settings: 'Configurações'
  };
  const S = {
    home: HomeScreen,
    users: UsersScreen,
    newuser: NewUserScreen,
    orders: OrdersScreen,
    calendar: CalendarScreen,
    messages: MessagesScreen,
    settings: SettingsScreen
  }[page] || HomeScreen;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: 16,
      minHeight: '100vh',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    items: MS7Data.nav,
    footerItems: MS7Data.foot,
    activeId: page === 'newuser' ? 'users' : page,
    onNavigate: go,
    collapsed: collapsed,
    onToggle: function () {
      setCollapsed(!collapsed);
    },
    style: {
      position: 'sticky',
      top: 16,
      height: 'calc(100vh - 32px)'
    }
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      padding: '8px 24px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Header, {
    title: titles[page],
    user: MS7Data.user,
    notifications: 2,
    messages: 3,
    onBack: page === 'newuser' ? function () {
      go('users');
    } : undefined
  }), /*#__PURE__*/React.createElement(S, {
    go: go
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/CalendarScreen.jsx
try { (() => {
function CalendarScreen() {
  const {
    Card,
    Button,
    IconButton,
    Icon
  } = window.MS7DesignSystem_5d5172;
  const [notes, setNotes] = React.useState([{
    t: 'Juliana Rocha',
    n: 'Confirmar o pagamento pendente antes da reunião de sexta.'
  }, {
    t: 'Equipe de produto',
    n: 'Enviar o changelog da v2.4 para todos os clientes.'
  }]);
  const lead = 1,
    days = 30,
    cells = [];
  for (let i = 0; i < lead; i++) cells.push({
    d: 31,
    muted: true
  });
  for (let d = 1; d <= days; d++) cells.push({
    d: d
  });
  while (cells.length % 7) cells.push({
    d: cells.length - days - lead + 1,
    muted: true
  });
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 24,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 16,
    style: {
      flex: '1 1 620px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-left",
    variant: "outline",
    size: 28,
    iconSize: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 700
    }
  }, "Setembro, 2026"), /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-right",
    variant: "outline",
    size: 28,
    iconSize: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 600,
      paddingBottom: 10
    }
  }, ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(function (d) {
    return /*#__PURE__*/React.createElement("span", {
      key: d
    }, d);
  })), weeks.map(function (w, wi) {
    const evs = MS7Data.events.filter(function (e) {
      return w.some(function (c) {
        return !c.muted && c.d === e.day;
      });
    });
    return /*#__PURE__*/React.createElement("div", {
      key: wi,
      style: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(7,1fr)',
        borderTop: '1px solid var(--border-default)'
      }
    }, w.map(function (c, ci) {
      return /*#__PURE__*/React.createElement("div", {
        key: ci,
        style: {
          height: 104,
          borderLeft: ci ? '1px solid var(--border-default)' : 'none',
          padding: 8,
          textAlign: 'right',
          fontSize: 13,
          fontWeight: 700,
          color: c.muted ? 'var(--ms7-gray-300)' : 'var(--text-primary)'
        }
      }, c.d === 22 && !c.muted ? /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: 'var(--ms7-black)',
          color: '#fff',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, "22") : c.d);
    }), evs.map(function (e) {
      const col = w.findIndex(function (c) {
        return !c.muted && c.d === e.day;
      });
      return /*#__PURE__*/React.createElement("div", {
        key: e.title,
        style: {
          position: 'absolute',
          top: 44,
          left: 'calc(' + col / 7 * 100 + '% + 6px)',
          width: 'calc(' + Math.min(e.span, 7 - col) / 7 * 100 + '% - 12px)',
          height: 50,
          borderRadius: 14,
          background: e.color,
          color: '#fff',
          padding: '0 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }, e.title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 500
        }
      }, e.sub)), /*#__PURE__*/React.createElement("span", {
        style: {
          border: '1.5px solid #fff',
          borderRadius: 6,
          display: 'flex',
          padding: 2
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-down-right",
        size: 14,
        color: "#fff"
      })));
    }));
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Notas",
    style: {
      flex: '1 1 260px',
      maxWidth: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, notes.map(function (n, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: 'var(--ms7-gray-50)',
        borderRadius: 12,
        padding: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 4
      }
    }, n.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 500,
        lineHeight: 1.45
      }
    }, /*#__PURE__*/React.createElement("b", null, "Nota: "), n.n));
  }), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "sm",
    iconLeft: "plus",
    onClick: function () {
      setNotes(notes.concat([{
        t: 'Nova nota',
        n: 'Clique para editar o conteúdo.'
      }]));
    }
  }, "Adicionar nota"))));
}
window.CalendarScreen = CalendarScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/CalendarScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/HomeScreen.jsx
try { (() => {
function RecentMessages({
  go
}) {
  const {
    Card,
    Avatar,
    CountDot
  } = window.MS7DesignSystem_5d5172;
  return /*#__PURE__*/React.createElement(Card, {
    title: "Mensagens recentes",
    action: /*#__PURE__*/React.createElement("a", {
      onClick: function () {
        go('messages');
      },
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-secondary)',
        cursor: 'pointer'
      }
    }, "Ver tudo")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, MS7Data.threads.map(function (t) {
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      onClick: function () {
        go('messages');
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      size: 36,
      shape: "square"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 600
      }
    }, t.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, t.preview)), t.unread ? /*#__PURE__*/React.createElement(CountDot, {
      tone: "lime"
    }, t.unread) : null);
  })));
}
function HomeScreen({
  go
}) {
  const {
    StatCard,
    Card,
    AreaChart,
    BarChart,
    Calendar,
    Select
  } = window.MS7DesignSystem_5d5172;
  const [m, setM] = React.useState(8);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    size: "lg",
    value: "192",
    label: "Novos usu\xE1rios hoje",
    tone: "blue"
  }), /*#__PURE__*/React.createElement(StatCard, {
    size: "lg",
    value: "103",
    label: "Pedidos esta semana",
    tone: "yellow"
  }), /*#__PURE__*/React.createElement(StatCard, {
    size: "lg",
    value: "86",
    label: "Sess\xF5es ativas",
    tone: "green"
  }), /*#__PURE__*/React.createElement(StatCard, {
    size: "lg",
    value: "R$ 342k",
    label: "Receita do m\xEAs",
    tone: "orange"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,2fr) minmax(280px,1fr)',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Receita",
    action: /*#__PURE__*/React.createElement(Select, {
      variant: "pill",
      options: ['Últimos 6 meses', 'Último ano']
    })
  }, /*#__PURE__*/React.createElement(AreaChart, {
    data: MS7Data.revenue,
    unit: "k",
    height: 250,
    highlight: 3,
    formatTip: function (d) {
      return 'R$ ' + d.value + 'k';
    }
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Pedidos",
    action: /*#__PURE__*/React.createElement(Select, {
      variant: "pill",
      options: ['Última semana', 'Último mês']
    })
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: MS7Data.week,
    height: 220,
    series: [{
      name: 'Visitas',
      color: 'var(--chart-1)'
    }, {
      name: 'Pedidos',
      color: 'var(--chart-2)'
    }]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Calendar, {
    year: 2026,
    month: m,
    today: m === 8 ? 22 : null,
    marked: m === 8 ? [23, 24, 25, 29] : [],
    onPrev: function () {
      setM(Math.max(0, m - 1));
    },
    onNext: function () {
      setM(Math.min(11, m + 1));
    },
    onSelect: function () {
      go('calendar');
    }
  })), /*#__PURE__*/React.createElement(RecentMessages, {
    go: go
  }))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/MessagesScreen.jsx
try { (() => {
function MessagesScreen() {
  const {
    Card,
    Avatar,
    Tabs,
    Input,
    IconButton,
    Icon
  } = window.MS7DesignSystem_5d5172;
  const T = MS7Data.threads;
  const [sel, setSel] = React.useState(1);
  const [tab, setTab] = React.useState('all');
  const [txt, setTxt] = React.useState('');
  const [msgs, setMsgs] = React.useState([{
    me: false,
    t: 'Olá! Gostaria de mais informações sobre o plano Pro.',
    at: 'Quinta 11:45'
  }, {
    me: true,
    t: 'Claro! O plano Pro inclui usuários ilimitados, relatórios e suporte prioritário.',
    at: 'Quinta 11:46'
  }, {
    me: false,
    t: 'Perfeito. Consigo migrar meus dados atuais?',
    at: 'Quinta 11:48'
  }, {
    me: true,
    t: 'Sim, a importação é feita em Configurações › Dados.',
    at: 'Quinta 11:50'
  }]);
  const cur = T.find(function (t) {
    return t.id === sel;
  });
  function send() {
    if (!txt.trim()) return;
    setMsgs(msgs.concat([{
      me: true,
      t: txt,
      at: 'Agora'
    }]));
    setTxt('');
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(220px,280px) minmax(0,1fr)',
      gap: 24,
      height: 'calc(100vh - 170px)',
      minHeight: 520
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 14,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "Buscar conversas"
  }), /*#__PURE__*/React.createElement(Tabs, {
    variant: "chips",
    value: tab,
    onChange: setTab,
    items: [{
      id: 'all',
      label: 'Todas',
      count: 4
    }, {
      id: 'unread',
      label: 'Não lidas',
      count: 2
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      overflowY: 'auto'
    }
  }, T.filter(function (t) {
    return tab === 'all' || t.unread;
  }).map(function (t) {
    const on = t.id === sel;
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      onClick: function () {
        setSel(t.id);
      },
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        cursor: 'pointer',
        background: on ? 'var(--ms7-gray-50)' : 'transparent',
        borderLeft: '3px solid ' + (on ? 'var(--ms7-green)' : 'transparent')
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      size: 38,
      shape: "square"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700
      }
    }, t.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--text-secondary)'
      }
    }, t.time)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 12,
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, t.preview), t.unread ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: 9,
        background: 'var(--ms7-green)',
        color: '#fff',
        fontSize: 10,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, t.unread) : null)));
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: 0,
    style: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: 40,
    shape: "square"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, cur.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--ms7-green)',
      fontWeight: 600
    }
  }, "\u25CF Online")), /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-down"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, msgs.map(function (m, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        alignSelf: m.me ? 'flex-end' : 'flex-start',
        maxWidth: '80%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: m.me ? 'var(--ms7-green)' : 'var(--ms7-gray-100)',
        color: m.me ? '#fff' : 'var(--text-primary)',
        padding: '10px 14px',
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.45
      }
    }, m.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--text-secondary)',
        marginTop: 4,
        textAlign: m.me ? 'right' : 'left'
      }
    }, m.at));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: 14,
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    },
    onKeyDown: function (e) {
      if (e.key === 'Enter') send();
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Escreva uma mensagem\u2026",
    value: txt,
    onChange: function (e) {
      setTxt(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(IconButton, {
    icon: "send",
    variant: "dark",
    size: 42,
    iconSize: 18,
    onClick: send,
    label: "Enviar"
  }))));
}
window.MessagesScreen = MessagesScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/MessagesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/OrdersScreen.jsx
try { (() => {
function OrdersScreen() {
  const {
    Card,
    StatCard,
    DataTable,
    Badge,
    Avatar,
    IconButton,
    Select,
    Button,
    Icon
  } = window.MS7DesignSystem_5d5172;
  const [st, setSt] = React.useState('Todos');
  const rows = MS7Data.orders.filter(function (o) {
    return st === 'Todos' || o.status === st;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    dark: true,
    icon: /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 8,
        background: 'var(--ms7-lime-500)',
        color: 'var(--ms7-green-900)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chart-column",
      size: 18
    })),
    title: "Desempenho geral"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: "12.847",
    label: "Total de pedidos",
    tone: "brand"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "R$ 125,4k",
    label: "Receita total",
    tone: "brand"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "5.429",
    label: "Clientes ativos",
    tone: "brand"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "102",
    label: "Solicita\xE7\xF5es pendentes",
    tone: "brand"
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Pedidos recentes",
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Select, {
      variant: "pill",
      value: st,
      onChange: function (e) {
        setSt(e.target.value);
      },
      options: ['Todos', 'Pago 100%', 'Pago 25%', 'Pendente', 'Falhou', 'Reembolsado']
    }), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline",
      iconLeft: "download"
    }, "Exportar"))
  }, /*#__PURE__*/React.createElement(DataTable, {
    rows: rows,
    columns: [{
      key: 'client',
      label: 'Cliente',
      render: function (r) {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }
        }, /*#__PURE__*/React.createElement(Avatar, {
          size: 32,
          shape: "square"
        }), /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 600
          }
        }, r.client));
      }
    }, {
      key: 'id',
      label: 'Pedido'
    }, {
      key: 'email',
      label: 'Contato'
    }, {
      key: 'item',
      label: 'Produto',
      render: function (r) {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, r.item), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 12,
            color: 'var(--text-secondary)'
          }
        }, r.qty));
      }
    }, {
      key: 'date',
      label: 'Data'
    }, {
      key: 'value',
      label: 'Valor',
      align: 'right'
    }, {
      key: 'status',
      label: 'Pagamento',
      align: 'center',
      render: function (r) {
        return /*#__PURE__*/React.createElement(Badge, {
          tone: r.tone,
          size: "sm"
        }, r.status);
      }
    }, {
      key: 'c',
      label: 'Chat',
      align: 'center',
      render: function () {
        return /*#__PURE__*/React.createElement(IconButton, {
          icon: "mail",
          size: 30,
          iconSize: 16
        });
      }
    }]
  })));
}
window.OrdersScreen = OrdersScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/OrdersScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/SettingsScreen.jsx
try { (() => {
function SettingsScreen() {
  const {
    Card,
    Input,
    Select,
    Checkbox,
    Button,
    Avatar,
    Tabs
  } = window.MS7DesignSystem_5d5172;
  const [tab, setTab] = React.useState('perfil');
  const [saved, setSaved] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      maxWidth: 980
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      id: 'perfil',
      label: 'Perfil'
    }, {
      id: 'notif',
      label: 'Notificações'
    }, {
      id: 'seg',
      label: 'Segurança'
    }],
    style: {
      maxWidth: 480
    }
  }), tab === 'perfil' ? /*#__PURE__*/React.createElement(Card, {
    title: "Informa\xE7\xF5es pessoais"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Ana Souza",
    size: 64
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    iconLeft: "upload"
  }, "Trocar foto")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nome",
    defaultValue: "Ana Souza"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "E-mail",
    defaultValue: "ana.souza@ms7.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Telefone",
    prefix: "+55",
    defaultValue: "(11) 98765-4321"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Idioma",
    defaultValue: "Portugu\xEAs",
    options: ['Português', 'English', 'Español']
  }))) : null, tab === 'notif' ? /*#__PURE__*/React.createElement(Card, {
    title: "Receber notifica\xE7\xF5es de"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
      gap: '18px 40px'
    }
  }, [['receipt-text', 'Novos pedidos', true], ['credit-card', 'Falhas de pagamento', true], ['user-plus', 'Novos usuários', false], ['message-circle', 'Mensagens', true], ['chart-column', 'Relatório semanal', false]].map(function (r) {
    return /*#__PURE__*/React.createElement(Checkbox, {
      key: r[1],
      layout: "row",
      icon: r[0],
      label: r[1],
      defaultChecked: r[2]
    });
  }))) : null, tab === 'seg' ? /*#__PURE__*/React.createElement(Card, {
    title: "Alterar senha"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Senha atual",
    type: "password"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Nova senha",
    type: "password",
    hint: "M\xEDnimo de 8 caracteres"
  }))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 12
    }
  }, saved ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ms7-green)'
    }
  }, "Altera\xE7\xF5es salvas") : null, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    iconLeft: "check",
    onClick: function () {
      setSaved(true);
    }
  }, "Salvar altera\xE7\xF5es")));
}
window.SettingsScreen = SettingsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/SettingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/UsersScreen.jsx
try { (() => {
function UsersScreen({
  go
}) {
  const {
    DataTable,
    Tabs,
    Badge,
    Avatar,
    Button,
    IconButton,
    Input,
    Card
  } = window.MS7DesignSystem_5d5172;
  const [tab, setTab] = React.useState('all');
  const [q, setQ] = React.useState('');
  const U = MS7Data.users;
  const rows = U.filter(function (u) {
    return (tab === 'all' || tab === 'admin' && u.role === 'Admin' || tab === 'editor' && u.role === 'Editor' || tab === 'inactive' && u.status === 'Inativo') && (u.name + u.email).toLowerCase().indexOf(q.toLowerCase()) >= 0;
  });
  const tone = {
    Ativo: 'green',
    Pendente: 'yellow',
    Inativo: 'gray'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "chips",
    value: tab,
    onChange: setTab,
    items: [{
      id: 'all',
      label: 'Todos',
      count: U.length
    }, {
      id: 'admin',
      label: 'Admins',
      count: 1
    }, {
      id: 'editor',
      label: 'Editores',
      count: 2
    }, {
      id: 'inactive',
      label: 'Inativos',
      count: 1
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "Buscar por nome ou e-mail",
    value: q,
    onChange: function (e) {
      setQ(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(Button, {
    iconLeft: "plus",
    onClick: function () {
      go('newuser');
    }
  }, "Adicionar usu\xE1rio"))), /*#__PURE__*/React.createElement(Card, {
    padding: 12
  }, /*#__PURE__*/React.createElement(DataTable, {
    rows: rows,
    columns: [{
      key: 'name',
      label: 'Usuário',
      render: function (r) {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }
        }, /*#__PURE__*/React.createElement(Avatar, {
          name: r.name,
          size: 34
        }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            fontWeight: 600
          }
        }, r.name), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 12,
            color: 'var(--text-secondary)'
          }
        }, r.email)));
      }
    }, {
      key: 'role',
      label: 'Cargo'
    }, {
      key: 'status',
      label: 'Status',
      render: function (r) {
        return /*#__PURE__*/React.createElement(Badge, {
          tone: tone[r.status],
          variant: "soft",
          size: "sm"
        }, r.status);
      }
    }, {
      key: 'last',
      label: 'Último acesso'
    }, {
      key: 'a',
      label: '',
      align: 'right',
      render: function () {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'inline-flex',
            gap: 2
          }
        }, /*#__PURE__*/React.createElement(IconButton, {
          icon: "pencil",
          size: 32,
          iconSize: 16
        }), /*#__PURE__*/React.createElement(IconButton, {
          icon: "trash-2",
          size: 32,
          iconSize: 16
        }));
      }
    }]
  }), rows.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      textAlign: 'center',
      color: 'var(--text-secondary)',
      fontWeight: 500
    }
  }, "Nenhum usu\xE1rio encontrado.") : null));
}
function NewUserScreen({
  go
}) {
  const {
    Card,
    Stepper,
    Input,
    Select,
    Checkbox,
    Button
  } = window.MS7DesignSystem_5d5172;
  const [step, setStep] = React.useState(1);
  const perms = [['layout-grid', 'Painel'], ['users', 'Usuários'], ['receipt-text', 'Pedidos'], ['chart-column', 'Relatórios'], ['calendar-days', 'Calendário'], ['settings', 'Configurações']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      maxWidth: 980
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Stepper, {
    steps: 3,
    current: step
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '16px 0 0',
      fontSize: 24,
      fontWeight: 700
    }
  }, ['Dados do usuário', 'Permissões', 'Revisão'][step - 1])), step === 1 ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nome completo",
    required: true,
    placeholder: "Ex.: Ana Souza"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "E-mail",
    required: true,
    placeholder: "nome@empresa.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Telefone",
    prefix: "+55",
    placeholder: "(11) 90000-0000"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Cargo",
    required: true,
    placeholder: "Selecione",
    options: ['Admin', 'Editor', 'Leitor']
  }))) : null, step === 2 ? /*#__PURE__*/React.createElement(Card, {
    title: "O que este usu\xE1rio pode acessar?"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
      gap: '18px 40px'
    }
  }, perms.map(function (p, i) {
    return /*#__PURE__*/React.createElement(Checkbox, {
      key: p[1],
      layout: "row",
      icon: p[0],
      label: p[1],
      defaultChecked: i < 3
    });
  }))) : null, step === 3 ? /*#__PURE__*/React.createElement(Card, {
    title: "Tudo pronto"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, "O convite ser\xE1 enviado por e-mail. O usu\xE1rio define a senha no primeiro acesso.")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: "chevron-left",
    onClick: function () {
      step === 1 ? go('users') : setStep(step - 1);
    }
  }, "Voltar"), step < 3 ? /*#__PURE__*/React.createElement(Button, {
    iconRight: "chevron-right",
    onClick: function () {
      setStep(step + 1);
    }
  }, "Pr\xF3xima etapa") : /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    iconLeft: "send",
    onClick: function () {
      go('users');
    }
  }, "Enviar convite")));
}
window.UsersScreen = UsersScreen;
window.NewUserScreen = NewUserScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/UsersScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/data.js
try { (() => {
window.MS7Data = {
  user: {
    name: 'Ana Souza',
    role: 'Admin'
  },
  nav: [{
    id: 'home',
    label: 'Início',
    icon: 'layout-grid'
  }, {
    id: 'users',
    label: 'Usuários',
    icon: 'users'
  }, {
    id: 'orders',
    label: 'Pedidos',
    icon: 'receipt-text',
    badge: 4
  }, {
    id: 'calendar',
    label: 'Calendário',
    icon: 'calendar-days'
  }, {
    id: 'messages',
    label: 'Mensagens',
    icon: 'message-circle',
    badge: 3
  }],
  foot: [{
    id: 'settings',
    label: 'Configurações',
    icon: 'settings'
  }, {
    id: 'logout',
    label: 'Sair',
    icon: 'log-out'
  }],
  revenue: [{
    label: 'Abr 2026',
    value: 180
  }, {
    label: 'Mai 2026',
    value: 120
  }, {
    label: 'Jun 2026',
    value: 420
  }, {
    label: 'Jul 2026',
    value: 342
  }, {
    label: 'Ago 2026',
    value: 220
  }, {
    label: 'Set 2026',
    value: 470
  }],
  week: [['16 Set', 220, 95], ['17 Set', 180, 50], ['18 Set', 205, 80], ['19 Set', 160, 45], ['20 Set', 190, 70], ['21 Set', 150, 25], ['22 Set', 170, 48]].map(function (r) {
    return {
      label: r[0],
      values: [r[1], r[2]]
    };
  }),
  users: [{
    id: 1,
    name: 'Ana Souza',
    email: 'ana.souza@ms7.com',
    role: 'Admin',
    status: 'Ativo',
    last: 'Agora'
  }, {
    id: 2,
    name: 'Rafael Lima',
    email: 'rafael.lima@ms7.com',
    role: 'Editor',
    status: 'Ativo',
    last: 'Há 12 min'
  }, {
    id: 3,
    name: 'Juliana Rocha',
    email: 'juliana.rocha@ms7.com',
    role: 'Leitor',
    status: 'Pendente',
    last: 'Ontem'
  }, {
    id: 4,
    name: 'Marcos Alves',
    email: 'marcos.alves@ms7.com',
    role: 'Editor',
    status: 'Ativo',
    last: 'Há 2 dias'
  }, {
    id: 5,
    name: 'Beatriz Nunes',
    email: 'beatriz.nunes@ms7.com',
    role: 'Leitor',
    status: 'Inativo',
    last: 'Há 3 semanas'
  }],
  orders: [{
    id: 'MS-2052',
    client: 'Rafael Lima',
    email: 'rafael.lima@gmail.com',
    item: 'Plano Pro · anual',
    qty: '2 licenças',
    date: '22 Set',
    value: 'R$ 1.000',
    status: 'Pago 100%',
    tone: 'green'
  }, {
    id: 'MS-2051',
    client: 'Juliana Rocha',
    email: 'juliana.r@gmail.com',
    item: 'Plano Básico · mensal',
    qty: '1 licença',
    date: '22 Set',
    value: 'R$ 89',
    status: 'Pendente',
    tone: 'yellow'
  }, {
    id: 'MS-2050',
    client: 'Marcos Alves',
    email: 'marcos@alves.com.br',
    item: 'Plano Pro · mensal',
    qty: '5 licenças',
    date: '21 Set',
    value: 'R$ 495',
    status: 'Pago 25%',
    tone: 'green'
  }, {
    id: 'MS-2049',
    client: 'Beatriz Nunes',
    email: 'bia.nunes@gmail.com',
    item: 'Suporte premium',
    qty: '1 contrato',
    date: '21 Set',
    value: 'R$ 320',
    status: 'Falhou',
    tone: 'error'
  }, {
    id: 'MS-2048',
    client: 'Carlos Mota',
    email: 'carlos@mota.dev',
    item: 'Plano Pro · anual',
    qty: '1 licença',
    date: '20 Set',
    value: 'R$ 500',
    status: 'Reembolsado',
    tone: 'blue'
  }],
  threads: [{
    id: 1,
    name: 'Rafael Lima',
    preview: 'Olá! Gostaria de mais informações sobre o plano.',
    time: 'Agora',
    unread: 0
  }, {
    id: 2,
    name: 'Juliana Rocha',
    preview: 'O pagamento ficou pendente, pode verificar?',
    time: '14:36',
    unread: 2
  }, {
    id: 3,
    name: 'Marcos Alves',
    preview: 'Obrigado pelo retorno rápido!',
    time: 'Ontem',
    unread: 1
  }, {
    id: 4,
    name: 'Beatriz Nunes',
    preview: 'Consigo adicionar mais usuários?',
    time: 'Terça',
    unread: 0
  }],
  events: [{
    day: 4,
    span: 2,
    title: 'Reunião de equipe',
    sub: 'Sala 2',
    color: 'var(--ms7-punch-pink)'
  }, {
    day: 10,
    span: 4,
    title: 'Lançamento v2.4',
    sub: 'Produto',
    color: 'var(--ms7-purple)'
  }, {
    day: 16,
    span: 3,
    title: 'Revisão trimestral',
    sub: 'Financeiro',
    color: 'var(--ms7-yellow)'
  }, {
    day: 23,
    span: 2,
    title: 'Treinamento',
    sub: 'Novos usuários',
    color: 'var(--ms7-turquoise)'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/data.js", error: String((e && e.message) || e) }); }

// ui_kits/operacoes/OperacoesApp.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const NAV = [{
    id: 'geral',
    label: 'Dashboard',
    icon: 'layout-dashboard'
  }, {
    id: 'cooperacoes',
    label: 'Cooperações',
    icon: 'briefcase',
    badge: 5
  }, {
    id: 'alunos',
    label: 'Alunos',
    icon: 'graduation-cap'
  }, {
    id: 'analises',
    label: 'Análises',
    icon: 'chart-column'
  }, {
    id: 'financeiro',
    label: 'Financeiro',
    icon: 'wallet'
  }, {
    id: 'listas',
    label: 'Listas globais',
    icon: 'list-checks'
  }, {
    id: 'avisos',
    label: 'Avisos',
    icon: 'megaphone'
  }, {
    id: 'gestao',
    label: 'Gestão',
    icon: 'sliders-horizontal'
  }];
  const FOOT = [{
    id: 'proxies',
    label: 'Proxies',
    icon: 'globe'
  }, {
    id: 'assinaturas',
    label: 'Assinatura',
    icon: 'credit-card'
  }, {
    id: 'config',
    label: 'Configurações',
    icon: 'settings'
  }];
  const TITLES = {
    geral: 'Dashboard',
    cooperacoes: 'Cooperações',
    alunos: 'Alunos',
    analises: 'Análises',
    financeiro: 'Financeiro',
    listas: 'Listas globais',
    avisos: 'Avisos',
    gestao: 'Gestão',
    proxies: 'Proxies',
    assinaturas: 'Assinatura',
    config: 'Configurações'
  };
  function TabbedPage({
    tabs,
    storeKey,
    role,
    go,
    chips,
    session
  }) {
    const [t, setT] = React.useState(function () {
      return localStorage.getItem(storeKey) || tabs[0].id;
    });
    const cur = tabs.find(function (x) {
      return x.id === t;
    }) || tabs[0];
    const C = cur.C;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(DS.Tabs, {
      variant: chips ? 'chips' : 'dark',
      value: cur.id,
      onChange: function (v) {
        setT(v);
        localStorage.setItem(storeKey, v);
      },
      items: tabs.map(function (x) {
        return {
          id: x.id,
          label: x.label
        };
      }),
      style: chips ? {
        flexWrap: 'wrap'
      } : {
        maxWidth: tabs.length * 170
      }
    }), /*#__PURE__*/React.createElement(C, {
      key: cur.id,
      role: role,
      go: go,
      session: session
    }));
  }
  function AnalisesScreen(p) {
    return /*#__PURE__*/React.createElement(TabbedPage, _extends({}, p, {
      storeKey: "ms7op-analises",
      tabs: [{
        id: 'comparacao',
        label: 'Operadores',
        C: ComparacaoScreen
      }, {
        id: 'redes',
        label: 'Redes',
        C: RedesScreen
      }, {
        id: 'heatmap',
        label: 'Heatmap',
        C: HeatmapScreen
      }, {
        id: 'projecao',
        label: 'Projeção',
        C: ProjecaoScreen
      }]
    }));
  }
  function GestaoScreen(p) {
    return /*#__PURE__*/React.createElement(TabbedPage, _extends({}, p, {
      chips: true,
      storeKey: "ms7op-gestao",
      tabs: [{
        id: 'operadores',
        label: 'Operadores',
        C: OperadoresTab
      }, {
        id: 'grupos',
        label: 'Grupos',
        C: GruposTab
      }, {
        id: 'plataformas',
        label: 'Plataformas',
        C: PlataformasTab
      }, {
        id: 'pix',
        label: 'Chaves PIX',
        C: PixTab
      }, {
        id: 'metas',
        label: 'Metas',
        C: MetasTab
      }, {
        id: 'cupons',
        label: 'Cupons',
        C: CuponsTab
      }, {
        id: 'ranking',
        label: 'Ranking',
        C: RankingTab
      }, {
        id: 'notif',
        label: 'Notificações',
        C: NotificacoesTab
      }]
    }));
  }
  function FinanceiroScreen(p) {
    return /*#__PURE__*/React.createElement(TabbedPage, _extends({}, p, {
      storeKey: "ms7op-fin",
      tabs: [{
        id: 'folha',
        label: 'Pagamentos',
        C: FolhaScreen
      }, {
        id: 'custos',
        label: 'Custos',
        C: CustosScreen
      }]
    }));
  }
  const OP_NAV = ['geral', 'cooperacoes', 'avisos'];
  const OP_FOOT = ['config'];
  function Login({
    onLogin
  }) {
    const {
      Button,
      Select,
      Card,
      Input
    } = DS;
    const ops = DB.get().operadores.filter(function (o) {
      return o.ativo;
    });
    const [op, setOp] = React.useState(ops[0] ? ops[0].id : '');
    const [srv, setSrv] = React.useState(DB.Sync.base() || (location.protocol.indexOf('http') === 0 ? location.origin : ''));
    const [email, setEmail] = React.useState('');
    const [pw, setPw] = React.useState('');
    const [err, setErr] = React.useState(window.ms7LoginMsg || '');
    const [busy, setBusy] = React.useState(false);
    const [demo, setDemo] = React.useState(false);
    function entrar(e) {
      if (e) e.preventDefault();
      setErr('');
      setBusy(true);
      DB.Sync.login(srv, email, pw).then(function (u) {
        onLogin({
          role: u.role,
          opId: u.opId,
          name: u.name,
          real: true
        });
      }).catch(function (x) {
        setErr(x.message === 'Failed to fetch' ? 'Servidor não encontrado. Confira o endereço.' : x.message);
      }).then(function () {
        setBusy(false);
      });
    }
    const Opt = function ({
      icon,
      title,
      sub,
      onClick,
      children
    }) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: 14,
          border: '1px solid var(--border-default)',
          borderRadius: 14
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 38,
          height: 38,
          borderRadius: 10,
          background: 'var(--ms7-lime-100)',
          color: 'var(--ms7-green-900)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: icon,
        size: 18
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("b", {
        style: {
          fontSize: 14
        }
      }, title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--text-secondary)'
        }
      }, sub), children), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "outline",
        onClick: onClick
      }, "Testar"));
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
      }
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        width: '100%',
        maxWidth: 440
      },
      padding: 32
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        fontWeight: 800,
        color: 'var(--ms7-green-900)',
        letterSpacing: '-0.02em',
        lineHeight: 1
      }
    }, "MS7"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '10px 0 22px',
        fontSize: 15,
        fontWeight: 500,
        color: 'var(--text-secondary)'
      }
    }, "Entre com seu email e senha."), /*#__PURE__*/React.createElement("form", {
      onSubmit: entrar,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Email",
      type: "email",
      icon: "mail",
      value: email,
      onChange: function (e) {
        setEmail(e.target.value);
      },
      placeholder: "voce@ms7.com"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Senha",
      type: "password",
      icon: "lock",
      value: pw,
      onChange: function (e) {
        setPw(e.target.value);
      }
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Servidor",
      icon: "server",
      value: srv,
      onChange: function (e) {
        setSrv(e.target.value);
      },
      placeholder: "https://painel.seudominio.com"
    }), err ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        padding: '10px 12px',
        borderRadius: 10,
        background: 'color-mix(in oklab, var(--ms7-error) 10%, transparent)',
        color: 'var(--ms7-error)',
        fontSize: 13,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement(DS.Icon, {
      name: "circle-alert",
      size: 16
    }), err) : null, /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      variant: "brand",
      fullWidth: true,
      size: "lg",
      iconRight: "arrow-right",
      disabled: busy || !email || !pw || !srv,
      onClick: entrar
    }, busy ? 'Entrando…' : 'Entrar')), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 22,
        paddingTop: 16,
        borderTop: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        setDemo(!demo);
      },
      style: {
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement(DS.Icon, {
      name: demo ? 'chevron-up' : 'chevron-down',
      size: 16
    }), "Modo demonstra\xE7\xE3o (sem servidor)"), demo ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(Opt, {
      icon: "shield-check",
      title: "Admin",
      sub: "V\xEA e gerencia tudo.",
      onClick: function () {
        onLogin({
          role: 'admin',
          name: 'Marcelo'
        });
      }
    }), /*#__PURE__*/React.createElement(Opt, {
      icon: "crown",
      title: "Super Admin",
      sub: "Admin + assinaturas.",
      onClick: function () {
        onLogin({
          role: 'super',
          name: 'Marcelo'
        });
      }
    }), /*#__PURE__*/React.createElement(Opt, {
      icon: "user",
      title: "Operador",
      sub: "S\xF3 as pr\xF3prias coopera\xE7\xF5es.",
      onClick: function () {
        onLogin({
          role: 'operador',
          opId: op,
          name: DB.opName(op)
        });
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(Select, {
      variant: "pill",
      value: op,
      onChange: function (e) {
        setOp(e.target.value);
      },
      options: ops.map(function (o) {
        return {
          value: o.id,
          label: o.nome
        };
      })
    }))), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      iconLeft: "rotate-ccw",
      onClick: function () {
        DB.A.reset();
      }
    }, "Restaurar dados de exemplo")) : null)));
  }
  function Search({
    onClose,
    go,
    session
  }) {
    const {
      Input
    } = DS;
    const [q, setQ] = React.useState('');
    const db = DB.get();
    const s = q.toLowerCase().trim();
    const isOp = session.role === 'operador';
    const res = [];
    if (s) {
      Object.keys(TITLES).forEach(function (k) {
        if ((!isOp || OP_NAV.concat(OP_FOOT).indexOf(k) >= 0) && TITLES[k].toLowerCase().indexOf(s) >= 0) res.push({
          icon: 'layout-grid',
          t: TITLES[k],
          sub: 'Página',
          fn: function () {
            go(k);
          }
        });
      });
      db.coops.forEach(function (c) {
        if (isOp && c.opId !== session.opId) return;
        if ((c.cliente + ' ' + c.id + ' ' + c.plataforma).toLowerCase().indexOf(s) >= 0) res.push({
          icon: 'briefcase',
          t: c.cliente + ' · ' + c.id,
          sub: 'Cooperação · ' + c.status,
          fn: function () {
            localStorage.setItem('ms7op-open-coop', c.id);
            go('cooperacoes');
          }
        });
        c.contas.forEach(function (k) {
          if (k.usuario.toLowerCase().indexOf(s) >= 0) res.push({
            icon: 'user',
            t: k.usuario,
            sub: 'Conta · ' + c.cliente + ' · ' + k.status,
            fn: function () {
              localStorage.setItem('ms7op-open-coop', c.id);
              go('cooperacoes');
            }
          });
        });
      });
      if (!isOp) db.operadores.forEach(function (o) {
        if (o.nome.toLowerCase().indexOf(s) >= 0) res.push({
          icon: 'users',
          t: o.nome,
          sub: 'Operador',
          fn: function () {
            go('gestao');
          }
        });
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 1600,
        background: 'rgba(12,14,12,0.4)',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '12vh'
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function (e) {
        e.stopPropagation();
      },
      style: {
        width: '100%',
        maxWidth: 560,
        height: 'fit-content',
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface-card)',
        color: 'var(--text-primary)',
        borderRadius: 16,
        boxShadow: 'var(--shadow-pop)',
        padding: 14,
        margin: '0 16px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      onKeyDown: function (e) {
        if (e.key === 'Escape') onClose();
        if (e.key === 'Enter' && res[0]) {
          res[0].fn();
          onClose();
        }
      }
    }, /*#__PURE__*/React.createElement(Input, {
      icon: "search",
      placeholder: "Buscar coopera\xE7\xE3o, conta, operador ou p\xE1gina\u2026",
      value: q,
      onChange: function (e) {
        setQ(e.target.value);
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowY: 'auto',
        marginTop: 8
      }
    }, s && !res.length ? /*#__PURE__*/React.createElement(Empty, {
      icon: "search",
      title: "Nada encontrado"
    }) : res.slice(0, 30).map(function (r, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        onClick: function () {
          r.fn();
          onClose();
        },
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 8px',
          borderRadius: 10,
          cursor: 'pointer'
        },
        onMouseEnter: function (e) {
          e.currentTarget.style.background = 'var(--ms7-gray-50)';
        },
        onMouseLeave: function (e) {
          e.currentTarget.style.background = 'transparent';
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: r.icon,
        size: 18
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 600
        }
      }, r.t), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: 'var(--text-secondary)',
          fontWeight: 500
        }
      }, r.sub)));
    }), !s ? /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '10px 8px',
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--text-secondary)'
      }
    }, "Dica: use Ctrl+K (ou \u2318K) para abrir a busca de qualquer tela.") : null)));
  }
  function OperacoesApp() {
    const [session, setSession] = React.useState(function () {
      const u = DB.Sync.token() && DB.Sync.user();
      if (u) return {
        role: u.role,
        opId: u.opId,
        name: u.name,
        real: true
      };
      try {
        return JSON.parse(localStorage.getItem('ms7op-session'));
      } catch (e) {
        return null;
      }
    });
    React.useEffect(function () {
      window.ms7OnLogout = function (expired) {
        window.ms7LoginMsg = expired ? 'Sua sessão expirou. Entre novamente.' : '';
        setSession(null);
      };
      const S = DB.Sync;
      if (S.token()) S.api('/api/auth/me').then(function (j) {
        const u = j.user;
        localStorage.setItem('ms7-user', JSON.stringify(u));
        setSession(function (s) {
          return s && s.real && s.role === u.role && s.opId === u.opId ? s : {
            role: u.role,
            opId: u.opId,
            name: u.name,
            real: true
          };
        });
      }).catch(function () {});
    }, []);
    const [page, setPage] = React.useState(function () {
      return localStorage.getItem('ms7op-page') || 'geral';
    });
    const [collapsed, setCollapsed] = React.useState(false);
    const [np, setNp] = React.useState(false);
    const [sq, setSq] = React.useState(false);
    const notifs = useNotifs();
    const unread = notifs.filter(function (n) {
      return !n.read;
    }).length;
    const [theme, setTheme] = React.useState(function () {
      return localStorage.getItem('ms7op-theme') || 'light';
    });
    React.useEffect(function () {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('ms7op-theme', theme);
    }, [theme]);
    React.useEffect(function () {
      function k(e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          setSq(true);
        }
      }
      window.addEventListener('keydown', k);
      return function () {
        window.removeEventListener('keydown', k);
      };
    }, []);
    window.ms7SetTheme = setTheme;
    window.ms7Theme = theme;
    const isOp = session && session.role === 'operador';
    function login(s) {
      localStorage.setItem('ms7op-session', JSON.stringify(s));
      setSession(s);
      setPage('geral');
      localStorage.setItem('ms7op-page', 'geral');
      if (s.role !== 'operador') {
        const al = buildAlerts(s);
        const pix = al.filter(function (a) {
          return a.icon === 'key-round';
        });
        if (pix.length) setTimeout(function () {
          notify({
            type: 'bloqueio',
            title: 'Chaves PIX acabando',
            body: pix.map(function (a) {
              return a.title.replace('Chaves PIX acabando: ', '') + ' — ' + a.sub;
            }).join('\n')
          });
        }, 800);
      }
    }
    function go(p) {
      if (p === 'logout') {
        if (session && session.real) {
          DB.Sync.logout();
          return;
        }
        localStorage.removeItem('ms7op-session');
        setSession(null);
        return;
      }
      if (!TITLES[p] || isOp && OP_NAV.concat(OP_FOOT).indexOf(p) < 0) p = 'geral';
      setPage(p);
      localStorage.setItem('ms7op-page', p);
      window.scrollTo(0, 0);
    }
    window.ms7Go = go;
    if (!session) return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Login, {
      onLogin: login
    }), /*#__PURE__*/React.createElement(Toaster, null));
    const nav = isOp ? NAV.filter(function (n) {
      return OP_NAV.indexOf(n.id) >= 0;
    }).map(function (n) {
      return n.id === 'cooperacoes' ? Object.assign({}, n, {
        label: 'Minhas cooperações',
        badge: null
      }) : n;
    }) : NAV.map(function (n) {
      return n.id === 'cooperacoes' ? Object.assign({}, n, {
        badge: DB.get().coops.filter(function (c) {
          return c.status === 'Em andamento';
        }).length || null
      }) : n;
    });
    const foot = (isOp ? FOOT.filter(function (n) {
      return OP_FOOT.indexOf(n.id) >= 0;
    }) : FOOT).concat([{
      id: 'logout',
      label: 'Sair',
      icon: 'log-out'
    }]);
    const pg = isOp && OP_NAV.concat(OP_FOOT).indexOf(page) < 0 ? 'geral' : page;
    const S = {
      geral: GeralScreen,
      cooperacoes: CooperacoesScreen,
      alunos: AlunosScreen,
      analises: AnalisesScreen,
      financeiro: FinanceiroScreen,
      listas: ListasScreen,
      avisos: AvisosScreen,
      gestao: GestaoScreen,
      proxies: ProxiesScreen,
      assinaturas: AssinaturaScreen,
      config: ConfigScreen
    }[pg] || GeralScreen;
    const roleLabel = {
      admin: 'Admin',
      super: 'Super Admin',
      operador: 'Operador'
    }[session.role];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        padding: 16,
        minHeight: '100vh',
        boxSizing: 'border-box'
      }
    }, /*#__PURE__*/React.createElement(DS.Sidebar, {
      items: nav,
      footerItems: foot,
      activeId: pg,
      onNavigate: go,
      collapsed: collapsed,
      onToggle: function () {
        setCollapsed(!collapsed);
      },
      style: Object.assign({
        position: 'sticky',
        top: 16,
        height: 'calc(100vh - 32px)'
      }, collapsed ? {} : {
        width: 240
      })
    }), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1,
        minWidth: 0,
        padding: '8px 24px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(DS.Header, {
      title: isOp && pg === 'cooperacoes' ? 'Minhas cooperações' : TITLES[pg],
      search: "none",
      showMessages: false,
      user: {
        name: session.name,
        role: roleLabel
      },
      notifications: isOp ? 0 : unread,
      onNotificationsClick: function () {
        setNp(true);
      },
      actions: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }
      }, /*#__PURE__*/React.createElement(DS.IconButton, {
        icon: "search",
        size: 38,
        iconSize: 20,
        label: "Buscar (Ctrl+K)",
        onClick: function () {
          setSq(true);
        }
      }), /*#__PURE__*/React.createElement(DS.IconButton, {
        icon: theme === 'dark' ? 'sun' : 'moon',
        size: 38,
        iconSize: 20,
        label: theme === 'dark' ? 'Modo claro' : 'Modo escuro',
        onClick: function () {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }
      }))
    }), /*#__PURE__*/React.createElement(S, {
      key: pg,
      go: go,
      role: session.role,
      session: session
    })), /*#__PURE__*/React.createElement(Toaster, null), isOp ? null : /*#__PURE__*/React.createElement(PushPreview, null), np ? /*#__PURE__*/React.createElement(NotifPanel, {
      onClose: function () {
        setNp(false);
      }
    }) : null, sq ? /*#__PURE__*/React.createElement(Search, {
      go: go,
      session: session,
      onClose: function () {
        setSq(false);
      }
    }) : null);
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(OperacoesApp, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operacoes/OperacoesApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operacoes/ScreensAnalises.jsx
try { (() => {
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  function HeatmapScreen() {
    const {
      Card,
      Tabs,
      Heatmap
    } = DS;
    const [metric, setMetric] = usePersist('heat-m', 'lucro');
    const [per, setPer] = usePersist('heat-per', 'Todos');
    const f = {
      Hoje: 0.12,
      '7 dias': 0.35,
      '30 dias': 1,
      Todos: 1.6
    }[per] || 1;
    const m = MS7.heat.map(function (r) {
      return r.map(function (v) {
        return Math.round(metric === 'lucro' ? v * f : v * f / 180);
      });
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(PeriodBar, {
      value: per,
      onChange: setPer
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: metric,
      onChange: setMetric,
      items: [{
        id: 'lucro',
        label: 'Lucro'
      }, {
        id: 'count',
        label: 'Quantidade'
      }],
      style: {
        width: 240
      }
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Heatmap de opera\xE7\xE3o"
    }, /*#__PURE__*/React.createElement(Hint, null, 'Melhores horários para operar — ' + (metric === 'lucro' ? 'lucro' : 'quantidade') + ' por dia da semana e hora (horário de Brasília)'), /*#__PURE__*/React.createElement(Heatmap, {
      matrix: m,
      metricLabel: metric === 'lucro' ? 'Lucro' : 'Quantidade',
      format: metric === 'lucro' ? MS7.brl : MS7.num
    })));
  }
  function ProjecaoScreen() {
    const {
      Card,
      LineChart
    } = DS;
    DB.useDB();
    const T = DB.today;
    const day = T.getDate();
    const total = new Date(T.getFullYear(), T.getMonth() + 1, 0).getDate();
    const daily = Array.from({
      length: day
    }).map(function (_, i) {
      const ds = DB.iso(new Date(T.getFullYear(), T.getMonth(), i + 1, 12));
      return DB.get().coops.filter(function (c) {
        return c.status !== 'Lixeira' && c.inicio === ds;
      }).reduce(function (a, c) {
        return a + DB.calc(c).lucro;
      }, 0);
    });
    let acc = 0;
    const real = daily.map(function (v) {
      acc += v;
      return acc;
    });
    const projected = day ? acc / day * total : 0;
    const labels = Array.from({
      length: total
    }).map(function (_, i) {
      return String(i + 1).padStart(2, '0') + '/' + String(T.getMonth() + 1).padStart(2, '0');
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'circle-dollar-sign',
        label: 'Lucro realizado no mês',
        value: MS7.brlK(acc),
        tone: 'green',
        signed: acc
      }, {
        icon: 'trending-up',
        label: 'Projeção do mês',
        value: MS7.brlK(projected),
        tone: 'blue',
        signed: projected
      }, {
        icon: 'calendar-days',
        label: 'Progresso do mês',
        value: day + ' / ' + total + ' dias',
        tone: 'orange'
      }]
    }), /*#__PURE__*/React.createElement(Card, {
      title: "Proje\xE7\xE3o de lucro l\xEDquido"
    }, /*#__PURE__*/React.createElement(LineChart, {
      height: 280,
      labels: labels,
      datasets: [{
        label: 'Realizado',
        values: real
      }, {
        label: 'Projeção',
        values: labels.map(function (_, i) {
          return Math.round(projected * (i + 1) / total);
        }),
        dashed: true,
        color: 'var(--ms7-lime-600)'
      }],
      format: MS7.brl
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '14px 0 0',
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--text-secondary)'
      }
    }, "Soma do lucro l\xEDquido das coopera\xE7\xF5es abertas em cada dia. A proje\xE7\xE3o segue o ritmo atual do m\xEAs.")));
  }
  function CustosScreen() {
    const {
      Card,
      Input,
      Select,
      Button,
      DataTable,
      Badge,
      IconButton
    } = DS;
    const db = DB.useDB();
    const C = MS7.custosCats;
    const [per, setPer] = usePersist('custos-per', '30 dias');
    const [f, setF] = React.useState({
      cat: 'proxy',
      valor: '',
      desc: ''
    });
    const rows = db.custos.filter(function (r) {
      return DB.inPeriod(r.data, per);
    });
    const catOf = function (id) {
      return C.find(function (c) {
        return c.id === id;
      }) || C[4];
    };
    const total = rows.reduce(function (a, r) {
      return a + r.valor;
    }, 0);
    const contas = DB.agg(DB.coopsFor({
      per: per
    })).n;
    const agg = C.map(function (c) {
      return {
        c: c,
        v: rows.filter(function (r) {
          return r.cat === c.id;
        }).reduce(function (a, r) {
          return a + r.valor;
        }, 0)
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
      DB.A.addCusto({
        comp: '09/2026',
        cat: f.cat,
        desc: f.desc || catOf(f.cat).label,
        valor: v
      });
      setF(Object.assign({}, f, {
        valor: '',
        desc: ''
      }));
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(PeriodBar, {
      value: per,
      onChange: setPer
    }), /*#__PURE__*/React.createElement(Card, {
      title: "Registrar custo"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))',
        gap: 16,
        alignItems: 'end'
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Categoria",
      value: f.cat,
      onChange: function (e) {
        setF(Object.assign({}, f, {
          cat: e.target.value
        }));
      },
      options: C.map(function (c) {
        return {
          value: c.id,
          label: c.label
        };
      })
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Valor",
      prefix: "R$",
      placeholder: "0,00",
      value: f.valor,
      onChange: function (e) {
        setF(Object.assign({}, f, {
          valor: e.target.value
        }));
      }
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Descri\xE7\xE3o",
      placeholder: "Ex.: Pacote de proxies",
      value: f.desc,
      onChange: function (e) {
        setF(Object.assign({}, f, {
          desc: e.target.value
        }));
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "brand",
      iconLeft: "plus",
      onClick: add
    }, "Registrar"))), /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'wallet',
        label: 'Custos de ferramentas',
        value: MS7.brlK(total),
        tone: 'black'
      }, {
        icon: 'users',
        label: 'Contas no período',
        value: contas,
        tone: 'blue'
      }, {
        icon: 'receipt',
        label: 'Ferramentas por conta',
        value: MS7.brl(contas ? total / contas : 0),
        tone: 'yellow'
      }, {
        icon: 'tag',
        label: 'Custo fixo por conta',
        value: MS7.brl(db.config.custoConta),
        tone: 'orange'
      }]
    }), /*#__PURE__*/React.createElement(Grid, {
      min: 340
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Custos por categoria"
    }, agg.length ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        height: 14,
        borderRadius: 7,
        overflow: 'hidden'
      }
    }, agg.map(function (a) {
      return /*#__PURE__*/React.createElement("span", {
        key: a.c.id,
        style: {
          width: a.v / total * 100 + '%',
          background: a.c.color
        }
      });
    })), agg.map(function (a) {
      return /*#__PURE__*/React.createElement("div", {
        key: a.c.id,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 14
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: a.c.color
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          fontWeight: 600
        }
      }, a.c.label), /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-secondary)',
          fontWeight: 600
        }
      }, Math.round(a.v / total * 100) + '%'), /*#__PURE__*/React.createElement("b", {
        style: {
          width: 110,
          textAlign: 'right'
        }
      }, MS7.brl(a.v)));
    })) : /*#__PURE__*/React.createElement(Empty, {
      icon: "wallet",
      title: "Nenhum custo no per\xEDodo"
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Registros",
      action: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "outline",
        iconLeft: "download",
        onClick: function () {
          exportCSV('custos', [{
            label: 'Data',
            get: function (r) {
              return r.data;
            }
          }, {
            label: 'Categoria',
            get: function (r) {
              return catOf(r.cat).label;
            }
          }, {
            label: 'Descrição',
            get: function (r) {
              return r.desc;
            }
          }, {
            label: 'Valor',
            get: function (r) {
              return r.valor;
            }
          }], rows);
        }
      }, "Exportar")
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: rows,
      columns: [{
        key: 'data',
        label: 'Data',
        render: function (r) {
          return DB.fmtDate(r.data);
        }
      }, {
        key: 'cat',
        label: 'Categoria',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Badge, {
            variant: "soft",
            size: "sm",
            tone: {
              proxy: 'green',
              servidor: 'blue',
              software: 'purple',
              bots: 'orange',
              outros: 'gray'
            }[r.cat]
          }, catOf(r.cat).label);
        }
      }, {
        key: 'desc',
        label: 'Descrição'
      }, {
        key: 'valor',
        label: 'Valor',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement("b", null, MS7.brl(r.valor));
        }
      }, {
        key: 'x',
        label: '',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement(IconButton, {
            icon: "trash-2",
            size: 30,
            iconSize: 16,
            onClick: function () {
              DB.A.removeCusto(r.id);
            }
          });
        }
      }]
    }))));
  }
  function FolhaScreen() {
    const {
      Card,
      DataTable,
      Badge,
      Button
    } = DS;
    const db = DB.useDB();
    const [per, setPer] = usePersist('folha-per', '30 dias');
    const rows = db.operadores.map(function (o) {
      const done = DB.coopsFor({
        opId: o.id,
        per: per
      }).filter(function (c) {
        return c.status === 'Concluída';
      });
      const g = DB.agg(done);
      const pago = db.pagamentos.filter(function (p) {
        return p.opId === o.id && DB.inPeriod(p.data, per);
      }).reduce(function (a, p) {
        return a + p.valor;
      }, 0);
      return {
        id: o.id,
        nome: o.nome,
        coops: done.length,
        res: g.res,
        com: g.com,
        pago: pago,
        saldo: Math.max(0, g.com - pago),
        tipos: done.map(function (c) {
          return c.comTipo;
        })
      };
    }).filter(function (r) {
      return r.coops || r.pago;
    });
    const s = function (k) {
      return rows.reduce(function (a, r) {
        return a + r[k];
      }, 0);
    };
    const weeks = [4, 3, 2, 1, 0].map(function (w) {
      const end = new Date(DB.today);
      end.setDate(end.getDate() - w * 7);
      const start = new Date(end);
      start.setDate(start.getDate() - 7);
      const inW = function (ds) {
        const d = new Date(ds + 'T12:00:00');
        return d > start && d <= end;
      };
      return {
        label: DB.fmtDate(DB.iso(end)),
        values: [Math.round(db.coops.filter(function (c) {
          return c.status === 'Concluída' && c.fim && inW(c.fim);
        }).reduce(function (a, c) {
          return a + DB.calc(c).com;
        }, 0)), Math.round(db.pagamentos.filter(function (p) {
          return inW(p.data);
        }).reduce(function (a, p) {
          return a + p.valor;
        }, 0))]
      };
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(PeriodBar, {
      value: per,
      onChange: setPer
    }), /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'banknote',
        label: 'Comissões geradas',
        value: MS7.brlK(s('com')),
        tone: 'blue'
      }, {
        icon: 'circle-check',
        label: 'Já pago',
        value: MS7.brlK(s('pago')),
        tone: 'green'
      }, {
        icon: 'clock',
        label: 'A pagar',
        value: MS7.brlK(s('saldo')),
        tone: 'yellow'
      }, {
        icon: 'briefcase',
        label: 'Coops concluídas',
        value: s('coops'),
        tone: 'orange'
      }]
    }), /*#__PURE__*/React.createElement(Card, {
      title: "Comiss\xE3o gerada \xD7 paga por semana"
    }, /*#__PURE__*/React.createElement(DS.BarChart, {
      height: 220,
      data: weeks,
      series: [{
        name: 'Gerada',
        color: 'var(--chart-1)'
      }, {
        name: 'Paga',
        color: 'var(--chart-2)'
      }]
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Pagamentos por operador",
      action: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "outline",
        iconLeft: "download",
        onClick: function () {
          exportCSV('folha-' + per.replace(' ', ''), [{
            label: 'Operador',
            get: function (r) {
              return r.nome;
            }
          }, {
            label: 'Coops concluídas',
            get: function (r) {
              return r.coops;
            }
          }, {
            label: 'Resultado',
            get: function (r) {
              return r.res;
            }
          }, {
            label: 'Comissão',
            get: function (r) {
              return r.com;
            }
          }, {
            label: 'Pago',
            get: function (r) {
              return r.pago;
            }
          }, {
            label: 'A pagar',
            get: function (r) {
              return r.saldo;
            }
          }], rows);
        }
      }, "Exportar")
    }, /*#__PURE__*/React.createElement(Hint, null, "Gerado automaticamente das coopera\xE7\xF5es conclu\xEDdas, com a comiss\xE3o de cada uma (% do resultado, por conta ou valor fixo)."), rows.length ? /*#__PURE__*/React.createElement(DataTable, {
      rows: rows,
      columns: [{
        key: 'nome',
        label: 'Operador',
        render: function (r) {
          return /*#__PURE__*/React.createElement("b", null, r.nome);
        }
      }, {
        key: 'coops',
        label: 'Coops',
        align: 'center'
      }, {
        key: 'res',
        label: 'Resultado',
        align: 'right',
        render: function (r) {
          return MS7.brl(r.res);
        }
      }, {
        key: 'com',
        label: 'Comissão',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement("b", null, MS7.brl(r.com));
        }
      }, {
        key: 'pago',
        label: 'Pago',
        align: 'right',
        render: function (r) {
          return MS7.brl(r.pago);
        }
      }, {
        key: 'st',
        label: 'Status',
        align: 'center',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Badge, {
            size: "sm",
            tone: r.saldo < 1 ? 'green' : 'yellow'
          }, r.saldo < 1 ? 'Pago' : 'Pendente');
        }
      }, {
        key: 'a',
        label: '',
        align: 'right',
        render: function (r) {
          return r.saldo < 1 ? null : /*#__PURE__*/React.createElement(Button, {
            size: "sm",
            variant: "brand",
            iconLeft: "check",
            onClick: function () {
              DB.A.pagar(r.id, Math.round(r.saldo * 100) / 100);
            }
          }, 'Pagar ' + MS7.brl(r.saldo));
        }
      }]
    }) : /*#__PURE__*/React.createElement(Empty, {
      icon: "banknote",
      title: "Nenhuma coopera\xE7\xE3o conclu\xEDda no per\xEDodo"
    })));
  }
  Object.assign(window, {
    HeatmapScreen: HeatmapScreen,
    ProjecaoScreen: ProjecaoScreen,
    CustosScreen: CustosScreen,
    FolhaScreen: FolhaScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operacoes/ScreensAnalises.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operacoes/ScreensConta.jsx
try { (() => {
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  function AlunosScreen() {
    const {
      Card,
      Tabs,
      BarChart,
      DataTable,
      Switch,
      IconButton,
      Button,
      Modal,
      Input,
      Avatar
    } = DS;
    const [tab, setTab] = React.useState('visao');
    const [rows, setRows] = React.useState(MS7.alunos);
    const [edit, setEdit] = React.useState(null);
    const [form, setForm] = React.useState({
      nome: '',
      email: ''
    });
    const rank = rows.slice().sort(function (a, b) {
      return b.resultado - a.resultado;
    });
    function openNew() {
      setForm({
        nome: '',
        email: ''
      });
      setEdit('new');
    }
    function save() {
      if (edit === 'new') setRows(rows.concat([{
        id: 'a' + Date.now(),
        nome: form.nome || 'Novo aluno',
        email: form.email,
        ativo: true,
        criado: '22/09/2026',
        resultado: 0,
        contas: 0
      }]));else setRows(rows.map(function (r) {
        return r.id === edit ? Object.assign({}, r, form) : r;
      }));
      setEdit(null);
      toast('Aluno salvo');
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      items: [{
        id: 'visao',
        label: 'Visão geral'
      }, {
        id: 'gestao',
        label: 'Gestão de alunos'
      }],
      style: {
        width: 360
      }
    }), /*#__PURE__*/React.createElement(Button, {
      iconLeft: "user-plus",
      onClick: openNew
    }, "Novo aluno")), tab === 'visao' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'users',
        label: 'Total depositantes',
        value: MS7.num(rows.reduce(function (a, r) {
          return a + r.contas * 9;
        }, 0)),
        tone: 'blue'
      }, {
        icon: 'trending-up',
        label: 'Resultado acumulado',
        value: MS7.brlK(rows.reduce(function (a, r) {
          return a + r.resultado;
        }, 0)),
        tone: 'green'
      }, {
        icon: 'trophy',
        label: 'Top do ranking',
        value: rank[0].nome.split(' ')[0],
        tone: 'orange',
        trend: MS7.brl(rank[0].resultado)
      }]
    }), /*#__PURE__*/React.createElement(Grid, {
      min: 320
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Top 10 alunos por resultado"
    }, /*#__PURE__*/React.createElement(BarChart, {
      height: 240,
      data: rank.slice(0, 10).map(function (r) {
        return {
          label: r.nome.split(' ')[0],
          values: [Math.round(r.resultado / 100) / 10]
        };
      }),
      series: [{
        name: 'Resultado (mil R$)',
        color: 'var(--chart-1)'
      }]
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Ranking resumido"
    }, /*#__PURE__*/React.createElement(RankList, {
      rows: rank,
      valueKey: "resultado"
    })))) : /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(DataTable, {
      rows: rows,
      columns: [{
        key: 'nome',
        label: 'Nome',
        render: function (r) {
          return /*#__PURE__*/React.createElement("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }
          }, /*#__PURE__*/React.createElement(Avatar, {
            name: r.nome,
            size: 32
          }), /*#__PURE__*/React.createElement("b", null, r.nome));
        }
      }, {
        key: 'email',
        label: 'Email'
      }, {
        key: 'ativo',
        label: 'Ativo',
        align: 'center',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Switch, {
            checked: r.ativo,
            onChange: function (v) {
              setRows(rows.map(function (x) {
                return x.id === r.id ? Object.assign({}, x, {
                  ativo: v
                }) : x;
              }));
            }
          });
        }
      }, {
        key: 'contas',
        label: 'Contas',
        align: 'center'
      }, {
        key: 'criado',
        label: 'Criado em'
      }, {
        key: 'a',
        label: '',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement("div", {
            style: {
              display: 'inline-flex',
              gap: 2
            }
          }, /*#__PURE__*/React.createElement(IconButton, {
            icon: "pencil",
            size: 30,
            iconSize: 16,
            onClick: function () {
              setForm({
                nome: r.nome,
                email: r.email
              });
              setEdit(r.id);
            }
          }), /*#__PURE__*/React.createElement(IconButton, {
            icon: "trash-2",
            size: 30,
            iconSize: 16,
            onClick: function () {
              setRows(rows.filter(function (x) {
                return x.id !== r.id;
              }));
            }
          }));
        }
      }]
    })), /*#__PURE__*/React.createElement(Modal, {
      open: !!edit,
      onClose: function () {
        setEdit(null);
      },
      title: edit === 'new' ? 'Novo aluno' : 'Editar aluno',
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: function () {
          setEdit(null);
        }
      }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
        variant: "brand",
        onClick: save
      }, "Salvar"))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Nome",
      required: true,
      value: form.nome,
      onChange: function (e) {
        setForm(Object.assign({}, form, {
          nome: e.target.value
        }));
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Email (login)",
      value: form.email,
      onChange: function (e) {
        setForm(Object.assign({}, form, {
          email: e.target.value
        }));
      }
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Senha",
      required: true,
      type: "password"
    })))));
  }
  function ProxiesScreen() {
    const {
      Card,
      Badge,
      Button,
      IconButton
    } = DS;
    const [list, setList] = React.useState(MS7.proxies);
    function renew(id) {
      setList(list.map(function (p) {
        return p.id === id ? Object.assign({}, p, {
          status: 'Ativa',
          expira: '22/10/2026',
          uso: 0
        }) : p;
      }));
      toast('Proxy renovada por 30 dias');
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'globe',
        label: 'Proxies ativas',
        value: list.filter(function (p) {
          return p.status === 'Ativa';
        }).length,
        tone: 'green'
      }, {
        icon: 'clock',
        label: 'Expirando em 7 dias',
        value: list.filter(function (p) {
          return p.status === 'Expirando';
        }).length,
        tone: 'yellow'
      }, {
        icon: 'circle-alert',
        label: 'Expiradas',
        value: list.filter(function (p) {
          return p.status === 'Expirada';
        }).length,
        tone: 'orange'
      }]
    }), /*#__PURE__*/React.createElement(Card, {
      title: "Minhas proxies"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, list.map(function (p) {
      const conn = p.host + ':' + p.port + ':' + p.login;
      return /*#__PURE__*/React.createElement("div", {
        key: p.id,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: 14,
          border: '1px solid var(--border-subtle)',
          borderRadius: 12,
          flexWrap: 'wrap'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 10,
          background: 'var(--ms7-gray-100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: "globe",
        size: 20
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: '1 1 200px',
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("b", {
        style: {
          fontSize: 15
        }
      }, p.label), /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        tone: p.status === 'Ativa' ? 'green' : MS7.statusTone[p.status]
      }, p.status)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--text-secondary)'
        }
      }, 'Expira em ' + p.expira)), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: '1 1 260px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'var(--ms7-gray-50)',
          borderRadius: 8,
          padding: '6px 6px 6px 12px',
          fontFamily: 'ui-monospace,monospace',
          fontSize: 12
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, conn), /*#__PURE__*/React.createElement(IconButton, {
        icon: "copy",
        size: 28,
        iconSize: 14,
        label: "Copiar conex\xE3o",
        onClick: function () {
          toast('Conexão copiada');
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          width: 130
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          fontWeight: 700
        }
      }, /*#__PURE__*/React.createElement("span", null, "Tr\xE1fego"), /*#__PURE__*/React.createElement("span", null, p.uso + '%')), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 6,
          borderRadius: 3,
          background: 'var(--ms7-gray-100)',
          marginTop: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: p.uso + '%',
          height: '100%',
          borderRadius: 3,
          background: p.uso > 85 ? 'var(--ms7-orange)' : 'var(--ms7-green)'
        }
      }))), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: p.status === 'Ativa' ? 'outline' : 'brand',
        iconLeft: "refresh-cw",
        onClick: function () {
          renew(p.id);
        }
      }, "Renovar"));
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "Comprar proxies"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
        gap: 14
      }
    }, MS7.proxyProdutos.map(function (p, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: p.id,
        style: {
          border: i === 1 ? '2px solid var(--ms7-lime-600)' : '1px solid var(--border-subtle)',
          borderRadius: 14,
          padding: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between'
        }
      }, /*#__PURE__*/React.createElement("b", {
        style: {
          fontSize: 16
        }
      }, p.nome), i === 1 ? /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        tone: "black"
      }, "Mais vendido") : null), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text-secondary)'
        }
      }, p.desc), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 24,
          fontWeight: 800
        }
      }, MS7.brl(p.preco)), /*#__PURE__*/React.createElement(Button, {
        fullWidth: true,
        iconLeft: "qr-code",
        variant: i === 1 ? 'primary' : 'outline',
        onClick: function () {
          toast('PIX gerado para ' + p.nome);
        }
      }, "Comprar via PIX"));
    }))));
  }
  function AssinaturaScreen({
    role
  }) {
    const {
      Card,
      Tabs,
      Button,
      Badge,
      DataTable,
      Modal
    } = DS;
    const [tab, setTab] = React.useState('minha');
    const [plan, setPlan] = React.useState('pro');
    const [chg, setChg] = React.useState(false);
    const [q, setQ] = React.useState('Todos');
    const P = MS7.planos.find(function (p) {
      return p.id === plan;
    });
    const used = 6;
    const T = MS7.tenants;
    const tenants = T.filter(function (t) {
      return q === 'Todos' || t.status === q;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }
    }, role === 'super' ? /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      items: [{
        id: 'minha',
        label: 'Minha assinatura'
      }, {
        id: 'todas',
        label: 'Todas as assinaturas'
      }],
      style: {
        maxWidth: 440
      }
    }) : null, tab === 'minha' || role !== 'super' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'users',
        label: 'Operadores ativos',
        value: used + ' / ' + P.seats,
        tone: 'blue'
      }, {
        icon: 'calendar-days',
        label: 'Próximo billing',
        value: '05/10/2026',
        tone: 'yellow'
      }, {
        icon: 'credit-card',
        label: 'Valor mensal',
        value: MS7.brl(P.preco),
        tone: 'green'
      }, {
        icon: 'receipt-text',
        label: 'Cobrança projetada',
        value: MS7.brl(P.preco),
        tone: 'orange'
      }]
    }), /*#__PURE__*/React.createElement(Card, {
      dark: true,
      title: "Plano atual",
      action: /*#__PURE__*/React.createElement(Button, {
        variant: "lime",
        size: "sm",
        iconLeft: "arrow-up-down",
        onClick: function () {
          setChg(true);
        }
      }, "Mudar de plano")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 24,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        fontWeight: 800,
        color: 'var(--ms7-lime-500)',
        lineHeight: 1
      }
    }, P.nome), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 500,
        marginTop: 6
      }
    }, P.seats + ' seats de operador · renovação mensal')), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: '1 1 260px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", null, 'Uso de seats — ' + P.nome), /*#__PURE__*/React.createElement("span", null, used + '/' + P.seats)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 10,
        borderRadius: 5,
        background: 'rgba(255,255,255,.15)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: Math.min(100, used / P.seats * 100) + '%',
        height: '100%',
        borderRadius: 5,
        background: 'var(--ms7-lime-500)'
      }
    }))))), /*#__PURE__*/React.createElement(Card, {
      title: "Pague seu plano via PIX"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 132,
        height: 132,
        borderRadius: 12,
        background: 'var(--ms7-gray-100)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--ms7-gray-500)'
      }
    }, /*#__PURE__*/React.createElement(DS.Icon, {
      name: "qr-code",
      size: 56,
      strokeWidth: 1.2
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        minWidth: 240
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 500
      }
    }, "Escaneie o QR Code ou copie o c\xF3digo PIX. A confirma\xE7\xE3o \xE9 autom\xE1tica em poucos segundos."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      iconLeft: "copy",
      onClick: function () {
        toast('Código PIX copiado');
      }
    }, "Copiar c\xF3digo PIX"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      iconLeft: "receipt-text"
    }, "Ver faturas")))))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'layers',
        label: 'Total',
        value: T.length,
        tone: 'blue'
      }, {
        icon: 'circle-check',
        label: 'Ativas',
        value: T.filter(function (t) {
          return t.status === 'Ativa';
        }).length,
        tone: 'green'
      }, {
        icon: 'clock',
        label: 'Em atraso',
        value: T.filter(function (t) {
          return t.status === 'Em atraso';
        }).length,
        tone: 'yellow'
      }, {
        icon: 'circle-x',
        label: 'Canceladas',
        value: T.filter(function (t) {
          return t.status === 'Cancelada';
        }).length,
        tone: 'orange'
      }]
    }), /*#__PURE__*/React.createElement(Card, {
      title: "Assinaturas",
      action: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 10
        }
      }, /*#__PURE__*/React.createElement(DS.Select, {
        variant: "pill",
        value: q,
        onChange: function (e) {
          setQ(e.target.value);
        },
        options: ['Todos', 'Ativa', 'Em atraso', 'Cancelada', 'Suspensa', 'Cortesia']
      }), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        iconLeft: "plus",
        onClick: function () {
          toast('Tenant criado');
        }
      }, "Novo tenant"))
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: tenants,
      columns: [{
        key: 'tenant',
        label: 'Tenant',
        render: function (r) {
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, r.tenant), /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 12,
              color: 'var(--text-secondary)'
            }
          }, r.owner));
        }
      }, {
        key: 'status',
        label: 'Status',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Badge, {
            size: "sm",
            tone: MS7.statusTone[r.status]
          }, r.status);
        }
      }, {
        key: 'plano',
        label: 'Plano'
      }, {
        key: 'uso',
        label: 'Uso',
        align: 'right'
      }, {
        key: 'cobranca',
        label: 'Cobrança',
        align: 'right'
      }, {
        key: 'proximo',
        label: 'Próx. cobrança',
        align: 'right'
      }, {
        key: 'a',
        label: '',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement(DS.IconButton, {
            icon: "ellipsis",
            size: 30,
            iconSize: 16
          });
        }
      }]
    }))), /*#__PURE__*/React.createElement(Modal, {
      open: chg,
      onClose: function () {
        setChg(false);
      },
      title: "Mudar de plano"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, MS7.planos.map(function (p) {
      const on = p.id === plan;
      return /*#__PURE__*/React.createElement("div", {
        key: p.id,
        onClick: function () {
          setPlan(p.id);
          setChg(false);
          toast('Plano alterado para ' + p.nome);
        },
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: 14,
          borderRadius: 12,
          cursor: 'pointer',
          border: on ? '2px solid var(--ms7-green-900)' : '1px solid var(--border-default)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("b", {
        style: {
          fontSize: 16
        }
      }, p.nome), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: 'var(--text-secondary)',
          fontWeight: 500
        }
      }, p.seats + ' seats')), /*#__PURE__*/React.createElement("b", null, MS7.brl(p.preco) + '/mês'), on ? /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        tone: "green"
      }, "Atual") : null);
    }))));
  }
  function AppNotifCard() {
    const {
      Card,
      Button,
      Badge,
      Switch
    } = DS;
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
      (perm === 'granted' ? Promise.resolve('granted') : P.ask()).then(function (p) {
        setPerm(p);
        if (p !== 'granted') throw new Error('Permissão negada');
        return P.subscribe(localStorage.getItem('ms7op-role') || 'admin');
      }).then(function () {
        setRemote(true);
        toast('Celular conectado ao servidor');
      }).catch(function (e) {
        toast('Não foi possível ativar: ' + e.message);
      }).then(function () {
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
      unsupported: ['gray', 'Não suportado']
    }[perm];
    function step(n, title, body, right) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 14,
          alignItems: 'flex-start',
          padding: '14px 0',
          borderTop: n > 1 ? '1px solid var(--border-subtle)' : 'none'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 28,
          height: 28,
          borderRadius: 8,
          background: 'var(--ms7-lime-500)',
          color: 'var(--ms7-green-900)',
          fontWeight: 800,
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }
      }, n), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("b", {
        style: {
          fontSize: 15
        }
      }, title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text-secondary)',
          marginTop: 3,
          lineHeight: 1.45
        }
      }, body)), right);
    }
    return /*#__PURE__*/React.createElement(Card, {
      title: "Instalar como app e receber notifica\xE7\xF5es"
    }, /*#__PURE__*/React.createElement(Hint, null, "Instale o painel no celular ou no computador. Ele abre como um app e mostra as notifica\xE7\xF5es do sistema: in\xEDcio de meta, conta bloqueada e ciclo fechado com lucro ou preju\xEDzo."), step(1, 'Instalar o app', standalone ? 'O painel já está aberto como app.' : ios ? 'No iPhone: abra no Safari, toque em Compartilhar e depois em "Adicionar à Tela de Início". Depois abra pelo ícone MS7.' : 'No Chrome/Edge: clique no botão ao lado ou no ícone de instalar na barra de endereço. No Android: menu ⋮ → "Instalar app".', standalone ? /*#__PURE__*/React.createElement(Badge, {
      tone: "green",
      size: "sm"
    }, "Instalado") : /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "brand",
      iconLeft: "download",
      disabled: !inst,
      onClick: function () {
        P.install().then(function (ok) {
          if (ok) toast('App instalado');
        });
      }
    }, "Instalar")), step(2, 'Permitir notificações', perm === 'denied' ? 'As notificações foram bloqueadas. Libere nas configurações do site (ícone de cadeado na barra de endereço).' : 'O celular vai pedir permissão. Toque em "Permitir".', /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: permBadge[0],
      size: "sm"
    }, permBadge[1]), perm === 'default' ? /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      iconLeft: "bell",
      onClick: function () {
        P.ask().then(function (p) {
          setPerm(p);
          if (p === 'granted') toast('Notificações ativadas');
        });
      }
    }, "Ativar") : null)), step(3, 'Conectar ao servidor', 'Endereço onde o novo dashboard está publicado (https). Todos os celulares conectados recebem o que os operadores fazem, mesmo com o app fechado.', /*#__PURE__*/React.createElement(Badge, {
      tone: remote ? 'green' : 'gray',
      size: "sm"
    }, remote ? 'Conectado' : 'Desconectado')), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) auto',
        gap: 12,
        alignItems: 'end',
        padding: '0 0 14px 42px'
      }
    }, /*#__PURE__*/React.createElement(DS.Input, {
      label: "Servidor",
      icon: "server",
      placeholder: "https://painel.seudominio.com",
      value: srv,
      onChange: function (e) {
        setSrv(e.target.value);
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "brand",
      iconLeft: "smartphone",
      disabled: busy || !srv,
      onClick: ativar
    }, busy ? 'Conectando…' : remote ? 'Reconectar' : 'Ativar no celular')), step(4, 'Testar', remote ? 'Envia uma notificação de ciclo fechado para todos os celulares conectados.' : 'Envia uma notificação de ciclo fechado para este aparelho.', /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline",
      iconLeft: "send",
      disabled: perm !== 'granted',
      onClick: function () {
        const t = 'Ciclo fechado · Vértice',
          b = 'Depósito R$ 12.400 · Saque R$ 15.980 · LUCRO de R$ 3.580';
        if (!P.remote(t, b, 'teste')) P.show(t, b, 'teste');
        toast('Notificação de teste enviada');
      }
    }, "Enviar teste")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        paddingTop: 14,
        borderTop: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement(Switch, {
      checked: dev,
      onChange: function (v) {
        setDev(v);
        setPref('__device', v);
      },
      label: "Mostrar notifica\xE7\xF5es neste aparelho"
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '14px 0 0',
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--text-secondary)',
        lineHeight: 1.5
      }
    }, "Sem servidor conectado, s\xF3 este aparelho mostra as notifica\xE7\xF5es. O servidor fica em ui_kits/operacoes/server (veja o README)."));
  }
  function SyncCard({
    session
  }) {
    const {
      Card,
      Button,
      Badge
    } = DS;
    DB.useDB();
    const S = DB.Sync;
    const [busy, setBusy] = React.useState(false);
    const B = {
      online: ['green', 'Conectado · tempo real'],
      syncing: ['blue', 'Sincronizando…'],
      offline: ['yellow', 'Sem conexão · salvando no aparelho'],
      local: ['gray', 'Só neste aparelho']
    }[S.status] || ['gray', '—'];
    const u = S.user();
    const real = session && session.real;
    function go(mode) {
      setBusy(true);
      S.connect(mode).then(function () {
        toast(mode === 'upload' ? 'Dados deste aparelho enviados ao servidor' : 'Sincronizado');
      }).catch(function (e) {
        toast('Não foi possível sincronizar: ' + e.message);
      }).then(function () {
        setBusy(false);
      });
    }
    return /*#__PURE__*/React.createElement(Card, {
      title: "Banco de dados central",
      action: /*#__PURE__*/React.createElement(Badge, {
        tone: B[0],
        size: "sm"
      }, B[1])
    }, real ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hint, null, 'Conectado como ' + (u ? u.email : '') + ' em ' + S.base() + '. ' + (session.role === 'operador' ? 'Você vê e edita só as suas cooperações.' : 'Tudo o que os operadores preenchem aparece aqui na hora.')), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      iconLeft: "refresh-cw",
      disabled: busy,
      onClick: function () {
        go();
      }
    }, "Sincronizar agora"), session.role !== 'operador' ? /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      iconLeft: "upload",
      disabled: busy,
      onClick: function () {
        if (confirm('Enviar os dados deste aparelho para o servidor? Os dados se juntam aos que já estão lá.')) go('upload');
      }
    }, "Enviar dados deste aparelho") : null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconLeft: "log-out",
      onClick: function () {
        S.logout();
      }
    }, "Sair"))) : /*#__PURE__*/React.createElement(Hint, null, "Voc\xEA est\xE1 no modo demonstra\xE7\xE3o. Para usar o banco central, saia e entre com email e senha na tela de login."));
  }
  const ROLE_LABEL = {
    super: 'Super Admin',
    admin: 'Admin',
    operador: 'Operador'
  };
  function AcessosCard({
    session
  }) {
    const {
      Card,
      Button,
      Badge,
      Input,
      Select,
      DataTable,
      Modal,
      Switch,
      IconButton
    } = DS;
    const db = DB.useDB();
    const S = DB.Sync;
    const [list, setList] = React.useState(null);
    const [err, setErr] = React.useState('');
    const [edit, setEdit] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    function load() {
      S.api('/api/users').then(setList).catch(function (e) {
        setErr(e.message);
      });
    }
    React.useEffect(function () {
      if (session.real) load();
    }, []);
    if (!session.real) return /*#__PURE__*/React.createElement(Card, {
      title: "Acessos"
    }, /*#__PURE__*/React.createElement(Hint, null, "Entre com email e senha num servidor para criar logins dos operadores. No modo demonstra\xE7\xE3o os acessos n\xE3o s\xE3o reais."));
    const ops = db.operadores;
    function save() {
      setBusy(true);
      S.api('/api/users', {
        method: 'POST',
        body: JSON.stringify(edit)
      }).then(function () {
        setEdit(null);
        load();
        toast('Acesso salvo');
      }).catch(function (e) {
        toast(e.message);
      }).then(function () {
        setBusy(false);
      });
    }
    function del(u) {
      if (!confirm('Remover o acesso de ' + u.email + '?')) return;
      S.api('/api/users/' + u.id, {
        method: 'DELETE'
      }).then(function () {
        load();
        toast('Acesso removido');
      }).catch(function (e) {
        toast(e.message);
      });
    }
    const roleOpts = [{
      value: 'operador',
      label: 'Operador — acesso limitado'
    }, {
      value: 'admin',
      label: 'Admin — acesso total'
    }].concat(session.role === 'super' ? [{
      value: 'super',
      label: 'Super Admin'
    }] : []);
    return /*#__PURE__*/React.createElement(Card, {
      title: "Acessos",
      action: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        iconLeft: "user-plus",
        onClick: function () {
          setEdit({
            email: '',
            name: '',
            role: 'operador',
            opId: ops[0] ? ops[0].id : '',
            password: '',
            ativo: true
          });
        }
      }, "Novo acesso")
    }, /*#__PURE__*/React.createElement(Hint, null, "Cada pessoa entra com o pr\xF3prio email e senha. O servidor controla o que cada uma pode ver e alterar."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
        gap: 12,
        marginBottom: 18
      }
    }, [['shield-check', 'Admin / Super Admin', 'Vê e altera tudo: todas as cooperações, operadores, custos, pagamentos, configurações e acessos.'], ['user', 'Operador', 'Vê só as próprias cooperações e comissões. Pode preencher contas, iniciar e fechar ciclos. Não vê outros operadores, custos, lucro da operação nem configurações, e não muda a própria comissão.']].map(function (r) {
      return /*#__PURE__*/React.createElement("div", {
        key: r[1],
        style: {
          display: 'flex',
          gap: 10,
          padding: 14,
          borderRadius: 12,
          background: 'var(--ms7-gray-50)'
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: r[0],
        size: 18
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
        style: {
          fontSize: 14
        }
      }, r[1]), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--text-secondary)',
          lineHeight: 1.45,
          marginTop: 2
        }
      }, r[2])));
    })), err ? /*#__PURE__*/React.createElement(Hint, null, err) : !list ? /*#__PURE__*/React.createElement(Hint, null, "Carregando\u2026") : /*#__PURE__*/React.createElement(DataTable, {
      rows: list,
      columns: [{
        key: 'name',
        label: 'Nome',
        render: function (r) {
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, r.name), /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 12,
              color: 'var(--text-secondary)'
            }
          }, r.email));
        }
      }, {
        key: 'role',
        label: 'Papel',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Badge, {
            size: "sm",
            tone: r.role === 'operador' ? 'blue' : 'green'
          }, ROLE_LABEL[r.role]);
        }
      }, {
        key: 'opId',
        label: 'Operador vinculado',
        render: function (r) {
          return r.opId ? DB.opName(r.opId) : '—';
        }
      }, {
        key: 'ativo',
        label: 'Status',
        align: 'center',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Badge, {
            size: "sm",
            variant: "soft",
            tone: r.ativo ? 'green' : 'gray'
          }, r.ativo ? 'Ativo' : 'Bloqueado');
        }
      }, {
        key: 'a',
        label: '',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement("div", {
            style: {
              display: 'inline-flex',
              gap: 2
            }
          }, /*#__PURE__*/React.createElement(IconButton, {
            icon: "pencil",
            size: 30,
            iconSize: 16,
            onClick: function () {
              setEdit(Object.assign({}, r, {
                password: ''
              }));
            }
          }), r.email !== (S.user() || {}).email ? /*#__PURE__*/React.createElement(IconButton, {
            icon: "trash-2",
            size: 30,
            iconSize: 16,
            onClick: function () {
              del(r);
            }
          }) : null);
        }
      }]
    }), /*#__PURE__*/React.createElement(Modal, {
      open: !!edit,
      onClose: function () {
        setEdit(null);
      },
      title: edit && edit.id ? 'Editar acesso' : 'Novo acesso',
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: function () {
          setEdit(null);
        }
      }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
        variant: "brand",
        disabled: busy,
        onClick: save
      }, "Salvar"))
    }, edit ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Nome",
      value: edit.name,
      onChange: function (e) {
        setEdit(Object.assign({}, edit, {
          name: e.target.value
        }));
      }
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Email (login)",
      required: true,
      value: edit.email,
      onChange: function (e) {
        setEdit(Object.assign({}, edit, {
          email: e.target.value
        }));
      }
    })), /*#__PURE__*/React.createElement(Select, {
      label: "Papel",
      value: edit.role,
      onChange: function (e) {
        setEdit(Object.assign({}, edit, {
          role: e.target.value
        }));
      },
      options: roleOpts
    }), edit.role === 'operador' ? /*#__PURE__*/React.createElement(Select, {
      label: "Operador vinculado",
      required: true,
      value: edit.opId || '',
      onChange: function (e) {
        setEdit(Object.assign({}, edit, {
          opId: e.target.value
        }));
      },
      options: ops.map(function (o) {
        return {
          value: o.id,
          label: o.nome
        };
      }),
      hint: "O acesso s\xF3 enxerga as coopera\xE7\xF5es deste operador."
    }) : null, /*#__PURE__*/React.createElement(Input, {
      label: edit.id ? 'Nova senha (deixe em branco para manter)' : 'Senha',
      type: "password",
      value: edit.password,
      onChange: function (e) {
        setEdit(Object.assign({}, edit, {
          password: e.target.value
        }));
      },
      hint: "M\xEDnimo de 8 caracteres"
    }), /*#__PURE__*/React.createElement(Switch, {
      checked: edit.ativo,
      onChange: function (v) {
        setEdit(Object.assign({}, edit, {
          ativo: v
        }));
      },
      label: "Acesso ativo"
    })) : null));
  }
  function SenhaCard({
    session
  }) {
    const {
      Card,
      Input,
      Button
    } = DS;
    const [c, setC] = React.useState('');
    const [n, setN] = React.useState('');
    if (!session || !session.real) return null;
    return /*#__PURE__*/React.createElement(Card, {
      title: "Alterar senha"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
        gap: 14,
        alignItems: 'end'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Senha atual",
      type: "password",
      value: c,
      onChange: function (e) {
        setC(e.target.value);
      }
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Nova senha",
      type: "password",
      value: n,
      onChange: function (e) {
        setN(e.target.value);
      },
      hint: "M\xEDnimo de 8 caracteres"
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "brand",
      disabled: !c || n.length < 8,
      onClick: function () {
        DB.Sync.api('/api/auth/password', {
          method: 'POST',
          body: JSON.stringify({
            current: c,
            next: n
          })
        }).then(function () {
          setC('');
          setN('');
          toast('Senha alterada');
        }).catch(function (e) {
          toast(e.message);
        });
      }
    }, "Alterar senha")));
  }
  function ConfigScreen({
    session,
    role
  }) {
    const {
      Card,
      Tabs,
      Input,
      Button,
      Switch,
      Checkbox
    } = DS;
    const [, rt] = React.useState(0);
    const isOp = role === 'operador';
    const TABS = isOp ? [{
      id: 'app',
      label: 'Notificações'
    }, {
      id: 'conta',
      label: 'Minha conta'
    }] : [{
      id: 'marca',
      label: 'Marca'
    }, {
      id: 'acessos',
      label: 'Acessos'
    }, {
      id: 'app',
      label: 'Notificações'
    }, {
      id: 'telegram',
      label: 'Telegram'
    }, {
      id: 'conta',
      label: 'Minha conta'
    }];
    const [tab0, setTab] = React.useState(isOp ? 'app' : 'marca');
    const tab = TABS.some(function (t) {
      return t.id === tab0;
    }) ? tab0 : TABS[0].id;
    const [cor, setCor] = React.useState('#005D3B');
    const cores = ['#005D3B', '#242424', '#2D77C1', '#9B31C8', '#FF7F08'];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth: 1000
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      items: TABS,
      style: {
        maxWidth: isOp ? 340 : 680
      }
    }), tab === 'acessos' ? /*#__PURE__*/React.createElement(AcessosCard, {
      session: session
    }) : null, tab === 'marca' ? /*#__PURE__*/React.createElement(Card, {
      title: "Identidade do painel"
    }, /*#__PURE__*/React.createElement(Hint, null, "Cores, nome e logo usados em todas as \xE1reas do sistema."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Nome do painel",
      defaultValue: "MS7 Dashboards"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Custo por conta (proxy + chip)",
      prefix: "R$",
      type: "number",
      defaultValue: String(DB.get().config.custoConta),
      onChange: function (e) {
        const v = parseFloat(e.target.value);
        if (v >= 0) DB.A.setConfig('custoConta', v);
      },
      hint: "Usado no lucro l\xEDquido, ROI e custo por conta."
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600
      }
    }, "Cor principal"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, cores.map(function (c) {
      return /*#__PURE__*/React.createElement("span", {
        key: c,
        onClick: function () {
          setCor(c);
        },
        style: {
          width: 34,
          height: 34,
          borderRadius: 10,
          background: c,
          cursor: 'pointer',
          outline: cor === c ? '2px solid var(--ms7-black)' : 'none',
          outlineOffset: 2
        }
      });
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 72,
        height: 72,
        borderRadius: 14,
        background: cor,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: 22
      }
    }, "MS7"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      iconLeft: "upload"
    }, "Enviar logo"))) : null, tab === 'app' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SyncCard, {
      session: session
    }), /*#__PURE__*/React.createElement(AppNotifCard, null)) : null, tab === 'telegram' ? /*#__PURE__*/React.createElement(Card, {
      title: "Telegram"
    }, /*#__PURE__*/React.createElement(Hint, null, "Receba no Telegram as contas importadas e os demais avisos do painel."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Token do bot",
      type: "password",
      defaultValue: "7382910:AAH-exemplo"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
        gap: '14px 32px'
      }
    }, Object.keys(NTYPES).map(function (t) {
      return /*#__PURE__*/React.createElement(Switch, {
        key: t,
        defaultChecked: getPrefs()[t],
        onChange: function (v) {
          setPref(t, v);
        },
        label: NTYPES[t].label
      });
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "brand",
      iconLeft: "link",
      onClick: function () {
        toast('Bot vinculado');
      }
    }, "Vincular bot"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      iconLeft: "send",
      onClick: function () {
        notify({
          type: 'ciclo',
          title: 'Teste — MS7 Bot',
          body: 'Se você recebeu esta mensagem, o Telegram está conectado.'
        });
      }
    }, "Enviar teste")))) : null, tab === 'conta' ? /*#__PURE__*/React.createElement(SenhaCard, {
      session: session
    }) : null, tab === 'conta' ? /*#__PURE__*/React.createElement(Card, {
      title: "Minha conta"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Nome",
      defaultValue: "Marcelo"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "E-mail",
      defaultValue: "marcelo@ms7.com"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Senha atual",
      type: "password"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Nova senha",
      type: "password",
      hint: "M\xEDnimo de 8 caracteres"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Switch, {
      checked: window.ms7Theme === 'dark',
      onChange: function (v) {
        window.ms7SetTheme(v ? 'dark' : 'light');
      },
      label: "Modo escuro"
    }))) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary"
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      variant: "brand",
      iconLeft: "check",
      onClick: function () {
        toast('Configurações salvas');
      }
    }, "Salvar altera\xE7\xF5es")));
  }
  Object.assign(window, {
    AlunosScreen: AlunosScreen,
    ProxiesScreen: ProxiesScreen,
    AssinaturaScreen: AssinaturaScreen,
    ConfigScreen: ConfigScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operacoes/ScreensConta.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operacoes/ScreensCoop.jsx
try { (() => {
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const CONTA_ST = ['Aguardando', 'À sacar', 'Sacado', 'Não sacado', 'Bloqueado'];
  function CoopCard({
    c,
    onOpen,
    canAdmin
  }) {
    const {
      Badge,
      IconButton
    } = DS;
    const k = DB.calc(c);
    const acts = c.status === 'Concluída' ? [['rotate-ccw', 'Reabrir', 'Em andamento']] : c.status === 'Lixeira' ? [['undo-2', 'Restaurar', 'Ativa']] : c.status === 'Ativa' ? [['play', 'Iniciar', 'Em andamento']] : [['circle-check', 'Finalizar', 'Concluída']];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        opacity: c.status === 'Lixeira' ? 0.6 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        cursor: 'pointer'
      },
      onClick: onOpen
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--text-secondary)'
      }
    }, c.id + ' · ' + DB.fmtDate(c.inicio) + (c.ciclos ? ' · ' + c.ciclos + ' ciclo(s)' : '')), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        fontWeight: 700
      }
    }, c.cliente), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-secondary)'
      }
    }, c.plataforma + ' · ' + c.rede + ' · ' + DB.opName(c.opId))), /*#__PURE__*/React.createElement(Badge, {
      tone: MS7.statusTone[c.status],
      size: "sm"
    }, c.status)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 10
      }
    }, [['Depósito', k.dep + k.red], ['Saque', k.saq], [k.lucro >= 0 ? 'Lucro líq.' : 'Prejuízo', k.lucro]].map(function (x, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: x[0]
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--text-secondary)'
        }
      }, x[0]), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: i === 2 ? x[1] >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)' : 'inherit'
        }
      }, MS7.brl(x[1])));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "soft",
      tone: "blue",
      size: "sm"
    }, k.n + ' contas'), k.bloq ? /*#__PURE__*/React.createElement(Badge, {
      variant: "soft",
      tone: "error",
      size: "sm"
    }, k.bloq + ' bloqueada(s)') : null, /*#__PURE__*/React.createElement(Badge, {
      variant: "soft",
      tone: "purple",
      size: "sm"
    }, DB.comText(c))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4,
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 10,
        alignItems: 'center'
      }
    }, acts.map(function (a) {
      return /*#__PURE__*/React.createElement(DS.Button, {
        key: a[1],
        size: "sm",
        variant: a[2] === 'Concluída' ? 'brand' : 'secondary',
        iconLeft: a[0],
        onClick: function () {
          DB.A.setStatus(c.id, a[2]);
        }
      }, a[1]);
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), canAdmin && c.status !== 'Lixeira' ? /*#__PURE__*/React.createElement(IconButton, {
      icon: "trash-2",
      label: "Mover para lixeira",
      size: 32,
      iconSize: 16,
      onClick: function () {
        DB.A.setStatus(c.id, 'Lixeira');
      }
    }) : null, /*#__PURE__*/React.createElement(IconButton, {
      icon: "arrow-right",
      variant: "dark",
      label: "Abrir",
      size: 32,
      iconSize: 16,
      onClick: onOpen
    })));
  }
  function CoopWizard({
    open,
    onClose,
    session
  }) {
    const {
      Modal,
      Stepper,
      Select,
      Input,
      Button,
      Tabs
    } = DS;
    const db = DB.get();
    const [step, setStep] = React.useState(1);
    const init = function () {
      return {
        opId: session.role === 'operador' ? session.opId : db.operadores[0].id,
        comTipo: 'pct',
        comValor: '15',
        plataforma: MS7.plataformas[0].nome,
        rede: MS7.redes[0].nome,
        qtd: '20',
        cliente: ''
      };
    };
    const [f, setF] = React.useState(init);
    const u = function (k) {
      return function (e) {
        const v = e && e.target ? e.target.value : e;
        setF(function (p) {
          const n = Object.assign({}, p);
          n[k] = v;
          if (k === 'comTipo') n.comValor = {
            pct: '15',
            conta: '25',
            fixo: '900'
          }[v];
          return n;
        });
      };
    };
    function close() {
      setStep(1);
      setF(init());
      onClose();
    }
    const prev = f.comTipo === 'pct' ? 'Ex.: resultado de R$ 4.000 → comissão de ' + MS7.brl(4000 * (parseFloat(f.comValor) || 0) / 100) : f.comTipo === 'conta' ? 'Ex.: 10 contas → comissão de ' + MS7.brl(10 * (parseFloat(f.comValor) || 0)) : 'Comissão fixa de ' + MS7.brl(parseFloat(f.comValor) || 0) + ' por cooperação';
    return /*#__PURE__*/React.createElement(Modal, {
      open: open,
      onClose: close,
      title: "Nova coopera\xE7\xE3o",
      size: "md",
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        iconLeft: "chevron-left",
        onClick: function () {
          step === 1 ? close() : setStep(step - 1);
        }
      }, step === 1 ? 'Cancelar' : 'Voltar'), step < 3 ? /*#__PURE__*/React.createElement(Button, {
        iconRight: "chevron-right",
        onClick: function () {
          setStep(step + 1);
        }
      }, "Pr\xF3xima etapa") : /*#__PURE__*/React.createElement(Button, {
        variant: "brand",
        iconLeft: "check",
        onClick: function () {
          DB.A.createCoop(f);
          close();
        }
      }, "Criar coopera\xE7\xE3o"))
    }, /*#__PURE__*/React.createElement(Stepper, {
      steps: 3,
      current: step
    }), /*#__PURE__*/React.createElement("h4", {
      style: {
        margin: '18px 0 14px',
        fontSize: 18,
        fontWeight: 700
      }
    }, ['Comissão', 'Informações', 'Revisão'][step - 1]), step === 1 ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, session.role !== 'operador' ? /*#__PURE__*/React.createElement(Select, {
      label: "Operador",
      required: true,
      value: f.opId,
      onChange: u('opId'),
      options: db.operadores.filter(function (o) {
        return o.ativo;
      }).map(function (o) {
        return {
          value: o.id,
          label: o.nome
        };
      })
    }) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600
      }
    }, "Tipo de comiss\xE3o"), /*#__PURE__*/React.createElement(Tabs, {
      value: f.comTipo,
      onChange: u('comTipo'),
      items: [{
        id: 'pct',
        label: '% do resultado'
      }, {
        id: 'conta',
        label: 'Por conta'
      }, {
        id: 'fixo',
        label: 'Valor fixo'
      }]
    }), /*#__PURE__*/React.createElement(Input, {
      label: f.comTipo === 'pct' ? 'Percentual' : f.comTipo === 'conta' ? 'Valor por conta' : 'Valor fixo',
      prefix: f.comTipo === 'pct' ? '%' : 'R$',
      value: f.comValor,
      onChange: u('comValor'),
      hint: prev
    })) : null, step === 2 ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Plataforma",
      required: true,
      value: f.plataforma,
      onChange: u('plataforma'),
      options: MS7.plataformas.map(function (p) {
        return p.nome;
      })
    }), /*#__PURE__*/React.createElement(Select, {
      label: "Rede",
      value: f.rede,
      onChange: u('rede'),
      options: MS7.redes.map(function (r) {
        return r.nome;
      })
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Qtd. depositantes",
      type: "number",
      value: f.qtd,
      onChange: u('qtd')
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Nome do cliente",
      placeholder: "Ex.: Grupo Horizonte",
      value: f.cliente,
      onChange: u('cliente')
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1 / -1'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Link da conta m\xE3e",
      icon: "link",
      placeholder: "https://"
    }))) : null, step === 3 ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        fontSize: 14,
        fontWeight: 500
      }
    }, [['Operador', DB.opName(f.opId)], ['Cliente', f.cliente || 'Nova cooperação'], ['Plataforma / rede', f.plataforma + ' · ' + f.rede], ['Depositantes', f.qtd], ['Comissão', DB.comText({
      comTipo: f.comTipo,
      comValor: parseFloat(f.comValor) || 0
    })]].map(function (r) {
      return /*#__PURE__*/React.createElement("div", {
        key: r[0],
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 0',
          borderBottom: '1px solid var(--border-subtle)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-secondary)'
        }
      }, r[0]), /*#__PURE__*/React.createElement("b", null, r[1]));
    })) : null);
  }
  function ContaForm({
    conta,
    onClose,
    onSave
  }) {
    const {
      Modal,
      Input,
      Select,
      Button
    } = DS;
    const [f, setF] = React.useState(conta);
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
    const res = (+f.saque || 0) - (+f.deposito || 0) - (+f.redeposito || 0);
    return /*#__PURE__*/React.createElement(Modal, {
      open: true,
      onClose: onClose,
      title: conta.id ? 'Editar conta' : 'Adicionar conta',
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: onClose
      }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
        variant: "brand",
        iconLeft: "check",
        onClick: function () {
          if (!f.usuario) {
            toast('Informe o usuário');
            return;
          }
          onSave(f);
        }
      }, "Salvar"))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Usu\xE1rio",
      required: true,
      value: f.usuario,
      onChange: u('usuario')
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Senha",
      type: "password",
      value: f.senha,
      onChange: u('senha')
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Dep\xF3sito",
      prefix: "R$",
      type: "number",
      value: f.deposito,
      onChange: u('deposito')
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Re-dep\xF3sito",
      prefix: "R$",
      type: "number",
      value: f.redeposito,
      onChange: u('redeposito')
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Saque",
      prefix: "R$",
      type: "number",
      value: f.saque,
      onChange: u('saque')
    }), /*#__PURE__*/React.createElement(Select, {
      label: "Status",
      value: f.status,
      onChange: u('status'),
      options: CONTA_ST
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1 / -1'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Observa\xE7\xE3o",
      value: f.obs,
      onChange: u('obs')
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        fontSize: 14,
        fontWeight: 600
      }
    }, 'Resultado da conta: ', /*#__PURE__*/React.createElement("span", {
      style: {
        color: res >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)'
      }
    }, MS7.brl(res)), f.status === 'Bloqueado' ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ms7-error)'
      }
    }, " \xB7 vai gerar alerta de conta bloqueada") : null));
  }
  const PIX_KEYS = [{
    g: 'Vértice — lote A',
    t: 'CPF',
    v: '123.456.789-00'
  }, {
    g: 'Vértice — lote A',
    t: 'Telefone',
    v: '(11) 98888-1020'
  }, {
    g: 'Vértice — lote A',
    t: 'Email',
    v: 'pix.lote.a@ms7.com'
  }, {
    g: 'Lótus — reserva',
    t: 'CNPJ',
    v: '12.345.678/0001-90'
  }, {
    g: 'Lótus — reserva',
    t: 'Aleatória',
    v: 'c2d9-10fe-8a7b-5e33'
  }, {
    g: 'Geral',
    t: 'Telefone',
    v: '(21) 97777-3344'
  }, {
    g: 'Geral',
    t: 'Email',
    v: 'geral@ms7.com'
  }, {
    g: 'Geral',
    t: 'CPF',
    v: '987.654.321-00'
  }];
  const ST_COL = {
    'Aguardando': 'var(--text-secondary)',
    'À sacar': 'var(--ms7-orange)',
    'Sacado': 'var(--ms7-green)',
    'Não sacado': 'var(--ms7-error)',
    'Bloqueado': 'var(--ms7-error)'
  };
  function Cell({
    value,
    onCommit,
    type,
    placeholder,
    align,
    bold
  }) {
    const [v, setV] = React.useState(value == null ? '' : String(value));
    React.useEffect(function () {
      setV(value == null ? '' : String(value));
    }, [value]);
    function commit() {
      if (String(value == null ? '' : value) !== v) onCommit(v);
    }
    return /*#__PURE__*/React.createElement("input", {
      value: v,
      type: type || 'text',
      placeholder: placeholder,
      onChange: function (e) {
        setV(e.target.value);
      },
      onBlur: commit,
      onKeyDown: function (e) {
        if (e.key === 'Enter') e.target.blur();
      },
      style: {
        width: '100%',
        boxSizing: 'border-box',
        height: 34,
        padding: '0 8px',
        border: '1px solid transparent',
        borderRadius: 6,
        background: 'transparent',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: bold ? 700 : 600,
        color: 'var(--text-primary)',
        textAlign: align || 'left',
        fontVariantNumeric: 'tabular-nums',
        outline: 'none'
      },
      onFocus: function (e) {
        e.target.style.borderColor = 'var(--ms7-green)';
        e.target.style.background = 'var(--surface-card, #fff)';
      },
      onBlurCapture: function (e) {
        e.target.style.borderColor = 'transparent';
        e.target.style.background = 'transparent';
      }
    });
  }
  function CellSelect({
    value,
    options,
    onChange,
    color
  }) {
    return /*#__PURE__*/React.createElement("select", {
      value: value || '',
      onChange: function (e) {
        onChange(e.target.value);
      },
      style: {
        width: '100%',
        height: 34,
        padding: '0 6px',
        border: '1px solid transparent',
        borderRadius: 6,
        background: 'transparent',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: 700,
        color: color || 'var(--text-primary)',
        cursor: 'pointer',
        outline: 'none'
      }
    }, options.map(function (o) {
      const ov = typeof o === 'string' ? o : o.value;
      const ol = typeof o === 'string' ? o : o.label;
      return /*#__PURE__*/React.createElement("option", {
        key: ov,
        value: ov,
        style: {
          color: '#242424'
        }
      }, ol);
    }));
  }
  function Planilha({
    c
  }) {
    const [nu, setNu] = React.useState('');
    const pixOpts = [{
      value: '',
      label: '— Selecionar —'
    }].concat(PIX_KEYS.map(function (p) {
      return {
        value: p.v,
        label: p.t + ' · ' + p.v + ' (' + p.g + ')'
      };
    }));
    const used = {};
    c.contas.forEach(function (r) {
      if (r.pix) used[r.pix] = (used[r.pix] || 0) + 1;
    });
    function set(r, k, v) {
      const n = Object.assign({}, r);
      n[k] = k === 'deposito' || k === 'redeposito' || k === 'saque' ? parseFloat(String(v).replace(/\./g, '').replace(',', '.')) || 0 : v;
      DB.A.saveConta(c.id, n, k !== 'status');
    }
    function add() {
      if (!nu.trim()) return;
      DB.A.saveConta(c.id, {
        usuario: nu.trim(),
        senha: '',
        deposito: 0,
        redeposito: 0,
        saque: 0,
        status: 'Aguardando',
        pix: '',
        obs: ''
      }, true);
      setNu('');
    }
    const th = {
      padding: '10px 8px',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      textAlign: 'left',
      borderBottom: '1px solid var(--border-default)',
      whiteSpace: 'nowrap',
      background: 'var(--ms7-gray-50)'
    };
    const td = {
      padding: '2px 4px',
      borderBottom: '1px solid var(--border-subtle)',
      borderRight: '1px solid var(--border-subtle)'
    };
    const tot = c.contas.reduce(function (a, r) {
      a.d += r.deposito;
      a.r += r.redeposito;
      a.s += r.saque;
      return a;
    }, {
      d: 0,
      r: 0,
      s: 0
    });
    const totRes = tot.s - tot.d - tot.r;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        border: '1px solid var(--border-default)',
        borderRadius: 12,
        overflow: 'auto'
      }
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: 900,
        fontFamily: 'var(--font-sans)'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, [['#', 36], ['Usuário', 150], ['Depósito', 110, 'right'], ['Re-depósito', 110, 'right'], ['Saque', 110, 'right'], ['Resultado', 110, 'right'], ['Status', 150], ['Chave PIX', 230], ['', 40]].map(function (h) {
      return /*#__PURE__*/React.createElement("th", {
        key: h[0],
        style: Object.assign({}, th, {
          width: h[1],
          textAlign: h[2] || 'left'
        })
      }, h[0]);
    }))), /*#__PURE__*/React.createElement("tbody", null, c.contas.map(function (r, i) {
      const res = DB.contaRes(r);
      return /*#__PURE__*/React.createElement("tr", {
        key: r.id,
        style: {
          background: r.status === 'Bloqueado' ? 'color-mix(in oklab, var(--ms7-error) 7%, transparent)' : 'transparent'
        }
      }, /*#__PURE__*/React.createElement("td", {
        style: Object.assign({}, td, {
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 700,
          color: 'var(--text-secondary)'
        })
      }, i + 1), /*#__PURE__*/React.createElement("td", {
        style: td
      }, /*#__PURE__*/React.createElement(Cell, {
        value: r.usuario,
        bold: true,
        onCommit: function (v) {
          set(r, 'usuario', v);
        }
      })), /*#__PURE__*/React.createElement("td", {
        style: td
      }, /*#__PURE__*/React.createElement(Cell, {
        value: r.deposito || '',
        placeholder: "0",
        align: "right",
        onCommit: function (v) {
          set(r, 'deposito', v);
        }
      })), /*#__PURE__*/React.createElement("td", {
        style: td
      }, /*#__PURE__*/React.createElement(Cell, {
        value: r.redeposito || '',
        placeholder: "0",
        align: "right",
        onCommit: function (v) {
          set(r, 'redeposito', v);
        }
      })), /*#__PURE__*/React.createElement("td", {
        style: td
      }, /*#__PURE__*/React.createElement(Cell, {
        value: r.saque || '',
        placeholder: "0",
        align: "right",
        onCommit: function (v) {
          set(r, 'saque', v);
        }
      })), /*#__PURE__*/React.createElement("td", {
        style: Object.assign({}, td, {
          textAlign: 'right',
          padding: '0 12px',
          fontSize: 13,
          fontWeight: 800,
          color: res >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)',
          fontVariantNumeric: 'tabular-nums'
        })
      }, MS7.brl(res)), /*#__PURE__*/React.createElement("td", {
        style: td
      }, /*#__PURE__*/React.createElement(CellSelect, {
        value: r.status,
        options: CONTA_ST,
        color: ST_COL[r.status],
        onChange: function (v) {
          set(r, 'status', v);
        }
      })), /*#__PURE__*/React.createElement("td", {
        style: td
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement(CellSelect, {
        value: r.pix,
        options: pixOpts,
        onChange: function (v) {
          set(r, 'pix', v);
        }
      })), r.pix && used[r.pix] > 1 ? /*#__PURE__*/React.createElement("span", {
        title: "Chave usada em mais de uma conta",
        style: {
          display: 'flex',
          color: 'var(--ms7-orange)'
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: "triangle-alert",
        size: 15
      })) : null)), /*#__PURE__*/React.createElement("td", {
        style: Object.assign({}, td, {
          borderRight: 'none',
          textAlign: 'center'
        })
      }, /*#__PURE__*/React.createElement(DS.IconButton, {
        icon: "trash-2",
        size: 28,
        iconSize: 14,
        label: "Remover",
        onClick: function () {
          DB.A.removeConta(c.id, r.id);
        }
      })));
    }), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      style: Object.assign({}, td, {
        textAlign: 'center',
        color: 'var(--text-secondary)'
      })
    }, /*#__PURE__*/React.createElement(DS.Icon, {
      name: "plus",
      size: 14
    })), /*#__PURE__*/React.createElement("td", {
      style: td,
      colSpan: 8
    }, /*#__PURE__*/React.createElement("input", {
      value: nu,
      onChange: function (e) {
        setNu(e.target.value);
      },
      onKeyDown: function (e) {
        if (e.key === 'Enter') add();
      },
      onBlur: add,
      placeholder: "Digite o usu\xE1rio e aperte Enter para adicionar uma linha",
      style: {
        width: '100%',
        boxSizing: 'border-box',
        height: 34,
        padding: '0 8px',
        border: 'none',
        background: 'transparent',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-primary)',
        outline: 'none'
      }
    })))), /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        background: 'var(--ms7-gray-50)'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 8px'
      }
    }), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 12px',
        fontSize: 12,
        fontWeight: 800,
        textTransform: 'uppercase'
      }
    }, 'Total · ' + c.contas.length), [tot.d, tot.r, tot.s].map(function (v, i) {
      return /*#__PURE__*/React.createElement("td", {
        key: i,
        style: {
          padding: '10px 12px',
          textAlign: 'right',
          fontSize: 13,
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums'
        }
      }, MS7.brl(v));
    }), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 12px',
        textAlign: 'right',
        fontSize: 13,
        fontWeight: 800,
        color: totRes >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)'
      }
    }, MS7.brl(totRes)), /*#__PURE__*/React.createElement("td", {
      colSpan: 3
    })))));
  }
  function CoopDetail({
    id,
    onClose
  }) {
    const {
      Modal,
      DataTable,
      Badge,
      Button,
      StatCard,
      Select,
      IconButton
    } = DS;
    DB.useDB();
    const c = DB.coop(id);
    const [edit, setEdit] = React.useState(null);
    if (!c) return null;
    const k = DB.calc(c);
    const blank = {
      usuario: '',
      senha: '',
      deposito: '',
      redeposito: '',
      saque: '',
      status: 'Aguardando',
      obs: ''
    };
    return /*#__PURE__*/React.createElement(Modal, {
      open: true,
      onClose: onClose,
      size: "lg",
      title: c.cliente,
      subtitle: c.id + ' · ' + c.plataforma + ' · ' + DB.opName(c.opId) + ' · ' + DB.comText(c),
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "ghost",
        iconLeft: "download",
        onClick: function () {
          exportCSV('contas-' + c.id, [{
            label: 'Usuário',
            get: function (r) {
              return r.usuario;
            }
          }, {
            label: 'Depósito',
            get: function (r) {
              return r.deposito;
            }
          }, {
            label: 'Re-depósito',
            get: function (r) {
              return r.redeposito;
            }
          }, {
            label: 'Saque',
            get: function (r) {
              return r.saque;
            }
          }, {
            label: 'Resultado',
            get: DB.contaRes
          }, {
            label: 'Status',
            get: function (r) {
              return r.status;
            }
          }, {
            label: 'Chave PIX',
            get: function (r) {
              return r.pix || '';
            }
          }], c.contas);
        }
      }, "CSV"), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }), /*#__PURE__*/React.createElement(Button, {
        variant: "outline",
        iconLeft: "plus",
        onClick: function () {
          setEdit(blank);
        }
      }, "Adicionar conta"), /*#__PURE__*/React.createElement(Button, {
        variant: "brand",
        iconLeft: "repeat",
        disabled: !c.contas.length,
        onClick: function () {
          DB.A.fecharCiclo(c.id);
        }
      }, "Fechar ciclo e notificar"))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))',
        gap: 10,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      variant: "compact",
      icon: "arrow-down-to-line",
      value: MS7.brlK(k.dep + k.red),
      label: "Dep\xF3sito",
      tone: "yellow"
    }), /*#__PURE__*/React.createElement(StatCard, {
      variant: "compact",
      icon: "arrow-up-from-line",
      value: MS7.brlK(k.saq),
      label: "Saque",
      tone: "blue"
    }), /*#__PURE__*/React.createElement(StatCard, {
      variant: "compact",
      icon: "percent",
      value: MS7.brlK(k.com),
      label: "Comiss\xE3o",
      tone: "brand"
    }), /*#__PURE__*/React.createElement(StatCard, {
      variant: "compact",
      icon: k.lucro >= 0 ? 'trending-up' : 'trending-down',
      value: MS7.brlK(k.lucro),
      label: k.lucro >= 0 ? 'Lucro líquido' : 'Prejuízo',
      tone: k.lucro >= 0 ? 'green' : 'orange',
      valueColor: k.lucro >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)'
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--text-secondary)',
        marginBottom: 14
      }
    }, 'Resultado bruto ' + MS7.brl(k.res) + ' − comissão ' + MS7.brl(k.com) + ' − custo das contas ' + MS7.brl(k.custo) + ' (' + k.n + ' × ' + MS7.brl(DB.get().config.custoConta) + ') = ' + MS7.brl(k.lucro)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(DS.Icon, {
      name: "sheet",
      size: 18
    }), /*#__PURE__*/React.createElement("b", {
      style: {
        fontSize: 15
      }
    }, "Planilha de contas"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--text-secondary)'
      }
    }, "Clique numa c\xE9lula para editar \xB7 Enter salva")), /*#__PURE__*/React.createElement(Planilha, {
      c: c
    }), edit ? /*#__PURE__*/React.createElement(ContaForm, {
      conta: edit,
      onClose: function () {
        setEdit(null);
      },
      onSave: function (f) {
        DB.A.saveConta(c.id, f);
        setEdit(null);
      }
    }) : null);
  }
  function CooperacoesScreen({
    session
  }) {
    const {
      Button,
      Input,
      Select,
      Tabs
    } = DS;
    const db = DB.useDB();
    const isOp = session.role === 'operador';
    const [st, setSt] = usePersist('coop-st', 'todas');
    const [op, setOp] = usePersist('coop-op', '');
    const [q, setQ] = React.useState('');
    const [per, setPer] = usePersist('coop-per', 'Todos');
    const [wiz, setWiz] = React.useState(false);
    const [open, setOpen] = React.useState(function () {
      const x = localStorage.getItem('ms7op-open-coop');
      localStorage.removeItem('ms7op-open-coop');
      return x;
    });
    const base = DB.coopsFor({
      opId: isOp ? session.opId : op || null,
      per: per,
      lixeira: true
    });
    const vis = base.filter(function (c) {
      return (st === 'todas' ? c.status !== 'Lixeira' : st === 'andamento' ? c.status === 'Em andamento' || c.status === 'Ativa' : st === 'concluidas' ? c.status === 'Concluída' : c.status === 'Lixeira') && (c.cliente + c.plataforma + c.id + DB.opName(c.opId)).toLowerCase().indexOf(q.toLowerCase()) >= 0;
    });
    const g = DB.agg(base.filter(function (c) {
      return c.status !== 'Lixeira';
    }));
    const count = function (fn) {
      return base.filter(fn).length;
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(PeriodBar, {
      value: per,
      onChange: setPer
    }), /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'activity',
        label: 'Ativas',
        value: g.ativas,
        tone: 'green'
      }, {
        icon: 'arrow-down-to-line',
        label: 'Depósito',
        value: MS7.brlK(g.dep + g.red),
        tone: 'blue'
      }, {
        icon: 'arrow-up-from-line',
        label: 'Saque',
        value: MS7.brlK(g.saq),
        tone: 'yellow'
      }, {
        icon: 'trending-up',
        label: isOp ? 'Minha comissão' : 'Lucro líquido',
        value: MS7.brlK(isOp ? g.com : g.lucro),
        tone: 'orange',
        signed: isOp ? null : g.lucro
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      variant: "chips",
      value: st,
      onChange: setSt,
      items: [{
        id: 'todas',
        label: 'Todas',
        count: count(function (c) {
          return c.status !== 'Lixeira';
        })
      }, {
        id: 'andamento',
        label: 'Em andamento'
      }, {
        id: 'concluidas',
        label: 'Concluídas'
      }, {
        id: 'lixeira',
        label: 'Lixeira',
        count: count(function (c) {
          return c.status === 'Lixeira';
        })
      }]
    }), !isOp ? /*#__PURE__*/React.createElement(Select, {
      variant: "pill",
      value: op,
      onChange: function (e) {
        setOp(e.target.value);
      },
      options: [{
        value: '',
        label: 'Todos os operadores'
      }].concat(db.operadores.map(function (o) {
        return {
          value: o.id,
          label: o.nome
        };
      }))
    }) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: '1 1 200px',
        maxWidth: 300,
        marginLeft: 'auto'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      icon: "search",
      placeholder: "Buscar cliente, plataforma ou ID",
      value: q,
      onChange: function (e) {
        setQ(e.target.value);
      }
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      iconLeft: "download",
      onClick: function () {
        exportCSV('cooperacoes', [{
          label: 'ID',
          get: function (c) {
            return c.id;
          }
        }, {
          label: 'Cliente',
          get: function (c) {
            return c.cliente;
          }
        }, {
          label: 'Operador',
          get: function (c) {
            return DB.opName(c.opId);
          }
        }, {
          label: 'Plataforma',
          get: function (c) {
            return c.plataforma;
          }
        }, {
          label: 'Rede',
          get: function (c) {
            return c.rede;
          }
        }, {
          label: 'Status',
          get: function (c) {
            return c.status;
          }
        }, {
          label: 'Início',
          get: function (c) {
            return c.inicio;
          }
        }, {
          label: 'Contas',
          get: function (c) {
            return DB.calc(c).n;
          }
        }, {
          label: 'Depósito',
          get: function (c) {
            const k = DB.calc(c);
            return k.dep + k.red;
          }
        }, {
          label: 'Saque',
          get: function (c) {
            return DB.calc(c).saq;
          }
        }, {
          label: 'Resultado',
          get: function (c) {
            return DB.calc(c).res;
          }
        }, {
          label: 'Comissão',
          get: function (c) {
            return DB.calc(c).com;
          }
        }, {
          label: 'Custo',
          get: function (c) {
            return DB.calc(c).custo;
          }
        }, {
          label: 'Lucro líquido',
          get: function (c) {
            return DB.calc(c).lucro;
          }
        }], vis);
      }
    }, "Exportar"), /*#__PURE__*/React.createElement(Button, {
      iconLeft: "plus",
      onClick: function () {
        setWiz(true);
      }
    }, "Nova coopera\xE7\xE3o")), vis.length ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
        gap: 20
      }
    }, vis.map(function (c) {
      return /*#__PURE__*/React.createElement(CoopCard, {
        key: c.id,
        c: c,
        canAdmin: !isOp,
        onOpen: function () {
          setOpen(c.id);
        }
      });
    })) : /*#__PURE__*/React.createElement(DS.Card, null, /*#__PURE__*/React.createElement(Empty, {
      icon: "briefcase",
      title: "Nenhuma coopera\xE7\xE3o encontrada",
      sub: "Ajuste os filtros ou crie uma nova coopera\xE7\xE3o."
    })), /*#__PURE__*/React.createElement(CoopWizard, {
      open: wiz,
      session: session,
      onClose: function () {
        setWiz(false);
      }
    }), open ? /*#__PURE__*/React.createElement(CoopDetail, {
      id: open,
      onClose: function () {
        setOpen(null);
      }
    }) : null);
  }
  function ListasScreen() {
    const {
      Card,
      DataTable,
      Badge,
      Button,
      IconButton,
      Tabs,
      Input,
      Modal,
      Select
    } = DS;
    const db = DB.useDB();
    const [tab, setTab] = usePersist('listas-tab', 'geral');
    const [q, setQ] = React.useState('');
    const [st, setSt] = React.useState('Todos');
    const [listas, setListas] = usePersist('listas', MS7.listas);
    const [nova, setNova] = React.useState(false);
    const [nome, setNome] = React.useState('');
    const [tg, setTg] = React.useState(false);
    const all = [];
    db.coops.forEach(function (c) {
      if (c.status === 'Lixeira') return;
      c.contas.forEach(function (k) {
        all.push(Object.assign({
          coopId: c.id,
          operador: DB.opName(c.opId),
          plataforma: c.plataforma
        }, k));
      });
    });
    const rows = all.filter(function (r) {
      return (st === 'Todos' || r.status === st) && (r.usuario + r.operador + r.plataforma + r.coopId).toLowerCase().indexOf(q.toLowerCase()) >= 0;
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      items: [{
        id: 'geral',
        label: 'Lista geral de contas'
      }, {
        id: 'globais',
        label: 'Listas globais'
      }],
      style: {
        maxWidth: 460
      }
    }), tab === 'geral' ? /*#__PURE__*/React.createElement(Card, {
      title: 'Lista geral de contas · ' + rows.length,
      action: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          flexWrap: 'wrap'
        }
      }, /*#__PURE__*/React.createElement(Select, {
        variant: "pill",
        value: st,
        onChange: function (e) {
          setSt(e.target.value);
        },
        options: ['Todos'].concat(CONTA_ST)
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          width: 220
        }
      }, /*#__PURE__*/React.createElement(Input, {
        icon: "search",
        placeholder: "Buscar conta",
        value: q,
        onChange: function (e) {
          setQ(e.target.value);
        }
      })), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "outline",
        iconLeft: "download",
        onClick: function () {
          exportCSV('contas', [{
            label: 'Cooperação',
            get: function (r) {
              return r.coopId;
            }
          }, {
            label: 'Operador',
            get: function (r) {
              return r.operador;
            }
          }, {
            label: 'Plataforma',
            get: function (r) {
              return r.plataforma;
            }
          }, {
            label: 'Usuário',
            get: function (r) {
              return r.usuario;
            }
          }, {
            label: 'Depósito',
            get: function (r) {
              return r.deposito;
            }
          }, {
            label: 'Re-depósito',
            get: function (r) {
              return r.redeposito;
            }
          }, {
            label: 'Saque',
            get: function (r) {
              return r.saque;
            }
          }, {
            label: 'Resultado',
            get: DB.contaRes
          }, {
            label: 'Status',
            get: function (r) {
              return r.status;
            }
          }, {
            label: 'Criada',
            get: function (r) {
              return r.criada;
            }
          }], rows);
        }
      }, "Exportar"))
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: rows.slice(0, 60),
      onRowClick: function (r) {
        localStorage.setItem('ms7op-open-coop', r.coopId);
        window.ms7Go('cooperacoes');
      },
      columns: [{
        key: 'coopId',
        label: 'Coop.'
      }, {
        key: 'operador',
        label: 'Operador'
      }, {
        key: 'plataforma',
        label: 'Plataforma'
      }, {
        key: 'usuario',
        label: 'Usuário',
        render: function (r) {
          return /*#__PURE__*/React.createElement("b", null, r.usuario);
        }
      }, {
        key: 'deposito',
        label: 'Depósito',
        align: 'right',
        render: function (r) {
          return MS7.brl(r.deposito + r.redeposito);
        }
      }, {
        key: 'saque',
        label: 'Saque',
        align: 'right',
        render: function (r) {
          return MS7.brl(r.saque);
        }
      }, {
        key: 'res',
        label: 'Resultado',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Money, {
            v: DB.contaRes(r),
            signed: true
          });
        }
      }, {
        key: 'status',
        label: 'Status',
        align: 'center',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Badge, {
            size: "sm",
            tone: MS7.statusTone[r.status]
          }, r.status);
        }
      }, {
        key: 'criada',
        label: 'Criada',
        render: function (r) {
          return DB.fmtDate(r.criada);
        }
      }]
    }), rows.length === 0 ? /*#__PURE__*/React.createElement(Empty, {
      icon: "list",
      title: "Nenhum resultado."
    }) : rows.length > 60 ? /*#__PURE__*/React.createElement(Hint, null, 'Mostrando 60 de ' + rows.length + '. Use a busca ou exporte para ver todas.') : null) : /*#__PURE__*/React.createElement(Card, {
      title: "Listas globais",
      action: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 10
        }
      }, /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "outline",
        iconLeft: "send",
        onClick: function () {
          setTg(true);
        }
      }, "Importar do Telegram"), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        iconLeft: "plus",
        onClick: function () {
          setNova(true);
        }
      }, "Nova lista"))
    }, /*#__PURE__*/React.createElement(Hint, null, "Cat\xE1logos reutiliz\xE1veis de contas."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
        gap: 14
      }
    }, listas.map(function (l) {
      return /*#__PURE__*/React.createElement("div", {
        key: l.id,
        style: {
          border: '1px solid var(--border-subtle)',
          borderRadius: 14,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: "list-checks",
        size: 18
      }), /*#__PURE__*/React.createElement("b", {
        style: {
          flex: 1,
          fontSize: 15
        }
      }, l.nome), /*#__PURE__*/React.createElement(IconButton, {
        icon: "trash-2",
        size: 28,
        iconSize: 14,
        onClick: function () {
          setListas(listas.filter(function (x) {
            return x.id !== l.id;
          }));
        }
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text-secondary)'
        }
      }, l.descricao), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 6
        }
      }, /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        variant: "soft",
        tone: "green"
      }, l.contas + ' contas'), /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        variant: "soft",
        tone: "gray"
      }, l.dono)));
    }))), /*#__PURE__*/React.createElement(Modal, {
      open: nova,
      onClose: function () {
        setNova(false);
      },
      title: "Nova lista global",
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: function () {
          setNova(false);
        }
      }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
        variant: "brand",
        onClick: function () {
          setListas(listas.concat([{
            id: Date.now(),
            nome: nome || 'Nova lista',
            descricao: 'Sem descrição.',
            contas: 0,
            dono: 'Admin'
          }]));
          setNome('');
          setNova(false);
          toast('Lista criada');
        }
      }, "Salvar"))
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Nome",
      required: true,
      value: nome,
      onChange: function (e) {
        setNome(e.target.value);
      }
    })), /*#__PURE__*/React.createElement(Modal, {
      open: tg,
      onClose: function () {
        setTg(false);
      },
      title: "Importar lista do Telegram",
      size: "lg",
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: function () {
          setTg(false);
        }
      }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
        variant: "brand",
        iconLeft: "upload",
        onClick: function () {
          setTg(false);
          toast('Lista importada');
        }
      }, "Importar"))
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Cole a lista do Telegram",
      multiline: true,
      rows: 8,
      placeholder: 'usuario1 | senha | 300\nusuario2 | senha | 450'
    })));
  }
  function AvisosScreen({
    session
  }) {
    const {
      Card,
      Input,
      Checkbox,
      Button,
      IconButton,
      Badge
    } = DS;
    const isOp = session.role === 'operador';
    const [list, setList] = usePersist('avisos', MS7.avisos);
    const [t, setT] = React.useState('');
    const [c, setC] = React.useState('');
    const [all, setAll] = React.useState(true);
    const [gs, setGs] = React.useState([]);
    const ok = t && c && (all || gs.length);
    function pub() {
      setList([{
        id: Date.now(),
        titulo: t,
        conteudo: c,
        data: DB.fmtDate(DB.iso(DB.today)) + ' ' + new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        publico: all ? 'Todos os usuários' : gs.join(', ')
      }].concat(list));
      setT('');
      setC('');
      setGs([]);
      setAll(true);
      toast('Aviso publicado');
    }
    const listCard = /*#__PURE__*/React.createElement(Card, {
      title: "Avisos publicados"
    }, list.length ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, list.map(function (a) {
      return /*#__PURE__*/React.createElement("div", {
        key: a.id,
        style: {
          display: 'flex',
          gap: 12,
          padding: 14,
          border: '1px solid var(--border-subtle)',
          borderRadius: 12
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'var(--ms7-lime-100)',
          color: 'var(--ms7-green-900)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: "megaphone",
        size: 18
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("b", {
        style: {
          fontSize: 15
        }
      }, a.titulo), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: '4px 0 8px',
          fontSize: 13,
          fontWeight: 500,
          lineHeight: 1.45,
          whiteSpace: 'pre-line'
        }
      }, a.conteudo), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--text-secondary)'
        }
      }, a.data), /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        variant: "soft",
        tone: "blue"
      }, a.publico))), !isOp ? /*#__PURE__*/React.createElement(IconButton, {
        icon: "trash-2",
        size: 32,
        iconSize: 16,
        label: "Remover aviso",
        onClick: function () {
          setList(list.filter(function (x) {
            return x.id !== a.id;
          }));
        }
      }) : null);
    })) : /*#__PURE__*/React.createElement(Empty, {
      icon: "megaphone",
      title: "Nenhum aviso publicado ainda"
    }));
    if (isOp) return listCard;
    return /*#__PURE__*/React.createElement(Grid, {
      min: 340
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Publicar aviso"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "T\xEDtulo do aviso",
      value: t,
      onChange: function (e) {
        setT(e.target.value);
      }
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Conte\xFAdo",
      multiline: true,
      rows: 6,
      placeholder: "Escreva o aviso\u2026",
      value: c,
      onChange: function (e) {
        setC(e.target.value);
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--ms7-gray-50)',
        borderRadius: 12,
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(DS.Icon, {
      name: "users",
      size: 14
    }), "P\xFAblico-alvo"), /*#__PURE__*/React.createElement(Checkbox, {
      label: "Notificar todos os usu\xE1rios",
      checked: all,
      onChange: setAll
    }), !all ? MS7.grupos.map(function (g) {
      return /*#__PURE__*/React.createElement(Checkbox, {
        key: g,
        label: g,
        checked: gs.indexOf(g) >= 0,
        onChange: function (v) {
          setGs(v ? gs.concat([g]) : gs.filter(function (x) {
            return x !== g;
          }));
        },
        style: {
          paddingLeft: 28
        }
      });
    }) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "brand",
      iconLeft: "megaphone",
      disabled: !ok,
      onClick: pub
    }, "Publicar aviso")))), listCard);
  }
  Object.assign(window, {
    CooperacoesScreen: CooperacoesScreen,
    ListasScreen: ListasScreen,
    AvisosScreen: AvisosScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operacoes/ScreensCoop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operacoes/ScreensDashboard.jsx
try { (() => {
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const pct = function (v) {
    return (isFinite(v) ? v : 0).toLocaleString('pt-BR', {
      maximumFractionDigits: 0
    }) + '%';
  };
  function opRows(per) {
    const db = DB.get();
    return db.operadores.map(function (o) {
      const g = DB.agg(DB.coopsFor({
        opId: o.id,
        per: per
      }));
      return Object.assign({
        id: o.id,
        nome: o.nome,
        ativo: o.ativo
      }, g);
    });
  }
  function buildAlerts(session) {
    const db = DB.get();
    const out = [];
    const mine = function (c) {
      return session.role !== 'operador' || c.opId === session.opId;
    };
    db.coops.filter(function (c) {
      return mine(c) && (c.status === 'Em andamento' || c.status === 'Ativa');
    }).forEach(function (c) {
      c.contas.filter(function (k) {
        return k.status === 'Bloqueado';
      }).forEach(function (k) {
        out.push({
          icon: 'shield-alert',
          tone: 'error',
          title: 'Conta bloqueada: ' + k.usuario,
          sub: c.cliente + ' · ' + DB.opName(c.opId),
          coop: c.id
        });
      });
    });
    if (session.role !== 'operador' && window.getPixGrupos) getPixGrupos().forEach(function (g) {
      const d = g.chaves.filter(function (k) {
        return !k.u;
      }).length;
      if (d <= 1) out.push({
        icon: 'key-round',
        tone: 'yellow',
        title: 'Chaves PIX acabando: ' + g.nome,
        sub: d + ' disponível(is) de ' + g.chaves.length,
        page: 'gestao'
      });
    });
    db.coops.filter(function (c) {
      return mine(c) && c.status === 'Em andamento' && !c.ciclos && (DB.today - new Date(c.inicio + 'T12:00:00')) / 864e5 >= 3;
    }).forEach(function (c) {
      out.push({
        icon: 'clock',
        tone: 'blue',
        title: 'Ciclo sem fechamento: ' + c.cliente,
        sub: 'Em andamento desde ' + DB.fmtDate(c.inicio),
        coop: c.id
      });
    });
    return out;
  }
  function openCoop(id) {
    localStorage.setItem('ms7op-open-coop', id);
    window.ms7Go('cooperacoes');
  }
  function AlertsCard({
    session
  }) {
    const {
      Card,
      Badge
    } = DS;
    const al = buildAlerts(session);
    return /*#__PURE__*/React.createElement(Card, {
      title: "Alertas",
      action: al.length ? /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        tone: "error"
      }, al.length) : null
    }, al.length ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, al.slice(0, 6).map(function (a, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        onClick: function () {
          a.coop ? openCoop(a.coop) : window.ms7Go(a.page);
        },
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 0',
          borderBottom: i < Math.min(al.length, 6) - 1 ? '1px solid var(--border-subtle)' : 'none',
          cursor: 'pointer'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 32,
          height: 32,
          borderRadius: 9,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'color-mix(in srgb, var(--ms7-' + (a.tone === 'error' ? 'error' : a.tone === 'yellow' ? 'yellow' : 'blue') + ') 16%, var(--surface-card))',
          color: 'var(--ms7-' + (a.tone === 'error' ? 'error' : a.tone === 'yellow' ? 'orange' : 'blue') + ')'
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: a.icon,
        size: 16,
        strokeWidth: 2
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: 600
        }
      }, a.title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--text-secondary)'
        }
      }, a.sub)), /*#__PURE__*/React.createElement(DS.Icon, {
        name: "chevron-right",
        size: 16,
        color: "var(--text-secondary)"
      }));
    })) : /*#__PURE__*/React.createElement(Empty, {
      icon: "circle-check",
      title: "Tudo certo",
      sub: "Nenhum alerta no momento."
    }));
  }
  function GeralScreen({
    session
  }) {
    const {
      Card,
      DataTable,
      BarChart,
      Badge,
      Avatar,
      Select
    } = DS;
    DB.useDB();
    const isOp = session.role === 'operador';
    const [per, setPer] = usePersist('geral-per', '30 dias');
    const [op, setOp] = usePersist('geral-op', '');
    const g = DB.agg(DB.coopsFor({
      opId: isOp ? session.opId : op || null,
      per: per
    }));
    const rows = isOp ? [] : opRows(per).filter(function (r) {
      return !op || r.id === op;
    }).sort(function (a, b) {
      return b.lucro - a.lucro;
    });
    const kpis = isOp ? [{
      icon: 'percent',
      label: 'Minha comissão',
      value: MS7.brlK(g.com),
      tone: 'green'
    }, {
      icon: 'trending-up',
      label: 'Resultado das contas',
      value: MS7.brlK(g.res),
      tone: 'blue',
      signed: g.res
    }, {
      icon: 'users',
      label: 'Contas no período',
      value: g.n,
      tone: 'yellow'
    }, {
      icon: 'shield-alert',
      label: 'Contas bloqueadas',
      value: g.bloq,
      tone: 'orange',
      trend: g.n ? (g.bloq / g.n * 100).toLocaleString('pt-BR', {
        maximumFractionDigits: 1
      }) + '%' : null,
      trendTone: 'up-bad'
    }] : [{
      icon: 'circle-dollar-sign',
      label: 'Lucro líquido',
      value: MS7.brlK(g.lucro),
      tone: 'green',
      signed: g.lucro
    }, {
      icon: 'trending-up',
      label: 'ROI',
      value: pct(g.roi),
      tone: 'blue',
      signed: g.roi
    }, {
      icon: 'shield-alert',
      label: 'Contas bloqueadas',
      value: g.bloq + ' de ' + g.n,
      tone: 'orange',
      trend: g.n ? (g.bloq / g.n * 100).toLocaleString('pt-BR', {
        maximumFractionDigits: 1
      }) + '%' : null,
      trendTone: 'up-bad'
    }, {
      icon: 'receipt',
      label: 'Custo por conta',
      value: MS7.brl(g.custoConta),
      tone: 'yellow'
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(PeriodBar, {
      value: per,
      onChange: setPer
    }, !isOp ? /*#__PURE__*/React.createElement(Select, {
      variant: "pill",
      value: op,
      onChange: function (e) {
        setOp(e.target.value);
      },
      options: [{
        value: '',
        label: 'Todos os operadores'
      }].concat(DB.get().operadores.map(function (o) {
        return {
          value: o.id,
          label: o.nome
        };
      }))
    }) : null), /*#__PURE__*/React.createElement(KpiRow, {
      items: kpis
    }), /*#__PURE__*/React.createElement(Grid, {
      min: 340
    }, isOp ? /*#__PURE__*/React.createElement(Card, {
      title: "Minhas coopera\xE7\xF5es no per\xEDodo"
    }, /*#__PURE__*/React.createElement(RankList, {
      rows: DB.coopsFor({
        opId: session.opId,
        per: per
      }).map(function (c) {
        return {
          nome: c.cliente + ' · ' + c.status,
          v: DB.calc(c).com
        };
      }),
      valueKey: "v"
    })) : /*#__PURE__*/React.createElement(Card, {
      title: "Lucro e comiss\xE3o por operador"
    }, /*#__PURE__*/React.createElement(BarChart, {
      height: 230,
      data: rows.map(function (o) {
        return {
          label: o.nome.split(' ')[0],
          values: [Math.max(0, Math.round(o.lucro / 100) / 10), Math.round(o.com / 100) / 10]
        };
      }),
      series: [{
        name: 'Lucro líquido (mil R$)',
        color: 'var(--chart-1)'
      }, {
        name: 'Comissão (mil R$)',
        color: 'var(--chart-2)'
      }]
    })), /*#__PURE__*/React.createElement(AlertsCard, {
      session: session
    })), !isOp ? /*#__PURE__*/React.createElement(Card, {
      title: "Operadores",
      action: /*#__PURE__*/React.createElement(DS.Button, {
        size: "sm",
        variant: "outline",
        iconLeft: "download",
        onClick: function () {
          exportCSV('operadores-' + per.replace(' ', ''), [{
            label: 'Operador',
            get: function (r) {
              return r.nome;
            }
          }, {
            label: 'Cooperações',
            get: function (r) {
              return r.coops;
            }
          }, {
            label: 'Contas',
            get: function (r) {
              return r.n;
            }
          }, {
            label: 'Bloqueadas',
            get: function (r) {
              return r.bloq;
            }
          }, {
            label: 'Resultado',
            get: function (r) {
              return r.res;
            }
          }, {
            label: 'Comissão',
            get: function (r) {
              return r.com;
            }
          }, {
            label: 'Custo',
            get: function (r) {
              return r.custo;
            }
          }, {
            label: 'Lucro líquido',
            get: function (r) {
              return r.lucro;
            }
          }, {
            label: 'ROI %',
            get: function (r) {
              return r.roi;
            }
          }], rows);
        }
      }, "Exportar")
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: rows,
      onRowClick: function () {
        window.ms7Go('cooperacoes');
      },
      columns: [{
        key: 'nome',
        label: 'Operador',
        render: function (r) {
          return /*#__PURE__*/React.createElement("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }
          }, /*#__PURE__*/React.createElement(Avatar, {
            name: r.nome,
            size: 32
          }), /*#__PURE__*/React.createElement("span", {
            style: {
              fontWeight: 600
            }
          }, r.nome));
        }
      }, {
        key: 'n',
        label: 'Contas',
        align: 'center'
      }, {
        key: 'bloq',
        label: 'Bloqueadas',
        align: 'center',
        render: function (r) {
          return r.bloq ? /*#__PURE__*/React.createElement(Badge, {
            tone: r.bloq / r.n > 0.06 ? 'error' : 'yellow',
            size: "sm"
          }, r.bloq + ' · ' + (r.bloq / r.n * 100).toLocaleString('pt-BR', {
            maximumFractionDigits: 1
          }) + '%') : /*#__PURE__*/React.createElement("span", {
            style: {
              color: 'var(--text-secondary)'
            }
          }, "\u2014");
        }
      }, {
        key: 'com',
        label: 'Comissão',
        align: 'right',
        render: function (r) {
          return MS7.brl(r.com);
        }
      }, {
        key: 'custoConta',
        label: 'Custo/conta',
        align: 'right',
        render: function (r) {
          return MS7.brl(r.custoConta);
        }
      }, {
        key: 'lucro',
        label: 'Lucro líquido',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Money, {
            v: r.lucro,
            signed: true
          });
        }
      }, {
        key: 'roi',
        label: 'ROI',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement("b", {
            style: {
              color: r.roi >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)'
            }
          }, pct(r.roi));
        }
      }]
    }), rows.every(function (r) {
      return !r.coops;
    }) ? /*#__PURE__*/React.createElement(Empty, {
      icon: "calendar",
      title: "Sem coopera\xE7\xF5es neste per\xEDodo",
      sub: "Escolha outro per\xEDodo."
    }) : null) : null);
  }
  function ComparacaoScreen() {
    const {
      Card,
      Checkbox,
      BarChart,
      DataTable,
      Badge
    } = DS;
    DB.useDB();
    const O = DB.get().operadores;
    const [per, setPer] = usePersist('comp-per', '30 dias');
    const [sel, setSel] = usePersist('comp-sel', O.slice(0, 4).map(function (o) {
      return o.id;
    }));
    const rows = opRows(per).filter(function (o) {
      return sel.indexOf(o.id) >= 0;
    }).sort(function (a, b) {
      return b.lucro - a.lucro;
    });
    const s = function (k) {
      return rows.reduce(function (a, o) {
        return a + o[k];
      }, 0);
    };
    function tog(id) {
      setSel(sel.indexOf(id) >= 0 ? sel.filter(function (x) {
        return x !== id;
      }) : sel.concat([id]));
    }
    const d = function (k, div) {
      return rows.map(function (o) {
        return {
          label: o.nome.split(' ')[0],
          values: [Math.max(0, div ? Math.round(o[k] / div * 10) / 10 : o[k])]
        };
      });
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(PeriodBar, {
      value: per,
      onChange: setPer
    }), /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'circle-dollar-sign',
        label: 'Lucro líquido',
        value: MS7.brlK(s('lucro')),
        tone: 'green',
        signed: s('lucro')
      }, {
        icon: 'percent',
        label: 'Comissão total',
        value: MS7.brlK(s('com')),
        tone: 'yellow'
      }, {
        icon: 'users',
        label: 'Operadores',
        value: rows.length,
        tone: 'blue'
      }, {
        icon: 'circle-check',
        label: 'Coops concluídas',
        value: s('concluidas'),
        tone: 'orange'
      }]
    }), /*#__PURE__*/React.createElement(Card, {
      title: "Operadores"
    }, /*#__PURE__*/React.createElement(Hint, null, "Marque os operadores que deseja comparar."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
        gap: '12px 24px'
      }
    }, O.map(function (o) {
      return /*#__PURE__*/React.createElement(Checkbox, {
        key: o.id,
        label: o.nome,
        checked: sel.indexOf(o.id) >= 0,
        onChange: function () {
          tog(o.id);
        }
      });
    }))), rows.length === 0 ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Empty, {
      icon: "users",
      title: "Nenhum operador selecionado"
    })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
      min: 300
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Lucro l\xEDquido (mil R$)"
    }, /*#__PURE__*/React.createElement(BarChart, {
      height: 200,
      data: d('lucro', 1000),
      series: [{
        name: 'Lucro',
        color: 'var(--chart-1)'
      }]
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Comiss\xE3o (mil R$)"
    }, /*#__PURE__*/React.createElement(BarChart, {
      height: 200,
      data: d('com', 1000),
      series: [{
        name: 'Comissão',
        color: 'var(--chart-2)'
      }]
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "Compara\xE7\xE3o ranqueada"
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: rows.map(function (o, i) {
        return Object.assign({
          pos: i + 1
        }, o);
      }),
      columns: [{
        key: 'pos',
        label: '#',
        render: function (r) {
          return /*#__PURE__*/React.createElement("b", null, String(r.pos).padStart(2, '0'));
        }
      }, {
        key: 'nome',
        label: 'Operador'
      }, {
        key: 'coops',
        label: 'Coops',
        align: 'center'
      }, {
        key: 'n',
        label: 'Contas',
        align: 'center'
      }, {
        key: 'lucro',
        label: 'Lucro líquido',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Money, {
            v: r.lucro,
            signed: true
          });
        }
      }, {
        key: 'com',
        label: 'Comissão',
        align: 'right',
        render: function (r) {
          return MS7.brl(r.com);
        }
      }, {
        key: 'roi',
        label: 'ROI',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement("b", null, pct(r.roi));
        }
      }, {
        key: 'b',
        label: '',
        align: 'center',
        render: function (r) {
          return r.pos === 1 && r.coops ? /*#__PURE__*/React.createElement(Badge, {
            tone: "green",
            size: "sm"
          }, "L\xEDder") : null;
        }
      }]
    }))));
  }
  function RedesScreen() {
    const {
      Card,
      BarChart
    } = DS;
    DB.useDB();
    const [per, setPer] = usePersist('redes-per', '30 dias');
    const R = MS7.redes.map(function (r) {
      const g = DB.agg(DB.coopsFor({
        per: per
      }).filter(function (c) {
        return c.rede === r.nome;
      }));
      return Object.assign({
        nome: r.nome
      }, g);
    }).filter(function (r) {
      return r.coops;
    }).sort(function (a, b) {
      return b.lucro - a.lucro;
    });
    const s = function (k) {
      return R.reduce(function (a, o) {
        return a + o[k];
      }, 0);
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement(PeriodBar, {
      value: per,
      onChange: setPer
    }), /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'network',
        label: 'Redes com operação',
        value: R.length,
        tone: 'blue'
      }, {
        icon: 'circle-dollar-sign',
        label: 'Lucro líquido',
        value: MS7.brlK(s('lucro')),
        tone: 'green',
        signed: s('lucro')
      }, {
        icon: 'users',
        label: 'Contas',
        value: s('n'),
        tone: 'yellow'
      }, {
        icon: 'shield-alert',
        label: 'Contas bloqueadas',
        value: s('bloq'),
        tone: 'orange'
      }]
    }), R.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
      title: "Lucro l\xEDquido por rede (mil R$)"
    }, /*#__PURE__*/React.createElement(BarChart, {
      height: 240,
      data: R.map(function (r) {
        return {
          label: r.nome.replace('Rede ', ''),
          values: [Math.max(0, Math.round(r.lucro / 100) / 10)]
        };
      }),
      series: [{
        name: 'Lucro (mil R$)',
        color: 'var(--chart-1)'
      }]
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Redes"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
        gap: 14
      }
    }, R.map(function (r) {
      return /*#__PURE__*/React.createElement("div", {
        key: r.nome,
        style: {
          border: '1px solid var(--border-subtle)',
          borderRadius: 14,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: "network",
        size: 18
      }), /*#__PURE__*/React.createElement("b", {
        style: {
          fontSize: 15
        }
      }, r.nome)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.06em',
          color: 'var(--text-secondary)'
        }
      }, "Lucro l\xEDquido"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 22,
          fontWeight: 700,
          color: r.lucro >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)'
        }
      }, MS7.brl(r.lucro))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 8,
          fontSize: 12
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          color: 'var(--text-secondary)',
          fontWeight: 600
        }
      }, "Coops"), /*#__PURE__*/React.createElement("b", null, r.coops)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          color: 'var(--text-secondary)',
          fontWeight: 600
        }
      }, "Contas"), /*#__PURE__*/React.createElement("b", null, r.n)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          color: 'var(--text-secondary)',
          fontWeight: 600
        }
      }, "ROI"), /*#__PURE__*/React.createElement("b", null, pct(r.roi)))));
    })))) : /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Empty, {
      icon: "network",
      title: "Sem opera\xE7\xF5es neste per\xEDodo"
    })));
  }
  Object.assign(window, {
    GeralScreen: GeralScreen,
    ComparacaoScreen: ComparacaoScreen,
    RedesScreen: RedesScreen,
    buildAlerts: buildAlerts
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operacoes/ScreensDashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operacoes/ScreensGestao.jsx
try { (() => {
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const pixGrupos = [{
    id: 1,
    nome: 'Vértice — lote A',
    forma: 'PIX',
    operador: 'Lucas Martins',
    plataforma: 'Vértice',
    chaves: [{
      t: 'CPF',
      v: '123.456.789-00',
      u: true
    }, {
      t: 'Telefone',
      v: '(11) 98888-1020',
      u: false
    }, {
      t: 'Email',
      v: 'pix.lote.a@ms7.com',
      u: false
    }, {
      t: 'Aleatória',
      v: '7f3c-91ab-44e2-b0d1',
      u: true
    }]
  }, {
    id: 2,
    nome: 'Lótus — reserva',
    forma: 'PIX',
    operador: 'Bruna Costa',
    plataforma: 'Lótus Bet',
    chaves: [{
      t: 'CNPJ',
      v: '12.345.678/0001-90',
      u: false
    }, {
      t: 'Aleatória',
      v: 'c2d9-10fe-8a7b-5e33',
      u: false
    }]
  }, {
    id: 3,
    nome: 'Geral — sem operador',
    forma: 'PIX',
    operador: '—',
    plataforma: 'Todas',
    chaves: [{
      t: 'Telefone',
      v: '(21) 97777-3344',
      u: true
    }, {
      t: 'Email',
      v: 'geral@ms7.com',
      u: false
    }, {
      t: 'CPF',
      v: '987.654.321-00',
      u: false
    }]
  }];
  function OperadoresTab() {
    const {
      Card,
      DataTable,
      Switch,
      IconButton,
      Button,
      Modal,
      Input,
      Avatar,
      Badge
    } = DS;
    const [rows, setRows] = React.useState(MS7.operadores);
    const [edit, setEdit] = React.useState(null);
    const [inv, setInv] = React.useState(false);
    const used = rows.filter(function (r) {
      return r.ativo;
    }).length;
    return /*#__PURE__*/React.createElement(Card, {
      title: "Operadores",
      action: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 10,
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        variant: "soft",
        tone: used >= 10 ? 'error' : 'green'
      }, 'Seats ' + used + '/10'), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "outline",
        iconLeft: "link",
        onClick: function () {
          setInv(true);
        }
      }, "Convidar"), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        iconLeft: "plus",
        onClick: function () {
          setEdit('new');
        }
      }, "Novo operador"))
    }, /*#__PURE__*/React.createElement(Hint, null, "Cadastre operadores e configure ciclo, comiss\xE3o e colunas vis\xEDveis."), /*#__PURE__*/React.createElement(DataTable, {
      rows: rows,
      columns: [{
        key: 'nome',
        label: 'Nome',
        render: function (r) {
          return /*#__PURE__*/React.createElement("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }
          }, /*#__PURE__*/React.createElement(Avatar, {
            name: r.nome,
            size: 32
          }), /*#__PURE__*/React.createElement("b", null, r.nome));
        }
      }, {
        key: 'ciclo',
        label: 'Ciclo',
        align: 'center',
        render: function (r) {
          return r.ciclo + ' dias';
        }
      }, {
        key: 'pct',
        label: '% padrão',
        align: 'center',
        render: function (r) {
          return r.pct + '%';
        }
      }, {
        key: 'coops',
        label: 'Coops',
        align: 'center'
      }, {
        key: 'ativo',
        label: 'Ativo',
        align: 'center',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Switch, {
            checked: r.ativo,
            onChange: function (v) {
              setRows(rows.map(function (x) {
                return x.id === r.id ? Object.assign({}, x, {
                  ativo: v
                }) : x;
              }));
            }
          });
        }
      }, {
        key: 'a',
        label: '',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement("div", {
            style: {
              display: 'inline-flex',
              gap: 2
            }
          }, /*#__PURE__*/React.createElement(IconButton, {
            icon: "pencil",
            size: 30,
            iconSize: 16,
            onClick: function () {
              setEdit(r.id);
            }
          }), /*#__PURE__*/React.createElement(IconButton, {
            icon: "trash-2",
            size: 30,
            iconSize: 16,
            onClick: function () {
              setRows(rows.filter(function (x) {
                return x.id !== r.id;
              }));
            }
          }));
        }
      }]
    }), /*#__PURE__*/React.createElement(Modal, {
      open: !!edit,
      onClose: function () {
        setEdit(null);
      },
      title: edit === 'new' ? 'Novo operador' : 'Editar operador',
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: function () {
          setEdit(null);
        }
      }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
        variant: "brand",
        onClick: function () {
          setEdit(null);
          toast('Operador salvo');
        }
      }, "Salvar"))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1 / -1'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Nome",
      required: true
    })), /*#__PURE__*/React.createElement(Input, {
      label: "Email (login)"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Senha",
      required: true,
      type: "password"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Ciclo de remessa",
      type: "number",
      defaultValue: "7"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Comiss\xE3o padr\xE3o (%)",
      prefix: "%",
      defaultValue: "15"
    }))), /*#__PURE__*/React.createElement(Modal, {
      open: inv,
      onClose: function () {
        setInv(false);
      },
      size: "sm",
      title: "Convidar operador",
      footer: /*#__PURE__*/React.createElement(Button, {
        iconLeft: "copy",
        onClick: function () {
          setInv(false);
          toast('Link do convite copiado');
        }
      }, "Copiar link")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Nome (opcional)"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Email (opcional)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--ms7-gray-50)',
        borderRadius: 8,
        padding: '10px 12px',
        fontFamily: 'ui-monospace,monospace',
        fontSize: 12
      }
    }, "ms7.app/convite/8f2c1a"))));
  }
  function GruposTab() {
    const {
      Card,
      DataTable,
      Button,
      Badge,
      IconButton,
      Select
    } = DS;
    const names = MS7.grupos;
    const [sel, setSel] = React.useState(names[0]);
    const members = MS7.operadores.slice(0, 4).map(function (o, i) {
      return {
        id: o.id,
        nome: o.nome,
        email: o.nome.toLowerCase().split(' ')[0] + '@ms7.com',
        perfil: i === 0 ? 'Admin' : 'Operador',
        ativo: o.ativo
      };
    });
    return /*#__PURE__*/React.createElement(Grid, {
      min: 300
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Grupos",
      action: /*#__PURE__*/React.createElement(IconButton, {
        icon: "plus",
        variant: "dark",
        size: 30,
        iconSize: 16,
        onClick: function () {
          toast('Grupo criado');
        }
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, names.map(function (n, i) {
      const on = n === sel;
      return /*#__PURE__*/React.createElement("button", {
        key: n,
        onClick: function () {
          setSel(n);
        },
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 12px',
          borderRadius: 10,
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          background: on ? 'var(--ms7-lime-100)' : 'transparent',
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          fontWeight: 600,
          color: on ? 'var(--ms7-green-900)' : 'var(--text-primary)'
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: "users",
        size: 16
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, n), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: 'var(--text-secondary)'
        }
      }, 4 - i % 2));
    }))), /*#__PURE__*/React.createElement(Card, {
      title: sel,
      action: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(Select, {
        variant: "pill",
        placeholder: "Adicionar usu\xE1rio",
        options: MS7.operadores.slice(4).map(function (o) {
          return o.nome;
        })
      }))
    }, /*#__PURE__*/React.createElement(Hint, null, "Grupos direcionam avisos e notifica\xE7\xF5es."), /*#__PURE__*/React.createElement(DataTable, {
      rows: members,
      columns: [{
        key: 'nome',
        label: 'Nome',
        render: function (r) {
          return /*#__PURE__*/React.createElement("b", null, r.nome);
        }
      }, {
        key: 'email',
        label: 'Email'
      }, {
        key: 'perfil',
        label: 'Perfil',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Badge, {
            size: "sm",
            variant: "soft",
            tone: r.perfil === 'Admin' ? 'purple' : 'blue'
          }, r.perfil);
        }
      }, {
        key: 'ativo',
        label: 'Ativo',
        align: 'center',
        render: function (r) {
          return r.ativo ? /*#__PURE__*/React.createElement(DS.Icon, {
            name: "check",
            size: 16,
            color: "var(--ms7-green)"
          }) : '—';
        }
      }, {
        key: 'x',
        label: '',
        align: 'right',
        render: function () {
          return /*#__PURE__*/React.createElement(IconButton, {
            icon: "user-minus",
            size: 30,
            iconSize: 16
          });
        }
      }]
    })));
  }
  function PlataformasTab() {
    const {
      Card,
      Button,
      IconButton,
      Badge,
      Input
    } = DS;
    const [pl, setPl] = React.useState(MS7.plataformas.map(function (p) {
      return p.nome;
    }));
    const [rd, setRd] = React.useState(MS7.redes.map(function (r) {
      return r.nome;
    }));
    const [n1, setN1] = React.useState('');
    const [n2, setN2] = React.useState('');
    function List({
      title,
      sub,
      items,
      set,
      val,
      setVal,
      icon
    }) {
      return /*#__PURE__*/React.createElement(Card, {
        title: title,
        action: /*#__PURE__*/React.createElement(Button, {
          size: "sm",
          variant: "outline",
          iconLeft: "upload",
          onClick: function () {
            toast('Importação em lote concluída');
          }
        }, "Importar em lote")
      }, /*#__PURE__*/React.createElement(Hint, null, sub), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 10,
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement(Input, {
        placeholder: 'Nova ' + title.toLowerCase().slice(0, -1),
        value: val,
        onChange: function (e) {
          setVal(e.target.value);
        }
      })), /*#__PURE__*/React.createElement(Button, {
        iconLeft: "plus",
        onClick: function () {
          if (val) {
            set(items.concat([val]));
            setVal('');
          }
        }
      }, "Adicionar")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8
        }
      }, items.map(function (x) {
        return /*#__PURE__*/React.createElement("span", {
          key: x,
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            height: 34,
            padding: '0 6px 0 12px',
            borderRadius: 10,
            background: 'var(--ms7-gray-100)',
            fontSize: 14,
            fontWeight: 600
          }
        }, /*#__PURE__*/React.createElement(DS.Icon, {
          name: icon,
          size: 15
        }), x, /*#__PURE__*/React.createElement("button", {
          onClick: function () {
            set(items.filter(function (y) {
              return y !== x;
            }));
          },
          "aria-label": "Remover",
          style: {
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            display: 'flex',
            padding: 2
          }
        }, /*#__PURE__*/React.createElement(DS.Icon, {
          name: "x",
          size: 14
        })));
      })));
    }
    return /*#__PURE__*/React.createElement(Grid, {
      min: 380
    }, /*#__PURE__*/React.createElement(List, {
      title: "Plataformas",
      sub: "Sites onde os dep\xF3sitos s\xE3o feitos.",
      items: pl,
      set: setPl,
      val: n1,
      setVal: setN1,
      icon: "app-window"
    }), /*#__PURE__*/React.createElement(List, {
      title: "Redes",
      sub: "Redes vinculadas \xE0s coopera\xE7\xF5es.",
      items: rd,
      set: setRd,
      val: n2,
      setVal: setN2,
      icon: "network"
    }));
  }
  function PixTab() {
    const {
      Card,
      Button,
      Badge,
      IconButton,
      Select
    } = DS;
    const [open, setOpen] = React.useState(1);
    const [gr, setGr] = usePersist('pix', pixGrupos);
    const all = [];
    gr.forEach(function (g) {
      g.chaves.forEach(function (k) {
        all.push(k);
      });
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'folder-key',
        label: 'Total grupos',
        value: gr.length,
        tone: 'blue'
      }, {
        icon: 'key-round',
        label: 'Total chaves',
        value: all.length,
        tone: 'yellow'
      }, {
        icon: 'circle-check',
        label: 'Disponíveis',
        value: all.filter(function (k) {
          return !k.u;
        }).length,
        tone: 'green'
      }, {
        icon: 'circle-slash',
        label: 'Usadas',
        value: all.filter(function (k) {
          return k.u;
        }).length,
        tone: 'orange'
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Select, {
      variant: "pill",
      placeholder: "Operador: todos",
      options: MS7.operadores.map(function (o) {
        return o.nome;
      })
    }), /*#__PURE__*/React.createElement(Select, {
      variant: "pill",
      placeholder: "Plataforma: todas",
      options: MS7.plataformas.map(function (p) {
        return p.nome;
      })
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline",
      iconLeft: "upload",
      onClick: function () {
        toast('Chaves importadas');
      }
    }, "Importar em massa"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      iconLeft: "plus",
      onClick: function () {
        toast('Grupo criado');
      }
    }, "Novo grupo")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, gr.map(function (g) {
      const on = open === g.id;
      const disp = g.chaves.filter(function (k) {
        return !k.u;
      }).length;
      return /*#__PURE__*/React.createElement(Card, {
        key: g.id,
        padding: 0
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function () {
          setOpen(on ? null : g.id);
        },
        style: {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px 20px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          textAlign: 'left'
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: "key-round",
        size: 18
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 700
        }
      }, g.nome), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--text-secondary)'
        }
      }, g.operador + ' · ' + g.plataforma)), /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        variant: "soft",
        tone: "green"
      }, disp + ' disponíveis'), /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        variant: "soft",
        tone: "gray"
      }, g.chaves.length + ' chaves'), /*#__PURE__*/React.createElement(DS.Icon, {
        name: on ? 'chevron-up' : 'chevron-down',
        size: 18
      })), on ? /*#__PURE__*/React.createElement("div", {
        style: {
          borderTop: '1px solid var(--border-subtle)',
          padding: '8px 20px 16px'
        }
      }, g.chaves.map(function (k, i) {
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '8px 0',
            borderBottom: i < g.chaves.length - 1 ? '1px solid var(--border-subtle)' : 'none'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            width: 80,
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--text-secondary)'
          }
        }, k.t), /*#__PURE__*/React.createElement("span", {
          style: {
            flex: 1,
            fontFamily: 'ui-monospace,monospace',
            fontSize: 13
          }
        }, k.v), /*#__PURE__*/React.createElement(Badge, {
          size: "sm",
          tone: k.u ? 'gray' : 'green'
        }, k.u ? 'Usada' : 'Disponível'), /*#__PURE__*/React.createElement(IconButton, {
          icon: "copy",
          size: 28,
          iconSize: 14,
          onClick: function () {
            toast('Chave copiada');
          }
        }), k.u ? /*#__PURE__*/React.createElement(Button, {
          size: "sm",
          variant: "ghost",
          onClick: function () {
            setGr(gr.map(function (x) {
              return x.id !== g.id ? x : Object.assign({}, x, {
                chaves: x.chaves.map(function (y, j) {
                  return j === i ? Object.assign({}, y, {
                    u: false
                  }) : y;
                })
              });
            }));
            toast('Chave liberada');
          }
        }, "Liberar") : null);
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 10
        }
      }, /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "secondary",
        iconLeft: "plus",
        onClick: function () {
          toast('Chave adicionada');
        }
      }, "Adicionar chave"))) : null);
    })));
  }
  function MetasTab() {
    const {
      Card,
      Button,
      Modal,
      Input,
      Select,
      IconButton,
      Badge
    } = DS;
    const [open, setOpen] = React.useState(false);
    const metas = [{
      nome: 'Meta coletiva de setembro',
      alvo: 250000,
      atual: 197060,
      tipo: 'Resultado',
      rec: 'Bônus de 2% na comissão'
    }, {
      nome: '100 cooperações no mês',
      alvo: 100,
      atual: 74,
      tipo: 'Cooperações',
      rec: 'Jantar da equipe'
    }, {
      nome: 'Depositantes novos',
      alvo: 2000,
      atual: 1746,
      tipo: 'Depositantes',
      rec: 'R$ 500 para o top 3'
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      iconLeft: "plus",
      onClick: function () {
        setOpen(true);
      }
    }, "Nova meta")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
        gap: 20
      }
    }, metas.map(function (m) {
      const p = Math.min(100, Math.round(m.atual / m.alvo * 100));
      const money = m.tipo === 'Resultado';
      return /*#__PURE__*/React.createElement(Card, {
        key: m.nome
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'var(--ms7-lime-100)',
          color: 'var(--ms7-green-900)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: "target",
        size: 18
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("b", {
        style: {
          fontSize: 16
        }
      }, m.nome), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--text-secondary)'
        }
      }, m.tipo)), /*#__PURE__*/React.createElement(IconButton, {
        icon: "pencil",
        size: 28,
        iconSize: 14
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          margin: '16px 0 6px'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 20,
          fontWeight: 800
        }
      }, money ? MS7.brlK(m.atual) : MS7.num(m.atual)), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--text-secondary)'
        }
      }, 'de ' + (money ? MS7.brlK(m.alvo) : MS7.num(m.alvo)))), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 8,
          borderRadius: 4,
          background: 'var(--ms7-gray-100)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: p + '%',
          height: '100%',
          borderRadius: 4,
          background: 'var(--ms7-lime-600)'
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(Badge, {
        size: "sm",
        variant: "soft",
        tone: "purple"
      }, m.rec), /*#__PURE__*/React.createElement("b", {
        style: {
          fontSize: 13
        }
      }, p + '%')));
    })), /*#__PURE__*/React.createElement(Modal, {
      open: open,
      onClose: function () {
        setOpen(false);
      },
      title: "Nova meta",
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: function () {
          setOpen(false);
        }
      }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
        variant: "brand",
        onClick: function () {
          setOpen(false);
          toast('Meta criada');
        }
      }, "Salvar"))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1 / -1'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Nome da meta",
      required: true
    })), /*#__PURE__*/React.createElement(Input, {
      label: "Valor alvo",
      required: true,
      prefix: "R$"
    }), /*#__PURE__*/React.createElement(Select, {
      label: "Tipo de m\xE9trica",
      options: ['Resultado', 'Cooperações', 'Depositantes', 'Comissão']
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: '1 / -1'
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Descri\xE7\xE3o da recompensa",
      multiline: true,
      rows: 2
    })))));
  }
  function CuponsTab() {
    const {
      Card,
      DataTable,
      Badge,
      Select
    } = DS;
    const rows = [{
      c: 'MS7VIP',
      s: 'Ativo',
      d: '15%',
      u: 42,
      dm: 1260,
      r: 7140,
      v: '31/12/2026'
    }, {
      c: 'BEMVINDO10',
      s: 'Ativo',
      d: '10%',
      u: 67,
      dm: 890,
      r: 8010,
      v: '30/11/2026'
    }, {
      c: 'EQUIPE20',
      s: 'Ativo',
      d: '20%',
      u: 18,
      dm: 760,
      r: 3040,
      v: '15/10/2026'
    }, {
      c: 'AGOSTO5',
      s: 'Expirado',
      d: '5%',
      u: 0,
      dm: 0,
      r: 0,
      v: '31/08/2026'
    }];
    const s = function (k) {
      return rows.reduce(function (a, r) {
        return a + r[k];
      }, 0);
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement(KpiRow, {
      items: [{
        icon: 'ticket',
        label: 'Cupons usados',
        value: rows.filter(function (r) {
          return r.u;
        }).length,
        tone: 'blue'
      }, {
        icon: 'repeat',
        label: 'Aplicações',
        value: s('u'),
        tone: 'yellow'
      }, {
        icon: 'badge-percent',
        label: 'Descontos concedidos',
        value: MS7.brlK(s('dm')),
        tone: 'orange'
      }, {
        icon: 'trending-up',
        label: 'Receita líquida',
        value: MS7.brlK(s('r')),
        tone: 'green'
      }]
    }), /*#__PURE__*/React.createElement(Card, {
      title: "Cupons cadastrados",
      action: /*#__PURE__*/React.createElement(Select, {
        variant: "pill",
        options: ['Setembro 2026', 'Agosto 2026']
      })
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: rows,
      rowKey: "c",
      columns: [{
        key: 'c',
        label: 'Código',
        render: function (r) {
          return /*#__PURE__*/React.createElement("span", {
            style: {
              fontFamily: 'ui-monospace,monospace',
              fontWeight: 700
            }
          }, r.c);
        }
      }, {
        key: 's',
        label: 'Status',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Badge, {
            size: "sm",
            tone: r.s === 'Ativo' ? 'green' : 'gray'
          }, r.s);
        }
      }, {
        key: 'd',
        label: 'Desconto',
        align: 'center'
      }, {
        key: 'u',
        label: 'Usos (mês)',
        align: 'right'
      }, {
        key: 'dm',
        label: 'Descontos (mês)',
        align: 'right',
        render: function (r) {
          return MS7.brl(r.dm);
        }
      }, {
        key: 'r',
        label: 'Receita (mês)',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement("b", null, MS7.brl(r.r));
        }
      }, {
        key: 'v',
        label: 'Validade',
        align: 'right'
      }]
    })));
  }
  function RankingTab() {
    const {
      Card,
      Tabs,
      DataTable,
      Badge
    } = DS;
    const [t, setT] = React.useState('op');
    const rows = (t === 'op' ? MS7.operadores.map(function (o) {
      return {
        nome: o.nome,
        v: o.resultado,
        x: o.coops + ' coops'
      };
    }) : MS7.alunos.map(function (a) {
      return {
        nome: a.nome,
        v: a.resultado,
        x: a.contas + ' contas'
      };
    })).sort(function (a, b) {
      return b.v - a.v;
    }).map(function (r, i) {
      return Object.assign({
        pos: i + 1
      }, r);
    });
    return /*#__PURE__*/React.createElement(Card, {
      title: "Ranking",
      action: /*#__PURE__*/React.createElement(Tabs, {
        variant: "chips",
        value: t,
        onChange: setT,
        items: [{
          id: 'op',
          label: 'Operadores'
        }, {
          id: 'al',
          label: 'Alunos'
        }]
      })
    }, /*#__PURE__*/React.createElement(DataTable, {
      rows: rows,
      rowKey: "nome",
      columns: [{
        key: 'pos',
        label: '#',
        width: 60,
        render: function (r) {
          return /*#__PURE__*/React.createElement("span", {
            style: {
              width: 28,
              height: 28,
              borderRadius: 8,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 12,
              background: r.pos === 1 ? 'var(--ms7-lime-500)' : r.pos <= 3 ? 'var(--ms7-gray-100)' : 'transparent',
              color: r.pos === 1 ? 'var(--ms7-green-900)' : 'inherit'
            }
          }, String(r.pos).padStart(2, '0'));
        }
      }, {
        key: 'nome',
        label: 'Nome',
        render: function (r) {
          return /*#__PURE__*/React.createElement("b", null, r.nome);
        }
      }, {
        key: 'x',
        label: 'Volume'
      }, {
        key: 'v',
        label: 'Resultado',
        align: 'right',
        render: function (r) {
          return /*#__PURE__*/React.createElement(Money, {
            v: r.v,
            signed: true
          });
        }
      }, {
        key: 'b',
        label: '',
        align: 'right',
        render: function (r) {
          return r.pos === 1 ? /*#__PURE__*/React.createElement(Badge, {
            size: "sm",
            tone: "green"
          }, "L\xEDder") : null;
        }
      }]
    }));
  }
  function NotificacoesTab() {
    const {
      Card,
      Switch,
      Input,
      Select,
      Button
    } = DS;
    const [tpl, setTpl] = React.useState([{
      id: 1,
      nome: 'Conta importada',
      on: true,
      para: 'Operador responsável',
      txt: 'Nova conta {usuario} importada na cooperação {cooperacao}.'
    }, {
      id: 2,
      nome: 'Cooperação concluída',
      on: true,
      para: 'Admins',
      txt: 'A cooperação {cooperacao} foi concluída com resultado {resultado}.'
    }, {
      id: 3,
      nome: 'Chave PIX esgotando',
      on: false,
      para: 'Admins',
      txt: 'O grupo {grupo} tem apenas {disponiveis} chaves disponíveis.'
    }, {
      id: 4,
      nome: 'Pagamento de assinatura',
      on: true,
      para: 'Dono da conta',
      txt: 'Sua assinatura vence em {dias} dias. Valor: {valor}.'
    }]);
    const [sel, setSel] = React.useState(1);
    const cur = tpl.find(function (t) {
      return t.id === sel;
    });
    return /*#__PURE__*/React.createElement(Grid, {
      min: 300
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Modelos"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, tpl.map(function (t) {
      const on = t.id === sel;
      return /*#__PURE__*/React.createElement("div", {
        key: t.id,
        onClick: function () {
          setSel(t.id);
        },
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 12px',
          borderRadius: 10,
          cursor: 'pointer',
          background: on ? 'var(--ms7-lime-100)' : 'transparent'
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: "bell",
        size: 16
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          fontSize: 14,
          fontWeight: 600,
          color: on ? 'var(--ms7-green-900)' : 'var(--text-primary)'
        }
      }, t.nome), /*#__PURE__*/React.createElement("span", {
        onClick: function (e) {
          e.stopPropagation();
        }
      }, /*#__PURE__*/React.createElement(Switch, {
        checked: t.on,
        onChange: function (v) {
          setTpl(tpl.map(function (x) {
            return x.id === t.id ? Object.assign({}, x, {
              on: v
            }) : x;
          }));
        }
      })));
    }))), /*#__PURE__*/React.createElement(Card, {
      title: cur.nome
    }, /*#__PURE__*/React.createElement(Hint, null, "Personalize o texto de cada notifica\xE7\xE3o, ative ou desative e defina quem recebe cada alerta."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Quem recebe",
      value: cur.para,
      onChange: function (e) {
        setTpl(tpl.map(function (x) {
          return x.id === cur.id ? Object.assign({}, x, {
            para: e.target.value
          }) : x;
        }));
      },
      options: ['Operador responsável', 'Admins', 'Dono da conta', 'Todos os usuários']
    }), /*#__PURE__*/React.createElement(Input, {
      key: cur.id,
      label: "Mensagem",
      multiline: true,
      rows: 4,
      defaultValue: cur.txt,
      hint: "Use {variavel} para inserir dados automaticamente."
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      iconLeft: "send",
      onClick: function () {
        toast('Teste enviado');
      }
    }, "Enviar teste"), /*#__PURE__*/React.createElement(Button, {
      variant: "brand",
      iconLeft: "check",
      onClick: function () {
        toast('Modelo salvo');
      }
    }, "Salvar")))));
  }
  window.getPixGrupos = function () {
    try {
      return JSON.parse(localStorage.getItem('ms7op-p-pix')) || pixGrupos;
    } catch (e) {
      return pixGrupos;
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
    NotificacoesTab: NotificacoesTab
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operacoes/ScreensGestao.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operacoes/Shared.jsx
try { (() => {
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  function KpiRow({
    items,
    min
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(' + (min || 200) + 'px,1fr))',
        gap: 16
      }
    }, items.map(function (k) {
      const lab = k.signed != null && k.signed < 0 && /Lucro/i.test(k.label) ? k.label.replace(/Lucro líquido|Lucro/i, 'Prejuízo') : k.label;
      return /*#__PURE__*/React.createElement(DS.StatCard, {
        key: k.label,
        variant: "compact",
        icon: k.icon,
        value: k.value,
        label: lab,
        tone: k.tone,
        trend: k.trend,
        trendTone: k.trendTone,
        valueColor: k.signed == null ? undefined : k.signed >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)'
      });
    }));
  }
  function PeriodBar({
    value,
    onChange,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(DS.Tabs, {
      variant: "chips",
      value: value,
      onChange: onChange,
      items: ['Hoje', '7 dias', '30 dias', 'Todos']
    }), children, /*#__PURE__*/React.createElement(DS.Button, {
      size: "sm",
      variant: "ghost",
      iconLeft: "refresh-cw",
      style: {
        marginLeft: 'auto'
      },
      onClick: function () {
        toast('Dados atualizados');
      }
    }, "Atualizar"));
  }
  function Grid({
    cols,
    min,
    children,
    gap
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: cols || 'repeat(auto-fit,minmax(' + (min || 320) + 'px,1fr))',
        gap: gap || 24,
        alignItems: 'start'
      }
    }, children);
  }
  function Money({
    v,
    signed
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
        color: signed ? v >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)' : 'inherit'
      }
    }, MS7.brl(v));
  }
  function Empty({
    icon,
    title,
    sub
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '36px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 12,
        background: 'var(--ms7-gray-100)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(DS.Icon, {
      name: icon || 'inbox',
      size: 22
    })), /*#__PURE__*/React.createElement("b", {
      style: {
        fontSize: 15
      }
    }, title), sub ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--text-secondary)',
        fontWeight: 500
      }
    }, sub) : null);
  }
  function RankList({
    rows,
    valueKey,
    fmt
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, rows.map(function (r, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: r.nome,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 0',
          borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 24,
          height: 24,
          borderRadius: 6,
          background: i === 0 ? 'var(--ms7-lime-500)' : 'var(--ms7-gray-100)',
          color: i === 0 ? 'var(--ms7-green-900)' : 'var(--text-primary)',
          fontSize: 11,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          fontSize: 14,
          fontWeight: 600
        }
      }, r.nome), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--ms7-green)'
        }
      }, (fmt || MS7.brl)(r[valueKey])));
    }));
  }
  let setToastRef = null;
  function toast(msg) {
    if (setToastRef) setToastRef(msg);
  }
  function Toaster() {
    const [m, setM] = React.useState(null);
    setToastRef = setM;
    React.useEffect(function () {
      if (!m) return;
      const t = setTimeout(function () {
        setM(null);
      }, 2400);
      return function () {
        clearTimeout(t);
      };
    }, [m]);
    return m ? /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2000,
        background: 'var(--ms7-black)',
        color: '#fff',
        padding: '12px 18px',
        borderRadius: 12,
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        boxShadow: 'var(--shadow-pop)'
      }
    }, /*#__PURE__*/React.createElement(DS.Icon, {
      name: "circle-check",
      size: 18,
      color: "var(--ms7-lime-500)"
    }), m) : null;
  }
  function Hint({
    children
  }) {
    return /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '0 0 14px',
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-secondary)'
      }
    }, children);
  }
  const NKEY = 'ms7op-notifs',
    PKEY = 'ms7op-notif-prefs';
  const NTYPES = {
    ciclo: {
      label: 'Ciclo de contas fechado',
      icon: 'repeat',
      tone: 'var(--ms7-blue)'
    },
    inicio: {
      label: 'Cooperação iniciada',
      icon: 'play',
      tone: 'var(--ms7-green)'
    },
    fim: {
      label: 'Cooperação finalizada',
      icon: 'flag',
      tone: 'var(--ms7-purple)'
    },
    bloqueio: {
      label: 'Conta bloqueada',
      icon: 'shield-alert',
      tone: 'var(--ms7-error)'
    }
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
    return Object.assign({
      ciclo: true,
      inicio: true,
      fim: true,
      bloqueio: true
    }, readJ(PKEY, {}));
  }
  function setPref(k, v) {
    const p = getPrefs();
    p[k] = v;
    localStorage.setItem(PKEY, JSON.stringify(p));
  }
  if (!localStorage.getItem(NKEY)) {
    localStorage.setItem(NKEY, JSON.stringify([{
      id: 1,
      type: 'bloqueio',
      title: 'Conta bloqueada — Vértice',
      body: 'Operador: Diego Ramos\nConta: caio512 (C-1046)\nDepósito retido: R$ 740,00',
      at: '18:42',
      read: false
    }, {
      id: 2,
      type: 'ciclo',
      title: 'Ciclo fechado — Equipe Aurora (C-1047)',
      body: 'Operador: Bruna Costa\nDepósito: R$ 12.480,00 · Saque: R$ 15.920,00\nResultado: LUCRO de R$ 3.440,00',
      at: '17:05',
      read: false
    }, {
      id: 3,
      type: 'inicio',
      title: 'Cooperação iniciada — Grupo Horizonte (C-1048)',
      body: 'Operador: Lucas Martins\nPlataforma: Vértice · 32 depositantes',
      at: '09:12',
      read: true
    }]));
  }
  const nsubs = [];
  let pushRef = null;
  function getNotifs() {
    return readJ(NKEY, []);
  }
  function saveNotifs(l) {
    localStorage.setItem(NKEY, JSON.stringify(l));
    nsubs.forEach(function (f) {
      f(l);
    });
  }
  function notify(n) {
    if (getPrefs()[n.type] === false) {
      toast(NTYPES[n.type].label + ' (notificação desativada)');
      return;
    }
    const it = Object.assign({
      id: Date.now() + Math.random(),
      at: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      read: false
    }, n);
    saveNotifs([it].concat(getNotifs()).slice(0, 60));
    if (pushRef) pushRef(it);
    if (window.ms7Push) {
      const b = String(it.body || '').replace(/\*/g, '');
      if (!window.ms7Push.remote(it.title, b, it.type) && getPrefs().__device !== false) window.ms7Push.show(it.title, b, it.type);
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
    React.useEffect(function () {
      if (!it) return;
      const t = setTimeout(function () {
        setIt(null);
      }, 7000);
      return function () {
        clearTimeout(t);
      };
    }, [it]);
    if (!it) return null;
    const T = NTYPES[it.type];
    return /*#__PURE__*/React.createElement("div", {
      onClick: function () {
        setIt(null);
      },
      style: {
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 2100,
        width: 360,
        maxWidth: 'calc(100vw - 40px)',
        background: 'rgba(28,30,28,0.96)',
        backdropFilter: 'blur(12px)',
        color: '#F3F5F2',
        borderRadius: 18,
        padding: 14,
        boxShadow: '0 16px 40px rgba(0,0,0,.35)',
        fontFamily: 'var(--font-sans)',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12,
        fontWeight: 600,
        color: '#B8BEB7',
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: 6,
        background: '#2AABEE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(DS.Icon, {
      name: "send",
      size: 12,
      color: "#fff",
      strokeWidth: 2.2
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, "TELEGRAM \xB7 MS7 Bot"), /*#__PURE__*/React.createElement("span", null, "agora")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 10,
        background: T.tone,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(DS.Icon, {
      name: T.icon,
      size: 18,
      color: "#fff",
      strokeWidth: 2
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 2
      }
    }, it.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 500,
        lineHeight: 1.45,
        whiteSpace: 'pre-line',
        color: '#DADFD9'
      }
    }, it.body))));
  }
  function NotifPanel({
    onClose
  }) {
    const l = useNotifs();
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 1500
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: function (e) {
        e.stopPropagation();
      },
      style: {
        position: 'absolute',
        top: 84,
        right: 32,
        width: 400,
        maxWidth: 'calc(100vw - 32px)',
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface-card)',
        color: 'var(--text-primary)',
        borderRadius: 16,
        boxShadow: 'var(--shadow-pop)',
        fontFamily: 'var(--font-sans)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '14px 16px',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        flex: 1,
        fontSize: 16
      }
    }, "Notifica\xE7\xF5es"), /*#__PURE__*/React.createElement(DS.Button, {
      size: "sm",
      variant: "ghost",
      onClick: function () {
        saveNotifs(l.map(function (n) {
          return Object.assign({}, n, {
            read: true
          });
        }));
      }
    }, "Marcar como lidas")), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowY: 'auto'
      }
    }, l.length ? l.map(function (n) {
      const T = NTYPES[n.type] || NTYPES.ciclo;
      return /*#__PURE__*/React.createElement("div", {
        key: n.id,
        style: {
          display: 'flex',
          gap: 10,
          padding: '12px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          background: n.read ? 'transparent' : 'var(--ms7-gray-50)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 32,
          height: 32,
          borderRadius: 9,
          background: T.tone,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement(DS.Icon, {
        name: T.icon,
        size: 16,
        color: "#fff",
        strokeWidth: 2
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("b", {
        style: {
          flex: 1,
          fontSize: 13
        }
      }, n.title), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--text-secondary)'
        }
      }, n.at)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 1.45,
          whiteSpace: 'pre-line',
          color: 'var(--text-secondary)',
          marginTop: 2
        }
      }, n.body)));
    }) : /*#__PURE__*/React.createElement(Empty, {
      icon: "bell",
      title: "Sem notifica\xE7\xF5es"
    }))));
  }
  Object.assign(window, {
    notify: notify,
    useNotifs: useNotifs,
    NotifPanel: NotifPanel,
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
    Hint: Hint
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operacoes/Shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/operacoes/data.js
try { (() => {
(function () {
  let s = 7;
  function rnd() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  }
  function brl(v) {
    return Number(v).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
  function num(v) {
    return Number(v).toLocaleString('pt-BR');
  }
  const operadores = [{
    id: 'op1',
    nome: 'Lucas Martins',
    resultado: 48210,
    comissao: 7230,
    coops: 32,
    ativas: 4,
    depositantes: 412,
    bloqueadas: 1,
    aSacar: 6,
    ciclo: 7,
    pct: 15,
    ativo: true
  }, {
    id: 'op2',
    nome: 'Bruna Costa',
    resultado: 41980,
    comissao: 6297,
    coops: 28,
    ativas: 3,
    depositantes: 365,
    bloqueadas: 0,
    aSacar: 4,
    ciclo: 7,
    pct: 15,
    ativo: true
  }, {
    id: 'op3',
    nome: 'Diego Ramos',
    resultado: 35640,
    comissao: 5346,
    coops: 25,
    ativas: 3,
    depositantes: 318,
    bloqueadas: 2,
    aSacar: 3,
    ciclo: 14,
    pct: 15,
    ativo: true
  }, {
    id: 'op4',
    nome: 'Carla Mendes',
    resultado: 29870,
    comissao: 4480,
    coops: 21,
    ativas: 2,
    depositantes: 274,
    bloqueadas: 0,
    aSacar: 5,
    ciclo: 7,
    pct: 15,
    ativo: true
  }, {
    id: 'op5',
    nome: 'Felipe Araújo',
    resultado: 22410,
    comissao: 3361,
    coops: 17,
    ativas: 1,
    depositantes: 201,
    bloqueadas: 1,
    aSacar: 2,
    ciclo: 14,
    pct: 15,
    ativo: true
  }, {
    id: 'op6',
    nome: 'Renata Silva',
    resultado: 18950,
    comissao: 2842,
    coops: 14,
    ativas: 1,
    depositantes: 176,
    bloqueadas: 0,
    aSacar: 1,
    ciclo: 7,
    pct: 12,
    ativo: false
  }];
  operadores.forEach(function (o, i) {
    o.contas = [86, 74, 68, 55, 41, 33][i];
    o.bloqueadas = [4, 2, 6, 3, 5, 1][i];
    o.custo = Math.round(o.contas * [27.5, 28.1, 29.4, 26.8, 31.2, 30.5][i]);
    o.lucro = o.resultado - o.comissao - o.custo;
    o.roi = o.lucro / (o.comissao + o.custo) * 100;
    o.custoConta = o.custo / o.contas;
  });
  const plataformas = [{
    nome: 'Vértice',
    resultado: 61240,
    coops: 44
  }, {
    nome: 'Lótus Bet',
    resultado: 48720,
    coops: 36
  }, {
    nome: 'NovaPlay',
    resultado: 39310,
    coops: 29
  }, {
    nome: 'Arena7',
    resultado: 28150,
    coops: 18
  }, {
    nome: 'Prime',
    resultado: 19640,
    coops: 10
  }];
  const redes = ['Alfa', 'Sol', 'Norte', 'Atlas', 'Ícaro', 'Delta', 'Vega', 'Orion'].map(function (n, i) {
    const r = Math.round(38000 - i * 4100 + rnd() * 2000);
    const d = Math.round(260 - i * 24 + rnd() * 20);
    return {
      nome: 'Rede ' + n,
      resultado: r,
      comissao: Math.round(r * 0.15),
      depositantes: d,
      porDepo: r / d
    };
  });
  const status = ['Em andamento', 'Em andamento', 'Ativa', 'Em andamento', 'Concluída', 'Concluída', 'Ativa', 'Concluída'];
  const cooperacoes = status.map(function (st, i) {
    const op = operadores[i % 6];
    const pl = plataformas[i % 5];
    const dep = Math.round(8000 + rnd() * 14000);
    const red = Math.round(dep * 0.35);
    const saq = Math.round(dep * (1.05 + rnd() * 0.3));
    const reemb = Math.round(rnd() * 600);
    return {
      id: 'C-' + (1048 - i),
      operador: op.nome,
      plataforma: pl.nome,
      rede: redes[i % 8].nome,
      cliente: ['Grupo Horizonte', 'Equipe Aurora', 'Clube Norte', 'Time Zênite', 'Grupo Prisma', 'Equipe Onda', 'Clube Âncora', 'Time Cobalto'][i],
      depositantes: Math.round(18 + rnd() * 40),
      deposito: dep,
      redeposito: red,
      saque: saq,
      reembolso: reemb,
      resultado: saq - dep - red + Math.round(dep * 0.4),
      status: st,
      inicio: 22 - i + '/09/2026',
      aSacar: Math.round(rnd() * 6),
      sacado: Math.round(4 + rnd() * 20),
      bloqueado: Math.round(rnd() * 2),
      comissao: '15%'
    };
  });
  const alunos = [{
    id: 'a1',
    nome: 'Mariana Lopes',
    email: 'mariana.lopes@email.com',
    ativo: true,
    criado: '02/06/2026',
    resultado: 8420,
    contas: 14
  }, {
    id: 'a2',
    nome: 'Thiago Souza',
    email: 'thiago.souza@email.com',
    ativo: true,
    criado: '11/06/2026',
    resultado: 7310,
    contas: 12
  }, {
    id: 'a3',
    nome: 'Aline Ferreira',
    email: 'aline.f@email.com',
    ativo: true,
    criado: '23/06/2026',
    resultado: 6180,
    contas: 11
  }, {
    id: 'a4',
    nome: 'Gustavo Pires',
    email: 'gustavo.pires@email.com',
    ativo: false,
    criado: '04/07/2026',
    resultado: 4950,
    contas: 8
  }, {
    id: 'a5',
    nome: 'Letícia Rocha',
    email: 'leticia.r@email.com',
    ativo: true,
    criado: '19/07/2026',
    resultado: 3870,
    contas: 7
  }, {
    id: 'a6',
    nome: 'Rodrigo Nunes',
    email: 'rodrigo.nunes@email.com',
    ativo: true,
    criado: '08/08/2026',
    resultado: 2640,
    contas: 5
  }];
  const grupos = ['Operadores sênior', 'Novatos', 'Rede Alfa', 'Financeiro'];
  const avisos = [{
    id: 1,
    titulo: 'Manutenção programada',
    conteudo: 'O painel ficará indisponível no domingo, das 03h às 04h, para atualização do servidor.',
    data: '22/09/2026 09:12',
    publico: 'Todos os usuários'
  }, {
    id: 2,
    titulo: 'Nova meta de setembro',
    conteudo: 'Meta coletiva de R$ 250 mil em resultado. Bônus de 2% na comissão para quem bater a meta individual.',
    data: '18/09/2026 14:40',
    publico: 'Operadores sênior, Novatos'
  }, {
    id: 3,
    titulo: 'Atualização das chaves PIX',
    conteudo: 'Chaves antigas do grupo Rede Alfa foram liberadas. Reserve novas chaves antes de abrir cooperações.',
    data: '15/09/2026 08:05',
    publico: 'Rede Alfa'
  }];
  const heat = [0, 1, 2, 3, 4, 5, 6].map(function (d) {
    return Array.from({
      length: 24
    }).map(function (_, h) {
      const eve = Math.exp(-Math.pow((h - 21) / 3, 2));
      const lunch = 0.45 * Math.exp(-Math.pow((h - 13) / 2, 2));
      const wk = d >= 4 ? 1.3 : 1;
      return Math.round((eve + lunch + 0.05) * wk * 2400 * (0.8 + rnd() * 0.4));
    });
  });
  const diasTotal = 30,
    diasPass = 22;
  const diario = Array.from({
    length: diasPass
  }).map(function () {
    return Math.round(5200 + rnd() * 3600);
  });
  const custosCats = [{
    id: 'proxy',
    label: 'Proxies',
    color: 'var(--ms7-green)'
  }, {
    id: 'servidor',
    label: 'Servidores',
    color: 'var(--ms7-blue)'
  }, {
    id: 'software',
    label: 'Softwares',
    color: 'var(--ms7-purple)'
  }, {
    id: 'bots',
    label: 'Bots / Telegram',
    color: 'var(--ms7-orange)'
  }, {
    id: 'outros',
    label: 'Outros',
    color: 'var(--ms7-gray-500)'
  }];
  const custos = [{
    id: 1,
    comp: '09/2026',
    cat: 'proxy',
    desc: 'Pacote 50 proxies residenciais',
    valor: 1890
  }, {
    id: 2,
    comp: '09/2026',
    cat: 'servidor',
    desc: 'VPS dedicado — 2 instâncias',
    valor: 640
  }, {
    id: 3,
    comp: '09/2026',
    cat: 'software',
    desc: 'Licença antidetect (10 perfis)',
    valor: 520
  }, {
    id: 4,
    comp: '09/2026',
    cat: 'bots',
    desc: 'Bot de automação Telegram',
    valor: 290
  }, {
    id: 5,
    comp: '08/2026',
    cat: 'proxy',
    desc: 'Pacote 40 proxies residenciais',
    valor: 1560
  }, {
    id: 6,
    comp: '08/2026',
    cat: 'outros',
    desc: 'Chips e recargas',
    valor: 310
  }];
  const folhaSemanas = [{
    label: '25/08',
    v: [5120, 3980]
  }, {
    label: '01/09',
    v: [6240, 4410]
  }, {
    label: '08/09',
    v: [7010, 5120]
  }, {
    label: '15/09',
    v: [6680, 4870]
  }, {
    label: '22/09',
    v: [4520, 2310]
  }];
  const folha = operadores.map(function (o, i) {
    return {
      id: o.id,
      nome: o.nome,
      coops: o.coops,
      resultado: o.resultado,
      pct: o.pct,
      comissao: o.comissao,
      salario: i < 2 ? 1500 : 0,
      pago: i === 0 || i === 3
    };
  });
  const contas = cooperacoes.slice(0, 6).flatMap(function (c, i) {
    return [0, 1].map(function (j) {
      const d = Math.round(300 + rnd() * 900);
      const sq = Math.round(d * (0.8 + rnd() * 0.8));
      return {
        id: c.id + '-' + j,
        operador: c.operador,
        plataforma: c.plataforma,
        usuario: ['ana', 'bruno', 'caio', 'duda', 'edu', 'fabi', 'gabi', 'hugo', 'iris', 'joao', 'kaka', 'lia'][i * 2 + j] + Math.round(100 + rnd() * 800),
        deposito: d,
        redeposito: Math.round(d * 0.3),
        saque: sq,
        resultado: sq - d,
        status: ['Sacado', 'À sacar', 'Aguardando', 'Sacado', 'Bloqueado', 'Não sacado'][(i + j) % 6],
        r: (i + j) % 4 === 0,
        criada: 20 - i + '/09'
      };
    });
  });
  const listas = [{
    id: 1,
    nome: 'Base Vértice — setembro',
    descricao: 'Contas verificadas para cooperações na Vértice.',
    contas: 48,
    dono: 'Admin'
  }, {
    id: 2,
    nome: 'Reserva Lótus Bet',
    descricao: 'Contas de reposição, prontas para importar.',
    contas: 22,
    dono: 'Lucas Martins'
  }, {
    id: 3,
    nome: 'Telegram — lote 12',
    descricao: 'Importada do grupo do Telegram em 19/09.',
    contas: 31,
    dono: 'Bruna Costa'
  }];
  const proxies = [{
    id: 1,
    label: 'Residencial BR #01',
    login: 'ms7u01',
    host: 'proxy.marceloproxies.com.br',
    port: '823',
    status: 'Ativa',
    expira: '14/10/2026',
    uso: 62
  }, {
    id: 2,
    label: 'Residencial BR #02',
    login: 'ms7u02',
    host: 'proxy.marceloproxies.com.br',
    port: '823',
    status: 'Expirando',
    expira: '25/09/2026',
    uso: 91
  }, {
    id: 3,
    label: 'Mobile 4G SP',
    login: 'ms7m01',
    host: 'proxy.marceloproxies.com.br',
    port: '823',
    status: 'Expirada',
    expira: '10/09/2026',
    uso: 100
  }];
  const proxyProdutos = [{
    id: 'p1',
    nome: 'Residencial 1 GB',
    desc: 'IPs residenciais rotativos no Brasil.',
    preco: 39.9
  }, {
    id: 'p2',
    nome: 'Residencial 5 GB',
    desc: 'Melhor custo para equipes pequenas.',
    preco: 169.9
  }, {
    id: 'p3',
    nome: 'Mobile 4G dedicado',
    desc: 'IP móvel exclusivo, 30 dias.',
    preco: 249.9
  }];
  const planos = [{
    id: 'starter',
    nome: 'Starter',
    seats: 5,
    preco: 147
  }, {
    id: 'pro',
    nome: 'Pro',
    seats: 10,
    preco: 297
  }, {
    id: 'scale',
    nome: 'Scale',
    seats: 25,
    preco: 597
  }];
  const tenants = [{
    id: 1,
    tenant: 'MS7 Operações',
    owner: 'marcelo@ms7.com',
    status: 'Ativa',
    plano: 'Pro',
    uso: '6/10',
    cobranca: 'R$ 297,00',
    proximo: '05/10/2026',
    cortesia: false
  }, {
    id: 2,
    tenant: 'Equipe Aurora',
    owner: 'contato@aurora.com',
    status: 'Ativa',
    plano: 'Scale',
    uso: '19/25',
    cobranca: 'R$ 597,00',
    proximo: '12/10/2026',
    cortesia: false
  }, {
    id: 3,
    tenant: 'Grupo Horizonte',
    owner: 'adm@horizonte.com',
    status: 'Em atraso',
    plano: 'Pro',
    uso: '10/10',
    cobranca: 'R$ 297,00',
    proximo: '18/09/2026',
    cortesia: false
  }, {
    id: 4,
    tenant: 'Clube Norte',
    owner: 'norte@clube.com',
    status: 'Cortesia',
    plano: 'Starter',
    uso: '3/5',
    cobranca: '—',
    proximo: '—',
    cortesia: true
  }, {
    id: 5,
    tenant: 'Time Zênite',
    owner: 'zenite@time.com',
    status: 'Cancelada',
    plano: 'Starter',
    uso: '0/5',
    cobranca: '—',
    proximo: '—',
    cortesia: false
  }, {
    id: 6,
    tenant: 'Equipe Onda',
    owner: 'onda@equipe.com',
    status: 'Suspensa',
    plano: 'Pro',
    uso: '8/10',
    cobranca: 'R$ 297,00',
    proximo: '—',
    cortesia: false
  }];
  function brlK(v) {
    v = Number(v);
    if (Math.abs(v) >= 1000000) return 'R$ ' + (v / 1000000).toLocaleString('pt-BR', {
      maximumFractionDigits: 1
    }) + ' mi';
    if (Math.abs(v) >= 10000) return 'R$ ' + (v / 1000).toLocaleString('pt-BR', {
      maximumFractionDigits: 1
    }) + ' mil';
    return brl(v);
  }
  window.MS7 = {
    brl: brl,
    brlK: brlK,
    num: num,
    operadores: operadores,
    plataformas: plataformas,
    redes: redes,
    cooperacoes: cooperacoes,
    alunos: alunos,
    grupos: grupos,
    avisos: avisos,
    heat: heat,
    diasTotal: diasTotal,
    diasPass: diasPass,
    diario: diario,
    custosCats: custosCats,
    custos: custos,
    folhaSemanas: folhaSemanas,
    folha: folha,
    contas: contas,
    listas: listas,
    proxies: proxies,
    proxyProdutos: proxyProdutos,
    planos: planos,
    tenants: tenants,
    statusTone: {
      'Em andamento': 'turquoise',
      'Ativa': 'green',
      'Concluída': 'blue',
      'Lixeira': 'gray',
      'Sacado': 'green',
      'À sacar': 'yellow',
      'Aguardando': 'gray',
      'Bloqueado': 'error',
      'Não sacado': 'orange',
      'Expirando': 'yellow',
      'Expirada': 'error',
      'Em atraso': 'yellow',
      'Cancelada': 'error',
      'Suspensa': 'error',
      'Cortesia': 'purple',
      'Pago': 'green',
      'Pendente': 'yellow'
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operacoes/data.js", error: String((e && e.message) || e) }); }

// ui_kits/operacoes/server/server.cjs
try { (() => {
const express = require('express');
const webpush = require('web-push');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const DATA = process.env.DATA_DIR || path.join(__dirname, 'data');
const ROOT = path.join(__dirname, '..', '..', '..');
const HAS_ROOT = fs.existsSync(path.join(ROOT, 'styles.css')) && fs.existsSync(path.join(ROOT, '_ds_bundle.js'));
const PUBLIC = process.env.PUBLIC_DIR || (HAS_ROOT ? ROOT : path.join(__dirname, '..'));
if (!HAS_ROOT && !process.env.PUBLIC_DIR) console.warn('\nAVISO: styles.css e _ds_bundle.js não foram encontrados. Baixe o projeto completo (não só a pasta operacoes).\n');
const PORT = process.env.PORT || 3000;
fs.mkdirSync(DATA, {
  recursive: true
});
const file = n => path.join(DATA, n);
const readJ = (n, d) => fs.existsSync(file(n)) ? JSON.parse(fs.readFileSync(file(n), 'utf8')) : d;
const writeJ = (n, v) => {
  fs.writeFileSync(file(n) + '.tmp', JSON.stringify(v, null, 2));
  fs.renameSync(file(n) + '.tmp', file(n));
};

// ---------- Segredos ----------
let secret = process.env.MS7_SECRET || readJ('secret.json', null)?.secret;
if (!secret) {
  secret = crypto.randomBytes(32).toString('hex');
  writeJ('secret.json', {
    secret
  });
}
let keys = process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY ? {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY
} : readJ('vapid.json', null);
if (!keys) {
  keys = webpush.generateVAPIDKeys();
  writeJ('vapid.json', keys);
}
webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:admin@ms7.com', keys.publicKey, keys.privateKey);

// ---------- Usuários ----------
const hash = (pw, salt = crypto.randomBytes(16).toString('hex')) => salt + ':' + crypto.scryptSync(pw, salt, 64).toString('hex');
const checkPw = (pw, h) => {
  const [salt, k] = h.split(':');
  const a = Buffer.from(k, 'hex');
  const b = crypto.scryptSync(pw, salt, 64);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};
let users = readJ('users.json', []);
if (!users.length) {
  const email = (process.env.ADMIN_EMAIL || 'admin@ms7.com').toLowerCase();
  const pw = process.env.ADMIN_PASSWORD || crypto.randomBytes(6).toString('base64url');
  users = [{
    id: 'u1',
    email,
    name: process.env.ADMIN_NAME || 'Marcelo',
    role: 'super',
    opId: null,
    ativo: true,
    pw: hash(pw)
  }];
  writeJ('users.json', users);
  console.log('\n=== Primeiro acesso ===\nEmail: ' + email + '\nSenha: ' + pw + '\nTroque a senha depois de entrar.\n');
}
const pub = u => ({
  id: u.id,
  email: u.email,
  name: u.name,
  role: u.role,
  opId: u.opId,
  ativo: u.ativo
});

// ---------- Token (HMAC, 30 dias) ----------
const b64 = s => Buffer.from(s).toString('base64url');
const sign = p => {
  const body = b64(JSON.stringify(p));
  return body + '.' + crypto.createHmac('sha256', secret).update(body).digest('base64url');
};
function verify(t) {
  if (!t || t.indexOf('.') < 0) return null;
  const [body, sig] = t.split('.');
  const exp = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  if (sig.length !== exp.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(exp))) return null;
  const p = JSON.parse(Buffer.from(body, 'base64url').toString());
  if (p.exp < Date.now()) return null;
  const u = users.find(x => x.id === p.uid && x.ativo);
  return u || null;
}
const isAdmin = u => u.role === 'admin' || u.role === 'super';
const auth = (req, res, next) => {
  const t = (req.get('authorization') || '').replace(/^Bearer /, '') || req.query.token;
  const u = verify(t);
  if (!u) return res.status(401).json({
    error: 'Sessão expirada. Entre novamente.'
  });
  req.user = u;
  next();
};
const adminOnly = (req, res, next) => isAdmin(req.user) ? next() : res.status(403).json({
  error: 'Acesso restrito ao administrador'
});
const app = express();
app.use((req, res, next) => req.method === 'PUT' && req.path === '/api/db' ? next() : express.json({
  limit: '100kb'
})(req, res, next));

// Limite simples de tentativas de login
const tries = new Map();
app.post('/api/auth/login', (req, res) => {
  const ip = req.ip;
  const t = tries.get(ip) || {
    n: 0,
    at: Date.now()
  };
  if (Date.now() - t.at > 15 * 60e3) {
    t.n = 0;
    t.at = Date.now();
  }
  if (t.n >= 10) return res.status(429).json({
    error: 'Muitas tentativas. Aguarde 15 minutos.'
  });
  const {
    email = '',
    password = ''
  } = req.body || {};
  const u = users.find(x => x.email === String(email).toLowerCase().trim());
  if (!u || !u.ativo || !checkPw(String(password), u.pw)) {
    t.n++;
    tries.set(ip, t);
    return res.status(401).json({
      error: 'Email ou senha incorretos'
    });
  }
  tries.delete(ip);
  res.json({
    token: sign({
      uid: u.id,
      exp: Date.now() + 30 * 864e5
    }),
    user: pub(u)
  });
});
app.get('/api/auth/me', auth, (req, res) => res.json({
  user: pub(req.user)
}));
app.post('/api/auth/password', auth, (req, res) => {
  const {
    current = '',
    next: nw = ''
  } = req.body || {};
  if (!checkPw(current, req.user.pw)) return res.status(400).json({
    error: 'Senha atual incorreta'
  });
  if (String(nw).length < 8) return res.status(400).json({
    error: 'A nova senha precisa de 8 caracteres'
  });
  req.user.pw = hash(nw);
  writeJ('users.json', users);
  res.json({
    ok: true
  });
});

// ---------- Gestão de acessos (só admin) ----------
app.get('/api/users', auth, adminOnly, (_req, res) => res.json(users.map(pub)));
app.post('/api/users', auth, adminOnly, (req, res) => {
  const {
    id,
    email,
    name,
    role = 'operador',
    opId = null,
    password,
    ativo = true
  } = req.body || {};
  if (role === 'super' && req.user.role !== 'super') return res.status(403).json({
    error: 'Só o Super Admin cria outro Super Admin'
  });
  if (!['admin', 'super', 'operador'].includes(role)) return res.status(400).json({
    error: 'Papel inválido'
  });
  if (role === 'operador' && !opId) return res.status(400).json({
    error: 'Vincule o acesso a um operador'
  });
  const em = String(email || '').toLowerCase().trim();
  if (!em) return res.status(400).json({
    error: 'Email obrigatório'
  });
  if (users.some(u => u.email === em && u.id !== id)) return res.status(400).json({
    error: 'Email já cadastrado'
  });
  let u = id && users.find(x => x.id === id);
  if (!u) {
    if (!password || String(password).length < 8) return res.status(400).json({
      error: 'Senha com no mínimo 8 caracteres'
    });
    u = {
      id: 'u' + Date.now()
    };
    users.push(u);
  }
  if (u.role === 'super' && req.user.role !== 'super') return res.status(403).json({
    error: 'Sem permissão'
  });
  Object.assign(u, {
    email: em,
    name: name || em,
    role,
    opId: role === 'operador' ? opId : null,
    ativo: !!ativo
  });
  if (password) u.pw = hash(String(password));
  writeJ('users.json', users);
  res.json(pub(u));
});
app.delete('/api/users/:id', auth, adminOnly, (req, res) => {
  const u = users.find(x => x.id === req.params.id);
  if (!u) return res.json({
    ok: true
  });
  if (u.id === req.user.id) return res.status(400).json({
    error: 'Você não pode remover o próprio acesso'
  });
  if (u.role === 'super' && req.user.role !== 'super') return res.status(403).json({
    error: 'Sem permissão'
  });
  users = users.filter(x => x.id !== u.id);
  writeJ('users.json', users);
  res.json({
    ok: true
  });
});

// ---------- Banco de dados central ----------
let store = readJ('db.json', {
  rev: 0,
  db: null
});
const COLS = ['operadores', 'coops', 'custos', 'pagamentos'];
function merge(cur, inc, cols) {
  if (!cur) return inc;
  const out = Object.assign({}, cur, {
    _del: Object.assign({}, cur._del)
  });
  for (const [k, v] of Object.entries(inc._del || {})) if (cols.includes(k.split(':')[0])) out._del[k] = v;
  for (const k of cols) {
    const map = new Map();
    for (const x of cur[k] || []) map.set(x.id, x);
    for (const x of inc[k] || []) {
      const o = map.get(x.id);
      if (!o || (x._u || 0) >= (o._u || 0)) map.set(x.id, x);
    }
    out[k] = [...map.values()].filter(x => {
      const d = out._del[k + ':' + x.id];
      return !d || (x._u || 0) > d;
    });
    const order = (inc[k] || []).map(x => x.id);
    out[k].sort((a, b) => {
      const ia = order.indexOf(a.id),
        ib = order.indexOf(b.id);
      return (ia < 0 ? 1e9 : ia) - (ib < 0 ? 1e9 : ib);
    });
  }
  if (cols.includes('config')) out.config = (inc.config && inc.config._u || 0) >= (cur.config && cur.config._u || 0) ? inc.config : cur.config;
  return out;
}
// O que cada papel enxerga
function viewFor(u, db) {
  if (!db || isAdmin(u)) return db;
  const me = (db.operadores || []).find(o => o.id === u.opId);
  return {
    v: db.v,
    operadores: me ? [{
      id: me.id,
      nome: me.nome,
      email: me.email,
      ciclo: me.ciclo,
      pct: me.pct,
      ativo: me.ativo
    }] : [],
    coops: (db.coops || []).filter(c => c.opId === u.opId),
    custos: [],
    pagamentos: (db.pagamentos || []).filter(p => p.opId === u.opId),
    config: {
      custoConta: db.config?.custoConta
    },
    _del: {},
    _restrito: true
  };
}
// O que o operador pode gravar: só as próprias cooperações (não pode mudar o dono nem apagar)
function sanitizeFromOperator(u, inc, cur) {
  const mine = new Set((cur?.coops || []).filter(c => c.opId === u.opId).map(c => c.id));
  const all = new Set((cur?.coops || []).map(c => c.id));
  const coops = (inc.coops || []).filter(c => c.opId === u.opId && (mine.has(c.id) || !all.has(c.id)));
  const curById = new Map((cur?.coops || []).map(c => [c.id, c]));
  for (const c of coops) {
    const o = curById.get(c.id);
    if (o) {
      c.comTipo = o.comTipo;
      c.comValor = o.comValor;
    }
  }
  return {
    coops,
    _del: {}
  };
}
const clients = new Map();
function broadcast() {
  for (const [res, u] of clients) res.write('data: ' + JSON.stringify({
    rev: store.rev
  }) + '\n\n');
}
app.get('/api/db', auth, (req, res) => res.json({
  rev: store.rev,
  db: viewFor(req.user, store.db),
  user: pub(req.user)
}));
app.put('/api/db', express.json({
  limit: '5mb'
}), auth, (req, res) => {
  let inc = req.body && req.body.db;
  if (!inc || !Array.isArray(inc.coops)) return res.status(400).json({
    error: 'db inválido'
  });
  if (!isAdmin(req.user)) {
    if (!store.db) return res.status(403).json({
      error: 'O administrador precisa enviar os dados primeiro'
    });
    inc = sanitizeFromOperator(req.user, inc, store.db);
    store = {
      rev: store.rev + 1,
      db: merge(store.db, inc, ['coops'])
    };
  } else {
    store = {
      rev: store.rev + 1,
      db: merge(store.db, inc, COLS.concat('config'))
    };
  }
  store.updatedAt = new Date().toISOString();
  writeJ('db.json', store);
  res.json({
    rev: store.rev,
    db: viewFor(req.user, store.db)
  });
  broadcast();
});
app.get('/api/events', auth, (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no'
  });
  res.flushHeaders();
  res.write('data: ' + JSON.stringify({
    rev: store.rev
  }) + '\n\n');
  clients.set(res, req.user);
  const ping = setInterval(() => res.write(': ping\n\n'), 25000);
  req.on('close', () => {
    clearInterval(ping);
    clients.delete(res);
  });
});

// ---------- Notificações ----------
const readSubs = () => readJ('subscriptions.json', []);
const writeSubs = l => writeJ('subscriptions.json', l);
app.get('/api/push/public-key', (_req, res) => res.json({
  publicKey: keys.publicKey
}));
app.post('/api/push/subscribe', auth, (req, res) => {
  const {
    subscription,
    device = ''
  } = req.body || {};
  if (!subscription?.endpoint) return res.status(400).json({
    error: 'subscription ausente'
  });
  const l = readSubs().filter(s => s.subscription.endpoint !== subscription.endpoint);
  l.push({
    subscription,
    uid: req.user.id,
    role: req.user.role,
    device,
    createdAt: new Date().toISOString()
  });
  writeSubs(l);
  res.json({
    ok: true
  });
});
app.post('/api/push/unsubscribe', auth, (req, res) => {
  writeSubs(readSubs().filter(s => s.subscription.endpoint !== req.body?.endpoint));
  res.json({
    ok: true
  });
});
// Qualquer usuário logado pode avisar os administradores; só admin escolhe outros destinos.
app.post('/api/push/notify', auth, async (req, res) => {
  const {
    title,
    body = '',
    tag,
    url = '/'
  } = req.body || {};
  const to = isAdmin(req.user) && Array.isArray(req.body?.to) ? req.body.to : ['admin', 'super'];
  if (!title) return res.status(400).json({
    error: 'title obrigatório'
  });
  const payload = JSON.stringify({
    title: String(title).slice(0, 120),
    body: String(body).slice(0, 500),
    tag,
    url
  });
  const subs = readSubs();
  const dead = [];
  let sent = 0;
  await Promise.all(subs.filter(s => to.includes(s.role)).map(async s => {
    try {
      await webpush.sendNotification(s.subscription, payload, {
        TTL: 3600
      });
      sent++;
    } catch (e) {
      if (e.statusCode === 404 || e.statusCode === 410) dead.push(s.subscription.endpoint);
    }
  }));
  if (dead.length) writeSubs(subs.filter(s => !dead.includes(s.subscription.endpoint)));
  res.json({
    ok: true,
    sent
  });
});
if (HAS_ROOT) app.get('/', (_req, res) => res.redirect('/ui_kits/operacoes/'));
app.use(express.static(PUBLIC, {
  index: 'index.html',
  dotfiles: 'deny'
}));
app.listen(PORT, () => console.log('MS7 Operações rodando em http://localhost:' + PORT));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operacoes/server/server.cjs", error: String((e && e.message) || e) }); }

// ui_kits/operacoes/store.js
try { (() => {
(function () {
  const KEY = 'ms7op-db-v2';
  const TODAY = new Date('2026-09-22T12:00:00');
  function iso(d) {
    return d.toISOString().slice(0, 10);
  }
  function daysAgo(n) {
    const d = new Date(TODAY);
    d.setDate(d.getDate() - n);
    return iso(d);
  }
  function fmtDate(s) {
    if (!s) return '—';
    const p = s.split('-');
    return p[2] + '/' + p[1];
  }
  let sd = 11;
  function rnd() {
    sd = (sd * 9301 + 49297) % 233280;
    return sd / 233280;
  }
  const CLIENTES = ['Grupo Horizonte', 'Equipe Aurora', 'Clube Norte', 'Time Zênite', 'Grupo Prisma', 'Equipe Onda', 'Clube Âncora', 'Time Cobalto', 'Grupo Ártico', 'Equipe Brasa', 'Clube Safira', 'Time Nômade', 'Grupo Lince', 'Equipe Farol'];
  const NOMES = ['ana', 'bruno', 'caio', 'duda', 'edu', 'fabi', 'gabi', 'hugo', 'iris', 'joao', 'kaka', 'lia', 'malu', 'nico', 'otto', 'paty', 'rafa', 'sara', 'tati', 'vini'];
  function seed() {
    sd = 11;
    const ops = MS7.operadores.map(function (o) {
      return {
        id: o.id,
        nome: o.nome,
        email: o.nome.toLowerCase().split(' ')[0] + '@ms7.com',
        ciclo: o.ciclo,
        pct: o.pct,
        ativo: o.ativo
      };
    });
    const ago = [0, 1, 2, 3, 0, 4, 6, 8, 10, 13, 16, 19, 23, 27];
    const coops = CLIENTES.map(function (cl, i) {
      const st = i < 4 ? 'Em andamento' : i === 4 ? 'Ativa' : 'Concluída';
      const tipo = ['pct', 'conta', 'fixo'][i % 3];
      const val = {
        pct: 15,
        conta: 25,
        fixo: 900
      }[tipo];
      const n = 5 + i % 4 * 2;
      const contas = [];
      for (let j = 0; j < n; j++) {
        const dep = Math.round(250 + rnd() * 650);
        const red = rnd() < 0.45 ? Math.round(dep * 0.3) : 0;
        let cs;
        if (st === 'Concluída') {
          const r = rnd();
          cs = r < 0.09 ? 'Bloqueado' : r < 0.16 ? 'Não sacado' : 'Sacado';
        } else {
          const r = rnd();
          cs = r < 0.08 ? 'Bloqueado' : r < 0.35 ? 'Aguardando' : r < 0.6 ? 'À sacar' : 'Sacado';
        }
        const saq = cs === 'Sacado' ? Math.round((dep + red) * (1.08 + rnd() * 0.55)) : 0;
        contas.push({
          id: 'k' + i + '-' + j,
          usuario: NOMES[(i * 3 + j) % 20] + Math.round(100 + rnd() * 899),
          senha: '••••••',
          deposito: dep,
          redeposito: red,
          saque: saq,
          status: cs,
          obs: '',
          criada: daysAgo(ago[i])
        });
      }
      return {
        id: 'C-' + (1048 - i),
        cliente: cl,
        opId: ops[i % 6].id,
        plataforma: MS7.plataformas[i % 5].nome,
        rede: MS7.redes[i % 8].nome,
        depositantes: n * 4,
        comTipo: tipo,
        comValor: val,
        status: st,
        inicio: daysAgo(ago[i]),
        fim: st === 'Concluída' ? daysAgo(Math.max(0, ago[i] - 2)) : null,
        ciclos: st === 'Concluída' ? 1 : 0,
        contas: contas
      };
    });
    const custos = MS7.custos.map(function (c, i) {
      return Object.assign({}, c, {
        data: c.comp === '09/2026' ? daysAgo(3 + i * 2) : daysAgo(30 + i)
      });
    });
    return {
      v: 2,
      operadores: ops,
      coops: coops,
      custos: custos,
      pagamentos: [{
        id: 'p1',
        opId: 'op1',
        valor: 1800,
        data: daysAgo(8)
      }, {
        id: 'p2',
        opId: 'op4',
        valor: 900,
        data: daysAgo(5)
      }],
      config: {
        custoConta: 28
      }
    };
  }
  function load() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY));
      return v && v.v === 2 ? v : null;
    } catch (e) {
      return null;
    }
  }
  let db = load() || seed();
  const subs = [];
  const COLS = ['operadores', 'coops', 'custos', 'pagamentos'];
  function save() {
    localStorage.setItem(KEY, JSON.stringify(db));
    subs.slice().forEach(function (f) {
      f();
    });
  }
  function stamp(before, after) {
    const now = Date.now();
    after._del = after._del || {};
    COLS.forEach(function (k) {
      const old = {};
      (before[k] || []).forEach(function (x) {
        old[x.id] = JSON.stringify(x);
      });
      const keep = {};
      (after[k] || []).forEach(function (x) {
        keep[x.id] = 1;
        const o = old[x.id];
        if (o === undefined || o !== JSON.stringify(x)) x._u = now;
      });
      Object.keys(old).forEach(function (id) {
        if (!keep[id]) after._del[k + ':' + id] = now;
      });
    });
    if (JSON.stringify(before.config) !== JSON.stringify(after.config)) after.config._u = now;
  }
  function update(fn) {
    const before = db;
    db = JSON.parse(JSON.stringify(db));
    fn(db);
    stamp(before, db);
    save();
    Sync.push();
  }
  const Sync = {
    status: 'local',
    rev: 0,
    es: null,
    timer: null,
    pending: false,
    base: function () {
      return (localStorage.getItem('ms7-push-server') || '').replace(/\/$/, '');
    },
    token: function () {
      return localStorage.getItem('ms7-token') || '';
    },
    key: function () {
      return this.token();
    },
    on: function () {
      return localStorage.getItem('ms7-sync-on') === '1' && !!this.base() && !!this.token();
    },
    set: function (s) {
      this.status = s;
      subs.slice().forEach(function (f) {
        f();
      });
    },
    hdr: function () {
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token()
      };
    },
    api: function (p, o) {
      const self = this;
      o = o || {};
      return fetch(this.base() + p, Object.assign({}, o, {
        headers: this.hdr()
      })).then(function (r) {
        return r.json().catch(function () {
          return {};
        }).then(function (j) {
          if (r.status === 401) {
            self.logout(true);
          }
          if (!r.ok) throw new Error(j.error || 'Erro ' + r.status);
          return j;
        });
      });
    },
    login: function (server, email, password) {
      const self = this;
      localStorage.setItem('ms7-push-server', server.replace(/\/$/, ''));
      return fetch(this.base() + '/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }).then(function (r) {
        return r.json().then(function (j) {
          if (!r.ok) throw new Error(j.error || 'Falha no login');
          localStorage.setItem('ms7-token', j.token);
          localStorage.setItem('ms7-user', JSON.stringify(j.user));
          return self.connect(j.user.role !== 'operador' && !self.rev ? 'maybe-upload' : null).then(function () {
            return j.user;
          });
        });
      });
    },
    user: function () {
      try {
        return JSON.parse(localStorage.getItem('ms7-user'));
      } catch (e) {
        return null;
      }
    },
    logout: function (expired) {
      localStorage.removeItem('ms7-token');
      localStorage.removeItem('ms7-user');
      localStorage.removeItem('ms7op-session');
      this.disconnect();
      if (window.ms7OnLogout) window.ms7OnLogout(expired);
    },
    pull: function () {
      const self = this;
      return this.api('/api/db').then(function (j) {
        self.rev = j.rev;
        if (j.db) {
          db = j.db;
          save();
        }
        self.set('online');
        return j;
      });
    },
    push: function () {
      if (!this.on()) return;
      const self = this;
      this.pending = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        self.set('syncing');
        self.api('/api/db', {
          method: 'PUT',
          body: JSON.stringify({
            db: db
          })
        }).then(function (j) {
          self.pending = false;
          self.rev = j.rev;
          db = j.db;
          save();
          self.set('online');
        }).catch(function () {
          self.set('offline');
        });
      }, 400);
    },
    listen: function () {
      const self = this;
      if (this.es) this.es.close();
      if (typeof EventSource === 'undefined') return;
      this.es = new EventSource(this.base() + '/api/events?token=' + encodeURIComponent(this.token()));
      this.es.onmessage = function (e) {
        let m = {};
        try {
          m = JSON.parse(e.data);
        } catch (_) {}
        if (m.rev && m.rev !== self.rev && !self.pending) self.pull().catch(function () {});
      };
      this.es.onerror = function () {
        self.set('offline');
      };
      this.es.onopen = function () {
        if (self.pending) self.push();else self.pull().catch(function () {});
      };
    },
    connect: function (first) {
      const self = this;
      localStorage.setItem('ms7-sync-on', '1');
      this.set('syncing');
      return fetch(this.base() + '/api/db', {
        headers: this.hdr()
      }).then(function (r) {
        if (!r.ok) throw new Error('Servidor recusou (' + r.status + ')');
        return r.json();
      }).then(function (j) {
        if (j.user) localStorage.setItem('ms7-user', JSON.stringify(j.user));
        if (j.user && j.user.role === 'operador') {
          if (!j.db) throw new Error('O administrador ainda não enviou os dados');
          self.rev = j.rev;
          db = j.db;
          save();
          return;
        }
        if (!j.db || first === 'upload') {
          return fetch(self.base() + '/api/db', {
            method: 'PUT',
            headers: self.hdr(),
            body: JSON.stringify({
              db: db
            })
          }).then(function (r) {
            return r.json();
          }).then(function (k) {
            self.rev = k.rev;
            db = k.db;
            save();
          });
        }
        self.rev = j.rev;
        db = j.db;
        save();
      }).then(function () {
        self.set('online');
        self.listen();
      }).catch(function (e) {
        self.set('offline');
        throw e;
      });
    },
    disconnect: function () {
      localStorage.removeItem('ms7-sync-on');
      if (this.es) this.es.close();
      this.es = null;
      this.set('local');
    },
    restricted: function () {
      return !!db._restrito;
    }
  };
  if (Sync.on()) setTimeout(function () {
    Sync.connect().catch(function () {});
  }, 0);
  window.addEventListener('online', function () {
    if (Sync.on()) Sync.connect().catch(function () {});
  });
  function useDB() {
    const [, set] = React.useState(0);
    React.useEffect(function () {
      const f = function () {
        set(function (x) {
          return x + 1;
        });
      };
      subs.push(f);
      return function () {
        const i = subs.indexOf(f);
        if (i >= 0) subs.splice(i, 1);
      };
    }, []);
    return db;
  }
  function sum(a, k) {
    return a.reduce(function (s, x) {
      return s + (typeof k === 'function' ? k(x) : x[k]);
    }, 0);
  }
  function contaRes(c) {
    return c.saque - c.deposito - c.redeposito;
  }
  function calc(cp) {
    const n = cp.contas.length,
      dep = sum(cp.contas, 'deposito'),
      red = sum(cp.contas, 'redeposito'),
      saq = sum(cp.contas, 'saque');
    const res = saq - dep - red,
      bloq = cp.contas.filter(function (c) {
        return c.status === 'Bloqueado';
      }).length;
    const com = cp.comTipo === 'pct' ? Math.max(0, res) * cp.comValor / 100 : cp.comTipo === 'conta' ? cp.comValor * n : cp.comValor;
    const custo = n * db.config.custoConta,
      lucro = res - com - custo,
      roi = com + custo ? lucro / (com + custo) * 100 : 0;
    return {
      n: n,
      dep: dep,
      red: red,
      saq: saq,
      res: res,
      bloq: bloq,
      com: com,
      custo: custo,
      lucro: lucro,
      roi: roi
    };
  }
  function inPeriod(dateStr, per) {
    if (!per || per === 'Todos') return true;
    const d = new Date(dateStr + 'T12:00:00');
    const diff = (TODAY - d) / 864e5;
    return per === 'Hoje' ? diff < 1 : per === '7 dias' ? diff < 7 : diff < 30;
  }
  function coopsFor(opts) {
    opts = opts || {};
    return db.coops.filter(function (c) {
      return (!opts.opId || c.opId === opts.opId) && inPeriod(c.inicio, opts.per) && (opts.lixeira ? true : c.status !== 'Lixeira');
    });
  }
  function agg(list) {
    const cs = list.map(calc);
    const o = {
      coops: list.length,
      n: sum(cs, 'n'),
      dep: sum(cs, 'dep'),
      red: sum(cs, 'red'),
      saq: sum(cs, 'saq'),
      res: sum(cs, 'res'),
      bloq: sum(cs, 'bloq'),
      com: sum(cs, 'com'),
      custo: sum(cs, 'custo'),
      lucro: sum(cs, 'lucro')
    };
    o.roi = o.com + o.custo ? o.lucro / (o.com + o.custo) * 100 : 0;
    o.custoConta = o.n ? o.custo / o.n : db.config.custoConta;
    o.ativas = list.filter(function (c) {
      return c.status === 'Em andamento' || c.status === 'Ativa';
    }).length;
    o.concluidas = list.filter(function (c) {
      return c.status === 'Concluída';
    }).length;
    return o;
  }
  function opName(id) {
    const o = db.operadores.find(function (x) {
      return x.id === id;
    });
    return o ? o.nome : '—';
  }
  function coop(id) {
    return db.coops.find(function (c) {
      return c.id === id;
    });
  }
  function resumo(cp) {
    const k = calc(cp);
    return 'Operador: ' + opName(cp.opId) + ' · ' + k.n + ' contas\nDepósito: ' + MS7.brl(k.dep + k.red) + ' · Saque: ' + MS7.brl(k.saq) + '\n' + resultLine(k.res);
  }
  const A = {
    createCoop: function (f) {
      const id = 'C-' + (1049 + db.coops.length - 14);
      update(function (d) {
        d.coops.unshift({
          id: id,
          cliente: f.cliente || 'Nova cooperação',
          opId: f.opId,
          plataforma: f.plataforma,
          rede: f.rede,
          depositantes: +f.qtd || 0,
          comTipo: f.comTipo,
          comValor: parseFloat(String(f.comValor).replace(',', '.')) || 0,
          status: 'Ativa',
          inicio: iso(TODAY),
          fim: null,
          ciclos: 0,
          contas: []
        });
      });
      toast('Cooperação ' + id + ' criada');
      return id;
    },
    setStatus: function (id, st) {
      const before = coop(id);
      update(function (d) {
        const c = d.coops.find(function (x) {
          return x.id === id;
        });
        c.status = st;
        if (st === 'Concluída') c.fim = iso(TODAY);
        if (st === 'Em andamento' && !c.fim) c.fim = null;
      });
      const c = coop(id);
      if (st === 'Em andamento' && before.status !== 'Em andamento') notify({
        type: 'inicio',
        title: 'Cooperação iniciada — ' + c.cliente + ' (' + c.id + ')',
        body: 'Operador: ' + opName(c.opId) + '\nPlataforma: ' + c.plataforma + ' · ' + c.depositantes + ' depositantes'
      });else if (st === 'Concluída') notify({
        type: 'fim',
        title: 'Cooperação finalizada — ' + c.cliente + ' (' + c.id + ')',
        body: resumo(c)
      });else toast(st === 'Lixeira' ? 'Movida para a lixeira' : 'Status: ' + st);
    },
    saveConta: function (coopId, conta, silent) {
      const isNew = !conta.id;
      const prev = isNew ? null : coop(coopId).contas.find(function (x) {
        return x.id === conta.id;
      }) || null;
      update(function (d) {
        const c = d.coops.find(function (x) {
          return x.id === coopId;
        });
        const clean = Object.assign({}, conta, {
          deposito: +conta.deposito || 0,
          redeposito: +conta.redeposito || 0,
          saque: conta.status === 'Sacado' ? +conta.saque || 0 : +conta.saque || 0
        });
        if (isNew) {
          clean.id = 'k' + Date.now();
          clean.criada = iso(TODAY);
          c.contas.push(clean);
        } else {
          c.contas = c.contas.map(function (x) {
            return x.id === conta.id ? Object.assign({}, x, clean) : x;
          });
        }
      });
      const c = coop(coopId);
      if (conta.status === 'Bloqueado' && (!prev || prev.status !== 'Bloqueado')) notify({
        type: 'bloqueio',
        title: 'Conta bloqueada — ' + c.plataforma,
        body: 'Operador: ' + opName(c.opId) + '\nConta: ' + conta.usuario + ' (' + c.id + ')\nDepósito retido: ' + MS7.brl((+conta.deposito || 0) + (+conta.redeposito || 0))
      });else if (!silent) toast(isNew ? 'Conta adicionada' : 'Conta atualizada');
    },
    removeConta: function (coopId, contaId) {
      update(function (d) {
        const c = d.coops.find(function (x) {
          return x.id === coopId;
        });
        c.contas = c.contas.filter(function (x) {
          return x.id !== contaId;
        });
      });
      toast('Conta removida');
    },
    fecharCiclo: function (coopId) {
      update(function (d) {
        const c = d.coops.find(function (x) {
          return x.id === coopId;
        });
        c.ciclos = (c.ciclos || 0) + 1;
      });
      const c = coop(coopId);
      notify({
        type: 'ciclo',
        title: 'Ciclo ' + c.ciclos + ' fechado — ' + c.cliente + ' (' + c.id + ')',
        body: resumo(c)
      });
    },
    addCusto: function (x) {
      update(function (d) {
        d.custos.unshift(Object.assign({
          id: Date.now(),
          data: iso(TODAY)
        }, x));
      });
      toast('Custo registrado');
    },
    removeCusto: function (id) {
      update(function (d) {
        d.custos = d.custos.filter(function (x) {
          return x.id !== id;
        });
      });
    },
    pagar: function (opId, valor) {
      update(function (d) {
        d.pagamentos.push({
          id: 'p' + Date.now(),
          opId: opId,
          valor: valor,
          data: iso(TODAY)
        });
      });
      toast('Pagamento de ' + MS7.brl(valor) + ' registrado');
    },
    setConfig: function (k, v) {
      update(function (d) {
        d.config[k] = v;
      });
    },
    saveOperador: function (o) {
      update(function (d) {
        if (o.id) d.operadores = d.operadores.map(function (x) {
          return x.id === o.id ? Object.assign({}, x, o) : x;
        });else d.operadores.push(Object.assign({
          id: 'op' + Date.now(),
          ativo: true,
          ciclo: 7,
          pct: 15
        }, o));
      });
      toast('Operador salvo');
    },
    removeOperador: function (id) {
      update(function (d) {
        d.operadores = d.operadores.filter(function (x) {
          return x.id !== id;
        });
      });
    },
    reset: function () {
      if (Sync.on() || db._restrito) {
        toast('Desconecte o servidor antes de restaurar os dados de exemplo');
        return;
      }
      localStorage.removeItem(KEY);
      db = seed();
      save();
      toast('Dados de exemplo restaurados');
    }
  };
  function exportCSV(name, cols, rows) {
    const esc = function (v) {
      v = v == null ? '' : String(v);
      return /[;"\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
    };
    const num = function (v) {
      return typeof v === 'number' ? v.toFixed(2).replace('.', ',') : v;
    };
    const lines = [cols.map(function (c) {
      return esc(c.label);
    }).join(';')].concat(rows.map(function (r) {
      return cols.map(function (c) {
        return esc(num(c.get(r)));
      }).join(';');
    }));
    const blob = new Blob(['\uFEFF' + lines.join('\n')], {
      type: 'text/csv;charset=utf-8'
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
    toast('Arquivo ' + name + '.csv baixado');
  }
  function usePersist(key, initial) {
    const k = 'ms7op-p-' + key;
    const [v, setV] = React.useState(function () {
      try {
        const s = localStorage.getItem(k);
        return s ? JSON.parse(s) : initial;
      } catch (e) {
        return initial;
      }
    });
    const set = function (nv) {
      setV(function (prev) {
        const val = typeof nv === 'function' ? nv(prev) : nv;
        localStorage.setItem(k, JSON.stringify(val));
        return val;
      });
    };
    return [v, set];
  }
  const COM_LABEL = {
    pct: '% do resultado',
    conta: 'Por conta',
    fixo: 'Valor fixo'
  };
  function comText(c) {
    return c.comTipo === 'pct' ? c.comValor + '% do resultado' : c.comTipo === 'conta' ? MS7.brl(c.comValor) + ' por conta' : MS7.brl(c.comValor) + ' fixo';
  }
  window.DB = {
    Sync: Sync,
    get: function () {
      return db;
    },
    useDB: useDB,
    calc: calc,
    agg: agg,
    coopsFor: coopsFor,
    inPeriod: inPeriod,
    opName: opName,
    coop: coop,
    A: A,
    today: TODAY,
    iso: iso,
    fmtDate: fmtDate,
    contaRes: contaRes,
    COM_LABEL: COM_LABEL,
    comText: comText
  };
  window.exportCSV = exportCSV;
  window.usePersist = usePersist;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operacoes/store.js", error: String((e && e.message) || e) }); }

// ui_kits/operacoes/sw.js
try { (() => {
const C = 'ms7-v2';
self.addEventListener('install', e => {
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.origin !== location.origin || u.pathname.indexOf('/api/') === 0) return;
  e.respondWith(fetch(e.request).then(r => {
    const c = r.clone();
    caches.open(C).then(x => x.put(e.request, c));
    return r;
  }).catch(() => caches.match(e.request)));
});
self.addEventListener('push', e => {
  let d = {};
  try {
    d = e.data.json();
  } catch (_) {
    d = {
      title: 'MS7 Operações',
      body: e.data ? e.data.text() : ''
    };
  }
  e.waitUntil(self.registration.showNotification(d.title || 'MS7 Operações', {
    body: d.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: d.tag,
    data: d
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(l => {
    for (const c of l) {
      if ('focus' in c) return c.focus();
    }
    return self.clients.openWindow('./index.html');
  }));
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/operacoes/sw.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.CountDot = __ds_scope.CountDot;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.AreaChart = __ds_scope.AreaChart;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.Calendar = __ds_scope.Calendar;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.Heatmap = __ds_scope.Heatmap;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.ListingCard = __ds_scope.ListingCard;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.FieldShell = __ds_scope.FieldShell;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
