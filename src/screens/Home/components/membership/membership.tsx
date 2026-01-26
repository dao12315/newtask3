import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../../../../assets';

export const Membership = () => {
  return (
    <LinearGradient
      colors={['#f9caca', '#ffededff']}
      style={styles.container}
    >
      <Image source={IMAGES.dangki} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>Trở thành thành viên</Text>
        <Text style={styles.text}>Mở khóa tất cả video</Text>
        <Text style={styles.text}>Quà ưu đãi</Text>
        <Text style={styles.text}>Giảm giá đăng ký khóa học</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>Đăng kí ngay</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
    height: 200,
    alignItems: 'flex-end',
    gap: 15,
  },

  image: {
    position: 'absolute',
    resizeMode: 'contain',
    left: 0,
    bottom: 0,
    width: 200,
    height: 200,
    top: 10,
  },

  content: {
    width: '100%',
    alignItems: 'flex-end',
  },

  title: {
    color: '#e96767ff',
    fontSize: 16,
    fontWeight: '700',
  },

  text: {
    color: '#e96767ff',
    fontSize: 13,
    fontWeight: '500',
  },

  button: {
    height: 30,
    backgroundColor: '#c32f30',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    right: 15,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
  },

  pressed: {
    opacity: 0.5,
  },
});
