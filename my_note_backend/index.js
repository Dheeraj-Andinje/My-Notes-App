const mongoose=require('mongoose');


const connectToMongo=require('./db');
const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors')


const start = async () => {
  try {
    const connect= await connectToMongo()
    .then(app.listen(port)).then( async() => {
      console.log(`my notebook backend Connected to ${port}`);
    });
    
  } catch (error) {
    console.log(error);
  }
};

start()



app.use(cors())
app.use(express.json());
//Available Routes
app.use('/api/auth',require('./routes/auth'));
 app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

