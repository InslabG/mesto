const cardsContainer = document.querySelector(".elements__list");           // Контейнер для карточек
const cardEditPopup = document.querySelector("#card-edit-popup");           // Попап редактирования карточки
const cardAddBtn = document.querySelector(".profile__add-button");          // Кнопка "Добавить карточку"

const profileEditPopup = document.querySelector("#profile-edit-popup");     // Попап редактирования профиля
const profileName = document.querySelector(".profile__name");               // Элемент с именем профиля на странице
const profileJob = document.querySelector(".profile__description");         // Элемент с описанием/профессией профиля на странице
const profileEditBtn = document.querySelector(".profile__edit-button");     // Кнопка "Редактировать профиль"

const imagePopup = document.querySelector("#image-popup");                  // Попап полной картинки



/// Функция возвращает открытый попап
function getOpenedPopup(){
  return document.querySelector('.popup_opened');
}

/// Функция-обработчик нажатия на клавишу в документе
function closePopupByEscape(evt) {
  if(evt.key === 'Escape'){
    closePopup(getOpenedPopup());
  }
}

/// Функция закрытия попапа по нажатию на overlay
function closePopupByOverlay(evt){
  if((evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) && evt.button === 0){
    closePopup(getOpenedPopup());
  }
}

/// Функция закрытия попапа
/// popup - ссылка на попап
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEscape);   // Снимаю листенер нажатия Esc
  popup.classList.remove("popup_opened");
}

/// Функция открытия попапа 
/// popup - ссылка на попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEscape);      // Добавляю листенер нажатия Esc
}

/// Функция заполняет переданные инпуты соответствующими значениями и вызывает событие input для инпутов
/// Входные данные: input1, value1, input2, value2, ...
function setInputValuesWithValidate(...data) {
  for(let i = 0; i < data.length - 1; i += 2) {
    data[i].value = data[i + 1];
    data[i].dispatchEvent(new Event('input'));
  }
}

/// Функция открытия попапа редактирования профиля
/// name - необязательное значение для input'a имени профиля
/// job - необязательное значение для input'a с описанием/профессией профиля
function openProfilePopup(name='', job=''){
  const input_name = profileEditPopup.querySelector('.popup__input_control_profile-name');
  const input_job = profileEditPopup.querySelector('.popup__input_control_profile-job');
  setInputValuesWithValidate(input_name, name, input_job, job);
  openPopup(profileEditPopup);
}

/// Функция открытия попапа добавления карточки
function openCardEditPopup(){
  const input_name = cardEditPopup.querySelector('.popup__input_control_card-name');
  const input_url = cardEditPopup.querySelector('.popup__input_control_card-url');
  setInputValuesWithValidate(input_name, '', input_url, '');
  openPopup(cardEditPopup);
}

/// Функция открытия попапа картинки
/// imgSrc - ссылка на картинку
/// caption - подпись к картинке
function openImgPopup(imgSrc, caption){
  const imgElement = imagePopup.querySelector('.popup__img');
  imgElement.src = imgSrc;
  imgElement.alt = caption;
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
  const imgElement = newCard.querySelector('.card__img');
  imgElement.src = cardData.cardImage;
  imgElement.alt = cardData.cardText;
  newCard.querySelector('.card__caption').textContent = cardData.cardText;
  
  //Обработчик кнопки удаления карточки
  newCard.querySelector('.card__del-btn').addEventListener('click', (evt) => {
    newCard.remove();
  });

  //Обработчик кнопки like
  newCard.querySelector('.card__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like-btn_active');
  });

   //Обработчик клика по картинке
  newCard.querySelector('.card__img').addEventListener('click', evt => {
    openImgPopup(cardData.cardImage, cardData.cardText);
  });

  return newCard;
}

/// Вешает обработчики на попап редактирования
/// popup - инициализируемый попап
/// submitHandler - хендлер submit'a формы попапа
function initEditPopup(popup, submitHandler){
  //Вешаем submit на форму попапа
  popup.querySelector('.popup__content-form').addEventListener('submit', (evt) => { evt.preventDefault(); submitHandler(popup); closePopup(popup); });
}

/// Настраиваем обработчик submit profile-попапа
initEditPopup(profileEditPopup, (popup)=>{
  const nameInput  = popup.querySelector('.popup__input_control_profile-name');
  const jobInput = popup.querySelector('.popup__input_control_profile-job');
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popup);
});


/// Настраиваем обработчик submit card-editor попапа
initEditPopup(cardEditPopup, (popup) => {
  const cardNameInput  = popup.querySelector('.popup__input_control_card-name');
  const cardUrlInput = popup.querySelector('.popup__input_control_card-url');
  cardsContainer.prepend(createCard({ cardImage: cardUrlInput.value, cardText: cardNameInput.value}, getTemplate("#card-template")));
});

// Добавляю листенер нажатия на overlay для всех попаов
[profileEditPopup, cardEditPopup, imagePopup].forEach(popup => popup.addEventListener('mousedown', closePopupByOverlay));  


//Нажатие кнопки "Редактировать профиль"
profileEditBtn.addEventListener('click', (evt) => { 
  openProfilePopup(profileName.textContent, profileJob.textContent); 
});

//Нажатие кнопки "Добавить карточку"
cardAddBtn.addEventListener('click', (evt) => { 
  openCardEditPopup(cardEditPopup); 
});


//Добавляем карточки из стартового массива
initialCards.forEach(item => {
  cardsContainer.append(createCard({ cardImage: item.link, cardText: item.name}, getTemplate("#card-template")));
});

//Подключаем валидацию
enableValidation({
  formClassName: '.popup__content-form',                       // Класс форм попапов
  inputClassName: '.popup__input',                             // Класс инпутов на формах попапов
  submitButtonClassName: '.popup__save-btn',                   // Класс кнопки submit на формах попапов
  submitButtonInactiveClassName: 'popup__save-btn_inactive'    // Класс неактивной кнопки submit на формах попапов
});