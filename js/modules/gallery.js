import { getPictures } from './data.js';
import { renderMiniPictures } from './mini-pictures.js';

const renderGallery = (count) => {
  renderMiniPictures(getPictures(count));
};

export { renderGallery };
