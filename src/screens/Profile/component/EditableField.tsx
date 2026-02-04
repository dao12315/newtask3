import React from 'react';
import { View, TextInput } from 'react-native';
import TextComponent from '../../../component/TextComponent';

export const EditableField = ({
  label,
  value,
  editable,
  onChangeText,
  keyboardType,
}: any) => (
  <View style={{ gap: 8 }}>
    <TextComponent style={{ fontSize: 18, fontWeight: '500' }}>
      {label}
    </TextComponent>

    <View
      style={{
        height: 50,
        borderRadius: 20,
        backgroundColor: '#fed1d6',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextInput
        value={value || '-'}
        editable={editable}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{ width: '90%', fontSize: 16, color: '#990012' }}
      />
    </View>
  </View>
);
