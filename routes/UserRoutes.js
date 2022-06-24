const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User=require('../models/Users');

router.post('/user/register', (req, res) => {

    const email = req.body.email;
    const role = req.body.role;
    User.findOne({ email: email, role: role })
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
                data.save().then(() => {
                    res.json({ msg: 'Data inserted', msg: "success" });
                }).catch((e) => {
                    res.json({ msg: e });
                });
            })
        })
});


// For Login
router.post('/user/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    User.findOne({ email: email,role:role })
        .then((user_data) => {
            if (user_data == null) {
                res.json({ msg: "Invalid credentials" })
                return;
            }
            bcryptjs.compare(password, user_data, (e, result) => {

                if (result == false) {
                    res.json({ msg: "Invalid Password" });
                    return;
                }
                // now every thing is valid

                // console.log("validddddd");

                // it creates the token for the logged in user 
                // the token stores the logged in user id

                const token = jwt.sign({ userId: user_data._id }, "softwarica");
                res.json({ token: token });
            })
        })
        .catch()
});

module.exports=router;
    