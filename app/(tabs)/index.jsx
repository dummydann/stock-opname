import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { types } from '../../assets/json/dummy';
import styles from "../../assets/styles/home.styles";
import CategoryCard from '../../components/CategoryCard';

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=2`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch books");

      // todo fix it later
      // setBooks((prevBooks) => [...prevBooks, ...data.books]);

      const uniqueBooks =
        refresh || pageNum === 1
          ? data.books
          : Array.from(
              new Set([...books, ...data.books].map((book) => book._id))
            ).map((id) =>
              [...books, ...data.books].find((book) => book._id === id)
            );

      setBooks(uniqueBooks);

      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log("Error fetching books", error);
    } finally {
      if (refresh) {
        await sleep(800);
        setRefreshing(false);
      } else setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchBooks();
  // }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={types}
        renderItem={({item}) => <CategoryCard item={item}/>}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Use this app for fast - fast stock!
            </Text>
            <Text style={styles.headerSubtitle}>
              No need kertas, no need panik, tinggal tap tap beres!
            </Text>
          </View>
        }
      />
    </View>
  );
}
