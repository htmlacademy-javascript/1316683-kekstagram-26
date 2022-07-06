import { getPictureData } from './data.js';
import { renderMiniPictures } from './render-pictures.js';
// import { renderFullPictures } from './render-full-pictures.js';

const renderGallery = (count) => {
  renderMiniPictures(getPictureData(count));
};

export { renderGallery };
