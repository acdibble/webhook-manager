const crypto = require('crypto');
const fs = require('fs');

const packageJSON = fs.readFileSync(`${__dirname}/../package.json`, 'utf8');

const [secret] = packageJSON.match(/(?<=WEBHOOK_TOKEN=).+?(?=\s)/);

const payload = fs.readFileSync(`${__dirname}/payload.json`);

const hmac = crypto.createHmac('sha1', secret);
hmac.update(payload);

console.log(hmac.digest('hex'));
