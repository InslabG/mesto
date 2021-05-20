function enableValidation(config){


    const getFormInputs = (form) => {
        return Array.from(form.querySelectorAll(config.inputClassName));
    };


    const isFormValid = (form) => {
        return !getFormInputs(form).some(input => !input.validity.valid);
    };

    const getFormSubmitButton = form => form.querySelector(config.submitButtonClassName);

    const setInputValidationState = (form, input) => {
        const errorSpan = form.querySelector(`.${input.name}-error`);
        if(input.validity.valid){
            errorSpan.textContent = '';
        } else {
            errorSpan.textContent = input.validationMessage;
        }
    };

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

    const addInputListeners = (form) => {
        const inputList = getFormInputs(form);
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                setInputValidationState(form, input);
                setSubmitButtonValidationState(form);
            });
        });
    };


    const formList = Array.from(document.querySelectorAll(config.formClassName));
    formList.forEach((form) => {
        addInputListeners(form)
    });

}