import React from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../../component/TextComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/Navigator';
import { PEDIATRIC_LIST } from './data/pediatric.data';
import { CourseCard } from '../../../component/course/CourseCard';
import { stylesCourse } from '../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'BenhNhi'>;

export default function BenhNhiScreen({ navigation }: Props) {
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
            Bệnh nhi
          </TextComponent>
        </View>

        {/* CONTENT */}
        <ScrollView>
          <View style={stylesCourse.list}>
            {PEDIATRIC_LIST.map(item => (
              <CourseCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
