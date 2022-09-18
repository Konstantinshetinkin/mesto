import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selectorPopup, handleElementSubmit) {
    super(selectorPopup);
    this._handleElementSubmit = handleElementSubmit;
    this._inputs = Array.from(this._popup.querySelectorAll(".popup__field"));
    this._form = this._popup.querySelector(".popup__form");
  }
  _getInputValues() {
    //собирает данные всех полей формы
    const item = {};
    this._inputs.forEach((input) => {
      item[input.name] = input.value
    });
    return item;
  }
  setEventListeners() {
    super.setEventListeners();
    //  но и добавляет обработчик сабмита формы.
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleElementSubmit(this._getInputValues());
    });
  }
  close() {
    //сбрасываем фоорму
    this._form.reset();
    super.close();
  }
}
