let isOpenBigPicture = false;
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img > img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikesCount = bigPicture.querySelector('span.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('span.comments-count');
const bigPictureCommentsContainer = bigPicture.querySelector('.social__comments');
const bigPictureCommentElements = bigPictureCommentsContainer.children;
const bigPictureCloseBtn = bigPicture.querySelector('#picture-cancel');

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  isOpenBigPicture = true;
};

const closeBigPicture = () => {
  if (isOpenBigPicture) {
    bigPictureCloseBtn.addEventListener('click', () => {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
      bigPictureCloseBtn.removeEventListener('click', closeBigPicture);
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.code === 'Escape') {
        bigPicture.classList.add('hidden');
        body.classList.remove('modal-open');
        document.removeEventListener('keydown', closeBigPicture);
      }
    });
  }
};

const renderFullPictures = (pictureElementData) => {
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

  openBigPicture();
  closeBigPicture();
};

export { renderFullPictures };
