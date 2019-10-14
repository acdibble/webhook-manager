const http = require('http');
const { execFile } = require('child_process');
const verifyPayload = require('./helpers/verifyPayload');

const {
  WEBHOOK_PORT: PORT,
  WEBHOOK_SCRIPT_FILE: SCRIPT = `${__dirname}/test/test.sh`,
} = process.env;

const server = http.createServer(async (req, res) => {
  let payload = null;
  try {
    payload = await verifyPayload(req);
    console.log(payload);
    res.writeHead(204);

    const {
      ref,
      ref_type: refType,
      repository: {
        name: repo,
      },
    } = payload;

    execFile('sh', [SCRIPT, ref, refType, repo], (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      }

      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
    });
  } catch (e) {
    if (e.message === 'hashes do not match') {
      res.writeHead(401);
    } else {
      res.writeHead(500);
    }
  }
  res.end();
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = server;
