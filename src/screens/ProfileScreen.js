import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/CustomeButton";

const ProfileScreen = ({ navigation }) => {
  const [currentUsername, setCurrentUsername] = useState("");
  useEffect(() => {
    const fetchUsername = async () => {
      const savedUsername = await AsyncStorage.getItem("username");
      setCurrentUsername(savedUsername || "AppReport");
    };
    fetchUsername();
  }, []);
  return (
    <View style={styles.container}>
      <View >
        <Image
          source={require("../../assets/user.png")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#000",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {currentUsername.toUpperCase()}
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <CustomButton
          title="Ubah Username dan Password"
          onPress={() => navigation.navigate("Settings")}
        />
        <CustomButton
          title="Logout"
          onPress={() => navigation.replace("Login")}
          backgroundColor="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
});

export default ProfileScreen;
