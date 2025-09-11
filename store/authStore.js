import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch("http://traco.devkftd.my.id/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);
      set({ token: data.token, user: data.user, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        "https://stock-opname.devkftd.my.id/api/login-sanctum",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.access_token);
      set({ token: data.access_token, user: data.user, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { error: error.message };
    }
  },
  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const response = await fetch(
        "https://stock-opname.devkftd.my.id/api/user",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.message) {
        // gagal login
        set({ user: null, token: null, isLoading: false });
      } else {
        const user = data;
        set({ token, user });
      }
    } catch (error) {
      console.log("Auth check failed", error);
    }
  },
  logout: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://stock-opname.devkftd.my.id/api/logout-sanctum",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ token: null, user: null });
    } catch (error) {
      console.log("Logout failed", error);
    }
  },
}));
