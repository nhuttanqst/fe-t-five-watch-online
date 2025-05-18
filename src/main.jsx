import "@ant-design/v5-patch-for-react-19";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import PaymentResult from "./components/PaymentResult";
import HomePage from "./pages/client/Home";
import MenPage from "./pages/client/Men";
import WomenPage from "./pages/client/Women";
import CouplePage from "./pages/client/Couple";
import ContactPage from "./pages/client/Contact";
import CartPage from "./pages/client/Cart";
import ErrorPage from "./pages/client/Error";
import FavoritePage from "./pages/client/Favorite";
import ProductDetailPage from "./pages/client/ProductDetail";
import HistoryPage from "./pages/client/History";
import ForgotPasswordPage from "./pages/client/auth/ForgotPassword";
import UpdateNewPassword from "./pages/client/auth/UpdateNewPassword";
import LoginPage from "./pages/client/auth/Login";
import RegisterPage from "./pages/client/auth/Register";
import { AppProvider } from "./context/app.context";
import ManageBrand from "./pages/admin/manageBrand";
import ManageProduct from "./pages/admin/manageProduct";
import FormAddProduct from "./pages/admin/formAddProduct";
import FormUpdate from "./pages/admin/FormUpdate";

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
      {
        path: "/payment-result",
        element: <PaymentResult />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/admin1",
        element: <ManageBrand />,
      },
      {
        path: "/admin2",
        element: <ManageProduct />,
      },
      {
        path: "/admin2/add",
        element: <FormAddProduct/>,
      },
      {
        path: "/admin2/edit/:id",
        element: <FormUpdate/>,
      },

      
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
