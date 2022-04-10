const express = require('express');
const router = express.Router();

const { db } = require('./../app');

router.get('/', (req, res) => {
    db.collection('results')
        .get()
        .then((snap) => {
            const results = [];
            snap.forEach((doc) => {
                results.push(doc.data());
            });
            res.json(results);
        });
});

module.exports = router;
