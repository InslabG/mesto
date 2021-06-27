import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import constants from './utils/constants.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


const cardAddBtn = document.querySelector(".profile__add-button");                      // Кнопка "Добавить карточку"
const profileEditBtn = document.querySelector(".profile__edit-button");                 // Кнопка "Редактировать профиль"



///Менеджер работы с данными профиля
const userInfo = new UserInfo({nameSelector: ".profile__name", aboutSelector: ".profile__description"});

///Менеджер работы со списком карточек
const cardSection = new Section({
  items: constants.initialCards, 
  renderer: (item) => {
    const card = new Card({ cardImgSrc: item.link, cardText: item.name}, "#card-template", cardClickHandler);
    return card.generateCard();
  }
},
".elements__list"
);

///Попап картинки карточки
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const cardClickHandler = (cardImgSrc, caption) => {
  imagePopup.open(cardImgSrc, caption);
};

///Попап редактирования профиля
const profilePopup = new PopupWithForm("#profile-edit-popup", (data) => {
  userInfo.setUserInfo(data);
});
profilePopup.setEventListeners();

///Попап добавления карточки
const cardEditPopup = new PopupWithForm("#card-edit-popup", (data)=>{ 
  const card = new Card({ cardImgSrc: data["card-url"], cardText: data["card-name"]}, "#card-template", cardClickHandler);
  cardSection.addItem(card.generateCard());
});
cardEditPopup.setEventListeners();


//Нажатие кнопки "Редактировать профиль"
profileEditBtn.addEventListener('click', (evt) => { 
  profileEditorValidator.setOpenFormValidationState();
  profilePopup.open(userInfo.getUserInfo());
});

//Нажатие кнопки "Добавить карточку"
cardAddBtn.addEventListener('click', (evt) => { 
  cardEditorValidator.setOpenFormValidationState();
  cardEditPopup.open(); 
});

//Добавляем карточки из стартового массива
cardSection.renderItems();



///Подключаем валидацию
const cardEditorValidator = new FormValidator(constants.validationConfig, cardEditPopup.getForm());
cardEditorValidator.enableValidation();
const profileEditorValidator = new FormValidator(constants.validationConfig, profilePopup.getForm());
profileEditorValidator.enableValidation();