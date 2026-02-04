import React, { useState } from 'react';
import {
  Image,
  Pressable,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import TextComponent from '../../component/TextComponent';
import { IMAGES } from '../../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Navigator';
import { isValidEmail, UserService } from '../../services/todo.service';
import { loginWithGoogle } from '../../services/auth.service';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [dob, setDob] = useState<Date>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const dobText = dob ? dob.toLocaleDateString('vi-VN') : '';

  const dobTimestamp = dob ? dob.getTime() : null;

  const handleNext = async () => {
    if (!name || !email || !phoneNumber || !dob) {
      Alert.alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Email không hợp lệ');
      return;
    }

    const isExists = await UserService.isEmailExists(email);
    if (isExists) {
      Alert.alert('Email đã được sử dụng');
      return;
    }

    if (!/^(03|05|07|08|09)\d{8}$/.test(phoneNumber)) {
      Alert.alert('Số điện thoại không hợp lệ');
      return;
    }

    const avatar = '';

    navigation.navigate('Password', {
      name,
      email,
      phoneNumber: Number(phoneNumber),
      dateOfBirth: dobTimestamp, // ✅ NUMBER (ms)
      avatar,
    });
  };

  const openDobPicker = () => {
    DateTimePickerAndroid.open({
      value: dob ?? new Date(),
      mode: 'date',
      maximumDate: new Date(),
      onChange: (_, selectedDate) => {
        if (selectedDate) setDob(selectedDate);
      },
    });
  };

  const handleGoogleLogin = async (navigation: any) => {
    try {
      const user = await loginWithGoogle();
      if (!user) {
        return;
      }
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
        return;
      }
      navigation.navigate('Password', {
        uid: user.uid,
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              TODO: navigation.goBack();
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
            Đăng Ký
          </TextComponent>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          {/* Full name */}
          <View style={styles.field}>
            <TextComponent style={styles.fieldLabel}>Full name</TextComponent>
            <View style={styles.fieldBox}>
              <TextInput
                placeholder="Nguyen Van A"
                placeholderTextColor="#965b61"
                style={styles.fieldInput}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.field}>
            <TextComponent style={styles.fieldLabel}>Email</TextComponent>
            <View style={styles.fieldBox}>
              <TextInput
                placeholder="example@example.com"
                placeholderTextColor="#965b61"
                style={styles.fieldInput}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.field}>
            <TextComponent style={styles.fieldLabel}>
              Phone number
            </TextComponent>
            <View style={styles.fieldBox}>
              <TextInput
                placeholder="0987654321"
                placeholderTextColor="#965b61"
                keyboardType="phone-pad"
                style={styles.fieldInput}
                onChangeText={text => {
                  const onlyNumber = text.replace(/[^0-9]/g, '');
                  setPhoneNumber(onlyNumber);
                }}
              />
            </View>
          </View>

          {/* DOB */}
          <View style={styles.field}>
            <TextComponent style={styles.fieldLabel}>
              Date of Birth
            </TextComponent>

            <Pressable
              onPress={openDobPicker}
              style={({ pressed }) => [
                styles.fieldBox,
                pressed && styles.pressed,
              ]}
            >
              <TextInput
                editable={false}
                value={dobText}
                placeholder="dd/mm/yyyy"
                placeholderTextColor="#965b61"
                style={styles.fieldInput}
                pointerEvents="none"
              />
            </Pressable>
          </View>

          {/* Policy */}
          <View style={styles.policyBlock}>
            <View style={styles.policyRow}>
              <TextComponent>By continuing, you agree to</TextComponent>
            </View>

            <View style={styles.policyRow}>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() => navigation.navigate('Policy')}
              >
                <TextComponent style={styles.policyLink}>
                  Terms of Use
                </TextComponent>
              </Pressable>

              <TextComponent>and</TextComponent>

              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() => navigation.navigate('Policy')}
              >
                <TextComponent style={styles.policyLink}>
                  Privacy Policy.
                </TextComponent>
              </Pressable>
            </View>
          </View>

          {/* Submit */}
          <View style={styles.buttonWrap}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
              onPress={handleNext}
            >
              <TextComponent style={styles.primaryButtonText}>
                Đăng ký
              </TextComponent>
            </Pressable>
          </View>
        </View>

        {/* DIVIDER */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <TextComponent style={styles.dividerText}>
            Hoặc đăng nhập bằng
          </TextComponent>
          <View style={styles.dividerLine} />
        </View>

        {/* SOCIAL */}
        <View style={styles.socialRow}>
          <Pressable
            style={({ pressed }) => [
              styles.socialButton,
              pressed && styles.pressed,
            ]}
            onPress={() => {
              // TODO: facebook login
            }}
          >
            <Image source={IMAGES.facebook} style={styles.socialIconFb} />
            <TextComponent style={styles.socialText}>Facebook</TextComponent>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.socialButton,
              pressed && styles.pressed,
            ]}
            onPress={() => handleGoogleLogin(navigation)}
          >
            <Image source={IMAGES.google} style={styles.socialIconGg} />
            <TextComponent style={styles.socialText}>Google</TextComponent>
          </Pressable>
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
    gap: 15,
  },

  field: {
    gap: 8,
  },

  fieldLabel: {
    fontSize: 18,
    fontWeight: '500',
  },

  fieldBox: {
    height: 50,
    borderRadius: 20,
    backgroundColor: '#fed1d6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fieldInput: {
    width: '90%',
    fontSize: 16,
    fontWeight: '500',
    color: '#990012',
  },

  policyBlock: {
    gap: 6,
  },

  policyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },

  policyLink: {
    color: '#990012',
    fontWeight: '500',
  },

  buttonWrap: {
    alignItems: 'center',
    marginTop: 6,
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

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 4,
  },

  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#CFCFCF',
  },

  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#666',
  },

  socialRow: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  socialButton: {
    flex: 1,
    height: 60,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#990012',
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialIconFb: {
    position: 'absolute',
    left: 10,
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  socialIconGg: {
    position: 'absolute',
    left: 12,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  socialText: {
    fontSize: 16,
    color: '#000',
  },
});
