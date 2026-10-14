// Generates FIG 0.1–0.3 as one isometric series: identical projection, scale, ground height, stroke.
// Solids are filled with the panel surface and drawn back-to-front, so nearer shapes hide farther lines.
// Brightness L1–L5 maps to tokens --fig-l1…--fig-l5 (tokens.css). L1 is used in exactly one role per panel.
const C30 = Math.cos(Math.PI / 6), S30 = 0.5;
const P = (x, y, z) => [(x - y) * C30, (x + y) * S30 - z];
const f = (n) => (Math.round(n * 10) / 10).toString();
const d = (pts, close = true) => 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L') + (close ? 'Z' : '');

function roundRect(cx, cy, w, h, r, n = 8) {
  const out = [], cs = [[cx + w / 2 - r, cy + h / 2 - r, 0], [cx - w / 2 + r, cy + h / 2 - r, 90], [cx - w / 2 + r, cy - h / 2 + r, 180], [cx + w / 2 - r, cy - h / 2 + r, 270]];
  for (const [x, y, a0] of cs) for (let i = 0; i <= n; i++) { const a = (a0 + (90 * i) / n) * Math.PI / 180; out.push([x + r * Math.cos(a), y + r * Math.sin(a)]); }
  return out;
}
const circle = (cx, cy, r, n = 40) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos((2 * Math.PI * i) / n), cy + r * Math.sin((2 * Math.PI * i) / n)]);
function hull(pts) {
  pts = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], up = [];
  for (const p of pts) { while (lo.length >= 2 && cr(lo.at(-2), lo.at(-1), p) <= 0) lo.pop(); lo.push(p); }
  for (const p of pts.reverse()) { while (up.length >= 2 && cr(up.at(-2), up.at(-1), p) <= 0) up.pop(); up.push(p); }
  return lo.slice(0, -1).concat(up.slice(0, -1));
}

const wrap = (s, cls) => (cls ? `<g class="${cls}">${s}</g>` : s);
class Scene {
  constructor() { this.items = []; }
  // Extruded convex footprint (slab, block, token, sheet). depth = sort key (larger = nearer).
  solid(foot, z0, h, lv, { dots, mirror, layer = 0, cls } = {}) {
    const zs = mirror ? [-z0, -z0 - h] : [z0, z0 + h];
    const bot = foot.map(([x, y]) => P(x, y, zs[0])), top = foot.map(([x, y]) => P(x, y, zs[1]));
    const depth = (mirror ? -2 : layer) * 1e4 + Math.max(...foot.map(([x, y]) => x + y));
    let s = `<path class="${lv}" d="${d(hull([...bot, ...top]))}"/><path class="${lv}" d="${d(mirror ? bot : top)}"/>`;
    if (dots) s += dots.map(([x, y]) => { const [px, py] = P(x, y, zs[1]); return `<circle class="dot ${lv}" cx="${f(px)}" cy="${f(py)}" r="0.9"/>`; }).join('');
    this.items.push({ depth, s: wrap(s, cls), pts: [...bot, ...top] });
  }
  shadow(foot, lv = 'l5', cls) { const pts = foot.map(([x, y]) => P(x, y, 0)); this.items.push({ depth: -1e4, s: wrap(`<path class="${lv} flat" d="${d(pts)}"/>`, cls), pts }); }
  trace(pts3, lv, cls, depth = 9e4) { const pts = pts3.map((p) => P(...p)); this.items.push({ depth, s: wrap(`<path class="${lv} dash" d="${d(pts, false)}"/>`, cls), pts }); }
  raw(s, pts, depth) { this.items.push({ depth, s, pts }); }
  bounds() { const all = this.items.flatMap((i) => i.pts); return { x0: Math.min(...all.map((p) => p[0])), x1: Math.max(...all.map((p) => p[0])), y0: Math.min(...all.map((p) => p[1])), y1: Math.max(...all.map((p) => p[1])) }; }
  render() { return [...this.items].sort((a, b) => a.depth - b.depth).map((i) => i.s).join('\n'); }
}
const dotGrid = (cx, cy, half, n = 3) => { const o = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) o.push([cx - half + (2 * half * i) / (n - 1), cy - half + (2 * half * j) / (n - 1)]); return o; };

// FIG 0.1 — Scope is the source of truth
const a = new Scene();
a.solid(roundRect(-8, 0, 46, 40, 6), 0, 12, 'l1');            // scope slab: L1
a.solid(roundRect(21, 0, 12, 30, 3), 0, 12, 'l2', { cls: 'f1-inc a1' });            // increment 1
a.solid(roundRect(33, 0, 12, 20, 3), 0, 12, 'l2', { cls: 'f1-inc a2' });            // increment 2
a.solid(circle(24, 36, 3.2, 24), 0, 16, 'l2', { cls: 'f1-pin a1' });                // decision pins
a.solid(circle(38, 28, 3.2, 24), 0, 16, 'l2', { cls: 'f1-pin a2' });
a.trace([[24, 36, 16], [24, 22, 12], [21, 10, 12]], 'l3', 'f1-trace a1');      // pin → increment
a.trace([[38, 28, 16], [38, 16, 12], [33, 6, 12]], 'l3', 'f1-trace a2');
for (const [i, [x, y, z, w, h, t]] of [[-36, -34, 24, 16, 22, 1.5], [-46, 6, 30, 14, 18, 1.5], [6, -40, 30, 11, 11, 4], [-30, 34, 22, 11, 11, 4]].entries()) {
  const foot = roundRect(x, y, w, h, t > 2 ? 3 : 1.5);
  a.shadow(foot, 'l5', `f1-shadow b${i + 1}`);                // ground footprint shows it floats
  a.solid(foot, z, t, 'l4', { layer: 2, cls: `f1-float b${i + 1}` });                                  // floating docs and message tiles: L4
}

// FIG 0.2 — Every step has an owner
const b = new Scene();
const steps = [[26, 10, 'l2'], [0, 20, 'l23'], [-26, 30, 'l3']]; // front → back: decide, run, approve
for (const [i, [y, h, lv]] of steps.entries()) { b.solid(roundRect(0, y, 36, 24, 4), 0, h, 'l5', { mirror: true, cls: `f2-refl a${i + 1}` }); b.solid(roundRect(0, y, 36, 24, 4), 0, h, lv, { cls: `f2-step a${i + 1}` }); }
for (const [i, [y, h]] of steps.entries()) b.solid(circle(0, y, 6.5), h, 5, 'l1', { dots: dotGrid(0, y, 2.6), layer: 1, cls: `f2-token a${i + 1}` }); // owner tokens: L1
b.trace([[0, 56, 0], [0, 40, 0], ...steps.map(([y, h]) => [0, y, h + 5]), [0, -42, 30], [0, -52, 0], [0, -60, 0]], 'l3', 'f2-thread');

// FIG 0.3 — People and agents, same frame
const c = new Scene();
c.solid(roundRect(0, 2, 70, 76, 8), 0, 5, 'l4');                                  // tray: L4
c.raw('', [], 0);
const lane = (x) => {
  c.solid(roundRect(x, -20, 14, 10, 1.5), 5, 1, 'l3', { layer: 1, cls: 'f3-task' });                            // task sheet enters behind
  c.solid(roundRect(x, 18, 14, 10, 1.5), 5, 1, 'l3', { layer: 1, cls: 'f3-result' });                             // result sheet exits in front
};
lane(-16); lane(16);
{ const [p, q] = [P(0, -32, 5), P(0, 28, 5)]; c.raw(`<path class="l4" d="${d([p, q], false)}"/>`, [p, q], 1e4 - 100); } // lane divider
c.solid(circle(-16, 0, 8), 5, 14, 'l2', { layer: 1 });                                          // person: L2
c.solid(roundRect(16, 0, 16, 16, 3), 5, 14, 'l2', { dots: dotGrid(16, 0, 4.5), layer: 1 }); // agent: L2, same footprint/height
// Shared review gate at the front: L1. Arch in the x–z plane, front and back faces.
const arch = (y) => {
  const o = [], R = 32, r = 27, zb = 5, zs = 22;
  o.push([-R, y, zb]); for (let i = 0; i <= 24; i++) { const t = Math.PI - (Math.PI * i) / 24; o.push([R * Math.cos(t), y, zs + R * Math.sin(t)]); } o.push([R, y, zb], [r, y, zb]);
  for (let i = 0; i <= 24; i++) { const t = (Math.PI * i) / 24; o.push([r * Math.cos(t), y, zs + r * Math.sin(t)]); } o.push([-r, y, zb]);
  return o.map((p) => P(...p));
};
for (const [y, dep] of [[32, 3e4], [36, 3e4 + 1]]) { const pts = arch(y); c.raw(`<path class="l1" fill-rule="evenodd" d="${d(pts)}"/>`, pts, dep); }

// One camera for all panels: same scale, same ground height (origin y); each centered horizontally.
const scenes = [a, b, c], BOX = 240, TARGET = 0.5 * BOX;
const bs = scenes.map((s) => s.bounds());
const k = TARGET / Math.max(...bs.map((q) => Math.max(q.x1 - q.x0, q.y1 - q.y0)));
const y0 = Math.min(...bs.map((q) => q.y0)), y1 = Math.max(...bs.map((q) => q.y1));
const oy = BOX / 2 - ((y0 + y1) / 2) * k;
const out = scenes.map((s, i) => {
  const ox = BOX / 2 - ((bs[i].x0 + bs[i].x1) / 2) * k;
  return `<g transform="translate(${f(ox)} ${f(oy)}) scale(${k.toFixed(4)})">\n${s.render()}\n</g>`;
});
console.log(JSON.stringify({ k, panels: bs.map((q) => [f((q.x1 - q.x0) * k), f((q.y1 - q.y0) * k)]), groundY: f(oy) }));
import { writeFileSync } from 'node:fs';
writeFileSync('components/figures.generated.ts', `// Generated by scripts/figs.mjs. Do not edit by hand.\nexport const FIGURES: string[] = ${JSON.stringify(out, null, 2)};\n`);
