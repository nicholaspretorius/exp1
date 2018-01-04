const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    const name = req.cookies.username; // enables es2015 shortcut for name: name
    if (name) {
        res.render('index', {title: 'Hello world!', name });
    } else {
        res.redirect('/hello');
    }
});

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    //res.json(req.body);
    res.cookie('username', req.body.username);
    //res.render('hello', { name: req.body.username });
    res.redirect('/');
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
});

module.exports = router;