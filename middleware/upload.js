const multer = require("multer");




// const Destination = (req, file, next) => {
//     next(null, `${__dirname}/../public/uploads`);
//   };

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, "./public/uploads")
    },
    filename: function(req, file,cb){
        cb(null, Date.now() + file.originalname)
    }
})
const filter = function(req, file, cb){
    if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}
const image_upload = multer({
    storage : storage,
    fileFilter: filter
});




module.exports = image_upload;