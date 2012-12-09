var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var TaskSchema = new Schema({
	userId: { type: String, required: true },
	task: { type: String, required: false },
	description: { type: String, required: false },
	location: { type: String, required: false },
	when: {type: String, required: false },
	price: { type: String, required: false },
});

// my convience methods
TaskSchema.methods.action = function(param) {
	var result = this.task + ' with desc ' + this.description;
	return result;
};

module.exports = mongoose.model('Task', TaskSchema);