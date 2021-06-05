import utils from './utils/utils.js';

export default class Card {
    constructor(cardData, templateSelector) {
        this._cardText = cardData.cardText;
        this._cardImgSrc = cardData.cardImgSrc;
        this._cardTemplateSelector = templateSelector;
        this._cardElement = this._getTemplate();
        this._cardImgElement = this._cardElement.querySelector('.card__img');
        this._cardCaptionElement = this._cardElement.querySelector('.card__caption');
        this._cardDelButton = this._cardElement.querySelector('.card__del-btn');
        this._cardLikeButton = this._cardElement.querySelector('.card__like-btn');
    }

    /// Функция возвращает шаблон карточки
    _getTemplate() {
        return document.querySelector(this._cardTemplateSelector).content.querySelector('.card').cloneNode(true);        
    }
    
    /// Функция удаления карточки
    _removeCard() {
        this._cardElement.remove();
    }

    /// Функция обработки клика кнопки like
    _likeButtonHandler() {
        this._cardLikeButton.classList.toggle('card__like-btn_active');
    }

    /// Функция вешает обработчики на элементы карточки
    _addEventListeners() {
        //Обработчик кнопки удаления карточки
        this._cardDelButton.addEventListener('click', () => { this._removeCard(); });
        
        //Обработчик кнопки like
        this._cardLikeButton.addEventListener('click', () => { this._likeButtonHandler(); });
        
        //Обработчик клика по картинке
        this._cardImgElement.addEventListener('click', () => { this._openImgPopup(); });
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

    /// Фкнкция возвращает элемент карточки
    generateCard() {
        this._cardImgElement.src = this._cardImgSrc;
        this._cardCaptionElement.textContent = this._cardImgElement.alt = this._cardText;
        this._addEventListeners()    
        return this._cardElement;
    }
}

