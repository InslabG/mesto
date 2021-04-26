let formElement = document.querySelector(".popup__content-form");         // Форма редактирования профиля
let nameInput = formElement.querySelector(".popup__input_control_name");  // Текстовое поле ввода имени профиля
let jobInput = formElement.querySelector(".popup__input_control_job");    // Текстовое поле ввода описания/профессии профиля

let profileName = document.querySelector(".profile__name");               // Элемент с именем профиля на странице
let profileJob = document.querySelector(".profile__description");         // Элемент с описанием/профессией профиля на странице

let profileEditBtn = document.querySelector(".profile__edit-button");     // Кнопка "Редактировать профиль"
let closeBtn = document.querySelector(".popup__close-btn");               // Кнопка "Закрыть попап"

let popupSection = document.querySelector(".popup");                      // Элемент попап

//Функция открытия попапа
function openPopup(evt){
  evt.preventDefault();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupSection.classList.toggle("popup_hidden");
}

//Функция закрытия попапа
function closePopup(evt){
  if(evt)
    evt.preventDefault();
  popupSection.classList.toggle("popup_hidden");
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//Нажатие кнопки "Редактировать профиль"
profileEditBtn.addEventListener('click', openPopup);

//Нажатие кнопки "Закрыть попап"
closeBtn.addEventListener('click', closePopup);
