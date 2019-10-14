const chai = require('chai');
const fs = require('fs');
const server = require('../index');

const { expect } = chai;

chai.use(require('chai-http'));

const payload = fs.readFileSync(`${__dirname}/payload.json`, 'utf8');

describe('server', () => {
  it('takes requests and sends 204', async () => {
    const response = await chai.request(server)
      .post('/')
      .set('X-Hub-Signature', 'sha1=8b8621e3821fbcd388966e950c34cad55eab2a94')
      .send(payload);

    expect(response.status).to.eql(204);
  });

  it('returns an error if the signatures do not match', async () => {
    const response = await chai.request(server)
      .post('/')
      .set('X-Hub-Signature', 'sha1=0000000000000000000000000000000000000000')
      .send(payload);

    expect(response.status).to.eql(401);
    expect(response.body).to.eql({ message: 'hashes do not match' });
  });

  it('returns an error if the body is unparsable', async () => {
    const response = await chai.request(server)
      .post('/')
      .set('X-Hub-Signature', 'sha1=8bfd8f0b4a31a34b0fd02cb79d8013e4f42ce275')
      .send('payload');

    expect(response.status).to.eql(500);
    expect(response.body).to.eql({ message: 'Unexpected token p in JSON at position 0' });
  });

  it('returns the exit code from the script if given', async () => {
    const oldScript = process.env.WEBHOOK_SCRIPT_FILE;
    process.env.WEBHOOK_SCRIPT_FILE = `${__dirname}/bad.sh`;

    const response = await chai.request(server)
      .post('/')
      .set('X-Hub-Signature', 'sha1=8b8621e3821fbcd388966e950c34cad55eab2a94')
      .send(payload);

    process.env.WEBHOOK_SCRIPT_FILE = oldScript;

    expect(response.status).to.eql(500);
    expect(response.body).to.eql({
      code: 13,
      message: `Command failed: sh ${__dirname}/bad.sh v0.7.1 tag server\n`,
    });
  });
});
