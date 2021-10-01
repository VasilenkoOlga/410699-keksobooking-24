function getInteger (min, max) {

  if (min < 0) {
    throw new Error('Минимальное значение не может быть меньше 0');
  }

  if (max <= min) {
    throw new Error('Максимальное значение меньше минимального или они равны');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getInteger(0, 2);

function getFloat (min, max, decimalPlaces) {

  if (min < 0) {
    throw new Error('Минимальное значение не может быть меньше 0');
  }

  if (max <= min) {
    throw new Error('Максимальное значение меньше минимального или они равны');
  }


  return parseFloat(((Math.random() * (max - min + 1)) + min).toFixed(decimalPlaces));
}

getFloat(0, 3, 2);
