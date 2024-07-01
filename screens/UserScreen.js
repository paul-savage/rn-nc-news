import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useContext } from "react";
import { UserContext } from "../context/user-context";
import { useEffect, useState } from "react";
import { getUsers } from "../utils/apicalls";
import LoadingOverlay from "../components/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { Picker } from "@react-native-picker/picker";

function UserScreen({ navigation }) {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [loginName, setLoginName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidUser, setIsInvalidUser] = useState(false);
  const [isFetchUsersError, setIsFetchUsersError] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    getUsers()
      .then((data) => {
        const userNames = data.map((user) => {
          return user.username;
        });
        setUsers(userNames);
        if (userNames.length) {
          setLoginName(userNames[0]);
        } else {
          setLoginName("");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsFetchUsersError(true);
      });
  }, []);

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUser("");
  };

  const handleChangeLoginName = (value) => {
    setLoginName(value);
    setIsInvalidUser(false);
  };

  const handleLogIn = () => {
    if (users.includes(loginName)) {
      setIsInvalidUser(false);
      setUser(loginName);
      setIsLoggedIn(true);
    } else {
      setIsInvalidUser(true);
    }
  };

  if (isFetchUsersError) {
    return (
      <View style={styles.rootContainer}>
        <Text>Error fetching user names</Text>
      </View>
    );
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.rootContainer}>
      {isLoggedIn ? (
        <View style={styles.inputContainer}>
          <Text>You are logged-in as: {user}</Text>
          <Button
            title="Log Out"
            color={GlobalStyles.colors.primary500}
            onPress={handleLogOut}
          />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter user name:</Text>
          <TextInput
            style={styles.input}
            value={loginName}
            onChangeText={handleChangeLoginName}
          />
          {isInvalidUser ? (
            <Text style={styles.invalidInput}>User name does not exist</Text>
          ) : null}
          <Text style={styles.bigOR}>OR</Text>
          <Text style={styles.label}>Select user name from:</Text>
          <Picker
            selectedValue={selectedUser}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedUser(itemValue);
              setLoginName(itemValue);
              setIsInvalidUser(false);
            }}
          >
            {users.map((user) => {
              return <Picker.Item key={user} label={user} value={user} />;
            })}
          </Picker>
          <Button
            title="Log In"
            color={GlobalStyles.colors.primary500}
            onPress={handleLogIn}
          />
        </View>
      )}
    </View>
  );
}

export default UserScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 22,
    //color: GlobalStyles.colors.primary100,
    color: "black",
    marginBottom: 4,
    textAlign: "center",
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    autoCapitalize: "none",
    autoCorrect: false,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
  bigOR: {
    fontSize: 32,
    marginVertical: 24,
    textAlign: "center",
  },
});
