const C='cozy-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
// The page asks us to keep item paintings for offline play. URLs are the built paths.
self.addEventListener('message',e=>{
  const urls=e.data&&e.data.art;
  if(!urls||!urls.length)return;
  e.waitUntil(caches.open(C).then(cache=>Promise.all(urls.map(u=>cache.add(u).catch(()=>{})))));
});
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));});
