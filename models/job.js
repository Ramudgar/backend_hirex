const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    
    
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
    skillsets: {
      type: String,
    },
    jobType: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      
      
    },
    salary: {
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
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("jobs", schema);