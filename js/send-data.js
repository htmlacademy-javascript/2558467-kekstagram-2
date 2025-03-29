import { postData } from './api.js';
import { resetForm } from './upload-form.js';


// Блокирует кнопку во вркмя отправки

const formSubmitButtonElement = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...',
};

const toggleSubmitButton = (text, isDisabled) => {
  formSubmitButtonElement.disabled = isDisabled;
  formSubmitButtonElement.textContent = text;
};

// Показывает сообщение об успехе

const showSuccessMessage = () => {
  const successTemplateElement = document.querySelector('#success').content.cloneNode(true);
  document.body.append(successTemplateElement);

  const successElement = document.querySelector('.success');
  const closeButtonElement = successElement.querySelector('.success__button');


  const onDocumentKeydown = (event) => {
    if (event.key === 'Escape') {
      onCloseButtonClick();
    }
  };

  const onDocumentClick = (event) => {
    if (!event.target.closest('.success__inner')) {
      onCloseButtonClick();
    }
  };

  function onCloseButtonClick() {
    successElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};


// Покажет сообщение об ошибке при отправке

const showErrorMessage = (message) => {
  const errorTemplateElement = document.querySelector('#error').content.cloneNode(true);
  document.body.append(errorTemplateElement);

  const errorElement = document.querySelector('.error');
  const repeatButtonElement = errorElement.querySelector('.error__button');
  const errorTitleElement = errorElement.querySelector('.error__title');

  errorTitleElement.style.lineHeight = '30px';
  errorTitleElement.textContent += ` : ${message}`;

  const onErrorMessageEscKeydown = (event) => {
    if (event.key === 'Escape') {
      onRepeatButtonClick();
    }
  };

  const onErrorMessageClick = (event) => {
    if (!event.target.closest('.error__inner')) {
      onRepeatButtonClick();
    }
  };

  function onRepeatButtonClick() {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
    document.removeEventListener('click', onErrorMessageClick);
  }

  repeatButtonElement.addEventListener('click', onRepeatButtonClick);
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
    formSubmitButtonElement.disabled = false;
  }
};

export { sendData };
