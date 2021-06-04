import Card from './Card.js';
import FormValidator from './FormValidator.js';
import constants from './utils/constants.js';
import utils from './utils/utils.js';

const cardsContainer = document.querySelector(".elements__list");           // Контейнер для карточек
const cardEditPopup = document.querySelector("#card-edit-popup");           // Попап редактирования карточки
const cardAddBtn = document.querySelector(".profile__add-button");          // Кнопка "Добавить карточку"

const profileEditPopup = document.querySelector("#profile-edit-popup");     // Попап редактирования профиля
const imagePopup = document.querySelector("#image-popup");                  // Попап картинки карточки
const profileName = document.querySelector(".profile__name");               // Элемент с именем профиля на странице
const profileJob = document.querySelector(".profile__description");         // Элемент с описанием/профессией профиля на странице
const profileEditBtn = document.querySelector(".profile__edit-button");     // Кнопка "Редактировать профиль"



/// Функция открытия попапа редактирования профиля
/// name - необязательное значение для input'a имени профиля
/// job - необязательное значение для input'a с описанием/профессией профиля
function openProfilePopup(name, job) {
  profileEditPopup.querySelector('.popup__input_control_profile-name').value = name;
  profileEditPopup.querySelector('.popup__input_control_profile-job').value = job;
  profileEditPopup.querySelector(constants.validationConfig.formClassName).validator.openFormValidationState();
  utils.openPopup(profileEditPopup);
}

/// Функция открытия попапа добавления карточки
function openCardEditPopup() {
  cardEditPopup.querySelector('.popup__input_control_card-name').value = cardEditPopup.querySelector('.popup__input_control_card-url').value = '';
  cardEditPopup.querySelector(constants.validationConfig.formClassName).validator.openFormValidationState();
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
  profileName.textContent  = popup.querySelector('.popup__input_control_profile-name').value;
  profileJob.textContent = popup.querySelector('.popup__input_control_profile-job').value;
});

/// Настраиваем обработчик submit card-editor попапа
initEditPopup(cardEditPopup, (popup) => {
  const cardNameInput  = popup.querySelector('.popup__input_control_card-name');
  const cardUrlInput = popup.querySelector('.popup__input_control_card-url');
  const card = new Card({cardImgSrc: cardUrlInput.value, cardText: cardNameInput.value}, '#card-template');
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
  let card = new Card({ cardImgSrc: item.link, cardText: item.name}, "#card-template");
  cardsContainer.append(card.generateCard());
});

  ///Подключаем валидацию
  /// Перебираем все формы и устанавливаем листенеры на все input'ы
  const formList = Array.from(document.querySelectorAll(constants.validationConfig.formClassName));
  formList.forEach((form) => {
      const validator = new FormValidator(constants.validationConfig, form);
      form.validator = validator;
      validator.enableValidation();
  });

