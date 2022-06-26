const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.userId,
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
            type: String,
        },
        country: {
            type: String,
        },
        vdc: {
            type: String,
        },
        ward: {
            type: String,
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
    pic: {
        type: String,
    },
    
    type: {
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