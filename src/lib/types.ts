export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: string | null;
  login: (token: string) => void;
  logout: () => void;
}
