const body = document.body;
const successModalElement = document.querySelector('#success').content.cloneNode(true).children[0];
const successInnerElement = successModalElement.children[0];
const closeElement = successModalElement.querySelector('.success__button');

const onClickOutsideSuccessModal = (evt) => {
  if (!successInnerElement.contains(evt.target)) {
    removeSuccessModal();
  }
};

// Проверка на Escape
const onKeydownEscape = (evt) => {
  if (evt.code === 'Escape') {
    removeSuccessModal();
  }
};

function removeSuccessModal() {
  body.classList.remove('modal-open');
  successModalElement.remove();
  closeElement.removeEventListener('click', removeSuccessModal);
  document.removeEventListener('keydown', onKeydownEscape);
  document.removeEventListener('click', onClickOutsideSuccessModal);
}

const openSuccessModal = () => {
  body.classList.add('modal-open');
  body.appendChild(successModalElement);
  closeElement.addEventListener('click', removeSuccessModal);
  document.addEventListener('keydown', onKeydownEscape);
  document.addEventListener('click', onClickOutsideSuccessModal);
};

export { openSuccessModal };
