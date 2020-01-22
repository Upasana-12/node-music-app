var express = require('express')
  var path = require('path')
  var app = express()
  var ejs = require('ejs')
  var session = require('express-session')

  app.set('views',path.join(__dirname,'views'))
  app.set('view engine', 'ejs');

  app.use(express.static(path.join(__dirname,'public')))
  app.use(express.static(path.join(__dirname,'public/songs')))
  app.use(express.static(path.join(__dirname,'public/images')))

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  app.use(session({
    secret: "2356hdjf6589gkjf",
    resave: false,
     saveUnintialized: true,
  }))

  var mongoose = require('mongoose');
  var schema = mongoose.Schema;
  var admindb = 'mongodb://localhost/mediaplayer';

  mongoose.connect(admindb);

  mongoose.connection.on('error',(err) => {
    console.log('DB connection Error');
  })

  mongoose.connection.on('connected',(err) => {
     useNewUrlParser: true;
    console.log('DB connected');
  })

  app.use('/',require('./routes/'));


  app.listen(3000);