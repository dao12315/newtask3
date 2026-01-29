import { Alert } from 'react-native';
import { loginWithGoogle } from '../../services/auth.service';
import { User, UserService } from '../../services/todo.service';
import { AuthStorage } from '../../stores/auth.storage';
import { useEffect, useState } from 'react';
import { configureGoogleSignIn } from '../../config/googleAuth';
import { AppUser } from '../../models/app-user';
import { useUserStore } from '../../stores/user.store';
import { normalizeUser } from '../../utils/normalize-user';

export function useLogin(navigation: any) {
  const [hidden, setHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Vui lòng nhập đủ thông tin!');
      return;
    }

    try {
      const dbUser = await UserService.login(email, password);
      const appUser = normalizeUser(dbUser);

      // ✅ 1. LƯU RAM (Zustand)
      useUserStore.getState().setUser(appUser);

      // ✅ 2. LƯU DISK
      await AuthStorage.saveUser(appUser);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error: any) {
      switch (error.message) {
        case 'EMAIL_NOT_FOUND':
          Alert.alert('Email không đúng');
          break;
        case 'INVALID_PASSWORD':
          Alert.alert('Mật khẩu không đúng');
          break;
        case 'USER_DISABLED':
          Alert.alert('Tài khoản bị khóa');
          break;
        default:
          Alert.alert('Có lỗi, vui lòng thử lại');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleUser = await loginWithGoogle();
      if (!googleUser || !googleUser.email) {
        Alert.alert('Lỗi', 'Không lấy được email từ Google');
        return;
      }

      const isExists = await UserService.isEmailExists(googleUser.email);

      // ✅ USER ĐÃ CÓ TRONG DB
      if (isExists) {
        const dbUser = await UserService.getByEmail(googleUser.email);
        if (!dbUser) {
          Alert.alert('Lỗi', 'Không lấy được dữ liệu người dùng');
          return;
        }

        const appUser = normalizeUser(dbUser);

        // 🔥 RAM + DISK
        useUserStore.getState().setUser(appUser);
        await AuthStorage.saveUser(appUser);

        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
        return;
      }

      // 🆕 USER CHƯA CÓ → SET PASSWORD
      navigation.navigate('Password', {
        avatar: googleUser.photoURL ?? null,
        name: googleUser.displayName ?? '',
        email: googleUser.email,
        phoneNumber: null,
        dateOfBirth: null,
      });
    } catch (e: any) {
      Alert.alert('Lỗi', e.message ?? 'Google login failed');
    }
  };

  return {
    hidden,
    email,
    password,
    setHidden,
    setEmail,
    setPassword,
    handleLogin,
    handleGoogleLogin,
  };
}
