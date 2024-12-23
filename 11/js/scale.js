const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
let scaleValue = 100;
const updateScale = () => {
  scaleValueInput.value = `${scaleValue}%`;
  imagePreview.style.transform = `scale(${scaleValue / 100})`;
};
const resetScale = () => {
  scaleValue = MAX_SCALE;
  updateScale();
};
smallerButton.addEventListener('click', () => {
  if (scaleValue > MIN_SCALE) {
    scaleValue -= SCALE_STEP;
    updateScale();
  }
});
biggerButton.addEventListener('click', () => {
  if (scaleValue < MAX_SCALE) {
    scaleValue += SCALE_STEP;
    updateScale();
  }
});
export { resetScale };
