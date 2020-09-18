define("controllers/userController", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.putUser = exports.createUser = exports.getUsers = void 0;
    const data = require('../data/user.json');
    const fs = require('fs');
    exports.getUsers = (req, res) => {
        res.send({ data });
    };
    exports.createUser = (req, res) => {
        const { id, name, email, enabled } = req.body;
        data.push({ id, name, email, enabled });
        fs.writeFile('./data/user.json', data, err => res.send({ err }));
    };
    exports.putUser = (req, res) => {
        const id = req.params.id;
        const updateElement = data.find(item => item.id == id);
        console.log(updateElement);
        const { name, email, password, enabled } = req.body;
    };
});
define("routes/userRout", ["require", "exports", "express", "controllers/userController"], function (require, exports, express_1, userController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.userRout = void 0;
    exports.userRout = express_1.Router();
    exports.userRout.get('/', userController_1.getUsers);
    exports.userRout.post('/', userController_1.createUser);
    exports.userRout.put('/:id', userController_1.putUser);
});
define("app", ["require", "exports", "routes/userRout"], function (require, exports, userRout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    app.use(bodyParser.json());
    app.use('/api/user', userRout_1.userRout);
    app.listen(3000, () => {
        console.log(`App listening on port 3000`);
    });
});
//# sourceMappingURL=app.js.map