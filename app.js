const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

let app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'pug');
app.set('views', './views');

app.use((req, res, next) => {
    console.log('one');
    req.message = 'This is a message';
    //const err = new Error('Oh no!');
    //err.status = 500;
    next();
});

app.use((req, res, next) => {
    console.log(req.message);
    next();
});

app.get('/', (req, res) => {
    const name = req.cookies.username; // enables es2015 shortcut for name: name
    if (name) {
        res.render('index', {title: 'Hello world!', name });
    } else {
        res.redirect('/hello');
    }
});

app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

app.post('/hello', (req, res) => {
    //res.json(req.body);
    res.cookie('username', req.body.username);
    //res.render('hello', { name: req.body.username });
    res.redirect('/');
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
});

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