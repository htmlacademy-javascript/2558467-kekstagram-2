import { fetchData } from './api.js';

// Покажет сообщение об ошибке при загрузке

const showDataErrorMessage = (message) => {
  const errorTemplateElement = document.querySelector('#data-error').content.cloneNode(true);
  const errorMessageElement = errorTemplateElement.querySelector('.data-error');
  const errorTitleElement = errorMessageElement.querySelector('.data-error__title');

  errorTitleElement.textContent += ` : ${message}`;
  document.body.append(errorTemplateElement);

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
