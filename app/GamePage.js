import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useEffect, useState } from "react";

export default function GamePage() {
  const { userNames, spyCount, location, playerCount } = useSearchParams();
  const [isPlay, setIsPlay] = useState(true);
  const [count, setCount] = useState(0);
  const users = userNames.split(",");
  const [spyPositions, setSpyPositions] = useState([]);
  const [spies, setSpies] = useState([]);

  useEffect(() => {
    const newPositions = [];
    while (newPositions.length < spyCount) {
      const randomIndex = Math.floor(Math.random() * playerCount);
      if (!newPositions.includes(randomIndex)) {
        newPositions.push(randomIndex);
      }
    }
    setSpyPositions(newPositions);
  }, []);

  useEffect(() => {
    const players = new Array(parseInt(playerCount)).fill(false);
    spyPositions.forEach((index) => {
      players[index] = true;
    });

    setSpies(players);
  }, [spyPositions]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Game Page" }} />
      <View style={styles.box}>
        {count != users.length && (
          <Text style={styles.username}>{users[count]}</Text>
        )}
        <Pressable
          onPress={() => {
            if (count != users.length) {
              if (spies[count]) {
                Alert.alert("Casus");
              } else {
                Alert.alert(location);
              }
              setCount(count + 1);
            } else {
              setIsPlay(false);
            }
          }}
          style={styles.locationBtn}
        >
          <Text>
            {isPlay
              ? count == users.length
                ? "Sonuçları Göster"
                : "Konumu Gör"
              : "Casuslar: " + spyPositions.map((index, idx) => users[idx])}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C3E50",
    height: "100%",
  },
  box: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  locationBtn: {
    backgroundColor: "#3498db",
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    border: "none",
    borderRadius: 5,
    fontSize: 16,
  },
});
