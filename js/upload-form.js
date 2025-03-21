import { initValidation, resetValidation } from './validation-form.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const pageBodyElement = document.querySelector('body');

const uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
const photoEditorElement = uploadFormElement.querySelector('.img-upload__overlay');
const photoEditorCloseButtonElement = photoEditorElement.querySelector('#upload-cancel');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');

const closePhotoEditor = () => {
  photoEditorElement.classList.add('hidden');
  pageBodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorCloseButtonElement.removeEventListener('click', onPhotoEditorCloseButtonClick);

  uploadFileInputElement.value = '';
  resetValidation();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    if (document.activeElement === hashtagInputElement || document.activeElement === commentInputElement) {
      evt.stopPropagation();
    } else {
      uploadFormElement.reset();
      closePhotoEditor();
    }
  }
};

const onPhotoEditorCloseButtonClick = () => closePhotoEditor();

const initUploadModal = () => {
  uploadFileInputElement.addEventListener('change', () => {
    resetValidation();
    initValidation();

    photoEditorElement.classList.remove('hidden');
    pageBodyElement.classList.add('modal-open');

    photoEditorCloseButtonElement.addEventListener('click', onPhotoEditorCloseButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

initUploadModal();

export { initUploadModal };
