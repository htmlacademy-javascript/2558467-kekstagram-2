import { openFullSizeView } from './fullsize-view.js';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');
const pictureFragmentElement = document.createDocumentFragment();

const addPictures = (photos) => {
  pictureFragmentElement.textContent = '';

  photos.forEach((photo) => {
    const { url, description, likes, comments } = photo;
    const pictureElement = pictureTemplateElement.cloneNode(true);

    const imageElement = pictureElement.querySelector('.picture__img');
    imageElement.src = url;
    imageElement.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    // Слушатель клика
    pictureElement.addEventListener('click', () => {
      openFullSizeView(photo);
    });

    pictureFragmentElement.appendChild(pictureElement);
  });

  picturesContainerElement.appendChild(pictureFragmentElement);
};

export { addPictures };
