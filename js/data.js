const DESCRIPTIONS_PHOTO = [
  'Момент, запечатленный навсегда.',
  'Просто красота.',
  'Неутолимый голод открытий.',
  'Взгляд в прошлое.',
  'Один день из жизни.',
  'Проживая ложь.',
  'Деталь, которую стоит заметить.',
  'История в одном кадре.',
  'Моменты счастья.',
  'Просто волшебно.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USER_NAMES = [
  'Милана',
  'Всеволод',
  'Егор',
  'Валерия',
  'Иван',
  'Арина',
  'Надежда',
  'Мирослава',
  'Анна',
  'Артур',
];

const MAX_PHOTO_ID = 25;
const MAX_COMMENT_ID = 4096;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS_NUMBER = 30;
const MAX_COMMENTS_SHOWN_NUMBER = 5;
const MAX_AVATAR_NUMBER = 6;
const SIMILAR_PHOTO_SPECIFICATION_COUNT = 25;
const MAX_COMMENT_LENGTH = 10;//140
const HASHTAG_FORMULA = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_COUNT = 5;

const ALERT_SHOW_TIME = 5000;

const TEMPLATES = {
  SUCCESS: 'success',
  ERROR: 'error'
};

export {
  DESCRIPTIONS_PHOTO, MESSAGES, USER_NAMES, MAX_PHOTO_ID,
  MAX_COMMENT_ID, MIN_LIKES, MAX_LIKES, MAX_COMMENTS_NUMBER,
  MAX_COMMENTS_SHOWN_NUMBER, MAX_AVATAR_NUMBER,
  SIMILAR_PHOTO_SPECIFICATION_COUNT, MAX_COMMENT_LENGTH,
  HASHTAG_FORMULA, HASHTAGS_COUNT, ALERT_SHOW_TIME, TEMPLATES
};

