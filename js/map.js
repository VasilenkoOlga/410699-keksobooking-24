import {inactivePage, activePage} from './form.js';
//import {announcement} from './data.js';
import {createCustomPopup} from './display-ads.js';

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
  });
};

/*
resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: LAT_CENTER,
    lng: LNG_CENTER,
  });
  address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
});
*/

const resetMarker = () => {
  mainMarker.setLatLng({
    lat: LAT_CENTER,
    lng: LNG_CENTER,
  });
  address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
};

resetButton.addEventListener('click', () => {
  resetMarker();
  address.value = '4';
});

export {renderMarkers, resetMarker};
