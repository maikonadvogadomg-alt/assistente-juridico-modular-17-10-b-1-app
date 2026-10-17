# 🧬 Receita para recriar: Caça-Bug

_Gerada sem IA, lendo 95 arquivo(s). Serve para remontar este app como HTML modular — com qualquer IA, um arquivo por vez._

## 1. O que é

- **Nome:** Caça-Bug
- **Partes de código:** 53 (13 tela, 38 logica, 0 servidor, 0 dados, 2 estilo)
- **Tem servidor (rotas /api):** não — dá para ser só HTML
- **Peças de fora (bibliotecas):** @capacitor/cli, child_process, electron, fs, http, path

## 2. Estrutura modular proposta

```
index.html            ← a página; chama os módulos NA ORDEM
css/app.css           ← o visual
js/00-core.js         ← a "locomotiva": cria window.APP (registrar, guardar, avisar)
js/10-ai-code-studio.js← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era ferramentas/cacabug/ferramentas/ai-code-studio.js)
js/15-analisador-universal.js← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era ferramentas/cacabug/ferramentas/analisador-universal.js)
js/20-cirurgiao.js    ← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era ferramentas/cacabug/ferramentas/cirurgiao.js)
js/25-gerador-eas.js  ← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era ferramentas/cacabug/ferramentas/gerador-eas.js)
js/30-limpador.js     ← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era ferramentas/cacabug/ferramentas/limpador.js)
js/35-montar.js       ← Monta ferramentas/*.js do Caça-Bug a partir dos HTML originais (sem me (era ferramentas/cacabug/ferramentas/montar.py)
js/40-perito.js       ← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era ferramentas/cacabug/ferramentas/perito.js)
js/45-projeto-lab.js  ← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era ferramentas/cacabug/ferramentas/projeto-lab.js)
js/50-triagem.js      ← Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite a (era ferramentas/cacabug/ferramentas/triagem.js)
js/55-zip.js          ← Caça-Bug — 20-zip.js (o mesmo do Mini SK) Lê e cria arquivos .zip SEM  (era ferramentas/cacabug/js/20-zip.js)
js/60-projeto.js      ← Caça-Bug — 30-projeto.js Projetos: importar (.zip, arquivos soltos ou  (era ferramentas/cacabug/js/30-projeto.js)
js/65-ferramentas.js  ← Caça-Bug — 40-ferramentas.js Abre cada ferramenta (Cirurgião, Projeto  (era ferramentas/cacabug/js/40-ferramentas.js)
js/70-organizar.js    ← Caça-Bug — 45-organizar.js Aba 🗂️ Organizar: pega o projeto em uso (a (era ferramentas/cacabug/js/45-organizar.js)
js/75-relatorios.js   ← Caça-Bug — 50-relatorios.js 📋 Relatórios guardados: cada análise fica (era ferramentas/cacabug/js/50-relatorios.js)
js/80-comparar.js     ← Caça-Bug — 60-comparar.js ⚖️ Comparar versões: escolha 2 ou mais proje (era ferramentas/cacabug/js/60-comparar.js)
js/85-expo-core.js    ← expo-core.js — ☁️ Consertar um projeto EXPO para gerar APK pelo EAS Us (era ferramentas/cacabug/js/lib/expo-core.js)
js/90-organizar-core.js← logica (era ferramentas/cacabug/js/lib/organizar-core.js)
js/91-plano-core.js   ← logica (era ferramentas/cacabug/js/lib/plano-core.js)
js/92-ia.js           ← Assistente Jurídico — 10-ia.js Fala com a IA. Principal: Google Gemini (era js/10-ia.js)
js/93-voz.js          ← Assistente Jurídico — 12-voz.js 🎤 Ditado (falar e virar texto) e 🔊 l (era js/12-voz.js)
js/94-importar.js     ← Assistente Jurídico — 15-importar.js Lê arquivos: PDF, Word (.docx), T (era js/15-importar.js)
js/95-texto.js        ← Assistente Jurídico — 18-texto.js Transforma o texto que a IA devolve  (era js/18-texto.js)
js/96-processar.js    ← Assistente Jurídico — 20-processar.js ⚡ Processar: cole/abra o texto d (era js/20-processar.js)
js/97-drive.js        ← Assistente Jurídico — 22-drive.js ☁️ GOOGLE DRIVE DIRETO: manda e busc (era js/22-drive.js)
js/98-regras.js       ← Assistente Jurídico — 25-regras.js 📜 O "cérebro" do seu escritório, q (era js/25-regras.js)
js/98-editor.js       ← Assistente Jurídico — 30-editor.js ✏️ Editor com formatação de verdade (era js/30-editor.js)
js/98-docx.js         ← Assistente Jurídico — 35-docx.js ⬇ Word de VERDADE (.docx), feito aqui (era js/35-docx.js)
js/98-conversa.js     ← Assistente Jurídico — 40-conversa.js 💬 Conversa com a IA sobre o caso (era js/40-conversa.js)
js/98-documentos.js   ← Assistente Jurídico — 50-documentos.js 📁 Documentos salvos no aparelh (era js/50-documentos.js)
js/98-biblioteca.js   ← Assistente Jurídico — 55-biblioteca.js 📐 Modelos (peças prontas com [ (era js/55-biblioteca.js)
js/98-codigos.js      ← Assistente Jurídico — 60-codigos.js 🧪 MEUS CÓDIGOS: playground que GU (era js/60-codigos.js)
js/98-ferramentas.js  ← Assistente Jurídico — 70-ferramentas.js 🧰 As ferramentas que já funci (era js/70-ferramentas.js)
js/98-config.js       ← Assistente Jurídico — 80-config.js ⚙️ Chave da IA (Gemini grátis + Gro (era js/80-config.js)
js/98-cacabug.js      ← Caça-Bug (era ferramentas/cacabug/index.html)
js/98-colador.js      ← Colador de Links — 🔗 Colador de Links (era ferramentas/colador.html)
js/98-colecionador.js ← Colecionador de Comandos (era ferramentas/colecionador.html)
js/98-comparador.js   ← Comparador de Versões — ⚖️ Comparador de Versões (era ferramentas/comparador.html)
js/98-comunicacoes.js ← Comunicações Processuais — ⚖️ Comunicações Processuais (era ferramentas/comunicacoes.html)
js/98-extrator.js     ← Extrator de Sites — 🛠️ Extrator de Sites (era ferramentas/extrator.html)
js/98-juntador.js     ← Juntador de Arquivos — 🧩 Juntador de Arquivos (era ferramentas/juntador.html)
js/98-laboratorio.js  ← Laboratório HTML — Advocacia Previdenciária (era ferramentas/laboratorio.html)
js/98-limpador.js     ← Limpador de Processos — Limpador de Processos (era ferramentas/limpador.html)
js/98-organizador.js  ← Organizador de Documentos — 📑 Organizador de Documentos (era ferramentas/organizador.html)
js/98-perito.js       ← Perito de Metadados — Perito de Metadados (era ferramentas/perito.html)
js/98-hub.js          ← Assistente-Juridico-modular-17-10-b (1) — Assistente-Juridico-modular- (era hub.html)
js/98-inicio.js       ← Assistente Jurídico (era index.html)
js/99-app.js          ← o último: monta a tela com o que embarcou
```

## 3. As partes, uma por uma

| # | Era | Vira | Tipo | O que faz | Usa |
|---|---|---|---|---|---|
| 1 | `electron/main.cjs` | css/app.css | logica | Assistente Jurídico como programa do Windows: abre o index.html numa janela própria e liga | package.json |
| 2 | `ferramentas/cacabug/ferramentas/ai-code-studio.js` | `js/10-ai-code-studio.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 3 | `ferramentas/cacabug/ferramentas/analisador-universal.js` | `js/15-analisador-universal.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 4 | `ferramentas/cacabug/ferramentas/cirurgiao.js` | `js/20-cirurgiao.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 5 | `ferramentas/cacabug/ferramentas/gerador-eas.js` | `js/25-gerador-eas.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 6 | `ferramentas/cacabug/ferramentas/limpador.js` | `js/30-limpador.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 7 | `ferramentas/cacabug/ferramentas/montar.py` | `js/35-montar.js` | logica | Monta ferramentas/*.js do Caça-Bug a partir dos HTML originais (sem mexer neles). Uso: pyt | — |
| 8 | `ferramentas/cacabug/ferramentas/perito.js` | `js/40-perito.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 9 | `ferramentas/cacabug/ferramentas/projeto-lab.js` | `js/45-projeto-lab.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 10 | `ferramentas/cacabug/ferramentas/triagem.js` | `js/50-triagem.js` | logica | Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o origina | — |
| 11 | `ferramentas/cacabug/js/00-core.js` | css/app.css | logica | Caça-Bug — 00-core.js (a mesma base do Mini SK, com banco próprio) Base de tudo: atalhos,  | — |
| 12 | `ferramentas/cacabug/js/20-zip.js` | `js/55-zip.js` | logica | Caça-Bug — 20-zip.js (o mesmo do Mini SK) Lê e cria arquivos .zip SEM biblioteca externa ( | — |
| 13 | `ferramentas/cacabug/js/30-projeto.js` | `js/60-projeto.js` | logica | Caça-Bug — 30-projeto.js Projetos: importar (.zip, arquivos soltos ou pasta), guardar no a | — |
| 14 | `ferramentas/cacabug/js/40-ferramentas.js` | `js/65-ferramentas.js` | logica | Caça-Bug — 40-ferramentas.js Abre cada ferramenta (Cirurgião, Projeto Lab, Triagem, Perito | — |
| 15 | `ferramentas/cacabug/js/45-organizar.js` | `js/70-organizar.js` | logica | Caça-Bug — 45-organizar.js Aba 🗂️ Organizar: pega o projeto em uso (aquela pasta "embolad | — |
| 16 | `ferramentas/cacabug/js/50-relatorios.js` | `js/75-relatorios.js` | logica | Caça-Bug — 50-relatorios.js 📋 Relatórios guardados: cada análise fica salva no aparelho,  | — |
| 17 | `ferramentas/cacabug/js/60-comparar.js` | `js/80-comparar.js` | logica | Caça-Bug — 60-comparar.js ⚖️ Comparar versões: escolha 2 ou mais projetos guardados e veja | — |
| 18 | `ferramentas/cacabug/js/99-app.js` | css/app.css | logica | Caça-Bug — 99-app.js Liga tudo: abas de baixo, tela de Projetos e tela de Diagnóstico | — |
| 19 | `ferramentas/cacabug/js/lib/expo-core.js` | `js/85-expo-core.js` | logica | expo-core.js — ☁️ Consertar um projeto EXPO para gerar APK pelo EAS Usado pelo Caça-Bug (D | app.json |
| 20 | `ferramentas/cacabug/js/lib/organizar-core.js` | `js/90-organizar-core.js` | logica | base, dir, ext, norm | — |
| 21 | `ferramentas/cacabug/js/lib/plano-core.js` | `js/91-plano-core.js` | logica | ext, uniq, normRota, arvore | — |
| 22 | `js/00-core.js` | css/app.css | logica | Assistente Jurídico — 00-core.js  (A LOCOMOTIVA: vem primeiro) Cria o "caixa comum" J que  | — |
| 23 | `js/10-ia.js` | `js/92-ia.js` | logica | Assistente Jurídico — 10-ia.js Fala com a IA. Principal: Google Gemini (chave grátis, AIza | — |
| 24 | `js/12-voz.js` | `js/93-voz.js` | logica | Assistente Jurídico — 12-voz.js 🎤 Ditado (falar e virar texto) e 🔊 leitura em voz NATURA | — |
| 25 | `js/15-importar.js` | `js/94-importar.js` | logica | Assistente Jurídico — 15-importar.js Lê arquivos: PDF, Word (.docx), TXT, MD, RTF, HTML. P | — |
| 26 | `js/18-texto.js` | `js/95-texto.js` | logica | Assistente Jurídico — 18-texto.js Transforma o texto que a IA devolve (com ##, **negrito** | — |
| 27 | `js/20-processar.js` | `js/96-processar.js` | logica | Assistente Jurídico — 20-processar.js ⚡ Processar: cole/abra o texto do processo → escolha | — |
| 28 | `js/22-drive.js` | `js/97-drive.js` | logica | Assistente Jurídico — 22-drive.js ☁️ GOOGLE DRIVE DIRETO: manda e busca arquivos na SUA co | — |
| 29 | `js/25-regras.js` | `js/98-regras.js` | logica | Assistente Jurídico — 25-regras.js 📜 O "cérebro" do seu escritório, que cresce com o temp | — |
| 30 | `js/30-editor.js` | `js/98-editor.js` | logica | Assistente Jurídico — 30-editor.js ✏️ Editor com formatação de verdade (folha A4, padrão A | — |
| 31 | `js/35-docx.js` | `js/98-docx.js` | logica | Assistente Jurídico — 35-docx.js ⬇ Word de VERDADE (.docx), feito aqui no aparelho, sem in | — |
| 32 | `js/40-conversa.js` | `js/98-conversa.js` | logica | Assistente Jurídico — 40-conversa.js 💬 Conversa com a IA sobre o caso — por texto ou por  | — |
| 33 | `js/50-documentos.js` | `js/98-documentos.js` | logica | Assistente Jurídico — 50-documentos.js 📁 Documentos salvos no aparelho + 🕐 histórico do  | — |
| 34 | `js/55-biblioteca.js` | `js/98-biblioteca.js` | logica | Assistente Jurídico — 55-biblioteca.js 📐 Modelos (peças prontas com [CAMPOS]) e 📚 Ementa | — |
| 35 | `js/60-codigos.js` | `js/98-codigos.js` | logica | Assistente Jurídico — 60-codigos.js 🧪 MEUS CÓDIGOS: playground que GUARDA. Para os seus c | — |
| 36 | `js/70-ferramentas.js` | `js/98-ferramentas.js` | logica | Assistente Jurídico — 70-ferramentas.js 🧰 As ferramentas que já funcionam, cada uma no se | — |
| 37 | `js/80-config.js` | `js/98-config.js` | logica | Assistente Jurídico — 80-config.js ⚙️ Chave da IA (Gemini grátis + Groq de reserva), voz,  | — |
| 38 | `js/99-app.js` | css/app.css | logica | Assistente Jurídico — 99-app.js  (O ÚLTIMO VAGÃO: vem por último) Monta cada módulo na sua | — |
| 39 | `ferramentas/cacabug/css/app.css` | css/app.css | estilo | Caça-Bug — aparência. Cores do Mini SK (escuro), letras legíveis no celular | — |
| 40 | `ferramentas/cacabug/index.html` | `js/98-cacabug.js` | tela | Caça-Bug | manifest.json, icon-192.png, app.css, 00-core.js |
| 41 | `ferramentas/colador.html` | `js/98-colador.js` | tela | Colador de Links — 🔗 Colador de Links | — |
| 42 | `ferramentas/colecionador.html` | `js/98-colecionador.js` | tela | Colecionador de Comandos | — |
| 43 | `ferramentas/comparador.html` | `js/98-comparador.js` | tela | Comparador de Versões — ⚖️ Comparador de Versões | — |
| 44 | `ferramentas/comunicacoes.html` | `js/98-comunicacoes.js` | tela | Comunicações Processuais — ⚖️ Comunicações Processuais | — |
| 45 | `ferramentas/extrator.html` | `js/98-extrator.js` | tela | Extrator de Sites — 🛠️ Extrator de Sites | — |
| 46 | `ferramentas/juntador.html` | `js/98-juntador.js` | tela | Juntador de Arquivos — 🧩 Juntador de Arquivos | — |
| 47 | `ferramentas/laboratorio.html` | `js/98-laboratorio.js` | tela | Laboratório HTML — Advocacia Previdenciária | — |
| 48 | `ferramentas/limpador.html` | `js/98-limpador.js` | tela | Limpador de Processos — Limpador de Processos | — |
| 49 | `ferramentas/organizador.html` | `js/98-organizador.js` | tela | Organizador de Documentos — 📑 Organizador de Documentos | — |
| 50 | `ferramentas/perito.html` | `js/98-perito.js` | tela | Perito de Metadados — Perito de Metadados | — |
| 51 | `hub.html` | `js/98-hub.js` | tela | Assistente-Juridico-modular-17-10-b (1) — Assistente-Juridico-modular-17-10-b (1) | hub.webmanifest, favicon.ico, icon.svg, apple-touch-icon.png |
| 52 | `css/app.css` | css/app.css | estilo | Assistente Jurídico — visual: azul-tinta e papel. Feito para o celular primeiro | — |
| 53 | `index.html` | `js/98-inicio.js` | tela | Assistente Jurídico | app.css, manifest.json, favicon.ico, icon.svg |

## 4. Montar passo a passo (cada bloco é um pedido pronto: 📋 Copiar → colar na IA)

### Passo 0 — combinar as regras com a IA

```text
Vamos recriar o app "Caça-Bug" como HTML MODULAR, que abre pelo index.html, sem servidor e sem nada da Replit.
Regras: (1) index.html chama os arquivos js/ na ordem, antes do </body>; (2) js/00-core.js cria window.APP com APP.registrar(modulo), APP.guardar(chave, valor) em IndexedDB/localStorage e APP.avisar(texto); (3) cada arquivo js/NN-nome.js cuida de UM assunto, começa com (function (APP) { e termina com })(window.APP); (4) js/99-app.js vem por último e monta a tela com os módulos registrados; (5) textos em português do Brasil.
Vou pedir UM arquivo por vez. Responda só com o arquivo completo, sem cortar nada. Primeiro: crie index.html, css/app.css e js/00-core.js.
```

### Passo 1 — `js/10-ai-code-studio.js` (era `ferramentas/cacabug/ferramentas/ai-code-studio.js`, 3 linhas)

```text
Crie js/10-ai-code-studio.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: est, uid, isMobile, escapeHtml, copyText, activeConv, MODULE_Storage, save, saveSoon, load, normMemory, stamp, download, exportAll, importBackup, handleImport, MODULE_Provider, models.
Ele chamava estes endereços: https://api.anthropic.com/v1/messages, https://api.anthropic.com/v1/models?limit=100, https://google.serper.dev/search. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 2 — `js/15-analisador-universal.js` (era `ferramentas/cacabug/ferramentas/analisador-universal.js`, 3 linhas)

```text
Crie js/15-analisador-universal.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: handleFileInput, importZip, handleFolderInput, tryDecodeText, renderTree, buildTree, renderNode, countFiles, toggleFolder, expandAll, collapseAll, filterFiles, getFileIcon, formatSize, openFile, closeTab, renderTabs, renderEditor.
O original usava as bibliotecas @capacitor/cli: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 3 — `js/20-cirurgiao.js` (era `ferramentas/cacabug/ferramentas/cirurgiao.js`, 3 linhas)

```text
Crie js/20-cirurgiao.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: esc, fmtB, fmtN, usd, agora, pausa, tokensDe, extDe, decode, pareceBinario, inflate, lerZip, CRC, crc32, escreverZip, baixar, copiar, status.
Ele chamava estes endereços: ${c.base}/models/${encodeURIComponent(c.modelo)}:generateContent, ${c.base}/messages, ${c.base}/chat/completions, https://registry.npmjs.org/, https://registry.npmjs.org/-/v1/search?size=20&text=, https://pypi.org/pypi/. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 4 — `js/25-gerador-eas.js` (era `ferramentas/cacabug/ferramentas/gerador-eas.js`, 3 linhas)

```text
Crie js/25-gerador-eas.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: switchTab, autoId, atualizar, importarProjeto, preencherDados, gerarTudo, renderArquivos, copiar, exportarZip, fileIcon, esc, escHtml, loadJSZ.
O original usava as bibliotecas @capacitor/cli: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 5 — `js/30-limpador.js` (era `ferramentas/cacabug/ferramentas/limpador.js`, 3 linhas)

```text
Crie js/30-limpador.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: esc, fmt, linhasDaPagina, lerPdf, lerTxt, progresso, adicionar, regrasAtivas, minhasRegras, normLinha, acharRepetidas, limparPagina, processar, montarRegras, montarRepetidas, aplicar, faixas, verPagina.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 6 — `js/35-montar.js` (era `ferramentas/cacabug/ferramentas/montar.py`, 81 linhas)

```text
Crie js/35-montar.js. Ele faz: Monta ferramentas/*.js do Caça-Bug a partir dos HTML originais (sem mexer neles). Uso: python3 montar.py   (os originais ficam em /home/claude/cacabug-fontes e /home/claude).
No app original ele tinha estas funções/partes: fim_body, inserir_antes, libs_locais, importFiles.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 7 — `js/40-perito.js` (era `ferramentas/cacabug/ferramentas/perito.js`, 3 linhas)

```text
Crie js/40-perito.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: EMBUTIDO, esc, latin1, deLatin1, juntar, utf8, decTexto, tamanhoTxt, sha256js, sha256, inflar, inflarZlib, mkData, dataPdf, dataExif, dataIso, difTxt, num.
Ele chamava estes endereços: https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=br&q=. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 8 — `js/45-projeto-lab.js` (era `ferramentas/cacabug/ferramentas/projeto-lab.js`, 3 linhas)

```text
Crie js/45-projeto-lab.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: esc, tick, fmtSize, fmtDate, normPath, dirname, basename, extOf, joinPath, hex, inflate, mask, lineFinder, parseLenientJSON, langOf, sniff, zipEntries, parsePax.
Ele chamava estes endereços: https://api.anthropic.com/v1/messages, https://api.anthropic.com/v1/models?limit=100. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 9 — `js/50-triagem.js` (era `ferramentas/cacabug/ferramentas/triagem.js`, 3 linhas)

```text
Crie js/50-triagem.js. Ele faz: Ferramenta do Caça-Bug — gerada a partir do HTML original (não edite aqui; edite o original e rode montar.py).
No app original ele tinha estas funções/partes: renderLista, abrirConversa, conversaAtiva, renderMensagens, enviarMensagem, formatarHora, salvar, extOf, normPath, findPaths, compatible, sniffType, looksWindows, extForType, fnNames, computeSig, jaccard, speakerOf.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 10 — `js/55-zip.js` (era `ferramentas/cacabug/js/20-zip.js`, 120 linhas)

```text
Crie js/55-zip.js. Ele faz: Caça-Bug — 20-zip.js (o mesmo do Mini SK) Lê e cria arquivos .zip SEM biblioteca externa (funciona offline). Usa o descompactador que já vem no navegador (DecompressionStream).
No app original ele tinha estas funções/partes: CRC_TABLE, crc32, streamThrough, read, write.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 11 — `js/60-projeto.js` (era `ferramentas/cacabug/js/30-projeto.js`, 215 linhas)

```text
Crie js/60-projeto.js. Ele faz: Caça-Bug — 30-projeto.js Projetos: importar (.zip, arquivos soltos ou pasta), guardar no aparelho, escolher o projeto ativo e fazer o DIAGNÓSTICO RÁPIDO: - que tipo de projeto é (Replit, Vite/React, Expo, Capacitor, servidor, PWA);.
No app original ele tinha estas funções/partes: listar, pegar, entradasDe, guardar, escolher, apagar, arquivoZip, semExt, importarArquivos, texto, raizComum, mascara, examinarIndex, diagnostico, tem, consertarCaminhos.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 12 — `js/65-ferramentas.js` (era `ferramentas/cacabug/js/40-ferramentas.js`, 136 linhas)

```text
Crie js/65-ferramentas.js. Ele faz: Caça-Bug — 40-ferramentas.js Abre cada ferramenta (Cirurgião, Projeto Lab, Triagem, Perito…) DENTRO do app, sem mexer no jeito delas funcionarem: - entrega o projeto ativo automaticamente (não precisa importar de novo);.
No app original ele tinha estas funções/partes: REG, baixar, tenta, comKit, lista, porId, esperarHub, olha, criarFrame, noFrame, alimentar, abrir, abrirComparacao, guardarRelatorio, montarLista.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 13 — `js/70-organizar.js` (era `ferramentas/cacabug/js/45-organizar.js`, 54 linhas)

```text
Crie js/70-organizar.js. Ele faz: Caça-Bug — 45-organizar.js Aba 🗂️ Organizar: pega o projeto em uso (aquela pasta "embolada") e devolve tudo separado — usa js/lib/organizar-core.js.
No app original ele tinha estas funções/partes: montar, analisar, num, zipar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 14 — `js/75-relatorios.js` (era `ferramentas/cacabug/js/50-relatorios.js`, 49 linhas)

```text
Crie js/75-relatorios.js. Ele faz: Caça-Bug — 50-relatorios.js 📋 Relatórios guardados: cada análise fica salva no aparelho, com data, ferramenta e projeto. Não some quando você sai da ferramenta. Abrir · copiar · baixar · mandar (Drive/WhatsApp) · apagar.
No app original ele tinha estas funções/partes: guardar, listar, nomeArq, cabecalho, montar, zipTodos.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 15 — `js/80-comparar.js` (era `ferramentas/cacabug/js/60-comparar.js`, 244 linhas)

```text
Crie js/80-comparar.js. Ele faz: Caça-Bug — 60-comparar.js ⚖️ Comparar versões: escolha 2 ou mais projetos guardados e veja - a tabela de RECURSOS por versão (IA, voz, PDF, Word, DJEN…) ✓ / — - arquivos: só numa, só na outra, mudaram, iguais.
No app original ele tinha estas funções/partes: raizComum, indice, difLinhas, soEm, comparar, textoRelatorio, bloco, montar, html, det, ligar, verDiferenca, mostra.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 16 — `js/85-expo-core.js` (era `ferramentas/cacabug/js/lib/expo-core.js`, 192 linhas)

```text
Crie js/85-expo-core.js. Ele faz: expo-core.js — ☁️ Consertar um projeto EXPO para gerar APK pelo EAS Usado pelo Caça-Bug (Diagnóstico) e pelo Mini SK (painel ☁️ EAS). Junta o que os geradores antigos faziam separado (app.json, eas.json, autorizações, receita do GitHub) + limpeza da Replit, numa passada só.
No app original ele tinha estas funções/partes: json, raizDe, slugDe, ler, permissoes, tem, consertar, existe, tirarImg, limpa, base.
O original usava as bibliotecas fs: em HTML puro, use a versão de CDN (ou faça sem ela, se for simples).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 17 — `js/90-organizar-core.js` (era `ferramentas/cacabug/js/lib/organizar-core.js`, 347 linhas)

```text
Crie js/90-organizar-core.js. Ele é uma parte de logica do app.
No app original ele tinha estas funções/partes: base, dir, ext, norm, slug, chaveConteudo, hash, assuntoDe, incompleto, ehModuloES, sintaxe, conversaColada, tentarConsertar, resumo, cortar, add, analisar, relatorio.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 18 — `js/91-plano-core.js` (era `ferramentas/cacabug/js/lib/plano-core.js`, 171 linhas)

```text
Crie js/91-plano-core.js. Ele é uma parte de logica do app.
No app original ele tinha estas funções/partes: ext, uniq, normRota, arvore, andar, gerar, chave, dedup, temRota, tem, markdown, tab.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 19 — `js/92-ia.js` (era `js/10-ia.js`, 199 linhas)

```text
Crie js/92-ia.js. Ele faz: Assistente Jurídico — 10-ia.js Fala com a IA. Principal: Google Gemini (chave grátis, AIza… ou AQ.…). Reserva: Groq (grátis, chave gsk_…) — se o Gemini der "limite", troca sozinho. O modelo antigo (gemini-1.5-flash) foi desligado pelo Google: era um dos.
No app original ele tinha estas funções/partes: cfg, salvar, sistemaBase, textoDeErro, gFetch, corpoGemini, gemini, groq, ollama, ollamaInfo, compat, claude, modelosOpenRouter, gerar, modelos.
Ele chamava estes endereços: https://api.anthropic.com/v1/messages, https://openrouter.ai/api/v1/models. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 20 — `js/93-voz.js` (era `js/12-voz.js`, 149 linhas)

```text
Crie js/93-voz.js. Ele faz: Assistente Jurídico — 12-voz.js 🎤 Ditado (falar e virar texto) e 🔊 leitura em voz NATURAL. A voz é a do Gemini (gente de verdade, não robô) — usa a mesma chave grátis. Voz "de robô" do aparelho NUNCA é usada. No navegador Edge, as vozes.
No app original ele tinha estas funções/partes: cfg, limpar, pedacos, wav, audioGemini, parar, vozesNaturais, falar, fim, ditar, botaoDitado.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 21 — `js/94-importar.js` (era `js/15-importar.js`, 60 linhas)

```text
Crie js/94-importar.js. Ele faz: Assistente Jurídico — 15-importar.js Lê arquivos: PDF, Word (.docx), TXT, MD, RTF, HTML. PDF e Word usam bibliotecas que vêm da internet só na 1ª vez. Foto/escaneado (precisa de OCR): use a ferramenta 🧹 Limpador.
No app original ele tinha estas funções/partes: pdf, docx, rtf, htmlParaTexto, lerArquivo, escolher.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 22 — `js/95-texto.js` (era `js/18-texto.js`, 77 linhas)

```text
Crie js/95-texto.js. Ele faz: Assistente Jurídico — 18-texto.js Transforma o texto que a IA devolve (com ##, **negrito**, listas) em texto formatado de verdade — para mostrar na tela e para o Editor/Word.
No app original ele tinha estas funções/partes: inline, mdParaHtml, cel, htmlParaTexto, limparHtml, andar, textoParaHtml.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 23 — `js/96-processar.js` (era `js/20-processar.js`, 119 linhas)

```text
Crie js/96-processar.js. Ele faz: Assistente Jurídico — 20-processar.js ⚡ Processar: cole/abra o texto do processo → escolha o que fazer → resultado formatado → Editor, Word, ouvir, salvar ou conversar sobre ele. As ações vieram do "Assistente Jurídico Pro" antigo (mesmos pedidos).
No app original ele tinha estas funções/partes: montar, pintarAcoes, conta, executar, podar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 24 — `js/97-drive.js` (era `js/22-drive.js`, 87 linhas)

```text
Crie js/97-drive.js. Ele faz: Assistente Jurídico — 22-drive.js ☁️ GOOGLE DRIVE DIRETO: manda e busca arquivos na SUA conta do Drive, numa pasta "Assistente Jurídico", sem precisar do app do Drive. Precisa de um "ID do cliente" (Client ID) do Google — é de graça, faz uma.
No app original ele tinha estas funções/partes: cfg, salvar, configurado, conectar, api, pasta, enviar, listar, baixar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 25 — `js/98-regras.js` (era `js/25-regras.js`, 97 linhas)

```text
Crie js/98-regras.js. Ele faz: Assistente Jurídico — 25-regras.js 📜 O "cérebro" do seu escritório, que cresce com o tempo, SEM mexer no código: - Regras: como a IA deve escrever e processar (cole quantas quiser; liga/desliga). - Memória: o que a IA deve saber (dados do escritório, preferências, casos).
No app original ele tinha estas funções/partes: carregar, paraIA, montar, exportar, pintar, clique.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 26 — `js/98-editor.js` (era `js/30-editor.js`, 133 linhas)

```text
Crie js/98-editor.js. Ele faz: Assistente Jurídico — 30-editor.js ✏️ Editor com formatação de verdade (folha A4, padrão ABNT): negrito, itálico, sublinhado, títulos, citação recuada, alinhamento, recuo da 1ª linha, listas, fonte e tamanho. Baixa em Word (.docx) de verdade.
No app original ele tinha estas funções/partes: montar, voltarSelecao, estilizar, marcarMudou, html, texto, nomeArquivo, paginaHtml, abrir, salvar, iaNaSelecao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 27 — `js/98-docx.js` (era `js/35-docx.js`, 146 linhas)

```text
Crie js/98-docx.js. Ele faz: Assistente Jurídico — 35-docx.js ⬇ Word de VERDADE (.docx), feito aqui no aparelho, sem internet. Folha A4, margens ABNT (3/3/2/2 cm), Times 12, espaçamento 1,5, recuo de 2,5 cm na 1ª linha, citação recuada 4 cm em 10 pt,.
No app original ele tinha estas funções/partes: tamanhoMeioPonto, run, runs, paragrafo, alinhamento, corpo, bloco, filhos, despeja, gerar, baixar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 28 — `js/98-conversa.js` (era `js/40-conversa.js`, 128 linhas)

```text
Crie js/98-conversa.js. Ele faz: Assistente Jurídico — 40-conversa.js 💬 Conversa com a IA sobre o caso — por texto ou por VOZ. 📎 Contexto: o documento do Editor, o texto do Processar ou um arquivo. 🔁 Modo voz: você fala → a IA responde em voz natural → escuta de novo.
No app original ele tinha estas funções/partes: nova, montar, definirContexto, pintarContexto, listar, pintar, guardar, enviar, escutar, alternarModoVoz, pintarModo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 29 — `js/98-documentos.js` (era `js/50-documentos.js`, 80 linhas)

```text
Crie js/98-documentos.js. Ele faz: Assistente Jurídico — 50-documentos.js 📁 Documentos salvos no aparelho + 🕐 histórico do que a IA fez. Abrir no Editor, baixar em Word, mandar ao Drive, duplicar, apagar. 💾 Backup de tudo num arquivo só (e restaurar em outro aparelho).
No app original ele tinha estas funções/partes: nomeArq, montar, casa, pintar, item, acao, backup, restaurar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 30 — `js/98-biblioteca.js` (era `js/55-biblioteca.js`, 87 linhas)

```text
Crie js/98-biblioteca.js. Ele faz: Assistente Jurídico — 55-biblioteca.js 📐 Modelos (peças prontas com [CAMPOS]) e 📚 Ementas (jurisprudência que VOCÊ guarda — a IA só usa as que você marcar; nada inventado). 🪄 Preencher modelo com o caso: a IA completa os [CAMPOS] com o texto do ⚡ Processar.
No app original ele tinha estas funções/partes: montar, pintarModelos, pintarEmentas, acao.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 31 — `js/98-codigos.js` (era `js/60-codigos.js`, 104 linhas)

```text
Crie js/98-codigos.js. Ele faz: Assistente Jurídico — 60-codigos.js 🧪 MEUS CÓDIGOS: playground que GUARDA. Para os seus códigos jurídicos (calculadoras, modelos em HTML, ferramentas antigas…). Cole ou importe (vários de uma vez, inclusive .zip), rode ao vivo.
No app original ele tinha estas funções/partes: humano, tipoDe, montar, carregar, pintar, abrir, modo, rodar, fechar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 32 — `js/98-ferramentas.js` (era `js/70-ferramentas.js`, 58 linhas)

```text
Crie js/98-ferramentas.js. Ele faz: Assistente Jurídico — 70-ferramentas.js 🧰 As ferramentas que já funcionam, cada uma no seu arquivo (ferramentas/), abertas aqui dentro. Ficam "vivas": trocar de aba não apaga o que estava sendo feito nelas.
No app original ele tinha estas funções/partes: montar, passarChave, abrir.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 33 — `js/98-config.js` (era `js/80-config.js`, 176 linhas)

```text
Crie js/98-config.js. Ele faz: Assistente Jurídico — 80-config.js ⚙️ Chave da IA (Gemini grátis + Groq de reserva), voz, seus dados e regras do escritório (a IA segue sempre). Tudo fica só neste aparelho.
No app original ele tinha estas funções/partes: montar, pintarOutra, salvarO, pintarProv, salvarDr, preencherOl, olMsg, pintarCat, guardarChave, pintarVoz, guardarVoz.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 34 — `js/98-cacabug.js` (era `ferramentas/cacabug/index.html`, 69 linhas)

```text
Crie js/98-cacabug.js. Ele faz: Caça-Bug.
Ele usa o que já foi criado em: js/55-zip.js, js/60-projeto.js, js/20-cirurgiao.js, js/45-projeto-lab.js, js/15-analisador-universal.js, js/50-triagem.js, js/25-gerador-eas.js, js/30-limpador.js, js/10-ai-code-studio.js, js/40-perito.js, js/65-ferramentas.js, js/75-relatorios.js, js/80-comparar.js, js/91-plano-core.js, js/85-expo-core.js, js/90-organizar-core.js, js/70-organizar.js (pelo APP).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 35 — `js/98-colador.js` (era `ferramentas/colador.html`, 695 linhas)

```text
Crie js/98-colador.js. Ele faz: Colador de Links — 🔗 Colador de Links.
No app original ele tinha estas funções/partes: uid, ler, gravar, outra, nomeDe, pintar, fixar, tirar, mover, recarregar, pintarJanela, iniciar, montar, salvar, daLista, contar, pintarListas, quadro.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 36 — `js/98-colecionador.js` (era `ferramentas/colecionador.html`, 1672 linhas)

```text
Crie js/98-colecionador.js. Ele faz: Colecionador de Comandos.
No app original ele tinha estas funções/partes: req, QR8bitByte, QRBitBuffer, QRPolynomial, QRRSBlock, QRCode, esc, semAcento, uid, toast, ler, salvar, copiar, adivinhar, desenharFiltros, desenhar, cartao, lembrete.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 37 — `js/98-comparador.js` (era `ferramentas/comparador.html`, 389 linhas)

```text
Crie js/98-comparador.js. Ele faz: Comparador de Versões — ⚖️ Comparador de Versões.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 38 — `js/98-comunicacoes.js` (era `ferramentas/comunicacoes.html`, 287 linhas)

```text
Crie js/98-comunicacoes.js. Ele faz: Comunicações Processuais — ⚖️ Comunicações Processuais.
No app original ele tinha estas funções/partes: esc, carregarDados, iso, periodo, limpar, fData, parse, chave, status, montarParams, buscar, render, baixar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 39 — `js/98-extrator.js` (era `ferramentas/extrator.html`, 265 linhas)

```text
Crie js/98-extrator.js. Ele faz: Extrator de Sites — 🛠️ Extrator de Sites.
No app original ele tinha estas funções/partes: esc, LEITOR, hist, salvarHist, renderHist, status, buscar, absoluto, analisar, addRec, extrair, realce, conteudoAba, mostrar, copiar, baixar, nomeBase, CRC.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 40 — `js/98-juntador.js` (era `ferramentas/juntador.html`, 437 linhas)

```text
Crie js/98-juntador.js. Ele faz: Juntador de Arquivos — 🧩 Juntador de Arquivos.
No app original ele tinha estas funções/partes: esc, uid, toast, ext, lang, isTexto, bytesFmt, linhas, decode, pareceBinario, b64, unb64, inflate, lerZip, CRC, crc32, escreverZip, textoDocx.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 41 — `js/98-laboratorio.js` (era `ferramentas/laboratorio.html`, 823 linhas)

```text
Crie js/98-laboratorio.js. Ele faz: Laboratório HTML — Advocacia Previdenciária.
No app original ele tinha estas funções/partes: separar, ler, cssDosAjustes, regra, completo, guardar, caminho, limpo, info, marcar, pagina, quemE, hex, transparente, num, montar, carregar, enviar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 42 — `js/98-limpador.js` (era `ferramentas/limpador.html`, 654 linhas)

```text
Crie js/98-limpador.js. Ele faz: Limpador de Processos — Limpador de Processos.
No app original ele tinha estas funções/partes: esc, fmt, linhasDaPagina, lerPdf, lerTxt, progresso, adicionar, regrasAtivas, minhasRegras, normLinha, acharRepetidas, limparPagina, processar, montarRegras, montarRepetidas, aplicar, faixas, verPagina.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 43 — `js/98-organizador.js` (era `ferramentas/organizador.html`, 558 linhas)

```text
Crie js/98-organizador.js. Ele faz: Organizador de Documentos — 📑 Organizador de Documentos.
No app original ele tinha estas funções/partes: esc, tipoDe, compDe, numDe, moedaPorData, lerPdf, organizar, deTexto, moldeDe, bate, aplicar, camposUsados, status, tudo, renderLinhas, escolherRegra, renderRegras, fmtComp.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 44 — `js/98-perito.js` (era `ferramentas/perito.html`, 1123 linhas)

```text
Crie js/98-perito.js. Ele faz: Perito de Metadados — Perito de Metadados.
No app original ele tinha estas funções/partes: EMBUTIDO, esc, latin1, deLatin1, juntar, utf8, decTexto, tamanhoTxt, sha256js, sha256, inflar, inflarZlib, mkData, dataPdf, dataExif, dataIso, difTxt, num.
Ele chamava estes endereços: https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=br&q=. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 45 — `js/98-hub.js` (era `hub.html`, 81 linhas)

```text
Crie js/98-hub.js. Ele faz: Assistente-Juridico-modular-17-10-b (1) — Assistente-Juridico-modular-17-10-b (1).
No app original ele tinha estas funções/partes: rec, esc, card, show.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 46 — `js/98-inicio.js` (era `index.html`, 78 linhas)

```text
Crie js/98-inicio.js. Ele faz: Assistente Jurídico.
Ele usa o que já foi criado em: js/92-ia.js, js/93-voz.js, js/97-drive.js, js/94-importar.js, js/95-texto.js, js/98-regras.js, js/96-processar.js, js/98-editor.js, js/98-docx.js, js/98-conversa.js, js/98-documentos.js, js/98-biblioteca.js, js/98-codigos.js, js/98-ferramentas.js, js/98-config.js (pelo APP).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 47 — `js/99-app.js` e conferir

```text
Crie js/99-app.js: ele olha APP.modulos e monta o menu/abas com um botão para cada módulo. Depois, me mande o index.html atualizado com todos os <script src="js/…"> na ordem certa: js/00-core.js, js/10-ai-code-studio.js, js/15-analisador-universal.js, js/20-cirurgiao.js, js/25-gerador-eas.js, js/30-limpador.js, js/35-montar.js, js/40-perito.js, js/45-projeto-lab.js, js/50-triagem.js, js/55-zip.js, js/60-projeto.js, js/65-ferramentas.js, js/70-organizar.js, js/75-relatorios.js, js/80-comparar.js, js/85-expo-core.js, js/90-organizar-core.js, js/91-plano-core.js, js/92-ia.js, js/93-voz.js, js/94-importar.js, js/95-texto.js, js/96-processar.js, js/97-drive.js, js/98-regras.js, js/98-editor.js, js/98-docx.js, js/98-conversa.js, js/98-documentos.js, js/98-biblioteca.js, js/98-codigos.js, js/98-ferramentas.js, js/98-config.js, js/98-cacabug.js, js/98-colador.js, js/98-colecionador.js, js/98-comparador.js, js/98-comunicacoes.js, js/98-extrator.js, js/98-juntador.js, js/98-laboratorio.js, js/98-limpador.js, js/98-organizador.js, js/98-perito.js, js/98-hub.js, js/98-inicio.js, js/99-app.js.
```

## 5. Conferir no final

- [ ] Abrir o index.html na prévia: aparece a tela sem erro (▤ console vazio)?
- [ ] Cada botão abre a sua parte?
- [ ] Fechar e abrir de novo: os dados continuam?
- [ ] Nada com "replit", "REPL_", "@workspace" no código (🏗️ Preparar confere).
- [ ] 📱 PWA → deixar instalável; 📦 APK ou 🖥️ .exe.
