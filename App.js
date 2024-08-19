import { StatusBar } from "expo-status-bar";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import client from "./graphql/client";

import Home from "./components/Home";

import { Container } from "./styles/appStyles";

import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyAVHJ42O8nPlVTJcNaiKNiCebtSou0-vwI",
  authDomain: "todoapp-59d98.firebaseapp.com",
  projectId: "todoapp-59d98",
  storageBucket: "todoapp-59d98.appspot.com",
  messagingSenderId: "151735270275",
  appId: "1:151735270275:web:6d6ce9ae84c7e714b6d4b6",
  measurementId: "G-8986BW5CFX"
};

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

const app = initializeApp(firebaseConfig);
