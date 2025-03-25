import { postData } from './api.js';
import { resetForm } from './upload-form.js';


// Показывает сообщение об успехе

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  document.body.append(successTemplate);

  const successElement = document.querySelector('.success');
  const closeButton = successElement.querySelector('.success__button');


  const onEscPress = (event) => {
    if (event.key === 'Escape') {
      closeSuccessMessage();
    }
  };

  const onOutsideClick = (event) => {
    if (!event.target.closest('.success__inner')) {
      closeSuccessMessage();
    }
  };

  const closeSuccessMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
  };

  closeButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOutsideClick);
};


// Покажет сообщение об ошибке при отправке

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  document.body.append(errorTemplate);

  const errorElement = document.querySelector('.error');
  const closeButtonElement = errorElement.querySelector('.error__button');

  const onEscPress = (event) => {
    if (event.key === 'Escape') {
      closeErrorMessage();
    }
  };

  const onOutsideClick = (event) => {
    if (!event.target.closest('.error__inner')) {
      closeErrorMessage();
    }
  };

  const closeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
  };

  closeButtonElement.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOutsideClick);
};


//Отправляет данные

const sendData = async (formData) => {
  const submitButtonElement = document.querySelector('.img-upload__submit');
  try {
    await postData(formData);
    showSuccessMessage();
    resetForm();
  } catch (error) {
    //console.error(error);
    showErrorMessage();
  } finally {
    submitButtonElement.disabled = false;
  }
};

export { sendData };
