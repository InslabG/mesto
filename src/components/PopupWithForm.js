import Popup from './Popup.js';
import constants from '../utils/constants.js';

export default class PopupWithForm extends Popup {

    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._formElement = this._popup.querySelector(constants.validationConfig.formClassName);;
    }


    _getInputValues() {
        const inputList = Array.from(this._formElement.querySelectorAll(constants.validationConfig.inputClassName));
        return inputList.reduce((result, input) => { result[input.name] = input.value; return result; }, {});
    }

    _setInputValues(data) {
        Object.keys(data).forEach((inputName) => {
            const input = this._formElement.querySelector(`input[name="${inputName}"]`);
            if(input)
            input.value = data[inputName];
        });
    }


    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => { evt.preventDefault(); this._submitCallback(this._getInputValues()); this.close(); });
    }

    getForm() {
        return this._formElement;
    }

    open(data) {
        if(data)
            this._setInputValues(data);
        super.open();
    }

    close() {
        this._formElement.reset();
        super.close();
    }

}