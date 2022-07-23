const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')
const Job = require('../models/job');
const image_upload = require('../middleware/upload');
const DOMAIN="http://127.0.0.0:3000/"
const mongoose = require('mongoose');

router.post(
  "/jobs/create",auth.verifyUser,
  image_upload.single("image"),
  async (req, res) => {
    try {
      if (req.file == undefined || req.file == null) {
        return res.status(400).json({
          status: "error",
          message: "No file selected",
        });
      }
      // req.userData contains all the data of the user
      userId=req.userData._id;
      // console.log(userId);
      let data=req.body;
let file = req.file;
let filename = DOMAIN + "public/uploads/" + file.filename;
      let job = new Job({
        userId,
        title: data.title,
        description: data.description,
        skills: data.skills,
        salary: data.salary,
        location: data.location,
        image: filename,
        category: data.category,
        maxApplicants: data.maxApplicants,
        maxPositions: data.maxPositions,
        dateOfPosting: data.dateOfPosting,
        deadline: data.deadline,
        jobType: data.jobType,
        duration: data.duration,
      });
      let savedjob = await job.save();
      return res.status(200).json({
        success: true,
        message: "job created successfully.",
        data: savedjob,
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: "Unable to create job.",
      });
    }
  }
);



router.put("/jobs/update/:id",image_upload.single('image'), async (req, res) => {
  //If the :id is not in _id format then this message will be shown
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid product id");
  }
const data = req.body;
  let file = req.file.filename;
let filename = DOMAIN + "public/uploads/" + file;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title: data.title,
        description: data.description,
        skills: data.skills,
        salary: data.salary,
        location: data.location,
        image: filename,
        category: data.category,
        maxApplicants: data.maxApplicants,
        maxPositions: data.maxPositions,
        dateOfPosting: data.dateOfPosting,
        deadline: data.deadline,
        jobType: data.jobType,
        duration: data.duration,
      },
      {
        new: true,
      }
    );

    if (!job) {
      res.status(500).json({
        success: false,
        message: "Update error",
      });
    } else {
      res.status(201).json({ success: true, data: job });
    }
  }
);



// To get all jobs
router.get('/jobs/getAll', (req, res) => {

  try {
    Job.find({}).then((data) => {
      res.json({ success: true, msg: "jobs fetched successfully", data });
    }
    )
  }
  catch (e) {
    res.status(400).json({ msg: e });
  }

}
);





// find a single job with a job id.
router.get("/jobs/getById/:id", auth.verifyUser, (req, res) => {
  Job.findById(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "job not found with id " + req.params.id
        });
      }
      res.send({
        success: true,
        message: 'job successfully retrieved',
        data: data
      });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          success: false,
          message: "job not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error retrieving job with id " + req.params.id
      });
    });
}
);



// to get all jobs by user id
router.get('/jobs/getAllByUserId/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    Job.find({ userId }).then(jobs => {
      res.json(jobs);
    }
    );
  }
  catch (e) {
    res.status(400).json({ msg: e });
  }
}
);







// To delete job by id
router.delete('/jobs/deleteById/:id', auth.verifyUser,  (req, res) => {

  try {
    Job.findByIdAndRemove(req.params.id).then((data) => {

      res.send({
        success: true,
        message: 'job successfully deleted',
        data: data
      });
    }
    )
  }
  catch (err) {
    res.status(400).json(err);
  }
}
);

// to delete all job by user id
router.delete('/jobs/deleteAllByUserId/:userId', auth.verifyUser,  (req, res) => {

  try {
    const userId = req.params.userId;
    Job.deleteMany({ userId }).then(jobs => {
      res.json(jobs);
    }
    );
  }
  catch (e) {
    res.status(400).json({ msg: e });
  }
}
);






module.exports = router;
