import {showMarkers} from './map.js';
import {resetForm, form} from './form.js';
import {showAlert,successClone, errorClone, appendInBody} from './popup.js';

const SAVE_FORM_URL = 'https://24.javascript.pages.academy/keksobooking';
const DATE_MAP_URL = 'https://24.javascript.pages.academy/keksobooking/data';

const getData = () => {
  fetch(DATE_MAP_URL)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((offers) => {
            showMarkers(offers);
          });
      } else {
        showAlert('Не удалось загрузить данные');
      }
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные');},
    );
};

const sendData = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      SAVE_FORM_URL,
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

export {sendData, getData};
