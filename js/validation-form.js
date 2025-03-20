import { numDecline } from './util.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAG = 5;
let errorMessage = '';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const error = () => errorMessage;

const isHashtagsValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решетки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: 'Хештег не может быть больше 20 символов',
    },
    {
      check: inputArray.length > MAX_HASHTAG,
      error: `Нельзя указать больше ${MAX_HASHTAG} ${numDecline(
        MAX_HASHTAG, 'хештега', 'хештегов', 'хештегов')}`
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    if (rule.check) {
      errorMessage = rule.error;
    }
    return !rule.check;
  });
};

const initValidation = () => {
  pristine.addValidator(commentInput, (value) => value.length <= 140, 'Длина комментария не должна превышать 140 символов');
  pristine.addValidator(hashtagInput, isHashtagsValid, error, false);
};

const resetValidation = () => {
  pristine.reset();
};

export { initValidation, resetValidation };
