const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')
const Job=require('../models/job');

const uploadOptions = require('../auth/multers');
const middleware = require('../auth/multers');




router.post('/jobs/create', uploadOptions.single("image"), async (req, res) => {
    const data = req.body;
    const pic = req.file;
    const picUrl = `${req.protocol}://${req.get('host')}/public/uploads/${pic.filename}`;
    const userId = data.userId;

    try {
                const job = new Job({
                    userId,
                    title: data.title,
                    description: data.description,
                    skills: data.skills,
                    salary: data.salary,
                    location: data.location,
                    image: picUrl,
                    category: data.category,
                    maxApplicants: data.maxApplicants,
                    maxPositions: data.maxPositions,
                    dateOfPosting: data.dateOfPosting,
                    deadline: data.deadline,
                    jobType: data.jobType,
                    duration: data.duration,

                })
                job.save().then((value) => {
                    res.json({ success: true, msg: "success", value });
                });

         

    } catch (e) {
        res.status(400).json({ msg: e });
    }

});



    // To get all jobs
    router.get('/jobs/getAll',auth.verifyUser,middleware.single(''),  (req, res) => {
        
        try{Job.find({}).then((data) => {
            res.json({ success: true, msg: "jobs fetched successfully", data });
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
            res.json({success:true,msg:"jobs fetched by id successfully",data});
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
  