import { inactivePage, activePage } from './active-page.js';
import {createCustomPopup} from './display-ads.js';
import {getData} from './api.js';
import {debounce} from './utils/debounce.js';

const DEFAULT_VALUE = 'any';
const DEFAULT_DEBOUNCE = 500;
const LAT_CENTER = 35.68000;
const LNG_CENTER = 139.75000;

const formElement = document.querySelector('.map__filters');
const filterTypeElement = formElement.querySelector('select[name="housing-type"]');
const filterPriceElement = formElement.querySelector('select[name="housing-price"]');
const filterRoomsNumberElement = formElement.querySelector('select[name="housing-rooms"]');
const filterGuestsNumberElement = formElement.querySelector('select[name="housing-guests"]');
const filterFeaturesElementList = formElement.querySelectorAll('input[name="features"]');
const address = document.querySelector('#address');

const FILTER_PRICE_RANGE = {
  low: {
    from: 0,
    to: 10000,
  },
  middle: {
    from: 10000,
    to: 50000,
  },
  high: {
    from: 50000,
  },
};

const mapData = {
  markers: [],
};

inactivePage(); // НАЧАЛЬНОЕ НЕАКТИВНОЕ СОСТОЯНИЕ СТРАНИЦЫ

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    activePage(); // АКТИВНОЕ СОСТОЯНИЕ ПОСЛЕ ЗАГРУЗК СТРАНИЦЫ
  })
  .setView({
    lat: LAT_CENTER,
    lng: LNG_CENTER,
  }, 14);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

const mainPin = L.icon({ // ОТМЕТКА БОЛЬШАЯ ДЛЯ НОВОГО ОБЪЯВЛЕНИ
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker( // СОЗДАНИЕ МАРКЕРА НОВОГО ОБЪЯВЛЕНИЯ НА КАРТУ
  {
    lat: LAT_CENTER,
    lng: LNG_CENTER,
  },
  {
    draggable: true,
    icon: mainPin,
  },
);

mainMarker.addTo(mapCanvas); // ДОБАВЛЕНИЕ МАРКЕРА НОВОГО ОБЪЯВЛЕНИЯ НА КАРТУ

mainMarker.on('moveend', (evt) => { // ИЗМЕНЕНИЕ ЗНАЧЕНИЕ АДРЕСА В ФОРМЕ ПРИ ПЕРЕМЕЩЕНИИ БАЛУНА
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

//Создание обычных отметок
const renderMarkers = (offers) => {
  offers.forEach((element) =>{

    const pin = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon:pin,
      },
    );

    marker
      .addTo(mapCanvas)
      .bindPopup(createCustomPopup(element));
    mapData.markers.push(marker);
  });
};

// Удаление лишних отметок
const removeMarkers = () => {
  mapData.markers.forEach((marker) => marker.remove());
  mapData.markers = [];
};

const resetMarker = () => {
  mainMarker.setLatLng({
    lat: LAT_CENTER,
    lng: LNG_CENTER,
  });
  address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
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
  const priceCurrentType = FILTER_PRICE_RANGE[filterPriceElement.value]; //промежуток из значения фильтра
  if (filterPriceElement.value !== DEFAULT_VALUE && priceCurrentType) { //если значение фильтра не равно значению по умолчанию или
    offers = offers.filter((announcement) => { // фильтруем объявления
      if (!announcement.offer.price) { // если цена отсутствует, то ошибка
        return false;
      }

      const priceValue = Number(announcement.offer.price); // значение объявления
      if (((priceValue >= priceCurrentType.from) && !priceCurrentType.to)|| ((priceValue >= priceCurrentType.from) && (priceValue < priceCurrentType.to))) { // если значение объявления больше или равно "от" и значение до отсутствует ИЛИ если есть занчение "до" и значение объявления меньше "до"
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
const filterOffers = (offers) => {
  offers = filterByType(filterByRoomsNumber(filterByGuestsNumber(filterByPrice(filterByFeatures(offers)))));
  return offers;
};

export {renderMarkers, resetMarker, removeMarkers, filterOffers, mapCanvas};
