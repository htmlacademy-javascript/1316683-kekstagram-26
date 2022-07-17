import { getPictures } from './data.js';
import { renderPictures } from './pictures.js';
import { initFormValidation } from './form.js';

const renderGallery = (count) => {
  renderPictures(getPictures(count));
  initFormValidation();
};

export { renderGallery };
