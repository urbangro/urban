var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var environmentRouter = require('./routes/environment');

const passport = require('passport');
require("./config/passport")(passport)

const session = require('express-session');
const flash = require('connect-flash');

var app = express();

/* Setup view engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Setup Logger */
app.use(logger('dev'));
// app.use(logger('combined')); // log complete request
// You can set morgan to log differently depending on your environment
// if (app.get('env') == 'production') {
//   app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
// } else {
//   app.use(morgan('dev'));
// }
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Setup routers */
/* Each router maps specific page(s) */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/environment', environmentRouter);


// catch 404 and forward to error handler
// TODO: create 404 page
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

module.exports = app;
