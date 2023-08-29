import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import { Suspense } from "react";
import React, { useState } from "react";

function Layout() {
  const [loggedName] = useState("");

  return (
    <div>
      <Header name={loggedName} />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

export default Layout;
