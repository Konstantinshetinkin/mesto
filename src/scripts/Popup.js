export class Popup {
    constructor(selectorPopup){
        this._popup = document.querySelector(selectorPopup)
    }
    open(){
        this._popup.classList.add("popup__opened");
        this.setEventListeners()
    }
    close(){
        this._popup.classList.remove("popup__opened");
        this._popup.removeEventListener('click',this._handleClickOverlayClose.bind(this))
        document.removeEventListener('keydown',this._handleEscClose.bind(this))
    }
    _handleEscClose(evt){
        if (evt.key === "Escape") {
            this.close();
          }
    }
    _handleClickOverlayClose(evt){
        if (evt.target.classList.contains("overlay")) {
                this.close();
        }
    }
    setEventListeners(){
        this._popup.addEventListener('click',this._handleClickOverlayClose.bind(this))
        this._popup.querySelector('.popup__close-icon').addEventListener('click',this.close.bind(this))
        document.addEventListener('keydown',this._handleEscClose.bind(this))
    }
}