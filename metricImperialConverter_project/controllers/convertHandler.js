function ConvertHandler() {
  const inputRegex = /[^a-zA-Z]+|[a-zA-Z]+/g;

  this.getNum = function numValidator(input) {
    const result = input.match(/[.\d\/]+/g) || ['1'];

    const fractionInput = result[0].split('/');
    if (fractionInput.length > 2) {
      return undefined;
    }
    const num1 = fractionInput[0];
    const num2 = fractionInput[1] || '1';

    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    result[0] = parseFloat(num1) / parseFloat(num2);
    return result;
  };

  this.getUnit = function unitValidator(input) {
    const result = input.match(/[a-zA-Z]+/g)[0].toLowerCase();

    const validunits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validunits.includes(result)) {
      return undefined;
    }
    if (result === 'l') {
      return result.toUpperCase();
    }
    return result;
  };

  this.getReturnUnit = function unitConverter(initUnit) {
    let result;
    let unit;

    if (initUnit !== undefined) {
      unit = initUnit.toLowerCase();
    }

    switch (unit) {
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = undefined;
    }

    return result;
  };

  this.spellOutUnit = function unitAName(unit) {
    let result;
    let units;

    if (unit !== undefined) {
      units = unit.toLowerCase();
    }

    switch (units) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = 'cant find';
    }

    return result;
  };
}
