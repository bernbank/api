#!/usr/bin/env node
var process = require('process');
var app = require('../app');
var http = require('http');

//Disabled jobs now that primary season is over
//var jobs = require('./jobs');
//
//jobs.setupJobs();

var server = http.createServer(app);
server.listen(process.env.PORT || 3000);
