const multer  = require("multer"); // подключили модуль для работы с загрузкой-выгрузкой фалов

import { Router } from 'express';
import fileController from "../controllers/fileController";
export const fileRout = Router(); // используется в app.ts

const upload = multer({dest:"upload"}); // Конфигурация. Ук-ся папка, куда загружать

fileRout.post('/', upload.single(""), // загружается один файл
    (req, res) => {
        fileController.upload(req, res);
    });


fileRout.get('/:fileName',
    (req, res) => {
        fileController.download(req, res);
    });
