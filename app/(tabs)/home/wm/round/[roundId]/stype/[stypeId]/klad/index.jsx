import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { sleep } from "../../../../../..";
import styles2 from "../../../../../../../../../assets/styles/create.styles";
import styles from "../../../../../../../../../assets/styles/home.styles";
import KladWm from "../../../../../../../../../components/KladWm";
import COLORS from "../../../../../../../../../constants/colors";
import { useKladStore } from "../../../../../../../../../store/kladStore";

export default function index() {
  const { roundId, stypeId } = useLocalSearchParams();
  const { getKladWm, kladWm, isLoading } = useKladStore();
  const [refreshing, setRefreshing] = useState(false);
  const [ modalVisible, setModal ] = useState(false)
  const slideAnim = useRef(new Animated.Value(500)).current;
  const [activeTab, setActiveTab] = useState("Existing");
  const router = useRouter();
  const data = {
    storage_type: stypeId,
    check_category: roundId,
  };

  useEffect(() => {
    getKladWm(data);
    if (modalVisible) {
      // Slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide down
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(500);
    await getKladWm(data);
    setRefreshing(false);
  };

  const [search, setSearch] = useState("");
  const filteredData = kladWm.filter(item => {
    const text = search.toLowerCase();
    return (
      String(item.pid.material_id).toLowerCase().includes(text) ||
      item.pid.material?.desc_material?.toLowerCase().includes(text)
    );
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: stypeId + ` - Round ` + roundId }} />
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
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 10,
          backgroundColor: COLORS.background,
          padding: 16,
          paddingBottom: 0,
        }}
      >
        {["Existing", "Manual"].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              flex: 1,
              paddingVertical: 10,
              marginHorizontal: 5,
              borderRadius: 8,
              backgroundColor:
                activeTab === tab ? COLORS.primary : COLORS.cardBackground,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: activeTab === tab ? "white" : COLORS.textSecondary,
                fontWeight: "600",
              }}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View> */}
      <FlatList
        data={filteredData}
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
          // router.push(`/home/wm/round/${roundId}/stype/${stypeId}/klad/create`)
          setModal(true)
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
      <Modal
        visible={modalVisible}
        transparent
        animationType="none" // backdrop gak ikut slide
        onRequestClose={() => setModal(false)}
      >
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={() => setModal(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            {/* Konten modal, hanya bagian putih yang slide */}
            <TouchableWithoutFeedback>
              <Animated.View
                style={{
                  backgroundColor: "white",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: 20,
                  minHeight: "25%",
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Pilih Metode
                  </Text>
                  <Pressable onPress={() => setModal(false)}>
                    <Ionicons name="close" size={24} color="black" />
                  </Pressable>
                </View>

                {/* Existing */}
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "#f0f0f0",
                  }}
                  onPress={() => {
                    setModal(false);
                    router.push(`/home/wm/round/${roundId}/stype/${stypeId}/klad/klad`)
                  }}
                >
                  <Ionicons name="documents-outline" size={22} color="#2563eb" />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontWeight: "600", fontSize: 15 }}>
                      Existing
                    </Text>
                    <Text style={{ color: "gray", fontSize: 13 }}>
                      Data sudah ada dari SAP
                    </Text>
                  </View>
                </Pressable>

                {/* Manual */}
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 15,
                  }}
                  onPress={() => {
                    setModal(false);
                    router.push(`/home/wm/round/${roundId}/stype/${stypeId}/klad/new-pid`)
                  }}
                >
                  <Ionicons name="create-outline" size={22} color="#10b981" />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontWeight: "600", fontSize: 15 }}>Manual</Text>
                    <Text style={{ color: "gray", fontSize: 13 }}>
                      Input data jika tidak tersedia dari SAP
                    </Text>
                  </View>
                </Pressable>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
