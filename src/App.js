import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDebounce } from "use-debounce";
import "./App.css";
import { getAll, search, update } from "./BooksAPI";
import Shelves from "./components/BookShelves";
import Book from "./components/Book";

function App() {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([])
  const [mergeBooks, setMergeBooks] = useState([])
  const [mapOfIdToBook, setMapOfBookIds] = useState([])

  const [querry, setQuerry] = useState("")
  const [querryDebounce] = useDebounce(querry, 500)

  // Get all book
  useEffect(() => {
    getAll()
      .then(data => {
        setBooks(data)
        setMapOfBookIds(createMapBookIds(data))
      })
  }, [])

  // Search book
  useEffect(() => {
    if (querryDebounce) {
      search(querryDebounce, 10)
        .then(data => {
          if (data.error) {
            alert("Book Not Found!!")
            setSearchBooks([])
          } else {
            setSearchBooks(data)
          }
        })
    }

    return () => {
      setSearchBooks([])
    }
  }, [querryDebounce])

  const createMapBookIds = (books) => {
    const result = new Map()
    books.map(book => result.set(book.id, book))

    return result
  }

  // Update book
  const updateBookShelf = (book, shelfValue) => {
    const updateBook = books.map(b => {
      if (book.id === b.id) {
        book.shelf = shelfValue
      }
      return b;
    })
    setBooks(updateBook)

    // Call API update
    update(book, shelfValue)
  }

  useEffect(() => {
    const comnbined = searchBooks.map(book => {
      if (mapOfIdToBook.has(book.id)) {
        return mapOfIdToBook.get(book.id)
      } else {
        return book
      }
    })
    setMergeBooks(comnbined)
  }, [searchBooks])

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>My Reads</h1>
              </div>
              <div className="list-books-content">
                <Shelves books={books} updateBookShelf={updateBookShelf} />
              </div>
              <div className="open-search">
                <a href="/search">Add a book</a>
              </div>
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <div className="search-books">
              <div className="search-books-bar">
                <a
                  className="close-search"
                  href="/"
                >
                  Close
                </a>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                    value={querry}
                    onChange={e => setQuerry(e.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {
                    mergeBooks.map(bk => (
                      <li key={bk.id}>
                        <Book book={bk} updateBookShelf={updateBookShelf} />
                      </li>
                    ))
                  }
                </ol>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
