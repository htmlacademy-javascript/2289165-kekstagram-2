import { TEMPLATES } from './data.js';
import { isEscapeKey } from './utils.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.body;

const templates = {
  [TEMPLATES.SUCCESS]: successTemplate,
  [TEMPLATES.ERROR]: errorTemplate
};

const onPopupEscapeKeydown = (type, evt) => {
  if (isEscapeKey) {
    // evt.preventDefault();
    const element = body.querySelector('.' + type);
    element.remove();
  }
};

export const showPopup = (type) => {
  const popup = templates[type].cloneNode(true);
  body.append(popup);
  popup.addEventListener('click', ({ target }) => {
    if (target.classList.contains(`${type}__button`) || target.classList.contains(type)) {
      popup.remove();
    }
  });
  document.addEventListener('keydown', () => onPopupEscapeKeydown(type));
};
