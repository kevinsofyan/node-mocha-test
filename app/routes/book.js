"use strict"; 
let monggose = require('mongoose');
let book = require('../model/book');


function getBooks(req, res) {

    let query = book.find({});

    query.exec((err, books) => {
        if (err) res.send(err);
        //If no errors, send them back to the client
        res.json(books);
    });

}

/*
 * GET /book/:id route to retrieve a book given its id.
 */

function getBook(req, res) {
    book.findById(req.params.id, (err, book) => {
        if (err) {
            res.send(err);
        }

        res.json(book);

    });
}


/*
 * POST /book to save a new book.
 */
function postBook(req, res) {
    //Creates a new book
    var newBook = new book(req.body);
    //Save it into the DB.
    newBook.save((err,book) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Book successfully added!", book });
        }
    });
}


function deleteBook(req, res) {
    book.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.send(err);
        }

        res.json({ message: "the books has been deleted" }, result);

    })
}

function updateBook(req, res) {
    book.findById({ _id: req.params.id }, (err, book) => {
        if (err) {
            res.send(err);
        }
        Object.assign(book,req.body).save((err,book)=>{
            if(err) res.send(err);
            res.json({ message: 'Book updated!', book });
        })
    });
}

module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };