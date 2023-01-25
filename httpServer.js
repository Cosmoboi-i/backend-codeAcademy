const http = require('http');
const PORT = process.env.PORT || 8000;

// GET, POST, PUT whatever the request is, the response here will be "Yo"
// Whenever the server is hit with a request, the callback function is executed

// const server = http.createServer((req, res) => {
//     console.log(req);
//     res.writeHeader(200, { 'Content-Type': 'text/html' });
//     res.write('<h1>Yo</h1>');
//     res.end();
// });

const tasks = [];




const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;
    console.log(url);

    if (url === '/todos') {

        switch (method) {
            case 'GET': {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(tasks));
                res.end();
                break;
            }
            case 'POST': {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    let task = { 'task': JSON.stringify(body), 'isComplete': false };
                    tasks.push(task);

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify(task));
                    res.end();
                });
                break;
            }
            case 'DELETE': {
                tasks.filter((task) => task['isComplete'] === false);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(tasks));
                res.end();
                break;
            }

        }
    }
    else if (url.match(/todos\/([0-9]+)/)) {
        let id = Number(url.slice(7));
        console.log(id);
        if (id >= tasks.length - 1) {
            console.log(tasks.length);
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.write(`No task with id: ${id}`);
        }
        else {
            switch (method) {
                case 'GET': {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify(tasks[id]));
                    break;
                }
                case 'POST': {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    res.write('Post request not allowed on this route.');
                    break;
                }
                case 'PATCH': {
                    let body = '';
                    req.on('data', (chunk) => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        tasks[id]['task'] = JSON.stringify(body);

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.write(JSON.stringify(tasks[id]));
                        res.end();
                    });
                    break;
                }
            }

        }
        res.end();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('Page not found.');
        res.end();
    }

});

server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});




