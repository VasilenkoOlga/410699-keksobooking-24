const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures= form.children;
const mapFiltersInteractive = mapFilters.children;
const adFormDisabled = 'ad-form--disabled';

// НЕ АКТИВНОЕ СОСТОЯНИЕ ФИЛЬТРОВ И ФОРМЫ

const inactivePage = function () {
  form.classList.add(adFormDisabled);
  mapFilters.classList.add(adFormDisabled);
  [...mapFeatures,...mapFiltersInteractive].forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

// АКТИВНОЕ СОСТОЯНИЕ ФИЛЬТРОВ И ФОРМЫ

const activePage = function () {
  form.classList.remove(adFormDisabled);
  mapFilters.classList.remove(adFormDisabled);
  [...mapFeatures,...mapFiltersInteractive].forEach((element) => {
    element.removeAttribute('disabled');
  });
};

export {inactivePage, activePage, mapFilters};
