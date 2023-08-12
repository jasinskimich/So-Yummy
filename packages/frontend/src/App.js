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


// import "./stylesheet/fonts.css";

function AuthGuardedRoute({ element: Element, ...rest }) {
  const authToken = localStorage.getItem("authToken");

  if (authToken && authToken !== "null") {
    return <Element {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  return (
    
    <Box className="App">
      <Routes>
        {/* <Route path="/register" element={<RegistrationPages />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-password/:resetToken" element={<NewPasswordPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
        {/* <Route element={<AuthGuardedRoute element={Layout} />}>
         */}
      </Routes>
    </Box>
  );
}

export default App;
