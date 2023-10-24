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
import Categories from "./pages/Categories2/Categories";
import AddRecipes from "./pages/AddRecipes/AddRecipes";
import MyRecipes from "./pages/MyRecipes/MyRecipes";
import Recipe from "./pages/Recipe/Recipe";
import ApiRecipe from "./pages/ApiRecipe/ApiRecipe2";
import NoFound from "./pages/NoFound/NoFound";

import Favorites from "./pages/Favorites/Favorites";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import Search from "./pages/Search/Search";

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
    type: "dark",
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
          {/* <Route path="/:owner/*" element={<Home />} /> */}
          <Route path="/home/:owner" element={<Home />} />
          <Route path="/my-recipes/:owner/:recipeId" element={<Recipe />} />
          <Route path="/recipes/:owner/:recipeId" element={<ApiRecipe />} />
          <Route path="/home/:owner/*" element={<NoFound />} />
          <Route path="/add-recipes/:owner/*" element={<NoFound />} />
          <Route path="/my-recipes/:owner/*" element={<NoFound />} />
          <Route path="/favorites/:owner/*" element={<NoFound />} />
          <Route path="/shopping-list/:owner/*" element={<NoFound />} />
          <Route path="/search/:owner/:q/*" element={<NoFound />} />


          <Route element={<AuthGuardedRoute element={Layout} />}>
            <Route path="/categories/:owner" element={<Categories />} />
            <Route
              path="/categories/:owner/:category"
              element={<Categories />}
            />
            <Route path="/add-recipes/:owner" element={<AddRecipes />} />
            <Route path="/my-recipes/:owner" element={<MyRecipes />} />
            <Route path="/favorites/:owner" element={<Favorites />} />
            <Route path="/shopping-list/:owner" element={<ShoppingList />} />
            <Route path="/search/:owner/:q" element={<Search />} />
            <Route path="/nofound/:owner" element={<NoFound />} />

          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
