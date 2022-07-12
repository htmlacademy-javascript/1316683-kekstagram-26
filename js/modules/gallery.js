import { getPictures } from './data.js';
import { renderMiniPictures } from './mini-pictures.js';
import { formValidation } from './form.js';

const renderGallery = (count) => {
  renderMiniPictures(getPictures(count));
  formValidation();
};

export { renderGallery };
