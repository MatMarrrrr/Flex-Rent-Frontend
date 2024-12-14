import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@/themes/themes";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import GlobalStyle from "@/themes/GlobalStyle";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/ui/Navbar";
import MainPage from "@/pages/MainPage";
import Footer from "@/components/ui/Footer";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import SearchPage from "@/pages/SearchPage";
import ItemPage from "@/pages/ItemPage";
import NotFoundPage from "@/pages/NotFoundPage";
import DashboardPage from "@/pages/DashboardPage";
import AddListingPage from "@/pages/AddListingPage";
import EditListingPage from "@/pages/EditListingPage";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/add-listing" element={<AddListingPage />} />
          <Route path="/edit-listing/:id" element={<EditListingPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
