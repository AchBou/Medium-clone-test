const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const reactionsRouter = require('./routes/reaction.route');
const commentsRouter = require('./routes/comment.route');
const tagsRouter = require('./routes/tag.route');
const articlesRouter = require('./routes/article.route');

const app = express();

const corsOptions = {
   origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
   res.header(
       "Access-Control-Allow-Headers",
       "x-access-token, Origin, Content-Type, Accept"
   );
   next();
});


const db = require("./DB");

db.init().then(()=>{
   db.sequelize.sync().then(() => {
      console.log("synced DB.");
   });
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/comments', commentsRouter);
app.use('/articles', articlesRouter);
app.use('/tags', tagsRouter);
app.use('/reactions', reactionsRouter);

module.exports = app;
