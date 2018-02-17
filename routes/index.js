// const routes = require('express').Router();

// // Default route
// routes.get('/',(req, res)=>{
//    res.render('helloworld');
// });

// // Search page
// routes.get('/search/search',(req,res)=>{
//   res.render('search/search');
// });

// module.exports = routes;
const login = require('../app/controllers/home');
module.exports = function (app) {
	app.get('/', login.index);
}