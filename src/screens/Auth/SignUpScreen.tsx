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
    ScrollView,
    ActivityIndicator,
    Alert,
    Linking,
    Button,
  } from "react-native";
  import Logo from "../../assets/Logo.png";
  import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import axios from "axios";
import { API_URL } from "../../lib/api/config";
import { Ionicons } from "@expo/vector-icons";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUpScreen"
>;

const { width, height } = Dimensions.get("window");


const SignUpScreen = () => {
  return (
    <View>
      <Text>SignUpScreen</Text>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({})