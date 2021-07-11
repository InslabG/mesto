export default class UserInfo {

    constructor(data) {

        this._nameSelector = data.nameSelector;
        this._aboutSelector = data.aboutSelector;
        this._avatarSelector = data.avatarSelector;
        this._nameElement = document.querySelector(this._nameSelector);
        this._aboutElement = document.querySelector(this._aboutSelector);
        this._avatarElement = document.querySelector(this._avatarSelector);
    }


    getUserId() {
        return this._id;
    }

    getUserInfo() {
        return { name: this._nameElement.textContent, about: this._aboutElement.textContent };
    }

    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._aboutElement.textContent = data.about;
        this._avatarElement.src = data.avatar;
        this._id = data._id;
    }



}