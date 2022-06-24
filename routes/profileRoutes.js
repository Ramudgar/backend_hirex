const express= require('express');
const router =express.Router();
const profile=require('../models/profile');
const auth=require('../auth/auth');


// create profile for users

router.post('/profile/create',auth.userGaurd,(req,res)=>{

const name=req.body.name;
const phone=req.body.phone;
const street=req.body.address.street;
const country=req.body.address.country;
const city=req.body.address.city;
const zip=req.body.address.zip;
})
