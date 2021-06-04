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
    _setInputValidationState(input) {
        const errorSpan = this._form.querySelector(`.${input.name}-error`);
        if(input.validity.valid){
            errorSpan.textContent = '';
        } else {
            errorSpan.textContent = input.validationMessage;
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
    openFormValidationState() {
        this._formInputs.forEach((input) => {
            this._setInputValidationState(input);
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