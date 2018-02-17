
const login = require('../app/controllers/home');
module.exports = function (app) {
	app.get('/', login.index);
}