/* =========================================================================
   Assistente Jurídico — 60-codigos.js
   🧪 MEUS CÓDIGOS: playground que GUARDA. Para os seus códigos jurídicos
   (calculadoras, modelos em HTML, ferramentas antigas…).
   Cole ou importe (vários de uma vez, inclusive .zip), rode ao vivo
   (celular ou largo), veja/mexa no código, copie tudo, baixe, abra em tela
   própria. Fica no aparelho e entra no 💾 Backup de tudo (📁 Documentos).
   ========================================================================= */
(function (J) {
  'use strict';
  let painel, aberto = null, filtro = '', lista = [], timer = null, cel = false;
  const $ = (s) => J.$(s, painel);
  const humano = (n) => n < 1024 ? n + ' letras' : (n / 1024).toFixed(1).replace('.', ',') + ' KB';
  const tipoDe = (nome, cod) => /\.html?$/i.test(nome) || /<(!doctype|html|body|head|div|script|style)\b/i.test(cod) ? 'html' : /\.(m?js|ts|tsx|jsx)$/i.test(nome) ? 'js' : /\.css$/i.test(nome) ? 'css' : /\.md$/i.test(nome) ? 'md' : 'texto';
  const ICONE = { html: '🌐', js: '⚙️', css: '🎨', md: '📑', texto: '📄' };

  function montar(el) {
    painel = el;
    el.innerHTML =
      '<div id="cg-lista-tela">' +
      '<div class="cartao"><h2>🧪 Meus Códigos</h2><p class="peq mut">Guarde aqui os seus códigos (calculadoras, ferramentas, modelos em HTML). Rodam aqui dentro, no celular e no computador. Entram no 💾 Backup de tudo.</p>' +
      '<label class="campo" for="cg-nome">Nome</label><input type="text" id="cg-nome" placeholder="Ex.: Calculadora de tempo de contribuição">' +
      '<label class="campo" for="cg-cod">Código (cole aqui)</label><textarea id="cg-cod" class="mono" style="min-height:120px" spellcheck="false" autocapitalize="off" placeholder="Cole o código inteiro (HTML, JS, texto…)"></textarea>' +
      '<div class="linha" style="margin-top:8px"><button class="bt forte" id="cg-guardar">💾 Guardar</button><button class="bt" id="cg-importar">📂 Importar arquivos (vários ou .zip)</button><input type="file" id="cg-arq" multiple hidden accept=".html,.htm,.js,.mjs,.ts,.tsx,.jsx,.css,.md,.txt,.json,.zip,text/*"></div></div>' +
      '<div class="cartao"><div class="linha"><h2 class="cresce" style="margin:0">📚 Guardados <span class="peq mut" id="cg-conta"></span></h2></div>' +
      '<input type="text" id="cg-busca" placeholder="🔍 Procurar pelo nome ou por algo DENTRO do código…" style="margin:8px 0">' +
      '<div id="cg-itens"></div></div></div>' +
      '<div id="cg-visor" class="cg-visor" hidden>' +
      '<div class="cg-topo"><button class="bt mini" id="cg-voltar">← Voltar</button><b id="cg-titulo" class="cresce"></b><button class="bt mini" id="cg-cel" title="Tamanho celular / largo">📱</button><button class="bt mini" id="cg-fora" title="Abrir em tela própria">↗</button></div>' +
      '<div class="cg-bts"><button class="bt mini forte" id="cg-rodar">▶ Rodar</button><button class="bt mini" id="cg-ver-cod">📝 Código</button><button class="bt mini" id="cg-copiar">📋 Copiar</button><button class="bt mini" id="cg-baixar">⬇ Baixar</button><button class="bt mini" id="cg-salvar" disabled>💾 Salvar</button><button class="bt mini" id="cg-renomear">✏️</button><button class="bt mini perigo" id="cg-apagar">🗑</button></div>' +
      '<div class="cg-corpo"><div id="cg-palco" class="cg-palco"><iframe id="cg-frame" title="Código rodando" sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-downloads" allow="clipboard-read; clipboard-write; microphone"></iframe></div>' +
      '<textarea id="cg-texto" class="mono cg-texto" spellcheck="false" autocapitalize="off" hidden></textarea></div></div>';

    $('#cg-guardar').onclick = async () => {
      const cod = $('#cg-cod').value; if (!cod.trim()) return J.aviso('Cole um código primeiro.');
      const nome = $('#cg-nome').value.trim() || ((cod.match(/<title[^>]*>([^<]{1,60})/i) || [])[1] || 'Código de ' + J.data()).trim();
      await J.db.guardar('codigos', { nome, codigo: cod, tipo: tipoDe(nome, cod), criado: Date.now() });
      $('#cg-cod').value = ''; $('#cg-nome').value = ''; await carregar(); J.aviso('💾 Guardado: ' + nome, 'ok');
    };
    $('#cg-importar').onclick = () => $('#cg-arq').click();
    $('#cg-arq').onchange = async (e) => {
      const fs = [...e.target.files]; e.target.value = ''; let n = 0;
      for (const f of fs) {
        try {
          if (/\.zip$/i.test(f.name) && window.JSZip) {
            const z = await JSZip.loadAsync(f); const itens = [];
            z.forEach((p, en) => { if (!en.dir && /\.(html?|m?js|tsx?|jsx|css|md|txt|json)$/i.test(p) && !/node_modules\//.test(p)) itens.push([p, en]); });
            for (const [p, en] of itens) { const cod = await en.async('string'); await J.db.guardar('codigos', { nome: f.name.replace(/\.zip$/i, '') + ' / ' + p, codigo: cod, tipo: tipoDe(p, cod), criado: Date.now() }); n++; }
          } else { const cod = await f.text(); await J.db.guardar('codigos', { nome: f.name, codigo: cod, tipo: tipoDe(f.name, cod), criado: f.lastModified || Date.now() }); n++; }
        } catch (x) { J.aviso('Não consegui ler ' + f.name, 'erro'); }
      }
      await carregar(); J.aviso(n + ' código(s) importado(s).', 'ok');
    };
    $('#cg-busca').addEventListener('input', (e) => { filtro = e.target.value.trim().toLowerCase(); pintar(); });
    $('#cg-itens').addEventListener('click', (e) => {
      const b = e.target.closest('[data-c]'); if (!b) return;
      const c = lista.find((x) => x.id === b.dataset.id); if (!c) return;
      if (b.dataset.c === 'abrir') abrir(c, 'rodar');
      if (b.dataset.c === 'codigo') abrir(c, 'cod');
      if (b.dataset.c === 'copiar') J.copiar(c.codigo);
    });
    $('#cg-voltar').onclick = fechar;
    $('#cg-rodar').onclick = () => { modo('rodar'); rodar(); };
    $('#cg-ver-cod').onclick = () => modo('cod');
    $('#cg-copiar').onclick = () => J.copiar($('#cg-texto').value);
    $('#cg-baixar').onclick = () => { const n = /\.[a-z0-9]{1,5}$/i.test(aberto.nome) ? aberto.nome.split('/').pop() : J.nomeArquivo(aberto.nome) + (aberto.tipo === 'html' ? '.html' : '.txt'); J.baixar(n, new Blob([$('#cg-texto').value], { type: 'text/plain;charset=utf-8' })); };
    $('#cg-cel').onclick = () => { cel = !cel; $('#cg-palco').classList.toggle('cel', cel); $('#cg-cel').textContent = cel ? '💻' : '📱'; };
    $('#cg-fora').onclick = () => { const u = URL.createObjectURL(new Blob([$('#cg-texto').value], { type: aberto.tipo === 'html' ? 'text/html;charset=utf-8' : 'text/plain;charset=utf-8' })); window.open(u, '_blank'); };
    $('#cg-texto').addEventListener('input', () => { $('#cg-salvar').disabled = false; clearTimeout(timer); timer = setTimeout(() => { if (!$('#cg-palco').hidden) rodar(); }, 700); });
    $('#cg-salvar').onclick = async () => { aberto.codigo = $('#cg-texto').value; aberto.tipo = tipoDe(aberto.nome, aberto.codigo); await J.db.guardar('codigos', aberto); $('#cg-salvar').disabled = true; await carregar(); J.aviso('💾 Mudanças salvas.', 'ok'); };
    $('#cg-renomear').onclick = async () => { const n = prompt('Novo nome:', aberto.nome); if (!n) return; aberto.nome = n.trim(); await J.db.guardar('codigos', aberto); $('#cg-titulo').textContent = aberto.nome; await carregar(); };
    $('#cg-apagar').onclick = async () => { if (!confirm('Apagar "' + aberto.nome + '"?\n\n(Dica: faça o 💾 Backup de tudo antes, em 📁 Documentos.)')) return; await J.db.apagar('codigos', aberto.id); $('#cg-salvar').disabled = true; fechar(); await carregar(); };
    carregar();
  }
  async function carregar() { lista = (await J.db.todos('codigos')).sort((a, b) => (b.atualizado || 0) - (a.atualizado || 0)); pintar(); }
  function pintar() {
    $('#cg-conta').textContent = '(' + lista.length + ' · ' + humano(lista.reduce((s, c) => s + c.codigo.length, 0)) + ')';
    const v = lista.filter((c) => !filtro || c.nome.toLowerCase().includes(filtro) || c.codigo.toLowerCase().includes(filtro));
    $('#cg-itens').innerHTML = v.length ? v.map((c) => '<div class="cg-item"><span class="cg-ic">' + (ICONE[c.tipo] || '📄') + '</span><div class="cresce"><button class="cg-nome" data-c="abrir" data-id="' + c.id + '">' + J.esc(c.nome) + '</button><div class="peq mut">' + humano(c.codigo.length) + ' · ' + new Date(c.atualizado || c.criado).toLocaleDateString('pt-BR') + (filtro && !c.nome.toLowerCase().includes(filtro) ? ' · achado dentro do código' : '') + '</div></div>' +
      (c.tipo === 'html' || c.tipo === 'js' ? '<button class="bt mini" data-c="abrir" data-id="' + c.id + '" title="Rodar">▶</button>' : '') + '<button class="bt mini" data-c="codigo" data-id="' + c.id + '" title="Ver o código">📝</button><button class="bt mini" data-c="copiar" data-id="' + c.id + '" title="Copiar tudo">📋</button></div>').join('')
      : '<p class="peq mut">' + (filtro ? 'Nada achado.' : 'Nenhum código ainda. Cole o primeiro lá em cima ou 📂 importe.') + '</p>';
  }
  function abrir(c, m) {
    aberto = c;
    $('#cg-lista-tela').hidden = true; $('#cg-visor').hidden = false;
    $('#cg-titulo').textContent = c.nome; $('#cg-texto').value = c.codigo; $('#cg-salvar').disabled = true;
    const roda = c.tipo === 'html' || c.tipo === 'js';
    $('#cg-rodar').hidden = !roda;
    modo(roda ? m : 'cod'); if (roda && m === 'rodar') rodar();
  }
  function modo(m) { $('#cg-palco').hidden = m !== 'rodar'; $('#cg-texto').hidden = m !== 'cod'; }
  function rodar() {
    const cod = $('#cg-texto').value;
    $('#cg-frame').srcdoc = aberto.tipo === 'js'
      ? '<!doctype html><meta charset="utf-8"><body><pre id="s" style="font:14px monospace;white-space:pre-wrap"></pre><script>const s=document.getElementById("s");console.log=(...a)=>{s.textContent+=a.map(x=>typeof x==="object"?JSON.stringify(x,null,1):x).join(" ")+"\\n"};window.onerror=(m)=>{s.textContent+="❌ "+m+"\\n"};<\/script><script>' + cod.replace(/<\/script/gi, '<\\/script') + '<\/script>'
      : cod;
  }
  function fechar() {
    if (!$('#cg-salvar').disabled && !confirm('Você mudou o código e não salvou. Sair mesmo assim?')) return;
    aberto = null; $('#cg-frame').srcdoc = ''; $('#cg-visor').hidden = true; $('#cg-lista-tela').hidden = false;
  }
  J.registrar({ aba: 'codigos', montar });
})(window.J);
