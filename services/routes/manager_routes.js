//NODEJS

var express = require('express');

module.exports = function(app){
	var crew = require("../crew_services.js");
	var user = require("../user_services.js");

	app.use("/static", express.static("./static"))
		.use('/views', express.static('./views'))
		.use("/lib", express.static("./lib"));

	app.get("/manager/profile", user.getUser);
	app.post("/manager/addcrew", crew.addCrew);

	//app.get("/manager/bookings", function(req, res){
	//	if(req.session.userid){
	//		res.render("manager_bookings", {userid: req.session.userid, username: req.session.username, userrole: req.session.userrole, msg: req.session.msg} )
	//	}else{
	//		req.session.msg = "Session expired. Pls login again.";
	//		res.redirect("/login");
	//	}
	//});

	//app.get("/manager/crews", function(req, res){
	//	if(req.session.userid){
	//		res.render("manager_crews", {userid: req.session.userid, username: req.session.username, userrole: req.session.userrole, msg: req.session.msg} )
	//	}else{
	//		req.session.msg = "Session expired. Pls login again.";
	//		res.redirect("/login");
	//	}
	//});

	//app.get("/manager/addcrew", function(req, res){
	//	if(req.session.userid){
	//		res.render("manager_addcrew", {userid: req.session.userid, username: req.session.username, userrole: req.session.userrole, msg: req.session.msg} )
	//	}else{
	//		req.session.msg = "Session expired. Pls login again.";
	//		res.redirect("/login");
	//	}
	//});

	//app.get('/manager/crewshifts/:id', function(req, res){
	//	if(req.session.userid){
	//		res.render('manager_crewshifts', {
	//			userid: req.session.userid,
	//			username: req.session.username,
	//			userrole: req.session.userrole,
	//			msg: req.session.msg} )
	//	}else{
	//		req.session.msg = "Session expired. Pls login again.";
	//		res.redirect('/login');
	//	}
	//});

	//app.get('/manager/crewcalendar/:id', function(req, res){
	//	if(req.session.userid){
	//		res.render('manager_crewcalendar', {
	//			userid: req.session.userid,
	//			username: req.session.username,
	//			userrole: req.session.userrole,
	//			msg: req.session.msg} )
	//	}else{
	//		req.session.msg = "Session expired. Pls login again.";
	//		res.redirect('/login');
	//	}
	//});


}