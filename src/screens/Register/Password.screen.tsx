import React, { useState } from 'react';
import { Pressable, TextInput, View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextComponent from '../../component/TextComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Navigator';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { UserService } from '../../services/todo.service';
import { sendEmail } from '../../services/mail.service';

type Props = NativeStackScreenProps<RootStackParamList, 'Password'>;

export default function PasswordScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  const route = useRoute<any>();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { avatar, name, email, phoneNumber, dateOfBirth } = route.params;

  const handleRegister = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Vui lòng nhập đầy đủ');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mật khẩu không khớp');
      return;
    }

    try {
      // 1. TẠO USER
      const userId = await UserService.create(
        name,
        password,
        email,
        phoneNumber,
        dateOfBirth,
        avatar,
      );

      console.log('Created userId:', userId);

      // 2. GỬI EMAIL (OPTIONAL – KHÔNG BLOCK LOGIN)
      const ok = await sendEmail(email);
      if (!ok) {
        Alert.alert(
          'Cảnh báo',
          'Tạo tài khoản thành công nhưng gửi email thất bại',
        );
      }

      navigation.reset({
        index: 0,
        routes: [{ name: 'Successful' }],
      });
    } catch (err) {
      console.log(err);
      Alert.alert('Lỗi', 'Đăng ký thất bại');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={({ pressed }) => [
              styles.headerBack,
              pressed && styles.pressed,
            ]}
            hitSlop={10}
          >
            <Icon name="arrow-back" size={30} color="#fff" />
          </Pressable>

          <TextComponent variant="title" style={styles.headerTitle}>
            Tạo Mật Khẩu
          </TextComponent>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          {/* PASSWORD */}
          <View style={styles.field}>
            <TextComponent style={styles.label}>Password</TextComponent>

            <View style={styles.inputBox}>
              <TextInput
                secureTextEntry={hidePassword}
                placeholder="**********"
                placeholderTextColor="#965b61"
                style={styles.input}
                onChangeText={setPassword}
              />

              <Pressable
                onPress={() => setHidePassword(v => !v)}
                style={({ pressed }) => [
                  styles.eyeButton,
                  pressed && styles.pressed,
                ]}
                hitSlop={10}
              >
                <Icon
                  name={hidePassword ? 'visibility' : 'visibility-off'}
                  size={26}
                  color="#fff"
                />
              </Pressable>
            </View>
          </View>

          {/* CONFIRM PASSWORD */}
          <View style={styles.field}>
            <TextComponent style={styles.label}>Confirm Password</TextComponent>

            <View style={styles.inputBox}>
              <TextInput
                secureTextEntry={hideConfirm}
                placeholder="**********"
                placeholderTextColor="#965b61"
                style={styles.input}
                onChangeText={setConfirmPassword}
              />

              <Pressable
                onPress={() => setHideConfirm(v => !v)}
                style={({ pressed }) => [
                  styles.eyeButton,
                  pressed && styles.pressed,
                ]}
                hitSlop={10}
              >
                <Icon
                  name={hideConfirm ? 'visibility' : 'visibility-off'}
                  size={26}
                  color="#fff"
                />
              </Pressable>
            </View>
          </View>

          {/* SUBMIT */}
          <View style={styles.buttonWrap}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
              onPress={handleRegister}
            >
              <TextComponent style={styles.primaryButtonText}>
                Tạo mật khẩu
              </TextComponent>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffd0d6',
  },

  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },

  pressed: {
    opacity: 0.6,
  },

  header: {
    height: 80,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  headerBack: {
    position: 'absolute',
    left: 16,
    height: 80,
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 28,
  },

  form: {
    paddingHorizontal: 35,
    paddingVertical: 20,
    gap: 16,
  },

  field: {
    gap: 8,
  },

  label: {
    fontSize: 18,
    fontWeight: '500',
  },

  inputBox: {
    height: 50,
    borderRadius: 20,
    backgroundColor: '#fed1d6',
    justifyContent: 'center',
  },

  input: {
    width: '100%',
    paddingHorizontal: 18,
    paddingRight: 52, // chừa chỗ icon mắt
    fontSize: 16,
    fontWeight: '500',
    color: '#990012',
  },

  eyeButton: {
    position: 'absolute',
    right: 14,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonWrap: {
    alignItems: 'center',
    marginTop: 14,
  },

  primaryButton: {
    width: 200,
    height: 50,
    borderRadius: 35,
    backgroundColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});
