import React from "react";
import BookShelf from "./BookShelf";
import PropTypes from 'prop-types';

const BookShelves = ({ books, updateBookShelf }) => {
    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading" || book.shelf === undefined);
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");

    const shelves = [
        {
            key : "1",
            title : "Currently Reading",
            books : currentlyReading,
        },
        {
            key : "2",
            title : "Want To Read",
            books : wantToRead,
        },
        {
            key : "3",
            title : "Read",
            books : read,
        }
    ]
    return (
        <div>
            {shelves.map(shelf => (
                <BookShelf key={shelf.key} title={shelf.title} books={shelf.books} updateBookShelf={updateBookShelf}/>
            ))}
        </div>
    )
}

BookShelves.propTypes = {
    books: PropTypes.array,
    updateBookShelf: PropTypes.func
}

export default BookShelves;