import React, { useEffect, useState } from "react";
import {
    View,
    ActivityIndicator,
    Image,
    Dimensions,
    StyleSheet,
    Animated,
    Text
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import Logo from "../../assets/Logo.png";

type AuthLoadingScreenNavigationProp = StackNavigationProp<RootStackParamList, "AuthLoadingScreen">;

const { width, height } = Dimensions.get("window");

function AuthLoadingScreen() {  // Changed to function declaration
    const navigation = useNavigation<AuthLoadingScreenNavigationProp>();
    const [loading, setLoading] = useState(true);
    const fadeAnim = useState(new Animated.Value(0))[0]; // Changed to use useState

    useEffect(() => {
        const fadeInOut = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );

        fadeInOut.start();

        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                const hasCompletedOnboarding = await AsyncStorage.getItem("hasCompletedOnboarding");

                setTimeout(() => {
                    if (token) {
                        navigation.replace("Main");
                    } else if (hasCompletedOnboarding === "true") {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    { name: "Auth", state: { routes: [{ name: "SignInScreen" }] } },
                                ],
                            })
                        );
                    } else {
                        navigation.replace("OnBoardingNavigator");
                    }
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.log("Error checking login status", error);
                navigation.replace("OnBoardingNavigator");
                setLoading(false);
            }
        };

        checkLoginStatus();

        // Cleanup function
        return () => {
            fadeInOut.stop();
        };
    }, [navigation, fadeAnim]);

    if (loading) {
        return (
         
                <View style={styles.container}>
                    <Animated.Image
                        resizeMode="contain"
                        source={Logo}
                        style={[styles.logo, { opacity: fadeAnim }]}
                    />
                </View>
        );
    }

    return null;
}

export default AuthLoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 230,
        height: 100,
        marginBottom: 20,
    },
    gradient: {
        flex: 1,
        width: width,
        height: height,
    },
});