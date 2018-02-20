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
module.exports = function (app,User,mongoose,session) {
	app.get('/', login.index);
	
	app.post('/',(req,res)=>{
		console.log();
		let errors=[];
		if(!req.body.signupEmail){
			errors.push({text: 'Please enter valid NCSU username'});
		}
	
	if(errors.length>0){
		res.render('login/index',{
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
		console.log('success signup')

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
 if(error)
 {
	 console.log(error);
	res.end("error"); 
 }else{
	 console.log("Message sent:"+response.message);
	 res.end("sent");
 }
});

	}
	 });
	 app.post('/signin',(req,res)=>{
		console.log(req.body.loginEmail)
		User.find({email: req.body.loginEmail}, function (err, docs) {
			if (docs.length){
			 req.session.user=docs;
					res.render('login/signinsuccess',{answer: docs[0]});
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
	})
	app.get('/verify',(req,res)=>{
		console.log(req.protocol+":/"+req.get('host'));
		if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
				res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
				const newUser={
					email: req.body.signupEmail,
				}
				new User(newUser).save();
				res.render('login/signupsuccess')
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}

	})
}

module.exports = function (app){
	app.get('/register', login.register);
}
