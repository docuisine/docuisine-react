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
