const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

const form = document.querySelector('.ad-form');
const formTitle = form.querySelector('#title');
const formPrice = form.querySelector('#price');
const formRoomNumber = form.querySelector('#room_number');
const formCapacity = form.querySelector('#capacity');

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
  } else {
    formPrice.setCustomValidity('');
  }
  formPrice.reportValidity();
});

// СРАВНЕНИЕ КОМНАТ И КОЛИЧЕСТВА ГОСТЕЙ

formRoomNumber.addEventListener('change', () => {

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
});

// СРАВНЕНИЕ КОЛИЧЕСТВА ГОСТЕЙ И КОЛИЧЕСТВА КОМНАТ

formCapacity.addEventListener('change', () => {

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
});