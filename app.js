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
  //useMongoClient: true
}).then(()=> console.log('MongoDB connected')).catch(err=>console.log(err));

// Load model Users
require('./models/users');
const User=mongoose.model('users');

const port=5000;
app.listen(port,()=>{
  console.log('Server started on port'+ port);
});