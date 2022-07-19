const formElement = document.querySelector('form#upload-select-image');
const addScaleElement = formElement.querySelector('.scale__control--bigger');
const reduceScaleElement = formElement.querySelector('.scale__control--smaller');
const valueScaleElement = formElement.querySelector('.scale__control--value');
const SCALE_STEP = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const DEFAULT_SCALE_VALUE = 50;

// Увеличение масштаба
const addScale = () => {
  if (parseInt(valueScaleElement.value, 10) !== MAX_SCALE_VALUE) {
    valueScaleElement.value = `${parseInt(valueScaleElement.value, 10) + SCALE_STEP}%`;
  }
};

// Уменьшение масштаба
const reduceScale = () => {
  if (parseInt(valueScaleElement.value, 10) !== MIN_SCALE_VALUE) {
    valueScaleElement.value = `${parseInt(valueScaleElement.value, 10) - SCALE_STEP}%`;
  }
};

const initScale = () => {
  valueScaleElement.value = `${DEFAULT_SCALE_VALUE}%`;
  addScaleElement.addEventListener('click', addScale);
  reduceScaleElement.addEventListener('click', reduceScale);
};

const removeScaleHandler = () => {
  addScaleElement.removeEventListener('click', addScale);
  reduceScaleElement.removeEventListener('click', reduceScale);
};

initScale();

export { initScale, removeScaleHandler };
