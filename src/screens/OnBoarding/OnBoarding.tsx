import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import Welcome from "../../assets/images/Videovideo.mov";
import Welcome2 from "../../assets/images/videostext.png";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");


const OnBoarding = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleFinishOnboarding = async () => {
        try {
            await AsyncStorage.setItem("hasCompletedOnboarding", "true");
            navigation.replace("Auth");
        } catch (error) {
            console.error("Error saving onboarding status:", error);
        }
    };


    return (
        <View style={styles.container}>


            <TouchableOpacity
                onPress={handleFinishOnboarding}
                style={{ alignItems: 'center' }}>
                <Text>Welcome this is the onboading screen</Text>
                <Text>Enter</Text>

            </TouchableOpacity>



        </View>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})