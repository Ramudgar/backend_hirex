const express=require('express');
const router=new express.Router();
const auth=require('../auth/auth')
const bcryptjs = require('bcryptjs')
const jwt= require('jsonwebtoken');
const employee = require('../models/investor');


router.post('/investor/register', (req, res) => {

    const email = req.body.email;
    employee.findOne({ email: email })
        .then((emp_data) => {
            if (emp_data != null) {
                res.json({ msg: 'email already exists' });
                return;
            }
            const firstName = req.body.fname;
            const lastName = req.body.lname;
            const mobile=req.body.mobile;
            const password = req.body.password;

            bcryptjs.hash(password, 10, (e, hashed_pw) => {

                const data = new employee({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    mobile:mobile,
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

router.post('/investor/login',(req,res)=>{
const email=req.body.email;
const password=req.body.password;
employee.findOne({email:email})
.then((invest_data)=>{
if (invest_data==null){
res.json({msg:"Invalid credentials"})
return;
}

bcryptjs.compare(password,invest_data,(e,result)=>{

    if(result==false){
        res.json({msg:"Invalid Password"});
        return;
    }

    // now every thing is valid

    // console.log("validddddd");

    // it creates the token for the logged in user 
    // the token stores the logged in user id

   const token = jwt.sign({investorId:invest_data._id },"softwarica");
   res.json({token:token});



})

})
.catch()
})


// this is for testing only, we will delete this latter

router.delete('invest/comment/delete',auth.customerGuard,(req,res)=>{
    // console.log("deleted")
    res.json({msg:'deleted'})
})





module.exports = router;