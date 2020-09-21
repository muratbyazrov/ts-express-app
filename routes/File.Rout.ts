const multer = require("multer"); // подключили модуль для работы с загрузкой-выгрузкой фалов
const {base64encode, base64decode} = require('nodejs-base64'); // для сохранения файлов в формате base64

import {Router} from 'express';
import FileController from "../controllers/File.Controller";

export const fileRout = Router(); // используется в app.ts


const storageConfig = multer.diskStorage({ // конфигурация загружаемого файла
    destination: (req, file, cb) => {
        cb(null, "upload");
    },
    filename: (req, file, cb) => {
        cb(null, base64encode(file.originalname));
    }
});

fileRout.post('/',
    (req, res, next) => {
        console.time('Watcher');
        next();
    },
    multer({storage: storageConfig}).single(""), // загружается один файл
    (req, res) => {
        FileController.upload(req, res);
        console.timeEnd('Watcher');
    });


fileRout.get('/:fileName',
    (req, res, next) => {
        console.time('Watcher');
        next();
    },
    (req, res) => {
        FileController.download(req, res);
        console.timeEnd('Watcher');
    });
