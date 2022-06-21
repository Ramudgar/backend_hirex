const mongoose = require('mongoose');
const company = new mongoose.Schema({
    companyName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    username:{
        type:String,
        required:true,
    },
    password: { type: String,
        required: true, },
    companyAddress: {
        type: String,
    },
    companyCountry: {   type: String,    },
    companyState: {     type: String,    },
    companyCity: {      type: String,    }, 
    companyZip: {       type: String,    },

    companyPhone: {
        type: String,
    },
    companyWebsite: { type: String, },
    companyLogo: { type: String, },
    companyDescription: { type: String, },
   


});

module.exports=mongoose.model('Company', company);