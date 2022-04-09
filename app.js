//import express
const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(volleyball);

app.get('/questions', (req, res) => {
    res.json(['question1', 'question2', 'question3']);
});

app.get('/result', (req, res) => {
    res.json(['result1', 'result2', 'result3']);
});

const DEBUG = (PORT) => {
    console.log(`Listening on http://localhost:${PORT}`);
};

app.listen(PORT, DEBUG(PORT));
