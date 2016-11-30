var restify = require('restify');
var logger = require('morgan');
var requireDir = require('require-dir');

var middlewares = requireDir('middlewares');
var controllers = requireDir('controllers');
var app = restify.createServer();

app.pre(restify.pre.sanitizePath());
app.on('MethodNotAllowed', middlewares.cors.MethodNotAllowed());
app.use(logger('dev')); // Logs http requests on terminal
app.use(middlewares.cors.request());
app.use(restify.bodyParser({keepExtensions: true})); // Inject x-www-form-urlencoded request variables to req.params
app.use(restify.queryParser()); // Allows use of req.query

require('./routes')(app, controllers, middlewares);

module.exports = app;
