import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, Pressable, Alert } from 'react-native';
import TextComponent from '../../component/TextComponent';
import { IMAGES } from '../../assets';
import { useUserStore } from '../../stores/user.store';
import AppButton from '../../component/AppButton';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { AuthStorage } from '../../stores/auth.storage';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const formatDateVN = (timestamp?: number | null) => {
  if (!timestamp) return '—';

  const date = new Date(timestamp);
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();

  return `${d}/${m}/${y}`;
};

export default function ProfileScreen() {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const [isEditing, setIsEditing] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<number | null>(null);

  // local editable state
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // sync store → local state
  useEffect(() => {
    if (!user) return;
    setName(user.name ?? '');
    setPhoneNumber(user.phoneNumber ?? '');
    setDateOfBirth(user.dateOfBirth ?? null);
  }, [user]);

  const openDobPicker = () => {
    if (!isEditing) return;

    DateTimePickerAndroid.open({
      value: dateOfBirth ? new Date(dateOfBirth) : new Date(),
      mode: 'date',
      is24Hour: true,
      maximumDate: new Date(), // không cho chọn ngày tương lai
      onChange: (_event, selectedDate) => {
        if (selectedDate) {
          setDateOfBirth(selectedDate.getTime());
        }
      },
    });
  };

  if (!user) return null;

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    try {
      if (!name.trim()) {
        Alert.alert('Lỗi', 'Tên không được để trống');
        return;
      }

      const firebaseUser = auth().currentUser;
      if (!firebaseUser?.email) return;

      // tìm user trong realtime DB
      const snapshot = await database()
        .ref('/users')
        .orderByChild('email')
        .equalTo(firebaseUser.email)
        .once('value');

      if (!snapshot.exists()) {
        Alert.alert('Lỗi', 'Không tìm thấy người dùng');
        return;
      }

      const data = snapshot.val();
      const key = Object.keys(data)[0];

      // update Firebase
      await database().ref(`/users/${key}`).update({
        name,
        phoneNumber,
        dateOfBirth,
        updateAt: Date.now(),
      });

      // update store + storage
      const updatedUser = {
        ...user,
        name,
        phoneNumber,
        dateOfBirth,
      };

      setUser(updatedUser);
      await AuthStorage.saveUser(updatedUser);

      setIsEditing(false);
      Alert.alert('Thành công', 'Đã cập nhật thông tin');
    } catch (err) {
      console.log(err);
      Alert.alert('Lỗi', 'Không thể lưu thông tin');
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* AVATAR + EMAIL */}
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={user.avatar ? { uri: user.avatar } : IMAGES.avatar}
            style={{
              width: 120,
              height: 120,
              borderRadius: 70,
              borderWidth: 3,
              borderColor: '#965b61',
            }}
          />
          <TextComponent
            style={{ fontSize: 15, fontWeight: '500', color: '#965b61' }}
          >
            {user.email}
          </TextComponent>
        </View>
      </View>

      <View style={{ padding: 20, gap: 5, width: '100%' }}>
        {/* HỌ TÊN */}
        <Field
          label="Họ tên"
          value={name}
          editable={isEditing}
          onChangeText={setName}
        />

        {/* SỐ ĐIỆN THOẠI */}
        <Field
          label="Số điện thoại"
          value={phoneNumber}
          editable={isEditing}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />

        {/* NGÀY SINH */}
        <View style={{ gap: 8 }}>
          <TextComponent style={{ fontSize: 18, fontWeight: '500' }}>
            Ngày sinh
          </TextComponent>

          <Pressable
            onPress={openDobPicker}
            style={({ pressed }) => [
              {
                height: 50,
                borderRadius: 20,
                backgroundColor: '#fed1d6',
                justifyContent: 'center',
                alignItems: 'center',
              },
              pressed && isEditing && { opacity: 0.6 },
            ]}
          >
            <TextInput
              value={formatDateVN(dateOfBirth)}
              editable={false}
              pointerEvents="none"
              style={{
                width: '90%',
                fontSize: 16,
                fontWeight: '500',
                color: '#990012',
              }}
            />
          </Pressable>
        </View>

        {/* BUTTON */}
        <View style={{ marginTop: 20 }}>
          {!isEditing ? (
            <AppButton
              title="Sửa"
              type="primary"
              icon="pencil"
              onPress={() => setIsEditing(true)}
            />
          ) : (
            <AppButton
              title="Lưu"
              type="primary"
              icon="content-save"
              onPress={handleSave}
            />
          )}
        </View>
      </View>
    </View>
  );
}

/* ================= REUSABLE FIELD ================= */
function Field({
  label,
  value,
  editable,
  onChangeText,
  keyboardType,
}: {
  label: string;
  value: string;
  editable?: boolean;
  onChangeText?: (v: string) => void;
  keyboardType?: any;
}) {
  return (
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
          value={value}
          editable={editable}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder="—"
          placeholderTextColor="#965b61"
          style={{
            width: '90%',
            fontSize: 16,
            fontWeight: '500',
            color: '#990012',
          }}
        />
      </View>
    </View>
  );
}
