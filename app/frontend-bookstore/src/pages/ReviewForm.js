import { useState } from "react";
import api from "../api";

export default function ReviewForm() {
  const [bookId, setBookId] = useState("");
  const [review, setReview] = useState({
    rating: "",
    comment: "",
  });

  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  return (
    <>
      <input placeholder="Book ID" onChange={e => setBookId(e.target.value)} />
      <input placeholder="Rating (1-5)" onChange={e => setReview({ ...review, rating: Number(e.target.value) })} />
      <input placeholder="Comment" onChange={e => setReview({ ...review, comment: e.target.value })} />

      <button
        onClick={() =>
          api.put(`/api/v1/books/review/${bookId}/${userId}`, review)
        }
      >
        Add Review
      </button>

      <button
        onClick={() =>
          api.post(`/api/v1/books/review/${bookId}/${userId}`, review)
        }
      >
        Update Review
      </button>
    </>
  );
}
