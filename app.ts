const express = require('express'); // подключили экспресс

const bodyParser = require('body-parser'); // объединяет приходящие пакеты

import { userRoute } from './routes/User.Route' // импортировали рут
import { fileRoute } from './routes/File.Route' // импортировали рут

const app = express(); // Создали приложение на express

app.use(bodyParser.json());
app.use('/api/user', userRoute);
app.use('/api/file', fileRoute);

// Наше приложение будем слушать запросы, которые приходят на PORT
app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
