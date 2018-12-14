var User = require('../models/UserModel'); 
var jwt = require("jsonwebtoken");

var UserController = {
    liste: function(req,res){ //ok
        User.find()
            .then((users)=>
                res.json({status: true, users: users}))
            .catch((err)=>
                res.json({status: false, message: err.message}))
    },

    ajout: function(req,res){ //ok
        var newUser = new User(req.body);
        newUser.validate()
            .catch((user) => 
                res.json({status: false, message: "user validation failed: "+ user }))
            .then(() => 
                newUser.save())
            .catch (() =>  
                res.json({status: false, message: "un user avec cet email existe deja"}))
            .then(() =>
                res.json({status: true, message: "user ajoute"}))
    },

    demandejeton: function(req,res){ //ok
        if(req.query.name && req.query.password){
            User.findOne({"name": req.query.name, "password": req.query.password})
                .then((user) => {
                    if(user == null){
                        res.json({status: false, message: "name et/ou password incorrects"});
                    } else {
                        var payload = { name: user.name, password: user.password, admin: user.admin }
                        var token = jwt.sign( payload, "maclesecrete", { expiresIn: "1h"});
                        res.json({ status: true, message: token })
                    }
                })
        } else {
            res.json({ status: false, message: "name et/ou password absents"})
        }
    },

    verifjeton: function (req, res) { //ok
        var token = req.query.token;
        if (!token) {
            res.json({status: false, message: "token absent"});
        } else {
            jwt.verify(token, "maclesecrete", function (err, payload) {
                if (err) {
                    res.json({status: false, message: "token incorrect : " + err.message});
                } else {
                    console.log(payload);
                    res.json({status: true, message: "token correct:"});
                }
            })
        }
    },

    verifJWT: function (req, res, next) { //ok
        var token = req.query.token;
        if (!token) {
            res.json({status: false, message: "token absent"});
        } else {
            jwt.verify(token, "maclesecrete", function (err, payload) {
                if (err) {
                    res.json({status: false, message: "token incorrect : " + err.message});
                } else {
                    req.payload = payload;
                    next();
                }
            })
        }
    },

    verifAdmin: function(req, res, next) { //ok
        if(!req.payload.admin){
            return res.json({status: false, message: "user n'est pas admin"});
        } else {
            next();
        }
    }
}
module.exports = UserController;