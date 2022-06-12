const mongoose=require('mongoose');

const employee=new mongoose.Schema({

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
    username:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
    },

    dob:{
        type:Date,
    },

    profile_pic:{
        type:String,
},
address:{
    type:String
},
education:{
    type:String
},
id_card:{type:String},
specialist:{type:String}

})

module.exports=mongoose.model("Employee", employee);