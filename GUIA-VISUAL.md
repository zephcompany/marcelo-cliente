# Guia visual do front novo (MS Control · Zeph)

Este guia vale para toda tela (`Screens*.jsx`). Objetivo: visual leve e fluido, estilo Webflow/Framer, sem cara de "gerado por IA". **Só a camada visual muda. Nenhuma lógica, dado, chamada de API, `DB.*`, `usePersist`, handler, condição de papel (admin/operador/cliente) ou texto de regra de negócio pode mudar.**

## Como a base funciona
- `ms7-ui.css` redefine os tokens (`--surface-card`, `--line`, `--radius-lg`, `--shadow-card` = anel fino de 1px, etc.) e traz classes utilitárias.
- `ms7-ui.jsx` substitui os componentes do design system **com as mesmas props**: `DS.Button`, `DS.IconButton`, `DS.Card` (novas props: `subtitle`, `hover`, `reveal`), `DS.StatCard` (nova prop `hint`; o valor conta sozinho), `DS.Tabs` (variants `dark` = segmentado, `chips` = pílulas, `line` = sublinhado), `DS.Input`, `DS.Select`, `DS.Checkbox`, `DS.Switch`, `DS.Badge` (sempre tingido, `variant="soft"` ganha ponto), `DS.CountDot`, `DS.Avatar`, `DS.Modal`, `DS.DataTable`, `DS.Stepper`. Extras: `DS.Reveal`, `DS.Stagger`, `DS.CountUp`.
- Movimento: qualquer elemento com `data-reveal="up|left|right|scale"` entra suave quando aparece no scroll; um container com `className="ms7-stagger"` faz os filhos entrarem em cascata. A página inteira já entra com transição (`.ms7-page`).
- Assets animados: `window.MS7Art.<Nome>` (`Chart`, `Tasks`, `Coop`, `Target`, `Clock`, `Keys`, `Bell`, `Wallet`, `Globe`, `People`, `Inbox`, `Search`), prop `size`. O `Empty` (Shared.jsx) já escolhe a arte pelo `icon`; aceita `art="Tasks"` e `sub`, `action`, `compact`.

## Tipografia
- Família: `var(--font-sans)` (Instrument Sans). Pesos: 400, 500, 600 (máximo **600** — nunca 700/800 em texto corrido ou títulos; 700 só em micro-rótulos de 10–11px).
- Título de página: já vem do cabeçalho. Título de seção dentro de card: 16px/600, `letterSpacing: -0.015em`. Títulos grandes (nome da cooperação, "Nada para hoje"): 22–26px/600, `letterSpacing: -0.03em`, `lineHeight: 1.1`.
- Número grande (KPI): 24–34px/600, `letterSpacing: -0.03em`, `className="ms7-num"`; quando o valor vier formatado em string, pode usar `<DS.CountUp value={...}/>`.
- Rótulo pequeno acima de valor (eyebrow): `className="ms7-eyebrow"` (11px, uppercase, tracking .14em, cinza). Não misturar com rótulos 10px em bold.
- Corpo: 14px/500; secundário: 13–13.5px/500 `var(--text-secondary)`. Legenda: 12px/500.
- Nunca deixar 1 ou 2 palavras sozinhas na última linha (regra do Rafa): títulos e frases curtas com `text-wrap: balance` (`className="ms7-balance"`); em frases fixas, trocar o último espaço por ` ` (non-breaking space).

## Cor
- Fundo da página `var(--surface-page)`, cards `var(--surface-card)` com `boxShadow: 'var(--shadow-card)'` (anel) — **sem sombra cinza difusa, sem gradientes pastel, sem fundo colorido em card inteiro**.
- Superfície secundária dentro de card: `var(--surface-muted)`; divisórias: `1px solid var(--line)`.
- Acento: verde `var(--ms7-green-900)` (botão brand, links, ícones ativos) e lima `var(--ms7-lime-500)` (destaque pequeno). Cor ocupa ≤10% da tela.
- Dinheiro: positivo `var(--ms7-green)`, negativo `var(--ms7-error)`. Status via `DS.Badge tone=...` (já tingido).
- Cor em cards só como **detalhe**: tile de ícone (`30px`, raio 9, fundo `color-mix(in oklab, <cor> 12%, var(--surface-card))`, ícone na cor), ponto de 7px, ou fio de 3px à esquerda. Nunca card inteiro em cor/gradiente.
- Tudo precisa funcionar no modo escuro: use só tokens (`var(--…)`), nunca cor fixa `#fff`/`#000` em fundo ou texto (exceções: texto sobre lima `#0C3B26`, texto sobre `var(--ms7-black)` = `#fff`).

## Forma e espaço
- Raio: cards 16 (`var(--radius-lg)`), elementos internos 10–12, pílulas 999. Mesmo raio na tela toda.
- Padding de card: 20–24. Espaço entre cards: 16 (KPIs) / 24 (seções). Entre seções de página: 24–28.
- Botões: `DS.Button` — primário (`primary`, preto), `brand` (verde) para a ação principal da tela (1 por tela), `outline`/`secondary` para o resto, `ghost` para ações leves, `danger` só em exclusão. Ícone + texto. Nada de botão minúsculo.
- Ícones: lucide via `DS.Icon`, traço 1.75–2, tamanhos 15–18. Nunca emoji.
- Inputs nativos soltos (`<input>`, `<select>`, `<textarea>` fora do DS): dar `className="ms7-input"` dentro de um `div.ms7-box`, ou trocar por `DS.Input`/`DS.Select` quando a mudança for só visual. Inputs de data (`type="date"`): `className="ms7-native"`.
- Tabelas: usar `DS.DataTable` quando já é ele; tabela própria (`<table>`) ganha `className="ms7-table"` no `<table>` e `ms7-table-wrap` no container.
- Listas de itens (linhas): fio `1px solid var(--border-subtle)` entre linhas, padding 12–14, hover `var(--surface-muted)`, raio 10 no hover.

## Movimento
- Cards de KPI em grade: container com `className="ms7-stagger"`.
- Blocos grandes abaixo da dobra: `data-reveal="up"` (ou `<DS.Reveal>`).
- Cards clicáveis (cooperação, meta): `className="ms7-card ms7-hover-card"` (sobe 3px + borda do acento no hover). **Nunca** brilho/glow radial no hover, nem luz seguindo o mouse, nem numeral gigante em marca d'água.
- Barras de progresso: `<div className="ms7-bar"><i style={{width:'62%'}}/></div>` (cresce sozinha).
- Modais já animam (`DS.Modal`).

## Estados vazios
- Trocar "Nenhum X." em texto solto por `<Empty icon="…" title="…" sub="…"/>` com a arte certa (`art="Tasks"`, `"Coop"`, `"Keys"`, `"Target"`, `"Clock"`, `"Wallet"`, `"Chart"`, `"People"`, `"Bell"`, `"Globe"`). O vazio deve **mostrar o que a função faz** (ex.: Tarefas vazio = lista sendo marcada; Chaves PIX vazio = chaves entrando em slots) e, quando houver, o botão da ação principal (`action={<DS.Button …/>}`).

## Lista anti-cara-de-IA (conferir antes de entregar)
- [ ] Cards brancos com sombra cinza / gradiente pastel / fundo colorido inteiro
- [ ] Texto em bold 700/800 em títulos ou corpo
- [ ] Badge sólida saturada (usar `DS.Badge`, já tingida)
- [ ] Emoji ou ícone sem tile em destaque
- [ ] Glow no hover, luz seguindo cursor, numeral gigante em marca d'água, fio divisor com símbolo
- [ ] Viúva/órfã em frase curta
- [ ] Cor fixa que quebra no modo escuro
- [ ] Botão pequeno sem ícone como ação principal

## Como testar
- Sintaxe: compile cada `.jsx` com `@babel/core` + `@babel/preset-react` (ou abra o painel e veja o console: o `index.html` mostra a caixa "O painel não abriu" com o erro).
- Rode o servidor local (`node server/server.cjs`) e confira cada tela em claro, escuro (botão da lua no cabeçalho) e em 390px de largura. Para ver o painel com dados de exemplo sem login, grave no `localStorage` a chave `ms7op-session` com `{"role":"admin","name":"Teste","opId":""}` e recarregue.
