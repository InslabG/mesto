export default class FormValidator {
    constructor(config, form) {
        this._config  = config;
        this._form = form;
        this._submitButton = form.querySelector(config.submitButtonClassName);
        this._formInputs = Array.from(form.querySelectorAll(config.inputClassName));
    }


    /// Функция проверяет валидность заполнения всех input'ов на форме
    _isFormValid() {
        return !this._formInputs.some(input => !input.validity.valid);
    }


    /// Функция отображает/скрывает ошибку валидации input'a на форме
    /// input - валидируемый input
    /// state - необязательный bool параметр: если он передан, то он определяет валидность input'а
    _setInputValidationState(input, state) {
        if(state === undefined) 
            state = input.validity.valid;
        const errorSpan = this._form.querySelector(`.${input.name}-error`);
        if(state){
            errorSpan.textContent = '';
            input.classList.remove(this._config.inputInvalidClassName);
        } else {
            errorSpan.textContent = input.validationMessage;
            input.classList.add(this._config.inputInvalidClassName);
        }
    }

    /// Функия устанавливает доступность кнопки submit в зависимости от валидации всех input'ов на форме
    _setSubmitButtonValidationState() {
        if(this._isFormValid()){
            this._submitButton.classList.remove(this._config.submitButtonInactiveClassName);
            this._submitButton.disabled = false;
        }
        else{
            this._submitButton.classList.add(this._config.submitButtonInactiveClassName);
            this._submitButton.disabled = true;
        }
    }


    /// Функция устанавливает состояние валидации формы при открытии
    setOpenFormValidationState() {
        this._formInputs.forEach((input) => {
            this._setInputValidationState(input, true);
        });
        this._setSubmitButtonValidationState();
    }


    /// Функция устанавливает листенеры на все input'ы формы
    enableValidation() {
        this._formInputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._setInputValidationState(input);
                this._setSubmitButtonValidationState();
            });
        });
    }
}