/* App principal (shell): login, cabeçalho, busca, layout — visual novo (Zeph).
   Toda a lógica (sessão, papéis, navegação, sync, notificações) é a mesma do original. */
(function () {
  const DS = window.MS7DesignSystem_5d5172;
  const NAV = [
    { id: 'geral', label: 'Dashboard', icon: 'layout-dashboard' },
    { id: 'tarefas', label: 'Tarefas', icon: 'square-check' },
    { id: 'cooperacoes', label: 'Cooperações', icon: 'briefcase', badge: 5 },
    { id: 'bau', label: 'Baú', icon: 'package' },
    { id: 'metas', label: 'Metas', icon: 'target' },
    { id: 'ponto', label: 'Ponto', icon: 'clock' },
    { id: 'alunos', label: 'Alunos', icon: 'graduation-cap' },
    { id: 'analises', label: 'Análises', icon: 'chart-column' },
    { id: 'financeiro', label: 'Financeiro', icon: 'wallet' },
    { id: 'avisos', label: 'Avisos', icon: 'megaphone' },
    { id: 'gestao', label: 'Gestão', icon: 'sliders-horizontal' },
  ];
  const FOOT = [
    { id: 'proxies', label: 'Proxies', icon: 'globe' },
    { id: 'assinaturas', label: 'Assinatura', icon: 'credit-card' },
    { id: 'config', label: 'Configurações', icon: 'settings' },
  ];
  const TITLES = {
    ponto: 'Controle de ponto',
    geral: 'Dashboard',
    tarefas: 'Tarefas',
    cooperacoes: 'Cooperações',
    bau: 'Baú',
    minhas: 'Minhas cooperações',
    metas: 'Metas',
    alunos: 'Alunos',
    analises: 'Análises',
    financeiro: 'Financeiro',
    listas: 'Listas globais',
    avisos: 'Avisos',
    gestao: 'Gestão',
    proxies: 'Proxies',
    assinaturas: 'Assinatura',
    config: 'Configurações',
  };
  const SUBT = {
    geral: 'Resumo da operação, resultados e próximas ações.',
    tarefas: 'O que precisa ser feito hoje, por responsável.',
    cooperacoes: 'Acompanhe depósitos, saques e o resultado de cada cooperação.',
    bau: 'Cooperações do tipo baú, com o mesmo acompanhamento.',
    metas: 'Metas por operador e cooperação, com andamento ao vivo.',
    alunos: 'Visão geral e gestão dos alunos.',
    analises: 'Comparações, redes, melhores horários e projeção.',
    financeiro: 'Comissões a pagar e custos de ferramentas.',
    avisos: 'Publique avisos para a equipe.',
    gestao: 'Operadores, ponto, redes, chaves PIX, loja, ranking e notificações.',
    proxies: 'Suas proxies e a loja.',
    assinaturas: 'Plano, vencimento e pagamento por PIX.',
    config: 'Marca, acessos, notificações, Telegram e sua conta.',
    ponto: 'Entradas, pausas e saídas de hoje.',
  };
  const CSS = [
    '.ms7-shell{display:flex;min-height:100vh;box-sizing:border-box}',
    '.ms7-shell.is-top{flex-direction:column}',
    '.ms7-shell.is-top .ms7-head{top:62px}',
    '.ms7-shell.is-top .ms7-main{max-width:1560px}',
    '.ms7-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:24px;padding:0 var(--page-pad) 56px;max-width:1560px;margin:0 auto;width:100%}',
    '.ms7-head{position:sticky;top:0;z-index:40;display:flex;align-items:center;flex-wrap:wrap;gap:12px 16px;min-height:76px;padding:14px 0 14px;margin:0 calc(-1 * var(--page-pad));padding-left:var(--page-pad);padding-right:var(--page-pad);background:color-mix(in oklab,var(--surface-page) 82%,transparent);backdrop-filter:blur(14px) saturate(1.2);-webkit-backdrop-filter:blur(14px) saturate(1.2)}',
    '.ms7-head::after{content:"";position:absolute;left:var(--page-pad);right:var(--page-pad);bottom:0;height:1px;background:var(--line);opacity:0;transition:opacity 240ms}',
    '.ms7-head.is-stuck::after{opacity:1}',
    '.ms7-head h1{flex:1 1 200px;min-width:0;margin:0;font-size:var(--text-page-title);font-weight:600;letter-spacing:-.03em;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;animation:ms7-up-sm 420ms var(--ease-out) both}',
    '.ms7-head h1 em{font-style:normal;font-weight:600;letter-spacing:-.03em;color:var(--text-brand)}',
    '.ms7-head h1 .ms7-emo{font-size:.9em;margin-left:8px}',
    '.ms7-head-sub{display:block;font-size:13px;font-weight:500;color:var(--text-secondary);letter-spacing:0;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.ms7-head-tools{display:flex;align-items:center;gap:6px;flex-shrink:0;margin-left:auto}',
    '.ms7-search-btn{height:38px;display:inline-flex;align-items:center;gap:8px;padding:0 10px 0 12px;border-radius:11px;border:1px solid var(--line);background:var(--surface-card);color:var(--text-secondary);font-size:13px;font-weight:500;cursor:pointer;transition:border-color 200ms,box-shadow 240ms var(--ease-standard),transform 240ms var(--ease-standard),color 200ms}',
    '.ms7-search-btn:hover{border-color:var(--line-strong);color:var(--text-primary);transform:translateY(-1px);box-shadow:0 8px 20px -14px rgba(17,21,18,.35)}',
    '.ms7-search-btn kbd{font-family:inherit;font-size:11px;font-weight:600;padding:2px 6px;border-radius:6px;background:var(--surface-muted);color:var(--text-secondary);border:1px solid var(--line)}',
    '.ms7-user{display:flex;align-items:center;gap:10px;padding-left:14px;margin-left:8px;border-left:1px solid var(--line)}',
    '.ms7-user-pic{position:relative;display:block;cursor:pointer;border-radius:50%}',
    '.ms7-user-cam{position:absolute;right:-3px;bottom:-3px;width:18px;height:18px;border-radius:50%;background:var(--surface-card);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--text-secondary);opacity:0;transform:scale(.6);transition:opacity 200ms,transform 240ms var(--ease-spring)}',
    '.ms7-user-pic:hover .ms7-user-cam{opacity:1;transform:none}',
    '.ms7-user-sync{position:absolute;left:-2px;bottom:-1px;width:11px;height:11px;border-radius:50%;border:2px solid var(--surface-page);background:#9AA39D}',
    '.ms7-user-sync.online{background:var(--ms7-green)}.ms7-user-sync.syncing{background:var(--ms7-yellow);animation:ms7-blink 1s ease-in-out infinite}.ms7-user-sync.offline{background:var(--ms7-error)}',
    '.ms7-user-name{display:flex;flex-direction:column;line-height:1.2}.ms7-user-name b{font-size:14px;font-weight:600;letter-spacing:-.01em;white-space:nowrap;max-width:200px;overflow:hidden;text-overflow:ellipsis}.ms7-user-name span{font-size:12px;font-weight:500;color:var(--text-secondary)}',
    '.ms7-banner{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 16px;border-radius:14px;background:var(--surface-card);box-shadow:var(--shadow-card);font-size:14px;font-weight:500}',
    '.ms7-banner.is-err{background:color-mix(in oklab,var(--ms7-error) 8%,var(--surface-card));box-shadow:0 0 0 1px color-mix(in oklab,var(--ms7-error) 25%,transparent)}',
    /* busca */
    '.ms7-cmdk-bg{position:fixed;inset:0;z-index:1600;background:color-mix(in oklab,#0B0D0C 42%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;justify-content:center;align-items:flex-start;padding:12vh 16px 16px;animation:ms7-fade 200ms var(--ease-out) both}',
    '.ms7-cmdk{width:100%;max-width:620px;max-height:70vh;display:flex;flex-direction:column;background:var(--surface-card);color:var(--text-primary);border-radius:18px;box-shadow:var(--shadow-pop);overflow:hidden;animation:ms7-pop 320ms var(--ease-out) both}',
    '.ms7-cmdk-in{display:flex;align-items:center;gap:12px;padding:6px 18px;border-bottom:1px solid var(--line)}',
    '.ms7-cmdk-in input{flex:1;height:52px;border:0;outline:0;background:transparent;font-family:inherit;font-size:16px;font-weight:500;color:var(--text-primary)}',
    '.ms7-cmdk-in input::placeholder{color:var(--ms7-gray-400)}',
    '.ms7-cmdk-list{overflow-y:auto;padding:8px}',
    '.ms7-cmdk-it{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:11px;cursor:pointer;transition:background 140ms}',
    '.ms7-cmdk-it:hover,.ms7-cmdk-it.is-act{background:var(--surface-muted)}',
    '.ms7-cmdk-it .tile{width:34px;height:34px;border-radius:10px;background:var(--surface-muted);display:flex;align-items:center;justify-content:center;color:var(--text-primary);flex-shrink:0}',
    '.ms7-cmdk-it:hover .tile,.ms7-cmdk-it.is-act .tile{background:var(--ms7-lime-500);color:#0C3B26}',
    '.ms7-cmdk-it .t{font-size:14px;font-weight:600;letter-spacing:-.005em}.ms7-cmdk-it .s{font-size:12.5px;font-weight:500;color:var(--text-secondary);margin-top:1px}',
    '.ms7-cmdk-it .go{margin-left:auto;color:var(--text-secondary);opacity:0;transform:translateX(-4px);transition:opacity 160ms,transform 200ms var(--ease-out)}',
    '.ms7-cmdk-it:hover .go,.ms7-cmdk-it.is-act .go{opacity:1;transform:none}',
    '.ms7-cmdk-foot{display:flex;gap:14px;padding:10px 18px;border-top:1px solid var(--line);font-size:12px;font-weight:500;color:var(--text-secondary);background:var(--surface-muted)}',
    '.ms7-cmdk-foot kbd{font-family:inherit;font-size:11px;font-weight:600;padding:1px 6px;border-radius:5px;background:var(--surface-card);border:1px solid var(--line);margin-right:4px}',
    /* login */
    '.ms7-login{min-height:100vh;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);background:var(--surface-page);color:var(--text-primary);position:relative}',
    '.ms7-login-form{display:flex;flex-direction:column;justify-content:center;padding:40px 24px;position:relative}',
    '.ms7-login-box{width:100%;max-width:400px;margin:0 auto;animation:ms7-up 600ms var(--ease-out) both}',
    '.ms7-login-brand{display:flex;align-items:center;gap:12px;margin-bottom:38px}',
    '.ms7-login-brand .mark{width:40px;height:40px;border-radius:12px;background:var(--ms7-black);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;letter-spacing:-.02em;box-shadow:0 10px 24px -12px rgba(0,0,0,.6)}',
    'html[data-theme="dark"] .ms7-login-brand .mark{background:#F3F5F1;color:#0B0D0C}',
    '.ms7-login-brand .nm{display:flex;flex-direction:column;line-height:1.1}.ms7-login-brand .nm b{font-size:16px;font-weight:600;letter-spacing:-.02em}.ms7-login-brand .nm span{font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--text-secondary);margin-top:4px}',
    '.ms7-login h2{margin:0;font-size:30px;font-weight:600;letter-spacing:-.035em;line-height:1.05}',
    '.ms7-login h2 em{font-style:normal;font-weight:600;color:var(--text-brand)}',
    '.ms7-login .sub{margin:10px 0 28px;font-size:15px;font-weight:500;color:var(--text-secondary);line-height:1.5}',
    '.ms7-login .card{padding:4px 0 0}',
    '.ms7-login .foot{margin-top:28px;font-size:12.5px;font-weight:500;color:var(--text-secondary);display:flex;gap:6px;align-items:center}',
    '.ms7-login .lnk{background:none;border:0;padding:0;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;color:var(--text-primary);text-decoration:underline;text-underline-offset:3px;text-decoration-color:color-mix(in oklab,var(--text-primary) 35%,transparent);transition:text-decoration-color 200ms}',
    '.ms7-login .lnk:hover{text-decoration-color:var(--text-primary)}',
    '.ms7-login-side{position:relative;overflow:hidden;background:#0A5A3C;background-image:radial-gradient(900px 600px at 80% -10%,rgba(201,247,117,.22),transparent 60%),radial-gradient(700px 500px at 0% 100%,rgba(7,67,45,.9),transparent 60%),linear-gradient(160deg,#0C6A47,#07432D);color:#fff;display:flex;flex-direction:column;justify-content:center;padding:64px 56px}',
    '.ms7-login-side::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse at 50% 40%,#000 30%,transparent 75%);-webkit-mask-image:radial-gradient(ellipse at 50% 40%,#000 30%,transparent 75%)}',
    '.ms7-login-side .ey{position:relative;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#C9F775;margin-bottom:18px;animation:ms7-up 600ms var(--ease-out) both}',
    '.ms7-login-side h3{position:relative;margin:0 0 14px;font-size:clamp(28px,3vw,42px);font-weight:500;letter-spacing:-.03em;line-height:1.05;max-width:520px;animation:ms7-up 600ms 80ms var(--ease-out) both}',
    '.ms7-login-side h3 em{font-style:normal;font-weight:600;color:#C9F775}',
    '.ms7-login-side p{position:relative;margin:0 0 36px;font-size:15px;font-weight:400;color:rgba(255,255,255,.72);max-width:440px;line-height:1.55;animation:ms7-up 600ms 160ms var(--ease-out) both}',
    '.ms7-prev{position:relative;max-width:560px;margin-top:54px;animation:ms7-up 700ms 240ms var(--ease-out) both}',
    '.ms7-prev-card{background:#fff;color:#111512;border-radius:18px;padding:20px 22px;box-shadow:0 40px 80px -30px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.1);font-family:var(--font-sans)}',
    '.ms7-prev-top{display:flex;align-items:center;gap:10px;margin-bottom:16px}.ms7-prev-top .dot{width:8px;height:8px;border-radius:50%;background:#15803D;box-shadow:0 0 0 3px rgba(21,128,61,.18)}.ms7-prev-top b{font-size:13px;font-weight:600}.ms7-prev-top span{margin-left:auto;font-size:11px;font-weight:600;color:#6B746F;background:#F0F2EE;padding:3px 8px;border-radius:999px}',
    '.ms7-prev-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}',
    '.ms7-prev-kpi{padding:10px 12px;border-radius:12px;background:#F5F6F3;box-shadow:inset 0 0 0 1px #E6E8E3}.ms7-prev-kpi small{display:block;font-size:10.5px;font-weight:600;color:#6B746F;letter-spacing:.02em;margin-bottom:4px}.ms7-prev-kpi b{font-size:17px;font-weight:600;letter-spacing:-.03em;font-variant-numeric:tabular-nums}',
    '.ms7-prev-chart{display:flex;align-items:flex-end;gap:6px;height:64px;padding:0 2px}.ms7-prev-chart i{flex:1;border-radius:4px 4px 2px 2px;background:#C9F775;transform-origin:bottom;animation:ms7-prev-bar 3s var(--ease-out) infinite}',
    '.ms7-prev-chart i:nth-child(odd){background:#DDF2E5}.ms7-prev-chart i:last-child{background:#0A5A3C}',
    '@keyframes ms7-prev-bar{0%{transform:scaleY(.15)}30%,85%{transform:scaleY(1)}100%{transform:scaleY(.15)}}',
    '.ms7-prev-rows{display:flex;flex-direction:column;gap:8px;margin-top:14px}.ms7-prev-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;background:#F7F8F6}.ms7-prev-row .av{width:22px;height:22px;border-radius:50%;background:#DDF2E5;color:#0A5A3C;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center}.ms7-prev-row .nm{font-size:12px;font-weight:600}.ms7-prev-row .vl{margin-left:auto;font-size:12px;font-weight:600;color:#15803D;font-variant-numeric:tabular-nums}.ms7-prev-row .vl.neg{color:#D93025}',
    '.ms7-prev-bar{height:4px;border-radius:4px;background:#E6E8E3;overflow:hidden;width:60px}.ms7-prev-bar i{display:block;height:100%;background:#15803D;transform-origin:left;animation:ms7-grow-x 1.4s var(--ease-out) both}',
    '.ms7-prev-toast{position:absolute;right:-18px;top:-48px;display:flex;gap:10px;align-items:flex-start;width:272px;padding:12px 14px;border-radius:14px;background:#111512;color:#fff;box-shadow:0 30px 60px -24px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.08);animation:ms7-prev-toast 7s var(--ease-spring) infinite}',
    '.ms7-prev-toast .ic{width:30px;height:30px;border-radius:9px;background:#2AABEE;display:flex;align-items:center;justify-content:center;flex-shrink:0}.ms7-prev-toast b{display:block;font-size:12.5px;font-weight:600}.ms7-prev-toast span{display:block;font-size:11.5px;color:rgba(255,255,255,.7);margin-top:2px;line-height:1.4}',
    '@keyframes ms7-prev-toast{0%,8%{opacity:0;transform:translateY(-14px) scale(.96)}16%,70%{opacity:1;transform:none}80%,100%{opacity:0;transform:translateY(6px) scale(.98)}}',
    '.ms7-prev-ring{position:absolute;right:-34px;bottom:-34px;width:112px;height:112px;border-radius:50%;background:#fff;box-shadow:0 30px 60px -24px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;animation:ms7-float 5s var(--ease-in-out) infinite}',
    '.ms7-prev-ring svg{position:absolute;inset:0}.ms7-prev-ring circle.bg{stroke:#E6E8E3}.ms7-prev-ring circle.fg{stroke:#0A5A3C;stroke-linecap:round;stroke-dasharray:283;stroke-dashoffset:283;animation:ms7-prev-ring 4s var(--ease-out) infinite;transform:rotate(-90deg);transform-origin:center}',
    '@keyframes ms7-prev-ring{0%{stroke-dashoffset:283}60%,90%{stroke-dashoffset:62}100%{stroke-dashoffset:62;opacity:0}}',
    '.ms7-prev-ring b{position:relative;font-size:18px;font-weight:600;color:#111512;letter-spacing:-.03em;line-height:1}.ms7-prev-ring small{position:relative;display:block;font-size:9.5px;font-weight:600;color:#6B746F;text-align:center;margin-top:2px}',
    '.ms7-login-side .feats{position:relative;display:flex;gap:22px;flex-wrap:wrap;margin-top:44px;animation:ms7-up 600ms 360ms var(--ease-out) both}',
    '.ms7-login-side .feat{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;color:rgba(255,255,255,.82)}.ms7-login-side .feat i{width:26px;height:26px;border-radius:8px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;color:#C9F775;font-style:normal}',
    '.ms7-login-theme{position:absolute;top:18px;right:18px;z-index:2;width:40px;height:40px;border-radius:12px;border:1px solid var(--line);background:var(--surface-card);color:var(--text-primary);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 240ms var(--ease-spring),background 200ms}',
    '.ms7-login-theme:hover{transform:rotate(-12deg) scale(1.05)}',
    '.ms7-login-form .ms7-login-theme{right:auto;left:18px}',
    /* black glass (tema escuro) */
    'html[data-theme="dark"] .ms7-head{background:color-mix(in oklab,var(--surface-page) 72%,transparent);backdrop-filter:blur(22px) saturate(1.3);-webkit-backdrop-filter:blur(22px) saturate(1.3)}',
    'html[data-theme="dark"] .ms7-search-btn{background:var(--glass);box-shadow:var(--glass-edge);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}',
    'html[data-theme="dark"] .ms7-search-btn kbd{background:rgba(255,255,255,.08);border-color:var(--line)}',
    'html[data-theme="dark"] .ms7-user-cam{background:var(--glass-solid)}',
    'html[data-theme="dark"] .ms7-user-sync{border-color:#0b0d0c}',
    'html[data-theme="dark"] .ms7-banner{background:var(--glass);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur)}',
    'html[data-theme="dark"] .ms7-cmdk-bg{background:rgba(4,5,5,.55);backdrop-filter:blur(12px) saturate(1.2);-webkit-backdrop-filter:blur(12px) saturate(1.2)}',
    'html[data-theme="dark"] .ms7-cmdk{background:var(--glass-solid);backdrop-filter:blur(30px) saturate(1.4);-webkit-backdrop-filter:blur(30px) saturate(1.4)}',
    'html[data-theme="dark"] .ms7-cmdk-it:hover,html[data-theme="dark"] .ms7-cmdk-it.is-act{background:var(--glass-2)}',
    'html[data-theme="dark"] .ms7-cmdk-it .tile{background:rgba(255,255,255,.08)}',
    'html[data-theme="dark"] .ms7-cmdk-it:hover .tile,html[data-theme="dark"] .ms7-cmdk-it.is-act .tile{background:var(--ms7-lime-500);color:var(--text-on-lime)}',
    'html[data-theme="dark"] .ms7-cmdk-foot{background:rgba(255,255,255,.03)}html[data-theme="dark"] .ms7-cmdk-foot kbd{background:rgba(255,255,255,.08)}',
    'html[data-theme="dark"] .ms7-login{background:#070808}',
    'html[data-theme="dark"] .ms7-login-form{background:radial-gradient(700px 500px at 10% 0%,rgba(201,247,117,.08),transparent 60%)}',
    'html[data-theme="dark"] .ms7-login-side{background:#0A0C0B;background-image:radial-gradient(900px 600px at 80% -10%,rgba(201,247,117,.16),transparent 60%),radial-gradient(800px 600px at 0% 100%,rgba(10,90,60,.55),transparent 62%),linear-gradient(160deg,#101412,#070808)}',
    'html[data-theme="dark"] .ms7-login-side::before{background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)}',
    'html[data-theme="dark"] .ms7-login-brand .mark{background:var(--ms7-lime-500);color:var(--text-on-lime);box-shadow:0 14px 30px -14px rgba(201,247,117,.6)}',
    'html[data-theme="dark"] .ms7-login .lnk{color:var(--text-primary)}',
    'html[data-theme="dark"] .ms7-login-theme{background:var(--glass);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}',
    'html[data-theme="dark"] .ms7-prev-card{background:rgba(20,23,21,.8);color:#F1F3EF;backdrop-filter:blur(26px) saturate(1.4);-webkit-backdrop-filter:blur(26px) saturate(1.4);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 0 0 1px rgba(255,255,255,.12),0 50px 100px -40px rgba(0,0,0,.9)}',
    'html[data-theme="dark"] .ms7-prev-top .dot{background:#4ADE80;box-shadow:0 0 0 3px rgba(74,222,128,.2)}html[data-theme="dark"] .ms7-prev-top span{color:#8E978F;background:rgba(255,255,255,.08)}',
    'html[data-theme="dark"] .ms7-prev-kpi{background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}html[data-theme="dark"] .ms7-prev-kpi small{color:#8E978F}',
    'html[data-theme="dark"] .ms7-prev-chart i{background:#C9F775}html[data-theme="dark"] .ms7-prev-chart i:nth-child(odd){background:rgba(201,247,117,.28)}html[data-theme="dark"] .ms7-prev-chart i:last-child{background:#4ADE80}',
    'html[data-theme="dark"] .ms7-prev-row{background:rgba(255,255,255,.05)}html[data-theme="dark"] .ms7-prev-row .av{background:rgba(201,247,117,.16);color:#C9F775}',
    'html[data-theme="dark"] .ms7-prev-bar{background:rgba(255,255,255,.1)}html[data-theme="dark"] .ms7-prev-bar i{background:#4ADE80}',
    'html[data-theme="dark"] .ms7-prev-row .vl{color:#4ADE80}html[data-theme="dark"] .ms7-prev-row .vl.neg{color:#FF6E66}html[data-theme="dark"] .ms7-prev-kpi b{color:#F1F3EF}',
    'html[data-theme="dark"] .ms7-prev-toast{background:rgba(20,23,21,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 0 0 1px rgba(255,255,255,.12),0 30px 60px -24px rgba(0,0,0,.8)}',
    'html[data-theme="dark"] .ms7-prev-ring{background:rgba(20,23,21,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 0 0 1px rgba(255,255,255,.12),0 30px 60px -24px rgba(0,0,0,.8)}',
    'html[data-theme="dark"] .ms7-prev-ring circle.bg{stroke:rgba(255,255,255,.1)}html[data-theme="dark"] .ms7-prev-ring circle.fg{stroke:#C9F775}html[data-theme="dark"] .ms7-prev-ring b{color:#F1F3EF}html[data-theme="dark"] .ms7-prev-ring small{color:#8E978F}',
    'html[data-theme="dark"] .ms7-login-side .feat i{background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}',
    '@media(max-width:980px){.ms7-login{grid-template-columns:1fr}.ms7-login-side{display:none}.ms7-login-form .ms7-login-theme{left:auto;right:18px}}',
    '@media(max-width:760px){.ms7-shell{display:block}.ms7-head{min-height:62px;padding-top:10px;padding-bottom:10px}.ms7-head h1{font-size:22px}.ms7-main{gap:16px;padding-bottom:calc(96px + env(safe-area-inset-bottom))}.ms7-user{padding-left:8px;margin-left:2px}}',
  ].join('');
  if (!document.getElementById('ms7-app-css')) {
    const s = document.createElement('style');
    s.id = 'ms7-app-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function TabbedPage({ tabs, storeKey, role, go, chips, session }) {
    const [t, setT] = React.useState(function () {
      return localStorage.getItem(storeKey) || tabs[0].id;
    });
    const cur =
      tabs.find(function (x) {
        return x.id === t;
      }) || tabs[0];
    const C = cur.C;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: 2 }}>
          <DS.Tabs
            variant={chips ? 'chips' : 'dark'}
            value={cur.id}
            onChange={function (v) {
              setT(v);
              localStorage.setItem(storeKey, v);
            }}
            items={tabs.map(function (x) {
              return { id: x.id, label: x.label, icon: x.icon };
            })}
            style={chips ? { flexWrap: 'wrap' } : { minWidth: Math.min(tabs.length * 150, 640) }}
          />
        </div>
        <div className="ms7-page" key={cur.id}>
          <C role={role} go={go} session={session} />
        </div>
      </div>
    );
  }
  function AnalisesScreen(p) {
    return (
      <TabbedPage
        {...p}
        storeKey="ms7op-analises"
        tabs={[
          { id: 'comparacao', label: 'Operadores', C: ComparacaoScreen },
          { id: 'redes', label: 'Redes', C: RedesScreen },
          { id: 'heatmap', label: 'Heatmap', C: HeatmapScreen },
          { id: 'projecao', label: 'Projeção', C: ProjecaoScreen },
        ]}
      />
    );
  }
  function GestaoScreen(p) {
    const all = [
      { id: 'operadores', label: 'Operadores', C: OperadoresTab },
      { id: 'ponto', label: 'Ponto', C: PontoScreen },
      { id: 'plataformas', label: 'Redes', C: PlataformasTab },
      { id: 'pix', label: 'Chaves PIX', C: PixTab },
      { id: 'cupons', label: 'Loja e cupons', C: CuponsTab },
      { id: 'ranking', label: 'Ranking', C: RankingTab },
      { id: 'notif', label: 'Notificações', C: NotificacoesTab },
    ];
    const tabs =
      p.role === 'cliente'
        ? all.filter(function (t) {
            return CLI_GESTAO.indexOf(t.id) >= 0;
          })
        : all;
    return <TabbedPage {...p} chips storeKey="ms7op-gestao" tabs={tabs} />;
  }
  function FinanceiroScreen(p) {
    return (
      <TabbedPage
        {...p}
        storeKey="ms7op-fin"
        tabs={[
          { id: 'folha', label: 'Pagamentos', C: FolhaScreen },
          { id: 'custos', label: 'Custos', C: CustosScreen },
        ]}
      />
    );
  }
  const OP_NAV = ['geral', 'tarefas', 'cooperacoes', 'bau', 'metas', 'ponto', 'avisos'];
  const OP_FOOT = ['config'];
  const CLI_NAV = ['geral', 'tarefas', 'cooperacoes', 'bau', 'metas', 'analises', 'financeiro', 'avisos', 'gestao'];
  const CLI_FOOT = ['proxies', 'assinaturas', 'config'];
  const CLI_GESTAO = ['operadores', 'plataformas', 'pix'];

  function TesteFaixa({ session, go, naPag }) {
    const [a, setA] = React.useState(null);
    React.useEffect(
      function () {
        if (!session || session.role !== 'cliente' || !DB.Sync.on()) return;
        const f = function () {
          DB.Sync.api('/api/assinatura')
            .then(function (r) {
              setA((r && r.assinatura) || null);
            })
            .catch(function () {});
        };
        f();
        const t = setInterval(f, 300000);
        return function () {
          clearInterval(t);
        };
      },
      [session && session.role],
    );
    if (!a || !a.venc) return null;
    const ms = a.venc - Date.now();
    const venc = ms <= 0;
    if (!a.teste && !venc) return null;
    const d = Math.max(0, Math.ceil(ms / 864e5));
    if (venc && naPag)
      return (
        <div className="ms7-banner is-err" style={{ fontWeight: 600 }}>
          <DS.Icon name="clock" size={16} />
          {(a.teste ? 'Seu teste grátis acabou' : 'Sua assinatura venceu') + '. Escolha um plano abaixo para continuar.'}
        </div>
      );
    if (naPag && a.teste)
      return (
        <div className="ms7-banner">
          <DS.Icon name="sparkles" size={16} />
          {'Você está no teste grátis · ' + (d <= 1 ? 'termina hoje' : 'faltam ' + d + ' dias') + '. Escolha um plano para continuar depois.'}
        </div>
      );
    if (venc)
      return (
        <div className="ms7-modal-bg" style={{ zIndex: 200 }}>
          <div className="ms7-modal" style={{ maxWidth: 440, padding: 32, textAlign: 'center', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 52, height: 52, borderRadius: 16, background: 'var(--surface-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DS.Icon name="clock" size={24} />
            </span>
            <b style={{ fontSize: 22, letterSpacing: '-0.02em', fontWeight: 600 }}>{a.teste ? 'Seu teste grátis acabou' : 'Sua assinatura venceu'}</b>
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.5 }}>Seus dados estão guardados. Escolha um plano e pague por PIX para continuar usando o painel.</span>
            <DS.Button
              variant="brand"
              size="lg"
              iconLeft="credit-card"
              style={{ marginTop: 6 }}
              onClick={function () {
                go('assinaturas');
              }}
            >
              Ver planos
            </DS.Button>
          </div>
        </div>
      );
    return (
      <div className="ms7-banner">
        <DS.Icon name="sparkles" size={16} />
        <span style={{ flex: 1, minWidth: 180 }}>{'Teste grátis · ' + (d <= 1 ? 'termina hoje' : 'faltam ' + d + ' dias')}</span>
        <DS.Button
          size="sm"
          variant="brand"
          onClick={function () {
            go('assinaturas');
          }}
        >
          Assinar agora
        </DS.Button>
      </div>
    );
  }

  /* prévia animada do produto (lado direito do login) */
  function ProductPreview() {
    return (
      <div className="ms7-prev" aria-hidden="true">
        <div className="ms7-prev-card ms7-glow">
          <div className="ms7-prev-top">
            <span className="dot" />
            <b>Operação de hoje</b>
            <span>ao vivo</span>
          </div>
          <div className="ms7-prev-kpis">
            <div className="ms7-prev-kpi">
              <small>Depósito</small>
              <b>
                <DS.CountUp value="R$ 47.848" duration={1600} />
              </b>
            </div>
            <div className="ms7-prev-kpi">
              <small>Saque</small>
              <b>
                <DS.CountUp value="R$ 52.310" duration={1800} />
              </b>
            </div>
            <div className="ms7-prev-kpi">
              <small>Lucro</small>
              <b style={{ color: '#15803D' }}>
                <DS.CountUp value="+R$ 4.462" duration={2000} />
              </b>
            </div>
          </div>
          <div className="ms7-prev-chart">
            {[30, 48, 36, 62, 44, 70, 58, 82, 66, 90].map(function (v, i) {
              return <i key={i} style={{ height: v + '%', animationDelay: i * 90 + 'ms' }} />;
            })}
          </div>
          <div className="ms7-prev-rows">
            {[
              ['NA', 'Nathan', '+R$ 1.022', 88],
              ['GO', 'Gabriel OP', '+R$ 725', 62],
              ['MA', 'Maylon', '+R$ 518', 44],
            ].map(function (r) {
              return (
                <div className="ms7-prev-row" key={r[0]}>
                  <span className="av">{r[0]}</span>
                  <span className="nm">{r[1]}</span>
                  <span className="ms7-prev-bar">
                    <i style={{ width: r[3] + '%' }} />
                  </span>
                  <span className="vl">{r[2]}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="ms7-prev-toast">
          <span className="ic">
            <DS.Icon name="send" size={14} color="#fff" strokeWidth={2.2} />
          </span>
          <div>
            <b>Ciclo fechado · Equipe Aurora</b>
            <span>Depósito R$ 12.480 · Saque R$ 15.920 · LUCRO de R$ 3.440</span>
          </div>
        </div>
        <div className="ms7-prev-ring">
          <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
            <circle className="bg" cx="56" cy="56" r="45" strokeWidth="8" />
            <circle className="fg" cx="56" cy="56" r="45" strokeWidth="8" />
          </svg>
          <div>
            <b>78%</b>
            <small>da meta</small>
          </div>
        </div>
      </div>
    );
  }

  function Login({ onLogin, theme, setTheme }) {
    const dk = theme === 'dark';
    const { Button, Input } = DS;
    const web = location.protocol.indexOf('http') === 0;
    const [srv, setSrv] = React.useState(web ? location.origin : DB.Sync.base() || '');
    const [email, setEmail] = React.useState(localStorage.getItem('ms7-last-email') || '');
    const [pw, setPw] = React.useState('');
    const [ver, setVer] = React.useState(false);
    const [err, setErr] = React.useState(window.ms7LoginMsg || '');
    const [busy, setBusy] = React.useState(false);
    const rtok = React.useMemo(function () {
      try {
        return new URLSearchParams(location.search).get('reset') || '';
      } catch (e) {
        return '';
      }
    }, []);
    const [modo, setModo] = React.useState(rtok ? 'reset' : /[?&]cadastro/.test(location.search) ? 'cad' : 'login');
    const [cf, setCf] = React.useState({ name: '', email: '', whatsapp: '', doc: '', password: '' });
    const cset = function (k) {
      return function (e) {
        const v = e.target.value;
        setCf(function (o) {
          const n = Object.assign({}, o);
          n[k] = v;
          return n;
        });
      };
    };
    const mZap = function (v) {
      v = String(v).replace(/\D/g, '').slice(0, 11);
      return v.length > 6 ? '(' + v.slice(0, 2) + ') ' + v.slice(2, v.length - 4) + '-' + v.slice(-4) : v.length > 2 ? '(' + v.slice(0, 2) + ') ' + v.slice(2) : v;
    };
    const mDoc = function (v) {
      v = String(v).replace(/\D/g, '').slice(0, 14);
      if (v.length <= 11)
        return v
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return v
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    };
    function cadastrar(e) {
      if (e) e.preventDefault();
      setErr('');
      setBusy(true);
      const em = cf.email.trim();
      post('/api/auth/signup', cf)
        .then(function () {
          return DB.Sync.login(srv, em, cf.password);
        })
        .then(function (u) {
          localStorage.setItem('ms7-last-email', em);
          onLogin({ role: u.role, opId: u.opId, name: u.name, real: true });
        })
        .catch(function (x) {
          setErr(x.message === 'Failed to fetch' ? 'Sem conexão com o servidor.' : x.message);
        })
        .then(function () {
          setBusy(false);
        });
    }
    const [fe, setFe] = React.useState('');
    const [msg, setMsg] = React.useState('');
    const [np, setNp] = React.useState('');
    const [np2, setNp2] = React.useState('');
    function post(p, b) {
      return fetch(srv.replace(/\/$/, '') + p, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) }).then(function (r) {
        return r
          .json()
          .catch(function () {
            return {};
          })
          .then(function (j) {
            if (!r.ok) throw new Error(j.error || 'Erro ' + r.status);
            return j;
          });
      });
    }
    function pedir(e) {
      if (e) e.preventDefault();
      setErr('');
      setBusy(true);
      post('/api/auth/forgot', { email: fe.trim() })
        .then(function () {
          setMsg('Se esse email tiver acesso ao painel, enviamos um link para criar uma senha nova. Confira a caixa de entrada e o spam.');
        })
        .catch(function (x) {
          setErr(x.message === 'Failed to fetch' ? 'Sem conexão com o servidor.' : x.message);
        })
        .then(function () {
          setBusy(false);
        });
    }
    function redefinir(e) {
      if (e) e.preventDefault();
      setErr('');
      if (np.length < 8) {
        setErr('A senha precisa ter pelo menos 8 caracteres');
        return;
      }
      if (np !== np2) {
        setErr('As duas senhas não são iguais');
        return;
      }
      setBusy(true);
      post('/api/auth/reset', { token: rtok, password: np })
        .then(function (j) {
          try {
            history.replaceState(null, '', location.pathname);
          } catch (x) {}
          setEmail(j.email || email);
          setPw('');
          setModo('login');
          setMsg('Senha criada. Entre com a senha nova.');
        })
        .catch(function (x) {
          setErr(x.message);
        })
        .then(function () {
          setBusy(false);
        });
    }
    const errBox = err ? (
      <div className="ms7-banner is-err" style={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, color: 'var(--ms7-error)', gap: 8, animation: 'ms7-up-sm 300ms var(--ease-out) both' }}>
        <DS.Icon name="circle-alert" size={16} />
        {err}
      </div>
    ) : null;
    const okBox = msg ? (
      <div className="ms7-banner" style={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, background: 'var(--ms7-lime-100)', color: 'var(--ms7-green-ink)', boxShadow: 'none', alignItems: 'flex-start', gap: 8, lineHeight: 1.45 }}>
        <DS.Icon name="circle-check" size={16} />
        {msg}
      </div>
    ) : null;
    function entrar(e) {
      if (e) e.preventDefault();
      if (!email || !pw) return;
      setErr('');
      setBusy(true);
      const em = email.trim();
      DB.Sync.login(srv, em, pw)
        .then(function (u) {
          localStorage.setItem('ms7-last-email', em);
          onLogin({ role: u.role, opId: u.opId, name: u.name, real: true });
        })
        .catch(function (x) {
          setErr(x.message === 'Failed to fetch' ? 'Sem conexão com o servidor. Confira sua internet e tente de novo.' : x.message);
        })
        .then(function () {
          setBusy(false);
        });
    }
    const showPw = (
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', cursor: 'pointer' }}>
        <DS.Checkbox checked={ver} onChange={setVer} />
        Mostrar senha
      </label>
    );
    const titles = {
      cad: ['Criar sua ', 'conta', 'Teste grátis por 3 dias. Sem cartão.'],
      esq: ['Esqueceu a ', 'senha?', 'Vamos mandar um link para o seu email.'],
      reset: ['Criar senha ', 'nova', 'Mínimo de 8 caracteres.'],
      login: ['Bem-vindo de ', 'volta', 'Use o email e a senha do seu acesso.'],
    }[modo];
    return (
      <div className="ms7-login">
        <div className="ms7-login-form">
          {setTheme ? (
            <button
              type="button"
              className="ms7-login-theme"
              onClick={function () {
                setTheme(dk ? 'light' : 'dark');
              }}
              aria-label={dk ? 'Tema claro' : 'Tema escuro'}
              title={dk ? 'Tema claro' : 'Tema escuro'}
            >
              <DS.Icon name={dk ? 'sun' : 'moon'} size={18} />
            </button>
          ) : null}
          <div className="ms7-login-box">
            <div className="ms7-login-brand">
              <span className="mark" aria-hidden="true">
                <span style={{ fontWeight: 400 }}>M</span>
                <span style={{ fontWeight: 700 }}>S</span>
              </span>
              <span className="nm">
                <b>MS Control</b>
                <span>Painel de operações</span>
              </span>
            </div>
            <h2>
              {titles[0]}
              <em>{titles[1]}</em>
            </h2>
            <p className="sub">{titles[2]}</p>
            <div className="card">
              {modo === 'cad' ? (
                <form onSubmit={cadastrar} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Input label="Nome" icon="user" value={cf.name} onChange={cset('name')} placeholder="Seu nome" autoComplete="name" />
                  <Input label="Email" type="email" icon="mail" value={cf.email} onChange={cset('email')} placeholder="seuemail@gmail.com" autoComplete="email" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Input label="WhatsApp" icon="phone" inputMode="tel" value={mZap(cf.whatsapp)} onChange={cset('whatsapp')} placeholder="(11) 99999-9999" />
                    <Input label="CPF ou CNPJ" icon="id-card" inputMode="numeric" value={mDoc(cf.doc)} onChange={cset('doc')} placeholder="000.000.000-00" />
                  </div>
                  <Input label="Senha" type={ver ? 'text' : 'password'} icon="lock" value={cf.password} onChange={cset('password')} hint="Mínimo de 8 caracteres" autoComplete="new-password" />
                  {showPw}
                  {errBox}
                  <Button type="submit" variant="brand" fullWidth size="lg" iconRight="arrow-right" disabled={busy || !cf.name.trim() || !cf.email.trim() || !cf.password || !cf.whatsapp || !cf.doc} onClick={cadastrar}>
                    {busy ? 'Criando…' : 'Criar conta e começar o teste'}
                  </Button>
                  <div className="foot" style={{ justifyContent: 'center', marginTop: 4 }}>
                    Já tem conta?
                    <button
                      type="button"
                      className="lnk"
                      onClick={function () {
                        setModo('login');
                        setErr('');
                      }}
                    >
                      Entrar
                    </button>
                  </div>
                </form>
              ) : modo === 'esq' ? (
                <form onSubmit={pedir} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Input
                    label="Email"
                    type="email"
                    icon="mail"
                    value={fe}
                    onChange={function (e) {
                      setFe(e.target.value);
                    }}
                    placeholder="seuemail@gmail.com"
                  />
                  {errBox}
                  {okBox}
                  <Button type="submit" variant="brand" fullWidth size="lg" iconRight="send" disabled={busy || !fe.trim() || !!msg} onClick={pedir}>
                    {busy ? 'Enviando…' : 'Enviar link'}
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    iconLeft="arrow-left"
                    onClick={function () {
                      setModo('login');
                      setErr('');
                      setMsg('');
                    }}
                  >
                    Voltar para o login
                  </Button>
                </form>
              ) : modo === 'reset' ? (
                <form onSubmit={redefinir} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Input
                    label="Senha nova"
                    type={ver ? 'text' : 'password'}
                    icon="lock"
                    value={np}
                    onChange={function (e) {
                      setNp(e.target.value);
                    }}
                    hint="Mínimo de 8 caracteres"
                    autoComplete="new-password"
                  />
                  <Input
                    label="Repita a senha nova"
                    type={ver ? 'text' : 'password'}
                    icon="lock"
                    value={np2}
                    onChange={function (e) {
                      setNp2(e.target.value);
                    }}
                    autoComplete="new-password"
                  />
                  {showPw}
                  {errBox}
                  <Button type="submit" variant="brand" fullWidth size="lg" iconRight="check" disabled={busy || !np || !np2} onClick={redefinir}>
                    {busy ? 'Salvando…' : 'Salvar senha nova'}
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    iconLeft="arrow-left"
                    onClick={function () {
                      try {
                        history.replaceState(null, '', location.pathname);
                      } catch (x) {}
                      setModo('login');
                      setErr('');
                    }}
                  >
                    Voltar para o login
                  </Button>
                </form>
              ) : (
                <form onSubmit={entrar} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Input
                    label="Email"
                    type="email"
                    icon="mail"
                    value={email}
                    onChange={function (e) {
                      setEmail(e.target.value);
                    }}
                    placeholder="seuemail@gmail.com"
                    autoComplete="username"
                  />
                  <Input
                    label="Senha"
                    type={ver ? 'text' : 'password'}
                    icon="lock"
                    value={pw}
                    onChange={function (e) {
                      setPw(e.target.value);
                    }}
                    autoComplete="current-password"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                    {showPw}
                    <button
                      type="button"
                      className="lnk"
                      onClick={function () {
                        setModo('esq');
                        setFe(email);
                        setErr('');
                        setMsg('');
                      }}
                    >
                      Esqueci minha senha
                    </button>
                  </div>
                  {web ? null : (
                    <Input
                      label="Servidor"
                      icon="server"
                      value={srv}
                      onChange={function (e) {
                        setSrv(e.target.value);
                      }}
                      placeholder="https://painel.seudominio.com"
                    />
                  )}
                  {errBox}
                  {okBox}
                  <Button type="submit" variant="brand" fullWidth size="lg" iconRight="arrow-right" disabled={busy || !email || !pw || !srv} onClick={entrar}>
                    {busy ? 'Entrando…' : 'Entrar no painel'}
                  </Button>
                  <div className="foot" style={{ justifyContent: 'center', marginTop: 4 }}>
                    Ainda não tem conta?
                    <button
                      type="button"
                      className="lnk"
                      onClick={function () {
                        setModo('cad');
                        setErr('');
                        setMsg('');
                        setCf(function (o) {
                          return Object.assign({}, o, { email: o.email || email });
                        });
                      }}
                    >
                      Criar conta grátis
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="foot" style={{ marginTop: 36, justifyContent: 'center', gap: 8 }}>
              <DS.Icon name="lock" size={12} />
              Acesso protegido · sessões de 30 dias
            </div>
          </div>
        </div>
        <aside className="ms7-login-side" aria-hidden="true">
          <div className="ey">MS Control · Painel de operações</div>
          <h3>
            A operação inteira, <em>do depósito ao saque</em>, num só lugar.
          </h3>
          <p>Cooperações, chaves PIX, metas, ponto e comissões dos operadores — tudo atualizado ao vivo para a equipe.</p>
          <ProductPreview />
          <div className="feats">
            <span className="feat">
              <i>
                <DS.Icon name="zap" size={14} strokeWidth={2.2} />
              </i>
              Tempo real
            </span>
            <span className="feat">
              <i>
                <DS.Icon name="bell" size={14} strokeWidth={2.2} />
              </i>
              Notificações no celular
            </span>
            <span className="feat">
              <i>
                <DS.Icon name="shield-check" size={14} strokeWidth={2.2} />
              </i>
              Acesso por papel
            </span>
          </div>
        </aside>
      </div>
    );
  }

  function Search({ onClose, go, session }) {
    const [q, setQ] = React.useState('');
    const [act, setAct] = React.useState(0);
    const inp = React.useRef(null);
    React.useEffect(function () {
      if (inp.current) inp.current.focus();
    }, []);
    const db = DB.get();
    const s = q.toLowerCase().trim();
    const isOp = session.role === 'operador';
    const res = [];
    if (s) {
      Object.keys(TITLES).forEach(function (k) {
        if ((!isOp || OP_NAV.concat(OP_FOOT).indexOf(k) >= 0) && (session.role !== 'cliente' || CLI_NAV.concat(CLI_FOOT).indexOf(k) >= 0) && (isOp || k !== 'ponto') && TITLES[k].toLowerCase().indexOf(s) >= 0)
          res.push({
            icon: (NAV.concat(FOOT).find(function (n) {
              return n.id === k;
            }) || { icon: 'layout-grid' }).icon,
            t: TITLES[k],
            sub: 'Página',
            fn: function () {
              go(k);
            },
          });
      });
      db.coops.forEach(function (c) {
        if (isOp && c.opId !== session.opId) return;
        if ((c.cliente + ' ' + c.id + ' ' + c.plataforma + ' ' + (c.rede || '')).toLowerCase().indexOf(s) >= 0)
          res.push({
            icon: 'briefcase',
            t: DB.coopNome(c),
            sub: 'Cooperação · ' + c.status,
            fn: function () {
              localStorage.setItem('ms7op-open-coop', c.id);
              go('cooperacoes');
            },
          });
        c.contas.forEach(function (k) {
          if (k.usuario.toLowerCase().indexOf(s) >= 0)
            res.push({
              icon: 'user',
              t: k.usuario,
              sub: 'Conta · ' + DB.coopNome(c) + ' · ' + k.status,
              fn: function () {
                localStorage.setItem('ms7op-open-coop', c.id);
                go('cooperacoes');
              },
            });
        });
      });
      if (!isOp)
        db.operadores.forEach(function (o) {
          if (o.nome.toLowerCase().indexOf(s) >= 0)
            res.push({
              icon: 'users',
              t: o.nome,
              sub: 'Operador',
              fn: function () {
                go('gestao');
              },
            });
        });
    }
    const list = res.slice(0, 30);
    const cur = Math.min(act, Math.max(0, list.length - 1));
    const atalhos = !s
      ? NAV.concat(FOOT)
          .filter(function (n) {
            return (!isOp || OP_NAV.concat(OP_FOOT).indexOf(n.id) >= 0) && (session.role !== 'cliente' || CLI_NAV.concat(CLI_FOOT).indexOf(n.id) >= 0) && (isOp || n.id !== 'ponto');
          })
          .slice(0, 6)
      : [];
    return (
      <div className="ms7-cmdk-bg" onClick={onClose}>
        <div
          className="ms7-cmdk ms7-glow ms7-glow-soft"
          onClick={function (e) {
            e.stopPropagation();
          }}
          onKeyDown={function (e) {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setAct(Math.min(list.length - 1, cur + 1));
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setAct(Math.max(0, cur - 1));
            }
            if (e.key === 'Enter' && list[cur]) {
              list[cur].fn();
              onClose();
            }
          }}
        >
          <div className="ms7-cmdk-in">
            <DS.Icon name="search" size={18} color="var(--text-secondary)" />
            <input
              ref={inp}
              placeholder="Buscar cooperação, conta, operador ou página…"
              value={q}
              onChange={function (e) {
                setQ(e.target.value);
                setAct(0);
              }}
            />
            <kbd style={{ fontFamily: 'inherit', fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 6, background: 'var(--surface-muted)', color: 'var(--text-secondary)', border: '1px solid var(--line)' }}>esc</kbd>
          </div>
          <div className="ms7-cmdk-list">
            {s && !list.length ? (
              <Empty icon="search" title="Nada encontrado" sub="Tente o nome da cooperação, da conta ou do operador." />
            ) : (
              list.map(function (r, i) {
                return (
                  <div
                    key={i}
                    className={'ms7-cmdk-it' + (i === cur ? ' is-act' : '')}
                    onMouseEnter={function () {
                      setAct(i);
                    }}
                    onClick={function () {
                      r.fn();
                      onClose();
                    }}
                  >
                    <span className="tile">
                      <DS.Icon name={r.icon} size={17} strokeWidth={2} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="t">{r.t}</div>
                      <div className="s">{r.sub}</div>
                    </div>
                    <span className="go">
                      <DS.Icon name="arrow-right" size={16} />
                    </span>
                  </div>
                );
              })
            )}
            {!s ? (
              <div>
                <div className="ms7-eyebrow" style={{ padding: '8px 12px 6px' }}>
                  Ir para
                </div>
                {atalhos.map(function (n) {
                  return (
                    <div
                      key={n.id}
                      className="ms7-cmdk-it"
                      onClick={function () {
                        go(n.id);
                        onClose();
                      }}
                    >
                      <span className="tile">
                        <DS.Icon name={n.icon} size={17} strokeWidth={2} />
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="t">{n.label}</div>
                        <div className="s">Página</div>
                      </div>
                      <span className="go">
                        <DS.Icon name="arrow-right" size={16} />
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="ms7-cmdk-foot">
            <span>
              <kbd>↑↓</kbd>navegar
            </span>
            <span>
              <kbd>↵</kbd>abrir
            </span>
            <span style={{ marginLeft: 'auto' }}>
              <kbd>Ctrl K</kbd>de qualquer tela
            </span>
          </div>
        </div>
      </div>
    );
  }

  function fotoKey(n) {
    return 'ms7op-foto-' + String(n || '').toLowerCase();
  }
  function useSyncStatus() {
    const [, set] = React.useState(0);
    React.useEffect(function () {
      const t = setInterval(function () {
        set(function (x) {
          return x + 1;
        });
      }, 2000);
      return function () {
        clearInterval(t);
      };
    }, []);
    return (DB.Sync && DB.Sync.status) || 'local';
  }
  function AppHeader({ title, subtitle, user, notifications, onNotificationsClick, actions, mobile, onSearch, theme, setTheme }) {
    const [foto, setFoto] = React.useState(function () {
      return localStorage.getItem(fotoKey(user.name)) || '';
    });
    const [stuck, setStuck] = React.useState(false);
    const sync = useSyncStatus();
    React.useEffect(function () {
      const f = function () {
        setStuck(window.scrollY > 8);
      };
      f();
      window.addEventListener('scroll', f, { passive: true });
      return function () {
        window.removeEventListener('scroll', f);
      };
    }, []);
    const first =
      String(user.name || '')
        .trim()
        .split(/\s+/)[0] || '';
    function pick(e) {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const img = new Image();
      img.onload = function () {
        const s = 160,
          c = document.createElement('canvas');
        c.width = c.height = s;
        const m = Math.min(img.width, img.height);
        c.getContext('2d').drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, s, s);
        const d = c.toDataURL('image/jpeg', 0.85);
        try {
          localStorage.setItem(fotoKey(user.name), d);
        } catch (x) {}
        setFoto(d);
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(f);
      e.target.value = '';
    }
    const syncLabel = { online: 'Sincronizado com o servidor', syncing: 'Sincronizando…', offline: 'Sem conexão com o servidor', local: 'Modo local' }[sync] || sync;
    return (
      <header className={'ms7-head' + (stuck ? ' is-stuck' : '')}>
        <h1 key={typeof title === 'string' ? title : 'n'}>
          {title}
          {subtitle && !mobile ? <span className="ms7-head-sub">{subtitle}</span> : null}
        </h1>
        <div className="ms7-head-tools">
          {mobile ? (
            <DS.IconButton icon="search" size={38} iconSize={19} label="Buscar" onClick={onSearch} />
          ) : (
            <button type="button" className="ms7-search-btn" onClick={onSearch} aria-label="Buscar (Ctrl+K)">
              <DS.Icon name="search" size={16} strokeWidth={2} />
              <span>Buscar</span>
              <kbd>⌘K</kbd>
            </button>
          )}
          {actions}
          <DS.IconButton icon={theme === 'dark' ? 'sun' : 'moon'} size={38} iconSize={19} label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'} onClick={function () { setTheme(theme === 'dark' ? 'light' : 'dark'); }} />
          <DS.IconButton icon="bell" size={38} iconSize={19} badge={notifications || null} label="Notificações" onClick={onNotificationsClick} />
          <div className="ms7-user">
            <label title="Trocar foto" className="ms7-user-pic">
              <DS.Avatar src={foto || undefined} name={user.name} size={mobile ? 34 : 38} />
              <span className="ms7-user-cam">
                <DS.Icon name="camera" size={10} />
              </span>
              <span className={'ms7-user-sync ' + sync} title={syncLabel} />
              <input type="file" accept="image/*" onChange={pick} style={{ display: 'none' }} />
            </label>
            {mobile ? null : (
              <div className="ms7-user-name">
                <b>{user.name || first}</b>
                <span>{user.role}</span>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  function OperacoesApp() {
    const [session, setSession] = React.useState(function () {
      const u = DB.Sync.token() && DB.Sync.user();
      if (u) return { role: u.role, opId: u.opId, name: u.name, real: true };
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
      if (S.token())
        S.api('/api/auth/me')
          .then(function (j) {
            const u = j.user;
            localStorage.setItem('ms7-user', JSON.stringify(u));
            setSession(function (s) {
              return s && s.real && s.role === u.role && s.opId === u.opId ? s : { role: u.role, opId: u.opId, name: u.name, real: true };
            });
          })
          .catch(function () {});
    }, []);
    const [page, setPage] = React.useState(function () {
      return localStorage.getItem('ms7op-page') || 'geral';
    });
    const [mobile, setMobile] = React.useState(function () {
      return window.matchMedia('(max-width: 760px)').matches;
    });
    React.useEffect(function () {
      const q = window.matchMedia('(max-width: 760px)');
      const f = function () {
        setMobile(q.matches);
      };
      q.addEventListener('change', f);
      return function () {
        q.removeEventListener('change', f);
      };
    }, []);
    const [collapsed, setCollapsedS] = React.useState(function () {
      return localStorage.getItem('ms7op-menu') !== 'aberto';
    });
    const setCollapsed = function (v) {
      setCollapsedS(v);
      localStorage.setItem('ms7op-menu', v ? 'fechado' : 'aberto');
    };
    const [navMode, setNavModeS] = React.useState(function () {
      return localStorage.getItem('ms7op-nav') || 'lado';
    });
    const setNavMode = function (v) {
      setNavModeS(v);
      localStorage.setItem('ms7op-nav', v);
    };
    const topNav = !mobile && navMode === 'topo';
    const [np, setNp] = React.useState(false);
    const [sq, setSq] = React.useState(false);
    const notifs = useNotifs();
    const unread = notifs.filter(function (n) {
      return !n.read;
    }).length;
    const [theme, setTheme] = React.useState(function () {
      return localStorage.getItem('ms7op-theme') || 'dark';
    });
    const acc = 'branco';
    React.useEffect(
      function () {
        document.documentElement.setAttribute('data-acc', 'branco');
        try {
          localStorage.setItem('ms7op-acc', 'branco');
        } catch (e) {}
      },
      [acc],
    );
    React.useEffect(
      function () {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('ms7op-theme', theme);
        const m = document.querySelector('meta[name="theme-color"]');
        if (m) m.setAttribute('content', theme === 'dark' ? '#0B0D0C' : '#F5F6F3');
      },
      [theme],
    );
    React.useEffect(function () {
      document.documentElement.removeAttribute('data-cor');
      localStorage.removeItem('ms7op-cor');
      const st = document.getElementById('ms7-cor-azul');
      if (st) st.remove();
    }, []);
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
    const isCli = session && session.role === 'cliente';
    window.ms7SemOp = !!(isCli && !(DB.get().operadores || []).length);
    const ALLOW = isOp ? OP_NAV.concat(OP_FOOT) : isCli ? CLI_NAV.concat(CLI_FOOT) : null;
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
        if (pix.length)
          setTimeout(function () {
            notify({
              type: 'bloqueio',
              title: 'Chaves PIX acabando',
              body: pix
                .map(function (a) {
                  return a.title.replace('Chaves PIX acabando: ', '') + ' — ' + a.sub;
                })
                .join('\n'),
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
      if (p === 'ponto' && !isOp) {
        localStorage.setItem('ms7op-gestao', 'ponto');
        p = 'gestao';
      }
      if (!TITLES[p] || (ALLOW && ALLOW.indexOf(p) < 0)) p = 'geral';
      setPage(p);
      localStorage.setItem('ms7op-page', p);
      window.scrollTo(0, 0);
    }
    window.ms7Go = go;
    /* calculado antes do return do login para a ordem dos hooks ser sempre a mesma */
    const pg = ALLOW && ALLOW.indexOf(page) < 0 ? 'geral' : !isOp && page === 'ponto' ? (localStorage.setItem('ms7op-gestao', 'ponto'), 'gestao') : page;
    React.useEffect(
      function () {
        if (session) document.documentElement.setAttribute('data-pg', pg);
      },
      [pg, !!session],
    );
    if (!session || /[?&]login=1/.test(location.search))
      return (
        <React.Fragment>
          <Login onLogin={login} theme={theme} setTheme={setTheme} />
          <Toaster />
        </React.Fragment>
      );
    const nav = isOp
      ? NAV.filter(function (n) {
          return OP_NAV.indexOf(n.id) >= 0;
        }).map(function (n) {
          return n.id === 'cooperacoes' ? Object.assign({}, n, { label: 'Minhas cooperações', badge: null }) : n;
        })
      : NAV.filter(function (n) {
          return n.id !== 'ponto' && (!isCli || CLI_NAV.indexOf(n.id) >= 0);
        }).map(function (n) {
          return n.id === 'cooperacoes'
            ? Object.assign({}, n, {
                badge:
                  DB.get().coops.filter(function (c) {
                    return c.status === 'Em andamento';
                  }).length || null,
              })
            : n;
        });
    const nTar = tarefasPend(DB.get(), isOp ? session.opId : 'admin');
    const atv = (DB.get().coops || []).filter(function (c) {
      return (c.status === 'Ativa' || c.status === 'Em andamento') && (!isOp || c.opId === session.opId);
    });
    const nBau = atv.filter(function (c) {
        return c.tipo === 'bau';
      }).length,
      nCoop = atv.length - nBau;
    const navT = nav.map(function (n) {
      return n.id === 'tarefas' ? Object.assign({}, n, { badge: nTar || null }) : n.id === 'bau' ? Object.assign({}, n, { badge: nBau || null }) : n.id === 'cooperacoes' ? Object.assign({}, n, { badge: nCoop || null }) : n;
    });
    const foot = (
      isOp
        ? FOOT.filter(function (n) {
            return OP_FOOT.indexOf(n.id) >= 0;
          })
        : isCli
          ? FOOT.filter(function (n) {
              return CLI_FOOT.indexOf(n.id) >= 0;
            })
          : FOOT
    ).concat([{ id: 'logout', label: 'Sair', icon: 'log-out' }]);
    const S =
      {
        ponto: PontoScreen,
        geral: GeralScreen,
        tarefas: TarefasScreen,
        metas: MetasScreen,
        cooperacoes: CooperacoesScreen,
        bau: BauScreen,
        minhas: MinhasScreen,
        alunos: AlunosScreen,
        analises: AnalisesScreen,
        financeiro: FinanceiroScreen,
        listas: ListasScreen,
        avisos: AvisosScreen,
        gestao: GestaoScreen,
        proxies: ProxiesScreen,
        assinaturas: AssinaturaScreen,
        config: ConfigScreen,
      }[pg] || GeralScreen;
    const roleLabel = { admin: 'Admin', super: 'Super Admin', operador: 'Operador', cliente: 'Cliente' }[session.role];
    const first =
      String(session.name || '')
        .trim()
        .split(/\s+/)[0] || '';
    const title =
      pg === 'geral' ? (
        <React.Fragment>
          Olá, <em>{first}</em>
          <span className="ms7-emo" aria-hidden="true">
            👋
          </span>
        </React.Fragment>
      ) : isOp && pg === 'cooperacoes' ? (
        'Minhas cooperações'
      ) : isOp && pg === 'metas' ? (
        'Minhas metas'
      ) : isOp && pg === 'ponto' ? (
        'Meu ponto'
      ) : (
        TITLES[pg]
      );
    return (
      <div className={'ms7-shell' + (topNav ? ' is-top' : '')}>
        {mobile ? <MobileNav items={navT} footerItems={foot} activeId={pg} onNavigate={go} /> : null}
        {topNav ? <TopNav items={navT} footerItems={foot} activeId={pg} onNavigate={go} /> : null}
        {mobile || topNav ? null : (
          <RailNav
            items={navT}
            footerItems={foot}
            activeId={pg}
            onNavigate={go}
            open={!collapsed}
            onToggle={function () {
              setCollapsed(!collapsed);
            }}
            style={{ position: 'sticky', top: 0, height: '100vh', borderRight: '1px solid var(--line)' }}
          />
        )}
        <main className="ms7-main">
          <AppHeader
            title={title}
            subtitle={SUBT[pg]}
            user={{ name: session.name, role: roleLabel }}
            mobile={mobile}
            notifications={unread}
            theme={theme}
            setTheme={setTheme}
            actions={
              mobile ? null : (
                <DS.IconButton
                  icon={topNav ? 'panel-left' : 'panel-top'}
                  size={38}
                  iconSize={19}
                  label={topNav ? 'Usar menu lateral' : 'Usar menu no topo'}
                  onClick={function () {
                    setNavMode(topNav ? 'lado' : 'topo');
                  }}
                />
              )
            }
            onSearch={function () {
              setSq(true);
            }}
            onNotificationsClick={function () {
              setNp(true);
            }}
          />
          {session.role === 'cliente' ? <TesteFaixa session={session} go={go} naPag={pg === 'assinaturas'} /> : null}
          <div className="ms7-page" key={pg} style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 16 : 24 }}>
            <S go={go} role={session.role} session={session} />
          </div>
        </main>
        <Toaster />
        <PushPreview />
        {isOp ? <TarefasWatcher opId={session.opId} /> : window.AlertNotifier ? <window.AlertNotifier session={session} /> : null}
        {isOp ? null : <PontoWatcher />}
        {np ? (
          <NotifPanel
            onClose={function () {
              setNp(false);
            }}
          />
        ) : null}
        {sq ? (
          <Search
            go={go}
            session={session}
            onClose={function () {
              setSq(false);
            }}
          />
        ) : null}
      </div>
    );
  }
  ReactDOM.createRoot(document.getElementById('root')).render(<OperacoesApp />);
})();
