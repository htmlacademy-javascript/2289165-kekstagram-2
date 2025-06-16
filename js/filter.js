import { debounce } from './utils.js';
import { container, createPictures } from './create-pictures.js';
import { FILTERS, PICTURES_RAND_COUNT } from './data.js';

const filterBlock = document.querySelector('.img-filters');

let currentFilter = FILTERS.DEFAULT;
let pictures = [];

const clearContainer = () => container.querySelectorAll('.picture').forEach((element) => element.remove());

const createfilteredModels = (sortedData) => {
  clearContainer();
  createPictures(sortedData);
};

const debounceFilteredPictures = debounce(createfilteredModels);

const applyFilter = () => {
  let filteredPictures = [];
  if (currentFilter === FILTERS.DEFAULT) {
    filteredPictures = pictures;
  }
  if (currentFilter === FILTERS.RANDOM) {
    filteredPictures = pictures.toSorted(() => 0.5 - Math.random()).slice(0, PICTURES_RAND_COUNT);
  }
  if (currentFilter === FILTERS.DISCUSSED) {
    filteredPictures = pictures.toSorted((a, b) => b.comments.length - a.comments.length);
  }
  debounceFilteredPictures(filteredPictures);
};

const onFilterClick = (evt) => {

  const targetBtn = evt.target;
  const activeBtn = document.querySelector('.img-filters__button--active');
  if (!targetBtn.matches('button')) {
    return;
  }

  if (activeBtn === targetBtn) {
    return;
  }

  activeBtn.classList.toggle('img-filters__button--active');
  targetBtn.classList.toggle('img-filters__button--active');
  currentFilter = targetBtn.getAttribute('id');

  applyFilter();
};

export const configFilter = (pictureData) => {
  filterBlock.classList.remove('img-filters--inactive');
  filterBlock.addEventListener('click', onFilterClick);
  pictures = pictureData;
};
