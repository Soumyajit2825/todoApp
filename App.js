import { StatusBar } from "expo-status-bar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import client from "./graphql/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./components/Home";
import Login from "./components/Login";

import { Container } from "./styles/appStyles";

import { initializeApp } from "firebase/app";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setIsAuthenticated(!!user);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Container>
          <Home />
          <StatusBar style="light" />
        </Container>
      </NavigationContainer>
    </ApolloProvider>
  );
}
