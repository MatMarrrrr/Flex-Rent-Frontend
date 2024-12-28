import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@/themes/themes";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import GlobalStyle from "@/themes/GlobalStyle";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useUser } from "@/contexts/UserContext";
import { useCategories } from "./contexts/CategoriesContext";
import { routes } from "@/consts/routes";
import ProtectedRoute from "@/routes/ProtectedRoute";

function App() {
  const { isUserLoading, isLogoutLoading, isLogin } = useUser();
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
            {routes.map(({ path, element, requireAuth, public: isPublic }) => (
              <Route
                key={path}
                path={path}
                element={
                  isPublic ? (
                    element
                  ) : (
                    <ProtectedRoute
                      isAuthenticated={isLogin}
                      requireAuth={requireAuth}
                    >
                      {element}
                    </ProtectedRoute>
                  )
                }
              />
            ))}
          </Routes>
          {!isLogoutLoading && <Footer />}
        </Router>
      </ThemeProvider>
    )
  );
}

export default App;
