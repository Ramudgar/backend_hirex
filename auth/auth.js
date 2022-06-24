const jwt = require('jsonwebtoken');

const User = require('../models/Users');




module.exports.userGaurd = (req, res, next) => {
    try {
        const token = req.headers.authorization.split("")[1];
        const data = jwt.verify(token, "softwarica");
        console.log(data);
        User.findOne({ _id: data.userId }).then((user_data) => {
            req.userInfo = user_data;
            next();
        })
    }
    catch (error) {
        res.json({ msg: 'invalid token' })
    }
};