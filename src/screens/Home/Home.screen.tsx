import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

import ProfileScreen from '../Profile/Profile.screen';

import { useUserStore } from '../../stores/user.store';
import { courseService } from '../../services/course.service';
import StoreScreen from '../Store/store.screen';
import { ChatScreen } from '../QA/QA.screen';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = React.useState<HomeTabKey>('home');
  const user = useUserStore(state => state.user);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const rawCourses = await courseService.getAll();
    console.log(rawCourses);
  };

  if (!user) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* CONTENT */}
      {activeTab === 'home' ? (
        <ScrollView
          overScrollMode="never"
          stickyHeaderIndices={[0]}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10,
            gap: 15,
          }}
        >
          {/* HEADER */}
          <Header />
          <Banner />
          <CourseGrid />
          <Suggestion />
          <Service />
          <News />
          <Update />
          <Membership />
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          {activeTab === 'shop' && <StoreScreen />}
          {activeTab === 'qa' && <ChatScreen />}
          {activeTab === 'profile' && <ProfileScreen />}
        </View>
      )}
      {/* BOTTOM TAB */}
      <BottomTabBar activeTab={activeTab} onChange={setActiveTab} />
    </SafeAreaView>
  );
}
