import {createCustomPopup} from './display-ads.js';
import { inactivePage, activePage } from './active-page.js';
import { resetForm } from './form.js';
import {getData} from './api.js';
import {debounce} from './utils/debounce.js';

const DEFAULT_VALUE = 'any';
const DEFAULT_DEBOUNCE = 5000;

const formElement = document.querySelector('.map__filters');
const filterTypeElement = formElement.querySelector('select[name="housing-type"]');
const filterPriceElement = formElement.querySelector('select[name="housing-price"]');
const filterRoomsNumberElement = formElement.querySelector('select[name="housing-rooms"]');
const filterGuestsNumberElement = formElement.querySelector('select[name="housing-guests"]');
const filterFeaturesElementList = formElement.querySelectorAll('input[name="features"]');

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

const LAT_CENTER = 35.68000;
const LNG_CENTER = 139.75000;

const resetButton = document.querySelector('.ad-form__reset');
const address = document.querySelector('#address');

inactivePage();

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    activePage();
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

const mainPin = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: LAT_CENTER,
    lng: LNG_CENTER,
  },
  {
    draggable: true,
    icon: mainPin,
  },
);

mainMarker.addTo(mapCanvas);

address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;

mainMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});


const mapData = {
  markers: [],
};


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

// Сброс формы
resetButton.addEventListener('click', () => {
  resetForm();
});

// Добавляем события фильтров
filterTypeElement.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));
filterPriceElement.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));
filterRoomsNumberElement.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));
filterGuestsNumberElement.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));
filterFeaturesElementList.forEach((element) =>
  element.addEventListener('click', debounce(getData, DEFAULT_DEBOUNCE)));

//Фильтруем по типу жилья
function filterByType (offers) {
  if (filterTypeElement.value !== DEFAULT_VALUE) {
    offers = offers.filter((offer) => (offer.offer.type) ? offer.offer.type === filterTypeElement.value : false);
  }
  return offers;
}

//Фильтруем по количеству комнат
const filterByRoomsNumber = (offers) => {
  if (filterRoomsNumberElement.value !== DEFAULT_VALUE) {
    const roomsNumber = Number(filterRoomsNumberElement.value);
    offers = offers.filter((offer) => {
      if (!offer.offer.rooms) {
        return false;
      }
      return Number(offer.offer.rooms) === roomsNumber;
    });
  }
  return offers;
};

//Фильтруем по количеству гостей
const filterByGuestsNumber = (offers) => {
  if (filterGuestsNumberElement.value !== DEFAULT_VALUE) {
    const guestsNumber = Number(filterGuestsNumberElement.value);
    offers = offers.filter((offer) => {
      if (typeof offer.offer.guests === 'undefined') {
        return false;
      }
      return Number(offer.offer.guests) === guestsNumber;
    });
  }
  return offers;
};

//Фильтруем по цене
const filterByPrice = (offers) => {
  const priceCurrentType = FILTER_PRICE_RANGE[filterPriceElement.value];
  if (filterPriceElement.value !== DEFAULT_VALUE && priceCurrentType) {
    offers = offers.filter((offer) => {
      if (!offer.offer.price) {
        return false;
      }

      const priceValue = Number(offer.offer.price);
      if (priceValue >= priceCurrentType.from) {
        if (priceCurrentType.to) {
          if (priceValue < priceCurrentType.to) {
            return true;
          }
        } else {
          return true;
        }
      }
      return false;
    });
  }
  return offers;
};

//Фильтруем по удобсмтвам
const filterByFeatures = (offers) => {
  let filteredCards = offers;
  filterFeaturesElementList.forEach((filterFeaturesElement) => {
    if (filterFeaturesElement.checked) {
      filteredCards = filteredCards.filter((offer) => {
        if (!offer.offer.features) {
          return false;
        }
        return offer.offer.features.includes(filterFeaturesElement.value);
      });
    }
  });
  return filteredCards;
};

export {renderMarkers, resetMarker, filterByType, filterByRoomsNumber,filterByGuestsNumber, filterByPrice,filterByFeatures, removeMarkers};
