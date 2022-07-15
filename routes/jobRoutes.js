const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')
const Job=require('../models/job');

const uploadOptions = require('../auth/multers');
const middleware = require('../auth/multers');

// insert job with image and category to database
router.post('/jobs/create',auth.verifyUser, uploadOptions.single('image'), async (req, res) => {  
    try {
        const userId=req.body.userId;
        const { title, maxApplicants, maxPositions, location,activeApplications, acceptedCandidates, dateOfPosting, deadline, skillSets, jobType, duration, salary } = req.body;
        const image = req.file;
        const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads${image.filename}`;
        const job = new Job({
        userId,title, maxApplicants, maxPositions, location,activeApplications, acceptedCandidates, dateOfPosting, deadline, skillSets, jobType, duration, salary,
        image: imageUrl,
        }); 
        await job.save().then(() => {
            res.json({ msg: "success" });
        });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
}
);

// insert job with multiple image and category to database
router.post('/jobs/createWithMultipleImage', uploadOptions.array('images'), async (req, res) => {
    try {
        const userId=req.body._id;
        const { title, maxApplicants, maxPositions, location,activeApplications, acceptedCandidates, dateOfPosting, deadline, skillSets, jobType, duration, salary } = req.body;
        const images = req.files;
        const imageUrls = images.map((image) => {
            return `${req.protocol}://${req.get('host')}/public/uploads/${image.filename}`;
        }
        );
        const job = new Job({
        userId,title, maxApplicants, maxPositions, location,activeApplications, acceptedCandidates, dateOfPosting, deadline, skillSets, jobType, duration, salary,
        images: imageUrls,
        });
        await job.save().then(() => {
            res.json({ msg: "success" });
        });
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
}
);
  

    // To get all jobs
    router.get('/jobs/getAll',auth.verifyUser,middleware.single(''),  (req, res) => {
        
        try{Job.find({}).then((data) => {
            res.json(data);
        }
        )}
        catch(e){
            res.status(400).json({ msg: e });
        }
        
    }
    );

    // to get jobs by job id
    router.get("/Job/getById/:id",  async (req, res) => {
        const job = await Job.findById(req.params.id).populate("category"); // display category in product
        if (!job) {
          res.status(401).json({
            success: false,
            message: "Cannot find the job",
          });
        } else {
          res.status(201).json({
            success: true,
            data: job,
          });
        }
      });


    // // To get all jobs by user id
    router.get('/jobs/getAllByUser/:id', async(req, res) => {
        
      try{
        const id=req.body.userId;
        await Job.findById({id}).then((data) => {
            res.json("success",data);
        }
        )
      }
        catch(e){
            res.status(400).json({ msg: e });
        }
    }
    );



    // find a single job with a job id.
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
    router.put('/jobs/update/:id',middleware.single(""), (req, res) => {

       try{
        const data = req.body;
        Job.findByIdAndUpdate(req.params.id, data, { new: true }).then((data) => {
            res.send({
                success: true,
                message: 'job successfully updated',
                data: data
            });
        }
        )
       }
         catch(err){
             res.status(400).json(err);
         }
    }
    );


    // To delete job by id
    router.delete('/jobs/deleteById/:id',auth.verifyUser,middleware.single(''),  (req, res) => {
        
       try{
        Job.findByIdAndRemove(req.params.id).then((data) => {

            res.send({
                success: true,
                message: 'job successfully deleted',
                data: data
            });
        }
        )
       }
            catch(err){
                res.status(400).json(err);
            }
    }
    );

    // To delete all jobs
    router.delete('/jobs/deleteAll',auth.verifyUser,middleware.single(''),  (req, res) => {
       try{ const user = req.user;
        Job.deleteMany({}).then((data) => {
            res.send({
                success: true,
                message: 'jobs successfully deleted',
                data: data
            });
        }
        )}
        catch(err){
            res.status(400).json(err);
        }

    }
    );

    

    

  module.exports = router;
  