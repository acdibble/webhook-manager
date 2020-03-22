import * as crypto from 'crypto';
import { IncomingMessage } from 'http';
import { WebhookPayload } from '../types';

const verifyPayload = (req: IncomingMessage): Promise<WebhookPayload> => new Promise((resolve, reject) => {
  let data = Buffer.alloc(0);
  const hmac = crypto.createHmac('sha1', process.env.GITHUB_SECRET as string);

  req.on('data', (chunk) => {
    hmac.update(chunk);
    data = Buffer.concat([data, chunk]);
  });

  req.on('end', () => {
    const bodySignature = Buffer.from(`sha1=${hmac.digest().toString('hex')}`);
    const headerSignature = Buffer.from(req.headers['x-hub-signature'] as string);
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

export default verifyPayload;
