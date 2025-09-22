import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import { sleep } from "../../../../../..";
import styles2 from "../../../../../../../../../assets/styles/create.styles";
import styles from "../../../../../../../../../assets/styles/home.styles";
import KladWm from "../../../../../../../../../components/KladWm";
import COLORS from "../../../../../../../../../constants/colors";
import { useKladStore } from "../../../../../../../../../store/kladStore";

export default function index() {
  const { roundId, slocId } = useLocalSearchParams();
  const { getKladMm, kladMm, isLoading } = useKladStore();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const data = {
    storage_location: slocId,
    check_category: roundId,
  };

  useEffect(() => {
    getKladMm(data);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(500);
    await getKladMm(data);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: slocId + ` - Round ` + roundId }} />
      <View
        style={{
          backgroundColor: COLORS.background,
          padding: 16,
          paddingBottom: 0,
        }}
      >
        <View style={styles2.inputContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color={COLORS.textSecondary}
            style={styles2.inputIcon}
          />
          <TextInput
            style={styles2.input}
            placeholder="Search..."
            placeholderTextColor={COLORS.placeholderText}
            // value={title}
            // onChangeText={setTitle}
          />
        </View>
      </View>
      <FlatList
        data={kladMm}
        renderItem={({ item }) => <KladWm item={item} />}
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
      <Pressable
        onPress={() =>
          router.push(`/home/mm/round/${roundId}/sloc/${slocId}/klad/create`)
        }
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: COLORS.primary,
          width: 50, // ✅ Tambahkan width
          height: 50, // ✅ Tambahkan height
          borderRadius: 30, // ✅ Setengah dari width/height untuk bulat
          justifyContent: "center", // ✅ Tengahin isi
          alignItems: "center", // ✅ Tengahin isi
          elevation: 5,
        }}
      >
        <Ionicons name="add" size={28} color="white" />
      </Pressable>
    </View>
  );
}
