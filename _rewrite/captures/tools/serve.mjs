#!/usr/bin/env node
// Static server for the Nowa web build (build/web) with SPA fallback.
//
//   node serve.mjs [--root /home/user/nowa-build/build/web] [--port 8080] [--cdn-canvaskit] [--log]
//
// - Any path that is not a file (for example /playground) returns index.html,
//   like Firebase Hosting's "**" -> /index.html rewrite in firebase.json.
// - .wasm is served as application/wasm (CanvasKit needs it for streaming compile).
// - By default flutter_bootstrap.js is patched on the fly with
//   "useLocalCanvasKit":true, so the engine loads CanvasKit from the build's own
//   canvaskit/ folder (same engine revision) instead of www.gstatic.com, which
//   this sandbox's egress policy blocks. The files on disk are not changed.
//   Pass --cdn-canvaskit to serve the bootstrap byte-for-byte as built.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const flag = (name) => args.includes(`--${name}`);

const root = path.resolve(opt('root', '/home/user/nowa-build/build/web'));
const port = Number(opt('port', process.env.PORT || 8080));
const host = opt('host', '127.0.0.1');
const localCanvasKit = !flag('cdn-canvaskit');
const log = flag('log');

if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error(`No index.html in ${root}. Build first (see captures/README.md).`);
  process.exit(1);
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8',
  '.symbols': 'text/plain; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
};

function patchBootstrap(source) {
  if (!localCanvasKit || source.includes('"useLocalCanvasKit":true')) return source;
  return source.replace('_flutter.buildConfig = {', '_flutter.buildConfig = {"useLocalCanvasKit":true,');
}

function resolveFile(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null;
  }
  const file = path.normalize(path.join(root, decoded));
  if (!file.startsWith(root)) return null; // no path traversal
  try {
    const stat = fs.statSync(file);
    if (stat.isFile()) return file;
    if (stat.isDirectory() && fs.existsSync(path.join(file, 'index.html'))) return path.join(file, 'index.html');
  } catch {
    // not found
  }
  return null;
}

const server = http.createServer((req, res) => {
  const urlPath = (req.url || '/').split('?')[0].split('#')[0];
  let file = resolveFile(urlPath);
  let status = 200;
  if (!file) file = path.join(root, 'index.html'); // SPA fallback

  const ext = path.extname(file).toLowerCase();
  const headers = {
    'Content-Type': types[ext] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
  };

  try {
    let body = fs.readFileSync(file);
    if (path.basename(file) === 'flutter_bootstrap.js') body = Buffer.from(patchBootstrap(body.toString('utf8')));
    headers['Content-Length'] = body.length;
    res.writeHead(status, headers);
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (e) {
    status = 500;
    res.writeHead(status, { 'Content-Type': 'text/plain' });
    res.end(String(e));
  }
  if (log) console.log(`${status} ${req.method} ${req.url} -> ${path.relative(root, file)}`);
});

server.listen(port, host, () => {
  console.log(`Serving ${root} at http://localhost:${port} (SPA fallback on; CanvasKit: ${localCanvasKit ? 'local canvaskit/' : 'CDN as built'})`);
});
