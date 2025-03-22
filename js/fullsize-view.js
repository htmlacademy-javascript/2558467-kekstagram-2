import { COMMENTS_PER_PAGE } from './data.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const photoDescriptionElement = bigPictureElement.querySelector('.social__caption');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const bodyElement = document.body;

let currentComments = [];
let commentsShown = 0;


// Создаёт элемент  комментария фотокарточки
const createCommentElement = ({ avatar, message, name }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img class="social__picture"
    src="${avatar}"
    alt="${name}"
    width="35"
    height="35">
    
    <p class="social__text">
    ${message}
    </p>
  `;

  return commentElement;
};


// Делает комментарии

const loadMoreComments = () => {
  const nextComments = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PAGE);

  const fragment = document.createDocumentFragment();
  nextComments.forEach((comment) => fragment.appendChild(createCommentElement(comment)));
  commentsContainerElement.appendChild(fragment);

  commentsShown += nextComments.length;
  commentsShownCountElement.textContent = commentsShown;
  commentsTotalCountElement.textContent = currentComments.length;

  if (commentsShown >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

// Закрывает окно
const closeFullSizeView = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  commentsLoaderElement.removeEventListener('click', loadMoreComments);
  closeButtonElement.removeEventListener('click', closeFullSizeView);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    closeFullSizeView();
  }
}

const renderComments = (comments) => {
  commentsContainerElement.innerHTML = '';
  currentComments = comments;
  commentsShown = 0;

  loadMoreComments();

  commentsLoaderElement.classList.toggle('hidden', currentComments.length <= COMMENTS_PER_PAGE);
};


// Открывает окно
const openFullSizeView = ({ url, likes, comments, description }) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  bigPictureImageElement.src = url;
  likesCountElement.textContent = likes;
  photoDescriptionElement.textContent = description;

  renderComments(comments);

  commentsLoaderElement.addEventListener('click', loadMoreComments);
  closeButtonElement.addEventListener('click', closeFullSizeView);
  document.addEventListener('keydown', onDocumentKeydown);
};


export { openFullSizeView };
