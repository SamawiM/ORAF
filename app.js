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
}));

// use css file
app.use(express.static("assets"));

//Index route-- homepage
app.get('/',(req,res)=>{
   //res.render('helloworld');
   res.redirect('users/signup');
});

app.get('/index',(req,res)=>{
  res.render('userProfile/index');
  //res.redirect('users/signup');
});

//Add Signupform
//app.get('/users/signup',(req,res)=>{
  //res.render('users/signup');
 //});

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
  res.render('/signup',{
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
// Edit-profile page
//app.get('/userProfile/index',(req,res)=>{

  //res.render('userProfile/index');
 //});

 // Add signin form
 //app.get('/signins/signin',(req,res)=>{
  //res.render('signins/signin');
 //});

 //Sign in successful view
 //app.get('/signins/successful',(req,res)=>{
 // res.render('signins/successful');
 //});

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

app.get('/search/search',(req,res)=>{
  res.render('search/search');
});

app.listen(port,()=>{
  console.log('Server started on port'+ port);
});