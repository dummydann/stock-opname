import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { create } from "zustand";

export const useKladStore = create((set) => ({
  pidWm: [],
  pidMm: [],
  storageType: null,
  storageLocation: null,
  dataMm: null,
  dataWmByStype: null,
  dataMmBySloc: null,
  dataWm: null,
  kladWm: null,
  kladMm: null,
  isLoading: false,
  error: null,
  fetchStorageType: async (round) => {
    try {
      set({isLoading: true})
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://stock-opname.devkftd.my.id/api/pid-wm/stype?check_category=${round}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch Storage Type");
      set({storageType: result.data, isLoading: false});
    } catch (error) {
      set({isLoading: true})
      Alert.alert("Error", "Failed to load storage type.");
      set({isLoading: false})
    }
  },
  fetchStorageLocation: async (round) => {
    try {
      set({isLoading: true})
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://stock-opname.devkftd.my.id/api/pid-mm/sloc?check_category=${round}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch Storage Type");
      set({storageLocation: result.data, isLoading: false});
    } catch (error) {
      set({isLoading: true})
      Alert.alert("Error", "Failed to load storage type.");
      set({isLoading: false})
    }
  },
  fetchPidWm: async (code, round) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://stock-opname.devkftd.my.id/api/pid-wm?code=${code}&check_category=${round}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch PID WM");
      set({pidWm: result.data, isLoading: false});
    } catch (error) {
      console.log(error);
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
      const result = await response.json();
      set({ dataWmByStype: result.data });
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
      set({ dataMmBySloc: data });
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
  },
}));
