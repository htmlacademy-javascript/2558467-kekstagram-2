import { postData } from './api.js';
import { resetForm } from './upload-form.js';


// Блокирует кнопку во вркмя отправки

const formSubmitButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};

const disabledButton = (text) => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = text;
};

const enableButton = (text) => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = text;
};

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

const showErrorMessage = (message) => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  document.body.append(errorTemplate);

  const errorElement = document.querySelector('.error');
  const repeatButtonElement = errorElement.querySelector('.error__button');
  const errorTitle = errorElement.querySelector('.error__title');

  errorTitle.style.lineHeight = '30px';
  errorTitle.textContent += ` : ${message}`;

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

  repeatButtonElement.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOutsideClick);
};


//Отправляет данные

const sendData = async (formData) => {
  const submitButtonElement = document.querySelector('.img-upload__submit');
  try {
    disabledButton(SubmitButtonText.SENDING);
    await postData(formData);
    enableButton(SubmitButtonText.IDLE);
    showSuccessMessage();
    resetForm();
  } catch (error) {
    //console.error(error);
    showErrorMessage(error.message);
  } finally {
    submitButtonElement.disabled = false;
  }
};

export { sendData };
