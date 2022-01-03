import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

chai.use(chaiHttp);

describe('/', () => {
  it('should provide the server is up message', async () => {
    const res = await chai.request(app).get('/');
    assert.equal(res.status, 200, 'status is not 200');
    assert.equal(res.body.message, 'Server is up', 'server is up message not returned');
  });
});
