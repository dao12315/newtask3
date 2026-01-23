import React, { useEffect } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { Header } from './components/header';
import { Banner } from './components/banner';
import { CourseGrid } from './components/courseGrid';
import { Suggestion } from './components/suggestion';
import { Service } from './components/service';
import { News } from './components/news';
import { Update } from './components/update';
import { Membership } from './components/membership';
import { BottomTabBar } from './components/bottomTabBar';
import { RootStackParamList } from '../../routes/Navigator';
import { configureGoogleSignIn } from '../../config/googleAuth';
import auth from '@react-native-firebase/auth';
import { AuthStorage } from '../../utils/auth.storage';

type HomeRouteProps = RouteProp<RootStackParamList, 'Home'>;
type HomeNavProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type PickAvatarOptions = {
  onPicked: (uri: string) => void;
};

export default function HomeScreen() {
  const route = useRoute<HomeRouteProps>();
  const { user } = route.params;

  const navigation = useNavigation<HomeNavProps>();
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const logOut = async () => {
    try {
      // 1️⃣ Clear session local (email + google đều cần)
      await AuthStorage.clear();

      // 2️⃣ Logout Google NẾU có user Google
      const googleUser = GoogleSignin.getCurrentUser();
      if (googleUser) {
        await GoogleSignin.signOut();
      }

      // 3️⃣ Logout Firebase Auth nếu có
      if (auth().currentUser) {
        await auth().signOut();
      }

      Alert.alert('Đã đăng xuất');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleEditAvatar = ({ onPicked }: PickAvatarOptions) => {
    Alert.alert('Chọn ảnh đại diện', 'Bạn muốn chọn ảnh từ đâu?', [
      {
        text: 'Chụp ảnh',
        onPress: async () => {
          const result = await launchCamera({
            mediaType: 'photo',
            quality: 0.8,
            saveToPhotos: true,
          });

          if (result.didCancel) return;

          const uri = result.assets?.[0]?.uri;
          if (uri) {
            onPicked(uri);
          }
        },
      },
      {
        text: 'Thư viện',
        onPress: async () => {
          const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
          });

          if (result.didCancel) return;

          const uri = result.assets?.[0]?.uri;
          if (uri) {
            onPicked(uri);
          }
        },
      },
      {
        text: 'Huỷ',
        style: 'cancel',
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]} overScrollMode="never">
        <Header user={user} onLogout={logOut} editAvatar={handleEditAvatar}/>
        <View style={{ paddingHorizontal: 15, gap: 15, paddingTop: 10 }}>
          <Banner />
          <CourseGrid navigation={navigation}/>
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
