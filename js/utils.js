const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const getRandomIntiger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomIntiger(0, elements.length - 1)];

const isEscape = (evt) => evt.key === 'Escape';

const parseInput = (value) => value.trim().toLowerCase().split(/\s+/);
const validateHashtagsCount = (value) => {
  const hashtags = parseInput(value);
  return hashtags.length <= MAX_HASHTAGS;
};
const validateHashtagsUnique = (value) => {
  const hashtags = parseInput(value);
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};
const validateHashtagsPattern = (value) => {
  const hashtags = parseInput(value);
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/;
  return !value || hashtags[0] === '' || hashtags.every((hashtag) => hashtagPattern.test(hashtag));
};
const validateDescriptionLength = (value) => !value || value.length <= MAX_DESCRIPTION_LENGTH;

const sendRequest = ({ url, method = 'GET', body = null, onSuccess, onError, onFinally }) =>
  fetch(url, {
    method,
    body
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status}`);
    })
    .then((data) => {
      if (onSuccess) {
        onSuccess(data);
      }
      return data;
    })
    .catch(() => {
      if (onError) {
        onError();
      }
    })
    .finally(() => {
      if (onFinally) {
        onFinally();
      }
    });

export {
  getRandomIntiger,
  getRandomArrayElement,
  isEscape,
  validateHashtagsCount,
  validateHashtagsUnique,
  validateHashtagsPattern,
  validateDescriptionLength,
  sendRequest
};
