import { useState } from "react";
import { api } from "../api";

export default function Review({ token }) {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [review, setReview] = useState("");

  const submitReview = async () => {
    await api(
      `/api/v1/books/review/${bookId}/${userId}`,
      "PUT",
      { review },
      token
    );
    alert("Review submitted");
  };

  return (
    <div>
      <h2>Review Book</h2>
      <input placeholder="Book ID" onChange={e => setBookId(e.target.value)} />
      <input placeholder="User ID" onChange={e => setUserId(e.target.value)} />
      <textarea placeholder="Review" onChange={e => setReview(e.target.value)} />
      <button onClick={submitReview}>Submit</button>
    </div>
  );
}
