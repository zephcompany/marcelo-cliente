(function(){
const DS=window.MS7DesignSystem_5d5172;
const TZ='America/Sao_Paulo';
(function(){if(document.getElementById('ms7-tarefas-css'))return;const s=document.createElement('style');s.id='ms7-tarefas-css';s.textContent='@keyframes ms7tIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@keyframes ms7tPop{0%{transform:scale(.6)}60%{transform:scale(1.15)}100%{transform:scale(1)}}.ms7t-row{animation:ms7tIn .24s cubic-bezier(.2,.7,.2,1) both;transition:background .15s}.ms7t-row:hover{background:var(--surface-muted, rgba(0,0,0,.03))}.ms7t-row:hover .ms7t-act{opacity:1}.ms7t-act{opacity:.35;transition:opacity .15s}.ms7t-chk{transition:background .18s,border-color .18s,transform .12s}.ms7t-chk:active{transform:scale(.9)}.ms7t-pop{animation:ms7tPop .28s ease both}@media (hover:none){.ms7t-act{opacity:1}}';document.head.appendChild(s);})();
const hojeISO=function(){return new Date().toLocaleDateString('sv-SE',{timeZone:TZ});};
const addD=function(s,n){const d=new Date(s+'T12:00:00');d.setDate(d.getDate()+n);return d.toLocaleDateString('sv-SE');};
const SEM=['dom','seg','ter','qua','qui','sex','sáb'];
const SEM_L=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const dm=function(s){return s?s.slice(8)+'/'+s.slice(5,7):'';};
const diaL=function(s){const h=hojeISO();if(s===h)return 'Hoje';if(s===addD(h,1))return 'Amanhã';if(s===addD(h,-1))return 'Ontem';return SEM_L[new Date(s+'T12:00:00').getDay()]+' '+dm(s);};
function vale(t,dia){if(t.rep==='diaria'){if(t.data&&dia<t.data)return false;const dw=new Date(dia+'T12:00:00').getDay();return !t.dias||!t.dias.length||t.dias.indexOf(dw)>=0;}return t.data===dia;}
function feita(t,dia){return t.rep==='diaria'?!!(t.feitos&&t.feitos[dia]):!!t.feitoEm;}
const respDe=function(t){return t.resp||'admin';};
function respNome(id){if(id==='admin')return 'Gestão';return DB.opName(id)||'Operador';}
const ordem=function(dia){return function(a,b){const fa=feita(a,dia),fb=feita(b,dia);if(fa!==fb)return fa?1:-1;const ua=a.prio==='urgente',ub=b.prio==='urgente';if(ua!==ub)return ua?-1:1;const ha=a.hora||'99',hb=b.hora||'99';if(ha!==hb)return ha<hb?-1:1;return (a.criada||0)-(b.criada||0);};};

function Check({on,onClick,urg}){return <button type="button" className="ms7t-chk" onClick={onClick} aria-label={on?'Desmarcar':'Marcar como feita'} style={{width:26,height:26,flexShrink:0,borderRadius:'50%',border:'2px solid '+(on?'var(--ms7-green)':urg?'var(--ms7-error)':'var(--border-default)'),background:on?'var(--ms7-green)':'transparent',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',padding:0}}>{on?<span className="ms7t-pop" style={{display:'flex'}}><DS.Icon name="check" size={15} color="#fff" strokeWidth={3}/></span>:null}</button>;}
function DiasPick({value,onChange}){const v=value||[];return <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>{SEM.map(function(n,i){const on=!v.length||v.indexOf(i)>=0;return <button key={i} type="button" onClick={function(){let nv=v.length?v.slice():[0,1,2,3,4,5,6];nv=nv.indexOf(i)>=0?nv.filter(function(x){return x!==i;}):nv.concat([i]).sort();onChange(nv.length===7?[]:nv);}} style={{height:30,minWidth:40,padding:'0 8px',borderRadius:15,border:'1px solid '+(on?'var(--ms7-green)':'var(--border-subtle)'),background:on?'color-mix(in oklab, var(--ms7-lime-500) 22%, transparent)':'transparent',color:'var(--text-primary)',fontFamily:'inherit',fontSize:12,fontWeight:700,cursor:'pointer'}}>{n}</button>;})}</div>;}
function Seg({value,onChange,items}){return <div style={{display:'inline-flex',padding:3,borderRadius:12,background:'var(--surface-sunken, var(--ms7-gray-100))',gap:2}}>{items.map(function(o){const on=value===o[0];return <button key={o[0]} type="button" onClick={function(){onChange(o[0]);}} style={{height:30,padding:'0 12px',border:0,borderRadius:9,background:on?'var(--surface-card)':'transparent',boxShadow:on?'0 1px 2px rgba(0,0,0,.1)':'none',fontFamily:'inherit',fontSize:13,fontWeight:700,color:on&&o[2]?o[2]:'var(--text-primary)',cursor:'pointer',display:'flex',alignItems:'center',gap:6}}>{o[1]}</button>;})}</div>;}
const lbl={fontSize:12,fontWeight:700,color:'var(--text-secondary)',marginBottom:6};
const inpS={height:36,padding:'0 10px',border:'1px solid var(--border-default)',borderRadius:10,background:'var(--surface-card)',color:'var(--text-primary)',fontFamily:'inherit',fontSize:13,fontWeight:600,boxSizing:'border-box'};

function Editor({t,isOp,ops,onSave,onClose}){
  const [f,setF]=React.useState(Object.assign({txt:'',rep:'uma',data:hojeISO(),dias:[],obs:'',hora:'',prio:'normal',resp:'admin'},t,{resp:respDe(t),prio:t.prio||'normal'}));
  const set=function(k,v){setF(function(o){const n=Object.assign({},o);n[k]=v;return n;});};
  return <DS.Modal open={true} onClose={onClose} title={t.id?'Editar tarefa':'Nova tarefa'} footer={<React.Fragment><DS.Button variant="secondary" onClick={onClose}>Cancelar</DS.Button><DS.Button variant="brand" iconLeft="check" onClick={function(){if(!String(f.txt).trim()){toast('Escreva a tarefa');return;}onSave(Object.assign({},f,{txt:f.txt.trim()}));}}>Salvar</DS.Button></React.Fragment>}>
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <DS.Input label="Tarefa" value={f.txt} onChange={function(e){set('txt',e.target.value);}} placeholder="O que precisa ser feito"/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16}}>
        {!isOp?<div><div style={lbl}>Para quem</div><select value={f.resp} onChange={function(e){set('resp',e.target.value);}} style={Object.assign({},inpS,{width:'100%'})}><option value="admin">Gestão (admins)</option>{t.id?null:<option value="__todos">{'Todos os operadores ('+ops.length+')'}</option>}{ops.map(function(o){return <option key={o.id} value={o.id}>{o.nome}</option>;})}</select></div>:null}
        <div><div style={lbl}>Prioridade</div><Seg value={f.prio} onChange={function(v){set('prio',v);}} items={[['normal','Normal'],['urgente','Urgente','var(--ms7-error)']]}/></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16,alignItems:'end'}}>
        <div><div style={lbl}>Repetir</div><Seg value={f.rep} onChange={function(v){set('rep',v);}} items={[['uma','Não repete'],['diaria','Repetir']]}/></div>
        <div><div style={lbl}>{f.rep==='diaria'?'Começa em':'Dia'}</div><input type="date" value={f.data||''} onChange={function(e){set('data',e.target.value);}} style={Object.assign({},inpS,{width:'100%'})}/></div>
      </div>
      {f.rep==='diaria'?<div><div style={lbl}>Dias da semana</div><DiasPick value={f.dias} onChange={function(v){set('dias',v);}}/></div>:null}
      <DS.Input label="Observação" multiline rows={3} value={f.obs||''} onChange={function(e){set('obs',e.target.value);}} placeholder="Opcional"/>
    </div>
  </DS.Modal>;}

function Linha({t,dia,showDia,isOp,onToggle,onEdit,onDel}){const ok=feita(t,dia);const urg=t.prio==='urgente';const r=respDe(t);
  const tag=function(icon,txt,col){return <span style={{display:'inline-flex',alignItems:'center',gap:4,height:22,padding:'0 8px',borderRadius:11,background:col?'color-mix(in oklab, '+col+' 14%, transparent)':'var(--surface-muted, var(--ms7-gray-100))',color:col||'var(--text-secondary)',fontSize:12,fontWeight:700}}><DS.Icon name={icon} size={12}/>{txt}</span>;};
  return <div className="ms7t-row" style={{display:'flex',alignItems:'center',gap:14,padding:'12px 12px',borderRadius:14}}>
    <Check on={ok} urg={urg&&!ok} onClick={onToggle}/>
    <button type="button" onClick={onEdit} style={{flex:1,minWidth:0,border:0,background:'transparent',padding:0,textAlign:'left',cursor:'pointer',color:'var(--text-primary)',fontFamily:'inherit'}}>
      <div style={{fontSize:16,fontWeight:700,lineHeight:1.35,textDecoration:ok?'line-through':'none',textDecorationColor:'var(--text-secondary)',opacity:ok?.45:1,transition:'opacity .2s',wordBreak:'break-word',textWrap:'pretty'}}>{t.txt}</div>
      {(urg&&!ok)||!isOp||showDia||t.hora||t.rep==='diaria'||t.obs?<div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:6,alignItems:'center',opacity:ok?.5:1}}>
        {urg&&!ok?tag('flame','Urgente','var(--ms7-error)'):null}
        {!isOp?tag(r==='admin'?'shield':'user',respNome(r)):null}
        {showDia?tag('calendar',diaL(showDia),showDia<hojeISO()&&!ok?'var(--ms7-error)':null):null}
        {t.hora?tag('clock',t.hora):null}
        {t.rep==='diaria'?tag('repeat',t.dias&&t.dias.length?t.dias.map(function(i){return SEM[i];}).join(' '):'Todo dia'):null}
        {t.obs?<span style={{fontSize:13,fontWeight:500,color:'var(--text-secondary)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'100%'}}>{t.obs}</span>:null}
      </div>:null}
    </button>
    <div className="ms7t-act" style={{display:'flex',gap:2,flexShrink:0}}><DS.IconButton icon="pencil" size={32} iconSize={15} label="Editar" onClick={onEdit}/><DS.IconButton icon="trash-2" size={32} iconSize={15} label="Apagar" onClick={onDel}/></div>
  </div>;}

function Secao({titulo,cor,itens,vazio,children}){
  return <section style={{display:'flex',flexDirection:'column',gap:4}}>
    <div style={{display:'flex',alignItems:'center',gap:10,padding:'0 12px 6px'}}>
      <span style={{width:8,height:8,borderRadius:4,background:cor,flexShrink:0}}></span>
      <b style={{fontSize:13,fontWeight:800,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--text-secondary)'}}>{titulo}</b>
      <span style={{minWidth:22,height:22,padding:'0 7px',borderRadius:11,background:'var(--surface-muted, var(--ms7-gray-100))',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:'var(--text-secondary)'}}>{itens}</span>
      <span style={{flex:1,height:1,background:'var(--border-subtle)'}}></span>
    </div>
    <div style={{background:'var(--surface-card)',borderRadius:'var(--radius-lg)',boxShadow:'var(--shadow-card)',padding:6}}>
      {children}
      {vazio?<div style={{padding:'16px 12px',fontSize:14,fontWeight:600,color:'var(--text-secondary)'}}>{vazio}</div>:null}
    </div>
  </section>;}

function TarefasScreen(props){
  const session=props&&props.session||(function(){try{return JSON.parse(localStorage.getItem('ms7op-session')||'{}');}catch(e){return {};}})();
  const isOp=session.role==='operador';const db=DB.useDB();const ops=(db.operadores||[]).filter(function(o){return o.ativo!==false;});
  const [lista,setLista]=usePersist('tarefas',[]);const L0=Array.isArray(lista)?lista:[];
  const [quem,setQuem]=React.useState('todos');const [so,setSo]=React.useState('todas');
  const [txt,setTxt]=React.useState('');const [qResp,setQResp]=React.useState(isOp?session.opId:'admin');const [qDia,setQDia]=React.useState(hojeISO());const [qUrg,setQUrg]=React.useState(false);const [qRep,setQRep]=React.useState(false);
  const [edit,setEdit]=React.useState(null);const hoje=hojeISO(),amanha=addD(hoje,1);
  const salvar=function(fn){setLista(function(cur){return fn((Array.isArray(cur)?cur:[]).map(function(x){return Object.assign({},x,{feitos:Object.assign({},x.feitos||{})});}));});};
  function add(e){if(e)e.preventDefault();const t=txt.trim();if(!t){toast('Escreva a tarefa');return;}const r=isOp?session.opId:qResp;
    const alvo=r==='__todos'?ops.map(function(o){return o.id;}):[r];if(!alvo.length){toast('Nenhum operador ativo');return;}const base=Date.now();
    salvar(function(l){return l.concat(alvo.map(function(rr,ix){return {id:'t'+(base+ix),txt:t,rep:qRep?'diaria':'uma',data:qRep?hoje:(qDia||hoje),dias:[],hora:'',obs:'',feitos:{},criada:Date.now(),resp:rr,prio:qUrg?'urgente':'normal',criadoPor:isOp?session.opId:'admin'};}));});
    setTxt('');setQUrg(false);toast((qRep?'Tarefa diária criada':'Tarefa criada')+(r==='__todos'?' para '+alvo.length+' operadores':r!=='admin'&&!isOp?' para '+respNome(r):''));}
  function toggle(t,d){salvar(function(l){return l.map(function(x){if(x.id!==t.id)return x;if(x.rep==='diaria'){if(x.feitos[d])delete x.feitos[d];else x.feitos[d]=Date.now();}else x.feitoEm=x.feitoEm?null:Date.now();return x;});});}
  function del(t){if(!confirm('Apagar a tarefa "'+t.txt+'"?'))return;salvar(function(l){return l.filter(function(x){return x.id!==t.id;});});toast('Tarefa apagada');}
  function saveEdit(f){if(f.resp==='__todos'&&!f.id){const base=Date.now();const lst=ops.map(function(o,ix){return Object.assign({},f,{id:'t'+(base+ix),feitos:{},criada:base,criadoPor:'admin',resp:o.id});});if(!lst.length){toast('Nenhum operador ativo');return;}salvar(function(l){return l.concat(lst);});setEdit(null);toast('Tarefa criada para '+lst.length+' operadores');return;}
  salvar(function(l){const ex=l.some(function(x){return x.id===f.id;});return ex?l.map(function(x){return x.id===f.id?Object.assign({},x,f):x;}):l.concat([Object.assign({id:'t'+Date.now(),feitos:{},criada:Date.now(),criadoPor:isOp?session.opId:'admin'},f)]);});setEdit(null);toast('Tarefa salva');}

  const L=L0.filter(function(t){const r=respDe(t);if(isOp)return r===session.opId;if(quem!=='todos'&&r!==quem)return false;if(so==='urgentes'&&t.prio!=='urgente')return false;return true;});
  const atras=L.filter(function(t){return t.rep!=='diaria'&&!t.feitoEm&&t.data&&t.data<hoje;}).sort(function(a,b){return a.data<b.data?-1:1;});
  const deHoje=L.filter(function(t){return vale(t,hoje);}).sort(ordem(hoje));
  const deAmanha=L.filter(function(t){return vale(t,amanha);}).sort(ordem(amanha));
  const prox=L.filter(function(t){return t.rep!=='diaria'&&t.data&&t.data>amanha;}).sort(function(a,b){return a.data!==b.data?(a.data<b.data?-1:1):ordem(a.data)(a,b);});
  const fixas=L.filter(function(t){return t.rep==='diaria';});
  const okH=deHoje.filter(function(t){return feita(t,hoje);}).length;const pct=deHoje.length?Math.round(okH/deHoje.length*100):0;
  const row=function(t,dia,showDia){return <Linha key={t.id+dia} t={t} dia={dia} showDia={showDia} isOp={isOp} onToggle={function(){toggle(t,dia);}} onEdit={function(){setEdit(t);}} onDel={function(){del(t);}}/>;};
  const urgH=deHoje.filter(function(t){return t.prio==='urgente'&&!feita(t,hoje);}).length;

  return <div style={{display:'flex',flexDirection:'column',gap:24,maxWidth:900}}>
    <DS.Card>
      <div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
        <div style={{flex:'1 1 220px',minWidth:0}}>
          <div style={{display:'flex',alignItems:'center',gap:16}}><svg width="56" height="56" viewBox="0 0 56 56" style={{flexShrink:0}}><circle cx="28" cy="28" r="23" fill="none" stroke="var(--ms7-gray-100)" strokeWidth="6"></circle><circle cx="28" cy="28" r="23" fill="none" stroke="var(--ms7-green)" strokeWidth="6" strokeLinecap="round" strokeDasharray={(2*Math.PI*23).toFixed(1)} strokeDashoffset={((1-pct/100)*2*Math.PI*23).toFixed(1)} transform="rotate(-90 28 28)" style={{transition:'stroke-dashoffset .5s cubic-bezier(.2,.7,.2,1)'}}></circle><text x="28" y="32" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--text-primary)" fontFamily="var(--font-sans)">{pct+'%'}</text></svg>
          <div><div style={{fontSize:14,fontWeight:700,color:'var(--text-secondary)'}}>{SEM_L[new Date(hoje+'T12:00:00').getDay()]+', '+dm(hoje)}</div>
          <div style={{fontSize:26,fontWeight:800,letterSpacing:'-0.01em',marginTop:2}}>{deHoje.length?okH+' de '+deHoje.length+' feitas hoje':'Nada para hoje'}</div></div></div>
        </div>
        <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
          {[['Atrasadas',atras.length,'var(--ms7-error)'],['Urgentes hoje',urgH,'var(--ms7-orange)'],['Amanhã',deAmanha.length,'var(--text-primary)']].map(function(x){return <div key={x[0]}><div style={{fontSize:12,fontWeight:700,color:'var(--text-secondary)'}}>{x[0]}</div><div style={{fontSize:20,fontWeight:800,color:x[1]?x[2]:'var(--text-secondary)'}}>{x[1]}</div></div>;})}
        </div>
      </div>
      <form onSubmit={add} style={{display:'flex',gap:10,marginTop:16,flexWrap:'wrap',alignItems:'center'}}>
        <div style={{flex:'1 1 260px',minWidth:0}}><DS.Input icon="plus" value={txt} onChange={function(e){setTxt(e.target.value);}} placeholder="Nova tarefa e aperte Enter"/></div>
        {!isOp?<select aria-label="Para quem" value={qResp} onChange={function(e){setQResp(e.target.value);}} style={inpS}><option value="admin">Gestão</option><option value="__todos">{'Todos os operadores ('+ops.length+')'}</option>{ops.map(function(o){return <option key={o.id} value={o.id}>{o.nome}</option>;})}</select>:null}
        {qRep?null:<input type="date" aria-label="Dia" value={qDia} onChange={function(e){setQDia(e.target.value);}} style={inpS}/>}
        <button type="button" onClick={function(){setQRep(!qRep);}} aria-pressed={qRep} style={Object.assign({},inpS,{display:'flex',alignItems:'center',gap:6,cursor:'pointer',borderColor:qRep?'var(--ms7-green)':'var(--border-default)',color:qRep?'var(--ms7-green)':'var(--text-secondary)',background:qRep?'color-mix(in oklab, var(--ms7-green) 10%, var(--surface-card))':'var(--surface-card)'})}><DS.Icon name="repeat" size={14}/>Todo dia</button>
        <button type="button" onClick={function(){setQUrg(!qUrg);}} aria-pressed={qUrg} style={Object.assign({},inpS,{display:'flex',alignItems:'center',gap:6,cursor:'pointer',borderColor:qUrg?'var(--ms7-error)':'var(--border-default)',color:qUrg?'var(--ms7-error)':'var(--text-secondary)'})}><DS.Icon name="flame" size={14}/>Urgente</button>
        <DS.Button variant="brand" iconLeft="plus" onClick={add}>Adicionar</DS.Button>
      </form>
      <div style={{marginTop:8,fontSize:12,fontWeight:600,color:'var(--text-secondary)'}}>Clique numa tarefa para repetir, mudar o dia ou escrever uma observação.</div>
    </DS.Card>

    {!isOp?<div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
      <Seg value={so} onChange={setSo} items={[['todas','Todas'],['urgentes','Só urgentes','var(--ms7-error)']]}/>
      <select aria-label="Responsável" value={quem} onChange={function(e){setQuem(e.target.value);}} style={inpS}><option value="todos">Todos os responsáveis</option><option value="admin">Gestão</option>{ops.map(function(o){return <option key={o.id} value={o.id}>{o.nome}</option>;})}</select>
    </div>:null}

    {atras.length?<Secao titulo="Atrasadas" cor="var(--ms7-error)" itens={atras.length}>{atras.map(function(t){return row(t,t.data,t.data);})}</Secao>:null}
    <Secao titulo="Hoje" cor="var(--ms7-green)" itens={deHoje.length} vazio={deHoje.length?null:'Nenhuma tarefa para hoje.'}>{deHoje.map(function(t){return row(t,hoje,null);})}</Secao>
    <Secao titulo="Amanhã" cor="var(--ms7-lime-500)" itens={deAmanha.length} vazio={deAmanha.length?null:'Nada marcado para amanhã.'}>{deAmanha.map(function(t){return row(t,amanha,null);})}</Secao>
    {prox.length?<Secao titulo="Próximos dias" cor="var(--ms7-gray-400, #A3A79E)" itens={prox.length}>{prox.map(function(t){return row(t,t.data,t.data);})}</Secao>:null}
    {(function(){const grp={};fixas.forEach(function(x){const r=respDe(x);(grp[r]=grp[r]||[]).push(x);});const ks=Object.keys(grp).sort(function(x,y){return x==='admin'?-1:y==='admin'?1:respNome(x).localeCompare(respNome(y),'pt-BR');});
      return <DS.Card>
        <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:fixas.length?8:0}}><DS.Icon name="repeat" size={18} color="var(--ms7-green)"/><b style={{flex:1,fontSize:17}}>{'Tarefas diárias'+(fixas.length?' · '+fixas.length:'')}</b>
          <DS.Button size="sm" variant="secondary" iconLeft="plus" onClick={function(){setEdit({rep:'diaria',data:hoje,dias:[],resp:isOp?session.opId:(quem!=='todos'?quem:'admin')});}}>Nova tarefa diária</DS.Button></div>
        {fixas.length?ks.map(function(k){return <div key={k} style={{marginTop:6}}>
          {!isOp?<div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 0 4px'}}><DS.Avatar name={respNome(k)} size={24}/><b style={{fontSize:13}}>{respNome(k)}</b><span style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)'}}>{grp[k].length+(grp[k].length===1?' tarefa':' tarefas')}</span></div>:null}
          {grp[k].map(function(x){const ok=feita(x,hoje);const hojeVale=vale(x,hoje);return <div key={x.id} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderTop:'1px solid var(--border-subtle)'}}>
            <span style={{width:8,height:8,borderRadius:4,flexShrink:0,background:!hojeVale?'var(--border-default)':ok?'var(--ms7-green)':'var(--ms7-orange)'}} title={!hojeVale?'Não vale hoje':ok?'Feita hoje':'Pendente hoje'}></span>
            <span style={{flex:1,minWidth:0,fontSize:14,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{x.txt}{x.prio==='urgente'?<span style={{marginLeft:6,fontSize:11,fontWeight:800,color:'var(--ms7-error)'}}>URGENTE</span>:null}</span>
            <span style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)',whiteSpace:'nowrap'}}>{(x.dias&&x.dias.length&&x.dias.length<7?x.dias.slice().sort().map(function(i){return SEM[i];}).join(' '):'Todo dia')+(x.hora?' · '+x.hora:'')}</span>
            <DS.IconButton icon="pencil" size={28} iconSize={13} label="Editar" onClick={function(){setEdit(x);}}/>{!isOp||x.criadoPor===session.opId?<DS.IconButton icon="trash-2" size={28} iconSize={13} label="Apagar" onClick={function(){del(x);}}/>:null}</div>;})}
        </div>;}):<div style={{fontSize:13,fontWeight:600,color:'var(--text-secondary)'}}>{isOp?'Nenhuma tarefa diária para você.':'Nenhuma tarefa diária. Crie uma para a Gestão ou para um operador: ela aparece todo dia (ou nos dias escolhidos) na lista de Hoje.'}</div>}
      </DS.Card>;})()}
    {edit?<Editor t={edit} isOp={isOp} ops={ops} onSave={saveEdit} onClose={function(){setEdit(null);}}/>:null}
  </div>;}
window.TarefasScreen=TarefasScreen;
})();
