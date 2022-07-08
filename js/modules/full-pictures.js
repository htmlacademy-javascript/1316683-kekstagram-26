let isOpenBigPicture = false;
const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const imageElement = bigPictureElement.querySelector('.big-picture__img > img');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const likesElement = bigPictureElement.querySelector('span.likes-count');
const commentsCountElement = bigPictureElement.querySelector('span.comments-count');
const closeBtnElement = bigPictureElement.querySelector('#picture-cancel');
const commentsContainer = bigPictureElement.querySelector('.social__comments');
const commentElement = commentsContainer.firstElementChild.cloneNode(true);
const listComments = document.createDocumentFragment();

const openBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  isOpenBigPicture = true;

  const closeBigPicture = (evt) => {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    body.classList.remove('modal-open');
    isOpenBigPicture = false;
  };

  if (isOpenBigPicture) {
    closeBtnElement.addEventListener('click', closeBigPicture, { once: true });

    document.addEventListener('keydown', (evt) => {
      if (evt.code === 'Escape') { closeBigPicture(evt); }
    }, { once: true });
  }
};

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';

  comments.forEach((commentsItem) => {
    const tempElement = commentElement.cloneNode(true);
    tempElement.querySelector('img.social__picture').src = commentsItem.avatar;
    tempElement.querySelector('img.social__picture').alt = commentsItem.name;
    tempElement.querySelector('p.social__text').textContent = commentsItem.message;
    listComments.appendChild(tempElement);
  });

  commentsContainer.append(listComments);
};

const renderFullPictures = (pictureElementData) => {
  imageElement.src = pictureElementData.url;
  bigPictureElement.alt = pictureElementData.description;
  descriptionElement.textContent = pictureElementData.description;
  likesElement.textContent = pictureElementData.likes;
  commentsCountElement.textContent = pictureElementData.comments.length;

  renderComments(pictureElementData.comments);
  openBigPicture();
};

export { renderFullPictures };
