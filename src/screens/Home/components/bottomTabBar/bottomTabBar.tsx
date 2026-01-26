import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      {bottomTabs.map((item, index) => {
        const isFocused = activeIndex === index;

        if (item.isCenter) {
          return (
            <View key={item.key} style={styles.centerWrapper}>
              <TouchableOpacity style={styles.centerButton}>
                <Icon name={item.icon} size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => setActiveIndex(index)}
            style={styles.tabItem}
          >
            <Icon
              name={item.icon}
              size={25}
              color={isFocused ? '#c32f30' : '#777777ff'}
            />
            <Text
              style={[
                styles.label,
                { color: isFocused ? '#c32f30' : '#777777ff' },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffd0d6',
    height: 70,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },

  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },

  centerWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ffd0d6',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#c32f30',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
