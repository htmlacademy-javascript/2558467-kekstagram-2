const COMMENTS_PER_PAGE = 5;

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
  nextComments.forEach((comment) => fragment.append(createCommentElement(comment)));
  commentsContainerElement.append(fragment);

  commentsShown += nextComments.length;
  commentsShownCountElement.textContent = commentsShown;
  commentsTotalCountElement.textContent = currentComments.length;

  if (commentsShown >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

// Обработчик загрузки комментариев
const onCommentsLoaderClick = (evt) => {
  evt.preventDefault();
  loadMoreComments();
};

// Обработчик закрытия окна по клику
const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeFullSizeView();
};

// Обработчик закрытия окна по клику по клавише
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullSizeView();
  }
};

// Закрывает окно
function closeFullSizeView() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
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

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};


export { openFullSizeView };
