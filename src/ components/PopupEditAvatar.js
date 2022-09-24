import { Popup } from "./Popup";

export class PopupEditAvatar extends Popup {
  constructor(selectorPopup, addAvatarFromServer) {
    super(selectorPopup);
    this._addAvatar = addAvatarFromServer;
    this._input = this._popup.querySelector(".popup__field");
    this._form = this._popup.querySelector(".popup__form");
    this._buttonEditAvatar = this._popup.querySelector(".popup__submit-button");
    this._buttonAvatarText = this._buttonEditAvatar.textContent;
  }

  _getLinkValues() {
    const avatar = {};
    avatar[this._input.name] = this._input.value;
    return avatar;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._addAvatar(this._getLinkValues());
    });
  }
  close() {
    this._form.reset();
    super.close();
  }
  loading(isLoading) {
    if (isLoading) {
      this._popup.querySelector(".popup__submit-button").textContent =
        "Сохранение...";
    } else {
      this._buttonEditAvatar.textContent = this._buttonAvatarText;
    }
  }
}
