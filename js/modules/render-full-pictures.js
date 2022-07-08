let isOpenBigPicture = false;
const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const imageElement = bigPictureElement.querySelector('.big-picture__img > img');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const likesCountElement = bigPictureElement.querySelector('span.likes-count');
const commentsCountElement = bigPictureElement.querySelector('span.comments-count');
const closeBtnElement = bigPictureElement.querySelector('#picture-cancel');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const commentElement = commentsContainerElement.firstElementChild.cloneNode(true);
const commentsFragment = document.createDocumentFragment();



const openBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  isOpenBigPicture = true;

  if (isOpenBigPicture) {
    closeBtnElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      bigPictureElement.classList.add('hidden');
      body.classList.remove('modal-open');
    }, { once: true });

    document.addEventListener('keydown', (evt) => {
      if (evt.code === 'Escape') {
        evt.preventDefault();
        bigPictureElement.classList.add('hidden');
        body.classList.remove('modal-open');
      }
    }, { once: true });
  }
};

const renderComments = (comments) => {
  commentsContainerElement.innerHTML = '';

  comments.forEach((commentsItem) => {
    const tempElement = commentElement.cloneNode(true);
    tempElement.querySelector('img.social__picture').src = commentsItem.avatar;
    tempElement.querySelector('img.social__picture').alt = commentsItem.name;
    tempElement.querySelector('p.social__text').textContent = commentsItem.message;
    commentsFragment.appendChild(tempElement);
  });

  commentsContainerElement.append(commentsFragment);
};

const renderFullPictures = (pictureElementData) => {
  imageElement.src = pictureElementData.url;
  bigPictureElement.alt = pictureElementData.description;
  descriptionElement.textContent = pictureElementData.description;
  likesCountElement.textContent = pictureElementData.likes;
  commentsCountElement.textContent = pictureElementData.comments.length;

  renderComments(pictureElementData.comments);
  openBigPicture();
};

export { renderFullPictures };
