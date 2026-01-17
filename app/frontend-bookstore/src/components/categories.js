import { useEffect, useState } from "react";
import { api } from "../api";

export default function Categories({ token }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const loadCategories = async () => {
    const res = await api("/api/v1/category/list");
    setCategories(res);
  };

  const createCategory = async () => {
    await api(
      "/api/v1/category/create",
      "PUT",
      { name },
      token
    );
    loadCategories();
  };

  const deleteCategory = async (name) => {
    await api(`/api/v1/category/delete/${name}`, "DELETE", null, token);
    loadCategories();
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>

      <input placeholder="Category name" onChange={e => setName(e.target.value)} />
      <button onClick={createCategory}>Create</button>

      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            {cat.name}
            <button onClick={() => deleteCategory(cat.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
