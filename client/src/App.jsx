import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./utils/Theme";
import { ToastContainer } from "react-toastify";
import PublicRoute from "./components/RoutesCondition/PublicRoute";
import ChannelView from "./pages/ChannelView";
import ProtectedRoute from "./components/RoutesCondition/ProtectedRoute";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

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
            <Route path="/channels" element={<h2>Channels</h2>} />
            <Route path="/channel/:id" element={<ChannelView />} />

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/profile/password/change"
                element={<ChangePassword />}
              />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
