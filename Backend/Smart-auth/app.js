const express = require('express');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

const app = express();

// JWT secret. TODO: externalizing this and deleting it from archive/Prod
const mySecret = 'achraf123';


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//the middleware for handling non-authenticated requests
const requireAuth = (req, res, next) => {
    //URLs that dont need authentication
    let openURLs = ['/','/login','/signup'];
    // token coming from the request header
    let token= req.headers.token

    if(openURLs.includes(req.path) ){
        next();
    }
    else {
        try {
            let decoded = jwt.verify(token, mySecret);
            console.log(decoded);
            next();
        } catch(err) {
            console.error(err)
            res.send("This endpoint requires authentication. Please log in!");
        }
    }
}

app.use(requireAuth);

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port , function (){
    console.log("Listening on port: "+port);
});


