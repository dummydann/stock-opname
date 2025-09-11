import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useKladStore = create((set) => ({
  dataMm: null,
  dataWmByStype: null,
  dataMmBySloc: null,
  dataWm: null,
  kladWm: null,
  kladMm: null,
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
      set({ dataWmByStype: data });
    } catch (error) {
      console.log(error);
    }
  },
  fetchMmBySloc: async (param) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://stock-opname.devkftd.my.id/api/pid-mm/${param}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      set({ dataWmByStype: data });
    } catch (error) {
      console.log(error);
    }
  },
  storeByFormWm: async (item) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://stock-opname.devkftd.my.id/api/klad-wm-form`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(item),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      set({ isLoading: false });
      return { success: data.success, message: data.message };
    } catch (error) {
      set({ error: error });
    }
  },
  storeByFormMm: async (item) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://stock-opname.devkftd.my.id/api/klad-mm-form`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(item),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      set({ isLoading: false });
      return { success: data.success, message: data.message };
    } catch (error) {
      set({ error: error });
    }
  },
  getKladWm: async (item) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const query = new URLSearchParams(item).toString();
      const response = await fetch(
        `https://stock-opname.devkftd.my.id/api/klad-wm?${query}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      set({kladWm: data})
    } catch (error) {
      console.log(error);
    }
  },
  getKladMm: async (item) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const query = new URLSearchParams(item).toString();
      const response = await fetch(
        `https://stock-opname.devkftd.my.id/api/klad-mm?${query}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      set({kladMm: data})
    } catch (error) {
      console.log(error);
    }
  }
}));
