import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import "./App.css";
import { Box } from "@mui/material/";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import RegistrationPages from "./pages/RegistrationPages/RegistrationPages";
import NewPasswordPage from "./pages/NewPasswordPage/NewPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import Login from "./pages/LoginPages/LoginPages";
import Layout from "./Layout";
import StartPage from "./pages/StartPage/StartPage";
import Home from "./pages/Home/Home";
import { createContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import "./stylesheet/fonts.css";

function AuthGuardedRoute({ element: Element, ...rest }) {
  const authToken = localStorage.getItem("authToken");

  if (authToken && authToken !== "null") {
    return <Element {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
}
const theme = createTheme({
	palette: {
		type: "dark"
	},
});

export const ThemeContext = createContext(null);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="App">
        <Routes>
          <Route path="/register" element={<RegistrationPages />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/reset-password/:resetToken"
            element={<NewPasswordPage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<StartPage />} />
          <Route element={<AuthGuardedRoute element={Layout} />}>
            <Route path="/home/:owner" element={<Home />} />
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
