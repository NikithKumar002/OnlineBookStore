import { useAuth } from "../auth/AuthContext";
import ProfileMenu from "./ProfileMenu";

export default function Navbar({ onAction }) {
  const { user } = useAuth();

  return (
    <div style={nav}>
      <h3>Online Book Store</h3>
      {!user ? (
        <>
        <div>   
            <button onClick={() => onAction("login")}>Login</button>
            <button onClick={() => onAction("register")}>Register</button>
        </div>
        </>
      ) : (
        <>
          <button onClick={() => onAction("books")}>Books</button>
          <button onClick={() => onAction("category")}>Category</button>
          <button onClick={() => onAction("review")}>Review</button>
          <ProfileMenu />
        </>
      )}
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: 10,
  background: "#eee",
};
