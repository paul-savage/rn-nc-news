import { View, Text, Button, StyleSheet } from "react-native";
import { useContext } from "react";

import { UserContext } from "../context/user-context";

function HomeScreen() {
  const userCtx = useContext(UserContext);

  function changeUser() {
    userCtx.updateUser("George");
  }

  return (
    <View style={styles.rootContainer}>
      <Text>
        This is the <Text style={styles.highlight}>"Home: {userCtx.user}"</Text>{" "}
        screen!
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
