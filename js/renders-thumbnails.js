import { openFullSizeView } from './fullsize-view.js';

const pictureSample = document.querySelector('#picture').content;
const pictures = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

const addPictures = (profilesArray) => {

  profilesArray.forEach((profile) => {
    const { url, description, likes, comments } = profile;
    const picture = pictureSample.cloneNode(true);

    const imgElement = picture.querySelector('.picture__img');
    imgElement.src = url;
    imgElement.alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;

    // Слушатель клика
    picture.querySelector('.picture').addEventListener('click', () => {
      openFullSizeView(profile);
    });

    pictureFragment.append(picture);
  });

  pictures.append(pictureFragment);
};

export { addPictures };
