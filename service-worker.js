// service-worker.js — gerado pelo Mini SK em 17/10/2026, 13:38:05
// Não precisa mexer: ele guarda sozinho o que o app usa.
const PREFIXO = 'sk-assistente-juridico-modular-';
const CACHE = PREFIXO + 'mvcmei8n';
// Lista feita automaticamente (para funcionar sem internet logo após instalar)
const GUARDAR = [
  "./",
  "./android/app/build.gradle",
  "./android/app/src/main/AndroidManifest.xml",
  "./android/app/src/main/assets/__ponte.js",
  "./android/app/src/main/java/app/minisk/shell/MainActivity.java",
  "./android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png",
  "./android/app/src/main/res/xml/rede.xml",
  "./android/build.gradle",
  "./android/gradle.properties",
  "./android/settings.gradle",
  "./apk.config.json",
  "./capacitor.config.json",
  "./css/app.css",
  "./electron/main.cjs",
  "./favicon.ico",
  "./ferramentas/cacabug/css/app.css",
  "./ferramentas/cacabug/ferramentas/ai-code-studio.js",
  "./ferramentas/cacabug/ferramentas/analisador-universal.js",
  "./ferramentas/cacabug/ferramentas/cirurgiao.js",
  "./ferramentas/cacabug/ferramentas/gerador-eas.js",
  "./ferramentas/cacabug/ferramentas/limpador.js",
  "./ferramentas/cacabug/ferramentas/montar.py",
  "./ferramentas/cacabug/ferramentas/ordem.txt",
  "./ferramentas/cacabug/ferramentas/perito.js",
  "./ferramentas/cacabug/ferramentas/projeto-lab.js",
  "./ferramentas/cacabug/ferramentas/triagem.js",
  "./ferramentas/cacabug/icons/icon-192.png",
  "./ferramentas/cacabug/icons/icon-512.png",
  "./ferramentas/cacabug/index.html",
  "./ferramentas/cacabug/js/00-core.js",
  "./ferramentas/cacabug/js/20-zip.js",
  "./ferramentas/cacabug/js/30-projeto.js",
  "./ferramentas/cacabug/js/40-ferramentas.js",
  "./ferramentas/cacabug/js/45-organizar.js",
  "./ferramentas/cacabug/js/50-relatorios.js",
  "./ferramentas/cacabug/js/60-comparar.js",
  "./ferramentas/cacabug/js/99-app.js",
  "./ferramentas/cacabug/js/lib/expo-core.js",
  "./ferramentas/cacabug/js/lib/organizar-core.js",
  "./ferramentas/cacabug/js/lib/plano-core.js",
  "./ferramentas/cacabug/LEIA-ME.md",
  "./ferramentas/cacabug/lib/diff-LICENSE.txt",
  "./ferramentas/cacabug/lib/diff.min.js",
  "./ferramentas/cacabug/lib/jszip-LICENSE.md",
  "./ferramentas/cacabug/lib/jszip.min.js",
  "./ferramentas/cacabug/manifest.json",
  "./ferramentas/cacabug/sw.js",
  "./ferramentas/colador.html",
  "./ferramentas/colecionador.html",
  "./ferramentas/comparador.html",
  "./ferramentas/comunicacoes.html",
  "./ferramentas/extrator.html",
  "./ferramentas/juntador.html",
  "./ferramentas/laboratorio.html",
  "./ferramentas/limpador.html",
  "./ferramentas/organizador.html",
  "./ferramentas/perito.html",
  "./hub.html",
  "./hub.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/icon-16.png",
  "./icons/icon-32.png",
  "./icons/icon-48.png",
  "./icons/icon-72.png",
  "./icons/icon-96.png",
  "./icons/icon-128.png",
  "./icons/icon-144.png",
  "./icons/icon-152.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png",
  "./icons/icon.svg",
  "./icons/maskable-192.png",
  "./icons/maskable-512.png",
  "./icons/maskable.svg",
  "./index.html",
  "./js/00-core.js",
  "./js/10-ia.js",
  "./js/12-voz.js",
  "./js/15-importar.js",
  "./js/18-texto.js",
  "./js/20-processar.js",
  "./js/22-drive.js",
  "./js/25-regras.js",
  "./js/30-editor.js",
  "./js/35-docx.js",
  "./js/40-conversa.js",
  "./js/50-documentos.js",
  "./js/55-biblioteca.js",
  "./js/60-codigos.js",
  "./js/70-ferramentas.js",
  "./js/80-config.js",
  "./js/99-app.js",
  "./LEIA-ME.md",
  "./lib/jszip-LICENSE.md",
  "./lib/jszip.min.js",
  "./manifest.json",
  "./package.json",
  "./PLANO.md",
  "./RECEITA.md",
  "./sw.js"
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(GUARDAR.map((u) => c.add(u).catch(() => null)))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith(PREFIXO) && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Primeiro a internet (sempre a versão nova); sem internet, a cópia guardada.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copia = res.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
      // Igual ao Workbox da Replit: página que não existe (rota do app) abre o index
      if (res.status === 404 && req.mode === 'navigate') return caches.match('./').then((r) => r || fetch('./'));
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? caches.match('./') : undefined)))
  );
});
