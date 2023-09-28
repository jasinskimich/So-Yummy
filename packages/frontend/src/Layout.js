import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import { Suspense } from "react";
import React, { useState } from "react";

function Layout() {
  const [loggedName] = useState("");

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Header name={loggedName} style={{ position: "absolute", zIndex: 2 }} />
        <Suspense fallback={null} style={{ position: "relative", zIndex: 1 }}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
