const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')
const Job=require('../models/job');

const uploadOptions = require('../auth/multers');
const middleware = require('../auth/multers');

// insert job with image and category to database
router.post('/jobs/createWithImage', uploadOptions.single('image'), async (req, res) => {  
    try {
        const userId=req.body._id;
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


    // // To get all jobs by user
    router.get('/jobs/getAllByUser',auth.verifyUser, middleware.single(''), (req, res) => {

       try{ const user = req.user;
        Job.find({user:user._id}).then((data) => {
            res.json(data);
        }
        )}
        catch(e){
            res.status(400).json({ msg: e });
        }
    }
    );

    // // To get all jobs by user id
    router.get('/jobs/getAllByUser/:id',auth.verifyUser, middleware.single(''), (req, res) => {
        
      try{
        Job.find({user:req.params.id}).then((data) => {
            res.json(data);
        }
        )
      }
        catch(e){
            res.status(400).json({ msg: e });
        }
    }
    );




    // To get jobs by id   ##NOT USED because the code below this is in useed
    // router.get('/jobs/getbyId/:id',auth.verifyUser,middleware.single(''),  (req, res) => {
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
router.get ("/jobs/getById/:id",auth.verifyUser ,middleware.single(''),(req, res) => {
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
    router.put('/jobs/update/:id', (req, res) => {

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

    // To delete all jobs by user id
    router.delete('/jobs/deleteAllByUser/:id',auth.verifyUser, middleware.single(''), (req, res) => {
        
       try{ Job.deleteMany({user:req.params.id}).then((data) => {
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
  