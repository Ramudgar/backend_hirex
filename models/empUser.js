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
    gender:{
type:String,
    },

    date:{
        type:String,
    },

password:{
    type:String
}
})

module.exports=mongoose.model("employee", employee);