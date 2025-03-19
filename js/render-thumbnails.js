import { openFullSizeView } from './fullsize-view.js';

const pictureSample = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

const addPictures = (photos) => {
  pictureFragment.textContent = '';

  photos.forEach((photo) => {
    const { url, description, likes, comments } = photo;
    const picture = pictureSample.cloneNode(true);

    const imgElement = picture.querySelector('.picture__img');
    imgElement.src = url;
    imgElement.alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;

    // Слушатель клика
    picture.addEventListener('click', () => {
      openFullSizeView(photo);
    });

    pictureFragment.append(picture);
  });

  pictures.append(pictureFragment);
};

export { addPictures };
