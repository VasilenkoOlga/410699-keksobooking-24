import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 5000;

const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
const successClone = success.cloneNode(true); // Клонированные элементы успеха
const errorClone = error.cloneNode(true); // Клонированные элементы ошибки


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

const showAlert = (message) => { //СООБЩЕНИЕ ОБ ОШИБКЕ
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

export {showAlert,successClone, errorClone, appendInBody};
