import { useRouter } from "expo-router";
import { ROUTES } from "../constants/routes";
import { authService } from "../services/auth/auth-service";
import { useAuthStore } from "../store/auth/useAuthStore";

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

  const handleForgotPassword = async (email) => {
    if (!email || email.trim() === "") {
    alert("Please enter your email first");
    return;
  }

  try {
    await authService.resetPassword(email);
    alert("Password reset email sent!");
  } catch (err) {
    console.error("Reset failed:", err.message);
    alert(err.message);
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
    handleForgotPassword,
  };
};

export default useAuth;