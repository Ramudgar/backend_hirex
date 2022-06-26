const express = require('express');
const router = express.Router();
const profile = require('../models/profile');
const auth = require('../auth/auth');


// create profile for users

router.post('/profile/create', auth.userGaurd, (req, res) => {
    const data = req.body;

    let profile = new profile({
        name: data.name,
        userId: data.userId,
        phone: data.phone,
        street: data.address.street,
        country: data.address.country,
        city: data.address.city,
        zip: data.address.zip,
        state: data.address.state,
        vdc: data.address.vdc,
        ward: data.address.ward,
        tole: data.address.tole,
        college: data.education.college,
        level: data.education.level,
        clzaddress: data.education.clzaddress,
        yearJoined: data.education.yearJoined,
        yearPassed: data.education.yearPassed,
        pic: data.pic,
        type: data.type,
        description: data.description,
        website: data.website
    });

    profile.save().then(() => {
        res.json({ message: 'Profile created successfully' });
    }
    ).catch((err) => {
        res.status(400).json(err);
    })
}
);



// to get all profiles by user id
router.get('/profile/getAllByUser/:id', auth.userGaurd, (req, res) => {
    const user = req.user;
    profile.find({ userId: req.params.id }).then((data) => {
        res.json(data);
    }
    ).catch((err) => {
        res.status(400).json(err);
    }
    );
}
);



// to update profile by userId
router.put('/profile/updateByUser/:id', auth.userGaurd, (req, res) => {
    const user = req.user;
    profile.findOneAndUpdate({ userId: req.params.id }, {
        $set: {
            name: req.body.name,
            userId: req.body.userId,
            phone: req.body.phone,
            street: req.body.address.street,
            country: req.body.address.country,
            city: req.body.address.city,
            zip: req.body.address.zip,
            state: req.body.address.state,
            vdc: req.body.address.vdc,
            ward: req.body.address.ward,
            tole: req.body.address.tole,
            college: req.body.education.college,
            level: req.body.education.level,
            clzaddress: req.body.education.clzaddress,

            yearJoined: req.body.education.yearJoined,
            yearPassed: req.body.education.yearPassed,
            pic: req.body.pic,
            type: req.body.type,
            description: req.body.description,
            website: req.body.website
        }
    }).then((data) => {
        res.send({
            success: true,
            message: 'profile updated successfully',
            data: data
        });
    }
    ).catch((err) => {
        res.status(400).json(err);
    }
    );
}
);




module.exports = router;


