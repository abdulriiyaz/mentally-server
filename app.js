const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();

const serviceAccount = require('./serviceAccountKey.json');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
    credential: cert(serviceAccount),
    databaseURL:
        process.env.databaseURL || 'https://mentally-server.firebaseio.com',
});

const db = getFirestore();

module.exports = db;

app.use(express.json());
app.use(cors());
app.use(volleyball);

// const tasksRouter = require('./routes/tasks');
// app.use('/tasks', tasksRouter);

// const questionsRouter = require('./routes/questions');
// app.use('/questions', questionsRouter);

// const resultsRouter = require('./routes/results');
// app.use('/results', resultsRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.get('/tasks', (req, res) => {
    db.collection('tasks')
        .get()
        .then((snap) => {
            const tasks = [];
            snap.forEach((doc) => {
                tasks.push(doc.data());
            });
            res.json(tasks);
        });
});

app.get('/questions', (req, res) => {
    db.collection('questions')
        .get()
        .then((snap) => {
            const questions = [];
            snap.forEach((doc) => {
                questions.push(doc.data());
            });
            res.json(questions);
        });
});

app.get('/results', (req, res) => {
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

const notFound = (req, res, next) => {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack,
    });
};

app.use(notFound);
app.use(errorHandler);

const DEBUG = (PORT) => {
    console.log(`Listening on http://localhost:${PORT}`);
};

app.listen(PORT, DEBUG(PORT));
