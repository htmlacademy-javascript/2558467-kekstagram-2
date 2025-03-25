
// Отображает сообщение об ошибке при загрузке

const showDataErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error').content.cloneNode(true);
  document.body.append(errorTemplate);

  setTimeout(() => {
    const errorMessage = document.querySelector('.data-error');
    if (errorMessage) {
      errorMessage.remove();
    }
  }, 5000);
};


// Отображает сообщение об ошибке при отправке
const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  document.body.append(errorTemplate);

  const errorElement = document.querySelector('.error');
  const closeButtonElement = errorElement.querySelector('.error__button');

  const closeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
  };

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

  closeButtonElement.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOutsideClick);
};

export { showDataErrorMessage, showErrorMessage };
