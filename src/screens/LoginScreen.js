import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomeButton";
import CustomInput from "../components/CustomInput";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username === "erni" && password === "261120") {
      await AsyncStorage.setItem("userToken", "loggedin");
      navigation.replace("Home");
    } else {
      alert("Username atau Password salah!");
    }
  };

  return (
    <View style={styles.container}>
     <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <CustomInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        secureTextEntry={false}
      />
      <CustomInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <CustomButton title="LOGIN" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  logo: {
    width: width * 0.7, 
    height: width * 0.7, 
    alignSelf: "center",
  },
});

export default LoginScreen;
