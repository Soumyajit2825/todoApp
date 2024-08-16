import { StatusBar } from "expo-status-bar";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import client from "./graphql/client";

import Home from "./components/Home";

import { Container } from "./styles/appStyles";

export default function App() {
  return (
    <ApolloProvider client={client}>
    <Container>
      <Home />
      <StatusBar style="light" />
    </Container>
    </ApolloProvider>
  );
}
