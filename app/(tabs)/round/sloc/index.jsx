import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  View
} from "react-native";
import { sleep } from "../..";
import styles from "../../../../assets/styles/profile.styles";
import Loader from "../../../../components/Loader";
import SlocCard from "../../../../components/SlocCard";
import COLORS from "../../../../constants/colors";
import { useKladStore } from "../../../../store/kladStore";

export default function CategoryIndex() {
  const { round_id } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const { fetchStorageLocation, storageLocation, isLoading } = useKladStore();

  useEffect(() => {
    fetchStorageLocation(round_id);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(500);
    await fetchStorageLocation(round_id);
    setRefreshing(false);
  };

  if (isLoading && !refreshing) return <Loader />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: "Storage Location"}} />
      <FlatList
        data={storageLocation}
        renderItem={({item}) => <SlocCard item={item} round={round_id}/>}
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
