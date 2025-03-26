const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;

const scaleControlsElement = document.querySelector('.img-upload__scale');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

let scale = 100;

const updateScale = () => {
  scaleControlValueElement.value = `${scale}%`;
  imgPreviewElement.style.transform = `scale(${scale / 100})`;
};

const onScaleButtonClick = (event) => {
  if (event.target.classList.contains('scale__control--smaller')) {
    scale = Math.max(MIN_SCALE, scale - STEP);
  } else if (event.target.classList.contains('scale__control--bigger')) {
    scale = Math.min(MAX_SCALE, scale + STEP);
  }
  updateScale();
};

const initScale = () => {
  scaleControlsElement.addEventListener('click', onScaleButtonClick);
  updateScale();
};

const resetScale = () => {
  scale = 100;
  updateScale();
};

export { initScale, resetScale };
