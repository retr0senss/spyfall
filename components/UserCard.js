import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function UserCard({ index, setUserNames, userNames }) {
  const handleNameChange = (name, index) => {
    const updatedNames = [...userNames];
    updatedNames[index] = name;
    setUserNames(updatedNames);
  };
  return (
    <TextInput
      style={styles.input}
      onChangeText={(text) => handleNameChange(text, index)}
      placeholder="Player Name"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
});
