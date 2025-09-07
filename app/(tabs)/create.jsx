import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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
import styles from "../../assets/styles/create.styles";
import COLORS from "../../constants/colors";

export default function Create() {
  const [storageBin, setStorageBin] = useState("");
  const [storageUnit, setStorageUnit] = useState("");
  const [material, setMaterial] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = (props) => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {props}
        </Text>
      );
    }
    return null;
  };

  const bins = [
    { value: "FL-1-001" },
    { value: "FL-1-002" },
    { value: "FL-1-003" },
  ];
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];
  const handleSubmit = async () => {
    console.log(title, caption);

    if (!title || !caption) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
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
              {renderLabel("Storage Bin")}
              <Dropdown
                style={[style.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={bins}
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isFocus ? "Select Storage Bin" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={style.icon}
                    color={isFocus ? "blue" : "black"}
                    name="database"
                    size={20}
                  />
                )}
              />
            </View>
            <View style={styles.formGroup}>
              {renderLabel("Storage Unit Number")}
              <Dropdown
                style={[style.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={bins}
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isFocus ? "Select Storage Bin" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={style.icon}
                    color={isFocus ? "blue" : "black"}
                    name="database"
                    size={20}
                  />
                )}
              />
            </View>
            <View style={styles.formGroup}>
              {renderLabel("Material")}
              <Dropdown
                style={[style.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={bins}
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isFocus ? "Select Storage Bin" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={style.icon}
                    color={isFocus ? "blue" : "black"}
                    name="database"
                    size={20}
                  />
                )}
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
                data={bins}
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isFocus ? "Select Storage Bin" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={style.icon}
                    color={isFocus ? "blue" : "black"}
                    name="database"
                    size={20}
                  />
                )}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Storage Unit Number</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="barcode-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Select Storage Unit Number"
                  placeholderTextColor={COLORS.placeholderText}
                  value={storageUnit}
                  onChangeText={setStorageUnit}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Material</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Select Material"
                  placeholderTextColor={COLORS.placeholderText}
                  value={material}
                  onChangeText={setMaterial}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Batch</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Select Batch"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Quantity</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Input Quantity"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
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
                value={caption}
                onChangeText={setCaption}
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
