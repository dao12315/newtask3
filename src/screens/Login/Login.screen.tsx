import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../component/TextComponent';
import { IMAGES } from '../../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Navigator';
import { UserService } from '../../services/todo.service';
import { loginWithGoogle } from '../../services/auth.service';
import { AuthStorage } from '../../utils/auth.storage';
import { configureGoogleSignIn } from '../../config/googleAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={({ pressed }) => [styles.header, pressed && styles.pressed]}
        >
          <View style={styles.backIcon}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </View>

          <TextComponent variant="title" style={styles.headerTitle}>
            Đăng Nhập
          </TextComponent>
        </Pressable>

        {/* FORM */}
        <View style={styles.form}>
          <TextComponent variant="title" style={styles.welcome}>
            Chào mừng đến với
          </TextComponent>

          <TextComponent variant="title" style={styles.brand}>
            Medsiki
          </TextComponent>

          {/* EMAIL */}
          <View style={styles.group}>
            <TextComponent style={styles.label}>
              Email hoặc Số điện thoại
            </TextComponent>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="example@example.com"
                placeholderTextColor="#965b61"
                style={styles.input}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* PASSWORD */}
          <View style={styles.group}>
            <TextComponent style={styles.label}>Mật Khẩu</TextComponent>

            <View style={styles.inputWrapper}>
              <TextInput
                secureTextEntry={hidden}
                placeholder="**********"
                placeholderTextColor="#965b61"
                style={styles.inputAbsolute}
                onChangeText={setPassword}
              />

              <Pressable
                onPress={() => setHidden(h => !h)}
                style={({ pressed }) => [
                  styles.eyeIcon,
                  pressed && styles.pressed,
                ]}
              >
                <Icon
                  name={hidden ? 'visibility' : 'visibility-off'}
                  size={28}
                  color="#fff"
                />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.forgot,
                pressed && styles.pressed,
              ]}
            >
              <TextComponent style={styles.forgotText}>
                Quên mật khẩu
              </TextComponent>
            </Pressable>

            <View style={styles.loginBtnWrap}>
              <Pressable
                onPress={handleLogin}
                style={({ pressed }) => [
                  styles.loginBtn,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.loginText}>Đăng nhập</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* DIVIDER */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <TextComponent style={styles.orText}>
            Hoặc đăng nhập bằng
          </TextComponent>
          <View style={styles.line} />
        </View>

        {/* SOCIAL */}
        <View style={styles.social}>
          <Pressable
            style={({ pressed }) => [
              styles.socialBtn,
              pressed && styles.pressed,
            ]}
          >
            <Image source={IMAGES.facebook} style={styles.socialIconFb} />
            <TextComponent style={styles.socialText}>Facebook</TextComponent>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.socialBtn,
              pressed && styles.pressed,
            ]}
            onPress={() => handleGoogleLogin(navigation)}
          >
            <Image source={IMAGES.google} style={styles.socialIconGg} />
            <TextComponent style={styles.socialText}>Google</TextComponent>
          </Pressable>
        </View>

        {/* REGISTER */}
        <View style={styles.register}>
          <TextComponent>Bạn chưa có tài khoản?</TextComponent>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => navigation.navigate('Register')}
          >
            <TextComponent style={styles.registerText}>Đăng ký</TextComponent>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#ffd0d6',
    flex: 1,
  },

  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  pressed: {
    opacity: 0.5,
  },

  header: {
    backgroundColor: '#990012',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },

  backIcon: {
    position: 'absolute',
    left: 16,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 28,
  },

  form: {
    paddingHorizontal: 35,
    paddingVertical: 20,
    gap: 10,
  },

  welcome: {
    fontSize: 24,
    fontWeight: '500',
  },

  brand: {
    color: '#990012',
    fontSize: 30,
    fontWeight: '900',
    height: 100,
  },

  group: {
    gap: 8,
  },

  label: {
    fontSize: 18,
    fontWeight: '500',
  },

  inputWrapper: {
    height: 50,
    borderRadius: 20,
    backgroundColor: '#fed1d6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    width: '90%',
    fontSize: 16,
    fontWeight: '500',
    color: '#990012',
  },

  inputAbsolute: {
    position: 'absolute',
    width: '90%',
    fontSize: 16,
    fontWeight: '500',
    color: '#990012',
  },

  eyeIcon: {
    position: 'absolute',
    right: 16,
  },

  forgot: {
    alignItems: 'flex-end',
    height: 40,
  },

  forgotText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#990012',
  },

  loginBtnWrap: {
    alignItems: 'center',
  },

  loginBtn: {
    width: 200,
    height: 50,
    backgroundColor: '#990012',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#CFCFCF',
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#666',
  },

  social: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 20,
  },

  socialBtn: {
    flex: 1,
    height: 60,
    borderWidth: 1.5,
    borderColor: '#990012',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialIconFb: {
    position: 'absolute',
    left: 10,
    width: 35,
    height: 35,
  },

  socialIconGg: {
    position: 'absolute',
    left: 12,
    width: 30,
    height: 30,
  },

  socialText: {
    fontSize: 16,
    color: '#000',
  },

  register: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },

  registerText: {
    color: '#990012',
    fontWeight: '500',
  },
});
