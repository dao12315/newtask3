import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from './components/header/header';
import { Banner } from './components/banner/banner';
import { CourseGrid } from './components/courseGrid/courseGrid';
import { Suggestion } from './components/suggestion/suggestion';
import { Service } from './components/service/service';
import { News } from './components/news/news';
import { Update } from './components/update/update';
import { Membership } from './components/membership/membership';
import { BottomTabBar } from './components/bottomTabBar/bottomTabBar';
import { RootStackParamList } from '../../routes/Navigator';
import { useHeaderLogic } from './components/header/useHeaderLogic';

type HomeRouteProps = RouteProp<RootStackParamList, 'Home'>;
type HomeNavProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const route = useRoute<HomeRouteProps>();
  const { user } = route.params;

  const navigation = useNavigation<HomeNavProps>();
  const { logOut, handleEditAvatar } = useHeaderLogic(navigation);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]} overScrollMode="never">
        <Header user={user} onLogout={logOut} editAvatar={handleEditAvatar} />
        <View style={{ paddingHorizontal: 15, gap: 15, paddingTop: 10 }}>
          <Banner navigation={navigation} />
          <CourseGrid navigation={navigation} />
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
