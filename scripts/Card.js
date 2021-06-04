import utils from './utils/utils.js';

export default class Card {
    constructor(cardData, templateSelector) {
        this._cardText = cardData.cardText;
        this._cardImgSrc = cardData.cardImgSrc;
        this._cardTemplateSelector = templateSelector;
    }

    /// Функция возвращает шаблон карточки
    _getTemplate() {
        return document.querySelector(this._cardTemplateSelector).content.querySelector('.card').cloneNode(true);        
      }
    
    /// Фкнкция возвращает элемент карточки
    generateCard() {
        this._cardElement = this._getTemplate();
        const imgElement = this._cardElement.querySelector('.card__img');
        imgElement.src = this._cardImgSrc;
        this._cardElement.querySelector('.card__caption').textContent = imgElement.alt = this._cardText;
        this._addEventListeners()    
        return this._cardElement;
    }

    /// Функция вешает обработчики на элементы карточки
    _addEventListeners() {
        //Обработчик кнопки удаления карточки
        this._cardElement.querySelector('.card__del-btn').addEventListener('click', (evt) => {
            this._cardElement.remove();
        });
        
        //Обработчик кнопки like
        this._cardElement.querySelector('.card__like-btn').addEventListener('click', evt => {
            evt.target.classList.toggle('card__like-btn_active');
        });
        
            //Обработчик клика по картинке
        this._cardElement.querySelector('.card__img').addEventListener('click', evt => {
            this._openImgPopup();
        });
    }

    /// Функция открытия попапа картинки
    /// imgSrc - ссылка на картинку
    /// caption - подпись к картинке
    _openImgPopup() {
        const imagePopup = document.querySelector("#image-popup");
        const imgElement = imagePopup.querySelector('.popup__img');
        imgElement.src = this._cardImgSrc;
        imagePopup.querySelector('.popup__img-caption').textContent = imgElement.alt = this._cardText;
        utils.openPopup(imagePopup);
    }

}

