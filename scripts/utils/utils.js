const MOUSE_LEFT_BTN_CODE = 0;                                      // Код-признак нажатия левой кнопки мыши

function _openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', _closePopupByEscape);      // Добавляю листенер нажатия Esc
}

/// Функция возвращает открытый попап
function _getOpenedPopup() {
  return document.querySelector('.popup_opened');
}

/// Функция-обработчик нажатия на клавишу в документе
function _closePopupByEscape(evt) {
  if(evt.key === 'Escape'){
    _closePopup(_getOpenedPopup());
  }
}

function _closePopupByOverlay(evt) {
    if((evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) && evt.button === MOUSE_LEFT_BTN_CODE){
        _closePopup(_getOpenedPopup());
    }
}

function _closePopup(popup) {
  document.removeEventListener('keydown', _closePopupByEscape);     // Снимаю листенер нажатия Esc
  popup.classList.remove("popup_opened");
}
  
export default {
    /// Функция открытия попапа 
    /// popup - ссылка на попап
    openPopup: function(popup) { _openPopup(popup); },

    /// Функция закрытия попапа по нажатию на overlay
    closePopupByOverlay: function (evt) { _closePopupByOverlay(evt); },
    
    /// Функция закрытия попапа
    /// popup - ссылка на попап
    closePopup: function(popup) { _closePopup(popup); }
};  