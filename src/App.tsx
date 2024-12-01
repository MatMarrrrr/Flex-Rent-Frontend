import "./App.css";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./themes/themes";
import GlobalStyle from "./themes/GlobalStyle";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Router>
        <Navbar />
      </Router>
    </ThemeProvider>
  );
}

export default App;
