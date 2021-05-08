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

let formElement = document.querySelector(".popup__content-form");         // Форма редактирования профиля
let nameInput = formElement.querySelector(".popup__input_control_name");  // Текстовое поле ввода имени профиля
let jobInput = formElement.querySelector(".popup__input_control_job");    // Текстовое поле ввода описания/профессии профиля
let profileName = document.querySelector(".profile__name");               // Элемент с именем профиля на странице
let profileJob = document.querySelector(".profile__description");         // Элемент с описанием/профессией профиля на странице
let profileEditBtn = document.querySelector(".profile__edit-button");     // Кнопка "Редактировать профиль"
let closeBtn = document.querySelector(".popup__close-btn");               // Кнопка "Закрыть попап"
let popupSection = document.querySelector(".popup");                      // Элемент попап


const cardTemplate = document.querySelector("#card-template").content;     // Шаблон карточки
const cardsContainer = document.querySelector(".elements__list");          // Контейнер для карточек

//Функция открытия попапа
function openPopup(evt) {
  evt.preventDefault();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupSection.classList.toggle("popup_hidden");
}

//Функция закрытия попапа
function closePopup(evt) {
  if (evt)
    evt.preventDefault();
  popupSection.classList.toggle("popup_hidden");
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

// Функция генерации новой карточки
function createCard(cardImage, cardText) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__img').src = cardImage;
  newCard.querySelector('.card__img').alt = cardText;
  newCard.querySelector('.card__caption').textContent = cardText;

  newCard.querySelector('.card__del-btn').addEventListener('click', () => {
    newCard.remove();
  });

  newCard.querySelector('.card__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like-btn_active');
  });

  return newCard;
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//Нажатие кнопки "Редактировать профиль"
profileEditBtn.addEventListener('click', openPopup);

//Нажатие кнопки "Закрыть попап"
closeBtn.addEventListener('click', closePopup);


initialCards.forEach(item => {
  cardsContainer.append(createCard(item.link, item.name));
});