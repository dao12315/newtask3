import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AuthStorage } from '../../../../utils/auth.storage';
import { uploadAvatarToCloudinary } from '../../../../utils/cloudinary';

type PickAvatarOptions = {
  onPicked?: (url: string) => void;
};

export const useHeaderLogic = (navigation: any) => {
  const logOut = async () => {
    try {
      await AuthStorage.clear();

      const googleUser = GoogleSignin.getCurrentUser();
      if (googleUser) {
        await GoogleSignin.signOut();
      }

      if (auth().currentUser) {
        await auth().signOut();
      }

      Alert.alert('Đã đăng xuất');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  /**
   * ✅ UPDATE AVATAR ĐÚNG THEO CẤU TRÚC DB HIỆN TẠI
   * Query user theo email → lấy key → update
   */
  const updateAvatarFirebase = async (avatarUrl: string) => {
    const user = auth().currentUser;
    if (!user?.email) {
      throw new Error('User not logged in or missing email');
    }

    // 1. Tìm user trong Realtime DB theo email
    const snapshot = await database()
      .ref('/users')
      .orderByChild('email')
      .equalTo(user.email)
      .once('value');

    if (!snapshot.exists()) {
      throw new Error('User not found in database');
    }

    // 2. Lấy key thật của user (-OjMDC3Qca-...)
    const data = snapshot.val();
    const userKey = Object.keys(data)[0];

    // 3. Update avatar
    await database()
      .ref(`/users/${userKey}`)
      .update({
        avatar: avatarUrl,
        updateAt: Date.now(),
      });
  };

  const handleEditAvatar = ({ onPicked }: PickAvatarOptions) => {
    Alert.alert('Chọn ảnh đại diện', 'Bạn muốn chọn ảnh từ đâu?', [
      {
        text: 'Chụp ảnh',
        onPress: async () => {
          try {
            const result = await launchCamera({
              mediaType: 'photo',
              quality: 0.8,
              saveToPhotos: true,
            });

            const uri = result.assets?.[0]?.uri;
            if (!uri) return;

            const avatarUrl = await uploadAvatarToCloudinary(uri);
            await updateAvatarFirebase(avatarUrl);
            onPicked?.(avatarUrl);

            Alert.alert('Thành công', 'Đã cập nhật ảnh đại diện');
          } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Không thể cập nhật avatar');
          }
        },
      },
      {
        text: 'Thư viện',
        onPress: async () => {
          try {
            const result = await launchImageLibrary({
              mediaType: 'photo',
              quality: 0.8,
            });

            const uri = result.assets?.[0]?.uri;
            if (!uri) return;

            const avatarUrl = await uploadAvatarToCloudinary(uri);
            await updateAvatarFirebase(avatarUrl);
            onPicked?.(avatarUrl);

            Alert.alert('Thành công', 'Đã cập nhật ảnh đại diện');
          } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Không thể cập nhật avatar');
          }
        },
      },
      { text: 'Huỷ', style: 'cancel' },
    ]);
  };

  return {
    logOut,
    handleEditAvatar,
  };
};
