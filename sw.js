const C='ms7-v2';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==location.origin||u.pathname.indexOf('/api/')===0)return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));});
self.addEventListener('push',e=>{let d={};try{d=e.data.json();}catch(_){d={title:'MS7 Operações',body:e.data?e.data.text():''};}e.waitUntil(self.registration.showNotification(d.title||'MS7 Operações',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag,data:d}));});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus();}return self.clients.openWindow('./index.html');}));});
