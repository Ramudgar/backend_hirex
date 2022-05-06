const express=require('express');
const app=express();
app.use(express.json());

require('./database/database');

const empRoutes=require('./routes/empRoutes');

app.use(empRoutes);
const investorRoutes=require('./routes/investorRoutes');

app.use(investorRoutes);




app.listen(5000);