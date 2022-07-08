import { getPictureData } from './data.js';
import { renderMiniPictures } from './render-pictures.js';

const renderGallery = (count) => {
  renderMiniPictures(getPictureData(count));
};

export { renderGallery };
