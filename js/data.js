
const MAX_COMMENTS_SHOWN_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_FORMULA = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_COUNT = 5;

const ALERT_SHOW_TIME = 5000;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const TEMPLATES = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const DEFAULT_EFFECT = EFFECTS[0];

const PICTURES_RAND_COUNT = 10;

export {
  MAX_COMMENTS_SHOWN_NUMBER, MAX_COMMENT_LENGTH,
  HASHTAG_FORMULA, HASHTAGS_COUNT, ALERT_SHOW_TIME, TEMPLATES,
  EFFECTS, SCALE_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE, DEFAULT_EFFECT,
  PICTURES_RAND_COUNT, FILTERS, FILE_TYPES
};

