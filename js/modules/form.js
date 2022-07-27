import { initScale, removeScaleHandlers } from './scale.js';
import { openSlider, closeSlider, resetAllFilters } from './filter.js';
import { formValidation } from './form-validation.js';
const body = document.body;
const formElement = document.querySelector('form#upload-select-image');
const uploadElement = formElement.querySelector('#upload-file');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const closeOverlayElement = overlayElement.querySelector('#upload-cancel');
const inputHashTag = overlayElement.querySelector('.text__hashtags');
const textareaComment = overlayElement.querySelector('textarea.text__description');

// Сброс инпутов
const resetFormData = () => {
  uploadElement.value = '';
  inputHashTag.value = '';
  textareaComment.value = '';
  resetAllFilters();
};

const removeKeydownHandlerForm = () => {
  document.removeEventListener('keydown', onKeydownEscape);
};

const addKeydownHandlerForm = () => {
  document.addEventListener('keydown', onKeydownEscape);
};

// Закрытие формы
const closeForm = (evt) => {
  if (evt) { evt.preventDefault(); }
  body.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  closeOverlayElement.removeEventListener('click', closeForm);
  removeKeydownHandlerForm();
  formElement.removeEventListener('submit', formValidation);
  inputHashTag.removeEventListener('focus', onFocusInput);
  textareaComment.removeEventListener('focus', onFocusInput);
  resetFormData();
  removeScaleHandlers();
  closeSlider();
};

// Проверка на Escape
function onKeydownEscape(evt) {
  if (evt.code === 'Escape') {
    if (inputHashTag.classList.contains('_focus') || textareaComment.classList.contains('_focus')) {
      evt.preventDefault();
    } else {
      closeForm(evt);
    }
  }
}

function onFocusInput(evt) {
  evt.target.classList.add('_focus');
  evt.target.addEventListener('blur', onBlurInput);
}

function onBlurInput(evt) {
  evt.target.classList.remove('_focus');
  evt.target.removeEventListener('blur', onBlurInput);
}

// Открытие формы
const openForm = () => {
  initScale();
  openSlider();
  body.classList.add('modal-open');
  overlayElement.classList.remove('hidden');
  closeOverlayElement.addEventListener('click', closeForm);
  addKeydownHandlerForm();
  formElement.addEventListener('submit', formValidation);
  inputHashTag.addEventListener('focus', onFocusInput);
  textareaComment.addEventListener('focus', onFocusInput);
};

// Открытие формы при 'change' у инпута
const onChangeForm = () => {
  uploadElement.addEventListener('change', openForm);
};

export { onChangeForm, resetFormData, closeForm, removeKeydownHandlerForm, addKeydownHandlerForm };
