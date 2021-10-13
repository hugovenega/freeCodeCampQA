const { expect } = require('chai');
const ConvertHandler = require('../controllers/convertHandler');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const { input } = req.query;

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
  });
};
