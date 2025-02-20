const totaProfiles = 25;

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

// Рандомка

const getRandom = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElement = (elements) => elements[getRandom(0, elements.length - 1)];

// Делаем комментарии

const commentsArray = [];
const quantityComments = getRandom(Comments.MIN, Comments.MAX);

const getComments = (index) => {
  return {
    id: index,
    avatar: `img/avatar-${getRandom(Avatars.MIN, Avatars.MAX)}.svg`,
    message: getRandomElement(COMMENTS),
    name: getRandomElement(NAMES)
  }
};

for (let i = 0; i <= quantityComments; i++) {
  commentsArray.push(getComments(i));
}


// Делаем профили

const profilesArray = [];

const getProfile = (index) => {
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandom(Likes.MIN, Likes.MAX),
    comments: getComments()
  }
};

for (let i = 1; i <= totaProfiles; i++) {
  profilesArray.push(getProfile(i));
}
