const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

let app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

app.use((req, res, next) => {
    // console.log('one');
    // req.message = 'This is a message';
    //const err = new Error('Oh no!');
    //err.status = 500;
    next();
});

app.use((req, res, next) => {
    //console.log(req.message);
    next();
});

const routes = require('./routes');
const aboutRoutes = require('./routes/about.js');

app.use(routes);
app.use('/about', aboutRoutes);

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});