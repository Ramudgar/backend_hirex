const mongoose = require("mongoose");
const user=require('../models/Users');

let schema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    
    title: {
      type: String,
      required: true,
    },
    maxApplicants: {
      type: Number,
      required: true,
    },
    maxPositions: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    activeApplications: {
      type: Number,
      default: 0,
      
    },
    acceptedCandidates: {
      type: Number,
      default: 0,
     
    },
    dateOfPosting: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      
    },
    skillSets: {
      type: String,   
    },
    jobType: {
      defalult: "PartTime",
      enum: ["FullTime", "PartTime", "Contract"],
      type: String,
      required: true,
    },
    duration: {
      type: String,
      
      
    },
    salary: {
      type: String,
      
    },
    description:{
      type: String,
    },
    rating: {
      type: Number,
      max: 5.0,
      default: -1.0,
      validate: {
        validator: function (v) {
          return v >= -1.0 && v <= 5.0;
        },
        msg: "Invalid rating",
      },
    },
    image:{ type: String ,
      default:""},
  },
  
 
  { timestamps: true }
  
);

module.exports = mongoose.model("jobs", schema);