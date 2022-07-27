// Scale
const formElement = document.querySelector('form#upload-select-image');
const imageElement = formElement.querySelector('.img-upload__preview > img');
const addScaleElement = formElement.querySelector('.scale__control--bigger');
const reduceScaleElement = formElement.querySelector('.scale__control--smaller');
const valueScaleElement = formElement.querySelector('.scale__control--value');

// Константы по изменению масштаба
const SCALE_STEP = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const DEFAULT_SCALE_VALUE = 100;

// Обновление масштаба
const updateScaleImage = () => {
  imageElement.style.transform = `scale(${parseInt(valueScaleElement.value, 10) / 100})`;
};

// Увеличение масштаба
const addScale = () => {
  if (parseInt(valueScaleElement.value, 10) !== MAX_SCALE_VALUE) {
    valueScaleElement.value = `${parseInt(valueScaleElement.value, 10) + SCALE_STEP}%`;
    updateScaleImage();
  }
};

// Уменьшение масштаба
const reduceScale = () => {
  if (parseInt(valueScaleElement.value, 10) !== MIN_SCALE_VALUE) {
    valueScaleElement.value = `${parseInt(valueScaleElement.value, 10) - SCALE_STEP}%`;
    updateScaleImage();
  }
};

// Добавление обработчики событий на элементы управления масштаба
const addScaleHandlers = () => {
  addScaleElement.addEventListener('click', addScale);
  reduceScaleElement.addEventListener('click', reduceScale);
};

// Удаление обработчиков событий элементов управления масштаба
const removeScaleHandlers = () => {
  addScaleElement.removeEventListener('click', addScale);
  reduceScaleElement.removeEventListener('click', reduceScale);
};

// Инициализация Функции масштаба
const initScale = () => {
  valueScaleElement.value = `${DEFAULT_SCALE_VALUE}%`;
  updateScaleImage();
  addScaleHandlers();
};

export { initScale, removeScaleHandlers };
