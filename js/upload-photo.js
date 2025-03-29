const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileInputElement = document.querySelector('#upload-file');
const previewImageElement = document.querySelector('.img-upload__preview img');
const effectsPreviewElements = document.querySelectorAll('.effects__preview'); // Миниатюры фильтров

fileInputElement.addEventListener('change', () => {
  const file = fileInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const imageUrl = URL.createObjectURL(file);
    previewImageElement.src = imageUrl;

    // Применяем к изображению фильтров
    effectsPreviewElements.forEach((effect) => {
      effect.style.backgroundImage = `url(${imageUrl})`;
    });
  }
});

export { fileInputElement };
