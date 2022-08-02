export class UserInfo {
  constructor({ profileName, profileInfo }) {
    this._name = document.querySelector(profileName);
    this._info = document.querySelector(profileInfo);
  }
  getUserInfo() {
    // возвращает объект с данными пользователя
    const profileInfo = {
      elementName: this._name.textContent,
      elementInfo: this._info.textContent,
    };
    return profileInfo;
  }
  setUserInfo(profile) {
    // принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = profile.name;
    this._info.textContent = profile.info;
  }
}
