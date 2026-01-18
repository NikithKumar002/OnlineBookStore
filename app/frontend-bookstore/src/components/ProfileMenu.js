import { useAuth } from "../auth/AuthContext";

export default function ProfileMenu() {
  const { user, logout } = useAuth();

  return (
    <div>
      <span style={{ marginRight: 10 }}>{user.email}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
