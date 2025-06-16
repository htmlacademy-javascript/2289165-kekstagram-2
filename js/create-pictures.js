import { increaseThumbnail } from './big-picture.js';

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
let localPhotos;

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  const img = thumbnail.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.id = id;
  return thumbnail;
};

const createPictures = (pictureSpecification) => {
  localPhotos = [...pictureSpecification];
  const fragment = document.createDocumentFragment();

  pictureSpecification.forEach((specification) => {
    fragment.appendChild(createThumbnail(specification));
  });

  container.appendChild(fragment);
};


const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    const id = Number(thumbnail.dataset.id);
    const photo = localPhotos.find((item) => item.id === id);
    increaseThumbnail(photo);
  }
};


container.addEventListener('click', onContainerClick);

export { createPictures, container };
