import React from "react";
import Book from "./Book";
import PropTypes from 'prop-types';

const BookShelf = ({ books, title, updateBookShelf }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(bk => (
                        <li key={bk.id}>
                            <Book book={bk} updateBookShelf={updateBookShelf} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
BookShelf.propTypes = {
    books: PropTypes.array,
    title: PropTypes.string,
    updateBookShelf: PropTypes.func
}
export default BookShelf;