
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
		const newUser={
			email: req.body.signupEmail,
		}
		new User(newUser).save();
		res.render('login/signupsuccess')
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
}
