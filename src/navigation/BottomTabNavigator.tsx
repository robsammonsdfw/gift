import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    StyleSheet,

} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ProfileNavigator from "./ProfileNavigator";

const BottomTab = createBottomTabNavigator();


const BottomTabNavigator = () => {
    return (
        <BottomTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#000000",
                tabBarInactiveTintColor: "#ababab",
                tabBarShowLabel: true,
                tabBarStyle: { borderTopWidth: 0 },



            }}
        >

            <BottomTab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    unmountOnBlur: true,
                    headerShown: false,
                    headerShadowVisible: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={30} color={color} />
                    ),
                }} />

            <BottomTab.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{
                    unmountOnBlur: true,
                    headerShown: false,
                    headerShadowVisible: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person-circle" size={30} color={color} />
                    ),
                }} />





        </BottomTab.Navigator>


    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})