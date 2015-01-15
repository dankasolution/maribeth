//NODEJS
//user_controller.js consists of functions related to user authentications and authorisation.
//such as: login, logout, and signup

var crypto = require('crypto');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Profile = mongoose.model('Profile'),
	Address = mongoose.model('Address'),
	Company = mongoose.model('Company'),
	Email = mongoose.model('Email'),
	Shift = mongoose.model('Shift'),
	CrewShifts = mongoose.model('CrewShifts');

var ObjectId = require('mongodb').ObjectID;

function hashPW(pwd){
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

function generateEmailBody(firstname,username,pwd){
	var emailBodyObj = {};

	var emailtxt = "Welcome, " + firstname +"\n";
	emailtxt += "Your manager has created you an account on Maribeth.\n";
	emailtxt += "Username: " + username +"\n";
	emailtxt += "Password: " + pwd + "\n\n";
	emailtxt += "Please change your password with your own after you sign in.";

	var emailhtml = "<b>Welcome, " + firstname +"</b><br />";
	emailhtml += "Your manager has created you an account on Maribeth.<br />";
	emailhtml += "Username: <b>" + username +"</b><br />";
	emailhtml += "Password: <b>" + pwd + "</b><br /><br />";
	emailhtml += "Please change your password with your own after you sign in.";

	emailBodyObj.emailtxt = emailtxt;
	emailBodyObj.emailhtml = emailhtml;

	return emailBodyObj;
}

function generatePassword(req){
	var pwd = req.body.firstname.slice(0,2) + req.body.lastname.slice(0,2) + Math.floor((Math.random() * 999) + 1); //combination of firstname + lastname + 3 digit random number;	
	return pwd;
}

exports.addCrew = function(req, res){
	//username is based on crew's email address	
	var emailagent = require("../services/email_services.js");
	var uname = req.body.email;

	User.findOne({username: uname})
		.exec(function(err, user){
			if(user){
				err = "Username(email) exists in the database. Please use different one.";
				res.json(404,{msg: err});
				console.log(err);
			}else{
				
				var pwd = generatePassword(req);			
				//console.log("pwd: " + pwd);

				var newuser = new User(
					{	username:uname,
						hashed_password: hashPW(pwd),
						company: new Company({
							_id: req.body.companyid,
							name: req.body.companyname
						}),
							
						profile: new Profile({
							firstname: req.body.firstname,
							lastname: req.body.lastname,
							address: new Address({
								street: req.body.street,
								city: req.body.city,
								state: req.body.state,
								postcode: req.body.postcode
							}),
							email: req.body.email,
							phone: req.body.phone,
							role: "Crew",
							status: "Active",
							created: Date.now
						})
					});

				console.log(newuser);
				//Save new crew;
				newuser.save(function(err){
				 	if(err){
				 		res.session.msg = err;
				 		res.json(404,{msg: err});
				 	}else{
				 		//send username and password to crew's email				 		
				 		var emailBody = generateEmailBody(req.body.firstname,uname,pwd);
				 		//console.log(emailBody);
						var emailObj = new Email({
							from: 'maribeth.info@gmail.com',// sender address  Fred Foo ✔ <foo@blurdybloop.com>', 
						    to: newuser.profile[0].email, // list of receivers bar@blurdybloop.com, baz@blurdybloop.com
						    subject: 'Maribeth App Account', // Subject line 'Hello ✔'
						    text: emailBody.emailtxt, // plaintext body 'Hello world ✔'
						    html: emailBody.emailhtml// html body '<b>Hello world ✔</b>' 
						});

				 		emailagent.sendEmail(emailObj, function(){
				 			res.json(200,{msg: "Crew added"});
				 			//res.redirect("/manager/crews");
				 		});
				 	}
				});
			}
		});
}

exports.getCrews = function(req,res){
	//console.log('getCrews: ' + req.param('companyid'));
	User.find({$and:[{company:{$elemMatch:{_id: new ObjectId(req.param('companyid'))}}}, {profile: {$elemMatch:{role:'Crew'}}}]})
		.exec(function(err, crews){
			if(!crews){
				res.json(404, {msg: 'Crews not found.'});
			}else{
				res.json(crews);
			}
		});
}

exports.getShiftsByCrewId = function(req,res){
	CrewShifts.find({crewid: req.param('crewid')})
		.exec(function(err, shifts){
			if(!shifts){
				res.json(404, {msg: 'Shift not found.'});
			}else{
				res.json(shifts);
			}
		})
}

exports.upsertShift = function(req, res){	
	var _crewid = new ObjectId(req.body.crewid);
	
	CrewShifts.findOne({$and:[{crewid: _crewid}, {shifts: {$elemMatch:{startdate: req.body.startdate}}}]})
		.exec(function(err, crewshifts){
			if(crewshifts){
				console.log("Updating...");
				// //Update exisiting shift
				var shift = new Shift({
					startdate: req.body.startdate,
					shifthours: req.body.shifthours
				});
				crewshifts.shifts = [shift];

				crewshifts.save(function(err){
				 	if(err){
				 		console.log(err);
				 		req.session.msg = err;
				 	}else{
				 		console.log("Saved");
				 		req.session.msg = "Shift is updated";
				 		res.json(200, {msg: req.session.msg});
				 		//res.redirect("/manager/crewshifts/" + req.body.crewid);					 		
				 	}
				});

			}else{
				console.log("Saving...");
				var shift = new Shift({
					startdate: req.body.startdate,
					shifthours: req.body.shifthours
				});
				
				var newcrewshift = new CrewShifts({
					crewid: _crewid,
					shifts: [shift]
				})
				//Save new crew shift;				
				newcrewshift.save(function(err){
				 	if(err){
				 		console.log(err);
				 		req.session.msg = err;
				 	}else{
				 		console.log("Saved");
				 		req.session.msg = "Shift is saved";
				 		res.json(200, {msg: req.session.msg});
				 		//res.redirect("/manager/crewshifts/" + req.body.crewid);				 		
				 	}
				});
			}
		});	
}
