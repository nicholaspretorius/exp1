const express = require("express");
const router = express.Router();
const { data } = require('../data/data.json'); // const data = require('../data/data.json').data;
const { cards } = data; // same as const cards = data.cards;

router.get('/', (req, res) => {
    const numCards = cards.length;
    const random = Math.floor(Math.random() * numCards);
    res.redirect(`/about/${ random }?side=question`);
});

router.get('/:id', (req, res, next) => {
    const { side } = req.query;
    const { id } = req.params;

    if (!side) {
        return res.redirect(`/cards/${id}?side=question`);
    }

    const text = cards[id][side];
    const { hint } = cards[id];
    const template = { text };
    
    if (side === 'question') {
        template.hint = hint;
        template.link = 'Answer';
        template.href = `?side=answer`;   
    } else {
        template.link = 'Question';
        template.href = `?side=question`;
    }

    res.render('about', template);
});

module.exports = router;