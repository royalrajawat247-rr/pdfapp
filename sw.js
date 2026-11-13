const C='rrpdfpro-v3';
const F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./pdf-lib.min.js','./pdf.min.mjs','./pdf.worker.min.mjs'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{
    if(res&&res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));}return res;}).catch(()=>caches.match('./index.html'))));});
