const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const Profile = require('../models/profile');
const image_upload = require('../middleware/upload');
const mongoose = require('mongoose');
const DOMAIN = "http://127.0.0.0:3000/";



router.post('/profile/create', auth.verifyUser, image_upload.single("profilePic"), async (req, res) => {
    const data = req.body;
    let file = req.file;
    let filename = DOMAIN + "public/uploads/" + file.filename;
    const userId = req.userData._id;

    try {


        if (req.file == undefined || req.file == null) {
            return res.status(400).json({
                status: "error",
                message: "No file selected",
            });
        }

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
                        profilePic: filename,

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






router.put("/profile/update/:id", auth.verifyUser, image_upload.single('profilePic'), async (req, res) => {
    //If the :id is not in _id format then this message will be shown
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid profile id");
    }
    const data = req.body;
    let file = req.file.filename;
    let filename = DOMAIN + "public/uploads/" + file;
    const profile = await Profile.findOneAndUpdate(
        { userId: req.params.id },
        {
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
            profilePic: filename,
        },
        {
            new: true,
        }
    );

    if (!profile) {
        res.status(500).json({
            success: false,
            message: "Update error",
        });
    } else {
        res.status(201).json({ success: true, data: profile });
    }
}
);



// get profile by user id
router.get('/profile/getByUserId/:userId', auth.verifyUser, async (req, res) => {
    try {
        const userId = req.params.userId;
        await Profile.findOne({ userId }).then(profile => {
            res.status(200).json({ success: true, msg: "success", profile });
        }
        );
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
}
);


// delete profile by user id
router.delete('/profile/delete/:userId', auth.verifyUser, async (req, res) => {

    try {
        const userId = req.params.userId;
        await Profile.findOneAndDelete({ userId }).then(profile => {
            res.status(200).json({ success: true, msg: "success", profile });
        }
        );
    }
    catch (e) {

        res.status(400).json({ msg: e });
    }   // end of catch
}
);










module.exports = router;