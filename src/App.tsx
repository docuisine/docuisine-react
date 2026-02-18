import "./App.css";

import RecipesPage from "@/pages/recipes";
import RecipeCreatePage from "@/pages/recipe/create";
import CookbooksPage from "@/pages/cookbooks";
import ShoppingListPage from "@/pages/shopping-list";
import AdministrationPage from "@/pages/administration";
import SignupPage from "./pages/signup";
import LoginPage from "@/pages/login";
import Layout from "@/components/layout";
import ProtectedRoute from "@/components/protected-route";
import PageNotFound404 from "@/pages/404";
import AccountPage from "@/pages/account";
import ProfilePage from "@/pages/account/profile";
import AuthenticationPage from "@/pages/account/authentication";
import CuisinePage from "@/pages/cuisine";
import SiteSettingsPage from "@/pages/administration/configuration";
import ManageUsersPage from "@/pages/administration/users";
import ManageRecipesPage from "@/pages/administration/recipes";
import ManageCuisinesPage from "./pages/administration/cuisines";
import ManageCookbooksPage from "@/pages/administration/cookbooks";
import ManageIngredientsPage from "@/pages/administration/ingredients";
import CleanPage from "@/pages/administration/clean";
import BackupsPage from "@/pages/administration/backups";
import LogsPage from "@/pages/administration/logs";
import SetupWizardPage from "@/pages/setup-wizard";

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
        path: "/recipes/create",
        element: (
          <ProtectedRoute>
            <RecipeCreatePage />
          </ProtectedRoute>
        ),
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
        children: [
          { index: true, element: <Navigate to="site-settings" replace /> },
          { path: "site-settings", element: <SiteSettingsPage /> },
          { path: "user-management", element: <ManageUsersPage /> },
          { path: "recipe-management", element: <ManageRecipesPage /> },
          { path: "cuisine-management", element: <ManageCuisinesPage /> },
          { path: "cookbook-management", element: <ManageCookbooksPage /> },
          { path: "ingredient-management", element: <ManageIngredientsPage /> },
          { path: "clean", element: <CleanPage /> },
          { path: "backups", element: <BackupsPage /> },
          { path: "logs", element: <LogsPage /> },
        ],
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="profile" replace />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "authentication",
            element: <AuthenticationPage />,
          },
        ],
      },
      {
        path: "/cuisine/:cuisineName",
        element: <CuisinePage />,
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
  { path: "/wizard", element: <SetupWizardPage /> },
  { path: "*", element: <PageNotFound404 /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
