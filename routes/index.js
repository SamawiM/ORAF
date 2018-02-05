var express = require('express');
var router = express.Router();


/* render index page */
router.get('/', function(req,res,next) {
	res.render('index', { title: 'Roommate Finder Application'});
});

// Edit-profile page
app.get('/editprofile',(req,res)=>{
 res.render('editprofile');
});

// Review-roomie page
app.get('/reviewroomie',(req,res)=>{
 res.render('reviewroomie');
});

//Add Signupform
app.get('/users/signup',(req,res)=>{
 res.render('/users/signup');
});

module.exports = router;