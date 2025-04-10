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
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");


const Password = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'Password'>>();
  const { username, name, age, email } = route.params;
  const { colors } = useTheme();


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleNext = () => {
    navigation.navigate('AgreeTerms', { username, name, age, email, password });
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
                  value={password}
                  secureTextEntry={!isPasswordVisible}
                  autoCorrect={false}
                  onChangeText={(text) => setPassword(text)}
                  placeholder={"Password"}
                  placeholderTextColor={"gray"}
                  style={[
                    styles.inputStyle,
                    { color: "gray", fontSize: password ? 16 : 16 },
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

export default Password

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
});