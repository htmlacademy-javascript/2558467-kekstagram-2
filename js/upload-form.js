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
    const errorMessage = document.querySelector('.error');

    if (errorMessage) {
      errorMessage.remove();
      return;
    }

    if (document.activeElement === hashtagInputElement || document.activeElement === commentInputElement) {
      evt.stopPropagation();
    } else {
      uploadFormElement.reset();
      closePhotoEditor();
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

    photoEditorCloseButtonElement.addEventListener('click', closePhotoEditor);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};


function closePhotoEditor() {
  photoEditorElement.classList.add('hidden');
  pageBodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorCloseButtonElement.removeEventListener('click', closePhotoEditor);

  resetEffects();
  resetScale();

  uploadFileInputElement.value = '';
  resetValidation();
  clearFormFields();
}

const resetForm = () => {
  uploadFormElement.reset();
  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('#effect-none').checked = true;
  closePhotoEditor();
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
