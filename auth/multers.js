const express = require('express');
const multer = require('multer');

const middleware = multer({});



//Validate upload file
const FILE_TYPE_MAP = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/jpg": "jpg",
    "image/gif": "gif",
    "application/pdf": "pdf",
    "application/msword": "doc",
    "audio/mp3": "mp3",
    "audio/mpeg": "mpeg",
    "video/mp4": "mp4",
    "video/mpeg": "mpeg",
    "video/quicktime": "mov",
    "text/plain": "txt"
    
    
  };

// upload image to server

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      //validate weather the file is a valid image
      if (!isValid) cb(new Error("Invalid file type"), "./public/uploads");
      else cb(null,"./public/uploads"); // path where we upload an image
    },
    filename: function (req, file, cb) {
      const filename = file.originalname.split(".")[0];
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${filename}-${Date.now()}.${extension}`);
    }
  });


 
  


  var uploadOptions = multer({ storage: storage });



 

 




 module.exports =  uploadOptions;


