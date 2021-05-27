import * as crypto from 'crypto';
import { IncomingMessage } from 'http';
import { CheckSuitePayload } from '../types';

const verifyPayload = async (req: IncomingMessage): Promise<CheckSuitePayload> => {
  let data = '';
  const hmac = crypto.createHmac('sha1', process.env.GITHUB_SECRET as string);

  for await (const chunk of req) {
    hmac.update(chunk);
    data += chunk;
  }

  const bodySignature = Buffer.from(`sha1=${hmac.digest().toString('hex')}`);
  const headerSignature = Buffer.from(req.headers['x-hub-signature'] as string);

  crypto.timingSafeEqual(bodySignature, headerSignature);
  return JSON.parse(data);
};

export default verifyPayload;
