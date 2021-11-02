//import {createElements} from './data.js';
import './display-ads.js';
import './form.js';
import {sendData, getData} from './api.js';

//createElements();

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

getData();
sendData();
//export {getData, sendData};
//
