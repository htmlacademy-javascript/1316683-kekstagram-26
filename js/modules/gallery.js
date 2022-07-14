import { getPictures } from './data.js';
import { renderMiniPictures } from './pictures.js';
import { form } from './form.js';

const renderGallery = (count) => {
  renderMiniPictures(getPictures(count));
  form();
};

export { renderGallery };
