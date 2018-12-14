var express = require('express');
var membreRouter = express.Router();

var membreController = require('../controllers/MembreController');
var userController = require('../controllers/UserController');


membreRouter.use(userController.verifJWT); //ok

membreRouter.get('/',membreController.liste); //ok
membreRouter.get('/:id',membreController.id); //ok
membreRouter.post('/',membreController.post); //ok
membreRouter.put('/',membreController.put); //ok
membreRouter.delete('/:id',membreController.delete); //ok

module.exports = membreRouter;