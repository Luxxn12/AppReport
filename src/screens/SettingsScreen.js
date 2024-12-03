import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomeButton";


const SettingsScreen = ({ navigation }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.replace("Login");
  };

  const handleSave = async () => {
    if (newUsername && newPassword) {
      await AsyncStorage.setItem("username", newUsername);
      await AsyncStorage.setItem("password", newPassword);
      alert("Username dan Password berhasil diperbarui!");
      navigation.goBack();
    } else {
      alert("Harap isi username dan password baru.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ubah Username dan Password</Text>
      <CustomInput
        label="Username Baru"
        value={newUsername}
        onChangeText={setNewUsername}
        placeholder="Masukkan Username Baru"
      />
      <CustomInput
        label="Password Baru"
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Masukkan Password Baru"
        secureTextEntry
      />
      <CustomButton title="SIMPAN" onPress={handleSave} />
      <CustomButton backgroundColor="red" title="LOGOUT" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});

export default SettingsScreen;
