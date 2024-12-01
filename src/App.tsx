import "./App.css";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/themes";
import GlobalStyle from "./themes/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import MainPage from "./pages/MainPage";
import { Footer } from "./components/Footer";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
