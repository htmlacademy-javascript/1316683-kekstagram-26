import { getUserInfo } from './data.js';

const renderPictures = (count) => {
  const pictureContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();
  const similarPictures = getUserInfo(count);

  similarPictures.forEach(({ url, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.append(pictureElement);
  });

  pictureContainer.append(pictureFragment);
};

export { renderPictures };
