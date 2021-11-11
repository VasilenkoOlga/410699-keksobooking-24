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

  adElement.querySelector('.popup__title').textContent = item.offer.title;
  adElement.querySelector('.popup__text--address').textContent = item.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = TYPES[item.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin} выезд до ${item.offer.checkout}`;
  adElement.querySelector('.popup__description').textContent = item.offer.description;
  adElement.querySelector('.popup__avatar').src = item.author.avatar;

  // ДОПОЛНИТЕЛЬНЫЕ УДОБСТВА
  const popupFeatures = adElement.querySelector('.popup__features');
  const popupFeatureList = popupFeatures.querySelectorAll('.popup__feature');

  if(Array.isArray(item.offer.features)) {
    const modifiers = item.offer.features.map((featureValue) =>`popup__feature--${featureValue}`);

    popupFeatureList.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1]; // 1 -  индекс класса в атрибуте
      if (!modifiers.includes(modifier)) {
        popupFeature.remove();
      }
    });
  } else {
    const modifiers = `popup__feature--${item.offer.features}`;
    popupFeatureList.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1]; // 1 -  индекс класса в атрибуте
      if (modifiers !== modifier) {
        popupFeature.remove();
      }
    });}

  // ФОТОГАЛЕРЕЯ
  const popupPhotos = adElement.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');

  if(Array.isArray(item.offer.photos)) {
    item.offer.photos.forEach((photoSrc, index) => {
      if(index === 0){
        popupPhoto.src = item.offer.photos[0];
      } else {
        const popupPhotoItem = popupPhoto.cloneNode(true);
        popupPhotoItem.src = photoSrc;
        popupPhotos.appendChild(popupPhotoItem);
      }
    });
  } else {
    popupPhoto.src = item.offer.photos;
  }

  return adElement;
};

export {createCustomPopup};
