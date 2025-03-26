import { postData } from './api.js';
import { resetForm } from './upload-form.js';


// Блокирует кнопку во вркмя отправки

const formSubmitButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...',
};

const disabledButton = (text, isDisabled) => {
  formSubmitButton.disabled = isDisabled;
  formSubmitButton.textContent = text;
};

// Показывает сообщение об успехе

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  document.body.append(successTemplate);

  const successElement = document.querySelector('.success');
  const closeButton = successElement.querySelector('.success__button');


  const closeSuccessMessageOnEsc = (event) => {
    if (event.key === 'Escape') {
      closeSuccessMessage();
    }
  };

  const closeSuccessMessageOnClick = (event) => {
    if (!event.target.closest('.success__inner')) {
      closeSuccessMessage();
    }
  };

  const closeSuccessMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', closeSuccessMessageOnEsc);
    document.removeEventListener('click', closeSuccessMessageOnClick);
  };

  closeButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', closeSuccessMessageOnEsc);
  document.addEventListener('click', closeSuccessMessageOnClick);
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

  const closeErrorMessageOnEsc = (event) => {
    if (event.key === 'Escape') {
      closeErrorMessage();
    }
  };

  const closeErrorMessageOnClick = (event) => {
    if (!event.target.closest('.error__inner')) {
      closeErrorMessage();
    }
  };

  const closeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', closeErrorMessageOnEsc);
    document.removeEventListener('click', closeErrorMessageOnClick);
  };

  repeatButtonElement.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', closeErrorMessageOnEsc);
  document.addEventListener('click', closeErrorMessageOnClick);
};


//Отправляет данные

const sendData = async (formData) => {
  const submitButtonElement = document.querySelector('.img-upload__submit');
  try {
    disabledButton(SubmitButtonText.SENDING, true);
    await postData(formData);
    disabledButton(SubmitButtonText.IDLE, false);
    showSuccessMessage();
    resetForm();
  } catch (error) {
    //console.error(error);
    disabledButton(SubmitButtonText.IDLE, false);
    showErrorMessage(error.message);
  } finally {
    submitButtonElement.disabled = false;
  }
};

export { sendData };
