import {Router} from 'express';

export const userRoute = Router(); // используется в app.ts
import Middleware from '../middleware/middleware';
import UserController from '../controllers/User.Controller';

userRoute.get('/',
    (req, res, next) => {
        console.time('Watcher')
        next();
    },
    (req, res) => {
        UserController.getUser(req, res);
        console.timeEnd('Watcher');
    });

userRoute.post('/',
    (req, res, next) => {
        console.time('Watcher')
        next();
    },
    (req, res) => {
        UserController.createUser(req, res);
        console.timeEnd('Watcher');
    });

userRoute.put('/:id',
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

userRoute.post('/login',
    (req, res, next) => {
        console.time('Watcher')
        next();
    },
    (req, res) => {
        UserController.login(req, res);
        console.timeEnd('Watcher');
    });
