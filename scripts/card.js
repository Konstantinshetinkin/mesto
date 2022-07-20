import {openImagePopup} from './utils.js'

class Card {
  constructor(link, name) {
    this._link = link;
    this._name = name;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(".elements__template")
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  creatCard() {
    this._element = this._getTemplate();
    this._setEventListener();

    this._element.querySelector(".element__foto").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }
  _setEventListener() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._hanlerLikeActive();
      });
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._handlerDeleteCard();
      });
    this._element
      .querySelector(".element__foto")
      .addEventListener("click", () => {
        openImagePopup(this._name,this._link);
      });
  }
  _hanlerLikeActive() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }
  _handlerDeleteCard() {
    this._element.remove();
  }
}

export { Card };
