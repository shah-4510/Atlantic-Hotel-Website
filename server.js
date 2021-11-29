const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const mongoDB = require('./mongoDBClient');
const path = require('path');

const users = require('./routes/users');
const rooms = require('./routes/rooms');
const bookings = require('./routes/bookings');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});


app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/rooms', rooms);
app.use('/users', users);
app.use('/bookings', bookings);

app.use('/uploads', express.static('uploads'));

app.use('/', rooms);
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(5000, function () {
    console.log('App listening on port 5000!')
});

