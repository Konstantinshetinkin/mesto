export class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOverlayClose = this._handleClickOverlayClose.bind(this)
  }
  open() {
    this._popup.classList.add("popup__opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup__opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleClickOverlayClose(evt) {
    if (evt.target.classList.contains("overlay")) {
      this.close();
    }
  }
  setEventListeners() {
    this._popup.addEventListener(
      "click",
      this._handleClickOverlayClose
    );
    this._popup
      .querySelector(".popup__close-icon")
      .addEventListener("click", this.close.bind(this));
  }
}
