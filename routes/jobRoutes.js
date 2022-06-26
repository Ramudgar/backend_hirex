const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Job=require('../models/job');
const User=require('../models/Users');



// To add new job
router.post('/jobs/create',auth.verifyUser,  (req, res) => {

    const user = req.user;
    const data = req.body;
    let job = new Job({
  
      title: data.title,
      maxApplicants: data.maxApplicants,
      maxPositions: data.maxPositions,
      dateOfPosting: data.dateOfPosting,
      deadline: data.deadline,
      skillsets: data.skillsets,
      jobType: data.jobType,
      duration: data.duration,
      salary: data.salary,
      rating: data.rating,
    });
  
    job.save().then(() => {
        res.json({ message: "Job added successfully to the database" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });



    // To get all jobs
    router.get('/jobs/getAll',auth.verifyUser,  (req, res) => {
        const user = req.user;
        Job.find({}).then((data) => {
            res.json(data);
        }
        ).catch((err) => {
            res.status(400).json(err);
        }
        );
    }
    );


    // // To get all jobs by user
    // router.get('/jobs/getAllByUser',auth.verifyUser,  (req, res) => {
    //     const user = req.user;
    //     Job.find({user:user._id}).then((data) => {
    //         res.json(data);
    //     }
    //     ).catch((err) => {
    //         res.status(400).json(err);
    //     }
    //     );
    // }
    // );

    // // To get all jobs by user 
    router.get('/jobs/getAllByUser/:id',auth.verifyUser,  (req, res) => {
        const user = req.user;
        Job.find({user:req.params.id}).then((data) => {
            res.json(data);
        }
        ).catch((err) => {
            res.status(400).json(err);
        }
        );
    }
    );




    // To get jobs by id   ##NOT USED because the code below this is in useed
    // router.get('/jobs/getbyId/:id',auth.verifyUser,  (req, res) => {
    //     const user = req.user;
    //     Job.findById(req.params.id).then((data) => {
    //         res.json(data);
    //     }
    //     ).catch((err) => {
    //         res.status(400).json(err);
    //     }
    //     );
    // }
    // );



    // find a single job with a id.
router.get ("/jobs/getById/:id",auth.verifyUser ,(req, res) => {
    Job.findById(req.params.id)
        .then(data => {
            if(!data) {
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
        if(err.kind === 'ObjectId') {
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



    // To update job
    router.put('/jobs/update/:id',auth.verifyUser,  (req, res) => {
        const user = req.user;
        const data = req.body;
        Job.findByIdAndUpdate(req.params.id, data, { new: true }).then((data) => {
            res.send({
                success: true,
                message: 'job successfully updated',
                data: data
            });
        }
        ).catch((err) => {
            res.status(400).json(err);
        }
        );
    }
    );


    // To delete job by id
    router.delete('/jobs/deleteById/:id',auth.verifyUser,  (req, res) => {
        const user = req.user;
        Job.findByIdAndRemove(req.params.id).then((data) => {

            res.send({
                success: true,
                message: 'job successfully deleted',
                data: data
            });
        }
        ).catch((err) => {

            res.status(400).json(err);
        }
        );
    }
    );

    // To delete all jobs
    router.delete('/jobs/deleteAll',auth.verifyUser,  (req, res) => {
        const user = req.user;
        Job.deleteMany({}).then((data) => {
            res.send({
                success: true,
                message: 'jobs successfully deleted',
                data: data
            });
        }
        ).catch((err) => {
            res.status(400).json(err);
        }
        );
    }
    );

    // To delete all jobs by user
    router.delete('/jobs/deleteAllByUser/:id',auth.verifyUser,  (req, res) => {
        const user = req.user;
        Job.deleteMany({user:req.params.id}).then((data) => {
            res.send({
                success: true,
                message: 'jobs successfully deleted',
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
  