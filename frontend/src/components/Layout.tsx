import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DashboardSidebar from "./DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import InformationModal from "./InformationModal";

export default function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/app");
  return (
    <div>
      {!isDashboard && <Navbar />}
      {isDashboard ? (
        <SidebarProvider>
          <DashboardSidebar />
          <main className="min-h-dvh w-full">
            <div className="w-full h-14 flex items-center px-2">
              <SidebarTrigger />
            </div>
            <Outlet />
            <Footer />
            <InformationModal />
          </main>
        </SidebarProvider>
      ) : (
        <main className="min-h-dvh pt-14">
          <Outlet />
          <InformationModal />
        </main>
      )}
      {!isDashboard && <Footer />}
    </div>
  );
}
