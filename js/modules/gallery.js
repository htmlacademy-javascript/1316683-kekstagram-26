import { getPictures } from './data.js';
import { renderMiniPictures } from './pictures.js';
import { initFormValidation } from './form.js';

const renderGallery = (count) => {
  renderMiniPictures(getPictures(count));
  initFormValidation();
};

export { renderGallery };
