import { View, Text, Button, StyleSheet } from "react-native";
import { useContext } from "react";

import { UserContext } from "../context/user-context";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.rootContainer}>
      <View>
        <Text>Display all articles</Text>
        <Button
          title="Articles"
          onPress={() => navigation.navigate("Articles")}
        />
      </View>
      <View>
        <Text>Display all topics</Text>
        <Button title="Topics" onPress={() => navigation.navigate("Topics")} />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
