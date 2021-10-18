import {getInteger, getRandomPositiveFloat} from './util.js';

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const MIN_ROOMS = 1;
const MAX_ROOMS =5;

const MIN_GUESTS =1;
const MAX_GUESTS = 10;

const MIN_PRICE = 500;
const MAX_PRICE = 10000;

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;

const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

// Функция выбора рандомного элемента из массива (в пределах длины массива)

const getRandomArrayElement = function (elements) {
  return elements[getInteger(0, elements.length - 1)];
};

// Функция создания автора объявления

const createAuthor = function() {

  let num = getInteger(1,10);
  if (num < 10) {
    num = `0${String(num)}`;
  }
  num = String(num);

  return {
    avatar: `img/avatars/user${num}.png`,
  };
};

// Функция создания координат

const createLocation = function() {
  return {
    lat: getRandomPositiveFloat(MIN_LAT, MAX_LAT, 5),
    lng: getRandomPositiveFloat(MIN_LNG, MAX_LNG, 5),
  };
};

// Функция создания объявления

const createOffer = function () {
  return {
    title: `Отель ${getInteger(1, 10)}`,
    address: [createLocation().lat, createLocation().lng],
    price: getInteger(MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(TYPE),
    rooms: getInteger(MIN_ROOMS, MAX_ROOMS),
    guests: getInteger(MIN_GUESTS, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: getRandomArrayElement(FEATURES),
    description: 'Описание объекта',
    photos: getRandomArrayElement(PHOTOS),
  };
};

// Объявлеяем массив для того чтобы собрать объявления

const announcement = [];

// Добавляем 10 объектов в массив объявлений

const createElements = function () {
  for (let index= 0; index < 10 ;index++) {
    announcement.push ({
      Author: createAuthor(),
      Location: createLocation(),
      Offer: createOffer(),
    });
  }
};

export {createElements, announcement};
