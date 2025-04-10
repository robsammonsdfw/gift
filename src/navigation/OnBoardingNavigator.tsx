import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "../screens/OnBoarding/OnBoarding";


const OnBoradingStack = createNativeStackNavigator();


const OnBoradingNavigator = () => {
  return (
    <OnBoradingStack.Navigator
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <OnBoradingStack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{
          headerShown: false,
        }}
      />




    </OnBoradingStack.Navigator>

  )




}

export default OnBoradingNavigator;
