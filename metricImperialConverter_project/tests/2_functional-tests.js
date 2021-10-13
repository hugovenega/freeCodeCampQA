const chaiHttp = require('chai-http');
const chai = require('chai');
const mocha = require('mocha');
const server = require('../server');

const { assert } = chai;
chai.use(chaiHttp);

mocha.suite('Functional Tests', () => {
  mocha.suite('GET /api/convert => conversion object', () => {
    mocha.test('Convert 4L (valid input)', (done) => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: '4L' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 4);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 1.056688, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
    });
  });

  mocha.test('Convert 5g (invalid input unit)', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '5g' })
      .end((err, res) => {
        assert.equal(res.body.initUnit, undefined);
        done();
      });
  });

  mocha.test('Convert 4/3.2/7L (invalid number)', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '4/3.2/7L' })
      .end((err, res) => {
        assert.equal(res.body.initNum, undefined);
        done();
      });
  });

  mocha.test('Convert 4/3.2/7g (invalid number and unit)', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '4/3.2/7g' })
      .end((err, res) => {
        assert.equal(res.body.initNum, undefined);
        assert.equal(res.body.initUnit, undefined);
        done();
      });
  });

  mocha.test('Convert kg (no number)', (done) => {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end((err, res) => {
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        done();
      });
  });
});
