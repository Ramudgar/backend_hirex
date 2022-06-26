const express = require('express');
const app = express();
require('colors');
require('./config/database');
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes=require('./routes/UserRoutes');
const profileRoutes=require('./routes/profileRoutes');
const jobRoutes=require('./routes/jobRoutes');



app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(profileRoutes);
app.use(jobRoutes);

//Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000".yellow.underline.bold);
});
