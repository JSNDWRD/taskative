import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useAuthStore from "@/store/useAuthStore";

export default function Layout() {
  const session = useAuthStore((state) => state.session);
  const onSession = !!session;
  return (
    <div>
      <Navbar />
      <main className={`min-h-dvh ${onSession ? "pt-16" : "pt-14"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
