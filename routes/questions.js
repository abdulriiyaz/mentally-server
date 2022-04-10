const express = require('express');
const router = express.Router();

const { db } = require('./../app');

router.get('/', (req, res) => {
    db.collection('questions')
        .get()
        .then((snap) => {
            const ques = [];
            snap.forEach((doc) => {
                ques.push(doc.data());
            });
            res.json(ques);
        });
});

module.exports = router;
