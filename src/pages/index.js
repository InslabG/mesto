import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import constants from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


const cardAddBtn = document.querySelector(".profile__add-button");                      // Кнопка "Добавить карточку"
const profileEditBtn = document.querySelector(".profile__edit-button");                 // Кнопка "Редактировать профиль"
const avatarEditBtn = document.querySelector(".profile__avatar-edit-btn");              // Кнопка "Редактировать аватар"


///Менеджер запросов к Api
const api = new Api({baseUrl: constants.baseUrl, headers: constants.defaultHeaders});

///Менеджер работы с данными профиля
const userInfo = new UserInfo({nameSelector: ".profile__name", aboutSelector: ".profile__description", avatarSelector: '.profile__avatar'});

///Менеджер работы со списком карточек
const cardSection = new Section({
  renderer: (item) => {
    item.userId = userInfo.getUserId();
    return createCard(item).generateCard();
  }
},
".elements__list"
);


const apiErrorHandler = msg => errorPopup.open(msg);

///Загружаем профиль и карточки
Promise
  .all([api.getUser(), api.getInitialCards()])
  .then(
    data => {
      userInfo.setUserInfo(data[0]);
      cardSection.renderItems(data[1]);
    }
  ).catch(apiErrorHandler);

///Попап картинки карточки
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();


/******** Хендлеры для карточек **********/
const cardClickHandler = (cardImgSrc, caption) => {
  imagePopup.open(cardImgSrc, caption);
};

const cardDeleteHandler = (card) => {
  confirmPopup.open(card);
};

const cardLikeHandler = (card) => {
  const updateLikePromise = card.isLikeActive() ? api.deleteLike(card.id) : api.addLike(card.id);
  updateLikePromise.then((data) => { card.toggleLike(data.likes.length); }).catch(apiErrorHandler);
};
/*****************************************/

///Попап редактирования аватара
const avatarPopup = new PopupWithForm("#avatar-edit-popup", (data) => {
  avatarPopup.setSubmitBtnText('Сохранение...');
  api.updateAvatar(data)
    .then(user => {userInfo.setUserInfo(user);  })
    .catch(apiErrorHandler)
    .finally( () => { avatarPopup.close(); avatarPopup.setSubmitBtnText('Сохранить');});
});
avatarPopup.setEventListeners();


///Попап редактирования профиля
const profilePopup = new PopupWithForm("#profile-edit-popup", (data) => {
  profilePopup.setSubmitBtnText('Сохранение...');
  api.updateUser({ name: data.name, about: data.about })
    .then(user => { userInfo.setUserInfo(user); } )
    .catch(apiErrorHandler)
    .finally( () => { profilePopup.close(); profilePopup.setSubmitBtnText('Сохранить');});
});
profilePopup.setEventListeners();

///Попап добавления карточки
const addCardPopup = new PopupWithForm("#card-edit-popup", (data)=>{ 
  addCardPopup.setSubmitBtnText('Сохранение...');
  api.addCard({ name: data["card-name"], link: data["card-url"]})
    .then(data => {
      data.userId = userInfo.getUserId();
      cardSection.addItem(createCard(data).generateCard());
      addCardPopup.close(); 
      addCardPopup.setSubmitBtnText('Сохранить');})
    .catch(apiErrorHandler)
    .finally( () => { addCardPopup.close(); addCardPopup.setSubmitBtnText('Сохранить');});
  });
  addCardPopup.setEventListeners();

///Попап подтверждения
const confirmPopup = new PopupWithConfirmation("#card-delete-confirm-popup", (card) => {
  api.deleteCard(card.id)
    .then(card.removeCard()).catch(apiErrorHandler);;
});


///Попап ошибки
const errorPopup = new PopupWithConfirmation("#error-message-popup", (msg) => {
  console.log(msg);
});



///Функция создания карточки
/// cardData: объект данных карточки, возвращаемый api
const createCard = (cardData) => {
  return new Card(cardData, "#card-template", {cardClickHandler: cardClickHandler, cardDeleteHandler: cardDeleteHandler, cardLikeHandler: cardLikeHandler});
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

avatarEditBtn.addEventListener('click', (evt) => { 
  avatarEditorValidator.setOpenFormValidationState();
  avatarPopup.open();
});


///Подключаем валидацию
const cardEditorValidator = new FormValidator(constants.validationConfig, addCardPopup.getForm());
cardEditorValidator.enableValidation();
const profileEditorValidator = new FormValidator(constants.validationConfig, profilePopup.getForm());
profileEditorValidator.enableValidation();
const avatarEditorValidator = new FormValidator(constants.validationConfig, avatarPopup.getForm());
avatarEditorValidator.enableValidation();