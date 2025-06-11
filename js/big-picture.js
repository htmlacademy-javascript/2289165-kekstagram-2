import { similarPhotoSpecifications } from './create-mocks.js';
import { container } from './create-pictures.js';

const MAX_COMMENTS_SHOWN_NUMBER = 5;

const bigPicture = document.querySelector('.big-picture');
const img = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const textAboutPicture = bigPicture.querySelector('.social__caption');
const commentsCountBlock = bigPicture.querySelector('.social__comment-count');
const loadMoreCommentsBtn = bigPicture.querySelector('.comments-loader');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const oneCommentType = commentsList.querySelector(`li:nth-child(${1})`).cloneNode(true);


const getDataForPicture = (id) =>
  similarPhotoSpecifications.find((photoSpecification) =>
    Number(id) === photoSpecification.id);

const closeBigPicture = () => {
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

const onBigPictureEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
    document.removeEventListener('keydown', onBigPictureEscKeydown);
  }
};

const onCloseBtnClick = () => {
  closeBigPicture();
  closeBtn.removeEventListener('click', onCloseBtnClick);
};

const createOneComment = (comments, index) => {
  const oneComment = oneCommentType.cloneNode(true);
  oneComment.querySelector('.social__text').textContent = comments[index].message;
  oneComment.querySelector('.social__picture').src = comments[index].avatar;
  oneComment.querySelector('.social__picture').alt = comments[index].name;
  return oneComment;
};

const loadMoreComments = (comments) => {
  const fragment = document.createDocumentFragment();
  const commentsInList = commentsList.children.length;
  for (let i = commentsInList; i < Math.min(comments.length, commentsInList + MAX_COMMENTS_SHOWN_NUMBER); i++) {
    fragment.appendChild(createOneComment(comments, i));
  }

  return fragment;
};

const onLoadMoreCommentsBtnClick = (comments) => {
  commentsList.appendChild(loadMoreComments(comments));
  commentsCountBlock.innerHTML = `${commentsList.childElementCount} из ${comments.length} комментариев`;
  if (commentsList.children.length === comments.length) {
    loadMoreCommentsBtn.classList.add('hidden');
  }
};

const increaseThumbnail = ({ id, url, likes, comments, description }) => {
  document.querySelector('body').classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscKeydown);
  closeBtn.addEventListener('click', onCloseBtnClick);
  bigPicture.id = id;
  img.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  commentsList.replaceChildren();
  for (let i = 0; i < Math.min(comments.length, MAX_COMMENTS_SHOWN_NUMBER); i++) {
    commentsList.appendChild(createOneComment(getDataForPicture(bigPicture.id).comments, i));
  }
  textAboutPicture.textContent = description;

  commentsCountBlock.innerHTML = `${commentsList.childElementCount} из ${comments.length} комментариев`;
  commentsCountBlock.classList.remove('hidden');
  loadMoreCommentsBtn.classList.remove('hidden');

  if (commentsList.children.length === comments.length) {
    loadMoreCommentsBtn.classList.add('hidden');
  } else {
    loadMoreCommentsBtn.classList.remove('hidden');
  }
};

const onContainerClick = (evt) => {
  if (evt.target.className === 'picture__img') {
    increaseThumbnail(getDataForPicture(evt.target.closest('a').id));
  }
};


container.addEventListener('click', onContainerClick);
loadMoreCommentsBtn.addEventListener('click', () => onLoadMoreCommentsBtnClick(getDataForPicture(bigPicture.id).comments));

