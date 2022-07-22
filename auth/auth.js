const jwt = require('jsonwebtoken');

const User = require('../models/Users');



//guard
module.exports.verifyUser = function(req,res, next){

    try{
        //we have to receive the token first from client..
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, 'softwarica');
    
        console.log(data);
        console.log(data._id);

        User.findOne({_id : data._id})
        .then(function(user){
            //all the data of the logged in user is stored in user
            // console.log(user);
            req.userData = user;
            next();
        })
        .catch(function(e){
            res.status(401).json({error: e})
        })
    }
    catch(e){
        res.status(401).json({msg: e})
    }
    }





module.exports.userGaurd = (req, res, next) => {
    try {
        const token = req.headers.Authorization.split("")[1];
        const data = jwt.verify(token, "softwarica");
        console.log(data);
        User.findOne({ _id: data.userId }).then((user_data) => {
            req.userInfo = user_data;
            next();

        });

    }
    catch (error) {
        res.json({ msg: 'invalid token' })
    }
};