import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Update = () => {
  return (
    <Pressable
      onPress={() => void null}
      style={({ pressed }) => [
        styles.wrapper,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Cập nhật thông tin</Text>
          <Text style={styles.subtitle}>Giúp bạn theo dõi sức khỏe</Text>
        </View>

        <View style={styles.iconWrapper}>
          <Icon name="arrow-forward" size={20} color="#c32f30" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 70,
    paddingHorizontal: 12,
  },

  container: {
    height: 70,
    backgroundColor: '#c32f30',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 0.5,
    borderColor: '#ae1f1fff',
  },

  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  subtitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '400',
  },

  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pressed: {
    opacity: 0.5,
  },
});
