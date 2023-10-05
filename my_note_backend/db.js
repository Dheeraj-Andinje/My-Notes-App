const mongoose =require('mongoose');

const connectToMongo = async() => {
  let mongoUri= process.env.CONNECTION_STRING;
  console.log(mongoUri);
    mongoose
      .connect(mongoUri)
      .then(() => console.log("Mongoose connection success"))
      .catch((err) => console.log("Error"+err));
  }
  


module.exports =connectToMongo;