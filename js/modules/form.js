import { formValidation } from './pristine.js';

const body = document.body;
const formElement = document.querySelector('form#upload-select-image');
const uploadElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const closeOverlayElement = overlayElement.querySelector('#upload-cancel');
const defaultImage = uploadElement.value;
const inputHashTag = overlayElement.querySelector('.text__hashtags');
const textareaComment = overlayElement.querySelector('textarea.text__description');

// const formValidation = () => {
// const strHashTagArr = inputHashTag.value.split(' ');
// Проверка что каждый хештег начинается с #
// const isStartSharp = strHashTagArr.every((hashTag) => hashTag[0] === '#');
// if (!isStartSharp) {
//   console.error('Хештег начинается не с "#"');
// }
// };

const form = () => {

  const resetInputValue = () => {
    uploadElement.value = defaultImage;
    inputHashTag.value = '';
    textareaComment.value = '';
  };

  const submitForm = (evt) => {
    evt.preventDefault();
    formValidation(formElement);
  };

  const closeForm = (evt) => {
    evt.preventDefault();
    body.classList.remove('modal-open');
    overlayElement.classList.add('hidden');
    closeOverlayElement.removeEventListener('click', closeForm);
    document.removeEventListener('keydown', isEscape);
    formElement.removeEventListener('submit', submitForm);
    resetInputValue();
  };

  function isEscape(evt) {
    if (evt.code === 'Escape') {
      closeForm(evt);
    }
  }

  const openForm = () => {
    body.classList.add('modal-open');
    overlayElement.classList.remove('hidden');
    closeOverlayElement.addEventListener('click', closeForm);
    document.addEventListener('keydown', isEscape);
    formElement.addEventListener('submit', submitForm);
  };

  uploadElement.addEventListener('change', openForm);
};

export { form };
