const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectsElements = document.querySelectorAll('.effects__radio');
const effectContainerElement = document.querySelector('.img-upload__effect-level');
const imgPreviewElement = document.querySelector('.img-upload__preview img');
const defaultEffectElement = document.querySelector('#effect-none');

const Effects = {
  CHROME: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  SEPIA: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  MARVIN: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  PHOBOS: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  HEAT: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
  NONE: null
};

const updateEffect = (effectKey) => {
  const effect = Effects[effectKey.toUpperCase()] || null;

  if (!effect) {
    effectContainerElement.classList.add('hidden');
    imgPreviewElement.style.filter = '';
    return;
  }

  effectContainerElement.classList.remove('hidden');
  effectLevelSliderElement.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    start: effect.max,
    step: effect.step
  });
  imgPreviewElement.style.filter = `${effect.filter}(${effect.max}${effect.unit})`;
};

const resetEffects = () => {
  imgPreviewElement.style.filter = '';
  imgPreviewElement.style.transform = '';

  if (effectLevelSliderElement?.noUiSlider) {
    effectLevelSliderElement.noUiSlider.set(0);
  }

  if (effectLevelValueElement) {
    effectLevelValueElement.value = 0;
  }

  if (defaultEffectElement) {
    defaultEffectElement.checked = true;
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
    const selectedEffectElement = document.querySelector('.effects__radio:checked')?.value.toUpperCase();
    const effect = Effects[selectedEffectElement] || null;

    if (effect) {
      effectLevelValueElement.value = values[0];
      imgPreviewElement.style.filter = `${effect.filter}(${values[0]}${effect.unit})`;
    }
  });

  updateEffect('NONE');
};

export { initEffects, resetEffects };
