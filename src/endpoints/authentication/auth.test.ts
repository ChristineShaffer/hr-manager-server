import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

describe('/authenticate', () => {
  it('should alert when username is not a string', async () => {
    // TODO
    const res = await chai.request(app).get('/authenticate').send({ password: 'abc123' });
    console.log(res.body);
    assert.equal(res.status, 400, 'status is not 400');
    // assert.isFalse(res.body.authenticated, 'authenticated inappropriately');
  });
});
