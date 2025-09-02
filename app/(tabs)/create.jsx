import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../assets/styles/create.styles';
import COLORS from '../../constants/colors';

export default function Create() {
    const [storageBin, setStorageBin] = useState("");
    const [storageUnit, setStorageUnit] = useState("");
    const [material, setMaterial] = useState("");
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

  const bins = ["FL-1-001", "FL-1-002", "FL-1-003"];

    const pickImage = async () => {
        console.log('was pressed');
    }
    const handleSubmit = async () => {
        console.log(title, caption);
        
         if (!title || !caption) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
    }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Count Product</Text>
            {/* <Text style={styles.subtitle}>Share your favorite reads with others</Text> */}
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Storage Bin</Text>
                <Button
                    title={storageBin || "Select Storage Bin"}
                    onPress={() => setVisible(true)}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                >
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <View style={{ backgroundColor: "white", padding: 20 }}>
                        {bins.map((bin) => (
                        <TouchableOpacity
                            key={bin}
                            onPress={() => {
                            setStorageBin(bin);
                            setVisible(false);
                            }}
                            style={{ padding: 15 }}
                        >
                            <Text>{bin}</Text>
                        </TouchableOpacity>
                        ))}
                        <Button title="Cancel" onPress={() => setVisible(false)} />
                    </View>
                    </View>
                </Modal>
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

            <TouchableOpacity style={[styles.button, {backgroundColor: 'green'}]} onPress={handleSubmit} disabled={loading}>
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
  )
}