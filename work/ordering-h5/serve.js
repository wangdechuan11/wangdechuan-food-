/* 极简静态服务器（本地 / 手机同局域网预览）
 * 用法：node serve.js [端口]        默认 8123，监听 0.0.0.0
 *       node serve.js 8123 local    只监听 127.0.0.1
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = __dirname;
const PORT = Number(process.argv[2] || 8123);
const LOCAL_ONLY = process.argv[3] === 'local';
const HOST = LOCAL_ONLY ? '127.0.0.1' : '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(ROOT, urlPath);
  // 防目录穿越
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404 Not Found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    }).end(data);
  });
}).listen(PORT, HOST, () => {
  const lan = [];
  Object.values(os.networkInterfaces()).forEach(list =>
    (list || []).forEach(i => {
      if (i.family === 'IPv4' && !i.internal) lan.push(i.address);
    }));
  console.log('serving ' + ROOT);
  console.log('  本机   http://127.0.0.1:' + PORT);
  lan.forEach(ip => console.log('  手机   http://' + ip + ':' + PORT));
});
