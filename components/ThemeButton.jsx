import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "../assets/styles/profile.styles";
import COLORS from "../constants/colors";
import { useAuthStore } from "../store/authStore";
const dataTheme = [
  "Forest", "Coffe", "Retro"
]

export default function ThemeButton() {
  const { logout } = useAuthStore();
  const [modalTheme, setModalTheme] = useState(false)

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout(), style: "destructive" },
    ]);
  };

  return (
    <View>
      <TouchableOpacity style={styles.themeButton} onPress={()=> setModalTheme(true)}>
        <Ionicons name="build-outline" size={20} color={COLORS.white} />
        <Text style={styles.logoutText}>Theme</Text>
      </TouchableOpacity>
      <Modal visible={modalTheme} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.3)" }}>
          <View
            style={{
              height: "50%", // setengah layar
              backgroundColor: "#fff",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 20,
            }}
          >

            <FlatList
              data={dataTheme}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setModalTheme(false);
                    Alert.alert('Oops!', 'Fitur masih tahap pengembangan')
                  }}
                  style={{
                    padding: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              onPress={() => setModalTheme(false)}
              style={{
                marginTop: 10,
                padding: 12,
                backgroundColor: "tomato",
                borderRadius: 6,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    
  );
}
