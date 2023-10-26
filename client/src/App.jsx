import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./utils/Theme";
import { ToastContainer } from "react-toastify";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: background 0.3s, color 0.3s;
  }
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
