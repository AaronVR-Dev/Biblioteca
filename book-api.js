const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

//Where we will keep books
let books = [];
app.use(cors());

//Configuring body parser middleware 
app.use(bodyParser.urlencoded({ extend: false}));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    //We will be coding here
    const book = req.body;

    //Output the book to the console for debbugin
    console.log(book);
    books.push(book);
    res.send('Book is added to the database');

});

app.get('/books', (req,res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;

    // Searching books for the isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

app.listen(port, () => console.log(`Running in ${port}!`));


