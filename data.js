(function(){
let s=7;function rnd(){s=(s*9301+49297)%233280;return s/233280;}
function brl(v){return Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});}
function num(v){return Number(v).toLocaleString('pt-BR');}
const operadores=[
{id:'op1',nome:'Lucas Martins',resultado:48210,comissao:7230,coops:32,ativas:4,depositantes:412,bloqueadas:1,aSacar:6,ciclo:7,pct:15,ativo:true},
{id:'op2',nome:'Bruna Costa',resultado:41980,comissao:6297,coops:28,ativas:3,depositantes:365,bloqueadas:0,aSacar:4,ciclo:7,pct:15,ativo:true},
{id:'op3',nome:'Diego Ramos',resultado:35640,comissao:5346,coops:25,ativas:3,depositantes:318,bloqueadas:2,aSacar:3,ciclo:14,pct:15,ativo:true},
{id:'op4',nome:'Carla Mendes',resultado:29870,comissao:4480,coops:21,ativas:2,depositantes:274,bloqueadas:0,aSacar:5,ciclo:7,pct:15,ativo:true},
{id:'op5',nome:'Felipe Araújo',resultado:22410,comissao:3361,coops:17,ativas:1,depositantes:201,bloqueadas:1,aSacar:2,ciclo:14,pct:15,ativo:true},
{id:'op6',nome:'Renata Silva',resultado:18950,comissao:2842,coops:14,ativas:1,depositantes:176,bloqueadas:0,aSacar:1,ciclo:7,pct:12,ativo:false}];
operadores.forEach(function(o,i){o.contas=[86,74,68,55,41,33][i];o.bloqueadas=[4,2,6,3,5,1][i];o.custo=Math.round(o.contas*[27.5,28.1,29.4,26.8,31.2,30.5][i]);o.lucro=o.resultado-o.comissao-o.custo;o.roi=o.lucro/(o.comissao+o.custo)*100;o.custoConta=o.custo/o.contas;});
const plataformas=[{nome:'Vértice',resultado:61240,coops:44},{nome:'Lótus Bet',resultado:48720,coops:36},{nome:'NovaPlay',resultado:39310,coops:29},{nome:'Arena7',resultado:28150,coops:18},{nome:'Prime',resultado:19640,coops:10}];
const redes=['Alfa','Sol','Norte','Atlas','Ícaro','Delta','Vega','Orion'].map(function(n,i){const r=Math.round(38000-i*4100+rnd()*2000);const d=Math.round(260-i*24+rnd()*20);return {nome:'Rede '+n,resultado:r,comissao:Math.round(r*0.15),depositantes:d,porDepo:r/d};});
const status=['Em andamento','Em andamento','Ativa','Em andamento','Concluída','Concluída','Ativa','Concluída'];
const cooperacoes=status.map(function(st,i){const op=operadores[i%6];const pl=plataformas[i%5];const dep=Math.round(8000+rnd()*14000);const red=Math.round(dep*0.35);const saq=Math.round(dep*(1.05+rnd()*0.3));const reemb=Math.round(rnd()*600);
  return {id:'C-'+(1048-i),operador:op.nome,plataforma:pl.nome,rede:redes[i%8].nome,cliente:['Grupo Horizonte','Equipe Aurora','Clube Norte','Time Zênite','Grupo Prisma','Equipe Onda','Clube Âncora','Time Cobalto'][i],depositantes:Math.round(18+rnd()*40),deposito:dep,redeposito:red,saque:saq,reembolso:reemb,resultado:saq-dep-red+Math.round(dep*0.4),status:st,inicio:(22-i)+'/09/2026',aSacar:Math.round(rnd()*6),sacado:Math.round(4+rnd()*20),bloqueado:Math.round(rnd()*2),comissao:'15%'};});
const alunos=[
{id:'a1',nome:'Mariana Lopes',email:'mariana.lopes@email.com',ativo:true,criado:'02/06/2026',resultado:8420,contas:14},
{id:'a2',nome:'Thiago Souza',email:'thiago.souza@email.com',ativo:true,criado:'11/06/2026',resultado:7310,contas:12},
{id:'a3',nome:'Aline Ferreira',email:'aline.f@email.com',ativo:true,criado:'23/06/2026',resultado:6180,contas:11},
{id:'a4',nome:'Gustavo Pires',email:'gustavo.pires@email.com',ativo:false,criado:'04/07/2026',resultado:4950,contas:8},
{id:'a5',nome:'Letícia Rocha',email:'leticia.r@email.com',ativo:true,criado:'19/07/2026',resultado:3870,contas:7},
{id:'a6',nome:'Rodrigo Nunes',email:'rodrigo.nunes@email.com',ativo:true,criado:'08/08/2026',resultado:2640,contas:5}];
const grupos=['Operadores sênior','Novatos','Rede Alfa','Financeiro'];
const avisos=[
{id:1,titulo:'Manutenção programada',conteudo:'O painel ficará indisponível no domingo, das 03h às 04h, para atualização do servidor.',data:'22/09/2026 09:12',publico:'Todos os usuários'},
{id:2,titulo:'Nova meta de setembro',conteudo:'Meta coletiva de R$ 250 mil em resultado. Bônus de 2% na comissão para quem bater a meta individual.',data:'18/09/2026 14:40',publico:'Operadores sênior, Novatos'},
{id:3,titulo:'Atualização das chaves PIX',conteudo:'Chaves antigas do grupo Rede Alfa foram liberadas. Reserve novas chaves antes de abrir cooperações.',data:'15/09/2026 08:05',publico:'Rede Alfa'}];
const heat=[0,1,2,3,4,5,6].map(function(d){return Array.from({length:24}).map(function(_,h){const eve=Math.exp(-Math.pow((h-21)/3,2));const lunch=0.45*Math.exp(-Math.pow((h-13)/2,2));const wk=d>=4?1.3:1;return Math.round((eve+lunch+0.05)*wk*2400*(0.8+rnd()*0.4));});});
const diasTotal=30,diasPass=22;const diario=Array.from({length:diasPass}).map(function(){return Math.round(5200+rnd()*3600);});
const custosCats=[{id:'proxy',label:'Proxies',color:'var(--ms7-green)'},{id:'servidor',label:'Servidores',color:'var(--ms7-blue)'},{id:'software',label:'Softwares',color:'var(--ms7-purple)'},{id:'bots',label:'Bots / Telegram',color:'var(--ms7-orange)'},{id:'outros',label:'Outros',color:'var(--ms7-gray-500)'}];
const custos=[
{id:1,comp:'09/2026',cat:'proxy',desc:'Pacote 50 proxies residenciais',valor:1890},
{id:2,comp:'09/2026',cat:'servidor',desc:'VPS dedicado — 2 instâncias',valor:640},
{id:3,comp:'09/2026',cat:'software',desc:'Licença antidetect (10 perfis)',valor:520},
{id:4,comp:'09/2026',cat:'bots',desc:'Bot de automação Telegram',valor:290},
{id:5,comp:'08/2026',cat:'proxy',desc:'Pacote 40 proxies residenciais',valor:1560},
{id:6,comp:'08/2026',cat:'outros',desc:'Chips e recargas',valor:310}];
const folhaSemanas=[{label:'25/08',v:[5120,3980]},{label:'01/09',v:[6240,4410]},{label:'08/09',v:[7010,5120]},{label:'15/09',v:[6680,4870]},{label:'22/09',v:[4520,2310]}];
const folha=operadores.map(function(o,i){return {id:o.id,nome:o.nome,coops:o.coops,resultado:o.resultado,pct:o.pct,comissao:o.comissao,salario:i<2?1500:0,pago:i===0||i===3};});
const contas=cooperacoes.slice(0,6).flatMap(function(c,i){return [0,1].map(function(j){const d=Math.round(300+rnd()*900);const sq=Math.round(d*(0.8+rnd()*0.8));return {id:c.id+'-'+j,operador:c.operador,plataforma:c.plataforma,usuario:['ana','bruno','caio','duda','edu','fabi','gabi','hugo','iris','joao','kaka','lia'][i*2+j]+Math.round(100+rnd()*800),deposito:d,redeposito:Math.round(d*0.3),saque:sq,resultado:sq-d,status:['Sacado','À sacar','Aguardando','Sacado','Bloqueado','Não sacado'][(i+j)%6],r:(i+j)%4===0,criada:(20-i)+'/09'};});});
const listas=[{id:1,nome:'Base Vértice — setembro',descricao:'Contas verificadas para cooperações na Vértice.',contas:48,dono:'Admin'},{id:2,nome:'Reserva Lótus Bet',descricao:'Contas de reposição, prontas para importar.',contas:22,dono:'Lucas Martins'},{id:3,nome:'Telegram — lote 12',descricao:'Importada do grupo do Telegram em 19/09.',contas:31,dono:'Bruna Costa'}];
const proxies=[
{id:1,label:'Residencial BR #01',login:'ms7u01',host:'proxy.marceloproxies.com.br',port:'823',status:'Ativa',expira:'14/10/2026',uso:62},
{id:2,label:'Residencial BR #02',login:'ms7u02',host:'proxy.marceloproxies.com.br',port:'823',status:'Expirando',expira:'25/09/2026',uso:91},
{id:3,label:'Mobile 4G SP',login:'ms7m01',host:'proxy.marceloproxies.com.br',port:'823',status:'Expirada',expira:'10/09/2026',uso:100}];
const proxyProdutos=[{id:'p1',nome:'Residencial 1 GB',desc:'IPs residenciais rotativos no Brasil.',preco:39.9},{id:'p2',nome:'Residencial 5 GB',desc:'Melhor custo para equipes pequenas.',preco:169.9},{id:'p3',nome:'Mobile 4G dedicado',desc:'IP móvel exclusivo, 30 dias.',preco:249.9}];
const planos=[{id:'starter',nome:'Starter',seats:5,preco:147},{id:'pro',nome:'Pro',seats:10,preco:297},{id:'scale',nome:'Scale',seats:25,preco:597}];
const tenants=[
{id:1,tenant:'MS7 Operações',owner:'marcelo@ms7.com',status:'Ativa',plano:'Pro',uso:'6/10',cobranca:'R$ 297,00',proximo:'05/10/2026',cortesia:false},
{id:2,tenant:'Equipe Aurora',owner:'contato@aurora.com',status:'Ativa',plano:'Scale',uso:'19/25',cobranca:'R$ 597,00',proximo:'12/10/2026',cortesia:false},
{id:3,tenant:'Grupo Horizonte',owner:'adm@horizonte.com',status:'Em atraso',plano:'Pro',uso:'10/10',cobranca:'R$ 297,00',proximo:'18/09/2026',cortesia:false},
{id:4,tenant:'Clube Norte',owner:'norte@clube.com',status:'Cortesia',plano:'Starter',uso:'3/5',cobranca:'—',proximo:'—',cortesia:true},
{id:5,tenant:'Time Zênite',owner:'zenite@time.com',status:'Cancelada',plano:'Starter',uso:'0/5',cobranca:'—',proximo:'—',cortesia:false},
{id:6,tenant:'Equipe Onda',owner:'onda@equipe.com',status:'Suspensa',plano:'Pro',uso:'8/10',cobranca:'R$ 297,00',proximo:'—',cortesia:false}];
function brlK(v){v=Number(v);if(Math.abs(v)>=1000000)return 'R$ '+(v/1000000).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mi';if(Math.abs(v)>=10000)return 'R$ '+(v/1000).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mil';return brl(v);}
window.MS7={brl:brl,brlK:brlK,num:num,operadores:operadores,plataformas:plataformas,redes:redes,cooperacoes:cooperacoes,alunos:alunos,grupos:grupos,avisos:avisos,heat:heat,diasTotal:diasTotal,diasPass:diasPass,diario:diario,custosCats:custosCats,custos:custos,folhaSemanas:folhaSemanas,folha:folha,contas:contas,listas:listas,proxies:proxies,proxyProdutos:proxyProdutos,planos:planos,tenants:tenants,
  statusTone:{'Em andamento':'turquoise','Ativa':'green','Concluída':'blue','Finalizada':'yellow','Lixeira':'gray','Sacado':'green','À sacar':'yellow','Aguardando':'gray','Bloqueado':'error','Não sacado':'orange','Expirando':'yellow','Expirada':'error','Em atraso':'yellow','Cancelada':'error','Suspensa':'error','Cortesia':'purple','Pago':'green','Pendente':'yellow'}};
})();