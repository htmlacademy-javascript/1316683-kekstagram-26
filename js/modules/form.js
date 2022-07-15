import { pristine } from './pristine.js';

const body = document.body;
const formElement = document.querySelector('form#upload-select-image');
const uploadElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const closeOverlayElement = overlayElement.querySelector('#upload-cancel');
const defaultImage = uploadElement.value;
const inputHashTag = overlayElement.querySelector('.text__hashtags');
const textareaComment = overlayElement.querySelector('textarea.text__description');

const resetInputValue = () => {
  uploadElement.value = defaultImage;
  inputHashTag.value = '';
  textareaComment.value = '';
};

const formValidation = (evt) => {
  evt.preventDefault();
  const isFormValid = pristine.validate();

  if (isFormValid) {
    alert('OK');
  } else {
    alert('ERR');
  }
};

const closeForm = (evt) => {
  evt.preventDefault();
  body.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  closeOverlayElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', isEscape);
  formElement.removeEventListener('submit', formValidation);
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
  formElement.addEventListener('submit', formValidation);
};

const initFormValidation = () => {
  uploadElement.addEventListener('change', openForm);
};

export { initFormValidation };
