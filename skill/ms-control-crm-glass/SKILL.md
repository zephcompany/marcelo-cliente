---
name: ms-control-crm-glass
description: Estilo visual completo do painel MS Control (MS7), direção "CRM glass" de nov/2026 — moldura arredondada sobre fundo grafite quente, menu em pílula no topo, trilho de ícones flutuante, título grande com estatísticas em linha, cards de vidro escuro, tiles cinza-vidro, pílulas, acentos lima/coral/azul, preloader em hexágono com o logo MS, notificação que desce do topo. Use sempre que for criar, restilizar, revisar ou integrar qualquer tela, modal, card, lista, formulário, estado vazio ou componente desse painel, mesmo que o pedido só diga "tela nova de X", "deixa no padrão", "igual às outras telas" ou "arruma o visual".
---

# MS Control · estilo "CRM glass"

Toda tela nova do MS Control tem de parecer feita pela mesma mão que fez o Dashboard. Esta skill descreve o estilo que está no ar e como o código já o entrega, para você **reaproveitar o que existe** em vez de reinventar.

Regra de ouro: **só a camada visual segue esta skill.** Lógica, dados, `DB.*`, `usePersist`, handlers, chamadas de API, regras por papel (admin / operador / cliente) e textos de regra de negócio são decididos pela funcionalidade, não pelo estilo.

## 1. Como o painel é montado

- **Sem build.** React 18 UMD + Babel standalone no navegador. Cada `Screens*.jsx` é uma IIFE que registra componentes em `window` (ex.: `window.ProxiesScreen = ProxiesScreen`). Os scripts entram em `index.html` como `<script type="text/x-ms7" src="Arquivo.jsx?v=N">`.
  - O tipo é `text/x-ms7` (não `text/babel`) de propósito: o preloader só manda o Babel compilar depois que a animação de entrada termina, para ela não travar. **Ao criar um arquivo novo, use o mesmo tipo** e suba o `?v=` de todos ao publicar (quebra o cache).
- **Design system:** `window.MS7DesignSystem_5d5172` (chame de `DS`), sobrescrito por `ms7-ui.jsx`. Tokens e todo o CSS global em `ms7-ui.css`.
- **Shell:** `OperacoesApp.jsx` (moldura, topo, trilho, título, roteamento). Menus em `RailNav.jsx` (`CrmTop`, `CrmRail`, `MobileNav`, `MSLogo`). Peças comuns em `Shared.jsx` (`KpiRow`, `Empty`, `toast`, `Hint`, `notify`).
- **Dados:** `store.js` (`window.DB`), exemplo em `data.js`.

### Adicionar uma tela nova
1. Crie `ScreensNome.jsx` (IIFE) e registre `window.NomeScreen`.
2. Inclua o `<script type="text/x-ms7" src="ScreensNome.jsx?v=N">` em `index.html`, antes de `OperacoesApp.jsx`.
3. Em `OperacoesApp.jsx`: acrescente o item em `NAV` (menu principal) ou `FOOT` (trilho/rodapé) com `{ id, label, icon }` (`icon` = nome lucide), o título em `TITLES`, e a tela no mapa `S` (`nome: NomeScreen`). Se for por papel, ajuste `OP_NAV` / `CLI_NAV` / `OP_FOOT` / `CLI_FOOT`.
4. Pronto: o topo, o trilho, a barra do celular e o título grande aparecem sozinhos.

## 2. Estrutura de toda tela (desktop)

O shell já desenha:
- **Moldura** `.ms7-shell.is-crm`: margem 14px, raio 30px, fundo grafite com luz fria no canto superior esquerdo e luz quente embaixo. No celular a moldura some (margem 0).
- **Topo** `CrmTop`: logo MS à esquerda, menu em pílula centralizado com indicador deslizante (abaixo de 1180px vira só ícones), busca / tema / sino / avatar lima à direita. Gruda no topo com desfoque ao rolar.
- **Trilho** `CrmRail`: pílula flutuante de 52px à esquerda, só ícones, com dica ao passar o mouse (busca, nova tarefa, avisos, rodapé, tema).
- **Título** `.crm-h1`: 40px / peso 400, grande e leve, revelando de baixo para cima ao trocar de tela.

Sua tela só precisa preencher o conteúdo. Para pôr **números ao lado do título**, use o slot:

```jsx
<DS.HeadSlot>
  <DS.HeadStat icon="trophy" value="R$ 2.446,35" label="Lucro das concluídas" badge="ROI 69%" tone="lime" />
  <DS.HeadStat icon="briefcase" value="5" label="Cooperações abertas no período" />
  <DS.HeadStat icon="shield-alert" value="11 de 108" label="Contas bloqueadas" badge="10,2%" tone="coral" />
</DS.HeadSlot>
```

Máximo 3–4 estatísticas. `tone`: `lime | coral | blue | gray`.

No celular continua a barra inferior (`MobileNav`) com 4 abas + "Mais"; a tela não precisa saber disso.

## 3. Tokens (tema escuro, padrão)

| Uso | Token | Valor |
|---|---|---|
| Acento principal | `--ms7-lime-500` / `--text-brand` / `--acc` | `#C7F25B` |
| Texto sobre lima | `--text-on-lime` | `#1A2208` |
| Coral (negativo, alerta) | `--ms7-coral` / `--ms7-error` | `#F2896B` |
| Azul | `--ms7-sky` | `#84BCF2` |
| Extras de gráfico | `--chart-1…6` | lima, coral, azul, menta `#74D3A6`, rosa `#E883A6`, amarelo `#EBCB6B` |
| Texto | `--text-primary` / `--text-secondary` | `#F3F2F0` / `#9C9B98` |
| Card (vidro escuro) | `--surface-card` | `rgba(22,21,20,.58)` + blur 18 |
| Tile interno | `--tile` | `rgba(255,255,255,.09)` |
| Superfície secundária | `--surface-muted` | `rgba(255,255,255,.07)` |
| Flutuantes (menu, popover, modal) | `--glass-solid` | `rgba(30,29,28,.94)` |
| Linhas | `--line` / `--line-strong` | `.075` / `.14` |
| Raio | `--radius-lg` / `--radius-xl` | 22 / 28 |

- **Dinheiro:** positivo em lima, negativo em coral. Nunca verde/vermelho puros.
- **Nada de cor fixa** (`#fff`, `#000`, `#111…`) em fundo ou texto: use os tokens. Exceção: `var(--text-on-lime)` sobre lima.
- **Tema claro** existe (botão do sol) e precisa não quebrar; o QA principal é no escuro.

## 4. Componentes e padrões

Use o DS antes de escrever CSS: `DS.Button` (`brand | primary | secondary | outline | ghost | danger`), `DS.IconButton`, `DS.Card`, `DS.StatCard`, `DS.Tabs` (`dark | chips | line`), `DS.Input`, `DS.Select` (`variant="pill"`), `DS.Checkbox`, `DS.Switch`, `DS.Badge`, `DS.Avatar`, `DS.Modal`, `DS.DataTable`, `DS.Stepper`, `DS.CountUp`, `DS.Reveal`, `DS.Stagger`. Todos já vêm no estilo.

**Forma:** botões, abas, campos, selects e selos são **pílulas** (raio 999). Cards têm raio 22, padding 20–24, gap 20 entre cards.

**Card padrão (igual ao Dashboard):**
```jsx
<section className="ms7-card crm-card">
  <div className="crm-card-h">
    <span className="crm-card-t">Título do card</span>
    <div className="crm-card-a">{/* botões redondos: DS.IconButton */}</div>
  </div>
  {/* conteúdo */}
</section>
```

**Número grande do card:** `<div className="crm-big"><DS.CountUp value="R$ 2.446,35" className="crm-big-v ms7-num" /><span className="crm-big-s">legenda</span></div>`.

**Tiles cinza-vidro dentro do card** (como "Cooperações em andamento"): `className="ms7-tile"`, variações `is-blue | is-olive | is-coral | is-gray`. Bom para itens clicáveis em grade 2×2.

**Lista de ações:** `.crm-list` > `.crm-li` (com `.crm-li-ico`, `.crm-li-t`, `.crm-li-v`, `.crm-li-b`).

**Barras de composição:** `.crm-comp` > `.crm-comp-bar > i` com largura em %.

**Legenda de gráfico:** `.crm-legend` com `<i style={{background:'var(--ms7-lime-500)'}} />`; tracejado `<i className="is-dash" />`.

**Selo de status / pílula colorida:** `DS.Badge` ou `.crm-pill.is-coral | is-blue | is-lime | is-gray`.

**Grades de layout prontas:** `.crm-row1` (1,42fr + 1fr) e `.crm-row2` (3 colunas). No celular viram uma coluna sozinhas.

**Tabelas:** `DS.DataTable` ou `<table className="ms7-table">` dentro de `.ms7-table-wrap`.

**Flutuantes** (menu de contexto, dropdown, popover, tooltip, modal próprio): `background: var(--glass-solid); backdrop-filter: blur(24px) saturate(1.4); box-shadow: var(--shadow-pop)`. Translúcido demais deixa o texto de trás vazar.

**Estados vazios:** `<Empty art="Coop|Tasks|Keys|Target|Clock|Wallet|Chart|People|Bell|Globe|Inbox|Search" title="…" sub="…" action={<DS.Button variant="brand" …/>} />`. O desenho animado mostra o que a função faz.

**Lima é raro:** uma ação principal por tela (`variant="brand"`), aba ativa, item ativo do menu, foco. Cor ocupa no máximo ~10% da tela.

## 5. Ícones

- **Lucide de linha**, sempre via `DS.Icon name="…"` (ou a prop `icon` dos componentes). Traço 1.75–2, 15–20px.
- O cliente testou ícones preenchidos, em dois tons e em pixel e **preferiu os de linha originais**. Não troque o conjunto.
- Nunca emoji no lugar de ícone (no tema escuro os emojis `.ms7-emo` ficam escondidos).

## 6. Tipografia

- `var(--font-sans)` = Visby CF (licenciada; `.woff2` em `fonts/` quando entrarem) com **Outfit** de reserva. IDs, chaves e códigos: `var(--font-mono)`.
- **Nunca serif, nunca itálico decorativo.**
- Pesos 400/500/600. Título de página 40px/400 (o shell faz). Título de card 15–16px/500. KPI `className="ms7-num"`.
- **Nunca deixe 1 ou 2 palavras sozinhas na última linha** (regra fixa): `className="ms7-balance"` em títulos e frases curtas, ou `&nbsp;` no último espaço de frases fixas.

## 7. Movimento e efeitos que já existem

- **Preloader** (em `index.html`, `#ms7boot`): colmeia de hexágonos acendendo do centro, contorno do hexágono se desenhando, as peças do logo MS caindo, anel, moldura de seleção com cursor que clica, e o hexágono abrindo a página enquanto o logo voa até o topo. Não mexa nele em telas novas.
- **Logo:** `<window.MSLogo />` (monograma MS lima no hexágono). Use esse componente sempre que precisar do logo.
- **Notificação:** `window.notify({ type, title, body })` (`type` é uma das chaves de `NTYPES` em `Shared.jsx`, como `ciclo`, `inicio`, `ponto`; respeita as preferências do usuário) — desce do topo, some sozinha em 7s com barra de tempo, pausa no hover e sai arrastando para o lado.
- **Toast:** `toast('Chave copiada')`.
- **Barra de rolagem** lima fina no topo, título revelando, estatísticas entrando em sequência, brilho passando nos botões lima, pulso no ponto de "sincronizado": tudo global, já vem.
- Em grades de KPI use `className="ms7-stagger"`; blocos abaixo da dobra `data-reveal="up"`.

## 8. Proibido (o cliente não quer)

- Luz que segue o cursor, brilho radial que acende no hover do card, borda animada girando, cursor personalizado.
- Quadriculado/grade de fundo, aurora, ruído, fundos próprios por tela (o fundo é só o da moldura).
- Card inteiro colorido ou com degradê de cor; numeral gigante de marca d'água; divisores com símbolo da marca.
- Emojis em títulos, números, tabelas, selos ou botões.
- Visual "template de SaaS": tudo igual, sem hierarquia. Siga o Dashboard: um card grande de destaque, tiles internos, título leve e grande.

## 9. Checklist antes de entregar

- [ ] Tela usa o shell (sem cabeçalho próprio), card `ms7-card crm-card`, pílulas e tokens.
- [ ] Nenhuma cor fixa; nenhum flutuante translúcido (usar `--glass-solid`).
- [ ] Ícones lucide de linha via `DS.Icon`.
- [ ] Sem serif/itálico; sem viúva/órfã em título ou frase curta.
- [ ] 1440px e 390px sem rolagem lateral; escuro perfeito, claro sem quebrar.
- [ ] Lógica intocada (diff só de apresentação quando a tarefa for visual).
- [ ] `?v=` subido em todos os scripts do `index.html`.

## 10. Como testar

- Servidor local: `DATA_DIR=./server/data node server/server.cjs` e abrir `http://localhost:3000`.
- Entrar sem login: no localStorage, `ms7op-session` = `{"role":"admin","name":"Teste","opId":""}`, `ms7op-page` = id da tela, `ms7op-theme` = `dark`.
- Sintaxe: `babel.transformSync(src, { presets: ['@babel/preset-react'] })` em cada `.jsx`.
- Prévia estática: `node tools/make-demo.js` gera `demo.html` (GitHub Pages).

## 11. Integração no repositório de produção

Copiar para a raiz do `PAINEL-ADMIN-MARCELO-NOVO`: `index.html`, `ms7-ui.css`, `ms7-ui.jsx`, `RailNav.jsx`, `OperacoesApp.jsx`, `Shared.jsx` e todos os `Screens*.jsx`. Não copiar `demo.html`, `styleguide.html`, `tools/`, `.github/`, `skill/`. `store.js`, `data.js` e `server/` só se a lógica nova tiver vindo deste repositório. Se alguma `Screens*.jsx` recebeu lógica nova em produção depois desta versão, reaplique a lógica por cima do arquivo novo.
