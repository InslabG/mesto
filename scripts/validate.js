function enableValidation(config){

    /// Функция возвращает все input'ы на форме
    /// form - ссылка на форму
    const getFormInputs = (form) => {
        return Array.from(form.querySelectorAll(config.inputClassName));
    };

    /// Функция проверяет валидность заполнения всех input'ов на форме
    /// form - ссылка на форму
    const isFormValid = (form) => {
        return !getFormInputs(form).some(input => !input.validity.valid);
    };

    /// Функция возвращает кнопку submit'a на форме
    /// form - ссылка на форму
    const getFormSubmitButton = form => form.querySelector(config.submitButtonClassName);

    /// Функция отображает/скрывает ошибку валидации input'a на форме
    /// form - ссылка на форму
    /// input - валидируемый input
    const setInputValidationState = (form, input) => {
        const errorSpan = form.querySelector(`.${input.name}-error`);
        if(input.validity.valid){
            errorSpan.textContent = '';
        } else {
            errorSpan.textContent = input.validationMessage;
        }
    };

    /// Функия устанавливает доступность кнопки submit в зависимости от валидации всех input'ов на форме
    /// form - ссылка на форму
    const setSubmitButtonValidationState = (form) => {
        const submitButton = getFormSubmitButton(form);
        if(isFormValid(form)){
            submitButton.classList.remove(config.submitButtonInactiveClassName);
            submitButton.disabled = false;
        }
        else{
            submitButton.classList.add(config.submitButtonInactiveClassName);
            submitButton.disabled = true;
        }
    };

    /// Функция устанавливает листенеры на все input'ы формы
    /// form - ссылка на форму
    const addInputListeners = (form) => {
        const inputList = getFormInputs(form);
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                setInputValidationState(form, input);
                setSubmitButtonValidationState(form);
            });
        });
    };

    /// Точка входа - перебираем все формы и устанавливаем листенеры на все input'ы
    const formList = Array.from(document.querySelectorAll(config.formClassName));
    formList.forEach((form) => {
        addInputListeners(form)
    });

}