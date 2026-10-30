# Guia visual · MS Control "Black Glass" (Zeph)

Vale para toda tela (`Screens*.jsx`). Direção: **painel preto, vidro fosco (glass), lima como acento, ícones lucide + emojis pontuais, sem serif**. Não pode lembrar o painel antigo. **Só a camada visual muda. Nenhuma lógica, dado, chamada de API, `DB.*`, `usePersist`, handler, condição de papel (admin/operador/cliente) ou texto de regra de negócio pode mudar.**

## Como a base funciona
- Tema padrão é o escuro (`html[data-theme="dark"]`, gravado em `ms7op-theme`). O claro continua existindo (botão do sol) e precisa não quebrar, mas o foco de QA é o escuro.
- `ms7-ui.css` define os tokens. No escuro: `--surface-page: #070808`, `--surface-card: rgba(255,255,255,.045)` (vidro), `--surface-muted: rgba(255,255,255,.065)`, `--line: rgba(255,255,255,.09)`, `--line-strong: .16`, `--text-primary: #F1F3EF`, `--text-secondary: #8E978F`, acento `--ms7-lime-500: #C9F775` (também em `--ms7-green-900`/`--text-brand` no escuro), positivo `--ms7-green: #4ADE80`, negativo `--ms7-error: #FF6E66`.
- Tokens de vidro: `--glass` (fundo translúcido fraco), `--glass-2` (um degrau acima, hover), `--glass-solid: rgba(18,20,19,.82)` (**obrigatório em qualquer coisa flutuante**: menus, dropdowns, popovers, modais, tooltips — senão o texto de trás aparece), `--glass-edge` (fio de luz em cima), `--glass-blur: blur(18px) saturate(1.35)`.
- Fundo ambiente (estilo Framer/Webflow): `body::before` = grade de quadrados arredondados só no topo (máscara radial, referência: hero de zephcompany.github.io/luiz), `body::after` = blobs lima/teal/verde/violeta desfocados em animação lenta, `.ms7-noise` = ruído. Já vem da base; não criar outros fundos por tela.
- Menu: dois modos, `ms7op-nav` = `lado` (padrão, menu lateral recolhível) ou `topo` (barra de vidro no topo, teste). O botão `panel-left/panel-top` no cabeçalho alterna. Telas não precisam saber qual está ativo.
- Efeitos já embutidos em todo `.ms7-card`: **luz que segue o mouse** (radial lima discreta dentro do card) + **highlight na borda** no ponto do cursor; o card é vidro opaco (degradê branco 7%→2,5% sobre preto 74% + blur 10px), então a grade do fundo não vaza (`--mx/--my` gravados pelo ms7-ui.jsx). **Borda animada** (snippet Zeph "BORDA ANIMADA", brilho girando) só em superfícies de destaque: `className="ms7-card ms7-glow"` (ou `ms7-glow ms7-glow-soft` para mais discreto) — use em 1 card por tela no máximo (o principal: resultado do dia, plano atual, meta em destaque). Modais, busca ⌘K e a prévia do login já têm.
- **Degradês**: `className="ms7-grad-text"` em números/títulos de destaque (lima→verde→teal); botão brand e aba ativa já são degradê; `.ms7-grad-tile` para tile de ícone em destaque; `.ms7-grad-line` como divisor de luz. Não usar gradiente como fundo inteiro de card comum (só nas superfícies de destaque acima).
- **Cursor personalizado** (ponto lima + anel que cresce em elementos clicáveis e vira barra em campos de texto) é global; elementos clicáveis próprios precisam ser `button`/`a`/`[role="button"]` ou ter `cursor` tratado para o anel reagir.
- `ms7-ui.jsx` continua com os mesmos componentes e props (`DS.Button`, `DS.Card`, `DS.StatCard`, `DS.Tabs` com `dark|chips|line`, `DS.Input`, `DS.Select`, `DS.Checkbox`, `DS.Switch`, `DS.Badge`, `DS.CountDot`, `DS.Avatar`, `DS.Modal`, `DS.DataTable`, `DS.Stepper`, `DS.Reveal`, `DS.Stagger`, `DS.CountUp`). Todos já estão no vidro.
- Assets animados: `window.MS7Art.<Nome>` (`Chart`, `Tasks`, `Coop`, `Target`, `Clock`, `Keys`, `Bell`, `Wallet`, `Globe`, `People`, `Inbox`, `Search`) — usam tokens, já ficam certos no preto. O `Empty` (Shared.jsx) escolhe a arte pelo `icon` ou `art`, e agora coloca um **emoji no título** sozinho (prop `emoji="🔥"` para trocar, `emoji={false}` para tirar).

## Tipografia
- Família: `var(--font-sans)` = **Visby CF** (fonte licenciada do Rafa; os `@font-face` ficam comentados em `ms7-ui.css` até os .woff2 entrarem em `fonts/`), com **Outfit** (Google Fonts) como reserva automática. Mono para IDs/chaves/códigos: `var(--font-mono)` = Geist Mono. **Nunca serif, nunca itálico decorativo.** A classe `.ms7-serif` agora é só "sans 600 na cor do acento" (pode trocar por `<b style={{color:'var(--text-brand)'}}>`).
- Pesos 400/500/600 (máximo 600 em títulos; 700 só em micro-rótulos de 10–11px).
- Título de seção em card: 16px/600, `letterSpacing: -0.015em`. Título grande: 22–26px/600, `-0.03em`, `lineHeight 1.1`. KPI: 24–34px/600, `-0.03em`, `className="ms7-num"`.
- Eyebrow: `className="ms7-eyebrow"`. Corpo 14px/500; secundário 13–13.5px/500 `var(--text-secondary)`.
- Nunca deixar 1 ou 2 palavras sozinhas na última linha (regra do Rafa): `className="ms7-balance"` em títulos/frases curtas; em frases fixas use ` ` (nbsp) no último espaço.

## Emojis (com moderação, sempre `className="ms7-emo"`)
- Onde entram: saudação do topo (já está), título de estado vazio (automático), toasts (`toast('🔥 Chave copiada')` — se não tiver emoji, o Toaster põe ✨), dicas/avisos curtos (`<Hint>`), títulos de card quando ajudam a reconhecer a seção (ex.: "💸 Comissão por dia", "🏆 Ranking", "🔑 Chaves PIX", "⏱️ Ponto", "🎯 Metas", "📣 Avisos", "🛒 Loja", "🤝 Cooperações", "👥 Operadores", "📊 Análises", "🧾 Pagamentos", "🌐 Proxies", "💳 Assinatura", "⚙️ Configurações", "🎓 Alunos", "📦 Baú").
- Regra: **no máximo 1 emoji por card** e nunca em números, tabelas, badges de status ou botões de ação (lá é ícone lucide). Emoji sempre ANTES do texto, com `marginRight: 8`.

## Cor
- Fundo da página é o preto com ambiente. Cards = vidro (`.ms7-card`, já vem com blur + fio de luz). Dentro de card, superfície secundária = `var(--surface-muted)`; divisórias `1px solid var(--line)`.
- Acento lima (`var(--ms7-lime-500)` / `var(--text-brand)`): botão principal (`DS.Button variant="brand"`, 1 por tela), aba ativa (chips), item ativo do menu, foco. Cor ocupa ≤10% da tela.
- Dinheiro: positivo `var(--ms7-green)`, negativo `var(--ms7-error)`. Status via `DS.Badge tone=...`.
- Cor em card só como detalhe: tile de ícone 30px raio 9 (`color-mix(in oklab, <cor> 16%, transparent)` + ícone na cor), ponto de 7px ou fio de 3px à esquerda. Nunca card inteiro colorido/gradiente.
- **Nada de cor fixa** `#fff`/`#000`/`#111512`/`#F5F6F3` em fundo ou texto. Exceções: texto sobre lima = `var(--text-on-lime)`, texto sobre `var(--surface-inverse)` = `var(--text-inverse)`.
- Qualquer elemento flutuante (menu de contexto, dropdown, popover, tooltip, modal próprio): `background: var(--glass-solid); backdrop-filter: blur(24px) saturate(1.4); box-shadow: var(--shadow-pop)`.

## Forma e espaço
- Raio: cards 16, internos 10–12, pílulas 999. Padding de card 20–24. Gap 16 (KPIs) / 24 (seções).
- Botões: `DS.Button` — `brand` (lima) para a ação principal, `primary` (branco) para confirmar em modal, `outline`/`secondary` (vidro) para o resto, `ghost` para ações leves, `danger` só em exclusão. Sempre ícone + texto.
- Ícones lucide via `DS.Icon`, traço 1.75–2, 15–18px. Inputs nativos soltos: `className="ms7-input"` dentro de `div.ms7-box`, ou `DS.Input`/`DS.Select`; datas `className="ms7-native"`.
- Tabelas: `DS.DataTable` ou `<table className="ms7-table">` dentro de `.ms7-table-wrap`. Linhas de lista: fio `1px solid var(--border-subtle)`, hover `var(--glass-2)`.

## Movimento
- KPIs em grade: container `className="ms7-stagger"`. Blocos abaixo da dobra: `data-reveal="up"`.
- Cards clicáveis: `className="ms7-card ms7-hover-card"` (sobe 3px + borda lima suave). Sem glow.
- Barras: `<div className="ms7-bar"><i style={{width:'62%'}}/></div>`.

## Estados vazios
- `<Empty icon="…" title="…" sub="…" art="Tasks|Coop|Keys|Target|Clock|Wallet|Chart|People|Bell|Globe" action={<DS.Button variant="brand" …/>}/>`. O vazio mostra o que a função faz (asset animado) e o botão da ação principal.

## Checklist antes de entregar
- [ ] Nenhuma cor fixa clara/escura que quebre no preto (grep `#fff`, `#111`, `#F5F6F3`, `rgba(17,21,18`)
- [ ] Nenhum menu/dropdown/popover translúcido (usar `--glass-solid`)
- [ ] Nenhuma serif/itálico; fonte é a Geist via tokens
- [ ] Emoji só onde a regra permite, 1 por card
- [ ] Sem viúva/órfã em frase curta
- [ ] 1440px e 390px sem overflow horizontal; escuro perfeito, claro sem quebrar
- [ ] Lógica intocada (diff só em CSS/JSX de apresentação)

## Como testar
- Sintaxe: `node <scratch>/babelcheck/check.js Arquivo.jsx`.
- Servidor local: `DATA_DIR=./server/data node server/server.cjs`. Para abrir sem login: localStorage `ms7op-session` = `{"role":"admin","name":"Teste","opId":""}` e `ms7op-page` = id da tela; `ms7op-theme` = `dark`.
