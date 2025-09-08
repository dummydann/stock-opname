import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useKladStore = create((set) => ({
  dataMm: null,
  dataWmByStype: null,
  dataWm: null,
  isLoading: false,
  error: null,
  fetchMm: async () => {
    try {
      set({ isLoading: true, error: null });
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://stock-opname.devkftd.my.id/api/pid-mm",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      set({ dataMm: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ error: error.message, isLoading: false });
    }
  },
  fetchWm: async () => {
    try {
      set({ isLoading: true, error: null });
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        "https://stock-opname.devkftd.my.id/api/pid-wm",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      set({ dataWm: data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },
  fetchWmByStype: async (param) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://stock-opname.devkftd.my.id/api/pid-wm/${param}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      set({dataWmByStype: data});
    } catch (error) {
      console.log(error);
    }
  },
  storeKlad: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `https://stock-opname.devkftd.my.id/api/klad-wm`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data
          }),
        }
      );
    } catch (error) {
      
    }
  }
}));
