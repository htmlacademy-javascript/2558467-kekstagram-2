import { COMMENTS_PER_PAGE } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const photoDescription = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const body = document.body;

let currentComments = [];
let commentsShown = 0;

// Создаёт элемент фотокарточки
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

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';
  currentComments = comments;
  commentsShown = 0;
  commentsLoader.classList.remove('hidden');

  loadMoreComments();
};

const loadMoreComments = () => {
  const nextComments = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PAGE);

  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
  nextComments.forEach(comment => commentsContainer.appendChild(createCommentElement(comment)));
  commentsShown += nextComments.length;
  commentsShownCount.textContent = commentsShown;
  commentsTotalCount.textContent = currentComments.length;
};


// Открывает окно
const openFullSizeView = ({ url, likes, comments, description }) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  photoDescription.textContent = description;

  renderComments(comments);

  commentsLoader.addEventListener('click', loadMoreComments);
  closeButton.addEventListener('click', closeFullSizeView);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Закрывает окно
const closeFullSizeView = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  commentsContainer.innerHTML = '';
  commentsLoader.removeEventListener('click', loadMoreComments);

  closeButton.removeEventListener('click', closeFullSizeView);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeFullSizeView();
  }
};

export { openFullSizeView };
