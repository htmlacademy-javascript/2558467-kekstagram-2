import { getRandom, getRandomElement } from './util.js';

const TOTAL_ITEM = 25;
const COMMENTS_PER_PAGE = 5;

const NAMES = [
  'Дима',
  'ТерминаТОрР',
  'Темщик Саня',
  'Елена Владимировна',
  'Расул',
  'Транспортная компания Пегас',
  'Мёртвый Анархист',
  'Лергей Савров'
];

const DESCRIPTIONS = [
  'Глубоко',
  'Мрачно',
  'Апокрифично',
  'Это моя Родина',
  'Вот тут это всё и произошло...',
  'Как вам, неудачники?',
  'Если кто то плюёт вам в спину, поздравляю, вы впереди!(с)Сократ Великий',
  'Работайте, Братья'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре.',
  'У меня получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены.',
  'Как можно было поймать такой неудачный момент?!',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


const Avatars = {
  MIN: 1,
  MAX: 6
};

const Likes = {
  MIN: 15,
  MAX: 200
};

const Comments = {
  MIN: 0,
  MAX: 30
};


// Делаем комментарии

const createComment = (photoIndex, commentIndex) => {
  return {
    id: Number(`${photoIndex}${commentIndex}`),
    avatar: `img/avatar-${getRandom(Avatars.MIN, Avatars.MAX)}.svg`,
    message: getRandomElement(COMMENTS),
    name: getRandomElement(NAMES),
  };
};


const getComments = (photoIndex) => {
  const commentsArray = [];
  const quantityComments = getRandom(Comments.MIN, Comments.MAX);

  for (let i = 0; i < quantityComments; i++) {
    commentsArray.push(createComment(photoIndex, i));
  }

  return commentsArray;
};


// Делаем профили


const getPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likes: getRandom(Likes.MIN, Likes.MAX),
  comments: getComments(index)
});

const createPhotoArray = () => Array.from({ length: TOTAL_ITEM }, (_, index) => getPhoto(index)
);

export { createPhotoArray, COMMENTS_PER_PAGE };
