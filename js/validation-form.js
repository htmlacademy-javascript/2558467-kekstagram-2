import { numDecline } from './util.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

let errorMessage = '';

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
});

const getErrorMessage = () => errorMessage;

const isHashtagsValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();
  const fieldWrapper = hashtagInputElement.closest('.img-upload__field-wrapper');

  if (inputText.length === 0) {
    fieldWrapper.classList.remove('img-upload__field-wrapper--error');
    return true;
  }

  const hashtags = inputText.split(/\s+/);

  const validationRules = [
    {
      check: hashtags.some((tag) => tag === '#'),
      error: 'Хештег не может состоять только из одной решетки',
    },
    {
      check: hashtags.some((tag) => tag.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: hashtags.some((tag) => tag[0] !== '#'),
      error: 'Хештег должен начинаться с символа #',
    },
    {
      check: hashtags.some((tag, index, array) => array.includes(tag, index + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: hashtags.some((tag) => tag.length > MAX_HASHTAG_LENGTH),
      error: `Хештег не может быть длиннее ${MAX_HASHTAG_LENGTH} символов`,
    },
    {
      check: hashtags.length > MAX_HASHTAG_COUNT,
      error: `Нельзя указывать больше ${MAX_HASHTAG_COUNT} ${numDecline(
        MAX_HASHTAG_COUNT, 'хештега', 'хештегов', 'хештегов')}`,
    },
    {
      check: hashtags.some((tag) => !/^#[a-zа-яё0-9]{1,19}$/i.test(tag)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];

  const isValid = validationRules.every((rule) => {
    if (rule.check) {
      errorMessage = rule.error;
    }
    return !rule.check;
  });

  fieldWrapper.classList.toggle('img-upload__field-wrapper--error', !isValid);
  return isValid;
};

const initValidation = () => {
  pristine.addValidator(
    commentInputElement,
    (value) => value.length <= MAX_COMMENT_LENGTH,
    `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`
  );
  pristine.addValidator(hashtagInputElement, isHashtagsValid, getErrorMessage, false);
};

const resetValidation = () => {
  pristine.reset();
};

export { initValidation, resetValidation };
