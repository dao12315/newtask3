import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../component/AppButton';

import { useProfileLogic } from './useProfileLogic';
import { AvatarSection } from './component/AvatarSection';
import { EditableField } from './component/EditableField';
import { DateOfBirthField } from './component/DateOfBirthField';

export default function ProfileScreen() {
  const {
    user,
    isEditing,
    setIsEditing,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    dateOfBirth,
    setDateOfBirth,
    saveProfile,
  } = useProfileLogic();

  if (!user) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AvatarSection avatar={user.avatar} email={user.email} />

      <View style={{ padding: 20, gap: 12 }}>
        <EditableField
          label="Họ tên"
          value={name}
          editable={isEditing}
          onChangeText={setName}
        />

        <EditableField
          label="Số điện thoại"
          value={phoneNumber}
          editable={isEditing}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <DateOfBirthField
          value={dateOfBirth}
          setValue={setDateOfBirth}
          editable={isEditing}
        />

        <AppButton
          title={isEditing ? 'Lưu' : 'Sửa'}
          icon={isEditing ? 'content-save' : 'pencil'}
          onPress={isEditing ? saveProfile : () => setIsEditing(true)}
        />
      </View>
    </SafeAreaView>
  );
}
