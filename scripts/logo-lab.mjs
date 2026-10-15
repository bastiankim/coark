// Logo angle lab: `npm run logo-lab`, then open http://127.0.0.1:4401/.
// "Apply to site" writes public/logo.svg, which the nav, footer, and favicon all read.
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const PORT = 4401;
const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const send = (res, code, type, body) => { res.writeHead(code, { 'content-type': type, 'cache-control': 'no-store' }); res.end(body); };

createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/') return send(res, 200, 'text/html; charset=utf-8', await readFile(here('./logo-lab.html')));
    if (req.method === 'GET' && req.url === '/original.svg') return send(res, 200, 'image/svg+xml', await readFile(here('./logo-original.svg')));
    if (req.method === 'POST' && req.url === '/apply') {
      let body = '';
      for await (const chunk of req) {
        body += chunk;
        if (body.length > 200_000) return send(res, 413, 'text/plain', 'SVG is larger than 200 KB.');
      }
      body = body.trim();
      if (!/^<svg[\s>]/.test(body) || !body.endsWith('</svg>')) return send(res, 400, 'text/plain', 'Expected a single <svg> document.');
      await writeFile(here('../public/logo.svg'), body + '\n');
      return send(res, 200, 'text/plain', 'ok');
    }
    send(res, 404, 'text/plain', 'Not found');
  } catch (err) {
    send(res, 500, 'text/plain', String(err));
  }
}).listen(PORT, '127.0.0.1', () => console.log(`logo lab → http://127.0.0.1:${PORT}/`));
