const { expect } = require('chai');
const ConvertHandler = require('../controllers/convertHandler');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit,
    );

    if (initNum === undefined && initUnit === undefined) {
      res.send('invalid number and unit');
    } else if (initUnit === undefined) {
      res.send('invalid unit');
    } else if (initNum === undefined) {
      res.send('invalid number');
    }

    const resObj = {};

    resObj.initNum = initNum;
    resObj.initUnit = initUnit;
    resObj.returnNum = returnNum;
    resObj.returnUnit = returnUnit;
    resObj.string = toString;
    res.json(resObj);
  });
};
