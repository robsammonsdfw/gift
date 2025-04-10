import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation, useFocusEffect } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
import DarkTheme from "../theming/DarkTheme";
import DefaultTheme from "../theming/DefaultTheme";

const MyTheme = {
    ...DefaultTheme,
    color: {
      ...DefaultTheme.colors,
      primary: "dodgerblue",
      background: "lightblue",
      text: "green",
    },
  };

const Index = () => {
    const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : MyTheme}>
    <RootNavigator />
  </NavigationContainer>
  )
}

export default Index

const styles = StyleSheet.create({})