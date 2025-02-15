import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";

import HomeScreen from "./screens/HomeScreen";
import ArticlesScreen from "./screens/ArticlesScreen";
import TopicsScreen from "./screens/TopicsScreen";
import UserScreen from "./screens/UserScreen";

import UserContextProvider from "./context/user-context";

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <UserContextProvider>
        <NavigationContainer>
          <BottomTab.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
              headerTitleAlign: "center", // for Android - iOS is fixed at centre
              //tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              tabBarActiveTintColor: GlobalStyles.colors.primary500,
            }}
          >
            <BottomTab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                //title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <BottomTab.Screen
              name="Articles"
              component={ArticlesScreen}
              options={{
                //title: "Articles",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="albums" color={color} size={size} />
                ),
              }}
            />
            <BottomTab.Screen
              name="Topics"
              component={TopicsScreen}
              options={{
                //title: "Topics",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="book" color={color} size={size} />
                ),
              }}
            />
            <BottomTab.Screen
              name="User"
              component={UserScreen}
              options={{
                //title: "Sign in/out",
                headerShown: false,
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
