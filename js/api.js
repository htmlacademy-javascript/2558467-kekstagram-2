const API_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const fetchData = async () => {
  const response = await fetch(`${API_URL}/data`);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки данных: ${response.status}`);
  }
  return response.json();
};

const postData = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Ошибка отправки данных: ${response.status}`);
  }
};

export { fetchData, postData };
