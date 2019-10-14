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
      .set('X-Hub-Signature', 'sha1=1afb8004cd75cd43ac2d3303da4356eec5a9955c')
      .send(payload);

    expect(response.status).to.eql(204);
  });
});
