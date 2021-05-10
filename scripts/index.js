const cardsContainer = document.querySelector(".elements__list");           // Контейнер для карточек
const cardEditPopup = document.querySelector("#card-edit-popup");           // Попап редактирования карточки
const cardAddBtn = document.querySelector(".profile__add-button");          // Кнопка "Добавить карточку"

const profileEditPopup = document.querySelector("#profile-edit-popup");     // Попап редактирования профиля
const profileName = document.querySelector(".profile__name");               // Элемент с именем профиля на странице
const profileJob = document.querySelector(".profile__description");         // Элемент с описанием/профессией профиля на странице
const profileEditBtn = document.querySelector(".profile__edit-button");     // Кнопка "Редактировать профиль"

const imagePopup = document.querySelector("#image-popup");                  // Попап полной картинки
const imagePopupCloseBtn = imagePopup.querySelector('.popup__close-btn');   // Кнопка закрытия попапа полной картинки



/// Функция закрытия попапа
/// popup - ссылка на попап
function closePopup(popup) {
  popup.classList.add("popup_hidden");
}

/// Функция открытия попапа 
/// popup - ссылка на попап
function openPopup(popup, firstValue='', secondValue='') {
  popup.classList.remove("popup_hidden");
}


/// Функция открытия попапа редактирования профиля
/// name - необязательное значение для input'a имени профиля
/// job - необязательное значение для input'a с описанием/профессией профиля
function openProfilePopup(name='', job=''){
  profileEditPopup.querySelector('.popup__input_control_name').value = name;
  profileEditPopup.querySelector('.popup__input_control_job').value = job;
  openPopup(profileEditPopup);
}

/// Функция открытия попапа добавления карточки
function openCardEditPopup(){
  cardEditPopup.querySelector('.popup__input_control_name').value = '';
  cardEditPopup.querySelector('.popup__input_control_job').value = '';
  openPopup(cardEditPopup);
}

/// Функция открытия попапа картинки
/// imgSrc - ссылка на картинку
/// caption - подпись к картинке
function openImgPopup(imgSrc, caption){
  imagePopup.querySelector('.popup__img').src = imgSrc;
  imagePopup.querySelector('.popup__img').alt = caption;
  imagePopup.querySelector('.popup__img-caption').textContent = caption;
  openPopup(imagePopup);
}


/// Функция возвращает шаблон
/// idTemplate - id шаблона
function getTemplate(idTemplate){
  return document.querySelector(idTemplate).content;        
}

/// Функция генерации новой карточки
/// cardData - данные карточки
///// cardData.cardImage - ссылка на картинку
///// cardData.cardText - подпись картинки
/// cardTemplate - шаблон карточки
function createCard(cardData, cardTemplate) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__img').src = cardData.cardImage;
  newCard.querySelector('.card__img').alt = cardData.cardText;
  newCard.querySelector('.card__caption').textContent = cardData.cardText;
  
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
    openImgPopup(cardData.cardImage, cardData.cardText);
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
  cardsContainer.prepend(createCard({ cardImage: secondInput.value, cardText: firstInput.value}, getTemplate("#card-template")));
});


//Нажатие кнопки "Редактировать профиль"
profileEditBtn.addEventListener('click', (evt) => { 
  evt.preventDefault(); 
  openProfilePopup(profileName.textContent, profileJob.textContent); 
});

//Нажатие кнопки "Добавить карточку"
cardAddBtn.addEventListener('click', (evt) => { 
  evt.preventDefault(); 
  openCardEditPopup(cardEditPopup); 
});

//Хендлер кнопки закрытия попапа картинки
imagePopupCloseBtn.addEventListener('click', (evt) => {  
  evt.preventDefault(); 
  closePopup(imagePopup);
});

//Добавляем карточки из стартового массива
initialCards.forEach(item => {
  cardsContainer.append(createCard({ cardImage: item.link, cardText: item.name}, getTemplate("#card-template")));
});