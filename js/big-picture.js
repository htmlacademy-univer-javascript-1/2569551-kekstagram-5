const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentFragment = document.createDocumentFragment();
const closeButton = bigPicture.querySelector('.big-picture__cancel');


let currentComments = [];
const createСomment = (comment) => {
  const newComment = document.createElement('li');
  const imgComment = document.createElement('img');
  const textComment = document.createElement('p');

  newComment.classList.add('social__comment');
  imgComment.classList.add('social--picture');
  textComment.classList.add('social__text');

  imgComment.src = comment.avatar;
  imgComment.alt = comment.name;
  textComment.textContent = comment.message;

  newComment.appendChild(imgComment);
  newComment.appendChild(textComment);

  commentFragment.appendChild(newComment);

};

const renderComments = () => {
  socialComments.innerHTML = '';
  const commentsSelected = currentComments.slice(0, currentComments.length);
  commentsSelected.forEach(createСomment);
  socialComments.appendChild(commentFragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const showBigPicture = (picture) => {
  const {url, comments, likes, description} = picture;
  bigPicture.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  socialCommentsCount.classList.add('hidden');

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  pictureCaption.textContent = description;

  currentComments = comments.slice();
  renderComments();

};

closeButton.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

export {showBigPicture};
