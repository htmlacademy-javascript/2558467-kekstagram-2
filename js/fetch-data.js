import { fetchData } from './api.js';

// Покажет сообщение об ошибке при загрузке

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

const getData = async () => {
  try {
    return await fetchData();
  } catch (error) {
    //console.error(error);
    showDataErrorMessage();
  }
};


export { getData };
