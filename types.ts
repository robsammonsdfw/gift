// types.ts
export type RootStackParamList = {
    SignInScreen: undefined;
    SignUpScreen: undefined;
    Main: undefined;
    RootNavigator: { screen: string };
    Settings: undefined;
    Auth: { screen: string };
    AccountInformation: undefined;
    ForgotPasswordScreen: undefined;
    EditProfile: undefined;
    Home: undefined;
    HomeScreen: undefined;
    ProductScreen: {
      productId: string;
      name: string;
      imageUrl?: string;
      currency: string;
      minValue: string;
      maxValue: string;
      denominationType?: 'fixed' | 'open';
      availableValues?: string[];
    };
    AuthLoadingScreen: undefined;
    OnBoardingNavigator: undefined;
    Username: undefined;
    Name: { username: string; name?: string };
    Birthday: { username: string; name: string; age?: string };
    Email: { username: string; name: string; age: string; email?: string };
    Password: { username: string; name: string; age: string; email: string; password?: string };
    AgreeTerms: { username: string; name: string; age: string; email: string; password: string };


  };
  
  export interface GiftCardProduct {
    id: string;
    name: string;
    imageUrl?: string;
    iconUrl?: string;
    currency: string;
    minValue: string;
    maxValue: string;
    availableValues?: string[];
    discount: string;
    categories: string[];
    isOrderable: boolean;
    denominationType: 'fixed' | 'open';
    description?: string;
  }