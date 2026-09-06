import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PerimeterNav from "./PerimeterNav";
import KineticFooter from "./KineticFooter";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <PerimeterNav />
      <main className="bea-main">
        <Outlet />
      </main>
      <KineticFooter />
    </>
  );
}
