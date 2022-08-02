import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this._popup.querySelector(".popup__image");
    this._name = this._popup.querySelector(".popup__image-title");
  }

  open({ name, link }) {
    this._image.src = link;
    this._name.alt = name;
    this._name.textContent = name;
    super.open();
  }
}
