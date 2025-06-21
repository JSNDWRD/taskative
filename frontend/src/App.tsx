import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/themeprovider";
import Layout from "./components/Layout.tsx";
import Landing from "./pages/landing/page.tsx";
import NotFound from "./pages/not-found/page.tsx";
import Authentication from "./pages/authentication/page.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
