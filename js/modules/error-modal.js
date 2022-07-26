import { removeKeydownHandlerForm, addKeydownHandlerForm } from './form.js';
const body = document.body;
const errorModalElement = document.querySelector('#error').content.cloneNode(true).children[0];
const errorInnerElement = errorModalElement.children[0];
const uploadOtherFileElement = errorModalElement.querySelector('.error__button');

const onClickOutsideErrorModal = (evt) => {
  if (!errorInnerElement.contains(evt.target)) {
    removeErrorModal();
  }
};

// Проверка на Escape
const onKeydownEscape = (evt) => {
  if (evt.code === 'Escape') {
    removeErrorModal();
  }
};

function removeErrorModal() {
  errorModalElement.remove();
  uploadOtherFileElement.removeEventListener('click', removeErrorModal);
  document.removeEventListener('keydown', onKeydownEscape);
  document.removeEventListener('click', onClickOutsideErrorModal);
  addKeydownHandlerForm();
}

const openErrorModal = () => {
  body.classList.add('modal-open');
  body.appendChild(errorModalElement);
  uploadOtherFileElement.addEventListener('click', removeErrorModal);
  document.addEventListener('keydown', onKeydownEscape);
  document.addEventListener('click', onClickOutsideErrorModal);
  removeKeydownHandlerForm();
};

export { openErrorModal };
