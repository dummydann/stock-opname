import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../../assets/styles/profile.styles";
import COLORS from "../../../constants/colors";
import { useKladStore } from "../../../store/kladStore";

export default function CategoryIndex() {
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);
  const { fetchMm, dataMm } = useKladStore();
  const router = useRouter();
  useEffect(() => {
    fetchMm();
  }, [dataMm]);

  const renderBookItem = ({ item }) => (
    <Link key={item} href={`/sloc/${item}`} asChild>
      <Pressable>
        <View style={styles.bookItem}>
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{item}</Text>
            <Text style={styles.bookCaption} numberOfLines={2}>
              {item}
            </Text>
            <Text style={styles.bookDate}>
              {/* {new Date(item.createdAt).toLocaleDateString()} */}
              {item}
            </Text>
          </View>

          {/* <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmDelete(item._id)}
          >
            {deleteBookId === item._id ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : (
              <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
            )}
          </TouchableOpacity> */}
        </View>
      </Pressable>
    </Link>
  );
  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(500);
    await fetchData();
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={dataMm}
        renderItem={renderBookItem}
        keyExtractor={(item) => item._id}
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
              name="book-outline"
              size={50}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Text style={styles.addButtonText}>Add Your First Book</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}
