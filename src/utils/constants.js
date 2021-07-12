
const _validationConfig = {
    formClassName: '.popup__content-form',                       // Класс форм попапов
    inputClassName: '.popup__input',                             // Класс инпутов на формах попапов
    inputInvalidClassName: 'popup__input_invalid',               // Класс невалидных инпутов 
    submitButtonClassName: '.popup__save-btn',                   // Класс кнопки submit на формах попапов
    submitButtonInactiveClassName: 'popup__save-btn_inactive',   // Класс неактивной кнопки submit на формах попапов
 };

 export default {
    validationConfig: _validationConfig,
    MOUSE_LEFT_BTN_CODE: 0,
    ESCAPE_KEY: 'Escape',
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
    defaultHeaders: {
      authorization: '4a6cc8eb-8381-4b5c-bbd7-4cf431d30844',
      'Content-Type': 'application/json'
    }
 };