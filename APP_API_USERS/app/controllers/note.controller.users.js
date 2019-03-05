const schemas = require('../models/note.model.users.js');
const isBase64 = require('is-base64');
const date = require('date-and-time');
const User = schemas.User;

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

exports.addUser = (req,res) => {
    if(req.method=='POST'){
        if(!req.body) {
            return res.status(400).send({
                message: "Empty JSON"
            });
        }
        console.log(req.body);
        const user = new User({
            username:req.body.username,
            password:req.body.password
        });

        if(!user.password.match("^[a-fA-F0-9]{40}$")){
            return res.status(400).send({});
        }

        user.save().then(data => {
            res.status(201).send({
                //Act Created Successfully!
            });
        }).catch(err => {
            res.status(400).send({
                // message: "ActId provided is not unique!"
            });
        });
    }
    else{
        res.status(405).send({});
    }
};

exports.removeUser = (req,res) => {
    if(req.method=="DELETE"){
        if(!req.body) {
            return res.status(400).send({
                message: "Empty JSON"
            });
        }

        console.log(req.params.username);
        User.findOneAndDelete({username:req.params.username},function(err,callback){
            if(callback)
                res.status(200).send({});
            else
                res.status(400).send({});

        });
    }
    else{
        res.status(405).send({});
        console.log(req.method);
    }
};

//List all users
exports.listUsers = (req,res) => {
    if(req.method == 'GET'){
        if(!req.body){
            res.status(400).send({
                // message: "user Name missing!"
            });
        }

            User.find({}, 'username', function(err, someValue){
                    if(err)
                    {
                        res.status(400).send({
                            // message: "user Name missing!"
                        });
                    }
                  }
                ).then(data => {
                if(data.length){
                          res.status(200).send(data);
                }
                else{
                    res.status(204).send({});
                }
            });
    }
    else{
        res.status(405).send();
    }
};


exports.authenticateUser = (req,res) => {
    if(req.method == 'POST'){
        var username = req.body.username;
        User.find({username:username}).then(data => {
            if(data.length == 0){
                res.status(400).send({
                    message: "username doesn't exist"
                });
            }
            else{
                res.status(200).send({});
            }
        });
    }
    else{
        res.status(405).send();
    }
}
