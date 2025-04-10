import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import Username from "../screens/Auth/Username";
import Name from "../screens/Auth/Name";
import Birthday from "../screens/Auth/Birthday";
import Email from "../screens/Auth/Email";
import Password from "../screens/Auth/Password";
import AgreeTerms from "../screens/Auth/AgreeTerms";


const AuthStack = createNativeStackNavigator();


const AuthNavigator = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                gestureEnabled: false,
            }}
        >
            <AuthStack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="Username"
                component={Username}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="Name"
                component={Name}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="Birthday"
                component={Birthday}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="Email"
                component={Email}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="Password"
                component={Password}
                options={{
                    headerShown: false,
                }}
            />

            <AuthStack.Screen
                name="AgreeTerms"
                component={AgreeTerms}
                options={{
                    headerShown: false,
                }}
            />


        </AuthStack.Navigator>

    )

}

export default AuthNavigator;
