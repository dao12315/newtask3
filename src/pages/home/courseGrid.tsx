import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const courseIcons = [
  { name: 'bandage', label: 'Thường gặp' },
  { name: 'heart-pulse', label: 'Bệnh nền' },
  { name: 'brain', label: 'Phân biệt' },
  { name: 'human-child', label: 'Bệnh nhi' },
];

export const CourseGrid = () => {
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
