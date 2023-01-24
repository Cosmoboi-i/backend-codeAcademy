const http = require('http');
const PORT = process.env.PORT || 8000;


const server = http.createServer((req, res) => {
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Yo</h1>');
    res.end();
});

server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});





