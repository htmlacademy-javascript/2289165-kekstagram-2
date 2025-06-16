import { FILE_TYPES, TEMPLATES } from './data.js';
import { postData } from './api.js';
import { showPopup } from './popups.js';
import { isEscapeKey } from './utils.js';
import { isValid, resetValidation } from './validation.js';
import { photoPreview, resetEffects, resetScale } from './edit-picture.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadCancelBtn = uploadForm.querySelector('.img-upload__cancel');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const submitBtn = uploadForm.querySelector('.img-upload__submit');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const closeUploadInput = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  resetValidation();
  resetScale();
  resetEffects();
};

const onUploadCancelBtnClick = () => {
  closeUploadInput();
  uploadCancelBtn.removeEventListener('click', onUploadCancelBtnClick);
};

const onUploadFormEscKeydown = () => {
  const isTextFieldOnFocus = document.activeElement === commentInput || document.activeElement === hashtagInput;
  if (isEscapeKey && !isTextFieldOnFocus) {
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

