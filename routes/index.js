var nodemailer=require("nodemailer");
var smtpTransport=nodemailer.createTransport({
	service: "gmail",
	auth:{
		user: "aishwaryassr@gmail.com",
		pass: "Reddeogre.123"
	}
});
var rand,mailOptions,host,link;

const login = require('../app/controllers/home');
const userProfile=require('../app/controllers/profile');
const search = require('../app/controllers/search');


module.exports = function (app,User,mongoose,session) {
	app.get('/', login.index);

	app.get('/search', search.index);
	
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
			
			 req.session.user=docs;
			 console.log('session id is'+req.sessionID)
			 console.log(docs[0].first_name);
					//res.render('login/signinsuccess',{answer: docs[0]});
				if(docs[0].dietary_habit)
				 var updatedCharacteristics=true
				 
					if(!docs[0].first_name)
					res.render('login/register',{emailer: req.body.signupEmail,userid: req.session.user[0] })
					else
					res.render('userProfile/index',{usersession: req.session.user[0],flag: updatedCharacteristics})
					console.log(req.session.user);
			}else{
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
					res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
					//res.render('login/register',{emailer: req.body.signupEmail})
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
			const newUser={
				first_name: req.body.firstName,
				last_name: req.body.lastName,
				gender: req.body.genderRadio,
				phone_no: req.body.phoneNumber
			}
			User.update({email: req.session.user[0].email},newUser,function(err,docs){
				if(err)
				 throw err;
			 //res.render('userProfile/registersuccess');
			 res.render('userProfile/index',{usersession: req.session.user[0]});
			})
		
		}
	})
	 
	app.get('/index',userProfile.index);
/*	app.get('/index',(req,res)=>{
		res.render('userProfile/index',{usersession: req.session.user[0]})
	});*/

	//app.get('/registersuccess',userProfile.registersuccess);
	//Update password
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
					res.render('userProfile/index',{answer: docs[0]});
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
				 var hasupdatedCharacteristics=true;
			 const user1={dietary_habit: req.body.dietary_habit,
				smoking_habit: req.body.smoking_habit,
				alcoholic_habit: req.body.alcoholic_habit,
				min_budget: req.body.min_budget,
				max_budget: req.body.max_budget,
				room_sharing: req.body.room_sharing,
				//status: req.body.status,
				earliest_move_in_date: req.body.earlydate,
				//latest_move_in_date: req.body.latedate
			};
			 User.update({email: req.session.user[0].email},user1,(err,docs)=>{
				 if(err)
					throw err;
					console.log('Updated characteristics');
					hasupdatedCharacteristics=true;
					var emailsess=req.session.user[0].email
					User.find({email: emailsess},(errs,resp)=>{
						
					
						if(errs)
						 throw errs;
						res.render('userProfile/index',{flag: hasupdatedCharacteristics,usersession: resp[0]});
					})
					
			 })
			}	})
		
	})
}