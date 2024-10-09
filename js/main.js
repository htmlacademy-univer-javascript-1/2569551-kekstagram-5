const AllPhotoCount = 25;

const Likes = {
  MIN: 15,
  MAX: 200
};

const Names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const Comments = {
  MIN: 0,
  MAX: 30
};

const Avatar = {
  MIN: 1,
  MAX: 6
};

const Messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const Description = 'Описание';

const getRandomArrayElement = (elements) => elements[getRandomIntiger(0, elements.length - 1)];

const getRandomIntiger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result)
};

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${ getRandomIntiger(Avatar.MIN, Avatar.MAX) }.svg`,
  message: getRandomArrayElement(Messages),
  name: getRandomArrayElement(Names)
});

const createPhoto = (index) => ({
  id: index,
  url: `photos/${ index }.jpg`,
  description: Description,
  likes: getRandomIntiger(Likes.MIN, Likes.MAX),
  comments: Array.from({length: getRandomIntiger(Comments.MIN, Comments.MAX)}, (_, index) => createComment(index))
})

const photoDescription = Array.from({length: AllPhotoCount}, (_, index) => createPhoto(index))
console.log(photoDescription)
