import { useAuth } from "../auth/AuthContext";
import ProfileMenu from "./ProfileMenu";

export default function Navbar({ onAction }) {
  const { user } = useAuth();

  return (
    <div style={nav}>
      <h2>Online Book Store</h2>
      {!user ? (
        <>
          <div style={navButtons}>   
            <button onClick={() => onAction("User Login")}>Sign In</button>
            <button onClick={() => onAction("New User Registration")}>Sign Up</button>
          </div>
        </>
      ) : (
        <>
          <div style={navButtons}>
            <button onClick={() => onAction("books")}>Books</button>
            <button onClick={() => onAction("category")}>Category</button>
            <button onClick={() => onAction("review")}>Review</button>
            <ProfileMenu />
          </div>
        </>
      )}
    </div>
  );
}

const nav = {
  textAlign: "center",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 10,
  background: "#eee",
};

const navButtons = {
  textAlign: "right", 
}