//NODEJS
//user_controller.js consists of functions related to user authentications and authorisation.
//such as: login, logout, and signup

var crypto = require('crypto');
var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Profile = mongoose.model('Profile'),
	Address = mongoose.model('Address'),
	Company = mongoose.model('Company');
var ObjectId = require('mongodb').ObjectID;

function hashPW(pwd){
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

exports.login = function(req, res){
	User.findOne({username: req.body.username}).
		exec(function(err,user){
			//console.log('error: ' + err);
			if(!user){
				err = "User not found!";
			}else if(user.hashed_password === hashPW(req.body.password.toString())){
				// console.log('user: ');
				// console.log(user);
				req.session.regenerate(function(){
					req.session.userid = user._id;
					req.session.username = user.username;
					req.session.userrole = user.profile[0].role;
					req.session.companyid = user.company[0]._id;
					req.session.companyname = user.company[0].name;					
					req.session.msg = "Authenticated as " + user.username;

					//res.redirect("/index");
					res.json(req.session);
				});
			}else{
				err = "Authenticated failed";
			}
			
			if(err){
				(err==undefined)?err='' : err=err;
				req.session.regenerate(function(){
					req.session.msg = err;
					res.json(401, {msg: "User not found!"});
					//res.redirect("/login");
				});
			}
		});
}

exports.logout = function(req, res){
	req.session.destroy(function(){
	 	res.json(200, {msg:'User logout.'})
	 	//res.render('logout');
	});	
}

exports.signup = function(req, res){
	User.findOne({username: req.body.username}).
		exec(function(err, user){
			if(user){
				err = "Username exists in the database. Please use another one.";
			}else{
				var newuser = new User({	
						username:req.body.username,
						hashed_password: hashPW(req.body.password),
						company: new Company({
							name: req.body.companyname,
							address: new Address({
								street: req.body.companystreet,
								city: req.body.companycity,
								state: req.body.companystate,
								postcode: req.body.companypostcode
							})
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
							role: "Manager",
							status: "Active",
							created: Date.now
						})
					});

				//console.log(newuser);
				newuser.save(function(err){
				 	if(err){
				 		res.session.error = err;
						res.json(401, {msg: err});

						//res.redirect("/signup");
				 	}else{
						res.json(200, {msg: "Registration successful!"});
				 		//res.redirect("/");
				 	}
				});
			}
		});
}

exports.getUser = function(req,res){
	var id = req.param('userid');
	(id==undefined || id=="")? id=req.session.userid : id=id;
	//console.log('getUser: ' + id);
	
	//if(req.session.userid){
		User.find({_id: new ObjectId(id)}).
			exec(function(err, user){
				if(!user){
					res.json(404, {msg: "User is not found."});
				}else{
					res.json(user);
				}
			});
 	//}else{
 	//	req.session.msg = "Session expired. Pls login again.";
 		//res.redirect("/login");
 	//}
	
}

exports.updateUser = function(req,res){
	console.log(req.body[0]._id);
	User.findOne({_id: new ObjectId(req.body[0]._id)}).
		exec(function(err, user){
			if(!user){
				res.json(404, {msg: "User is not found."});
			}else{

				//update profile
				var profile = new Profile(user.profile[0]);
				profile.firstname = req.body[0].profile[0].firstname;
				profile.lastname = req.body[0].profile[0].lastname;
				profile.email = req.body[0].profile[0].email;
				profile.phone = req.body[0].profile[0].phone;

				var address = new Address(user.profile[0].address[0]);				
				address.street = req.body[0].profile[0].address[0].street;
				address.city = req.body[0].profile[0].address[0].city;
				address.state = req.body[0].profile[0].address[0].state;
				address.postcode = req.body[0].profile[0].address[0].postcode;
				profile.address = address;

				//update company
				var company = new Company(user.company[0]);	
				company.name = req.body[0].company[0].name;
				
				var compaddress = new Address(user.company[0].address[0]);				
				compaddress.street = req.body[0].company[0].address[0].street;
				compaddress.city = req.body[0].company[0].address[0].city;
				compaddress.state = req.body[0].company[0].address[0].state;
				compaddress.postcode = req.body[0].company[0].address[0].postcode;
				company.address = compaddress;

				user.set('profile', profile);				
				user.set('company', company);

				user.save(function(err){
					if(err){
						res.session.error = err;
						res.json(404, {msg: req.session.error});
					}else{
						req.session.msg = 'User Updated.';
						res.json(200, {msg: req.session.msg});
					}
					//res.redirect('/manager/crews');

				});
			}
		});
}