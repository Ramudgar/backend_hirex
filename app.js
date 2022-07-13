const express = require('express');
const app = express();

require('colors');
require('./config/database');
const cors = require("cors");


//Constants and routes
const userRoutes=require('./routes/UserRoutes');
const profileRoutes=require('./routes/profileRoutes');
const jobRoutes=require('./routes/jobRoutes');
const jobApplicantsRoutes=require('./routes/jobApplicantsRoutes');
const jobCategoryRoutes=require('./routes/jobCategoryRoutes');


//Before using any services enable CORS
app.use(cors());
app.options("*", cors()); // * means allow all the http request to pass from any other region

app.use(express.json(    ));

// Using api routes to connect to the routes
app.use(userRoutes);
app.use(profileRoutes);
app.use(jobRoutes);
app.use(jobApplicantsRoutes);
app.use(jobCategoryRoutes);

//Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000".yellow.underline.bold);
});
