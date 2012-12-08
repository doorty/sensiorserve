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

app.get('/dashboard', function(req,res){
  locals = {
    title: 		 'EndAtrocities.com',
    description: '...',
    author: 	 'Brent Daugherty',
    _layoutFile: 'layout.ejs'
  };

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

  res.render('tasks/new.ejs', locals);
});

/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function(req, res){
  res.render('404.ejs', locals);
});