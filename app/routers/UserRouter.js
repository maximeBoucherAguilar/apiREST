var express = require('express');
var userRouter = express.Router();

var userController = require('../controllers/UserController');

userRouter.get('/',userController.verifJWT,userController.verifAdmin, userController.liste); //ok
userRouter.post('/',userController.ajout); //ok
userRouter.get('/demandejeton', userController.demandejeton); //ok
userRouter.get('/verifjeton', userController.verifjeton); //ok

module.exports = userRouter;