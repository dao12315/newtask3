import React, { useEffect } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Header } from '../pages/home/header';
import { Banner } from '../pages/home/banner';
import { CourseGrid } from '../pages/home/courseGrid';
import { Suggestion } from '../pages/home/suggestion';
import { Service } from '../pages/home/service';
import { News } from '../pages/home/news';
import { Update } from '../pages/home/update';
import { Membership } from '../pages/home/membership';
import { BottomTabBar } from '../pages/home/bottomTabBar';
import { RootStackParamList } from '../routes/Navigator';
import { configureGoogleSignIn } from '../config/googleAuth';
import auth from '@react-native-firebase/auth';
import { AuthStorage } from '../utils/auth.storage';

type HomeRouteProps = RouteProp<RootStackParamList, 'Home'>;
type HomeNavProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const route = useRoute<HomeRouteProps>();
  const { user } = route.params;

  const navigation = useNavigation<HomeNavProps>();
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const logOut = async () => {
    try {
      // 1️⃣ XÓA SESSION (BẮT BUỘC – CHUNG)
      await AuthStorage.clear();
      // 1️⃣ Logout Google (nếu đã login bằng Google)
      await GoogleSignin.signOut();

      // 2️⃣ Logout Firebase Auth (QUAN TRỌNG)
      await auth().signOut();
      Alert.alert('Đã đăng xuất!!');

      // 3️⃣ Điều hướng về Welcome
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]} overScrollMode="never">
        <Header user={user} onLogout={logOut} />
        <View style={{ paddingHorizontal: 15, gap: 15, paddingTop: 10 }}>
          <Banner />
          <CourseGrid />
          <Suggestion />
          <Service />
          <News />
          <Update />
          <Membership />
        </View>
      </ScrollView>
      <BottomTabBar />
    </SafeAreaView>
  );
}
