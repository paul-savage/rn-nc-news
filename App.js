import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import ArticlesScreen from "./screens/ArticlesScreen";
import TopicsScreen from "./screens/TopicsScreen";
import UserScreen from "./screens/UserScreen";
import UserContextProvider from "./context/user-context";

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <UserContextProvider>
        <NavigationContainer>
          <BottomTab.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#3c0a6b" },
              headerTintColor: "white",
              tabBarActiveTintColor: "#3c0a6b",
            }}
          >
            <BottomTab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <BottomTab.Screen
              name="Articles"
              component={ArticlesScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="albums" color={color} size={size} />
                ),
              }}
            />
            <BottomTab.Screen
              name="Topics"
              component={TopicsScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="book" color={color} size={size} />
                ),
              }}
            />
            <BottomTab.Screen
              name="Sign in/out"
              component={UserScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person" color={color} size={size} />
                ),
              }}
            />
          </BottomTab.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </>
  );
}
