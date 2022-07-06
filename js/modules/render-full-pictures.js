// import { getPictureData } from './data.js';

const renderFullPictures = (pictureElementData) => {
  // Big Picture Container
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureCloseBtn = bigPicture.querySelector('#picture-cancel');
  // Фотография
  const bigPictureImage = bigPicture.querySelector('.big-picture__img > img');
  // Описание
  const bigPictureDescription = bigPicture.querySelector('.social__caption');
  // Счетчик лайков
  const bigPictureLikesCount = bigPicture.querySelector('span.likes-count');
  // Счетчик комментариев
  const bigPictureCommentsCount = bigPicture.querySelector('span.comments-count');
  // Комментария
  const bigPictureCommentsContainer = bigPicture.querySelector('.social__comments');
  const bigPictureCommentElements = bigPictureCommentsContainer.children;

  bigPictureImage.src = pictureElementData.url;
  bigPicture.alt = pictureElementData.description;
  bigPictureDescription.textContent = pictureElementData.description;
  bigPictureLikesCount.textContent = pictureElementData.likes;
  bigPictureCommentsCount.textContent = pictureElementData.comments.length;

  for (let i = 0; i < bigPictureCommentElements.length; i++) {
    bigPictureCommentElements[i].querySelector('img.social__picture').src = pictureElementData.comments[i].avatar;
    bigPictureCommentElements[i].querySelector('img.social__picture').alt = pictureElementData.comments[i].name;
    bigPictureCommentElements[i].querySelector('p.social__text').textContent = pictureElementData.comments[i].message;
  }

  bigPicture.classList.remove('hidden');

  // Close
  if (!bigPicture.classList.contains('hidden')) {
    document.querySelector('body').classList.add('modal-open');
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');

    document.addEventListener('keydown', (evt) => {
      if (evt.code === 'Escape') {
        bigPicture.classList.add('hidden');
      }
    });

    bigPictureCloseBtn.addEventListener('click', () => {
      bigPicture.classList.add('hidden');
    });
  } else {
    document.removeEventListener('keydown');
    bigPictureCloseBtn.removeEventListener('click');
  }
};

export { renderFullPictures };
