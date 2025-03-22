const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectsElements = document.querySelectorAll('.effects__radio');
const effectContainerElement = document.querySelector('.img-upload__effect-level');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

const EFFECTS_MAP = {
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
  none: null
};

const updateEffect = (effect) => {
  if (effect === 'none') {
    effectContainerElement.classList.add('hidden');
    imgPreviewElement.style.filter = '';
  } else {
    const config = EFFECTS_MAP[effect];
    effectContainerElement.classList.remove('hidden');
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: { min: config.min, max: config.max },
      start: config.max,
      step: config.step
    });
    imgPreviewElement.style.filter = `${config.filter}(${config.max}${config.unit})`;
  }
};

const resetEffects = () => {
  imgPreviewElement.style.filter = '';
  imgPreviewElement.style.transform = '';

  if (effectLevelSliderElement && effectLevelSliderElement.noUiSlider) {
    effectLevelSliderElement.noUiSlider.set(0);
  }

  if (effectLevelValueElement) {
    effectLevelValueElement.value = 0;
  }

  const defaultEffect = document.querySelector('#effect-none');
  if (defaultEffect) {
    defaultEffect.checked = true;
  }

  effectContainerElement.classList.add('hidden');
};


const initEffects = () => {
  noUiSlider.create(effectLevelSliderElement, {
    range: { min: 0, max: 1 },
    start: 0.5,
    step: 0.1,
    connect: 'lower'
  });

  effectsElements.forEach((radioElement) => {
    radioElement.addEventListener('change', (event) => {
      updateEffect(event.target.value);
    });
  });

  effectLevelSliderElement.noUiSlider.on('update', (values) => {
    const effect = document.querySelector('.effects__radio:checked').value;
    if (effect !== 'none') {
      const config = EFFECTS_MAP[effect];
      effectLevelValueElement.value = values[0];
      imgPreviewElement.style.filter = `${config.filter}(${values[0]}${config.unit})`;
    }
  });

  updateEffect('none');
};


export { initEffects, resetEffects };
