const COMMENTS_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadComments = bigPicture.querySelector('.comments-loader');
const commentFragment = document.createDocumentFragment();
const closeButton = bigPicture.querySelector('.big-picture__cancel');


let currentComments = [];
let commentsCount = COMMENTS_STEP;

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
  socialCommentsCount.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;
  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length <= commentsCount) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden');
  }

  socialCommentsCount.innerHTML = `${commentsCount} из <span class="comments-count">${currentComments.length}</span>  комментариев`;

  commentsCount = (commentsCount >= currentComments.length) ? COMMENTS_STEP : commentsCount;

  commentsSelected.forEach(createСomment);
  socialComments.appendChild(commentFragment);
};

const onLoadCommentsButtonClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const showBigPicture = (picture) => {
  const {url, comments, likes, description} = picture;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;

  currentComments = comments.slice();
  commentsCount = COMMENTS_STEP;

  renderComments();
  loadComments.addEventListener('click', onLoadCommentsButtonClick);

};

closeButton.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

export {showBigPicture};
