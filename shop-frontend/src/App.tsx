import React, { useCallback, useEffect, useState } from "react";
import { AdminPanel, HomePage, LoginPage, ProtectedRoute, CatalogPage } from "./pages";

import { Navbar } from "./features";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { navbarMainConfig, renderNavbarItems } from "./features/Navbar";
import { navbarProductConfig } from "./features/Navbar/config/navbarConfig";

export const App = () => {
  const [authorized, setAuthorized] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderPublicItems = useCallback(
    () => renderNavbarItems(navbarMainConfig, windowWidth),
    [windowWidth]
  );

  const renderPrivateItems = useCallback(
    () => renderNavbarItems(navbarProductConfig, windowWidth),
    [windowWidth]
  );

  const PublicLayout = () => (
    <>
      <Navbar>{renderPublicItems()}</Navbar>
      <Outlet />
    </>
  );

  const PrivateLayout = () => (
    <>
      <Navbar theme="black">{renderPrivateItems()}</Navbar>
      <AdminPanel />
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            authorized ? (
              <Navigate to="/admin" replace />
            ) : (
              <LoginPage setAuthorized={setAuthorized} />
            )
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute authorized={authorized}>
              <PrivateLayout />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
