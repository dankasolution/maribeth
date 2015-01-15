//NODEJS

var nodemailer = require('nodemailer');
var mongoose = require('mongoose'),
	Email = mongoose.model('Email');

//email will be sent through the account below
var transporter = nodemailer.createTransport({
						    service: 'Gmail',
						    auth: {
						        user: 'maribeth.info@gmail.com',
						        pass: 'maribethinfo'
						    }
						});

exports.sendEmail = function(emailObj, callback){
	//console.log(req);	
	transporter.sendMail(emailObj, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
            callback();
        }
    });	
}
