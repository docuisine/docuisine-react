import React from "react";
export interface User {
  id: number;
  username: string;
  email?: string;
  img?: string;
  role: "user" | "admin";
  preview_img?: string;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  title: string;
  imageSrc: string;
  timeTaken: number; // in minutes
  servings: number;
  description?: string;
  rating?: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null | Partial<User>;
  setUserSync: (user: User | null) => void;
  login: (token: string) => void;
  logout: () => void;
}

export interface SignupFormData {
  username: string;
  email?: string;
  password: string;
}

export interface SignupState {
  isLoading: boolean;
}

export interface Cuisine {
  id: number;
  name: string;
  description?: string;
  img: string;
  preview_img: string;
}

export interface IconMap {
  [key: string]: React.ReactNode;
}

export interface Bar {
  title: string;
  slug: string;
  icon: React.ReactNode;
}

export interface Ingredient {
  id: number;
  name: string;
  description?: string;
  img?: string;
  preview_img?: string;
}

export interface CreateRecipeStep {
  html_id: string;
  step_num: number;
}


export interface Configuration {
  frontendLatestVersion: string;
  frontendLatestCommitHash: string;
  backendVersion: string;
  backendLatestVersion: string;
  backendCommitHash: string;
  backendLatestCommitHash: string;
  backendDeployment: "docker" | "vercel";
  defaultSecretsUsed: string[];
  databaseURL: string;
  databaseType: "sqlite" | "postgresql" | "mysql";
}

export interface WizardFormData {
  language: string;
}

export interface Backup {
  id: string;
  name: string;
  date: string;
  size: string;
}
