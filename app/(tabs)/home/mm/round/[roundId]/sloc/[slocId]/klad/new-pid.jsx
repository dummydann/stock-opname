import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
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

import { Ionicons } from "@expo/vector-icons";
import styles from "../../../../../../../../../assets/styles/create.styles";
import COLORS from "../../../../../../../../../constants/colors";
import { useKladStore } from "../../../../../../../../../store/kladStore";

export default function KladCreate() {
  const { roundId, slocId } = useLocalSearchParams();
  
  const { fetchPidMmNew, pidMm, storeByFormMmNew, isLoading } = useKladStore();
  const [material, setMaterial] = useState("");
  const [batch, setBatch] = useState("");
  const [qty, setQty] = useState(0);
  const [notes, setNotes] = useState("");

  const [unit, setUnit] = useState("");
  const [modalMaterial, setModalMaterial] = useState(false);
  const [modalBatch, setModalBatch] = useState(false);
  const [newBatch, setNewBatch] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);
  const [search, setSearch] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchPidMmNew(slocId, roundId);
  }, []);

  const datamaterial = [
    ...new Map(pidMm.map(i => [i.materials.id, i.materials])).values()
  ].filter(m => 
    m.desc.toLowerCase().includes(search.toLowerCase())
  );
  
  const databatch = [
    ...new Set(
      pidMm
        .filter(i => !material || i.materials.id === material.id)
        .map(i => i.batch)
    )
  ].filter(b => b && b.toLowerCase().includes(search.toLowerCase()));
  

  const dataunit = [
  ...new Set(
    pidMm
      .filter(i => !material || i.materials.id === material.id)
      .flatMap(i => i.uoms)
  )
].filter(u => u && u.toLowerCase().includes(search.toLowerCase()));

  const increment = () => setQty((prev) => String(Number(prev) + 1));
  const decrement = () => {
      setQty((prev) => {
        const newValue = Math.max(0, Number(prev) - 1);
        return String(newValue);
      });
    };

  const handleSubmit = async () => {
    if (!material || !batch || !qty) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    } else {
      const data = {
        check_category: roundId,
        sloc: slocId,
        material: material.id,
        batch: batch,
        is_new_batch: newBatch,
        qty: qty,
        notes: notes,
        satuan: unit
      };
      console.log(data);
      
      const result = await storeByFormMmNew(data);
      if (result.success) {
        setSuccessModal(true); // tampilkan modal
      } else {
        setErrorMessage(result.message);
        setErrorModal(true)
      }
    }
    setMaterial('');
    setBatch('');
    setQty(0);
    setNotes('');
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Stack.Screen options={{title: 'Count - New PID'}} />
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={{fontWeight: 'bold'}}>Storage Location = {slocId}</Text>
            {/* <Text style={styles.subtitle}>Share your favorite reads with others</Text> */}
          </View>

          <View style={styles.form}>
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
                            setBatch("");
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
                      ListEmptyComponent={
                            search.trim() !== "" ? (
                              <View
                                style={{
                                  paddingVertical: 20,
                                  alignItems: "center",
                                }}
                              >
                                <Text style={{ color: "#888", marginBottom: 30 }}>
                                  Batch tidak ditemukan !
                                </Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    setNewBatch(true);
                                    setBatch(search.trim());
                                    setModalBatch(false);
                                    setSearch("");
                                  }}
                                  style={{
                                    backgroundColor: COLORS.primary,
                                    paddingHorizontal: 16,
                                    paddingVertical: 12,
                                    borderRadius: 6,
                                  }}
                                >
                                  <Text
                                    style={{ color: "#fff", fontWeight: "bold" }}
                                  >
                                    Tambahkan "{search}" sebagai batch baru
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            ) : null
                          }
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

            {/* CAPTION */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Etc: Masukkan notes!"
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
        <View>
          <Modal visible={successModal} transparent animationType="fade">
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 25,
                  borderRadius: 20,
                  alignItems: "center",
                  width: "85%",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 6,
                  elevation: 8,
                }}
              >
                {/* Icon di lingkaran */}
                <View
                  style={{
                    backgroundColor: "#E8F5E9",
                    borderRadius: 60,
                    padding: 12,
                    marginBottom: 15,
                  }}
                >
                  <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
                </View>

                {/* Judul */}
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
                  Success!
                </Text>

                {/* Deskripsi */}
                <Text
                  style={{
                    color: "#666",
                    marginTop: 8,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Data berhasil disimpan
                </Text>

                {/* Tombol OK */}
                <TouchableOpacity
                  onPress={() => {setSuccessModal(false); navigation.goBack(); }}
                  style={{
                    marginTop: 25,
                    backgroundColor: "#4CAF50",
                    paddingVertical: 12,
                    paddingHorizontal: 40,
                    borderRadius: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 3,
                    elevation: 5,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View>
          <Modal visible={errorModal} transparent animationType="fade">
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 25,
                  borderRadius: 20,
                  alignItems: "center",
                  width: "85%",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 6,
                  elevation: 8,
                }}
              >
                {/* Icon di lingkaran */}
                <View
                  style={{
                    backgroundColor: "#E8F5E9",
                    borderRadius: 60,
                    padding: 12,
                    marginBottom: 15,
                  }}
                >
                  <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
                </View>

                {/* Judul */}
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
                  Success!
                </Text>

                {/* Deskripsi */}
                <Text
                  style={{
                    color: "#666",
                    marginTop: 8,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  {errorMessage}
                </Text>

                {/* Tombol OK */}
                <TouchableOpacity
                  onPress={() => {setErrorModal(false); navigation.goBack(); }}
                  style={{
                    marginTop: 25,
                    backgroundColor: "#4CAF50",
                    paddingVertical: 12,
                    paddingHorizontal: 40,
                    borderRadius: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 3,
                    elevation: 5,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
