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
import { format } from 'date-fns'; // Import date-fns or any other date formatting library
import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");


const Birthday = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const [age, setAge] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'Birthday'>>();

  const { username, name } = route.params;


  const handleNext = () => {
    const formattedAge = format(age, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"); // Format date as ISO 8601 string
    navigation.navigate('Email', { username, name, age: formattedAge });
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

          <View style={styles.inputContainerAge}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={[styles.ageText, { color: colors.text }]}>
                Select Date of Birth
              </Text>
            </TouchableOpacity>

            <DateTimePicker
              value={age}
              mode="date"
              display="calendar"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setAge(selectedDate);
                }
                setShowDatePicker(false);
              }}
            />
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

export default Birthday

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
  ageText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  inputContainerAge: {
    borderColor: "#00ccff",
    borderWidth: 0.3,
    backgroundColor: "#e8e8e840",
    borderRadius: 15,
    flexDirection: "row",
    padding: 10,
    marginBottom: 5,
    margin: 10,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
});
