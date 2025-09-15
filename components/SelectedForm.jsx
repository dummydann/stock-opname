import { Text, View } from 'react-native';

export default function SelectedForm() {
  return (
    <View>
      <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 12,
                  borderRadius: 6,
                }}
                onPress={() => setModalVisible(true)}
              >
                <Text>{selectedValue || "Pilih kota..."}</Text>
              </TouchableOpacity>
              <Modal visible={modalVisible} transparent animationType="fade">
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
                      placeholder="Cari kota..."
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
                            setSelectedValue(item);
                            setModalVisible(false);
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
                      onPress={() => setModalVisible(false)}
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
  )
}