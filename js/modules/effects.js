const formElement = document.querySelector('form#upload-select-image');
const previewImageElement = formElement.querySelector('.img-upload__preview > img');
const sliderContainerElement = formElement.querySelector('fieldset.img-upload__effect-level');
const valueInputElement = sliderContainerElement.querySelector('input.effect-level__value');
const sliderElement = formElement.querySelector('.effect-level__slider');
const filterListElement = formElement.querySelector('ul.effects__list');
const filterElements = filterListElement.querySelectorAll('input[name="effect"]');
const originalFilterElement = filterListElement.querySelector('input#effect-none');
const EFFECT_OPTIONS = {
  chrome: {
    effect: 'grayscale',
    step: 0.1,
    min: 0,
    max: 1,
    unit: '',
  },
  sepia: {
    effect: 'sepia',
    step: 0.1,
    min: 0,
    max: 1,
    unit: '',
  },
  marvin: {
    effect: 'invert',
    step: 1,
    min: 0,
    max: 100,
    unit: '%',
  },
  phobos: {
    effect: 'blur',
    step: 0.1,
    min: 0,
    max: 3,
    unit: 'px',
  },
  heat: {
    effect: 'brightness',
    step: 0.1,
    min: 1,
    max: 3,
    unit: '',
  },
};
let selectedFilter = '';

// Управление насыщенностью
const useSaturation = () => {
  if (selectedFilter !== '') {
    previewImageElement.style.filter = `${EFFECT_OPTIONS[selectedFilter].effect}(${valueInputElement.value}${EFFECT_OPTIONS[selectedFilter].unit})`;
  }
};

// Обновление значения слайдера
const syncInputValue = () => {
  sliderElement.noUiSlider.on('update', () => {
    // Синхронизируем значения полей
    valueInputElement.value = sliderElement.noUiSlider.get();
    useSaturation();
  });
};

// Update Options Slider
const sliderUpdateOptions = (filter) => {
  selectedFilter = filter;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: EFFECT_OPTIONS[selectedFilter].min,
      max: EFFECT_OPTIONS[selectedFilter].max,
    },
    start: 100,
    step: EFFECT_OPTIONS[selectedFilter].step,
  });
};

// Разблокировка слайдера
const enableSlider = () => {
  sliderElement.removeAttribute('disabled');
};

// Сброс фильтра с изображения
const removeImageFilter = () => {
  previewImageElement.removeAttribute('class');
  previewImageElement.style = '';
};

// Наложение фильтра на изображение
const useImageFilter = (filterType) => {
  previewImageElement.className = `effects__preview--${filterType}`;
};

// Сброс фильтров
const resetFilter = () => {
  filterElements.forEach((filter) => {
    filter.removeAttribute('checked');
  });
  removeImageFilter();
};

// Выключение слайдера
const disableSlider = () => {
  sliderContainerElement.classList.add('hidden');
  sliderElement.setAttribute('disabled', true);
};

// Выбор фильтра
const selectFilter = (filter) => {
  resetFilter();
  filter.target.checked = true;

  if (filter.target.value === 'none') {
    disableSlider();
    removeImageFilter();
  } else {
    sliderContainerElement.classList.remove('hidden');
    sliderUpdateOptions(filter.target.value);
    enableSlider();
    useImageFilter(filter.target.value);
  }
};

// Удаление слайдера
const destroySlider = () => {
  sliderElement.noUiSlider.destroy();
};

// Закрытие слайдера
const closeSlider = () => {
  resetFilter();
  originalFilterElement.checked = true;
  destroySlider();
  filterListElement.removeEventListener('change', selectFilter);
};

// Создание слайдера
const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 0.1,
    connect: 'lower',
  });
};

// Инициализация слайдера
const initSlider = () => {
  createSlider();
  disableSlider();
  syncInputValue();
};

// Открытие слайдера
const openSlider = () => {
  // Инициализируем слайдер
  initSlider();
  // Сбрасываем эффекты по умолчанию.
  resetFilter();
  originalFilterElement.checked = true;
  // Подписываемся на выбор фильтров
  filterListElement.addEventListener('change', selectFilter);
};

export { openSlider, closeSlider };
