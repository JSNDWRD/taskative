import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main className="min-h-dvh">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
