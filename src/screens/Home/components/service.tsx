import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const serviceIcons = [
  { icon: 'medical-bag', label: 'Lộ trình theo\nyêu cầu' },
  { icon: 'baby-face-outline', label: 'Mẹ và bé' },
  { icon: 'note-text-outline', label: 'Bản ghi' },
  { icon: 'bookmark-outline', label: 'Tiến độ' },
];

export const Service = () => {
  return (
    <View
      style={{
        height: 130,
        paddingHorizontal: 10,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#c32f30', fontWeight: '600' }}>Dịch vụ</Text>
        <Text style={{ color: '#c32f30', fontWeight: '600' }}>Khác</Text>
      </View>
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
          gap: 10,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {serviceIcons.map(item => {
          return (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                {
                  flex: 1,
                  borderRadius: 15,
                  backgroundColor: '#f2f2f2',
                  alignItems: 'center',
                },
                pressed && { opacity: 0.7 },
              ]}
            >
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: '#ffd0d6',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 60,
                  height: 60,
                }}
              >
                <Icon name={item.icon} size={40} color={'#c32f30'} />
              </View>
              <Text
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  color: '#c32f30',
                  fontSize: 10,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
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
