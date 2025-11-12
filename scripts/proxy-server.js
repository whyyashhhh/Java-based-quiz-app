const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const BUILD_DIR = path.join(__dirname, '..', 'frontend', 'build');
const PORT = process.env.PORT || 3000;
const API_HOST = process.env.API_HOST || 'localhost';
const API_PORT = process.env.API_PORT || 8080;

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
  '.map': 'application/json'
};

function proxyRequest(req, res) {
  const options = {
    hostname: API_HOST,
    port: API_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxy = http.request(options, (pres) => {
    res.writeHead(pres.statusCode, pres.headers);
    pres.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad Gateway: ' + err.message);
  });

  req.pipe(proxy, { end: true });
}

function serveStatic(req, res) {
  let parsed = url.parse(req.url || '/');
  let safePath = decodeURIComponent(parsed.pathname || '/');

  // If root or no extension, serve index.html (SPA)
  let filePath = path.join(BUILD_DIR, safePath);

  if (safePath === '/' || !path.extname(filePath)) {
    filePath = path.join(BUILD_DIR, 'index.html');
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      // fallback to index.html for SPA
      const index = path.join(BUILD_DIR, 'index.html');
      fs.createReadStream(index).pipe(res);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = mime[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  try {
    const pathname = url.parse(req.url).pathname || '/';
    if (pathname.startsWith('/api') || pathname.startsWith('/actuator')) {
      proxyRequest(req, res);
      return;
    }

    serveStatic(req, res);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Proxy/static server listening on http://localhost:${PORT}`);
  console.log(`Proxying /api and /actuator to http://${API_HOST}:${API_PORT}`);
});
