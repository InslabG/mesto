import constants from '../utils/constants.js';

export default class Popup {

    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._bindedHandleEscClose = this._handleEscClose.bind(this);
        this._bindedHandleOverlayClose = this._handleOverlayClose.bind(this);
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape'){
            this.close();
          }
    }

    _handleOverlayClose(evt) {
        if((evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) && evt.button === constants.MOUSE_LEFT_BTN_CODE){
            this.close();
        }
    }
    
    setEventListeners() {
        this._popup.addEventListener('mousedown', this._bindedHandleOverlayClose);
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener('keydown', this._bindedHandleEscClose);      // Добавляю листенер нажатия Esc
    }

    close() {
        document.removeEventListener('keydown', this._bindedHandleEscClose);     // Снимаю листенер нажатия Esc
        this._popup.classList.remove("popup_opened");
    }

}
