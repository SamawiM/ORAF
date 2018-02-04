const express= require('express');
const app=express();

// Index route
app.get('/',(req,res)=>{
 res.send('Hello world');
});

const port=5000;
app.listen(port,()=>{
  console.log('Server started on port'+ port);
});