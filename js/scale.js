const scaleControlsElement = document.querySelector('.img-upload__scale');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

let SCALE = 100;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;

const updateScale = () => {
  scaleControlValueElement.value = `${SCALE}%`;
  imgPreviewElement.style.transform = `scale(${SCALE / 100})`;
};

const onScaleButtonClick = (event) => {
  if (event.target.classList.contains('scale__control--smaller')) {
    SCALE = Math.max(MIN_SCALE, SCALE - STEP);
  } else if (event.target.classList.contains('scale__control--bigger')) {
    SCALE = Math.min(MAX_SCALE, SCALE + STEP);
  }
  updateScale();
};

const initScale = () => {
  scaleControlsElement.addEventListener('click', onScaleButtonClick);
  updateScale();
};

export { initScale };
