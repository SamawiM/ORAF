const express= require('express');
const mongoose=require('mongoose');
const app=express();
// Map global promise- get rid of warning
mongoose.Promise= global.Promise;

// Connect to mongoDB
mongoose.connect('mongodb://localhost/roommate-dev',{
  useMongoClient: true
}).then(()=> console.log('MongoDB connected')).catch(err=>console.log(err));

// Index route
app.get('/',(req,res)=>{
 res.send('Hello world');
});

const port=5000;
app.listen(port,()=>{
  console.log('Server started on port'+ port);
});