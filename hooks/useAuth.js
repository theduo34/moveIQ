import { useRouter } from "expo-router";
import {authService} from "../services/auth/auth-service";
import {ROUTES} from "../constants/routes";
import {useAuthStore} from "../store/auth/useAuthStore";

const useAuth = () => {
  const { user, token, isAuthenticated, loading, login, logout, updateUser } =
    useAuthStore();

  const router = useRouter();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      router.replace(ROUTES.HOME);
    } catch (err) {
      console.error("Login failed:", err.message);
      throw err;
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      logout(); // clear store regardless
      router.replace(ROUTES.LOGIN);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    updateUser,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;