const crypto = require('crypto');

const { WEBHOOK_TOKEN: SECRET } = process.env;


const verifyPayload = (req) => new Promise((resolve, reject) => {
  let data = Buffer.alloc(0);
  const hmac = crypto.createHmac('sha1', SECRET);

  req.on('data', (chunk) => {
    hmac.update(chunk);
    data = Buffer.concat([data, chunk]);
  });

  req.on('end', () => {
    const bodySignature = Buffer.from(`sha1=${hmac.digest().toString('hex')}`);
    const headerSignature = Buffer.from(req.headers['x-hub-signature']);
    if (!crypto.timingSafeEqual(bodySignature, headerSignature)) {
      return reject(Error('hashes do not match'));
    }

    try {
      return resolve(JSON.parse(data.toString('utf8')));
    } catch (e) {
      return reject(e);
    }
  });
});

module.exports = verifyPayload;
