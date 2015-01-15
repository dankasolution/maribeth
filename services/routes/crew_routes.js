//NODEJS

var express = require('express');

module.exports = function(app){
	var crews = require('../crew_services.js');

	app.get('/api/getcrewshifts/:crewid', crews.getShiftsByCrewId);
	app.get('/api/getcrews/:companyid', crews.getCrews);
	app.post('/api/upsertcrewshifts', crews.upsertShift);
	app.post('/api/addcrew', crews.addCrew);
	
	// app.use('/static', express.static('./static')).
	// 	use('/views', express.static('./views')).
	// 	use('/lib', express.static('./lib'));

	//manager routes
	// app.get('/crew/bookings', function(req, res){
	// 	if(req.session.userid){
	// 		res.render('crew_bookings', {userid: req.session.userid, username: req.session.username, userrole: req.session.userrole, msg: req.session.msg} )
	// 	}else{
	// 		req.session.msg = "Session expired. Pls login again.";
	// 		res.redirect('/login');
	// 	}
	// });

	// app.get('/crew/calendar', function(req, res){
	// 	if(req.session.userid){
	// 		res.render('crew_calendar', {userid: req.session.userid, username: req.session.username, userrole: req.session.userrole, msg: req.session.msg} )
	// 	}else{
	// 		req.session.msg = "Session expired. Pls login again.";
	// 		res.redirect('/login');
	// 	}
	// });	

	
}