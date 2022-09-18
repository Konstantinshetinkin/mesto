import { Popup } from "./Popup";

export class PopupTypeDeleteCard extends Popup{
    constructor(selectorPopup, handleDeleteClick) {
      super(selectorPopup);
      this._handleDeleteClick = handleDeleteClick;
    }
    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleDeleteClick()
      });
    }
    changeDeleteClik(deleteCard){
      this._handleDeleteClick = deleteCard
    }
    open() {
      super.open(); 
    } 
    close() {
      super.close();
    }
  }


  