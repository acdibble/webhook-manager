const { execFile } = require('child_process');

const deployPayload = (payload) => new Promise((resolve, reject) => {
  const script = process.env.WEBHOOK_SCRIPT_FILE || `${__dirname}/../test/test.sh`;

  const {
    ref,
    ref_type: refType,
    repository: {
      name: repo,
    },
  } = payload;

  execFile('sh', [script, ref, refType, repo], (err, stdout, stderr) => {
    if (err) {
      return reject(err);
    }

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    return resolve();
  });
});

module.exports = deployPayload;
