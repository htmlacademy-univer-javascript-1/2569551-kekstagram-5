const effectRadios = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectOptions = {
  chrome: { range: { min: 0, max: 1 }, step: 0.1, start: 1 },
  sepia: { range: { min: 0, max: 1 }, step: 0.1, start: 1 },
  marvin: { range: { min: 0, max: 100 }, step: 1, start: 100 },
  phobos: { range: { min: 0, max: 3 }, step: 0.1, start: 3 },
  heat: { range: { min: 1, max: 3 }, step: 0.1, start: 3 },
};
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(1),
    from: (value) => parseFloat(value)
  }
});
const resetEffect = () => {
  effectLevelContainer.style.display = 'none';
  imagePreview.style.filter = '';
  effectLevelValue.value = '';
};
const applyEffect = (effect, value) => {
  switch (effect) {
    case 'chrome':
      imagePreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imagePreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imagePreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imagePreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imagePreview.style.filter = `brightness(${value})`;
      break;
    default:
      resetEffect();
      break;
  }
};
const updateSliderOptions = (effect) => {
  const options = effectOptions[effect];
  effectLevelSlider.noUiSlider.updateOptions({
    range: options.range,
    step: options.step,
    start: options.start,
  });
  applyEffect(effect, options.start);
};
const onEffectChange = () => {
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  if (selectedEffect === 'none') {
    resetEffect();
  } else {
    effectLevelContainer.style.display = 'block';
    updateSliderOptions(selectedEffect);
  }
};
effectRadios.forEach((effect) => effect.addEventListener('change', onEffectChange));
effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  const effect = document.querySelector('.effects__radio:checked').value;
  const value = values[handle];
  effectLevelValue.value = value;
  applyEffect(effect, value);
});
export { resetEffect };
