const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const imageElement = bigPictureElement.querySelector('.big-picture__img > img');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const likesElement = bigPictureElement.querySelector('span.likes-count');
const commentCountElement = bigPictureElement.querySelector('span.comments-count');
const closeElement = bigPictureElement.querySelector('#picture-cancel');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const commentElement = commentsContainerElement.firstElementChild.cloneNode(true);
const listCommentsFragment = document.createDocumentFragment();
const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const uploadMoreElement = bigPictureElement.querySelector('.comments-loader');
const countCommentsContainer = bigPictureElement.querySelector('.social__comment-count');
const showCommentElement = countCommentsContainer.firstChild;
const UPLOAD_COMMENT_COUNT = 5;
let showCommentElementsCount = 0;
let displayingCommentsCount = UPLOAD_COMMENT_COUNT;
let comments = [];

const renderCommentsCount = () => {
  showCommentElement.textContent = `${showCommentElementsCount} из `;
};


const closePicture = (evt) => {
  evt.preventDefault();
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  closeElement.removeEventListener('click', closePicture);
  document.removeEventListener('keydown', isEscape);
  uploadMoreElement.removeEventListener('click', uploadComments);
  showCommentElementsCount = 0;
  displayingCommentsCount = UPLOAD_COMMENT_COUNT;
};

function isEscape(evt) {
  if (evt.code === 'Escape') {
    closePicture(evt);
  }
}

const renderComments = () => {
  const commentsForRender = comments.slice(displayingCommentsCount - UPLOAD_COMMENT_COUNT, displayingCommentsCount);

  // Отрисовываем комментарии
  commentsForRender.forEach((commentsItem) => {
    const tempElement = commentElement.cloneNode(true);
    tempElement.querySelector('img.social__picture').src = commentsItem.avatar;
    tempElement.querySelector('img.social__picture').alt = commentsItem.name;
    tempElement.querySelector('p.social__text').textContent = commentsItem.message;
    listCommentsFragment.appendChild(tempElement);
  });
  commentsContainerElement.append(listCommentsFragment);
  showCommentElementsCount += commentsForRender.length;
  renderCommentsCount();

  // Скрытие кнопки загрузить при полной загрузке
  if (showCommentElementsCount === comments.length) {
    uploadMoreElement.classList.add('hidden');
  } else {
    uploadMoreElement.classList.remove('hidden');
  }
};

function uploadComments() {
  displayingCommentsCount += UPLOAD_COMMENT_COUNT;
  renderComments();
}

const openPicture = () => {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');
  closeElement.addEventListener('click', closePicture);
  document.addEventListener('keydown', isEscape);
  uploadMoreElement.addEventListener('click', uploadComments);
};

const generateBigPicture = (pictureData) => {
  // Генерируем модальное окно на основе данных элемента
  imageElement.src = pictureData.url;
  bigPictureElement.alt = pictureData.description;
  descriptionElement.textContent = pictureData.description;
  likesElement.textContent = pictureData.likes;
  commentCountElement.textContent = pictureData.comments.length;
  // Очищаем контейнер с комментариями
  commentsContainerElement.innerHTML = '';
  comments = pictureData.comments;
  displayingCommentsCount = UPLOAD_COMMENT_COUNT;
  // Вызываем функцию для начальной генерации комментариев
  renderComments();
  // Открываем окно
  openPicture();
};

// Генерируем элемент Picture
const generatePicture = (pictureData, pictureFragment) => {
  // Делаем экземпляр элемента на основе темплейта
  const pictureCloneElement = pictureTemplate.cloneNode(true);

  // Заполняем его данными
  pictureCloneElement.querySelector('.picture__img').src = pictureData.url;
  pictureCloneElement.querySelector('.picture__likes').textContent = pictureData.likes;
  pictureCloneElement.querySelector('.picture__comments').textContent = pictureData.comments.length;

  // Вешаем на элемент обработчик и при клике вызываем функцию генерации модального окна
  pictureCloneElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    generateBigPicture(pictureData);
  });
  // Берем сгенерированный элемент и добавляем его в фрагмент
  pictureFragment.append(pictureCloneElement);
};

/* Берет массивы с данными */
const renderPictures = (picturesData) => {
  const pictureFragment = document.createDocumentFragment();
  // Генерируем фрагмент состоящий из элементов, для дальнейшего добавления в контейнер.
  picturesData.forEach((pictureData) => generatePicture(pictureData, pictureFragment));
  pictureContainer.append(pictureFragment);
};

export { renderPictures };
