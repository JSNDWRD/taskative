import useAuthStore from "@/store/useAuthStore";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const session = useAuthStore((state) => state.session);
  const onSession = !!session;
  const logout = useAuthStore((state) => state.logout);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between h-14 px-6 py-4 bg-background border-b border-border">
      <div className="text-xl font-bold">
        <Link to="/">Taskative</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {onSession ? (
          <Link to="/app" className="hover:underline">
            Dashboard
          </Link>
        ) : (
          <Link to="/authentication" className="hover:underline">
            Login
          </Link>
        )}
        {onSession && (
          <Button onClick={logout} size={"sm"}>
            <LogOut />
            Sign Out
          </Button>
        )}
      </div>
    </nav>
  );
}
