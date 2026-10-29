// Gera demo.html (prévia estática no GitHub Pages) a partir do index.html.
// Não faz parte do painel: o cliente NÃO precisa copiar demo.html nem a pasta tools/.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
html = html.replace('href="../../styles.css"', 'href="server/ds/styles.css"').replace('src="../../_ds_bundle.js"', 'src="server/ds/_ds_bundle.js"');
const boot = `<script>
/* PRÉVIA (GitHub Pages): sem servidor. Entra no painel com dados de exemplo; ?login=1 mostra a tela de login. */
(function(){try{
  var demo={role:'admin',name:'Marcelo',opId:''};
  if(!/[?&]login=1/.test(location.search)&&!localStorage.getItem('ms7op-session')){localStorage.setItem('ms7op-session',JSON.stringify(demo));}
  localStorage.removeItem('ms7-token');
  var of=window.fetch;
  window.fetch=function(u,o){var s=String(u);
    if(/\\/api\\/auth\\/(login|signup)/.test(s)){localStorage.setItem('ms7op-session',JSON.stringify(demo));setTimeout(function(){location.href=location.pathname;},350);return new Promise(function(){});}
    if(/\\/api\\//.test(s)){return Promise.resolve(new Response('{}',{status:404,headers:{'Content-Type':'application/json'}}));}
    return of.apply(this,arguments);};
  if(navigator.serviceWorker){navigator.serviceWorker.register=function(){return Promise.reject(new Error('prévia'));};}
}catch(e){}})();
</script>`;
html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8">' + boot);
html = html.replace('<title>', '<title>Prévia · ');
fs.writeFileSync(path.join(root, 'demo.html'), html);
console.log('demo.html gerado (' + Math.round(html.length / 1024) + ' KB)');
