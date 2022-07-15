const formElement = document.querySelector('form#upload-select-image');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const inputHashTag = overlayElement.querySelector('.text__hashtags');
const textareaComment = overlayElement.querySelector('textarea.text__description');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
};

const pristine = new Pristine(formElement, pristineConfig);

// Function Validator
const regexp = /#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const stringCheckMaxLength = (str, maxLength = 140) => str.length <= maxLength;

// Проверка на первый символ '#'
const checkSharp = (str) => {
  const hashTags = str.split(' ');
  return hashTags.every((hash) => hash !== '' ? hash[0] === '#' : true);
};

// Строка после решётки должна состоять из букв и чисел и не может содержать пробелы,
// спецсимволы(#, @, $ и т.п.), символы пунктуации(тире, дефис, запятая и т.п.), эмодзи и т.д.;
const checkValidStr = (str) => {
  const hashTags = str.split(' ');
  return hashTags.every((hash) => !checkSharp(str) || (hash !== '' ? regexp.test(hash) : true));
};

// Проверка на пробел вконце хештега
const checkEmptySymbol = (str) => {
  const hashTags = str.trim().split(' ');
  console.log(hashTags);
  // return hashTags.every(() => str[str.length - 1] !== ' ');
};

// HashTag Validator
pristine.addValidator(
  inputHashTag,
  checkSharp,
  'ERROR: Хеш-тег должен начинаться с символа "#"'
);

pristine.addValidator(
  inputHashTag,
  checkValidStr,
  `ERROR: Хеш-тег должен состоять из букв и чисел и не может содержать пробелы,
  спецсимволы, также не должен превышать 20 символов`
);

pristine.addValidator(
  inputHashTag,
  checkEmptySymbol,
  'ERROR: В конце Хеш-тега не может быть пробела.'
);

// TextAREA
pristine.addValidator(
  textareaComment,
  stringCheckMaxLength,
  'Длина комментария не может составлять больше 140 символов'
);

export { pristine };
