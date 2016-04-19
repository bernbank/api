var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var pledges = require('./routes/pledges');
var dailyCallLogs = require('./routes/daily-call-logs');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());


app.use('/pledges', pledges);
app.use('/dailyCallLogs', dailyCallLogs);

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
