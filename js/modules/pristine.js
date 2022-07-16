const formElement = document.querySelector('form#upload-select-image');
const inputHashTag = formElement.querySelector('input.text__hashtags');
const textareaComment = formElement.querySelector('textarea.text__description');

// PRISTINE CONFIG
const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
};
// PRISTINE INIT
const pristine = new Pristine(formElement, pristineConfig);

// Проверка на пустое поле
const isEmptyInput = () => inputHashTag.value.length === 0;

// ДОБАВЛЕНИЕ ВАЛИДАТОРОВ
// 6. Хэш-теги разделяются пробелами;
const checkSpaceInterval = (str) => {
  const hashTags = str.trim().split(' ');
  return !hashTags.some((hash) => hash.split('#').length > 2);
};

pristine.addValidator(
  inputHashTag,
  checkSpaceInterval,
  'ERROR: Хэш-теги должны разделяться пробелами'
);
// 6. Нельзя указать больше пяти хэш-тегов
const maxLengthHashTag = (str) => {
  const hashTags = str.trim().split(' ');
  return !(hashTags.length > 5);
};

pristine.addValidator(
  inputHashTag,
  maxLengthHashTag,
  'ERROR: Нельзя указать больше пяти хэш-тегов;'
);
// 5.1 Один и тот же хэш-тег не может быть использован дважды
// 5.2 Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом
const checkDoubleHashTag = (str) => {
  const hashTags = str.trim().toLowerCase().split(' ');
  return !hashTags.some(
    (hash) => hashTags.indexOf(hash) !== hashTags.lastIndexOf(hash)
  );
};

pristine.addValidator(
  inputHashTag,
  checkDoubleHashTag,
  'ERROR: Один и тот же хэш-тег не может быть использован дважды (хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом)'
);
// 4. максимальная длина одного хэш-тега 20 символов, включая решётку
const checkMaxLengthHash = (str) => {
  const hashTags = str.trim().split(' ');
  return !hashTags.some((hash) => hash.length > 20);
};

pristine.addValidator(
  inputHashTag,
  checkMaxLengthHash,
  'ERROR: Максимальная длина одного хэш-тега 20 символов'
);
// 3. Хеш-тег не может состоять только из одной решётки
const checkSharpOnly = (str) => {
  const hashTags = str.trim().split(' ');
  return !hashTags.some((hash) => hash.length === 1 && hash[0] === '#');
};

pristine.addValidator(
  inputHashTag,
  checkSharpOnly,
  'ERROR: Хеш-тег не может состоять только из одной решётки'
);
/* 2. Строка после решётки должна состоять из букв и чисел и не может содержать пробелы,
спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.; */
const checkHashFull = (str) => {
  const regexp = /^#[A-Za-zА-Яа-яЁё0-9]{1,}$/;
  const hashTags = str.trim().split(' ');
  return hashTags.every((hash) => regexp.test(hash) || isEmptyInput());
};

pristine.addValidator(
  inputHashTag,
  checkHashFull,
  'ERROR: Хеш-тег должен состоять из букв и чисел и не может содержать спец.символы'
);
// 1. Хэш-тег начинается с символа # (решётка);
const checkSharpStart = (str) => {
  const hashTags = str.trim().split(' ');
  return hashTags.every((hash) => (hash[0] === '#') || isEmptyInput());
};

pristine.addValidator(
  inputHashTag,
  checkSharpStart,
  'ERROR: Каждый Хеш-тег должен начинаться с символа "#"'
);

// Длина комментария не может составлять больше 140 символов
const stringCheckMaxLength = (str, maxLength = 140) => str.length <= maxLength;

pristine.addValidator(
  textareaComment,
  stringCheckMaxLength,
  'Длина комментария не может составлять больше 140 символов'
);

export { pristine };
