import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomeButton';

const AddExpenseScreen = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSave = async () => {
    if (!category || !amount) {
      alert('Kategori dan Jumlah harus diisi!');
      return;
    }

    try {
      const newExpense = { category, amount: parseFloat(amount), date: new Date().toISOString() };

      // Ambil data pengeluaran yang sudah ada
      const storedExpenses = await AsyncStorage.getItem('expenses');
      const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];

      // Tambahkan pengeluaran baru
      const updatedExpenses = [...expenses, newExpense];
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));

      alert('Pengeluaran berhasil ditambahkan!');
      navigation.goBack(); // Kembali ke layar sebelumnya
    } catch (error) {
      console.error('Gagal menyimpan pengeluaran:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TAMBAH PENGELUARAN</Text>
      <CustomInput
        label="Kategori"
        value={category}
        onChangeText={setCategory}
        placeholder="Kategori (mis. Makanan, Transportasi)"
      />
      <CustomInput
      label="Jumlah"
      value={amount}
      onChangeText={setAmount}
      placeholder="Jumlah (Rp)"
      keyboardType="numeric"
    />
      <CustomButton
        title="SIMPAN"
        onPress={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default AddExpenseScreen;
