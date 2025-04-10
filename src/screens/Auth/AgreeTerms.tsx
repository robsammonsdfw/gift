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
    Linking,
    ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import { RouteProp, useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import axios from "axios";
import { API_URL } from "../../lib/api/config";

const { width, height } = Dimensions.get("window");

const AgreeTerms = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [isChecked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const route = useRoute<RouteProp<RootStackParamList, "AgreeTerms">>();
    const { username, name, email, password, age } = route.params;
    const { colors } = useTheme();


    const handleRegister = () => {

        setLoading(true);
        const user = {
            username,
            name,
            age,
            email,
            password,
        };

        axios
            .post(`${API_URL}/create-user`, user)
            .then((response) => {
                setLoading(false);
                Alert.alert(
                    "Registration successful",
                    "Check your inbox and spam folder to verify email",
                    [{ text: "OK", onPress: () => navigation.navigate("SignInScreen") }]
                );
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert("Registration failed", "Please try again later");
            });

    };


    return (
        <View style={styles.container}>
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

                    <View
                        style={{
                            alignItems: "center",
                            width: "90%",
                            alignSelf: "center",
                        }}
                    >
                        <Text style={[{ color: colors.text, textAlign: "center" }]}>
                            Before proceeding with your signup, please take a moment to
                            review and understand our Terms of Service and Community
                            Guidelines. Understanding and adhering to these guidelines helps
                            us maintain a safe community for all users.
                        </Text>
                    </View>


                
                        <TouchableOpacity
                            onPress={handleRegister}
                            style={[
                                styles.enter,
                                { backgroundColor: isChecked ? "#4630EB" : "#A0A0A0" }, // Change background color based on isChecked
                            ]}
                        >
                            <View style={{ alignItems: "center" }}>
                                <Text
                                    style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                                >
                                    Sign Up
                                </Text>
                            </View>
                        </TouchableOpacity>
               
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            alignItems: "flex-end",
                            marginTop: 35,
                            flexDirection: "row",
                            alignSelf: "center",
                        }}
                    >
                        <Text style={{ color: "white" }}>Made a mistake?</Text>
                        <Text
                            style={{ color: "white", fontWeight: "bold", fontSize: 17 }}
                        >
                            {"  "}
                            Go Back
                        </Text>
                    </TouchableOpacity>

                </View>


            </KeyboardAvoidingView>
        </View>
    )
}

export default AgreeTerms

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        width: width,
        height: height,
    },
    input: {
        top: 150,
    },
    logo: {
        width: 230,
        height: 100,
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
    agreeContainer: {
        margin: 20,
        flexDirection: "row",
        gap: 5,
    },
    checkbox: {
        alignSelf: "center",
    },
});
