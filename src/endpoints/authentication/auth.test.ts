import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

describe('/authenticate', () => {
  const email = 'derp@example.com';
  const password = 'abc123';

  it('should alert when email is not a string', async () => {
    const res = await chai.request(app).get('/authenticate').send({ password });
    assert.equal(res.status, 400, 'status is not 400');
    assert.equal(res.body.error, 'Email must be a string.', 'error message does not match expected');
  });

  it('should alert when password is not a string', async () => {
    const res = await chai.request(app).get('/authenticate').send({ email });
    assert.equal(res.status, 400, 'status is not 400');
    assert.equal(res.body.error, 'Password must be a string.', 'error message does not match expected');
  });

  it('should return authenticated: false if the user doesn\'t exist', async () => {
    const res = await chai.request(app).get('/authenticate').send({ email, password });
    assert.equal(res.status, 200, 'status is not 200');
    assert.isFalse(res.body.authenticated, 'authenticated unexpectedly');
    assert.isNull(res.body.userType, 'userType unexpectedly set');
  });

  it('should return authentication information for a valid manager user', async () => {
    const res = await chai.request(app).get('/authenticate')
      .send({ email: 'manager@example.com', password: 'Abc123' });
    assert.equal(res.status, 200, 'status is not 200');
    assert.isTrue(res.body.authenticated, 'manager not authenticated');
    assert.equal(res.body.userType, 'manager', 'userType not set to manager');
  });

  it('should return authentication information for a valid employee user', async () => {
    const res = await chai.request(app).get('/authenticate')
      .send({ email: 'employee@example.com', password: 'Def456' });
    assert.equal(res.status, 200, 'status is not 200');
    assert.isTrue(res.body.authenticated, 'employee not authenticated');
    assert.equal(res.body.userType, 'employee', 'userType not set to employee');
  });
});
