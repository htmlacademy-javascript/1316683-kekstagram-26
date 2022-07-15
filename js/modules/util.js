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

export { getRandomIntInclusive };
