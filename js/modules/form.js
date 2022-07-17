import { formValidation } from './form-validation.js';

const body = document.body;
const formElement = document.querySelector('form#upload-select-image');
const uploadElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const closeOverlayElement = overlayElement.querySelector('#upload-cancel');
const defaultImage = uploadElement.value;
const inputHashTag = overlayElement.querySelector('.text__hashtags');
const textareaComment = overlayElement.querySelector('textarea.text__description');

// Сброс инпутов
const resetInputValue = () => {
  uploadElement.value = defaultImage;
  inputHashTag.value = '';
  textareaComment.value = '';
};

// Закрытие формы
const closeForm = (evt) => {
  evt.preventDefault();
  body.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  closeOverlayElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', isEscape);
  formElement.removeEventListener('submit', formValidation);
  inputHashTag.removeEventListener('focus', onFocus);
  textareaComment.removeEventListener('focus', onFocus);
  resetInputValue();
};

// Проверка на Escape
function isEscape(evt) {
  if (evt.code === 'Escape') {
    if (inputHashTag.classList.contains('_focus') || textareaComment.classList.contains('_focus')) {
      evt.preventDefault();
    } else {
      closeForm(evt);
    }
  }
}

function onFocus(evt) {
  evt.target.classList.add('_focus');
  evt.target.addEventListener('blur', onBlur);
}

function onBlur(evt) {
  evt.target.classList.remove('_focus');
  evt.target.removeEventListener('blur', onBlur);
}

// Открытие формы
const openForm = () => {
  body.classList.add('modal-open');
  overlayElement.classList.remove('hidden');
  closeOverlayElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', isEscape);
  formElement.addEventListener('submit', formValidation);
  inputHashTag.addEventListener('focus', onFocus);
  textareaComment.addEventListener('focus', onFocus);
};

// Вызов валидации при событии
const initFormValidation = () => {
  uploadElement.addEventListener('change', openForm);
};

export { initFormValidation };
