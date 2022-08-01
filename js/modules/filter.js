const formElement = document.querySelector('form#upload-select-image');
const imageElement = formElement.querySelector('.img-upload__preview > img');
// Slider
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

// Установка выбора фильтра по умолчанию
const setDefaulFilter = () => {
  originalFilterElement.checked = true;
};

// Управление насыщенностью
const useSaturation = () => {
  if (selectedFilter !== '') {
    imageElement.style.filter = `${EFFECT_OPTIONS[selectedFilter].effect}(${valueInputElement.value}${EFFECT_OPTIONS[selectedFilter].unit})`;
  }
};

// Обновление значения слайдера
const updateInputSlider = () => {
  sliderElement.noUiSlider.on('update', () => {
    // Синхронизируем значения полей
    valueInputElement.value = sliderElement.noUiSlider.get();
    useSaturation();
  });
};

// Update Options Slider
const updateSliderOptions = (filter) => {
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
  sliderContainerElement.classList.remove('hidden');
  sliderElement.removeAttribute('disabled');
};

// Выключение слайдера
const disableSlider = () => {
  sliderContainerElement.classList.add('hidden');
  sliderElement.setAttribute('disabled', true);
};

// Удаление слайдера
const destroySlider = () => {
  sliderElement.noUiSlider.destroy();
};

// Сброс выбора с элементов
const resetCheckedFilters = () => {
  filterElements.forEach((filter) => {
    filter.removeAttribute('checked');
  });
};

// Сброс фильтра с изображения
const removeFiltersForImage = () => {
  imageElement.removeAttribute('class');
  imageElement.style.filter = '';
};

// Сброс фильтров
const resetAllFilters = () => {
  resetCheckedFilters();
  removeFiltersForImage();
};

// Применение фильтра на изображение
const useImageFilter = (filterType) => {
  imageElement.className = `effects__preview--${filterType}`;
};

// Выбор фильтра
const selectFilter = (filter) => {
  resetAllFilters();
  filter.target.checked = true;

  if (filter.target.value === 'none') {
    disableSlider();
    removeFiltersForImage();
  } else {
    updateSliderOptions(filter.target.value);
    enableSlider();
    useImageFilter(filter.target.value);
  }
};

// Удаление обработчика события на фильтра
const removeSelectFilterHandler = () => filterListElement.removeEventListener('change', selectFilter);

// Закрытие слайдера
const closeSlider = () => {
  // Сброс фильтров
  resetAllFilters();
  // Установка фильтра по умолчанию
  setDefaulFilter();
  // Удаление слайдера
  destroySlider();
  // Удаление обработчика события на фильтра
  removeSelectFilterHandler();
};

// Добавление обработчика события на фильтра
const onSelectFilter = () => filterListElement.addEventListener('change', selectFilter);

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

// Открытие слайдера
const openSlider = () => {
  // Инициализируем слайдер
  createSlider();
  disableSlider();
  updateInputSlider();
  // Сбрасываем все фильтры
  resetAllFilters();
  // Устанавливаем фильтр по умолчанию
  setDefaulFilter();
  // Подписываемся на выбор фильтров
  onSelectFilter();
};

export { openSlider, closeSlider, resetAllFilters };
