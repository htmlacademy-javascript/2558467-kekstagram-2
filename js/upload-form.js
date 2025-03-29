import { initValidation, resetValidation, pristine } from './validation-form.js';
import { resetEffects } from './effect.js';
import { resetScale } from './scale.js';
import { sendData } from './send-data.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const pageBodyElement = document.querySelector('body');

const uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
const photoEditorElement = uploadFormElement.querySelector('.img-upload__overlay');
const photoEditorCloseButtonElement = photoEditorElement.querySelector('#upload-cancel');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const effectNoneElement = document.querySelector('#effect-none');

const clearFormFields = () => {
  hashtagInputElement.value = '';
  commentInputElement.value = '';

  const hashtagWrapper = hashtagInputElement.closest('.img-upload__field-wrapper');
  const commentWrapper = commentInputElement.closest('.img-upload__field-wrapper');

  hashtagWrapper?.classList.remove('img-upload__field-wrapper--error');
  commentWrapper?.classList.remove('img-upload__field-wrapper--error');
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    const errorMessageElement = document.querySelector('.error');

    if (errorMessageElement) {
      errorMessageElement.remove();
      return;
    }

    if (document.activeElement === hashtagInputElement || document.activeElement === commentInputElement) {
      evt.stopPropagation();
    } else {
      uploadFormElement.reset();
      onPhotoEditorCloseButtonClick();
    }
  }
};

const initUploadModal = () => {
  uploadFileInputElement.addEventListener('change', () => {
    resetValidation();
    initValidation();
    clearFormFields();

    photoEditorElement.classList.remove('hidden');
    pageBodyElement.classList.add('modal-open');

    photoEditorCloseButtonElement.addEventListener('click', onPhotoEditorCloseButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

function onPhotoEditorCloseButtonClick() {
  photoEditorElement.classList.add('hidden');
  pageBodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorCloseButtonElement.removeEventListener('click', onPhotoEditorCloseButtonClick);

  resetEffects();
  resetScale();

  uploadFileInputElement.value = '';
  resetValidation();
  clearFormFields();
}

const resetForm = () => {
  uploadFormElement.reset();
  scaleControlValueElement.value = '100%';
  effectNoneElement.checked = true;
  onPhotoEditorCloseButtonClick();
};

uploadFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  sendData(new FormData(uploadFormElement));
});

initUploadModal();

export { resetForm, uploadFormElement };
