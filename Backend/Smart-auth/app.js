const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function (req, res) {
    res.send('Hello ach');
});

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port , function (){
    console.log("Listening on port: "+port);
});
