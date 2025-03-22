const scaleControlsElement = document.querySelector('.img-upload__scale');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

let scale = 100;
const minScale = 25, maxScale = 100, step = 25;

const updateScale = () => {
  scaleControlValueElement.value = `${scale}%`;
  imgPreviewElement.style.transform = `scale(${scale / 100})`;
};

const onScaleButtonClick = (event) => {
  if (event.target.classList.contains('scale__control--smaller')) {
    scale = Math.max(minScale, scale - step);
  } else if (event.target.classList.contains('scale__control--bigger')) {
    scale = Math.min(maxScale, scale + step);
  }
  updateScale();
};

const initScale = () => {
  scaleControlsElement.addEventListener('click', onScaleButtonClick);
  updateScale();
};

export { initScale };
