// Функция создания рандомного целого числа

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

// Источник Кекс. Функция создания рандомного числа с плавающей точкой
function getRandomPositiveFloat (numberA, numberB, digits = 1) {

  const lower = Math.min(Math.abs(numberA), Math.abs(numberB));
  const upper = Math.max(Math.abs(numberA), Math.abs(numberB));
  // Отрицательное число берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

export {getInteger, getRandomPositiveFloat};
