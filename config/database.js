

const mongoose=require('mongoose');


const DB = "mongodb+srv://ramudgar:gnmN4rV3RxuuuKz6@cluster0.y6b9r.mongodb.net/HireX?retryWrites=true&w=majority";

try {
    mongoose.connect(DB,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
} catch (error) {
    console.log(error);
    
}



// const mongoose = require("mongoose");
// require('colors');

// const connectDB = async () => {
//   const conn = await mongoose.connect(process.env.CONNECTION_STRING_ATLAS, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,

//   });

//   console.log(
//     `MongoDB connected to : ${conn.connection.host}`.cyan.underline.bold
//   );
// };

// module.exports = connectDB;
