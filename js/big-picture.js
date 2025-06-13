import { MAX_COMMENTS_SHOWN_NUMBER } from './data.js';
import { isEscapeKey } from './utils.js';


const bigPicture = document.querySelector('.big-picture');
const img = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const textAboutPicture = bigPicture.querySelector('.social__caption');
const shownCountComments = bigPicture.querySelector('.social__comment-shown-count');
const loadMoreCommentsBtn = bigPicture.querySelector('.comments-loader');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const oneCommentType = commentsList.querySelector(`li:nth-child(${1})`).cloneNode(true);
const body = document.body;

let localComments;
let renderedCount = 0;


const toggleBigPicture = (isOpened = true) => {
  if (isOpened) {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  } else {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
};

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    toggleBigPicture(false);
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  }
};

const onCloseBtnClick = () => toggleBigPicture(false);

const createOneComment = ({message, avatar, name}) => {
  const oneComment = oneCommentType.cloneNode(true);
  oneComment.querySelector('.social__text').textContent = message;
  oneComment.querySelector('.social__picture').src = avatar;
  oneComment.querySelector('.social__picture').alt = name;
  return oneComment;
};

const renderStatistic = () => {
  shownCountComments.textContent = renderedCount;
};

const renderLoader = () => {
  if (localComments.length) {
    loadMoreCommentsBtn.classList.remove('hidden');
  } else {
    loadMoreCommentsBtn.classList.add('hidden');
  }
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  localComments.splice(0, MAX_COMMENTS_SHOWN_NUMBER).forEach((item) => {
    fragment.append(createOneComment(item));
    renderedCount++;
  });
  commentsList.append(fragment);
  renderStatistic();
  renderLoader();
};

export const increaseThumbnail = ({ url, likes, comments, description }) => {
  toggleBigPicture();
  document.addEventListener('keydown', onBigPictureEscKeydown);

  img.src = url;
  textAboutPicture.textContent = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  commentsList.replaceChildren();
  localComments = [...comments];
  renderedCount = 0;
  renderComments();
};

closeBtn.addEventListener('click', onCloseBtnClick);
loadMoreCommentsBtn.addEventListener('click', () => renderComments());

