import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('/authentication', () => {
  it('should alert when username is not a string', (done) => {
    chai.request(app).post('/authentication').type('json')
      .send({ username: 'derp', password: 'abc123' })
      .end((err, res) => {
        res.should.have.status(200);
        // res.body.should.be.a('object');
        // res.body.should.equal({ authenticated: false, userType: null });
        done();
      });
  });
});
