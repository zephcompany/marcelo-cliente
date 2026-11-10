# MS Control · front novo (Zeph Company)

Redesign da camada visual do painel **MS Control** (repo de produção: `PAINEL-ADMIN-MARCELO-NOVO`, no Railway). Mesma arquitetura, mesmas funções, mesma API — só o visual mudou. Direção **CRM glass** (nov/2026): moldura arredondada sobre fundo grafite quente, menu em pílula no topo, trilho de ícones flutuante, título grande com estatísticas, cards de vidro escuro, preloader com o logo MS. Regras completas na skill `skill/ms-control-crm-glass/SKILL.md`.

- Base: **arquivos ao vivo do painel em 10/11/2026 (13h)**, baixados da produção. Todas as mudanças de lógica até essa data (lixeira, usuário repetido, passar contas com numeração e aposta, borracha do cliente, envios do Baú em Metas, filtro de data, conferência por titular e saque a saque, Proxies para operadores, notificação curta etc.) foram juntadas por cima do visual novo, tela por tela.
- Stack intacta: React 18 (UMD) + Babel standalone no navegador, Lucide, `_ds_bundle.js`, `store.js`, `server/server.cjs`. Sem build, sem dependência nova.
- Nada de lógica foi alterado: `store.js`, `data.js`, `sw.js`, `manifest.webmanifest`, ícones e a pasta `server/` são cópias idênticas às do painel.

## Ver funcionando (sem instalar nada)

- **Prévia navegável (GitHub Pages):** https://zephcompany.github.io/marcelo-cliente/demo.html — entra direto no painel com dados de exemplo (perfil admin). Para ver a tela de login: https://zephcompany.github.io/marcelo-cliente/demo.html?login=1 (qualquer e-mail/senha entra). Nada é enviado a servidor nenhum; os dados ficam só no navegador.
- **Styleguide (componentes):** https://zephcompany.github.io/marcelo-cliente/styleguide.html
- **Figma (36 telas desktop + componentes + protótipo clicável):** https://www.figma.com/design/E5NtpoQqfSKD3Bl8cNR6yR/MARCELO-CLIENTE-SASS

## Estrutura

```
index.html            ← carrega fontes novas, ms7-ui.css e ms7-ui.jsx (ordem dos scripts igual à original)
ms7-ui.css            ← NOVO: tokens (claro/escuro), tipografia, classes, animações
ms7-ui.jsx            ← NOVO: componentes do design system refeitos (mesmas props), movimento e assets animados
RailNav.jsx           ← menu lateral + barra inferior (celular) refeitos
OperacoesApp.jsx      ← shell: login, cabeçalho, busca (Ctrl+K), layout
Shared.jsx            ← KPIs, vazios ilustrados, toast, painel de notificações
Screens*.jsx          ← telas, com a mesma lógica e o visual novo
store.js, data.js, sw.js, manifest.webmanifest, logo.svg, ms-icon.svg, icon-*.png   ← iguais ao painel
server/               ← igual ao painel (server.cjs, ds/)
GUIA-VISUAL.md        ← regras do visual (para manter o padrão em telas futuras)
styleguide.html       ← folha de componentes (só para conferência/Figma; não faz parte do painel)
demo.html, tools/     ← prévia estática para o GitHub Pages (gerada por tools/make-demo.js; não copiar para produção)
```

## Como integrar no repo de produção

1. No repo `PAINEL-ADMIN-MARCELO-NOVO`, substitua estes arquivos pelos daqui (raiz do repo):
   `index.html`, `ms7-ui.css`, `ms7-ui.jsx`, `RailNav.jsx`, `OperacoesApp.jsx`, `Shared.jsx` e todos os `Screens*.jsx`
   (`ScreensAnalises`, `ScreensConferencia`, `ScreensConta`, `ScreensCoop`, `ScreensDashboard`, `ScreensGestao`, `ScreensMetas`, `ScreensPix`, `ScreensPonto`, `ScreensTarefas`, `ScreensVagas`).
2. **Não** substitua `store.js`, `data.js`, `sw.js`, `manifest.webmanifest`, ícones nem `server/` — mantenha os do repo de produção (os daqui são cópias de 10/11).
3. Se alguma tela (`Screens*.jsx`) tiver sido alterada no repo de produção **depois de 10/11/2026 13h**, compare antes de substituir e reaplique essa mudança de lógica por cima do arquivo novo (os arquivos daqui estão formatados em várias linhas, o que facilita o diff).
4. Commit + push. O Railway publica sozinho e os navegadores recarregam (`/api/version`).

Para pedir ao Claude a integração, basta: *"Copie os arquivos de front do repo zephcompany/marcelo-cliente listados no README para a raiz deste repo, sem mexer em store.js, data.js e server/. Se alguma Screens*.jsx de produção tiver mudança de lógica feita depois de 10/11/2026 13h, reaplique por cima do arquivo novo."*

## Rodar local

```
cd server && npm install && cd ..
DATA_DIR=./server/data ADMIN_EMAIL=admin@ms7.com ADMIN_PASSWORD=12345678 node server/server.cjs
# abre em http://localhost:3000
```

## O que mudou no visual (resumo)

**Nov/2026 — direção "CRM glass" (atual):** moldura arredondada com fundo quente desfocado, menu em pílula no topo, trilho de ícones flutuante, título grande com estatísticas ao lado, dashboard refeito (lucro por dia em curva suave, cooperações em andamento em tiles, composição do lucro, próxima ação, remessas), botões e abas em pílula, acentos lima/coral/azul. A lista abaixo descreve a versão anterior (Black Glass); o que conflitar foi substituído.


- Tema preto por padrão (`#070808`) com dois campos de luz fixos; cards, menu, cabeçalho, modais, busca e notificações em vidro fosco (translúcido + blur + fio de luz). O tema claro continua como alternativa (botão do sol).
- Fonte Geist (Google Fonts) e Geist Mono para IDs/chaves; pesos 400–600; nada de serif.
- Acento lima só onde importa: ação principal, aba ativa, item ativo do menu, foco. Dinheiro positivo verde, negativo vermelho.
- Emojis pontuais (saudação, título de card, estados vazios, toasts) — ícones de ação continuam lucide.
- Menu lateral recolhível com indicador lima (botão no cabeçalho alterna para um menu no topo, em teste); barra inferior no celular.
- Cabeçalho fixo com blur, subtítulo por página, busca estilo command palette (Ctrl+K), status de sincronização no avatar.
- Login dividido com prévia animada do produto (KPIs contando, gráfico, ciclo fechado, meta).
- Transição de página, entrada em cascata, reveal no scroll, números que contam, gráficos que crescem, hover sutil nos cards (sem glow).
- Estados vazios com assets animados que mostram o que a função faz antes de usar.

## Estilo visual
Para criar ou ajustar telas, siga a skill `skill/ms-control-crm-glass/SKILL.md` (direção "CRM glass": moldura, menu em pílula, trilho de ícones, cards de vidro, tiles, preloader com o logo MS).
