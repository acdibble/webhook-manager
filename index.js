const http = require('http');

const PORT = process.env.WEBHOOK_PORT;

const server = http.createServer((req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk.toString('utf8');
  });

  req.on('end', () => {
    console.log(data);

    res.writeHead(204);
    res.end();
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
