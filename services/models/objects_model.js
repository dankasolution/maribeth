var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {type:String, unique: true},
	hashed_password: String,
	company: [CompanySchema],
	profile: [ProfileSchema]
});

var AddressSchema = new Schema({
	street: String,
	city: String,
	state: String,
	postcode: String
},{_id:false});

var CompanySchema = new Schema({
	name: String,
	address: [AddressSchema]
});

var ProfileSchema = new Schema({
	firstname: String,
	lastname: String,
	address: [AddressSchema],
	email: String,
	phone: String,
	role: {type: String, enum:["Crew","Manager"]},
	status: {type: String, enum:["Active", "Inactive", "Pending"], default:"Pending"},
	created: {type: Date, default: Date.now}
});

var BookingSchema = new Schema({
	crewid: String,
	startbooking: {type: Date, required: true},
	endbooking: {type: Date, required: true },
	description: String
});

var PermissionSchema = new Schema({
	crewid: String,
	startdate: {type: Date, required: true},
	enddate:{type: Date, required: true},
	reason: {type: String, required: true},
})

var ShiftHourSchema = new Schema({
	status: Boolean,
	day: String,
	startwork: Date,
	startbreak: Date,
	finishbreak: Date,
	finishwork: Date
},{_id:false}) 

var ShiftSchema = new Schema({
	startdate: Date,
	shifthours: [ShiftHourSchema]
},{_id:false});

var CrewShiftsSchema = new Schema({
	crewid: String,
	shifts: [ShiftSchema]
});

var EmailSchema = new Schema({
	from: String,// sender address  Fred Foo ✔ <foo@blurdybloop.com>', 
    to: String, // list of receivers bar@blurdybloop.com, baz@blurdybloop.com
    subject: String, // Subject line 'Hello ✔'
    text: String, // plaintext body 'Hello world ✔'
    html: String// html body '<b>Hello world ✔</b>' 
});

mongoose.model("User", UserSchema);
mongoose.model("Address", AddressSchema);
mongoose.model("Profile", ProfileSchema);
mongoose.model("Company", CompanySchema);
mongoose.model("BookingSchema", BookingSchema);
mongoose.model("PermissionSchema", PermissionSchema);
mongoose.model("CrewShifts", CrewShiftsSchema);
mongoose.model("Shift", ShiftSchema);
mongoose.model("Email", EmailSchema);