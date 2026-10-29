(function(){
const DS=window.MS7DesignSystem_5d5172;
function HeatmapScreen(){
  const {Card,Tabs,Heatmap}=DS;const [metric,setMetric]=usePersist('heat-m','lucro');const [per,setPer]=usePersist('heat-per','Todos');
  const f={Hoje:0.12,'7 dias':0.35,'30 dias':1,Todos:1.6}[per]||1;
  const m=MS7.heat.map(function(r){return r.map(function(v){return Math.round(metric==='lucro'?v*f:v*f/180);});});
  return <div style={{display:'flex',flexDirection:'column',gap:24}}>
    <PeriodBar value={per} onChange={setPer}><Tabs value={metric} onChange={setMetric} items={[{id:'lucro',label:'Lucro'},{id:'count',label:'Quantidade'}]} style={{width:240}}/></PeriodBar>
    <Card title="Heatmap de operação"><Hint>{'Melhores horários para operar — '+(metric==='lucro'?'lucro':'quantidade')+' por dia da semana e hora (horário de Brasília)'}</Hint>
      <Heatmap matrix={m} metricLabel={metric==='lucro'?'Lucro':'Quantidade'} format={metric==='lucro'?MS7.brl:MS7.num}/></Card>
  </div>;
}
function ProjecaoScreen(){
  const {Card,LineChart}=DS;DB.useDB();
  const T=DB.today;const day=T.getDate();const total=new Date(T.getFullYear(),T.getMonth()+1,0).getDate();
  const daily=Array.from({length:day}).map(function(_,i){const ds=DB.iso(new Date(T.getFullYear(),T.getMonth(),i+1,12));return DB.get().coops.filter(function(c){return c.status!=='Lixeira'&&c.inicio===ds;}).reduce(function(a,c){return a+DB.calc(c).lucro;},0);});
  let acc=0;const real=daily.map(function(v){acc+=v;return acc;});const projected=day?acc/day*total:0;
  const labels=Array.from({length:total}).map(function(_,i){return String(i+1).padStart(2,'0')+'/'+String(T.getMonth()+1).padStart(2,'0');});
  return <div style={{display:'flex',flexDirection:'column',gap:24}}>
    <KpiRow items={[{icon:'circle-dollar-sign',label:'Lucro realizado no mês',value:MS7.brlK(acc),tone:'green',signed:acc},{icon:'trending-up',label:'Projeção do mês',value:MS7.brlK(projected),tone:'blue',signed:projected},{icon:'calendar-days',label:'Progresso do mês',value:day+' / '+total+' dias',tone:'orange'}]}/>
    <Card title="Projeção de lucro líquido">
      <LineChart height={280} labels={labels} datasets={[{label:'Realizado',values:real},{label:'Projeção',values:labels.map(function(_,i){return Math.round(projected*(i+1)/total);}),dashed:true,color:'var(--ms7-lime-600)'}]} format={MS7.brl}/>
      <p style={{margin:'14px 0 0',fontSize:12,fontWeight:500,color:'var(--text-secondary)'}}>Soma do lucro líquido das cooperações abertas em cada dia. A projeção segue o ritmo atual do mês.</p>
    </Card>
  </div>;
}
function CustosScreen(){
  const {Card,Input,Select,Button,DataTable,Badge,IconButton}=DS;const db=DB.useDB();const C=MS7.custosCats;
  const [per,setPer]=usePersist('custos-per','30 dias');const [f,setF]=React.useState({cat:'proxy',valor:'',desc:''});
  const rows=db.custos.filter(function(r){return DB.inPeriod(r.data,per);});
  const catOf=function(id){return C.find(function(c){return c.id===id;})||C[4];};
  const total=rows.reduce(function(a,r){return a+r.valor;},0);const contas=DB.agg(DB.coopsFor({per:per})).n;
  const agg=C.map(function(c){return {c:c,v:rows.filter(function(r){return r.cat===c.id;}).reduce(function(a,r){return a+r.valor;},0)};}).filter(function(a){return a.v>0;});
  function add(){const v=parseFloat(String(f.valor).replace(',','.'));if(!v){toast('Informe o valor');return;}DB.A.addCusto({comp:'09/2026',cat:f.cat,desc:f.desc||catOf(f.cat).label,valor:v});setF(Object.assign({},f,{valor:'',desc:''}));}
  return <div style={{display:'flex',flexDirection:'column',gap:24}}>
    <PeriodBar value={per} onChange={setPer}/>
    <Card title="Registrar custo"><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))',gap:16,alignItems:'end'}}>
      <Select label="Categoria" value={f.cat} onChange={function(e){setF(Object.assign({},f,{cat:e.target.value}));}} options={C.map(function(c){return {value:c.id,label:c.label};})}/>
      <Input label="Valor" prefix="R$" placeholder="0,00" value={f.valor} onChange={function(e){setF(Object.assign({},f,{valor:e.target.value}));}}/>
      <Input label="Descrição" placeholder="Ex.: Pacote de proxies" value={f.desc} onChange={function(e){setF(Object.assign({},f,{desc:e.target.value}));}}/>
      <Button variant="brand" iconLeft="plus" onClick={add}>Registrar</Button>
    </div></Card>
    <KpiRow items={[{icon:'wallet',label:'Custos de ferramentas',value:MS7.brlK(total),tone:'black'},{icon:'users',label:'Contas no período',value:contas,tone:'blue'},{icon:'receipt',label:'Ferramentas por conta',value:MS7.brl(contas?total/contas:0),tone:'yellow'},{icon:'tag',label:'Custo fixo por conta',value:MS7.brl(db.config.custoConta),tone:'orange'}]}/>
    <Grid min={340}>
      <Card title="Custos por categoria">{agg.length?<div style={{display:'flex',flexDirection:'column',gap:14}}>
        <div style={{display:'flex',height:14,borderRadius:7,overflow:'hidden'}}>{agg.map(function(a){return <span key={a.c.id} style={{width:(a.v/total*100)+'%',background:a.c.color}}></span>;})}</div>
        {agg.map(function(a){return <div key={a.c.id} style={{display:'flex',alignItems:'center',gap:10,fontSize:14}}><span style={{width:10,height:10,borderRadius:'50%',background:a.c.color}}></span><span style={{flex:1,fontWeight:600}}>{a.c.label}</span><span style={{color:'var(--text-secondary)',fontWeight:600}}>{Math.round(a.v/total*100)+'%'}</span><b style={{width:110,textAlign:'right'}}>{MS7.brl(a.v)}</b></div>;})}
      </div>:<Empty icon="wallet" title="Nenhum custo no período"/>}</Card>
      <Card title="Registros" action={<Button size="sm" variant="outline" iconLeft="download" onClick={function(){exportCSV('custos',[{label:'Data',get:function(r){return r.data;}},{label:'Categoria',get:function(r){return catOf(r.cat).label;}},{label:'Descrição',get:function(r){return r.desc;}},{label:'Valor',get:function(r){return r.valor;}}],rows);}}>Exportar</Button>}>
        <DataTable rows={rows} columns={[{key:'data',label:'Data',render:function(r){return DB.fmtDate(r.data);}},{key:'cat',label:'Categoria',render:function(r){return <Badge variant="soft" size="sm" tone={{proxy:'green',servidor:'blue',software:'purple',bots:'orange',outros:'gray'}[r.cat]}>{catOf(r.cat).label}</Badge>;}},{key:'desc',label:'Descrição'},{key:'valor',label:'Valor',align:'right',render:function(r){return <b>{MS7.brl(r.valor)}</b>;}},{key:'x',label:'',align:'right',render:function(r){return <IconButton icon="trash-2" size={30} iconSize={16} onClick={function(){DB.A.removeCusto(r.id);}}/>;}}]}/>
      </Card>
    </Grid>
  </div>;
}
function FolhaScreen(){
  const {Card,DataTable,Badge,Button,IconButton,Tabs,Modal}=DS;const db=DB.useDB();const [modo,setModo]=React.useState('Semana');const [off,setOff]=React.useState(0);const [det,setDet]=React.useState(null);const [selP,setSelP]=React.useState({});React.useEffect(function(){setSelP({});},[modo,off]);
  const add=function(ds,n){const d=new Date(ds+'T12:00:00');d.setDate(d.getDate()+n);return DB.iso(d);};const hoje=DB.iso(DB.today);
  let de,ate,titulo;
  if(modo==='Semana'){de=add(DB.semanaIni(hoje),off*7);ate=add(de,6);titulo='Semana de '+DB.fmtDate(de)+' a '+DB.fmtDate(ate);}
  else if(modo==='Mês'){const d=new Date(hoje+'T12:00:00');d.setDate(1);d.setMonth(d.getMonth()+off);de=DB.iso(d);const e=new Date(d);e.setMonth(e.getMonth()+1);e.setDate(0);ate=DB.iso(e);titulo=d.toLocaleDateString('pt-BR',{month:'long',year:'numeric'});}
  else{de=ate=add(hoje,off);titulo=new Date(de+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'});}
  titulo=titulo.charAt(0).toUpperCase()+titulo.slice(1);
  const L=DB.comissoesDe(null,de,ate);
  const pagoDe=function(opId){return db.pagamentos.filter(function(p){const k=p.semana||p.data;return p.opId===opId&&k>=de&&k<=ate;}).reduce(function(x,p){return x+p.valor;},0);};
  const ids=[];L.forEach(function(x){if(ids.indexOf(x.c.opId)<0)ids.push(x.c.opId);});db.pagamentos.forEach(function(p){const k=p.semana||p.data;if(k>=de&&k<=ate&&ids.indexOf(p.opId)<0)ids.push(p.opId);});
  const rows=ids.map(function(id){const l=L.filter(function(x){return x.c.opId===id;});const com=Math.round(l.reduce(function(s,x){return s+x.com;},0)*100)/100;const pago=pagoDe(id);return {id:id,nome:DB.opName(id)||'Sem operador',coops:l.length,com:com,pago:pago,saldo:Math.max(0,Math.round((com-pago)*100)/100)};}).sort(function(x,y){return y.com-x.com;});
  const s=function(k){return rows.reduce(function(x,r){return x+r[k];},0);};
  const chart=modo==='Semana'?[0,1,2,3,4,5,6].map(function(n){const d=add(de,n);return {label:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'][n],values:[Math.round(L.filter(function(x){return x.data===d;}).reduce(function(t,x){return t+x.com;},0))]};})
    :modo==='Mês'?(function(){const out=[];let w=DB.semanaIni(de);while(w<=ate){const w2=add(w,6);out.push({label:DB.fmtDate(w<de?de:w),values:[Math.round(L.filter(function(x){return x.data>=w&&x.data<=w2;}).reduce(function(t,x){return t+x.com;},0))]});w=add(w,7);}return out;})():null;
  return <div style={{display:'flex',flexDirection:'column',gap:24}}>
    <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
      <Tabs variant="chips" value={modo} onChange={function(v){setModo(v);setOff(0);}} items={['Semana','Mês','Dia']}/>
      <div style={{display:'flex',alignItems:'center',gap:6,marginLeft:'auto'}}><IconButton icon="chevron-left" variant="outline" size={32} iconSize={16} label="Anterior" onClick={function(){setOff(off-1);}}/><b style={{fontSize:14,minWidth:200,textAlign:'center'}}>{titulo}</b><IconButton icon="chevron-right" variant="outline" size={32} iconSize={16} label="Próximo" disabled={off>=0} onClick={function(){setOff(off+1);}}/></div>
    </div>
    <KpiRow items={[{icon:'banknote',label:'Comissão a pagar',value:MS7.brl(s('com')),tone:'blue'},{icon:'circle-check',label:'Já pago',value:MS7.brl(s('pago')),tone:'green'},{icon:'clock',label:'Falta pagar',value:MS7.brl(s('saldo')),tone:'yellow'},{icon:'briefcase',label:'Cooperações concluídas',value:L.length,tone:'orange'}]}/>
    {chart?<Card title={modo==='Semana'?'Comissão por dia':'Comissão por semana'}><DS.BarChart height={200} data={chart} series={[{name:'Comissão',color:'var(--chart-1)'}]}/></Card>:null}
    <Card title="Comissão por operador" action={<Button size="sm" variant="outline" iconLeft="download" onClick={function(){exportCSV('comissoes-'+de+'_'+ate,[{label:'Operador',get:function(r){return r.nome;}},{label:'Cooperações',get:function(r){return r.coops;}},{label:'Comissão',get:function(r){return r.com;}},{label:'Pago',get:function(r){return r.pago;}},{label:'Falta pagar',get:function(r){return r.saldo;}}],rows);}}>Exportar</Button>}>
      <Hint>Conta só cooperações Concluídas, no dia em que foram finalizadas. Clique no operador para ver cada cooperação.</Hint>
      {modo==='Semana'&&rows.some(function(r){return r.saldo>=0.01;})?(function(){const pend=rows.filter(function(r){return r.saldo>=0.01;});const sl=pend.filter(function(r){return selP[r.id];});const tot=sl.reduce(function(x,r){return x+r.saldo;},0);const all=sl.length===pend.length;
        return <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',padding:'10px 12px',marginBottom:10,borderRadius:12,background:'var(--surface-muted, var(--ms7-gray-100))'}}><DS.Checkbox label={all?'Desmarcar todos':'Selecionar todos pendentes ('+pend.length+')'} checked={all} onChange={function(v){const n={};if(v)pend.forEach(function(r){n[r.id]=1;});setSelP(n);}}/><span style={{flex:1}}></span><b style={{fontSize:14}}>{sl.length?sl.length+(sl.length===1?' operador · ':' operadores · ')+MS7.brl(tot):'Marque quem vai receber'}</b><Button size="sm" variant="brand" iconLeft="check" disabled={!sl.length} onClick={function(){if(confirm('Registrar pagamento para '+sl.length+(sl.length===1?' operador':' operadores')+' ('+titulo+'), total '+MS7.brl(tot)+'?')){sl.forEach(function(r){DB.A.pagar(r.id,r.saldo,de);});setSelP({});toast(sl.length+(sl.length===1?' pagamento registrado':' pagamentos registrados'));}}}>{sl.length?'Pagar '+sl.length+' · '+MS7.brl(tot):'Pagar selecionados'}</Button></div>;})():null}
      {rows.length?<DataTable rows={rows} onRowClick={function(r){setDet(r.id);}} columns={(modo==='Semana'?[{key:'sel',label:'',render:function(r){return r.saldo>=0.01?<span onClick={function(e){e.stopPropagation();}}><DS.Checkbox checked={!!selP[r.id]} onChange={function(v){setSelP(function(s0){const n=Object.assign({},s0);if(v)n[r.id]=1;else delete n[r.id];return n;});}}/></span>:null;}}]:[]).concat([{key:'nome',label:'Operador',render:function(r){return <b>{r.nome}</b>;}},{key:'coops',label:'Coops',align:'center'},{key:'com',label:'Comissão',align:'right',render:function(r){return <b>{MS7.brl(r.com)}</b>;}},{key:'pago',label:'Pago',align:'right',render:function(r){return MS7.brl(r.pago);}},
        {key:'st',label:'Status',align:'center',render:function(r){return <Badge size="sm" tone={r.saldo<0.01?'green':'yellow'}>{r.saldo<0.01?'Pago':'Pendente'}</Badge>;}},
        {key:'a',label:'',align:'right',render:function(r){return modo!=='Semana'||r.saldo<0.01?null:<Button size="sm" variant="brand" iconLeft="check" onClick={function(e){e.stopPropagation();if(confirm('Registrar pagamento de '+MS7.brl(r.saldo)+' para '+r.nome+' ('+titulo+')?'))DB.A.pagar(r.id,r.saldo,de);}}>{'Pagar '+MS7.brl(r.saldo)}</Button>;}}])}/>:<Empty icon="banknote" title="Nenhuma cooperação concluída neste período"/>}
      {modo!=='Semana'&&s('saldo')>0.01?<div style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)',marginTop:10}}>Para pagar, abra a aba Semana.</div>:null}
    </Card>
    {det?(function(){const l=L.filter(function(x){return x.c.opId===det;}).sort(function(x,y){return x.data<y.data?-1:1;});const tot=l.reduce(function(t,x){return t+x.com;},0);return <Modal open={true} onClose={function(){setDet(null);}} title={'Comissão de '+(DB.opName(det)||'Sem operador')} subtitle={titulo+' · '+l.length+(l.length===1?' cooperação':' cooperações')+' · '+MS7.brl(tot)} footer={<Button variant="secondary" onClick={function(){setDet(null);}}>Fechar</Button>}>
      <div style={{display:'flex',flexDirection:'column'}}>{l.map(function(x){return <div key={x.c.id} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderTop:'1px solid var(--border-subtle)'}}><div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:700}}>{DB.coopNome(x.c)}</div><div style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)'}}>{'Finalizada em '+DB.fmtDate(x.data)+' · '+DB.comText(x.c)}</div></div><b style={{fontSize:14}}>{MS7.brl(x.com)}</b></div>;})}{!l.length?<div style={{fontSize:13,color:'var(--text-secondary)'}}>Nenhuma cooperação concluída neste período.</div>:null}</div>
    </Modal>;})():null}
  </div>;
}
Object.assign(window,{HeatmapScreen:HeatmapScreen,ProjecaoScreen:ProjecaoScreen,CustosScreen:CustosScreen,FolhaScreen:FolhaScreen});
})();
