//40Xqi03Fu9QKkFNm
//mongodb+srv://GreatCode:<db_password>@cluster0.zvffqgw.mongodb.net/?appName=Cluster0
//require('dotenv').config();
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url).then(()=>{
    console.log("......................MongoDb connected....................");
}).catch((err)=>{
    console.log("MongoDB connection error: ",err);
})