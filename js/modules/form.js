const renderForm = () => {
  const body = document.body;
  const formElement = document.querySelector('form#upload-select-image');
  const uploadElement = formElement.querySelector('#upload-file');
  const overlayElement = formElement.querySelector('.img-upload__overlay');
  const closeOverlayElement = overlayElement.querySelector('#upload-cancel');
  const defaultImage = uploadElement.value;

  const closeForm = (evt) => {
    evt.preventDefault();
    body.classList.remove('modal-open');
    overlayElement.classList.add('hidden');
    uploadElement.value = defaultImage;
    closeOverlayElement.removeEventListener('click', closeForm);
    document.removeEventListener('keydown', closeForm);
  };

  const isEscape = (evt) => evt.code === 'Escape';

  const openForm = () => {
    body.classList.add('modal-open');
    overlayElement.classList.remove('hidden');
    closeOverlayElement.addEventListener('click', closeForm);
    document.addEventListener('keydown', isEscape ? closeForm : {});
  };

  uploadElement.addEventListener('change', openForm);
};

const formValidation = () => {
  renderForm();
};

export { formValidation };
