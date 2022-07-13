const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')
const JobApplicants = require('../models/jobApplicants');
const middleware = require('../auth/multers');
const uploadsFile = require('../auth/file');


// create job applicants with file upload

router.post('/jobApplicants/create', uploadsFile.single('resume'), async (req, res) => {
    try {
        const userId=req.body._id;
        const file = req.file;
        const fileUrl = `${req.protocol}://${req.get('host')}/public/uploads${file.filename}`;
      const data = req.body;
        const jobApplicant = new JobApplicants({
            education:{
                institutionName: req.body.institutionName,
                startYear: req.body.startYear,
                endYear: req.body.endYear,
            },
        userId,
        jobId:data.jobId,
        name:data.name,
        skills:data.skills,
        rating:data.rating,
        resume:fileUrl,

        });
        await jobApplicant.save().then(() => {
            res.json({ msg: "success" });
        });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
}   );


// get all job applicants
router.get('/jobApplicants/getAll', async (req, res) => {
    try {
        await JobApplicants.find().then(jobApplicants => {
            res.json(jobApplicants);
        });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
}
);



// get all job applicants by job id
router.get('/jobApplicants/getAllByJobId/:jobId', async (req, res) => {
    try {
        const jobId = req.params.jobId;
        await JobApplicants.find({ jobId }).then(jobApplicants => {
            res.json(jobApplicants);
        }
        );
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
}
);

// get all job applicants by user id
router.get('/jobApplicants/getAllByUserId/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        await JobApplicants.find({ userId }).then(jobApplicants => {
            res.json(jobApplicants);
        }
        );
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
}
);

// update job applicants by id
router.put('/jobApplicants/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await JobApplicants.findByIdAndUpdate(id, data,{new:true}).then(() => {
            res.json({ msg: "success" });
        }
        ).catch((err) => {
            res.status(400).json(err);
        }
        );
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
}
);

// delete job applicants by id
router.delete('/jobApplicants/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await JobApplicants.findByIdAndDelete(id).then(() => {
            res.json({ msg: "success" });
        }
        ).catch((err) => {
            res.status(400).json(err);
        }
        );
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
}
);





module.exports = router;
