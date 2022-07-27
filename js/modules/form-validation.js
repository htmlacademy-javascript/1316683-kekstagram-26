import { pristine } from './pristine.js';
import { resetFormData, closeForm } from './form.js';
import { openSuccessModal } from './success-modal.js';
import { openErrorModal } from './error-modal.js';

const formValidation = (evt) => {
  if (pristine.validate()) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch('https://26.javascript.pages.academy/kekstagram', {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        resetFormData();
        closeForm();
        openSuccessModal();
      })
      .catch(() => openErrorModal());

  } else {
    evt.preventDefault();
  }
};

export { formValidation };
