import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from './src/navigation/Index'
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import { UserContext } from "./src/UserContext/UserContext";
import React from 'react'; // Make sure to import React

const tamaguiConfig = createTamagui(config)

// TypeScript types across all Tamagui APIs
type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

function App() {  // Changed to function declaration
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
    </GestureHandlerRootView>
  );
}

export default App;