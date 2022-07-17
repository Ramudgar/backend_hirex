const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const Profile = require('../models/profile');
const uploadsImage = require('../auth/multers');



router.post('/profile/create', uploadsImage.single("profilePic"), async (req, res) => {
    const data = req.body;
    const pic = req.file;
    const picUrl = `${req.protocol}://${req.get('host')}/public/uploads/${pic.filename}`;
    const userId = data.userId;

    try {
        Profile.findOne({ userId })
        .then((user_data) => {
            if (user_data != null) {
                res.json({ msg: 'profile already exists' });
                return;
            }
            else {
                const profile = new Profile({

                    userId,
                    name: data.name,
                    skills: data.skills,
                    phone: data.phone,
                    address: {
                        country: data.country,
                        city: data.city,
                        zipCode: data.zipCode,
                        state: data.state,

                    },
                    education: {
                        institutionName: data.institutionName,

                        degree: data.degree,
                        startYear: data.startYear,
                        endYear: data.endYear,
                    },
                    experience: data.experience,
                    languages: data.languages,
                    email: data.email,
                    website: data.website,
                    profilePic: picUrl

                })
                profile.save().then((value) => {
                    res.json({ success: true, msg: "success", value });
                });

            }


        })

    } catch (e) {
        res.status(400).json({ msg: e });
    }

});

// get profiles by userId
router.get('/profile/getByUserId/:userId', async (req, res) => {
    try {
        const userId = req.body.userId;
        await Profile.find({ userId }).then((data) => {
            res.json("success", data);
        });
    } catch (e) {
        res.status(400).json({ msg: e });
    }
}
);

// update profile by userId
router.put('/profile/update/:userId', auth.verifyUser, uploadsImage.single(""), async (req, res) => {
    try {
        const userId = req.body.userId;
        const data = req.body;
        await Profile.findOneAndUpdate({ userId }, data).then((data) => {
            res.json("success", data);
        });
    } catch (e) {
        res.status(400).json({ msg: e });
    }
}
);

// delete profile by userId
router.delete('/profile/delete/:userId', auth.verifyUser, async (req, res) => {
    try {
        const userId = req.body.userId;
        await Profile.findOneAndDelete({ userId }).then((data) => {
            res.json("success", data);
        });
    } catch (e) {
        res.status(400).json({ msg: e });
    }
}
);









module.exports = router;