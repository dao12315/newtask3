import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import TextComponent from '../../../component/TextComponent';

export const formatDateVN = (timestamp?: number | null) => {
  if (!timestamp) return '-';

  const date = new Date(timestamp);
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();

  return `${d}/${m}/${y}`;
};

export const DateOfBirthField = ({ value, setValue, editable }: any) => {
  const openPicker = () => {
    if (!editable) return;

    DateTimePickerAndroid.open({
      value: value ? new Date(value) : new Date(),
      mode: 'date',
      maximumDate: new Date(),
      onChange: (_, date) => date && setValue(date.getTime()),
    });
  };

  return (
    <View style={{ gap: 8 }}>
      <TextComponent style={{ fontSize: 18, fontWeight: '500' }}>
        Ngày sinh
      </TextComponent>

      <Pressable
        onPress={openPicker}
        style={{
          height: 50,
          borderRadius: 20,
          backgroundColor: '#fed1d6',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextInput
          editable={false}
          value={formatDateVN(value)}
          style={{ width: '90%', fontSize: 16, color: '#990012' }}
        />
      </Pressable>
    </View>
  );
};
