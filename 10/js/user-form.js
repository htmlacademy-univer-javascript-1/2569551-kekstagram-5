import { addEventListenerToScaleElemets, removeEventListenerFromScaleElemets, addFilter, removeFilter } from './effects.js';
import { isEscape } from './utils.js';
const MAX_TAG_COUNT = 5;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorMessages = {
  EXCEEDED_COUNT: `Максимум ${MAX_TAG_COUNT} хэштегов`,
  UNIQUE_REQUIRED: 'Хэштеги должны быть уникальными',
  INVALID_HASHTAG: 'Некорректный хэштег'
};

const documentBody = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const overlayElement = uploadForm.querySelector('.img-upload__overlay');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const imageScaleValue = uploadForm.querySelector('.scale__control--value');

const pristineValidator = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const displayForm = () => {
  overlayElement.classList.remove('hidden');
  documentBody.classList.add('modal-open');
  document.addEventListener('keydown', handleDocumentKeydown);
  addEventListenerToScaleElemets();
  addFilter();
};


const hideForm = () => {
  uploadForm.reset();
  pristineValidator.reset();
  overlayElement.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', handleDocumentKeydown);
  removeEventListenerFromScaleElemets();
  removeFilter();
  imageScaleValue.value = '100%';
};

const extractTags = (inputString) => inputString.trim().split(' ').filter((tag) => Boolean(tag.length));
const isFocused = () => document.activeElement === hashtagsField || document.activeElement === uploadForm.querySelector('.text__description');
const validateCount = (inputValue) => extractTags(inputValue).length <= MAX_TAG_COUNT;
const validateHashtags = (inputValue) => extractTags(inputValue).every((tag) => HASHTAG_PATTERN.test(tag));

const validateUniqueness = (inputValue) => {
  const transformedTags = extractTags(inputValue).map((tag) => tag.toLowerCase());
  return transformedTags.length === new Set(transformedTags).size;
};

function handleDocumentKeydown(event) {
  if (isEscape(event) && !isFocused()) {
    event.preventDefault();
    hideForm();
  }
}

const handleCancelButtonClick = () => hideForm();
const handleInputChange = () => displayForm();

pristineValidator.addValidator(
  hashtagsField,
  validateUniqueness,
  ErrorMessages.UNIQUE_REQUIRED,
  1,
  true
);

pristineValidator.addValidator(
  hashtagsField,
  validateHashtags,
  ErrorMessages.INVALID_HASHTAG,
  2,
  true
);

pristineValidator.addValidator(
  hashtagsField,
  validateCount,
  ErrorMessages.EXCEEDED_COUNT,
  3,
  true
);

uploadForm.querySelector('.img-upload__input').addEventListener('change', handleInputChange);
uploadForm.querySelector('.img-upload__cancel').addEventListener('click', handleCancelButtonClick);
