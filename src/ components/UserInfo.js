export class UserInfo {
  constructor({ profileName, profileInfo, profileAvatar }) {
    this._name = document.querySelector(profileName);
    this._info = document.querySelector(profileInfo);
    this._avatar = document.querySelector(profileAvatar);
  }
  getUserInfo() {
    // возвращает объект с данными пользователя
    const profileInfo = {
      elementName: this._name.textContent,
      elementInfo: this._info.textContent,
      elementAvatar: this._avatar.src,
    };
    return profileInfo;
  }
  setUserInfo(data) {
    // принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this._avatar.src = data.avatar;
  }
  setUserAvatar(data) {
    this._avatar.src = data;
  }
}
