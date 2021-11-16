import  {resetMarker} from './map.js';
import {mapFilters} from './active-page.js';
import {getData} from './api.js';

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

const TYPE_OF_HOUSING = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const form = document.querySelector('.ad-form');
const formTitle = form.querySelector('#title');
const formPrice = form.querySelector('#price');
const formRoomNumber = form.querySelector('#room_number');
const formCapacity = form.querySelector('#capacity');
const formType = form.querySelector('#type');
const formTimein = form.querySelector('#timein');
const formTimeout = form.querySelector('#timeout');
const formSubmit = form.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

const selectors = [formTitle, formPrice, formRoomNumber, formCapacity, formType, formTimein, formTimeout];

const getError = function () {
  selectors.forEach((seletor) => {
    if (seletor.checkValidity() === false){
      seletor.style.borderColor =  '#ff0000';
    } else {
      seletor.style.borderColor = '';
    }
  });
};

formSubmit.addEventListener('click', ()=> {
  getError();
});

form.addEventListener('change', ()=> {
  getError();
});

// ПРОВЕРКА НА ОБЯЗАТЕЛЬНОСТЬ ЗАПОЛНЕНИЯ ЗАГОЛОВКА
formTitle.addEventListener('invalid', () => {
  if (formTitle.validity.valueMissing){
    formTitle.setCustomValidity('Обязательное поле для заполнения');
  }
});

// ПРОВЕРКА НА ВВОДИМЫЕ СИМВОЛЫ ЗАГОЛОВКА
formTitle.addEventListener('input', () => {
  const valueLength = formTitle.value.length;

  if (valueLength < MIN_NAME_LENGTH){
    formTitle.setCustomValidity(`Добавьте ещё ${  MIN_NAME_LENGTH - valueLength  }симв.`);
  } else if (valueLength > MAX_NAME_LENGTH){
    formTitle.setCustomValidity(`Удалите ${  MAX_NAME_LENGTH - valueLength  }симв.`);
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});

// ПРОВЕРКА НА ОБЯЗАТЕЛЬНОСТЬ ЗАПОЛНЕНИЯ ЦЕНЫ
formPrice.addEventListener('invalid', () => {
  if (formPrice.validity.valueMissing){
    formPrice.setCustomValidity('Обязательное поле для заполнения');
  }
});

// ПРОВЕРКА НА ВЕЛИЧИНУ ЦЕНЫ
formPrice.addEventListener('input', () => {
  if (formPrice.validity.rangeOverflow){
    formPrice.setCustomValidity('Слишком высокая цена');
  } else if (formPrice.value < TYPE_OF_HOUSING[formType.value]) {
    formPrice.setCustomValidity(`Цена должна составлять не менее ${TYPE_OF_HOUSING[formType.value]}`);
  } else {
    formPrice.setCustomValidity('');
  }
  formPrice.reportValidity();
});

// ВАЛИДАЦИЯ КОЛИЧЕСТВА КОМНАТ
const validFormRoomNumber = function () {
  if(Number(formRoomNumber.value) === 100 && Number(formCapacity.value) !== 0) {
    formRoomNumber.setCustomValidity('Не для гостей. Измените значение количества мест');
  } else if(Number(formRoomNumber.value) < Number(formCapacity.value)){
    formRoomNumber.setCustomValidity('Мало комнат для гостей. Измените значение количества мест');
  } else if (Number(formCapacity.value) === 0 && Number(formRoomNumber.value) === 100 ){
    formCapacity.setCustomValidity('');
  } else {
    formRoomNumber.setCustomValidity('');
  }

  formRoomNumber.reportValidity();
};

// ВАЛИДАЦИЯ КОЛИЧЕСТВА МЕСТ
const validFormCapacity = function () {
  if (Number(formCapacity.value) === 0 && Number(formRoomNumber.value) !== 100 ) {
    formCapacity.setCustomValidity('Только для 100 комнат. Измените значение количества комнат');
  } else if (Number(formRoomNumber.value) < Number(formCapacity.value)) {
    formCapacity.setCustomValidity('Много гостей. Измените количество комнат');
  } else if (Number(formCapacity.value) === 0 && Number(formRoomNumber.value) === 100 ){
    formRoomNumber.setCustomValidity('');
  } else {
    formCapacity.setCustomValidity('');
  }

  formCapacity.reportValidity();
};

// СРАВНЕНИЕ КОМНАТ И КОЛИЧЕСТВА ГОСТЕЙ

formRoomNumber.addEventListener('change', () => {
  validFormRoomNumber();
  validFormCapacity();
});


// СРАВНЕНИЕ КОЛИЧЕСТВА ГОСТЕЙ И КОЛИЧЕСТВА КОМНАТ

formCapacity.addEventListener('change', () => {
  validFormRoomNumber();
  validFormCapacity();
});

// СРАВНЕНИЕ ТИПА ЖИЛЬЯ И ЦЕНЫ

formType.addEventListener('change', () => {
  formPrice.setAttribute('min', TYPE_OF_HOUSING[formType.value]);
  formPrice.setAttribute('placeholder', TYPE_OF_HOUSING[formType.value]);

  if(formPrice.value < TYPE_OF_HOUSING[formType.value]){
    formPrice.setCustomValidity(`Цена должна составлять не менее ${TYPE_OF_HOUSING[formType.value]}`);
  } else {
    formPrice.setCustomValidity('');
  }

  formPrice.reportValidity(); // Всегда актуальная ошибка в цене
});

// СРАВНЕНИЕ ВРЕМЕНИ ЗАЕЗДА И УЕЗДА

formTimein.addEventListener('change', () => {
  if(formTimein.value !== formTimeout.value) {
    formTimeout.value = formTimein.value;
  }
});

formTimeout.addEventListener('change', () => {
  if(formTimeout.value !== formTimein.value) {
    formTimein.value = formTimeout.value;
  }
});

const clearForm = () => {
  form.reset();
  mapFilters.reset();
  getData();
};

const resetForm = () => {
  clearForm();
  resetMarker();
};

// Сброс формы
resetButton.addEventListener('click', () => {
  resetForm();
  getError();
});

export {resetForm, form};

