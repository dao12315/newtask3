import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home.screen.tsx';
import SplashScreen from '../screens/Splash.screen.tsx';
import WelcomeScreen from '../screens/Welcome.screen.tsx';
import LoginScreen from '../screens/Login.screen.tsx';
import RegisterScreen from '../screens/Register.screen.tsx';
import PassWordScreen from '../screens/Password.screen.tsx';
import PolicyScreen from '../screens/Policy.screen.tsx';
import SuccessfulScreen from '../screens/Successful.screen.tsx';
import { User } from '../services/todo.service.ts';

export type RootStackParamList = {
  Splash: undefined;
  Home: { user: User };
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Password: {
    id?: string;
    name?: any;
    password?: string;
    email?: any;
    phoneNumber?: number;
    dateOfBirth?: String;
    createdAt?: Date;
    updatedAt?: Date;
    upDate?: boolean;
    avatar?: any
  };
  Policy: undefined;
  Successful: undefined;
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
        <Stack.Screen name={'Successful'} component={SuccessfulScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
