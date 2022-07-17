const Category = require('../models/jobCategory');
const router = require('express').Router();
const auth=require('../auth/auth');
const middleware=require('../auth/multers');


// create job category
router.post("/category/create/",middleware.single("image"), async (req, res) => {

    try {
        const data = req.body;
        const image = req.file;
        const imageUrl = `${req.protocol}://${req.get('host')}/public/uploads${image.filename}`;
        const category = new Category({
            
            categoryName: data.categoryName,
            image: imageUrl,
            
    });
        await category.save().then((data) => {
            res.json({ data} );
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




//   to get all jobs category 
router.get('/category/getAll',async (req, res) => {
    try{
        const category = await Category.find({}).then((data) => {
            res.json({data} );
        }
        )
        return category;
    }
    catch(e){
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
