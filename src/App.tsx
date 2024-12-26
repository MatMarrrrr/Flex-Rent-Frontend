import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@/themes/themes";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import GlobalStyle from "@/themes/GlobalStyle";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/ui/Navbar";
import MainPage from "@/pages/main/MainPage";
import Footer from "@/components/ui/Footer";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import SearchPage from "@/pages/search/SearchPage";
import ItemPage from "@/pages/ItemPage";
import NotFoundPage from "@/pages/NotFoundPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import AddListingPage from "@/pages/listing/AddListingPage";
import EditListingPage from "@/pages/listing/EditListingPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import LogoutPage from "@/pages/LogoutPage";
import { useUser } from "@/contexts/UserContext";
import { useCategories } from "./contexts/CategoriesContext";

function App() {
  const { isUserLoading, isLogoutLoading } = useUser();
  const { isCategoriesLoading } = useCategories();
  const [isPageLoader, setIsPageLoader] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!isUserLoading && !isCategoriesLoading) {
      const loader = document.getElementById("page-loader");
      if (loader) {
        loader.classList.add("hidden");
        setTimeout(() => {
          loader.remove();
          setIsPageLoader(false);
        }, 600);
      }
    }
  }, [isUserLoading, isCategoriesLoading]);

  return (
    !isPageLoader && (
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Router>
          {!isLogoutLoading && <Navbar />}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/dashboard/*" element={<DashboardPage />} />
            <Route path="/add-listing" element={<AddListingPage />} />
            <Route path="/edit-listing/:id" element={<EditListingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {!isLogoutLoading && <Footer />}
        </Router>
      </ThemeProvider>
    )
  );
}

export default App;
