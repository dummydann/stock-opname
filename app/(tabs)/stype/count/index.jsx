import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../../../../assets/styles/create.styles";
import COLORS from "../../../../constants/colors";
import { useKladStore } from "../../../../store/kladStore";

export default function Count() {
  const {code} = useLocalSearchParams();
  const { dataWm, fetchWm, fetchWmByStype, dataWmByStype, storeByFormWm, error } = useKladStore();
  const [storageBin, setStorageBin] = useState('');
  const [storageUnit, setStorageUnit] = useState('');
  const [material, setMaterial] = useState('');
  const [batch, setBatch] = useState('');
  const [qty, setQty] = useState('');
  const [notes, setNotes] = useState('');
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  useEffect(()=>{
    fetchWmByStype(code)
  },[])

  const datastorageBin   = [...new Set((dataWmByStype ?? []).map(item => item.storage_bin))].map(v => ({ label: v, value: v }));
  const datastorageUnit  = [...new Set((dataWmByStype ?? []).map(item => item.storage_unit_number))].map(v => ({ label: v, value: v }));
  const datamaterial     = [...new Set((dataWmByStype ?? []).map(item => String(item.material.material_id)))].map(v => ({ label: v, value: v }));
  const databatch        = [...new Set((dataWmByStype ?? []).map(item => item.batch))].map(v => ({ label: v, value: v }));
  // console.log(datastorageBin, datastorageUnit, datamaterial, databatch);
  
  const renderLabel = (props) => {
      return (
        <Text style={[styles.label]}>
          {props}
        </Text>
      );
  };

  const handleSubmit = async () => {
      if (!storageBin || !storageUnit || !material || !batch || !qty || !notes) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }else{
        const data = {
          storage_bin: storageBin,
          storage_unit_number: storageUnit,
          material: material,
          batch: batch,
          qty: qty,
          notes: notes
        };
        await storeByFormWm(data);
        Alert.alert('success', "Material success count")
        setStorageBin('')
        setStorageUnit('')
        setMaterial('')
        setBatch('')
        setQty('')
        setNotes('')
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
                data={datastorageBin}
                search
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isFocus ? "Select Storage Bin" : "..."}
                searchPlaceholder="Search..."
                value={storageBin}
                onChange={(item) => {
                  setStorageBin(item.value);
                }}
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
                data={datastorageUnit}
                search
                maxHeight={300}
                labelField="value"
                valueField="value"
                placeholder={!isFocus ? "Select Storage Unit" : "..."}
                searchPlaceholder="Search..."
                value={storageUnit}
                onChange={(item) => {
                  setStorageUnit(item.value);
                }}
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