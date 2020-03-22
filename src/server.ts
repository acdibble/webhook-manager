import * as http from 'http';
import verifyPayload from './helpers/verifyPayload';
import deployPayload from './helpers/deployPayload';

const HEADERS = { 'content-type': 'application/json' };

const server = http.createServer(async (req, res) => {
  try {
    const payload = await verifyPayload(req);

    deployPayload(payload).catch(console.error);

    res.statusCode = 204;
  } catch (e) {
    if (e instanceof RangeError) {
      res.writeHead(401, HEADERS);
    } else {
      console.error(e);
      res.writeHead(500, HEADERS);
    }

    res.write(JSON.stringify({ message: e.message, code: e.code }));
  }
  res.end();
});

export default server;
