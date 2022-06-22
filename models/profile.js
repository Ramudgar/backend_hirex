const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Phone: {
        type: Number,
        required: true,
    },
    Address: {
        type: String,
    },
    Street:{
        type:String,
    },
    City:{
        type:String,
    },
    State:{
        type:String,
    },
    Zip:{   
        type:String,
    },
    Country:{
        type:String,
    },
    education:{
        type:String,
    },
    experience:{
        type:String,
    },
    pic: {
        type: String,
    },
    role: {
        type: String,
    },
    type: {
        type: String,
    },
    description: {
        type: String,
    },
    website:{
        type: String
    }

});

const Profile = mongoose.model('profile', ProfileSchema);
exports.Profile = Profile;