const multer = require("multer"); // подключили модуль для работы с загрузкой-выгрузкой фалов

import {Router} from 'express';
import FileController from "../controllers/File.Controller";

export const fileRout = Router(); // используется в app.ts

const upload = multer({dest: "upload"}); // Конфигурация. Ук-ся папка, куда загружать

const storageConfig = multer.diskStorage({
    destination: "upload",
    filename: 'fileName'
})

fileRout.post('/',
    (req, res, next) => {
        console.time('Watcher');
        next();
    },
    upload.single(""), // загружается один файл
    (req, res) => {
        FileController.upload(req, res);
        console.timeEnd('Watcher');
    });

/*fileRout.post('/', multer({storage: storageConfig}).single(""), // загружается один файл
    (req, res) => {
        FileController.upload(req, res);
    });*/


fileRout.get('/:fileName',
    (req, res, next) => {
        console.time('Watcher');
        next();
    },
    (req, res) => {
        FileController.download(req, res);
        console.timeEnd('Watcher');
    });
