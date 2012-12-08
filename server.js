var app = require('./app').init(4000),
		mongoose = require('mongoose'),
		User = require('./user-model'),
		Task = require('./task-model'),
		fs = require('fs'),
		connStr = 'mongodb://admin:pass@alex.mongohq.com:10083/seniorserve';//'mongodb://localhost:27017/enablers-test';

var locals = {
  title: 		 'Senior Serve',
  description: '...',
  author: 	 'Brent Daugherty',
  _layoutFile: true
};

mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

app.get('/', function(req,res){

  locals.date = new Date().toLocaleDateString();
  
  res.render('home.ejs', locals);
});

app.get('/tasks', function(req,res){

  locals = {
    title: 		 'EndAtrocities.com',
    description: '...',
    author: 	 'Brent Daugherty',
    _layoutFile: 'layout.ejs'
  };
  
   Enabler.find({ headline: /./i }, function(err, enablers) {
		console.log("enabler: " + enablers);
		locals.enablers = enablers;
		res.render('tasks/listings.ejs', locals);
	});

});

app.get('/report-enabler', function(req,res){
  locals = {
    title: 		 'EndAtrocities.com',
    description: '...',
    author: 	 'Brent Daugherty',
    _layoutFile: 'layout.ejs'
  };

  res.render('tasks/new.ejs', locals);
});

app.post('/report-enabler', function(req, res, next) {

  console.log("req.body = " + req.body);
  console.log("req.files = " + req.files);
  
  var fileInput, tmp_path, target_path;

  if (req.files.fileEvidence.size === 0) {
  
  }
  else {
    fileInput = req.files.fileEvidence;
    // get the temporary location of the file
    tmp_path = fileInput.path;
    // set where the file should actually exists - in this case it is in the "evidence" directory
    target_path = 'public/evidence/' + fileInput.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
        });
    });
  }
  
  var enabler = new Enabler({ 
    headline: req.body.headline,
    description: req.body.description,
    evidence: target_path ? [target_path] : [],
    hashtag: req.body.hashtag ? "#"+req.body.hashtag : "#endatrocity",
    password: req.body.password
  });
  
	enabler.save(function(err) {
	  if (err) throw err;
	  console.log("saved: " + enabler._id);
	});
	
	res.send(JSON.stringify(enabler));

});

app.get('/tasks/:id', function(req,res){

	locals = {
    title: 		 'EndAtrocities.com',
    description: '...',
    author: 	 'Brent Daugherty',
    enablerId: req.params.id,
    _layoutFile: 'layout.ejs'
  };

  Enabler.find({ _id: req.params.id }, function(err, enablers) {
  	if (err) throw err;
  	var enabler = enablers[0];
		console.log("found enabler: " + enabler._id);
		locals.headline = enabler.headline;
		locals.description = enabler.description;
		locals.evidence = enabler.evidence;
		locals.hashtag = enabler.hashtag;
		//locals.password = enabler.password;
		res.render('tasks/view.ejs', locals);
	}).limit(1);

  
});


/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function(req, res){
  res.render('404.ejs', locals);
});