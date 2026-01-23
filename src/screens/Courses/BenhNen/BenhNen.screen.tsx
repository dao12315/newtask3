import React from 'react';
import { Pressable, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../../component/TextComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/Navigator';
import { DISEASE_LIST } from './data/disease.date';
import { CourseCard } from '../../../component/course/CourseCard';
import { stylesCourse } from '../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'BenhNen'>;

export default function BenhNenScreen({ navigation }: Props) {
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
            {DISEASE_LIST.map(item => (
              <CourseCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
