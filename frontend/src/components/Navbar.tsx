import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-background border-b border-border">
      <div className="text-xl font-bold">
        <Link to="/">Taskative</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/authentication" className="hover:underline">
          Login
        </Link>
      </div>
    </nav>
  );
}
