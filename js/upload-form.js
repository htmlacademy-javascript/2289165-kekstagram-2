import { ALERT_SHOW_TIME, FILE_TYPES, MAX_COMMENT_LENGTH, TEMPLATES } from './data.js';
import { postData } from './api.js';
import { showPopup } from './popups.js';
import { isEscapeKey } from './utils.js';
import { errorParentElementClass, errorTextClass, isValid, resetValidation } from './validation.js';
import { photoPreview, resetEffects, resetScale } from './edit-picture.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadCancelBtn = uploadForm.querySelector('.img-upload__cancel');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const submitBtn = uploadForm.querySelector('.img-upload__submit');
const errorParentElement = uploadForm.querySelector(`.${errorParentElementClass}`);

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const onCommentInputInput = (evt) => {
  if (evt.target.value.length === MAX_COMMENT_LENGTH) {
    const errorText = document.createElement('div');
    errorText.classList.add(errorTextClass);
    errorText.textContent = `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`;
    errorParentElement.appendChild(errorText);
    setTimeout(() => {
      errorText.remove();
    }, ALERT_SHOW_TIME);
  }
};

const closeUploadInput = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  resetValidation();
  resetScale();
  resetEffects();
  commentInput.removeEventListener('input', onCommentInputInput);
};

const onUploadCancelBtnClick = () => {
  closeUploadInput();
  uploadCancelBtn.removeEventListener('click', onUploadCancelBtnClick);
};

const onUploadFormEscKeydown = (evt) => {
  const isTextFieldOnFocus = document.activeElement === commentInput || document.activeElement === hashtagInput;
  if (isEscapeKey(evt) && !isTextFieldOnFocus) {
    evt.preventDefault();
    closeUploadInput();
    document.removeEventListener('keydown', onUploadFormEscKeydown);
  }
};


uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
  }
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancelBtn.addEventListener('click', onUploadCancelBtnClick);
  document.addEventListener('keydown', onUploadFormEscKeydown);
  commentInput.addEventListener('input', onCommentInputInput);
});

const blockSubmitBtn = (isBlocked = true) => {
  submitBtn.disabled = isBlocked;
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    blockSubmitBtn();
    postData(new FormData(uploadForm))
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        closeUploadInput();
        showPopup(TEMPLATES.SUCCESS);
      })
      .catch(() => {
        showPopup(TEMPLATES.ERROR);
      })
      .finally(() => {
        blockSubmitBtn(false);
      });
  }
});

