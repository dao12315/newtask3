import React from 'react';
import { Pressable, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../../component/TextComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/Navigator';
import { CourseCard } from '../../../component/course/CourseCard';
import { RECOGNITION_LIST } from './data/recognition.data';
import { stylesCourse } from '../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'PhanBiet'>;

export default function PhanBietScreen({ navigation }: Props) {
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
            Phân biệt
          </TextComponent>
        </View>

        {/* CONTENT */}
        <ScrollView>
          <View style={stylesCourse.list}>
            {RECOGNITION_LIST.map(item => (
              <CourseCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
