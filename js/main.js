function getInteger (min, max) {

  if (max <= min || min < 0) {
    throw new Error('Минимальное значение не может быть меньше 0.');
  }

  if (max <= min) {
    const number = min;
    min = max;
    max = number;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getInteger(0, 2);

function getFloat (min, max, decimalPlaces) {

  if (min < 0) {
    throw new Error('Минимальное значение не может быть меньше 0.');
  }

  if (max <= min) {
    const number = min;
    min = max;
    max = number;
  }

  return parseFloat(((Math.random() * (max - min + 1)) + min).toFixed(decimalPlaces));
}

getFloat(0, 3, 2);
