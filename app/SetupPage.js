import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter, useSearchParams, Link } from "expo-router";
import UserCard from "../components/UserCard";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import locationNames from "../constants/locationNames";

export default function SetupPage() {
  const router = useRouter();
  const { playerCount, spyCount } = useSearchParams();
  const [userNames, setUserNames] = useState(
    new Array(playerCount).fill("Name")
  );
  const location =
    locationNames[Math.floor(Math.random() * locationNames.length)];

  const renderUserCards = () => {
    const userCards = [];
    for (let i = 1; i <= playerCount; i++) {
      userCards.push(
        <UserCard
          key={i}
          index={i - 1}
          userNames={userNames}
          setUserNames={setUserNames}
        />
      );
    }

    return userCards;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
      <View style={styles.container}>
        <ScrollView>
          <Stack.Screen options={{ title: "Setup" }} />
          {renderUserCards()}
          <Pressable
            style={styles.button}
            onPress={() => {
              router.push({
                pathname: "/GamePage",
                params: { userNames, spyCount, location, playerCount },
              });
            }}
          >
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C3E50",
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
});
