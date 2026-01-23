import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export const Banner = () => {
  return (
    <View
      style={{
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        source={require('../../../assets/img/cac-buoc-cap-cuu-ngung-tim-ngung-tho.jpg')}
        style={{
          height: '100%',
          width: '100%',
        }}
        resizeMode="cover"
      />

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rbga(0,0,0,0.35)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          gap: 10,
        }}
      >
        <View
          style={{
            flex: 3,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 15,
            justifyContent: 'center',
            padding: 15,
          }}
        >
          <Text style={{ color: '#c32f30', fontWeight: '700' }}>
            Cơ hội thực hành
          </Text>
          <Text style={{ color: '#c32f30', fontWeight: '700' }}>
            kỹ năng sơ cấp cứu
          </Text>
          <View
            style={{
              height: 1.5,
              backgroundColor: '#c32f30',
              marginVertical: 8,
            }}
          />
          <Text style={{ color: '#c32f30', fontWeight: '500' }}>
            Góp phần phòng tránh tai nạn thương tích và giảm thiểu hậu quả tai
            nạn ở cộng đồng.
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            {
              flex: 1,
              borderRadius: 10,
              right: 80,
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#c32f30',
            },
            pressed && { opacity: 0.5 },
          ]}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>
            Tìm hiểu thêm
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
