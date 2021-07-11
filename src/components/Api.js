export default class Api {
    
    constructor(params) {
        this._baseUrl = params.baseUrl;
        this._headers = params.headers;
    }

    _getHeaders() {
        return this._headers;
    }

    _handleResult(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}` + (res.message || '') );
    }


    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._getHeaders() }).then(this._handleResult);        
    }

    addCard(card) {
        return fetch(`${this._baseUrl}/cards`, { headers: this._getHeaders(), method: 'POST', body: JSON.stringify(card) }).then(this._handleResult);        
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, { headers: this._getHeaders(), method: 'DELETE' }).then(this._handleResult);        
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._getHeaders() }).then(this._handleResult);        
    }

    updateUser(user) {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._getHeaders(), method: 'PATCH', body: JSON.stringify(user) }).then(this._handleResult);        
    }

    updateAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, { headers: this._getHeaders(), method: 'PATCH', body: JSON.stringify(avatar) }).then(this._handleResult);        
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { headers: this._getHeaders(), method: 'PUT' }).then(this._handleResult);        
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { headers: this._getHeaders(), method: 'DELETE' }).then(this._handleResult);        
    }


    
}