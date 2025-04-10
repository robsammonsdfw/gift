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
import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import { RouteProp, useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import axios from "axios";
import { API_URL } from "../../lib/api/config";
import { UserType } from "../../UserContext/UserContext";

const { width, height } = Dimensions.get("window");

const Username = () => {
  const [username, setUsername] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();


  const checkUsernameAvailability = async (username: string) => {
    try {
      const response = await axios.post(`${API_URL}/check-username`, { username });
      return response.data.message === 'Username available';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred while checking username');
      }
      return false;
    }
  };

  const handleNext = async () => {
    if (username) {
      const isAvailable = await checkUsernameAvailability(username);
      if (isAvailable) {
        navigation.navigate('Name', { username });


      }
    } else {
      Alert.alert('Error', 'Please enter a username');
    }
  };

  const handleUsernameChange = (text: string) => {
    // Replace spaces with underscores, convert to lowercase, and limit to 16 characters
    const formattedUsername = text.replace(/\s+/g, "_").toLowerCase().slice(0, 24);
    setUsername(formattedUsername);
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
              value={username}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleUsernameChange}
              placeholder={"username"}
              placeholderTextColor={"gray"}
              style={[
                styles.inputStyle,
                { color: "gray", fontSize: username ? 16 : 16 },
              ]}
            />

            <Text
              style={[
                styles.charCounter,
                username.length === 24 && styles.charCounterLimit
              ]}
            >
              {username.length}/24
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleNext}
            style={styles.enter}>
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
            <Text style={{ color: colors.text }}>Made a mistake?</Text>
            <Text
              style={{ color: colors.text, fontWeight: "bold", fontSize: 17 }}
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

export default Username

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
