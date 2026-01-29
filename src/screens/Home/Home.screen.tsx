import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Header } from './components/header/header';
import { Banner } from './components/banner/banner';
import { CourseGrid } from './components/courseGrid/courseGrid';
import { Suggestion } from './components/suggestion/suggestion';
import { Service } from './components/service/service';
import { News } from './components/news/news';
import { Update } from './components/update/update';
import { Membership } from './components/membership/membership';
import {
  BottomTabBar,
  HomeTabKey,
} from './components/bottomTabBar/bottomTabBar';

import QAScreen from '../QA/QA.screen';
import ProfileScreen from '../Profile/Profile.screen';

import { useUserStore } from '../../stores/user.store';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = React.useState<HomeTabKey>('home');

  // ✅ NGUỒN DUY NHẤT
  const user = useUserStore(state => state.user);

  // Nếu vì lý do nào đó user = null → không render (hoặc redirect)
  if (!user) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Banner />
            <CourseGrid />
            <Suggestion />
            <Service />
            <News />
            <Update />
            <Membership />
          </>
        );

      case 'qa':
        return <QAScreen />;

      case 'profile':
        return <ProfileScreen />;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]} overScrollMode="never">
        <Header />

        <View style={{ paddingHorizontal: 15, gap: 15, paddingTop: 10 }}>
          {renderContent()}
        </View>
      </ScrollView>

      <BottomTabBar activeTab={activeTab} onChange={setActiveTab} />
    </SafeAreaView>
  );
}
