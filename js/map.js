import {deactivatePage, activatePage} from './active-page.js';
import {createCustomPopup} from './display-ads.js';
import {getFilteredOfffers} from './filter.js';


const LAT_CENTER = 35.68000;
const LNG_CENTER = 139.75000;
const MAX_ADD = 10;

const address = document.querySelector('#address');

const mapData = {
  markers: [],
};

deactivatePage(); // НАЧАЛЬНОЕ НЕАКТИВНОЕ СОСТОЯНИЕ СТРАНИЦЫ

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    activatePage(); // АКТИВНОЕ СОСТОЯНИЕ ПОСЛЕ ЗАГРУЗК СТРАНИЦЫ
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

const showMarkers = function (offers) {
  removeMarkers();
  renderMarkers(getFilteredOfffers((offers)).slice(0, MAX_ADD));
};

export {resetMarker, mapCanvas, showMarkers};
