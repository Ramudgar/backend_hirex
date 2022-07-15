const mongoose =require('mongoose');

const profile=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    skills:{ type:String ,
        // required:true
    },
    address:{
        country:{ type:String,
            // required:true
        },
        
        city:{ type:String,
            // required:true
        },
        
        zipCode:{ type:String,
            // required:true
        },
        state:{ type:String,
            // required:true
        },
       
    },
    education:{
        institutionName:{ type:String},
        
        degree:{ type:String},
        startYear:{ type:String},
        endYear:{ type:String},
        
    },
    experience:{ type:String},
    languages:{ type:String},
    phone:{ type:String,
    required:true},
    email:{ type:String},
    website:{ type:String},
    
    profilePic:{ type:String},
});

module.exports=mongoose.model('Profile',profile);