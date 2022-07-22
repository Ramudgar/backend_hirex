const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const Profile = require('../models/profile');
const uploadsImage = require('../middleware/upload');



router.post('/profile/create', auth.verifyUser, uploadsImage.single("profilePic"), async (req, res) => {
    const data = req.body;
    const pic = req.file;
    const fileUrl = `${req.protocol}://${req.get('host')}/public/uploads/${pic.filename}`;
    const userId = req.userData._id;

    try {
        Profile.findOne({ userId })
            .then((user_data) => {
                if (user_data != null) {
                    res.json({ msg: 'profile already exists' });
                    return;
                }
                else {
                    const profile = new Profile({

                        userId, /* userId is fetched form auth.verify user from auth file*/
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
                        profilePic: fileUrl,

                    })
                    profile.save().then((profiles) => {
                        res.json({ success: true, msg: "success", profiles });
                    });

                }
            })

    } catch (e) {
        res.status(400).json({ msg: e });
    }

});


// get profile by user id
router.get('/profile/getByUserId/:userId', auth.verifyUser, async (req, res) => {
    try {
        const userId = req.params.userId;
        await Profile.findOne({ userId }).then(profile => {
            res.status(200).json({success:true,msg:"success",profile});
        }
        );
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
}
);


// update profile by user id


// delete profile by userId
router.delete('/profile/delete/:userId', auth.verifyUser, async (req, res) => {
    try {
        const userId = req.body.userId;
        await Profile.findByIdAndRemove({ userId:req.userData._id }).then((data) => {
            res.json("success", data);
        });
    } catch (e) {
        res.status(400).json({ msg: e });
    }
}
);









module.exports = router;