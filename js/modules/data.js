import { getRandomIntInclusive } from './util.js';

// Генерация комментариев
const getComments = (countComments) => {
  const MESSAGES_BODY = [
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
  ];
  const NAMES = ['Alex', 'John', 'Scott', 'Travis', 'Jason'];
  const listComments = [];

  for (let i = 1; i <= countComments; i++) {
    listComments.push({
      id: i,
      avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
      message: MESSAGES_BODY[getRandomIntInclusive(0, 1)],
      name: NAMES[getRandomIntInclusive(0, (NAMES.length - 1))]
    });
  }
  return listComments;
};

// Генерация данных изображений
const getPictureData = (count) => {
  const picturesData = [];

  for (let i = 1; i <= count; i++) {
    picturesData.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: `Description number ${i}`,
      likes: getRandomIntInclusive(15, 200),
      comments: getComments(2),
    });
  }
  return picturesData;
};

export { getPictureData };
