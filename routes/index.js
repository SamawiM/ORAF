var nodemailer=require("nodemailer");
var smtpTransport=nodemailer.createTransport({
	service: "gmail",
	auth:{
		user: "aishwaryassr@gmail.com",
		pass: "Macrohard**123"
	}
});
var rand,mailOptions,host,link;
var updatedchar=false;
var hasupdatedCharacteristics=false;
var emailsess;
var hasloggedin=false;
//var logger=require('../app/views/partials')(hasloggedin);
const login = require('../app/controllers/home');
const userProfile=require('../app/controllers/profile');
const search = require('../app/controllers/search');


module.exports = function (app,User,mongoose,session) {
	app.get('/', login.index);

	app.post('/search', (req, res)=>{
		console.log(req.body);
		
		var ans="";
		if(req.body.smoking_habit)
		 ans=ans.concat(req.body.smoking_habit,",");
		if(req.body.dietary_habit)
		 ans=ans.concat(req.body.dietary_habit,",");
		if(req.body.gender)
		ans=ans.concat(req.body.gender,",");
		if(req.body.room_sharing)
		ans=ans.concat(req.body.room_sharing,",");
		if(req.body.earliest_move_in_date)
		ans=ans.concat(req.body.earliest_move_in_date,",");
		if(req.body.latest_move_in_date)
		ans=ans.concat(req.body.latest_move_in_date,","); 
		if(req.body.location)
		ans=ans.concat(req.body.location);
		console.log("previous search results"+ans);
		const user11={
			last_search: ans
		}
    User.update({email: emailsess},user11,(er,ds)=>{
			if(er)
			 throw er;
			 console.log("Previous search saved in DB");
		})

		var results = User.find({$or:[
	        {location: req.body.location},
	        {dietary_habit: req.body.dietary_habit},
					{smoking_habit: req.body.smoking_habit},
					{gender: req.body.gender}
					
	    ], $and: [{ email: { $ne: req.session.user[0].email}}]}, function(errors, docs){
	    	if(docs) {
					if(docs.length == 0) {
						let message = [];
						message.push({text:'No results found'});
						console.log('No results found');
						res.render('search/search',{
							message: message,
							usersession: req.session.user[0],
							hasloggedin: hasloggedin
						});
					} else {
						console.log('Locality ' + req.session.user[0].location);
						res.render('search/search', {hasloggedin: hasloggedin,usersession: req.session.user[0], flag: true, results: docs});
					}		
				} else {
					let errors=[];
					errors.push({text:'Error in search'});
					res.render('search/search',{
						errors: errors,
						hasloggedin: hasloggedin
					});
					console.log('Error in search');
				}
				if(errors)
					throw errors
	    });
		
	});
 app.get('search/displayprofile',search.displayprofile);
	app.post('/processprofile',(req,res)=>{
		console.log("hello")
		console.log(req.body.viewprofile);
		User.find({email: req.body.viewprofile},(err,docs)=>{
			if(err)
			 throw err;
			 console.log("Arpita is"+docs[0])
			res.render('search/displayprofile',{useris: docs[0],hasloggedin: hasloggedin}); 
		})
	})
	app.get('/search', (req, res)=>{
		User.find({email: emailsess},(err,docs)=>{
			if(err)
			 throw err
			req.session.user=docs;
			var results = User.find({ location: req.session.user[0].location, email: { $ne: req.session.user[0].email} }, function (errors, docs){
				if(docs) {
					if(docs.length == 0) {
						let message = [];
						message.push({text:'No results found'});
						console.log('No results found');
						res.render('search/search',{
							message: message,
							usersession: req.session.user[0],
							hasloggedin: hasloggedin
						});
					} else {
						console.log('Locality ' + req.session.user[0].location);
						res.render('search/search', {usersession: req.session.user[0],hasloggedin: hasloggedin, flag: true, results: docs});
					}		
				} else {
					let errors=[];
					errors.push({text:'Error in search'});
					res.render('search/search',{
						errors: errors,
						hasloggedin: hasloggedin
					});
					console.log('Error in search');
				}
				if(errors)
					throw errors

			});
		})
		//var currentUser = req.session.user[0];
		console.log("session email : " + emailsess);
		console.log("current user : " + req.session.user[0].email);		
	});
	
	app.post('/',(req,res)=>{
		console.log();
		let errors=[];
		if(!req.body.signupEmail){
			errors.push({text: 'Please enter valid NCSU username'});

		}
		if(!req.body.signupPassword)
		{
			errors.push({text: "Please enter a valid password"});
		}
		if(req.body.signupPassword!=req.body.confirmPassword)
		{
			errors.push({text: 'Passwords don\'t match'})
		}
		User.find({email: req.body.signupEmail}, function (err, docs) {
			if (docs.length){
				errors.push({text: "User is already registered"})
			 //req.session.user=docs;
				//	res.render('login/signupsuccess',{answer: docs[0]});
				//	console.log(req.session.user);
		}
			});
	
		if(errors.length>0){
			res.render('login/index',{
				errors: errors,
				email: req.body.signupEmail,
				password: req.body.signupPassword
			});
		}
		else{
			console.log('success signup')
			const newUser={
				email: req.body.signupEmail,
				password: req.body.signupPassword
			}
			new User(newUser).save((err,docs)=>{
				if(err)
				throw err;
				console.log("saved to db"); 
			});
		
			//smtp logic
			rand=Math.floor((Math.random()*100)+54);
			host=req.get('host');
			link="http://"+req.get('host')+"/verify?id="+rand;
			mailOptions={
				to: req.body.signupEmail+"@ncsu.edu",
				subject: "Please confirm your email account",
				html: "Hello,<br> Please click and verify<br><a href="+link+">Click here to verify</a>"
			}
			console.log(mailOptions);
			smtpTransport.sendMail(mailOptions,(error,response)=>{
			if(error){
				console.log(error);
				res.end("error"); 
			}else{
				console.log("Message sent:"+res.message);
				res.end("sent");
			}
		});
	}});
	
	app.post('/signin',(req,res)=>{
		console.log(req.body.loginEmail)
		//Check if the user has already set his characteristics
		
		User.find({email: req.body.loginEmail,password: req.body.loginPassword}, function (err, docs) {
			if (docs.length){
			 hasloggedin=true;
			 console.log(hasloggedin)
			 req.session.user=docs;
			 console.log('session id is'+req.sessionID)
			 console.log(docs[0].first_name);
					//res.render('login/signinsuccess',{answer: docs[0]});
				if(docs[0].dietary_habit)
				 var updatedCharacteristics=true
				 
					if(!docs[0].first_name)
					res.render('login/register',{emailer: req.body.signupEmail,userid: req.session.user[0] })
					else
					{
						emailsess=req.session.user[0].email;
					res.render('landing/landing',{usersession: req.session.user[0],flag: updatedCharacteristics,hasloggedin :hasloggedin})

					console.log(req.session.user);
					}
			} else {
				let errors=[];
				errors.push({text:'Invalid Credentials'});
				res.render('login/index',{
					errors: errors
				});
				console.log('Signin failure');
			}
		});
	});
	
	app.get('/verify',(req,res)=>{
		console.log(req.protocol+":/"+req.get('host'));
		if((req.protocol+"://"+req.get('host'))==("http://"+host)){
    		console.log("Domain is matched. Information is from Authentic email");
			if(req.query.id==rand){
				console.log("email is verified");
				//	res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
					//res.render('login/register',{emailer: req.body.signupEmail})
					res.render('login/index');
			}else{
				console.log("email is not verified");
				res.end("<h1>Bad Request</h1>");
			}
		}else{
    		res.end("<h1>Request is from unknown source");
		}
	});

	//Register user
	app.get('/register', login.register);
	app.post('/register',(req,res)=>{
		let errors=[];
		if(!req.body.firstName){
			errors.push({text: 'Please enter valid firstname'});
		}
		if(!req.body.lastName)
		{
			errors.push({text: "Please enter a valid lastname"});
		}
		if(!req.body.genderRadio)
		{
			errors.push({text: "Please select a valid gender"});
		}
		if(!req.body.phoneNumber)
		{
			errors.push({text: "Please enter a valid phone number"})
		}

	
		if(errors.length>0){
			res.render('userProfile/register',{
				errors: errors
			});
		}
		else{
			console.log('registration successful signup')
			hasloggedin=true;
			const newUser={
				first_name: req.body.firstName,
				last_name: req.body.lastName,
				gender: req.body.genderRadio,
				phone_no: req.body.phoneNumber
			}
			console.log("ACCOUNT SESSSSSION:"+req.session.user)
			User.update({email: req.session.user[0].email},newUser,function(err,docs){
				if(err)
				 throw err;
			})
			//emailsess=req.session.user[0].email;
			User.find({email: emailsess},(err,docs)=>{
				 if(err)
					throw err;
					console.log("AMULYA VAROTE 12334566:"+docs[0])
					res.render('userProfile/index',{usersession: docs[0],hasloggedin: hasloggedin})
			})
		
		}
	})
	
	
	app.get('/index',(req,res)=>{
		
		User.find({email: emailsess},(err,docs)=>{
			 if(err)
				throw err;
				req.session.user=docs;
			res.render('userProfile/index',{usersession: req.session.user[0],flag: true,hasloggedin: hasloggedin})
		})
	});


	app.post('/index',(req,res)=>{
		console.log('Hello')
		let errs=[]
		if(!req.body.oldpassword)
		 errs.push({updater: "Enter a password"})
		 if(req.body.newpassword != req.body.confirmnewpassword)
		 errs.push({updater: "Passwords don't match"})
		 if(errs.length>0)
		 {
			res.render('userProfile/index',{
				errs: errs,
				
			});
		 }
		 
		User.find({email: req.session.user[0].email,password: req.body.oldpassword},(err,docs)=>{
			if(err)
			{
			 throw err;	
			 errs.push({updater: "Old password is wrong"})
			 //res.render('/index',{errs: errs});
			}
			else{
			 const user1={password: req.body.newpassword};
			 User.update({email: req.session.user[0].email},user1,(err,docs)=>{
				 if(err)
					throw err;
					//var emailsess=req.session.user[0].email
					emailsess=req.session.user[0].email;
					User.find({email: emailsess},(errs,resp)=>{
						if(errs)
						 throw errs;
            updatedpassword=true
						res.render('userProfile/index',{flagpass: updatedpassword,flag: true,usersession: resp[0],hasloggedin: hasloggedin});
					})
				//	res.render('userProfile/index',{answer: docs[0]});
					console.log('Updated password');
			 })
			}	})
	
	})

	//Update characteristics such as dietary and smoking
	app.post('/updatedetails',(req,res)=>{
		console.log('Hello updating dietary and smoking')
		let errs=[]
		User.find({email: req.session.user[0].email},(err,docs)=>{
			if(err)
			{
			 throw err;	
			 errs.push({updater: "Old password is wrong"})
			 //res.render('/index',{errs: errs});
			}
			
			else{
				console.log("update details"+docs[0]);
				if(docs[0].dietary_habit)
				hasupdatedCharacteristics=true;
			 const user1={dietary_habit: req.body.dietary_habit,
				smoking_habit: req.body.smoking_habit,
				alcoholic_habit: req.body.alcoholic_habit,
				location: req.body.location,
				min_budget: req.body.min_budget,
				max_budget: req.body.max_budget,
				room_sharing: req.body.room_sharing,
				status: req.body.status,
				earliest_move_in_date: req.body.earlydate,
				latest_move_in_date: req.body.latedate
			};
			 User.update({email: req.session.user[0].email},user1,(err,docs1)=>{
				 if(err)
					throw err;
					console.log('Updated characteristics');
					hasupdatedCharacteristics=true;
					
			 })
			 emailsess=req.session.user[0].email
			 User.find({email: emailsess},(errs,resp)=>{
				 
			 console.log("resp is"+resp[0])
				 if(errs)
					throw errs;
				 updatedchar=true;
				 res.render('userProfile/index',{flag: hasupdatedCharacteristics,flagger: updatedchar,hasloggedin: hasloggedin,usersession: resp[0]});
			 })

			}	})
		
	})



	//Logout
	app.get('/logout', function (req, res) {
		req.session.destroy();
		res.render('login/index');
	});
}