import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

describe('/authenticate', () => {
  const email = 'derp@example.com';
  const password = 'abc123';

  it('should return 400 when email is not a string', async () => {
    const res = await chai.request(app).get('/authenticate').send({ password });
    assert.equal(res.status, 400, 'status is not 400');
    assert.equal(res.body.error, 'Email must be a string.', 'error message does not match expected');
  });

  it('should return 400 when password is not a string', async () => {
    const res = await chai.request(app).get('/authenticate').send({ email });
    assert.equal(res.status, 400, 'status is not 400');
    assert.equal(res.body.error, 'Password must be a string.', 'error message does not match expected');
  });

  it('should return 400 if the user doesn\'t exist', async () => {
    const res = await chai.request(app).get('/authenticate').send({ email, password });
    assert.equal(res.status, 400, 'status is not 400');
    assert.equal(res.body.error, 'User does not exist.', 'error does not match expected');
  });

  it('should return authentication information for a valid manager user', async () => {
    const res = await chai.request(app).get('/authenticate')
      .send({ email: 'manager@example.com', password: 'Abc123' }).redirects(0);
    assert.equal(res.status, 302, 'status is not 302');
    expect(res).to.redirectTo('/manager');
  });

  it('should return authentication information for a valid employee user', async () => {
    const res = await chai.request(app).get('/authenticate')
      .send({ email: 'employee@example.com', password: 'Def456' }).redirects(0);
    assert.equal(res.status, 302, 'status is not 302');
    expect(res).to.redirectTo('/employee');
  });
});
