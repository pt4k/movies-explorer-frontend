class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }

  //получить ответ
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  //получаем массив карточек
  getMovies() {
    return (
      fetch(this._baseUrl),
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
      }.then(this._handleResponse)
    );
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});

export default mainApi;
