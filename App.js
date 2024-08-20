import { StatusBar } from "expo-status-bar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import client from "./graphql/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./components/Home";
import { Text, View } from "react-native";
import Login from "./components/Login";

import { Container } from "./styles/appStyles";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebase_auth } from "./firebaseConfig";
import { User } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  const auth = firebase_auth;

  return (
    <ApolloProvider client={client}>
      {/* <> */}
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="Home" component={Home} 
            options={{ headerShown: false }}/>
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
      {/* </> */}
    </ApolloProvider>
  );
}
