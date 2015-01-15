//NODEJS

var crypto = require('crypto');
var express = require('express');

module.exports = function(app){
	var users = require("../user_services.js");

	app.post("/api/login", users.login);
	app.post("/api/signup", users.signup);
	app.get("/api/logout", users.logout);
	app.post("/api/signup", users.signup);

	// app.use("/static", express.static("./static"))
	// 	.use('/views', express.static('./views'))
	// 	.use('/images', express.static('./images'))
	// 	.use("/lib", express.static("./lib"));


	// app.get("/", function(req, res){
	// 	if(req.session.userid){
	// 		res.redirect("/branchout");			
	// 	}else{
	// 		req.session.msg = "Session expired. Pls login again.";
	// 		res.redirect("/welcome");
	// 	}
	// });

	// app.get("/branchout", function(req, res){
	// 	if(req.session.userrole == "Crew"){
	// 		res.redirect("/crew/bookings");
	// 	}else if(req.session.userrole == "Manager"){
	// 		res.redirect("/manager/bookings");
	// 	}
	// });

	// app.get("/login", function(req, res){
	// 	if(req.session.userid){
	// 		res.redirect("/");
	// 	}
	// 	res.render('login', {msg: req.session.msg});
	// });

	// app.get("/logout", function(req, res){
	// 	req.session.destroy(function(){
	// 	 	res.render('logout');
	// 	});
	// });

	// app.get("/signup", function(req, res){
	// 	if(req.session.userid){
	// 		res.redirect("/");
	// 	}
	// 	res.render("signup", {msg: req.session.msg});
	// });

	


}