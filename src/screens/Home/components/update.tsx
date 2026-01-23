import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Update = () => {
  return (
    <Pressable
      onPress={()=>void(null)}
      style={({ pressed }) =>[{
        height: 70,
        paddingEnd: 12,
        paddingStart: 12,
      },pressed && {opacity:0.5}]}
    >
      <View
        style={{
          height: 70,
          backgroundColor: '#c32f30',
          borderRadius: 15,
          justifyContent: 'space-between',
          padding: 20,
          borderWidth: 0.5,
          borderColor: '#ae1f1fff',
          flexDirection: 'row',
            alignItems: 'center',
        }}
      >
        <View>
          <Text
            style={{
              color: '#ffffffff',
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            Cập nhật thông tin
          </Text>
          <Text
            style={{
              color: '#ffffffff',
              fontSize: 12,
              fontWeight: '400',
            }}
          >
            Giúp bạn theo dõi sức khỏe
          </Text>
        </View>
        <View
            style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: '#ffffffff',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Icon name="arrow-forward" size={20} color="#c32f30" />
        </View>
      </View>
    </Pressable>
  );
};
