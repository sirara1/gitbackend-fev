var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { connectToMongoDb } = require ("./config/db");

const http = require('http');

require("dotenv").config();

var usersRouter = require('./routes/userRouter');
var osRouter = require('./routes/osRouter');
var InterventionRouter = require('./routes/InterventionRouter'); 
var RTIRouter = require('./routes/RTIRouter'); 
var equipementRouter = require('./routes/equipementRouter'); 



var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/Intervention', InterventionRouter);
app.use('/RTI',RTIRouter);
app.use('/equipement',equipementRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);
server.listen(process.env.port, () => {
connectToMongoDb(), 
  console.log("app is running on port 5000");
});

