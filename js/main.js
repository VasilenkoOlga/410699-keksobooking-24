//import {createElements} from './data.js';
import './display-ads.js';
import './form.js';
import  {renderMarkers, resetMarker} from './map.js';

//createElements();

const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const MAX_ADD = 10;
const form = document.querySelector('.ad-form'); // Дублирование из формы

const clearForm = () => {
  form.reset();
//  фильтр.reset();
};

const resetForm = () => {
  clearForm();
  resetMarker();
};


const getData = () => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((offers) => {
            renderMarkers(offers.slice(0, MAX_ADD));
          });
      } else {
        showAlert('Не удалось загрузить данные');
      }
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные');},
    );
};

const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
const successClone = success.cloneNode(true); // Клонированные элементы успеха
const errorClone = error.cloneNode(true); // Клонированные элементы ошибки

const isEscapeKey = (evt) => evt.key === 'Escape'; // Утилитарная функция, нажатие на ESC

/*
const appendInBody = function (element) {  // Функция добавления информации об ошибке или удачной отправке в конец разметки
  body.appendChild(element);
  element.style.display = 'block';
  document.addEventListener('keydown',() => {
    onPopupEscKeydown;
    element.style.display = 'none';
  });
  document.addEventListener('click', () => {
    element.style.display = 'none';
  });
};
*/

const appendInBody = function (element) {  // Функция добавления информации об ошибке или удачной отправке в конец разметки, клонировала и удаляла потому что не получилось найти вариант как по другому удалить обработчики (примерно полутра суток тупила над этим вопросом .-.)
  body.appendChild(element);
  document.addEventListener('keydown',(evt) => {
    if (isEscapeKey(evt)) {
      element.remove();
    }
  });
  element.addEventListener('click', () => {
    element.remove();
  });
};

const sendData = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          appendInBody(successClone);
          resetForm();
        } else {
          appendInBody(errorClone);
        }
      })
      .catch(() => {
        appendInBody(errorClone);
      });
  });
};

getData();
sendData();
//export {getData, sendData};
//
