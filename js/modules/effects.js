const formElement = document.querySelector('form#upload-select-image');
const previewImageElement = formElement.querySelector('.img-upload__preview > img');
const sliderContainerElement = formElement.querySelector('fieldset.img-upload__effect-level');
const valueInputElement = sliderContainerElement.querySelector('input.effect-level__value');
const sliderElement = formElement.querySelector('.effect-level__slider');
const filterListElement = formElement.querySelector('ul.effects__list');
const filterElements = filterListElement.querySelectorAll('input[name="effect"]');
const originalFilterElement = filterListElement.querySelector('input#effect-none');
const DEFAULT_EFFECT_VALUE = 100;
let stepUseEffect = 0.1;

const EFFECT_OPTIONS = {
  'chrome': {
    filter: 'grayscale',
    step: 0.1,
    start: 0,
    end: 1,
  },
  'sepia': {
    filter: 'grayscale',
    step: 0.1,
    start: 0,
    end: 1,
  },
  'invert': {
    filter: 'grayscale',
    step: 1,
    start: 0,
    end: 100,
  },
  'blur': {
    filter: 'grayscale',
    step: 0.1,
    start: 0,
    end: 3,
  },
  'brightness': {
    filter: 'grayscale',
    step: 0.1,
    start: 1,
    end: 3,
  },
}

// Обновление значения слайдера
const syncInputValue = () => {
  sliderElement.noUiSlider.on('update', () => {
    valueInputElement.value = sliderElement.noUiSlider.get();
    // console.log(valueInputElement.value);
  });
};

// Разблокировка слайдера
const enableSlider = () => {
  sliderElement.removeAttribute('disabled');
};

// Сброс фильтра с изображения
const removeImageFilter = () => previewImageElement.removeAttribute('class');

const useImageEffect = () => {
  // previewImageElement.style.filter = 
};

// Наложение фильтра на изображение
const useImageFilter = (filterValue) => { previewImageElement.className = `effects__preview--${filterValue}`; };

const resetFilter = () => {
  filterElements.forEach((filter) => {
    filter.removeAttribute('checked');
  });
  removeImageFilter();
};

const setFilter = (filter) => {
  resetFilter();
  filter.target.checked = true;

  if (filter.target.value === 'none') {
    sliderContainerElement.classList.add('hidden');
    removeImageFilter();
  } else {
    sliderContainerElement.classList.remove('hidden');
    enableSlider();
    useImageFilter(filter.target.value);
  }
};

const destroySlider = () => {
  sliderElement.noUiSlider.destroy();
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: stepUseEffect,
    connect: 'lower',
  });
};

const disableSlider = () => {
  sliderElement.setAttribute('disabled', true);
};

const initSlider = () => {
  // Прячем слайдер по дефолту.
  sliderContainerElement.classList.add('hidden');
  createSlider();
  disableSlider();
  syncInputValue();
};

const setDefaultFilter = () => {
  resetFilter();
  originalFilterElement.checked = true;
};

const closeSlider = () => {
  setDefaultFilter();
  destroySlider();
  filterListElement.removeEventListener('change', setFilter);
};

const openSlider = () => {
  // Инициализируем слайдер
  initSlider();
  // Сбрасываем эффекты по умолчанию.
  setDefaultFilter();
  // Подписываемся на выбор фильтров
  filterListElement.addEventListener('change', setFilter);
};

export { openSlider, closeSlider };
