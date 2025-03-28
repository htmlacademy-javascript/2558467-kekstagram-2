import { postData } from './api.js';
import { resetForm } from './upload-form.js';


// Блокирует кнопку во вркмя отправки

const formSubmitButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...',
};

const toggleSubmitButton = (text, isDisabled) => {
  formSubmitButton.disabled = isDisabled;
  formSubmitButton.textContent = text;
};

// Показывает сообщение об успехе

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  document.body.append(successTemplate);

  const successElement = document.querySelector('.success');
  const closeButton = successElement.querySelector('.success__button');


  const onSuccessMessageEscKeydown = (event) => {
    if (event.key === 'Escape') {
      closeSuccessMessage();
    }
  };

  const onSuccessMessageOutsideClick = (event) => {
    if (!event.target.closest('.success__inner')) {
      closeSuccessMessage();
    }
  };

  function closeSuccessMessage() {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
    document.removeEventListener('click', onSuccessMessageOutsideClick);
  }

  closeButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', onSuccessMessageOutsideClick);
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

  const onErrorMessageEscKeydown = (event) => {
    if (event.key === 'Escape') {
      closeErrorMessage();
    }
  };

  const onErrorMessageClick = (event) => {
    if (!event.target.closest('.error__inner')) {
      closeErrorMessage();
    }
  };

  function closeErrorMessage() {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
    document.removeEventListener('click', onErrorMessageClick);
  }

  repeatButtonElement.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorMessageClick);
};


//Отправляет данные

const sendData = async (formData) => {
  try {
    toggleSubmitButton(SubmitButtonText.SENDING, true);
    await postData(formData);
    toggleSubmitButton(SubmitButtonText.IDLE, false);
    showSuccessMessage();
    resetForm();
  } catch (error) {
    //console.error(error);
    toggleSubmitButton(SubmitButtonText.IDLE, false);
    showErrorMessage(error.message);
  } finally {
    formSubmitButton.disabled = false;
  }
};

export { sendData };
