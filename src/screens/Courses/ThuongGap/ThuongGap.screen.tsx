import React, { useEffect, useState } from 'react';
import { Pressable, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../../component/TextComponent';
import { CourseCard } from '../../../component/course/CourseCard';
import { stylesCourse } from '../styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CourseItem } from '../../../component/course/types';
import { courseService } from '../../../services/course.service';

export default function ThuongGapScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [courses, setCourses] = useState<CourseItem[]>([]);
  useEffect(() => {
    courseService.getByCategory('THUONG_GAP').then(setCourses);
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
            Thường gặp
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
