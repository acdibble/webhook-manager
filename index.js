const http = require('http');
const verifyPayload = require('./helpers/verifyPayload');
const deployPayload = require('./helpers/deployPayload');

const { WEBHOOK_PORT: PORT } = process.env;

const HEADERS = { 'content-type': 'application/json' };

const server = http.createServer(async (req, res) => {
  let payload = null;
  try {
    payload = await verifyPayload(req);

    deployPayload(payload).catch(console.error);

    res.statusCode = 204;
  } catch (e) {
    if (e.message === 'hashes do not match') {
      res.writeHead(401, HEADERS);
    } else {
      console.error(e);
      res.writeHead(500, HEADERS);
    }

    res.write(JSON.stringify({ message: e.message, code: e.code }));
  }
  res.end();
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = server;
