import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import ImageMaterials from "../../assets/images/materials.jpg";
import ImageWarehouses from "../../assets/images/warehouses.jpg";
import styles from "../../assets/styles/home.styles";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const types = [
    {
      id: 1,
      name: "Warehouses Management",
      picture: ImageWarehouses,
    },
    {
      id: 2,
      name: "Materials Management",
      picture: ImageMaterials,
    },
  ];

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
  useEffect(() => {
    fetchBooks();
  }, []);
  const handleLoadMore = async () => {};
  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookImageContainer}>
        <Image
          source={item.picture}
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.name}</Text>
        <Text style={styles.caption}>{item.name}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={types}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
