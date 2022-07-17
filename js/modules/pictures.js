import { renderFullPictures } from './full-pictures.js';

const renderMiniPictures = (similarPicturesData) => {
  const pictureContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();

  similarPicturesData.forEach((pictureElementData) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = pictureElementData.url;
    pictureElement.querySelector('.picture__likes').textContent = pictureElementData.likes;
    pictureElement.querySelector('.picture__comments').textContent = pictureElementData.comments.length;
    pictureFragment.append(pictureElement);
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderFullPictures(pictureElementData);
    });
  });
  pictureContainer.append(pictureFragment);
};

export { renderMiniPictures };
