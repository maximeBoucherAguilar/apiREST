var Membre = require('../models/MembresModel'); 

var MembreController = {

    liste: function(req, res){ //ok
        Membre.find()
            .then((membres)=>
                res.json({status: true, membres: membres}))
            .catch((err)=>
                res.json({status: false, message: err.message}))
    },

    id: function(req, res){ //ok
        Membre.findOne({"id": req.params.id},{_id:0})
            .then((membre)=> {
                if(membre){
                    res.json({status: true, membres: membre});
                } else {
                    res.json({status: false, message: "membre inexistant"});
                }
            })
            .catch((err)=>
                res.json({status: false, message: err.message}))
    },

    post: function(req,res){ //ok
        var newMembre = new Membre(req.body);
        newMembre.validate()
            .catch((membre) => 
                res.json({status: false, message: "membre validation failed: "+ membre }))
            .then(() => 
                newMembre.save())
            .catch (() =>  
                res.json({status: false, message: "un membre avec cet id existe deja"}))
            .then(() => 
                res.json({status: true, message: "membre ajoute"}))
    },

    put(req, res) { //ok
        Membre.findOneAndUpdate({"id": req.body.id}, req.body)
            .then(membre => {
                if (membre == null) {
                    res.json({status: false, message: 'membre inexistant'})
                } else {
                    res.json({status: true, message: 'membre modifie'})
                }
            })
            .catch((err) => 
                res.json({status: false, message: err.message}))
    },

    delete : function(req, res){ //ok
        Membre.deleteOne({"id": req.params.id})
            .then((status) => {
                if(status.n == 0){
                    res.json({status: false, message:"membre inexistant"})
                } else {
                    res.json({"status": true, message: "membre supprime"})
                }
            })
            .catch((err) => 
                res.json({status: false, message: err.message}))
    }
}
module.exports = MembreController;