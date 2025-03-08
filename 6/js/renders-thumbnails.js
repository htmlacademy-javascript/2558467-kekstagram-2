const pictureSample = document.querySelector('#picture').content;
const pictureFragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');


const addPictures = (profilesArray) => {
  profilesArray.forEach(({ url, description, likes, comments }) => {
    const picture = pictureSample.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments;
    pictureFragment.append(picture);
  });

  pictures.appendChild(pictureFragment);
};

export {addPictures};
