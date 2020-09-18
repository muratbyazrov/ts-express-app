const express = require('express'); // подключили экспресс

const bodyParser = require('body-parser'); // объединяет приходящие пакеты

import { userRout } from './routes/userRout' // импортировали рут
import { fileRout } from './routes/fileRout' // импортировали рут

const app = express(); // Создали приложение на express

app.use(bodyParser.json());
app.use('/api/user', userRout);
app.use('/api/file', fileRout);

// Наше приложение будем слушать запросы, которые приходят на PORT
app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
