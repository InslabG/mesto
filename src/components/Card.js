export default class Card {
    constructor(cardData, templateSelector, cardHandlers) {
        this.id = cardData._id;
        this._cardText = cardData.name;
        this._cardImgSrc = cardData.link;
        this._isDeletable = cardData.userId === cardData.owner._id;
        this._likeCount = cardData.likes.length;
        this._isCardLiked = this._chekCardLiked(cardData.userId, cardData.likes);
        this._cardClickHandler = cardHandlers.cardClickHandler;
        this._cardDeleteHandler = cardHandlers.cardDeleteHandler;
        this._cardLikeHandler = cardHandlers.cardLikeHandler;
        this._cardTemplateSelector = templateSelector;
        this._cardElement = this._getTemplate();
        this._cardImgElement = this._cardElement.querySelector('.card__img');
        this._cardCaptionElement = this._cardElement.querySelector('.card__caption');
        this._cardDelButton = this._cardElement.querySelector('.card__del-btn');
        this._cardLikeButton = this._cardElement.querySelector('.card__like-btn');
        this._cardLikeCounter = this._cardElement.querySelector('.card__like-counter');
    }

    /// Функция возвращает шаблон карточки
    _getTemplate() {
        return document.querySelector(this._cardTemplateSelector).content.querySelector('.card').cloneNode(true);        
    }
    

    _chekCardLiked(userId, likes) {
        for(let i = 0; i < likes.length; i++)
            if(likes[i]._id === userId)
                return true;
        return false;
    }


    /// Функция удаления карточки
    removeCard() {
        this._cardElement.remove();
    }

    /// Функция обработки клика кнопки like
    toggleLike(count) {
        this._cardLikeButton.classList.toggle('card__like-btn_active');
        this._cardLikeCounter.textContent = count;
    }

    isLikeActive() {
        return this._cardLikeButton.classList.contains('card__like-btn_active');
    }


    /// Функция вешает обработчики на элементы карточки
    _addEventListeners() {
        //Обработчик кнопки удаления карточки
        this._cardDelButton.addEventListener('click', () => { this._cardDeleteHandler(this); });
        
        //Обработчик кнопки like
        this._cardLikeButton.addEventListener('click', () => { this._cardLikeHandler(this); });
        
        //Обработчик клика по картинке
        this._cardImgElement.addEventListener('click', () => { this._openImgPopup(); });
    }

    /// Функция открытия попапа картинки
    /// imgSrc - ссылка на картинку
    /// caption - подпись к картинке
    _openImgPopup() {
        this._cardClickHandler(this._cardImgSrc, this._cardText);
    }

    /// Фкнкция возвращает элемент карточки
    generateCard() {
        this._cardImgElement.src = this._cardImgSrc;
        this._cardCaptionElement.textContent = this._cardImgElement.alt = this._cardText;
        if(this._isDeletable === false)
            this._cardDelButton.classList.add('common_hidden');

        
        if(this._isCardLiked)
            this._cardLikeButton.classList.add('card__like-btn_active');

        this._cardLikeCounter.textContent = this._likeCount;
        this._addEventListeners();    
        return this._cardElement;
    }
}

