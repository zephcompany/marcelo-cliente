(function(){
const DS=window.MS7DesignSystem_5d5172;
const ST={disponivel:{l:'Disponível',tone:'green',dot:'var(--ms7-green)'},usada:{l:'Em uso',tone:'yellow',dot:'var(--ms7-orange)'},bloqueada:{l:'Bloqueada',tone:'error',dot:'var(--ms7-error)'}};
const ALL='__all';
function copy(t){try{navigator.clipboard.writeText(t);}catch(e){}}
function Pill({s,label}){const x=ST[s]||ST.disponivel;return <span style={{display:'inline-flex',alignItems:'center',gap:6,height:22,padding:'0 9px',borderRadius:11,fontSize:11,fontWeight:700,background:'color-mix(in oklab, '+x.dot+' 14%, transparent)',color:x.dot,whiteSpace:'nowrap'}}><span style={{width:6,height:6,borderRadius:3,background:x.dot}}></span>{label?label+' · ':''}{x.l}</span>;}
function stats(g,gp){const o={total:g.chaves.length,disponivel:0,usada:0,bloqueada:0};g.chaves.forEach(function(k){o[PIXV.st(k,gp).status]++;});return o;}
function allKeys(db){const out=[];db.pix.forEach(function(g){g.chaves.forEach(function(k){out.push({g:g,k:k});});});return out;}
function verify(db){const seen={},dup=[],inv=[],orf=[];allKeys(db).forEach(function(x){const kk=PIXV.key(x.k.tipo,x.k.valor);if(seen[kk])dup.push(x);else seen[kk]=x;if(!PIXV.valid(x.k.tipo,x.k.valor))inv.push(x);
  const por=x.k.por||{};Object.keys(por).forEach(function(n){const e=por[n];if(e.status!=='usada'||!e.conta)return;const c=db.coops.find(function(cp){return cp.id===e.conta.coopId;});const ct=c&&c.contas.find(function(a){return a.id===e.conta.contaId;});if(!ct||ct.pix!==x.k.valor)orf.push({g:x.g,k:x.k,gp:n});});});
  return {total:allKeys(db).length,dup:dup,inv:inv,orf:orf};}
function GrupoModal({open,g,onClose}){
  const {Modal,Input,Select,Button,Switch}=DS;const db=DB.get();const [f,setF]=React.useState({});
  React.useEffect(function(){if(open)setF(g?{id:g.id,nome:g.nome,pagamento:g.pagamento||'',opId:g.opId||'',plataforma:g.plataforma||'',ativo:g.ativo!==false}:{nome:'',pagamento:'',opId:'',plataforma:'',ativo:true});},[open]);
  const u=function(k){return function(e){const v=e&&e.target?e.target.value:e;setF(function(p){const n=Object.assign({},p);n[k]=v;return n;});};};
  const gps=PIXV.grupos(db);const opts=[{value:'',label:'Todos os grupos de plataformas'}].concat(gps.map(function(n){return {value:n,label:n};}));if(f.plataforma&&gps.indexOf(f.plataforma)<0)opts.push({value:f.plataforma,label:f.plataforma});
  return <Modal open={open} onClose={onClose} title={g?'Editar lote de chaves':'Novo lote de chaves'} footer={<React.Fragment><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button variant="brand" onClick={function(){if(!String(f.nome||'').trim()){toast('Informe o nome do lote');return;}DB.A.pixSaveGrupo(f);onClose();}}>{g?'Salvar':'Criar'}</Button></React.Fragment>}>
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <Input label="Nome do lote" required placeholder="ex: Chaves Mercado Pago — setembro" value={f.nome||''} onChange={u('nome')}/>
      <Input label="Forma de pagamento" placeholder="ex: Mercado Pago" value={f.pagamento||''} onChange={u('pagamento')}/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <Select label="Operador (opcional)" value={f.opId||''} onChange={u('opId')} options={[{value:'',label:'Todos os operadores'}].concat(db.operadores.map(function(o){return {value:o.id,label:o.nome};}))}/>
        <Select label="Restringir a um grupo (opcional)" value={f.plataforma||''} onChange={u('plataforma')} options={opts}/>
      </div>
      <Switch checked={f.ativo!==false} onChange={u('ativo')} label="Ativo"/>
      <p style={{margin:0,fontSize:12,fontWeight:500,color:'var(--text-secondary)'}}>Deixe "Todas" para as chaves ficarem disponíveis em qualquer plataforma. Cada plataforma controla o uso da chave separadamente.</p>
    </div>
  </Modal>;
}
function ChaveModal({gid,onClose}){
  const {Modal,Input,Select,Button}=DS;const [tipo,setTipo]=React.useState('auto');const [v,setV]=React.useState('');
  React.useEffect(function(){setTipo('auto');setV('');},[gid]);
  const t=tipo==='auto'?PIXV.detect(v):tipo;const ok=!!t&&PIXV.valid(t,v);
  function add(){if(!ok)return;DB.A.pixAddChaves(gid,[{tipo:t,valor:v}]);setV('');}
  return <Modal open={!!gid} onClose={onClose} size="sm" title="Adicionar chave" footer={<React.Fragment><Button variant="secondary" onClick={onClose}>Fechar</Button><Button variant="brand" iconLeft="plus" disabled={!ok} onClick={add}>Adicionar</Button></React.Fragment>}>
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <Select label="Tipo" value={tipo} onChange={function(e){setTipo(e.target.value);}} options={[{value:'auto',label:'Detectar automaticamente'}].concat(PIXV.TIPOS.map(function(x){return {value:x,label:PIXV.LABEL[x]};}))}/>
      <div onKeyDown={function(e){if(e.key==='Enter')add();}}><Input label="Chave" placeholder="CPF, CNPJ, telefone, email ou aleatória" value={v} onChange={function(e){setV(e.target.value);}}/></div>
      {v?<div style={{fontSize:13,fontWeight:700,display:'flex',alignItems:'center',gap:6,color:ok?'var(--ms7-green)':'var(--ms7-error)'}}><DS.Icon name={ok?'circle-check':'circle-alert'} size={16}/>{ok?PIXV.LABEL[t]+' válido · será salva como '+PIXV.format(t,v):t?PIXV.LABEL[t]+' inválido — confira os números':'Formato não reconhecido'}</div>:null}
      <p style={{margin:0,fontSize:12,fontWeight:500,color:'var(--text-secondary)'}}>Enter adiciona e mantém a janela aberta para a próxima chave.</p>
    </div>
  </Modal>;
}
function ImportModal({gid,onClose}){
  const {Modal,Input,Button,Checkbox,Select,Badge}=DS;const db=DB.get();const [txt,setTxt]=React.useState('');const [auto,setAuto]=React.useState(true);const [def,setDef]=React.useState('telefone');const [prev,setPrev]=React.useState(null);
  React.useEffect(function(){setTxt('');setPrev(null);},[gid]);
  function preview(){const exist={};allKeys(db).forEach(function(x){exist[PIXV.key(x.k.tipo,x.k.valor)]=1;});const inPay={};
    const items=txt.split(/\n/).map(function(l){return l.replace(/^\s*(cpf|cnpj|telefone|email|aleat[oó]ria|celular|chave)\s*[:\-]\s*/i,'').trim();}).filter(Boolean).map(function(v){const t=auto?PIXV.detect(v):def;const kk=t?PIXV.key(t,v):v;let s='novo';
      if(!t||!PIXV.valid(t,v))s='invalido';else if(exist[kk])s='existe';else if(inPay[kk])s='duplicado';inPay[kk]=1;return {valor:v,tipo:t,status:s};});setPrev(items);}
  const S={novo:['green','Nova'],invalido:['error','Inválida'],existe:['gray','Já cadastrada'],duplicado:['yellow','Repetida na lista']};
  const novos=prev?prev.filter(function(x){return x.status==='novo';}):[];
  return <Modal open={!!gid} onClose={onClose} size="lg" title="Importar chaves em massa" subtitle="As chaves entram disponíveis em todos os grupos de plataformas" footer={<React.Fragment><Button variant="secondary" onClick={onClose}>Cancelar</Button>{prev?<Button variant="brand" iconLeft="upload" disabled={!novos.length} onClick={function(){DB.A.pixAddChaves(gid,novos);onClose();}}>{'Importar '+novos.length+' novas'}</Button>:<Button iconLeft="scan-search" disabled={!txt.trim()} onClick={preview}>Pré-visualizar</Button>}</React.Fragment>}>
    {!prev?<div style={{display:'flex',flexDirection:'column',gap:12}}>
      <Input label="Cole as chaves (uma por linha)" multiline rows={9} placeholder={'529.982.247-25\n(11) 98888-1020\npix@email.com\ne3b0c442-98fc-4c14-9afb-f4c8996fb924'} value={txt} onChange={function(e){setTxt(e.target.value);}}/>
      <div style={{display:'flex',gap:16,alignItems:'center',flexWrap:'wrap'}}><Checkbox label="Detectar tipo automaticamente" checked={auto} onChange={setAuto}/>{!auto?<Select variant="pill" value={def} onChange={function(e){setDef(e.target.value);}} options={PIXV.TIPOS.map(function(x){return {value:x,label:PIXV.LABEL[x]};})}/>:null}
      <Button size="sm" variant="ghost" iconLeft="clipboard" onClick={function(){navigator.clipboard&&navigator.clipboard.readText().then(setTxt).catch(function(){toast('Cole com ⌘V no campo');});}}>Colar do clipboard</Button></div>
    </div>:<div style={{display:'flex',flexDirection:'column',gap:12}}>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{Object.keys(S).map(function(k){const n=prev.filter(function(x){return x.status===k;}).length;return <Badge key={k} size="sm" variant="soft" tone={S[k][0]}>{n+' '+S[k][1].toLowerCase()}</Badge>;})}<span style={{flex:1}}></span><Button size="sm" variant="ghost" iconLeft="pencil" onClick={function(){setPrev(null);}}>Editar lista</Button></div>
      <div style={{maxHeight:320,overflowY:'auto',border:'1px solid var(--border-default)',borderRadius:10}}>{prev.map(function(x,i){return <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',borderBottom:'1px solid var(--border-subtle)'}}>
        <span style={{width:74,fontSize:11,fontWeight:700,textTransform:'uppercase',color:'var(--text-secondary)'}}>{x.tipo?PIXV.LABEL[x.tipo]:'—'}</span><span style={{flex:1,fontFamily:'ui-monospace,monospace',fontSize:12}}>{x.tipo&&x.status!=='invalido'?PIXV.format(x.tipo,x.valor):x.valor}</span><Badge size="sm" tone={S[x.status][0]}>{S[x.status][1]}</Badge></div>;})}</div>
    </div>}
  </Modal>;
}
function MarcarModal({data,onClose}){
  const {Modal,Button,Checkbox}=DS;const [sel,setSel]=React.useState({});
  React.useEffect(function(){if(data){const s={};data.keys.forEach(function(k){s[k.id]=true;});setSel(s);}},[data]);
  if(!data)return null;const ids=Object.keys(sel).filter(function(k){return sel[k];});
  return <Modal open={!!data} onClose={onClose} title="Marcar chaves como usadas" subtitle={data.keys.length+' chaves copiadas. Marque as que você já enviou — ficam em uso '+(data.gps.length===1?'no '+data.gps[0]:'em todos os grupos')+'.'} footer={<React.Fragment><Button variant="secondary" onClick={onClose}>Fechar</Button><Button variant="brand" disabled={!ids.length} onClick={function(){DB.A.pixSetStatus(data.gid,ids,'usada',data.gps);onClose();}}>{'Marcar '+ids.length+' como usadas'}</Button></React.Fragment>}>
    <div style={{maxHeight:300,overflowY:'auto',border:'1px solid var(--border-default)',borderRadius:10}}>{data.keys.map(function(k){return <div key={k.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',borderBottom:'1px solid var(--border-subtle)'}}><Checkbox checked={!!sel[k.id]} onChange={function(v){setSel(function(p){const n=Object.assign({},p);n[k.id]=v;return n;});}}/><span style={{width:74,fontSize:11,fontWeight:700,textTransform:'uppercase',color:'var(--text-secondary)'}}>{PIXV.LABEL[k.tipo]}</span><span style={{fontFamily:'ui-monospace,monospace',fontSize:12}}>{k.valor}</span></div>;})}</div>
  </Modal>;
}
function VerifyModal({open,onClose}){
  const {Modal,Button,Badge}=DS;const db=DB.useDB();if(!open)return null;const r=verify(db);
  function Sec({title,tone,list,hint,act}){return <div style={{border:'1px solid var(--border-default)',borderRadius:12,overflow:'hidden'}}><div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 14px',background:'var(--ms7-gray-50)'}}><b style={{flex:1,fontSize:14}}>{title}</b><Badge size="sm" tone={list.length?tone:'green'}>{list.length}</Badge></div>
    {list.length?<div style={{maxHeight:160,overflowY:'auto'}}>{list.map(function(x,i){return <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 14px',borderTop:'1px solid var(--border-subtle)',fontSize:12}}><span style={{width:74,fontWeight:700,textTransform:'uppercase',color:'var(--text-secondary)'}}>{PIXV.LABEL[x.k.tipo]}</span><span style={{flex:1,fontFamily:'ui-monospace,monospace'}}>{x.k.valor}</span><span style={{color:'var(--text-secondary)',fontWeight:600}}>{x.g.nome+(x.gp?' · '+x.gp:'')}</span>{act?act(x):null}</div>;})}</div>:<div style={{padding:'10px 14px',fontSize:12,fontWeight:600,color:'var(--ms7-green)'}}>Tudo certo.</div>}
    {list.length&&hint?<div style={{padding:'8px 14px',fontSize:12,color:'var(--text-secondary)',borderTop:'1px solid var(--border-subtle)'}}>{hint}</div>:null}</div>;}
  return <Modal open={open} onClose={onClose} size="lg" title="Verificação das chaves PIX" subtitle={r.total+' chaves verificadas'} footer={<Button onClick={onClose}>Fechar</Button>}>
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <Sec title="Formato inválido" tone="error" list={r.inv} hint="CPF/CNPJ com dígito verificador errado, telefone sem DDD, email ou chave aleatória mal formatados." act={function(x){return <DS.IconButton icon="trash-2" size={26} iconSize={13} onClick={function(){DB.A.pixRemoveChave(x.g.id,x.k.id);}}/>;}}/>
      <Sec title="Chaves duplicadas" tone="yellow" list={r.dup} hint="A mesma chave está cadastrada mais de uma vez." act={function(x){return <DS.IconButton icon="trash-2" size={26} iconSize={13} onClick={function(){DB.A.pixRemoveChave(x.g.id,x.k.id);}}/>;}}/>
      <Sec title="Em uso sem conta vinculada" tone="yellow" list={r.orf} hint="Reservadas para uma conta da planilha que não existe mais ou trocou de chave." act={function(x){return <Button size="sm" variant="ghost" onClick={function(){DB.A.pixSetStatus(x.g.id,x.k.id,'disponivel',[x.gp]);}}>Liberar</Button>;}}/>
    </div>
  </Modal>;
}
function platOf(e){if(!e||!e.conta)return '';const c=DB.get().coops.find(function(x){return x.id===e.conta.coopId;});return c?c.plataforma:'';}
function UsedPills({k,empty}){const por=k.por||{};const ns=Object.keys(por);if(!ns.length)return empty?<Pill s="disponivel" label="Livre em todos os grupos"/>:null;
  return <div style={{display:'flex',flexWrap:'wrap',gap:4}}>{ns.map(function(n){const e=por[n];const pl=platOf(e);return <Pill key={n} s={e.status} label={n+(pl&&pl!==n?' ('+pl+')':'')}/>;})}</div>;}
function KeyCard({g,k,gp,gps}){
  const {IconButton,Button}=DS;const ok=PIXV.valid(k.tipo,k.valor);const s=PIXV.st(k,gp);const lens=gp?[gp]:gps;
  const contas=lens.map(function(n){const e=PIXV.st(k,n);return e.conta?{n:n,e:e}:null;}).filter(Boolean);
  return <div style={{display:'flex',flexDirection:'column',gap:8,padding:12,border:'1px solid '+(s.status==='bloqueada'?'color-mix(in oklab, var(--ms7-error) 35%, transparent)':'var(--border-subtle)'),borderRadius:12,background:'var(--surface-card, #fff)'}}>
    <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:10,fontWeight:800,letterSpacing:'.06em',textTransform:'uppercase',color:'var(--text-secondary)',flex:1}}>{PIXV.LABEL[k.tipo]||k.tipo}</span>{gp?<Pill s={s.status}/>:null}</div>
    <div style={{fontFamily:'ui-monospace,monospace',fontSize:13,fontWeight:600,wordBreak:'break-all',textDecoration:s.status==='bloqueada'?'line-through':'none'}}>{k.valor}</div>
    {!ok?<div style={{fontSize:11,fontWeight:700,color:'var(--ms7-error)',display:'flex',gap:4,alignItems:'center'}}><DS.Icon name="circle-alert" size={12}/>Formato inválido</div>:null}
    {!gp?<UsedPills k={k} empty={true}/>:null}
    {contas.map(function(x){return <div key={x.n} style={{fontSize:11,fontWeight:600,color:'var(--text-secondary)'}}>{(gp?'':x.n+': ')+'conta '+x.e.conta.usuario+(platOf(x.e)?' · '+platOf(x.e):'')+' · '+x.e.conta.coopId+(x.e.em?' · '+DB.fmtDate(x.e.em):'')}</div>;})}
    {gp&&!s.conta&&s.status!=='disponivel'&&s.em?<div style={{fontSize:11,fontWeight:600,color:'var(--text-secondary)'}}>{'Desde '+DB.fmtDate(s.em)}</div>:null}
    <div style={{display:'flex',alignItems:'center',gap:2,marginTop:2}}>
      <IconButton icon="copy" size={28} iconSize={14} label="Copiar" onClick={function(){copy(k.valor);toast('Chave copiada');}}/>
      {s.status==='disponivel'?<IconButton icon="check-check" size={28} iconSize={14} label={gp?'Marcar como usada no '+gp:'Marcar como usada em todos os grupos'} onClick={function(){DB.A.pixSetStatus(g.id,k.id,'usada',lens);}}/>:null}
      {s.status!=='bloqueada'?<IconButton icon="ban" size={28} iconSize={14} label={gp?'Bloquear no '+gp:'Bloquear em todos os grupos'} onClick={function(){DB.A.pixSetStatus(g.id,k.id,'bloqueada',lens);}}/>:null}
      <span style={{flex:1}}></span>
      {s.status!=='disponivel'?<Button size="sm" variant="ghost" iconLeft="rotate-ccw" onClick={function(){if(contas.length&&!confirm('A chave está vinculada à conta '+contas[0].e.conta.usuario+'. Liberar mesmo assim?'))return;DB.A.pixSetStatus(g.id,k.id,'disponivel',lens);}}>{(s.status==='bloqueada'?'Desbloquear':'Liberar')+(gp?'':' tudo')}</Button>
        :<IconButton icon="trash-2" size={28} iconSize={14} label="Remover" onClick={function(){DB.A.pixRemoveChave(g.id,k.id);}}/>}
    </div>
  </div>;
}
function PixManager(){
  const {Card,Button,Badge,IconButton,Select,Input,Checkbox,Tabs}=DS;const db=DB.useDB();
  const [fOp,setFOp]=usePersist('pix-fop','');const [fAt,setFAt]=usePersist('pix-fat',true);const [lens,setLens]=usePersist('pix-gp',ALL);
  const [open,setOpen]=React.useState(null);const [kf,setKf]=React.useState('todas');const [q,setQ]=React.useState('');
  const [gm,setGm]=React.useState(null);const [cm,setCm]=React.useState(null);const [im,setIm]=React.useState(null);const [mm,setMm]=React.useState(null);const [vm,setVm]=React.useState(false);
  const gps=PIXV.grupos(db);const gp=lens!==ALL&&gps.indexOf(lens)>=0?lens:'';const lensGps=gp?[gp]:gps;
  const [fTit,setFTit]=React.useState('');const titK=function(g){return String(g.nome||'Sem nome').trim().toLowerCase();};
  const grupos0=DB.pixOrd(db.pix).filter(function(g){return (!fOp||g.opId===fOp)&&(!fAt||g.ativo!==false)&&(!gp||!g.plataforma||g.plataforma===gp||PIXV.gp(db,g.plataforma)===gp);});
  const titulares=[];grupos0.forEach(function(g){const k=titK(g);if(!titulares.some(function(t){return t.k===k;}))titulares.push({k:k,nome:String(g.nome||'Sem nome').trim()});});
  const grupos=fTit?grupos0.filter(function(g){return titK(g)===fTit;}):grupos0;
  const tot=grupos.reduce(function(a,g){const s=stats(g,gp);a.total+=s.total;a.disponivel+=s.disponivel;a.usada+=s.usada;a.bloqueada+=s.bloqueada;return a;},{total:0,disponivel:0,usada:0,bloqueada:0});
  const dispIn=function(n){return db.pix.filter(function(g){return g.ativo!==false&&(!g.plataforma||g.plataforma===n||PIXV.gp(db,g.plataforma)===n);}).reduce(function(a,g){return a+g.chaves.filter(function(k){return PIXV.st(k,n).status==='disponivel';}).length;},0);};
  let found=null;if(q.trim()){const t=PIXV.detect(q);const kk=t?PIXV.key(t,q):q.trim().toLowerCase();found=allKeys(db).filter(function(x){return PIXV.key(x.k.tipo,x.k.valor)===kk||x.k.valor.toLowerCase().indexOf(q.trim().toLowerCase())>=0;});found={t:t,ok:t&&PIXV.valid(t,q),list:found};}
  function copiarBloco(g){const ks=g.chaves.filter(function(k){return PIXV.st(k,gp).status==='disponivel';});if(!ks.length){toast('Não há chaves disponíveis nesse lote'+(gp?' no '+gp:''));return;}copy(ks.map(function(k){return PIXV.LABEL[k.tipo]+': '+k.valor;}).join('\n'));toast(ks.length+' chaves copiadas');setMm({gid:g.id,keys:ks,gps:lensGps});}
  const sfx=gp?' no '+gp:'';
  return <div style={{display:'flex',flexDirection:'column',gap:20}}>
    <div style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}><span style={{fontSize:14,fontWeight:500,color:'var(--text-secondary)',flex:1}}>Gerencie os lotes de chaves PIX e onde cada chave está em uso</span><Button variant="outline" iconLeft="shield-check" onClick={function(){setVm(true);}}>Verificar chaves</Button><Button iconLeft="plus" onClick={function(){setGm({g:null});}}>Novo lote</Button></div>
    <Card padding={18}>
      <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
        <span style={{width:38,height:38,borderRadius:10,background:'var(--ms7-lime-100)',color:'var(--ms7-green-ink, #005D3B)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><DS.Icon name="layers" size={18}/></span>
        <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',gap:8}}>
          <b style={{fontSize:15}}>Disponibilidade por plataforma</b>
          <p style={{margin:0,fontSize:13,fontWeight:500,lineHeight:1.55,textWrap:'pretty'}}>Cada chave tem uma situação separada em cada plataforma. Quando uma chave é usada na <b>{gps[0]||'Lua 777'}</b>, ela fica <b>Em uso</b> só nela e continua <b>Disponível</b> na <b>{gps[1]||'Buscas 123'}</b> e nas outras plataformas. A rede não muda nada: em qualquer rede da mesma plataforma a chave continua em uso.</p>
          <div style={{marginTop:4,maxWidth:gps.length>6?360:'none'}}>{gps.length>6?<Select value={gp||ALL} onChange={function(e){setLens(e.target.value);}} options={[{value:ALL,label:'Todos os grupos'}].concat(gps.map(function(n){return {value:n,label:n+' — '+dispIn(n)+' disponíveis'};}))}/>:<Tabs variant="chips" value={gp||ALL} onChange={setLens} items={[{id:ALL,label:'Todos os grupos'}].concat(gps.map(function(n){return {id:n,label:n,count:dispIn(n)};}))}/>}</div>
          <span style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)'}}>{gp?'Plataformas neste grupo: '+PIXV.plats(db,gp).join(', ')+'. O número ao lado de cada grupo é quantas chaves estão disponíveis nele.':'Visão geral: cada chave mostra só os grupos onde foi usada ou bloqueada. Nos demais ela está disponível.'}</span>
        </div>
      </div>
    </Card>
    <KpiRow min={150} items={[{icon:'folder-key',label:'Lotes',value:grupos.length,tone:'blue'},{icon:'key-round',label:'Total de chaves',value:tot.total,tone:'black'},{icon:'circle-check',label:gp?'Disponíveis'+sfx:'Livres em todos os grupos',value:tot.disponivel,tone:'green'},{icon:'circle-dot',label:gp?'Em uso'+sfx:'Em uso em algum grupo',value:tot.usada,tone:'yellow'},{icon:'ban',label:gp?'Bloqueadas'+sfx:'Bloqueadas em algum grupo',value:tot.bloqueada,tone:'orange'}]}/>
    {(function(){const m={};grupos0.forEach(function(g){const nm=String(g.nome||'Sem nome').trim();const k=nm.toLowerCase();const s=stats(g,gp);if(!m[k])m[k]={k:k,nome:nm,total:0,disponivel:0,usada:0,bloqueada:0,bancos:[]};const t=m[k];t.total+=s.total;t.disponivel+=s.disponivel;t.usada+=s.usada;t.bloqueada+=s.bloqueada;t.bancos.push({id:g.id,b:g.pagamento||'Sem banco',n:s.total,d:s.disponivel});});
      const L=Object.keys(m).map(function(k){return m[k];}).sort(function(a,b){return a.nome.localeCompare(b.nome,'pt-BR',{numeric:true,sensitivity:'base'});});if(!L.length)return null;
      return <Card title={'Chaves por titular · '+L.length} action={fTit?<DS.Button size="sm" variant="outline" iconLeft="x" onClick={function(){setFTit('');}}>Mostrar todos</DS.Button>:<span style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)'}}>Clique num titular para ver só os lotes dele</span>}><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,250px),1fr))',gap:12}}>{L.map(function(t){const on=fTit===t.k;return <div key={t.k} role="button" tabIndex={0} onClick={function(){setFTit(on?'':t.k);}} onKeyDown={function(e){if(e.key==='Enter')setFTit(on?'':t.k);}} style={{border:on?'2px solid #005D3B':'1px solid var(--border-subtle)',background:on?'var(--ms7-lime-100, #E9F7D9)':'transparent',borderRadius:14,padding:on?13:14,display:'flex',flexDirection:'column',gap:10,cursor:'pointer',opacity:fTit&&!on?.55:1,transition:'opacity .15s'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}><span style={{padding:'4px 10px',borderRadius:8,background:'#005D3B',color:'#fff',fontSize:13,fontWeight:800,letterSpacing:'.02em',textTransform:'uppercase',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.nome}</span><b style={{fontSize:20,fontVariantNumeric:'tabular-nums',whiteSpace:'nowrap'}}>{t.total}<span style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)'}}>{t.total===1?' chave':' chaves'}</span></b></div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}><DS.Badge size="sm" variant="soft" tone="green">{t.disponivel+(t.disponivel===1?' disponível':' disponíveis')}</DS.Badge>{t.usada?<DS.Badge size="sm" variant="soft" tone="yellow">{t.usada+' em uso'}</DS.Badge>:null}{t.bloqueada?<DS.Badge size="sm" variant="soft" tone="orange">{t.bloqueada+(t.bloqueada===1?' bloqueada':' bloqueadas')}</DS.Badge>:null}</div>
        <div style={{display:'flex',flexDirection:'column',gap:4,borderTop:'1px solid var(--border-subtle)',paddingTop:8}}>{t.bancos.map(function(b){return <div key={b.id} style={{display:'flex',justifyContent:'space-between',gap:8,fontSize:13,fontWeight:600}}><span style={{display:'flex',alignItems:'center',gap:6,minWidth:0}}><DS.Icon name="landmark" size={13} color="var(--text-secondary)"/><span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{b.b}</span></span><span style={{whiteSpace:'nowrap',color:'var(--text-secondary)'}}>{b.n+' · '+b.d+' livres'}</span></div>;})}</div>
      </div>;})}</div></Card>;})()}
    <Card padding={16}><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12,alignItems:'end'}}>
      <Select label="Titular" value={fTit} onChange={function(e){setFTit(e.target.value);}} options={[{value:'',label:'Todos os titulares'}].concat(titulares.map(function(t){return {value:t.k,label:t.nome};}))}/>
      <Select label="Operador" value={fOp} onChange={function(e){setFOp(e.target.value);}} options={[{value:'',label:'Todos os operadores'}].concat(db.operadores.map(function(o){return {value:o.id,label:o.nome};}))}/>
      <Input label="Verificar uma chave" icon="search" placeholder="Cole a chave para ver onde está" value={q} onChange={function(e){setQ(e.target.value);}}/>
      <div style={{height:44,display:'flex',alignItems:'center'}}><Checkbox label="Apenas lotes ativos" checked={fAt} onChange={setFAt}/></div>
    </div>
    {found?<div style={{marginTop:14,padding:12,borderRadius:10,background:'var(--ms7-gray-50)',display:'flex',flexDirection:'column',gap:8}}>
      <div style={{fontSize:13,fontWeight:700,color:found.ok?'var(--ms7-green)':'var(--ms7-error)'}}>{found.t?(PIXV.LABEL[found.t]+(found.ok?' válido':' com formato inválido')):'Formato não reconhecido'}{' · '+(found.list.length?found.list.length+' encontrada(s)':'não cadastrada')}</div>
      {found.list.map(function(x){return <div key={x.k.id} style={{display:'flex',flexDirection:'column',gap:6}}><div style={{display:'flex',alignItems:'center',gap:10,fontSize:13,flexWrap:'wrap'}}><span style={{fontFamily:'ui-monospace,monospace'}}>{x.k.valor}</span><span style={{fontWeight:600,color:'var(--text-secondary)'}}>{'Lote: '+x.g.nome}</span></div>
        <UsedPills k={x.k} empty={true}/></div>;})}
      {!found.list.length&&found.ok?<div><Button size="sm" variant="secondary" iconLeft="plus" onClick={function(){if(!db.pix.length){toast('Crie um lote primeiro');return;}setCm(db.pix[0].id);}}>Cadastrar essa chave</Button></div>:null}
    </div>:null}</Card>
    {grupos.length===0?<Card><Empty icon="key-round" title="Nenhum lote de chaves PIX" sub="Crie um lote para começar a gerenciar chaves PIX para cooperações."/></Card>:null}
    <div style={{display:'flex',flexDirection:'column',gap:12}}>{grupos.map(function(g){const s=stats(g,gp);const on=open===g.id;
      const keys=g.chaves.filter(function(k){return kf==='todas'||PIXV.st(k,gp).status===kf;});
      return <Card key={g.id} padding={0}>
        <div style={{display:'flex',alignItems:'center',gap:12,padding:'14px 18px',flexWrap:'wrap'}}>
          <span style={{width:38,height:38,borderRadius:10,background:'var(--ms7-lime-100)',color:'var(--ms7-green-ink, #005D3B)',display:'flex',alignItems:'center',justifyContent:'center'}}><DS.Icon name="key-round" size={18}/></span>
          <div style={{flex:'1 1 200px',minWidth:0,cursor:'pointer'}} onClick={function(){setOpen(on?null:g.id);setKf('todas');}}>
            <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}><b style={{fontSize:16}}>{g.nome}</b><Badge size="sm" variant="soft" tone="blue">{g.plataforma?'Só '+PIXV.gp(db,g.plataforma):'Todos os grupos'}</Badge>{g.ativo===false?<Badge size="sm" tone="gray">Inativo</Badge>:null}</div>
            <div style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)'}}>{(g.pagamento||'—')+' · '+(g.opId?DB.opName(g.opId):'Todos os operadores')}</div></div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}><Badge size="sm" variant="soft" tone="green">{s.disponivel+(gp?' disponíveis':' livres')}</Badge><Badge size="sm" variant="soft" tone="yellow">{s.usada+' em uso'}</Badge>{s.bloqueada?<Badge size="sm" variant="soft" tone="error">{s.bloqueada+' bloqueadas'}</Badge>:null}</div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
            <Button size="sm" variant="secondary" iconLeft="plus" onClick={function(){setCm(g.id);}}>Adicionar</Button>
            <Button size="sm" variant="secondary" iconLeft="upload" onClick={function(){setIm(g.id);}}>Importar em massa</Button>
            <Button size="sm" variant="secondary" iconLeft="clipboard-copy" onClick={function(){copiarBloco(g);}}>Copiar bloco</Button>
            <Button size="sm" variant="ghost" iconLeft={on?'chevron-up':'chevron-down'} onClick={function(){setOpen(on?null:g.id);setKf('todas');}}>{on?'Ocultar':'Ver chaves'}</Button>
            <IconButton icon="pencil" size={30} iconSize={15} label="Editar lote" onClick={function(){setGm({g:g});}}/>
            <IconButton icon="trash-2" size={30} iconSize={15} label="Remover lote" onClick={function(){const u=stats(g,'').usada;if(u&&!confirm('Esse lote tem '+u+' chaves em uso. Remover mesmo assim?'))return;if(!u&&!confirm('Remover o lote '+g.nome+' e todas as chaves?'))return;DB.A.pixRemoveGrupo(g.id);}}/>
          </div>
        </div>
        {on?<div style={{borderTop:'1px solid var(--border-subtle)',padding:16,display:'flex',flexDirection:'column',gap:12,background:'var(--ms7-gray-50)'}}>
          <Tabs variant="chips" value={kf} onChange={setKf} items={[{id:'todas',label:'Todas',count:s.total},{id:'disponivel',label:gp?'Disponíveis':'Livres',count:s.disponivel},{id:'usada',label:'Em uso',count:s.usada},{id:'bloqueada',label:'Bloqueadas',count:s.bloqueada}]}/>
          {keys.length?<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:10}}>{keys.map(function(k){return <KeyCard key={k.id} g={g} k={k} gp={gp} gps={gps}/>;})}</div>:<div style={{padding:16,textAlign:'center',fontSize:13,color:'var(--text-secondary)'}}>Nenhuma chave correspondente ao filtro selecionado.</div>}
        </div>:null}
      </Card>;})}</div>
    <GrupoModal open={!!gm} g={gm&&gm.g} onClose={function(){setGm(null);}}/>
    <ChaveModal gid={cm} onClose={function(){setCm(null);}}/>
    <ImportModal gid={im} onClose={function(){setIm(null);}}/>
    <MarcarModal data={mm} onClose={function(){setMm(null);}}/>
    <VerifyModal open={vm} onClose={function(){setVm(false);}}/>
  </div>;
}
Object.assign(window,{PixManager:PixManager});
})();