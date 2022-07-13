const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    },
    phone: {
        type: Number,
        required: true,
    },
    address: [{

        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: {
            type: Number,
        },
        country: {
            type: String,
        },
        vdc: {
            type: String,
        },
        ward: {
            type: Number,
        },
        tole: {
            type: String,
        }



    }],
    education: [{
        college: {
            type: String,
        },
        level: {
            type: String
        },
        clzaddress: { type: String },
        yearJoined: { type: Date },

        yearPassed: { type: Date }

    }],
    image: {
        type: String,
        default:""
    },
    images: [{ type: String }],
    
    Usertype: {
        type: String,
    },
    description: {
        type: String,
    },
    website: {
        type: String
    }

});

const Profile = mongoose.model('profile', ProfileSchema);
exports.Profile = Profile;