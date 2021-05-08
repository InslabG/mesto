const initialCards = [
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


const cardTemplate = document.querySelector("#card-template").content;      // Шаблон карточки
const cardsContainer = document.querySelector(".elements__list");           // Контейнер для карточек
const cardEditPopup = document.querySelector("#card-edit-popup");           // Попап редактирования карточки
const cardAddBtn = document.querySelector(".profile__add-button");          // Кнопка "Добавить карточку"

const profileEditPopup = document.querySelector("#profile-edit-popup");     // Попап редактирования профиля
const profileName = document.querySelector(".profile__name");               // Элемент с именем профиля на странице
const profileJob = document.querySelector(".profile__description");         // Элемент с описанием/профессией профиля на странице
const profileEditBtn = document.querySelector(".profile__edit-button");     // Кнопка "Редактировать профиль"

const imagePopup = document.querySelector("#image-popup");                  // Попап полной картинки
const imagePopupCloseBtn = imagePopup.querySelector('.popup__close-btn');   // Кнопка закрытия попапа полной картинки

/// Функция открытия попапа 
/// popup - ссылка на попап
/// firstValue - необязательное значение для верхнего input'a попапа
/// secondValue - необязательное значение для нижнего input'a попапа
function openPopup(popup, firstValue='', secondValue='') {
  popup.querySelector('.popup__input_control_name').value = firstValue;
  popup.querySelector('.popup__input_control_job').value = secondValue;
  popup.classList.toggle("popup_hidden");
}

/// Функция открытия попапа картинки
/// imgSrc - ссылка на картинку
/// caption - подпись к картинке
function openImgPopup(imgSrc, caption){
  imagePopup.querySelector('.popup__img').src = imgSrc;
  imagePopup.querySelector('.popup__img-caption').textContent = caption;
  imagePopup.classList.toggle("popup_hidden");
}

/// Функция закрытия попапа
function closePopup(popup) {
    popup.classList.toggle("popup_hidden");
}

/// Функция генерации новой карточки
/// cardImage - ссылка на картинку
/// cardText - подпись картинки
function createCard(cardImage, cardText) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__img').src = cardImage;
  newCard.querySelector('.card__img').alt = cardText;
  newCard.querySelector('.card__caption').textContent = cardText;
  
  //Обработчик кнопки удаления карточки
  newCard.querySelector('.card__del-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    newCard.remove();
  });

  //Обработчик кнопки like
  newCard.querySelector('.card__like-btn').addEventListener('click', evt => {
    evt.preventDefault();
    evt.target.classList.toggle('card__like-btn_active');
  });

   //Обработчик клика по картинке
  newCard.querySelector('.card__img').addEventListener('click', evt => {
    evt.preventDefault();
    openImgPopup(cardImage, cardText);
  });

  return newCard;
}

/// Вешает обработчики на попап редактирования
/// popup - инициализируемый попап
/// submitHandler - хендлер submit'a формы попапа
function initEditPopup(popup, submitHandler){
  //Вешаем клик на close button
  popup.querySelector('.popup__close-btn').addEventListener('click', (evt) => { 
    evt.preventDefault(); 
    closePopup(popup); 
  });

  const firstInput  = popup.querySelector('.popup__input_control_name');
  const secondInput = popup.querySelector('.popup__input_control_job');

  //Вешаем submit на форму попапа
  popup.querySelector('.popup__content-form').addEventListener('submit', (evt) => { evt.preventDefault(); submitHandler(firstInput, secondInput); closePopup(popup); });
}

/// Настраиваем обработчики profile попапа
initEditPopup(profileEditPopup, (firstInput, secondInput) => {
  profileName.textContent = firstInput.value;
  profileJob.textContent = secondInput.value;
});

/// Настраиваем обработчики card-editor попапа
initEditPopup(cardEditPopup, (firstInput, secondInput) => {
  cardsContainer.prepend(createCard(secondInput.value, firstInput.value));
});


//Нажатие кнопки "Редактировать профиль"
profileEditBtn.addEventListener('click', (evt) => { 
  evt.preventDefault(); 
  openPopup(profileEditPopup, profileName.textContent, profileJob.textContent); 
});

//Нажатие кнопки "Добавить карточку"
cardAddBtn.addEventListener('click', (evt) => { 
  evt.preventDefault(); 
  openPopup(cardEditPopup); 
});

//Хендлер кнопки закрытия попапа картинки
imagePopupCloseBtn.addEventListener('click', (evt) => {  
  evt.preventDefault(); 
  closePopup(imagePopup);
});

//Добавляем карточки из стартового массива
initialCards.forEach(item => {
  cardsContainer.append(createCard(item.link, item.name));
});