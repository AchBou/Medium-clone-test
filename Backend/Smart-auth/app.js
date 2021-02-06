const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const crypto = require('crypto');

const app = express();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port , function (){
    console.log("Listening on port: "+port);
});


