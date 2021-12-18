const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const sessions = require('express-session')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const AuthRouter = require('./routes/auth');
const filmsRouter = require('./routes/films');
const ganresRouter = require('./routes/ganres');
const hallsRouter = require('./routes/halls');
const sessionsRouter = require('./routes/sessions')
const orderRouter = require('./routes/orders')

const app = express();
const oneDay = 1000 * 60 * 60 * 24;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(sessions({
  secret: 'secret',
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}))

app.use('/', indexRouter);

app.use('/auth', AuthRouter);

app.use('/users', usersRouter);
app.use('/films', filmsRouter);
app.use('/ganres', ganresRouter);
app.use('/halls', hallsRouter);
app.use('/sessions', sessionsRouter);
app.use('/orders', orderRouter);

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

const db = require('./db')
db.connect()

module.exports = app;
