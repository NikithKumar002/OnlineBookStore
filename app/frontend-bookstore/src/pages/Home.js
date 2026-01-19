import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div style={container}>
      <h1>{user.email}</h1>
      console.log("Home User:", user);

      <h2>Welcome, {user?.email}</h2>

      <p>You are successfully logged in.</p>

      <div style={cards}>
        <div style={card}>Manage Books</div>
        <div style={card}>Manage Categories</div>
        <div style={card}>Manage Reviews</div>
      </div>
    </div>
  );
}

const container = {
  padding: 20,
};

const cards = {
  display: "flex",
  gap: 20,
  marginTop: 20,
};

const card = {
  padding: 20,
  background: "#f5f5f5",
  borderRadius: 8,
  width: 200,
  textAlign: "center",
};
