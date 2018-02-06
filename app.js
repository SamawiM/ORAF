const express= require('express');
const exphbs=require('express-handlebars');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();
//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Map global promise- get rid of warning
mongoose.Promise= global.Promise;

// Connect to mongoDB
mongoose.connect('mongodb://localhost/roommate-dev',{
  //useMongoClient: true
}).then(()=> console.log('MongoDB connected')).catch(err=>console.log(err));

// Load model Users
require('./models/users');
const User=mongoose.model('users');



// Index route-- homepage
app.get('/',(req,res)=>{
   res.render('helloworld');
});

//Add Signupform
app.get('/users/signup',(req,res)=>{
  res.render('users/signup');
 });

 //Process Signup form
 app.post('/users',(req,res)=>{
  let errors=[];
  if(!req.body.name){
    errors.push({text: 'Please enter your name'});
  }
  if(!req.body.email){
    errors.push({text: 'Please enter a valid email'});
  }
  if(!req.body.password){
    errors.push({text: 'Please enter a valid password'});
  }

if(errors.length>0){
  res.render('users/signup',{
    errors: errors,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
}else{
  const newUser={
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  new User(newUser).save()
  console.log('ok');
}
 });

 // Add signin form
 app.get('/signins/signin',(req,res)=>{
  res.render('signins/signin');
 });

 //Sign in successful view
 app.get('/signins/successful',(req,res)=>{
  res.render('signins/successful');
 });

 // Process signin form
 app.post('/signins',(req,res)=>{
 console.log(req.body.email);
 console.log(req.body.password);
  User.find({email: req.body.email,password: req.body.password}, function (err, docs) {
    if (docs.length){
      res.render('signins/successful');
        console.log('Signin successful');
    }else{
      let errors=[];
      errors.push({text:'Invalid Credentials'});
      res.render('signins/signin',{
        errors: errors
      });
      console.log('Signin failure');
    }
});
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