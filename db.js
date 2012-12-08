var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		bcrypt = require(bcrypt),
    SALT_WORK_FACTOR = 10;
		db;


exports.init = function(host) {
  
  db = mongoose.createConnection(host, 'test');
  
  db.on('error', console.error.bind(console, 'connection error: '));
  
  db.once('open', function() {
		
		var EnablerSchema = new Schema({
			headline: { type: String, required: true, index: { unique: true } },
			description: { type: String, required: true },
			evidence: { type: [String], required: false },
			password: { type: String, required: true }
		});
		
		EnablerSchema.pre('save', function(next) { 
			var enabler = this;
			// only hash the password if it has been modified (or is new)
			if (!enabler.isModified('password')) return next();
			
			// generate a salt
			bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
				if (err) return next(err);

				// hash the password along with our new salt
				bcrypt.hash(enabler.password, salt, function(err, hash) {
					if (err) return next(err);

						// override the cleartext password with the hashed one
						enabler.password = hash;
						next();
				});
			});
		});
		
		EnablerSchema.methods.comparePassword = function(candidatePassword, cb) {
			bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
				if (err) return cb(err);
				cb(null, isMatch);
			});
		};
		
		EnablerSchema.methods.vote = function(issueId) {
			var result = this.userId + ' voted for ' + issueId;
			return result;
		};
		
		//var Enabler = db.model('Enabler', EnablerSchema);
		module.exports = mongoose.model('Enabler', EnablerSchema);
		
		return mongoose;

	});
	
	
}




