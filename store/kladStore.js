import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useKladStore = create((set) => ({
  dataMm: null,
  fetchMm: async () => {
    try {
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
      set({ dataMm: data });
    } catch (error) {}
  },
}));
