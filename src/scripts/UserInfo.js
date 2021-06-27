export default class UserInfo {

    constructor(data) {
        this._nameSelector = data.nameSelector;
        this._aboutSelector = data.aboutSelector;
        this._nameElement = document.querySelector(this._nameSelector);
        this._aboutElement = document.querySelector(this._aboutSelector);
    }

    getUserInfo() {
        return { "profile-name": this._nameElement.textContent, "profile-job": this._aboutElement.textContent };
    }

    setUserInfo(data) {
        this._nameElement.textContent = data["profile-name"];
        this._aboutElement.textContent = data["profile-job"];
    }



}