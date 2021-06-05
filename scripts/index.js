import Card from './Card.js';
import FormValidator from './FormValidator.js';
import constants from './utils/constants.js';
import utils from './utils/utils.js';

const cardsContainer = document.querySelector(".elements__list");                       // Контейнер для карточек
const cardEditPopup = document.querySelector("#card-edit-popup");                       // Попап редактирования карточки
const cardEditPopupForm = cardEditPopup                                                 // Форма попапа редактирования карточки
                          .querySelector(constants.validationConfig.formClassName);     
const cardEditInputName = cardEditPopup                                                 // Элемент input name редактора карточки
                          .querySelector('.popup__input_control_card-name');
const cardEditInputUrl = cardEditPopup                                                  // Элемент input url редактора карточки
                         .querySelector('.popup__input_control_card-url');      

const cardAddBtn = document.querySelector(".profile__add-button");                      // Кнопка "Добавить карточку"

const profileEditPopup = document.querySelector("#profile-edit-popup");                 // Попап редактирования профиля
const profileEditPopupForm = profileEditPopup                                           // Форма попапа редактирования карточки
                             .querySelector(constants.validationConfig.formClassName);  
const imagePopup = document.querySelector("#image-popup");                              // Попап картинки карточки
const profileName = document.querySelector(".profile__name");                           // Элемент с именем профиля на странице
const profileJob = document.querySelector(".profile__description");                     // Элемент с описанием/профессией профиля на странице
const profileEditInputName = profileEditPopup                                           // Элемент input name редактора профиля
                             .querySelector('.popup__input_control_profile-name');
const profileEditInputJob = profileEditPopup                                            // Элемент input job редактора профиля
                            .querySelector('.popup__input_control_profile-job');      
const profileEditBtn = document.querySelector(".profile__edit-button");                 // Кнопка "Редактировать профиль"



/// Функция открытия попапа редактирования профиля
/// name - необязательное значение для input'a имени профиля
/// job - необязательное значение для input'a с описанием/профессией профиля
function openProfilePopup(name, job) {
  profileEditInputName.value = name;
  profileEditInputJob.value = job;
  profileEditorValidator.setOpenFormValidationState();
  utils.openPopup(profileEditPopup);
}

/// Функция открытия попапа добавления карточки
function openCardEditPopup() {
  cardEditPopupForm.reset();
  cardEditorValidator.setOpenFormValidationState();
  utils.openPopup(cardEditPopup);
}

/// Вешает обработчики на попап редактирования
/// popup - инициализируемый попап
/// submitHandler - хендлер submit'a формы попапа
function initEditPopup(popup, submitHandler) {
  //Вешаем submit на форму попапа
  popup.querySelector(constants.validationConfig.formClassName).addEventListener('submit', (evt) => { evt.preventDefault(); submitHandler(popup); utils.closePopup(popup); });
}

/// Настраиваем обработчик submit profile-попапа
initEditPopup(profileEditPopup, (popup) => {
  profileName.textContent  = profileEditInputName.value;
  profileJob.textContent = profileEditInputJob.value;
});

/// Настраиваем обработчик submit card-editor попапа
initEditPopup(cardEditPopup, (popup) => {
  const card = new Card({cardImgSrc: cardEditInputUrl.value, cardText: cardEditInputName.value}, '#card-template');
  cardsContainer.prepend(card.generateCard());
});

// Добавляю листенер нажатия на overlay для всех попаов
[profileEditPopup, cardEditPopup, imagePopup].forEach(popup => popup.addEventListener('mousedown', utils.closePopupByOverlay));  

//Нажатие кнопки "Редактировать профиль"
profileEditBtn.addEventListener('click', (evt) => { 
  openProfilePopup(profileName.textContent, profileJob.textContent); 
});

//Нажатие кнопки "Добавить карточку"
cardAddBtn.addEventListener('click', (evt) => { 
  openCardEditPopup(cardEditPopup); 
});

//Добавляем карточки из стартового массива
constants.initialCards.forEach(item => {
  const card = new Card({ cardImgSrc: item.link, cardText: item.name}, "#card-template");
  cardsContainer.append(card.generateCard());
});


///Подключаем валидацию
const cardEditorValidator = new FormValidator(constants.validationConfig, cardEditPopupForm);
cardEditorValidator.enableValidation();
const profileEditorValidator = new FormValidator(constants.validationConfig, profileEditPopupForm);
profileEditorValidator.enableValidation();