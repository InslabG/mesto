import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import constants from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const cardAddBtn = document.querySelector(".profile__add-button");                      // Кнопка "Добавить карточку"
const profileEditBtn = document.querySelector(".profile__edit-button");                 // Кнопка "Редактировать профиль"



///Менеджер работы с данными профиля
const userInfo = new UserInfo({nameSelector: ".profile__name", aboutSelector: ".profile__description"});

///Менеджер работы со списком карточек
const cardSection = new Section({
  items: constants.initialCards, 
  renderer: (item) => {
    const card = createCard({imgSrc: item.link, caption: item.name, templateSelector: "#card-template", cardClickHandler: cardClickHandler});
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
const addCardPopup = new PopupWithForm("#card-edit-popup", (data)=>{ 
  const card = createCard({imgSrc: data["card-url"], caption: data["card-name"], templateSelector: "#card-template", cardClickHandler: cardClickHandler});
  cardSection.addItem(card.generateCard());
});
addCardPopup.setEventListeners();


///Функция создания карточки
/// cardData:
///     imgSrc - ссылка на картинку карточки
///     caption - подпись карточки
///     templateSelector - селектор шаблона карточки
///     cardClickHandler - функция обработчик клика на картинку карточки
const createCard = (cardData) => {
  return new Card({ cardImgSrc: cardData.imgSrc, cardText: cardData.caption}, cardData.templateSelector, cardData.cardClickHandler);
};


//Нажатие кнопки "Редактировать профиль"
profileEditBtn.addEventListener('click', (evt) => { 
  profileEditorValidator.setOpenFormValidationState();
  profilePopup.open(userInfo.getUserInfo());
});

//Нажатие кнопки "Добавить карточку"
cardAddBtn.addEventListener('click', (evt) => { 
  cardEditorValidator.setOpenFormValidationState();
  addCardPopup.open(); 
});

//Добавляем карточки из стартового массива
cardSection.renderItems();



///Подключаем валидацию
const cardEditorValidator = new FormValidator(constants.validationConfig, addCardPopup.getForm());
cardEditorValidator.enableValidation();
const profileEditorValidator = new FormValidator(constants.validationConfig, profilePopup.getForm());
profileEditorValidator.enableValidation();