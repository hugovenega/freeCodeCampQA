const chaiHttp = require('chai-http');
const chai = require('chai');
const mocha = require('mocha');

const { assert } = chai;
const {
  ObjectID,
} = require('mongodb');
const server = require('../server');

chai.use(chaiHttp);

mocha.suite('Functional Tests', () => {
  mocha.suite('POST Tests', () => {
    // Create an issue with every field: POST request to /api/issues/{project}

    mocha.test('Create an Issue With Every Field Filled In', (done) => {
      const testData = {
        issue_title: 'Test Title',
        issue_text: 'Test Text',
        created_by: 'Text- Create an Issue With Every Field Filled In',
        assigned_to: 'Chai & Mocha',
        status_text: 'Testing',
      };
      chai.request(server)
        .post('/api/issues/test')
        .send(testData)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.nestedInclude(res.body, testData);
          assert.property(res.body, 'created_on');
          assert.isNumber(Date.parse(res.body.created_on));
          assert.property(res.body, 'updated_on');
          assert.isNumber(Date.parse(res.body.updated_on));
          assert.property(res.body, 'open');
          assert.isBoolean(res.body.open);
          assert.isTrue(res.body.open);
          assert.property(res.body, '_id');
          assert.isNotEmpty(res.body._id);
          assert.property(res.body, 'issue_title');
          assert.equal(res.body.issue_title, 'Test Title');
          assert.property(res.body, 'issue_text');
          assert.equal(res.body.issue_text, 'Test Text');
          assert.property(res.body, 'issue_text');
          assert.equal(res.body.issue_text, 'Test Text');
          assert.property(res.body, 'created_by');
          assert.equal(res.body.created_by, 'Text- Create an Issue With Every Field Filled In');
          assert.property(res.body, 'assigned_to');
          assert.equal(res.body.assigned_to, 'Chai & Mocha');
          assert.property(res.body, 'status_text');
          assert.equal(res.body.status_text, 'Testing');
          done();
        });
    });
  });

  // Create an issue with only required fields: POST request to /api/issues/{project}

  mocha.test('Create an Issue With Only Required Fields', (done) => {
    const testData = {
      issue_title: 'Test Title',
      issue_text: 'Test Text',
      created_by: 'Text- Create an Issue With Every Field Filled In',
    };
    chai.request(server)
      .post('/api/issues/test')
      .send(testData)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.nestedInclude(res.body, testData);
        assert.property(res.body, 'created_on');
        assert.isNumber(Date.parse(res.body.created_on));
        assert.property(res.body, 'updated_on');
        assert.isNumber(Date.parse(res.body.updated_on));
        assert.property(res.body, 'open');
        assert.isBoolean(res.body.open);
        assert.isTrue(res.body.open);
        assert.property(res.body, '_id');
        assert.isNotEmpty(res.body._id);
        assert.property(res.body, 'issue_title');
        assert.equal(res.body.issue_title, 'Test Title');
        assert.property(res.body, 'issue_text');
        assert.equal(res.body.issue_text, 'Test Text');
        assert.property(res.body, 'issue_text');
        assert.equal(res.body.issue_text, 'Test Text');
        assert.property(res.body, 'created_by');
        assert.equal(res.body.created_by, 'Text- Create an Issue With Every Field Filled In');
        done();
      });
  });

  // Create an issue with missing required fields: POST request to /api/issues/{project}

  mocha.test('Create an Issue With Missing Required Fields', (done) => {
    const testData = {
      issue_title: 'Test Title',
      issue_text: 'Test Text',
    };
    chai.request(server)
      .post('/api/issues/test')
      .send(testData)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'required field(s) missing');
        done();
      });
  });
});
