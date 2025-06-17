import { HASHTAG_FORMULA, HASHTAGS_COUNT, MAX_COMMENT_LENGTH } from './data.js';

const errorParentElementClass = 'img-upload__field-wrapper';
const errorTextClass = 'img-upload__field-wrapper--error';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: errorParentElementClass,
  errorTextParent: errorParentElementClass,
  errorTextClass: errorTextClass
});

const validateComment = (comment) => comment.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  commentInput,
  validateComment,
  `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`
);

const getHashtags = (value) => value.toLowerCase()
  .split(' ')
  .filter((item) => item.length);

const validateHashtag = (hashtagText) => {
  if (hashtagText.trim() === '') {
    return true;
  }

  const hashtags = getHashtags(hashtagText);
  return hashtags.every((hashtag) => HASHTAG_FORMULA.test(hashtag));
};

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  `Хэштег начинается с символа # (решётка);
   Строка после # должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
   Хеш-тег не может состоять только из одной решётки;
   Максимальная длина одного хэштега 20 символов, включая решётку`
);

const checkHashtagsCount = (hashtagText) => {
  if (!hashtagText.trim().length) {
    return true;
  }
  const hashtags = getHashtags(hashtagText);
  return hashtags.length <= HASHTAGS_COUNT;
};

pristine.addValidator(
  hashtagInput,
  checkHashtagsCount,
  `Количество хештегов не должно превышать ${HASHTAGS_COUNT}`
);

const checkUniques = (hashtagText) => {
  if (!hashtagText.trim().length) {
    return true;
  }

  const hashtags = getHashtags(hashtagText);
  return hashtags.length === new Set(hashtags).size;
};

pristine.addValidator(
  hashtagInput,
  checkUniques,
  'Хештеги не должны повторяться'
);


export const isValid = () => pristine.validate();
export const resetValidation = () => {
  pristine.reset();
};

export {
  errorParentElementClass, errorTextClass
};
