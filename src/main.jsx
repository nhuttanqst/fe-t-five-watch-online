import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/client/Home";
import MenPage from "./pages/client/Men";
import WomenPage from "./pages/client/Women";
import CouplePage from "./pages/client/Couple";
import ContactPage from "./pages/client/Contact";
import CartPage from "./pages/client/Cart";
import FavoritePage from "./pages/client/Favorite";
import ProductDetailPage from "./pages/client/ProductDetail";
import ForgotPasswordPage from "./pages/client/auth/ForgotPassword";
import UpdateNewPassword from "./pages/client/auth/UpdateNewPassword";
import LoginPage from "./pages/client/auth/Login";
import RegisterPage from "./pages/client/auth/Register";
import { AppProvider } from "./context/app.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/men",
        element: <MenPage />,
      },
      {
        path: "/women",
        element: <WomenPage />,
      },
      {
        path: "/couple",
        element: <CouplePage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/favorite",
        element: <FavoritePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/update-new-password",
        element: <UpdateNewPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
