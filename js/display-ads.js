import {createElements} from './data.js';

createElements();
const ad = document.querySelector('#card').content.querySelector('.popup');

const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createCustomPopup = (item) => {

  const adElement = ad.cloneNode(true);

  adElement.querySelector('.popup__title').textContent = item.Offer.title;
  adElement.querySelector('.popup__text--address').textContent = item.Offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${item.Offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = TYPES[item.Offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${item.Offer.rooms} комнаты для ${item.Offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${item.Offer.checkin} выезд до ${item.Offer.checkout}`;
  adElement.querySelector('.popup__description').textContent = item.Offer.description;
  adElement.querySelector('.popup__avatar').src = item.Author.avatar;

  // ДОПОЛНИТЕЛЬНЫЕ УДОБСТВА
  const popupFeatures = adElement.querySelector('.popup__features');
  const popupFeatureList = popupFeatures.querySelectorAll('.popup__feature');

  if(Array.isArray(item.Offer.features)) {
    const modifiers = item.Offer.features.map((featureValue) =>`popup__feature--${featureValue}`);

    popupFeatureList.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1]; // 1 -  индекс класса в атрибуте
      if (!modifiers.includes(modifier)) {
        popupFeature.remove();
      }
    });
  } else {
    const modifiers = `popup__feature--${item.Offer.features}`;
    popupFeatureList.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1]; // 1 -  индекс класса в атрибуте
      if (modifiers !== modifier) {
        popupFeature.remove();
      }
    });}

  // ФОТОГАЛЕРЕЯ
  const popupPhotos = adElement.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');

  if(Array.isArray(item.Offer.photos)) {
    item.Offer.photos.forEach((photoSrc, index) => {
      if(index === 0){
        popupPhoto.src = item.Offer.photos[0];
      } else {
        const popupPhotoItem = popupPhoto.cloneNode(true);
        popupPhotoItem.src = photoSrc;
        popupPhotos.appendChild(popupPhotoItem);
      }
    });
  } else {
    popupPhoto.src = item.Offer.photos;
  }

  return adElement;
};

export {createCustomPopup};
