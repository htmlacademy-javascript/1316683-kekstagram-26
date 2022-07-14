import { getPictures } from './data.js';
import { renderMiniPictures } from './pictures.js';
import { renderForm } from './render-form.js';

const renderGallery = (count) => {
  renderMiniPictures(getPictures(count));
  renderForm();
};

export { renderGallery };
