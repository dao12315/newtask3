import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useUserStore } from '../../stores/user.store';
import { AuthStorage } from '../../stores/auth.storage';

export const useProfileLogic = () => {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    setName(user.name ?? '');
    setPhoneNumber(user.phoneNumber ?? '');
    setDateOfBirth(user.dateOfBirth ?? null);
  }, [user]);

  const saveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Tên không được để trống');
      return;
    }

    try {
      const email = auth().currentUser?.email;
      if (!email) return;

      const snapshot = await database()
        .ref('/users')
        .orderByChild('email')
        .equalTo(email)
        .once('value');

      if (!snapshot.exists()) {
        Alert.alert('Lỗi', 'Không tìm thấy người dùng');
        return;
      }

      const data = snapshot.val();
      const key = Object.keys(data)[0];

      await database().ref(`/users/${key}`).update({
        name,
        phoneNumber,
        dateOfBirth,
        updateAt: Date.now(),
      });

      const updatedUser = { ...user!, name, phoneNumber, dateOfBirth };
      setUser(updatedUser);
      await AuthStorage.saveUser(updatedUser);

      setIsEditing(false);
      Alert.alert('Thành công', 'Đã cập nhật thông tin');
    } catch (err) {
      console.log('[useProfileLogic][saveProfile]', err);
      Alert.alert('Lỗi', 'Không thể lưu thông tin');
    }
  };

  return {
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
  };
};
