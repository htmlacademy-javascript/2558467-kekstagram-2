import { postData } from './api.js';
import { resetForm } from './upload-form.js';


// Блокирует кнопку во вркмя отправки

const formSubmitButtonElement = document.querySelector('.img-upload__submit');
const bodyElement = document.body;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...',
};

const toggleSubmitButton = (text, isDisabled) => {
  formSubmitButtonElement.disabled = isDisabled;
  formSubmitButtonElement.textContent = text;
};

// Обработчик по клавише Escape
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const messageElement = document.querySelector('.success') || document.querySelector('.error');
    if (messageElement) {
      closeMessage(messageElement);
    }
  }
};

// Обработчик по клику
const onDocumentClick = (evt) => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  if (messageElement && !evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeMessage(messageElement);
  }
};

// Закрывает сообщение
function closeMessage(messageElement) {
  if (messageElement) {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }
}

// Показывает сообщение об успехе

const showSuccessMessage = () => {
  const successTemplateElement = document.querySelector('#success').content.cloneNode(true);
  bodyElement.append(successTemplateElement);

  const successElement = document.querySelector('.success');
  const closeButtonElement = successElement.querySelector('.success__button');

  closeButtonElement.addEventListener('click', () => closeMessage(successElement));
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};


// Покажет сообщение об ошибке при отправке

const showErrorMessage = (message) => {
  const errorTemplateElement = document.querySelector('#error').content.cloneNode(true);
  document.body.append(errorTemplateElement);

  const errorElement = document.querySelector('.error');
  const closeButtonElement = errorElement.querySelector('.error__button');
  const errorTitleElement = errorElement.querySelector('.error__title');

  errorTitleElement.style.lineHeight = '30px';
  errorTitleElement.textContent += ` : ${message}`;

  closeButtonElement.addEventListener('click', () => closeMessage(errorElement));
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
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
    toggleSubmitButton(SubmitButtonText.IDLE, false);
    showErrorMessage(error.message);
  } finally {
    formSubmitButtonElement.disabled = false;
  }
};

export { sendData };
