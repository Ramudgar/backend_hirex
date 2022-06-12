const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const company = require('../models/startup_company');

router.post('/company/register/', (req, res) => {

    const email = req.body.email;
    company.findOne({ email: email })
        .then((emp_data) => {
            if (emp_data != null) {
                res.json({ msg: 'email already exists' });
                return;
            }
            const companyName = req.body.companyName;
            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            const companyCountry = req.body.companyCountry;
            const companyState = req.body.companyState;
            const companyCity = req.body.companyCity;
            const companyZip = req.body.companyZip;
            const companyAddress = req.body.companyAddress;
            const companyPhone = req.body.companyPhone;
            const companyWebsite = req.body.companyWebsite;
            const companyLogo = req.body.companyLogo;
            const companyDescription = req.body.companyDescription;

            bcryptjs.hash(password, 10, (e, hashed_pw) => {

                const data = new company({
                    companyName: companyName,
                    email: email,
                    username: username,
                    companyAddress: companyAddress,
                    companyPhone: companyPhone,
                    companyWebsite: companyWebsite,
                    companyLogo: companyLogo,
                    companyCountry: companyCountry,
                    companyState: companyState,
                    companyCity: companyCity,
                    companyZip: companyZip,
                    companyDescription: companyDescription,
                    password: hashed_pw
                });
                data.save().then(() => {
                    res.json({ msg: 'Data inserted', msg: "success" });
                }).catch((e) => {
                    res.json({ msg: e });
                });

            })
        })
});
router.post('/company/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    company.findOne({ email: email })
        .then((company_data) => {
            if (company_data == null) {
                res.json({ msg: "Invalid credentials" })
                return;
            }

            bcryptjs.compare(password, company_data, (e, result) => {

                if (result == false) {
                    res.json({ msg: "Invalid Password" });
                    return;
                }

                // now every thing is valid

                // console.log("validddddd");

                // it creates the token for the logged in user 
                // the token stores the logged in user id

                const token = jwt.sign({ companyId: compnay_data._id }, "softwarica");
                res.json({ token: token });



            })

        })
        .catch()
});

module.exports = router;
