export default class Middleware {
  static logDate(req, res, next){
  const date = new Date();
    console.log(`Время обработки ${req.method}-запроса: ${date}`)
    next();
  }

  static tokenCheck() {

  }
}
