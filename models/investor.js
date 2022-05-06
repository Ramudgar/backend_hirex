const mongoose= require('mongoose');

const investor= new mongoose.Schema({
    firstName:{
type:String
    },
    firstName:{
type:String
    },
email:{
    type:String,
    required:true
},
mobile:{
type:String,
required:true
},
password:{
    type:String,
    required:true
}


})
module.exports=mongoose.model("investor", investor);