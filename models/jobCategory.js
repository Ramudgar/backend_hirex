const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    image: { type: String },
    
  },

  
);

module.exports = mongoose.model("Category", CategorySchema);  