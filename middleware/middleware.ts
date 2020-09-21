const data = require('../data/user.json'); // доступ к users.json


export default class Middleware {
  // защищает данные пользователя от перезаписи токеном
  static auth(req, res, next) {
    const { authorization } = req.headers;
    const reqToken = authorization.slice(7,); // получили чистый токен из загаловков
    const userId = req.params.id; // взяли айлишник из запроса
    const updateElement = data.find(item => item.id == userId); // нашли по нему пользователя
    if(updateElement.token == reqToken) { // если токены равны, разрешаем след рут
      next();
    } else {
      res.status(403).send({message: 'ошибка доступа'})
    }
  }
}
