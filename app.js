const express= require('express');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');
const app=express();
//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Map global promise- get rid of warning
mongoose.Promise= global.Promise;

// Connect to mongoDB
mongoose.connect('mongodb://localhost/roommate-dev',{
  useMongoClient: true
}).then(()=> console.log('MongoDB connected')).catch(err=>console.log(err));

// Index route-- homepage
app.get('/',(req,res)=>{
 res.render('helloworld');
});

// Edit-profile page
app.get('/editprofile',(req,res)=>{
 res.render('editprofile');
});

// Review-roomie page
app.get('/reviewroomie',(req,res)=>{
 res.render('reviewroomie');
});

const port=5000;
app.listen(port,()=>{
  console.log('Server started on port'+ port);
});