require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./server/_helpers/jwt');
const errorHandler = require('./server/_helpers/error-handler');

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./server/users/users.controller'));
app.use('/posts', require('./server/posts/posts.controller'));
app.use('/comments', require('./server/comments/comments.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});