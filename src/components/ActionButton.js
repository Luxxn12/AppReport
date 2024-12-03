import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; 

const ActionButton = ({ iconName, title, onPress, iconColor = "#000" }) => {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Icon name={iconName} size={25} color={iconColor} />
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    actionButton: {
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 20,
    },
    actionText: {
      marginTop: 5,
      fontSize: 14,
      color: "#333",
    },
  });

export default ActionButton;