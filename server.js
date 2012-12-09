var app = require('./app').init(4000),
		mongoose = require('mongoose'),
		User = require('./user-model'),
		Task = require('./task-model'),
		fs = require('fs'),
		connStr = 'mongodb://admin:pass@linus.mongohq.com:10006/seniorserve';//'mongodb://localhost:27017/enablers-test';

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

app.get('/dashboard', function(req,res){
  locals = {
    title: 		 'EndAtrocities.com',
    description: '...',
    author: 	 'Brent Daugherty',
    _layoutFile: 'layout.ejs'
  };
  
  Task.find({ userId: "1" }, function(err, tasks) {
		console.log("tasks: " + tasks);
		locals.tasks = tasks;
		res.render('enablers/listings.ejs', locals);
	});

  res.render('tasks/dashboard.ejs', locals);
});

app.get('/create-task', function(req,res){
  locals = {
    title: 		 'EndAtrocities.com',
    description: '...',
    author: 	 'Brent Daugherty',
    _layoutFile: 'layout.ejs'
  };

  res.render('tasks/new.ejs', locals);
});

app.post('/create-task', function(req,res){
  locals = {
    title: 		 'EndAtrocities.com',
    description: '...',
    author: 	 'Brent Daugherty',
    _layoutFile: 'layout.ejs'
  };
	
  var task = new Task({ 
    userId: req.body.userId ? req.body.userId : "1",
    task:  req.body.task ? req.body.task : "task",
    description: req.body.description ? req.body.description : "N/A",
    location: req.body.location ? req.body.location : "San Francisco, CA",
    when: req.body.when ? req.body.when : "ASAP",
    price: req.body.price ? req.body.price : "0"
  });
  
	task.save(function(err) {
	  if (err) throw err;
	  console.log("saved: " + task._id);
	});
	
	locals.notice = "Your task has been added."

  res.render('tasks/dashboard.ejs', locals);
});

app.get('/complete-task', function(req,res){
  locals = {
    title: 		 'EndAtrocities.com',
    description: '...',
    author: 	 'Brent Daugherty',
    _layoutFile: 'layout.ejs'
  };

  res.render('tasks/getalert.ejs', locals);
});

/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function(req, res){
  res.render('404.ejs', locals);
});