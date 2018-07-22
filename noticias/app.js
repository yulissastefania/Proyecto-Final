var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');

var nib = require('nib');//instanciamos para manejar nib
var stylus= require('stylus');//instanciamos 



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//instanciando mongo

var db, db_address, mongoose;
mongoose = require ("mongoose");
db_address = "127.0.0.1:27017/noticias1";
mongoose.connection.on("open",function (ref){
    return console.log("Connected to mongo server!");
});

mongoose.connection.on("error",function(err){
    console.log("Could not connect to mongo server!"+err);
    return console.log(err.message.red);
});

try{
  mongoose.connect("mongodb://" + db_address);  
  db = mongoose.connection;
  console.log("Started connection on"+("mongodb://" + db_address).cyan +",waiting for it to open...".grey);
}catch(err){
    console.log(("Setting up failed to connect to "+ db_address).red,err.message);
};









// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//nuevo agragado
app.use(session({
    secret:'jacc',
    resave:true,
    saveUninitialized:true//cuando las seciones se inician en set
}));



app.use(logger('dev'));//el ambiente de desarrollo
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('view engine','ejs');//istanciamos el motor de visualizacion



module.exports = app;
