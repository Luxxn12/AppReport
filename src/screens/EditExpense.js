import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomeButton";
import moment from "moment";
import "moment/locale/id";

const EditExpense = ({ route, navigation }) => {
  const { id, selectedExpense } = route.params;
  const [category, setCategory] = useState(selectedExpense.category);
  const [amount, setAmount] = useState(selectedExpense.amount.toString());
  const [date, setDate] = useState(selectedExpense.date);

  const handleSave = async () => {
    if (!category || !amount || isNaN(parseFloat(amount))) {
      Alert.alert("Error", "Pastikan semua data telah diisi dengan benar!");
      return;
    }

    const storedExpenses = await AsyncStorage.getItem("expenses");
    const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];

    expenses[id] = { category, amount: parseFloat(amount), date };

    await AsyncStorage.setItem("expenses", JSON.stringify(expenses));

    Alert.alert("Berhasil", "Pengeluaran berhasil diperbarui!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EDIT PENGELUARAN</Text>
      <CustomInput
        label="Kategori"
        value={category}
        onChangeText={setCategory}
        placeholder={"Kategori"}
      />
      <CustomInput
        label="Jumlah"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
        placeholder={"Jumlah"}
        secureTextEntry={false}
      />
      <CustomInput label="Tanggal" value={moment(date).format("LL")} editable={false} />

      <CustomButton title="SIMPAN PERUBAHAN" onPress={handleSave} />
      <CustomButton
        title="Batal"
        backgroundColor="red"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffffff" },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default EditExpense;
