import "./App.css";

import RecipesPage from "@/pages/recipes";
import CookbooksPage from "@/pages/cookbooks";
import ShoppingListPage from "@/pages/shopping-list";
import AdministrationPage from "@/pages/administration";
import SignupPage from "./pages/signup";
import Layout from "@/components/layout";

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
        element: <AdministrationPage />,
      },
    ],
  },
  { path: "/signup", element: <SignupPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
