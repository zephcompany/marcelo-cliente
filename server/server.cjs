const express = require('express');
const webpush = require('web-push');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const DATA = process.env.DATA_DIR || path.join(__dirname, 'data');
const ROOT = path.join(__dirname, '..', '..', '..');
const HAS_ROOT = fs.existsSync(path.join(ROOT, 'styles.css')) && fs.existsSync(path.join(ROOT, '_ds_bundle.js'));
const PUBLIC = process.env.PUBLIC_DIR || (HAS_ROOT ? ROOT : path.join(__dirname, '..'));

const PORT = process.env.PORT || 3000;
fs.mkdirSync(DATA, { recursive: true });
const file = (n) => path.join(DATA, n);
const readJ = (n, d) => (fs.existsSync(file(n)) ? JSON.parse(fs.readFileSync(file(n), 'utf8')) : d);
const writeJ = (n, v) => { fs.writeFileSync(file(n) + '.tmp', JSON.stringify(v, null, 2)); fs.renameSync(file(n) + '.tmp', file(n)); };

// ---------- Segredos ----------
let secret = process.env.MS7_SECRET || readJ('secret.json', null)?.secret;
if (!secret) { secret = crypto.randomBytes(32).toString('hex'); writeJ('secret.json', { secret }); }
let keys = process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY
  ? { publicKey: process.env.VAPID_PUBLIC_KEY, privateKey: process.env.VAPID_PRIVATE_KEY } : readJ('vapid.json', null);
if (!keys) { keys = webpush.generateVAPIDKeys(); writeJ('vapid.json', keys); }
webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:admin@ms7.com', keys.publicKey, keys.privateKey);

// ---------- Usuários ----------
const hash = (pw, salt = crypto.randomBytes(16).toString('hex')) => salt + ':' + crypto.scryptSync(pw, salt, 64).toString('hex');
const checkPw = (pw, h) => { const [salt, k] = h.split(':'); const a = Buffer.from(k, 'hex'); const b = crypto.scryptSync(pw, salt, 64); return a.length === b.length && crypto.timingSafeEqual(a, b); };
let users = readJ('users.json', []);
if (!users.length) {
  const email = (process.env.ADMIN_EMAIL || 'admin@ms7.com').toLowerCase();
  const pw = process.env.ADMIN_PASSWORD || crypto.randomBytes(6).toString('base64url');
  users = [{ id: 'u1', email, name: process.env.ADMIN_NAME || 'Marcelo', role: 'super', opId: null, ativo: true, pw: hash(pw) }];
  writeJ('users.json', users);
  console.log('\n=== Primeiro acesso ===\nEmail: ' + email + '\nSenha: ' + pw + '\nTroque a senha depois de entrar.\n');
}
const pub = (u) => ({ id: u.id, email: u.email, name: u.name, role: u.role, opId: u.opId, ativo: u.ativo, tenant: u.tenant || 'main' });

// ---------- Token (HMAC, 30 dias) ----------
const b64 = (s) => Buffer.from(s).toString('base64url');
const sign = (p) => { const body = b64(JSON.stringify(p)); return body + '.' + crypto.createHmac('sha256', secret).update(body).digest('base64url'); };
function verify(t) {
  if (!t || t.indexOf('.') < 0) return null;
  const [body, sig] = t.split('.');
  const exp = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  if (sig.length !== exp.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(exp))) return null;
  const p = JSON.parse(Buffer.from(body, 'base64url').toString());
  if (p.exp < Date.now()) return null;
  const u = users.find((x) => x.id === p.uid && x.ativo);
  return u || null;
}
const isAdmin = (u) => u.role === 'admin' || u.role === 'super';
const auth = (req, res, next) => {
  const t = (req.get('authorization') || '').replace(/^Bearer /, '') || req.query.token;
  const u = verify(t);
  if (!u) return res.status(401).json({ error: 'Sessão expirada. Entre novamente.' });
  req.user = u; next();
};
const adminOnly = (req, res, next) => (isAdmin(req.user) ? next() : res.status(403).json({ error: 'Acesso restrito ao administrador' }));
// Cada painel vendido (papel "cliente") tem dados separados. O painel do dono é "main".
const tenantOf = (u) => u.tenant || 'main';
const isOwner = (u) => isAdmin(u) && tenantOf(u) === 'main';
const isTenantAdmin = (u) => isAdmin(u) || u.role === 'cliente';
const sameTenant = (a, b) => tenantOf(a) === tenantOf(b);
const managerOnly = (req, res, next) => (isTenantAdmin(req.user) ? next() : res.status(403).json({ error: 'Acesso restrito ao administrador' }));
const ownerOnly = (req, res, next) => (isOwner(req.user) ? next() : res.status(403).json({ error: 'Acesso restrito ao dono do painel' }));

const app = express();
app.use((req, res, next) => (req.method === 'PUT' && req.path === '/api/db' ? next() : express.json({ limit: '100kb' })(req, res, next)));

// Limite simples de tentativas de login
const tries = new Map();
app.post('/api/auth/login', (req, res) => {
  const ip = req.ip; const t = tries.get(ip) || { n: 0, at: Date.now() };
  if (Date.now() - t.at > 15 * 60e3) { t.n = 0; t.at = Date.now(); }
  if (t.n >= 10) return res.status(429).json({ error: 'Muitas tentativas. Aguarde 15 minutos.' });
  const { email = '', password = '' } = req.body || {};
  const u = users.find((x) => x.email === String(email).toLowerCase().trim());
  if (!u || !u.ativo || !checkPw(String(password), u.pw)) { t.n++; tries.set(ip, t); return res.status(401).json({ error: 'Email ou senha incorretos' }); }
  tries.delete(ip);
  res.json({ token: sign({ uid: u.id, exp: Date.now() + 30 * 864e5 }), user: pub(u) });
});
// ---------- Cadastro de cliente (painel próprio, 3 dias de teste) ----------
const TESTE_DIAS = 3; const signTries = new Map();
app.post('/api/auth/signup', (req, res) => {
  const ip = req.ip; const st = signTries.get(ip) || { n: 0, at: Date.now() }; if (Date.now() - st.at > 3600e3) { st.n = 0; st.at = Date.now(); }
  if (st.n >= 5) return res.status(429).json({ error: 'Muitos cadastros. Tente de novo mais tarde.' });
  const b = req.body || {}; const nome = String(b.name || '').trim(); const em = String(b.email || '').toLowerCase().trim(); const pw = String(b.password || '');
  const zap = String(b.whatsapp || '').replace(/\D/g, ''); const doc = String(b.doc || '').replace(/\D/g, '');
  if (nome.length < 2) return res.status(400).json({ error: 'Digite seu nome' });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return res.status(400).json({ error: 'Email inválido' });
  if (zap.length < 10) return res.status(400).json({ error: 'WhatsApp inválido (com DDD)' });
  if (doc.length !== 11 && doc.length !== 14) return res.status(400).json({ error: 'CPF ou CNPJ inválido' });
  if (pw.length < 8) return res.status(400).json({ error: 'A senha precisa ter pelo menos 8 caracteres' });
  if (users.some((u) => u.email === em)) return res.status(400).json({ error: 'Esse email já tem conta. Use Entrar ou Esqueci minha senha.' });
  if (users.some((u) => u.doc && u.doc === doc)) return res.status(400).json({ error: 'Esse CPF/CNPJ já tem conta.' });
  st.n++; signTries.set(ip, st);
  const id = 'u' + Date.now(); const u = { id, tenant: id, role: 'cliente', email: em, name: nome, opId: null, ativo: true, pw: hash(pw), whatsapp: zap, doc, criadoEm: Date.now(), cadastroProprio: true };
  users.push(u); writeJ('users.json', users);
  if (!S(id).db) saveS(id, { rev: 1, db: blankDb() });
  assinDb[id] = { plano: 'teste', venc: Date.now() + TESTE_DIAS * 864e5, teste: true }; writeJ('assinaturas.json', assinDb);
  console.log('[ms7] novo cadastro', em, nome);
  res.json({ ok: true });
});
const testeVencido = (u) => { if (!u || tenantOf(u) === 'main') return false; const a = assinDb[tenantOf(u)]; return !!(a && a.venc && a.venc < Date.now()); };
// ---------- Recuperação de senha por email (MailerSend) ----------
// Variáveis no Railway: MAILERSEND_KEY (token da API) e MAIL_FROM (email de um domínio verificado no MailerSend). APP_URL é opcional.
const sha = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');
let resets = readJ('resets.json', []);
const forgotTries = new Map();
async function sendMail(to, subject, text, html) {
  const key = process.env.MAILERSEND_KEY, from = process.env.MAIL_FROM;
  if (!key || !from) throw new Error('nao-configurado');
  const r = await fetch('https://api.mailersend.com/v1/email', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
    body: JSON.stringify({ from: { email: from, name: process.env.MAIL_NAME || 'MS7 Operações' }, to: [{ email: to }], subject, text, html }) });
  if (!r.ok) { const t = await r.text().catch(() => ''); throw new Error('MailerSend ' + r.status + ' ' + t.slice(0, 200)); }
}
app.post('/api/auth/forgot', async (req, res) => {
  const ip = req.ip; const t = forgotTries.get(ip) || { n: 0, at: Date.now() };
  if (Date.now() - t.at > 60 * 60e3) { t.n = 0; t.at = Date.now(); }
  if (t.n >= 5) return res.status(429).json({ error: 'Muitos pedidos. Tente de novo em 1 hora.' });
  t.n++; forgotTries.set(ip, t);
  if (!process.env.MAILERSEND_KEY || !process.env.MAIL_FROM) return res.status(503).json({ error: 'O envio de email ainda não foi configurado. Peça uma senha nova ao administrador.' });
  const em = String((req.body || {}).email || '').toLowerCase().trim();
  const u = users.find((x) => x.email === em && x.ativo);
  if (u) {
    const tok = crypto.randomBytes(24).toString('base64url');
    resets = resets.filter((x) => x.exp > Date.now() && x.uid !== u.id).concat([{ h: sha(tok), uid: u.id, exp: Date.now() + 60 * 60e3 }]);
    writeJ('resets.json', resets);
    const base = (process.env.APP_URL || (req.get('origin') || (req.protocol + '://' + req.get('host')))).replace(/\/$/, '');
    const link = base + '/?reset=' + tok;
    const nome = String(u.name || '').split(' ')[0] || '';
    sendMail(u.email, 'Redefinir sua senha do MS7',
      'Olá' + (nome ? ', ' + nome : '') + '.\n\nPara criar uma senha nova no MS7, abra o link abaixo (vale por 1 hora):\n' + link + '\n\nSe você não pediu, ignore este email.',
      '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#1A1F1D"><p>Olá' + (nome ? ', ' + nome : '') + '.</p><p>Para criar uma senha nova no MS7, clique no botão abaixo. O link vale por 1 hora.</p><p><a href="' + link + '" style="display:inline-block;padding:12px 22px;border-radius:10px;background:#005D3B;color:#fff;text-decoration:none;font-weight:bold">Criar senha nova</a></p><p style="color:#5A625E;font-size:13px">Se você não pediu, ignore este email.</p></div>'
    ).then(() => console.log('[ms7] email de recuperação enviado para ' + u.email)).catch((e) => console.log('[ms7] ERRO email recuperação: ' + e.message));
  }
  res.json({ ok: true });
});
app.post('/api/auth/reset', (req, res) => {
  const { token = '', password = '' } = req.body || {};
  if (String(password).length < 8) return res.status(400).json({ error: 'A senha precisa ter pelo menos 8 caracteres' });
  const r = resets.find((x) => x.h === sha(token) && x.exp > Date.now());
  const u = r && users.find((x) => x.id === r.uid);
  if (!u) return res.status(400).json({ error: 'Link vencido ou já usado. Peça um novo.' });
  u.pw = hash(String(password)); writeJ('users.json', users);
  resets = resets.filter((x) => x !== r && x.exp > Date.now()); writeJ('resets.json', resets);
  console.log('[ms7] senha redefinida por email: ' + u.email);
  res.json({ ok: true, email: u.email });
});
app.get('/api/auth/me', auth, (req, res) => res.json({ user: pub(req.user) }));
app.post('/api/auth/password', auth, (req, res) => {
  const { current = '', next: nw = '' } = req.body || {};
  if (!checkPw(current, req.user.pw)) return res.status(400).json({ error: 'Senha atual incorreta' });
  if (String(nw).length < 8) return res.status(400).json({ error: 'A nova senha precisa de 8 caracteres' });
  req.user.pw = hash(nw); writeJ('users.json', users); res.json({ ok: true });
});

// ---------- Gestão de acessos ----------
// O dono vê e gerencia todos os acessos. O cliente gerencia só os operadores do próprio painel.
app.get('/api/users', auth, managerOnly, (req, res) => res.json(users.filter((u) => isOwner(req.user) || sameTenant(u, req.user)).map(pub)));
app.post('/api/users', auth, managerOnly, (req, res) => {
  const me = req.user; const owner = isOwner(me);
  const { id, email, name, role = 'operador', opId = null, password, ativo = true } = req.body || {};
  if (!owner && role !== 'operador') return res.status(403).json({ error: 'Você só pode criar acessos de operador' });
  if (role === 'super' && me.role !== 'super') return res.status(403).json({ error: 'Só o Super Admin cria outro Super Admin' });
  if (!['admin', 'super', 'operador', 'cliente'].includes(role)) return res.status(400).json({ error: 'Papel inválido' });
  if (role === 'operador' && !opId) return res.status(400).json({ error: 'Vincule o acesso a um operador' });
  const em = String(email || '').toLowerCase().trim();
  if (!em) return res.status(400).json({ error: 'Email obrigatório' });
  if (users.some((u) => u.email === em && u.id !== id)) return res.status(400).json({ error: 'Email já cadastrado' });
  let u = id && users.find((x) => x.id === id);
  if (u && !owner && !sameTenant(u, me)) return res.status(403).json({ error: 'Sem permissão' });
  if (u && u.role === 'super' && me.role !== 'super') return res.status(403).json({ error: 'Sem permissão' });
  if (!u) { if (!password || String(password).length < 8) return res.status(400).json({ error: 'Senha com no mínimo 8 caracteres' }); u = { id: 'u' + Date.now(), tenant: tenantOf(me) }; users.push(u); }
  if (role === 'cliente') { if (!u.tenant || u.tenant === 'main') u.tenant = u.id; if (!S(u.tenant).db) saveS(u.tenant, { rev: 1, db: blankDb() }); }
  else if (!owner) u.tenant = tenantOf(me);
  else if (role !== 'operador') u.tenant = 'main';
  Object.assign(u, { email: em, name: name || em, role, opId: role === 'operador' ? opId : null, ativo: !!ativo });
  if (password) u.pw = hash(String(password));
  writeJ('users.json', users); res.json(pub(u));
});
app.delete('/api/users/:id', auth, managerOnly, (req, res) => {
  const u = users.find((x) => x.id === req.params.id);
  if (!u) return res.json({ ok: true });
  if (u.id === req.user.id) return res.status(400).json({ error: 'Você não pode remover o próprio acesso' });
  if (!isOwner(req.user) && (!sameTenant(u, req.user) || u.role !== 'operador')) return res.status(403).json({ error: 'Sem permissão' });
  if (u.role === 'super' && req.user.role !== 'super') return res.status(403).json({ error: 'Sem permissão' });
  users = users.filter((x) => x.id !== u.id); writeJ('users.json', users); res.json({ ok: true });
});

// ---------- Banco de dados central ----------
const stores = new Map();
const dbFile = (t) => (t === 'main' ? 'db.json' : 'db-' + String(t).replace(/[^a-zA-Z0-9_-]/g, '') + '.json');

// ---------- Dados de exemplo nunca entram no servidor ----------
const SEED_CLIENTES = ['Grupo Horizonte','Equipe Aurora','Clube Norte','Time Zênite','Grupo Prisma','Equipe Onda','Clube Âncora','Time Cobalto','Grupo Ártico','Equipe Brasa','Clube Safira','Time Nômade','Grupo Lince','Equipe Farol'];
function isSeed(k, x) {
  if (!x) return false; const id = x.id;
  if (k === 'operadores') return /^op[1-6]$/.test(id);
  if (k === 'pagamentos') return /^p[12]$/.test(id);
  if (k === 'custos') return typeof id === 'number' ? id < 1e6 : /^\d{1,5}$/.test(String(id));
  if (k === 'ponto') return /^pt_op[1-6]_/.test(String(id));
  if (k === 'pix') return /^g[1-3]$/.test(id);
  if (k === 'plataformas') return /^pl\d{1,2}$/.test(String(id));
  if (k === 'redes') return /^rd\d{1,2}$/.test(String(id));
  if (k === 'coops') { const m = /^C-(\d+)$/.exec(String(id)); if (!m || +m[1] < 1035 || +m[1] > 1048) return false; return !x._u || (SEED_CLIENTES.includes(x.cliente) && /^op[1-6]$/.test(x.opId)); }
  return false;
}
function semExemplo(d) {
  if (!d) return d; let n = 0;
  for (const k of ['operadores', 'coops', 'custos', 'pagamentos', 'pix', 'plataformas', 'redes', 'ponto']) if (Array.isArray(d[k])) { const b = d[k].length; d[k] = d[k].filter((x) => !isSeed(k, x)); n += b - d[k].length; }
  delete d._demo; return n;
}
function S(t) { if (!stores.has(t)) { const st = readJ(dbFile(t), { rev: 0, db: null }); if (st.db && !st.db._limpo2) { const n = semExemplo(st.db); st.db._limpo = true; st.db._limpo2 = true; st.rev = (st.rev || 0) + 1; writeJ(dbFile(t), st); console.log('[ms7] painel ' + t + ': ' + n + ' itens de exemplo removidos'); } stores.set(t, st); } return stores.get(t); }
function saveS(t, s) { stores.set(t, s); writeJ(dbFile(t), s); }
// Painel novo e vazio, com a mesma estrutura do painel principal
function blankDb() {
  const m = S('main').db || {};
  const cfg = JSON.parse(JSON.stringify(Object.assign({}, m.config || {}, { ponto: undefined, _u: undefined })));
  const d = { v: m.v || 2, _del: {}, config: cfg };
  for (const [k, v] of Object.entries(m)) if (Array.isArray(v)) d[k] = [];
  for (const k of ['operadores', 'coops', 'custos', 'pagamentos', 'pix', 'plataformas', 'redes', 'kv', 'ponto']) if (!d[k]) d[k] = [];
  return d;
}
const COLS = ['operadores', 'coops', 'custos', 'pagamentos', 'pix', 'plataformas', 'redes', 'kv', 'ponto'];
// Duas pessoas mexendo na mesma cooperação: junta conta por conta (e chave por chave nos lotes PIX); campos da cooperação vencem pelo mais recente
const NEST = { coops: 'contas', pix: 'chaves' };
function mergeNested(o, x, f, pre, del) {
  const useF = !!(o._uf || x._uf);
  const tf = (a) => (useF ? a._uf || 0 : a._u || 0);
  const base = tf(x) >= tf(o) ? x : o, other = base === x ? o : x;
  const m = new Map();
  for (const y of o[f] || []) m.set(y.id, y);
  for (const y of x[f] || []) { const p = m.get(y.id); if (!p || (y._u || 0) > (p._u || 0)) m.set(y.id, y); }
  const ord = (base[f] || []).map((y) => y.id).concat((other[f] || []).map((y) => y.id));
  const kids = [...new Set(ord)].map((id) => m.get(id)).filter((y) => { const d = del[pre + y.id]; return !d || (y._u || 0) > d; });
  return Object.assign({}, base, { [f]: kids, _u: Math.max(o._u || 0, x._u || 0), _uf: Math.max(o._uf || 0, x._uf || 0) || undefined });
}
function merge(cur, inc, cols) {
  if (!cur) return inc;
  const out = Object.assign({}, cur, { _del: Object.assign({}, cur._del) });
  for (const [k, v] of Object.entries(inc._del || {})) { const p = k.split(':')[0]; if (cols.includes(p) || (p === 'ct' && cols.includes('coops')) || (p === 'ch' && cols.includes('pix'))) out._del[k] = Math.max(v, out._del[k] || 0); }
  for (const k of cols) {
    const ca = cur[k], ia = inc[k];
    // Campo que não é lista (ex.: kv salvo como objeto): mescla por chave, o que chegou vence
    if ((ca != null && !Array.isArray(ca)) || (ia != null && !Array.isArray(ia))) {
      const ob = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});
      out[k] = ia === undefined ? ca : (ca == null || Array.isArray(ia) ? ia : Object.assign({}, ob(ca), ob(ia)));
      continue;
    }
    const map = new Map();
    for (const x of cur[k] || []) map.set(x.id, x);
    const nf = NEST[k];
    for (const x of inc[k] || []) { const o = map.get(x.id); if (!o) { map.set(x.id, x); continue; } if (!nf) { if ((x._u || 0) >= (o._u || 0)) map.set(x.id, x); continue; } map.set(x.id, mergeNested(o, x, nf, (k === 'coops' ? 'ct:' : 'ch:') + x.id + ':', out._del)); }
    out[k] = [...map.values()].filter((x) => { const d = out._del[k + ':' + x.id]; return !d || (x._u || 0) > d; });
    const order = (inc[k] || []).map((x) => x.id);
    out[k].sort((a, b) => { const ia = order.indexOf(a.id), ib = order.indexOf(b.id); return (ia < 0 ? 1e9 : ia) - (ib < 0 ? 1e9 : ib); });
  }
  if (cols.includes('config')) out.config = ((inc.config && inc.config._u) || 0) >= ((cur.config && cur.config._u) || 0) ? inc.config : cur.config;
  return out;
}
// O que cada papel enxerga
function viewFor(u, db) {
  if (!db || isTenantAdmin(u)) return db;
  const me = (db.operadores || []).find((o) => o.id === u.opId);
  return {
    v: db.v,
    operadores: me ? [{ id: me.id, nome: me.nome, email: me.email, ciclo: me.ciclo, pct: me.pct, ativo: me.ativo, pontoEntrada: me.pontoEntrada, pontoJornada: me.pontoJornada }] : [],
    coops: (db.coops || []).filter((c) => c.opId === u.opId),
    custos: [],
    pagamentos: (db.pagamentos || []).filter((p) => p.opId === u.opId),
    pix: (() => { const mg = new Set(); for (const c of db.coops || []) if (c.opId === u.opId && ['Ativa', 'Em andamento'].includes(c.status)) for (const id of c.pixGrupos || []) mg.add(id); return (db.pix || []).filter((g) => g.ativo !== false && (!g.opId || g.opId === u.opId || mg.has(g.id))); })(),
    plataformas: db.plataformas || [],
    redes: db.redes || [],
    ponto: (db.ponto || []).filter((p) => p.opId === u.opId),
    kv: (() => { const kv = Array.isArray(db.kv) ? db.kv : []; const it = kv.find((x) => x && x.id === 'metas'); const l = it && Array.isArray(it.v) ? it.v : []; const tt = kv.find((x) => x && x.id === 'tarefas'); const tl = tt && Array.isArray(tt.v) ? tt.v : []; return [{ id: 'metas', v: l.filter((m) => m && m.opId === u.opId) }, { id: 'tarefas', v: tl.filter((t) => t && t.resp === u.opId) }]; })(),
    config: { custoConta: db.config?.custoConta, ponto: db.config?.ponto },
    _del: {},
    _restrito: true,
  };
}
// O que o operador pode gravar: só as próprias cooperações (não pode mudar o dono nem apagar)
function pixNorm(val) {
  let s = String(val || '').trim(); if (!s) return '';
  if (s.includes('@')) return s.toLowerCase();
  if (/^[\d\s().+\-\/]+$/.test(s)) { s = s.replace(/\D/g, ''); if (s.length === 13 && s.startsWith('55')) s = s.slice(2); return s; }
  return s.toLowerCase().replace(/-/g, '');
}
function sanitizeFromOperator(u, inc, cur) {
  const mine = new Set((cur?.coops || []).filter((c) => c.opId === u.opId).map((c) => c.id));
  const all = new Set((cur?.coops || []).map((c) => c.id));
  const coops = (inc.coops || []).filter((c) => c.opId === u.opId && (mine.has(c.id) || !all.has(c.id)));
  const curById = new Map((cur?.coops || []).map((c) => [c.id, c]));
  for (const c of coops) { const o = curById.get(c.id); if (o) { c.comTipo = o.comTipo; c.comValor = o.comValor; c.pixGrupos = o.pixGrupos; if (o.status === 'Concluída' || c.status === 'Concluída' || c.status === 'Lixeira') c.status = o.status; } else if (c.status === 'Concluída' || c.status === 'Lixeira') c.status = 'Ativa'; }
  // Só o admin conclui: o operador finaliza (status 'Finalizada') e o admin analisa
  // PIX: o operador só pode reservar/liberar chaves dos grupos que enxerga (não cria, não apaga, não bloqueia)
  const mineAll = new Set((cur?.coops || []).filter((c) => c.opId === u.opId).map((c) => c.id).concat(coops.map((c) => c.id)));
  const incG = new Map((inc.pix || []).map((g) => [g.id, g]));
  const pix = []; const resv = [], libs = [];
  for (const g of cur?.pix || []) {
    if (g.ativo === false || (g.opId && g.opId !== u.opId && !(cur?.coops || []).some((c) => c.opId === u.opId && ['Ativa', 'Em andamento'].includes(c.status) && (c.pixGrupos || []).includes(g.id)))) continue;
    const ig = incG.get(g.id); if (!ig) continue;
    const ik = new Map((ig.chaves || []).map((k) => [k.id, k]));
    let changed = false;
    const chaves = g.chaves.map((k) => {
      const n = ik.get(k.id); if (!n) return k;
      const x0 = k.por || {}, y0 = n.por || {};
      if (JSON.stringify(x0) === JSON.stringify(y0)) return k;
      const por = Object.assign({}, x0); let ok = false;
      for (const gp of new Set(Object.keys(x0).concat(Object.keys(y0)))) {
        const x = x0[gp], y = y0[gp]; if (JSON.stringify(x) === JSON.stringify(y)) continue;
        const livreX = !x || x.status === 'disponivel' || (x.status === 'usada' && x.conta && mineAll.has(x.conta.coopId));
        const reserva = livreX && y && y.status === 'usada' && y.conta && mineAll.has(y.conta.coopId);
        const libera = x && x.status === 'usada' && (!y || y.status === 'disponivel') && x.conta && mineAll.has(x.conta.coopId);
        if (reserva) { por[gp] = y; ok = true; resv.push({ v: pixNorm(k.valor), gp, e: y }); } else if (libera) { delete por[gp]; ok = true; libs.push({ gp, conta: x.conta }); }
      }
      if (!ok) return k;
      changed = true; return Object.assign({}, k, { por, _u: Date.now() });
    });
    if (changed) pix.push(Object.assign({}, g, { chaves, _u: Date.now() }));
  }
  // A mesma chave repetida em outros lotes (de outros operadores) também fica usada nessa plataforma
  if (resv.length || libs.length) {
    const byId = new Map(pix.map((g) => [g.id, g]));
    const gpN = (s) => String(s || '').trim().replace(/\s+/g, ' ').toLowerCase();
    for (const g0 of cur?.pix || []) {
      const g = byId.get(g0.id) || g0; let ch = false;
      const chaves = g.chaves.map((k) => {
        const por = Object.assign({}, k.por || {}); let kc = false; const kv = pixNorm(k.valor);
        for (const r of resv) { if (!kv || kv !== r.v) continue; const hit = Object.keys(por).find((n) => gpN(n) === gpN(r.gp)); const cur0 = hit ? por[hit] : null; if (!cur0 || cur0.status === 'disponivel') { por[r.gp] = r.e; kc = true; } }
        for (const l of libs) { for (const n of Object.keys(por)) { const e = por[n]; if (gpN(n) === gpN(l.gp) && e && e.status === 'usada' && e.conta && e.conta.coopId === l.conta.coopId && e.conta.contaId === l.conta.contaId) { delete por[n]; kc = true; } } }
        if (!kc) return k; ch = true; return Object.assign({}, k, { por, _u: Date.now() });
      });
      if (ch) { const ng = Object.assign({}, g, { chaves, _u: Date.now() }); if (byId.has(g.id)) pix[pix.findIndex((x) => x.id === g.id)] = ng; else pix.push(ng); byId.set(g.id, ng); }
    }
  }
  // PONTO: o operador só marca o próprio dia de HOJE, só preenche campos vazios, na ordem, e o horário é o do servidor
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
  const curP = new Map((cur?.ponto || []).map((p) => [p.id, p]));
  const ponto = [];
  for (const p of inc.ponto || []) {
    const id = 'pt_' + u.opId + '_' + today;
    if (p.id !== id) continue;
    const o = curP.get(id) || { id, opId: u.opId, data: today };
    const n = Object.assign({}, o); let ch = false;
    for (const f of ['entrada', 'almocoIni', 'almocoFim', 'saida']) {
      if (o[f] || !p[f]) continue;
      if (f !== 'entrada' && !n.entrada) continue;
      if (f === 'almocoIni' && n.saida) continue;
      if (f === 'almocoFim' && !n.almocoIni) continue;
      if (f === 'saida' && n.almocoIni && !n.almocoFim) continue;
      n[f] = Date.now(); ch = true;
    }
    // PAUSAS (compromisso, dentista…): o operador abre uma pausa e fecha a última; horário do servidor
    const oP = Array.isArray(o.pausas) ? o.pausas.map((x) => Object.assign({}, x)) : [];
    const iP = Array.isArray(p.pausas) ? p.pausas : [];
    const ult = oP[oP.length - 1];
    if (ult && !ult.fim && iP.length >= oP.length && iP[oP.length - 1] && iP[oP.length - 1].fim) { ult.fim = Date.now(); n.pausas = oP; ch = true; }
    else if ((!ult || ult.fim) && iP.length > oP.length && n.entrada && !n.saida) { const q = iP[iP.length - 1] || {}; if (!q.fim) { oP.push({ ini: Date.now(), motivo: String(q.motivo || 'Compromisso').slice(0, 60) }); n.pausas = oP; ch = true; } }
    if (ch) { n._u = Date.now(); ponto.push(n); }
  }
  // TAREFAS: o operador só mexe nas tarefas dele (marcar feita, editar, criar para si; apagar só as que ele criou)
  let kvOut = null;
  const incT = (Array.isArray(inc.kv) ? inc.kv : []).find((x) => x && x.id === 'tarefas');
  if (incT && Array.isArray(incT.v)) {
    const curT = (Array.isArray(cur?.kv) ? cur.kv : []).find((x) => x && x.id === 'tarefas');
    const curL = curT && Array.isArray(curT.v) ? curT.v : [];
    const meus = new Map(incT.v.filter((t) => t && t.id).map((t) => [t.id, t]));
    const out = []; let ch = false; const seen = new Set();
    for (const t of curL) {
      if (!t || t.resp !== u.opId) { out.push(t); continue; }
      seen.add(t.id); const n = meus.get(t.id);
      if (!n) { if (t.criadoPor === u.opId) { ch = true; continue; } out.push(t); continue; }
      const nt = Object.assign({}, n, { id: t.id, resp: u.opId, criadoPor: t.criadoPor || 'admin' });
      if (JSON.stringify(nt) !== JSON.stringify(t)) ch = true; out.push(nt);
    }
    for (const [id, n] of meus) { if (seen.has(id) || curL.some((t) => t && t.id === id)) continue; out.push(Object.assign({}, n, { resp: u.opId, criadoPor: u.opId })); ch = true; }
    if (ch) kvOut = [{ id: 'tarefas', v: out, _u: Date.now() }];
  }
  // METAS: o operador só pode iniciar, finalizar ou reabrir as metas dele
  const incM = (Array.isArray(inc.kv) ? inc.kv : []).find((x) => x && x.id === 'metas');
  if (incM && Array.isArray(incM.v)) {
    const curM = (Array.isArray(cur?.kv) ? cur.kv : []).find((x) => x && x.id === 'metas');
    const curL = curM && Array.isArray(curM.v) ? curM.v : [];
    const minhas = new Map(incM.v.filter((m) => m && m.id).map((m) => [m.id, m]));
    let ch = false;
    const out = curL.map((m) => {
      if (!m || m.opId !== u.opId) return m;
      const n = minhas.get(m.id); if (!n) return m;
      const nm = Object.assign({}, m, { iniciadaEm: n.iniciadaEm || null, feitaEm: n.feitaEm || null });
      if ((m.iniciadaEm || null) !== nm.iniciadaEm || (m.feitaEm || null) !== nm.feitaEm) { ch = true; return nm; }
      return m;
    });
    if (ch) (kvOut = kvOut || []).push({ id: 'metas', v: out, _u: Date.now() });
  }
  const r = { coops, pix, ponto, _del: {} }; if (kvOut) r.kv = kvOut;
  return r;
}
const clients = new Map();
function broadcast(t = 'main') { const st = S(t); for (const [res, u] of clients) if (tenantOf(u) === t) res.write('data: ' + JSON.stringify({ rev: st.rev }) + '\n\n'); }

app.get('/api/db', auth, (req, res) => { const st = S(tenantOf(req.user)); res.json({ rev: st.rev, db: viewFor(req.user, st.db), user: pub(req.user) }); });
app.put('/api/db', express.json({ limit: '20mb' }), auth, (req, res) => { try { putDb(req, res); } catch (e) { console.error('[ms7] ERRO ao salvar:', e && e.stack || e); if (!res.headersSent) res.status(500).json({ error: 'Erro no servidor: ' + (e && e.message || e) }); } });
function putDb(req, res) {
  if (testeVencido(req.user)) return res.status(402).json({ error: 'Seu período de teste acabou. Escolha um plano em Assinatura para continuar.' });
  const t = tenantOf(req.user); let store = S(t);
  let inc = req.body && req.body.db; const before = store.db; let changedPonto = null;
  if (!inc || !Array.isArray(inc.coops)) return res.status(400).json({ error: 'db inválido' });
  semExemplo(inc); inc._limpo = true;
  if (!isTenantAdmin(req.user)) {
    if (!store.db) return res.status(403).json({ error: 'O administrador precisa enviar os dados primeiro' });
    inc = sanitizeFromOperator(req.user, inc, store.db); changedPonto = inc.ponto;
    try { const oc = new Map((store.db.coops || []).map((c) => [c.id, c])); (inc.coops || []).forEach((c) => { const o = oc.get(c.id); if (!o || !Array.isArray(c.contas)) return; const ok = new Map((o.contas || []).map((k) => [k.id, k])); c.contas.forEach((k) => { const p = ok.get(k.id); if (p) { k.deposito = p.deposito; } else { k.deposito = 0; } }); }); } catch (e) { console.error('trava deposito', e.message); }
    store = { rev: store.rev + 1, db: merge(store.db, inc, ['coops', 'pix', 'ponto'].concat(inc.kv && Array.isArray(store.db.kv) ? ['kv'] : [])) };
  } else {
    store = { rev: store.rev + 1, db: merge(store.db, inc, COLS.concat('config')) };
  }
  semExemplo(store.db); store.db._limpo = true; store.db._limpo2 = true;
  store.updatedAt = new Date().toISOString();
  saveS(t, store);
  console.log('[ms7] salvo painel ' + t + ' rev ' + store.rev + ' por ' + (req.user.email || req.user.id) + ': ' + (store.db.coops || []).length + ' coops, ' + (store.db.operadores || []).length + ' operadores');
  res.json({ rev: store.rev, db: viewFor(req.user, store.db) });
  broadcast(t);
  try { tarefasEventos(before, store.db, req.user, t); } catch (e) { console.error('tarefas', e.message); }
  if (t === 'main' && changedPonto && changedPonto.length) { try { pontoEventos(before, changedPonto); } catch (e) { console.error('ponto', e.message); } }
}
app.get('/api/events', auth, (req, res) => {
  res.set({ 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
  res.flushHeaders();
  res.write('data: ' + JSON.stringify({ rev: S(tenantOf(req.user)).rev }) + '\n\n');
  clients.set(res, req.user);
  const ping = setInterval(() => res.write(': ping\n\n'), 25000);
  req.on('close', () => { clearInterval(ping); clients.delete(res); });
});

// ---------- Acessos de teste (só o dono): painel de cliente com dados separados + login de operador ----------
function testDb() {
  const d = blankDb(); const n = Date.now();
  d.operadores = [{ id: 'op' + n, nome: 'Operador Teste', email: 'operador.teste@ms7.com', ciclo: 7, pct: 15, ativo: true, _u: n }];
  d.plataformas = [{ id: 'pl' + n, nome: 'Plataforma A', grupo: 'Grupo Teste', _u: n }, { id: 'pl' + (n + 1), nome: 'Plataforma B', grupo: 'Grupo Teste', _u: n }, { id: 'pl' + (n + 2), nome: 'Plataforma C', grupo: '', _u: n }];
  d.redes = [{ id: 'rd' + n, nome: 'Rede Teste', _u: n }];
  const ks = [['cpf', '529.982.247-25'], ['cpf', '111.444.777-35'], ['telefone', '(11) 98888-1020'], ['email', 'pix.teste1@ms7.com'], ['email', 'pix.teste2@ms7.com'], ['aleatoria', 'e3b0c442-98fc-4c14-9afb-f4c8996fb924']];
  d.pix = [{ id: 'g' + n, nome: 'Chaves de teste', pagamento: 'Teste', opId: '', plataforma: '', ativo: true, _u: n, chaves: ks.map((k, i) => ({ id: 'x' + n + '-' + i, tipo: k[0], valor: k[1], por: {} })) }];
  return d;
}
app.post('/api/test-env', auth, ownerOnly, (req, res) => {
  const pw = () => crypto.randomBytes(6).toString('base64url').replace(/[-_]/g, 'x') + '7a';
  const ce = 'cliente.teste@ms7.com', oe = 'operador.teste@ms7.com'; const cpw = pw(), opw = pw();
  let cu = users.find((u) => u.email === ce);
  if (!cu) { cu = { id: 'u' + Date.now(), email: ce, name: 'Cliente Teste', opId: null }; users.push(cu); }
  Object.assign(cu, { role: 'cliente', ativo: true, pw: hash(cpw) }); if (!cu.tenant || cu.tenant === 'main') cu.tenant = cu.id;
  const t = cu.tenant; let st = S(t);
  if (!st.db || !(st.db.operadores || []).length) { saveS(t, { rev: (st.rev || 0) + 1, db: testDb(), updatedAt: new Date().toISOString() }); st = S(t); }
  const op = st.db.operadores[0];
  let ou = users.find((u) => u.email === oe);
  if (!ou) { ou = { id: 'u' + (Date.now() + 1), email: oe, name: 'Operador Teste' }; users.push(ou); }
  Object.assign(ou, { role: 'operador', tenant: t, opId: op.id, ativo: true, pw: hash(opw) });
  writeJ('users.json', users); broadcast(t);
  res.json({ cliente: { email: ce, password: cpw }, operador: { email: oe, password: opw } });
});

// ---------- Notificações ----------
const readSubs = () => readJ('subscriptions.json', []);
const writeSubs = (l) => writeJ('subscriptions.json', l);
app.get('/api/push/public-key', (_req, res) => res.json({ publicKey: keys.publicKey }));
app.post('/api/push/subscribe', auth, (req, res) => {
  const { subscription, device = '' } = req.body || {};
  if (!subscription?.endpoint) return res.status(400).json({ error: 'subscription ausente' });
  const l = readSubs().filter((s) => s.subscription.endpoint !== subscription.endpoint);
  l.push({ subscription, uid: req.user.id, role: req.user.role, tenant: tenantOf(req.user), device, createdAt: new Date().toISOString() });
  writeSubs(l); res.json({ ok: true });
});
app.post('/api/push/unsubscribe', auth, (req, res) => { writeSubs(readSubs().filter((s) => s.subscription.endpoint !== req.body?.endpoint)); res.json({ ok: true }); });
// Qualquer usuário logado pode avisar os administradores; só admin escolhe outros destinos.
app.post('/api/push/notify', auth, async (req, res) => {
  const { title, body = '', tag, url = '/' } = req.body || {};
  const to0 = isTenantAdmin(req.user) && Array.isArray(req.body?.to) ? req.body.to : ['admin', 'super'];
  const to = to0.includes('admin') || to0.includes('super') ? to0.concat('cliente') : to0; const tt = tenantOf(req.user);
  if (!title) return res.status(400).json({ error: 'title obrigatório' });
  const payload = JSON.stringify({ title: String(title).slice(0, 120), body: String(body).slice(0, 1500), tag, url });
  const subs = readSubs(); const dead = []; let sent = 0;
  await Promise.all(subs.filter((s) => (s.tenant || 'main') === tt && to.includes(s.role)).map(async (s) => {
    try { await webpush.sendNotification(s.subscription, payload, { TTL: 3600 }); sent++; }
    catch (e) { if (e.statusCode === 404 || e.statusCode === 410) dead.push(s.subscription.endpoint); }
  }));
  if (dead.length) writeSubs(subs.filter((s) => !dead.includes(s.subscription.endpoint)));
  res.json({ ok: true, sent });
});

// ---------- Avisos do ponto (enviados pelo servidor, mesmo com o painel fechado) ----------
const BRT = (d = new Date()) => d.toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
const hmBR = (ms) => new Date(ms).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
const durBR = (m) => { m = Math.max(0, Math.round(m)); return Math.floor(m / 60) + 'h' + String(m % 60).padStart(2, '0'); };
function pontoCfg(db, opId) {
  const c = Object.assign({ entrada: '09:00', jornada: 8, tolerancia: 10, almoco: 60 }, db?.config?.ponto || {});
  const o = (db?.operadores || []).find((x) => x.id === opId) || {};
  return { entrada: o.pontoEntrada || c.entrada, jornada: +(o.pontoJornada || c.jornada) || 8, tolerancia: +c.tolerancia || 0, almoco: +c.almoco || 60,
    avisos: Object.assign({ marcacoes: true, atraso: true, ausente: true, almocoLongo: true, semSaida: true }, c.avisos || {}) };
}
async function pushTo(roles, title, body, tag, t = 'main') {
  const payload = JSON.stringify({ title: String(title).slice(0, 120), body: String(body).slice(0, 1500), tag, url: '/' });
  const subs = readSubs(); const dead = [];
  await Promise.all(subs.filter((s) => (s.tenant || 'main') === t && roles.includes(s.role)).map(async (s) => {
    try { await webpush.sendNotification(s.subscription, payload, { TTL: 3600 }); }
    catch (e) { if (e.statusCode === 404 || e.statusCode === 410) dead.push(s.subscription.endpoint); }
  }));
  if (dead.length) writeSubs(readSubs().filter((s) => !dead.includes(s.subscription.endpoint)));
}
function tarefasEventos(before, after, by, t) {
  const L = (d) => { const it = (Array.isArray(d?.kv) ? d.kv : []).find((x) => x && x.id === 'tarefas'); return it && Array.isArray(it.v) ? it.v : []; };
  const old = new Set(L(before).map((x) => x && x.id)); const novas = L(after).filter((x) => x && x.id && !old.has(x.id) && x.resp && x.resp !== 'admin' && x.criadoPor !== x.resp);
  for (const tk of novas) {
    const uids = users.filter((u) => u.opId === tk.resp && u.ativo !== false).map((u) => u.id); if (!uids.length) continue;
    const payload = JSON.stringify({ title: (tk.prio === 'urgente' ? 'Tarefa URGENTE: ' : 'Nova tarefa: ') + String(tk.txt || '').slice(0, 90), body: (tk.data ? 'Para ' + tk.data.split('-').reverse().slice(0, 2).join('/') : '') + (tk.hora ? ' às ' + tk.hora : ''), tag: 'tarefa-' + tk.id, url: '/' });
    const subs = readSubs(); const dead = [];
    Promise.all(subs.filter((s) => (s.tenant || 'main') === t && uids.includes(s.uid)).map(async (s) => { try { await webpush.sendNotification(s.subscription, payload, { TTL: 86400 }); } catch (e) { if (e.statusCode === 404 || e.statusCode === 410) dead.push(s.subscription.endpoint); } }))
      .then(() => { if (dead.length) writeSubs(readSubs().filter((s) => !dead.includes(s.subscription.endpoint))); }).catch(() => {});
  }
}
function pontoAviso(tipo, opId, title, body) {
  let store = S('main'); if (!store.db) return;
  store.db.pontoLog = [{ id: 'pl' + Date.now() + Math.random().toString(36).slice(2, 6), tipo, opId, title, body, at: Date.now() }].concat(store.db.pontoLog || []).slice(0, 200);
  store = { rev: store.rev + 1, db: store.db, updatedAt: new Date().toISOString() };
  saveS('main', store); broadcast('main');
  pushTo(['admin', 'super'], title, body, 'ponto-' + tipo).catch(() => {});
}
const PLABEL = { entrada: 'Entrada', almocoIni: 'Saída para almoço', almocoFim: 'Volta do almoço', saida: 'Saída' };
function pontoEventos(before, changed) {
  const store = S('main');
  for (const n of changed) {
    const o = (before?.ponto || []).find((p) => p.id === n.id) || {};
    const c = pontoCfg(store.db, n.opId); const nome = (store.db.operadores || []).find((x) => x.id === n.opId)?.nome || 'Operador';
    for (const f of ['entrada', 'almocoIni', 'almocoFim', 'saida']) {
      if (o[f] || !n[f]) continue;
      if (f === 'entrada') {
        const late = (n.entrada - new Date(n.data + 'T' + c.entrada + ':00-03:00').getTime()) / 60000;
        if (late > c.tolerancia && c.avisos.atraso) { pontoAviso('atraso', n.opId, 'Atraso: ' + nome, 'Entrou às ' + hmBR(n.entrada) + ' (previsto ' + c.entrada + '), ' + durBR(late) + ' de atraso'); continue; }
      }
      if (!c.avisos.marcacoes) continue;
      let body = PLABEL[f] + ' às ' + hmBR(n[f]);
      if (f === 'almocoFim') body += ' · almoço de ' + durBR((n.almocoFim - n.almocoIni) / 60000);
      if (f === 'saida') { const pausa = n.almocoIni ? ((n.almocoFim || n.saida) - n.almocoIni) : 0; body += ' · trabalhou ' + durBR((n.saida - n.entrada - pausa) / 60000) + ' (jornada ' + c.jornada + 'h)'; }
      pontoAviso('marcacao', n.opId, nome + ': ' + PLABEL[f], body);
    }
    const oP = o.pausas || [], nP = n.pausas || [];
    if (nP.length > oP.length) { const q = nP[nP.length - 1]; pontoAviso('pausa', n.opId, nome + ' saiu: ' + (q.motivo || 'Compromisso'), 'Pausa iniciada às ' + hmBR(q.ini)); }
    else if (nP.length && oP.length === nP.length && nP[nP.length - 1].fim && !oP[oP.length - 1].fim) { const q = nP[nP.length - 1]; pontoAviso('pausa', n.opId, nome + ' voltou (' + (q.motivo || 'Compromisso') + ')', 'Ficou ' + durBR((q.fim - q.ini) / 60000) + ' fora'); }
  }
}
// A cada 5 minutos: quem não chegou, almoço longo e saída esquecida (uma vez por dia cada aviso)
function checarPonto() {
  const db = S('main').db; if (!db) return;
  const today = BRT(); if (new Date(today + 'T12:00:00-03:00').getUTCDay() === 0) return;
  const sent = readJ('ponto-avisos.json', {}); const now = Date.now(); let ch = false;
  const once = (k, fn) => { if (sent[k]) return; sent[k] = now; ch = true; fn(); };
  for (const o of (db.operadores || []).filter((x) => x.ativo)) {
    const c = pontoCfg(db, o.id); const r = (db.ponto || []).find((p) => p.id === 'pt_' + o.id + '_' + today) || {};
    const prev = new Date(today + 'T' + c.entrada + ':00-03:00').getTime();
    if (!r.entrada && c.avisos.ausente && now > prev + (c.tolerancia + 30) * 60000 && now < prev + 6 * 3600000)
      once(o.id + ':' + today + ':ausente', () => pontoAviso('ausente', o.id, o.nome + ' não bateu o ponto', 'Entrada prevista ' + c.entrada + '. Nenhum registro até ' + hmBR(now) + '.'));
    if (r.almocoIni && !r.almocoFim && !r.saida && c.avisos.almocoLongo && now - r.almocoIni > (c.almoco + 15) * 60000)
      once(r.id + ':almoco', () => pontoAviso('almocoLongo', o.id, 'Almoço longo: ' + o.nome, 'Saiu às ' + hmBR(r.almocoIni) + ' e ainda não voltou (' + durBR((now - r.almocoIni) / 60000) + ').'));
    if (r.entrada && !r.saida && c.avisos.semSaida && now > prev + (c.jornada * 60 + c.almoco + 60) * 60000)
      once(r.id + ':saida', () => pontoAviso('semSaida', o.id, o.nome + ' não registrou a saída', 'Entrou às ' + hmBR(r.entrada) + '. A jornada prevista já terminou.'));
  }
  for (const k of Object.keys(sent)) if (now - sent[k] > 3 * 86400000) { delete sent[k]; ch = true; }
  if (ch) writeJ('ponto-avisos.json', sent);
}
setInterval(checarPonto, 5 * 60000); setTimeout(checarPonto, 20000);

if (HAS_ROOT) app.get('/', (_req, res) => res.redirect('/ui_kits/operacoes/'));
// Bibliotecas (React, Babel, ícones) servidas pelo próprio painel: o PC que abre o link não precisa acessar unpkg.com
const VENDOR = path.join(DATA, 'vendor');
fs.mkdirSync(VENDOR, { recursive: true });
app.get('/__vendor/*', async (req, res) => {
  const rel = req.params[0];
  if (!/^[\w@.\/-]+$/.test(rel) || rel.includes('..')) return res.status(400).end();
  const f = path.join(VENDOR, rel.replace(/\//g, '__'));
  res.type('application/javascript'); res.set('Cache-Control', 'public, max-age=31536000, immutable');
  if (fs.existsSync(f)) return res.sendFile(f);
  try {
    const r = await fetch('https://unpkg.com/' + rel);
    if (!r.ok) return res.status(502).send('// unpkg ' + r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    fs.writeFileSync(f, buf); res.send(buf);
  } catch (e) { res.status(502).send('// sem internet no servidor'); }
});
const INDEX = path.join(__dirname, '..', 'index.html');
const sendIndex = (_req, res) => { res.set('Cache-Control', 'no-cache'); res.type('html').send(fs.readFileSync(INDEX, 'utf8').split('https://unpkg.com/').join('/__vendor/')); };
app.get(['/ui_kits/operacoes/', '/ui_kits/operacoes/index.html'], sendIndex);
if (!HAS_ROOT) app.get(['/', '/index.html'], sendIndex);
// pré-carrega as bibliotecas ao ligar
['react@18.3.1/umd/react.development.js', 'react-dom@18.3.1/umd/react-dom.development.js', '@babel/standalone@7.29.0/babel.min.js', 'lucide@0.469.0/dist/umd/lucide.min.js'].forEach((p) => {
  const f = path.join(VENDOR, p.replace(/\//g, '__'));
  if (!fs.existsSync(f)) fetch('https://unpkg.com/' + p).then((r) => r.ok && r.arrayBuffer()).then((b) => b && fs.writeFileSync(f, Buffer.from(b))).catch(() => {});
});

// Versão do código: muda quando qualquer arquivo do painel é atualizado -> todos os navegadores recarregam sozinhos
function codeVersion() {
  let m = 0; const dir = path.join(__dirname, '..');
  try { for (const f of fs.readdirSync(dir)) { if (/\.(jsx|js|html|css)$/.test(f)) m = Math.max(m, fs.statSync(path.join(dir, f)).mtimeMs); } } catch (e) {}
  return String(Math.round(m));
}
// ---------- PIX Mercado Pago: vaga de operador, assinatura e loja (proxies) ----------
// Variável no Railway: MP_ACCESS_TOKEN (token de produção do Mercado Pago). Sem ela, as telas mostram "PIX ainda não configurado".
const VAGA_PRECO = 14.99;
const PLANOS = { starter: { nome: 'Starter', preco: 147, seats: 5 }, pro: { nome: 'Pro', preco: 297, seats: 10 }, scale: { nome: 'Scale', preco: 597, seats: 25 } };
let pixPg = readJ('pix-pagamentos.json', []);
let vagasDb = readJ('vagas.json', {});
let assinDb = readJ('assinaturas.json', {});
let loja = readJ('loja.json', { produtos: [
  { id: 'resid', nome: 'Proxy Residencial Rotativa', desc: '1 GB · 30 dias', preco: 25, ativo: true },
  { id: 'premium', nome: 'Proxy Residencial Premium', desc: '1 GB · 30 dias', preco: 35, ativo: true },
  { id: 'mobile', nome: 'Proxy Mobile', desc: '1 GB · 30 dias', preco: 45, ativo: true },
  { id: 'bot', nome: 'Bot Cash Hunter', desc: 'Licença', preco: 450, ativo: true },
  { id: 'network', nome: 'Grupo de Network', desc: 'Acesso ao grupo', preco: 170, ativo: true } ], cupons: [] });
const mpOn = () => !!process.env.MP_ACCESS_TOKEN;
async function mpCriar(valor, descricao, email) {
  const r = await fetch('https://api.mercadopago.com/v1/payments', { method: 'POST', headers: { Authorization: 'Bearer ' + process.env.MP_ACCESS_TOKEN, 'Content-Type': 'application/json', 'X-Idempotency-Key': crypto.randomBytes(16).toString('hex') },
    body: JSON.stringify({ transaction_amount: Math.round(valor * 100) / 100, description: descricao, payment_method_id: 'pix', payer: { email: email || 'cliente@ms7.app' } }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j && (j.message || (j.cause && j.cause[0] && j.cause[0].description))) || 'O Mercado Pago recusou o pagamento');
  const td = (j.point_of_interaction && j.point_of_interaction.transaction_data) || {};
  return { mpId: String(j.id), status: j.status, qr: td.qr_code_base64 ? 'data:image/png;base64,' + td.qr_code_base64 : null, copia: td.qr_code || '' };
}
async function mpStatus(mpId) { const r = await fetch('https://api.mercadopago.com/v1/payments/' + mpId, { headers: { Authorization: 'Bearer ' + process.env.MP_ACCESS_TOKEN } }); const j = await r.json().catch(() => ({})); return j.status || 'pending'; }
function aplicarPix(p) {
  if (p.aplicado) return; p.aplicado = Date.now();
  if (p.tipo === 'vaga') { vagasDb[p.tenant] = (vagasDb[p.tenant] || 0) + 1; writeJ('vagas.json', vagasDb); }
  if (p.tipo === 'assinatura') { const a = assinDb[p.tenant] || {}; const base = Math.max(Date.now(), a.venc || 0); assinDb[p.tenant] = { plano: p.plano, venc: base + 30 * 864e5, pagoEm: Date.now() }; writeJ('assinaturas.json', assinDb); }
  if (p.tipo === 'loja' && p.cupom) { const c = loja.cupons.find((x) => x.codigo === p.cupom); if (c) { c.usos = (c.usos || 0) + 1; writeJ('loja.json', loja); } }
  console.log('[ms7] PIX aprovado', p.tipo, p.tenant, p.valor);
}
async function conferirPix(p) {
  if (!p || p.status === 'approved' || !mpOn()) return p;
  try { const st = await mpStatus(p.mpId); if (st !== p.status) { p.status = st; if (st === 'approved') aplicarPix(p); writeJ('pix-pagamentos.json', pixPg); } } catch (e) {}
  return p;
}
setInterval(() => { const ag = Date.now() - 2 * 864e5; pixPg.filter((p) => p.status === 'pending' && p.criado > ag).forEach((p) => conferirPix(p)); }, 120000);
function precoLoja(itens, cupom) {
  let total = 0; const lista = [];
  for (const it of itens || []) { const pr = loja.produtos.find((x) => x.id === it.id && x.ativo !== false); const q = Math.max(1, Math.min(999, parseInt(it.qtd, 10) || 1)); if (!pr) continue; total += pr.preco * q; lista.push({ id: pr.id, nome: pr.nome, qtd: q, preco: pr.preco }); }
  let desc = 0, cup = null;
  if (cupom) { const c = loja.cupons.find((x) => x.ativo !== false && String(x.codigo).toUpperCase() === String(cupom).trim().toUpperCase() && (!x.validade || x.validade >= new Date().toISOString().slice(0, 10)) && (!x.limite || (x.usos || 0) < x.limite)); if (c) { desc = Math.round(total * (+c.pct || 0)) / 100; cup = c.codigo; } }
  return { lista, total: Math.round(total * 100) / 100, desconto: desc, valor: Math.max(0, Math.round((total - desc) * 100) / 100), cupom: cup };
}
async function criarPix(req, res, d) {
  if (!mpOn()) return res.status(503).json({ error: 'PIX ainda não configurado (falta MP_ACCESS_TOKEN no Railway)' });
  if (!(d.valor > 0)) return res.status(400).json({ error: 'Valor inválido' });
  try {
    const m = await mpCriar(d.valor, d.descricao, req.user.email);
    const p = Object.assign({ id: 'px' + Date.now() + crypto.randomBytes(3).toString('hex'), tenant: tenantOf(req.user), userId: req.user.id, email: req.user.email, criado: Date.now(), status: m.status, mpId: m.mpId }, d);
    pixPg.push(p); writeJ('pix-pagamentos.json', pixPg);
    if (m.status === 'approved') aplicarPix(p);
    res.json({ id: p.id, qr: m.qr, copia: m.copia, valor: p.valor, status: p.status });
  } catch (e) { res.status(502).json({ error: e.message }); }
}
async function verPix(req, res) {
  const p = pixPg.find((x) => x.id === req.params.id); if (!p || (p.tenant !== tenantOf(req.user) && !isOwner(req.user))) return res.status(404).json({ error: 'Pagamento não encontrado' });
  await conferirPix(p);
  res.json({ id: p.id, status: p.status, tipo: p.tipo, valor: p.valor, vagas: vagasDb[p.tenant] || 0, assinatura: assinDb[p.tenant] || null });
}
app.post('/api/pix', auth, express.json(), (req, res) => {
  const b = req.body || {};
  if (b.tipo === 'vaga') return criarPix(req, res, { tipo: 'vaga', valor: VAGA_PRECO, descricao: 'MS7 · vaga de operador' });
  if (b.tipo === 'assinatura') { const pl = PLANOS[b.plano]; if (!pl) return res.status(400).json({ error: 'Plano inválido' }); return criarPix(req, res, { tipo: 'assinatura', plano: b.plano, valor: pl.preco, descricao: 'MS7 · plano ' + pl.nome + ' (30 dias)' }); }
  if (b.tipo === 'loja') { const c = precoLoja(b.itens, b.cupom); if (!c.lista.length) return res.status(400).json({ error: 'Escolha pelo menos um produto' }); return criarPix(req, res, { tipo: 'loja', itens: c.lista, total: c.total, desconto: c.desconto, cupom: c.cupom, valor: c.valor, descricao: 'Marcelo Proxies · ' + c.lista.map((x) => x.qtd + 'x ' + x.nome).join(', ').slice(0, 200) }); }
  res.status(400).json({ error: 'Tipo de pagamento inválido' });
});
app.get('/api/pix/:id', auth, verPix);
app.get('/api/pix', auth, (req, res) => { const t = tenantOf(req.user); const own = isOwner(req.user); res.json(pixPg.filter((p) => (own && req.query.todos ? true : p.tenant === t) && (!req.query.tipo || p.tipo === req.query.tipo)).slice(-200).reverse().map((p) => ({ id: p.id, tipo: p.tipo, status: p.status, valor: p.valor, itens: p.itens, cupom: p.cupom, desconto: p.desconto, plano: p.plano, email: p.email, criado: p.criado, entregue: !!p.entregue }))); });
app.post('/api/pix/:id/entregue', auth, managerOnly, (req, res) => { const p = pixPg.find((x) => x.id === req.params.id); if (!p || !isOwner(req.user)) return res.status(404).json({ error: 'Pedido não encontrado' }); p.entregue = Date.now(); writeJ('pix-pagamentos.json', pixPg); res.json({ ok: true }); });
// Vagas (compatível com ScreensVagas.jsx)
app.get('/api/vagas', auth, (req, res) => res.json({ vagas: vagasDb[tenantOf(req.user)] || 0, preco: VAGA_PRECO, pix: mpOn() }));
app.post('/api/vagas/pix', auth, express.json(), (req, res) => criarPix(req, res, { tipo: 'vaga', valor: VAGA_PRECO, descricao: 'MS7 · vaga de operador' }));
app.get('/api/vagas/pix/:id', auth, verPix);
// Assinatura
app.get('/api/assinatura', auth, (req, res) => res.json({ assinatura: assinDb[tenantOf(req.user)] || null, planos: PLANOS, pix: mpOn() }));
// Loja: catálogo e cupons (só o dono edita)
app.get('/api/loja', auth, (req, res) => res.json({ produtos: loja.produtos.filter((p) => isOwner(req.user) || p.ativo !== false), cupons: isOwner(req.user) ? loja.cupons : [], pix: mpOn() }));
app.put('/api/loja', auth, express.json(), (req, res) => { if (!isOwner(req.user)) return res.status(403).json({ error: 'Só o dono edita a loja' }); const b = req.body || {};
  if (Array.isArray(b.produtos)) loja.produtos = b.produtos.filter((p) => p && p.id && p.nome).map((p) => ({ id: String(p.id), nome: String(p.nome).slice(0, 80), desc: String(p.desc || '').slice(0, 120), preco: Math.max(0, +p.preco || 0), ativo: p.ativo !== false }));
  if (Array.isArray(b.cupons)) loja.cupons = b.cupons.filter((c) => c && c.codigo).map((c) => ({ codigo: String(c.codigo).trim().toUpperCase().slice(0, 30), pct: Math.max(0, Math.min(100, +c.pct || 0)), validade: c.validade || '', limite: Math.max(0, parseInt(c.limite, 10) || 0), usos: Math.max(0, parseInt(c.usos, 10) || 0), ativo: c.ativo !== false }));
  writeJ('loja.json', loja); res.json(loja); });
app.post('/api/loja/preco', auth, express.json(), (req, res) => res.json(precoLoja((req.body || {}).itens, (req.body || {}).cupom)));
app.get('/api/version', (_req, res) => { res.set('Cache-Control', 'no-store'); res.json({ v: codeVersion() }); });
app.use((req, res, next) => { if (/\.(jsx|js|html|css)$|\/$/.test(req.path)) res.set('Cache-Control', 'no-cache'); next(); });
// Arquivos de estilo do design system (cópia embutida em server/ds) — funciona mesmo baixando só a pasta operacoes
const DS_DIR = path.join(__dirname, 'ds');
app.use(express.static(DS_DIR, { dotfiles: 'deny' }));
if (!HAS_ROOT) app.use('/ui_kits/operacoes', express.static(path.join(__dirname, '..'), { index: 'index.html', dotfiles: 'deny' }));
app.use(express.static(PUBLIC, { index: 'index.html', dotfiles: 'deny' }));
app.use((err, req, res, next) => { console.error('[ms7] ERRO', req.method, req.path, err && err.stack || err); if (res.headersSent) return next(err); res.status(err.status || 500).json({ error: (err.type === 'entity.too.large' ? 'Dados grandes demais' : 'Erro no servidor: ' + (err.message || err)) }); });
app.listen(PORT, () => console.log('MS7 Operações rodando em http://localhost:' + PORT + '  (pasta: ' + PUBLIC + ')'));
