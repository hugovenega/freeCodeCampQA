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
}
