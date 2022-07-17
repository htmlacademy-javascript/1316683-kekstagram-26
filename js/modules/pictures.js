const body = document.querySelector('body');
const pictureElement = document.querySelector('.big-picture');
const imageElement = pictureElement.querySelector('.big-picture__img > img');
const descriptionElement = pictureElement.querySelector('.social__caption');
const likesElement = pictureElement.querySelector('span.likes-count');
const commentCountElement = pictureElement.querySelector('span.comments-count');
const closeElement = pictureElement.querySelector('#picture-cancel');
const commentsContainerElement = pictureElement.querySelector('.social__comments');
const commentElement = commentsContainerElement.firstElementChild.cloneNode(true);
const listCommentsFragment = document.createDocumentFragment();
const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const closePicture = (evt) => {
  evt.preventDefault();
  pictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  closeElement.removeEventListener('click', closePicture);
  document.removeEventListener('keydown', isEscape);
};

function isEscape(evt) {
  if (evt.code === 'Escape') {
    closePicture(evt);
  }
}

const openPicture = () => {
  pictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  pictureElement.querySelector('.comments-loader').classList.add('hidden');
  pictureElement.querySelector('.social__comment-count').classList.add('hidden');
  closeElement.addEventListener('click', closePicture);
  document.addEventListener('keydown', isEscape);
};

const renderComments = (comments) => {
  commentsContainerElement.innerHTML = '';

  comments.forEach((commentsItem) => {
    const tempElement = commentElement.cloneNode(true);
    tempElement.querySelector('img.social__picture').src = commentsItem.avatar;
    tempElement.querySelector('img.social__picture').alt = commentsItem.name;
    tempElement.querySelector('p.social__text').textContent = commentsItem.message;
    listCommentsFragment.appendChild(tempElement);
  });

  commentsContainerElement.append(listCommentsFragment);
};

const generateBigPicture = (pictureData) => {
  imageElement.src = pictureData.url;
  pictureElement.alt = pictureData.description;
  descriptionElement.textContent = pictureData.description;
  likesElement.textContent = pictureData.likes;
  commentCountElement.textContent = pictureData.comments.length;

  renderComments(pictureData.comments);
  openPicture();
};

// Генерируем элемент Picture
const generatePicture = (pictureData, pictureFragment) => {
  const pictureCloneElement = pictureTemplate.cloneNode(true);
  // console.log(pictureCloneElement)
  pictureCloneElement.querySelector('.picture__img').src = pictureData.url;
  pictureCloneElement.querySelector('.picture__likes').textContent = pictureData.likes;
  pictureCloneElement.querySelector('.picture__comments').textContent = pictureData.comments.length;
  pictureCloneElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    generateBigPicture(pictureData);
  });
  pictureFragment.append(pictureCloneElement);
};

const renderPictures = (picturesData) => {
  const pictureFragment = document.createDocumentFragment();
  // Генерируем фрагмент состоящий из элементов, для дальнейшего добавления в контейнер.
  picturesData.forEach((pictureData) => generatePicture(pictureData, pictureFragment));
  pictureContainer.append(pictureFragment);
};

export { renderPictures };
