const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 4000;
require('dotenv').config();

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'letters';

MongoClient.connect(dbConnectionStr/*, { useUnifiedTypology: true }*/)
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
    });

app.set('view engine', 'ejs');  
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());

app.get('/', (request, response) => {
    db.collection('letters').find().sort({likes:-1}).toArray()
    .then(data => {
        response.render('index', { info: data });
    })
    .catch(error => console.error(error));
});

app.post('/addLetter', (request, response) => {
    db.collection('letters').insertOne({letter: request.body.letter, phoneticValue: request.body.phoneticValue, likes: 0})
    .then(result => {
        console.log('Letter Added');
        response.redirect('/');
    })
    .catch(error => console.error(error));
});

app.put('/addOneLike', (request, response) => {
    db.collection('letters').updateOne({letter: request.body.letterS, phoneticValue: request.body.phoneticValueS, likes: request.body.likesS}, {
        $set: {
            likes: request.body.likesS + 1
        }    
    }, {
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like');
        response.json('Like Added');
    })
    .catch(error => console.error(error));
});

app.delete('/deleteLetter', (request, response) => {
    // console.log(request);
    db.collection('letters').deleteOne({letter: request.body.letterS})
    .then(result => {
        console.log('Letter Deleted');
        response.json('Letter Deleted');
    })
    .catch(error => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});