const ad = document.querySelector('#card').content.querySelector('.popup');

const type = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createCustomPopup = (item) => {

  const adElement = ad.cloneNode(true);

  const popupItems = [
    [item.offer.title, adElement.querySelector('.popup__title'), item.offer.title],
    [item.offer.address, adElement.querySelector('.popup__text--address'), item.offer.address],
    [item.offer.price, adElement.querySelector('.popup__text--price'),`${item.offer.price} ₽/ночь`],
    [item.offer.type, adElement.querySelector('.popup__type'), type[item.offer.type]],
    [item.offer.description,adElement.querySelector('.popup__description'), item.offer.description],
    [(item.offer.rooms && item.offer.guests), adElement.querySelector('.popup__text--capacity'), `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`],
    [(item.offer.checkin && item.offer.checkout), adElement.querySelector('.popup__text--time'),`Заезд после ${item.offer.checkin} выезд до ${item.offer.checkout}`],
  ];

  //заполнение тегов с текстовым содержанием
  popupItems.forEach((popupItem) => {
    if(popupItem[0]){
      const popupElement = popupItem[1];
      popupElement.textContent = popupItem[2];
    } else {
      popupItem[1].remove();
    }});

  // заполнение тега с содержанием картинки
  const popupAvatar = adElement.querySelector('.popup__avatar');
  if(item.author.avatar) {
    popupAvatar.src = item.author.avatar;
  } else {
    popupAvatar.remove();
  }

  // ДОПОЛНИТЕЛЬНЫЕ УДОБСТВА
  const popupFeatureList = adElement.querySelector('.popup__features');
  const popupListFeatures = popupFeatureList.querySelectorAll('.popup__feature');

  if(Array.isArray(item.offer.features)) {
    const modifiers = item.offer.features.map((featureValue) =>`popup__feature--${featureValue}`);

    popupListFeatures.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1]; // 1 -  индекс класса в атрибуте
      if (!modifiers.includes(modifier)) {
        popupFeature.remove();
      }
    });
  } else {
    const modifiers = `popup__feature--${item.offer.features}`;
    popupListFeatures.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1]; // 1 -  индекс класса в атрибуте
      if (modifiers !== modifier) {
        popupFeature.remove();
      }
    });}

  // ФОТОГАЛЕРЕЯ
  const popupPhotoList = adElement.querySelector('.popup__photos');
  const popupPhoto = popupPhotoList.querySelector('.popup__photo');

  if(Array.isArray(item.offer.photos)) {
    item.offer.photos.forEach((photoSrc, index) => {
      if(index === 0){
        popupPhoto.src = item.offer.photos[0];
      } else {
        const popupPhotoItem = popupPhoto.cloneNode(true);
        popupPhotoItem.src = photoSrc;
        popupPhotoList.appendChild(popupPhotoItem);
      }
    });
  } else if(item.offer.photos) {
    popupPhoto.src = item.offer.photos;
  } else {
    popupPhotoList.remove();
  }

  return adElement;
};

export {createCustomPopup};
