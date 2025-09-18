import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../../../../../../../../assets/styles/create.styles";
import COLORS from "../../../../../../../../../constants/colors";
import { useKladStore } from "../../../../../../../../../store/kladStore";

export default function KladCreate() {
  const { roundId, stypeId } = useLocalSearchParams();
  const {
    fetchPidWm,
    pidWm,
    storeByFormWm,
    isLoading
  } = useKladStore();
  const [storageBin, setStorageBin] = useState("");
  const [storageUnit, setStorageUnit] = useState("");
  const [material, setMaterial] = useState([]);
  const [batch, setBatch] = useState("");
  const [qty, setQty] = useState(0);
  const [notes, setNotes] = useState("");
  const [unit, setUnit] = useState("");
  const [modalStorageBin, setModalStorageBin] = useState(false);
  const [modalStorageUnit, setModalStorageUnit] = useState(false);
  const [modalMaterial, setModalMaterial] = useState(false);
  const [modalBatch, setModalBatch] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPidWm(stypeId, roundId);
  }, []);

  // Storage Bin → kalau user sudah pilih material / unit / batch, filter ikut nyusut
const datastorageBin = [
  ...new Set(
    pidWm
      .filter(item => (storageUnit ? item.storage_unit === storageUnit : true))
      .filter(item => (material.id ? item.materials.id === material : true))
      .filter(item => (batch ? item.batch === batch : true))
      .map(item => item.storage_bin).filter(bin => bin?.toLowerCase().includes(search.toLowerCase()))
  ),
] ?? [];

// Storage Unit
const datastorageUnit = [
  ...new Set(
    pidWm
      .filter(item => (storageBin ? item.storage_bin === storageBin : true))
      .filter(item => (material.id ? item.materials.id === material.id : true))
      .filter(item => (batch ? item.batch === batch : true))
      .map(item => item.storage_unit).filter(unit => unit?.toLowerCase().includes(search.toLowerCase()))
  ),
] ?? [];

// Material
const datamaterial = pidWm
  .filter(item => (storageBin ? item.storage_bin === storageBin : true))
  .filter(item => (storageUnit ? item.storage_unit === storageUnit : true))
  .filter(item => (batch ? item.batch === batch : true))
  .map(item => item.materials)
  .filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i)
  .filter(item => item.desc?.toLowerCase().includes(search.toLowerCase()))

// Batch
const databatch = [
  ...new Set(
    pidWm
      .filter(item => (storageBin ? item.storage_bin === storageBin : true))
      .filter(item => (storageUnit ? item.storage_unit === storageUnit : true))
      .filter(item => (material.id ? item.materials.id === material.id : true))
      .map(item => item.batch).filter(batch => batch?.toLowerCase().includes(search.toLowerCase()))
  ),
];

const dataunit = material
  ? [
      ...new Set(
        pidWm
          .filter(item => item.materials.id === material.id)
          .flatMap(item => item.uoms || [])
      ),
    ]
  : [];

  const increment = () => setQty((prev) => String(Number(prev) + 1));
  const decrement = () => {
    setQty((prev) => {
      const newValue = Math.max(0, Number(prev) - 1);
      return String(newValue);
    });
  };

  const handleSubmit = async () => {
    if (!storageBin || !storageUnit || !material || !batch || !qty || !unit) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    } else {
      const data = {
        check_category: roundId,
        storage_type: stypeId,
        storage_bin: storageBin,
        storage_unit_number: storageUnit,
        material: material.id,
        batch: batch,
        qty: qty,
        satuan: unit,
        notes: notes,
      };
      const result = await storeByFormWm(data);
      if (result.success == true) {
        var textAlert = "Success";
      } else {
        var textAlert = "Error";
      }
      Alert.alert(textAlert, result.message);
      setStorageBin("")
      setStorageUnit("")
      setMaterial("")
      setBatch("")
      setQty(0)
      setUnit("")
      setNotes("")
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Stack.Screen options={{title: 'Count'}} />
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Storage Type = {stypeId}</Text>
            {/* <Text style={styles.subtitle}>Share your favorite reads with others</Text> */}
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Storage Bin</Text>
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 6,
                  height: 48,
                  backgroundColor: COLORS.inputBackground,
                  paddingHorizontal: 12,
                }}
                onPress={() => setModalStorageBin(true)}
              >
                <Text>{storageBin || "Select Storage Bin..."}</Text>
              </TouchableOpacity>
              <Modal visible={modalStorageBin} transparent animationType="fade">
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
                    <TextInput
                      placeholder="Cari..."
                      value={search}
                      onChangeText={setSearch}
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 10,
                        borderRadius: 6,
                        marginBottom: 10,
                      }}
                    />

                    <FlatList
                      data={datastorageBin}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setStorageBin(item);
                            setModalStorageBin(false);
                            setSearch("");
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
                      onPress={() => setModalStorageBin(false)}
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
            <View style={styles.formGroup}>
              <Text style={styles.label}>Storage Unit Number</Text>
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 6,
                  height: 48,
                  backgroundColor: COLORS.inputBackground,
                  paddingHorizontal: 12,
                }}
                onPress={() => setModalStorageUnit(true)}
              >
                <Text>{storageUnit || "Select Storage Unit Number..."}</Text>
              </TouchableOpacity>
              <Modal visible={modalStorageUnit} transparent animationType="fade">
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
                    <TextInput
                      placeholder="Cari..."
                      value={search}
                      onChangeText={setSearch}
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 10,
                        borderRadius: 6,
                        marginBottom: 10,
                      }}
                    />

                    <FlatList
                      data={datastorageUnit}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setStorageUnit(item);
                            setModalStorageUnit(false);
                            setSearch("");
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
                      onPress={() => setModalStorageUnit(false)}
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
            <View style={styles.formGroup}>
              <Text style={styles.label}>Material</Text>
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 6,
                  height: 48,
                  backgroundColor: COLORS.inputBackground,
                  paddingHorizontal: 12,
                }}
                onPress={() => setModalMaterial(true)}
              >
                <Text>{material.desc || "Select Material..."}</Text>
              </TouchableOpacity>
              <Modal visible={modalMaterial} transparent animationType="fade">
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
                    <TextInput
                      placeholder="Cari..."
                      value={search}
                      onChangeText={setSearch}
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 10,
                        borderRadius: 6,
                        marginBottom: 10,
                      }}
                    />

                    <FlatList
                      data={datamaterial}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setMaterial(item);
                            setModalMaterial(false);
                            setSearch("");
                          }}
                          style={{
                            padding: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: "#eee",
                          }}
                        >
                          <Text>{item.desc}</Text>
                        </TouchableOpacity>
                      )}
                    />

                    <TouchableOpacity
                      onPress={() => setModalMaterial(false)}
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
            <View style={styles.formGroup}>
              <Text style={styles.label}>Batch</Text>
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 6,
                  height: 48,
                  backgroundColor: COLORS.inputBackground,
                  paddingHorizontal: 12,
                }}
                onPress={() => setModalBatch(true)}
              >
                <Text>{batch || "Select Batch..."}</Text>
              </TouchableOpacity>
              <Modal visible={modalBatch} transparent animationType="fade">
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
                    <TextInput
                      placeholder="Cari..."
                      value={search}
                      onChangeText={setSearch}
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 10,
                        borderRadius: 6,
                        marginBottom: 10,
                      }}
                    />

                    <FlatList
                      data={databatch}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setBatch(item);
                            setModalBatch(false);
                            setSearch("");
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
                      onPress={() => setModalBatch(false)}
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
            <View style={styles.formGroup}>
              <Text style={styles.label}>Quantity</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* Tombol - */}
                <TouchableOpacity
                  onPress={decrement}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 12,
                    backgroundColor: COLORS.inputBackground,
                    marginRight: 5,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>-</Text>
                </TouchableOpacity>

                {/* Input Qty */}
                <TextInput
                  style={{
                    flex: 1,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    backgroundColor: COLORS.inputBackground,
                    borderRadius: 12,
                    marginRight: 5,
                    textAlign: "center",
                    borderWidth: 1,
                    borderColor: COLORS.border,
                  }}
                  keyboardType="numeric"
                  value={String(qty)}
                  onChangeText={(text) => setQty(Number(text) || 0)}
                />

                {/* Tombol + */}
                <TouchableOpacity
                  onPress={increment}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 12,
                    backgroundColor: COLORS.inputBackground,
                    marginRight: 5,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>+</Text>
                </TouchableOpacity>

                {/* Dropdown Unit */}
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    backgroundColor: COLORS.inputBackground,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                  }}
                  onPress={() => setModalUnit(true)}
                >
                  <Text style={{ marginRight: 6 }}>{unit || "Satuan"}</Text>
                  <Ionicons name="chevron-down" size={16} color="#333" />
                </TouchableOpacity>
                <Modal visible={modalUnit} transparent animationType="fade">
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
                    <TextInput
                      placeholder="Cari..."
                      value={search}
                      onChangeText={setSearch}
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 10,
                        borderRadius: 6,
                        marginBottom: 10,
                      }}
                    />

                    <FlatList
                      data={dataunit}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setUnit(item);
                            setModalUnit(false);
                            setSearch("");
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
                      onPress={() => setModalUnit(false)}
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
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Etc: Dus Hampir Rusak!"
                placeholderTextColor={COLORS.placeholderText}
                value={notes}
                onChangeText={setNotes}
                multiline
              />
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  {/* <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  /> */}
                  <Text style={styles.buttonText}>Submit</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
