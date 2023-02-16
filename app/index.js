import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Link, useRouter, Stack } from "expo-router";

export default function Page() {
  const [playerCount, setPlayerCount] = useState(0);
  const [spyCount, setSpyCount] = useState(0);
  const router = useRouter();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.flexStyle}
        behavior={"padding"}
        enabled={true}
      >
        <View style={styles.container}>
          <Stack.Screen options={{ title: "Home" }} />
          <Text style={styles.title}>Spyfall</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Player Count"
            value={playerCount}
            onChangeText={setPlayerCount}
          />
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="Spy Count"
            value={spyCount}
            onChangeText={setSpyCount}
          />
          <Pressable
            onPressIn={() => {
              if (spyCount >= playerCount) {
                Alert.alert(
                  "Casus sayısı oyuncu sayısına eşit veya büyük olamaz."
                );
              } else {
                router.push({
                  pathname: "/SetupPage",
                  params: { playerCount, spyCount },
                });
              }
            }}
            disabled={!playerCount || !spyCount}
            style={
              !playerCount || !spyCount ? styles.disabledButton : styles.button
            }
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3E50",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    color: "#fff",
  },
  flexStyle: {
    flex: 1,
  },
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
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
});
