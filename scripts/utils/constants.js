const _initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  


const _validationConfig = {
    formClassName: '.popup__content-form',                       // Класс форм попапов
    inputClassName: '.popup__input',                             // Класс инпутов на формах попапов
    submitButtonClassName: '.popup__save-btn',                   // Класс кнопки submit на формах попапов
    submitButtonInactiveClassName: 'popup__save-btn_inactive'    // Класс неактивной кнопки submit на формах попапов
 };

 export default {
    validationConfig: _validationConfig,
    initialCards: _initialCards
 };