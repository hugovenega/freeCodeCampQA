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

  mocha.suite('GET Tests', () => {
    // View issues on a project: GET request to /api/issues/{project}
    mocha.test('Get All Issue in an Array', (done) => {
      const testData = {
        issue_title: 'Get Issue Test Without Filter',
        issue_text: 'Some Text',
        created_by: 'Get Issue Tester',
      };
      const url = `/api/issues/test${Date.now().toString().substring(7)}`;
      chai.request(server)
        .post(url)
        .send(testData)
        .end((err, res) => {
          chai.request(server)
            .get(url)
            .end((err, res) => {
              assert.isArray(res.body);
              assert.lengthOf(res.body, 1);
              (res.body).forEach((element) => {
                assert.property(element, 'issue_title');
                assert.property(element, 'issue_text');
                assert.property(element, 'created_by');
              });
              done();
            });
        });
    });

    // View issues on a project with one filter: GET request to /api/issues/{project}

    mocha.test('Get Issue With One Filter', (done) => {
      const testData = {
        issue_title: 'Get Issue Test Without Filter',
        issue_text: 'Some Text',
        created_by: 'Get Issue Tester',
      };
      const postUrl = `/api/issues/test${Date.now().toString().substring(7)}`;
      const getUrl = `/api/issues/test${Date.now().toString().substring(7)}?open=true`;
      chai.request(server)
        .post(postUrl)
        .send(testData)
        .end((err, res) => {
          chai.request(server)
            .get(getUrl)
            .end((err, response) => {
              assert.isArray(response.body);
              assert.lengthOf(response.body, 1);
              (response.body).forEach((element) => {
                assert.property(element, 'issue_title');
                assert.property(element, 'issue_text');
                assert.property(element, 'created_by');
              });
              done();
            });
        });
    });

    // View issues on a project with multiple filters: GET request to /api/issues/{project}

    mocha.test('Get Issue With Multiple Filters', (done) => {
      const testData = {
        issue_title: 'Get Issue Test Multiple Filter',
        issue_text: 'Some Text',
        created_by: 'Get Issue Testers',
      };
      const postUrl = `/api/issues/test${Date.now().toString().substring(7)}`;
      const getUrl = `/api/issues/test${Date.now().toString().substring(7)}?open=true&created_by=Get%20Issue%20Testers`;
      chai.request(server)
        .post(postUrl)
        .send(testData)
        .end((err, res) => {
          chai.request(server)
            .get(getUrl)
            .end((err, response) => {
              assert.isArray(response.body);
              assert.lengthOf(response.body, 1);
              (response.body).forEach((element) => {
                assert.property(element, 'issue_title');
                assert.property(element, 'issue_text');
                assert.property(element, 'created_by');
              });
              done();
            });
        });
    });
  });

  mocha.suite('PUT Tests', () => {
    // Update one field on an issue: PUT request to /api/issues/{project}

    mocha.test('Update Issue With One Field to Update', (done) => {
      const testData = {
        issue_title: 'Put Issue Test With One Field To Update',
        issue_text: 'Some Text',
        created_by: 'Put Issue Tester',
      };
      chai.request(server)
        .post('/api/issues/test')
        .send(testData)
        .end((err, res) => {
          chai.request(server)
            .put('/api/issues/test')
            .send({
              _id: res.body._id,
              issue_text: 'Update With One Feild',
            })
            .end((err, response) => {
              assert.equal(response.status, 200);
              assert.deepEqual(response.body, {
                result: 'successfully updated',
                _id: res.body._id,
              });
              done();
            });
        });
    });

    // Update multiple fields on an issue: PUT request to /api/issues/{project}

    mocha.test('Update Issue With Multiple Field to Update', (done) => {
      const testData = {
        issue_title: 'Get Issue Test Without Filter',
        issue_text: 'Some Text',
        created_by: 'Put Issue Tester',
      };
      chai.request(server)
        .post('/api/issues/test')
        .send(testData)
        .end((err, res) => {
          chai.request(server)
            .put('/api/issues/test')
            .send({
              _id: res.body._id,
              issue_text: 'Multiple Update Test 1',
              issue_title: 'Multiple Update Test 2',
            })
            .end((err, response) => {
              assert.equal(response.status, 200);
              assert.deepEqual(response.body, {
                result: 'successfully updated',
                _id: res.body._id,
              });
              done();
            });
        });
    });

    // Update an issue with missing _id: PUT request to /api/issues/{project}

    mocha.test('Update Issue With Missing _id', (done) => {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '',
          issue_text: 'Missing ID Test 1',
          issue_title: 'Missing ID Test 2',
        })
        .end((err, response) => {
          assert.equal(response.status, 200);
          assert.deepEqual(response.body, {
            error: 'missing _id',
          });
          done();
        });
    });

    // Update an issue with no fields to update: PUT request to /api/issues/{project}

    mocha.test('Update Issue Without Any Field', (done) => {
      const testData = {
        issue_title: 'Get Issue Test Without Field To Update',
        issue_text: 'Some Text',
        created_by: 'Put Issue Tester',
      };
      chai.request(server)
        .post('/api/issues/test')
        .send(testData)
        .end((err, res) => {
          chai.request(server)
            .put('/api/issues/test')
            .send({
              _id: res.body._id,
            })
            .end((err, response) => {
              assert.equal(response.status, 200);
              assert.deepEqual(response.body, {
                error: 'no update field(s) sent',
                _id: res.body._id,
              });
              done();
            });
        });
    });

    // Update an issue with an invalid _id: PUT request to /api/issues/{project}

    test('Update Issue With an Invalid Id', (done) => {
      const id = new ObjectID('123abc123abc');
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: id,
          issue_text: 'Update With Invalid Id',
        })
        .end((err, response) => {
          assert.equal(response.status, 200);
          assert.deepEqual(response.body, {
            error: 'could not update',
            _id: ObjectID(id).toString(),
          });
          done();
        });
    });
  });
});
