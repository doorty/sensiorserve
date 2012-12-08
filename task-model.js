var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    // these values can be whatever you want - we're defaulting to a
    // max of 5 attempts, resulting in a 2 hour lock
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 2 * 60 * 60 * 1000;

var TaskSchema = new Schema({
	userId: { type: String, required: true },
	description: { type: String, required: false },
	location: { type: [String], required: false },
	when: {type: String, required: false },
	price: { type: String, required: false },
});

TaskSchema.pre('save', function(next) { 
	var task = this;
	

});


// my convience methods
TaskSchema.methods.action = function(param) {
	var result = this.headline + ' with desc ' + this.description;
	return result;
};

module.exports = mongoose.model('User', TaskSchema);




