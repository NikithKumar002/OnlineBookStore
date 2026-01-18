import { useState } from "react";
import api from "../api";

export default function CategoryForm() {
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  return (
    <>
      <input placeholder="Category ID (update)" onChange={e => setCategoryId(e.target.value)} />
      <input placeholder="Category Name" onChange={e => setCategory({ ...category, categoryName: e.target.value })} />
      <input placeholder="Category Description" onChange={e => setCategory({ ...category, categoryDescription: e.target.value })} />

      <button onClick={() => api.put("/api/v1/category/create", category)}>
        Create Category
      </button>

      <button onClick={() => api.post(`/api/v1/category/update/${categoryId}`, category)}>
        Update Category
      </button>

      <button onClick={() => api.delete(`/api/v1/category/delete/${category.categoryName}`)}>
        Delete Category
      </button>

      <button onClick={() => api.get("/api/v1/category/list").then(res => console.log(res.data))}>
        List Categories
      </button>
    </>
  );
}
