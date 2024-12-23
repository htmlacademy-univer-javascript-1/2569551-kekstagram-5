import { showBigPicture } from './big-picture.js';
import { sendRequest } from './utils.js';
import { showDataLoadError } from './messages.js';

const DATA_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/data';
const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureElement = (picture) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__img').alt = picture.description;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;

  newPicture.addEventListener('click', () => {
    showBigPicture(picture);
  });

  return newPicture;
};

const createPicturesFragment = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPictureElement(picture);
    fragment.appendChild(pictureElement);
  });
  return fragment;
};

const renderPictures = async () => {
  const allPictures = await sendRequest({
    url: DATA_URL,
    onError: () => showDataLoadError()
  });
  const fragment = createPicturesFragment(allPictures);
  picturesList.appendChild(fragment);
};

renderPictures();
