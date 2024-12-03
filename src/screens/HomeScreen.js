import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../components/CustomeButton";
import ActionButton from "../components/ActionButton";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [totalMonthlyExpense, setTotalMonthlyExpense] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadExpenses = async () => {
      const storedExpenses = await AsyncStorage.getItem("expenses");
      const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];
      setExpenses(parsedExpenses);
    };

    const unsubscribe = navigation.addListener("focus", loadExpenses);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    calculateTotal(expenses, selectedDate);
  }, [expenses, selectedDate]);

  const calculateTotal = (expenses, date) => {
    const selectedMonth = date.getMonth();
    const selectedYear = date.getFullYear();

    const total = expenses
      .filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getMonth() === selectedMonth &&
          itemDate.getFullYear() === selectedYear
        );
      })
      .reduce((sum, item) => sum + item.amount, 0);

    setTotalMonthlyExpense(total);
  };

  const handleDateChange = (event, date) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.replace("Login");
  };

  const handleDelete = async (id) => {
    const filteredExpenses = expenses.filter((item, index) => index !== id);
    setExpenses(filteredExpenses);
    await AsyncStorage.setItem("expenses", JSON.stringify(filteredExpenses));
    calculateTotal(filteredExpenses, selectedDate);
  };

  const handleEdit = (id) => {
    const selectedExpense = expenses[id];
    navigation.navigate("EditExpense", { id, selectedExpense });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengeluaran Harian</Text>
      <Text style={styles.total}>
        Total untuk{" "}
        {selectedDate.toLocaleDateString("id-ID", {
          month: "long",
          year: "numeric",
        })}
        : <Text style={styles.boldText}>Rp {totalMonthlyExpense.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</Text>
      </Text>
      <View>
        <CustomButton
          title="Pilih Bulan"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>
      <FlatList
        data={expenses.filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.getMonth() === selectedDate.getMonth() &&
            itemDate.getFullYear() === selectedDate.getFullYear()
          );
        })}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <View>
              <Text>
                {item.category}: Rp {item.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(index)}>
                <Icon name="edit" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Hapus Pengeluaran",
                    "Apakah Anda yakin ingin menghapus pengeluaran ini?",
                    [
                      { text: "Batal", style: "cancel" },
                      { text: "Hapus", onPress: () => handleDelete(index) },
                    ]
                  )
                }
              >
                <Icon name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <ActionButton
          iconName="add-circle-outline"
          title="Tambah"
          onPress={() => navigation.navigate("AddExpense")}
          iconColor="#15B7B9"
        />
        <ActionButton
          iconName="logout"
          title="Logout"
          onPress={handleLogout}
          iconColor="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#ffffff" },
  title: { fontSize: 24, textAlign: "center", marginBottom: 10 },
  total: { fontSize: 18, textAlign: "center", color: "#333" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 5,
  },
  boldText: { fontWeight: "bold", color: "#000" },
  date: { fontSize: 12, color: "#666" },
  actions: {
    flexDirection: "row",
    gap: 20,
  },
});

export default HomeScreen;
