import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { dark } from "@mui/material/styles/createPalette";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";

 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <Provider >
  <React.StrictMode>
    <BrowserRouter basename="/">
  
          <App /> {/* Your main application component */}
     
    </BrowserRouter>
	</React.StrictMode>
// </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
