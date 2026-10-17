/* =========================================================================
   Assistente Jurídico — 10-ia.js
   Fala com a IA. Principal: Google Gemini (chave grátis, AIza… ou AQ.…).
   Reserva: Groq (grátis, chave gsk_…) — se o Gemini der "limite", troca sozinho.
   O modelo antigo (gemini-1.5-flash) foi desligado pelo Google: era um dos
   motivos do app antigo não responder. Aqui ele tenta os modelos atuais.
   ========================================================================= */
(function (J) {
  'use strict';
  const GEMINI = 'https://generativelanguage.googleapis.com/v1beta';
  const MODELOS_GEMINI = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest', 'gemini-2.5-flash-lite'];
  const GROQ = 'https://api.groq.com/openai/v1';

  const cfg = () => Object.assign({ provedor: 'gemini', chave: '', modelo: '', gAuth: '', groqChave: '', groqModelo: 'llama-3.3-70b-versatile', reserva: true, ollamaModelo: 'phi4-mini',
    orChave: '', orModelo: 'openrouter/auto', oaChave: '', oaModelo: 'gpt-4o-mini', clChave: '', clModelo: 'claude-haiku-4-5-20251001', cpUrl: '', cpChave: '', cpModelo: '' }, J.pref.get('ia', {}));
  // as IAs "do jeito OpenAI" (mesma conversa, muda só o endereço e a chave)
  const COMPAT = {
    openrouter: { nome: 'OpenRouter', url: 'https://openrouter.ai/api/v1', chave: 'orChave', modelo: 'orModelo' },
    openai: { nome: 'OpenAI (ChatGPT)', url: 'https://api.openai.com/v1', chave: 'oaChave', modelo: 'oaModelo' },
    groq: { nome: 'Groq', url: 'https://api.groq.com/openai/v1', chave: 'groqChave', modelo: 'groqModelo' },
    compat: { nome: 'Outra (compatível)', url: '', chave: 'cpChave', modelo: 'cpModelo' },
  };
  const OLLAMA = 'http://127.0.0.1:11434';
  const salvar = (c) => { J.pref.set('ia', c); J.emit('ia-config', c); };

  function sistemaBase(extra) {
    const p = J.pref.get('perfil', {});
    let s = 'Você é um advogado brasileiro experiente' + (p.uf ? ' de ' + p.uf : ' de Minas Gerais') + ', especialista em direito previdenciário e processo civil. ' +
      'Escreva em português do Brasil, de forma formal, técnica e direta, sem introduções desnecessárias. Não invente fatos, números de processo, datas ou jurisprudência: ' +
      'quando faltar informação, deixe um campo [ENTRE COLCHETES] para o advogado preencher. Formate com títulos (##), parágrafos e listas quando ajudar.';
    if (p.nome) s += '\nO advogado é ' + p.nome + (p.oab ? ' (OAB ' + p.oab + ')' : '') + '.';
    if (p.regras) s += '\n\nREGRAS DO ESCRITÓRIO (siga sempre):\n' + p.regras;
    const extras = (J.regras && J.regras.paraIA) ? J.regras.paraIA() : '';
    if (extras) s += '\n\n' + extras;
    if (extra) s += '\n\n' + extra;
    return s;
  }

  async function textoDeErro(r) {
    let t = ''; try { t = await r.text(); } catch {}
    let m = ''; try { const j = JSON.parse(t); m = (j.error && (j.error.message || j.error)) || j.message || ''; } catch { m = t.slice(0, 200); }
    return 'Erro ' + r.status + (m ? ': ' + m : '');
  }

  // A chave do Gemini pode ir de 3 jeitos; tentamos um por um e guardamos o que funcionou.
  async function gFetch(url, init) {
    const c = cfg();
    if (!c.chave) throw new Error('Sem chave do Gemini. Toque em 🔑 lá em cima e cole a sua chave (é grátis em aistudio.google.com/apikey).');
    const modos = ['header', 'query', 'bearer'];
    if (c.gAuth && modos.includes(c.gAuth)) { modos.splice(modos.indexOf(c.gAuth), 1); modos.unshift(c.gAuth); }
    let ultimo;
    for (const m of modos) {
      const h = Object.assign({}, init.headers || {}); let u = url;
      if (m === 'header') h['x-goog-api-key'] = c.chave; else if (m === 'query') u += (u.includes('?') ? '&' : '?') + 'key=' + encodeURIComponent(c.chave); else h.Authorization = 'Bearer ' + c.chave;
      let r;
      try { r = await fetch(u, Object.assign({}, init, { headers: h })); } catch (e) { if (e.name === 'AbortError') throw e; ultimo = new Error('Sem internet (ou a conexão caiu).'); continue; }
      if (r.ok) { if (c.gAuth !== m) { c.gAuth = m; salvar(c); } return r; }
      const txt = await r.clone().text().catch(() => '');
      ultimo = new Error(await textoDeErro(r)); ultimo.status = r.status;
      if (!(r.status === 401 || r.status === 403 || /api[ _-]?key|credential|unauthenticated/i.test(txt))) throw ultimo;
    }
    throw new Error((ultimo ? ultimo.message : 'falhou') + ' — confira a chave do Gemini.');
  }

  function corpoGemini(mensagens, sistema, opcoes) {
    const juntas = [];
    mensagens.forEach((m) => { const role = m.role === 'assistant' ? 'model' : 'user'; const ult = juntas[juntas.length - 1]; if (ult && ult.role === role) ult.parts[0].text += '\n\n' + m.content; else juntas.push({ role, parts: [{ text: m.content }] }); });
    if (juntas.length && juntas[0].role !== 'user') juntas.unshift({ role: 'user', parts: [{ text: '(continuação)' }] });
    const corpo = { contents: juntas, systemInstruction: { parts: [{ text: sistema || sistemaBase() }] }, generationConfig: { temperature: (opcoes && opcoes.temperatura) != null ? opcoes.temperatura : 0.4, maxOutputTokens: 16384 } };
    if (opcoes && opcoes.internet) corpo.tools = [{ google_search: {} }]; // 🌐 pesquisa no Google antes de responder
    return corpo;
  }

  async function gemini(mensagens, sistema, sinal, opcoes) {
    const c = cfg();
    const lista = [c.modelo].concat(MODELOS_GEMINI).filter((m, i, a) => m && a.indexOf(m) === i);
    let ultimo;
    for (const modelo of lista) {
      try {
        const r = await gFetch(GEMINI + '/models/' + encodeURIComponent(modelo) + ':generateContent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpoGemini(mensagens, sistema, opcoes)), signal: sinal });
        const d = await r.json();
        const cand = d.candidates && d.candidates[0];
        let texto = cand && cand.content && (cand.content.parts || []).map((p) => p.text || '').join('');
        const fontes = ((cand && cand.groundingMetadata && cand.groundingMetadata.groundingChunks) || []).map((g) => g.web).filter(Boolean);
        if (texto && fontes.length) texto += '\n\n**Fontes pesquisadas na internet:**\n' + fontes.slice(0, 8).map((f) => '- ' + (f.title || 'site') + ' — ' + (f.uri || '')).join('\n');
        if (!texto) throw new Error(cand && cand.finishReason === 'SAFETY' ? 'O Gemini bloqueou a resposta (filtro de segurança). Reformule o pedido.' : 'O Gemini respondeu vazio. Tente de novo.');
        if (c.modelo !== modelo) { const n = cfg(); n.modelo = modelo; salvar(n); }
        return texto;
      } catch (e) {
        if (e.name === 'AbortError') throw e;
        ultimo = e;
        if (e.status === 404 || /not found|not supported|is not found/i.test(e.message)) continue; // modelo desligado: tenta o próximo
        throw e;
      }
    }
    throw ultimo || new Error('Nenhum modelo do Gemini respondeu.');
  }

  async function groq(mensagens, sistema, sinal) {
    const c = cfg();
    if (!c.groqChave) throw new Error('Sem chave da Groq.');
    const r = await fetch(GROQ + '/chat/completions', {
      method: 'POST', signal: sinal,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + c.groqChave },
      body: JSON.stringify({ model: c.groqModelo || 'llama-3.3-70b-versatile', temperature: 0.4, messages: [{ role: 'system', content: sistema || sistemaBase() }].concat(mensagens) }),
    });
    if (!r.ok) throw new Error('Groq: ' + (await textoDeErro(r)));
    const d = await r.json();
    return (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || '';
  }

  // 🦙 Ollama: IA grátis rodando no próprio computador (sem chave, sem internet)
  async function ollama(mensagens, sistema, sinal) {
    const c = cfg();
    let r;
    try {
      r = await fetch(OLLAMA + '/v1/chat/completions', { method: 'POST', signal: sinal, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: c.ollamaModelo || 'phi4-mini', temperature: 0.4, messages: [{ role: 'system', content: sistema || sistemaBase() }].concat(mensagens) }) });
    } catch (e) { if (e.name === 'AbortError') throw e; throw new Error('O Ollama não respondeu. Ele está ligado no computador (a lhama 🦙 perto do relógio)? Pelo site/celular ele costuma bloquear: use o programa .exe.'); }
    if (!r.ok) throw new Error('Ollama: ' + (await textoDeErro(r)) + (r.status === 404 ? ' — esse modelo não está baixado. Veja ⚙️ Config → Ollama.' : ''));
    const d = await r.json();
    return (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || '';
  }
  async function ollamaInfo() {
    const v = await fetch(OLLAMA + '/api/version', { signal: AbortSignal.timeout(4000) }).then((r) => r.json());
    const t = await fetch(OLLAMA + '/api/tags').then((r) => r.json());
    return { versao: v.version, modelos: (t.models || []).map((m) => m.name) };
  }

  // ── OpenRouter / OpenAI / Groq / outra compatível ──
  async function compat(qual, mensagens, sistema, sinal) {
    const c = cfg(), d = COMPAT[qual];
    const base = (qual === 'compat' ? c.cpUrl : d.url).replace(/\/+$/, '');
    if (!base) throw new Error('Falta o endereço da IA (⚙️ Config → Outra compatível).');
    const chave = c[d.chave];
    if (!chave && qual !== 'compat') throw new Error('Sem chave da ' + d.nome + '. Cole em ⚙️ Config.');
    const h = { 'Content-Type': 'application/json' };
    if (chave) h.Authorization = 'Bearer ' + chave;
    if (qual === 'openrouter') { h['HTTP-Referer'] = location.origin.startsWith('http') ? location.origin : 'https://assistente-juridico.local'; h['X-Title'] = 'Assistente Juridico'; }
    let r;
    try { r = await fetch(base + '/chat/completions', { method: 'POST', signal: sinal, headers: h, body: JSON.stringify({ model: c[d.modelo] || undefined, temperature: 0.4, messages: [{ role: 'system', content: sistema || sistemaBase() }].concat(mensagens) }) }); }
    catch (e) { if (e.name === 'AbortError') throw e; throw new Error('Sem conexão com a ' + d.nome + '.'); }
    if (!r.ok) { const er = new Error(d.nome + ': ' + (await textoDeErro(r))); er.status = r.status; throw er; }
    const j = await r.json();
    return (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
  }
  // ── Claude (Anthropic) ──
  async function claude(mensagens, sistema, sinal) {
    const c = cfg();
    if (!c.clChave) throw new Error('Sem chave do Claude. Cole em ⚙️ Config (começa com sk-ant-).');
    const msgs = []; mensagens.forEach((m) => { const role = m.role === 'assistant' ? 'assistant' : 'user'; const u = msgs[msgs.length - 1]; if (u && u.role === role) u.content += '\n\n' + m.content; else msgs.push({ role, content: m.content }); });
    if (msgs.length && msgs[0].role !== 'user') msgs.unshift({ role: 'user', content: '(continuação)' });
    let r;
    try { r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', signal: sinal, headers: { 'Content-Type': 'application/json', 'x-api-key': c.clChave, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' }, body: JSON.stringify({ model: c.clModelo || 'claude-haiku-4-5-20251001', max_tokens: 8192, temperature: 0.4, system: sistema || sistemaBase(), messages: msgs }) }); }
    catch (e) { if (e.name === 'AbortError') throw e; throw new Error('Sem conexão com o Claude.'); }
    if (!r.ok) { const er = new Error('Claude: ' + (await textoDeErro(r))); er.status = r.status; throw er; }
    const j = await r.json();
    return (j.content || []).filter((x) => x.type === 'text').map((x) => x.text).join('');
  }
  async function modelosOpenRouter(soGratis) {
    const r = await fetch('https://openrouter.ai/api/v1/models'); const d = await r.json();
    return (d.data || []).filter((m) => !soGratis || /:free$/.test(m.id)).map((m) => ({ id: m.id, nome: m.name || m.id })).sort((a, b) => a.nome.localeCompare(b.nome));
  }

  /** Pergunta para a IA. mensagens = [{role:'user'|'assistant', content}] */
  async function gerar({ mensagens, sistema, sinal, opcoes }) {
    const c = cfg();
    if (c.provedor === 'ollama') { if (opcoes && opcoes.internet) J.aviso('🌐 A pesquisa na internet só funciona com o Gemini. O Ollama responde com o que já sabe.'); return ollama(mensagens, sistema, sinal); }
    if (c.provedor === 'claude' || COMPAT[c.provedor]) {
      if (opcoes && opcoes.internet && c.provedor !== 'openrouter') J.aviso('🌐 A pesquisa na internet só funciona com o Gemini. Esta IA responde com o que já sabe.');
      try { return c.provedor === 'claude' ? await claude(mensagens, sistema, sinal) : await compat(c.provedor, mensagens, sistema, sinal); }
      catch (e) { if (e.name !== 'AbortError' && c.reserva && c.chave) { J.aviso('Esta IA falhou (' + e.message.slice(0, 60) + '): usei o Gemini.'); return gemini(mensagens, sistema, sinal, opcoes); } throw e; }
    }
    if (!c.chave && c.groqChave) return groq(mensagens, sistema, sinal);
    try { return await gemini(mensagens, sistema, sinal, opcoes); }
    catch (e) {
      if (e.name === 'AbortError') throw e;
      const limite = e.status === 429 || /quota|rate|exhausted|limit/i.test(e.message);
      if (c.reserva && c.groqChave) { J.aviso(limite ? 'Gemini no limite: usei a Groq.' : 'Gemini falhou: usei a Groq.'); return groq(mensagens, sistema, sinal); }
      if (limite) throw new Error('O limite grátis do Gemini acabou por agora. Espere 1 minuto e tente de novo (ou cole uma chave da Groq em ⚙️ Config, que ele usa de reserva).');
      throw e;
    }
  }

  async function modelos() {
    const r = await gFetch(GEMINI + '/models?pageSize=1000', { method: 'GET' });
    const d = await r.json();
    return (d.models || []).filter((m) => (m.supportedGenerationMethods || []).includes('generateContent')).map((m) => m.name.replace(/^models\//, '')).filter((n) => /gemini/.test(n) && !/tts|image|embedding|vision|aqa/.test(n));
  }

  J.ia = {
    gerar, modelos, sistemaBase, cfg, salvar, gFetch,
    temChave: () => { const c = cfg(); if (c.provedor === 'ollama' || c.provedor === 'compat') return true; if (c.provedor === 'claude') return !!c.clChave; if (COMPAT[c.provedor]) return !!c[COMPAT[c.provedor].chave]; return !!(c.chave || c.groqChave); },
    ollamaInfo, OLLAMA, COMPAT, modelosOpenRouter,
    NOMES: { gemini: '✨ Gemini', ollama: '🦙 Ollama', openrouter: '🔀 OpenRouter', openai: '🟢 OpenAI', claude: '🟠 Claude', groq: '⚡ Groq', compat: '🔌 Compatível' },
    async testar() { const t = await gerar({ mensagens: [{ role: 'user', content: 'Responda só: OK' }], sistema: 'Responda apenas OK.' }); return t.trim(); },
  };
})(window.J);
