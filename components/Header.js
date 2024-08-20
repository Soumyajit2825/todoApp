import React from "react";

import {
  HeaderView,
  HeaderTitle,
  HeaderButton,
  colors,
  Container
} from "../styles/appStyles";

import { StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { firebase_auth } from "../firebaseConfig";

import {Entypo} from "@expo/vector-icons"

const Header = ({handleClearTodos}) => {
  const handleLogout = () => {
    signOut(firebase_auth)
      .then(() => {
        console.log("User signed out!");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };
  return (
    <HeaderView>
      <HeaderTitle>Todos</HeaderTitle>
      <HeaderButton onPress={handleClearTodos}>
        <Entypo name="trash" size={25} color={colors.tertiary} />
      </HeaderButton>
      <HeaderButton onPress={handleLogout}>
        <Entypo name="log-out" size={25} color={colors.tertiary} />
      </HeaderButton>
    </HeaderView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
  },
});