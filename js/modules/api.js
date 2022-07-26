const errorModalElement = document.querySelector('#error-fetch');

const openErrorModal = () => {
  errorModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const getData = (renderPictures) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((pictures) => {
      renderPictures(pictures);
    })
    .catch(() => openErrorModal());
};

export { getData };
