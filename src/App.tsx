import "./App.css";

import RecipesPage from "@/pages/recipes";
import CookbooksPage from "@/pages/cookbooks";
import ShoppingListPage from "@/pages/shopping-list";
import AdministrationPage from "@/pages/administration";
import SignupPage from "./pages/signup";
import LoginPage from "@/pages/login";
import Layout from "@/components/layout";
import ProtectedRoute from "@/components/protected-route";

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
    ],
  },
  { path: "/signup", element: <SignupPage /> },
  { path: "/login", element: <LoginPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
