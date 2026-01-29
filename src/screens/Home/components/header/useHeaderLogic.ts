import { Alert } from 'react-native';
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  update,
} from '@react-native-firebase/database';
import { getApp } from '@react-native-firebase/app';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { uploadAvatarToCloudinary } from '../../../../utils/cloudinary';
import { useUserStore } from '../../../../stores/user.store';
import { AuthStorage } from '../../../../stores/auth.storage';

export const useHeaderLogic = () => {
  // ✅ reactive store
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const db = getDatabase(getApp());

  /* ===================== FIREBASE UPDATE ===================== */
  const updateAvatarFirebase = async (email: string, avatarUrl: string) => {
    const usersRef = ref(db, 'users');
    const q = query(usersRef, orderByChild('email'), equalTo(email));
    const snapshot = await get(q);

    if (!snapshot.exists()) {
      throw new Error('USER_NOT_FOUND');
    }

    snapshot.forEach(child => {
      update(ref(db, `users/${child.key}`), {
        avatar: avatarUrl,
        updateAt: Date.now(),
      });
      return true;
    });
  };

  /* ===================== PICK + UPDATE ===================== */
  const pickAndUpdateAvatar = async (
    picker: () => Promise<ImagePickerResponse>,
  ) => {
    if (!user?.email) {
      Alert.alert('Lỗi', 'Chưa đăng nhập');
      return;
    }

    try {
      const result = await picker();
      const uri = result.assets?.[0]?.uri;
      if (!uri) return;

      // 1. Upload cloudinary
      const avatarUrl = await uploadAvatarToCloudinary(uri);

      // 2. Update firebase
      await updateAvatarFirebase(user.email, avatarUrl);

      // 3. Update store + storage
      const updatedUser = { ...user, avatar: avatarUrl };
      setUser(updatedUser);
      await AuthStorage.saveUser(updatedUser);

      Alert.alert('Thành công', 'Đã cập nhật ảnh đại diện');
    } catch (error) {
      console.log('[useHeaderLogic][avatar] error:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật avatar');
    }
  };

  /* ===================== UI HANDLER ===================== */
  const handleEditAvatar = () => {
    Alert.alert('Chọn ảnh đại diện', 'Bạn muốn chọn ảnh từ đâu?', [
      {
        text: 'Chụp ảnh',
        onPress: () =>
          pickAndUpdateAvatar(() =>
            launchCamera({
              mediaType: 'photo',
              quality: 0.8,
              saveToPhotos: true,
            }),
          ),
      },
      {
        text: 'Thư viện',
        onPress: () =>
          pickAndUpdateAvatar(() =>
            launchImageLibrary({
              mediaType: 'photo',
              quality: 0.8,
            }),
          ),
      },
      { text: 'Huỷ', style: 'cancel' },
    ]);
  };

  return {
    handleEditAvatar,
  };
};
