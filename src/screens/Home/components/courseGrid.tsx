import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../../../routes/Navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CourseGridProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};
type CourseScreen = 'ThuongGap' | 'BenhNen' | 'PhanBiet' | 'BenhNhi';

type CourseItem = {
  name: string;
  label: string;
  screen: CourseScreen;
};

const courseIcons: CourseItem[] = [
  { name: 'bandage', label: 'Thường gặp', screen: 'ThuongGap' },
  { name: 'heart-pulse', label: 'Bệnh nền', screen: 'BenhNen' },
  { name: 'brain', label: 'Phân biệt', screen: 'PhanBiet' },
  { name: 'human-child', label: 'Bệnh nhi', screen: 'BenhNhi' },
];

export const CourseGrid = ({ navigation }: CourseGridProps) => {
  return (
    <View
      style={{
        height: 350,
        paddingHorizontal: 23,
        overflow: 'hidden',
      }}
    >
      <Text style={{ color: '#c32f30', fontWeight: '600' }}>Khóa học</Text>
      <View
        style={{
          height: 0.5,
          backgroundColor: '#c32f30',
          marginVertical: 4,
          marginBottom: 10,
        }}
      />
      <View
        style={{
          gap: 15,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {courseIcons.map(item => {
          return (
            <Pressable
              key={item.label}
              onPress={() => navigation.navigate(item.screen)}
              style={({ pressed }) => [
                {
                  width: 150,
                  height: 150,
                  borderRadius: 15,
                  backgroundColor: '#c32f30',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                pressed && { opacity: 0.7 },
              ]}
            >
              <Icon name={item.name} size={100} color={'#ffffffff'} />
              <Text
                style={{ color: '#ffffffff', fontSize: 22, fontWeight: '300' }}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
