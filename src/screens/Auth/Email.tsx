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
} from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { RouteProp, useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import axios from "axios";
import { API_URL } from "../../lib/api/config";
import validator from 'validator';

const { width, height } = Dimensions.get("window");

const Email = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Email">>();
  const { username, name, age } = route.params;
  const { colors } = useTheme();

  const validateEmail = (email: string) => {
    return validator.isEmail(email);
  };

  const checkEmailAvailability = async (email: string) => {
    try {
      console.log("Checking email availability for:", email);
      const response = await axios.post(`${API_URL}/check-email`, { email });
      console.log("Response received:", response.data);
      return response.data.message === "Email available";
    } catch (error: any) { // Changed Error type to any to access response
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred while checking email');
      }
      console.log("Error response:", error.message);
      return false;
    }
  };

  const handleNext = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    const isAvailable = await checkEmailAvailability(email);
    if (isAvailable) {
      navigation.navigate('Password', { username, name, age, email });
    }
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

            <View style={styles.inputContainer}>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder={"Email"}
                placeholderTextColor={"gray"}
                autoCapitalize="none"
                keyboardType="email-address"
                style={[
                  styles.inputStyle,
                  { color: "gray", fontSize: email ? 16 : 16 },
                ]}
              />
            </View>

            <TouchableOpacity onPress={handleNext} style={styles.enter}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  Next
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

export default Email

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
  charCounter: {
    color: 'white'
  },
  charCounterLimit: {
    color: "red",
  },
});