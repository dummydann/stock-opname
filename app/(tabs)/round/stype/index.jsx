import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View
} from "react-native";
import { sleep } from "../..";
import styles from "../../../../assets/styles/profile.styles";
import Loader from "../../../../components/Loader";
import StypeCard from "../../../../components/StypeCard";
import COLORS from "../../../../constants/colors";
import { useAuthStore } from "../../../../store/authStore";
import { useKladStore } from "../../../../store/kladStore";

export default function CategoryIndex() {
  const {round_id} = useLocalSearchParams();
  const [stype, setStype] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuthStore();
  const { fetchWm } = useKladStore();
  const router = useRouter()

  const fetchData = async () => {
    try {
      setIsLoading(true);
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
      if (!response.ok) throw new Error(data.message || "Failed to fetch user books");
      setStype(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to load profile data. Pull down to refresh.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(500);
    await fetchData();
    setRefreshing(false);
  };

  if (isLoading && !refreshing) return <Loader />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: "Storage Type"}} />
      <FlatList
        data={stype}
        renderItem={({item}) => <StypeCard item={item} round={round_id}/>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={50}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>Belum ada data</Text>
          </View>
        }
      />
    </View>
  );
}
