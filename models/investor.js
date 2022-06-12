const mongoose= require('mongoose');

const investor= new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String, 
        required:true,
        
    },
    gender:{
        type:String,
    },

    dob:{
        type:Date,
    },
    username:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },
    profile_pic:{
        type:String,
},

})
module.exports=mongoose.model("Investor", investor);