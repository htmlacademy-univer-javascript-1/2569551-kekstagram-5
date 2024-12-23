import { isEscape } from './utils.js';
import { closeOverlay, setErrorMessageStatus } from './user-form.js';
const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');
const showDataLoadError = () => {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = 'Ошибка загрузки данных';
  Object.assign(errorMessage.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '16px',
    backgroundColor: 'red',
    padding: '20px',
    borderRadius: '5px',
    zIndex: 999
  });
  document.body.appendChild(errorMessage);
};
const showSuccessMessage = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  const successMessage = successTemplate.content.cloneNode(true);
  const successSection = successMessage.querySelector('.success');
  const successButton = successMessage.querySelector('.success__button');
  document.body.appendChild(successMessage);
  successButton.addEventListener('click', () => {
    successSection.remove();
    closeOverlay();
  });
  const onEscapeKeyDown = (evt) => {
    if (isEscape(evt)) {
      successSection.remove();
      closeOverlay();
    }
  };
  document.addEventListener('keydown', onEscapeKeyDown);
  successSection.addEventListener('click', (evt) => {
    if (evt.target === successSection) {
      successSection.remove();
      closeOverlay();
    }
  });
};
const showErrorMessage = () => {
  const errorMessage = errorTemplate.content.cloneNode(true);
  const errorSection = errorMessage.querySelector('.error');
  const errorButton = errorMessage.querySelector('.error__button');
  document.body.appendChild(errorMessage);
  setErrorMessageStatus(true);
  errorButton.addEventListener('click', () => {
    errorSection.remove();
    setErrorMessageStatus(false);
  });
  const onEscapeKeyDown = (evt) => {
    if (isEscape(evt)) {
      errorSection.remove();
      setErrorMessageStatus(false);
    }
  };
  document.addEventListener('keydown', onEscapeKeyDown);
  errorSection.addEventListener('click', (evt) => {
    if (evt.target === errorSection) {
      errorSection.remove();
      setErrorMessageStatus(false);
    }
  });
};
export { showDataLoadError, showSuccessMessage, showErrorMessage };
