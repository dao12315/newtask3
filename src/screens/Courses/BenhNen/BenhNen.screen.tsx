import React, { useEffect, useState } from 'react';
import { Pressable, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../../component/TextComponent';
import { CourseCard } from '../../../component/course/CourseCard';
import { stylesCourse } from '../styles';
import { courseService } from '../../../services/course.service';
import { CourseItem } from '../../../component/course/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export default function BenhNenScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [courses, setCourses] = useState<CourseItem[]>([]);
  useEffect(() => {
    courseService.getByCategory('BENH_NEN').then(setCourses);
  }, []);
  return (
    <SafeAreaView style={stylesCourse.safeArea}>
      <View style={stylesCourse.container}>
        {/* HEADER */}
        <View style={stylesCourse.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={stylesCourse.backButton}
            hitSlop={10}
          >
            <Icon name="arrow-back" size={30} color="#fff" />
          </Pressable>

          <TextComponent style={stylesCourse.headerTitle}>
            Bệnh nền
          </TextComponent>
        </View>

        {/* CONTENT */}
        <ScrollView>
          <View style={stylesCourse.list}>
            {courses.map(item => (
              <CourseCard
                key={item.id}
                item={item}
                onPress={() =>
                  navigation.navigate('CourseDetail', {
                    courseId: item.id,
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
