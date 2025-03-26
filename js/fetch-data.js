import { fetchData } from './api.js';

// Покажет сообщение об ошибке при загрузке

const showDataErrorMessage = (message) => {
  const errorTemplate = document.querySelector('#data-error').content.cloneNode(true);
  const errorMessageElement = errorTemplate.querySelector('.data-error');
  const errorTitle = errorMessageElement.querySelector('.data-error__title');

  errorTitle.textContent += ` : ${message}`;
  document.body.append(errorTemplate);

  setTimeout(() => {
    if (errorMessageElement) {
      errorMessageElement.remove();
    }
  }, 5000);
};

const getData = async () => {
  try {
    return await fetchData();
  } catch (error) {
    //console.error(error);
    showDataErrorMessage(error.message);
  }
};


export { getData };
