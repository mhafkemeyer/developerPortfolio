var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require('nodemailer');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index', {title: 'Portfolio'});
});

// POST route from contact form
app.post('/contact', function (req, res) {
    var mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    mailOpts = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: 'New message from contact form',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
        if (error) {
            console.log(error);
            res.render('index');
        }
        else {
            res.render('index');
        }
    });
});

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

module.exports = app;
