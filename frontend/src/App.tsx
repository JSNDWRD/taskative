import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/themeprovider";
import Layout from "./components/Layout.tsx";
import Landing from "./pages/landing/page.tsx";
import NotFound from "./pages/not-found/page.tsx";
import Authentication from "./pages/authentication/page.tsx";
import useAuthStore from "./store/useAuthStore.ts";
import Dashboard from "./pages/dashboard/page.tsx";

function App() {
  const session = useAuthStore((state) => state.session);
  const onSession = !!session;
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route
              path="/authentication"
              element={
                onSession ? (
                  <Navigate to={"/dashboard"} replace />
                ) : (
                  <Authentication />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/dashboard"
              element={
                onSession ? (
                  <Dashboard />
                ) : (
                  <Navigate to={"/authentication"} replace />
                )
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
