/* Mapa Mega Moda — núcleo compartilhado entre o app (index.html) e o painel (admin.html).
   Dados, planta (esquemática ou desenhada no painel), rotas em grafo, QR Codes e desenho SVG. */
(function (W) {
"use strict";
const MM = W.MM = {};
const CFG = MM.cfg = Object.assign({ url: "", key: "" }, W.MM_CONFIG || {});
const HTTP = /^https?:/.test(location.protocol);
MM.online = () => !!(CFG.url && CFG.key) && HTTP;

/* ---------- constantes ---------- */
MM.BUILD = {
  shopping: { name: "Mega Moda Shopping", short: "Shopping", addr: "Av. Contorno, 165 – Setor Norte Ferroviário, Goiânia – GO", lat: -16.6612, lng: -49.2578 },
  park: { name: "Mega Moda Park", short: "Park", addr: "Av. Independência, 3302 – Setor Central, Goiânia – GO", lat: -16.6628, lng: -49.2560 },
  mini: { name: "Mini Moda", short: "Mini Moda", addr: "Rua 67-B, 141b – Setor Norte Ferroviário, Goiânia – GO", lat: -16.6602, lng: -49.2569 }
};
MM.BORDER = ["shopping", "park", "mini"];
MM.FLOORS = { SS: "Subsolo", T: "Térreo", P1: "Piso 1", G3: "G3 · Serviços e cargas" };
MM.FLEVEL = { SS: -1, T: 0, P1: 1, G3: 0 };
MM.SEGS = [
  ["Feminino", "#e0618e"], ["Masculino", "#3b6fd1"], ["Jeans", "#2f3d8f"], ["Infantil", "#f2b632"],
  ["Moda Praia", "#19a7b8"], ["Moda Fitness", "#3aa660"], ["Moda Íntima", "#c2456b"], ["Plus Size", "#9c5ad1"],
  ["Moda Cristã", "#8a6d3b"], ["Social", "#455a64"], ["Modinha", "#ef7d4c"], ["Moda Balada", "#b4237e"],
  ["Acessórios", "#d39a1c"], ["Calçados", "#8d5a3b"], ["Cosméticos", "#a855c7"], ["Alimentação", "#ea6a1f"],
  ["Serviços", "#7d8790"], ["Outlets", "#555555"]
];
MM.SEGCOLOR = Object.fromEntries(MM.SEGS);
const SHOP_T_ORDER = ["Via Mega", "Via Central", "Via Fashion", "Via da Moda", "Via Tendência", "Via Look", "Via Paetê", "Via Tulipa", "Via Acácia", "Via Gérbera", "Alameda dos Eventos", "Alameda Elegante", "Alameda do Sabor", "Alameda Lírio", "Externa 69", "Externa Contorno", "Outros"];
MM.SYN = [
  [/biquin|maio|saida de praia|praia|sunga|beach/, "Moda Praia"],
  [/legging|fitness|academia|esport|activewear|treino/, "Moda Fitness"],
  [/lingerie|calcinha|sutia|pijama|intima|cueca|modelador|cinta/, "Moda Íntima"],
  [/crianc|kids|infantil|bebe|baby|menin/, "Infantil"],
  [/jeans|denim|calca/, "Jeans"],
  [/tenis|sapato|sandalia|chinelo|sapatilha|bota|calcad/, "Calçados"],
  [/joia|semijoia|folhead|bijou|bolsa|oculos|cinto|acessori/, "Acessórios"],
  [/perfum|maquiag|make|cosmet/, "Cosméticos"],
  [/camisa social|terno|social|blazer/, "Social"],
  [/evangel|crista/, "Moda Cristã"],
  [/plus/, "Plus Size"],
  [/comida|lanche|cafe|restaurante|almoco|comer|empada|burguer|burger/, "Alimentação"],
  [/correio|frete|transportad|envio|carga|clinica|estetica|otica/, "Serviços"],
  [/masculin|homem|bermuda/, "Masculino"],
  [/vestido|blusa|feminin|mulher|cropped|body/, "Feminino"]
];

const norm = MM.norm = s => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const esc = MM.esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const slugify = MM.slugify = s => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const r1 = n => Math.round(n * 10) / 10;

/* ---------- acesso ao Supabase (REST puro, sem biblioteca) ---------- */
MM.headers = function (token) {
  const h = { apikey: CFG.key, "Content-Type": "application/json" };
  const t = token || (CFG.key.startsWith("eyJ") ? CFG.key : null);
  if (t) h.Authorization = "Bearer " + t;
  return h;
};
MM.rest = async function (path, opt) {
  const r = await fetch(CFG.url.replace(/\/$/, "") + "/rest/v1/" + path, Object.assign({ headers: MM.headers() }, opt || {}));
  if (!r.ok) throw new Error("HTTP " + r.status);
  return r.json().catch(() => null);
};
let SID = "";
try { SID = localStorage.getItem("mm_sid") || ""; if (!SID) { SID = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem("mm_sid", SID); } } catch (e) { SID = "anon"; }
MM.track = function (tipo, d) {
  if (!MM.online()) return;
  d = d || {};
  const body = { tipo, sessao: SID, loja: d.loja || null, termo: d.termo ? String(d.termo).slice(0, 80) : null, n: d.n == null ? null : d.n, ponto: d.ponto || null };
  try {
    fetch(CFG.url.replace(/\/$/, "") + "/rest/v1/eventos", { method: "POST", keepalive: true, headers: Object.assign(MM.headers(), { Prefer: "return=minimal" }), body: JSON.stringify(body) }).catch(() => {});
  } catch (e) {}
};

/* ---------- carga de dados ---------- */
MM.rowToStore = r => ({ n: r.nome, s: r.slug, c: r.categorias || [], l: r.localizacao || "", desc: r.descricao || "", prod: r.produtos || "", whats: r.whatsapp || "", insta: r.instagram || "", promo: r.promo || "", dest: !!r.destaque });
MM.embedded = () => (W.MM_RAW || []).map(l => { const p = l.split("|"); return { n: p[0], s: p[1], c: p[2] ? p[2].split(",") : [], l: p[3] || "" }; });
MM.load = async function () {
  let stores = MM.embedded(), layouts = {}, src = "embutido", date = W.MM_DATE || "";
  try { const l = JSON.parse(localStorage.getItem("mm_layouts") || "null"); if (l) layouts = l; } catch (e) {}
  if (HTTP) {
    if (MM.online()) {
      try {
        const [a, b] = await Promise.all([
          MM.rest("lojas?select=slug,nome,categorias,localizacao,descricao,produtos,whatsapp,instagram,promo,destaque"),
          MM.rest("layout?select=chave,dados")
        ]);
        if (a && a.length) { stores = a.map(MM.rowToStore); src = "online"; }
        if (b) { layouts = {}; b.forEach(r => layouts[r.chave] = r.dados); }
        try { localStorage.setItem("mm_cache", JSON.stringify({ stores, layouts })); }
        catch (e) { try { localStorage.setItem("mm_cache", JSON.stringify({ stores, layouts: {} })); } catch (e2) {} }
      } catch (e) {
        try { const c = JSON.parse(localStorage.getItem("mm_cache") || "null"); if (c && c.stores) { stores = c.stores; layouts = c.layouts || {}; src = "offline"; } } catch (e2) {}
      }
    } else {
      try { const r = await fetch("lojas.json", { cache: "no-store" }); if (r.ok) { const j = await r.json(); if (j.lojas && j.lojas.length) { stores = j.lojas.map(x => ({ n: x.n, s: x.s, c: x.c || [], l: x.l })); date = j.data || date; src = "lojas.json"; } } } catch (e) {}
      try { const r = await fetch("layout.json", { cache: "no-store" }); if (r.ok) { const j = await r.json(); if (j && typeof j === "object") layouts = j; } } catch (e) {}
    }
  }
  return { stores, layouts, src, date };
};

/* ---------- loja ---------- */
MM.mk = function (o, i) {
  const l = (o.l || "").trim();
  const cats = (o.c || []).map(x => x.trim()).filter(Boolean);
  let f = "T";
  if (/piso\s*1/i.test(l)) f = "P1"; else if (/^subsolo/i.test(l)) f = "SS"; else if (/^G3/.test(l)) f = "G3";
  let cor;
  const m = l.match(/^(.+?)\s*[–-]\s*(T[ée]rreo|Piso)/i);
  if (m) cor = m[1].trim(); else if (f === "SS") cor = "Subsolo"; else if (f === "G3") cor = "G3"; else cor = "Outros";
  cor = cor.replace(/\bcentral\b/, "Central").replace(/\blook\b/, "Look");
  const rm = cor.match(/^Rua\s*0?(\d+)/i); if (rm) cor = "Rua " + rm[1].padStart(2, "0");
  const pm = l.match(/\(([^)]*)\)/);
  let num = pm ? pm[1] : "";
  for (let k = 0; k < 2; k++) num = num.replace(/^(Loja|LJ|ML|G3)\s*/i, "").trim();
  const om = num.match(/\d+/); const ord = om ? +om[0] : 99999;
  const b = /^Rua /.test(cor) ? "park" : /Pirulito|Caramelo/.test(cor) ? "mini" : "shopping";
  const prim = cats.find(x => x !== "Feminino") || cats[0] || "Outlets";
  return { id: i, n: o.n, s: o.s, cats, loc: l, f, cor, num, ord, b, g: b + "|" + f, prim,
    desc: o.desc || "", prod: o.prod || "", whats: o.whats || "", insta: o.insta || "", promo: o.promo || "", dest: !!o.dest,
    key: norm([o.n, cats.join(" "), cor, num, o.prod, o.desc, o.promo].join(" ")) };
};
MM.matcher = function (stores, q, seg) {
  q = norm(q).trim().replace(/^(rua|r)\s*0?(\d+)$/, (m, a, n) => "rua " + n.padStart(2, "0"));
  const corMode = q && /^(rua|via|alameda|externa|passarela|subsolo|g3)\b/.test(q) && stores.some(x => norm(x.cor) === q);
  const toks = q ? q.split(/\s+/) : [];
  const syn = q ? MM.SYN.filter(([re]) => re.test(q)).map(x => x[1]) : [];
  return function (s) {
    if (seg && !s.cats.includes(seg)) return false;
    if (!q) return true;
    if (corMode) return norm(s.cor) === q;
    if (toks.every(t => s.key.includes(t))) return true;
    return syn.some(c => s.cats.includes(c));
  };
};

/* ---------- planta ---------- */
const CELL = 46, SH = 36, CW = 20, LANE = CW + 2 * SH + 18, U0 = 80, SP = 40;
function schematic(g) {
  const vert = g.b === "park";
  const P = (u, v) => vert ? { x: v, y: u } : { x: u, y: v };
  const cols = Math.max(3, ...g.lanes.map(L => Math.ceil(L.list.length / 2)));
  const sA = SP, sB = U0 + cols * CELL + SP, n = g.lanes.length;
  g.cw = CW; g.depth = SH; g.mpu = 0.09; g.bg = null; g.custom = false; g.segs = [];
  g.lanes.forEach((L, i) => {
    const v = 70 + i * LANE, a = P(sA, v), b = P(sB, v);
    L.seg = { id: "L:" + L.slug, name: L.name, kind: "lane", x1: a.x, y1: a.y, x2: b.x, y2: b.y };
    L.t0 = U0 - sA; L.cell = CELL; g.segs.push(L.seg);
  });
  const v0 = 70, vN = 70 + (n - 1) * LANE, e = P(sA, v0 - 46), a2 = P(sA, vN);
  g.entry = e;
  g.segs.push({ id: "K:a", name: "corredor principal", kind: "link", x1: e.x, y1: e.y, x2: a2.x, y2: a2.y });
  if (n > 1) { const b1 = P(sB, v0), b2 = P(sB, vN); g.segs.push({ id: "K:b", name: "corredor principal", kind: "link", x1: b1.x, y1: b1.y, x2: b2.x, y2: b2.y }); }
}
function custom(g, lay) {
  g.custom = true; g.cw = lay.cw || CW; g.depth = lay.depth || SH; g.mpu = lay.mpu || 0.09; g.bg = lay.bg || null; g.segs = [];
  let maxY = g.bg ? g.bg.h : 0;
  for (const k in lay.lanes) maxY = Math.max(maxY, lay.lanes[k].y1, lay.lanes[k].y2);
  (lay.links || []).forEach(k => { maxY = Math.max(maxY, k.y1, k.y2); });
  let j = 0;
  g.lanes.forEach(L => {
    const q = lay.lanes[L.slug];
    const s = q ? { x1: q.x1, y1: q.y1, x2: q.x2, y2: q.y2 }
      : { x1: 40, y1: maxY + 90 + j * LANE, x2: 40 + 80 + Math.max(3, Math.ceil(L.list.length / 2)) * CELL, y2: maxY + 90 + (j++) * LANE };
    L.seg = Object.assign({ id: "L:" + L.slug, name: L.name, kind: "lane", loose: !q }, s);
    L.t0 = null; g.segs.push(L.seg);
  });
  (lay.links || []).forEach(k => g.segs.push({ id: "K:" + k.id, name: k.name || "corredor principal", kind: "link", x1: k.x1, y1: k.y1, x2: k.x2, y2: k.y2 }));
  g.entry = lay.entry || { x: g.segs[0].x1, y: g.segs[0].y1 };
}
function place(g) {
  for (const L of g.lanes) {
    const s = L.seg, dx = s.x2 - s.x1, dy = s.y2 - s.y1, len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
    const cols = Math.max(1, Math.ceil(L.list.length / 2));
    let t0 = L.t0, cell = L.cell;
    if (t0 == null) { const m = Math.min(8, len * 0.04); t0 = m; cell = (len - 2 * m) / cols; }
    const ang = Math.atan2(dy, dx) * 180 / Math.PI;
    L.list.forEach((st, k) => {
      const col = Math.floor(k / 2), side = k % 2 ? 1 : -1, t = t0 + col * cell + cell / 2;
      st.door = { x: s.x1 + ux * t, y: s.y1 + uy * t };
      st.bw = Math.max(4, Math.min(cell - 6, 46)); st.bh = g.depth; st.ang = ang;
      const off = g.cw / 2 + 2 + g.depth / 2;
      st.cx = st.door.x + nx * side * off; st.cy = st.door.y + ny * side * off;
      st.lane = L;
    });
  }
}
MM.build = function (raw, layouts) {
  const stores = raw.map(MM.mk), G = {};
  for (const s of stores) (G[s.g] || (G[s.g] = { key: s.g, b: s.b, f: s.f, stores: [] })).stores.push(s);
  for (const g of Object.values(G)) {
    const by = {};
    for (const s of g.stores) (by[s.cor] || (by[s.cor] = [])).push(s);
    let names = Object.keys(by);
    if (g.key === "shopping|T") names.sort((a, b) => (SHOP_T_ORDER.indexOf(a) + 1 || 99) - (SHOP_T_ORDER.indexOf(b) + 1 || 99));
    else names.sort((a, b) => a.localeCompare(b, "pt", { numeric: true }));
    g.lanes = names.map(name => ({ name, slug: slugify(name), list: by[name].sort((a, b) => a.ord - b.ord || a.n.localeCompare(b.n)) }));
    const lay = layouts && layouts[g.key];
    if (lay && lay.lanes) custom(g, lay); else schematic(g);
    place(g);
  }
  return { stores, G };
};
MM.groupOrder = function (G) {
  const fo = ["T", "P1", "SS", "G3"];
  return Object.keys(G).sort((a, b) => { const [ba, fa] = a.split("|"), [bb, fb] = b.split("|"); return MM.BORDER.indexOf(ba) - MM.BORDER.indexOf(bb) || fo.indexOf(fa) - fo.indexOf(fb); });
};
MM.layoutOf = function (g) {
  const lay = { v: 1, cw: g.cw, depth: g.depth, mpu: g.mpu, bg: g.bg || null, lanes: {}, links: [], entry: { x: r1(g.entry.x), y: r1(g.entry.y) } };
  for (const s of g.segs) {
    const q = { x1: r1(s.x1), y1: r1(s.y1), x2: r1(s.x2), y2: r1(s.y2) };
    if (s.kind === "lane") lay.lanes[s.id.slice(2)] = q; else lay.links.push(Object.assign({ id: s.id.slice(2), name: s.name }, q));
  }
  return lay;
};
MM.bounds = function (g) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const add = (x, y, p) => { x0 = Math.min(x0, x - p); y0 = Math.min(y0, y - p); x1 = Math.max(x1, x + p); y1 = Math.max(y1, y + p); };
  const pad = g.cw / 2 + g.depth + 14;
  for (const s of g.segs) { add(s.x1, s.y1, pad); add(s.x2, s.y2, pad); }
  add(g.entry.x, g.entry.y, 44);
  if (g.bg) { add(0, 0, 0); add(g.bg.w, g.bg.h, 0); }
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
};

/* ---------- geometria e rotas ---------- */
function proj(p, s) {
  const dx = s.x2 - s.x1, dy = s.y2 - s.y1, L2 = dx * dx + dy * dy || 1;
  let t = ((p.x - s.x1) * dx + (p.y - s.y1) * dy) / L2; t = Math.max(0, Math.min(1, t));
  const x = s.x1 + t * dx, y = s.y1 + t * dy;
  return { x, y, t, d: Math.hypot(p.x - x, p.y - y) };
}
function inter(a, b) {
  const d = (a.x2 - a.x1) * (b.y2 - b.y1) - (a.y2 - a.y1) * (b.x2 - b.x1);
  if (Math.abs(d) < 1e-9) return null;
  const t = ((b.x1 - a.x1) * (b.y2 - b.y1) - (b.y1 - a.y1) * (b.x2 - b.x1)) / d;
  const u = ((b.x1 - a.x1) * (a.y2 - a.y1) - (b.y1 - a.y1) * (a.x2 - a.x1)) / d;
  const e = 1e-6;
  if (t < -e || t > 1 + e || u < -e || u > 1 + e) return null;
  return { x: a.x1 + t * (a.x2 - a.x1), y: a.y1 + t * (a.y2 - a.y1) };
}
MM.nearest = function (g, p, exceptId) {
  let best = null;
  g.segs.forEach((s, i) => { if (s.id === exceptId) return; const q = proj(p, s); if (!best || q.d < best.d) best = Object.assign(q, { i, seg: s }); });
  return best;
};
MM.route = function (g, from, to) {
  const segs = g.segs, TOL = 14, nodes = [], idx = new Map(), adj = [], brk = segs.map(() => []);
  const node = (x, y) => { const k = Math.round(x * 2) + "," + Math.round(y * 2); let id = idx.get(k); if (id == null) { id = nodes.length; idx.set(k, id); nodes.push({ x, y }); adj.push([]); } return id; };
  const edge = (a, b, w, si) => { if (a === b) return; adj[a].push({ to: b, w, si }); adj[b].push({ to: a, w, si }); };
  const add = (i, p) => { const q = proj(p, segs[i]); const id = node(q.x, q.y); brk[i].push({ t: q.t, id }); return id; };
  segs.forEach((s, i) => { add(i, { x: s.x1, y: s.y1 }); add(i, { x: s.x2, y: s.y2 }); });
  for (let i = 0; i < segs.length; i++) for (let j = i + 1; j < segs.length; j++) {
    const p = inter(segs[i], segs[j]);
    if (p) { add(i, p); add(j, p); }
    for (const [a, b] of [[i, j], [j, i]]) for (const e of [{ x: segs[b].x1, y: segs[b].y1 }, { x: segs[b].x2, y: segs[b].y2 }]) {
      const q = proj(e, segs[a]);
      if (q.d < TOL && q.d > 0.01) edge(add(a, q), node(e.x, e.y), q.d, b);
    }
  }
  const nf = MM.nearest(g, from), nt = MM.nearest(g, to);
  if (!nf || !nt) return null;
  const S = add(nf.i, nf), D = add(nt.i, nt);
  segs.forEach((s, i) => { const L = Math.hypot(s.x2 - s.x1, s.y2 - s.y1); brk[i].sort((a, b) => a.t - b.t); for (let k = 1; k < brk[i].length; k++) edge(brk[i][k - 1].id, brk[i][k].id, (brk[i][k].t - brk[i][k - 1].t) * L, i); });
  const dist = nodes.map(() => Infinity), prev = nodes.map(() => null), done = nodes.map(() => false);
  dist[S] = 0;
  for (;;) {
    let u = -1; for (let i = 0; i < nodes.length; i++) if (!done[i] && (u < 0 || dist[i] < dist[u])) u = i;
    if (u < 0 || dist[u] === Infinity) break; done[u] = true; if (u === D) break;
    for (const e of adj[u]) if (dist[u] + e.w < dist[e.to]) { dist[e.to] = dist[u] + e.w; prev[e.to] = { u, si: e.si }; }
  }
  if (dist[D] === Infinity) return null;
  const pts = [], es = [];
  for (let v = D; v != null; v = prev[v] ? prev[v].u : null) { pts.unshift(nodes[v]); if (prev[v]) es.unshift({ si: prev[v].si, len: Math.hypot(nodes[v].x - nodes[prev[v].u].x, nodes[v].y - nodes[prev[v].u].y) }); }
  const legs = [];
  for (const e of es) { const l = legs[legs.length - 1]; if (l && l.seg === segs[e.si]) l.len += e.len; else legs.push({ seg: segs[e.si], len: e.len }); }
  return { pts, legs, len: dist[D] };
};
MM.meters = (u, g) => Math.max(5, Math.round(u * g.mpu / 5) * 5);
/* passo a passo dentro de um piso: de `from` até a porta da loja `s` */
MM.walk = function (g, from, s, label) {
  const r = MM.route(g, from, s.door), steps = [];
  const arrive = side => `Chegou: <b>${esc(s.n)}</b>${s.num ? ` — loja <b>${esc(s.num)}</b>` : ""}${side ? ", " + side : ""}.`;
  if (!r) { steps.push(`${label} vá até a <b>${esc(s.lane.name)}</b>.`); steps.push(arrive("")); return { pts: [from, s.door], steps }; }
  const legs = r.legs.filter(l => l.len * g.mpu >= 1.5);
  const via = l => l.seg.kind === "lane" ? `pela <b>${esc(l.seg.name)}</b>` : (/^corredor|^passarela|^escada|^hall/i.test(l.seg.name) ? "pelo" : "por") + ` <b>${esc(l.seg.name)}</b>`;
  legs.forEach((l, i) => {
    const m = MM.meters(l.len, g);
    if (i === 0) steps.push(`${label} siga ${via(l)} por ~${m} m.`);
    else if (l.seg.kind === "lane") steps.push(`Entre na <b>${esc(l.seg.name)}</b> e ande ~${m} m.`);
    else steps.push(`Continue ${via(l)} por ~${m} m.`);
  });
  if (!legs.length) steps.push(`${label} a loja está a poucos passos, na <b>${esc(s.lane.name)}</b>.`);
  let side = "";
  const n = r.pts.length;
  if (n >= 2) {
    const a = r.pts[n - 2], b = r.pts[n - 1], dx = b.x - a.x, dy = b.y - a.y;
    if (Math.hypot(dx, dy) > 2) side = (dx * (s.cy - s.door.y) - dy * (s.cx - s.door.x)) > 0 ? "à sua direita" : "à sua esquerda";
  }
  steps.push(arrive(side));
  return { pts: [from].concat(r.pts), steps };
};

/* ---------- QR Codes de posição ---------- */
MM.qrPoints = function (g) {
  const base = "qr-" + g.b + "-" + g.f.toLowerCase() + "-", out = [{ code: base + "entrada", label: "Entrada", x: g.entry.x, y: g.entry.y }];
  for (const L of g.lanes) [[0.03, "início"], [0.5, "meio"], [0.97, "fim"]].forEach(([t, nm], k) => {
    const s = L.seg; out.push({ code: base + L.slug + "-" + (k + 1), label: L.name + " · " + nm, x: s.x1 + (s.x2 - s.x1) * t, y: s.y1 + (s.y2 - s.y1) * t });
  });
  return out;
};
MM.resolveQR = function (hash, G) {
  const m = /^qr-(shopping|park|mini)-(t|p1|ss|g3)-(.+)$/.exec(hash || "");
  if (!m) return null;
  const g = G[m[1] + "|" + m[2].toUpperCase()]; if (!g) return null;
  const p = MM.qrPoints(g).find(q => q.code === hash);
  return p ? { g: g.key, x: p.x, y: p.y, label: p.label } : null;
};

/* ---------- desenho ---------- */
function lines(name) {
  const out = [""];
  for (const w of name.split(/\s+/)) {
    const cur = out[out.length - 1];
    if ((cur + " " + w).trim().length <= 10) out[out.length - 1] = (cur + " " + w).trim();
    else if (out.length < 2) out.push(w.slice(0, 10));
    else { out[1] = out[1].slice(0, 9) + "…"; break; }
  }
  return out;
}
MM.draw = function (g, o) {
  o = o || {}; let h = "";
  if (g.bg) h += `<image href="${g.bg.src}" x="0" y="0" width="${g.bg.w}" height="${g.bg.h}" opacity="${o.edit ? 0.75 : 0.45}" preserveAspectRatio="none"/>`;
  for (const s of g.segs) {
    const col = o.selSeg === s.id ? "#f0b65c" : s.loose ? "#f3c1b8" : s.kind === "link" && o.edit ? "#d9cdbd" : "var(--corr)";
    h += `<line ${o.edit ? `data-h="${s.id}|m"` : ""} x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="${col}" stroke-width="${g.cw}" stroke-linecap="round" ${g.bg ? 'opacity=".85"' : ""}/>`;
  }
  { const e = g.entry; h += `<g ${o.edit ? 'data-h="entry" style="cursor:move"' : ""}><rect x="${e.x - 34}" y="${e.y - 11}" width="68" height="22" rx="6" fill="var(--acc2)"/><text x="${e.x}" y="${e.y + 3.5}" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">Entrada/Escadas</text></g>`; }
  for (const s of g.stores) {
    const on = !o.filter || o.filter(s), sel = o.sel === s.id, col = MM.SEGCOLOR[s.prim] || "#999";
    const k = Math.min(1, s.bw / 40, s.bh / 30), ls = lines(s.n);
    h += `<g data-id="${s.id}" opacity="${on ? 1 : 0.2}" style="cursor:pointer" transform="translate(${r1(s.cx)} ${r1(s.cy)}) rotate(${r1(s.ang)})">` +
      `<rect x="${-s.bw / 2}" y="${-s.bh / 2}" width="${s.bw}" height="${s.bh}" rx="4" fill="${sel ? "#fff4d6" : s.dest ? "#fffaf0" : "var(--store)"}" stroke="${sel ? "var(--acc)" : s.dest ? "#e2a400" : col}" stroke-width="${sel ? 2.4 : s.dest ? 1.8 : 1}"/>` +
      `<rect x="${-s.bw / 2}" y="${-s.bh / 2}" width="${s.bw}" height="4" rx="2" fill="${col}"/>`;
    if (k > 0.45) {
      h += `<g transform="rotate(${r1(-s.ang)})"><text y="${ls.length > 1 ? -4 * k : -1}" font-size="${r1(6.4 * k)}" font-weight="700" text-anchor="middle" fill="#2a2420">${ls.map((t, i) => `<tspan x="0" dy="${i ? r1(7.2 * k) : 0}">${esc(t)}</tspan>`).join("")}</text>` +
        `<text y="${r1(14 * k)}" font-size="${r1(5.6 * k)}" text-anchor="middle" fill="#8a7d72">${s.dest ? "★ " : ""}${esc(s.num.slice(0, 12))}</text></g>`;
    }
    h += `</g>`;
  }
  for (const L of g.lanes) {
    const s = L.seg, len = Math.hypot(s.x2 - s.x1, s.y2 - s.y1) || 1, ux = (s.x2 - s.x1) / len, uy = (s.y2 - s.y1) / len;
    let a = Math.atan2(uy, ux) * 180 / Math.PI; const flip = a > 90.01 || a < -90.01; if (flip) a += 180;
    const lab = (t, anchor) => { const x = r1(s.x1 + ux * t), y = r1(s.y1 + uy * t); return `<text x="${x}" y="${y}" dy="3" font-size="8.5" font-weight="800" fill="var(--acc2)" text-anchor="${anchor}" transform="rotate(${r1(a)} ${x} ${y})" pointer-events="none">${esc(L.name)}</text>`; };
    h += lab(6, flip ? "end" : "start");
    if (len > 260) h += lab(len - 6, flip ? "start" : "end");
  }
  if (o.path && o.path.length > 1) {
    const pts = o.path.map(p => r1(p.x) + "," + r1(p.y)).join(" "), e = o.path[o.path.length - 1];
    h += `<polyline points="${pts}" fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>` +
      `<polyline class="route" points="${pts}" fill="none" stroke="var(--me)" stroke-width="4" stroke-dasharray="8 4" stroke-linejoin="round" stroke-linecap="round"/>` +
      `<circle cx="${r1(e.x)}" cy="${r1(e.y)}" r="6" fill="var(--acc)" stroke="#fff" stroke-width="2"/>`;
  }
  if (o.me) h += `<circle class="pulse" cx="${o.me.x}" cy="${o.me.y}" r="8" fill="var(--me)"/><circle cx="${o.me.x}" cy="${o.me.y}" r="7" fill="var(--me)" stroke="#fff" stroke-width="2.5"/>`;
  if (o.qr) for (const p of o.qr) h += `<g pointer-events="none"><rect x="${p.x - 5}" y="${p.y - 5}" width="10" height="10" rx="2" fill="#111"/><rect x="${p.x - 2.5}" y="${p.y - 2.5}" width="5" height="5" fill="#fff"/></g>`;
  if (o.edit) for (const s of g.segs.filter(x => x.kind === "link").concat(g.segs.filter(x => x.kind === "lane"))) for (const k of [1, 2]) {
    h += `<circle data-h="${s.id}|${k}" cx="${s["x" + k]}" cy="${s["y" + k]}" r="8" fill="${s.kind === "lane" ? "var(--acc2)" : "var(--acc)"}" stroke="#fff" stroke-width="2.5" style="cursor:move"/>`;
  }
  return h;
};

/* ---------- arrastar / zoom ---------- */
MM.panZoom = function (svg, wrap, cb) {
  cb = cb || {}; let vb = { x: 0, y: 0, w: 400, h: 400 };
  const set = () => svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
  const world = (cx, cy) => { const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy; const m = svg.getScreenCTM(); return m ? pt.matrixTransform(m.inverse()) : { x: 0, y: 0 }; };
  const zoom = (k, px, py) => {
    const r = svg.getBoundingClientRect(), p = world(px == null ? r.left + r.width / 2 : px, py == null ? r.top + r.height / 2 : py);
    const nw = Math.min(8000, Math.max(70, vb.w / k)); k = vb.w / nw;
    vb.x = p.x - (p.x - vb.x) / k; vb.y = p.y - (p.y - vb.y) / k; vb.w /= k; vb.h /= k; set();
  };
  const ptrs = new Map(); let ge = null;
  svg.addEventListener("pointerdown", e => {
    try { svg.setPointerCapture(e.pointerId); } catch (x) {}
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 1) {
      const hd = cb.handle && e.target.closest("[data-h]");
      ge = { mode: hd ? "hold" : "tap", h: hd ? hd.getAttribute("data-h") : null, sx: e.clientX, sy: e.clientY, vb: Object.assign({}, vb), target: e.target };
      if (hd) cb.handle(ge.h, world(e.clientX, e.clientY), "start");
    } else if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()];
      ge = { mode: "pinch", d: Math.hypot(a.x - b.x, a.y - b.y), vb: Object.assign({}, vb), mid: world((a.x + b.x) / 2, (a.y + b.y) / 2) };
    }
  });
  svg.addEventListener("pointermove", e => {
    if (!ptrs.has(e.pointerId) || !ge) return;
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const r = svg.getBoundingClientRect(), sc = Math.max(ge.vb ? ge.vb.w / r.width : 1, ge.vb ? ge.vb.h / r.height : 1);
    if (ge.mode === "pinch" && ptrs.size === 2) {
      const [a, b] = [...ptrs.values()], k = Math.hypot(a.x - b.x, a.y - b.y) / ge.d;
      const nw = Math.min(8000, Math.max(70, ge.vb.w / k)), kk = ge.vb.w / nw;
      vb.w = ge.vb.w / kk; vb.h = ge.vb.h / kk; vb.x = ge.mid.x - (ge.mid.x - ge.vb.x) / kk; vb.y = ge.mid.y - (ge.mid.y - ge.vb.y) / kk; set();
    } else if (ptrs.size === 1) {
      const dx = e.clientX - ge.sx, dy = e.clientY - ge.sy, far = Math.hypot(dx, dy) > 6;
      if (ge.mode === "tap" && far) ge.mode = "pan";
      if (ge.mode === "hold" && far) ge.mode = "drag";
      if (ge.mode === "pan") { vb.x = ge.vb.x - dx * sc; vb.y = ge.vb.y - dy * sc; set(); }
      if (ge.mode === "drag") cb.handle(ge.h, world(e.clientX, e.clientY), "move");
    }
  });
  const end = e => {
    if (!ptrs.has(e.pointerId)) return; ptrs.delete(e.pointerId);
    if (ge && ptrs.size === 0) {
      if (ge.mode === "drag") cb.handle(ge.h, world(e.clientX, e.clientY), "end");
      else if ((ge.mode === "tap" || ge.mode === "hold") && cb.tap) cb.tap(ge.target, world(e.clientX, e.clientY), ge.h);
    }
    if (ptrs.size === 0) ge = null;
    else if (ptrs.size === 1) { const [a] = [...ptrs.values()]; ge = { mode: "pan", sx: a.x, sy: a.y, vb: Object.assign({}, vb) }; }
  };
  svg.addEventListener("pointerup", end); svg.addEventListener("pointercancel", end);
  svg.addEventListener("wheel", e => { e.preventDefault(); zoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY); }, { passive: false });
  return {
    zoom, world, vb: () => vb,
    fit(b, maxW) {
      maxW = maxW || 900; const ar = (wrap.clientWidth || 1) / (wrap.clientHeight || 1);
      let w = Math.min(b.w, maxW), h = w / ar;
      if (maxW === Infinity && h < b.h) { h = b.h; w = h * ar; }
      vb = { x: w >= b.w ? b.x + (b.w - w) / 2 : b.x, y: h >= b.h ? b.y + (b.h - h) / 2 : b.y, w, h }; set();
    },
    center(x, y, w) { const ar = (wrap.clientWidth || 1) / (wrap.clientHeight || 1); w = w || vb.w; vb = { w, h: w / ar, x: x - w / 2, y: y - w / ar / 2 }; set(); }
  };
};
MM.hav = function (a, b, c, d) { const R = 6371e3, r = x => x * Math.PI / 180, dl = r(c - a), dn = r(d - b), h = Math.sin(dl / 2) ** 2 + Math.cos(r(a)) * Math.cos(r(c)) * Math.sin(dn / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
})(window);
