import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import EditExpense from '../screens/EditExpense';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }}  component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{
            title: 'Laporan Pengeluaran',
        }} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Tambah Pengeluaran' }} />
        <Stack.Screen name="EditExpense" options={{ title: 'Edit Pengeluaran' }} component={EditExpense} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;