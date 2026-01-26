import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const serviceIcons = [
  { icon: 'medical-bag', label: 'Lộ trình theo\nyêu cầu' },
  { icon: 'baby-face-outline', label: 'Mẹ và bé' },
  { icon: 'note-text-outline', label: 'Bản ghi' },
  { icon: 'bookmark-outline', label: 'Tiến độ' },
];

export const Service = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dịch vụ</Text>
        <Text style={styles.headerText}>Khác</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.grid}>
        {serviceIcons.map(item => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.iconWrapper}>
              <Icon name={item.icon} size={40} color="#c32f30" />
            </View>

            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    color: '#c32f30',
    fontWeight: '600',
  },

  divider: {
    height: 0.5,
    backgroundColor: '#c32f30',
    marginVertical: 4,
    marginBottom: 10,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  card: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 4,
  },

  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffd0d6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    color: '#c32f30',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },

  pressed: {
    opacity: 0.7,
  },
});
