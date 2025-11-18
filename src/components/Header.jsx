import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { signOut } = useAuth();

  return (
    <header className="focus-header">
      <div>
        <h1>Todo List</h1>
      </div>
      <button className="ghost-button" type="button" onClick={signOut}>
        Sign out
      </button>
    </header>
  );
}
