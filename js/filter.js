
import {getData} from './api.js';
import {debounce} from './utils/debounce.js';

const DEFAULT_VALUE = 'any';
const DEFAULT_DEBOUNCE = 500;

const formElement = document.querySelector('.map__filters');
const filterTypeElement = formElement.querySelector('select[name="housing-type"]');
const filterPriceElement = formElement.querySelector('select[name="housing-price"]');
const filterRoomsNumberElement = formElement.querySelector('select[name="housing-rooms"]');
const filterGuestsNumberElement = formElement.querySelector('select[name="housing-guests"]');
const filterFeaturesElementList = formElement.querySelectorAll('input[name="features"]');

const FilterPriceRange = {
  low: {
    FROM: 0,
    TO: 10000,
  },
  middle: {
    FROM: 10000,
    TO: 50000,
  },
  high: {
    FROM: 50000,
  },
};

// СОБЫТИЯ ФИЛЬТРОВ
// Добавляем события фильтров
filterTypeElement.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));
filterPriceElement.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));
filterRoomsNumberElement.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));
filterGuestsNumberElement.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));
filterFeaturesElementList.forEach((element) =>
  element.addEventListener('click', debounce(getData, DEFAULT_DEBOUNCE)));

// ФИЛЬТРЫ

//ФИЛЬТРУЕМ ПО ТИПУ ЖИЛЬЯ
function filterByType (offers) {
  if (filterTypeElement.value !== DEFAULT_VALUE) {
    offers = offers.filter((announcement) => (announcement.offer.type === filterTypeElement.value) || false);
  }
  return offers;
}

//ФИЛЬТРУЕМ ПО КОЛИЧЕСТВУ КОМНАТ
const filterByRoomsNumber = (offers) => {
  if (filterRoomsNumberElement.value !== DEFAULT_VALUE) {
    const roomsNumber = Number(filterRoomsNumberElement.value);
    offers = offers.filter((announcement) => {
      if (!announcement.offer.rooms) {
        return false;
      }
      return Number(announcement.offer.rooms) === roomsNumber;
    });
  }
  return offers;
};

//ФИЛЬТРУЕМ ПО КОЛИЧЕСТВУ ГОСТЕЙ
const filterByGuestsNumber = (offers) => {
  if (filterGuestsNumberElement.value !== DEFAULT_VALUE) {
    const guestsNumber = Number(filterGuestsNumberElement.value);
    offers = offers.filter((announcement) => {
      if (typeof announcement.offer.guests === 'undefined') {
        return false;
      }
      return Number(announcement.offer.guests) === guestsNumber;
    });
  }
  return offers;
};

// ФИЛЬТРУЕМ ПО ЦЕНЕ
const filterByPrice = (offers) => {
  const priceCurrentType = FilterPriceRange[filterPriceElement.value]; //промежуток из значения фильтра
  if (filterPriceElement.value !== DEFAULT_VALUE && priceCurrentType) { //если значение фильтра не равно значению по умолчанию или
    offers = offers.filter((announcement) => { // фильтруем объявления
      if (!announcement.offer.price) { // если цена отсутствует, то ошибка
        return false;
      }

      const priceValue = Number(announcement.offer.price); // значение объявления
      if (((priceValue >= priceCurrentType.FROM) && !priceCurrentType.TO)|| ((priceValue >= priceCurrentType.FROM) && (priceValue < priceCurrentType.TO))) { // если значение объявления больше или равно "от" и значение до отсутствует ИЛИ если есть занчение "до" и значение объявления меньше "до"
        return true;
      } else {
        return false;
      }
    });
  }
  return offers;
};

//ФИЛЬТРУЕМ ПО УДОБСТВАМ
const filterByFeatures = (offers) => {
  let filteredCards = offers;
  filterFeaturesElementList.forEach((filterFeaturesElement) => {
    if (filterFeaturesElement.checked) {
      filteredCards = filteredCards.filter((announcement) => {
        if (!announcement.offer.features) {
          return false;
        }
        return announcement.offer.features.includes(filterFeaturesElement.value);
      });
    }
  });
  return filteredCards;
};

// ФИЛЬТРУЕМ ПО ВСЕМ ПАРАМЕТРАМ
const getFilteredOfffers = (offers) => {
  offers = filterByType(filterByRoomsNumber(filterByGuestsNumber(filterByPrice(filterByFeatures(offers)))));
  return offers;
};

export {getFilteredOfffers};
