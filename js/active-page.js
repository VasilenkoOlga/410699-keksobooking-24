const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures= form.children;
const mapInteractiveFilters = mapFilters.children;
const adFormDisabled = 'ad-form--disabled';

// НЕ АКТИВНОЕ СОСТОЯНИЕ ФИЛЬТРОВ И ФОРМЫ

const deactivatePage = function () {
  form.classList.add(adFormDisabled);
  mapFilters.classList.add(adFormDisabled);
  [...mapFeatures,...mapInteractiveFilters].forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

// АКТИВНОЕ СОСТОЯНИЕ ФИЛЬТРОВ И ФОРМЫ

const activatePage = function () {
  form.classList.remove(adFormDisabled);
  mapFilters.classList.remove(adFormDisabled);
  [...mapFeatures,...mapInteractiveFilters].forEach((element) => {
    element.removeAttribute('disabled');
  });
};

export {deactivatePage, activatePage, mapFilters};
