import { useEffect, useState } from "react";
import { api } from "../api";

export default function Books({ token }) {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");

  const loadBooks = async () => {
    const res = await api("/api/v1/books/listAll");
    setBooks(res);
  };

  const createBook = async () => {
    await api(
      "/api/v1/books/create",
      "PUT",
      { title },
      token
    );
    loadBooks();
  };

  const deleteBook = async (id) => {
    await api(`/api/v1/books/delete/${id}`, "DELETE", null, token);
    loadBooks();
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>

      <input placeholder="Book title" onChange={e => setTitle(e.target.value)} />
      <button onClick={createBook}>Create Book</button>

      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
