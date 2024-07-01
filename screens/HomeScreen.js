import { View, Text, Button, StyleSheet } from "react-native";
import { useContext } from "react";

import { UserContext } from "../context/user-context";

function HomeScreen() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  function changeUser() {
    setUser("George");
    setIsLoggedIn(true);
  }

  return (
    <View style={styles.rootContainer}>
      <Text>
        This is the <Text style={styles.highlight}>"Home"</Text> screen for{" "}
        {user}, Logged-in: {isLoggedIn ? "true" : "false"}
      </Text>
      <Button title="Update user" onPress={changeUser} />
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
  highlight: {
    fontWeight: "bold",
    color: "#eb1064",
  },
});
