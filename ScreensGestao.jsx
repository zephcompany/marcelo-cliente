(function(){
const DS=window.MS7DesignSystem_5d5172;
function OperadoresTab(){
  const {Card,DataTable,Switch,IconButton,Button,Modal,Input,Avatar,Badge}=DS;const db=DB.useDB();const rows=db.operadores;const [edit,setEdit]=React.useState(null);const [f,setF]=React.useState({});const [inv,setInv]=React.useState(false);const real=!!(DB.Sync.token&&DB.Sync.token());const [users,setUsers]=React.useState([]);const [busy,setBusy]=React.useState(false);
  function loadU(){if(real)DB.Sync.api('/api/users').then(function(l){setUsers(l||[]);}).catch(function(){});}React.useEffect(loadU,[]);
  const accOf=function(id){return users.find(function(x){return x.role==='operador'&&x.opId===id;});};
  const isCliG=JSON.parse(localStorage.getItem('ms7op-session')||'{}').role==='cliente';const used=rows.filter(function(r){return r.ativo;}).length;const coops=function(id){return db.coops.filter(function(c){return c.opId===id&&c.status!=='Lixeira';}).length;};
  function open(r){loadU();const ac=r&&accOf(r.id);setF(r?{id:r.id,nome:r.nome,email:(ac&&ac.email)||r.email||'',senha:'',accId:ac?ac.id:'',ciclo:r.ciclo,comTipo:r.comTipo||'pct',comValor:String(r.comValor!=null?r.comValor:r.pct),comConta:r.comConta!=null?String(r.comConta):''}:{nome:'',email:'',senha:'',accId:'',ciclo:7,comTipo:'pct',comValor:'15'});setEdit(r?r.id:'new');}
  function save(){const nome=String(f.nome||'').trim(),em=String(f.email||'').trim().toLowerCase(),pw=String(f.senha||'');if(!nome){toast('Informe o nome do operador');return;}
    if(real&&em){if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){toast('Email inválido');return;}if(!f.accId&&pw.length<8){toast('Crie uma senha com no mínimo 8 caracteres');return;}if(pw&&pw.length<8){toast('Senha com no mínimo 8 caracteres');return;}}
    const cv=parseFloat(String(f.comValor||'').replace(/\./g,'').replace(',','.'))||0;const id=f.id||'op'+Date.now();const o=Object.assign({},f,{id:id,nome:nome,email:em,comTipo:f.comTipo||'pct',comValor:cv,comConta:parseFloat(String(f.comConta||'').replace(',','.'))||0},f.comTipo==='pct'||!f.comTipo?{pct:cv}:{});delete o.senha;delete o.accId;
    const fim=function(){DB.A.saveOperador(o);setEdit(null);loadU();};
    if(!real||!em){fim();return;}setBusy(true);DB.Sync.api('/api/users',{method:'POST',body:JSON.stringify({id:f.accId||undefined,email:em,name:nome,role:'operador',opId:id,password:pw||undefined,ativo:true})}).then(function(){fim();toast(f.accId?'Operador e acesso salvos':'Operador criado: ele já entra com '+em);}).catch(function(e){toast(e.message||'Não foi possível criar o acesso');}).then(function(){setBusy(false);});}
  const u=function(k){return function(e){const v=e.target.value;setF(function(p){const n=Object.assign({},p);n[k]=v;return n;});};};
  const vagasTop=isCliG&&window.VagasCard?<VagasCard/>:null;
  return <div style={{display:'flex',flexDirection:'column',gap:20}}>{vagasTop}<Card title="Operadores" action={<div style={{display:'flex',gap:10,alignItems:'center'}}>{isCliG?null:<Badge size="sm" variant="soft" tone={used>=10?'error':'green'}>{'Seats '+used+'/10'}</Badge>}<Button size="sm" iconLeft="plus" onClick={function(){if(window.podeNovoOperador&&!window.podeNovoOperador())return;open(null);}}>Novo operador</Button></div>}>
    <Hint>Cadastre o operador aqui com email e senha: ele já entra no painel com esse acesso. Depois envie o endereço do painel, o email e a senha para ele.</Hint>
    <DataTable rows={rows} columns={[{key:'nome',label:'Nome',render:function(r){return <div style={{display:'flex',alignItems:'center',gap:10}}><Avatar name={r.nome} size={32}/><div><b>{r.nome}</b><div style={{fontSize:12,color:'var(--text-secondary)'}}>{(accOf(r.id)||{}).email||r.email||'—'}</div></div></div>;}},{key:'acesso',label:'Acesso',align:'center',render:function(r){if(!real)return '—';const ac=accOf(r.id);return <Badge size="sm" variant="soft" tone={ac?(ac.ativo?'green':'gray'):'yellow'}>{ac?(ac.ativo?'Pode entrar':'Bloqueado'):'Sem acesso'}</Badge>;}},{key:'coops',label:'Coops',align:'center',render:function(r){return coops(r.id);}},
      {key:'ativo',label:'Ativo',align:'center',render:function(r){return <Switch checked={r.ativo} onChange={function(v){DB.A.saveOperador({id:r.id,ativo:v});}}/>;}},
      {key:'a',label:'',align:'right',render:function(r){return <div style={{display:'inline-flex',gap:2}}><IconButton icon="pencil" size={30} iconSize={16} onClick={function(){open(r);}}/><IconButton icon="trash-2" size={30} iconSize={16} onClick={function(){if(coops(r.id)){toast('Esse operador tem cooperações. Desative em vez de remover.');return;}if(confirm('Remover '+r.nome+'?'))DB.A.removeOperador(r.id);}}/></div>;}}]}/>
    <Modal open={!!edit} onClose={function(){setEdit(null);}} title={edit==='new'?'Novo operador':'Editar operador'} footer={<React.Fragment><Button variant="secondary" onClick={function(){setEdit(null);}}>Cancelar</Button><Button variant="brand" disabled={busy} onClick={save}>Salvar</Button></React.Fragment>}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}><div style={{gridColumn:'1 / -1'}}><Input label="Nome" required value={f.nome||''} onChange={u('nome')}/></div><Input label="Email (login)" value={f.email||''} onChange={u('email')}/><Input label={f.accId?'Nova senha':'Senha'} type="password" value={f.senha||''} onChange={u('senha')} placeholder={f.accId?'Deixe em branco para manter':'Mínimo 8 caracteres'}/>{!real?<div style={{gridColumn:'1 / -1',fontSize:12,fontWeight:600,color:'var(--text-secondary)'}}>No modo demonstração o acesso não é criado. No servidor, email e senha viram o login do operador.</div>:null}</div>
    </Modal>
    <Modal open={inv} onClose={function(){setInv(false);}} size="sm" title="Convidar operador" footer={<Button onClick={function(){setInv(false);}}>Entendi</Button>}>
      <p style={{margin:0,fontSize:14,fontWeight:500,lineHeight:1.5}}>Para dar acesso a um operador, vá em <b>Configurações → Acessos</b>, crie o login (email e senha) e vincule ao operador. Depois envie o endereço do painel e os dados de acesso para ele.</p>
    </Modal>
  </Card></div>;
}
function GruposTab(){
  const {Card,DataTable,Button,Badge,IconButton,Select}=DS;const names=MS7.grupos;const [sel,setSel]=React.useState(names[0]);
  const members=MS7.operadores.slice(0,4).map(function(o,i){return {id:o.id,nome:o.nome,email:o.nome.toLowerCase().split(' ')[0]+'@ms7.com',perfil:i===0?'Admin':'Operador',ativo:o.ativo};});
  return <Grid min={300}>
    <Card title="Grupos" action={<IconButton icon="plus" variant="dark" size={30} iconSize={16} onClick={function(){toast('Grupo criado');}}/>}>
      <div style={{display:'flex',flexDirection:'column',gap:4}}>{names.map(function(n,i){const on=n===sel;return <button key={n} onClick={function(){setSel(n);}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:10,border:'none',cursor:'pointer',textAlign:'left',background:on?'var(--ms7-lime-100)':'transparent',fontFamily:'var(--font-sans)',fontSize:14,fontWeight:600,color:on?'var(--ms7-green-ink, #005D3B)':'var(--text-primary)'}}><DS.Icon name="users" size={16}/><span style={{flex:1}}>{n}</span><span style={{fontSize:12,color:'var(--text-secondary)'}}>{4-i%2}</span></button>;})}</div>
    </Card>
    <Card title={sel} action={<div style={{display:'flex',gap:8}}><Select variant="pill" placeholder="Adicionar usuário" options={MS7.operadores.slice(4).map(function(o){return o.nome;})}/></div>}>
      <Hint>Grupos direcionam avisos e notificações.</Hint>
      <DataTable rows={members} columns={[{key:'nome',label:'Nome',render:function(r){return <b>{r.nome}</b>;}},{key:'email',label:'Email'},{key:'perfil',label:'Perfil',render:function(r){return <Badge size="sm" variant="soft" tone={r.perfil==='Admin'?'purple':'blue'}>{r.perfil}</Badge>;}},{key:'ativo',label:'Ativo',align:'center',render:function(r){return r.ativo?<DS.Icon name="check" size={16} color="var(--ms7-green)"/>:'—';}},{key:'x',label:'',align:'right',render:function(){return <IconButton icon="user-minus" size={30} iconSize={16}/>;}}]}/>
    </Card>
  </Grid>;
}
function PlataformasTab(){
  const {Card,Button,Input,Modal}=DS;const db=DB.useDB();const [v,setV]=React.useState({plataformas:'',redes:'',grupo:''});const [imp,setImp]=React.useState(null);const [txt,setTxt]=React.useState('');const [ed,setEd]=React.useState(null);const [gv,setGv]=React.useState('');const [nm,setNm]=React.useState('');const [sel,setSel]=React.useState(null);
  const tog=function(id){setSel(function(s){const ids=Object.assign({},s.ids);if(ids[id])delete ids[id];else ids[id]=1;return {col:s.col,ids:ids};});};
  function Tools(col){const on=sel&&sel.col===col;const cnt=on?Object.keys(sel.ids).length:0;const all=db[col];
    if(!on)return <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'flex-end'}}><Button size="sm" variant="ghost" iconLeft="list-checks" disabled={!all.length} onClick={function(){setSel({col:col,ids:{}});}}>Selecionar</Button><Button size="sm" variant="outline" iconLeft="upload" onClick={function(){setTxt('');setImp(col);}}>Importar</Button></div>;
    return <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'flex-end'}}><Button size="sm" variant="ghost" onClick={function(){const ids={};if(cnt<all.length)all.forEach(function(x){ids[x.id]=1;});setSel({col:col,ids:ids});}}>{cnt<all.length?'Selecionar todas':'Limpar seleção'}</Button><Button size="sm" variant="secondary" onClick={function(){setSel(null);}}>Cancelar</Button><Button size="sm" variant="brand" iconLeft="trash-2" disabled={!cnt} onClick={function(){const xs=all.filter(function(x){return sel.ids[x.id];});const at=xs.reduce(function(a,x){return a+uso(col,x.nome);},0);if(!confirm('Excluir '+cnt+(col==='redes'?' rede(s)':' plataforma(s)')+'?\n\n'+xs.map(function(x){return x.nome;}).join(', ')+(at?'\n\nAtenção: '+at+' cooperação(ões) em andamento usam esses nomes.':'')))return;xs.forEach(function(x){DB.A.removeLista(col,x.id);});setSel(null);toast(cnt+' excluída(s)');}}>{'Excluir'+(cnt?' ('+cnt+')':'')}</Button></div>;}
  const set=function(k,x){setV(function(o){const n=Object.assign({},o);n[k]=x;return n;});};
  const f=function(col){return col==='plataformas'?'plataforma':'rede';};
  const uso=function(col,n){return db.coops.filter(function(c){return c[f(col)]===n&&(c.status==='Em andamento'||c.status==='Ativa');}).length;};
  const hist=function(col,n){return db.coops.filter(function(c){return c[f(col)]===n&&!(c.status==='Em andamento'||c.status==='Ativa');}).length;};
  function remover(col,x){const n=uso(col,x.nome),h=hist(col,x.nome);if(!confirm('Remover '+x.nome+'?'+(n?'\n\nAtenção: '+n+' cooperação(ões) em andamento usam esse nome. Elas continuam existindo, só com esse nome antigo.':'')+(h&&!n?'\n\nAs cooperações antigas continuam no histórico.':'')))return;DB.A.removeLista(col,x.id);}
  function removerGrupo(n,ps){if(!confirm('Remover o grupo '+n+' e as plataformas '+ps.map(function(p){return p.nome;}).join(', ')+'? Cooperações finalizadas continuam no histórico.'))return;ps.forEach(function(p){DB.A.removeLista('plataformas',p.id);});toast('Grupo '+n+' removido');}
  function desagrupar(n,ps){if(!confirm('Desfazer o grupo '+n+'? As plataformas continuam, cada uma com chaves independentes.'))return;ps.forEach(function(p){DB.A.setPlataformaGrupo(p.id,'');});}
  function Chip(p){const x=p.x,col=p.col;const n=uso(col,x.nome);
    if(sel&&sel.col===col){const ck=!!sel.ids[x.id];return <button onClick={function(){tog(x.id);}} style={{display:'inline-flex',alignItems:'center',gap:8,height:34,padding:'0 12px',borderRadius:10,border:'2px solid '+(ck?'var(--ms7-green-900)':'transparent'),background:ck?'var(--ms7-lime-100)':'var(--ms7-gray-100)',color:'var(--text-primary)',fontFamily:'inherit',fontSize:14,fontWeight:600,cursor:'pointer'}}><DS.Icon name={ck?'square-check':'square'} size={16}/>{x.nome}</button>;}
    return <span style={{display:'inline-flex',alignItems:'center',gap:8,height:34,padding:'0 6px 0 12px',borderRadius:10,background:'var(--ms7-gray-100)',fontSize:14,fontWeight:600}}><DS.Icon name={p.icon} size={15}/>{x.nome}{n?<span title="Cooperações em andamento" style={{fontSize:11,fontWeight:700,color:'var(--ms7-orange)'}}>{n+' ativa'+(n>1?'s':'')}</span>:null}
    {col==='plataformas'?<button onClick={function(){setGv(x.grupo||'');setNm(x.nome);setEd(x);}} aria-label="Editar" title="Renomear ou mudar grupo" style={{border:'none',background:'none',cursor:'pointer',display:'flex',padding:2,color:'inherit'}}><DS.Icon name="layers" size={14}/></button>:null}
    <button onClick={function(){remover(col,x);}} aria-label="Remover" title={n?n+' em andamento':'Remover'} style={{border:'none',background:'none',cursor:'pointer',display:'flex',padding:2,color:'inherit'}}><DS.Icon name="x" size={14}/></button></span>;}
  const gps=PIXV.grupos(db);
  return <React.Fragment><Grid min={400}>
    <Card title="Redes" action={Tools('redes')}><Hint>Redes que aparecem na Nova cooperação. A plataforma não fica salva: você digita o nome dela em cada cooperação.</Hint>
      <div style={{display:'flex',gap:10,marginBottom:14,flexWrap:'wrap'}}><div style={{flex:'1 1 160px',minWidth:0}}><Input placeholder="Nova rede" value={v.redes} onChange={function(e){set('redes',e.target.value);}}/></div><Button iconLeft="plus" onClick={function(){DB.A.addLista('redes',v.redes);set('redes','');}}>Adicionar</Button></div>
      <div style={{display:'flex',flexWrap:'wrap',gap:8}}>{db.redes.map(function(x){return <Chip key={x.id} x={x} col="redes" icon="network"/>;})}</div></Card>
  </Grid>
    <Modal open={!!ed} onClose={function(){setEd(null);}} size="sm" title={ed?'Editar '+ed.nome:''} footer={<React.Fragment><Button variant="secondary" onClick={function(){setEd(null);}}>Cancelar</Button><Button variant="brand" onClick={function(){if(String(nm).trim()&&nm.trim()!==ed.nome)DB.A.renamePlataforma(ed.id,nm);DB.A.setPlataformaGrupo(ed.id,gv);setEd(null);}}>Salvar</Button></React.Fragment>}>
      <div style={{display:'flex',flexDirection:'column',gap:12}}><Input label="Nome da plataforma" value={nm} onChange={function(e){setNm(e.target.value);}} hint="Renomear atualiza as cooperações e os lotes de chaves que usam esse nome"/><Input label="Grupo de plataformas" placeholder="ex: Equipe 771" value={gv} onChange={function(e){setGv(e.target.value);}} hint="Em branco = chaves independentes só para esta plataforma"/>
        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{gps.filter(function(n){return db.plataformas.some(function(p){return p.grupo===n;});}).map(function(n){return <Button key={n} size="sm" variant={gv===n?'primary':'secondary'} onClick={function(){setGv(n);}}>{n}</Button>;})}</div></div>
    </Modal>
    <Modal open={!!imp} onClose={function(){setImp(null);}} title={'Importar '+(imp==='redes'?'redes':'plataformas')} footer={<React.Fragment><Button variant="secondary" onClick={function(){setImp(null);}}>Cancelar</Button><Button variant="brand" iconLeft="upload" onClick={function(){txt.split(/\n|;/).forEach(function(l){const p=l.split('|');if(p[0].trim())DB.A.addLista(imp,p[0],imp==='plataformas'?{grupo:(p[1]||'').trim()}:null);});setImp(null);}}>Importar</Button></React.Fragment>}>
      <Input label={imp==='plataformas'?'Uma por linha — opcional: Plataforma | Grupo':'Um nome por linha'} multiline rows={8} placeholder={imp==='plataformas'?'Vértice | Grupo KF\nArena7 | Equipe 771':''} value={txt} onChange={function(e){setTxt(e.target.value);}}/>
    </Modal></React.Fragment>;
}
const CONF_PIX_ATIVA=true; // Conferência de saques desligada por enquanto: troque para true para voltar
function PixTab(){if(!CONF_PIX_ATIVA)return <PixManager/>;const [t,setT]=React.useState(function(){return localStorage.getItem('ms7op-pix-aba')||'chaves';});const ch=function(v){setT(v);localStorage.setItem('ms7op-pix-aba',v);};return <div style={{display:'flex',flexDirection:'column',gap:18}}><DS.Tabs variant="dark" value={t} onChange={ch} items={[{id:'chaves',label:'Chaves'},{id:'conf',label:'Conferência de saques'}]} style={{maxWidth:440}}/>{t==='conf'?<ConferenciaPix/>:<PixManager/>}</div>;}
function MetasTab(){
  const {Card,Button,Modal,Input,Select,IconButton,Badge}=DS;const [open,setOpen]=React.useState(false);
  const metas=[{nome:'Meta coletiva de setembro',alvo:250000,atual:197060,tipo:'Resultado',rec:'Bônus de 2% na comissão'},{nome:'100 cooperações no mês',alvo:100,atual:74,tipo:'Cooperações',rec:'Jantar da equipe'},{nome:'Depositantes novos',alvo:2000,atual:1746,tipo:'Depositantes',rec:'R$ 500 para o top 3'}];
  return <div style={{display:'flex',flexDirection:'column',gap:16}}>
    <div style={{display:'flex',justifyContent:'flex-end'}}><Button iconLeft="plus" onClick={function(){setOpen(true);}}>Nova meta</Button></div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:20}}>{metas.map(function(m){const p=Math.min(100,Math.round(m.atual/m.alvo*100));const money=m.tipo==='Resultado';return <Card key={m.nome}>
      <div style={{display:'flex',alignItems:'flex-start',gap:10}}><span style={{width:36,height:36,borderRadius:10,background:'var(--ms7-lime-100)',color:'var(--ms7-green-ink, #005D3B)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><DS.Icon name="target" size={18}/></span><div style={{flex:1}}><b style={{fontSize:16}}>{m.nome}</b><div style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)'}}>{m.tipo}</div></div><IconButton icon="pencil" size={28} iconSize={14}/></div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',margin:'16px 0 6px'}}><span style={{fontSize:20,fontWeight:800}}>{money?MS7.brlK(m.atual):MS7.num(m.atual)}</span><span style={{fontSize:13,fontWeight:600,color:'var(--text-secondary)'}}>{'de '+(money?MS7.brlK(m.alvo):MS7.num(m.alvo))}</span></div>
      <div style={{height:8,borderRadius:4,background:'var(--ms7-gray-100)'}}><div style={{width:p+'%',height:'100%',borderRadius:4,background:'var(--ms7-lime-600)'}}></div></div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12,gap:8}}><Badge size="sm" variant="soft" tone="purple">{m.rec}</Badge><b style={{fontSize:13}}>{p+'%'}</b></div>
    </Card>;})}</div>
    <Modal open={open} onClose={function(){setOpen(false);}} title="Nova meta" footer={<React.Fragment><Button variant="secondary" onClick={function(){setOpen(false);}}>Cancelar</Button><Button variant="brand" onClick={function(){setOpen(false);toast('Meta criada');}}>Salvar</Button></React.Fragment>}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}><div style={{gridColumn:'1 / -1'}}><Input label="Nome da meta" required/></div><Input label="Valor alvo" required prefix="R$"/><Select label="Tipo de métrica" options={['Resultado','Cooperações','Depositantes','Comissão']}/><div style={{gridColumn:'1 / -1'}}><Input label="Descrição da recompensa" multiline rows={2}/></div></div>
    </Modal>
  </div>;
}
function CuponsTab(){
  const {Card,Button,Input,Badge,IconButton,Switch}=DS;const on=DB.Sync.on();const [L,setL]=React.useState(on?null:{produtos:MS7.proxyProdutos.map(function(p){return Object.assign({ativo:true},p);}),cupons:[]});const [peds,setPeds]=React.useState([]);const [sujo,setSujo]=React.useState(false);
  function load(){if(!on)return;DB.Sync.api('/api/loja').then(function(r){setL({produtos:r.produtos||[],cupons:r.cupons||[]});setSujo(false);}).catch(function(e){toast(e.message||'Erro ao carregar a loja');});DB.Sync.api('/api/pix?tipo=loja&todos=1').then(setPeds).catch(function(){});}
  React.useEffect(load,[]);
  if(!L)return <Card><div style={{fontSize:13,fontWeight:600,color:'var(--text-secondary)'}}>Carregando…</div></Card>;
  const upd=function(k,idx,campo,v){setL(function(o){const n={produtos:o.produtos.slice(),cupons:o.cupons.slice()};n[k][idx]=Object.assign({},n[k][idx]);n[k][idx][campo]=v;return n;});setSujo(true);};
  const add=function(k,x){setL(function(o){const n={produtos:o.produtos.slice(),cupons:o.cupons.slice()};n[k].push(x);return n;});setSujo(true);};
  const del=function(k,idx){setL(function(o){const n={produtos:o.produtos.slice(),cupons:o.cupons.slice()};n[k].splice(idx,1);return n;});setSujo(true);};
  function salvar(){const body={produtos:L.produtos.map(function(p){return Object.assign({},p,{preco:parseFloat(String(p.preco).replace(',','.'))||0});}),cupons:L.cupons.map(function(c){return Object.assign({},c,{pct:parseFloat(String(c.pct).replace(',','.'))||0});})};
    if(!on){setSujo(false);toast('Salvo (prévia)');return;}DB.Sync.api('/api/loja',{method:'PUT',body:JSON.stringify(body)}).then(function(r){setL({produtos:r.produtos,cupons:r.cupons});setSujo(false);toast('Loja salva');}).catch(function(e){toast(e.message||'Erro ao salvar');});}
  const cell={height:36,padding:'0 10px',border:'1px solid var(--border-default)',borderRadius:10,background:'var(--surface-card)',color:'var(--text-primary)',fontFamily:'inherit',fontSize:13,fontWeight:600,boxSizing:'border-box',width:'100%',minWidth:0};
  const pagos=peds.filter(function(p){return p.status==='approved';});
  return <div style={{display:'flex',flexDirection:'column',gap:20}}>
    <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}><div style={{flex:1,fontSize:13,fontWeight:600,color:'var(--text-secondary)'}}>Produtos e cupons que aparecem em Proxies → Comprar. O pagamento é PIX do Mercado Pago (copia e cola). A entrega automática no site Marcelo Proxies será ligada depois.</div><Button variant="brand" iconLeft="check" disabled={!sujo} onClick={salvar}>Salvar loja</Button></div>
    <Card title="Produtos" action={<Button size="sm" variant="outline" iconLeft="plus" onClick={function(){add('produtos',{id:'pr'+Date.now(),nome:'',desc:'',preco:'',ativo:true});}}>Produto</Button>}>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>{L.produtos.map(function(p,ix){return <div key={p.id} style={{display:'grid',gridTemplateColumns:'minmax(0,2fr) minmax(0,2fr) 110px auto auto',gap:8,alignItems:'center'}}>
        <input aria-label="Nome" placeholder="Nome" value={p.nome} onChange={function(e){upd('produtos',ix,'nome',e.target.value);}} style={cell}/>
        <input aria-label="Descrição" placeholder="Descrição" value={p.desc||''} onChange={function(e){upd('produtos',ix,'desc',e.target.value);}} style={cell}/>
        <input aria-label="Preço" placeholder="Preço" inputMode="decimal" value={p.preco} onChange={function(e){upd('produtos',ix,'preco',e.target.value);}} style={cell}/>
        <Switch checked={p.ativo!==false} onChange={function(v){upd('produtos',ix,'ativo',v);}}/>
        <IconButton icon="trash-2" size={32} iconSize={15} label="Apagar" onClick={function(){del('produtos',ix);}}/></div>;})}{!L.produtos.length?<div style={{fontSize:13,fontWeight:600,color:'var(--text-secondary)'}}>Nenhum produto.</div>:null}</div>
    </Card>
    <Card title="Cupons" action={<Button size="sm" variant="outline" iconLeft="plus" onClick={function(){add('cupons',{codigo:'',pct:'10',validade:'',limite:0,usos:0,ativo:true});}}>Cupom</Button>}>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>{L.cupons.length?<div style={{display:'grid',gridTemplateColumns:'minmax(0,1.4fr) 80px 150px 90px 60px auto auto',gap:8,fontSize:11,fontWeight:700,letterSpacing:'.05em',textTransform:'uppercase',color:'var(--text-secondary)'}}><span>Código</span><span>% desc.</span><span>Validade</span><span>Limite</span><span>Usos</span><span>Ativo</span><span></span></div>:null}
        {L.cupons.map(function(c,ix){return <div key={ix} style={{display:'grid',gridTemplateColumns:'minmax(0,1.4fr) 80px 150px 90px 60px auto auto',gap:8,alignItems:'center'}}>
        <input aria-label="Código" placeholder="EX: MS7VIP" value={c.codigo} onChange={function(e){upd('cupons',ix,'codigo',e.target.value.toUpperCase());}} style={cell}/>
        <input aria-label="% de desconto" inputMode="decimal" value={c.pct} onChange={function(e){upd('cupons',ix,'pct',e.target.value);}} style={cell}/>
        <input aria-label="Validade" type="date" value={c.validade||''} onChange={function(e){upd('cupons',ix,'validade',e.target.value);}} style={cell}/>
        <input aria-label="Limite de usos" inputMode="numeric" placeholder="0 = sem" value={c.limite||''} onChange={function(e){upd('cupons',ix,'limite',e.target.value.replace(/\D/g,''));}} style={cell}/>
        <b style={{fontSize:13,textAlign:'center'}}>{c.usos||0}</b>
        <Switch checked={c.ativo!==false} onChange={function(v){upd('cupons',ix,'ativo',v);}}/>
        <IconButton icon="trash-2" size={32} iconSize={15} label="Apagar" onClick={function(){del('cupons',ix);}}/></div>;})}{!L.cupons.length?<div style={{fontSize:13,fontWeight:600,color:'var(--text-secondary)'}}>Nenhum cupom. Clique em + Cupom.</div>:null}</div>
    </Card>
    {on?<Card title={'Pedidos pagos · '+pagos.length}><div style={{display:'flex',flexDirection:'column'}}>{pagos.length?pagos.map(function(p){return <div key={p.id} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderTop:'1px solid var(--border-subtle)',flexWrap:'wrap'}}><div style={{flex:'1 1 240px',minWidth:0}}><b style={{fontSize:14}}>{(p.itens||[]).map(function(x){return x.qtd+'x '+x.nome;}).join(', ')}</b><div style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)'}}>{p.email+' · '+new Date(p.criado).toLocaleString('pt-BR')+(p.cupom?' · cupom '+p.cupom:'')}</div></div><b>{MS7.brl(p.valor)}</b>{p.entregue?<Badge size="sm" variant="soft" tone="green">Entregue</Badge>:<Button size="sm" variant="outline" iconLeft="check" onClick={function(){DB.Sync.api('/api/pix/'+p.id+'/entregue',{method:'POST',body:'{}'}).then(function(){toast('Marcado como entregue');load();});}}>Marcar entregue</Button>}</div>;}):<div style={{fontSize:13,fontWeight:600,color:'var(--text-secondary)'}}>Nenhum pedido pago ainda.</div>}</div></Card>:null}
  </div>;
}
function RankingTab(){
  const {Card,Tabs,DataTable,Badge}=DS;const [t,setT]=React.useState('op');
  const rows=(t==='op'?MS7.operadores.map(function(o){return {nome:o.nome,v:o.resultado,x:o.coops+' coops'};}):MS7.alunos.map(function(a){return {nome:a.nome,v:a.resultado,x:a.contas+' contas'};})).sort(function(a,b){return b.v-a.v;}).map(function(r,i){return Object.assign({pos:i+1},r);});
  return <Card title="Ranking" action={<Tabs variant="chips" value={t} onChange={setT} items={[{id:'op',label:'Operadores'},{id:'al',label:'Alunos'}]}/>}>
    <DataTable rows={rows} rowKey="nome" columns={[{key:'pos',label:'#',width:60,render:function(r){return <span style={{width:28,height:28,borderRadius:8,display:'inline-flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:12,background:r.pos===1?'var(--ms7-lime-500)':r.pos<=3?'var(--ms7-gray-100)':'transparent',color:r.pos===1?'var(--ms7-green-900)':'inherit'}}>{String(r.pos).padStart(2,'0')}</span>;}},{key:'nome',label:'Nome',render:function(r){return <b>{r.nome}</b>;}},{key:'x',label:'Volume'},{key:'v',label:'Resultado',align:'right',render:function(r){return <Money v={r.v} signed/>;}},{key:'b',label:'',align:'right',render:function(r){return r.pos===1?<Badge size="sm" tone="green">Líder</Badge>:null;}}]}/>
  </Card>;
}
function NotificacoesTab(){
  const {Card,Switch,Input,Select,Button}=DS;
  const [tpl,setTpl]=React.useState([{id:1,nome:'Conta importada',on:true,para:'Operador responsável',txt:'Nova conta {usuario} importada na cooperação {cooperacao}.'},{id:2,nome:'Cooperação concluída',on:true,para:'Admins',txt:'A cooperação {cooperacao} foi concluída com resultado {resultado}.'},{id:3,nome:'Chave PIX esgotando',on:false,para:'Admins',txt:'O grupo {grupo} tem apenas {disponiveis} chaves disponíveis.'},{id:4,nome:'Pagamento de assinatura',on:true,para:'Dono da conta',txt:'Sua assinatura vence em {dias} dias. Valor: {valor}.'}]);
  const [sel,setSel]=React.useState(1);const cur=tpl.find(function(t){return t.id===sel;});
  return <Grid min={300}>
    <Card title="Modelos"><div style={{display:'flex',flexDirection:'column',gap:4}}>{tpl.map(function(t){const on=t.id===sel;return <div key={t.id} onClick={function(){setSel(t.id);}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:10,cursor:'pointer',background:on?'var(--ms7-lime-100)':'transparent'}}>
      <DS.Icon name="bell" size={16}/><span style={{flex:1,fontSize:14,fontWeight:600,color:on?'var(--ms7-green-900)':'var(--text-primary)'}}>{t.nome}</span><span onClick={function(e){e.stopPropagation();}}><Switch checked={t.on} onChange={function(v){setTpl(tpl.map(function(x){return x.id===t.id?Object.assign({},x,{on:v}):x;}));}}/></span></div>;})}</div></Card>
    <Card title={cur.nome}><Hint>Personalize o texto de cada notificação, ative ou desative e defina quem recebe cada alerta.</Hint>
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <Select label="Quem recebe" value={cur.para} onChange={function(e){setTpl(tpl.map(function(x){return x.id===cur.id?Object.assign({},x,{para:e.target.value}):x;}));}} options={['Operador responsável','Admins','Dono da conta','Todos os usuários']}/>
        <Input key={cur.id} label="Mensagem" multiline rows={4} defaultValue={cur.txt} hint="Use {variavel} para inserir dados automaticamente."/>
        <div style={{display:'flex',justifyContent:'flex-end',gap:10}}><Button variant="outline" iconLeft="send" onClick={function(){toast('Teste enviado');}}>Enviar teste</Button><Button variant="brand" iconLeft="check" onClick={function(){toast('Modelo salvo');}}>Salvar</Button></div>
      </div></Card>
  </Grid>;
}
window.getPixGrupos=function(){try{return (DB.get().pix||[]).filter(function(g){return g.ativo!==false;});}catch(e){return [];}};
Object.assign(window,{OperadoresTab:OperadoresTab,GruposTab:GruposTab,PlataformasTab:PlataformasTab,PixTab:PixTab,MetasTab:MetasTab,CuponsTab:CuponsTab,RankingTab:RankingTab,NotificacoesTab:NotificacoesTab});
})();