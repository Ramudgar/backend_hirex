const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User=require('../models/Users');

router.post('/user/register', (req, res) => {

    const email = req.body.email;
    const role = req.body.role;
    try{ User.findOne({ email: email, role: role })
    .then((user_data) => {
        if (user_data != null) {
            res.json({ msg: 'email already exists with the same role' });
            return;
        }
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;

        bcryptjs.hash(password, 10, (e, hashed_pw) => {

            const data = new User({
                email: email,
                username: username,
                password: hashed_pw,
                role: role,
            });
            data.save().then((data) => {
                res.json({ msg: 'Data inserted', success: true ,data});
            });
        })
    })} catch(e){
        res.status(500).json({msg:e})
    }
   
});




// For Login
router.post('/user/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    try{
        User.findOne({ email: email, role: role })
        .then((user_data) => {
            if (user_data == null) {
                res.status(400).json({ msg: 'User does not exist' });
                return;
            }
            bcryptjs.compare(password, user_data.password, (e, result) => {
                if (result) {
                    const token = jwt.sign({ _id: user_data._id }, 'softwarica', { expiresIn: '1d' });
                    res.status(200).json({ token: token, user: user_data,success:true });
                } else {
                    res.status(400).json({ msg: 'invalid credentials' });
                }
            }
            )

        })
    }catch(e){
        res.json({ msg: e });
    }
}
);





module.exports=router;
    