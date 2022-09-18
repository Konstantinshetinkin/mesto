class Card {
  constructor(item, templateSelector, handleCardClick,handleDeleteClick) {
    this._id = item._id;
    this._link = item.link;
    this._name = item.name;
    this._likes= item.likes;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  _setLikes(){
    const likeScore = this._element.querySelector(".element__like-score");
    likeScore.textContent = this._likes.length
  }

  creatCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__foto");
    this._likeButton = this._element.querySelector(".element__like");
    this._setLikes();

    this._setEventListener();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }
  _setEventListener() {
    this._likeButton.addEventListener("click", () => {
      this._hanlerLikeActive();
    });
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      });
    this._cardImage.addEventListener("click", () => {
      const card = { name: this._name, link: this._link };
      this._handleCardClick(card);
    });
  }
  _hanlerLikeActive() {
    this._likeButton.classList.toggle("element__like_active");
  }

  deleteCard() {
    
      this._element.remove();
      this._element = null;
    
  }
}

export { Card };
