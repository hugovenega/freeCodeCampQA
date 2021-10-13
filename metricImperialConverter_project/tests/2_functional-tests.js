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
});
