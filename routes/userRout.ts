import {Router} from 'express';

export const userRout = Router(); // используется в app.ts
import Middleware from '../middleware/middleware';
import userController from '../controllers/userController';

userRout.get('/',
    (req, res, next) => {
        Middleware.logDate(req, res, next)
    },
    (req, res) => {
        userController.getUser(req, res);
    });

userRout.post('/',
    (req, res, next) => {
        Middleware.logDate(req, res, next)
    },
    (req, res) => {
        userController.createUser(req, res);
    });

userRout.put('/:id',
    (req, res, next) => {
        Middleware.logDate(req, res, next)
    },
    (req, res, next) => {
        Middleware.auth(req, res, next)
    },
    (req, res) => {
        userController.updateUser(req, res);
    }
);

userRout.post('/login',
    (req, res) => {
        userController.login(req, res);
    });
