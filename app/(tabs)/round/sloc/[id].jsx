import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { sleep } from "../..";
import styles from "../../../../assets/styles/home.styles";
import KladMm from "../../../../components/KladMm";
import COLORS from "../../../../constants/colors";
import { useKladStore } from "../../../../store/kladStore";

export default function Detail() {
  const { id,round } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const { kladMm, getKladMm } = useKladStore();
  const router = useRouter();
  const data = {
      storage_location: id,
      check_category: round
    }
    useEffect(()=> {
      getKladMm(data)
    },[])
    
    const handleRefresh = async () => {
        setRefreshing(true);
        await sleep(500);
        await getKladMm(data);
        setRefreshing(false);
      };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: id,
          headerRight: () => (
            <Pressable
              onPress={() => router.push({
                pathname: "round/sloc/count",
                params: { code: id }, // 👈 lempar parameter
              })} // arahkan ke halaman tambah data
              style={{ marginRight: 15 }}
            >
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </Pressable>
          ), }} 
          />
      <FlatList
        data={kladMm}
        renderItem={({item}) => <KladMm item={item} round={round} />}
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
