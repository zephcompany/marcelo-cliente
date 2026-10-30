(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const TZ = 'America/Sao_Paulo';
  (function () {
    const CSS = [
      '.ms7p-date{font-size:13px;font-weight:500;color:var(--text-secondary)}',
      '.ms7p-h{font-size:22px;font-weight:600;letter-spacing:-.03em;line-height:1.1;margin-top:3px}',
      '.ms7p-chips{display:flex;gap:8px;flex-wrap:wrap}',
      '.ms7p-chip{display:inline-flex;align-items:center;gap:8px;height:34px;padding:0 14px 0 12px;border-radius:999px;border:1px solid var(--line);background:var(--surface-card);color:var(--text-primary);font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:background var(--dur-fast),border-color var(--dur-fast),color var(--dur-fast),transform var(--dur-base) var(--ease-standard)}',
      '.ms7p-chip:hover{border-color:var(--line-strong)}',
      '.ms7p-chip .dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}',
      '.ms7p-chip .n{font-variant-numeric:tabular-nums;color:var(--text-secondary);font-weight:600}',
      '.ms7p-chip.is-on{background:var(--surface-inverse);border-color:var(--surface-inverse);color:var(--text-inverse)}',
      '.ms7p-chip.is-on .n{color:inherit;opacity:.75}',
      '.ms7p-sec{display:flex;flex-direction:column;gap:10px}',
      '.ms7p-sec-head{display:flex;align-items:center;gap:10px;padding:0 4px}',
      '.ms7p-sec-head .dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}',
      '.ms7p-sec-head .n{font-size:11px;font-weight:600;color:var(--text-secondary);font-variant-numeric:tabular-nums}',
      '.ms7p-sec-head .ln{flex:1;height:1px;background:var(--line)}',
      '.ms7p-list{padding:6px}',
      '.ms7p-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto auto;align-items:center;column-gap:14px;row-gap:4px;padding:12px;border-radius:10px;transition:background var(--dur-fast)}',
      '.ms7p-row+.ms7p-row{border-top:1px solid var(--border-subtle)}',
      '.ms7p-row:hover{background:var(--surface-muted);border-top-color:transparent}',
      '.ms7p-row:hover+.ms7p-row{border-top-color:transparent}',
      '.ms7p-row:hover .ms7p-act,.ms7p-row:focus-within .ms7p-act{opacity:1}',
      '.ms7p-act{opacity:0;transition:opacity var(--dur-fast)}',
      '@media (hover:none){.ms7p-act{opacity:1}}',
      '.ms7p-name{font-size:14px;font-weight:600;letter-spacing:-.005em}',
      '.ms7p-times{font-size:12.5px;font-weight:500;color:var(--text-secondary);margin-top:2px;display:flex;gap:2px 0;flex-wrap:wrap;align-items:center}',
      '.ms7p-times .v{color:var(--text-primary);font-weight:600;font-variant-numeric:tabular-nums}',
      '.ms7p-times .v.is-off{color:var(--text-secondary);font-weight:500}',
      '.ms7p-times .sep{margin:0 6px;color:var(--line-strong)}',
      '.ms7p-worked{text-align:right;min-width:86px}',
      '.ms7p-worked .v{display:block;font-size:16px;font-weight:600;letter-spacing:-.02em;line-height:1.15;margin-top:2px}',
      '.ms7p-late{font-size:12px;font-weight:600;color:var(--ms7-error);white-space:nowrap}',
      '.ms7p-log{display:flex;gap:12px;align-items:flex-start;padding:11px 0}',
      '.ms7p-log+.ms7p-log{border-top:1px solid var(--border-subtle)}',
      '.ms7p-log .ico{width:32px;height:32px;border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center}',
      '.ms7p-hero{width:100%;max-width:640px;margin:0 auto;display:flex;flex-direction:column;align-items:center;text-align:center;gap:0}',
      '.ms7p-clock{font-size:44px;font-weight:600;letter-spacing:-.03em;line-height:1;margin-top:8px}',
      '.ms7p-sub{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:14px;font-size:12.5px;font-weight:500;color:var(--text-secondary)}',
      '.ms7p-actions{width:100%;max-width:380px;display:flex;flex-direction:column;gap:8px;margin-top:22px}',
      '.ms7p-actions .ms7-btn{height:50px;font-size:15px;border-radius:12px}',
      '.ms7p-actions .ms7-btn-outline{height:44px;font-size:14px}',
      '.ms7p-actions .ms7-btn-brand,.ms7p-actions .ms7-btn-primary{order:-1}',
      '.ms7p-pause{width:100%;max-width:380px;margin-top:22px;padding:18px;border-radius:14px;background:var(--surface-muted);display:flex;flex-direction:column;align-items:center;gap:10px}',
      '.ms7p-pause .t{font-size:32px;font-weight:600;letter-spacing:-.03em;line-height:1}',
      '.ms7p-marks{width:100%;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:24px}',
      '.ms7p-mark{padding:10px 12px;border-radius:12px;background:var(--surface-muted);display:flex;flex-direction:column;gap:3px;min-width:0;text-align:left}',
      '.ms7p-mark .lab{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.ms7p-mark .v{font-size:17px;font-weight:600;letter-spacing:-.02em;color:var(--text-secondary)}',
      '.ms7p-mark.is-on .lab{color:var(--ms7-green-ink)}',
      '.ms7p-mark.is-on .v{color:var(--text-primary)}',
      '.ms7p-mark.is-now{box-shadow:0 0 0 1px color-mix(in oklab,var(--ms7-green-900) 45%,transparent)}',
      '.ms7p-prog{width:100%;margin-top:14px;text-align:left}',
      '.ms7p-prog .l{display:flex;justify-content:space-between;align-items:baseline;font-size:13px;font-weight:500;color:var(--text-secondary);margin-bottom:8px}',
      '.ms7p-prog .l .v{font-size:14px;font-weight:600;color:var(--text-primary)}',
      '.ms7p-note{margin-top:14px;font-size:12px;font-weight:500;color:var(--text-secondary);line-height:1.5;max-width:420px}',
      '.ms7p-done{width:100%;max-width:380px;margin-top:22px;display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:12px;background:var(--surface-muted);font-size:14px;font-weight:600;text-align:left}',
      '.ms7p-done .ico{width:30px;height:30px;border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:color-mix(in oklab,var(--ms7-green) 16%,transparent);color:var(--ms7-green)}',
      '.ms7p-mot{display:flex;gap:8px;flex-wrap:wrap}',
      '.ms7p-mot button{display:inline-flex;align-items:center;gap:8px;height:38px;padding:0 14px;border-radius:999px;border:1px solid var(--line);background:var(--surface-card);color:var(--text-primary);font-family:inherit;font-size:13.5px;font-weight:600;cursor:pointer;transition:background var(--dur-fast),border-color var(--dur-fast),color var(--dur-fast)}',
      '.ms7p-mot button:hover{border-color:var(--line-strong)}',
      '.ms7p-mot button.is-on{background:var(--ms7-green-900);border-color:var(--ms7-green-900);color:var(--text-inverse)}',
      '.ms7p-regra{display:flex;flex-direction:column;gap:10px;padding:14px 0;border-top:1px solid var(--border-subtle)}',
      '.ms7p-regra:first-of-type{border-top:0;padding-top:0}',
      '@media (max-width:640px){.ms7p-row{grid-template-columns:auto minmax(0,1fr) auto;row-gap:6px}.ms7p-row .ms7p-worked{grid-column:2;text-align:left;min-width:0}.ms7p-row .ms7p-act{grid-column:3;grid-row:1}.ms7p-marks{grid-template-columns:repeat(2,minmax(0,1fr))}.ms7p-clock{font-size:38px}.ms7p-h{font-size:20px}}',
      /* vidro no preto: chips de filtro e de motivo em glass, ativo em lima */
      'html[data-theme="dark"] .ms7p-chip,html[data-theme="dark"] .ms7p-mot button{background:var(--glass);box-shadow:var(--glass-edge)}',
      'html[data-theme="dark"] .ms7p-chip:hover,html[data-theme="dark"] .ms7p-mot button:hover{background:var(--glass-2)}',
      'html[data-theme="dark"] .ms7p-chip.is-on{background:var(--ms7-lime-500);border-color:var(--ms7-lime-500);color:var(--text-on-lime);box-shadow:inset 0 1px 0 rgba(255,255,255,.45)}',
      'html[data-theme="dark"] .ms7p-chip.is-on .n{color:var(--text-on-lime);opacity:.7}',
      'html[data-theme="dark"] .ms7p-mot button.is-on{background:var(--ms7-lime-500);border-color:var(--ms7-lime-500);color:var(--text-on-lime);box-shadow:inset 0 1px 0 rgba(255,255,255,.45)}',
      'html[data-theme="dark"] .ms7p-row:hover{background:var(--glass-2)}',
      'html[data-theme="dark"] .ms7p-mark,html[data-theme="dark"] .ms7p-pause,html[data-theme="dark"] .ms7p-done{background:var(--glass)}',
      'html[data-theme="dark"] .ms7p-mark.is-now{background:color-mix(in oklab,var(--ms7-lime-500) 8%,transparent);box-shadow:0 0 0 1px color-mix(in oklab,var(--ms7-lime-500) 45%,transparent)}',
      'html[data-theme="dark"] .ms7p-sec-head .ln{background:var(--line)}',
    ].join('');
    let s = document.getElementById('ms7-ponto-css');
    if (!s) {
      s = document.createElement('style');
      s.id = 'ms7-ponto-css';
      document.head.appendChild(s);
    }
    s.textContent = CSS;
  })();
  /* emoji de título de card (1 por card, sempre antes do texto) */
  function Emo({ e }) {
    return (
      <span className="ms7-emo" aria-hidden="true" style={{ marginRight: 8 }}>
        {e}
      </span>
    );
  }
  const F = [
    ['entrada', 'Entrada', 'log-in'],
    ['almocoIni', 'Saída almoço', 'utensils'],
    ['almocoFim', 'Volta almoço', 'coffee'],
    ['saida', 'Saída', 'log-out'],
  ];
  const PERS = ['Hoje', '7 dias', '30 dias', 'Este mês', 'Mês passado'];
  function dstr(x) {
    return x.toLocaleDateString('sv-SE', { timeZone: TZ });
  }
  function hoje() {
    return dstr(new Date());
  }
  function hm(ms) {
    return ms ? new Date(ms).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: TZ }) : '—';
  }
  function dur(m) {
    if (m == null || isNaN(m)) return '—';
    const s = m < 0 ? '−' : '';
    m = Math.abs(Math.round(m));
    return s + Math.floor(m / 60) + 'h' + String(m % 60).padStart(2, '0');
  }
  function toMs(date, t) {
    return t ? new Date(date + 'T' + t + ':00-03:00').getTime() : null;
  }
  function inHM(ms) {
    return ms ? hm(ms) : '';
  }
  function diaLabel(ds) {
    return new Date(ds + 'T12:00:00-03:00').toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', timeZone: TZ });
  }
  function range(per) {
    const t = hoje();
    const b = new Date(t + 'T12:00:00-03:00');
    const back = function (n) {
      return dstr(new Date(b.getTime() - n * 86400000));
    };
    if (per === 'Hoje') return [t, t];
    if (per === '7 dias') return [back(6), t];
    if (per === '30 dias') return [back(29), t];
    if (per === 'Este mês') return [t.slice(0, 8) + '01', t];
    const y = +t.slice(0, 4),
      m = +t.slice(5, 7);
    const py = m === 1 ? y - 1 : y,
      pm = m === 1 ? 12 : m - 1;
    const last = new Date(Date.UTC(py, pm, 0)).getUTCDate();
    const mm = String(pm).padStart(2, '0');
    return [py + '-' + mm + '-01', py + '-' + mm + '-' + last];
  }
  function cfg(db, opId) {
    const c = Object.assign({ entrada: '09:00', jornada: 8, tolerancia: 10, almoco: 60 }, (db.config && db.config.ponto) || {});
    const o =
      (db.operadores || []).find(function (x) {
        return x.id === opId;
      }) || {};
    return {
      entrada: o.pontoEntrada || c.entrada,
      jornada: +(o.pontoJornada || c.jornada) || 8,
      tolerancia: +c.tolerancia || 0,
      almoco: +c.almoco || 60,
    };
  }
  function calc(r, db) {
    const live = r.data === hoje();
    const n = Date.now();
    if (!r.entrada) return { estado: 'ausente', trab: 0, atraso: null, saldo: null, fora: 0 };
    const end = r.saida || (live ? n : null);
    let pausa = 0;
    if (r.almocoIni) {
      const pe = r.almocoFim || r.saida || (live ? n : r.almocoIni);
      pausa = pe - r.almocoIni;
    }
    const PP = r.pausas || [];
    let fora = 0;
    PP.forEach(function (x) {
      const fe = x.fim || r.saida || (live ? n : x.ini);
      fora += Math.max(0, fe - x.ini);
    });
    pausa += fora;
    const emPausa = PP.length && !PP[PP.length - 1].fim ? PP[PP.length - 1] : null;
    const trab = end ? Math.max(0, (end - r.entrada - pausa) / 60000) : Math.max(0, ((r.almocoIni || r.entrada) - r.entrada) / 60000);
    const c = cfg(db, r.opId);
    const prev = toMs(r.data, c.entrada);
    const late = (r.entrada - prev) / 60000;
    const atraso = late > c.tolerancia ? late : 0;
    const estado = r.saida ? 'encerrado' : !live ? 'incompleto' : r.almocoIni && !r.almocoFim ? 'almoco' : emPausa ? 'pausa' : 'trabalhando';
    return {
      estado: estado,
      trab: trab,
      atraso: atraso,
      saldo: r.saida ? trab - c.jornada * 60 : null,
      jornada: c.jornada,
      fora: fora / 60000,
      emPausa: emPausa,
    };
  }
  const EST = {
    ausente: ['Não chegou', 'gray'],
    trabalhando: ['Trabalhando', 'green'],
    almoco: ['No almoço', 'yellow'],
    pausa: ['Em pausa', 'orange'],
    encerrado: ['Encerrou', 'blue'],
    incompleto: ['Sem saída', 'error'],
  };
  const MOTIVOS = [
    ['Dentista', 'smile'],
    ['Médico', 'stethoscope'],
    ['Academia', 'dumbbell'],
    ['Banco', 'landmark'],
    ['Assunto pessoal', 'user'],
    ['Outro', 'more-horizontal'],
  ];
  function cron(ms) {
    ms = Math.max(0, ms);
    const t = Math.floor(ms / 1000);
    return (
      String(Math.floor(t / 3600)).padStart(2, '0') +
      ':' +
      String(Math.floor((t % 3600) / 60)).padStart(2, '0') +
      ':' +
      String(t % 60).padStart(2, '0')
    );
  }
  function pausasTxt(r) {
    return (r.pausas || [])
      .map(function (x) {
        return x.motivo + ' ' + hm(x.ini) + (x.fim ? '–' + hm(x.fim) : ' (fora)');
      })
      .join(' · ');
  }
  function PausaModal({ open, onClose, onGo }) {
    const [m, setM] = React.useState('');
    const [o, setO] = React.useState('');
    React.useEffect(
      function () {
        if (open) {
          setM('');
          setO('');
        }
      },
      [open],
    );
    const final = m === 'Outro' ? o.trim() : m;
    return (
      <DS.Modal
        open={open}
        onClose={onClose}
        title="Sair para um compromisso"
        subtitle="O tempo fora não conta como trabalhado. Quando voltar, toque em Voltar ao trabalho."
        size="sm"
        footer={
          <React.Fragment>
            <DS.Button variant="secondary" onClick={onClose}>
              Cancelar
            </DS.Button>
            <DS.Button
              variant="brand"
              iconLeft="pause"
              disabled={!final}
              onClick={function () {
                onGo(final);
              }}
            >
              Iniciar pausa
            </DS.Button>
          </React.Fragment>
        }
      >
        <div className="ms7p-mot">
          {MOTIVOS.map(function (x) {
            const on = m === x[0];
            return (
              <button
                key={x[0]}
                type="button"
                className={on ? 'is-on' : ''}
                aria-pressed={on}
                onClick={function () {
                  setM(x[0]);
                }}
              >
                <DS.Icon name={x[1]} size={16} strokeWidth={2} />
                {x[0]}
              </button>
            );
          })}
        </div>
        {m === 'Outro' ? (
          <div style={{ marginTop: 12 }}>
            <DS.Input
              label="Qual compromisso?"
              placeholder="Ex.: buscar filho na escola"
              value={o}
              onChange={function (e) {
                setO(e.target.value);
              }}
            />
          </div>
        ) : null}
      </DS.Modal>
    );
  }
  function useTick(ms) {
    const [, set] = React.useState(0);
    React.useEffect(function () {
      const t = setInterval(function () {
        set(function (x) {
          return x + 1;
        });
      }, ms);
      return function () {
        clearInterval(t);
      };
    }, []);
  }
  function rowsOf(db, opId, per) {
    const rg = range(per);
    return (db.ponto || []).filter(function (p) {
      return (!opId || p.opId === opId) && p.data >= rg[0] && p.data <= rg[1];
    });
  }
  function resumo(db, list) {
    const o = { dias: 0, min: 0, atrasos: 0, minAtraso: 0, saldo: 0, semSaida: 0 };
    list.forEach(function (r) {
      const c = calc(r, db);
      if (!r.entrada) return;
      o.dias++;
      o.min += c.trab;
      if (c.atraso > 0) {
        o.atrasos++;
        o.minAtraso += c.atraso;
      }
      if (c.saldo != null) o.saldo += c.saldo;
      if (c.estado === 'incompleto') o.semSaida++;
    });
    o.media = o.dias ? o.min / o.dias : 0;
    return o;
  }
  function St({ r, db }) {
    const c = calc(r, db);
    const e = EST[c.estado];
    return (
      <DS.Badge size="sm" tone={e[1]}>
        {e[0]}
      </DS.Badge>
    );
  }
  function Saldo({ m }) {
    if (m == null) return <span style={{ color: 'var(--text-secondary)' }}>—</span>;
    return (
      <span className="ms7-num" style={{ fontWeight: 600, color: m >= 0 ? 'var(--ms7-green)' : 'var(--ms7-error)' }}>{(m >= 0 ? '+' : '') + dur(m)}</span>
    );
  }
  function Marks({ r, compact }) {
    /* a última marcação feita é o "estado atual": ganha o fio em lima */
    let last = -1;
    F.forEach(function (f, i) {
      if (r[f[0]]) last = i;
    });
    return (
      <div className="ms7p-marks" style={compact ? { gridTemplateColumns: 'repeat(2,minmax(0,1fr))' } : null}>
        {F.map(function (f, i) {
          const on = !!r[f[0]];
          return (
            <div key={f[0]} className={'ms7p-mark' + (on ? ' is-on' : '') + (on && i === last && !r.saida ? ' is-now' : '')}>
              <span className="lab">
                <DS.Icon name={f[2]} size={12} strokeWidth={2} />
                {f[1]}
              </span>
              <span className="v ms7-num">{hm(r[f[0]])}</span>
            </div>
          );
        })}
      </div>
    );
  }
  function EditModal({ r, onClose }) {
    const { Modal, Input, Select, Button } = DS;
    const db = DB.get();
    const [f, setF] = React.useState(null);
    React.useEffect(
      function () {
        if (r)
          setF({
            opId: r.opId || (db.operadores[0] || {}).id,
            data: r.data || hoje(),
            entrada: inHM(r.entrada),
            almocoIni: inHM(r.almocoIni),
            almocoFim: inHM(r.almocoFim),
            saida: inHM(r.saida),
            obs: r.obs || '',
          });
        else setF(null);
      },
      [r],
    );
    if (!r || !f) return null;
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
    function save() {
      if (!f.entrada) {
        toast('Informe pelo menos o horário de entrada');
        return;
      }
      const v = F.map(function (x) {
        return toMs(f.data, f[x[0]]);
      });
      const set = v.filter(Boolean);
      for (let i = 1; i < set.length; i++)
        if (set[i] <= set[i - 1]) {
          toast('Os horários precisam estar em ordem: entrada, almoço, volta, saída');
          return;
        }
      if (f.almocoFim && !f.almocoIni) {
        toast('Informe a saída para o almoço');
        return;
      }
      const id = 'pt_' + f.opId + '_' + f.data;
      DB.A.pontoSalvar(
        Object.assign({}, r.id === id ? r : {}, {
          id: id,
          opId: f.opId,
          data: f.data,
          entrada: v[0] || 0,
          almocoIni: v[1] || 0,
          almocoFim: v[2] || 0,
          saida: v[3] || 0,
          obs: f.obs,
          ajustado: true,
        }),
        r.id && r.id !== id ? r.id : null,
      );
      onClose();
    }
    return (
      <Modal
        open={true}
        onClose={onClose}
        title={r.id ? 'Ajustar ponto' : 'Novo registro de ponto'}
        subtitle="Registros ajustados aqui ficam marcados como ajustados pelo admin."
        footer={
          <React.Fragment>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="brand" iconLeft="check" onClick={save}>
              Salvar
            </Button>
          </React.Fragment>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Select
            label="Operador"
            value={f.opId}
            onChange={u('opId')}
            options={db.operadores.map(function (o) {
              return { value: o.id, label: o.nome };
            })}
          />
          <Input label="Data" type="date" value={f.data} onChange={u('data')} />
          {F.map(function (x) {
            return (
              <div key={x[0]} style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Input label={x[1]} type="time" value={f[x[0]]} onChange={u(x[0])} />
                </div>
                {f[x[0]] ? (
                  <DS.IconButton
                    icon="x"
                    size={40}
                    iconSize={16}
                    label={'Apagar ' + x[1]}
                    onClick={function () {
                      setF(function (o) {
                        const n = Object.assign({}, o);
                        n[x[0]] = '';
                        if (x[0] === 'almocoIni') n.almocoFim = '';
                        return n;
                      });
                    }}
                  />
                ) : null}
              </div>
            );
          })}
          {r.id && f.saida ? (
            <div style={{ gridColumn: '1 / -1' }}>
              <Button
                variant="secondary"
                iconLeft="rotate-ccw"
                fullWidth
                onClick={function () {
                  setF(function (o) {
                    return Object.assign({}, o, { saida: '' });
                  });
                }}
              >
                Saída errada: apagar a saída para ele continuar o trabalho
              </Button>
            </div>
          ) : null}
          <div style={{ gridColumn: '1 / -1' }}>
            <Input label="Observação" placeholder="Ex.: esqueceu de marcar a saída, atestado, folga" value={f.obs} onChange={u('obs')} />
          </div>
        </div>
      </Modal>
    );
  }
  function AgoraTab({ onEdit }) {
    const { Card, Avatar, Button, Badge } = DS;
    const db = DB.useDB();
    useTick(30000);
    const t = hoje();
    const [fil, setFil] = React.useState('');
    const rows = db.operadores
      .filter(function (o) {
        return o.ativo;
      })
      .map(function (o) {
        const r = (db.ponto || []).find(function (p) {
          return p.id === 'pt_' + o.id + '_' + t;
        }) || { opId: o.id, data: t };
        return { o: o, r: r, c: calc(r, db) };
      });
    const n = function (k) {
      return rows.filter(function (x) {
        return x.c.estado === k;
      }).length;
    };
    const atr = rows.filter(function (x) {
      return x.c.atraso > 0;
    }).length;
    const GR = [
      ['trabalhando', 'Trabalhando', 'var(--ms7-green)'],
      ['pausa', 'Em pausa', 'var(--ms7-orange)'],
      ['almoco', 'No almoço', 'var(--ms7-yellow)'],
      ['ausente', 'Não chegaram', 'var(--ms7-error)'],
      ['encerrado', 'Encerraram', 'var(--ms7-blue)'],
    ];
    const chip = function (id, label, cor, v) {
      const on = fil === id;
      return (
        <button
          key={id}
          type="button"
          className={'ms7p-chip' + (on ? ' is-on' : '')}
          aria-pressed={on}
          onClick={function () {
            setFil(on ? '' : id);
          }}
        >
          <span className="dot" style={{ background: cor }}></span>
          {label}
          <span className="n">{v}</span>
        </button>
      );
    };
    const agora = new Date();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 220px', minWidth: 0 }}>
            <div className="ms7p-date">
              {(function (s) {
                return s.charAt(0).toUpperCase() + s.slice(1);
              })(agora.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: TZ }))}
            </div>
            <div className="ms7p-h ms7-balance">
              {n('trabalhando') + ' de ' + rows.length + (rows.length === 1 ? ' operador\u00A0trabalhando' : ' operadores\u00A0trabalhando')}
            </div>
          </div>
          {atr ? (
            <DS.Badge tone="error">
              <DS.Icon name="alarm-clock" size={13} strokeWidth={2} />
              {atr + (atr === 1 ? ' atraso hoje' : ' atrasos hoje')}
            </DS.Badge>
          ) : null}
        </div>
        <div className="ms7p-chips">
          {GR.map(function (g) {
            return chip(g[0], g[1], g[2], n(g[0]));
          })}
        </div>
        {rows.length ? (
          GR.filter(function (g) {
            return (!fil || fil === g[0]) && n(g[0]);
          }).map(function (g) {
            const L = rows.filter(function (x) {
              return x.c.estado === g[0];
            });
            return (
              <section key={g[0]} className="ms7p-sec">
                <div className="ms7p-sec-head">
                  <span className="dot" style={{ background: g[2] }}></span>
                  <span className="ms7-eyebrow" style={{ color: 'var(--text-primary)' }}>
                    {g[1]}
                  </span>
                  <span className="n">{L.length}</span>
                  <span className="ln"></span>
                </div>
                <div className="ms7-card ms7p-list">
                  {L.map(function (x) {
                    const cf = cfg(db, x.o.id);
                    return (
                      <div key={x.o.id} className="ms7p-row">
                        <Avatar name={x.o.nome} size={34} />
                        <div style={{ minWidth: 0 }}>
                          <div className="ms7p-name">{x.o.nome}</div>
                          <div className="ms7p-times">
                            {[
                              ['Entrada', x.r.entrada, cf.entrada],
                              ['Almoço', x.r.almocoIni ? hm(x.r.almocoIni) + '–' + (x.r.almocoFim ? hm(x.r.almocoFim) : '…') : null],
                              ['Saída', x.r.saida],
                            ].map(function (q, qi) {
                              const v = q[1] ? (typeof q[1] === 'string' && q[1].indexOf('–') > 0 ? q[1] : hm(q[1])) : '—';
                              return (
                                <span key={q[0]} style={{ whiteSpace: 'nowrap' }}>
                                  {qi ? <span className="sep">·</span> : null}
                                  {q[0] + ' '}
                                  <span className={'v' + (q[1] ? '' : ' is-off')}>{v}</span>
                                  {q[0] === 'Entrada' && !q[1] ? ' (prevista ' + q[2] + ')' : ''}
                                </span>
                              );
                            })}
                          </div>
                          {x.c.emPausa ? (
                            <div style={{ marginTop: 6 }}>
                              <DS.Badge size="sm" tone="orange">
                                <DS.Icon name="pause" size={11} strokeWidth={2.2} />
                                {x.c.emPausa.motivo + ' · desde ' + hm(x.c.emPausa.ini) + ' (' + dur((Date.now() - x.c.emPausa.ini) / 60000) + ')'}
                              </DS.Badge>
                            </div>
                          ) : (x.r.pausas || []).length ? (
                            <div style={{ marginTop: 4, fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>
                              {'Pausas: ' + pausasTxt(x.r)}
                            </div>
                          ) : null}
                        </div>
                        <div className="ms7p-worked">
                          <span className="ms7-eyebrow">Trabalhado</span>
                          <span className="v ms7-num">{dur(x.c.trab)}</span>
                          {x.c.atraso > 0 ? <div className="ms7p-late">{'Atraso ' + dur(x.c.atraso)}</div> : null}
                        </div>
                        <div className="ms7p-act">
                          <DS.IconButton
                            icon="pencil"
                            size={30}
                            iconSize={14}
                            label="Ajustar"
                            onClick={function () {
                              onEdit(x.r);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })
        ) : (
          <Card>
            <Empty art="People" title="Nenhum operador ativo" sub={'Cadastre operadores em Gestão → Operadores.'} />
          </Card>
        )}
        {(db.pontoLog || []).length ? (
          <Card
            title={
              <React.Fragment>
                <Emo e="🔔" />
                Últimos avisos
              </React.Fragment>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {db.pontoLog.slice(0, 8).map(function (a, i) {
                const alerta = a.tipo !== 'marcacao';
                return (
                  <div key={a.id} className="ms7p-log">
                    <span
                      className="ico"
                      style={{
                        background: alerta ? 'color-mix(in oklab, var(--ms7-error) 14%, transparent)' : 'var(--surface-muted)',
                        color: alerta ? 'var(--ms7-error)' : 'var(--text-primary)',
                      }}
                    >
                      <DS.Icon
                        name={
                          {
                            marcacao: 'clock',
                            atraso: 'alarm-clock',
                            ausente: 'user-x',
                            almocoLongo: 'utensils',
                            semSaida: 'log-out',
                            pausa: 'pause',
                          }[a.tipo] || 'bell'
                        }
                        size={16}
                      />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em' }}>{a.title}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 2 }}>{a.body}</div>
                    </div>
                    <span className="ms7-num" style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {new Date(a.at).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: TZ })}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : null}
      </div>
    );
  }
  function RelatorioTab() {
    const { Card, DataTable, BarChart, Button, Tabs } = DS;
    const db = DB.useDB();
    const [per, setPer] = usePersist('ponto-per', '7 dias');
    const rows = db.operadores
      .map(function (o) {
        return Object.assign({ id: o.id, nome: o.nome, ativo: o.ativo }, resumo(db, rowsOf(db, o.id, per)));
      })
      .filter(function (r) {
        return r.dias || r.ativo;
      })
      .sort(function (a, b) {
        return b.min - a.min;
      });
    const s = function (k) {
      return rows.reduce(function (a, r) {
        return a + r[k];
      }, 0);
    };
    const dias = s('dias');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tabs variant="chips" value={per} onChange={setPer} items={PERS} />
        <KpiRow
          items={[
            { icon: 'clock', label: 'Horas trabalhadas', value: dur(s('min')), tone: 'blue' },
            { icon: 'gauge', label: 'Média por dia', value: dur(dias ? s('min') / dias : 0), tone: 'green' },
            { icon: 'alarm-clock', label: 'Atrasos', value: s('atrasos') + ' · ' + dur(s('minAtraso')), tone: 'orange' },
            { icon: 'scale', label: 'Saldo de horas', value: (s('saldo') >= 0 ? '+' : '') + dur(s('saldo')), tone: 'yellow' },
          ]}
        />
        {rows.length ? (
          <Card
            title={
              <React.Fragment>
                <Emo e="📊" />
                Horas por operador
              </React.Fragment>
            }
          >
            <BarChart
              height={220}
              data={rows.slice(0, 10).map(function (r) {
                return { label: r.nome.split(' ')[0], values: [Math.round(r.min / 6) / 10] };
              })}
              series={[{ name: 'Horas', color: 'var(--chart-1)' }]}
            />
          </Card>
        ) : null}
        <Card
          title="Resumo por operador"
          action={
            <Button
              size="sm"
              variant="outline"
              iconLeft="download"
              onClick={function () {
                exportCSV(
                  'ponto-' + per.replace(/\s/g, ''),
                  [
                    {
                      label: 'Operador',
                      get: function (r) {
                        return r.nome;
                      },
                    },
                    {
                      label: 'Dias',
                      get: function (r) {
                        return r.dias;
                      },
                    },
                    {
                      label: 'Horas',
                      get: function (r) {
                        return dur(r.min);
                      },
                    },
                    {
                      label: 'Média/dia',
                      get: function (r) {
                        return dur(r.media);
                      },
                    },
                    {
                      label: 'Atrasos',
                      get: function (r) {
                        return r.atrasos;
                      },
                    },
                    {
                      label: 'Min. atraso',
                      get: function (r) {
                        return Math.round(r.minAtraso);
                      },
                    },
                    {
                      label: 'Saldo',
                      get: function (r) {
                        return dur(r.saldo);
                      },
                    },
                    {
                      label: 'Dias sem saída',
                      get: function (r) {
                        return r.semSaida;
                      },
                    },
                  ],
                  rows,
                );
              }}
            >
              Exportar
            </Button>
          }
        >
          <Hint>Saldo = horas trabalhadas menos a jornada prevista, somando só os dias com saída&nbsp;registrada.</Hint>
          <DataTable
            rows={rows}
            columns={[
              {
                key: 'nome',
                label: 'Operador',
                render: function (r) {
                  return <span style={{ fontWeight: 600 }}>{r.nome}</span>;
                },
              },
              { key: 'dias', label: 'Dias', align: 'center' },
              {
                key: 'min',
                label: 'Horas',
                align: 'right',
                render: function (r) {
                  return <span className="ms7-num" style={{ fontWeight: 600 }}>{dur(r.min)}</span>;
                },
              },
              {
                key: 'media',
                label: 'Média/dia',
                align: 'right',
                render: function (r) {
                  return dur(r.media);
                },
              },
              {
                key: 'atrasos',
                label: 'Atrasos',
                align: 'center',
                render: function (r) {
                  return r.atrasos ? <span style={{ color: 'var(--ms7-error)', fontWeight: 600 }}>{r.atrasos + ' · ' + dur(r.minAtraso)}</span> : '0';
                },
              },
              {
                key: 'saldo',
                label: 'Saldo',
                align: 'right',
                render: function (r) {
                  return <Saldo m={r.saldo} />;
                },
              },
              {
                key: 'semSaida',
                label: 'Sem saída',
                align: 'center',
                render: function (r) {
                  return r.semSaida ? (
                    <DS.Badge size="sm" tone="error">
                      {r.semSaida}
                    </DS.Badge>
                  ) : (
                    '—'
                  );
                },
              },
            ]}
          />
        </Card>
      </div>
    );
  }
  function RegistrosTab({ onEdit }) {
    const { Card, DataTable, Button, Tabs, Select, IconButton, Badge } = DS;
    const db = DB.useDB();
    const [per, setPer] = usePersist('ponto-rper', '7 dias');
    const [op, setOp] = usePersist('ponto-rop', '');
    const rows = rowsOf(db, op, per)
      .slice()
      .sort(function (a, b) {
        return a.data < b.data ? 1 : a.data > b.data ? -1 : DB.opName(a.opId).localeCompare(DB.opName(b.opId));
      });
    return (
      <Card
        title={
          <React.Fragment>
            <Emo e="⏱️" />
            Registros de ponto
          </React.Fragment>
        }
        action={
          <Button
            size="sm"
            iconLeft="plus"
            onClick={function () {
              onEdit({ opId: op || undefined });
            }}
          >
            Novo registro
          </Button>
        }
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
          <Tabs variant="chips" value={per} onChange={setPer} items={PERS} />
          <Select
            variant="pill"
            value={op}
            onChange={function (e) {
              setOp(e.target.value);
            }}
            options={[{ value: '', label: 'Todos os operadores' }].concat(
              db.operadores.map(function (o) {
                return { value: o.id, label: o.nome };
              }),
            )}
          />
        </div>
        {rows.length ? (
          <DataTable
            rows={rows}
            columns={[
              {
                key: 'data',
                label: 'Dia',
                render: function (r) {
                  return <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{diaLabel(r.data)}</span>;
                },
              },
              {
                key: 'op',
                label: 'Operador',
                render: function (r) {
                  return DB.opName(r.opId);
                },
              },
              {
                key: 'entrada',
                label: 'Entrada',
                align: 'center',
                render: function (r) {
                  const c = calc(r, db);
                  return (
                    <span style={{ color: c.atraso > 0 ? 'var(--ms7-error)' : 'inherit', fontWeight: c.atraso > 0 ? 600 : 500 }}>
                      {hm(r.entrada)}
                    </span>
                  );
                },
              },
              {
                key: 'almoco',
                label: 'Almoço',
                align: 'center',
                render: function (r) {
                  return (
                    <span style={{ whiteSpace: 'nowrap' }}>
                      {r.almocoIni ? (r.almocoFim ? hm(r.almocoIni) + ' – ' + hm(r.almocoFim) : hm(r.almocoIni) + ' (em almoço)') : '—'}
                    </span>
                  );
                },
              },
              {
                key: 'saida',
                label: 'Saída',
                align: 'center',
                render: function (r) {
                  return hm(r.saida);
                },
              },
              {
                key: 'pz',
                label: 'Pausas',
                render: function (r) {
                  return (r.pausas || []).length ? (
                    <span style={{ fontSize: 12, fontWeight: 500 }}>{dur(calc(r, db).fora) + ' · ' + pausasTxt(r)}</span>
                  ) : (
                    '—'
                  );
                },
              },
              {
                key: 'trab',
                label: 'Trabalhado',
                align: 'right',
                render: function (r) {
                  return <span className="ms7-num" style={{ fontWeight: 600 }}>{dur(calc(r, db).trab)}</span>;
                },
              },
              {
                key: 'saldo',
                label: 'Saldo',
                align: 'right',
                render: function (r) {
                  return <Saldo m={calc(r, db).saldo} />;
                },
              },
              {
                key: 'st',
                label: 'Status',
                align: 'center',
                render: function (r) {
                  return (
                    <div style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                      <St r={r} db={db} />
                      {r.ajustado ? (
                        <Badge size="sm" variant="soft" tone="purple">
                          Ajustado
                        </Badge>
                      ) : null}
                    </div>
                  );
                },
              },
              {
                key: 'obs',
                label: 'Obs.',
                render: function (r) {
                  return <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{r.obs || ''}</span>;
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
                        iconSize={15}
                        label="Ajustar"
                        onClick={function () {
                          onEdit(r);
                        }}
                      />
                      <IconButton
                        icon="trash-2"
                        size={30}
                        iconSize={15}
                        label="Remover"
                        onClick={function () {
                          if (confirm('Remover o registro de ' + DB.opName(r.opId) + ' em ' + diaLabel(r.data) + '?')) DB.A.pontoRemover(r.id);
                        }}
                      />
                    </div>
                  );
                },
              },
            ]}
          />
        ) : (
          <Empty art="Clock" title="Nenhum registro no período" sub={'Os registros aparecem aqui quando os operadores batem o\u00A0ponto.'} />
        )}
      </Card>
    );
  }
  function OpRegra({ o, def }) {
    const { Input, Button, Avatar } = DS;
    const [e, setE] = React.useState(o.pontoEntrada || '');
    const [j, setJ] = React.useState(o.pontoJornada || '');
    return (
      <div className="ms7p-regra">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <Avatar name={o.nome} size={30} />
          <span style={{ fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.nome}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) auto', gap: 10, alignItems: 'end' }}>
          <div>
            <Input
              label="Entrada"
              type="time"
              value={e}
              placeholder={def.entrada}
              onChange={function (x) {
                setE(x.target.value);
              }}
            />
          </div>
          <div>
            <Input
              label="Jornada (h)"
              placeholder={String(def.jornada)}
              value={j}
              onChange={function (x) {
                setJ(x.target.value);
              }}
            />
          </div>
          <Button
            size="sm"
            variant="outline"
            iconLeft="check"
            onClick={function () {
              DB.A.saveOperador({ id: o.id, pontoEntrada: e, pontoJornada: j ? +String(j).replace(',', '.') : '' });
              toast('Regras de ' + o.nome + ' salvas');
            }}
          >
            Salvar
          </Button>
        </div>
      </div>
    );
  }
  function RegrasTab() {
    const { Card, Input, Button } = DS;
    const db = DB.useDB();
    const def = Object.assign({ entrada: '09:00', jornada: 8, tolerancia: 10, almoco: 60 }, (db.config && db.config.ponto) || {});
    const [f, setF] = React.useState(def);
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
    return (
      <Grid min={340}>
        <Card
          title={
            <React.Fragment>
              <Emo e="⏱️" />
              Jornada padrão
            </React.Fragment>
          }
        >
          <Hint>Vale para todos os operadores, a não ser que tenham regra própria ao&nbsp;lado.</Hint>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Input label="Horário de entrada" type="time" value={f.entrada} onChange={u('entrada')} />
            <Input label="Jornada por dia (horas)" value={f.jornada} onChange={u('jornada')} />
            <Input label="Tolerância de atraso (min)" type="number" value={f.tolerancia} onChange={u('tolerancia')} />
            <Input label="Almoço previsto (min)" type="number" value={f.almoco} onChange={u('almoco')} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <Button
              variant="brand"
              iconLeft="check"
              onClick={function () {
                DB.A.setConfig(
                  'ponto',
                  Object.assign({}, def, {
                    entrada: f.entrada || '09:00',
                    jornada: +String(f.jornada).replace(',', '.') || 8,
                    tolerancia: +f.tolerancia || 0,
                    almoco: +f.almoco || 60,
                  }),
                );
                toast('Jornada padrão salva');
              }}
            >
              Salvar
            </Button>
          </div>
        </Card>
        <Card
          title={
            <React.Fragment>
              <Emo e="👥" />
              Regras por operador
            </React.Fragment>
          }
        >
          <Hint>Deixe em branco para usar a jornada&nbsp;padrão.</Hint>
          {db.operadores.map(function (o) {
            return <OpRegra key={o.id} o={o} def={def} />;
          })}
        </Card>
        <AvisosCard />
      </Grid>
    );
  }
  function AvisosCard() {
    const { Card, Switch } = DS;
    const db = DB.useDB();
    const def = Object.assign({ entrada: '09:00', jornada: 8, tolerancia: 10, almoco: 60 }, (db.config && db.config.ponto) || {});
    const av = Object.assign({ marcacoes: true, atraso: true, ausente: true, almocoLongo: true, semSaida: true }, def.avisos || {});
    const L = [
      ['marcacoes', 'Cada marcação (entrada, almoço, volta e saída)'],
      ['atraso', 'Entrada com atraso'],
      ['ausente', 'Operador não bateu o ponto (30 min depois do horário)'],
      ['almocoLongo', 'Almoço passou do tempo (15 min a mais)'],
      ['semSaida', 'Esqueceu de registrar a saída'],
    ];
    return (
      <Card
        title={
          <React.Fragment>
            <Emo e="🔔" />
            Notificações do ponto
          </React.Fragment>
        }
      >
        <Hint>
          Chegam no sino do painel e no celular ou computador onde você ativou as notificações (Configurações → Notificações). O servidor envia mesmo
          com o painel&nbsp;fechado.
        </Hint>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {L.map(function (x) {
            return (
              <Switch
                key={x[0]}
                checked={av[x[0]] !== false}
                label={x[1]}
                onChange={function (v) {
                  const n = Object.assign({}, av);
                  n[x[0]] = v;
                  DB.A.setConfig('ponto', Object.assign({}, def, { avisos: n }));
                }}
              />
            );
          })}
        </div>
      </Card>
    );
  }
  function PontoWatcher() {
    const db = DB.useDB();
    const log = db.pontoLog || [];
    const top = log.length ? log[0].id : '';
    React.useEffect(
      function () {
        if (!log.length) return;
        const K = 'ms7-ponto-seen';
        const seen = +localStorage.getItem(K) || 0;
        const mx = Math.max.apply(
          null,
          log.map(function (x) {
            return x.at;
          }),
        );
        if (!seen) {
          localStorage.setItem(K, String(mx));
          return;
        }
        log
          .filter(function (x) {
            return x.at > seen;
          })
          .slice(0, 5)
          .reverse()
          .forEach(function (x) {
            notify({ type: 'ponto', title: x.title, body: x.body, local: true });
          });
        if (mx > seen) localStorage.setItem(K, String(mx));
      },
      [top],
    );
    return null;
  }
  function MeuPonto({ opId }) {
    const { Card, Button, DataTable, Badge } = DS;
    const db = DB.useDB();
    useTick(1000);
    const t = hoje();
    const r = (db.ponto || []).find(function (p) {
      return p.id === 'pt_' + opId + '_' + t;
    }) || { opId: opId, data: t };
    const c = calc(r, db);
    const cf = cfg(db, opId);
    const now = new Date();
    const [pz, setPz] = React.useState(false);
    const acts = !r.entrada
      ? [['entrada', 'Registrar entrada', 'log-in', 'brand']]
      : r.saida
        ? []
        : c.emPausa
          ? []
          : r.almocoIni && !r.almocoFim
            ? [['almocoFim', 'Voltar do almoço', 'coffee', 'brand']]
            : (!r.almocoIni ? [['almocoIni', 'Sair para almoço', 'utensils', 'outline']] : []).concat([
                ['pausa', 'Sair para compromisso', 'pause', 'outline'],
                ['saida', 'Registrar saída', 'log-out', 'brand'],
              ]);
    function marcar(k) {
      if (k === 'pausa') {
        setPz(true);
        return;
      }
      if (k === 'saida' && !confirm('Registrar a saída agora? Depois disso o dia fica encerrado.')) return;
      DB.A.pontoMarcar(opId, k);
    }
    const pct = Math.min(100, (c.trab / (cf.jornada * 60)) * 100);
    const sem = resumo(db, rowsOf(db, opId, '7 dias')),
      mes = resumo(db, rowsOf(db, opId, 'Este mês'));
    const hist = rowsOf(db, opId, '30 dias')
      .slice()
      .sort(function (a, b) {
        return a.data < b.data ? 1 : -1;
      });
    const e = EST[c.estado];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Card padding={28}>
          <div className="ms7p-hero">
            <div className="ms7p-date">
              {(function (s) {
                return s.charAt(0).toUpperCase() + s.slice(1);
              })(now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: TZ }))}
            </div>
            <div className="ms7p-clock ms7-num">
              {now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: TZ })}
            </div>
            <div className="ms7p-sub">
              <Badge tone={e[1]}>{e[0]}</Badge>
              <span>{'Entrada prevista ' + cf.entrada + ' · jornada ' + cf.jornada + 'h'}</span>
            </div>
            {c.emPausa ? (
              <div className="ms7p-pause">
                <DS.Badge tone="orange">
                  <DS.Icon name="pause" size={12} strokeWidth={2.2} />
                  {'Em pausa: ' + c.emPausa.motivo + ' · desde ' + hm(c.emPausa.ini)}
                </DS.Badge>
                <span className="t ms7-num">{cron(Date.now() - c.emPausa.ini)}</span>
                <DS.Button
                  variant="brand"
                  iconLeft="play"
                  fullWidth
                  onClick={function () {
                    DB.A.pontoVolta(opId);
                  }}
                  style={{ height: 50, fontSize: 15, borderRadius: 12 }}
                >
                  Voltar ao trabalho
                </DS.Button>
              </div>
            ) : null}
            {acts.length ? (
              <div className="ms7p-actions">
                {acts.map(function (a) {
                  return (
                    <Button
                      key={a[0]}
                      variant={a[3]}
                      iconLeft={a[2]}
                      fullWidth
                      onClick={function () {
                        marcar(a[0]);
                      }}
                    >
                      {a[1]}
                    </Button>
                  );
                })}
              </div>
            ) : c.emPausa ? null : (
              <div className="ms7p-done">
                <span className="ico">
                  <DS.Icon name="circle-check" size={16} strokeWidth={2} />
                </span>
                Dia encerrado. Até amanhã!
              </div>
            )}
            <Marks r={r} />
            <div className="ms7p-prog">
              <div className="l">
                <span>
                  {'Trabalhado hoje '}
                  <span className="v ms7-num">{dur(c.trab)}</span>
                </span>
                <span>{'Meta ' + cf.jornada + 'h'}</span>
              </div>
              <div className="ms7-bar">
                <i style={{ width: pct + '%', background: pct >= 100 ? 'var(--ms7-green)' : 'var(--ms7-lime-600)' }} />
              </div>
            </div>
            {c.atraso > 0 ? (
              <div style={{ marginTop: 12 }}>
                <DS.Badge tone="error">{'Entrada com atraso de ' + dur(c.atraso)}</DS.Badge>
              </div>
            ) : null}
            {(r.pausas || []).length ? (
              <span style={{ marginTop: 10, fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)' }}>
                {'Pausas hoje (' + dur(c.fora) + ' fora): ' + pausasTxt(r)}
              </span>
            ) : null}
            <span className="ms7p-note">{'O horário registrado é o do servidor. Esqueceu de marcar? Fale com o administrador para\u00A0ajustar.'}</span>
          </div>
          <PausaModal
            open={pz}
            onClose={function () {
              setPz(false);
            }}
            onGo={function (m) {
              setPz(false);
              DB.A.pontoPausa(opId, m);
            }}
          />
        </Card>
        <KpiRow
          items={[
            { icon: 'calendar-days', label: 'Últimos 7 dias', value: dur(sem.min), tone: 'blue' },
            { icon: 'calendar', label: 'Este mês', value: dur(mes.min), tone: 'green' },
            { icon: 'alarm-clock', label: 'Atrasos no mês', value: mes.atrasos, tone: 'orange' },
            { icon: 'scale', label: 'Saldo do mês', value: (mes.saldo >= 0 ? '+' : '') + dur(mes.saldo), tone: 'yellow' },
          ]}
        />
        <Card
          title={
            <React.Fragment>
              <Emo e="⏱️" />
              Meu histórico (30 dias)
            </React.Fragment>
          }
        >
          {hist.length ? (
            <DataTable
              rows={hist}
              columns={[
                {
                  key: 'data',
                  label: 'Dia',
                  render: function (x) {
                    return <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{diaLabel(x.data)}</span>;
                  },
                },
                {
                  key: 'entrada',
                  label: 'Entrada',
                  align: 'center',
                  render: function (x) {
                    return hm(x.entrada);
                  },
                },
                {
                  key: 'almoco',
                  label: 'Almoço',
                  align: 'center',
                  render: function (x) {
                    return (
                      <span style={{ whiteSpace: 'nowrap' }}>
                        {x.almocoIni ? (x.almocoFim ? hm(x.almocoIni) + ' – ' + hm(x.almocoFim) : hm(x.almocoIni) + ' (em almoço)') : '—'}
                      </span>
                    );
                  },
                },
                {
                  key: 'saida',
                  label: 'Saída',
                  align: 'center',
                  render: function (x) {
                    return hm(x.saida);
                  },
                },
                {
                  key: 'trab',
                  label: 'Trabalhado',
                  align: 'right',
                  render: function (x) {
                    return <span className="ms7-num" style={{ fontWeight: 600 }}>{dur(calc(x, db).trab)}</span>;
                  },
                },
                {
                  key: 'saldo',
                  label: 'Saldo',
                  align: 'right',
                  render: function (x) {
                    return <Saldo m={calc(x, db).saldo} />;
                  },
                },
                {
                  key: 'st',
                  label: '',
                  align: 'center',
                  render: function (x) {
                    return <St r={x} db={db} />;
                  },
                },
              ]}
            />
          ) : (
            <Empty art="Clock" title="Nenhum registro ainda" sub={'Registre sua entrada para começar.'} />
          )}
        </Card>
      </div>
    );
  }
  function PontoScreen({ session, role }) {
    if (role === 'operador') return <MeuPonto opId={session.opId} />;
    const [tab, setTab] = usePersist('ponto-tab', 'agora');
    const [ed, setEd] = React.useState(null);
    const T = { agora: AgoraTab, relatorio: RelatorioTab, registros: RegistrosTab, regras: RegrasTab }[tab] || AgoraTab;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <DS.Tabs
          variant="chips"
          value={tab}
          onChange={setTab}
          items={[
            { id: 'agora', label: 'Agora' },
            { id: 'relatorio', label: 'Relatório' },
            { id: 'registros', label: 'Registros' },
            { id: 'regras', label: 'Jornada' },
          ]}
        />
        <T onEdit={setEd} />
        <EditModal
          r={ed}
          onClose={function () {
            setEd(null);
          }}
        />
      </div>
    );
  }
  Object.assign(window, { PontoScreen: PontoScreen, PontoWatcher: PontoWatcher });
})();
