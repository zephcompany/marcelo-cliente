(function(){
const DS=window.MS7DesignSystem_5d5172;
const TZ='America/Sao_Paulo';
const F=[['entrada','Entrada','log-in'],['almocoIni','Saída almoço','utensils'],['almocoFim','Volta almoço','coffee'],['saida','Saída','log-out']];
const PERS=['Hoje','7 dias','30 dias','Este mês','Mês passado'];
function dstr(x){return x.toLocaleDateString('sv-SE',{timeZone:TZ});}
function hoje(){return dstr(new Date());}
function hm(ms){return ms?new Date(ms).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:TZ}):'—';}
function dur(m){if(m==null||isNaN(m))return '—';const s=m<0?'−':'';m=Math.abs(Math.round(m));return s+Math.floor(m/60)+'h'+String(m%60).padStart(2,'0');}
function toMs(date,t){return t?new Date(date+'T'+t+':00-03:00').getTime():null;}
function inHM(ms){return ms?hm(ms):'';}
function diaLabel(ds){return new Date(ds+'T12:00:00-03:00').toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'2-digit',timeZone:TZ});}
function range(per){const t=hoje();const b=new Date(t+'T12:00:00-03:00');const back=function(n){return dstr(new Date(b.getTime()-n*86400000));};
  if(per==='Hoje')return [t,t];if(per==='7 dias')return [back(6),t];if(per==='30 dias')return [back(29),t];if(per==='Este mês')return [t.slice(0,8)+'01',t];
  const y=+t.slice(0,4),m=+t.slice(5,7);const py=m===1?y-1:y,pm=m===1?12:m-1;const last=new Date(Date.UTC(py,pm,0)).getUTCDate();const mm=String(pm).padStart(2,'0');return [py+'-'+mm+'-01',py+'-'+mm+'-'+last];}
function cfg(db,opId){const c=Object.assign({entrada:'09:00',jornada:8,tolerancia:10,almoco:60},(db.config&&db.config.ponto)||{});const o=(db.operadores||[]).find(function(x){return x.id===opId;})||{};
  return {entrada:o.pontoEntrada||c.entrada,jornada:+(o.pontoJornada||c.jornada)||8,tolerancia:+c.tolerancia||0,almoco:+c.almoco||60};}
function calc(r,db){const live=r.data===hoje();const n=Date.now();
  if(!r.entrada)return {estado:'ausente',trab:0,atraso:null,saldo:null,fora:0};
  const end=r.saida||(live?n:null);let pausa=0;if(r.almocoIni){const pe=r.almocoFim||r.saida||(live?n:r.almocoIni);pausa=pe-r.almocoIni;}
  const PP=r.pausas||[];let fora=0;PP.forEach(function(x){const fe=x.fim||r.saida||(live?n:x.ini);fora+=Math.max(0,fe-x.ini);});pausa+=fora;const emPausa=PP.length&&!PP[PP.length-1].fim?PP[PP.length-1]:null;
  const trab=end?Math.max(0,(end-r.entrada-pausa)/60000):Math.max(0,((r.almocoIni||r.entrada)-r.entrada)/60000);
  const c=cfg(db,r.opId);const prev=toMs(r.data,c.entrada);const late=(r.entrada-prev)/60000;const atraso=late>c.tolerancia?late:0;
  const estado=r.saida?'encerrado':!live?'incompleto':r.almocoIni&&!r.almocoFim?'almoco':emPausa?'pausa':'trabalhando';
  return {estado:estado,trab:trab,atraso:atraso,saldo:r.saida?trab-c.jornada*60:null,jornada:c.jornada,fora:fora/60000,emPausa:emPausa};}
const EST={ausente:['Não chegou','gray'],trabalhando:['Trabalhando','green'],almoco:['No almoço','yellow'],pausa:['Em pausa','orange'],encerrado:['Encerrou','blue'],incompleto:['Sem saída','error']};
const MOTIVOS=[['Dentista','smile'],['Médico','stethoscope'],['Academia','dumbbell'],['Banco','landmark'],['Assunto pessoal','user'],['Outro','more-horizontal']];
function cron(ms){ms=Math.max(0,ms);const t=Math.floor(ms/1000);return String(Math.floor(t/3600)).padStart(2,'0')+':'+String(Math.floor(t%3600/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0');}
function pausasTxt(r){return (r.pausas||[]).map(function(x){return x.motivo+' '+hm(x.ini)+(x.fim?'–'+hm(x.fim):' (fora)');}).join(' · ');}
function PausaModal({open,onClose,onGo}){const [m,setM]=React.useState('');const [o,setO]=React.useState('');React.useEffect(function(){if(open){setM('');setO('');}},[open]);
  const final=m==='Outro'?o.trim():m;
  return <DS.Modal open={open} onClose={onClose} title="Sair para um compromisso" subtitle="O tempo fora não conta como trabalhado. Quando voltar, toque em Voltar ao trabalho." size="sm" footer={<React.Fragment><DS.Button variant="secondary" onClick={onClose}>Cancelar</DS.Button><DS.Button variant="brand" iconLeft="pause" disabled={!final} onClick={function(){onGo(final);}}>Iniciar pausa</DS.Button></React.Fragment>}>
    <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:8}}>{MOTIVOS.map(function(x){const on=m===x[0];return <button key={x[0]} type="button" onClick={function(){setM(x[0]);}} style={{display:'flex',alignItems:'center',gap:8,minHeight:48,padding:'10px 12px',borderRadius:12,border:on?'2px solid #005D3B':'1px solid var(--border-default)',background:on?'var(--ms7-lime-100)':'var(--surface-card)',color:'var(--text-primary)',font:'700 14px var(--font-sans)',cursor:'pointer',textAlign:'left'}}><DS.Icon name={x[1]} size={18}/>{x[0]}</button>;})}</div>
    {m==='Outro'?<div style={{marginTop:12}}><DS.Input label="Qual compromisso?" placeholder="Ex.: buscar filho na escola" value={o} onChange={function(e){setO(e.target.value);}}/></div>:null}
  </DS.Modal>;}
function useTick(ms){const [,set]=React.useState(0);React.useEffect(function(){const t=setInterval(function(){set(function(x){return x+1;});},ms);return function(){clearInterval(t);};},[]);}
function rowsOf(db,opId,per){const rg=range(per);return (db.ponto||[]).filter(function(p){return (!opId||p.opId===opId)&&p.data>=rg[0]&&p.data<=rg[1];});}
function resumo(db,list){const o={dias:0,min:0,atrasos:0,minAtraso:0,saldo:0,semSaida:0};list.forEach(function(r){const c=calc(r,db);if(!r.entrada)return;o.dias++;o.min+=c.trab;if(c.atraso>0){o.atrasos++;o.minAtraso+=c.atraso;}if(c.saldo!=null)o.saldo+=c.saldo;if(c.estado==='incompleto')o.semSaida++;});o.media=o.dias?o.min/o.dias:0;return o;}
function St({r,db}){const c=calc(r,db);const e=EST[c.estado];return <DS.Badge size="sm" tone={e[1]}>{e[0]}</DS.Badge>;}
function Saldo({m}){if(m==null)return <span style={{color:'var(--text-secondary)'}}>—</span>;return <b style={{color:m>=0?'var(--ms7-green)':'var(--ms7-error)',fontVariantNumeric:'tabular-nums'}}>{(m>=0?'+':'')+dur(m)}</b>;}
function Marks({r,compact}){return <div style={{display:'grid',gridTemplateColumns:compact?'repeat(2,minmax(0,1fr))':'repeat(4,minmax(0,1fr))',gap:8}}>{F.map(function(f){const on=!!r[f[0]];
  return <div key={f[0]} style={{padding:'10px 12px',borderRadius:12,background:on?'var(--ms7-lime-100)':'var(--ms7-gray-50)',display:'flex',flexDirection:'column',gap:4,minWidth:0}}>
    <span style={{display:'flex',alignItems:'center',gap:5,fontSize:11,fontWeight:700,color:on?'var(--ms7-green-900)':'var(--text-secondary)',lineHeight:1.2}}><DS.Icon name={f[2]} size={13}/>{f[1]}</span>
    <b style={{fontSize:18,fontVariantNumeric:'tabular-nums',color:on?'var(--ms7-green-900)':'var(--text-secondary)'}}>{hm(r[f[0]])}</b></div>;})}</div>;}
function EditModal({r,onClose}){
  const {Modal,Input,Select,Button}=DS;const db=DB.get();const [f,setF]=React.useState(null);
  React.useEffect(function(){if(r)setF({opId:r.opId||((db.operadores[0]||{}).id),data:r.data||hoje(),entrada:inHM(r.entrada),almocoIni:inHM(r.almocoIni),almocoFim:inHM(r.almocoFim),saida:inHM(r.saida),obs:r.obs||''});else setF(null);},[r]);
  if(!r||!f)return null;
  const u=function(k){return function(e){const v=e.target.value;setF(function(p){const n=Object.assign({},p);n[k]=v;return n;});};};
  function save(){if(!f.entrada){toast('Informe pelo menos o horário de entrada');return;}
    const v=F.map(function(x){return toMs(f.data,f[x[0]]);});const set=v.filter(Boolean);for(let i=1;i<set.length;i++)if(set[i]<=set[i-1]){toast('Os horários precisam estar em ordem: entrada, almoço, volta, saída');return;}
    if(f.almocoFim&&!f.almocoIni){toast('Informe a saída para o almoço');return;}
    const id='pt_'+f.opId+'_'+f.data;DB.A.pontoSalvar(Object.assign({},r.id===id?r:{},{id:id,opId:f.opId,data:f.data,entrada:v[0]||0,almocoIni:v[1]||0,almocoFim:v[2]||0,saida:v[3]||0,obs:f.obs,ajustado:true}),r.id&&r.id!==id?r.id:null);onClose();}
  return <Modal open={true} onClose={onClose} title={r.id?'Ajustar ponto':'Novo registro de ponto'} subtitle="Registros ajustados aqui ficam marcados como ajustados pelo admin." footer={<React.Fragment><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button variant="brand" iconLeft="check" onClick={save}>Salvar</Button></React.Fragment>}>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
      <Select label="Operador" value={f.opId} onChange={u('opId')} options={db.operadores.map(function(o){return {value:o.id,label:o.nome};})}/>
      <Input label="Data" type="date" value={f.data} onChange={u('data')}/>
      {F.map(function(x){return <div key={x[0]} style={{display:'flex',alignItems:'flex-end',gap:6}}><div style={{flex:1,minWidth:0}}><Input label={x[1]} type="time" value={f[x[0]]} onChange={u(x[0])}/></div>{f[x[0]]?<DS.IconButton icon="x" size={40} iconSize={16} label={'Apagar '+x[1]} onClick={function(){setF(function(o){const n=Object.assign({},o);n[x[0]]='';if(x[0]==='almocoIni')n.almocoFim='';return n;});}}/>:null}</div>;})}
      {r.id&&f.saida?<div style={{gridColumn:'1 / -1'}}><Button variant="secondary" iconLeft="rotate-ccw" fullWidth onClick={function(){setF(function(o){return Object.assign({},o,{saida:''});});}}>Saída errada: apagar a saída para ele continuar o trabalho</Button></div>:null}
      <div style={{gridColumn:'1 / -1'}}><Input label="Observação" placeholder="Ex.: esqueceu de marcar a saída, atestado, folga" value={f.obs} onChange={u('obs')}/></div>
    </div>
  </Modal>;
}
function AgoraTab({onEdit}){
  const {Card,Avatar,Button,Badge}=DS;const db=DB.useDB();useTick(30000);const t=hoje();const [fil,setFil]=React.useState('');
  const rows=db.operadores.filter(function(o){return o.ativo;}).map(function(o){const r=(db.ponto||[]).find(function(p){return p.id==='pt_'+o.id+'_'+t;})||{opId:o.id,data:t};return {o:o,r:r,c:calc(r,db)};});
  const n=function(k){return rows.filter(function(x){return x.c.estado===k;}).length;};const atr=rows.filter(function(x){return x.c.atraso>0;}).length;
  const GR=[['trabalhando','Trabalhando','var(--ms7-green)'],['pausa','Em pausa','var(--ms7-orange)'],['almoco','No almoço','var(--ms7-yellow)'],['ausente','Não chegaram','var(--ms7-error)'],['encerrado','Encerraram','var(--ms7-blue)']];
  const chip=function(id,label,cor,v){const on=fil===id;return <button key={id} type="button" onClick={function(){setFil(on?'':id);}} style={{display:'inline-flex',alignItems:'center',gap:8,height:38,padding:'0 14px',borderRadius:19,border:'1px solid '+(on?cor:'var(--border-default)'),background:on?'color-mix(in oklab, '+cor+' 16%, var(--surface-card))':'var(--surface-card)',color:'var(--text-primary)',fontFamily:'inherit',fontSize:14,fontWeight:700,cursor:'pointer',transition:'background .15s,border-color .15s'}}><span style={{width:8,height:8,borderRadius:4,background:cor}}></span>{label}<span style={{fontVariantNumeric:'tabular-nums',color:v?'var(--text-primary)':'var(--text-secondary)'}}>{v}</span></button>;};
  const agora=new Date();
  return <div style={{display:'flex',flexDirection:'column',gap:24,maxWidth:1000}}>
    <div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
      <div style={{flex:'1 1 220px'}}><div style={{fontSize:14,fontWeight:700,color:'var(--text-secondary)'}}>{(function(s){return s.charAt(0).toUpperCase()+s.slice(1);})(agora.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',timeZone:TZ}))}</div><div style={{fontSize:26,fontWeight:800,letterSpacing:'-0.01em',marginTop:2}}>{n('trabalhando')+' de '+rows.length+(rows.length===1?' operador trabalhando':' operadores trabalhando')}</div></div>
      {atr?<span style={{display:'inline-flex',alignItems:'center',gap:6,height:32,padding:'0 12px',borderRadius:16,background:'color-mix(in oklab, var(--ms7-error) 14%, transparent)',color:'var(--ms7-error)',fontSize:13,fontWeight:800}}><DS.Icon name="alarm-clock" size={14}/>{atr+(atr===1?' atraso hoje':' atrasos hoje')}</span>:null}
    </div>
    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{GR.map(function(g){return chip(g[0],g[1],g[2],n(g[0]));})}</div>
    {rows.length?GR.filter(function(g){return (!fil||fil===g[0])&&n(g[0]);}).map(function(g){const L=rows.filter(function(x){return x.c.estado===g[0];});return <section key={g[0]} style={{display:'flex',flexDirection:'column',gap:4}}>
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'0 12px 6px'}}><span style={{width:8,height:8,borderRadius:4,background:g[2]}}></span><b style={{fontSize:13,fontWeight:800,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--text-secondary)'}}>{g[1]}</b><span style={{minWidth:22,height:22,padding:'0 7px',borderRadius:11,background:'var(--surface-muted, var(--ms7-gray-100))',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:'var(--text-secondary)'}}>{L.length}</span><span style={{flex:1,height:1,background:'var(--border-subtle)'}}></span></div>
      <div style={{background:'var(--surface-card)',borderRadius:'var(--radius-lg)',boxShadow:'var(--shadow-card)',padding:6}}>{L.map(function(x){const cf=cfg(db,x.o.id);return <div key={x.o.id} className="ms7t-row" style={{display:'grid',gridTemplateColumns:'auto minmax(0,1fr) auto auto',alignItems:'center',columnGap:14,rowGap:6,padding:'12px',borderRadius:14}}>
        <Avatar name={x.o.nome} size={40}/>
        <div style={{minWidth:0}}><b style={{fontSize:16}}>{x.o.nome}</b><div style={{fontSize:13,fontWeight:600,color:'var(--text-secondary)',marginTop:2,display:'flex',gap:'2px 12px',flexWrap:'wrap'}}>{[['Entrada',x.r.entrada,cf.entrada],['Almoço',x.r.almocoIni?(hm(x.r.almocoIni)+'–'+(x.r.almocoFim?hm(x.r.almocoFim):'…')):null],['Saída',x.r.saida]].map(function(q){const v=q[1]?(typeof q[1]==='string'&&q[1].indexOf('–')>0?q[1]:hm(q[1])):'—';return <span key={q[0]} style={{whiteSpace:'nowrap'}}>{q[0]+' '}<b style={{color:q[1]?'var(--text-primary)':'var(--text-secondary)',fontVariantNumeric:'tabular-nums'}}>{v}</b>{q[0]==='Entrada'&&!q[1]?' (prevista '+q[2]+')':''}</span>;})}</div>
          {x.c.emPausa?<div style={{marginTop:6,display:'inline-flex',alignItems:'center',gap:6,height:24,padding:'0 10px',borderRadius:12,background:'var(--soft-warn-bg, #FFF1E6)',color:'var(--soft-warn-fg, #8A3B00)',fontSize:12,fontWeight:800}}><DS.Icon name="pause" size={12}/>{x.c.emPausa.motivo+' · desde '+hm(x.c.emPausa.ini)+' ('+dur((Date.now()-x.c.emPausa.ini)/60000)+')'}</div>:(x.r.pausas||[]).length?<div style={{marginTop:4,fontSize:12,fontWeight:600,color:'var(--text-secondary)'}}>{'Pausas: '+pausasTxt(x.r)}</div>:null}</div>
        <div style={{textAlign:'right',minWidth:90}}><div style={{fontSize:11,fontWeight:700,letterSpacing:'.05em',textTransform:'uppercase',color:'var(--text-secondary)'}}>Trabalhado</div><b style={{fontSize:18,fontVariantNumeric:'tabular-nums'}}>{dur(x.c.trab)}</b>{x.c.atraso>0?<div style={{fontSize:12,fontWeight:800,color:'var(--ms7-error)'}}>{'Atraso '+dur(x.c.atraso)}</div>:null}</div>
        <div className="ms7t-act"><DS.IconButton icon="pencil" size={34} iconSize={15} label="Ajustar" onClick={function(){onEdit(x.r);}}/></div>
      </div>;})}</div>
    </section>;}):<Card><Empty icon="users" title="Nenhum operador ativo" sub="Cadastre operadores em Gestão → Operadores."/></Card>}
    {(db.pontoLog||[]).length?<Card title="Últimos avisos"><div style={{display:'flex',flexDirection:'column'}}>{db.pontoLog.slice(0,8).map(function(a,i){const alerta=a.tipo!=='marcacao';
      return <div key={a.id} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'10px 0',borderTop:i?'1px solid var(--border-subtle)':'none'}}>
        <span style={{width:32,height:32,borderRadius:9,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:alerta?'color-mix(in oklab, var(--ms7-error) 14%, transparent)':'var(--ms7-gray-100)',color:alerta?'var(--ms7-error)':'var(--text-primary)'}}><DS.Icon name={{marcacao:'clock',atraso:'alarm-clock',ausente:'user-x',almocoLongo:'utensils',semSaida:'log-out',pausa:'pause'}[a.tipo]||'bell'} size={16}/></span>
        <div style={{flex:1,minWidth:0}}><b style={{fontSize:14}}>{a.title}</b><div style={{fontSize:13,fontWeight:500,color:'var(--text-secondary)'}}>{a.body}</div></div>
        <span style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)',whiteSpace:'nowrap'}}>{new Date(a.at).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',timeZone:TZ})}</span></div>;})}</div></Card>:null}
  </div>;
}
function RelatorioTab(){
  const {Card,DataTable,BarChart,Button,Tabs}=DS;const db=DB.useDB();const [per,setPer]=usePersist('ponto-per','7 dias');
  const rows=db.operadores.map(function(o){return Object.assign({id:o.id,nome:o.nome,ativo:o.ativo},resumo(db,rowsOf(db,o.id,per)));}).filter(function(r){return r.dias||r.ativo;}).sort(function(a,b){return b.min-a.min;});
  const s=function(k){return rows.reduce(function(a,r){return a+r[k];},0);};const dias=s('dias');
  return <div style={{display:'flex',flexDirection:'column',gap:20}}>
    <Tabs variant="chips" value={per} onChange={setPer} items={PERS}/>
    <KpiRow items={[{icon:'clock',label:'Horas trabalhadas',value:dur(s('min')),tone:'blue'},{icon:'gauge',label:'Média por dia',value:dur(dias?s('min')/dias:0),tone:'green'},{icon:'alarm-clock',label:'Atrasos',value:s('atrasos')+' · '+dur(s('minAtraso')),tone:'orange'},{icon:'scale',label:'Saldo de horas',value:(s('saldo')>=0?'+':'')+dur(s('saldo')),tone:'yellow'}]}/>
    {rows.length?<Card title="Horas por operador"><BarChart height={220} data={rows.slice(0,10).map(function(r){return {label:r.nome.split(' ')[0],values:[Math.round(r.min/6)/10]};})} series={[{name:'Horas',color:'var(--chart-1)'}]}/></Card>:null}
    <Card title="Resumo por operador" action={<Button size="sm" variant="outline" iconLeft="download" onClick={function(){exportCSV('ponto-'+per.replace(/\s/g,''),[{label:'Operador',get:function(r){return r.nome;}},{label:'Dias',get:function(r){return r.dias;}},{label:'Horas',get:function(r){return dur(r.min);}},{label:'Média/dia',get:function(r){return dur(r.media);}},{label:'Atrasos',get:function(r){return r.atrasos;}},{label:'Min. atraso',get:function(r){return Math.round(r.minAtraso);}},{label:'Saldo',get:function(r){return dur(r.saldo);}},{label:'Dias sem saída',get:function(r){return r.semSaida;}}],rows);}}>Exportar</Button>}>
      <Hint>Saldo = horas trabalhadas menos a jornada prevista, somando só os dias com saída registrada.</Hint>
      <DataTable rows={rows} columns={[{key:'nome',label:'Operador',render:function(r){return <b>{r.nome}</b>;}},{key:'dias',label:'Dias',align:'center'},{key:'min',label:'Horas',align:'right',render:function(r){return <b>{dur(r.min)}</b>;}},{key:'media',label:'Média/dia',align:'right',render:function(r){return dur(r.media);}},
        {key:'atrasos',label:'Atrasos',align:'center',render:function(r){return r.atrasos?<span style={{color:'var(--ms7-error)',fontWeight:700}}>{r.atrasos+' · '+dur(r.minAtraso)}</span>:'0';}},{key:'saldo',label:'Saldo',align:'right',render:function(r){return <Saldo m={r.saldo}/>;}},{key:'semSaida',label:'Sem saída',align:'center',render:function(r){return r.semSaida?<DS.Badge size="sm" tone="error">{r.semSaida}</DS.Badge>:'—';}}]}/>
    </Card>
  </div>;
}
function RegistrosTab({onEdit}){
  const {Card,DataTable,Button,Tabs,Select,IconButton,Badge}=DS;const db=DB.useDB();const [per,setPer]=usePersist('ponto-rper','7 dias');const [op,setOp]=usePersist('ponto-rop','');
  const rows=rowsOf(db,op,per).slice().sort(function(a,b){return a.data<b.data?1:a.data>b.data?-1:DB.opName(a.opId).localeCompare(DB.opName(b.opId));});
  return <Card title="Registros de ponto" action={<Button size="sm" iconLeft="plus" onClick={function(){onEdit({opId:op||undefined});}}>Novo registro</Button>}>
    <div style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap',marginBottom:14}}><Tabs variant="chips" value={per} onChange={setPer} items={PERS}/><Select variant="pill" value={op} onChange={function(e){setOp(e.target.value);}} options={[{value:'',label:'Todos os operadores'}].concat(db.operadores.map(function(o){return {value:o.id,label:o.nome};}))}/></div>
    {rows.length?<DataTable rows={rows} columns={[{key:'data',label:'Dia',render:function(r){return <b style={{textTransform:'capitalize'}}>{diaLabel(r.data)}</b>;}},{key:'op',label:'Operador',render:function(r){return DB.opName(r.opId);}},
      {key:'entrada',label:'Entrada',align:'center',render:function(r){const c=calc(r,db);return <span style={{color:c.atraso>0?'var(--ms7-error)':'inherit',fontWeight:c.atraso>0?700:500}}>{hm(r.entrada)}</span>;}},
      {key:'almoco',label:'Almoço',align:'center',render:function(r){return <span style={{whiteSpace:'nowrap'}}>{r.almocoIni?(r.almocoFim?hm(r.almocoIni)+' – '+hm(r.almocoFim):hm(r.almocoIni)+' (em almoço)'):'—'}</span>;}},{key:'saida',label:'Saída',align:'center',render:function(r){return hm(r.saida);}},{key:'pz',label:'Pausas',render:function(r){return (r.pausas||[]).length?<span style={{fontSize:12,fontWeight:600}}>{dur(calc(r,db).fora)+' · '+pausasTxt(r)}</span>:'—';}},
      {key:'trab',label:'Trabalhado',align:'right',render:function(r){return <b>{dur(calc(r,db).trab)}</b>;}},{key:'saldo',label:'Saldo',align:'right',render:function(r){return <Saldo m={calc(r,db).saldo}/>;}},
      {key:'st',label:'Status',align:'center',render:function(r){return <div style={{display:'inline-flex',gap:4,flexWrap:'wrap',justifyContent:'center'}}><St r={r} db={db}/>{r.ajustado?<Badge size="sm" variant="soft" tone="purple">Ajustado</Badge>:null}</div>;}},
      {key:'obs',label:'Obs.',render:function(r){return <span style={{fontSize:12,color:'var(--text-secondary)'}}>{r.obs||''}</span>;}},
      {key:'a',label:'',align:'right',render:function(r){return <div style={{display:'inline-flex',gap:2}}><IconButton icon="pencil" size={30} iconSize={15} label="Ajustar" onClick={function(){onEdit(r);}}/><IconButton icon="trash-2" size={30} iconSize={15} label="Remover" onClick={function(){if(confirm('Remover o registro de '+DB.opName(r.opId)+' em '+diaLabel(r.data)+'?'))DB.A.pontoRemover(r.id);}}/></div>;}}]}/>
      :<Empty icon="clock" title="Nenhum registro no período" sub="Os registros aparecem aqui quando os operadores batem o ponto."/>}
  </Card>;
}
function OpRegra({o,def}){
  const {Input,Button,Avatar}=DS;const [e,setE]=React.useState(o.pontoEntrada||'');const [j,setJ]=React.useState(o.pontoJornada||'');
  return <div style={{display:'flex',flexDirection:'column',gap:10,padding:'12px 0',borderBottom:'1px solid var(--border-subtle)'}}>
    <div style={{display:'flex',alignItems:'center',gap:10,minWidth:0}}><Avatar name={o.nome} size={30}/><b style={{fontSize:14,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{o.nome}</b></div>
    <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr) auto',gap:10,alignItems:'end'}}>
    <div><Input label="Entrada" type="time" value={e} placeholder={def.entrada} onChange={function(x){setE(x.target.value);}}/></div>
    <div><Input label="Jornada (h)" placeholder={String(def.jornada)} value={j} onChange={function(x){setJ(x.target.value);}}/></div>
    <Button size="sm" variant="secondary" onClick={function(){DB.A.saveOperador({id:o.id,pontoEntrada:e,pontoJornada:j?+String(j).replace(',','.'):''});toast('Regras de '+o.nome+' salvas');}}>Salvar</Button>
    </div>
  </div>;
}
function RegrasTab(){
  const {Card,Input,Button}=DS;const db=DB.useDB();const def=Object.assign({entrada:'09:00',jornada:8,tolerancia:10,almoco:60},(db.config&&db.config.ponto)||{});const [f,setF]=React.useState(def);
  const u=function(k){return function(e){const v=e.target.value;setF(function(p){const n=Object.assign({},p);n[k]=v;return n;});};};
  return <Grid min={340}>
    <Card title="Jornada padrão"><Hint>Vale para todos os operadores, a não ser que tenham regra própria ao lado.</Hint>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <Input label="Horário de entrada" type="time" value={f.entrada} onChange={u('entrada')}/>
        <Input label="Jornada por dia (horas)" value={f.jornada} onChange={u('jornada')}/>
        <Input label="Tolerância de atraso (min)" type="number" value={f.tolerancia} onChange={u('tolerancia')}/>
        <Input label="Almoço previsto (min)" type="number" value={f.almoco} onChange={u('almoco')}/>
      </div>
      <div style={{display:'flex',justifyContent:'flex-end',marginTop:16}}><Button variant="brand" iconLeft="check" onClick={function(){DB.A.setConfig('ponto',Object.assign({},def,{entrada:f.entrada||'09:00',jornada:+String(f.jornada).replace(',','.')||8,tolerancia:+f.tolerancia||0,almoco:+f.almoco||60}));toast('Jornada padrão salva');}}>Salvar</Button></div>
    </Card>
    <Card title="Regras por operador"><Hint>Deixe em branco para usar a jornada padrão.</Hint>
      {db.operadores.map(function(o){return <OpRegra key={o.id} o={o} def={def}/>;})}
    </Card>
    <AvisosCard/>
  </Grid>;
}
function AvisosCard(){
  const {Card,Switch}=DS;const db=DB.useDB();const def=Object.assign({entrada:'09:00',jornada:8,tolerancia:10,almoco:60},(db.config&&db.config.ponto)||{});const av=Object.assign({marcacoes:true,atraso:true,ausente:true,almocoLongo:true,semSaida:true},def.avisos||{});
  const L=[['marcacoes','Cada marcação (entrada, almoço, volta e saída)'],['atraso','Entrada com atraso'],['ausente','Operador não bateu o ponto (30 min depois do horário)'],['almocoLongo','Almoço passou do tempo (15 min a mais)'],['semSaida','Esqueceu de registrar a saída']];
  return <Card title="Notificações do ponto"><Hint>Chegam no sino do painel e no celular ou computador onde você ativou as notificações (Configurações → Notificações). O servidor envia mesmo com o painel fechado.</Hint>
    <div style={{display:'flex',flexDirection:'column',gap:14}}>{L.map(function(x){return <Switch key={x[0]} checked={av[x[0]]!==false} label={x[1]} onChange={function(v){const n=Object.assign({},av);n[x[0]]=v;DB.A.setConfig('ponto',Object.assign({},def,{avisos:n}));}}/>;})}</div></Card>;
}
function PontoWatcher(){
  const db=DB.useDB();const log=db.pontoLog||[];const top=log.length?log[0].id:'';
  React.useEffect(function(){if(!log.length)return;const K='ms7-ponto-seen';const seen=+localStorage.getItem(K)||0;const mx=Math.max.apply(null,log.map(function(x){return x.at;}));
    if(!seen){localStorage.setItem(K,String(mx));return;}
    log.filter(function(x){return x.at>seen;}).slice(0,5).reverse().forEach(function(x){notify({type:'ponto',title:x.title,body:x.body,local:true});});
    if(mx>seen)localStorage.setItem(K,String(mx));},[top]);
  return null;
}
function MeuPonto({opId}){
  const {Card,Button,DataTable,Badge}=DS;const db=DB.useDB();useTick(1000);const t=hoje();
  const r=(db.ponto||[]).find(function(p){return p.id==='pt_'+opId+'_'+t;})||{opId:opId,data:t};const c=calc(r,db);const cf=cfg(db,opId);const now=new Date();
  const [pz,setPz]=React.useState(false);
  const acts=!r.entrada?[['entrada','Registrar entrada','log-in','brand']]:r.saida?[]:c.emPausa?[]:r.almocoIni&&!r.almocoFim?[['almocoFim','Voltar do almoço','coffee','brand']]:(!r.almocoIni?[['almocoIni','Sair para almoço','utensils','outline']]:[]).concat([['pausa','Sair para compromisso','pause','outline'],['saida','Registrar saída','log-out','primary']]);
  function marcar(k){if(k==='pausa'){setPz(true);return;}if(k==='saida'&&!confirm('Registrar a saída agora? Depois disso o dia fica encerrado.'))return;DB.A.pontoMarcar(opId,k);}
  const pct=Math.min(100,c.trab/(cf.jornada*60)*100);
  const sem=resumo(db,rowsOf(db,opId,'7 dias')),mes=resumo(db,rowsOf(db,opId,'Este mês'));
  const hist=rowsOf(db,opId,'30 dias').slice().sort(function(a,b){return a.data<b.data?1:-1;});
  const e=EST[c.estado];
  return <div style={{display:'flex',flexDirection:'column',gap:24}}>
    <Card padding={24}><div style={{display:'flex',gap:28,alignItems:'center',flexWrap:'wrap'}}>
      <div style={{flex:'1 1 260px'}}>
        <div style={{fontSize:14,fontWeight:600,color:'var(--text-secondary)'}}>{(function(s){return s.charAt(0).toUpperCase()+s.slice(1);})(now.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',timeZone:TZ}))}</div>
        <div style={{fontSize:64,fontWeight:800,lineHeight:1.05,fontVariantNumeric:'tabular-nums',letterSpacing:'-0.02em'}}>{now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:TZ})}</div>
        <div style={{display:'flex',alignItems:'center',gap:8,marginTop:8,flexWrap:'wrap'}}><Badge tone={e[1]}>{e[0]}</Badge><span style={{fontSize:13,fontWeight:600,color:'var(--text-secondary)'}}>{'Entrada prevista '+cf.entrada+' · jornada '+cf.jornada+'h'}</span></div>
      </div>
      <div style={{flex:'1 1 280px',display:'flex',flexDirection:'column',gap:10}}>
        {c.emPausa?<div style={{padding:18,borderRadius:16,background:'var(--soft-warn-bg, #FFF1E6)',color:'var(--soft-warn-fg, #8A3B00)',display:'flex',flexDirection:'column',gap:10}}><span style={{display:'flex',alignItems:'center',gap:8,fontSize:14,fontWeight:700}}><DS.Icon name="pause" size={16}/>{'Em pausa: '+c.emPausa.motivo+' · desde '+hm(c.emPausa.ini)}</span><b style={{fontSize:40,lineHeight:1,fontVariantNumeric:'tabular-nums',letterSpacing:'-0.02em'}}>{cron(Date.now()-c.emPausa.ini)}</b><DS.Button variant="brand" iconLeft="play" fullWidth onClick={function(){DB.A.pontoVolta(opId);}} style={{height:56,fontSize:17}}>Voltar ao trabalho</DS.Button></div>:null}
        {acts.length?acts.map(function(a){return <Button key={a[0]} variant={a[3]} iconLeft={a[2]} fullWidth onClick={function(){marcar(a[0]);}} style={{height:56,fontSize:17}}>{a[1]}</Button>;})
          :c.emPausa?null:<div style={{padding:16,borderRadius:14,background:'var(--ms7-lime-100)',color:'var(--ms7-green-ink, #005D3B)',fontWeight:700,display:'flex',alignItems:'center',gap:10}}><DS.Icon name="circle-check" size={20}/>Dia encerrado. Até amanhã!</div>}
        <span style={{fontSize:12,fontWeight:500,color:'var(--text-secondary)'}}>O horário registrado é o do servidor. Esqueceu de marcar? Fale com o administrador para ajustar.</span>
      </div>
    </div>
    <div style={{marginTop:22,display:'flex',flexDirection:'column',gap:12}}>
      <Marks r={r}/>
      <div><div style={{display:'flex',justifyContent:'space-between',fontSize:13,fontWeight:700,marginBottom:6}}><span>{'Trabalhado hoje: '+dur(c.trab)}</span><span>{'Meta '+cf.jornada+'h'}</span></div>
        <div style={{height:10,borderRadius:5,background:'var(--ms7-gray-100)'}}><div style={{width:pct+'%',height:'100%',borderRadius:5,background:pct>=100?'var(--ms7-green)':'var(--ms7-lime-600)',transition:'width .4s'}}></div></div></div>
      {c.atraso>0?<span style={{fontSize:13,fontWeight:700,color:'var(--ms7-error)'}}>{'Entrada com atraso de '+dur(c.atraso)}</span>:null}
      {(r.pausas||[]).length?<span style={{fontSize:13,fontWeight:600,color:'var(--text-secondary)'}}>{'Pausas hoje ('+dur(c.fora)+' fora): '+pausasTxt(r)}</span>:null}
    </div>
    <PausaModal open={pz} onClose={function(){setPz(false);}} onGo={function(m){setPz(false);DB.A.pontoPausa(opId,m);}}/></Card>
    <KpiRow items={[{icon:'calendar-days',label:'Últimos 7 dias',value:dur(sem.min),tone:'blue'},{icon:'calendar',label:'Este mês',value:dur(mes.min),tone:'green'},{icon:'alarm-clock',label:'Atrasos no mês',value:mes.atrasos,tone:'orange'},{icon:'scale',label:'Saldo do mês',value:(mes.saldo>=0?'+':'')+dur(mes.saldo),tone:'yellow'}]}/>
    <Card title="Meu histórico (30 dias)">{hist.length?<DataTable rows={hist} columns={[{key:'data',label:'Dia',render:function(x){return <b style={{textTransform:'capitalize'}}>{diaLabel(x.data)}</b>;}},{key:'entrada',label:'Entrada',align:'center',render:function(x){return hm(x.entrada);}},{key:'almoco',label:'Almoço',align:'center',render:function(x){return <span style={{whiteSpace:'nowrap'}}>{x.almocoIni?(x.almocoFim?hm(x.almocoIni)+' – '+hm(x.almocoFim):hm(x.almocoIni)+' (em almoço)'):'—'}</span>;}},{key:'saida',label:'Saída',align:'center',render:function(x){return hm(x.saida);}},{key:'trab',label:'Trabalhado',align:'right',render:function(x){return <b>{dur(calc(x,db).trab)}</b>;}},{key:'saldo',label:'Saldo',align:'right',render:function(x){return <Saldo m={calc(x,db).saldo}/>;}},{key:'st',label:'',align:'center',render:function(x){return <St r={x} db={db}/>;}}]}/>:<Empty icon="clock" title="Nenhum registro ainda" sub="Registre sua entrada para começar."/>}</Card>
  </div>;
}
function PontoScreen({session,role}){
  if(role==='operador')return <MeuPonto opId={session.opId}/>;
  const [tab,setTab]=usePersist('ponto-tab','agora');const [ed,setEd]=React.useState(null);
  const T={agora:AgoraTab,relatorio:RelatorioTab,registros:RegistrosTab,regras:RegrasTab}[tab]||AgoraTab;
  return <div style={{display:'flex',flexDirection:'column',gap:24}}>
    <DS.Tabs variant="chips" value={tab} onChange={setTab} items={[{id:'agora',label:'Agora'},{id:'relatorio',label:'Relatório'},{id:'registros',label:'Registros'},{id:'regras',label:'Jornada'}]}/>
    <T onEdit={setEd}/>
    <EditModal r={ed} onClose={function(){setEd(null);}}/>
  </div>;
}
Object.assign(window,{PontoScreen:PontoScreen,PontoWatcher:PontoWatcher});
})();
