# 📋 Plano do projeto: Assistente-Juridico-modular-17-10-b (1)

_Gerado em 17/10/2026, 13:38:05 — sem IA, lendo os arquivos._

## 📊 Visão geral
| Item | Valor |
|---|---|
| Arquivos | 96 |
| Linhas | 14.158 |
| Telas/páginas | 13 |
| Rotas do backend | 0 |
| Chamadas do app | 3 |
| Tabelas do banco | 0 |
| Variáveis de ambiente | 5 |

**Linguagens:** JavaScript (43), Imagem (17), HTML (13), Markdown (6), JSON (5), YAML (3), Outros (3), CSS (2), Imagem SVG (2), Ícone (1), Python (1)

## 💡 O que fazer (em ordem)
1. 🧹 Tirar a Replit de 10 arquivo(s) (🏗️ Preparar → Fazer tudo)
2. 🔐 Criar um .env.example com: BASE_PATH, GITHUB_STEP_SUMMARY, LOCALAPPDATA, PORT, TESTE_SAIR (os valores você coloca no servidor, nunca no código)
3. 📝 Criar um README.md explicando como rodar
4. 🚫 Criar .gitignore (não mandar node_modules ao GitHub)

## 🚀 Por onde começa
- `ferramentas/cacabug/index.html`
- `index.html`

## 📱 Telas e páginas
| Endereço | Arquivo |
|---|---|
| `ferramentas/cacabug/index.html` | ferramentas/cacabug/index.html |
| `ferramentas/colador.html` | ferramentas/colador.html |
| `ferramentas/colecionador.html` | ferramentas/colecionador.html |
| `ferramentas/comparador.html` | ferramentas/comparador.html |
| `ferramentas/comunicacoes.html` | ferramentas/comunicacoes.html |
| `ferramentas/extrator.html` | ferramentas/extrator.html |
| `ferramentas/juntador.html` | ferramentas/juntador.html |
| `ferramentas/laboratorio.html` | ferramentas/laboratorio.html |
| `ferramentas/limpador.html` | ferramentas/limpador.html |
| `ferramentas/organizador.html` | ferramentas/organizador.html |
| `ferramentas/perito.html` | ferramentas/perito.html |
| `hub.html` | hub.html |
| `index.html` | index.html |

## 🖥️ Rotas do backend
_Nenhum encontrado._

## 📡 O que o app pede ao servidor
| Método | Endereço | Onde |
|---|---|---|
| POST | `/models/${encodeURIComponent(c.modelo)}:generateContent` | ferramentas/cacabug/ferramentas/cirurgiao.js |
| POST | `/messages` | ferramentas/cacabug/ferramentas/cirurgiao.js |
| POST | `/chat/completions` | ferramentas/cacabug/ferramentas/cirurgiao.js |

## 🔌 O que falta no backend
✅ Tudo que o app chama tem rota no projeto (ou o app não usa servidor).

## 🗄️ Banco de dados
_Nenhuma tabela encontrada._

## 🔐 Variáveis de ambiente (configurar no servidor)
- `BASE_PATH`
- `GITHUB_STEP_SUMMARY`
- `LOCALAPPDATA`
- `PORT`
- `TESTE_SAIR`

_Só os nomes. Os valores (chaves, senhas) nunca vão no código nem no GitHub._

## 🤖 IA usada
- api.openai.com
- api.groq.com
- openrouter.ai
- generativelanguage.googleapis.com
- api.anthropic.com
- console.groq.com
- console.anthropic.com
- platform.openai.com

## 🌐 Serviços de fora que ele acessa
- accounts.google.com
- aistudio.google.com
- api.anthropic.com
- api.deepseek.com
- api.groq.com
- api.mistral.ai
- api.openai.com
- api.perplexity.ai
- api.x.ai
- assistente-juridico.local
- cdn.jsdelivr.net
- cdnjs.cloudflare.com
- console.anthropic.com
- console.groq.com
- esm.sh
- expo.dev
- fonts.googleapis.com
- fonts.gstatic.com
- generativelanguage.googleapis.com
- github.com
- google.serper.dev
- nominatim.openstreetmap.org
- ns.adobe.com
- openapi.monica.im
- openrouter.ai
- pje.tjmg.jus.br
- platform.openai.com
- purl.org
- pypi.org
- raw.github.com
- registry.npmjs.org
- seunome.github.io
- stuartk.com
- stuk.github.io
- u.expo.dev
- unpkg.com
- www.google.com
- www.googleapis.com
- www.npmjs.com

## 🧹 Arquivos com coisa da Replit
- ferramentas/cacabug/ferramentas/analisador-universal.js
- ferramentas/cacabug/ferramentas/cirurgiao.js
- ferramentas/cacabug/ferramentas/montar.py
- ferramentas/cacabug/ferramentas/projeto-lab.js
- ferramentas/cacabug/js/30-projeto.js
- ferramentas/cacabug/js/60-comparar.js
- ferramentas/cacabug/js/99-app.js
- ferramentas/cacabug/js/lib/expo-core.js
- ferramentas/cacabug/js/lib/plano-core.js
- service-worker.js

## 🔁 Roteiro para recriar fora da Replit
1. Importar o projeto no Mini SK e tocar em 🏗️ Preparar → ✅ Fazer tudo (tira a Replit, cria os arquivos que faltam).
2. Não tem backend: o site sozinho basta (Netlify ou GitHub Pages).
3. Variáveis: cadastrar 5 variável(is) no servidor (lista acima).
4. Testar a prévia; se der erro, 🤖 Mandar os erros para a IA.
5. App: 📲 Instalável (PWA), 📦 APK ou 🖥️ Desktop (.exe) pelo 🏗️ Preparar.

## 🌳 Árvore de arquivos
```
├─ 📁 .github/
│  └─ 📁 workflows/
│     ├─ apk-capacitor.yml
│     ├─ apk.yml
│     └─ programa-exe.yml
├─ 📁 css/
│  └─ app.css
├─ 📁 electron/
│  └─ main.cjs
├─ 📁 ferramentas/
│  ├─ 📁 cacabug/
│  │  ├─ 📁 css/
│  │  │  └─ app.css
│  │  ├─ 📁 ferramentas/
│  │  │  ├─ ai-code-studio.js
│  │  │  ├─ analisador-universal.js
│  │  │  ├─ cirurgiao.js
│  │  │  ├─ gerador-eas.js
│  │  │  ├─ limpador.js
│  │  │  ├─ montar.py
│  │  │  ├─ ordem.txt
│  │  │  ├─ perito.js
│  │  │  ├─ projeto-lab.js
│  │  │  └─ triagem.js
│  │  ├─ 📁 icons/
│  │  │  ├─ icon-192.png
│  │  │  └─ icon-512.png
│  │  ├─ 📁 js/
│  │  │  ├─ 📁 lib/
│  │  │  │  ├─ expo-core.js
│  │  │  │  ├─ organizar-core.js
│  │  │  │  └─ plano-core.js
│  │  │  ├─ 00-core.js
│  │  │  ├─ 20-zip.js
│  │  │  ├─ 30-projeto.js
│  │  │  ├─ 40-ferramentas.js
│  │  │  ├─ 45-organizar.js
│  │  │  ├─ 50-relatorios.js
│  │  │  ├─ 60-comparar.js
│  │  │  └─ 99-app.js
│  │  ├─ 📁 lib/
│  │  │  ├─ diff-LICENSE.txt
│  │  │  ├─ diff.min.js
│  │  │  ├─ jszip-LICENSE.md
│  │  │  └─ jszip.min.js
│  │  ├─ index.html
│  │  ├─ LEIA-ME.md
│  │  ├─ manifest.json
│  │  └─ sw.js
│  ├─ colador.html
│  ├─ colecionador.html
│  ├─ comparador.html
│  ├─ comunicacoes.html
│  ├─ extrator.html
│  ├─ juntador.html
│  ├─ laboratorio.html
│  ├─ limpador.html
│  ├─ organizador.html
│  └─ perito.html
├─ 📁 icons/
│  ├─ apple-touch-icon.png
│  ├─ icon-128.png
│  ├─ icon-144.png
│  ├─ icon-152.png
│  ├─ icon-16.png
│  ├─ icon-180.png
│  ├─ icon-192.png
│  ├─ icon-32.png
│  ├─ icon-384.png
│  ├─ icon-48.png
│  ├─ icon-512.png
│  ├─ icon-72.png
│  ├─ icon-96.png
│  ├─ icon.svg
│  ├─ maskable-192.png
│  ├─ maskable-512.png
│  └─ maskable.svg
├─ 📁 js/
│  ├─ 00-core.js
│  ├─ 10-ia.js
│  ├─ 12-voz.js
│  ├─ 15-importar.js
│  ├─ 18-texto.js
│  ├─ 20-processar.js
│  ├─ 22-drive.js
│  ├─ 25-regras.js
│  ├─ 30-editor.js
│  ├─ 35-docx.js
│  ├─ 40-conversa.js
│  ├─ 50-documentos.js
│  ├─ 55-biblioteca.js
│  ├─ 60-codigos.js
│  ├─ 70-ferramentas.js
│  ├─ 80-config.js
│  └─ 99-app.js
├─ 📁 lib/
│  ├─ jszip-LICENSE.md
│  └─ jszip.min.js
├─ apk.config.json
├─ capacitor.config.json
├─ favicon.ico
├─ hub.html
├─ hub.webmanifest
├─ index.html
├─ LEIA-ME.md
├─ manifest.json
├─ package.json
├─ PLANO.md
├─ RECEITA.md
├─ service-worker.js
└─ sw.js
```
