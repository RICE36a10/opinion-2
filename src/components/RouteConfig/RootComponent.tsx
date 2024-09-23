import { useEffect } from "react";
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";

function RootComponent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export default RootComponent;
