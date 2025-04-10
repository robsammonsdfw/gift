import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Platform,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../lib/api/config";
import { UserType } from "../../UserContext/UserContext";
import { jwtDecode } from "jwt-decode";
import { Ionicons } from "@expo/vector-icons";

interface JwtPayload {
    userId: string;
}

const { width, height } = Dimensions.get("window");

const SignInScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "SignInScreen", undefined>>();
    const { setToken, setUserId } = useContext(UserType);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showVerificationAlert, setShowVerificationAlert] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const { colors } = useTheme();


    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", () => { });
        return unsubscribe;
    }, [navigation]);

    const handleLogin = () => {


        const user = {
            username: username,
            password: password,
        };
        axios
            .post(`${API_URL}/login`, user)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);
                setToken(token); // Set token in context
                const decodedToken = jwtDecode<JwtPayload>(token);
                setUserId(decodedToken.userId); // Set userId in context

                navigation.replace("Main"); // Adjusted to navigate directly to 'Main'

            })
            .catch((error) => {

                Alert.alert("Invalid username or password");
                console.log("Error", error);
            });
    };

    const handleUsernameChange = (text: string) => {
        // Limit the username to 16 characters
        const limitedUsername = text.slice(0, 24);
        setUsername(limitedUsername);
    };

    const handleSignUp = async () => {
        try {
            setLoading(true);
            navigation.navigate("Username");
        } catch (error) {
            console.error("Error during caching:", error);
            Alert.alert("Error", "There was an issue preparing the app. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                {/* <ScrollView> */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={120}
                >
                    <View style={styles.input}>
                        <View style={{ alignItems: "center" }}>
                            <View style={{ marginBottom: 20 }}>
                                <Image resizeMode="contain" source={Logo} style={styles.logo} />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                value={username}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={handleUsernameChange}
                                placeholder={"username"}
                                placeholderTextColor={"gray"}
                                style={[
                                    styles.inputStyle,
                                    { fontSize: username ? 16 : 16 },
                                ]}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                value={password}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => setPassword(text)}
                                placeholder={"password"}
                                secureTextEntry={!isPasswordVisible}
                                placeholderTextColor={"gray"}
                                style={[
                                    styles.inputStyle,
                                    { fontSize: username ? 16 : 16 },
                                ]}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Ionicons
                                    name={isPasswordVisible ? "eye-off" : "eye"}
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                alignSelf: "flex-end",
                                marginTop: 10,
                                marginHorizontal: 20,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ForgotPasswordScreen")}
                            >
                                <Text style={{ color: "white", fontWeight: "bold" }}>
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "flex-end",
                                marginTop: 20,
                            }}
                        >
                            <TouchableOpacity
                                onPress={handleLogin}
                                style={styles.enter}
                                disabled={loading}
                            >
                                <View style={{ alignItems: "center" }}>
                                    {loading ? (
                                        <ActivityIndicator
                                            size="small"
                                            color="white"
                                            style={{ marginRight: 10 }}
                                        />
                                    ) : (
                                        <Text
                                            style={{
                                                color: "white",
                                                fontWeight: "bold",
                                                fontSize: 16,
                                            }}
                                        >
                                            Log in
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSignUp}

                                // onPress={() => navigation.navigate("SignUpScreen")}
                                style={{
                                    alignItems: "flex-end",
                                    marginTop: 15,
                                    flexDirection: "row",
                                    alignSelf: "center",
                                }}
                            >
                                <Text style={{ color: colors.text }}>Don't have a account?</Text>
                                <Text
                                    style={{ color: colors.text, fontWeight: "bold", fontSize: 17 }}
                                >
                                    {"  "}
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                {/* </ScrollView> */}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        width: width,
        height: height,
    },
    text: {
        fontSize: 24,
        color: "#fff",
    },
    logo: {
        width: 230,
        height: 100,
    },
    input: {
        top: 150,
    },
    inputContainer: {
        borderColor: "#00ccff",
        borderWidth: 0.3,
        backgroundColor: "#e8e8e840",
        borderRadius: 15,
        flexDirection: "row",
        padding: 15,
        marginBottom: 5,
        margin: 10,
        width: "90%",
        alignSelf: "center",
    },
    inputStyle: {
        color: "#FDB075",
        flex: 1,
        marginHorizontal: 5,
    },
    enter: {
        backgroundColor: "dodgerblue",
        padding: 15,
        borderRadius: 15,
        marginTop: 30,
        width: "90%",
        alignSelf: "center",
    },
});