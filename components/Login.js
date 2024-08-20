import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import {
  Container,
  StyledInput,
  ModalButton,
  HeaderTitle,
  colors,
} from "../styles/appStyles";
import { firebase_auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = firebase_auth;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError("Error signing in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Created user successfully!");
    } catch (error) {
      console.log(error);
      setError("Error signing up: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <HeaderTitle style={styles.title}>Login</HeaderTitle>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {/* <KeyboardAvoidingView > */}
      <StyledInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <StyledInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.tertiary} />
      ) : null}
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={signIn} />
        <Button title="Sign Up" onPress={signUp} />
      </View>
        {/* </KeyboardAvoidingView> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: colors.tertiary,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "90%",
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.tertiary,
    color: colors.text,
  },
  buttonContainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 18,
  },
});

export default Login;
