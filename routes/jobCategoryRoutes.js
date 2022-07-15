const Category = require('../models/jobCategory');
const router = require('express').Router();
const auth=require('../auth/auth');
const middleware=require('../auth/multers');


// create job category
router.post('/category/create',auth.verifyUser,middleware.single(""), async (req, res) => {

    try {
        const data = req.body;
        const category = new Category({
            categoryName: data.categoryName,
        })
        await category.save().then((data) => {
            res.json({ msg: 'success', data });
        }
        )
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
});

// to update job category
router.put('/category/updatebyId/:id',middleware.single(""),(req,res)=>{
    try{
        const id=req.params.id;
        const categoryName=req.body.categoryName;
        Category.findByIdAndUpdate({_id:id},
            {categoryName:categoryName},{new:true}).then((value)=>{
            res.json({msg:'success',value});
        }
        )
    }
    catch(e){
        res.status(400).json({msg:e});
    }
})


// get category by id
router.get('category/:id',async (req,res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
      res.status(404).json({
        success: false,
      });
    } else{
      res.status(201).json({
        success: true,
        data: category,
      });
    }
  });

// get all categories
router.get('/category/getAll', async (req, res) => {
    try {
        await Category.find().then((data) => {
            res.status(200).json("success", data);
        }   
        );
    }
    catch (e) {
        res.status(400).json({ msg: e });
    }
}
);



// to delete job category

router.delete('/category/deletebyId/:id',middleware.single(""),(req,res)=>{
    try{
        const id=req.params.id;
        Category.findByIdAndDelete({_id:id}).then((value)=>{
            res.json({msg:'success',value});
        }
        )
    }
    catch(e){
        res.status(400).json({msg:e});
    }
}
)






module.exports=router;
