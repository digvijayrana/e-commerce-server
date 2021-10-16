const mongoose = require('mongoose');
const Uri  = "url";


const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI ||Uri,{ useNewUrlParser: true ,useUnifiedTopology:true })
    console.log("Database Connected...");
}
module.exports = connectDB;

