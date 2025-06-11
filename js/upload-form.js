const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadCancelBtn = uploadForm.querySelector('.img-upload__cancel');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const submitBtn = uploadForm.querySelector('.img-upload__submit');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'error__title'
});

const closeUploadInput = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = undefined;
};

const onUploadCancelBtnClick = () => {
  closeUploadInput();
  uploadCancelBtn.removeEventListener('click', onUploadCancelBtnClick);
};

const onUploadFormEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const isTextFieldOnFocus = document.activeElement === commentInput || document.activeElement === hashtagInput;
    if (isTextFieldOnFocus) {
      evt.stopPropagation();
    } else {
      closeUploadInput();
      document.removeEventListener('keydown', onUploadFormEscKeydown);
    }
  }
};

uploadInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancelBtn.addEventListener('click', onUploadCancelBtnClick);
  document.addEventListener('keydown', onUploadFormEscKeydown);
});

const validateComment = (comment) => {
  if (comment.length >= 140) {
    return false;
  }

  return true;
};

pristine.addValidator(commentInput,
  validateComment,
  'Некорректный комментарий'
);

const validateHashtag = (hashtagText) => {
  if (hashtagText === '') {
    return true;
  }

  const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = hashtagText.split(' ');

  if (hashtags.length !== new Set(hashtags).size) {
    return false;
  }

  for (const hashtag of hashtags) {
    const isValue = hashtagRegExp.test(hashtag);
    if (!isValue) {
      return false;
    }

    if (hashtags.length >= 6) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(hashtagInput,
  validateHashtag,
  'Некорректный хештэг'
);


uploadForm.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValide = pristine.validate();
  if (isValide) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});

