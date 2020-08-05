require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport');
var errorHandler = require('errorhandler')
var debug = require('debug')('app4')
var app = express();
var cors = require('cors')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 1000000,
  extended: true
}));
app.use(cors())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

require('./routes/index')(app, passport)

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

app.set('port', process.env.PORT || 3000)

var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port)
})


module.exports = app;
