import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';
import { isEscape } from './utils.js';
import { initializeValidation } from './validation.js';
import { submitForm } from './form-submit.js';

const uploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageEditForm = document.querySelector('.img-upload__overlay');
const closeEditFormButton = document.querySelector('.img-upload__cancel');
const imageScale = document.querySelector('.scale__control--value');
const effectLevel = document.querySelector('.effect-level__value');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const effectButtons = document.querySelectorAll('.effects__radio');

let isErrorMessageOpen = false;

imageUploadInput.addEventListener('change', () => {
  if (imageUploadInput.files.length > 0) {
    imageEditForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
});

const resetFormFields = () => {
  imageUploadInput.value = '';
  imageScale.value = '100%';
  effectLevel.value = '';
  effectButtons.forEach((button) => {
    button.checked = button.id === 'effect-none';
  });
  hashtagsInput.value = '';
  descriptionInput.value = '';
};

const pristine = initializeValidation(uploadForm, hashtagsInput, descriptionInput);
submitForm(uploadForm, pristine);

const closeOverlay = () => {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetFormFields();
  pristine.reset();
  resetScale();
  resetEffect();
};

const isInputFieldFocused = (evt) => evt.target === hashtagsInput || evt.target === descriptionInput;

const setErrorMessageStatus = (status) => {
  isErrorMessageOpen = status;
};

const onEscapeKeyDown = (evt) => {
  if (isEscape(evt) && !isInputFieldFocused(evt) && !isErrorMessageOpen) {
    closeOverlay();
  }
};

const addEventListeners = () => {
  closeEditFormButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onEscapeKeyDown);
};

addEventListeners();

export { closeOverlay, setErrorMessageStatus };
