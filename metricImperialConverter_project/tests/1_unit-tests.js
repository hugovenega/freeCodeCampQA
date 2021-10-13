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

  mocha.suite('Function ConvertHandler.getUnit(input)', () => {
    mocha.test('For each valid inputs', (done) => {
      const input = [
        'gal',
        'l',
        'mi',
        'km',
        'lbs',
        'kg',
        'GAL',
        'L',
        'MI',
        'KM',
        'LBS',
        'KG',
      ];

      const output = [
        'gal',
        'L',
        'mi',
        'km',
        'lbs',
        'kg',
        'gal',
        'L',
        'mi',
        'km',
        'lbs',
        'kg',
      ];

      input.forEach((unit, index) => {
        assert.equal(convertHandler.getUnit(unit), output[index]);
      });
      done();
    });

    mocha.test('Unknown unit input', (done) => {
      const input = '5g';
      assert.equal(convertHandler.getUnit(input), undefined);
      done();
    });
  });

  mocha.suite('Function convertHandler.getReturnUnit(initUnit)', () => {
    mocha.test('For each valid inputs', (done) => {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach((unit, i) => {
        assert.equal(convertHandler.getReturnUnit(unit), expect[i]);
      });
      done();
    });
  });

  mocha.suite('Function convertHandler.spellOutUnit(unit)', () => {
    mocha.test('For each valid inputs', (done) => {
      const input = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
      const expect = [
        'gallons',
        'liters',
        'pounds',
        'kilograms',
        'miles',
        'kilometers',
      ];
      input.forEach((unit, i) => {
        assert.equal(convertHandler.spellOutUnit(unit), expect[i]);
      });
      done();
    });
  });
});
