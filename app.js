var express = require('express')
  , engine = require('ejs-locals')
  , app = express();


exports.init = function(port) {
  
  app.configure(function(){
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser({uploadDir:'public/uploads'}));
    app.use(express.methodOverride());
    app.use(app.router);
    app.enable("jsonp callback");
  });
  
  app.engine('ejs', engine);
  
  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
    // app.use(express.logger({ format: ':method :url' }));
  });
  
  app.configure('production', function(){
     app.use(express.errorHandler()); 
  });
  
  
  app.use( function(err, req, res, next) {
    res.render('500.ejs', { locals: { error: err }, status: 500 });
  });
  
  server = app.listen(port);
  
  console.log("Listening on port %d in %s mode", port, app.settings.env);
  
  return app;
}