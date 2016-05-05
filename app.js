var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var pledges = require('./routes/pledges');
var dailyCallLogs = require('./routes/daily-call-logs');
var mailing = require('./routes/mailing');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

// Disable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/api/pledges', pledges);
app.use('/api/dailyCallLogs', dailyCallLogs);
app.use('/api/mailing', mailing);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});


module.exports = app;
