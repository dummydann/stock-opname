import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import styles from "../../../../../assets/styles/create.styles";
import COLORS from "../../../../../constants/colors";
import { useKladStore } from "../../../../../store/kladStore";

export default function Count() {
  const { code } = useLocalSearchParams();
  const {
    dataWm,
    fetchWm,
    fetchWmByStype,
    fetchMmBySloc,
    dataWmByStype,
    dataMmBySloc,
    storeByFormWm,
    storeByFormMm,
    error,
  } = useKladStore();
  const [storageBin, setStorageBin] = useState("");
  const [storageUnit, setStorageUnit] = useState("");
  const [material, setMaterial] = useState("");
  const [batch, setBatch] = useState("");
  const [qty, setQty] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    fetchMmBySloc(code);
  }, []);

  const datamaterial = [
    ...new Set(
      (dataWmByStype ?? []).map((item) => String(item.material.material_id))
    ),
  ].map((v) => ({ label: v, value: v }));
  const databatch = [
    ...new Set((dataWmByStype ?? []).map((item) => item.batch)),
  ].map((v) => ({ label: v, value: v }));

  const renderLabel = (props) => {
    return <Text style={[styles.label]}>{props}</Text>;
  };

  const handleSubmit = async () => {
    if (!material || !batch || !qty) {
      setLoading(true)
      Alert.alert("Error", "Please fill in all fields");
      setLoading(false);
      return;
    } else {
      setLoading(true)
      const data = {
        material: material,
        batch: batch,
        qty: qty,
        notes: notes,
      };
      const result = await storeByFormMm(data);
      if (result.success == true) {
        var textAlert = "Success";
      } else {
        var textAlert = "Error";
      }
      Alert.alert(textAlert, result.message);
    }
    setLoading(false);
    setMaterial('');
    setBatch('');
    setQty('');
    setNotes('');
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Count Product</Text>
            {/* <Text style={styles.subtitle}>Share your favorite reads with others</Text> */}
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              {renderLabel("Material")}
              <Dropdown
                style={[style.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={datamaterial}
                search
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isFocus ? "Select Material" : "..."}
                searchPlaceholder="Search..."
                value={material}
                onChange={(item) => {
                  setMaterial(item.value);
                }}
              />
            </View>
            <View style={styles.formGroup}>
              {renderLabel("Batch")}
              <Dropdown
                style={[style.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={databatch}
                search
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isFocus ? "Select Batch" : "..."}
                searchPlaceholder="Search..."
                value={batch}
                onChange={(item) => {
                  setBatch(item.value);
                }}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Quantity</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Input Quantity"
                  placeholderTextColor={COLORS.placeholderText}
                  value={qty}
                  onChangeText={setQty}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* CAPTION */}
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
              disabled={loading}
            >
              {loading ? (
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
