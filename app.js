const express = require('express');
const app = express();
require('colors');
require('./config/database');
const cors = require("cors");
// const investorRoutes = require('./routes/investorRoutes');
// const empRoutes = require('./routes/empRoutes');
// const companyRoutes = require('./routes/companyRoutes');
const userRoutes=require('./routes/UserRoutes');



app.use(express.json());
app.use(cors());
// app.use(empRoutes);
// app.use(investorRoutes);
// app.use(companyRoutes);
app.use(userRoutes);

//Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000".yellow.underline.bold);
});
