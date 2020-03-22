import * as crypto from 'crypto';
import { IncomingMessage } from 'http';
import { CheckSuitePayload } from '../types';
import StringWritable from './ConcatStream';

const verifyPayload = (req: IncomingMessage): Promise<CheckSuitePayload> => new Promise((resolve, reject) => {
  const stream = new StringWritable();
  const hmac = crypto.createHmac('sha1', process.env.GITHUB_SECRET as string);

  req.pipe(hmac);
  req.pipe(stream);

  req.on('end', () => {
    const bodySignature = Buffer.from(`sha1=${hmac.digest().toString('hex')}`);
    const headerSignature = Buffer.from(req.headers['x-hub-signature'] as string);
    if (!crypto.timingSafeEqual(bodySignature, headerSignature)) {
      return reject(Error('hashes do not match'));
    }

    try {
      return resolve(JSON.parse(stream.data));
    } catch (e) {
      return reject(e);
    }
  });
});

export default verifyPayload;
