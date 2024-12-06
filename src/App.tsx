import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/themes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./themes/GlobalStyle";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/ui/Navbar";
import MainPage from "./pages/MainPage";
import Footer from "./components/ui/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

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
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
