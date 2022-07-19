const formElement = document.querySelector('form#upload-select-image');
const previewImageElement = formElement.querySelector('.img-upload__preview > img');
const effectsSliderContainerElement = formElement.querySelector('fieldset.img-upload__effect-level');
const effectSliderElement = effectsSliderContainerElement.querySelector('.effect-level__slider');
const effectsListElement = formElement.querySelector('ul.effects__list');
const effectsElements = effectsListElement.querySelectorAll('.effects__radio');
const defaultEffectElement = effectsListElement.querySelector('#effect-none');
const effectsInput = formElement.querySelector('input.effect-level__value');
const DEFAULT_EFFECT_VALUE = 100;
let stepEffect = 0.1;

const resetToDefaultEffect = () => {
  // Сброс фильтра по умолчанию
  effectsElements.forEach((item) => {
    item.removeAttribute('checked');
  });
};


const initSlider = () => {
  noUiSlider.create(effectSliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 80,
    step: 1,
    connect: 'lower',
  });

  defaultEffectElement.setAttribute('checked', true);
  effectsSliderContainerElement.classList.add('hidden');
  effectsInput.value = 0;
  effectsInput.step = stepEffect;

  // effectSliderElement.noUiSlider.get();
  const selectEffect = (evt) => {
    resetToDefaultEffect();
    evt.target.setAttribute('checked', true);

    // Если выбран без эффектов, сбрасываем все классы.
    if (evt.target.value === 'none') {
      previewImageElement.className = '';
      effectsSliderContainerElement.classList.add('hidden');
    } else {
      effectsSliderContainerElement.classList.remove('hidden');
      previewImageElement.className = `effects__preview--${evt.target.value}`;
    }
  };

  effectsListElement.addEventListener('change', selectEffect);
};

export { initSlider };
