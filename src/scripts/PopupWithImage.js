import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    
    constructor(popupSelector) {
        super(popupSelector);
        this._imgElement = this._popup.querySelector('.popup__img');
        this._captionElement = this._popup.querySelector('.popup__img-caption');
    }

    open(imgSrc, caption) {
        this._imgElement.src = imgSrc;
        this._captionElement.textContent = this._imgElement.alt = caption;
        super.open();

    }
}
