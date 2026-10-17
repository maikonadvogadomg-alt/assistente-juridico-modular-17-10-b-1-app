/* =========================================================================
   Assistente Jurídico — 80-config.js
   ⚙️ Chave da IA (Gemini grátis + Groq de reserva), voz, seus dados e regras
   do escritório (a IA segue sempre). Tudo fica só neste aparelho.
   ========================================================================= */
(function (J) {
  'use strict';
  let painel;
  const $ = (s) => J.$(s, painel);

  function montar(el) {
    painel = el;
    const c = J.ia.cfg(), v = J.voz.cfg(), p = J.pref.get('perfil', {});
    el.innerHTML =
      '<div class="cartao"><h2>🤖 Qual IA usar</h2><select id="cf-provedor"><option value="gemini">✨ Gemini (grátis com chave; faz 🌐 pesquisa) — recomendado</option><option value="openrouter">🔀 OpenRouter (uma chave, centenas de IAs; tem grátis)</option><option value="claude">🟠 Claude (Anthropic — pago, muito bom em texto jurídico)</option><option value="openai">🟢 OpenAI / ChatGPT (pago)</option><option value="groq">⚡ Groq (grátis, rápida)</option><option value="ollama">🦙 Ollama (no seu computador — grátis, sem internet)</option><option value="compat">🔌 Outra IA compatível (endereço próprio)</option></select>' +
      '<p class="peq mut" style="margin:6px 0 0">As chaves ficam <b>só neste aparelho</b>. Nunca mande chave para ninguém (nem para a IA).</p>' +
      '<div id="cf-outra" hidden style="margin-top:10px"></div>' +
      '<label class="peq" style="display:block;margin-top:8px"><input type="checkbox" id="cf-reserva2"> se a IA escolhida falhar, usar o Gemini (ou a Groq) de reserva</label>' +
      '<div id="cf-ollama" hidden style="margin-top:10px"><p class="peq mut">Precisa do Ollama instalado e ligado no computador (a lhama 🦙 perto do relógio). Funciona no programa .exe.</p>' +
      '<details class="peq"><summary>📱 Usar o Ollama do celular (Termux)</summary><p>No Termux, ligue o Ollama assim (deixa o app conversar com ele):</p><div class="linha"><code style="flex:1;word-break:break-all">OLLAMA_ORIGINS="*" ollama serve</code><button class="bt mini" id="cf-ol-cp">📋</button></div><p class="mut">Deixe o Termux aberto e toque em 🧪 Testar o Ollama aqui embaixo. Se o Android fechar o Termux, rode antes: <code>termux-wake-lock</code></p></details>' +
      '<label class="campo" for="cf-ol-modelo">Modelo (o "cérebro")</label><div class="linha"><select id="cf-ol-modelo" class="cresce"></select><button class="bt mini" id="cf-ol-ver">🔄 Ver os do computador</button></div>' +
      '<div class="linha" style="margin-top:8px"><button class="bt forte" id="cf-ol-testar">🧪 Testar o Ollama</button></div><div id="cf-ol-msg" class="peq" style="margin-top:6px"></div>' +
      '<details style="margin-top:8px"><summary class="peq">📚 Baixar um modelo (já explicado)</summary><div id="cf-ol-cat" class="lista" style="margin-top:6px"></div></details></div></div>' +
      '<div class="cartao" id="cf-cartao-chave"><h2>🔑 Chave da IA (Gemini)</h2>' +
      '<p class="peq mut">Gemini: grátis em <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a> (começa com AIza… ou AQ.…). A chave fica só neste aparelho. Nunca mande a chave para ninguém.</p>' +
      '<label class="campo" for="cf-chave">Chave do Gemini</label><div class="linha"><input type="password" id="cf-chave" class="cresce" autocomplete="off" spellcheck="false" placeholder="AIza… ou AQ.…"><button class="bt mini" id="cf-ver">👁</button></div>' +
      '<label class="campo" for="cf-modelo">Modelo</label><div class="linha"><select id="cf-modelo" class="cresce"><option value="">Automático (o melhor que estiver ligado)</option></select><button class="bt mini" id="cf-buscar">↻ Buscar modelos</button></div>' +
      '<details style="margin-top:10px"><summary class="peq">Reserva: Groq (grátis) — usada quando o Gemini estiver no limite</summary>' +
      '<p class="peq mut">Chave grátis em <a href="https://console.groq.com/keys" target="_blank" rel="noopener">console.groq.com/keys</a> (começa com gsk_).</p><input type="password" id="cf-groq" autocomplete="off" spellcheck="false" placeholder="gsk_…">' +
      '<label class="peq"><input type="checkbox" id="cf-reserva"> trocar sozinho para a Groq quando o Gemini falhar</label></details>' +
      '<div class="linha" style="margin-top:10px"><button class="bt forte" id="cf-salvar">💾 Salvar chave</button><button class="bt" id="cf-testar">🧪 Testar</button><span id="cf-teste" class="peq"></span></div></div>' +

      '<div class="cartao"><h2>🔊 Voz</h2><p class="peq mut">A voz do Gemini é natural (gente de verdade) e usa a mesma chave. Voz de robô do aparelho não é usada.</p>' +
      '<label class="campo" for="cf-motor">De onde vem a voz</label><select id="cf-motor"><option value="gemini">Gemini (natural — recomendado)</option><option value="navegador">Voz "Natural" do navegador (só no Edge: Francisca, Antonio…)</option></select>' +
      '<div id="cf-vz-gemini"><label class="campo" for="cf-voz">Voz do Gemini</label><select id="cf-voz">' + J.voz.VOZES.map((x) => '<option value="' + x.id + '">' + x.nome + '</option>').join('') + '</select></div>' +
      '<div id="cf-vz-nav" hidden><label class="campo" for="cf-voz-nav">Voz natural do navegador</label><select id="cf-voz-nav"></select><p class="peq mut" id="cf-sem-nat"></p></div>' +
      '<div class="linha" style="margin-top:10px"><button class="bt" id="cf-ouvir">▶ Ouvir um exemplo</button></div></div>' +

      '<div class="cartao"><h2>☁️ Google Drive (direto)</h2>' +
      '<p class="peq mut">Com isto, todo botão <b>📤 Mandar ao Drive</b> (Word, backup, regras…) manda <b>direto</b> para a pasta <b>"Assistente Jurídico"</b> do seu Drive — no celular e no computador. O app só vê os arquivos que ele mesmo criou: não mexe no resto do seu Drive.</p>' +
      '<label class="campo" for="cf-dr-id">ID do cliente do Google (Client ID)</label><input type="text" id="cf-dr-id" spellcheck="false" autocomplete="off" placeholder="1234567890-abc….apps.googleusercontent.com">' +
      '<label class="peq" style="display:block;margin-top:6px"><input type="checkbox" id="cf-dr-usar"> usar o Drive direto nos botões 📤 (desmarcado = jeito antigo, pelo "Compartilhar")</label>' +
      '<div class="linha" style="margin-top:8px"><button class="bt forte" id="cf-dr-salvar">💾 Salvar</button><button class="bt" id="cf-dr-testar">🔌 Conectar e testar</button><span id="cf-dr-msg" class="peq"></span></div>' +
      '<details style="margin-top:10px"><summary class="peq"><b>Como conseguir o ID do cliente (uma vez só, grátis)</b></summary><ol class="peq">' +
      '<li>No computador, entre em <b>console.cloud.google.com</b> com a sua conta Google.</li>' +
      '<li>Lá em cima: <b>Selecionar projeto → Novo projeto</b> → nome "Assistente Juridico" → <b>Criar</b>.</li>' +
      '<li>Menu ☰ → <b>APIs e serviços → Biblioteca</b> → procure <b>Google Drive API</b> → <b>Ativar</b>.</li>' +
      '<li>Menu ☰ → <b>APIs e serviços → Tela de permissão OAuth</b> (ou "Google Auth Platform") → tipo <b>Externo</b> → preencha o nome do app e o seu e-mail → em <b>Usuários de teste</b>, adicione <b>o seu próprio e-mail</b>.</li>' +
      '<li>Menu ☰ → <b>APIs e serviços → Credenciais → Criar credenciais → ID do cliente OAuth</b> → tipo <b>Aplicativo da Web</b>.</li>' +
      '<li>Em <b>Origens JavaScript autorizadas</b>, clique em <b>Adicionar URI</b> e cole: <code id="cf-dr-origem"></code> <button class="bt mini" id="cf-dr-cp">📋</button><br>Se você usa o app em mais de um lugar, adicione todos: o programa .exe é <code>http://127.0.0.1:7720</code> e <code>http://localhost:7720</code>; o APK é <code>https://localhost</code>; o site é o endereço dele (ex.: <code>https://seunome.github.io</code>).</li>' +
      '<li><b>Criar</b> → copie o <b>ID do cliente</b> (termina em <code>.apps.googleusercontent.com</code>) e cole aqui em cima → 💾 Salvar → 🔌 Conectar e testar.</li>' +
      '<li>Na 1ª vez o Google mostra "app não verificado": toque em <b>Avançado → Acessar (não seguro)</b>. É o seu próprio app, na sua conta.</li>' +
      '</ol><p class="peq mut">O ID do cliente não é senha (pode ficar no app). Ele só funciona nos endereços que você autorizou. Não funciona abrindo o arquivo direto do computador (file://).</p></details></div>' +

      '<div class="cartao"><h2>👤 Seus dados (vão nas peças)</h2>' +
      '<div class="linha"><div class="cresce"><label class="campo" for="cf-nome">Nome do advogado</label><input type="text" id="cf-nome"></div><div style="width:130px"><label class="campo" for="cf-oab">OAB nº</label><input type="text" id="cf-oab"></div><div style="width:80px"><label class="campo" for="cf-uf">UF</label><input type="text" id="cf-uf" maxlength="2"></div></div>' +
      '<label class="campo" for="cf-regras">Regras do escritório (a IA segue sempre)</label><textarea id="cf-regras" style="min-height:110px" placeholder="Ex.: sempre pedir justiça gratuita; usar &quot;Excelentíssimo&quot; por extenso; citar a Lei 8.213/91 pelo número do artigo…"></textarea>' +
      '<button class="bt forte" id="cf-perfil" style="margin-top:8px">💾 Salvar meus dados</button></div>' +

      '<div class="cartao"><h2>📲 Instalar e levar para outro aparelho</h2><ul class="peq">' +
      '<li><b>Celular (Chrome):</b> abra o endereço do site → menu ⋮ → <b>Instalar app</b>.</li>' +
      '<li><b>APK:</b> no Mini SK, importe o zip deste app → 📦 APK.</li>' +
      '<li><b>Passar tudo para outro aparelho:</b> 📁 Documentos → 💾 Backup de tudo → no outro aparelho, 📥 Restaurar.</li></ul>' +
      '<p class="peq mut">Versão ' + J.versao + '</p><button class="bt mini perigo" id="cf-zerar">🗑 Apagar tudo deste aparelho</button></div>';

    // ── qual IA ──
    const CAT = [['phi4-mini', '2,5 GB', 'Da Microsoft. Fala português bem. O melhor para começar.'], ['qwen2.5:3b', '1,9 GB', 'Muito bom em português e rápido.'], ['gemma3:4b', '3,3 GB', 'Do Google. Bom em português; precisa de 8 GB de memória.'], ['gemma3:1b', '0,8 GB', 'Bem leve, para PC fraco. Respostas simples.']];
    $('#cf-provedor').value = c.provedor || 'gemini';
    // ── as outras IAs: um quadrinho com chave + modelo para a escolhida ──
    const OUTRAS = {
      openrouter: { chave: 'orChave', modelo: 'orModelo', ph: 'sk-or-…', link: 'https://openrouter.ai/keys', site: 'openrouter.ai/keys', dica: 'Uma chave só dá acesso a centenas de IAs (Claude, GPT, Llama, DeepSeek…). Os modelos que terminam em <b>:free</b> são grátis. "openrouter/auto" escolhe sozinho.', lista: true },
      claude: { chave: 'clChave', modelo: 'clModelo', ph: 'sk-ant-…', link: 'https://console.anthropic.com/settings/keys', site: 'console.anthropic.com', dica: 'Pago (precisa pôr crédito). Modelos: claude-haiku-4-5-20251001 (rápido e barato), claude-sonnet-4-5 (mais caprichado).' },
      openai: { chave: 'oaChave', modelo: 'oaModelo', ph: 'sk-…', link: 'https://platform.openai.com/api-keys', site: 'platform.openai.com/api-keys', dica: 'Pago. Modelo bom e barato: gpt-4o-mini.' },
      groq: { chave: 'groqChave', modelo: 'groqModelo', ph: 'gsk_…', link: 'https://console.groq.com/keys', site: 'console.groq.com/keys', dica: 'Grátis e muito rápida. Modelo: llama-3.3-70b-versatile.' },
      compat: { chave: 'cpChave', modelo: 'cpModelo', ph: '(se precisar)', dica: 'Qualquer IA que fale "do jeito OpenAI" (LM Studio, DeepSeek, Mistral, Together…). Cole o endereço que termina em <b>/v1</b>.', url: true },
    };
    function pintarOutra() {
      const prov = $('#cf-provedor').value, o = OUTRAS[prov], box = $('#cf-outra'), n = J.ia.cfg();
      box.hidden = !o; if (!o) return;
      box.innerHTML = '<p class="peq mut">' + o.dica + (o.link ? ' Chave em <a href="' + o.link + '" target="_blank" rel="noopener">' + o.site + '</a>.' : '') + '</p>' +
        (o.url ? '<label class="campo" for="cf-o-url">Endereço (termina em /v1)</label><input type="text" id="cf-o-url" spellcheck="false" placeholder="http://127.0.0.1:1234/v1" value="' + J.esc(n.cpUrl || '') + '">' : '') +
        '<label class="campo" for="cf-o-chave">Chave</label><div class="linha"><input type="password" id="cf-o-chave" class="cresce" autocomplete="off" spellcheck="false" placeholder="' + o.ph + '" value="' + J.esc(n[o.chave] || '') + '"><button class="bt mini" id="cf-o-ver">👁</button></div>' +
        '<label class="campo" for="cf-o-modelo">Modelo</label><div class="linha"><input type="text" id="cf-o-modelo" class="cresce" spellcheck="false" list="cf-o-lista" value="' + J.esc(n[o.modelo] || '') + '">' + (o.lista ? '<button class="bt mini" id="cf-o-buscar">📚 Ver os grátis</button>' : '') + '</div><datalist id="cf-o-lista"></datalist>' +
        '<div class="linha" style="margin-top:8px"><button class="bt forte" id="cf-o-salvar">💾 Salvar</button><button class="bt" id="cf-o-testar">🧪 Testar</button><span id="cf-o-msg" class="peq"></span></div>';
      const salvarO = () => { const c2 = J.ia.cfg(); c2[o.chave] = $('#cf-o-chave').value.trim(); c2[o.modelo] = $('#cf-o-modelo').value.trim(); if (o.url) c2.cpUrl = $('#cf-o-url').value.trim(); J.ia.salvar(c2); };
      $('#cf-o-ver').onclick = () => { const i = $('#cf-o-chave'); i.type = i.type === 'password' ? 'text' : 'password'; };
      $('#cf-o-salvar').onclick = () => { salvarO(); J.aviso('💾 Salvo.', 'ok'); };
      $('#cf-o-testar').onclick = async () => { salvarO(); const m = $('#cf-o-msg'); m.textContent = 'Testando…'; try { const r = await J.ia.testar(); m.textContent = '✅ Respondeu: ' + r.slice(0, 60); } catch (e) { m.textContent = '❌ ' + e.message; } };
      if (o.lista) $('#cf-o-buscar').onclick = async () => { const m = $('#cf-o-msg'); m.textContent = 'Buscando…'; try { const l = await J.ia.modelosOpenRouter(true); $('#cf-o-lista').innerHTML = l.map((x) => '<option value="' + J.esc(x.id) + '">' + J.esc(x.nome) + '</option>').join(''); m.textContent = '✅ ' + l.length + ' modelos grátis. Toque no campo "Modelo" para escolher.'; $('#cf-o-modelo').focus(); } catch (e) { m.textContent = '❌ ' + e.message; } };
    }
    $('#cf-reserva2').checked = c.reserva !== false;
    $('#cf-reserva2').onchange = (e) => { const n = J.ia.cfg(); n.reserva = e.target.checked; J.ia.salvar(n); };
    const pintarProv = () => { const ol = $('#cf-provedor').value === 'ollama'; $('#cf-ollama').hidden = !ol; pintarOutra(); };
    $('#cf-provedor').onchange = () => { const n = J.ia.cfg(); n.provedor = $('#cf-provedor').value; J.ia.salvar(n); pintarProv(); J.aviso('Agora a IA é: ' + (J.ia.NOMES[n.provedor] || n.provedor), 'ok'); };
    pintarProv();
    // ── Drive ──
    const dr = J.drive.cfg();
    $('#cf-dr-id').value = dr.clientId || ''; $('#cf-dr-usar').checked = dr.usar !== false;
    $('#cf-dr-origem').textContent = /^https?:/.test(location.protocol) ? location.origin : 'http://127.0.0.1:7720';
    $('#cf-dr-cp').onclick = () => J.copiar($('#cf-dr-origem').textContent);
    const salvarDr = () => { const d = J.drive.cfg(); const novo = $('#cf-dr-id').value.trim(); if (novo !== d.clientId) d.pastaId = ''; d.clientId = novo; d.usar = $('#cf-dr-usar').checked; J.drive.salvar(d); };
    $('#cf-dr-salvar').onclick = () => { salvarDr(); J.aviso('💾 Drive salvo.', 'ok'); };
    $('#cf-dr-usar').onchange = salvarDr;
    $('#cf-dr-testar').onclick = async () => { salvarDr(); const m = $('#cf-dr-msg'); m.textContent = 'Abrindo o Google…'; try { await J.drive.conectar(); const l = await J.drive.listar(); m.textContent = '✅ Conectado. Pasta "' + J.drive.PASTA + '" com ' + l.length + ' arquivo(s).'; } catch (e) { m.textContent = '❌ ' + e.message; } };
    $('#cf-ol-cp').onclick = () => J.copiar('OLLAMA_ORIGINS="*" ollama serve');
    const selOl = $('#cf-ol-modelo');
    const preencherOl = (lista) => { const atual = J.ia.cfg().ollamaModelo || 'phi4-mini'; const nomes = Array.from(new Set([atual].concat(lista || []))); selOl.innerHTML = nomes.map((m) => '<option>' + J.esc(m) + '</option>').join(''); selOl.value = atual; };
    preencherOl([]);
    selOl.onchange = () => { const n = J.ia.cfg(); n.ollamaModelo = selOl.value; J.ia.salvar(n); };
    const olMsg = (t) => ($('#cf-ol-msg').innerHTML = t);
    $('#cf-ol-ver').onclick = async () => { try { const i = await J.ia.ollamaInfo(); preencherOl(i.modelos); olMsg('✅ Ollama ligado. ' + i.modelos.length + ' modelo(s) no computador.'); pintarCat(i.modelos); } catch { olMsg('❌ O Ollama está desligado. Abra <b>Ollama</b> no menu Iniciar do Windows e tente de novo.'); } };
    $('#cf-ol-testar').onclick = async () => {
      let i; try { i = await J.ia.ollamaInfo(); } catch { return olMsg('❌ 1/2 · O Ollama está desligado (ou não instalado). Abra <b>Ollama</b> no menu Iniciar (a lhama 🦙 aparece perto do relógio) e teste de novo.'); }
      preencherOl(i.modelos); pintarCat(i.modelos);
      if (!i.modelos.length) return olMsg('✅ Ollama ligado, mas sem nenhum modelo. Abra 📚 Baixar um modelo, logo abaixo.');
      let m = J.ia.cfg().ollamaModelo; if (!i.modelos.some((x) => x === m || x === m + ':latest')) { m = i.modelos.find((x) => /phi4|qwen|gemma/.test(x)) || i.modelos[0]; const n = J.ia.cfg(); n.ollamaModelo = m; J.ia.salvar(n); preencherOl(i.modelos); }
      const t0 = Date.now(); const rel = setInterval(() => olMsg('✅ 1/2 · Ollama ligado. ⏳ 2/2 · Perguntando ao ' + J.esc(m) + '… ' + Math.round((Date.now() - t0) / 1000) + ' s (a 1ª vez demora: ele carrega na memória)'), 1000);
      try { const n0 = J.ia.cfg(); const prov = n0.provedor; n0.provedor = 'ollama'; J.pref.set('ia', n0); const r = await J.ia.gerar({ mensagens: [{ role: 'user', content: 'Em uma frase curta, em português: você está funcionando?' }], sistema: 'Responda em português do Brasil, curto.' }); n0.provedor = prov; J.pref.set('ia', n0); clearInterval(rel); olMsg('✅ Respondeu em ' + Math.round((Date.now() - t0) / 1000) + ' s: <i>"' + J.esc(r.trim().slice(0, 160)) + '"</i>' + (prov !== 'ollama' ? '<br>Para usar sempre: em "Qual IA usar", escolha <b>Ollama</b>.' : '')); }
      catch (e) { clearInterval(rel); const n0 = J.ia.cfg(); olMsg('❌ ' + J.esc(e.message)); }
    };
    function pintarCat(tem) {
      tem = tem || [];
      $('#cf-ol-cat').innerHTML = CAT.map(([n, t, d]) => { const ok = tem.some((x) => x === n || x === n + ':latest'); return '<div class="item"><div class="info"><b>' + n + '</b><small>' + t + ' · ' + d + '</small></div><div class="bts">' + (ok ? '<button class="bt mini forte" data-ol-usar="' + n + '">Usar</button>' : '<button class="bt mini" data-ol-baixar="' + n + '">⬇ Baixar</button>') + '</div></div>'; }).join('');
    }
    pintarCat([]);
    $('#cf-ol-cat').onclick = async (e) => {
      const u = e.target.closest('[data-ol-usar]'); if (u) { const n = J.ia.cfg(); n.ollamaModelo = u.dataset.olUsar; J.ia.salvar(n); preencherOl([]); J.aviso('Agora o Ollama usa ' + u.dataset.olUsar + '.', 'ok'); return; }
      const b = e.target.closest('[data-ol-baixar]'); if (!b) return; const m = b.dataset.olBaixar; b.disabled = true;
      try {
        const r = await fetch(J.ia.OLLAMA + '/api/pull', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: m, stream: true }) });
        const leitor = r.body.getReader(); const dec = new TextDecoder(); let resto = '';
        for (;;) { const { value, done } = await leitor.read(); if (done) break; resto += dec.decode(value, { stream: true }); const ls = resto.split('\n'); resto = ls.pop(); for (const l of ls) { let j = {}; try { j = JSON.parse(l); } catch { continue; } if (j.error) throw new Error(j.error); b.textContent = j.total ? Math.round((j.completed || 0) * 100 / j.total) + '%' : '…'; } }
        const n = J.ia.cfg(); n.ollamaModelo = m; J.ia.salvar(n); J.aviso('✅ ' + m + ' baixado e escolhido.', 'ok'); $('#cf-ol-ver').click();
      } catch (er) { J.aviso('Não baixou: ' + er.message + ' (o Ollama está ligado? tem espaço no disco?)', 'erro'); b.disabled = false; b.textContent = '⬇ Baixar'; }
    };
    $('#cf-chave').value = c.chave; $('#cf-groq').value = c.groqChave; $('#cf-reserva').checked = c.reserva !== false;
    if (c.modelo) $('#cf-modelo').innerHTML += '<option value="' + J.esc(c.modelo) + '">' + J.esc(c.modelo) + '</option>';
    $('#cf-modelo').value = c.modelo || '';
    $('#cf-ver').onclick = () => { const i = $('#cf-chave'); i.type = i.type === 'password' ? 'text' : 'password'; };
    const guardarChave = () => { const n = J.ia.cfg(); const nova = $('#cf-chave').value.trim(); if (nova !== n.chave) n.gAuth = ''; n.chave = nova; n.groqChave = $('#cf-groq').value.trim(); n.reserva = $('#cf-reserva').checked; n.modelo = $('#cf-modelo').value; J.ia.salvar(n); };
    $('#cf-salvar').onclick = () => { guardarChave(); J.aviso('💾 Chave salva neste aparelho.', 'ok'); };
    $('#cf-modelo').onchange = guardarChave;
    $('#cf-testar').onclick = async () => { guardarChave(); $('#cf-teste').innerHTML = '<span class="carregando"></span>'; try { const r = await J.ia.testar(); $('#cf-teste').textContent = '✅ Funcionando (' + (J.ia.cfg().modelo || 'ok') + '): ' + r.slice(0, 20); } catch (e) { $('#cf-teste').textContent = '❌ ' + e.message; } };
    $('#cf-buscar').onclick = async () => {
      guardarChave();
      try { const ms = await J.ia.modelos(); const atual = $('#cf-modelo').value; $('#cf-modelo').innerHTML = '<option value="">Automático (o melhor que estiver ligado)</option>' + ms.map((m) => '<option>' + J.esc(m) + '</option>').join(''); $('#cf-modelo').value = ms.includes(atual) ? atual : ''; J.aviso(ms.length + ' modelos encontrados.', 'ok'); }
      catch (e) { J.aviso(e.message, 'erro'); }
    };
    // voz
    $('#cf-motor').value = v.motor; $('#cf-voz').value = v.voz;
    const pintarVoz = () => {
      const nav = $('#cf-motor').value === 'navegador';
      $('#cf-vz-gemini').hidden = nav; $('#cf-vz-nav').hidden = !nav;
      const nat = J.voz.vozesNaturais();
      $('#cf-voz-nav').innerHTML = nat.map((x) => '<option>' + J.esc(x.name) + '</option>').join('');
      $('#cf-voz-nav').value = J.voz.cfg().vozNavegador || (nat[0] && nat[0].name) || '';
      $('#cf-sem-nat').textContent = nat.length ? '' : 'Este navegador não tem voz natural em português. Use a do Gemini.';
    };
    const guardarVoz = () => { J.pref.set('voz', { motor: $('#cf-motor').value, voz: $('#cf-voz').value, vozNavegador: $('#cf-voz-nav').value }); pintarVoz(); };
    ['#cf-motor', '#cf-voz', '#cf-voz-nav'].forEach((s) => ($(s).onchange = guardarVoz));
    J.on('vozes-navegador', pintarVoz); pintarVoz();
    $('#cf-ouvir').onclick = () => { if (J.voz.falando) return J.voz.parar(); J.voz.falar('Olá! Esta é a voz do seu assistente jurídico. Posso ler resumos, decisões e as respostas da conversa para você.'); };
    J.on('voz', (f) => { $('#cf-ouvir').textContent = f ? '⏹ Parar' : '▶ Ouvir um exemplo'; });
    // perfil
    $('#cf-nome').value = p.nome || ''; $('#cf-oab').value = p.oab || ''; $('#cf-uf').value = p.uf || ''; $('#cf-regras').value = p.regras || '';
    $('#cf-perfil').onclick = () => { J.pref.set('perfil', { nome: $('#cf-nome').value.trim(), oab: $('#cf-oab').value.trim(), uf: $('#cf-uf').value.trim().toUpperCase(), regras: $('#cf-regras').value.trim() }); J.aviso('💾 Seus dados foram salvos.', 'ok'); };
    $('#cf-zerar').onclick = async () => {
      if (!confirm('Apagar TODOS os documentos, modelos, ementas, conversas e chaves deste aparelho? Faça um backup antes.')) return;
      for (const l of J.db.LOJAS) await J.db.limpar(l);
      Object.keys(localStorage).filter((k) => k.startsWith('jur:')).forEach((k) => localStorage.removeItem(k));
      location.reload();
    };
  }
  J.registrar({ aba: 'config', montar });
})(window.J);
