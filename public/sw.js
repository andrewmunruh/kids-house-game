const C='cozy-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));

function artRequest(url){
  var path=url.pathname;
  // Dev and an unhashed file still live under /assets/art/. The Vite build
  // emits each painting as /assets/<name>-<hash>.webp, so the directory
  // match never sees it and the painting would stay network-first.
  if(path.indexOf('/assets/art/')>=0)return true;
  return path.indexOf('/assets/')>=0 && path.slice(-5).toLowerCase()==='.webp';
}

// Item paintings are cache-first: one network fetch on a miss, then the cache.
// A missing file is a normal 404. Nothing here calls cache.add, which logs
// "Failed to execute 'add' on 'Cache'" when the response is not ok.
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(artRequest(url)){
    e.respondWith((async()=>{
      try{
        const cache=await caches.open(C);
        const hit=await cache.match(e.request);
        if(hit)return hit;
        const r=await fetch(e.request);
        if(r&&r.ok)await cache.put(e.request,r.clone());
        return r;
      }catch(err){
        return new Response('',{status:404,statusText:'Not Found'});
      }
    })());
    return;
  }
  e.respondWith(fetch(e.request).then(r=>{
    if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c)).catch(()=>{});}
    return r;
  }).catch(()=>caches.match(e.request).then(hit=>hit||new Response('',{status:504}))));
});
