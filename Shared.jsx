(function(){
const DS=window.MS7DesignSystem_5d5172;
function KpiRow({items,min}){return <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax('+(min||200)+'px,1fr))',gap:16}}>{items.map(function(k){const lab=k.signed!=null&&k.signed<0&&/Lucro/i.test(k.label)?k.label.replace(/Lucro líquido|Lucro/i,'Prejuízo'):k.label;return <DS.StatCard key={k.label} variant="compact" icon={k.icon} value={k.value} label={lab} tone={k.tone} trend={k.trend} trendTone={k.trendTone} valueColor={k.signed==null?undefined:(k.signed>=0?'var(--ms7-green)':'var(--ms7-error)')}/>;})}</div>;}
function PeriodBar({value,onChange,children}){
  return <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
    <DS.Tabs variant="chips" value={value} onChange={onChange} items={['Hoje','7 dias','30 dias','Todos']}/>
    {children}
    <DS.Button size="sm" variant="ghost" iconLeft="refresh-cw" style={{marginLeft:'auto'}} onClick={function(){toast('Dados atualizados');}}>Atualizar</DS.Button>
  </div>;
}
function Grid({cols,min,children,gap}){return <div style={{display:'grid',gridTemplateColumns:cols||('repeat(auto-fit,minmax('+(min||320)+'px,1fr))'),gap:gap||24,alignItems:'start'}}>{children}</div>;}
function Money({v,signed}){return <span style={{fontWeight:700,fontVariantNumeric:'tabular-nums',color:signed?(v>=0?'var(--ms7-green)':'var(--ms7-error)'):'inherit'}}>{MS7.brl(v)}</span>;}
function Empty({icon,title,sub}){return <div style={{padding:'36px 16px',display:'flex',flexDirection:'column',alignItems:'center',gap:8,textAlign:'center'}}><span style={{width:44,height:44,borderRadius:12,background:'var(--ms7-gray-100)',display:'flex',alignItems:'center',justifyContent:'center'}}><DS.Icon name={icon||'inbox'} size={22}/></span><b style={{fontSize:15}}>{title}</b>{sub?<span style={{fontSize:13,color:'var(--text-secondary)',fontWeight:500}}>{sub}</span>:null}</div>;}
function RankList({rows,valueKey,fmt}){return <div style={{display:'flex',flexDirection:'column'}}>{rows.map(function(r,i){return <div key={r.nome} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:i<rows.length-1?'1px solid var(--border-subtle)':'none'}}>
  <span style={{width:24,height:24,borderRadius:6,background:i===0?'var(--ms7-lime-500)':'var(--ms7-gray-100)',color:i===0?'var(--ms7-green-900)':'var(--text-primary)',fontSize:11,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center'}}>{String(i+1).padStart(2,'0')}</span>
  <span style={{flex:1,fontSize:14,fontWeight:600}}>{r.nome}</span><span style={{fontSize:14,fontWeight:700,color:'var(--ms7-green)'}}>{(fmt||MS7.brl)(r[valueKey])}</span></div>;})}</div>;}
let setToastRef=null;
function toast(msg){if(setToastRef)setToastRef(msg);}
function Toaster(){const [m,setM]=React.useState(null);setToastRef=setM;React.useEffect(function(){if(!m)return;const t=setTimeout(function(){setM(null);},2400);return function(){clearTimeout(t);};},[m]);
  return m?<div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',zIndex:2000,background:'var(--ms7-black)',color:'#fff',padding:'12px 18px',borderRadius:12,fontFamily:'var(--font-sans)',fontSize:14,fontWeight:600,display:'flex',alignItems:'center',gap:10,boxShadow:'var(--shadow-pop)'}}><DS.Icon name="circle-check" size={18} color="var(--ms7-lime-500)"/>{m}</div>:null;}
function Hint({children}){return <p style={{margin:'0 0 14px',fontSize:13,fontWeight:500,color:'var(--text-secondary)'}}>{children}</p>;}
const NKEY='ms7op-notifs',PKEY='ms7op-notif-prefs';
const NTYPES={ponto:{label:'Controle de ponto',icon:'clock',tone:'var(--ms7-orange)'},ciclo:{label:'Ciclo de contas fechado',icon:'repeat',tone:'var(--ms7-blue)'},inicio:{label:'Cooperação iniciada',icon:'play',tone:'var(--ms7-green)'},fim:{label:'Cooperação finalizada',icon:'flag',tone:'var(--ms7-purple)'},bloqueio:{label:'Conta bloqueada',icon:'shield-alert',tone:'var(--ms7-error)'},tarefa:{label:'Nova tarefa',icon:'square-check',tone:'var(--ms7-green)'},alerta:{label:'Alertas do painel',icon:'triangle-alert',tone:'var(--ms7-orange)'}};
function readJ(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v;}catch(e){return d;}}
function getPrefs(){return Object.assign({ciclo:true,inicio:true,fim:true,bloqueio:true},readJ(PKEY,{}));}
function setPref(k,v){const p=getPrefs();p[k]=v;localStorage.setItem(PKEY,JSON.stringify(p));}
if(!localStorage.getItem(NKEY)){localStorage.setItem(NKEY,JSON.stringify([
{id:1,type:'bloqueio',title:'Conta bloqueada — Vértice',body:'Operador: Diego Ramos\nConta: caio512 (C-1046)\nDepósito retido: R$ 740,00',at:'18:42',read:false},
{id:2,type:'ciclo',title:'Ciclo fechado — Equipe Aurora (C-1047)',body:'Operador: Bruna Costa\nDepósito: R$ 12.480,00 · Saque: R$ 15.920,00\nResultado: LUCRO de R$ 3.440,00',at:'17:05',read:false},
{id:3,type:'inicio',title:'Cooperação iniciada — Grupo Horizonte (C-1048)',body:'Operador: Lucas Martins\nPlataforma: Vértice · 32 depositantes',at:'09:12',read:true}]));}
const nsubs=[];let pushRef=null;
function getNotifs(){return readJ(NKEY,[]);}
function notifyLocal(n){const it=Object.assign({id:Date.now()+Math.random(),at:new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}),read:false},n);saveNotifs([it].concat(getNotifs()).slice(0,60));if(pushRef)pushRef(it);
  try{if(document.hidden&&window.Notification&&Notification.permission==='granted'&&navigator.serviceWorker){navigator.serviceWorker.getRegistration().then(function(r){if(r)r.showNotification(it.title,{body:String(it.body||''),tag:'ms7-'+(n.type||'x')+'-'+it.id,icon:'icon-192.png'});});}}catch(e){}}
function TarefasWatcher({opId}){DB.useDB();const db=DB.get();const it=(db.kv||[]).find(function(x){return x&&x.id==='tarefas';});const L=it&&Array.isArray(it.v)?it.v:[];
  React.useEffect(function(){if(!opId)return;const K='ms7op-tarefas-vistas-'+opId;let vis=null;try{vis=JSON.parse(localStorage.getItem(K)||'null');}catch(e){}const meus=L.filter(function(t){return t&&(t.resp||'admin')===opId;});const ids=meus.map(function(t){return t.id;});
    if(vis===null){localStorage.setItem(K,JSON.stringify(ids));return;}const novas=meus.filter(function(t){return vis.indexOf(t.id)<0&&t.criadoPor!==opId;});
    novas.forEach(function(t){notifyLocal({type:'tarefa',title:(t.prio==='urgente'?'Tarefa URGENTE: ':'Nova tarefa: ')+t.txt,body:(t.data?'Para '+t.data.split('-').reverse().slice(0,2).join('/'):'')+(t.hora?' às '+t.hora:'')});});
    if(novas.length||ids.length!==vis.length)localStorage.setItem(K,JSON.stringify(ids));},[JSON.stringify(L.map(function(t){return t&&t.id;})),opId]);
  return null;}
function tarefasPend(db,resp){const it=(db.kv||[]).find(function(x){return x&&x.id==='tarefas';});const L=it&&Array.isArray(it.v)?it.v:[];const h=new Date().toLocaleDateString('sv-SE',{timeZone:'America/Sao_Paulo'});const dw=new Date(h+'T12:00:00').getDay();
  return L.filter(function(t){if(!t||(t.resp||'admin')!==resp)return false;if(t.rep==='diaria'){if(t.data&&h<t.data)return false;if(t.dias&&t.dias.length&&t.dias.indexOf(dw)<0)return false;return !(t.feitos&&t.feitos[h]);}return !t.feitoEm&&t.data&&t.data<=h;}).length;}
function saveNotifs(l){localStorage.setItem(NKEY,JSON.stringify(l));nsubs.forEach(function(f){f(l);});}
function notify(n){if(getPrefs()[n.type]===false){toast((NTYPES[n.type]||NTYPES.ciclo).label+' (notificação desativada)');return;}const it=Object.assign({id:Date.now()+Math.random(),at:new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}),read:false},n);saveNotifs([it].concat(getNotifs()).slice(0,60));if(pushRef)pushRef(it);if(window.ms7Push){const b=String(it.body||'').replace(/\*/g,'');if(n.local){if(!window.ms7Push.isRemote()&&getPrefs().__device!==false)window.ms7Push.show(it.title,b,it.type);}else{const tg=it.type+'-'+Math.round(it.id);const sent=window.ms7Push.remote(it.title,b,tg);if(!sent&&getPrefs().__device!==false)window.ms7Push.show(it.title,b,tg);}}}
function useNotifs(){const [l,setL]=React.useState(getNotifs);React.useEffect(function(){nsubs.push(setL);return function(){nsubs.splice(nsubs.indexOf(setL),1);};},[]);return l;}
function resultLine(v){return 'Resultado: '+(v>=0?'LUCRO de ':'PREJUÍZO de ')+MS7.brl(Math.abs(v));}
function PushPreview(){const [it,setIt]=React.useState(null);pushRef=setIt;React.useEffect(function(){if(!it)return;const t=setTimeout(function(){setIt(null);},7000);return function(){clearTimeout(t);};},[it]);
  if(!it)return null;const T=(NTYPES[it.type]||NTYPES.ciclo);
  return <div onClick={function(){setIt(null);}} style={{position:'fixed',top:20,right:20,zIndex:2100,width:360,maxWidth:'calc(100vw - 40px)',background:'rgba(28,30,28,0.96)',backdropFilter:'blur(12px)',color:'#F3F5F2',borderRadius:18,padding:14,boxShadow:'0 16px 40px rgba(0,0,0,.35)',fontFamily:'var(--font-sans)',cursor:'pointer'}}>
    <div style={{display:'flex',alignItems:'center',gap:8,fontSize:12,fontWeight:600,color:'#B8BEB7',marginBottom:8}}><span style={{width:20,height:20,borderRadius:6,background:'#2AABEE',display:'flex',alignItems:'center',justifyContent:'center'}}><DS.Icon name="send" size={12} color="#fff" strokeWidth={2.2}/></span><span style={{flex:1}}>TELEGRAM · MS7 Bot</span><span>agora</span></div>
    <div style={{display:'flex',gap:10}}><span style={{width:34,height:34,borderRadius:10,background:T.tone,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><DS.Icon name={T.icon} size={18} color="#fff" strokeWidth={2}/></span>
    <div style={{minWidth:0}}><div style={{fontSize:14,fontWeight:700,marginBottom:2}}>{it.title}</div><div style={{fontSize:13,fontWeight:500,lineHeight:1.45,whiteSpace:'pre-line',color:'#DADFD9'}}>{it.body}</div></div></div>
  </div>;}
function NotifPanel({onClose}){const l=useNotifs();
  return <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:1500}}><div onClick={function(e){e.stopPropagation();}} style={{position:'absolute',top:84,right:32,width:400,maxWidth:'calc(100vw - 32px)',maxHeight:'70vh',display:'flex',flexDirection:'column',background:'var(--surface-card)',color:'var(--text-primary)',borderRadius:16,boxShadow:'var(--shadow-pop)',fontFamily:'var(--font-sans)',overflow:'hidden'}}>
    <div style={{display:'flex',alignItems:'center',gap:8,padding:'14px 16px',borderBottom:'1px solid var(--border-subtle)'}}><b style={{flex:1,fontSize:16}}>Notificações</b><DS.Button size="sm" variant="ghost" onClick={function(){saveNotifs(l.map(function(n){return Object.assign({},n,{read:true});}));}}>Marcar como lidas</DS.Button></div>
    <div style={{overflowY:'auto'}}>{l.length?l.map(function(n){const T=NTYPES[n.type]||NTYPES.ciclo;return <div key={n.id} style={{display:'flex',gap:10,padding:'12px 16px',borderBottom:'1px solid var(--border-subtle)',background:n.read?'transparent':'var(--ms7-gray-50)'}}>
      <span style={{width:32,height:32,borderRadius:9,background:T.tone,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><DS.Icon name={T.icon} size={16} color="#fff" strokeWidth={2}/></span>
      <div style={{flex:1,minWidth:0}}><div style={{display:'flex',gap:8}}><b style={{flex:1,fontSize:13}}>{n.title}</b><span style={{fontSize:11,fontWeight:600,color:'var(--text-secondary)'}}>{n.at}</span></div><div style={{fontSize:12,fontWeight:500,lineHeight:1.45,whiteSpace:'pre-line',color:'var(--text-secondary)',marginTop:2}}>{n.body}</div></div></div>;}):<Empty icon="bell" title="Sem notificações"/>}</div>
  </div></div>;}
Object.assign(window,{notify:notify,useNotifs:useNotifs,NotifPanel:NotifPanel,TarefasWatcher:TarefasWatcher,tarefasPend:tarefasPend,notifyLocal:notifyLocal,PushPreview:PushPreview,NTYPES:NTYPES,getPrefs:getPrefs,setPref:setPref,resultLine:resultLine,KpiRow:KpiRow,PeriodBar:PeriodBar,Grid:Grid,Money:Money,Empty:Empty,RankList:RankList,toast:toast,Toaster:Toaster,Hint:Hint});
})();