import { useState } from "react";
import api from "../api";

export default function BooksForm() {
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    publishedDate: "",
    stock: "",
    price: "",
  });

  return (
    <>
      <input placeholder="Book ID (update/delete)" onChange={e => setBookId(e.target.value)} />

      <input placeholder="Title" onChange={e => setBook({ ...book, title: e.target.value })} />
      <input placeholder="Author" onChange={e => setBook({ ...book, author: e.target.value })} />
      <input placeholder="Category" onChange={e => setBook({ ...book, category: e.target.value })} />
      <input placeholder="Description" onChange={e => setBook({ ...book, description: e.target.value })} />
      <input placeholder="Published Date (YYYY-MM-DD)" onChange={e => setBook({ ...book, publishedDate: e.target.value })} />
      <input placeholder="Stock" onChange={e => setBook({ ...book, stock: Number(e.target.value) })} />
      <input placeholder="Price" onChange={e => setBook({ ...book, price: Number(e.target.value) })} />

      <button onClick={() => api.post("/api/v1/books/create", book)}>
        Create Book
      </button>

      <button onClick={() => api.put(`/api/v1/books/update/${bookId}`, book)}>
        Update Book
      </button>

      <button onClick={() => api.delete(`/api/v1/books/delete/${bookId}`)}>
        Delete Book
      </button>

      <button onClick={() => api.get("/api/v1/books/listAll").then(res => console.log(res.data))}>
        List All Books
      </button>
    </>
  );
}
