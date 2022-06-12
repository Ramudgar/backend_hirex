const jwt=require('jsonwebtoken');
const employee=require('../models/empUser')
const investor=require('../models/investor')
const company=require('../models/startup_company')

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
       investor.findOne({_id:data.investorId})
       .then((edata)=>{
        //    console.log(edata)
           req.investorInfo=edata;
           next();
       })

        
    } catch (error) {
        res.json({msg:'invalid Token'})
    }

};

// this is company guard
module.exports.companyGuard= (req,res,next)=>{    
    try {
       const token =req.headers.authorization.split(" ")[1];
       const data =jwt.verify(token,"softwarica");
       console.log(data);
       company.findOne({_id:data.companyId})
         .then((edata)=>{
              req.companyInfo=edata;
              next();
         }
            )
    } catch (error) {
        res.json({msg:'invalid Token'})
    }
     };