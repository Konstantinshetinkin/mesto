
class Card {
  constructor(item, templateSelector,handleCardClick) {
    this._link = item.link;
    this._name = item.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  creatCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__foto");
    this._likeButton = this._element.querySelector(".element__like");

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
        this._handlerDeleteCard();
      });
    this._cardImage.addEventListener("click", () => {
      const card = {name:this._name,link:this._link};
      this._handleCardClick(card);
    });
  }
  _hanlerLikeActive() {
    this._likeButton.classList.toggle("element__like_active");
  }
  _handlerDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}

export { Card };
