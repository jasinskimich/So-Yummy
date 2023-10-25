import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: `"Poppins", sans-serif;`,
      textTransform: 'none',
      fontSize: 16,
    },
  },
});
 


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <Provider >
  <React.StrictMode>
    <BrowserRouter basename="/">
    <ThemeProvider theme={theme}>
          <App /> 
          </ThemeProvider>
    </BrowserRouter>
	</React.StrictMode>
// </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
