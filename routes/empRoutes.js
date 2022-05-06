const express = require('express');
const bcryptjs = require('bcryptjs')
// const app = express();
const router = express.Router();
const employee = require('../models/empUser');
const jwt= require('jsonwebtoken');
const auth=require('../auth/auth')


router.post('/employee/register', (req, res) => {

    const email = req.body.email;
    employee.findOne({ email: email })
        .then((emp_data) => {
            if (emp_data != null) {
                res.json({ msg: 'email already exists' });
                return;
            }
            const firstName = req.body.fname;
            const lastName = req.body.lname;

            const gender = req.body.gender;
            const date = req.body.date;
            const password = req.body.password;

            bcryptjs.hash(password, 10, (e, hashed_pw) => {

                const data = new employee({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    gender: gender,
                    date: date,
                    password: hashed_pw
                });
                data.save().then(() => {
                    res.json({ msg: 'Data inserted', a: "success" });
                }).catch((e) => {
                    res.json({ msg: e });
                });

            })
        })
});

// For Login

router.post('/employee/login',(req,res)=>{
const email=req.body.email;
const password=req.body.password;
employee.findOne({email:email})
.then((emp_data)=>{
if (emp_data==null){
res.json({msg:"Invalid credentials"})
return;
}

bcryptjs.compare(password,emp_data,(e,result)=>{

    if(result==false){
        res.json({msg:"Invalid Password"});
        return;
    }

    // now every thing is valid

    // console.log("validddddd");

    // it creates the token for the logged in user 
    // the token stores the logged in user id

   const token = jwt.sign({employeeId:emp_data._id },"softwarica");
   res.json({token:token});



})

})
.catch()
})


// this is for testing only, we will delete this latter

router.delete('/comment/delete',auth.customerGuard,(req,res)=>{
    // console.log("deleted")
    res.json({msg:'deleted'})
})



// this is dashboard route for customer

router.get("/employee/dashboard",auth.customerGuard,(req,res)=>{
// console.log(req.employeeInfo.firstName);
// res.json(req.employeeInfo);
res.json({
    firstName:req.employeeInfo.firstName,
    lastName:req.employeeInfo.lastName,
    email:req.employeeInfo.email
})
})





module.exports = router;