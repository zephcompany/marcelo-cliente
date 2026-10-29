# MS Control · front novo (Zeph Company)

Redesign da camada visual do painel **MS Control** (repo de produção: `PAINEL-ADMIN-MARCELO-NOVO`, no Railway). Mesma arquitetura, mesmas funções, mesma API — só o visual mudou: tipografia, componentes, espaçamento, transições, animações, estados vazios ilustrados, login novo, menu novo, modo escuro revisado.

- Base: snapshot dos arquivos **ao vivo** do painel em 29/10/2026 (14h30). Tudo que existia continua existindo.
- Stack intacta: React 18 (UMD) + Babel standalone no navegador, Lucide, `_ds_bundle.js`, `store.js`, `server/server.cjs`. Sem build, sem dependência nova.
- Nada de lógica foi alterado: `store.js`, `data.js`, `sw.js`, `manifest.webmanifest`, ícones e a pasta `server/` são cópias idênticas às do painel.

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
```

## Como integrar no repo de produção

1. No repo `PAINEL-ADMIN-MARCELO-NOVO`, substitua estes arquivos pelos daqui (raiz do repo):
   `index.html`, `ms7-ui.css`, `ms7-ui.jsx`, `RailNav.jsx`, `OperacoesApp.jsx`, `Shared.jsx` e todos os `Screens*.jsx`
   (`ScreensAnalises`, `ScreensConferencia`, `ScreensConta`, `ScreensCoop`, `ScreensDashboard`, `ScreensGestao`, `ScreensMetas`, `ScreensPix`, `ScreensPonto`, `ScreensTarefas`, `ScreensVagas`).
2. **Não** substitua `store.js`, `data.js`, `server/` — mantenha os do repo de produção (aqui são cópias de 29/10; se o painel mudou depois disso, os seus são mais novos).
3. Se alguma tela (`Screens*.jsx`) tiver sido alterada no repo de produção **depois de 29/10 14h30**, compare antes de substituir e reaplique essa mudança de lógica por cima do arquivo novo (os arquivos daqui estão formatados em várias linhas, o que facilita o diff).
4. Commit + push. O Railway publica sozinho e os navegadores recarregam (`/api/version`).

Para pedir ao Claude a integração, basta: *"Copie os arquivos de front do repo zephcompany/marcelo-cliente listados no README para a raiz deste repo, sem mexer em store.js, data.js e server/. Se alguma Screens*.jsx daqui tiver mudança de lógica feita depois de 29/10, reaplique por cima do arquivo novo."*

## Rodar local

```
cd server && npm install && cd ..
DATA_DIR=./server/data ADMIN_EMAIL=admin@ms7.com ADMIN_PASSWORD=12345678 node server/server.cjs
# abre em http://localhost:3000
```

## O que mudou no visual (resumo)

- Fonte Instrument Sans (+ Instrument Serif itálico em poucos destaques), pesos 400–600, números tabulares.
- Cards com anel fino em vez de sombra, raio 16, mais respiro; cor só como detalhe (tile de ícone, ponto, badge tingida).
- Menu lateral com indicador deslizante, tooltips, badges; barra inferior no celular.
- Cabeçalho fixo com blur, subtítulo por página, busca estilo command palette (Ctrl+K), status de sincronização no avatar.
- Login dividido com prévia animada do produto (KPIs contando, gráfico, ciclo fechado, meta).
- Transição de página, entrada em cascata, reveal no scroll, números que contam, gráficos que crescem, hover sutil nos cards.
- Estados vazios com ilustrações animadas que mostram o que a função faz.
- Modo escuro refeito só com tokens.
