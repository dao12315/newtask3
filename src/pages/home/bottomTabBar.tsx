import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const bottomTabs = [
  { key: 'home', label: 'Trang chủ', icon: 'home' },
  { key: 'shop', label: 'Cửa hàng', icon: 'store' },
  { key: 'call', label: '', icon: 'phone', isCenter: true },
  { key: 'qa', label: 'Hỏi đáp', icon: 'chat' },
  { key: 'profile', label: 'Hồ sơ', icon: 'account' },
];

export const BottomTabBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#ffd0d6',
        height: 70,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {bottomTabs.map((item, index) => {
        const isFocused = activeIndex === index;
        if (item.isCenter) {
          return (
            <View key={item.key}
              style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  backgroundColor: '#ffd0d6',
                  marginBottom: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
            >
              <TouchableOpacity
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35, 
                  backgroundColor: '#c32f30',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon name={item.icon} size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => setActiveIndex(index)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 'auto',
            }}
          >
            <Icon
              name={item.icon}
              size={25}
              color={isFocused ? '#c32f30' : '#777777ff'}
            />
            <Text
              style={{
                fontSize: 12,
                marginTop: 4,
                color: isFocused ? '#c32f30' : '#777777ff',
                fontWeight: '600'
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
