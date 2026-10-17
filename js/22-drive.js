/* =========================================================================
   Assistente Jurídico — 22-drive.js
   ☁️ GOOGLE DRIVE DIRETO: manda e busca arquivos na SUA conta do Drive,
   numa pasta "Assistente Jurídico", sem precisar do app do Drive.
   Precisa de um "ID do cliente" (Client ID) do Google — é de graça, faz uma
   vez só (o passo a passo está em ⚙️ Config → ☁️ Google Drive).
   O app só enxerga os arquivos que ELE MESMO criou (permissão drive.file):
   não mexe no resto do seu Drive.
   Sem o ID configurado, continua como antes (o "Compartilhar" do celular).
   ========================================================================= */
(function (J) {
  'use strict';
  const ESCOPO = 'https://www.googleapis.com/auth/drive.file';
  const PASTA = 'Assistente Jurídico';
  let token = null, validade = 0, cliente = null;

  const cfg = () => Object.assign({ clientId: '', pastaId: '', usar: true }, J.pref.get('drive', {}));
  const salvar = (c) => J.pref.set('drive', c);
  const configurado = () => !!cfg().clientId && /^https?:$/.test(location.protocol);

  async function conectar() {
    const c = cfg();
    if (!c.clientId) throw new Error('Falta o ID do cliente do Google (⚙️ Config → ☁️ Google Drive).');
    if (!/^https?:$/.test(location.protocol)) throw new Error('O Drive direto não funciona com o arquivo aberto do computador (file://). Use o site ou o programa .exe.');
    if (token && Date.now() < validade - 60000) return token;
    await J.carregarScript('https://accounts.google.com/gsi/client');
    return new Promise((ok, erro) => {
      try {
        cliente = google.accounts.oauth2.initTokenClient({
          client_id: c.clientId, scope: ESCOPO,
          callback: (r) => { if (r.error) return erro(new Error('O Google não deixou: ' + r.error)); token = r.access_token; validade = Date.now() + (Number(r.expires_in) || 3600) * 1000; J.emit('drive', { ligado: true }); ok(token); },
          error_callback: (e) => erro(new Error(e && e.type === 'popup_closed' ? 'A janela do Google foi fechada.' : 'Não conectou (' + (e && (e.message || e.type)) + '). Confira se este endereço está em "Origens JavaScript autorizadas": ' + location.origin)),
        });
        cliente.requestAccessToken({ prompt: token ? '' : 'consent' });
      } catch (e) { erro(e); }
    });
  }
  async function api(url, init) {
    const t = await conectar();
    const r = await fetch(url, Object.assign({}, init, { headers: Object.assign({ Authorization: 'Bearer ' + t }, (init && init.headers) || {}) }));
    if (r.status === 401) { token = null; throw new Error('A conexão com o Drive venceu. Tente de novo (ele pede para entrar outra vez).'); }
    if (!r.ok) { let m = ''; try { m = (await r.json()).error.message; } catch {} throw new Error('Drive: erro ' + r.status + (m ? ' — ' + m : '')); }
    return r;
  }
  async function pasta() {
    const c = cfg();
    if (c.pastaId) {
      try { const r = await api('https://www.googleapis.com/drive/v3/files/' + c.pastaId + '?fields=id,trashed'); const j = await r.json(); if (!j.trashed) return c.pastaId; } catch {}
    }
    const q = encodeURIComponent("name='" + PASTA + "' and mimeType='application/vnd.google-apps.folder' and trashed=false");
    const r = await api('https://www.googleapis.com/drive/v3/files?q=' + q + '&fields=files(id)');
    const j = await r.json();
    let id = j.files && j.files[0] && j.files[0].id;
    if (!id) { const n = await api('https://www.googleapis.com/drive/v3/files?fields=id', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: PASTA, mimeType: 'application/vnd.google-apps.folder' }) }); id = (await n.json()).id; }
    c.pastaId = id; salvar(c); return id;
  }
  async function enviar(nome, blob) {
    const pid = await pasta();
    const meta = { name: nome, parents: [pid] };
    const fd = new FormData();
    fd.append('metadata', new Blob([JSON.stringify(meta)], { type: 'application/json' }));
    fd.append('file', blob);
    const r = await api('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', { method: 'POST', body: fd });
    return r.json();
  }
  async function listar(filtroNome) {
    const pid = await pasta();
    let q = "'" + pid + "' in parents and trashed=false";
    if (filtroNome) q += " and name contains '" + filtroNome.replace(/'/g, "\\'") + "'";
    const r = await api('https://www.googleapis.com/drive/v3/files?q=' + encodeURIComponent(q) + '&orderBy=modifiedTime desc&pageSize=100&fields=files(id,name,size,modifiedTime,webViewLink)');
    return (await r.json()).files || [];
  }
  async function baixar(id) { const r = await api('https://www.googleapis.com/drive/v3/files/' + id + '?alt=media'); return r.blob(); }

  // o "📤 Mandar ao Drive" de todo o app passa a ir DIRETO para o Drive quando estiver configurado
  const compartilharAntigo = J.compartilhar;
  J.compartilhar = async (nome, dados, tipo) => {
    if (!configurado() || !cfg().usar) return compartilharAntigo(nome, dados, tipo);
    nome = J.nomeArquivo(nome);
    const blob = dados instanceof Blob ? dados : new Blob([dados], { type: tipo || 'text/plain;charset=utf-8' });
    try { J.aviso('☁️ Mandando para o Drive…'); const f = await enviar(nome, blob); J.aviso('☁️ Salvo no Drive (pasta "' + PASTA + '"): ' + f.name, 'ok'); return true; }
    catch (e) { J.aviso('☁️ ' + e.message + ' — vou usar o jeito antigo.', 'erro'); return compartilharAntigo(nome, blob, tipo); }
  };

  J.drive = { cfg, salvar, configurado, conectar, enviar, listar, baixar, PASTA, get ligado() { return !!token && Date.now() < validade; } };
})(window.J);
