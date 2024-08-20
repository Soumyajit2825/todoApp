import { View, Text, StyleSheet, TextInput,ActivityIndicator,Button } from "react-native";
import React from "react";
import { firebase_auth } from "../firebaseconfig";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = firebase_auth;

    const signIn = async () => {
        setLoading(true);
        try {
           const response = await signInWithEmailAndPassword( auth, email, password);
            console.log(response);
        }
        catch (error) {
            console.log(error);
            alert('Error signing in'+ error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
           const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your email for verification');
        }
        catch (error) {
            console.log(error);
            alert('Error signing up'+ error.message);
        }
        finally {
            setLoading(false);
        }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email}  autoCapitalize="none" onChangeText={(text)=>setEmail(text)}></TextInput>
      <TextInput style={styles.input} placeholder="Password" value={password} autoCapitalize="none" onChangeText={(text)=>setPassword(text)} secureTextEntry={true}></TextInput>   
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          <Button title="Sign In" onPress={signIn} />
          <Button title="Sign Up" onPress={signUp} />  
        </> 
      )}
    </View>
  );
};
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
  },
});

