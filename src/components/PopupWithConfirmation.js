import Popup from './Popup.js';
import constants from '../utils/constants.js';


export default class PopupWithConfirmation extends Popup {

    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._formElement = this._popup.querySelector(constants.validationConfig.formClassName);
        this.setEventListeners()
    }


    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => { evt.preventDefault(); this._submitCallback(this._card); });
    }

    open(card) {
        this._card = card;
        super.open();
    }


}