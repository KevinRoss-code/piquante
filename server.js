const http = require('http');

const server = http.createServer((req, res) => {
    res.end('voila la response');
});

server.listen(process.env.PORT || 3000);