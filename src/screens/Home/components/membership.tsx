import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../../../assets';

export const Membership = () => {
  return (
    <LinearGradient
      colors={['#f9caca', '#ffededff']}
      style={{
        padding: 16,
        width: '100%',
        height: 200,
        alignItems: 'flex-end',
        gap: 15,
      }}
    >
      <Image
        source={IMAGES.dangki}
        style={{
          position: 'absolute',
          resizeMode: 'contain',
          left: 0,
          bottom: 0,
          width: 200,
          height: 200,
          top: 10,
        }}
      />
      <View
        style={{
          width: '100%',
          height: 'auto',
          alignItems: 'flex-end',
        }}
      >
        <Text style={{ color: '#e96767ff', fontSize: 16, fontWeight: '700' }}>
          Trở thành thành viên
        </Text>
        <Text style={{ color: '#e96767ff', fontSize: 13, fontWeight: '500' }}>
          Mở khóa tất cả video
        </Text>
        <Text style={{ color: '#e96767ff', fontSize: 13, fontWeight: '500' }}>
          Quà ưu đãi
        </Text>
        <Text style={{ color: '#e96767ff', fontSize: 13, fontWeight: '500' }}>
          Giảm giá đăng ký khóa học
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          {
            height: 30,
            backgroundColor: '#c32f30',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            right: 15,
          },
          pressed && { opacity: 0.5 },
        ]}
      >
        <Text style={{ color: '#ffffffff', fontSize: 14, fontWeight: '400' }}>
          Đăng kí ngay
        </Text>
      </Pressable>
    </LinearGradient>
  );
};
