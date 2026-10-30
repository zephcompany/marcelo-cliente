(function(){
const KEY='ms7op-db-v2';
const TODAY=new Date('2026-09-22T12:00:00');
function iso(d){return d.toISOString().slice(0,10);}
function daysAgo(n){const d=new Date(TODAY);d.setDate(d.getDate()-n);return iso(d);}
function fmtDate(s){if(!s)return '—';const p=s.split('-');return p[2]+'/'+p[1];}
let sd=11;function rnd(){sd=(sd*9301+49297)%233280;return sd/233280;}
const CLIENTES=['Grupo Horizonte','Equipe Aurora','Clube Norte','Time Zênite','Grupo Prisma','Equipe Onda','Clube Âncora','Time Cobalto','Grupo Ártico','Equipe Brasa','Clube Safira','Time Nômade','Grupo Lince','Equipe Farol'];
const NOMES=['ana','bruno','caio','duda','edu','fabi','gabi','hugo','iris','joao','kaka','lia','malu','nico','otto','paty','rafa','sara','tati','vini'];

const PIXV=(function(){
  function dg(s){return String(s||'').replace(/\D/g,'');}
  function cpfOk(v){const d=dg(v);if(d.length!==11||/^(\d)\1+$/.test(d))return false;let s=0;for(let i=0;i<9;i++)s+=+d[i]*(10-i);let r=(s*10)%11%10;if(r!==+d[9])return false;s=0;for(let i=0;i<10;i++)s+=+d[i]*(11-i);r=(s*10)%11%10;return r===+d[10];}
  function cnpjOk(v){const d=dg(v);if(d.length!==14||/^(\d)\1+$/.test(d))return false;const w1=[5,4,3,2,9,8,7,6,5,4,3,2],w2=[6].concat(w1);function c(n,w){let s=0;for(let i=0;i<w.length;i++)s+=+d[i]*w[i];const r=s%11;return r<2?0:11-r;}return c(12,w1)===+d[12]&&c(13,w2)===+d[13];}
  function phoneDigits(v){let d=dg(v);if((d.length===12||d.length===13)&&d.indexOf('55')===0)d=d.slice(2);return d;}
  function phoneOk(v){const d=phoneDigits(v);return (d.length===11&&d[2]==='9')||d.length===10;}
  function emailOk(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v||'').trim());}
  function uuidOk(v){return /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(String(v||'').trim());}
  const LABEL={cpf:'CPF',cnpj:'CNPJ',telefone:'Telefone',email:'Email',aleatoria:'Aleatória'};
  function valid(tipo,v){return tipo==='cpf'?cpfOk(v):tipo==='cnpj'?cnpjOk(v):tipo==='telefone'?phoneOk(v):tipo==='email'?emailOk(v):tipo==='aleatoria'?uuidOk(v):false;}
  function detect(v){v=String(v||'').trim();if(!v)return null;if(v.indexOf('@')>0)return 'email';if(uuidOk(v))return 'aleatoria';const d=dg(v);
    if(/^\+?55/.test(v.replace(/[\s()-]/g,''))&&(d.length===12||d.length===13))return 'telefone';if(d.length===14)return 'cnpj';if(d.length===11)return cpfOk(d)?'cpf':(d[2]==='9'?'telefone':'cpf');if(d.length===10)return 'telefone';return null;}
  function format(tipo,v){const d=dg(v);if(tipo==='cpf'&&d.length===11)return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4');if(tipo==='cnpj'&&d.length===14)return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,'$1.$2.$3/$4-$5');
    if(tipo==='telefone'){const p=phoneDigits(v);if(p.length===11)return p.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');if(p.length===10)return p.replace(/(\d{2})(\d{4})(\d{4})/,'($1) $2-$3');}
    if(tipo==='email')return String(v).trim().toLowerCase();if(tipo==='aleatoria')return String(v).trim().toLowerCase();return String(v).trim();}
  function key(tipo,v){return tipo==='email'||tipo==='aleatoria'?String(v).trim().toLowerCase().replace(/-/g,''):tipo==='telefone'?phoneDigits(v):dg(v);}
  // A chave fica presa só na plataforma em que foi usada (a rede não conta; o grupo de plataformas não conta mais)
  function gpOf(d,pl){return pl||'';}
  function grupos(d){const o=[];(d.plataformas||[]).forEach(function(p){if(p.nome&&o.indexOf(p.nome)<0)o.push(p.nome);});return o;}
  function plats(d,gp){return gp?[gp]:[];}
  function stOf(k,gp){const por=k.por||{};if(gp){const g=platNorm(gp);const hits=Object.keys(por).filter(function(x){return platNorm(x)===g&&por[x];});if(!hits.length)return {status:'disponivel'};const ruim=hits.find(function(x){return por[x].status==='bloqueada';})||hits.find(function(x){return por[x].status==='usada';});return por[ruim||hits[0]];}const v=Object.keys(por).map(function(x){return por[x];});if(!v.length)return {status:'disponivel'};return {status:v.some(function(e){return e.status==='bloqueada';})?'bloqueada':'usada'};}
  return {valid:valid,detect:detect,format:format,key:key,LABEL:LABEL,TIPOS:['cpf','cnpj','telefone','email','aleatoria'],gp:gpOf,grupos:grupos,plats:plats,st:stOf};
})();
function pixSeed(ops){let n=0;function k(tipo,valor,status){n++;return {id:'x'+n,tipo:tipo,valor:valor,status:status||'disponivel',conta:null,em:null};}
  return [
  {id:'g1',nome:'Vértice — lote A',pagamento:'Mercado Pago',opId:ops[0].id,plataforma:'Vértice',ativo:true,chaves:[k('cpf','529.982.247-25'),k('telefone','(11) 98888-1020'),k('email','pix.lote.a@ms7.com'),k('aleatoria','e3b0c442-98fc-4c14-9afb-f4c8996fb924'),k('telefone','(11) 97654-3210','bloqueada')]},
  {id:'g2',nome:'Lótus — reserva',pagamento:'Nubank',opId:ops[1].id,plataforma:'Lótus Bet',ativo:true,chaves:[k('cnpj','11.222.333/0001-81'),k('aleatoria','7d1f2c9a-4b3e-4f8a-9c2d-1e0b5a6f7c8d'),k('cpf','111.444.777-35')]},
  {id:'g3',nome:'Geral — sem operador',pagamento:'Inter',opId:'',plataforma:'',ativo:true,chaves:[k('telefone','(21) 97777-3344'),k('email','geral@ms7.com'),k('cpf','390.533.447-05'),k('telefone','(31) 99123-4567'),k('email','reserva.pix@ms7.com')]}];}
const GP_SEED={'Vértice':'Grupo KF','Lótus Bet':'Grupo KF','NovaPlay':'Equipe 771','Arena7':'Equipe 771'};
function ensure(d){if(!d)return d;const ops=d.operadores&&d.operadores.length?d.operadores:[{id:''},{id:''}];
  if(!d.plataformas)d.plataformas=!d._demo?[]:MS7.plataformas.map(function(p,i){return {id:'pl'+i,nome:p.nome};});
  d.plataformas.forEach(function(p){if(p.grupo===undefined)p.grupo=GP_SEED[p.nome]||'';});
  if(!d.pix)d.pix=pixSeed(ops.concat([{id:''},{id:''}]));
  d.pix.forEach(function(g){g.chaves.forEach(function(k){if(k.status===undefined)return;k.por=k.por||{};
    if(k.status!=='disponivel'){let gs=[];if(k.conta){const c=(d.coops||[]).find(function(x){return x.id===k.conta.coopId;});if(c)gs=[PIXV.gp(d,c.plataforma)];}
      if(!gs.length&&g.plataforma)gs=[PIXV.gp(d,g.plataforma)];if(!gs.length)gs=k.status==='bloqueada'?PIXV.grupos(d):[PIXV.grupos(d)[0]||'Geral'];
      gs.forEach(function(n){if(!k.por[n])k.por[n]={status:k.status,conta:k.conta||null,em:k.em||null};});}
    delete k.status;delete k.conta;delete k.em;});});
  (function(){const nomes={};(d.plataformas||[]).forEach(function(p){nomes[p.nome]=1;});const doGrupo=function(n){return (d.plataformas||[]).filter(function(p){return p.grupo===n;}).map(function(p){return p.nome;});};
    d.pix.forEach(function(g){g.chaves.forEach(function(k){const por=k.por;if(!por)return;Object.keys(por).forEach(function(n){if(nomes[n])return;const e=por[n];let alvo=[];
      if(e&&e.conta){const c=(d.coops||[]).find(function(x){return x.id===e.conta.coopId;});if(c&&c.plataforma)alvo=[c.plataforma];}
      if(!alvo.length)alvo=doGrupo(n);if(!alvo.length)return;
      alvo.forEach(function(p){if(!por[p])por[p]=e;});delete por[n];});});});})();
  if(!d.kv)d.kv=[];if(!d.ponto)d.ponto=[];
  if(!d.redes)d.redes=!d._demo?[]:MS7.redes.map(function(r,i){return {id:'rd'+i,nome:r.nome};});return d;}
function pontoDemo(ops){const out=[];const TZ='America/Sao_Paulo';const f=function(x){return x.toLocaleDateString('sv-SE',{timeZone:TZ});};const t=f(new Date());const base=new Date(t+'T12:00:00-03:00');
  const at=function(ds,h,m){return new Date(ds+'T'+String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':00-03:00').getTime();};const M=60000;
  for(let k=12;k>=0;k--){const d=new Date(base.getTime()-k*86400000);const ds=f(d);if(d.getUTCDay()===0)continue;
    ops.filter(function(o){return o.ativo;}).forEach(function(o,i){if(k>0&&rnd()<0.08)return;const e=at(ds,8,40)+Math.round(rnd()*50)*M;const ai=at(ds,12,0)+Math.round(rnd()*30)*M;const af=ai+(55+Math.round(rnd()*25))*M;const s=at(ds,17,50)+Math.round(rnd()*60)*M;
      const r={id:'pt_'+o.id+'_'+ds,opId:o.id,data:ds,entrada:e};const n=Date.now();
      if(k===0){if(i===2||e>n)return;if(ai<n){r.almocoIni=ai;if(i!==1&&af<n)r.almocoFim=af;}if(i===0&&r.almocoFim&&s<n)r.saida=s;}
      else{r.almocoIni=ai;r.almocoFim=af;r.saida=s;}
      out.push(r);});}
  return out;}
function seed(){const s=seed0();s.ponto=pontoDemo(s.operadores);s._demo=true;return s;}
function isSeedItem(k,x){if(!x)return false;const id=x.id;if(k==='operadores')return /^op[1-6]$/.test(id);if(k==='pagamentos')return /^p[12]$/.test(id);if(k==='custos')return typeof id==='number'?id<1e6:/^\d{1,5}$/.test(String(id));if(k==='ponto')return /^pt_op[1-6]_/.test(String(id));if(k==='pix')return /^g[1-3]$/.test(id);if(k==='plataformas')return /^pl\d{1,2}$/.test(String(id));if(k==='redes')return /^rd\d{1,2}$/.test(String(id));if(k==='coops'){const m=/^C-(\d+)$/.exec(String(id));if(!m||+m[1]<1035||+m[1]>1048)return false;return !x._u||(CLIENTES.indexOf(x.cliente)>=0&&/^op[1-6]$/.test(x.opId));}return false;}
function semExemplo(d){const o=JSON.parse(JSON.stringify(d));delete o._demo;COLS.forEach(function(k){if(Array.isArray(o[k]))o[k]=o[k].filter(function(x){return !isSeedItem(k,x);});});o._del={};return o;}
function seedIds(){const keep=sd;const s=ensure(seed());sd=keep;const out={};COLS.forEach(function(k){out[k]={};(s[k]||[]).forEach(function(x){if(x&&x.id)out[k][x.id]=1;});});return out;}
function seed0(){
  sd=11;
  const ops=MS7.operadores.map(function(o){return {id:o.id,nome:o.nome,email:o.nome.toLowerCase().split(' ')[0]+'@ms7.com',ciclo:o.ciclo,pct:o.pct,ativo:o.ativo};});
  const ago=[0,1,2,3,0,4,6,8,10,13,16,19,23,27];
  const coops=CLIENTES.map(function(cl,i){
    const st=i<4?'Em andamento':i===4?'Ativa':'Concluída';
    const tipo=['pct','conta','fixo'][i%3];const val={pct:15,conta:25,fixo:900}[tipo];
    const n=5+(i%4)*2;const contas=[];
    for(let j=0;j<n;j++){
      const dep=Math.round(250+rnd()*650);const red=rnd()<0.45?Math.round(dep*0.3):0;let cs;
      if(st==='Concluída'){const r=rnd();cs=r<0.09?'Bloqueado':r<0.16?'Não sacado':'Sacado';}
      else{const r=rnd();cs=r<0.08?'Bloqueado':r<0.35?'Aguardando':r<0.6?'À sacar':'Sacado';}
      const saq=cs==='Sacado'?Math.round((dep+red)*(1.08+rnd()*0.55)):0;
      contas.push({id:'k'+i+'-'+j,usuario:NOMES[(i*3+j)%20]+Math.round(100+rnd()*899),senha:'••••••',deposito:dep,redeposito:red,saque:saq,status:cs,obs:'',criada:daysAgo(ago[i])});
    }
    return {id:'C-'+(1048-i),cliente:cl,opId:ops[i%6].id,plataforma:MS7.plataformas[i%5].nome,rede:MS7.redes[i%8].nome,depositantes:n*4,comTipo:tipo,comValor:val,status:st,inicio:daysAgo(ago[i]),fim:st==='Concluída'?daysAgo(Math.max(0,ago[i]-2)):null,ciclos:st==='Concluída'?1:0,contas:contas};
  });
  const custos=MS7.custos.map(function(c,i){return Object.assign({},c,{data:c.comp==='09/2026'?daysAgo(3+i*2):daysAgo(30+i)});});
  return {v:2,operadores:ops,coops:coops,custos:custos,pagamentos:[{id:'p1',opId:'op1',valor:1800,data:daysAgo(8)},{id:'p2',opId:'op4',valor:900,data:daysAgo(5)}],config:{custoConta:28}};
}
function load(){try{const v=JSON.parse(localStorage.getItem(KEY));return v&&v.v===2?v:null;}catch(e){return null;}}
let db=ensure(load()||(localStorage.getItem('ms7-token')?{v:2,_del:{},config:{},operadores:[],coops:[],custos:[],pagamentos:[],pix:[],kv:[],ponto:[]}:seed()));
const subs=[];
const COLS=['operadores','coops','custos','pagamentos','pix','plataformas','redes','kv','ponto'];
function save(){localStorage.setItem(KEY,JSON.stringify(db));subs.slice().forEach(function(f){f();});}
const NEST={coops:'contas',pix:'chaves'};
function semFilhos(x,f){const o=Object.assign({},x);delete o[f];delete o._u;delete o._uf;return JSON.stringify(o);}
function stamp(before,after){const now=Date.now();after._del=after._del||{};COLS.forEach(function(k){const old={},oldObj={};(before[k]||[]).forEach(function(x){old[x.id]=JSON.stringify(x);oldObj[x.id]=x;});const keep={};const f=NEST[k];
  (after[k]||[]).forEach(function(x){keep[x.id]=1;const o=old[x.id];if(o===undefined||o!==JSON.stringify(x)){x._u=now;const ob=oldObj[x.id];
    if(f){if(!ob||semFilhos(ob,f)!==semFilhos(x,f))x._uf=now;const po={};((ob&&ob[f])||[]).forEach(function(y){po[y.id]=JSON.stringify(y);});const pk={};(x[f]||[]).forEach(function(y){pk[y.id]=1;const p=po[y.id];if(p===undefined||p!==JSON.stringify(y))y._u=now;});Object.keys(po).forEach(function(id){if(!pk[id])after._del[(k==='coops'?'ct:':'ch:')+x.id+':'+id]=now;});}}});
  Object.keys(old).forEach(function(id){if(!keep[id])after._del[k+':'+id]=now;});});
  if(JSON.stringify(before.config)!==JSON.stringify(after.config))after.config._u=now;}
let ver=0;
function update(fn){ver++;const before=db;db=JSON.parse(JSON.stringify(db));fn(db);stamp(before,db);save();Sync.push();}
function blankLocal(d){const o={v:d.v||2,_del:{},config:{}};Object.keys(d).forEach(function(k){if(Array.isArray(d[k]))o[k]=[];});return o;}
const Sync={status:'local',rev:0,es:null,timer:null,pending:false,
  base:function(){return (localStorage.getItem('ms7-push-server')||'').replace(/\/$/,'');},
  token:function(){return localStorage.getItem('ms7-token')||'';},
  key:function(){return this.token();},
  on:function(){return localStorage.getItem('ms7-sync-on')==='1'&&!!this.base()&&!!this.token();},
  set:function(s){this.status=s;subs.slice().forEach(function(f){f();});},
  hdr:function(){return {'Content-Type':'application/json','Authorization':'Bearer '+this.token()};},
  api:function(p,o){const self=this;o=o||{};return fetch(this.base()+p,Object.assign({},o,{headers:this.hdr()})).then(function(r){return r.json().catch(function(){return {};}).then(function(j){if(r.status===401){self.logout(true);}if(!r.ok)throw new Error(j.error||('Erro '+r.status));return j;});});},
  login:function(server,email,password){const self=this;localStorage.setItem('ms7-push-server',server.replace(/\/$/,''));return fetch(this.base()+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email,password:password})}).then(function(r){return r.json().then(function(j){if(!r.ok)throw new Error(j.error||'Falha no login');localStorage.setItem('ms7-token',j.token);var lu=localStorage.getItem('ms7-last-uid');if(lu&&lu!==j.user.id){db=blankLocal(db);save();}localStorage.setItem('ms7-last-uid',j.user.id);localStorage.setItem('ms7-user',JSON.stringify(j.user));return self.connect((j.user.role==='admin'||j.user.role==='super')&&!self.rev?'maybe-upload':null).then(function(){return j.user;});});});},
  user:function(){try{return JSON.parse(localStorage.getItem('ms7-user'));}catch(e){return null;}},
  logout:function(expired){localStorage.removeItem('ms7-token');localStorage.removeItem('ms7-user');localStorage.removeItem('ms7op-session');this.disconnect();if(window.ms7OnLogout)window.ms7OnLogout(expired);},
  pull:function(){const self=this;const v0=ver;return this.api('/api/db').then(function(j){self.rev=j.rev;if(ver!==v0||self.pending){self.push();return j;}if(j.db){db=ensure(j.db);save();}self.set('online');return j;});},
  push:function(){if(!this.on())return;const self=this;this.pending=true;clearTimeout(this.timer);this.timer=setTimeout(function(){self.set('syncing');
    const v0=ver;self.api('/api/db',{method:'PUT',body:JSON.stringify({db:db})})
    .then(function(j){self.rev=j.rev;if(ver!==v0){self.push();return;}self.pending=false;db=ensure(j.db);save();self.set('online');}).catch(function(e){self.set('offline');try{toast('Não salvou no servidor: '+(e&&e.message||e)+'. Tentando de novo…');}catch(_){}clearTimeout(self.retry);self.retry=setTimeout(function(){self.push();},5000);});},250);},
  listen:function(){const self=this;if(this.es)this.es.close();if(typeof EventSource==='undefined')return;
    this.es=new EventSource(this.base()+'/api/events?token='+encodeURIComponent(this.token()));
    this.es.onmessage=function(e){let m={};try{m=JSON.parse(e.data);}catch(_){}if(m.rev&&m.rev!==self.rev&&!self.pending)self.pull().catch(function(){});};
    this.es.onerror=function(){self.set('offline');};this.es.onopen=function(){if(self.pending)self.push();else self.pull().catch(function(){});};},
  connect:function(first){const self=this;localStorage.setItem('ms7-sync-on','1');this.set('syncing');
    return fetch(this.base()+'/api/db',{headers:this.hdr()}).then(function(r){if(!r.ok)throw new Error('Servidor recusou ('+r.status+')');return r.json();}).then(function(j){
      if(j.user)localStorage.setItem('ms7-user',JSON.stringify(j.user));
      if(j.user&&j.user.role==='operador'){if(!j.db)throw new Error('O administrador ainda não enviou os dados');self.rev=j.rev;db=ensure(j.db);save();return;}
      if(!j.db||first==='upload'){const up=semExemplo(db);return fetch(self.base()+'/api/db',{method:'PUT',headers:self.hdr(),body:JSON.stringify({db:up})}).then(function(r){return r.json();}).then(function(k){self.rev=k.rev;db=k.db;save();});}
      self.rev=j.rev;db=ensure(j.db);save();}).then(function(){self.set('online');self.listen();}).catch(function(e){self.set('offline');throw e;});},
  disconnect:function(){localStorage.removeItem('ms7-sync-on');if(this.es)this.es.close();this.es=null;this.set('local');},
  restricted:function(){return !!db._restrito;}
};
if(Sync.on())setTimeout(function(){Sync.connect().catch(function(){});},0);
window.addEventListener('online',function(){if(Sync.on())Sync.connect().catch(function(){});});
function useDB(){const [,set]=React.useState(0);React.useEffect(function(){const f=function(){set(function(x){return x+1;});};subs.push(f);return function(){const i=subs.indexOf(f);if(i>=0)subs.splice(i,1);};},[]);return db;}
function sum(a,k){return a.reduce(function(s,x){return s+(typeof k==='function'?k(x):x[k]);},0);}
function contaPronta(k){return !!String(k.usuario||'').trim();}
function contaFechada(k){return contaPronta(k)&&((k.status==='Sacado'&&(+k.saque||0)>0)||k.status==='Bloqueado'||k.status==='Não sacado');}
function temSaqueNovo(c){return c.contas.some(function(k){return !k.ciclo&&contaFechada(k);});}
const cicloTimers={};const saqDepois={};
function flushCiclo(coopId){const c2=coop(coopId);if(!c2)return;if(temSaqueNovo(c2))A.fecharCiclo(coopId,true);delete saqDepois[coopId];}
function cicloTam(c){return 1;}
function resumoCiclo(cp,l){const dep=sum(l,'deposito')+sum(l,'redeposito'),cs=l.filter(function(x){return (+x.saque||0)>0;}),saq=sum(l,saqEf)+sum(l,function(x){return +x.bau||0;});
  const rs=saq-dep;return 'Operador: '+opName(cp.opId)+'\nRegistrou '+l.length+(l.length===1?' conta':' contas')+'\nDepósito: '+MS7.brl(dep)+'\nSaque: '+MS7.brl(saq)+'\nResultado: '+(rs>0?'+':rs<0?'-':'')+MS7.brl(Math.abs(rs));}
function saqEf(c){return c&&c.status==='Sacado'?(+c.saque||0):0;}
function contaRes(c){return saqEf(c)+(+c.bau||0)-(+c.deposito||0)-(+c.redeposito||0);}
function contaUsada(x){return !!(String(x.usuario||'').trim()||(+x.deposito||0)||(+x.redeposito||0)||(+x.saque||0)||(+x.bau||0));}
function contaOperada(x){return !!((+x.deposito||0)||(+x.redeposito||0)||(+x.saque||0)||(+x.bau||0));}
function contasValidas(cp){const N=+cp.depositantes||0;if(!N||cp.contas.length<=N)return cp.contas;return cp.contas.filter(function(x,i){return i<N||!!String(x.usuario||'').trim();});}
function calc(cp){const V=contasValidas(cp);
  const n=V.filter(contaOperada).length,dep=sum(V,'deposito'),red=sum(V,'redeposito'),saq=sum(V,saqEf),pend=sum(V,function(x){return x.status!=='Sacado'?(+x.saque||0):0;}),bau=sum(V,function(x){return +x.bau||0;});
  const sal=+cp.salario||0,res=saq+bau+sal-dep-red,bloq=V.filter(function(c){return c.status==='Bloqueado';}).length;
  const cv=+cp.comValor||0,com=cp.comTipo==='pct'?Math.max(0,res)*cv/100:cp.comTipo==='conta'?cv*n:cp.comTipo==='misto'?cv+(+cp.comConta||0)*n:cp.comTipo==='rolo'?V.reduce(function(a,x){return a+(contaOperada(x)?(x.rolo?(cp.comR!=null?+cp.comR:2):(cp.comS!=null?+cp.comS:1.5)):0);},0):cv;
  const custo=0,lucro=res-com,roi=(com+custo)?lucro/(com+custo)*100:0;
  return {n:n,dep:dep,red:red,saq:saq,pend:pend,sal:sal,ds:saq+bau-dep-red,res:res,bloq:bloq,com:com,custo:custo,lucro:lucro,roi:roi};
}
function dIso(v){if(v==null||v==='')return '';if(typeof v==='number'){const d=new Date(v);return isNaN(d)?'':iso(d);}const t=String(v).trim();if(/^\d{4}-\d{2}-\d{2}/.test(t))return t.slice(0,10);const m=t.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);if(m){const y=m[3]?(m[3].length===2?'20'+m[3]:m[3]):String(TODAY.getFullYear());return y+'-'+('0'+m[2]).slice(-2)+'-'+('0'+m[1]).slice(-2);}if(/^\d{10,}$/.test(t))return dIso(+t);const d=new Date(t);return isNaN(d)?'':iso(d);}
function linkId(u){u=String(u||'').trim();if(!u)return '';let url=null;try{url=new URL(/^https?:\/\//i.test(u)?u:'https://'+u);}catch(e){}
  if(url){const K=['id','code','invitecode','invite','ref','refcode','referral','aff','affiliate','affid','uid','userid','u','p','c','agent','agentid','promo','promocode','codigo','cod','pid','sid','share','inv'];const qs={};url.searchParams.forEach(function(v,k){qs[k.toLowerCase()]=v;});if(url.hash&&url.hash.indexOf('?')>=0){try{new URLSearchParams(url.hash.slice(url.hash.indexOf('?')+1)).forEach(function(v,k){qs[k.toLowerCase()]=v;});}catch(e){}}
    for(const k of K)if(qs[k]&&String(qs[k]).trim())return String(qs[k]).trim();const anyDig=Object.keys(qs).map(function(k){return qs[k];}).find(function(v){return /\d{4,}/.test(v);});if(anyDig)return anyDig.trim();
    const segs=(url.pathname+'/'+url.hash.replace(/^#\/?/,'').split('?')[0]).split('/').filter(Boolean);for(let i=segs.length-1;i>=0;i--){const m=segs[i].match(/\d{4,}/);if(m)return segs[i].length<=24?segs[i]:m[0];}}
  const m=u.match(/\d{4,}/g);return m?m[m.length-1]:'';}
function dIni(c){return dIso(c.inicio)||dIso(c.criadaEm)||dIso(c._u)||dIso(c.fim);}
function comData(c){return dIso(c.finalizadaEm)||dIso(c.fim)||dIni(c);}
function semanaIni(ds){const d=new Date((ds||iso(TODAY))+'T12:00:00');const w=(d.getDay()+6)%7;d.setDate(d.getDate()-w);return iso(d);}
function comissoesDe(opId,de,ate){return db.coops.filter(function(c){const dt=comData(c);return c.status==='Concluída'&&(!opId||c.opId===opId)&&dt&&dt>=de&&dt<=ate;}).map(function(c){return {c:c,data:comData(c),com:calc(c).com};});}
function inPeriod(dateStr,per){if(!per||per==='Todos')return true;dateStr=dIso(dateStr);if(!dateStr)return false;const d=new Date(dateStr+'T12:00:00');const diff=(TODAY-d)/864e5;return per==='Hoje'?diff<1:per==='7 dias'?diff<7:diff<30;}
function coopsFor(opts){opts=opts||{};return db.coops.filter(function(c){return (!opts.opId||c.opId===opts.opId)&&inPeriod(dIni(c),opts.per)&&(opts.lixeira?true:c.status!=='Lixeira');});}
function agg(list){const cs=list.map(calc);const o={coops:list.length,n:sum(cs,'n'),dep:sum(cs,'dep'),red:sum(cs,'red'),saq:sum(cs,'saq'),res:sum(cs,'res'),bloq:sum(cs,'bloq'),com:sum(cs,'com'),custo:sum(cs,'custo'),lucro:sum(cs,'lucro')};o.roi=(o.com+o.custo)?o.lucro/(o.com+o.custo)*100:0;o.custoConta=0;o.ativas=list.filter(function(c){return c.status==='Em andamento'||c.status==='Ativa';}).length;o.concluidas=list.filter(function(c){return c.status==='Concluída';}).length;return o;}
function platNorm(p){return String(p||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s*[-·|]?\s*link\s*\d+\s*$/i,'').replace(/[\s._\-·|]+/g,'');}
function mesmaCh(k,v){if(k.valor===v)return true;const a=PIXV.key(k.tipo,k.valor),b=PIXV.key(k.tipo,v);return !!a&&a===b;}
function pixOrd(l){const t=function(v){return String(v||'').trim().toLowerCase();};return (l||[]).slice().sort(function(a,b){return t(a.nome||'Sem nome').localeCompare(t(b.nome||'Sem nome'),'pt-BR',{numeric:true})||t(a.pagamento).localeCompare(t(b.pagamento),'pt-BR',{numeric:true})||String(a.id).localeCompare(String(b.id),'pt-BR',{numeric:true});});}
function proxLink(opId){if(!opId)return '';const us=(db.coops||[]).filter(function(x){return x.opId===opId&&(x.status==='Ativa'||x.status==='Em andamento');}).map(function(x){const m=String(x.linkN||'').match(/(\d+)/);return m?+m[1]:0;});let n=1;while(us.indexOf(n)>=0)n++;return 'Link '+n;}
function platFix(f){let p=String(f.plataforma||'').trim().replace(/\s+/g,' '),l=String(f.linkN||'').trim();const m=p.match(/\s*[-·|]?\s*link\s*(\d+)\s*$/i);if(m){p=p.slice(0,m.index).trim();if(!l)l='Link '+m[1];}if(/^\d+$/.test(l))l='Link '+l;const ex=(db.coops||[]).find(function(x){return x.plataforma&&platNorm(x.plataforma)===platNorm(p);});return {plataforma:ex?ex.plataforma:p,linkN:l};}
function coopNome(c){if(!c)return '';const p=String(c.plataforma||'').trim();if(p)return p;const n=String(c.cliente||'').trim();if(n&&!/^(Nova cooperação|Novo baú)$/i.test(n))return n;return c.rede||(c.tipo==='bau'?'Baú':'Cooperação');}
function opName(id){if(!id)return 'Admin';const o=db.operadores.find(function(x){return x.id===id;});return o?o.nome:'—';}
function coop(id){return db.coops.find(function(c){return c.id===id;});}
function linhaFinal(k){return 'Dep. × Saque: '+MS7.brl(k.ds)+(k.sal?' · Salário: '+MS7.brl(k.sal):'')+' · Comissão: '+MS7.brl(-k.com)+'\n'+(k.lucro>=0?'LUCRO':'PREJUÍZO')+': '+MS7.brl(k.lucro)+(k.pend?'\nSaque não contado (contas que não estão como Sacado): '+MS7.brl(k.pend):'');}
function resumoCurto(cp){const k=calc(cp);const v=Math.round(k.lucro*100)/100;return (cp.opId?'Operador: '+opName(cp.opId)+' · ':'')+k.n+' contas\n'+(v>=0?'Lucro: +':'Prejuízo: -')+MS7.brl(Math.abs(v));}
function resumo(cp){const k=calc(cp);return 'Operador: '+opName(cp.opId)+' · '+k.n+' contas\nDepósito: '+MS7.brl(k.dep+k.red)+' · Saque: '+MS7.brl(k.saq)+'\n'+linhaFinal(k);}
const A={
  createCoop:function(f){A._createCoop(f);const num=function(v){return parseFloat(String(v||'').replace(/\./g,'').replace(',','.'))||0;};
    update(function(d){const c=d.coops[0];if(!c)return;c.contaMae={link:f.link||'',id:String(f.mid||'').trim()||linkId(f.link),usuario:f.muser||'',tipo:f.mtipo||'Senha',senha:f.msenha||''};c.salario=num(f.salario);const n=Math.min(500,parseInt(f.qtd,10)||0);if(!c.contas.length)for(let i=0;i<n;i++)c.contas.push({id:'k'+Date.now()+'-'+i,usuario:'',senha:'',deposito:0,redeposito:0,saque:0,status:'Aguardando',pix:'',obs:'',criada:iso(TODAY)});c.mediaDep=num(f.mediaDep);c.rollover=f.rollover||'';c.descricao=f.descricao||'';});},
  metaParaCoop:function(nid){const br=function(v){if(v==null||v==='')return v;return typeof v==='number'?String(v).replace('.',','):String(v);};const n=coop(nid);if(!n)return;const it=(db.kv||[]).find(function(x){return x&&x.id==='metas';});const L=it&&Array.isArray(it.v)?it.v:[];if(L.some(function(m){return m&&m.coopId===nid;}))return;
    const om=L.find(function(m){return m&&m.coopId===n.transferidaDe;})||{};const cm=n.contaMae||{};
    const lista=n.contas.map(function(k,i){return (+k.deposito||0)?String(i+1).padStart(2,'0')+' - '+String(+k.deposito).replace('.',',')+(k.rolo?' - R':''):'';}).filter(Boolean).join('\n');
    const meta=Object.assign({},om,{id:'mt'+Date.now()+Math.floor(Math.random()*1000),criada:Date.now(),enviadaEm:Date.now(),tipo:n.tipo==='bau'?'bau':'coop',opId:n.opId||'',coopId:nid,plataforma:n.plataforma||om.plataforma||'',rede:n.rede||om.rede||'',linkN:n.linkN||'',link:cm.link||om.link||'',idMeta:cm.id||om.idMeta||'',muser:cm.usuario||om.muser||'',msenha:cm.senha||om.msenha||'',lista:lista,qtd:n.contas.length,comTipo:n.comTipo||om.comTipo,comValor:br(n.comValor!=null?n.comValor:(om.comValor||'0')),comR:br(n.comR!=null?n.comR:om.comR),comS:br(n.comS!=null?n.comS:om.comS),salario:'',envios:[],nome:[n.plataforma,n.linkN].filter(Boolean).join(' · '),nomeCoop:n.cliente||om.nomeCoop||'',transferidaDe:n.transferidaDe,manual:0});
    update(function(d){const k=(d.kv||[]).find(function(x){return x&&x.id==='metas';});const cur=k&&Array.isArray(k.v)?k.v:[];d.kv=(d.kv||[]).filter(function(x){return x.id!=='metas';}).concat([{id:'metas',v:[meta].concat(cur)}]);});},
  pendentesDe:function(id){const c=coop(id);if(!c)return [];return contasValidas(c).filter(function(k){return !String(k.usuario||'').trim()&&!(+k.saque||0)&&!(+k.redeposito||0)&&!(+k.bau||0)&&k.status!=='Bloqueado';}).concat((function(){const N=+c.depositantes||0,o=[];for(let i=c.contas.length;i<N;i++)o.push({id:null,virt:true,deposito:0,rolo:false});return o;})());},
  transferirContas:function(id,opId,fin){const c=coop(id);if(!c)return null;const pend=A.pendentesDe(id);if(!pend.length)return null;const feitas=contasValidas(c).length-pend.filter(function(k){return !k.virt;}).length;
    const nid=A._createCoop({cliente:c.cliente,tipo:c.tipo,opId:opId||'',proprio:!opId,modelo:c.modelo,plataforma:c.plataforma,rede:c.rede,qtd:0,comTipo:c.comTipo,comValor:String(c.comValor||0),comConta:String(c.comConta||0),linkDiv:c.linkDiv||''});
    update(function(d){const n=d.coops.find(function(x){return x.id===nid;});const o=d.coops.find(function(x){return x.id===id;});if(!n||!o)return;
      const tot=feitas+pend.length;if(o.comTipo==='fixo'&&tot){const cv=+o.comValor||0;n.comValor=Math.round(cv*pend.length/tot*100)/100;o.comValor=Math.round(cv*feitas/tot*100)/100;}
      n.contaMae=Object.assign({},o.contaMae||{});n.comR=o.comR;n.comS=o.comS;n.mediaDep=o.mediaDep;n.rollover=o.rollover;n.descricao=o.descricao;n.salario=0;n.transferidaDe=id;
      n.contas=pend.map(function(k,i){return {id:'k'+Date.now()+'-'+i,usuario:'',senha:'',senhaSaque:'',deposito:+k.deposito||0,redeposito:0,saque:0,bau:0,rolo:!!k.rolo,status:'Aguardando',pix:'',obs:'',criada:iso(TODAY)};});n.depositantes=n.contas.length;
      const ids={};pend.forEach(function(k){if(k.id)ids[k.id]=1;});o.contas=o.contas.filter(function(k){return !ids[k.id];});o.depositantes=feitas;o.transferidas=(o.transferidas||[]).concat([{para:nid,opId:opId||'',n:pend.length,dep:pend.reduce(function(a,k){return a+(+k.deposito||0);},0),em:Date.now()}]);});
    A.metaParaCoop(nid);
    if(fin&&(c.status==='Ativa'||c.status==='Em andamento'))A.setStatus(id,'Finalizada');
    toast(pend.length+' contas passadas para '+opName(opId)+' · '+nid);return nid;},
  setDepositantes:function(id,n){n=Math.max(0,Math.min(500,parseInt(n,10)||0));let add=0,rem=0;update(function(d){const c=d.coops.find(function(x){return x.id===id;});if(!c)return;c.depositantes=n;
      while(c.contas.length<n){c.contas.push({id:'k'+Date.now()+'-'+c.contas.length,usuario:'',senha:'',senhaSaque:'',deposito:0,redeposito:0,saque:0,bau:0,status:'Aguardando',pix:'',obs:'',criada:iso(TODAY)});add++;}
      for(let i=c.contas.length-1;i>=0&&c.contas.length>n;i--){const k=c.contas[i];if(!k.usuario&&!k.deposito&&!k.saque&&!k.pix){c.contas.splice(i,1);rem++;}}});
    const cf=coop(id);const fora=cf?cf.contas.length-contasValidas(cf).length:0;toast('Depositantes: '+n+(add?' · '+add+' linhas criadas':'')+(rem?' · '+rem+' linhas vazias removidas':'')+(fora?' · '+fora+(fora===1?' conta fica':' contas ficam')+' fora da conta':''));},
  removeContas:function(id,ids){update(function(d){const c=d.coops.find(function(x){return x.id===id;});c.contas=c.contas.filter(function(x){return ids.indexOf(x.id)<0;});});toast(ids.length+' conta(s) removida(s)');},
  statusContas:function(id,ids,s){ids.forEach(function(k){const c=coop(id);const r=c.contas.find(function(x){return x.id===k;});if(r)A.saveConta(id,Object.assign({},r,{status:s}),true);});toast(ids.length+' conta(s): '+s);},
  editCoop:function(id,f){const num=function(v){return parseFloat(String(v==null?'':v).replace(/\./g,'').replace(',','.'))||0;};update(function(d){const c=d.coops.find(function(x){return x.id===id;});if(!c)return;c.cliente=String(f.cliente||'').trim()||c.cliente;c.opId=f.opId||c.opId;const pf=platFix(f);c.plataforma=pf.plataforma;c.linkN=pf.linkN;c.rede=f.rede||'';c.comTipo=f.comTipo||'pct';c.comValor=parseFloat(String(f.comValor).replace(',','.'))||0;c.comConta=parseFloat(String(f.comConta||'').replace(',','.'))||0;if(f.comTipo==='rolo'){c.comR=num(f.comR);c.comS=num(f.comS);}c.contaMae={link:f.link||'',id:String(f.mid||'').trim()||linkId(f.link),usuario:f.muser||'',tipo:f.mtipo||'Senha',senha:f.msenha||''};c.salario=num(f.salario);if(f.depositantes!=null&&String(f.depositantes).trim()!=='')c.depositantes=Math.max(0,Math.min(500,parseInt(f.depositantes,10)||0));c.mediaDep=num(f.mediaDep);c.rollover=f.rollover||'';c.descricao=f.descricao||'';});toast('Cooperação atualizada');},
  importarDepositos:function(id,rows,campo){campo=campo||'deposito';let n=0,miss=[];update(function(d){const c=d.coops.find(function(x){return x.id===id;});if(!c)return;const usados={};rows.forEach(function(r){let e=null;if(r.usuario){const u=r.usuario.toLowerCase();e=c.contas.find(function(x){return String(x.usuario||'').trim().toLowerCase()===u;});if(!e){e=c.contas.find(function(x){return !String(x.usuario||'').trim()&&!usados[x.id];});if(e)e.usuario=r.usuario;}}else{e=c.contas.find(function(x){return !usados[x.id]&&!(+x[campo]||0);});}if(!e){miss.push(r.usuario||r.valor);return;}usados[e.id]=1;e[campo]=r.valor;n++;});});toast(n+(n===1?' valor importado':' valores importados')+(miss.length?' · '+miss.length+' sem conta':''));},
  importarTelegram:function(id,rows,vr,vs){let fill=0,add=0;update(function(d){const c=d.coops.find(function(x){return x.id===id;});if(!c)return;rows.forEach(function(r){const i=Math.max(0,r.n-1);while(c.contas.length<=i){c.contas.push({id:'k'+Date.now()+'-'+c.contas.length,usuario:'',senha:'',senhaSaque:'',deposito:0,redeposito:0,saque:0,bau:0,status:'Aguardando',pix:'',obs:'',criada:iso(TODAY)});add++;}const e=c.contas[i];e.deposito=r.valor;e.rolo=!!r.rolo;fill++;});if(c.contas.length>(+c.depositantes||0))c.depositantes=c.contas.length;c.comTipo='rolo';c.comR=vr;c.comS=vs;});toast(fill+' depósitos importados'+(add?' · '+add+' linhas criadas':'')+' · comissão com R / sem R');},
  importarContas:function(id,rows){let fill=0,add=0;update(function(d){const c=d.coops.find(function(x){return x.id===id;});rows.forEach(function(r){const e=c.contas.find(function(x){return !x.usuario;});if(e){Object.assign(e,r);fill++;}else{c.contas.push(Object.assign({id:'k'+Date.now()+'-'+add,deposito:0,redeposito:0,saque:0,bau:0,status:'Aguardando',pix:'',obs:'',criada:iso(TODAY)},r));add++;}});if(c.contas.length>(+c.depositantes||0))c.depositantes=c.contas.length;});toast((fill+add)+' conta(s) importada(s)');},
  gerarLinhas:function(id,n){n=Math.min(500,n|0);if(!n)return;update(function(d){const c=d.coops.find(function(x){return x.id===id;});if(!c)return;for(let i=0;i<n;i++)c.contas.push({id:'k'+Date.now()+'-'+i,usuario:'',senha:'',deposito:0,redeposito:0,saque:0,status:'Aguardando',pix:'',obs:'',criada:iso(TODAY)});});toast(n+' linhas criadas');},
  _createCoop:function(f){f=Object.assign({},f,platFix(f));if(!f.linkN)f.linkN=proxLink(f.opId);const id='C-'+(db.coops.reduce(function(m,x){const n=+String(x.id).replace(/^C-/,'');return isNaN(n)?m:Math.max(m,n);},2000)+1);update(function(d){d.coops.unshift({id:id,cliente:f.cliente||'',tipo:f.tipo==='bau'?'bau':'coop',proprio:!!f.proprio,opId:f.opId||'',modelo:f.modelo||'dep',metaBaixas:+f.metaBaixas||0,linkDiv:String(f.linkDiv||'').trim(),metaValor:parseFloat(String(f.metaValor||'').replace(/\./g,'').replace(',','.'))||0,plataforma:f.plataforma,linkN:f.linkN||'',rede:f.rede,depositantes:+f.qtd||0,comTipo:f.comTipo,comValor:parseFloat(String(f.comValor).replace(',','.'))||0,comConta:parseFloat(String(f.comConta||'').replace(',','.'))||0,status:'Ativa',criadaEm:Date.now(),inicio:/^\d{4}-\d{2}-\d{2}$/.test(f.inicio||'')?f.inicio:iso(TODAY),fim:null,ciclos:0,contas:(function(){const n=Math.min(500,+f.qtd||0),o=[];for(let i=0;i<n;i++)o.push({id:'k'+Date.now()+'-'+i,usuario:'',senha:'',deposito:0,redeposito:0,saque:0,status:'Aguardando',pix:'',obs:'',criada:iso(TODAY)});return o;})()});});toast('Cooperação '+id+' criada com '+(Math.min(500,+f.qtd||0))+' linhas');return id;},
  setStatus:function(id,st){if(st==='Finalizada'){const c0=coop(id);if(c0&&c0.contas.some(function(k){return !k.ciclo&&(String(k.usuario||'').trim()||+k.deposito||+k.saque);}))A.fecharCiclo(id,true);}const before=coop(id);update(function(d){const c=d.coops.find(function(x){return x.id===id;});c.status=st;if(st==='Finalizada')c.finalizadaEm=iso(TODAY);if(st==='Concluída'){c.fim=iso(TODAY);if(!c.finalizadaEm)c.finalizadaEm=c.fim;}if(st==='Em andamento'||st==='Ativa')c.finalizadaEm=null;if(st==='Em andamento'&&!c.fim)c.fim=null;});const c=coop(id);
    if(st==='Em andamento'&&before.status!=='Em andamento')notify({type:'inicio',title:'Cooperação iniciada — '+c.cliente+' ('+c.id+')',body:'Operador: '+opName(c.opId)+'\nPlataforma: '+c.plataforma+' · '+c.depositantes+' depositantes'});
    else if(st==='Finalizada')notify({type:'fim',title:'Cooperação finalizada, aguardando análise — '+c.cliente+' ('+c.id+')',body:resumo(c)});
    else if(st==='Concluída')notify({type:'fim',title:(c.tipo==='bau'?'Baú':'Cooperação')+' concluíd'+(c.tipo==='bau'?'o':'a')+' — '+(c.plataforma||c.cliente),body:resumoCurto(c)});
    else toast(st==='Lixeira'?'Movida para a lixeira':'Status: '+st);},
  saveConta:function(coopId,conta,silent){const isNew=!conta.id;const prev=isNew?null:(coop(coopId).contas.find(function(x){return x.id===conta.id;})||null);
    update(function(d){const c=d.coops.find(function(x){return x.id===coopId;});const clean=Object.assign({},conta,{deposito:+conta.deposito||0,redeposito:+conta.redeposito||0,saque:conta.status==='Sacado'?(+conta.saque||0):(+conta.saque||0)});
      if(isNew){clean.id='k'+Date.now();clean.criada=iso(TODAY);c.contas.push(clean);}else{c.contas=c.contas.map(function(x){return x.id===conta.id?Object.assign({},x,clean):x;});}});
    const c=coop(coopId);if(conta.status==='Bloqueado'&&(!prev||prev.status!=='Bloqueado'))notify({type:'bloqueio',title:'Conta bloqueada — '+c.plataforma,body:'Operador: '+opName(c.opId)+'\nConta: '+conta.usuario+' ('+c.id+')\nDepósito retido: '+MS7.brl((+conta.deposito||0)+(+conta.redeposito||0))});else if(!silent)toast(isNew?'Conta adicionada':'Conta atualizada');
    if(prev&&prev.ciclo&&(+conta.saque||0)>(+prev.saque||0)){const L=saqDepois[coopId]=(saqDepois[coopId]||[]).filter(function(x){return x.id!==conta.id;});L.push({id:conta.id,v:+conta.saque||0});}
    clearTimeout(cicloTimers[coopId]);const cx=coop(coopId);if(cx&&temSaqueNovo(cx))cicloTimers[coopId]=setTimeout(function(){flushCiclo(coopId);},300000);},
  removeConta:function(coopId,contaId){update(function(d){const c=d.coops.find(function(x){return x.id===coopId;});c.contas=c.contas.filter(function(x){return x.id!==contaId;});});toast('Conta removida');},
  fecharCiclo:function(coopId,auto){clearTimeout(cicloTimers[coopId]);const c0=coop(coopId);let lista=c0.contas.filter(function(k){return !k.ciclo&&contaFechada(k);});if(!lista.length&&!auto)lista=c0.contas.filter(function(k){return !k.ciclo&&String(k.usuario||'').trim();});
    if(!lista.length){toast('Nenhuma conta nova para fechar o ciclo');return;}const ids=lista.map(function(k){return k.id;});
    update(function(d){const c=d.coops.find(function(x){return x.id===coopId;});c.ciclos=(c.ciclos||0)+1;c.contas.forEach(function(k){if(ids.indexOf(k.id)>=0)k.ciclo=c.ciclos;});});const c=coop(coopId);
    notify({type:'ciclo',title:'Ciclo '+c.ciclos+' — '+[coopNome(c),c.linkN&&String(coopNome(c)).toLowerCase().indexOf(String(c.linkN).toLowerCase())<0?c.linkN:''].filter(Boolean).join(' · '),body:resumoCiclo(c,lista)});if(auto)toast('Ciclo '+c.ciclos+' fechado: '+lista.length+' contas enviadas ao admin');else toast(lista.length+(lista.length===1?' conta enviada':' contas enviadas')+' ao admin');},
  contarExemplo:function(){let n=0;COLS.forEach(function(k){(db[k]||[]).forEach(function(x){if(isSeedItem(k,x))n++;});});return {total:n,coops:(db.coops||[]).filter(function(x){return isSeedItem('coops',x);}).length,ops:(db.operadores||[]).filter(function(x){return isSeedItem('operadores',x);}).length};},
  limparExemplo:function(){let n=0;update(function(d){COLS.forEach(function(k){if(!Array.isArray(d[k]))return;const b=d[k].length;d[k]=d[k].filter(function(x){return !isSeedItem(k,x);});n+=b-d[k].length;});delete d._demo;});toast(n?n+' itens de exemplo apagados. Seus dados foram mantidos.':'Não há dados de exemplo');return n;},
  setColsHide:function(coopId,h){update(function(d){const c=d.coops.find(function(x){return x.id===coopId;});if(c)c.colsHide=Object.assign({},h);});},
  setPixGrupos:function(coopId,ids){update(function(d){const c=d.coops.find(function(x){return x.id===coopId;});if(c)c.pixGrupos=ids.slice();});toast(ids.length?ids.length+(ids.length===1?' grupo liberado':' grupos liberados')+' para o operador':'Grupos removidos');},
  setCicloContas:function(coopId,n){update(function(d){const c=d.coops.find(function(x){return x.id===coopId;});c.cicloContas=n;});},
  addCusto:function(x){update(function(d){d.custos.unshift(Object.assign({id:Date.now(),data:iso(TODAY)},x));});toast('Custo registrado');},
  removeCusto:function(id){update(function(d){d.custos=d.custos.filter(function(x){return x.id!==id;});});},
  pagar:function(opId,valor,semana){update(function(d){d.pagamentos.push({id:'p'+Date.now(),opId:opId,valor:valor,data:iso(TODAY),semana:semana||null});});toast('Pagamento de '+MS7.brl(valor)+' registrado');},
  setConfig:function(k,v){update(function(d){d.config[k]=v;});},
  saveOperador:function(o){update(function(d){if(o.id&&d.operadores.some(function(x){return x.id===o.id;}))d.operadores=d.operadores.map(function(x){return x.id===o.id?Object.assign({},x,o):x;});else d.operadores.push(Object.assign({ativo:true,ciclo:7,pct:15},o,{id:o.id||'op'+Date.now()}));});toast('Operador salvo');},
  removeOperador:function(id){update(function(d){d.operadores=d.operadores.filter(function(x){return x.id!==id;});});},

  pixSaveGrupo:function(g){update(function(d){if(g.id)d.pix=d.pix.map(function(x){return x.id===g.id?Object.assign({},x,g):x;});else d.pix.push(Object.assign({id:'g'+Date.now(),ativo:true,chaves:[]},g));});toast(g.id?'Lote salvo':'Lote criado');},
  pixRemoveGrupo:function(id){update(function(d){d.pix=d.pix.filter(function(x){return x.id!==id;});});toast('Lote removido');},
  pixAddChaves:function(gid,items){let ins=0,ex=[];const seen={};db.pix.forEach(function(g){g.chaves.forEach(function(k){seen[PIXV.key(k.tipo,k.valor)]=g.nome;});});
    update(function(d){const g=d.pix.find(function(x){return x.id===gid;});items.forEach(function(it,i){const kk=PIXV.key(it.tipo,it.valor);if(seen[kk]){ex.push(it.valor+' (já em '+seen[kk]+')');return;}seen[kk]=g.nome;ins++;
      g.chaves.push({id:'x'+Date.now()+'-'+i,tipo:it.tipo,valor:PIXV.format(it.tipo,it.valor),por:{}});});});
    toast(ins+(ins===1?' chave adicionada':' chaves adicionadas')+(ex.length?' · '+ex.length+' já existiam':''));return {inserted:ins,existentes:ex};},
  pixSetStatus:function(gid,kids,status,gps){kids=[].concat(kids);gps=gps&&gps.length?gps:PIXV.grupos(db);update(function(d){const g=d.pix.find(function(x){return x.id===gid;});if(!g)return;
      g.chaves.forEach(function(k){if(kids.indexOf(k.id)<0)return;k.por=k.por||{};gps.forEach(function(n){const e=k.por[n];
        if(status==='disponivel'){if(e&&e.conta){const c=d.coops.find(function(x){return x.id===e.conta.coopId;});if(c)c.contas.forEach(function(ct){if(ct.id===e.conta.contaId&&ct.pix===k.valor)ct.pix='';});}delete k.por[n];}
        else k.por[n]={status:status,conta:(e&&e.conta)||null,em:iso(TODAY)};});});});
    toast(kids.length+(kids.length===1?' chave ':' chaves ')+({disponivel:'liberada(s)',usada:'marcada(s) como usada(s)',bloqueada:'bloqueada(s)'}[status])+(gps.length===1?' no '+gps[0]:' em todos os grupos'));},
  pixRemoveChave:function(gid,kid){update(function(d){const g=d.pix.find(function(x){return x.id===gid;});g.chaves=g.chaves.filter(function(k){return k.id!==kid;});});toast('Chave removida');},
  pixAtribuir:function(coopId,contaId,valor){let msg='',gname='';update(function(d){const c=d.coops.find(function(x){return x.id===coopId;});const ct=c&&c.contas.find(function(x){return x.id===contaId;});if(!ct)return;const prev=ct.pix;const n=PIXV.gp(d,c.plataforma)||'Geral';gname=n;
      const nN=platNorm(n);d.pix.forEach(function(g){g.chaves.forEach(function(k){k.por=k.por||{};const ks=Object.keys(k.por).filter(function(x){return platNorm(x)===nN;});
        if(prev&&mesmaCh(k,prev))ks.forEach(function(x){const e=k.por[x];if(e&&e.conta&&e.conta.coopId===coopId&&e.conta.contaId===contaId){if(e.status==='usada')delete k.por[x];else e.conta=null;}});
        if(valor&&mesmaCh(k,valor)){const kk=Object.keys(k.por).filter(function(x){return platNorm(x)===nN;});const cur=kk.map(function(x){return k.por[x];}).find(function(e){return e&&e.status==='bloqueada';});kk.forEach(function(x){if(x!==n)delete k.por[x];});const bl=cur&&cur.status==='bloqueada';if(bl)msg='Atenção: essa chave está bloqueada no '+n;k.por[n]={status:bl?'bloqueada':'usada',conta:{coopId:coopId,contaId:contaId,usuario:ct.usuario},em:iso(TODAY)};}});});
      ct.pix=valor;});
    toast(msg||(valor?'Chave reservada no '+gname:'Chave liberada no '+gname));},
  renamePlataforma:function(id,nome){nome=String(nome||'').trim();if(!nome)return;if(db.plataformas.some(function(x){return x.id!==id&&x.nome.toLowerCase()===nome.toLowerCase();})){toast('Já existe: '+nome);return;}
    update(function(d){const p=d.plataformas.find(function(x){return x.id===id;});if(!p)return;const old=p.nome;const oldG=p.grupo||old;p.nome=nome;
      d.coops.forEach(function(c){if(c.plataforma===old)c.plataforma=nome;});d.pix.forEach(function(g){if(g.plataforma===old)g.plataforma=nome;});
      d.pix.forEach(function(g){g.chaves.forEach(function(k){if(k.por&&k.por[old]){k.por[nome]=k.por[old];delete k.por[old];}});});});
    toast('Plataforma renomeada para '+nome);},
  setPlataformaGrupo:function(id,grupo){let nw='';update(function(d){const p=d.plataformas.find(function(x){return x.id===id;});if(!p)return;const old=p.grupo||p.nome;p.grupo=String(grupo||'').trim();nw=p.grupo||p.nome;if(old===nw)return;
      const still=d.plataformas.some(function(x){return (x.grupo||x.nome)===old;});const exists=d.plataformas.some(function(x){return x!==p&&(x.grupo||x.nome)===nw;});
      if(!still&&!exists)d.pix.forEach(function(g){g.chaves.forEach(function(k){if(k.por&&k.por[old]){k.por[nw]=k.por[old];delete k.por[old];}});});});
    toast('Grupo de plataformas: '+nw);},
  addLista:function(col,nome,extra){nome=String(nome||'').trim();if(!nome)return;if(db[col].some(function(x){return x.nome.toLowerCase()===nome.toLowerCase();})){toast('Já existe: '+nome);return;}update(function(d){d[col].push(Object.assign({id:col.slice(0,2)+Date.now(),nome:nome},extra||{}));});toast('Adicionado: '+nome);},
  removeLista:function(col,id){update(function(d){d[col]=d[col].filter(function(x){return x.id!==id;});});},
  pontoMarcar:function(opId,campo){const dt=new Date().toLocaleDateString('sv-SE',{timeZone:'America/Sao_Paulo'});const id='pt_'+opId+'_'+dt;
    update(function(d){d.ponto=d.ponto||[];let r=d.ponto.find(function(x){return x.id===id;});if(!r){r={id:id,opId:opId,data:dt};d.ponto.push(r);}if(!r[campo]){r[campo]=Date.now();if(!Sync.on()){const L={entrada:'Entrada',almocoIni:'Saída para almoço',almocoFim:'Volta do almoço',saida:'Saída'};d.pontoLog=[{id:'pl'+Date.now(),tipo:'marcacao',opId:opId,title:opName(opId)+': '+L[campo],body:L[campo]+' às '+new Date(r[campo]).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:'America/Sao_Paulo'}),at:Date.now()}].concat(d.pontoLog||[]).slice(0,200);}}});
    toast({entrada:'Entrada registrada',almocoIni:'Bom almoço! Saída registrada',almocoFim:'Volta do almoço registrada',saida:'Saída registrada. Bom descanso!'}[campo]);},
  pontoPausa:function(opId,motivo){const dt=new Date().toLocaleDateString('sv-SE',{timeZone:'America/Sao_Paulo'});const id='pt_'+opId+'_'+dt;let ok=false;
    update(function(d){d.ponto=d.ponto||[];const r=d.ponto.find(function(x){return x.id===id;});if(!r||!r.entrada||r.saida)return;const P=(r.pausas||[]).slice();if(P.length&&!P[P.length-1].fim)return;P.push({ini:Date.now(),motivo:String(motivo||'Compromisso').slice(0,60)});r.pausas=P;ok=true;
      d.pontoLog=[{id:'pl'+Date.now(),tipo:'pausa',title:opName(opId)+' saiu: '+motivo,body:'Pausa iniciada às '+new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:'America/Sao_Paulo'}),at:Date.now()}].concat(d.pontoLog||[]).slice(0,200);});
    if(ok)toast('Pausa iniciada. Quando voltar, toque em Voltar ao trabalho');},
  pontoVolta:function(opId){const dt=new Date().toLocaleDateString('sv-SE',{timeZone:'America/Sao_Paulo'});const id='pt_'+opId+'_'+dt;let min=0,mot='';
    update(function(d){const r=(d.ponto||[]).find(function(x){return x.id===id;});if(!r||!r.pausas||!r.pausas.length)return;const P=r.pausas.map(function(p){return Object.assign({},p);});const u=P[P.length-1];if(u.fim)return;u.fim=Date.now();r.pausas=P;min=Math.round((u.fim-u.ini)/60000);mot=u.motivo;
      d.pontoLog=[{id:'pl'+Date.now(),tipo:'pausa',title:opName(opId)+' voltou ('+mot+')',body:'Ficou '+min+' min fora',at:Date.now()}].concat(d.pontoLog||[]).slice(0,200);});
    toast('Bem-vindo de volta! Pausa de '+min+' min');},
  pontoSalvar:function(r,oldId){update(function(d){d.ponto=(d.ponto||[]).filter(function(x){return x.id!==oldId&&x.id!==r.id;});d.ponto.push(Object.assign({},r,{ajustadoEm:Date.now(),_u:Date.now()}));});toast('Registro de ponto salvo');},
  pontoRemover:function(id){update(function(d){d.ponto=(d.ponto||[]).filter(function(x){return x.id!==id;});});toast('Registro removido');},
  reset:function(){if(Sync.on()||db._restrito){toast('Desconecte o servidor antes de restaurar os dados de exemplo');return;}localStorage.removeItem(KEY);db=ensure(seed());save();toast('Dados de exemplo restaurados');}
};
function exportCSV(name,cols,rows){
  const esc=function(v){v=v==null?'':String(v);return /[;"\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;};
  const num=function(v){return typeof v==='number'?v.toFixed(2).replace('.',','):v;};
  const lines=[cols.map(function(c){return esc(c.label);}).join(';')].concat(rows.map(function(r){return cols.map(function(c){return esc(num(c.get(r)));}).join(';');}));
  const blob=new Blob(['\uFEFF'+lines.join('\n')],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name+'.csv';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);toast('Arquivo '+name+'.csv baixado');
}
const DATA_KEY=/^(metas|tarefas|alunos|proxies|listas|avisos|envios|envios-bau|conferencias)$/;
function usePersist(key,initial){const k='ms7op-p-'+key;useDB();const [,force]=React.useState(0);const shared=DATA_KEY.test(key)&&(!db._restrito||key==='tarefas'||key==='metas');
  function local(){try{const s=localStorage.getItem(k);return s?JSON.parse(s):undefined;}catch(e){return undefined;}}
  function item(){return (db.kv||[]).find(function(x){return x.id===key;});}
  function read(){if(shared||(db._restrito&&key==='metas')){const it=item();if(it)return it.v;}const l=local();return l===undefined?initial:l;}
  React.useEffect(function(){if(shared&&!item()){const l=local();if(l!==undefined)update(function(d){d.kv=(d.kv||[]).concat([{id:key,v:l}]);});}},[]);
  const set=function(nv){const val=typeof nv==='function'?nv(read()):nv;localStorage.setItem(k,JSON.stringify(val));
    if(shared)update(function(d){d.kv=(d.kv||[]).filter(function(x){return x.id!==key;}).concat([{id:key,v:val}]);});else force(function(x){return x+1;});};
  return [read(),set];}
const COM_LABEL={pct:'% do lucro',conta:'Por conta',fixo:'Valor fixo',misto:'Fixo + por conta',rolo:'Com R / sem R'};
function comText(c){return c.comTipo==='rolo'?MS7.brl(c.comR!=null?c.comR:2)+' com R · '+MS7.brl(c.comS!=null?c.comS:1.5)+' sem R':c.comTipo==='misto'?MS7.brl(c.comValor)+' fixo + '+MS7.brl(c.comConta||0)+' por conta':c.comTipo==='pct'?c.comValor+'% do lucro':c.comTipo==='conta'?MS7.brl(c.comValor)+' por conta':MS7.brl(c.comValor)+' fixo';}
window.PIXV=PIXV;window.DB={Sync:Sync,get:function(){return db;},useDB:useDB,calc:calc,pixOrd:pixOrd,proxLink:proxLink,contasValidas:contasValidas,comData:comData,linkId:linkId,dIso:dIso,dIni:dIni,semanaIni:semanaIni,comissoesDe:comissoesDe,contaUsada:contaUsada,saqEf:saqEf,contaOperada:contaOperada,agg:agg,coopsFor:coopsFor,inPeriod:inPeriod,coopNome:coopNome,platNorm:platNorm,opName:opName,coop:coop,A:A,today:TODAY,iso:iso,fmtDate:fmtDate,contaRes:contaRes,contaPronta:contaPronta,temSaqueNovo:temSaqueNovo,cicloTam:cicloTam,COM_LABEL:COM_LABEL,comText:comText};
window.exportCSV=exportCSV;window.usePersist=usePersist;
})();

(function(){const NS=window.MS7DesignSystem_5d5172;if(!NS||!NS.Badge||NS.Badge._ms7)return;const B0=NS.Badge,CLARO={yellow:1,turquoise:1,electric:1};const B=function(p){p=p||{};if(p.variant!=='soft'&&CLARO[p.tone])return React.createElement(B0,Object.assign({},p,{style:Object.assign({color:'#1A1A1A'},p.style)}));return React.createElement(B0,p);};B._ms7=1;try{NS.Badge=B;}catch(e){}})();
(function(){const NS=window.MS7DesignSystem_5d5172;if(!NS||!NS.Avatar||NS.Avatar._ms7)return;const h=React.createElement;
const A=function(p){p=p||{};const size=p.size||40,name=p.name||'';const ini=name?name.split(' ').filter(Boolean).map(function(x){return x.charAt(0);}).slice(0,2).join('').toUpperCase():'';
  const inner=h('span',{style:{width:size,height:size,borderRadius:p.shape==='circle'||!p.shape?'50%':'var(--radius-sm)',overflow:'hidden',background:'var(--ms7-green-900, #005D3B)',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-sans)',fontWeight:700,fontSize:Math.round(size*0.38)}},p.src?h('img',{src:p.src,alt:name,style:{width:'100%',height:'100%',objectFit:'cover'}}):ini||(NS.Icon?h(NS.Icon,{name:'user',size:Math.round(size*0.6),color:'#FFFFFF',strokeWidth:2}):null));
  return h('span',{style:Object.assign({position:'relative',display:'inline-flex',width:size,height:size,flexShrink:0},p.style)},inner,p.online?h('span',{style:{position:'absolute',right:0,bottom:0,width:Math.max(8,size*0.24),height:Math.max(8,size*0.24),borderRadius:'50%',background:'var(--ms7-green)',border:'2px solid var(--surface-card)'}}):null);};
A._ms7=1;try{NS.Avatar=A;}catch(e){}})();
