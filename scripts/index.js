let formElement = document.querySelector(".popup__content"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".popup__input_control_name");// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".popup__input_control_job");// Воспользуйтесь инструментом .querySelector()

let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__description");

let profileEditBtn = document.querySelector(".profile__edit-button");
let closeBtn = document.querySelector(".popup__close-btn");

let popupSection = document.querySelector(".popup");



function popupToggle(evt) {
  evt.preventDefault();
  popupSection.classList.toggle("popup_hidden");
  if(evt.currentTarget.className === "profile__edit-button"){
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupToggle(evt);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

profileEditBtn.addEventListener('click', popupToggle);
closeBtn.addEventListener('click', popupToggle);
