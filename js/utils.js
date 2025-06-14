import { ALERT_SHOW_TIME } from './data.js';


export const isEscapeKey = (evt) => evt.key === 'Escape';


const alertTemplate = document
  .querySelector('#data-error')
  .content.querySelector('.data-error');
const body = document.body;

export const showAlert = () => {
  const newAlert = alertTemplate.cloneNode(true);
  body.append(newAlert);
  setTimeout(() => {
    newAlert.remove();
  }, ALERT_SHOW_TIME);
};
