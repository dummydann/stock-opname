import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { sleep } from "../..";
import styles from "../../../../assets/styles/home.styles";
import KladWm from "../../../../components/KladWm";
import COLORS from "../../../../constants/colors";
import { useKladStore } from "../../../../store/kladStore";

export default function Detail() {
  const { id, round } = useLocalSearchParams();
  const { getKladWm, kladWm } = useKladStore();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const data = {
      storage_type: id,
      check_category: round
    }
  useEffect(()=> {
    getKladWm(data)
  },[])
  const handleRefresh = async () => {
      setRefreshing(true);
      await sleep(500);
      await getKladWm(data);
      setRefreshing(false);
    };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: id,
        headerRight: () => (
          <Pressable
            onPress={() => router.push({
              pathname: "round/stype/count",
              params: { code: id }, 
            })} 
            style={{ marginRight: 15 }}
          >
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </Pressable>
        ),
       }} />
       <FlatList
        data={kladWm}
        renderItem={({item}) => <KladWm item={item}/>}
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
