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

mongoose.connect('mongodb://localhost/roommate-dev').then(()=> console.log('MongoDB connected')).catch(err=>console.log(err));

// Load model Users
require('./models/users');
const User=mongoose.model('users');

require('./models/request');
const Request=mongoose.model('request');

app.use(session({
  cookieName: 'session',
  secret: 'highentropystring01010',
  duration: 30*60*1000,
  activeDuration: 5*60*1000,
}));



// use css file
app.use(express.static("assets"));

//Index route-- homepage
app.get('/',(req,res)=>{
   res.render('helloworld');
});

 // Sign up successful view
 app.get('/users/successful',(req,res)=>{
  res.render('users/successful');
 });

//connect to userProfile/index
app.get('/userProfile/index',(req,res)=>{
  //User.find({firstname: 'Amulya'},function(err,docs){
 //    if(err) res.json(err);
   //  else
    // {
     //  console.log(docs[0]);
     res.render('userProfile/index');
     //{results: docs[0]})
    // }
 // });
//  res.render('userProfile/index');
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
  if(!req.body.dietaryhabit){
    errors.push({text: 'Please enter your dietary habit'});
  }
  if(!req.body.smokinghabit){
    errors.push({text: 'Please enter your smoking habit'});
  }
  if(!req.body.alcoholichabit){
    errors.push({text: 'Please enter your alcoholic habit'});
  }
  if(!req.body.min_budget){
    errors.push({text: 'Please enter valid minbudget'});
  }
  if(!req.body.max_budget){
    errors.push({text: 'Please enter valid max budget'});
  }
  if(!req.body.room_sharing){
    errors.push({text: 'Please enter your roomsharing preference'});
  }
  if(!req.body.earliest_move_in_date){
    errors.push({text: 'Please enter your earliest move in date'});
  }
  if(!req.body.latest_move_in_date){
    errors.push({text: 'Please enter your latest move-in date'});
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
    confirmpassword: req.body.confirmpassword,
    dietaryhabit: req.body.dietaryhabit,
    smokinghabit: req.body.smokinghabit,
    alcoholichabit: req.body.alcoholichabit,
    min_budget: req.body.min_budget,
    max_budget: req.body.max_budget,
    room_sharing: req.body.room_sharing,
    earliest_move_in_date: req.body.earliest_move_in_date,
    latest_move_in_date: req.body.latest_move_in_date
  });
}else{
  const newUser={
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    phno: req.body.phno,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
    dietaryhabit: req.body.dietaryhabit,
    smokinghabit: req.body.smokinghabit,
    alcoholichabit: req.body.alcoholichabit,
    min_budget: req.body.min_budget,
    max_budget: req.body.max_budget,
    room_sharing: req.body.room_sharing,
    earliest_move_in_date: req.body.earliest_move_in_date,
    latest_move_in_date: req.body.latest_move_in_date
  }
  new User(newUser).save();
  res.render('users/successful')
}
 });



//sending request

 //Process 
 app.post('/request',(req,res)=>{
  const newRequest={
  senderID:1234,
  receiverID:2345
  }
  new Request(newRequest).save();
  res.render('users/requestSuccessful')
});


 // Process signin form
 app.get('/loginsuccess',(req,res)=>{
 res.render('loginsuccess');
 });

 app.post('/',(req,res)=>{
 console.log(req.body.email);
 console.log(req.body.password);
  User.find({email: req.body.email,password: req.body.password}, function (err, docs) {
    if (docs.length){
     // req.session.user=docs;
     req.session.user=docs;
 //     res.render('loginsuccess');
        res.render('userProfile/index',{answer: docs[0]});
        console.log(req.session.user);
    }else{
      let errors=[];
      errors.push({text:'Invalid Credentials'});
      res.render('/',{
        errors: errors
      });
      console.log('Signin failure');
    }
});
 });

// Review-roomie page
app.get('/users/reviewroomie',(req,res)=>{
 res.render('users/reviewroomie');
});

//app.get('/signup',(req,res)=>{
 //  res.render('signup');
//});

app.get('/users/signup',(req,res)=>{
  res.render('users/signup');
});

//logout
app.get('/users/logout', function (req, res) {
  req.session.reset();
  res.render('users/logout');
});

 app.get('/characteristics',(req,res)=>{
  res.render('characteristics');
 });


 app.get('/userProfile/editprofile',(req,res)=>{
  res.render('userProfile/editprofile',{results: req.session.user[0]});
 });


// Adding comment to app.js

const port=5030;

app.get('/search/search',(req,res)=>{
  res.render('search/search');
});

app.listen(port,()=>{
  console.log('Server started on port'+ port);
});