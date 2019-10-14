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
      .set('X-Hub-Signature', 'sha1=81ac7e567a054c45dc7600a11cd0349dfa84e356')
      .send(payload);

    expect(response.status).to.eql(204);
  });
});
