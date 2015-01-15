//NODEJS

var express = require('express');

module.exports = function(app){
	var user = require("../user_services.js");

	app.get("/api/getuser/:userid", user.getUser);
	app.post("/api/updateuser", user.updateUser);
	// app.use("/static", express.static("./static")).
	// 	use('/views', express.static('./views')).
	// 	use("/lib", express.static("./lib"));

	
	//these are service routes from maribeth_app.js (angular modules)
	// app.get("/profile", function(req, res){
	// 	if(req.session.userid){
	// 		res.redirect("/profile/"+ req.session.userid);
	// 	}else{
	// 		req.session.msg = "Session expired. Pls login again.";
	// 		res.redirect("/login");
	// 	}
	// });
	// app.get("/profile/:id", function(req, res){
	// 	if(req.session.userid){
	// 		res.render("profile", {msg: req.session.msg});
	// 	}else{
	// 		req.session.msg = "Session expired. Pls login again.";
	// 		res.redirect("/login");
	// 	}
	// });
}