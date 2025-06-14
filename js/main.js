import { createPictures } from './create-pictures.js';
import './upload-form.js';
import { showAlert } from './utils.js';
import {getData} from './api.js';

getData()
  .then((data) => {
    createPictures(data);
  })
  .catch(() => {
    showAlert();
  });

