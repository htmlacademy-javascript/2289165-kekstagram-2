import { createPictures } from './create-pictures.js';
import './upload-form.js';
import { showAlert } from './utils.js';
import {getData} from './api.js';
import { configFilter } from './filter.js';

getData()
  .then((data) => {
    createPictures(data);
    configFilter(data);
  })
  .catch(() => {
    showAlert();
  });

