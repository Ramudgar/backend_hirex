const jwt=require('jsonwebtoken');
const employee=require('../models/empUser')
const investor=require('../models/investor')

// this is guard for customer
module.exports.customerGuard= (req,res,next)=>{
    try {
       const token =req.headers.authorization.split(" ")[1];
       const data =jwt.verify(token,"softwarica");
       console.log(data);
       employee.findOne({_id:data.employeeId})
       .then((edata)=>{
           req.employeeInfo=edata;
           next();
       })

        
    } catch (error) {
        res.json({msg:'invalid Token'})
    }

};
//  this is investor guard
module.exports.investorGuard= (req,res,next)=>{
    try {
       const token =req.headers.authorization.split(" ")[1];
       const data =jwt.verify(token,"softwarica");
       console.log(data);
       employee.findOne({_id:data.employeeId})
       .then((edata)=>{
           req.employeeInfo=edata;
           next();
       })

        
    } catch (error) {
        res.json({msg:'invalid Token'})
    }

};