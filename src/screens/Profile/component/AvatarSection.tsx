import React from 'react';
import { View, Image } from 'react-native';
import TextComponent from '../../../component/TextComponent';
import { IMAGES } from '../../../assets';

export const AvatarSection = ({ avatar, email }: any) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={avatar ? { uri: avatar } : IMAGES.avatar}
        style={{
          width: 120,
          height: 120,
          borderRadius: 70,
          borderWidth: 3,
          borderColor: '#965b61',
        }}
      />
      <TextComponent style={{ marginTop: 5, color: '#965b61' }}>
        {email}
      </TextComponent>
    </View>
  );
};
