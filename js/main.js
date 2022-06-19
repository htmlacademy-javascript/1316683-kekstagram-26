// Источник:
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  if (min >= 0) {
    if (max > min) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }
    return new Error('{max} value is less than or equal to {min}');
  }
  return new Error('The {min} value is negative');
};

const stringCheckMaxLength = (str, maxLength) => {
  if (typeof str === 'string') {
    return str.length <= maxLength;
  }
  return new Error('The first argument is not a string');
};

getRandomIntInclusive();
stringCheckMaxLength('test string', 6);

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

// Генерация данных пользователя
const getUserInfo = (count) => {
  const usersData = [];

  for (let i = 1; i <= count; i++) {
    usersData.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: `Description number ${i}`,
      likes: getRandomIntInclusive(15, 200),
      comments: getComments(getRandomIntInclusive(1, 3)),
    });
  }
  return usersData;
};

// Data Generation
getUserInfo(25);
