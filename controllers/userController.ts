import {response} from "express";

const data = require('../data/user.json'); // доступ к users.json
const fs = require('fs'); // модуль для работы с файлами
const jwt = require('jsonwebtoken'); // моуль для создания токенов


export default class userController {
  // Возвращает промис. Проверяет, существавание email
  private static findUser(email) {
    return Promise.resolve(data.find(item => item.email == email));
  }

  // находит пользователя с указанным id и передает его методу, который обновляет массив данных
  static updateUser(req, res) {
    const userId = req.params.id;
    const { id, name, email, enabled, password } = req.body;
    const updateElement = data.find(item => item.id == userId);
    this.updateArr(updateElement, { id, name, email, enabled, password }, res)
  }

  // принимает элемент, перезаписывает его свойства, обновляет массив данных и передает массив методу updateData
  private static updateArr(element, obj, res) {
    const token = element.token; // токен оставляем как был
    const { id, name, email, enabled, password } = obj;
    const elementIndex = data.indexOf(element);
    const updateElement = { id, name, email, enabled, password, token };
    data.splice(elementIndex, 1, updateElement);
    this.updateData(res);
  }

  // записывает массив данных в user.json
  private static updateData(res) {
    const newArray = JSON.stringify(data);
    fs.writeFile('./data/user.json', newArray, (err) => {
      if (err) {
        res.send({err})
      }
      res.send({message: 'Регистрация успешна/ Данные обновлены'})
    })
  }

  // отдает пользователей
  static getUser(req, res) {
    res.send(data)
  }

  // создает пользователя
  static createUser(req, res) {
    const token = 'super-token'
    const {id, name, email, enabled, password} = req.body;
    data.push({id, name, email, enabled, password, token});
    this.updateData(res);
  }

  // логирование
  static login(req, res) {
    const {email, password} = req.body;
    this.findUser(email) //Ждем, пока ведется поиск по email
      .then(user => {
        const { id, name, email, enabled } = user;
        // если такого email нет, сразу выкидываем ошибку
        if (user == undefined) {
          res.status(401).send({message: 'Неправильные почта или пароль'})
        }
        // если email сущетсвует, проверям пароль
        if (user.password == password) { // если пароль правильный, то создаем токен и записываем его в json
          const token = jwt.sign({id: user.id}, 'token-key', { expiresIn: 3600*4 });
          user.token = token;
          this.updateArr(user, { id, name, email, enabled, password, token }, res)
          res.send({message: 'Успешная Авторизация'});
        } else { // если пароль неверный, отправлям ошибку
          res.status(401).send({message: 'Неправильные почта или пароль'})
        }
      })
      .catch(err => {
        res.send({message: err.message});
      })
  }

}

