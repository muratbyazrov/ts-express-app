import {Router} from 'express';

export const userRout = Router(); // используется в app.ts
import Middleware from '../middleware/middleware';
import UserController from '../controllers/User.Controller';

userRout.get('/',
    (req, res, next) => {
        console.time('Watcher')
        next();
    },
    (req, res) => {
        UserController.getUser(req, res);
        console.timeEnd('Watcher');
    });

userRout.post('/',
    (req, res, next) => {
        console.time('Watcher')
        next();
    },
    (req, res) => {
        UserController.createUser(req, res);
        console.timeEnd('Watcher');
    });

userRout.put('/:id',
    (req, res, next) => {
        console.time('Watcher')
        next();
    },
    (req, res, next) => {
        Middleware.auth(req, res, next)
    },
    (req, res) => {
        UserController.updateUser(req, res);
        console.timeEnd('Watcher');
    }
);

userRout.post('/login',
    (req, res, next) => {
        console.time('Watcher')
        next();
    },
    (req, res) => {
        UserController.login(req, res);
        console.timeEnd('Watcher');
    });
