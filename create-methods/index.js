const http = require('http');
const fs = require('fs');

// functions
const send404 = (response) => {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: Resource not found.');
    response.end();
}

const server = http.createServer((req, res) => {
    if (req.method == 'GET' && req.url == '/') {
        res.writeHead(200, { 'content-type': 'text/html' });
        fs.createReadStream('./public/index.html').pipe(res);
    } else {
        send404(res);
    }
});

server.listen(3000);