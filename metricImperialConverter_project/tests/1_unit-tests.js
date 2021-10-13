const chai = require('chai');
const mocha = require('mocha');

const { assert } = chai;
const ConvertHandler = require('../controllers/convertHandler');

const convertHandler = new ConvertHandler();

mocha.suite('Unit Tests', () => {
  mocha.suite('ConvertHandler functions test', () => {
    mocha.test('Whole number input', (done) => {
      const input = '5L';
      assert.equal(convertHandler.getNum(input), 5);
      done();
    });

    mocha.test('Invalid input (double fraction)', (done) => {
      const input = '4/3.1/7kg';
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    mocha.test('Decimal Input', (done) => {
      const input = '5.2gal';
      assert.equal(convertHandler.getNum(input), 5.2);
      done();
    });

    mocha.test('Fractional Input', (done) => {
      const input = '7/5mi';
      assert.equal(convertHandler.getNum(input), 7 / 5);
      done();
    });

    mocha.test('Fractional input with decimal', (done) => {
      const input = '7/1.4mi';
      assert.equal(convertHandler.getNum(input), 7 / 1.4);
      done();
    });

    mocha.test('No numeric input', (done) => {
      const input = 'lbs';
      assert.equal(convertHandler.getNum(input), 1);
      assert.equal(convertHandler.getUnit(input), 'lbs');
      done();
    });
  });
});
