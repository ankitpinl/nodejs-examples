const http = require('http');
const server = http.createServer((req, res) => {
    console.log('request starting...');

    // respond
    response.write('hello client!');
    response.end();
});

server.listen(3000);