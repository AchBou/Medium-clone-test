const express = require('express');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

const app = express();

// JWT secret. TODO: externalizing this and deleting it from archive/Prod
const mySecret = 'achraf123';


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const apiRouter = require('./routes/api');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST ,DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
    next();
});

//the middleware for handling non-authenticated requests
app.use(function(req, res, next) {
    //URLs that dont need authentication
    let openURLs = ['/','/login','/signup'];
    // token coming from the request header
    let token= req.headers.authorization;
    if(openURLs.includes(req.path) || req.method==='OPTIONS' ){
        next();
    }
    else {
        try {
            let decoded = jwt.verify(token, mySecret);
            console.log(decoded);
            next();
        } catch(err) {
            console.error(err)
             res.status(401).json('This endpoint needs authentication. Please login or verify the token');
        }
    }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port , function (){
    console.log("Listening on port: "+port);
});


