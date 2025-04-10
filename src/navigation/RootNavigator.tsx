import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from './BottomTabNavigator';
import ProductScreen from '../screens/Home/ProductScreen';
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen';
import AuthNavigator from './AuthNavigator';
import OnBoardingNavigator from './OnBoardingNavigator';

const Stack = createNativeStackNavigator();


const RootNavigator = () => {
    return (
        <Stack.Navigator>

            <Stack.Group
                screenOptions={{
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen
                    name="Loading"
                    component={AuthLoadingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Main"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false,
                        headerBackTitle: " ",
                    }}
                />


                <Stack.Screen
                    name="OnBoardingNavigator"
                    component={OnBoardingNavigator}
                    options={{
                        headerShown: false,
                        headerBackTitle: " ",
                    }} />


            </Stack.Group>


            <Stack.Screen
                name="ProductScreen"
                component={ProductScreen}
                options={{
                    headerShown: true,
                    headerBackTitle: "Back",
                }}
            />






        </Stack.Navigator>
    )
}

export default RootNavigator

const styles = StyleSheet.create({})