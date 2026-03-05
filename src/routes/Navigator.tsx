import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/Home.screen.tsx';
import SplashScreen from '../screens/Splash.screen.tsx';
import WelcomeScreen from '../screens/Welcome.screen.tsx';
import LoginScreen from '../screens/Login/Login.screen.tsx';
import RegisterScreen from '../screens/Register/Register.screen.tsx';
import PassWordScreen from '../screens/Register/Password.screen.tsx';
import PolicyScreen from '../screens/Register/Policy.screen.tsx';
import ThuongGapScreen from '../screens/Courses/ThuongGap/ThuongGap.screen.tsx';
import BenhNenScreen from '../screens/Courses/BenhNen/BenhNen.screen.tsx';
import PhanBietScreen from '../screens/Courses/PhanBiet/PhanBiet.screen.tsx';
import BenhNhiScreen from '../screens/Courses/BenhNhi/BenhNhi.screen.tsx';
import OnBoardingScreen from '../screens/OnBoarding/OnBoarding.screen.tsx';
import SuccessfulScreen from '../screens/Successful.screen.tsx';
import CourseDetailScreen from '../screens/Lession/lession.screen.tsx';
import ProductDetailScreen from '../screens/Store/ProductDetailScreen.tsx';
import CartScreen from '../screens/Store/CartScreen.tsx';
import PaymentScreen from '../screens/payment/PaymentScreen.tsx';
import AddAddressScreen from '../screens/payment/AddAddressScreen.tsx';
import OrderHistoryScreen from '../screens/Order/OrderHistoryScreen.tsx';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Successful: undefined;
  Password: {
    id?: string;
    name?: any;
    password?: string;
    email?: any;
    phoneNumber?: number;
    dateOfBirth?: number | string | null;
    createdAt?: Date;
    updatedAt?: Date;
    upDate?: boolean;
    avatar?: any;
  };
  Policy: undefined;
  ThuongGap: undefined;
  BenhNen: undefined;
  PhanBiet: undefined;
  BenhNhi: undefined;
  ProductDetail: undefined;
  CartScreen: undefined;
  PaymentScreen: undefined;
  AddAddressScreen: undefined;
  OrderHistoryScreen: undefined;
  ChatScreen: undefined;

  OnBoarding: undefined;
  CourseDetail: {
    courseId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Splash'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={'Splash'} component={SplashScreen} />
        <Stack.Screen name={'Welcome'} component={WelcomeScreen} />
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'Login'} component={LoginScreen} />
        <Stack.Screen name={'Register'} component={RegisterScreen} />
        <Stack.Screen name={'Password'} component={PassWordScreen} />
        <Stack.Screen name={'Policy'} component={PolicyScreen} />
        <Stack.Screen name={'ThuongGap'} component={ThuongGapScreen} />
        <Stack.Screen name={'BenhNen'} component={BenhNenScreen} />
        <Stack.Screen name={'PhanBiet'} component={PhanBietScreen} />
        <Stack.Screen name={'BenhNhi'} component={BenhNhiScreen} />
        <Stack.Screen name={'OnBoarding'} component={OnBoardingScreen} />
        <Stack.Screen name={'Successful'} component={SuccessfulScreen} />
        <Stack.Screen name={'CourseDetail'} component={CourseDetailScreen} />
        <Stack.Screen name={'ProductDetail'} component={ProductDetailScreen} />
        <Stack.Screen name={'CartScreen'} component={CartScreen} />
        <Stack.Screen name={'PaymentScreen'} component={PaymentScreen} />
        <Stack.Screen name={'AddAddressScreen'} component={AddAddressScreen} />
        <Stack.Screen name={'OrderHistoryScreen'} component={OrderHistoryScreen} />
        {/* <Stack.Screen name={'ChatScreen'} component={ChatScreen} /> */}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
