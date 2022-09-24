class Api {
  constructor(host, token) {
    this._host = host;
    this._token = token;
    this._getJsonOrErorr = this._getJsonOrErorr.bind(this);
    this._getHeaders = this._getHeaders.bind(this);
  }
  _getJsonOrErorr(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Ошибка при загрузке данных");
  }
  _getHeaders() {
    return {
      authorization: this._token,
      "content-type": "application/json",
    };
  }
  getCards() {
    return fetch(`${this._host}/cards`, {
      headers: this._getHeaders(),
    }).then(this._getJsonOrErorr);
  }
  getUser() {
    return fetch(`${this._host}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._getJsonOrErorr);
  }
  setUser(data) {
    return fetch(`${this._host}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.about}`,
      }),
    }).then(this._getJsonOrErorr);
  }

  createCard(item) {
    return fetch(`${this._host}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(item),
    }).then(this._getJsonOrErorr);
  }
  deleteCardFromServer(id) {
    return fetch(`${this._host}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJsonOrErorr);
  }

  deleteLike(id) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJsonOrErorr);
  }

  addLike(id) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._getJsonOrErorr);
  }

  setAvatar(data) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: `${data.avatar}`,
      }),
    }).then(this._getJsonOrErorr);
  }
}
export { Api };
