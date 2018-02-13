const express= require('express');
const exphbs=require('express-handlebars');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const mongodb=require('mongodb');
const app=express();
var session = require('client-sessions');
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

app.use(session({
  cookieName: 'session',
  secret: 'highentropystring01010',
  duration: 30*60*1000,
  activeDuration: 5*60*1000,
}))

//Index route-- homepage
app.get('/',(req,res)=>{
   res.render('helloworld');
   //res.redirect('users/signup');
});

//Add Signupform
app.get('/users/signup',(req,res)=>{
  res.render('users/signup');
 });

 // Sign up successful view
 app.get('/users/successful',(req,res)=>{
  res.render('users/successful');
 });

 
 //Process Signup form
 app.post('/users',(req,res)=>{
  let errors=[];
  if(!req.body.firstname){
    errors.push({text: 'Please enter valid firstname'});
  }
  if(!req.body.lastname){
    errors.push({text: 'Please enter valid lastname'});
  }
  if(!req.body.gender){
    errors.push({text: 'Please enter a valid gender'});
  }
  if(!req.body.email){
    errors.push({text: 'Please enter a valid email'});
  }
 
  if(!req.body.phno){
    errors.push({text: 'Please enter a valid phone number'});
  }
  if(!req.body.password){
    errors.push({text: 'Please enter a valid password'});
  }
  if((req.body.password != req.body.confirmpassword)|| (!req.body.confirmpassword)){
    errors.push({text: 'Passwords don\'t match'});
  }

if(errors.length>0){
  res.render('users/signup',{
    errors: errors,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    phno: req.body.phno,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword
  });
}else{
  const newUser={
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    phno: req.body.phno,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword
  }
  new User(newUser).save();
  res.render('users/successful')
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
      req.session.user=docs;
      res.render('signins/successful');
        console.log(req.session.user);
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

 app.get('/signup',(req,res)=>{
   res.render('signup');
  });

 app.get('/characteristics',(req,res)=>{
  res.render('characteristics');
 });

const port=5000;
app.listen(port,()=>{
  console.log('Server started on port'+ port);
});