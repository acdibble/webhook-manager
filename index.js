const http = require('http');
const crypto = require('crypto');

const {
  WEBHOOK_PORT: PORT,
  WEBHOOK_TOKEN: SECRET,
} = process.env;

const server = http.createServer((req, res) => {
  console.log(req.headers);
  let data = Buffer.alloc(0);
  const hmac = crypto.createHmac('sha1', Buffer.from(SECRET, 'hex'));

  req.on('data', (chunk) => {
    hmac.update(chunk);
    data = Buffer.concat([data, chunk]);
  });

  req.on('end', () => {
    const bodySignature = Buffer.from(`sha1=${hmac.digest().toString('hex')}`);
    const headerSignature = Buffer.from(req.headers['x-hub-signature']);
    if (!crypto.timingSafeEqual(bodySignature, headerSignature)) {
      console.error('hashes do not match');
      res.writeHead(401);
      return res.end();
    }

    const body = JSON.parse(data.toString('utf8'));

    console.log(body);

    res.writeHead(204);
    return res.end();
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = server;
