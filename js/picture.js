import { createPhotoDescriptions } from './data.js';
import { showBigPicture } from './big-picture.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture');

function createPictureElement(photoData) {
  const newPicture = pictureTemplate.content.cloneNode(true).querySelector('.picture');
  newPicture.querySelector('.picture__img').src = photoData.url;
  newPicture.querySelector('.picture__img').alt = photoData.description;
  newPicture.querySelector('.picture__comments').textContent = photoData.comments.length;
  newPicture.querySelector('.picture__likes').textContent = photoData.likes;

  const onPictureElementClick = (evt) => {
    evt.preventDefault();

    showBigPicture(photoData);
  };

  newPicture.addEventListener('click', onPictureElementClick);

  return newPicture;
};

function renderPictures(photoData) {
  const fragment = new DocumentFragment();
  photoData.forEach((photo) => {
    const picturesElement = createPictureElement(photo);
    fragment.appendChild(picturesElement);
  });
  picturesList.appendChild(fragment);
};

const photos = createPhotoDescriptions();

renderPictures(photos);
