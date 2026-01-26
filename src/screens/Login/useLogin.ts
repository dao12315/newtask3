import { Alert } from 'react-native';
import { loginWithGoogle } from '../../services/auth.service';
import { UserService } from '../../services/todo.service';
import { AuthStorage } from '../../utils/auth.storage';
import { useEffect, useState } from 'react';
import { configureGoogleSignIn } from '../../config/googleAuth';

export function useLogin(navigation: any) {
  const [hidden, setHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('vui lòng nhập đủ thông tin!');
      return;
    }

    try {
      const user = await UserService.login(email, password);
      console.log('🟢 LOGIN OK – USER:', user);
      await AuthStorage.saveUser(user);
      console.log('💾 SAVED USER TO STORAGE');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { user: user } }],
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

  const handleGoogleLogin = async (navigation: any) => {
    try {
      const user = await loginWithGoogle();
      if (!user) return;

      // ⛔ BẮT BUỘC kiểm tra
      if (!user.email) {
        Alert.alert('Lỗi', 'Không lấy được email từ Google');
        return;
      }
      const isExists = await UserService.isEmailExists(user.email);
      if (isExists) {
        const dbUser = await UserService.getByEmail(user.email);
        if (!dbUser) {
          Alert.alert('Lỗi', 'Không lấy được dữ liệu người dùng');
          return;
        }
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: { user: dbUser } }],
        });

        return;
      }
      navigation.navigate('Password', {
        avatar: user.photoURL,
        name: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dateOfBirth: '',
      });
    } catch (e: any) {
      console.log(e);
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
