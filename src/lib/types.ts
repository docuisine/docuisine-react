import React from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: string | null;
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

export interface Category {
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