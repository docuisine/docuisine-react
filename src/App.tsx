import "./App.css";

import RecipesPage from "@/pages/recipes";
import CookbooksPage from "@/pages/cookbooks";
import ShoppingListPage from "@/pages/shopping-list";
import AdministrationPage from "@/pages/administration";
import SignupPage from "./pages/signup";
import LoginPage from "@/pages/login";
import Layout from "@/components/layout";
import ProtectedRoute from "@/components/protected-route";
import PageNotFound404 from "@/pages/404";
import AccountPage from "@/pages/account";
import { SignupUsernameForm } from "@/components/custom/signup/username";
import { SignupPasswordForm } from "@/components/custom/signup/password";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/recipes" replace /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/recipes",
        element: <RecipesPage />,
      },
      {
        path: "/cookbooks",
        element: <CookbooksPage />,
      },
      {
        path: "/shopping-list",
        element: <ShoppingListPage />,
      },
      {
        path: "/administration",
        element: (
          <ProtectedRoute>
            <AdministrationPage />
          </ProtectedRoute>
        ),
      },
      { path: "/account", element:
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        },
    ],
  },
  {
    path: "/signup",
    element: <SignupPage />,
    children: [
      { index: true, element: <SignupUsernameForm /> },
      { path: "password", element: <SignupPasswordForm /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <PageNotFound404 /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
